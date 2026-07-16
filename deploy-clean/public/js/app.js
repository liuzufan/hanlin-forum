/* ============================================
   翰林校园论坛 - 前端应用
   ============================================ */

// ===== State =====
const state = {
  user: null,
  token: localStorage.getItem('token') || null,
  isGuest: localStorage.getItem('isGuest') === 'true',
  categories: [],
  currentRoute: '/',
  posts: [],
  currentPost: null,
  comments: [],
  suggestions: [],
  notifications: [],
  unreadCount: 0,
  searchQuery: '',
  currentCategory: 'all',
  currentSort: 'latest',
  profileUser: null,
  profilePosts: [],
};

// ===== API Client =====
// 前后端同源部署（IGA Pages），API_BASE 始终为空字符串
const API_BASE = '';

const API = {
  async request(url, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (state.token) headers['X-Auth-Token'] = state.token;
    try {
      const res = await fetch(API_BASE + url, { ...options, headers });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '请求失败');
      return data;
    } catch (e) {
      if (e.message === '未登录' || e.message === '登录已过期') {
        state.token = null;
        state.user = null;
        localStorage.removeItem('token');
        if (!window.location.hash.startsWith('#/login')) {
          navigate('/login');
        }
      }
      throw e;
    }
  },
  get: (url) => API.request(url),
  post: (url, body) => API.request(url, { method: 'POST', body: JSON.stringify(body) }),
  put: (url, body) => API.request(url, { method: 'PUT', body: JSON.stringify(body) }),
};

// ===== Utilities =====
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function getAvatarHtml(name, color, size = '') {
  const initial = name ? name.charAt(0) : '?';
  const sizeClass = size === 'lg' ? 'avatar-lg' : size === 'sm' ? 'avatar-sm' : '';
  return `<div class="avatar ${sizeClass}" style="background:${color || '#6366f1'}">${escapeHtml(initial)}</div>`;
}

function formatTime(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr + (dateStr.includes('Z') ? '' : 'Z'));
  const now = new Date();
  const diff = (now - date) / 1000;
  if (diff < 60) return '刚刚';
  if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}天前`;
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
}

function toast(message, type = 'info') {
  const container = $('#toastContainer');
  if (!container) return;
  const icons = { success: 'check-circle', error: 'exclamation-circle', info: 'info-circle' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<i class="fas fa-${icons[type]}"></i><span>${escapeHtml(message)}</span>`;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('fade-out');
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

function navigate(path) {
  window.location.hash = path;
}

function getRoute() {
  const hash = window.location.hash.slice(1) || '/';
  return hash;
}

// ===== Auth =====
async function checkAuth() {
  if (!state.token) return false;
  try {
    const data = await API.get('/api/auth/me');
    state.user = data.user;
    return true;
  } catch {
    return false;
  }
}

function logout() {
  state.token = null;
  state.user = null;
  state.isGuest = false;
  localStorage.removeItem('token');
  localStorage.removeItem('isGuest');
  navigate('/login');
  toast('已退出登录', 'info');
}

function enterGuestMode() {
  state.isGuest = true;
  state.user = null;
  state.token = null;
  localStorage.setItem('isGuest', 'true');
  localStorage.removeItem('token');
  navigate('/');
  toast('已进入游客模式，可浏览帖子', 'info');
  render();
}

function exitGuestMode() {
  state.isGuest = false;
  localStorage.removeItem('isGuest');
  navigate('/login');
  render();
}

function requireAuth(action) {
  action = action || '操作';
  if (state.isGuest) {
    toast('游客模式无法' + action + '，请先登录', 'info');
    setTimeout(function() { navigate('/login'); }, 1000);
    return false;
  }
  if (!state.user) {
    navigate('/login');
    return false;
  }
  return true;
}

function selectRole(role) {
  document.querySelectorAll('.role-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.role === role);
  });
}

// ===== Load Categories =====
async function loadCategories() {
  try {
    const data = await API.get('/api/categories');
    state.categories = data.categories;
  } catch (e) {
    console.error('Failed to load categories:', e);
  }
}

function getCategoryBySlug(slug) {
  return state.categories.find(c => c.slug === slug);
}

// ===== Render: Layout Shell =====
async function renderShell(content) {
  const isAuthPage = getRoute().startsWith('/login');
  if (isAuthPage) return content;

  const userAvatar = state.user
    ? `<div class="user-avatar-btn" onclick="navigate('/profile/${state.user.id}')">
         ${getAvatarHtml(state.user.nickname, state.user.avatar_color)}
         <span class="text-sm truncate" style="max-width:80px">${escapeHtml(state.user.nickname)}</span>
       </div>`
    : state.isGuest
    ? `<span class="guest-badge"><i class="fas fa-eye"></i> 游客</span>
       <button class="btn btn-primary btn-sm" onclick="navigate('/login')">登录</button>`
    : `<button class="btn btn-primary btn-sm" onclick="navigate('/login')">登录</button>`;

  return `
    <header class="app-header">
      <div class="logo" onclick="navigate('/')">
        <div class="logo-icon"><i class="fas fa-feather"></i></div>
        <span class="gradient-text">翰林论坛</span>
      </div>
      <div class="header-search">
        <i class="fas fa-search search-icon"></i>
        <input type="text" placeholder="搜索帖子..." id="searchInput"
          value="${escapeHtml(state.searchQuery)}"
          onkeypress="if(event.key==='Enter')doSearch(this.value)">
      </div>
      <div class="header-actions">
        <button class="icon-btn" onclick="navigate('/notifications')" title="通知">
          <i class="fas fa-bell"></i>
          ${state.unreadCount > 0 ? `<span class="badge">${state.unreadCount}</span>` : ''}
        </button>
        <button class="icon-btn mobile-search" onclick="toggleMobileSearch()" title="搜索">
          <i class="fas fa-search"></i>
        </button>
        ${userAvatar}
      </div>
    </header>
    <div class="app-layout">
      ${renderSidebar()}
      <main class="main-content" id="mainContent">${content}</main>
      ${await renderRightSidebar()}
    </div>
    ${!state.isGuest ? `<button class="fab" onclick="navigate('/create')" title="发帖"><i class="fas fa-plus"></i></button>` : ''}
    <nav class="mobile-nav">
      <button class="mobile-nav-item ${getRoute() === '/' ? 'active' : ''}" onclick="navigate('/')">
        <i class="fas fa-home nav-icon"></i><span>首页</span>
      </button>
      <button class="mobile-nav-item ${getRoute().includes('/category/') ? 'active' : ''}" onclick="navigate('/categories')">
        <i class="fas fa-th-large nav-icon"></i><span>分类</span>
      </button>
      <button class="mobile-nav-item ${getRoute() === '/suggestions' ? 'active' : ''}" onclick="navigate('/suggestions')">
        <i class="fas fa-lightbulb nav-icon"></i><span>建议</span>
      </button>
      <button class="mobile-nav-item ${getRoute().startsWith('/profile') ? 'active' : ''}" onclick="navigate('/profile/${state.user?.id || ''}')">
        <i class="fas fa-user nav-icon"></i><span>我的</span>
      </button>
    </nav>
  `;
}

function renderSidebar() {
  const route = getRoute();
  const catSlug = route.match(/\/category\/(.+)/)?.[1];
  
  let navItems = `
    <div class="nav-item ${route === '/' ? 'active' : ''}" onclick="navigate('/')">
      <i class="fas fa-fire nav-icon"></i><span>热门</span>
    </div>
    <div class="nav-item ${route === '/latest' ? 'active' : ''}" onclick="navigate('/latest')">
      <i class="fas fa-clock nav-icon"></i><span>最新</span>
    </div>
    <div class="nav-item ${route === '/suggestions' ? 'active' : ''}" onclick="navigate('/suggestions')">
      <i class="fas fa-lightbulb nav-icon"></i><span>建议反馈</span>
    </div>
    ${state.user && state.user.role === 'admin' ? `
    <div class="nav-item ${route === '/admin' ? 'active' : ''}" onclick="navigate('/admin')" style="color:var(--c-burgundy);font-weight:700">
      <i class="fas fa-shield-alt nav-icon"></i><span>管理后台</span>
    </div>` : ''}
  `;

  let catItems = state.categories.map(cat => `
    <div class="nav-item ${catSlug === cat.slug ? 'active' : ''}" onclick="navigate('/category/${cat.slug}')">
      <span class="cat-dot" style="background:${cat.color}"></span>
      <span>${escapeHtml(cat.name)}</span>
      <span class="nav-count">${cat.post_count}</span>
    </div>
  `).join('');

  return `
    <aside class="sidebar">
      ${!state.isGuest ? `<div class="glass" style="padding:16px;margin-bottom:16px"><button class="btn btn-primary btn-block" onclick="navigate('/create')"><i class="fas fa-pen"></i> 发布帖子</button></div>` : ''}
      <div class="nav-section">
        <div class="nav-title">导航</div>
        ${navItems}
      </div>
      <div class="nav-section">
        <div class="nav-title">版块</div>
        ${catItems}
      </div>
    </aside>
  `;
}

async function renderRightSidebar() {
  if (window.innerWidth < 1024) return '';
  
  let stats = { users: 0, posts: 0, comments: 0 };
  try {
    stats = await API.get('/api/stats');
  } catch {}

  let trending = state.posts.slice(0, 5);
  if (trending.length === 0 && state.posts.length === 0) {
    try {
      const data = await API.get('/api/posts?sort=hot&limit=5');
      trending = data.posts;
    } catch {}
  }

  return `
    <aside class="sidebar right-sidebar" style="width:280px">
      <div class="glass stats-card">
        <h3 style="font-size:0.9rem;margin-bottom:4px"><i class="fas fa-chart-line" style="color:var(--c-teal)"></i> 论坛统计</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">${stats.users}</div>
            <div class="stat-label">注册用户</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${stats.posts}</div>
            <div class="stat-label">帖子总数</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${stats.comments}</div>
            <div class="stat-label">评论总数</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${stats.todayPosts}</div>
            <div class="stat-label">今日新帖</div>
          </div>
        </div>
      </div>
      <div class="glass trending-card">
        <h3 style="font-size:0.9rem;margin-bottom:8px"><i class="fas fa-arrow-trend-up" style="color:var(--c-amber)"></i> 热门帖子</h3>
        ${trending.map((p, i) => `
          <div class="trending-item" onclick="navigate('/post/${p.id}')">
            <span class="trending-rank">${i + 1}</span>
            <span class="trending-title">${escapeHtml(p.title)}</span>
          </div>
        `).join('') || '<div class="text-sm text-tertiary text-center" style="padding:20px">暂无数据</div>'}
      </div>
      <div class="glass" style="padding:16px">
        <div style="font-size:0.8rem;color:var(--text-tertiary);line-height:1.8">
          <div style="font-weight:600;color:var(--text-secondary);margin-bottom:8px">关于翰林论坛</div>
          <p>东莞市翰林实验学校官方校园论坛</p>
          <p>集幼儿园、小学、初中、高中、国际部为一体</p>
          <p style="margin-top:8px;color:var(--c-teal)">以百年恒心办最好学校</p>
        </div>
      </div>
    </aside>
  `;
}

// ===== Render: Auth Page =====
function renderAuthPage() {
  return `
    <div class="auth-page">
      <div class="glass auth-card">
        <div class="auth-logo">
          <div class="logo-icon"><i class="fas fa-feather"></i></div>
          <h1 class="auth-title">翰林校园论坛</h1>
          <p class="auth-subtitle">东莞市翰林实验学校 · 学子交流平台</p>
        </div>
        <div class="auth-tabs">
          <button class="auth-tab active" id="tabLogin" onclick="switchAuthTab('login')">登录</button>
          <button class="auth-tab" id="tabRegister" onclick="switchAuthTab('register')">注册</button>
        </div>
        <div id="loginForm">
          <div class="form-group">
            <label class="form-label">账号</label>
            <input type="text" class="form-input" id="loginUsername" placeholder="输入账号" autocomplete="username">
          </div>
          <div class="form-group">
            <label class="form-label">密码</label>
            <input type="password" class="form-input" id="loginPassword" placeholder="输入密码" autocomplete="current-password">
          </div>
          <div id="loginError"></div>
          <button class="btn btn-primary btn-block btn-lg" onclick="handleLogin()" id="loginBtn">
            <i class="fas fa-sign-in-alt"></i> 登录
          </button>
          <button class="btn btn-ghost btn-block" style="margin-top:10px" onclick="enterGuestMode()">
            <i class="fas fa-eye"></i> 游客访问（仅浏览）
          </button>
        </div>
        <div id="registerForm" style="display:none">
          <div class="form-group">
            <label class="form-label">昵称</label>
            <input type="text" class="form-input" id="regNickname" placeholder="你的昵称">
          </div>
          <div class="form-group">
            <label class="form-label">账号</label>
            <input type="text" class="form-input" id="regUsername" placeholder="设置账号（至少3个字符）">
          </div>
          <div class="form-group">
            <label class="form-label">密码</label>
            <input type="password" class="form-input" id="regPassword" placeholder="设置密码（至少6个字符）">
          </div>
          <div class="form-group">
            <label class="form-label">身份</label>
            <div class="role-selector">
              <button type="button" class="role-btn active" data-role="student" onclick="selectRole('student')">学生</button>
              <button type="button" class="role-btn" data-role="teacher" onclick="selectRole('teacher')">老师</button>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">学部</label>
            <select class="form-input" id="regDepartment">
              <option value="">请选择学部</option>
              <option value="小学部">小学部</option>
              <option value="初中部">初中部</option>
              <option value="高中部">高中部</option>
              <option value="国际部">国际部</option>
            </select>
          </div>
          <div id="regError"></div>
          <button class="btn btn-primary btn-block btn-lg" onclick="handleRegister()">
            <i class="fas fa-user-plus"></i> 注册
          </button>
        </div>
      </div>
    </div>
  `;
}

function switchAuthTab(tab) {
  $('#tabLogin').classList.toggle('active', tab === 'login');
  $('#tabRegister').classList.toggle('active', tab === 'register');
  $('#loginForm').style.display = tab === 'login' ? 'block' : 'none';
  $('#registerForm').style.display = tab === 'register' ? 'block' : 'none';
}

async function handleLogin() {
  const username = $('#loginUsername').value.trim();
  const password = $('#loginPassword').value;
  const errEl = $('#loginError');
  errEl.innerHTML = '';
  if (!username || !password) {
    errEl.innerHTML = '<div class="form-error">请输入账号和密码</div>';
    return;
  }
  const btn = $('#loginBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 登录中...';
  try {
    const data = await API.post('/api/auth/login', { username, password });
    state.token = data.token;
    state.user = data.user;
    localStorage.setItem('token', data.token);
    toast('登录成功，欢迎回来！', 'success');
    navigate('/');
    await loadCategories();
    await loadNotifications();
    render();
  } catch (e) {
    errEl.innerHTML = `<div class="form-error">${escapeHtml(e.message)}</div>`;
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> 登录';
  }
}

async function handleRegister() {
  const nickname = $('#regNickname').value.trim();
  const username = $('#regUsername').value.trim();
  const password = $('#regPassword').value;
  const department = $('#regDepartment').value;
  var role = document.querySelector('.role-btn.active') ? document.querySelector('.role-btn.active').dataset.role : 'student';
  const errEl = $('#regError');
  errEl.innerHTML = '';
  if (!nickname || !username || !password) {
    errEl.innerHTML = '<div class="form-error">请填写完整信息</div>';
    return;
  }
  try {
    const data = await API.post('/api/auth/register', { nickname, username, password, department, role: role });
    state.token = data.token;
    state.user = data.user;
    localStorage.setItem('token', data.token);
    toast('注册成功，欢迎加入翰林论坛！', 'success');
    navigate('/');
    await loadCategories();
    render();
  } catch (e) {
    errEl.innerHTML = `<div class="form-error">${escapeHtml(e.message)}</div>`;
  }
}

// ===== Render: Post List =====
function renderPostList(posts, loading = false) {
  if (loading) return '<div class="loading-spinner"></div>';
  if (!posts || posts.length === 0) {
    return `
      <div class="empty-state glass">
        <div class="empty-icon"><i class="fas fa-comments"></i></div>
        <h3>暂无帖子</h3>
        <p style="margin-top:8px">快来发布第一篇帖子吧！</p>
        <button class="btn btn-primary" style="margin-top:16px" onclick="navigate('/create')">
          <i class="fas fa-pen"></i> 发布帖子
        </button>
      </div>
    `;
  }

  return posts.map((post, i) => {
    const cat = post.category || { name: '未分类', color: '#64748b' };
    const author = post.author || { nickname: '匿名', avatar_color: '#64748b', department: '' };
    return `
      <div class="glass post-card" style="--cat-color:${cat.color}" onclick="navigate('/post/${post.id}')">
        ${post.is_pinned ? '<span class="post-pin-badge"><i class="fas fa-thumbtack"></i> 置顶</span>' : ''}
        <span class="post-category-tag" style="background:${cat.color}22;color:${cat.color}">
          <span class="cat-dot" style="background:${cat.color}"></span>${escapeHtml(cat.name)}
        </span>
        <h3 class="post-title">${escapeHtml(post.title)}</h3>
        <p class="post-excerpt">${escapeHtml(post.content.substring(0, 200))}</p>
        ${post.tags && post.tags.length > 0 ? `
          <div class="post-tags">
            ${post.tags.map(t => `<span class="post-tag">#${escapeHtml(t)}</span>`).join('')}
          </div>
        ` : ''}
        <div class="post-meta">
          <div class="post-meta-item">
            ${getAvatarHtml(author.nickname, author.avatar_color, 'sm')}
            <span>${escapeHtml(author.nickname)}</span>
            <span style="color:var(--text-tertiary)">·</span>
            <span style="color:var(--text-tertiary)">${escapeHtml(author.department)}</span>
          </div>
          <span class="post-meta-item"><i class="far fa-clock"></i> ${formatTime(post.created_at)}</span>
          <span class="post-meta-item"><i class="far fa-eye"></i> ${post.views}</span>
          <span class="post-meta-item ${post.liked ? 'liked' : ''}"><i class="${post.liked ? 'fas' : 'far'} fa-heart"></i> ${post.likes}</span>
          <span class="post-meta-item ${post.voted === 1 ? 'voted-up' : ''}"><i class="fas fa-arrow-up"></i> ${post.upvotes - post.downvotes}</span>
          <span class="post-meta-item"><i class="far fa-comment"></i> ${post.comment_count}</span>
        </div>
      </div>
    `;
  }).join('');
}

// ===== Render: Home Page =====
async function renderHomePage(sort = 'latest', category = 'all', search = '') {
  let posts = [];
  try {
    const params = new URLSearchParams({ sort, limit: 20 });
    if (category && category !== 'all') params.set('category', category);
    if (search) params.set('search', search);
    const data = await API.get(`/api/posts?${params}`);
    posts = data.posts;
    state.posts = posts;
  } catch (e) {
    toast('加载帖子失败', 'error');
  }

  let announcements = [];
  try {
    const annData = await API.get('/api/announcements');
    announcements = annData.announcements || [];
  } catch {}

  const sortTabs = [
    { key: 'latest', label: '最新', icon: 'clock' },
    { key: 'hot', label: '热门', icon: 'fire' },
    { key: 'top', label: '精华', icon: 'star' },
  ];

  const pageTitle = search ? `搜索: "${search}"` : 
    (category !== 'all' ? (getCategoryBySlug(category)?.name || '分类') : '全部帖子');

  return `
    <div class="flex items-center justify-between mb-4" style="gap:12px;flex-wrap:wrap">
      <h1 class="page-title" style="font-size:1.4rem">${escapeHtml(pageTitle)}</h1>
      <div class="flex gap-2">
        ${sortTabs.map(t => `
          <button class="btn btn-sm ${sort === t.key ? 'btn-primary' : 'btn-ghost'}" onclick="changeSort('${t.key}')">
            <i class="fas fa-${t.icon}"></i> ${t.label}
          </button>
        `).join('')}
      </div>
    </div>
    ${announcements.length > 0 ? announcements.slice(0, 2).map(a => `
      <div class="glass announcement-banner">
        <i class="fas fa-bullhorn ann-icon"></i>
        <div class="ann-content">
          <div class="ann-title">${escapeHtml(a.title)}</div>
          <div class="ann-text">${escapeHtml(a.content)}</div>
          <div class="ann-time">${formatTime(a.created_at)} · ${escapeHtml(a.author?.nickname || '管理员')}</div>
        </div>
      </div>
    `).join('') : ''}
    <div id="postList">${renderPostList(posts)}</div>
  `;
}

function changeSort(sort) {
  state.currentSort = sort;
  render();
}

// ===== Render: Post Detail =====
function renderPoll(post) {
  if (!post.poll) return '';
  var poll = post.poll;
  var total = poll.agree + poll.disagree;
  var agreePct = total > 0 ? Math.round(poll.agree / total * 100) : 0;
  var disagreePct = total > 0 ? 100 - agreePct : 0;
  
  if (post.poll_voted) {
    return '<div class="glass poll-card">' +
      '<div class="poll-question">' + escapeHtml(poll.question) + '</div>' +
      '<div class="poll-result">' +
        '<div class="poll-result-row">' +
          '<span class="poll-label">认同</span>' +
          '<div class="poll-bar"><div class="poll-bar-fill agree" style="width:' + agreePct + '%"></div></div>' +
          '<span class="poll-pct">' + agreePct + '%</span>' +
          '<span class="poll-count">' + poll.agree + '人</span>' +
        '</div>' +
        '<div class="poll-result-row">' +
          '<span class="poll-label">不认同</span>' +
          '<div class="poll-bar"><div class="poll-bar-fill disagree" style="width:' + disagreePct + '%"></div></div>' +
          '<span class="poll-pct">' + disagreePct + '%</span>' +
          '<span class="poll-count">' + poll.disagree + '人</span>' +
        '</div>' +
      '</div>' +
      '<div class="poll-total">共 ' + total + ' 人参与投票 · 你投了"' + (post.poll_voted === 'agree' ? '认同' : '不认同') + '"</div>' +
    '</div>';
  } else {
    return '<div class="glass poll-card">' +
      '<div class="poll-question">' + escapeHtml(poll.question) + '</div>' +
      (state.user ? 
        '<div class="poll-actions">' +
          '<button class="poll-btn agree" onclick="voteOnPoll(' + post.id + ', \'agree\')"><i class="fas fa-thumbs-up"></i> 认同</button>' +
          '<button class="poll-btn disagree" onclick="voteOnPoll(' + post.id + ', \'disagree\')"><i class="fas fa-thumbs-down"></i> 不认同</button>' +
        '</div>'
      : '<div class="poll-login-hint">登录后参与投票</div>') +
      '<div class="poll-total">共 ' + total + ' 人参与投票</div>' +
    '</div>';
  }
}

async function voteOnPoll(postId, choice) {
  if (!requireAuth('投票')) return;
  try {
    var data = await API.post('/api/posts/' + postId + '/poll', { choice: choice });
    if (state.currentPost && state.currentPost.id === postId) {
      state.currentPost.poll = data.poll;
      state.currentPost.poll_voted = data.voted;
      render();
      toast('投票成功', 'success');
    }
  } catch (e) { toast(e.message, 'error'); }
}

async function renderPostDetail(postId) {
  let post = null, comments = [];
  try {
    const [postData, commentData] = await Promise.all([
      API.get(`/api/posts/${postId}`),
      API.get(`/api/posts/${postId}/comments`),
    ]);
    post = postData.post;
    comments = commentData.comments;
    state.currentPost = post;
    state.comments = comments;
  } catch (e) {
    return `<div class="empty-state glass"><div class="empty-icon"><i class="fas fa-exclamation-circle"></i></div><h3>帖子不存在</h3><button class="btn btn-primary" style="margin-top:16px" onclick="navigate('/')">返回首页</button></div>`;
  }

  const cat = post.category || {};
  const author = post.author || {};

  return `
    <div class="glass post-detail">
      <div style="margin-bottom:12px">
        <span class="post-category-tag" style="background:${cat.color || '#6366f1'}22;color:${cat.color || '#6366f1'}">
          <span class="cat-dot" style="background:${cat.color || '#6366f1'}"></span>${escapeHtml(cat.name || '未分类')}
        </span>
        ${post.is_pinned ? '<span class="post-pin-badge"><i class="fas fa-thumbtack"></i> 置顶</span>' : ''}
      </div>
      <h1 class="post-detail-title">${escapeHtml(post.title)}</h1>
      <div class="post-detail-meta">
        ${getAvatarHtml(author.nickname, author.avatar_color)}
        <div>
          <div style="font-weight:600;font-size:0.9rem">${escapeHtml(author.nickname)} <span style="color:var(--text-tertiary);font-weight:400;font-size:0.8rem">${escapeHtml(author.department || '')}</span></div>
          <div style="font-size:0.75rem;color:var(--text-tertiary)">${formatTime(post.created_at)} · ${post.views} 次浏览</div>
        </div>
        <button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="navigate('/profile/${author.id}')">查看主页</button>
      </div>
      <div class="post-detail-content">${escapeHtml(post.content)}</div>
      ${post.tags && post.tags.length > 0 ? `
        <div class="post-tags" style="margin-top:16px">
          ${post.tags.map(t => `<span class="post-tag">#${escapeHtml(t)}</span>`).join('')}
        </div>
      ` : ''}
      ${renderPoll(post)}
      <div class="post-detail-actions">
        <div class="vote-group">
          <button class="vote-btn ${post.voted === 1 ? 'active up' : ''}" onclick="votePost(${post.id}, 1)">
            <i class="fas fa-arrow-up"></i> 赞
          </button>
          <span class="vote-score">${post.upvotes - post.downvotes}</span>
          <button class="vote-btn ${post.voted === -1 ? 'active down' : ''}" onclick="votePost(${post.id}, -1)">
            <i class="fas fa-arrow-down"></i> 踩
          </button>
        </div>
        <button class="action-btn ${post.liked ? 'active like' : ''}" onclick="likePost(${post.id})">
          <i class="${post.liked ? 'fas' : 'far'} fa-heart"></i> ${post.likes}
        </button>
        <button class="action-btn ${post.favorited ? 'active fav' : ''}" onclick="favoritePost(${post.id})">
          <i class="${post.favorited ? 'fas' : 'far'} fa-bookmark"></i> ${post.favorited ? '已收藏' : '收藏'}
        </button>
        <button class="action-btn" onclick="sharePost(${post.id})">
          <i class="fas fa-share-alt"></i> 分享
        </button>
      </div>
    </div>
    <div class="glass comments-section">
      <h3 style="margin-bottom:16px"><i class="fas fa-comments" style="color:var(--c-teal)"></i> 评论 (${post.comment_count})</h3>
      ${state.user ? `
        <div class="comment-input-area">
          ${getAvatarHtml(state.user.nickname, state.user.avatar_color, 'sm')}
          <textarea id="commentInput" placeholder="写下你的评论..." rows="2"></textarea>
          <button class="btn btn-primary btn-sm" onclick="submitComment(${post.id})">发送</button>
        </div>
      ` : state.isGuest ? `
        <div class="guest-comment-hint">
          <i class="fas fa-lock"></i> 游客模式下无法评论，<a onclick="navigate('/login')">登录</a> 后参与讨论
        </div>
      ` : `
        <div class="glass" style="padding:16px;text-align:center;margin-bottom:16px">
          <span class="text-sm text-tertiary">登录后参与评论 </span>
          <button class="btn btn-primary btn-sm" onclick="navigate('/login')">登录</button>
        </div>
      `}
      <div id="commentsList">${renderComments(comments)}</div>
    </div>
  `;
}

function renderComments(comments) {
  if (!comments || comments.length === 0) {
    return '<div class="empty-state" style="padding:30px"><div class="text-tertiary text-sm">暂无评论，快来抢沙发！</div></div>';
  }
  return comments.map(c => renderCommentItem(c)).join('');
}

function renderCommentItem(comment) {
  const author = comment.author || {};
  var roleTag = comment.author.role === 'teacher' ? '<span class="comment-role-tag teacher">老师</span>' : '<span class="comment-role-tag student">学生</span>';
  return `
    <div class="comment-item">
      ${getAvatarHtml(author.nickname, author.avatar_color, 'sm')}
      <div class="comment-body">
        <div class="comment-header">
          <span class="comment-author">${escapeHtml(author.nickname)}</span>
          ${roleTag}
          <span style="font-size:0.7rem;color:var(--text-tertiary);background:var(--bg-surface);padding:1px 6px;border-radius:4px">${escapeHtml(author.department || '')}</span>
          <span class="comment-time">${formatTime(comment.created_at)}</span>
        </div>
        <div class="comment-content">${escapeHtml(comment.content)}</div>
        <div class="comment-actions">
          <button class="comment-action ${comment.liked ? 'active' : ''}" onclick="likeComment(${comment.id})">
            <i class="${comment.liked ? 'fas' : 'far'} fa-heart"></i> ${comment.likes}
          </button>
          ${state.user ? `
            <button class="comment-action" onclick="toggleReply(${comment.id})">
              <i class="far fa-comment"></i> 回复
            </button>
          ` : ''}
        </div>
        <div id="replyArea-${comment.id}" style="display:none;margin-top:8px">
          <div class="comment-input-area" style="padding:8px 0">
            <textarea id="replyInput-${comment.id}" placeholder="回复 ${escapeHtml(author.nickname)}..." rows="2" style="min-height:36px;font-size:0.85rem"></textarea>
            <button class="btn btn-primary btn-sm" onclick="submitReply(${comment.id})">回复</button>
          </div>
        </div>
        ${comment.replies && comment.replies.length > 0 ? `
          <div style="margin-top:8px">
            ${comment.replies.map(r => renderCommentItem(r, true)).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// ===== Render: Create Post =====
function renderCreatePost() {
  if (!state.user) {
    navigate('/login');
    return '';
  }
  return `
    <div class="glass create-post-card">
      <h1 style="margin-bottom:24px"><i class="fas fa-pen-fancy" style="color:var(--c-teal)"></i> 发布新帖</h1>
      <div class="form-group">
        <label class="form-label">标题</label>
        <input type="text" class="form-input" id="postTitle" placeholder="给帖子起个标题..." maxlength="100">
      </div>
      <div class="form-group">
        <label class="form-label">版块</label>
        <select class="form-input" id="postCategory">
          ${state.categories.map(c => `<option value="${c.id}">${escapeHtml(c.name)} - ${escapeHtml(c.description)}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">内容</label>
        <textarea class="form-input" id="postContent" placeholder="分享你的想法..." rows="10" style="min-height:200px"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">标签（按回车添加）</label>
        <div class="tag-input-area" id="tagInputArea">
          <input type="text" class="tag-input" id="tagInput" placeholder="输入标签..." onkeydown="handleTagInput(event)">
        </div>
      </div>
      <div id="postError"></div>
      <div class="flex gap-2">
        <button class="btn btn-ghost" onclick="navigate('/')">取消</button>
        <button class="btn btn-primary" onclick="submitPost()" id="submitPostBtn">
          <i class="fas fa-paper-plane"></i> 发布
        </button>
      </div>
    </div>
  `;
}

let postTags = [];
function handleTagInput(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const input = e.target;
    const tag = input.value.trim();
    if (tag && !postTags.includes(tag) && postTags.length < 5) {
      postTags.push(tag);
      renderTags();
    }
    input.value = '';
  }
}
function renderTags() {
  const area = $('#tagInputArea');
  const input = $('#tagInput');
  const tagsHtml = postTags.map((t, i) => `
    <span class="tag-chip">#${escapeHtml(t)} <span class="remove" onclick="removeTag(${i})"><i class="fas fa-times"></i></span></span>
  `).join('');
  area.innerHTML = tagsHtml + '<input type="text" class="tag-input" id="tagInput" placeholder="输入标签..." onkeydown="handleTagInput(event)">';
  $('#tagInput').focus();
}
function removeTag(idx) {
  postTags.splice(idx, 1);
  renderTags();
}

async function submitPost() {
  const title = $('#postTitle').value.trim();
  const content = $('#postContent').value.trim();
  const category_id = parseInt($('#postCategory').value);
  if (!title || !content) {
    $('#postError').innerHTML = '<div class="form-error">请填写标题和内容</div>';
    return;
  }
  const btn = $('#submitPostBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发布中...';
  try {
    const data = await API.post('/api/posts', { title, content, category_id, tags: postTags });
    postTags = [];
    toast('发布成功！', 'success');
    navigate(`/post/${data.post.id}`);
  } catch (e) {
    $('#postError').innerHTML = `<div class="form-error">${escapeHtml(e.message)}</div>`;
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> 发布';
  }
}

// ===== Render: Profile =====
async function renderProfile(userId) {
  if (!userId && state.user) userId = state.user.id;
  if (!userId) { navigate('/login'); return ''; }
  
  let user, posts;
  try {
    const data = await API.get(`/api/users/${userId}`);
    user = data.user;
    posts = data.posts;
    state.profileUser = user;
    state.profilePosts = posts;
  } catch (e) {
    return `<div class="empty-state glass"><div class="empty-icon"><i class="fas fa-user-slash"></i></div><h3>用户不存在</h3></div>`;
  }

  const isMe = state.user && state.user.id === user.id;

  return `
    <div class="glass profile-header">
      <div style="position:relative;z-index:1">
        ${getAvatarHtml(user.nickname, user.avatar_color, 'lg')}
        <h2 style="margin-top:12px">${escapeHtml(user.nickname)}</h2>
        <p style="color:var(--text-secondary);font-size:0.85rem;margin-top:4px">
          <i class="fas fa-school"></i> ${escapeHtml(user.department || '未设置')}
          ${user.role === 'admin' ? '<span style="color:var(--c-amber);margin-left:8px"><i class="fas fa-shield-alt"></i> 管理员</span>' : ''}
        </p>
        <p style="color:var(--text-tertiary);font-size:0.8rem;margin-top:8px">${escapeHtml(user.bio || '这个人很懒，什么都没留下')}</p>
        <div class="profile-stats">
          <div class="profile-stat">
            <div class="profile-stat-value gradient-text">${user.post_count}</div>
            <div class="profile-stat-label">帖子</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-value gradient-text">${user.comment_count}</div>
            <div class="profile-stat-label">评论</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-value gradient-text">${user.like_received}</div>
            <div class="profile-stat-label">获赞</div>
          </div>
        </div>
        ${isMe ? `
          <div style="margin-top:20px;display:flex;gap:8px;justify-content:center">
            <button class="btn btn-ghost btn-sm" onclick="editProfile()"><i class="fas fa-edit"></i> 编辑资料</button>
            <button class="btn btn-ghost btn-sm" onclick="navigate('/favorites')"><i class="fas fa-bookmark"></i> 我的收藏</button>
            <button class="btn btn-ghost btn-sm" onclick="logout()"><i class="fas fa-sign-out-alt"></i> 退出</button>
          </div>
        ` : ''}
      </div>
    </div>
    <h3 style="margin-bottom:12px;padding:0 4px"><i class="fas fa-file-alt" style="color:var(--c-teal)"></i> TA的帖子</h3>
    <div>${renderPostList(posts)}</div>
  `;
}

function editProfile() {
  const user = state.user;
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  modal.innerHTML = `
    <div class="glass modal-content">
      <h2 style="margin-bottom:20px"><i class="fas fa-user-edit" style="color:var(--c-teal)"></i> 编辑资料</h2>
      <div class="form-group">
        <label class="form-label">昵称</label>
        <input type="text" class="form-input" id="editNickname" value="${escapeHtml(user.nickname)}">
      </div>
      <div class="form-group">
        <label class="form-label">学部</label>
        <select class="form-input" id="editDepartment">
          <option value="">请选择</option>
          <option value="小学部" ${user.department === '小学部' ? 'selected' : ''}>小学部</option>
          <option value="初中部" ${user.department === '初中部' ? 'selected' : ''}>初中部</option>
          <option value="高中部" ${user.department === '高中部' ? 'selected' : ''}>高中部</option>
          <option value="国际部" ${user.department === '国际部' ? 'selected' : ''}>国际部</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">个人简介</label>
        <textarea class="form-input" id="editBio" rows="3">${escapeHtml(user.bio || '')}</textarea>
      </div>
      <div class="flex gap-2" style="margin-top:16px">
        <button class="btn btn-ghost btn-block" onclick="this.closest('.modal-overlay').remove()">取消</button>
        <button class="btn btn-primary btn-block" onclick="saveProfile()">保存</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

async function saveProfile() {
  const nickname = $('#editNickname').value.trim();
  const department = $('#editDepartment').value;
  const bio = $('#editBio').value.trim();
  try {
    const data = await API.put('/api/users/profile', { nickname, department, bio });
    state.user = data.user;
    toast('资料更新成功', 'success');
    $$('.modal-overlay').forEach(m => m.remove());
    render();
  } catch (e) {
    toast(e.message, 'error');
  }
}

// ===== Render: Favorites =====
async function renderFavorites() {
  if (!state.user) { navigate('/login'); return ''; }
  let posts = [];
  try {
    const data = await API.get('/api/users/me/favorites');
    posts = data.posts;
  } catch {}
  return `
    <h1 class="page-title mb-4" style="font-size:1.4rem"><i class="fas fa-bookmark"></i> 我的收藏</h1>
    ${renderPostList(posts)}
  `;
}

// ===== Render: Suggestions =====
async function renderSuggestionsPage() {
  let suggestions = [];
  try {
    const data = await API.get('/api/suggestions?sort=support');
    suggestions = data.suggestions;
    state.suggestions = suggestions;
  } catch (e) {
    toast('加载建议失败', 'error');
  }

  const statusLabels = {
    pending: { label: '待处理', class: 'status-pending' },
    accepted: { label: '已采纳', class: 'status-accepted' },
    reviewing: { label: '审核中', class: 'status-reviewing' },
    done: { label: '已完成', class: 'status-done' },
  };

  return `
    <div class="flex items-center justify-between mb-4" style="gap:12px;flex-wrap:wrap">
      <h1 class="page-title" style="font-size:1.4rem"><i class="fas fa-lightbulb"></i> 建议反馈</h1>
      ${state.user ? `<button class="btn btn-primary" onclick="navigate('/create-suggestion')"><i class="fas fa-plus"></i> 提建议</button>` : ''}
    </div>
    <div class="glass" style="padding:16px;margin-bottom:16px;font-size:0.85rem;color:var(--text-secondary)">
      <i class="fas fa-info-circle" style="color:var(--c-teal)"></i>
      在这里提出你对学校和论坛的建议，其他同学可以支持你的建议。被采纳的建议将得到回复和处理。
    </div>
    ${suggestions.map((s, i) => {
      const st = statusLabels[s.status] || statusLabels.pending;
      const author = { nickname: s.nickname, avatar_color: s.avatar_color, department: s.department };
      return `
        <div class="glass suggestion-card">
          <div class="flex items-center justify-between mb-2" style="gap:8px;flex-wrap:wrap">
            <div class="flex items-center gap-2">
              <span class="suggestion-status ${st.class}">${st.label}</span>
              <span class="text-xs text-tertiary">${formatTime(s.created_at)}</span>
            </div>
            <button class="suggestion-support ${s.supported ? 'active' : ''}" onclick="supportSuggestion(${s.id})">
              <i class="fas fa-thumbs-up"></i> 支持 ${s.support_count}
            </button>
          </div>
          <h3 style="font-size:1.05rem;margin-bottom:8px">${escapeHtml(s.title)}</h3>
          <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.7">${escapeHtml(s.content)}</p>
          <div class="flex items-center gap-2 mt-2" style="font-size:0.8rem">
            ${getAvatarHtml(author.nickname, author.avatar_color, 'sm')}
            <span>${escapeHtml(author.nickname)}</span>
            <span style="color:var(--text-tertiary)">·</span>
            <span style="color:var(--text-tertiary)">${escapeHtml(author.department || '')}</span>
          </div>
          ${s.admin_reply ? `
            <div class="glass" style="padding:12px;margin-top:12px;font-size:0.85rem;border-left:3px solid var(--c-teal)">
              <div style="font-weight:600;color:var(--c-teal);margin-bottom:4px"><i class="fas fa-reply"></i> 管理员回复</div>
              <div style="color:var(--text-secondary)">${escapeHtml(s.admin_reply)}</div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('') || '<div class="empty-state glass"><div class="empty-icon"><i class="fas fa-lightbulb"></i></div><h3>暂无建议</h3><p style="margin-top:8px">快来提出第一个建议吧！</p></div>'}
  `;
}

function renderCreateSuggestion() {
  if (!state.user) { navigate('/login'); return ''; }
  return `
    <div class="glass create-post-card">
      <h1 style="margin-bottom:24px"><i class="fas fa-lightbulb" style="color:var(--c-amber)"></i> 提交建议</h1>
      <div class="form-group">
        <label class="form-label">标题</label>
        <input type="text" class="form-input" id="sugTitle" placeholder="简要描述你的建议" maxlength="100">
      </div>
      <div class="form-group">
        <label class="form-label">建议类别</label>
        <select class="form-input" id="sugCategory">
          <option value="general">综合</option>
          <option value="campus">校园设施</option>
          <option value="canteen">食堂餐饮</option>
          <option value="facility">教学设备</option>
          <option value="activity">活动组织</option>
          <option value="welfare">学生福利</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">详细内容</label>
        <textarea class="form-input" id="sugContent" placeholder="详细说明你的建议..." rows="8"></textarea>
      </div>
      <div id="sugError"></div>
      <div class="flex gap-2">
        <button class="btn btn-ghost" onclick="navigate('/suggestions')">取消</button>
        <button class="btn btn-primary" onclick="submitSuggestion()" id="submitSugBtn">
          <i class="fas fa-paper-plane"></i> 提交
        </button>
      </div>
    </div>
  `;
}

async function submitSuggestion() {
  const title = $('#sugTitle').value.trim();
  const content = $('#sugContent').value.trim();
  const category = $('#sugCategory').value;
  if (!title || !content) {
    $('#sugError').innerHTML = '<div class="form-error">请填写标题和内容</div>';
    return;
  }
  const btn = $('#submitSugBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 提交中...';
  try {
    await API.post('/api/suggestions', { title, content, category });
    toast('建议提交成功！', 'success');
    navigate('/suggestions');
  } catch (e) {
    $('#sugError').innerHTML = `<div class="form-error">${escapeHtml(e.message)}</div>`;
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> 提交';
  }
}

// ===== Render: Notifications =====
async function renderNotifications() {
  if (!state.user) { navigate('/login'); return ''; }
  let notifications = [];
  try {
    const data = await API.get('/api/notifications');
    notifications = data.notifications;
    state.unreadCount = data.unread;
    if (data.unread > 0) {
      API.put('/api/notifications/read').then(() => { state.unreadCount = 0; });
    }
  } catch {}

  return `
    <h1 class="page-title mb-4" style="font-size:1.4rem"><i class="fas fa-bell"></i> 通知中心</h1>
    ${notifications.length === 0 ? `
      <div class="empty-state glass"><div class="empty-icon"><i class="fas fa-bell-slash"></i></div><h3>暂无通知</h3></div>
    ` : notifications.map(n => `
      <div class="glass post-card" style="cursor:pointer" onclick="navigate('${n.link || '/'}')">
        <div class="flex items-center gap-3">
          <div style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.1rem;
            background:${n.type === 'like' ? 'rgba(236,72,153,0.15)' : n.type === 'comment' ? 'rgba(20,184,166,0.15)' : 'rgba(59,130,246,0.15)'};
            color:${n.type === 'like' ? 'var(--c-pink)' : n.type === 'comment' ? 'var(--c-teal)' : 'var(--c-blue)'}">
            <i class="fas fa-${n.type === 'like' ? 'heart' : n.type === 'comment' ? 'comment' : 'bell'}"></i>
          </div>
          <div class="flex-1">
            <div style="font-size:0.9rem">${escapeHtml(n.content)}</div>
            <div style="font-size:0.75rem;color:var(--text-tertiary);margin-top:2px">${formatTime(n.created_at)}</div>
          </div>
          ${!n.is_read ? '<div style="width:8px;height:8px;border-radius:50%;background:var(--c-pink)"></div>' : ''}
        </div>
      </div>
    `).join('')}
  `;
}

// ===== Render: Categories Page (mobile) =====
function renderCategoriesPage() {
  return `
    <h1 class="page-title mb-4" style="font-size:1.4rem"><i class="fas fa-th-large"></i> 论坛版块</h1>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px">
      ${state.categories.map((cat, i) => `
        <div class="glass post-card" style="text-align:center;cursor:pointer" onclick="navigate('/category/${cat.slug}')">
          <div style="width:48px;height:48px;border-radius:14px;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;color:white;background:${cat.color}">
            <i class="fas fa-${cat.icon}"></i>
          </div>
          <h3 style="font-size:0.95rem">${escapeHtml(cat.name)}</h3>
          <p style="font-size:0.75rem;color:var(--text-tertiary);margin-top:4px;line-height:1.5">${escapeHtml(cat.description)}</p>
          <div style="margin-top:8px;font-size:0.75rem;color:${cat.color};font-weight:600">${cat.post_count} 帖子</div>
        </div>
      `).join('')}
    </div>
  `;
}

// ===== Actions =====
async function likePost(postId) {
  if (!requireAuth('点赞')) return;
  try {
    const data = await API.post(`/api/posts/${postId}/like`);
    if (state.currentPost && state.currentPost.id === postId) {
      state.currentPost.liked = data.liked;
      state.currentPost.likes = data.likes;
      render();
    }
  } catch (e) { toast(e.message, 'error'); }
}

async function votePost(postId, voteType) {
  if (!requireAuth('投票')) return;
  try {
    const data = await API.post(`/api/posts/${postId}/vote`, { vote_type: voteType });
    if (state.currentPost && state.currentPost.id === postId) {
      state.currentPost.voted = data.voted;
      state.currentPost.upvotes = data.upvotes;
      state.currentPost.downvotes = data.downvotes;
      render();
    }
  } catch (e) { toast(e.message, 'error'); }
}

async function favoritePost(postId) {
  if (!requireAuth('收藏')) return;
  try {
    const data = await API.post(`/api/posts/${postId}/favorite`);
    if (state.currentPost && state.currentPost.id === postId) {
      state.currentPost.favorited = data.favorited;
      render();
      toast(data.favorited ? '已收藏' : '已取消收藏', 'success');
    }
  } catch (e) { toast(e.message, 'error'); }
}

async function submitComment(postId) {
  if (!requireAuth('评论')) return;
  const input = $('#commentInput');
  const content = input.value.trim();
  if (!content) return;
  try {
    const data = await API.post(`/api/posts/${postId}/comments`, { content });
    state.comments.push(data.comment);
    input.value = '';
    render();
    toast('评论成功', 'success');
  } catch (e) { toast(e.message, 'error'); }
}

function toggleReply(commentId) {
  const area = $(`#replyArea-${commentId}`);
  area.style.display = area.style.display === 'none' ? 'block' : 'none';
  if (area.style.display === 'block') $(`#replyInput-${commentId}`).focus();
}

async function submitReply(commentId) {
  const input = $(`#replyInput-${commentId}`);
  const content = input.value.trim();
  if (!content) return;
  const postId = state.currentPost.id;
  try {
    const data = await API.post(`/api/posts/${postId}/comments`, { content, parent_id: commentId });
    // Find parent comment and add reply
    const parent = state.comments.find(c => c.id === commentId);
    if (parent) {
      if (!parent.replies) parent.replies = [];
      parent.replies.push(data.comment);
    }
    render();
    toast('回复成功', 'success');
  } catch (e) { toast(e.message, 'error'); }
}

async function likeComment(commentId) {
  if (!state.user) { navigate('/login'); return; }
  try {
    const data = await API.post(`/api/comments/${commentId}/like`);
    // Update comment in state
    function updateComment(comments) {
      for (let c of comments) {
        if (c.id === commentId) { c.liked = data.liked; c.likes = data.likes; return true; }
        if (c.replies && updateComment(c.replies)) return true;
      }
      return false;
    }
    updateComment(state.comments);
    render();
  } catch (e) { toast(e.message, 'error'); }
}

async function supportSuggestion(sugId) {
  if (!requireAuth('支持')) return;
  try {
    const data = await API.post(`/api/suggestions/${sugId}/support`);
    const sug = state.suggestions.find(s => s.id === sugId);
    if (sug) { sug.supported = data.supported; sug.support_count = data.support_count; }
    render();
  } catch (e) { toast(e.message, 'error'); }
}

function sharePost(postId) {
  const url = `${window.location.origin}/#/post/${postId}`;
  const post = state.currentPost;
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  modal.innerHTML = `
    <div class="glass modal-content">
      <h2 style="margin-bottom:8px;text-align:center"><i class="fas fa-share-alt" style="color:var(--c-teal)"></i> 分享帖子</h2>
      <p style="text-align:center;font-size:0.85rem;color:var(--text-secondary);margin-bottom:8px">${escapeHtml(post?.title || '')}</p>
      <div class="share-grid">
        <div class="share-option" onclick="shareToWechat('${url}', '${escapeHtml(post?.title || '')}')">
          <div class="share-icon share-wechat"><i class="fab fa-weixin"></i></div>
          <span class="share-label">微信</span>
        </div>
        <div class="share-option" onclick="shareToWeibo('${url}', '${escapeHtml(post?.title || '')}')">
          <div class="share-icon share-weibo"><i class="fab fa-weibo"></i></div>
          <span class="share-label">微博</span>
        </div>
        <div class="share-option" onclick="shareToQQ('${url}', '${escapeHtml(post?.title || '')}')">
          <div class="share-icon share-qq"><i class="fab fa-qq"></i></div>
          <span class="share-label">QQ</span>
        </div>
        <div class="share-option" onclick="copyLink('${url}')">
          <div class="share-icon share-link"><i class="fas fa-link"></i></div>
          <span class="share-label">复制链接</span>
        </div>
      </div>
      <button class="btn btn-ghost btn-block" onclick="this.closest('.modal-overlay').remove()">取消</button>
    </div>
  `;
  document.body.appendChild(modal);
}

function shareToWechat(url, title) {
  // WeChat JS-SDK share (requires official account configuration)
  // For demo, we show a QR code or guide
  const modal = $$('.modal-overlay');
  modal.forEach(m => m.remove());
  toast('请使用微信扫描页面二维码或复制链接分享', 'info');
  copyLink(url);
}

function shareToWeibo(url, title) {
  window.open(`https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
}

function shareToQQ(url, title) {
  window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
}

function copyLink(url) {
  navigator.clipboard.writeText(url).then(() => {
    toast('链接已复制到剪贴板', 'success');
  }).catch(() => {
    const input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    toast('链接已复制', 'success');
  });
}

function doSearch(query) {
  state.searchQuery = query.trim();
  navigate(`/search?q=${encodeURIComponent(state.searchQuery)}`);
}

function toggleMobileSearch() {
  const search = $('.header-search');
  if (search) {
    search.style.display = search.style.display === 'none' ? 'block' : 'none';
    if (search.style.display === 'block') $('#searchInput').focus();
  }
}

// ===== Load Notifications =====
async function loadNotifications() {
  if (!state.token) return;
  try {
    const data = await API.get('/api/notifications');
    state.unreadCount = data.unread;
  } catch {}
}

// ===== Router =====
async function render() {
  const route = getRoute();
  const app = $('#app');
  let content = '';

  // Auth page
  if (route.startsWith('/login')) {
    app.innerHTML = renderAuthPage();
    return;
  }

  // Check auth for protected routes
  if (!state.user && state.token) {
    await checkAuth();
  }

  // Route matching
  if (route === '/' || route === '/latest' || route === '/hot' || route === '/top') {
    const sort = route === '/hot' ? 'hot' : route === '/top' ? 'top' : state.currentSort;
    content = await renderHomePage(sort, 'all', '');
  } else if (route.startsWith('/category/')) {
    const slug = route.split('/')[2];
    content = await renderHomePage(state.currentSort, slug, '');
  } else if (route.startsWith('/search')) {
    const q = new URLSearchParams(route.split('?')[1]).get('q') || '';
    content = await renderHomePage('latest', 'all', q);
  } else if (route.startsWith('/post/')) {
    const id = route.split('/')[2];
    content = await renderPostDetail(id);
  } else if (route === '/create') {
    content = renderCreatePost();
  } else if (route.startsWith('/profile/')) {
    const id = route.split('/')[2];
    content = await renderProfile(id);
  } else if (route === '/profile') {
    content = await renderProfile();
  } else if (route === '/favorites') {
    content = await renderFavorites();
  } else if (route === '/suggestions') {
    content = await renderSuggestionsPage();
  } else if (route === '/create-suggestion') {
    content = renderCreateSuggestion();
  } else if (route === '/notifications') {
    content = await renderNotifications();
  } else if (route === '/categories') {
    content = renderCategoriesPage();
  } else if (route === '/admin') {
    if (!state.user || state.user.role !== 'admin') {
      content = `<div class="empty-state glass"><div class="empty-icon"><i class="fas fa-lock"></i></div><h3>权限不足</h3><p>仅管理员可访问</p><button class="btn btn-primary" style="margin-top:16px" onclick="navigate('/')">返回首页</button></div>`;
    } else {
      content = await renderAdminPanel();
    }
  } else {
    content = `<div class="empty-state glass"><div class="empty-icon"><i class="fas fa-compass"></i></div><h3>页面不存在</h3><button class="btn btn-primary" style="margin-top:16px" onclick="navigate('/')">返回首页</button></div>`;
  }

  app.innerHTML = await renderShell(content);
  window.scrollTo(0, 0);
}

// ===== Admin Panel =====
var adminTab = 'dashboard';

async function renderAdminPanel() {
  let stats = {}, users = [], posts = [], announcements = [];
  
  try {
    stats = await API.get('/api/admin/stats');
  } catch {}
  try {
    const ud = await API.get('/api/admin/users');
    users = ud.users || [];
  } catch {}
  try {
    const pd = await API.get('/api/posts?limit=50');
    posts = pd.posts || [];
  } catch {}
  try {
    const ad = await API.get('/api/announcements');
    announcements = ad.announcements || [];
  } catch {}

  state.adminData = { users, posts, stats };

  return `
    <div class="glass admin-panel">
      <h1 style="margin-bottom:6px"><i class="fas fa-shield-alt" style="color:var(--c-burgundy)"></i> 管理后台</h1>
      <p style="color:var(--text-tertiary);font-size:0.85rem;margin-bottom:20px">欢迎回来，${escapeHtml(state.user.nickname)}</p>
      
      <div class="admin-tabs">
        <button class="admin-tab ${adminTab === 'dashboard' ? 'active' : ''}" onclick="switchAdminTab('dashboard')">仪表盘</button>
        <button class="admin-tab ${adminTab === 'users' ? 'active' : ''}" onclick="switchAdminTab('users')">用户管理</button>
        <button class="admin-tab ${adminTab === 'posts' ? 'active' : ''}" onclick="switchAdminTab('posts')">帖子管理</button>
        <button class="admin-tab ${adminTab === 'announce' ? 'active' : ''}" onclick="switchAdminTab('announce')">发布公告</button>
        <button class="admin-tab ${adminTab === 'poll' ? 'active' : ''}" onclick="switchAdminTab('poll')">发起投票</button>
        <button class="admin-tab ${adminTab === 'create-user' ? 'active' : ''}" onclick="switchAdminTab('create-user')"><i class="fas fa-user-plus"></i> 创建用户</button>
        <button class="admin-tab ${adminTab === 'post-as-user' ? 'active' : ''}" onclick="switchAdminTab('post-as-user')"><i class="fas fa-pencil-alt"></i> 代发帖子</button>
      </div>
      
      <div id="adminContent">
        ${adminTab === 'dashboard' ? renderAdminDashboard(stats) : ''}
        ${adminTab === 'users' ? renderAdminUsers(users) : ''}
        ${adminTab === 'posts' ? renderAdminPosts(posts) : ''}
        ${adminTab === 'announce' ? renderAdminAnnounceForm() : ''}
        ${adminTab === 'poll' ? renderAdminPollForm(posts) : ''}
        ${adminTab === 'create-user' ? renderAdminCreateUser() : ''}
        ${adminTab === 'post-as-user' ? renderAdminPostAsUser() : ''}
      </div>
    </div>
  `;
}

function switchAdminTab(tab) {
  adminTab = tab;
  render();
}

function renderAdminDashboard(stats) {
  return `
    <div class="admin-stats-grid">
      <div class="glass admin-stat-card">
        <div class="admin-stat-value">${stats.total_users || 0}</div>
        <div class="admin-stat-label">注册用户</div>
      </div>
      <div class="glass admin-stat-card">
        <div class="admin-stat-value">${stats.total_posts || 0}</div>
        <div class="admin-stat-label">帖子总数</div>
      </div>
      <div class="glass admin-stat-card">
        <div class="admin-stat-value">${stats.total_comments || 0}</div>
        <div class="admin-stat-label">评论总数</div>
      </div>
      <div class="glass admin-stat-card">
        <div class="admin-stat-value">${stats.today_new_users || 0}</div>
        <div class="admin-stat-label">今日新用户</div>
      </div>
      <div class="glass admin-stat-card">
        <div class="admin-stat-value">${stats.today_new_posts || 0}</div>
        <div class="admin-stat-label">今日新帖</div>
      </div>
      <div class="glass admin-stat-card">
        <div class="admin-stat-value">${stats.active_users || 0}</div>
        <div class="admin-stat-label">7日活跃</div>
      </div>
      <div class="glass admin-stat-card">
        <div class="admin-stat-value">${stats.banned_users || 0}</div>
        <div class="admin-stat-label">禁言用户</div>
      </div>
      <div class="glass admin-stat-card">
        <div class="admin-stat-value">${stats.today_comments || 0}</div>
        <div class="admin-stat-label">今日评论</div>
      </div>
    </div>
  `;
}

function renderAdminUsers(users) {
  if (!users.length) return '<div class="empty-state"><p>暂无用户数据</p></div>';
  return `
    <p style="margin-bottom:12px;color:var(--text-secondary);font-size:0.85rem">共 ${users.length} 个用户</p>
    ${users.map(u => `
      <div class="admin-user-row">
        ${getAvatarHtml(u.nickname, u.avatar_color, 'sm')}
        <div class="admin-user-info">
          <div class="admin-user-name">
            ${escapeHtml(u.nickname)}
            <span class="admin-badge ${u.role}">${u.role === 'admin' ? '管理员' : u.role === 'teacher' ? '老师' : '学生'}</span>
            ${u.banned ? '<span class="admin-badge banned">已禁言</span>' : ''}
          </div>
          <div class="admin-user-meta">${escapeHtml(u.department || '未设置')} · ${u.post_count || 0}帖 · ${u.comment_count || 0}评 · ${formatTime(u.created_at)}</div>
        </div>
        <div class="admin-user-actions">
          ${u.role !== 'admin' ? (u.banned 
            ? `<button class="admin-ban-btn" onclick="unbanUser(${u.id})"><i class="fas fa-unlock"></i> 解禁</button>`
            : `<button class="admin-ban-btn" onclick="banUser(${u.id})"><i class="fas fa-ban"></i> 禁言</button>`)
            : ''}
        </div>
      </div>
    `).join('')}
  `;
}

function renderAdminPosts(posts) {
  if (!posts.length) return '<div class="empty-state"><p>暂无帖子</p></div>';
  return `
    <p style="margin-bottom:12px;color:var(--text-secondary);font-size:0.85rem">共 ${posts.length} 篇帖子</p>
    ${posts.map(p => `
      <div class="admin-user-row">
        <div class="admin-user-info">
          <div class="admin-user-name">${escapeHtml(p.title)}</div>
          <div class="admin-user-meta">${escapeHtml(p.author?.nickname || '未知')} · ${p.comment_count || 0}评 · ${formatTime(p.created_at)}</div>
        </div>
        <div class="admin-user-actions">
          <button class="admin-ban-btn" onclick="navigate('/post/${p.id}')"><i class="fas fa-eye"></i> 查看</button>
          <button class="admin-delete-btn" onclick="adminDeletePost(${p.id}, '${escapeHtml(p.title).replace(/'/g, "\\'")}')"><i class="fas fa-trash"></i> 删除</button>
        </div>
      </div>
    `).join('')}
  `;
}

function renderAdminAnnounceForm() {
  return `
    <div style="max-width:500px">
      <div class="form-group">
        <label class="form-label">公告标题</label>
        <input type="text" class="form-input" id="annTitle" placeholder="输入公告标题">
      </div>
      <div class="form-group">
        <label class="form-label">公告内容</label>
        <textarea class="form-input" id="annContent" placeholder="输入公告内容" rows="5"></textarea>
      </div>
      <button class="btn btn-primary" onclick="createAnnouncement()"><i class="fas fa-bullhorn"></i> 发布公告</button>
    </div>
    ${announcements_global && announcements_global.length ? `
      <h3 style="margin-top:24px;margin-bottom:12px">历史公告</h3>
      ${announcements_global.map(a => `
        <div class="glass" style="padding:14px;margin-bottom:8px">
          <div style="font-weight:700;font-size:0.88rem">${escapeHtml(a.title)}</div>
          <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px">${escapeHtml(a.content)}</div>
          <div style="font-size:0.72rem;color:var(--text-tertiary);margin-top:4px">${formatTime(a.created_at)}</div>
        </div>
      `).join('')}
    ` : ''}
  `;
}

var announcements_global = [];

function renderAdminPollForm(posts) {
  return `
    <div style="max-width:500px">
      <div class="form-group">
        <label class="form-label">选择帖子</label>
        <select class="form-input" id="pollPostId">
          <option value="">请选择帖子</option>
          ${posts.map(p => `<option value="${p.id}">${escapeHtml(p.title)}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">投票问题</label>
        <input type="text" class="form-input" id="pollQuestion" placeholder="例如：你认同这个提议吗？">
      </div>
      <button class="btn btn-gold" onclick="adminCreatePoll()"><i class="fas fa-chart-bar"></i> 创建投票</button>
    </div>
    <p style="margin-top:16px;color:var(--text-tertiary);font-size:0.8rem">创建投票后，该帖子详情页将显示投票卡片，用户可以选择"认同"或"不认同"。</p>
  `;
}

function renderAdminCreateUser() {
  return `
    <div class="admin-section">
      <h3 class="page-title" style="font-size:1.1rem;margin-bottom:16px">创建新用户</h3>
      <p style="color:var(--text-secondary);font-size:0.82rem;margin-bottom:16px">创建的用户将显示为普通用户，无法被区分。</p>
      <div class="glass" style="padding:20px">
        <div class="form-group">
          <label class="form-label">用户名（登录账号）</label>
          <input type="text" id="newUserUsername" class="form-input" placeholder="如 student_2026_01" style="background:rgba(255,255,255,0.6);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:10px 14px;font-size:0.9rem;width:100%">
        </div>
        <div class="form-group">
          <label class="form-label">密码</label>
          <input type="text" id="newUserPassword" class="form-input" placeholder="至少6位" style="background:rgba(255,255,255,0.6);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:10px 14px;font-size:0.9rem;width:100%">
        </div>
        <div class="form-group">
          <label class="form-label">昵称（显示名称）</label>
          <input type="text" id="newUserNickname" class="form-input" placeholder="如 深夜刷题人" style="background:rgba(255,255,255,0.6);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:10px 14px;font-size:0.9rem;width:100%">
        </div>
        <div class="form-group">
          <label class="form-label">学部</label>
          <select id="newUserDept" class="form-input" style="background:rgba(255,255,255,0.6);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:10px 14px;font-size:0.9rem;width:100%">
            <option value="高中部">高中部</option>
            <option value="初中部">初中部</option>
            <option value="小学部">小学部</option>
            <option value="国际部">国际部</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">身份</label>
          <select id="newUserRole" class="form-input" style="background:rgba(255,255,255,0.6);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:10px 14px;font-size:0.9rem;width:100%">
            <option value="student">学生</option>
            <option value="teacher">老师</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">个性签名（可选）</label>
          <input type="text" id="newUserBio" class="form-input" placeholder="如 高三生活分享" style="background:rgba(255,255,255,0.6);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:10px 14px;font-size:0.9rem;width:100%">
        </div>
        <button class="btn btn-primary btn-block" onclick="adminCreateUser()" style="margin-top:8px"><i class="fas fa-user-plus"></i> 创建用户</button>
      </div>
    </div>
  `;
}

async function adminCreateUser() {
  const username = document.getElementById('newUserUsername').value.trim();
  const password = document.getElementById('newUserPassword').value.trim();
  const nickname = document.getElementById('newUserNickname').value.trim();
  const department = document.getElementById('newUserDept').value;
  const role = document.getElementById('newUserRole').value;
  const bio = document.getElementById('newUserBio').value.trim();
  if (!username || !password || !nickname) { toast('请填写完整信息', 'error'); return; }
  try {
    await API.post('/api/admin/create-user', { username, password, nickname, department, role, bio });
    toast('用户创建成功！', 'success');
    document.getElementById('newUserUsername').value = '';
    document.getElementById('newUserPassword').value = '';
    document.getElementById('newUserNickname').value = '';
    document.getElementById('newUserBio').value = '';
  } catch (e) { toast(e.message || '创建失败', 'error'); }
}

function renderAdminPostAsUser() {
  const users = state.adminData?.users || [];
  const categories = state.categories || [];
  return `
    <div class="admin-section">
      <h3 class="page-title" style="font-size:1.1rem;margin-bottom:16px">代发帖子</h3>
      <p style="color:var(--text-secondary);font-size:0.82rem;margin-bottom:16px">以指定用户身份发布帖子，帖子将显示为该用户发布。</p>
      <div class="glass" style="padding:20px">
        <div class="form-group">
          <label class="form-label">选择用户</label>
          <select id="postAsUser" class="form-input" style="background:rgba(255,255,255,0.6);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:10px 14px;font-size:0.9rem;width:100%">
            ${users.map(u => `<option value="${u.id}">${escapeHtml(u.nickname)} (${escapeHtml(u.department)})</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">分类</label>
          <select id="postAsCategory" class="form-input" style="background:rgba(255,255,255,0.6);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:10px 14px;font-size:0.9rem;width:100%">
            ${categories.map(c => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">标题</label>
          <input type="text" id="postAsTitle" class="form-input" placeholder="帖子标题" style="background:rgba(255,255,255,0.6);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:10px 14px;font-size:0.9rem;width:100%">
        </div>
        <div class="form-group">
          <label class="form-label">内容</label>
          <textarea id="postAsContent" class="form-input" rows="6" placeholder="帖子内容..." style="background:rgba(255,255,255,0.6);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:10px 14px;font-size:0.9rem;width:100%;resize:vertical"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">标签（逗号分隔，可选）</label>
          <input type="text" id="postAsTags" class="form-input" placeholder="如 高三,考试,吐槽" style="background:rgba(255,255,255,0.6);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:10px 14px;font-size:0.9rem;width:100%">
        </div>
        <button class="btn btn-primary btn-block" onclick="adminPostAsUser()" style="margin-top:8px"><i class="fas fa-paper-plane"></i> 发布帖子</button>
      </div>
    </div>
  `;
}

async function adminPostAsUser() {
  const user_id = document.getElementById('postAsUser').value;
  const category_id = parseInt(document.getElementById('postAsCategory').value);
  const title = document.getElementById('postAsTitle').value.trim();
  const content = document.getElementById('postAsContent').value.trim();
  const tagsStr = document.getElementById('postAsTags').value.trim();
  if (!title || !content) { toast('请填写标题和内容', 'error'); return; }
  const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : [];
  try {
    await API.post('/api/admin/post-as-user', { user_id, title, content, category_id, tags });
    toast('帖子发布成功！', 'success');
    document.getElementById('postAsTitle').value = '';
    document.getElementById('postAsContent').value = '';
    document.getElementById('postAsTags').value = '';
  } catch (e) { toast(e.message || '发布失败', 'error'); }
}

async function adminDeletePost(postId, title) {
  if (!confirm('确定要删除帖子"' + title + '"吗？\n删除后无法恢复，相关评论也将一并删除。')) return;
  try {
    await API.request('/api/admin/posts/' + postId, { method: 'DELETE' });
    toast('帖子已删除', 'success');
    render();
  } catch (e) {
    toast('删除失败: ' + e.message, 'error');
  }
}

async function banUser(userId) {
  if (!confirm('确定要禁言该用户吗？\n禁言后该用户将无法登录论坛。')) return;
  try {
    await API.post('/api/admin/ban/' + userId, {});
    toast('用户已禁言', 'success');
    render();
  } catch (e) {
    toast('禁言失败: ' + e.message, 'error');
  }
}

async function unbanUser(userId) {
  try {
    await API.request('/api/admin/ban/' + userId, { method: 'DELETE' });
    toast('用户已解禁', 'success');
    render();
  } catch (e) {
    toast('解禁失败: ' + e.message, 'error');
  }
}

async function createAnnouncement() {
  var title = $('#annTitle').value.trim();
  var content = $('#annContent').value.trim();
  if (!title || !content) { toast('请填写完整', 'error'); return; }
  try {
    await API.post('/api/admin/announce', { title, content, type: 'info' });
    toast('公告发布成功', 'success');
    adminTab = 'announce';
    // Refresh announcements
    try { const ad = await API.get('/api/announcements'); announcements_global = ad.announcements || []; } catch {}
    render();
  } catch (e) {
    toast('发布失败: ' + e.message, 'error');
  }
}

async function adminCreatePoll() {
  var postId = parseInt($('#pollPostId').value);
  var question = $('#pollQuestion').value.trim();
  if (!postId || !question) { toast('请填写完整', 'error'); return; }
  try {
    await API.post('/api/admin/poll', { post_id: postId, question });
    toast('投票创建成功', 'success');
    navigate('/post/' + postId);
  } catch (e) {
    toast('创建失败: ' + e.message, 'error');
  }
}

// ===== Init =====
async function init() {
  if (state.token) {
    await checkAuth();
    await loadCategories();
    await loadNotifications();
  } else if (state.isGuest) {
    // Guest mode: skip auth and go straight to loading
    await loadCategories();
  } else if (!getRoute().startsWith('/login')) {
    navigate('/login');
  }

  window.addEventListener('hashchange', render);
  await render();
  
  // Periodically check notifications
  setInterval(loadNotifications, 60000);
}

// Start
init();
