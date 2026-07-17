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
  elections: [],
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
      // 检查响应类型，防止非 JSON 响应导致解析错误
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        // 服务器返回了非 JSON（可能是 HTML 错误页面）
        if (res.status === 405) throw new Error('服务器暂时不可用，请稍后重试');
        if (!res.ok) throw new Error('请求失败 (' + res.status + ')');
        throw new Error('服务器响应格式错误，请刷新页面重试');
      }
      const text = await res.text();
      if (!text) throw new Error('服务器返回空响应，请稍后重试');
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('服务器响应解析失败，请稍后重试');
      }
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
      // 网络错误
      if (e.name === 'TypeError' && e.message.includes('fetch')) {
        throw new Error('网络连接失败，请检查网络后重试');
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
  if (!state.user || !state.token) {
    toast('请先登录后再' + action, 'info');
    setTimeout(function() { navigate('/login'); }, 1000);
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

  // For non-logged-in users viewing shared posts, show minimal shell
  if (!state.user && !state.isGuest && getRoute().startsWith('/post/')) {
    return `
      <header class="app-header">
        <div class="logo" onclick="navigate('/login')">
          <div class="logo-icon"><i class="fas fa-feather"></i></div>
          <span class="gradient-text">翰林论坛</span>
        </div>
        <div class="header-actions">
          <button class="btn btn-primary btn-sm" onclick="navigate('/login')">登录 / 注册</button>
        </div>
      </header>
      <main class="main-content" style="margin:0 auto;max-width:800px;padding:20px 16px 80px">${content}</main>
      <nav class="mobile-nav">
        <button class="mobile-nav-item active" onclick="navigate('/login')">
          <i class="fas fa-home nav-icon"></i><span>首页</span>
        </button>
        <button class="mobile-nav-item" onclick="navigate('/login')">
          <i class="fas fa-th-large nav-icon"></i><span>分类</span>
        </button>
        <button class="mobile-nav-item" onclick="navigate('/login')">
          <i class="fas fa-lightbulb nav-icon"></i><span>建议</span>
        </button>
        <button class="mobile-nav-item" onclick="navigate('/login')">
          <i class="fas fa-user nav-icon"></i><span>登录</span>
        </button>
      </nav>
    `;
  }

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
      <button class="mobile-nav-item ${getRoute() === '/elections' ? 'active' : ''}" onclick="navigate('/elections')">
        <i class="fas fa-trophy nav-icon"></i><span>评选</span>
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
    <div class="nav-item ${route === '/elections' ? 'active' : ''}" onclick="navigate('/elections')">
      <i class="fas fa-trophy nav-icon"></i><span>评选活动</span>
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
    state.isGuest = false;
    localStorage.setItem('token', data.token);
    localStorage.removeItem('isGuest');
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
    state.isGuest = false;
    localStorage.setItem('token', data.token);
    localStorage.removeItem('isGuest');
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
        ${post.is_hot ? '<span class="post-pin-badge" style="background:rgba(220,38,38,0.15);color:#dc2626"><i class="fas fa-fire"></i> 热门</span>' : ''}
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
  const querySig = sort + '|' + category + '|' + search;
  if (state.lastHomeQuery !== querySig) {
    state.homeDisplayLimit = 20;
    state.lastHomeQuery = querySig;
  }
  let posts = [];
  try {
    const params = new URLSearchParams({ sort, limit: 100 });
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

  const displayPosts = posts.slice(0, state.homeDisplayLimit || 20);

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
    <div id="postList">${renderPostList(displayPosts)}</div>
    ${posts.length > displayPosts.length ? `
      <div style="text-align:center;margin-top:16px">
        <button class="btn btn-ghost" onclick="loadMorePosts()"><i class="fas fa-chevron-down"></i> 加载更多</button>
      </div>
    ` : ''}
  `;
}

function changeSort(sort) {
  state.currentSort = sort;
  render();
}

function loadMorePosts() {
  state.homeDisplayLimit = (state.homeDisplayLimit || 20) + 20;
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

  const loginBanner = (!state.user && !state.isGuest) ? `
    <div class="glass" style="padding:12px 16px;margin-bottom:12px;text-align:center;border:1px solid var(--c-gold);background:rgba(201,162,39,0.08)">
      <i class="fas fa-info-circle" style="color:var(--c-gold)"></i>
      <span style="font-size:0.85rem;color:var(--text-secondary)">你正在浏览分享的帖子，</span>
      <a style="color:var(--c-burgundy);font-weight:600;cursor:pointer;text-decoration:underline" onclick="navigate('/login')">登录 / 注册</a>
      <span style="font-size:0.85rem;color:var(--text-secondary)">后可以点赞、评论和投票</span>
    </div>
  ` : '';

  return `
    ${loginBanner}
    <div class="glass post-detail">
      <div style="margin-bottom:12px">
        <span class="post-category-tag" style="background:${cat.color || '#6366f1'}22;color:${cat.color || '#6366f1'}">
          <span class="cat-dot" style="background:${cat.color || '#6366f1'}"></span>${escapeHtml(cat.name || '未分类')}
        </span>
        ${post.is_pinned ? '<span class="post-pin-badge"><i class="fas fa-thumbtack"></i> 置顶</span>' : ''}
      </div>
      <h1 class="post-detail-title">${escapeHtml(post.title)}</h1>
      <div class="post-detail-meta">
        <div style="cursor:pointer" onclick="navigate('/profile/${author.id}')">${getAvatarHtml(author.nickname, author.avatar_color)}</div>
        <div>
          <div style="font-weight:600;font-size:0.9rem">${escapeHtml(author.nickname)} <span style="color:var(--text-tertiary);font-weight:400;font-size:0.8rem">${escapeHtml(author.department || '')}</span></div>
          <div style="font-size:0.75rem;color:var(--text-tertiary)">${formatTime(post.created_at)} · ${post.views} 次浏览</div>
        </div>
        <button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="navigate('/profile/${author.id}')">查看主页</button>
      </div>
      <div class="post-detail-content" id="postContent-${post.id}">${escapeHtml(post.content)}</div>
      <div style="margin-top:8px;display:flex;gap:8px">
        <button class="btn btn-ghost btn-sm" onclick="translatePost(${post.id})" id="translateBtn-${post.id}">
          <i class="fas fa-language"></i> 翻译
        </button>
      </div>
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
      <div style="cursor:pointer;flex-shrink:0" onclick="navigate('/profile/${author.id}')">${getAvatarHtml(author.nickname, author.avatar_color, 'sm')}</div>
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
          ${state.user && state.user.role === 'admin' ? `
            <button class="comment-action" style="color:#dc2626" onclick="adminDeleteComment(${comment.id})">
              <i class="fas fa-trash"></i> 删除
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
      <div class="form-group">
        <label class="form-label" style="display:flex;align-items:center;gap:8px;cursor:pointer">
          <input type="checkbox" id="pollToggle" onchange="togglePollForm()" style="width:18px;height:18px;cursor:pointer">
          <i class="fas fa-chart-bar" style="color:var(--c-teal)"></i> 添加投票
        </label>
        <div id="pollForm" style="display:none;margin-top:8px">
          <input type="text" class="form-input" id="pollQuestion" placeholder="输入投票问题，如：你支持这个提议吗？" style="margin-bottom:8px">
          <p style="font-size:0.75rem;color:var(--text-tertiary)">用户可选择"认同"或"不认同"进行投票</p>
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

function togglePollForm() {
  const form = document.getElementById('pollForm');
  const toggle = document.getElementById('pollToggle');
  form.style.display = toggle.checked ? 'block' : 'none';
  if (!toggle.checked) {
    document.getElementById('pollQuestion').value = '';
  }
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
  const pollToggle = document.getElementById('pollToggle');
  let poll_question = '';
  if (pollToggle && pollToggle.checked) {
    poll_question = document.getElementById('pollQuestion').value.trim();
    if (!poll_question) {
      $('#postError').innerHTML = '<div class="form-error">请输入投票问题，或取消勾选"添加投票"</div>';
      return;
    }
  }
  const btn = $('#submitPostBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发布中...';
  try {
    const data = await API.post('/api/posts', { title, content, category_id, tags: postTags, poll_question });
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

// ===== Render: Elections =====
async function renderElectionsPage() {
  if (!state.elections || state.elections.length === 0) {
    try {
      const data = await API.get('/api/elections');
      state.elections = data.elections || [];
    } catch (e) { toast(e.message, 'error'); }
  }

  var isAdmin = state.user && state.user.role === 'admin';

  return `
    <div class="glass" style="padding:20px;margin-bottom:16px">
      <h1 style="margin-bottom:8px"><i class="fas fa-trophy" style="color:var(--c-gold)"></i> 评选活动</h1>
      <p style="color:var(--text-secondary);font-size:0.85rem">参与校园评选，为心中最佳的人选投票！</p>
      ${isAdmin ? `
        <button class="btn btn-primary" style="margin-top:12px" onclick="document.getElementById('electionForm').style.display='block'">
          <i class="fas fa-plus"></i> 创建评选活动
        </button>
        <div id="electionForm" style="display:none;margin-top:16px;padding:16px;background:var(--bg-surface);border-radius:var(--radius)">
          <div class="form-group">
            <label class="form-label">评选标题（如：最佳教师评选）</label>
            <input type="text" class="form-input" id="elecTitle" placeholder="输入评选标题">
          </div>
          <div class="form-group">
            <label class="form-label">评选描述</label>
            <textarea class="form-input" id="elecDesc" rows="3" placeholder="评选说明"></textarea>
          </div>
          <div style="display:flex;gap:12px">
            <div class="form-group" style="flex:1">
              <label class="form-label">开始时间</label>
              <input type="datetime-local" class="form-input" id="elecStart">
            </div>
            <div class="form-group" style="flex:1">
              <label class="form-label">结束时间</label>
              <input type="datetime-local" class="form-input" id="elecEnd">
            </div>
          </div>
          <button class="btn btn-primary" onclick="createElection()"><i class="fas fa-check"></i> 创建</button>
          <button class="btn btn-ghost" onclick="document.getElementById('electionForm').style.display='none'">取消</button>
        </div>
      ` : ''}
    </div>
    ${state.elections.length === 0 ? '<div class="empty-state glass"><p>暂无评选活动</p></div>' : state.elections.map(e => renderElectionCard(e, isAdmin)).join('')}
  `;
}

function renderElectionCard(election, isAdmin) {
  var statusColors = { upcoming: '#3b82f6', active: '#22c55e', ended: '#94a3b8' };
  var statusLabels = { upcoming: '未开始', active: '进行中', ended: '已结束' };
  return `
    <div class="glass" style="padding:20px;margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px">
        <h2 style="font-size:1.1rem">${escapeHtml(election.title)}</h2>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="padding:3px 10px;border-radius:12px;font-size:0.75rem;color:white;background:${statusColors[election.status]}">${statusLabels[election.status]}</span>
          ${isAdmin ? `<button class="admin-delete-btn" onclick="deleteElection(${election.id})" title="删除"><i class="fas fa-trash"></i></button>` : ''}
        </div>
      </div>
      ${election.description ? `<p style="color:var(--text-secondary);font-size:0.85rem;margin-bottom:8px">${escapeHtml(election.description)}</p>` : ''}
      <p style="font-size:0.75rem;color:var(--text-tertiary);margin-bottom:12px">
        <i class="far fa-clock"></i> ${formatTime(election.start_date)} ~ ${formatTime(election.end_date)} · 共 ${election.total_votes} 票
      </p>
      <div style="display:grid;gap:12px">
        ${election.candidates.map(c => renderCandidate(c, election, isAdmin)).join('')}
      </div>
      ${isAdmin && election.status !== 'ended' ? `
        <button class="btn btn-ghost btn-sm" style="margin-top:12px" onclick="document.getElementById('candForm-${election.id}').style.display='block'">
          <i class="fas fa-user-plus"></i> 添加候选人
        </button>
        <div id="candForm-${election.id}" style="display:none;margin-top:12px;padding:12px;background:var(--bg-surface);border-radius:var(--radius)">
          <input type="text" class="form-input" id="candName-${election.id}" placeholder="候选人名称" style="margin-bottom:8px">
          <input type="text" class="form-input" id="candDept-${election.id}" placeholder="学部/部门" style="margin-bottom:8px">
          <input type="text" class="form-input" id="candImg-${election.id}" placeholder="照片URL（可选）" style="margin-bottom:8px">
          <textarea class="form-input" id="candBio-${election.id}" rows="2" placeholder="简介/拉票宣言" style="margin-bottom:8px"></textarea>
          <button class="btn btn-primary btn-sm" onclick="addCandidate(${election.id})"><i class="fas fa-check"></i> 添加</button>
          <button class="btn btn-ghost btn-sm" onclick="document.getElementById('candForm-${election.id}').style.display='none'">取消</button>
        </div>
      ` : ''}
    </div>
  `;
}

function renderCandidate(candidate, election, isAdmin) {
  var percent = election.total_votes > 0 ? Math.round(candidate.vote_count / election.total_votes * 100) : 0;
  var hasVoted = election.voted !== null;
  var votedThis = election.voted === candidate.id;
  return `
    <div style="display:flex;gap:12px;align-items:center;padding:12px;background:var(--bg-surface);border-radius:var(--radius);${votedThis ? 'border:2px solid var(--c-gold)' : ''}">
      ${candidate.image ? `<img src="${escapeHtml(candidate.image)}" style="width:48px;height:48px;border-radius:50%;object-fit:cover" onerror="this.style.display='none'">` : `<div style="width:48px;height:48px;border-radius:50%;background:var(--c-burgundy);display:flex;align-items:center;justify-content:center;color:white;font-size:1.2rem">${escapeHtml(candidate.name.charAt(0))}</div>`}
      <div style="flex:1">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
          <div>
            <span style="font-weight:700">${escapeHtml(candidate.name)}</span>
            ${candidate.department ? `<span style="font-size:0.75rem;color:var(--text-tertiary);margin-left:6px">${escapeHtml(candidate.department)}</span>` : ''}
            ${votedThis ? '<span style="font-size:0.7rem;color:var(--c-gold);margin-left:6px"><i class="fas fa-check-circle"></i> 已投</span>' : ''}
          </div>
          ${isAdmin ? `<button class="admin-delete-btn" onclick="deleteCandidate(${candidate.id})" title="删除候选人"><i class="fas fa-times"></i></button>` : ''}
        </div>
        ${candidate.bio ? `<p style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:6px">${escapeHtml(candidate.bio)}</p>` : ''}
        <div style="display:flex;align-items:center;gap:8px">
          <div style="flex:1;height:8px;background:var(--border-color);border-radius:4px;overflow:hidden">
            <div style="width:${percent}%;height:100%;background:linear-gradient(90deg,var(--c-burgundy),var(--c-gold));border-radius:4px;transition:width 0.3s"></div>
          </div>
          <span style="font-size:0.78rem;color:var(--text-secondary);min-width:50px;text-align:right">${candidate.vote_count}票 (${percent}%)</span>
        </div>
      </div>
      ${election.status === 'active' && !hasVoted && state.user ? `
        <button class="btn btn-primary btn-sm" onclick="voteCandidate(${election.id}, ${candidate.id})">
          <i class="fas fa-thumbs-up"></i> 投票
        </button>
      ` : election.status === 'active' && hasVoted ? `
        <span style="font-size:0.75rem;color:var(--text-tertiary)">${votedThis ? '已投票' : '已投他人'}</span>
      ` : ''}
    </div>
  `;
}

async function createElection() {
  var title = $('#elecTitle').value.trim();
  var desc = $('#elecDesc').value.trim();
  var start = $('#elecStart').value;
  var end = $('#elecEnd').value;
  if (!title || !start || !end) { toast('请填写完整', 'error'); return; }
  try {
    await API.post('/api/admin/elections', { title, description: desc, start_date: new Date(start).toISOString(), end_date: new Date(end).toISOString() });
    toast('评选活动创建成功', 'success');
    state.elections = [];
    render();
  } catch (e) { toast('创建失败: ' + e.message, 'error'); }
}

async function addCandidate(electionId) {
  var name = $('#candName-' + electionId).value.trim();
  var dept = $('#candDept-' + electionId).value.trim();
  var img = $('#candImg-' + electionId).value.trim();
  var bio = $('#candBio-' + electionId).value.trim();
  if (!name) { toast('请填写候选人名称', 'error'); return; }
  try {
    await API.post('/api/admin/elections/' + electionId + '/candidates', { name, department: dept, image: img, bio });
    toast('候选人添加成功', 'success');
    state.elections = [];
    render();
  } catch (e) { toast('添加失败: ' + e.message, 'error'); }
}

async function voteCandidate(electionId, candidateId) {
  if (!confirm('确定投票给该候选人吗？每人只能投一票，投后不可更改。')) return;
  try {
    await API.post('/api/elections/' + electionId + '/vote', { candidate_id: candidateId });
    toast('投票成功！', 'success');
    state.elections = [];
    render();
  } catch (e) { toast('投票失败: ' + e.message, 'error'); }
}

async function deleteElection(electionId) {
  if (!confirm('确定删除这个评选活动吗？所有候选人数据和投票记录都将被删除。')) return;
  try {
    await API.request('/api/admin/elections/' + electionId, { method: 'DELETE' });
    toast('评选活动已删除', 'success');
    state.elections = [];
    render();
  } catch (e) { toast('删除失败: ' + e.message, 'error'); }
}

async function deleteCandidate(candidateId) {
  if (!confirm('确定删除该候选人吗？')) return;
  try {
    await API.request('/api/admin/candidates/' + candidateId, { method: 'DELETE' });
    toast('候选人已删除', 'success');
    state.elections = [];
    render();
  } catch (e) { toast('删除失败: ' + e.message, 'error'); }
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

async function adminDeleteComment(commentId) {
  if (!confirm('确定删除这条评论吗？\n如果是楼中楼评论，其下所有回复也会被删除。')) return;
  try {
    const data = await API.request('/api/admin/comments/' + commentId, { method: 'DELETE' });
    toast(data.message || '评论已删除', 'success');
    // 重新加载帖子详情以刷新评论
    if (state.currentPost) {
      const commentData = await API.get('/api/posts/' + state.currentPost.id + '/comments');
      state.comments = commentData.comments;
      state.currentPost.comment_count = (state.currentPost.comment_count || 0) - (data.count || 1);
    }
    render();
  } catch (e) { toast('删除失败: ' + e.message, 'error'); }
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
  // Auto-copy to clipboard
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      toast('帖子链接已复制到剪贴板', 'success');
    }).catch(() => {
      fallbackCopyLink(url);
    });
  } else {
    fallbackCopyLink(url);
  }
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  modal.innerHTML = `
    <div class="glass modal-content">
      <h2 style="margin-bottom:8px;text-align:center"><i class="fas fa-share-alt" style="color:var(--c-teal)"></i> 分享帖子</h2>
      <p style="text-align:center;font-size:0.85rem;color:var(--text-secondary);margin-bottom:12px">${escapeHtml(post?.title || '')}</p>
      <div style="background:var(--bg-surface);border-radius:var(--radius-sm);padding:10px 14px;margin-bottom:16px;display:flex;align-items:center;gap:8px">
        <i class="fas fa-link" style="color:var(--c-teal);flex-shrink:0"></i>
        <input type="text" value="${url}" readonly style="flex:1;border:none;background:transparent;font-size:0.8rem;color:var(--text-secondary);outline:none" id="shareUrlInput">
        <button class="btn btn-primary btn-sm" onclick="copyLink('${url}')"><i class="fas fa-copy"></i> 复制</button>
      </div>
      <div class="share-grid">
        <div class="share-option" onclick="shareToWeibo('${url}', '${escapeHtml(post?.title || '')}')">
          <div class="share-icon share-weibo"><i class="fab fa-weibo"></i></div>
          <span class="share-label">微博</span>
        </div>
        <div class="share-option" onclick="shareToQQ('${url}', '${escapeHtml(post?.title || '')}')">
          <div class="share-icon share-qq"><i class="fab fa-qq"></i></div>
          <span class="share-label">QQ</span>
        </div>
      </div>
      <p style="text-align:center;font-size:0.75rem;color:var(--text-tertiary);margin-top:12px">链接已自动复制到剪贴板，可直接粘贴分享</p>
      <button class="btn btn-ghost btn-block" style="margin-top:8px" onclick="this.closest('.modal-overlay').remove()">关闭</button>
    </div>
  `;
  document.body.appendChild(modal);
}

function fallbackCopyLink(url) {
  const input = document.createElement('input');
  input.value = url;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  toast('帖子链接已复制', 'success');
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

var translatedPosts = {};

async function translatePost(postId) {
  var contentEl = document.getElementById('postContent-' + postId);
  var btn = document.getElementById('translateBtn-' + postId);
  if (!contentEl || !btn) return;

  // 已翻译则切换回原文
  if (translatedPosts[postId]) {
    contentEl.innerHTML = escapeHtml(translatedPosts[postId].original);
    btn.innerHTML = '<i class="fas fa-language"></i> 翻译';
    delete translatedPosts[postId];
    return;
  }

  // 检测是否包含中文，如果主要是中文则提示无需翻译
  var text = contentEl.textContent;
  var chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  if (chineseChars > text.length * 0.5) {
    toast('该内容主要是中文，无需翻译', 'info');
    return;
  }

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 翻译中...';
  btn.disabled = true;

  try {
    // 使用 Google Translate 免费 API
    var apiUrl = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=zh-CN&dt=t&q=' + encodeURIComponent(text);
    var res = await fetch(apiUrl);
    var data = await res.json();
    var translated = '';
    if (data && data[0]) {
      for (var i = 0; i < data[0].length; i++) {
        if (data[0][i] && data[0][i][0]) translated += data[0][i][0];
      }
    }
    if (translated) {
      translatedPosts[postId] = { original: text, translated: translated };
      contentEl.innerHTML = escapeHtml(translated) + '<div style="margin-top:8px;padding-top:8px;border-top:1px dashed var(--border-color);font-size:0.78rem;color:var(--text-tertiary)"><i class="fas fa-info-circle"></i> 以上为机器翻译，<a style="color:var(--c-teal);cursor:pointer" onclick="translatePost(' + postId + ')">查看原文</a></div>';
      btn.innerHTML = '<i class="fas fa-undo"></i> 原文';
      toast('翻译完成', 'success');
    } else {
      toast('翻译失败，请稍后重试', 'error');
      btn.innerHTML = '<i class="fas fa-language"></i> 翻译';
    }
  } catch (e) {
    // 降级到 MyMemory 翻译 API
    try {
      var apiUrl2 = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=en|zh-CN';
      var res2 = await fetch(apiUrl2);
      var data2 = await res2.json();
      if (data2 && data2.responseData && data2.responseData.translatedText) {
        var translated2 = data2.responseData.translatedText;
        translatedPosts[postId] = { original: text, translated: translated2 };
        contentEl.innerHTML = escapeHtml(translated2) + '<div style="margin-top:8px;padding-top:8px;border-top:1px dashed var(--border-color);font-size:0.78rem;color:var(--text-tertiary)"><i class="fas fa-info-circle"></i> 以上为机器翻译，<a style="color:var(--c-teal);cursor:pointer" onclick="translatePost(' + postId + ')">查看原文</a></div>';
        btn.innerHTML = '<i class="fas fa-undo"></i> 原文';
        toast('翻译完成', 'success');
      } else {
        toast('翻译服务暂时不可用', 'error');
        btn.innerHTML = '<i class="fas fa-language"></i> 翻译';
      }
    } catch (e2) {
      toast('翻译失败: ' + e.message, 'error');
      btn.innerHTML = '<i class="fas fa-language"></i> 翻译';
    }
  }
  btn.disabled = false;
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
  } else if (route === '/elections' || route.startsWith('/elections/')) {
    content = await renderElectionsPage();
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
        <button class="admin-tab ${adminTab === 'suggestions' ? 'active' : ''}" onclick="switchAdminTab('suggestions')">意见反馈</button>
        <button class="admin-tab ${adminTab === 'announce' ? 'active' : ''}" onclick="switchAdminTab('announce')">发布公告</button>
        <button class="admin-tab ${adminTab === 'poll' ? 'active' : ''}" onclick="switchAdminTab('poll')">发起投票</button>
        <button class="admin-tab ${adminTab === 'create-user' ? 'active' : ''}" onclick="switchAdminTab('create-user')"><i class="fas fa-user-plus"></i> 创建用户</button>
        <button class="admin-tab ${adminTab === 'post-as-user' ? 'active' : ''}" onclick="switchAdminTab('post-as-user')"><i class="fas fa-pencil-alt"></i> 代发帖子</button>
      </div>
      
      <div id="adminContent">
        ${adminTab === 'dashboard' ? renderAdminDashboard(stats) : ''}
        ${adminTab === 'users' ? renderAdminUsers(users) : ''}
        ${adminTab === 'posts' ? renderAdminPosts(posts) : ''}
        ${adminTab === 'suggestions' ? await renderAdminSuggestions() : ''}
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
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px">
      <p style="color:var(--text-secondary);font-size:0.85rem">共 ${users.length} 个用户 · 已选 <span id="userSelCount">${adminSelectedUsers.size}</span> 个</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <button class="btn btn-sm btn-ghost" onclick="adminUserSelectAll()"><i class="fas fa-check-square"></i> 全选</button>
        <button class="btn btn-sm btn-ghost" onclick="adminUserClearSelection()"><i class="fas fa-square"></i> 取消全选</button>
        <button class="btn btn-sm btn-ghost" onclick="adminUserBatchAction('ban')"><i class="fas fa-ban"></i> 批量禁言</button>
        <button class="btn btn-sm btn-ghost" onclick="adminUserBatchAction('unban')"><i class="fas fa-unlock"></i> 批量解禁</button>
        <button class="btn btn-sm" style="background:#dc2626;color:white" onclick="adminUserBatchAction('delete')"><i class="fas fa-trash"></i> 批量删除</button>
      </div>
    </div>
    ${users.map(u => `
      <div class="admin-user-row" style="${adminSelectedUsers.has(u.id) ? 'background:rgba(201,162,39,0.1)' : ''}">
        <input type="checkbox" ${adminSelectedUsers.has(u.id) ? 'checked' : ''} ${u.role === 'admin' ? 'disabled' : ''} onchange="adminUserToggleSelect(${u.id})" style="width:18px;height:18px;cursor:pointer;flex-shrink:0">
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
          ${u.role !== 'admin' ? `<button class="admin-ban-btn" onclick="adminEditUser(${u.id})" title="编辑"><i class="fas fa-edit"></i></button>` : ''}
          ${u.role !== 'admin' ? `<button class="admin-delete-btn" onclick="adminDeleteUser(${u.id}, '${escapeHtml(u.nickname).replace(/'/g, "\\'")}')"><i class="fas fa-trash"></i></button>` : ''}
        </div>
      </div>
    `).join('')}
  `;
}

var adminSelectedUsers = new Set();

function adminUserToggleSelect(userId) {
  if (adminSelectedUsers.has(userId)) adminSelectedUsers.delete(userId);
  else adminSelectedUsers.add(userId);
  render();
}

function adminUserSelectAll() {
  const users = state.adminData?.users || [];
  users.forEach(u => { if (u.role !== 'admin') adminSelectedUsers.add(u.id); });
  render();
}

function adminUserClearSelection() {
  adminSelectedUsers.clear();
  render();
}

async function adminUserBatchAction(action) {
  if (adminSelectedUsers.size === 0) { toast('请先选择用户', 'error'); return; }
  if (action === 'delete') {
    if (!confirm('确定要删除选中的 ' + adminSelectedUsers.size + ' 个用户吗？\n该用户的所有帖子和评论都将被删除！')) return;
  }
  const user_ids = Array.from(adminSelectedUsers);
  try {
    const data = await API.post('/api/admin/users/batch', { action, user_ids });
    toast(data.message || '操作成功', 'success');
    adminSelectedUsers.clear();
    render();
  } catch (e) {
    toast('操作失败: ' + e.message, 'error');
  }
}

var adminSelectedPosts = new Set();

function renderAdminPosts(posts) {
  if (!posts.length) return '<div class="empty-state"><p>暂无帖子</p></div>';
  return `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px">
      <p style="color:var(--text-secondary);font-size:0.85rem">共 ${posts.length} 篇帖子 · 已选 <span id="selCount">${adminSelectedPosts.size}</span> 篇</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <button class="btn btn-sm btn-ghost" onclick="adminSelectAllPosts(${posts.length})"><i class="fas fa-check-square"></i> 全选</button>
        <button class="btn btn-sm btn-ghost" onclick="adminClearSelection()"><i class="fas fa-square"></i> 取消全选</button>
        <button class="btn btn-sm" style="background:var(--c-gold);color:white" onclick="adminBatchAction('hot')"><i class="fas fa-fire"></i> 设为热门</button>
        <button class="btn btn-sm btn-ghost" onclick="adminBatchAction('unhot')"><i class="fas fa-fire-extinguisher"></i> 取消热门</button>
        <button class="btn btn-sm" style="background:var(--c-burgundy);color:white" onclick="adminBatchAction('pin')"><i class="fas fa-thumbtack"></i> 置顶</button>
        <button class="btn btn-sm btn-ghost" onclick="adminBatchAction('unpin')"><i class="fas fa-thumbtack"></i> 取消置顶</button>
        <button class="btn btn-sm" style="background:#dc2626;color:white" onclick="adminBatchAction('delete')"><i class="fas fa-trash"></i> 批量删除</button>
      </div>
    </div>
    ${posts.map(p => `
      <div class="admin-user-row" style="${adminSelectedPosts.has(p.id) ? 'background:rgba(201,162,39,0.1)' : ''}">
        <input type="checkbox" ${adminSelectedPosts.has(p.id) ? 'checked' : ''} onchange="adminTogglePost(${p.id})" style="width:18px;height:18px;cursor:pointer;flex-shrink:0">
        <div class="admin-user-info">
          <div class="admin-user-name">
            ${escapeHtml(p.title)}
            ${p.is_pinned ? '<span class="admin-badge" style="background:var(--c-gold);color:white">置顶</span>' : ''}
            ${p.is_hot ? '<span class="admin-badge" style="background:#dc2626;color:white">热门</span>' : ''}
          </div>
          <div class="admin-user-meta">${escapeHtml(p.author?.nickname || '未知')} · ${p.comment_count || 0}评 · ${p.views || 0}浏览 · ${formatTime(p.created_at)}</div>
        </div>
        <div class="admin-user-actions">
          <button class="admin-ban-btn" onclick="navigate('/post/${p.id}')"><i class="fas fa-eye"></i></button>
          <button class="admin-ban-btn" onclick="adminEditPost(${p.id})" title="编辑帖子"><i class="fas fa-edit"></i></button>
          <button class="admin-ban-btn" onclick="adminToggleHot(${p.id})" title="切换热门"><i class="fas fa-fire"></i></button>
          <button class="admin-ban-btn" onclick="adminTogglePin(${p.id})" title="切换置顶"><i class="fas fa-thumbtack"></i></button>
          <button class="admin-delete-btn" onclick="adminDeletePost(${p.id}, '${escapeHtml(p.title).replace(/'/g, "\\'")}')"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `).join('')}
  `;
}

function adminTogglePost(postId) {
  if (adminSelectedPosts.has(postId)) adminSelectedPosts.delete(postId);
  else adminSelectedPosts.add(postId);
  render();
}

function adminSelectAllPosts(total) {
  if (adminSelectedPosts.size === total) {
    adminSelectedPosts.clear();
  } else {
    const posts = state.adminData?.posts || [];
    posts.forEach(p => adminSelectedPosts.add(p.id));
  }
  render();
}

function adminClearSelection() {
  adminSelectedPosts.clear();
  render();
}

async function adminBatchAction(action) {
  if (adminSelectedPosts.size === 0) { toast('请先选择帖子', 'error'); return; }
  if (action === 'delete') {
    if (!confirm('确定要删除选中的 ' + adminSelectedPosts.size + ' 篇帖子吗？\n删除后无法恢复！')) return;
  }
  const post_ids = Array.from(adminSelectedPosts);
  try {
    const data = await API.post('/api/admin/posts/batch', { action, post_ids });
    toast(data.message || '操作成功', 'success');
    adminSelectedPosts.clear();
    render();
  } catch (e) {
    toast('操作失败: ' + e.message, 'error');
  }
}

async function adminToggleHot(postId) {
  try {
    const posts = state.adminData?.posts || [];
    const post = posts.find(p => p.id === postId);
    const isHot = post ? (post.is_hot || 0) : 0;
    await API.request('/api/admin/posts/' + postId, { method: 'PUT', body: JSON.stringify({ is_hot: !isHot }) });
    toast(isHot ? '已取消热门' : '已设为热门', 'success');
    render();
  } catch (e) { toast('操作失败: ' + e.message, 'error'); }
}

async function adminTogglePin(postId) {
  try {
    const posts = state.adminData?.posts || [];
    const post = posts.find(p => p.id === postId);
    const isPinned = post ? (post.is_pinned || 0) : 0;
    await API.request('/api/admin/posts/' + postId, { method: 'PUT', body: JSON.stringify({ is_pinned: !isPinned }) });
    toast(isPinned ? '已取消置顶' : '已置顶', 'success');
    render();
  } catch (e) { toast('操作失败: ' + e.message, 'error'); }
}

async function adminEditPost(postId) {
  const posts = state.adminData?.posts || [];
  const post = posts.find(p => p.id === postId);
  if (!post) { toast('帖子不存在', 'error'); return; }
  const newTitle = prompt('修改帖子标题：', post.title);
  if (newTitle === null) return;
  const newContent = prompt('修改帖子内容：', post.content || '');
  if (newContent === null) return;
  try {
    await API.request('/api/admin/posts/' + postId, { method: 'PUT', body: JSON.stringify({ title: newTitle, content: newContent }) });
    toast('帖子已更新', 'success');
    render();
  } catch (e) { toast('修改失败: ' + e.message, 'error'); }
}

async function adminDeletePost(postId, title) {
  if (!confirm('确定删除帖子「' + title + '」吗？')) return;
  try {
    await API.request('/api/admin/posts/' + postId, { method: 'DELETE' });
    toast('帖子已删除', 'success');
    render();
  } catch (e) { toast('删除失败: ' + e.message, 'error'); }
}

async function adminEditUser(userId) {
  const users = state.adminData?.users || [];
  const user = users.find(u => u.id === userId);
  if (!user) { toast('用户不存在', 'error'); return; }
  const newNick = prompt('修改昵称：', user.nickname);
  if (newNick === null) return;
  const newDept = prompt('修改学部：', user.department || '');
  if (newDept === null) return;
  const newBio = prompt('修改简介：', user.bio || '');
  if (newBio === null) return;
  try {
    await API.request('/api/admin/users/' + userId, { method: 'PUT', body: JSON.stringify({ nickname: newNick, department: newDept, bio: newBio }) });
    toast('用户信息已更新', 'success');
    render();
  } catch (e) { toast('修改失败: ' + e.message, 'error'); }
}

async function adminDeleteUser(userId, nickname) {
  if (!confirm('确定删除用户「' + nickname + '」吗？\n该用户的所有帖子和评论都将被删除！')) return;
  try {
    await API.request('/api/admin/users/' + userId, { method: 'DELETE' });
    toast('用户已删除', 'success');
    render();
  } catch (e) { toast('删除失败: ' + e.message, 'error'); }
}

function renderAdminAnnounceForm() {
  // 异步加载公告列表
  if (!announcements_global || announcements_global.length === 0) {
    API.get('/api/announcements').then(function(ad) {
      announcements_global = ad.announcements || [];
      if (announcements_global.length > 0) render();
    }).catch(function() {});
  }
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
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
            <div style="font-weight:700;font-size:0.88rem">${escapeHtml(a.title)}</div>
            <button class="admin-delete-btn" onclick="adminDeleteAnnouncement(${a.id})" title="删除公告"><i class="fas fa-trash"></i></button>
          </div>
          <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px">${escapeHtml(a.content)}</div>
          <div style="font-size:0.72rem;color:var(--text-tertiary);margin-top:4px">${formatTime(a.created_at)}</div>
        </div>
      `).join('')}
    ` : ''}
  `;
}

var announcements_global = [];

async function renderAdminSuggestions() {
  let suggestions = [];
  try {
    const data = await API.get('/api/admin/suggestions');
    suggestions = data.suggestions || [];
  } catch (e) {
    return '<div class="empty-state"><p>加载失败: ' + escapeHtml(e.message) + '</p></div>';
  }
  if (!suggestions.length) return '<div class="empty-state"><p>暂无建议反馈</p></div>';

  const statusLabels = {
    pending: { label: '待处理', color: '#9B8070' },
    reviewing: { label: '审核中', color: '#D4AF37' },
    accepted: { label: '已采纳', color: '#8B6914' },
    done: { label: '已完成', color: '#8B2323' },
  };

  return `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px">
      <p style="color:var(--text-secondary);font-size:0.85rem">共 ${suggestions.length} 条建议 · 已选 <span id="sugSelCount">${adminSelectedSuggestions.size}</span> 条</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <button class="btn btn-sm btn-ghost" onclick="adminSugSelectAll()"><i class="fas fa-check-square"></i> 全选</button>
        <button class="btn btn-sm btn-ghost" onclick="adminSugClearSelection()"><i class="fas fa-square"></i> 取消全选</button>
        <button class="btn btn-sm" style="background:#dc2626;color:white" onclick="adminSugBatchDelete()"><i class="fas fa-trash"></i> 批量删除</button>
      </div>
    </div>
    ${suggestions.map(s => {
      const st = statusLabels[s.status] || statusLabels.pending;
      return `
        <div class="glass" style="padding:16px;margin-bottom:12px;border-left:4px solid ${st.color}">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;flex-wrap:wrap;gap:8px">
            <div style="display:flex;align-items:center;gap:8px">
              ${getAvatarHtml(s.nickname, s.avatar_color, 'sm')}
              <div>
                <div style="font-weight:600;font-size:0.85rem">${escapeHtml(s.nickname || '匿名')} <span style="color:var(--text-tertiary);font-weight:400;font-size:0.75rem">${escapeHtml(s.department || '')}</span></div>
                <div style="font-size:0.7rem;color:var(--text-tertiary)">@${escapeHtml(s.username || '')} · ${formatTime(s.created_at)}</div>
              </div>
            </div>
            <span style="padding:3px 10px;border-radius:12px;font-size:0.75rem;color:white;background:${st.color}">${st.label}</span>
            <div style="display:flex;align-items:center;gap:6px">
              <input type="checkbox" ${adminSelectedSuggestions.has(s.id) ? 'checked' : ''} onchange="adminSugToggleSelect(${s.id})" style="width:16px;height:16px;cursor:pointer">
              <button class="admin-delete-btn" onclick="adminDeleteSuggestion(${s.id})" title="删除"><i class="fas fa-trash"></i></button>
            </div>
          </div>
          <h4 style="font-size:0.95rem;margin-bottom:6px">${escapeHtml(s.title)}</h4>
          <p style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;margin-bottom:8px">${escapeHtml(s.content)}</p>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;font-size:0.78rem;color:var(--text-tertiary)">
            <span><i class="fas fa-thumbs-up"></i> ${s.support_count || 0} 支持</span>
            <span><i class="fas fa-tag"></i> ${escapeHtml(s.category || 'general')}</span>
            ${s.priority ? '<span><i class="fas fa-flag"></i> 优先级 ' + s.priority + '</span>' : ''}
          </div>
          ${s.admin_reply ? `
            <div style="background:var(--bg-surface);border-radius:8px;padding:10px;margin-bottom:10px;font-size:0.82rem">
              <div style="font-weight:600;color:var(--c-teal);margin-bottom:4px"><i class="fas fa-reply"></i> 管理员回复</div>
              <div style="color:var(--text-secondary)">${escapeHtml(s.admin_reply)}</div>
            </div>
          ` : ''}
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
            <div style="flex:1;min-width:200px">
              <label style="font-size:0.75rem;color:var(--text-tertiary)">管理员回复</label>
              <input type="text" class="form-input" id="sugReply_${s.id}" placeholder="输入回复内容..." value="${escapeHtml(s.admin_reply || '')}" style="font-size:0.82rem">
            </div>
            <select class="form-input" id="sugStatus_${s.id}" style="width:auto;font-size:0.82rem;padding:6px 10px">
              <option value="pending" ${s.status === 'pending' ? 'selected' : ''}>待处理</option>
              <option value="reviewing" ${s.status === 'reviewing' ? 'selected' : ''}>审核中</option>
              <option value="accepted" ${s.status === 'accepted' ? 'selected' : ''}>已采纳</option>
              <option value="done" ${s.status === 'done' ? 'selected' : ''}>已完成</option>
            </select>
            <button class="btn btn-primary btn-sm" onclick="adminUpdateSuggestion(${s.id})"><i class="fas fa-save"></i> 保存</button>
          </div>
        </div>
      `;
    }).join('')}
  `;
}

async function adminUpdateSuggestion(sugId) {
  const reply = document.getElementById('sugReply_' + sugId).value.trim();
  const status = document.getElementById('sugStatus_' + sugId).value;
  try {
    await API.request('/api/admin/suggestions/' + sugId, { method: 'PUT', body: JSON.stringify({ status, admin_reply: reply }) });
    toast('建议已更新', 'success');
    render();
  } catch (e) {
    toast('更新失败: ' + e.message, 'error');
  }
}

var adminSelectedSuggestions = new Set();

function adminSugToggleSelect(sugId) {
  if (adminSelectedSuggestions.has(sugId)) adminSelectedSuggestions.delete(sugId);
  else adminSelectedSuggestions.add(sugId);
  render();
}

function adminSugSelectAll() {
  const sugs = state.adminData?.suggestions || [];
  sugs.forEach(s => adminSelectedSuggestions.add(s.id));
  render();
}

function adminSugClearSelection() {
  adminSelectedSuggestions.clear();
  render();
}

async function adminDeleteSuggestion(sugId) {
  if (!confirm('确定删除这条建议吗？')) return;
  try {
    await API.request('/api/admin/suggestions/' + sugId, { method: 'DELETE' });
    toast('建议已删除', 'success');
    render();
  } catch (e) { toast('删除失败: ' + e.message, 'error'); }
}

async function adminSugBatchDelete() {
  if (adminSelectedSuggestions.size === 0) { toast('请先选择建议', 'error'); return; }
  if (!confirm('确定删除选中的 ' + adminSelectedSuggestions.size + ' 条建议吗？')) return;
  const suggestion_ids = Array.from(adminSelectedSuggestions);
  try {
    const data = await API.post('/api/admin/suggestions/batch', { action: 'delete', suggestion_ids });
    toast(data.message || '删除成功', 'success');
    adminSelectedSuggestions.clear();
    render();
  } catch (e) { toast('删除失败: ' + e.message, 'error'); }
}

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

async function adminDeleteAnnouncement(annId) {
  if (!confirm('确定删除这条公告吗？')) return;
  try {
    await API.request('/api/admin/announcements/' + annId, { method: 'DELETE' });
    toast('公告已删除', 'success');
    announcements_global = []; // 清除缓存以重新加载
    render();
  } catch (e) { toast('删除失败: ' + e.message, 'error'); }
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
    const ok = await checkAuth();
    if (ok) {
      await loadCategories();
      await loadNotifications();
    } else {
      // Token expired or invalid
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      await loadCategories();
      var route = getRoute();
      if (!route.startsWith('/login') && !route.startsWith('/post/')) {
        navigate('/login');
      }
    }
  } else if (state.isGuest) {
    // Guest mode - allow browsing
    await loadCategories();
  } else {
    await loadCategories();
    // Allow viewing shared post links without login
    var route = getRoute();
    if (!route.startsWith('/login') && !route.startsWith('/post/')) {
      navigate('/login');
    }
  }

  window.addEventListener('hashchange', render);
  await render();
  
  // Periodically check notifications
  setInterval(loadNotifications, 60000);
}

// Start
init();
