import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  loadDB, saveDB, getDB, findById, findOne, findAll,
  insert, update, remove, increment, markDirty, setEnv,
} from '../../database.js';

const JWT_SECRET = 'hanlin-forum-secret-2026';

// --- 辅助函数 ---
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

function getIP(request) {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return request.headers.get('cf-connecting-ip') || 'unknown';
}

async function getBody(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

// --- 登录限流 ---
const loginAttempts = new Map();
function checkLoginRate(ip) {
  const now = Date.now();
  const attempts = loginAttempts.get(ip) || [];
  const recent = attempts.filter(t => now - t < 900000); // 15分钟内
  if (recent.length >= 10) return false;
  recent.push(now);
  loginAttempts.set(ip, recent);
  return true;
}

// --- 认证 ---
// 支持 X-Auth-Token 头、Authorization 头、URL query 参数（兼容 IGA Pages 预览环境）
function getAuthUser(request) {
  let token = request.headers.get('x-auth-token');
  if (!token) {
    const auth = request.headers.get('authorization');
    if (auth) token = auth.replace('Bearer ', '');
  }
  if (!token) {
    try { token = new URL(request.url).searchParams.get('token'); } catch {}
  }
  if (!token) return null;
  try { return jwt.verify(token, JWT_SECRET); } catch { return null; }
}

function requireAuth(request) {
  const user = getAuthUser(request);
  if (!user) return { user: null, error: json({ error: '未登录' }, 401) };
  return { user, error: null };
}

function requireAdmin(request) {
  const { user, error } = requireAuth(request);
  if (error) return { user: null, error };
  if (user.role !== 'admin') return { user: null, error: json({ error: 'Not Found' }, 404) };
  return { user, error: null };
}

// --- 格式化函数 ---
function formatPost(post, currentUserId) {
  const db = getDB();
  const author = findById('users', post.user_id);
  const category = findById('categories', post.category_id);
  let liked = false, voted = 0, favorited = false;
  if (currentUserId) {
    liked = !!findOne('post_likes', { post_id: post.id, user_id: currentUserId });
    const vote = findOne('post_votes', { post_id: post.id, user_id: currentUserId });
    voted = vote ? vote.vote_type : 0;
    favorited = !!findOne('favorites', { post_id: post.id, user_id: currentUserId });
  }
  const poll = findOne('post_polls', { post_id: post.id });
  let pollData = null, pollVoted = null;
  if (poll) {
    pollData = { id: poll.id, question: poll.question, agree: poll.agree, disagree: poll.disagree };
    if (currentUserId) {
      const pollVote = findOne('poll_votes', { poll_id: poll.id, user_id: currentUserId });
      pollVoted = pollVote ? pollVote.choice : null;
    }
  }
  return {
    ...post,
    tags: typeof post.tags === 'string' ? JSON.parse(post.tags || '[]') : (post.tags || []),
    images: typeof post.images === 'string' ? JSON.parse(post.images || '[]') : (post.images || []),
    author: author ? { id: author.id, nickname: author.nickname, avatar_color: author.avatar_color, department: author.department, role: author.role === 'admin' ? 'student' : author.role } : null,
    category: category ? { id: category.id, name: category.name, slug: category.slug, color: category.color } : null,
    liked, voted, favorited,
    poll: pollData, poll_voted: pollVoted,
    score: (post.upvotes || 0) - (post.downvotes || 0),
    is_hot: post.is_hot || 0,
  };
}

function formatComment(comment, currentUserId) {
  const author = findById('users', comment.user_id);
  let liked = false;
  if (currentUserId) {
    liked = !!findOne('comment_likes', { comment_id: comment.id, user_id: currentUserId });
  }
  const replies = findAll('comments', { parent_id: comment.id })
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .map(r => formatComment(r, currentUserId));
  return {
    ...comment,
    author: author ? { id: author.id, nickname: author.nickname, avatar_color: author.avatar_color, department: author.department, role: author.role === 'admin' ? 'student' : author.role } : null,
    liked, replies,
  };
}

function publicUser(user, viewerRole) {
  if (!user) return null;
  const showRole = (viewerRole === 'admin' || user.role !== 'admin') ? user.role : 'student';
  return {
    id: user.id, username: user.username, nickname: user.nickname,
    avatar_color: user.avatar_color, bio: user.bio, department: user.department,
    role: showRole, post_count: user.post_count || 0, comment_count: user.comment_count || 0,
    like_received: user.like_received || 0, created_at: user.created_at,
  };
}

// ===== 主处理函数 =====
// 使用 { fetch } 导出格式，IGA Pages 会传入 Web API Request 对象
async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  try {
  await loadDB();
    // ===== POST 路由 =====
    if (method === 'POST') {
      // --- AUTH ---
      if (path === '/api/auth/login') {
        const { username, password } = await getBody(request);
        if (!username || !password) return json({ error: '请输入账号和密码' }, 400);
        if (!checkLoginRate(getIP(request))) return json({ error: '尝试过于频繁，请15分钟后再试' }, 429);
        const user = findOne('users', { username });
        if (!user) return json({ error: '账号不存在' }, 401);
        if (!bcrypt.compareSync(password, user.password)) return json({ error: '密码错误' }, 401);
        const banned = findOne('banned_users', { user_id: user.id });
        if (banned) return json({ error: '该账号已被禁言' }, 403);
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        return json({ token, user: publicUser(user, user.role) });
      }

      if (path === '/api/auth/register') {
        const { username, password, nickname, department, role } = await getBody(request);
        if (!username || !password || !nickname) return json({ error: '请填写完整信息' }, 400);
        if (username.length < 3) return json({ error: '账号至少3个字符' }, 400);
        if (password.length < 6) return json({ error: '密码至少6个字符' }, 400);
        const existing = findOne('users', { username });
        if (existing) return json({ error: '账号已存在' }, 409);
        const colors = ['#8B2323', '#C9A227', '#6B1A1A', '#D4AF37', '#A52A2A', '#B8860B', '#CD853F', '#DA8A2C'];
        const avatar_color = colors[Math.floor(Math.random() * colors.length)];
        const hashed = bcrypt.hashSync(password, 8);
        const user = insert('users', {
          username, password: hashed, nickname, avatar_color,
          bio: '欢迎来到翰林校园论坛', department: department || '',
          created_at: new Date().toISOString(),
          post_count: 0, comment_count: 0, like_received: 0, role: role === 'teacher' ? 'teacher' : 'student',
        });
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        return json({ token, user: publicUser(user, user.role) });
      }

      // --- POSTS (create) ---
      if (path === '/api/posts') {
        const { user, error } = requireAuth(request);
        if (error) return error;
        const { title, content, category_id, tags, images, poll_question } = await getBody(request);
        if (!title || !content || !category_id) return json({ error: '请填写标题、内容和分类' }, 400);
        const post = insert('posts', {
          user_id: user.id, category_id, title, content,
          tags: JSON.stringify(tags || []), images: JSON.stringify(images || []),
          created_at: new Date().toISOString(),
          views: 0, likes: 0, upvotes: 0, downvotes: 0, comment_count: 0, is_pinned: 0, is_hot: 0,
        });
        increment('users', user.id, 'post_count', 1);
        // Create poll if poll_question provided
        if (poll_question && poll_question.trim()) {
          insert('post_polls', {
            post_id: post.id,
            question: poll_question.trim(),
            agree: 0,
            disagree: 0,
          });
        }
        return json({ post: formatPost(post, user.id) });
      }

      // --- 参数化 POST 路由 ---
      let m;

      // POST /api/posts/:id/like
      if (m = path.match(/^\/api\/posts\/(\d+)\/like$/)) {
        const { user, error } = requireAuth(request);
        if (error) return error;
        const postId = parseInt(m[1]);
        const existing = findOne('post_likes', { post_id: postId, user_id: user.id });
        if (existing) {
          remove('post_likes', { post_id: postId, user_id: user.id });
          increment('posts', postId, 'likes', -1);
          const post = findById('posts', postId);
          if (post) increment('users', post.user_id, 'like_received', -1);
          return json({ liked: false, likes: findById('posts', postId).likes });
        } else {
          insert('post_likes', { post_id: postId, user_id: user.id, created_at: new Date().toISOString() });
          increment('posts', postId, 'likes', 1);
          const post = findById('posts', postId);
          if (post) increment('users', post.user_id, 'like_received', 1);
          if (post && post.user_id !== user.id) {
            const liker = findById('users', user.id);
            insert('notifications', {
              user_id: post.user_id, type: 'like',
              content: `${liker.nickname} 赞了你的帖子「${post.title}」`,
              link: `/post/${postId}`, is_read: 0, created_at: new Date().toISOString(),
            });
          }
          return json({ liked: true, likes: findById('posts', postId).likes });
        }
      }

      // POST /api/posts/:id/vote
      if (m = path.match(/^\/api\/posts\/(\d+)\/vote$/)) {
        const { user, error } = requireAuth(request);
        if (error) return error;
        const { vote_type } = await getBody(request);
        if (![1, -1].includes(vote_type)) return json({ error: '无效的投票类型' }, 400);
        const postId = parseInt(m[1]);
        const existing = findOne('post_votes', { post_id: postId, user_id: user.id });
        const post = findById('posts', postId);
        if (!post) return json({ error: '帖子不存在' }, 404);
        if (existing) {
          if (existing.vote_type === vote_type) {
            remove('post_votes', { post_id: postId, user_id: user.id });
            if (vote_type === 1) increment('posts', postId, 'upvotes', -1);
            else increment('posts', postId, 'downvotes', -1);
            return json({ voted: 0, upvotes: post.upvotes, downvotes: post.downvotes });
          } else {
            update('post_votes', existing.id, { vote_type });
            if (vote_type === 1) { increment('posts', postId, 'upvotes', 1); increment('posts', postId, 'downvotes', -1); }
            else { increment('posts', postId, 'upvotes', -1); increment('posts', postId, 'downvotes', 1); }
            return json({ voted: vote_type, upvotes: post.upvotes, downvotes: post.downvotes });
          }
        } else {
          insert('post_votes', { post_id: postId, user_id: user.id, vote_type, created_at: new Date().toISOString() });
          if (vote_type === 1) increment('posts', postId, 'upvotes', 1);
          else increment('posts', postId, 'downvotes', 1);
          return json({ voted: vote_type, upvotes: post.upvotes, downvotes: post.downvotes });
        }
      }

      // POST /api/posts/:id/favorite
      if (m = path.match(/^\/api\/posts\/(\d+)\/favorite$/)) {
        const { user, error } = requireAuth(request);
        if (error) return error;
        const postId = parseInt(m[1]);
        const existing = findOne('favorites', { post_id: postId, user_id: user.id });
        if (existing) {
          remove('favorites', { post_id: postId, user_id: user.id });
          return json({ favorited: false });
        } else {
          insert('favorites', { post_id: postId, user_id: user.id, created_at: new Date().toISOString() });
          return json({ favorited: true });
        }
      }

      // POST /api/posts/:id/poll
      if (m = path.match(/^\/api\/posts\/(\d+)\/poll$/)) {
        const { user, error } = requireAuth(request);
        if (error) return error;
        const { choice } = await getBody(request);
        if (!['agree', 'disagree'].includes(choice)) return json({ error: '无效的投票选项' }, 400);
        const postId = parseInt(m[1]);
        const poll = findOne('post_polls', { post_id: postId });
        if (!poll) return json({ error: '该帖子没有投票' }, 404);
        const existing = findOne('poll_votes', { poll_id: poll.id, user_id: user.id });
        if (existing) return json({ error: '你已经投过票了' }, 400);
        insert('poll_votes', { poll_id: poll.id, user_id: user.id, choice, created_at: new Date().toISOString() });
        increment('post_polls', poll.id, choice, 1);
        const updated = findById('post_polls', poll.id);
        return json({ poll: updated, voted: choice });
      }

      // POST /api/posts/:id/comments
      if (m = path.match(/^\/api\/posts\/(\d+)\/comments$/)) {
        const { user, error } = requireAuth(request);
        if (error) return error;
        const { content, parent_id } = await getBody(request);
        if (!content) return json({ error: '请输入评论内容' }, 400);
        const postId = parseInt(m[1]);
        const comment = insert('comments', {
          post_id: postId, user_id: user.id, parent_id: parent_id || null,
          content, created_at: new Date().toISOString(), likes: 0,
        });
        increment('posts', postId, 'comment_count', 1);
        increment('users', user.id, 'comment_count', 1);
        const post = findById('posts', postId);
        if (post && post.user_id !== user.id) {
          const commenter = findById('users', user.id);
          insert('notifications', {
            user_id: post.user_id, type: 'comment',
            content: `${commenter.nickname} 评论了你的帖子「${post.title}」`,
            link: `/post/${postId}`, is_read: 0, created_at: new Date().toISOString(),
          });
        }
        return json({ comment: formatComment(comment, user.id) });
      }

      // POST /api/comments/:id/like
      if (m = path.match(/^\/api\/comments\/(\d+)\/like$/)) {
        const { user, error } = requireAuth(request);
        if (error) return error;
        const commentId = parseInt(m[1]);
        const existing = findOne('comment_likes', { comment_id: commentId, user_id: user.id });
        if (existing) {
          remove('comment_likes', { comment_id: commentId, user_id: user.id });
          increment('comments', commentId, 'likes', -1);
          return json({ liked: false, likes: findById('comments', commentId).likes });
        } else {
          insert('comment_likes', { comment_id: commentId, user_id: user.id });
          increment('comments', commentId, 'likes', 1);
          return json({ liked: true, likes: findById('comments', commentId).likes });
        }
      }

      // POST /api/suggestions
      if (path === '/api/suggestions') {
        const { user, error } = requireAuth(request);
        if (error) return error;
        const { title, content, category } = await getBody(request);
        if (!title || !content) return json({ error: '请填写标题和内容' }, 400);
        const sug = insert('suggestions', {
          user_id: user.id, title, content, category: category || 'general',
          status: 'pending', priority: 0, created_at: new Date().toISOString(),
          support_count: 0, admin_reply: '',
        });
        const author = findById('users', user.id);
        return json({ suggestion: { ...sug, nickname: author.nickname, avatar_color: author.avatar_color, department: author.department, supported: false } });
      }

      // POST /api/suggestions/:id/support
      if (m = path.match(/^\/api\/suggestions\/(\d+)\/support$/)) {
        const { user, error } = requireAuth(request);
        if (error) return error;
        const sugId = parseInt(m[1]);
        const existing = findOne('suggestion_supports', { suggestion_id: sugId, user_id: user.id });
        if (existing) {
          remove('suggestion_supports', { suggestion_id: sugId, user_id: user.id });
          increment('suggestions', sugId, 'support_count', -1);
          return json({ supported: false, support_count: findById('suggestions', sugId).support_count });
        } else {
          insert('suggestion_supports', { suggestion_id: sugId, user_id: user.id });
          increment('suggestions', sugId, 'support_count', 1);
          return json({ supported: true, support_count: findById('suggestions', sugId).support_count });
        }
      }

      // POST /api/admin/announce
      if (path === '/api/admin/announce') {
        const { user, error } = requireAdmin(request);
        if (error) return error;
        const { title, content, type } = await getBody(request);
        if (!title || !content) return json({ error: '请填写公告标题和内容' }, 400);
        const announcement = insert('announcements', {
          user_id: user.id,
          title,
          content,
          type: type || 'info',
          created_at: new Date().toISOString(),
        });
        return json({ announcement });
      }

      // POST /api/admin/ban/:userId
      if (m = path.match(/^\/api\/admin\/ban\/(\d+)$/)) {
        const { user, error } = requireAdmin(request);
        if (error) return error;
        const userId = parseInt(m[1]);
        const targetUser = findById('users', userId);
        if (!targetUser) return json({ error: '用户不存在' }, 404);
        if (targetUser.role === 'admin') return json({ error: '不能禁言管理员' }, 400);
        const existing = findOne('banned_users', { user_id: userId });
        if (existing) return json({ error: '该用户已被禁言' }, 400);
        const record = insert('banned_users', {
          user_id: userId,
          created_at: new Date().toISOString(),
        });
        return json({ success: true, banned: record });
      }

      // POST /api/admin/poll
      if (path === '/api/admin/poll') {
        const { user, error } = requireAdmin(request);
        if (error) return error;
        const { post_id, question } = await getBody(request);
        if (!post_id || !question) return json({ error: '请提供帖子ID和投票问题' }, 400);
        const post = findById('posts', parseInt(post_id));
        if (!post) return json({ error: '帖子不存在' }, 404);
        const existing = findOne('post_polls', { post_id: parseInt(post_id) });
        if (existing) return json({ error: '该帖子已有投票' }, 400);
        const poll = insert('post_polls', {
          post_id: parseInt(post_id),
          question,
          agree: 0,
          disagree: 0,
        });
        return json({ poll });
      }

      // POST /api/admin/posts/batch
      if (path === '/api/admin/posts/batch') {
        const { user, error } = requireAdmin(request);
        if (error) return error;
        const { action, post_ids } = await getBody(request);
        if (!action || !Array.isArray(post_ids) || post_ids.length === 0) return json({ error: '参数不完整' }, 400);
        const db = getDB();
        let count = 0;
        if (action === 'delete') {
          for (const pid of post_ids) {
            const post = findById('posts', parseInt(pid));
            if (!post) continue;
            const commentIds = db.comments.filter(c => c.post_id === parseInt(pid)).map(c => c.id);
            const pollIds = db.post_polls.filter(p => p.post_id === parseInt(pid)).map(p => p.id);
            db.poll_votes = db.poll_votes.filter(v => !pollIds.includes(v.poll_id));
            db.post_polls = db.post_polls.filter(p => p.post_id !== parseInt(pid));
            db.comment_likes = db.comment_likes.filter(cl => !commentIds.includes(cl.comment_id));
            db.comments = db.comments.filter(c => c.post_id !== parseInt(pid));
            db.post_likes = db.post_likes.filter(l => l.post_id !== parseInt(pid));
            db.post_votes = db.post_votes.filter(v => v.post_id !== parseInt(pid));
            db.favorites = db.favorites.filter(f => f.post_id !== parseInt(pid));
            db.posts = db.posts.filter(p => p.id !== parseInt(pid));
            if (post.user_id) {
              const author = findById('users', post.user_id);
              if (author && author.post_count > 0) author.post_count -= 1;
            }
            count++;
          }
          markDirty();
          return json({ success: true, count, message: `已删除${count}篇帖子` });
        }
        if (action === 'pin' || action === 'unpin') {
          for (const pid of post_ids) {
            update('posts', parseInt(pid), { is_pinned: action === 'pin' ? 1 : 0 });
            count++;
          }
          return json({ success: true, count, message: `${action === 'pin' ? '置顶' : '取消置顶'}${count}篇帖子` });
        }
        if (action === 'hot' || action === 'unhot') {
          for (const pid of post_ids) {
            update('posts', parseInt(pid), { is_hot: action === 'hot' ? 1 : 0 });
            count++;
          }
          return json({ success: true, count, message: `${action === 'hot' ? '设置' : '取消'}热度${count}篇帖子` });
        }
        return json({ error: '未知操作' }, 400);
      }

      // POST /api/admin/users/batch
      if (path === '/api/admin/users/batch') {
        const { user, error } = requireAdmin(request);
        if (error) return error;
        const { action, user_ids } = await getBody(request);
        if (!action || !Array.isArray(user_ids) || user_ids.length === 0) return json({ error: '参数不完整' }, 400);
        const db = getDB();
        let count = 0;
        if (action === 'delete') {
          for (const uid of user_ids) {
            const userId = parseInt(uid);
            if (userId === user.id) continue;
            const targetUser = findById('users', userId);
            if (!targetUser || targetUser.role === 'admin') continue;
            const userPostIds = db.posts.filter(p => p.user_id === userId).map(p => p.id);
            for (const pid of userPostIds) {
              const commentIds = db.comments.filter(c => c.post_id === pid).map(c => c.id);
              const pollIds = db.post_polls.filter(p => p.post_id === pid).map(p => p.id);
              db.poll_votes = db.poll_votes.filter(v => !pollIds.includes(v.poll_id));
              db.post_polls = db.post_polls.filter(p => p.post_id !== pid);
              db.comment_likes = db.comment_likes.filter(cl => !commentIds.includes(cl.comment_id));
              db.comments = db.comments.filter(c => c.post_id !== pid);
              db.post_likes = db.post_likes.filter(l => l.post_id !== pid);
              db.post_votes = db.post_votes.filter(v => v.post_id !== pid);
              db.favorites = db.favorites.filter(f => f.post_id !== pid);
            }
            db.posts = db.posts.filter(p => p.user_id !== userId);
            db.comments = db.comments.filter(c => c.user_id !== userId);
            db.post_likes = db.post_likes.filter(l => l.user_id !== userId);
            db.post_votes = db.post_votes.filter(v => v.user_id !== userId);
            db.comment_likes = db.comment_likes.filter(cl => cl.user_id !== userId);
            db.favorites = db.favorites.filter(f => f.user_id !== userId);
            db.suggestions = db.suggestions.filter(s => s.user_id !== userId);
            db.notifications = db.notifications.filter(n => n.user_id !== userId);
            db.banned_users = db.banned_users.filter(b => b.user_id !== userId);
            db.users = db.users.filter(u => u.id !== userId);
            count++;
          }
          markDirty();
          return json({ success: true, count, message: `已删除${count}个用户` });
        }
        if (action === 'ban' || action === 'unban') {
          for (const uid of user_ids) {
            const userId = parseInt(uid);
            const targetUser = findById('users', userId);
            if (!targetUser || targetUser.role === 'admin') continue;
            if (action === 'ban') {
              if (!findOne('banned_users', { user_id: userId })) {
                insert('banned_users', { user_id: userId, created_at: new Date().toISOString() });
              }
            } else {
              remove('banned_users', { user_id: userId });
            }
            count++;
          }
          return json({ success: true, count, message: `${action === 'ban' ? '禁言' : '解禁'}${count}个用户` });
        }
        return json({ error: '未知操作' }, 400);
      }

      // POST /api/admin/suggestions/batch
      if (path === '/api/admin/suggestions/batch') {
        const { user, error } = requireAdmin(request);
        if (error) return error;
        const { action, suggestion_ids } = await getBody(request);
        if (!action || !Array.isArray(suggestion_ids) || suggestion_ids.length === 0) return json({ error: '参数不完整' }, 400);
        let count = 0;
        if (action === 'delete') {
          for (const sid of suggestion_ids) {
            const sugId = parseInt(sid);
            if (findById('suggestions', sugId)) {
              remove('suggestions', sugId);
              count++;
            }
          }
          return json({ success: true, count, message: `已删除${count}条建议` });
        }
        return json({ error: '未知操作' }, 400);
      }

      // PUT /api/admin/posts/:id (toggle hot/pin)
      // This goes in the PUT section - add before "PUT /api/users/profile"

      // POST /api/admin/create-user
      if (path === '/api/admin/create-user') {
        const { user, error } = requireAdmin(request);
        if (error) return error;
        const { username, password, nickname, department, role, bio } = await getBody(request);
        if (!username || !password || !nickname) return json({ error: '请填写完整信息' }, 400);
        if (username.length < 3) return json({ error: '账号至少3个字符' }, 400);
        if (password.length < 6) return json({ error: '密码至少6个字符' }, 400);
        const existing = findOne('users', { username });
        if (existing) return json({ error: '账号已存在' }, 409);
        const colors = ['#8B2323', '#C9A227', '#6B1A1A', '#D4AF37', '#A52A2A', '#B8860B', '#CD853F', '#DA8A2C', '#8B4513', '#BDB76B', '#9B2226', '#BB9457', '#6D1A1A', '#CFA636', '#7A1F1F', '#DAA520', '#A0522D', '#BC8F8F', '#8B6914', '#D2691E'];
        const avatar_color = colors[Math.floor(Math.random() * colors.length)];
        const hashed = bcrypt.hashSync(password, 8);
        const userRole = role === 'teacher' ? 'teacher' : 'student';
        const newUser = insert('users', {
          username, password: hashed, nickname, avatar_color,
          bio: bio || '欢迎来到翰林校园论坛', department: department || '高中部',
          created_at: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(),
          post_count: 0, comment_count: 0, like_received: 0, role: userRole,
        });
        return json({ success: true, user: { id: newUser.id, username: newUser.username, nickname: newUser.nickname, department: newUser.department, role: newUser.role } });
      }

      // POST /api/admin/post-as-user
      if (path === '/api/admin/post-as-user') {
        const { user, error } = requireAdmin(request);
        if (error) return error;
        const { user_id, title, content, category_id, tags, images } = await getBody(request);
        if (!user_id || !title || !content || !category_id) return json({ error: '参数不完整' }, 400);
        const targetUser = findById('users', parseInt(user_id));
        if (!targetUser) return json({ error: '用户不存在' }, 404);
        const post = insert('posts', {
          user_id: parseInt(user_id), category_id, title, content,
          tags: JSON.stringify(tags || []), images: JSON.stringify(images || []),
          created_at: new Date(Date.now() - Math.random() * 3600000 * 24).toISOString(),
          views: Math.floor(Math.random() * 50) + 10, likes: 0, upvotes: 0, downvotes: 0, comment_count: 0, is_pinned: 0,
        });
        increment('users', parseInt(user_id), 'post_count', 1);
        return json({ success: true, post: formatPost(post, user.id) });
      }
    }

    // ===== GET 路由 =====
    else if (method === 'GET') {
      // GET /api/auth/me
      if (path === '/api/auth/me') {
        const { user, error } = requireAuth(request);
        if (error) return error;
        const fullUser = findById('users', user.id);
        if (!fullUser) return json({ error: '用户不存在' }, 404);
        return json({ user: publicUser(fullUser, user.role) });
      }

      // GET /api/categories
      if (path === '/api/categories') {
        const db = getDB();
        const cats = [...db.categories].sort((a, b) => a.sort_order - b.sort_order);
        const result = cats.map(cat => ({
          ...cat,
          post_count: db.posts.filter(p => p.category_id === cat.id).length,
        }));
        return json({ categories: result });
      }

      // GET /api/posts (list)
      if (path === '/api/posts') {
        const currentUser = getAuthUser(request);
        const currentUserId = currentUser?.id;
        const db = getDB();
        const category = url.searchParams.get('category');
        const sort = url.searchParams.get('sort') || 'latest';
        const search = url.searchParams.get('search');
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '20');
        const offset = (page - 1) * limit;

        let posts = [...db.posts];

        if (category && category !== 'all') {
          const cat = db.categories.find(c => c.slug === category);
          if (cat) posts = posts.filter(p => p.category_id === cat.id);
        }
        if (search) {
          const q = search.toLowerCase();
          posts = posts.filter(p => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q));
        }

        if (sort === 'hot') {
          posts.sort((a, b) => (b.is_pinned - a.is_pinned) || ((b.upvotes + b.likes + b.comment_count * 2) - (a.upvotes + a.likes + a.comment_count * 2)));
        } else if (sort === 'top') {
          posts.sort((a, b) => (b.is_pinned - a.is_pinned) || (b.upvotes - a.upvotes));
        } else {
          posts.sort((a, b) => (b.is_pinned - a.is_pinned) || (new Date(b.created_at) - new Date(a.created_at)));
        }

        const total = posts.length;
        const paged = posts.slice(offset, offset + limit);
        const formatted = paged.map(p => formatPost(p, currentUserId));

        return json({ posts: formatted, total, page, hasMore: offset + formatted.length < total });
      }

      // GET /api/announcements
      if (path === '/api/announcements') {
        const db = getDB();
        const announcements = [...db.announcements]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map(ann => {
            const author = findById('users', ann.user_id);
            return {
              ...ann,
              author: author ? { id: author.id, nickname: author.nickname, avatar_color: author.avatar_color, role: author.role } : null,
            };
          });
        return json({ announcements });
      }

      // GET /api/stats
      if (path === '/api/stats') {
        const db = getDB();
        const today = new Date().toDateString();
        return json({
          users: db.users.length,
          posts: db.posts.length,
          comments: db.comments.length,
          todayPosts: db.posts.filter(p => new Date(p.created_at).toDateString() === today).length,
        });
      }

      // GET /api/notifications
      if (path === '/api/notifications') {
        const { user, error } = requireAuth(request);
        if (error) return error;
        const db = getDB();
        const notifications = db.notifications
          .filter(n => n.user_id === user.id)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 20);
        const unread = db.notifications.filter(n => n.user_id === user.id && n.is_read === 0).length;
        return json({ notifications, unread });
      }

      // GET /api/users/me/favorites
      if (path === '/api/users/me/favorites') {
        const { user, error } = requireAuth(request);
        if (error) return error;
        const db = getDB();
        const favs = db.favorites.filter(f => f.user_id === user.id).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const posts = favs.map(f => formatPost(findById('posts', f.post_id), user.id)).filter(Boolean);
        return json({ posts });
      }

      // GET /api/suggestions
      if (path === '/api/suggestions') {
        const currentUser = getAuthUser(request);
        const db = getDB();
        const status = url.searchParams.get('status');
        const sort = url.searchParams.get('sort') || 'support';
        let suggestions = [...db.suggestions];
        if (status && status !== 'all') suggestions = suggestions.filter(s => s.status === status);
        if (sort === 'latest') {
          suggestions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else {
          suggestions.sort((a, b) => b.support_count - a.support_count);
        }
        const result = suggestions.map(s => {
          const author = findById('users', s.user_id);
          let supported = false;
          if (currentUser) supported = !!findOne('suggestion_supports', { suggestion_id: s.id, user_id: currentUser.id });
          return { ...s, nickname: author?.nickname, avatar_color: author?.avatar_color, department: author?.department, supported };
        });
        return json({ suggestions: result });
      }

      // GET /api/admin/users
      if (path === '/api/admin/users') {
        const { user, error } = requireAdmin(request);
        if (error) return error;
        const db = getDB();
        const users = db.users.map(u => {
          const banned = findOne('banned_users', { user_id: u.id });
          return {
            id: u.id,
            username: u.username,
            nickname: u.nickname,
            avatar_color: u.avatar_color,
            department: u.department,
            role: u.role,
            created_at: u.created_at,
            post_count: u.post_count || 0,
            comment_count: u.comment_count || 0,
            like_received: u.like_received || 0,
            banned: !!banned,
            banned_at: banned ? banned.created_at : null,
          };
        });
        return json({ users });
      }

      // GET /api/admin/suggestions
      if (path === '/api/admin/suggestions') {
        const { user, error } = requireAdmin(request);
        if (error) return error;
        const db = getDB();
        const suggestions = [...db.suggestions].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const result = suggestions.map(s => {
          const author = findById('users', s.user_id);
          const supports = db.suggestion_supports.filter(ss => ss.suggestion_id === s.id);
          return {
            ...s,
            nickname: author?.nickname,
            avatar_color: author?.avatar_color,
            department: author?.department,
            username: author?.username,
            support_count: supports.length,
          };
        });
        return json({ suggestions: result });
      }

      // GET /api/admin/stats
      if (path === '/api/admin/stats') {
        const { user, error } = requireAdmin(request);
        if (error) return error;
        const db = getDB();
        const now = new Date();
        const today = now.toDateString();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 86400000);

        const todayNewUsers = db.users.filter(u => new Date(u.created_at).toDateString() === today).length;
        const todayNewPosts = db.posts.filter(p => new Date(p.created_at).toDateString() === today).length;
        const activeUserIds = new Set(db.posts.filter(p => new Date(p.created_at) >= sevenDaysAgo).map(p => p.user_id));

        return json({
          total_users: db.users.length,
          total_posts: db.posts.length,
          total_comments: db.comments.length,
          today_new_users: todayNewUsers,
          today_new_posts: todayNewPosts,
          active_users: activeUserIds.size,
          banned_users: db.banned_users.length,
        });
      }

      // --- 参数化 GET 路由 ---
      let m;

      // GET /api/posts/:id
      if (m = path.match(/^\/api\/posts\/(\d+)$/)) {
        const postId = parseInt(m[1]);
        const post = findById('posts', postId);
        if (!post) return json({ error: '帖子不存在' }, 404);
        increment('posts', postId, 'views', 1);
        const currentUser = getAuthUser(request);
        return json({ post: formatPost(post, currentUser?.id) });
      }

      // GET /api/posts/:id/comments
      if (m = path.match(/^\/api\/posts\/(\d+)\/comments$/)) {
        const postId = parseInt(m[1]);
        const db = getDB();
        const currentUser = getAuthUser(request);
        const comments = db.comments
          .filter(c => c.post_id === postId && c.parent_id === null)
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        return json({ comments: comments.map(c => formatComment(c, currentUser?.id)) });
      }

      // GET /api/users/:id
      if (m = path.match(/^\/api\/users\/(\d+)$/)) {
        const userId = parseInt(m[1]);
        const targetUser = findById('users', userId);
        if (!targetUser) return json({ error: '用户不存在' }, 404);
        const db = getDB();
        const currentUser = getAuthUser(request);
        const posts = db.posts
          .filter(p => p.user_id === userId)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 10)
          .map(p => formatPost(p, currentUser?.id));
        return json({ user: publicUser(targetUser, currentUser?.role), posts });
      }
    }

    // ===== PUT 路由 =====
    else if (method === 'PUT') {
      // PUT /api/admin/posts/:id (toggle hot/pin + edit title/content)
      let putM;
      if (putM = path.match(/^\/api\/admin\/posts\/(\d+)$/)) {
        const { user, error } = requireAdmin(request);
        if (error) return error;
        const postId = parseInt(putM[1]);
        const post = findById('posts', postId);
        if (!post) return json({ error: '帖子不存在' }, 404);
        const { is_pinned, is_hot, title, content, category_id } = await getBody(request);
        const updates = {};
        if (is_pinned !== undefined) updates.is_pinned = is_pinned ? 1 : 0;
        if (is_hot !== undefined) updates.is_hot = is_hot ? 1 : 0;
        if (title !== undefined && title.trim()) updates.title = title.trim();
        if (content !== undefined) updates.content = content;
        if (category_id !== undefined) updates.category_id = parseInt(category_id);
        update('posts', postId, updates);
        return json({ success: true, post: findById('posts', postId) });
      }

      // PUT /api/admin/suggestions/:id
      if (putM = path.match(/^\/api\/admin\/suggestions\/(\d+)$/)) {
        const { user, error } = requireAdmin(request);
        if (error) return error;
        const sugId = parseInt(putM[1]);
        const sug = findById('suggestions', sugId);
        if (!sug) return json({ error: '建议不存在' }, 404);
        const { status, admin_reply, priority } = await getBody(request);
        const updates = {};
        if (status) updates.status = status;
        if (admin_reply !== undefined) updates.admin_reply = admin_reply;
        if (priority !== undefined) updates.priority = priority;
        update('suggestions', sugId, updates);
        return json({ success: true, suggestion: findById('suggestions', sugId) });
      }

      // PUT /api/admin/users/:id
      if (putM = path.match(/^\/api\/admin\/users\/(\d+)$/)) {
        const { user, error } = requireAdmin(request);
        if (error) return error;
        const userId = parseInt(putM[1]);
        const targetUser = findById('users', userId);
        if (!targetUser) return json({ error: '用户不存在' }, 404);
        const { nickname, bio, department, role } = await getBody(request);
        const updates = {};
        if (nickname !== undefined && nickname.trim()) updates.nickname = nickname.trim();
        if (bio !== undefined) updates.bio = bio;
        if (department !== undefined) updates.department = department;
        if (role !== undefined && ['student', 'teacher'].includes(role)) updates.role = role;
        update('users', userId, updates);
        return json({ success: true, user: publicUser(findById('users', userId), 'admin') });
      }

      // PUT /api/users/profile
      if (path === '/api/users/profile') {
        const { user, error } = requireAuth(request);
        if (error) return error;
        const { nickname, bio, department } = await getBody(request);
        update('users', user.id, { nickname, bio, department });
        return json({ user: publicUser(findById('users', user.id), user.role) });
      }

      // PUT /api/notifications/read
      if (path === '/api/notifications/read') {
        const { user, error } = requireAuth(request);
        if (error) return error;
        const db = getDB();
        db.notifications.forEach(n => { if (n.user_id === user.id) n.is_read = 1; });
        markDirty();
        return json({ success: true });
      }
    }

    // ===== DELETE 路由 =====
    else if (method === 'DELETE') {
      let m;

      // DELETE /api/admin/users/:id
      if (m = path.match(/^\/api\/admin\/users\/(\d+)$/)) {
        const { user, error } = requireAdmin(request);
        if (error) return error;
        const userId = parseInt(m[1]);
        if (userId === user.id) return json({ error: '不能删除自己' }, 400);
        const targetUser = findById('users', userId);
        if (!targetUser) return json({ error: '用户不存在' }, 404);
        if (targetUser.role === 'admin') return json({ error: '不能删除管理员账号' }, 400);
        const db = getDB();
        // 删除用户的所有帖子和相关数据
        const userPostIds = db.posts.filter(p => p.user_id === userId).map(p => p.id);
        for (const pid of userPostIds) {
          const commentIds = db.comments.filter(c => c.post_id === pid).map(c => c.id);
          const pollIds = db.post_polls.filter(p => p.post_id === pid).map(p => p.id);
          db.poll_votes = db.poll_votes.filter(v => !pollIds.includes(v.poll_id));
          db.post_polls = db.post_polls.filter(p => p.post_id !== pid);
          db.comment_likes = db.comment_likes.filter(cl => !commentIds.includes(cl.comment_id));
          db.comments = db.comments.filter(c => c.post_id !== pid);
          db.post_likes = db.post_likes.filter(l => l.post_id !== pid);
          db.post_votes = db.post_votes.filter(v => v.post_id !== pid);
          db.favorites = db.favorites.filter(f => f.post_id !== pid);
        }
        db.posts = db.posts.filter(p => p.user_id !== userId);
        db.comments = db.comments.filter(c => c.user_id !== userId);
        db.post_likes = db.post_likes.filter(l => l.user_id !== userId);
        db.post_votes = db.post_votes.filter(v => v.user_id !== userId);
        db.comment_likes = db.comment_likes.filter(cl => cl.user_id !== userId);
        db.favorites = db.favorites.filter(f => f.user_id !== userId);
        db.suggestions = db.suggestions.filter(s => s.user_id !== userId);
        db.notifications = db.notifications.filter(n => n.user_id !== userId);
        db.users = db.users.filter(u => u.id !== userId);
        markDirty();
        return json({ success: true, message: '用户及所有相关数据已删除' });
      }

      // DELETE /api/admin/posts/:id
      if (m = path.match(/^\/api\/admin\/posts\/(\d+)$/)) {
        const { user, error } = requireAdmin(request);
        if (error) return error;
        const db = getDB();
        const postId = parseInt(m[1]);
        const post = findById('posts', postId);
        if (!post) return json({ error: '帖子不存在' }, 404);

        // 收集所有相关评论 id，用于删除评论点赞
        const commentIds = db.comments.filter(c => c.post_id === postId).map(c => c.id);
        // 删除关联的投票记录（poll_votes 依赖 post_polls）
        const pollIds = db.post_polls.filter(p => p.post_id === postId).map(p => p.id);

        db.poll_votes = db.poll_votes.filter(v => !pollIds.includes(v.poll_id));
        db.post_polls = db.post_polls.filter(p => p.post_id !== postId);
        db.comment_likes = db.comment_likes.filter(cl => !commentIds.includes(cl.comment_id));
        db.comments = db.comments.filter(c => c.post_id !== postId);
        db.post_likes = db.post_likes.filter(l => l.post_id !== postId);
        db.post_votes = db.post_votes.filter(v => v.post_id !== postId);
        db.favorites = db.favorites.filter(f => f.post_id !== postId);
        db.posts = db.posts.filter(p => p.id !== postId);

        // 更新作者帖子数
        if (post.user_id) {
          const author = findById('users', post.user_id);
          if (author && author.post_count > 0) author.post_count -= 1;
        }

        markDirty();
        return json({ success: true });
      }

      // DELETE /api/admin/ban/:userId
      if (m = path.match(/^\/api\/admin\/ban\/(\d+)$/)) {
        const { user, error } = requireAdmin(request);
        if (error) return error;
        const userId = parseInt(m[1]);
        const existing = findOne('banned_users', { user_id: userId });
        if (!existing) return json({ error: '该用户未被禁言' }, 404);
        remove('banned_users', { user_id: userId });
        return json({ success: true });
      }

      // DELETE /api/admin/suggestions/:id
      if (m = path.match(/^\/api\/admin\/suggestions\/(\d+)$/)) {
        const { user, error } = requireAdmin(request);
        if (error) return error;
        const sugId = parseInt(m[1]);
        const sug = findById('suggestions', sugId);
        if (!sug) return json({ error: '建议不存在' }, 404);
        remove('suggestions', sugId);
        return json({ success: true, message: '建议已删除' });
      }

      // DELETE /api/admin/announcements/:id
      if (m = path.match(/^\/api\/admin\/announcements\/(\d+)$/)) {
        const { user, error } = requireAdmin(request);
        if (error) return error;
        const annId = parseInt(m[1]);
        const ann = findById('announcements', annId);
        if (!ann) return json({ error: '公告不存在' }, 404);
        remove('announcements', annId);
        return json({ success: true, message: '公告已删除' });
      }
    }

    return json({ error: 'Not Found' }, 404);
  } catch (e) {
    return json({ error: e.message, stack: e.stack?.split('\n').slice(0,3).join(' ') }, 500);
  }
}

export async function onRequest(context) {
  const { request, env, waitUntil } = context;
  setEnv(env);
  const response = await handleRequest(request);
  // 写操作必须同步保存，确保数据落盘后才返回响应
  await saveDB();
  return response;
}
