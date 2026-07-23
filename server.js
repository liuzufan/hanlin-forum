const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const {
  loadDB, getDB, findById, findOne, findAll,
  insert, update, remove, increment, markDirty, ensureDB,
} = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'hanlin-forum-secret-2026';

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// --- Login Rate Limiting ---
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

// --- Auth Middleware ---
function auth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: '未登录' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: '登录已过期' });
  }
}

function optionalAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) {
    try { req.user = jwt.verify(token, JWT_SECRET); } catch {}
  }
  next();
}

function adminAuth(req, res, next) {
  if (!req.user || req.user.role !== 'admin') return res.status(404).json({ error: 'Not Found' });
  next();
}

// --- Helpers ---
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
  return { ...comment, author: author ? { id: author.id, nickname: author.nickname, avatar_color: author.avatar_color, department: author.department, role: author.role === 'admin' ? 'student' : author.role } : null, liked, replies };
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

// ===== AUTH ROUTES =====

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: '请输入账号和密码' });
  if (!checkLoginRate(req.ip)) return res.status(429).json({ error: '尝试过于频繁，请15分钟后再试' });
  const user = findOne('users', { username });
  if (!user) return res.status(401).json({ error: '账号不存在' });
  if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ error: '密码错误' });
  const banned = findOne('banned_users', { user_id: user.id });
  if (banned) return res.status(403).json({ error: '该账号已被禁言' });
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: publicUser(user, user.role) });
});

app.post('/api/auth/register', (req, res) => {
  const { username, password, nickname, department, role } = req.body;
  if (!username || !password || !nickname) return res.status(400).json({ error: '请填写完整信息' });
  if (username.length < 3) return res.status(400).json({ error: '账号至少3个字符' });
  if (password.length < 6) return res.status(400).json({ error: '密码至少6个字符' });
  const existing = findOne('users', { username });
  if (existing) return res.status(409).json({ error: '账号已存在' });
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
  res.json({ token, user: publicUser(user, user.role) });
});

app.get('/api/auth/me', auth, (req, res) => {
  const user = findById('users', req.user.id);
  if (!user) return res.status(404).json({ error: '用户不存在' });
  res.json({ user: publicUser(user, req.user.role) });
});

// ===== CATEGORY ROUTES =====

app.get('/api/categories', (req, res) => {
  const db = getDB();
  const cats = [...db.categories].sort((a, b) => a.sort_order - b.sort_order);
  const result = cats.map(cat => ({
    ...cat,
    post_count: db.posts.filter(p => p.category_id === cat.id).length,
  }));
  res.json({ categories: result });
});

// ===== POST ROUTES =====

app.get('/api/posts', optionalAuth, (req, res) => {
  const db = getDB();
  const { category, sort = 'latest', search, page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * limit;
  const currentUserId = req.user?.id;

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
  const paged = posts.slice(offset, offset + parseInt(limit));
  const formatted = paged.map(p => formatPost(p, currentUserId));

  res.json({ posts: formatted, total, page: parseInt(page), hasMore: offset + formatted.length < total });
});

app.get('/api/posts/:id', optionalAuth, (req, res) => {
  const postId = parseInt(req.params.id);
  const post = findById('posts', postId);
  if (!post) return res.status(404).json({ error: '帖子不存在' });
  increment('posts', postId, 'views', 1);
  res.json({ post: formatPost(post, req.user?.id) });
});

app.post('/api/posts', auth, (req, res) => {
  const { title, content, category_id, tags, images } = req.body;
  if (!title || !content || !category_id) return res.status(400).json({ error: '请填写标题、内容和分类' });
  const post = insert('posts', {
    user_id: req.user.id, category_id, title, content,
    tags: JSON.stringify(tags || []), images: JSON.stringify(images || []),
    created_at: new Date().toISOString(),
    views: 0, likes: 0, upvotes: 0, downvotes: 0, comment_count: 0, is_pinned: 0,
  });
  increment('users', req.user.id, 'post_count', 1);
  res.json({ post: formatPost(post, req.user.id) });
});

app.post('/api/posts/:id/like', auth, (req, res) => {
  const postId = parseInt(req.params.id);
  const existing = findOne('post_likes', { post_id: postId, user_id: req.user.id });
  if (existing) {
    remove('post_likes', { post_id: postId, user_id: req.user.id });
    increment('posts', postId, 'likes', -1);
    const post = findById('posts', postId);
    if (post) increment('users', post.user_id, 'like_received', -1);
    res.json({ liked: false, likes: findById('posts', postId).likes });
  } else {
    insert('post_likes', { post_id: postId, user_id: req.user.id, created_at: new Date().toISOString() });
    increment('posts', postId, 'likes', 1);
    const post = findById('posts', postId);
    if (post) increment('users', post.user_id, 'like_received', 1);
    if (post && post.user_id !== req.user.id) {
      const liker = findById('users', req.user.id);
      insert('notifications', {
        user_id: post.user_id, type: 'like',
        content: `${liker.nickname} 赞了你的帖子「${post.title}」`,
        link: `/post/${postId}`, is_read: 0, created_at: new Date().toISOString(),
      });
    }
    res.json({ liked: true, likes: findById('posts', postId).likes });
  }
});

app.post('/api/posts/:id/vote', auth, (req, res) => {
  const { vote_type } = req.body;
  if (![1, -1].includes(vote_type)) return res.status(400).json({ error: '无效的投票类型' });
  const postId = parseInt(req.params.id);
  const existing = findOne('post_votes', { post_id: postId, user_id: req.user.id });
  const post = findById('posts', postId);
  if (!post) return res.status(404).json({ error: '帖子不存在' });

  if (existing) {
    if (existing.vote_type === vote_type) {
      remove('post_votes', { post_id: postId, user_id: req.user.id });
      if (vote_type === 1) increment('posts', postId, 'upvotes', -1);
      else increment('posts', postId, 'downvotes', -1);
      res.json({ voted: 0, upvotes: post.upvotes, downvotes: post.downvotes });
    } else {
      update('post_votes', existing.id, { vote_type });
      if (vote_type === 1) { increment('posts', postId, 'upvotes', 1); increment('posts', postId, 'downvotes', -1); }
      else { increment('posts', postId, 'upvotes', -1); increment('posts', postId, 'downvotes', 1); }
      res.json({ voted: vote_type, upvotes: post.upvotes, downvotes: post.downvotes });
    }
  } else {
    insert('post_votes', { post_id: postId, user_id: req.user.id, vote_type, created_at: new Date().toISOString() });
    if (vote_type === 1) increment('posts', postId, 'upvotes', 1);
    else increment('posts', postId, 'downvotes', 1);
    res.json({ voted: vote_type, upvotes: post.upvotes, downvotes: post.downvotes });
  }
});

app.post('/api/posts/:id/favorite', auth, (req, res) => {
  const postId = parseInt(req.params.id);
  const existing = findOne('favorites', { post_id: postId, user_id: req.user.id });
  if (existing) {
    remove('favorites', { post_id: postId, user_id: req.user.id });
    res.json({ favorited: false });
  } else {
    insert('favorites', { post_id: postId, user_id: req.user.id, created_at: new Date().toISOString() });
    res.json({ favorited: true });
  }
});

// ===== POLL ROUTES =====

app.post('/api/posts/:id/poll', auth, (req, res) => {
  const { choice } = req.body;
  if (!['agree', 'disagree'].includes(choice)) return res.status(400).json({ error: '无效的投票选项' });
  const postId = parseInt(req.params.id);
  const poll = findOne('post_polls', { post_id: postId });
  if (!poll) return res.status(404).json({ error: '该帖子没有投票' });
  const existing = findOne('poll_votes', { poll_id: poll.id, user_id: req.user.id });
  if (existing) return res.status(400).json({ error: '你已经投过票了' });
  insert('poll_votes', { poll_id: poll.id, user_id: req.user.id, choice, created_at: new Date().toISOString() });
  increment('post_polls', poll.id, choice, 1);
  const updated = findById('post_polls', poll.id);
  res.json({ poll: updated, voted: choice });
});

// ===== COMMENT ROUTES =====

app.get('/api/posts/:id/comments', optionalAuth, (req, res) => {
  const postId = parseInt(req.params.id);
  const db = getDB();
  const comments = db.comments
    .filter(c => c.post_id === postId && c.parent_id === null)
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  res.json({ comments: comments.map(c => formatComment(c, req.user?.id)) });
});

app.post('/api/posts/:id/comments', auth, (req, res) => {
  const { content, parent_id } = req.body;
  if (!content) return res.status(400).json({ error: '请输入评论内容' });
  const postId = parseInt(req.params.id);
  const comment = insert('comments', {
    post_id: postId, user_id: req.user.id, parent_id: parent_id || null,
    content, created_at: new Date().toISOString(), likes: 0,
  });
  increment('posts', postId, 'comment_count', 1);
  increment('users', req.user.id, 'comment_count', 1);
  const post = findById('posts', postId);
  if (post && post.user_id !== req.user.id) {
    const commenter = findById('users', req.user.id);
    insert('notifications', {
      user_id: post.user_id, type: 'comment',
      content: `${commenter.nickname} 评论了你的帖子「${post.title}」`,
      link: `/post/${postId}`, is_read: 0, created_at: new Date().toISOString(),
    });
  }
  res.json({ comment: formatComment(comment, req.user.id) });
});

app.post('/api/comments/:id/like', auth, (req, res) => {
  const commentId = parseInt(req.params.id);
  const existing = findOne('comment_likes', { comment_id: commentId, user_id: req.user.id });
  if (existing) {
    remove('comment_likes', { comment_id: commentId, user_id: req.user.id });
    increment('comments', commentId, 'likes', -1);
    res.json({ liked: false, likes: findById('comments', commentId).likes });
  } else {
    insert('comment_likes', { comment_id: commentId, user_id: req.user.id });
    increment('comments', commentId, 'likes', 1);
    res.json({ liked: true, likes: findById('comments', commentId).likes });
  }
});

// ===== USER ROUTES =====

app.get('/api/users/:id', optionalAuth, (req, res) => {
  const userId = parseInt(req.params.id);
  const user = findById('users', userId);
  if (!user) return res.status(404).json({ error: '用户不存在' });
  const db = getDB();
  const posts = db.posts
    .filter(p => p.user_id === userId)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 10)
    .map(p => formatPost(p, req.user?.id));
  res.json({ user: publicUser(user, req.user?.role), posts });
});

app.put('/api/users/profile', auth, (req, res) => {
  const { nickname, bio, department } = req.body;
  update('users', req.user.id, { nickname, bio, department });
  res.json({ user: publicUser(findById('users', req.user.id), req.user.role) });
});

app.get('/api/users/me/favorites', auth, (req, res) => {
  const db = getDB();
  const favs = db.favorites.filter(f => f.user_id === req.user.id).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const posts = favs.map(f => formatPost(findById('posts', f.post_id), req.user.id)).filter(Boolean);
  res.json({ posts });
});

// ===== SUGGESTION ROUTES =====

app.get('/api/suggestions', optionalAuth, (req, res) => {
  const db = getDB();
  const { status, sort = 'support' } = req.query;
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
    if (req.user) supported = !!findOne('suggestion_supports', { suggestion_id: s.id, user_id: req.user.id });
    return { ...s, nickname: author?.nickname, avatar_color: author?.avatar_color, department: author?.department, supported };
  });
  res.json({ suggestions: result });
});

app.post('/api/suggestions', auth, (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content) return res.status(400).json({ error: '请填写标题和内容' });
  const sug = insert('suggestions', {
    user_id: req.user.id, title, content, category: category || 'general',
    status: 'pending', priority: 0, created_at: new Date().toISOString(),
    support_count: 0, admin_reply: '',
  });
  const author = findById('users', req.user.id);
  res.json({ suggestion: { ...sug, nickname: author.nickname, avatar_color: author.avatar_color, department: author.department, supported: false } });
});

app.post('/api/suggestions/:id/support', auth, (req, res) => {
  const sugId = parseInt(req.params.id);
  const existing = findOne('suggestion_supports', { suggestion_id: sugId, user_id: req.user.id });
  if (existing) {
    remove('suggestion_supports', { suggestion_id: sugId, user_id: req.user.id });
    increment('suggestions', sugId, 'support_count', -1);
    res.json({ supported: false, support_count: findById('suggestions', sugId).support_count });
  } else {
    insert('suggestion_supports', { suggestion_id: sugId, user_id: req.user.id });
    increment('suggestions', sugId, 'support_count', 1);
    res.json({ supported: true, support_count: findById('suggestions', sugId).support_count });
  }
});

// ===== NOTIFICATION ROUTES =====

app.get('/api/notifications', auth, (req, res) => {
  const db = getDB();
  const notifications = db.notifications
    .filter(n => n.user_id === req.user.id)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 20);
  const unread = db.notifications.filter(n => n.user_id === req.user.id && n.is_read === 0).length;
  res.json({ notifications, unread });
});

app.put('/api/notifications/read', auth, (req, res) => {
  const db = getDB();
  db.notifications.forEach(n => { if (n.user_id === req.user.id) n.is_read = 1; });
  markDirty();
  res.json({ success: true });
});

// ===== ADMIN ROUTES =====

// 获取所有用户列表（含统计信息）
app.get('/api/admin/users', auth, adminAuth, (req, res) => {
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
  res.json({ users });
});

// 删除帖子及其所有关联数据
app.delete('/api/admin/posts/:id', auth, adminAuth, (req, res) => {
  const db = getDB();
  const postId = parseInt(req.params.id);
  const post = findById('posts', postId);
  if (!post) return res.status(404).json({ error: '帖子不存在' });

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
  res.json({ success: true });
});

// 发布公告
app.post('/api/admin/announce', auth, adminAuth, (req, res) => {
  const { title, content, type } = req.body;
  if (!title || !content) return res.status(400).json({ error: '请填写公告标题和内容' });
  const announcement = insert('announcements', {
    user_id: req.user.id,
    title,
    content,
    type: type || 'info',
    created_at: new Date().toISOString(),
  });
  res.json({ announcement });
});

// 获取所有公告（公开接口）
app.get('/api/announcements', (req, res) => {
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
  res.json({ announcements });
});

// 禁言用户
app.post('/api/admin/ban/:userId', auth, adminAuth, (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = findById('users', userId);
  if (!user) return res.status(404).json({ error: '用户不存在' });
  if (user.role === 'admin') return res.status(400).json({ error: '不能禁言管理员' });
  const existing = findOne('banned_users', { user_id: userId });
  if (existing) return res.status(400).json({ error: '该用户已被禁言' });
  const record = insert('banned_users', {
    user_id: userId,
    created_at: new Date().toISOString(),
  });
  res.json({ success: true, banned: record });
});

// 解除禁言
app.delete('/api/admin/ban/:userId', auth, adminAuth, (req, res) => {
  const userId = parseInt(req.params.userId);
  const existing = findOne('banned_users', { user_id: userId });
  if (!existing) return res.status(404).json({ error: '该用户未被禁言' });
  remove('banned_users', { user_id: userId });
  res.json({ success: true });
});

// 管理后台仪表盘统计
app.get('/api/admin/stats', auth, adminAuth, (req, res) => {
  const db = getDB();
  const now = new Date();
  const today = now.toDateString();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 86400000);

  const todayNewUsers = db.users.filter(u => new Date(u.created_at).toDateString() === today).length;
  const todayNewPosts = db.posts.filter(p => new Date(p.created_at).toDateString() === today).length;
  const activeUserIds = new Set(db.posts.filter(p => new Date(p.created_at) >= sevenDaysAgo).map(p => p.user_id));

  res.json({
    total_users: db.users.length,
    total_posts: db.posts.length,
    total_comments: db.comments.length,
    today_new_users: todayNewUsers,
    today_new_posts: todayNewPosts,
    active_users: activeUserIds.size,
    banned_users: db.banned_users.length,
  });
});

// 为帖子创建投票
app.post('/api/admin/poll', auth, adminAuth, (req, res) => {
  const { post_id, question } = req.body;
  if (!post_id || !question) return res.status(400).json({ error: '请提供帖子ID和投票问题' });
  const post = findById('posts', parseInt(post_id));
  if (!post) return res.status(404).json({ error: '帖子不存在' });
  const existing = findOne('post_polls', { post_id: parseInt(post_id) });
  if (existing) return res.status(400).json({ error: '该帖子已有投票' });
  const poll = insert('post_polls', {
    post_id: parseInt(post_id),
    question,
    agree: 0,
    disagree: 0,
  });
  res.json({ poll });
});

// 管理员创建用户
app.post('/api/admin/create-user', auth, adminAuth, (req, res) => {
  const { username, password, nickname, department, role, bio } = req.body;
  if (!username || !password || !nickname) return res.status(400).json({ error: '请填写完整信息' });
  if (username.length < 3) return res.status(400).json({ error: '账号至少3个字符' });
  if (password.length < 6) return res.status(400).json({ error: '密码至少6个字符' });
  const existing = findOne('users', { username });
  if (existing) return res.status(409).json({ error: '账号已存在' });
  const colors = ['#8B2323', '#C9A227', '#6B1A1A', '#D4AF37', '#A52A2A', '#B8860B', '#CD853F', '#DA8A2C', '#8B4513', '#BDB76B', '#9B2226', '#BB9457', '#6D1A1A', '#CFA636', '#7A1F1F', '#DAA520', '#A0522D', '#BC8F8F', '#8B6914', '#D2691E'];
  const avatar_color = colors[Math.floor(Math.random() * colors.length)];
  const hashed = bcrypt.hashSync(password, 8);
  const userRole = role === 'teacher' ? 'teacher' : 'student';
  const user = insert('users', {
    username, password: hashed, nickname, avatar_color,
    bio: bio || '欢迎来到翰林校园论坛', department: department || '高中部',
    created_at: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(),
    post_count: 0, comment_count: 0, like_received: 0, role: userRole,
  });
  res.json({ success: true, user: { id: user.id, username: user.username, nickname: user.nickname, department: user.department, role: user.role } });
});

// 管理员代发帖子
app.post('/api/admin/post-as-user', auth, adminAuth, (req, res) => {
  const { user_id, title, content, category_id, tags, images } = req.body;
  if (!user_id || !title || !content || !category_id) return res.status(400).json({ error: '参数不完整' });
  const targetUser = findById('users', parseInt(user_id));
  if (!targetUser) return res.status(404).json({ error: '用户不存在' });
  const post = insert('posts', {
    user_id: parseInt(user_id), category_id, title, content,
    tags: JSON.stringify(tags || []), images: JSON.stringify(images || []),
    created_at: new Date(Date.now() - Math.random() * 3600000 * 24).toISOString(),
    views: Math.floor(Math.random() * 50) + 10, likes: 0, upvotes: 0, downvotes: 0, comment_count: 0, is_pinned: 0,
  });
  increment('users', parseInt(user_id), 'post_count', 1);
  res.json({ success: true, post: formatPost(post, req.user.id) });
});

// ===== STATS =====

app.get('/api/stats', (req, res) => {
  const db = getDB();
  const today = new Date().toDateString();
  res.json({
    users: db.users.length,
    posts: db.posts.length,
    comments: db.comments.length,
    todayPosts: db.posts.filter(p => new Date(p.created_at).toDateString() === today).length,
  });
});

// SPA fallback
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});

// Start
(async () => {
  await ensureDB();
  app.listen(PORT, () => {
    console.log(`\n  翰林校园论坛已启动`);
    console.log(`  访问地址: http://localhost:${PORT}\n`);
  });
})();
