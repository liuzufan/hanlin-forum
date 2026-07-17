/**
 * 翰林校园论坛 - 数据库模块 (Cloudflare KV + Supabase 版)
 * 优先使用 Cloudflare KV 持久化，回退到 Supabase Storage
 * 无 fs/path 依赖，兼容 serverless 环境
 */
const bcrypt = require('bcryptjs');

let _env = {};
let db = null;
let _dirty = false;

function setEnv(env) { _env = env; db = null; _dirty = false; }

function useKV() { return !!_env.FORUM_DB; }
function getSupabaseUrl() { return _env.SUPABASE_URL || (typeof process !== 'undefined' && process.env?.SUPABASE_URL) || ''; }
function getSupabaseKey() { return _env.SUPABASE_SERVICE_KEY || (typeof process !== 'undefined' && process.env?.SUPABASE_SERVICE_KEY) || ''; }
function useSupabase() { return !!(getSupabaseUrl() && getSupabaseKey()); }

const BUCKET_NAME = 'forum-data';
const FILE_NAME = 'forum_db.json';
const KV_KEY = 'forum_db_v5';

function getDefaultData() {
  return {
    users: [], categories: [], posts: [], comments: [],
    post_likes: [], post_votes: [], comment_likes: [],
    suggestions: [], suggestion_supports: [], notifications: [],
    favorites: [], post_polls: [], poll_votes: [],
    announcements: [], banned_users: [],
    nextId: { users: 1, categories: 1, posts: 1, comments: 1, suggestions: 1, notifications: 1, post_likes: 1, post_votes: 1, comment_likes: 1, suggestion_supports: 1, favorites: 1, post_polls: 1, poll_votes: 1, announcements: 1, banned_users: 1 },
  };
}

// === Supabase Storage via fetch ===
async function initSupabaseStorage() {
  if (!useSupabase()) return;
  try {
    const res = await fetch(`${getSupabaseUrl()}/storage/v1/bucket`, { headers: { Authorization: `Bearer ${getSupabaseKey()}` } });
    if (res.ok) {
      const buckets = await res.json();
      if (!buckets.find(b => b.name === BUCKET_NAME)) {
        await fetch(`${getSupabaseUrl()}/storage/v1/bucket`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${getSupabaseKey()}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: BUCKET_NAME, public: false }),
        });
      }
    }
  } catch (e) { console.error('[DB] bucket init:', e.message); }
}

async function loadFromSupabase() {
  const res = await fetch(`${getSupabaseUrl()}/storage/v1/object/${BUCKET_NAME}/${FILE_NAME}`, { headers: { Authorization: `Bearer ${getSupabaseKey()}` } });
  if (!res.ok) { if (res.status === 404) return null; throw new Error(`download: ${res.status}`); }
  return JSON.parse(await res.text());
}

async function saveToSupabase() {
  if (!db) return;
  const res = await fetch(`${getSupabaseUrl()}/storage/v1/object/${BUCKET_NAME}/${FILE_NAME}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getSupabaseKey()}`, 'Content-Type': 'application/json', 'x-upsert': 'true' },
    body: JSON.stringify(db, null, 2),
  });
  if (!res.ok) console.error('[DB] save failed:', res.status);
}

// === Cloudflare KV ===
async function loadFromKV() {
  const data = await _env.FORUM_DB.get(KV_KEY, 'json');
  return data;
}

async function saveToKV() {
  if (!db) return;
  await _env.FORUM_DB.put(KV_KEY, JSON.stringify(db));
}

// === Init / Load / Save ===
// 每次请求都从 KV 读取最新数据，确保数据一致性
async function loadDB() {
  if (db) return db;
  
  if (useKV()) {
    try {
      const cloud = await loadFromKV();
      if (cloud) {
        db = cloud;
        const defaults = getDefaultData();
        Object.keys(defaults).forEach(k => { if (db[k] === undefined) db[k] = defaults[k]; });
        Object.keys(defaults.nextId).forEach(k => { if (db.nextId[k] === undefined) db.nextId[k] = defaults.nextId[k]; });
      } else {
        db = getDefaultData();
        seedData();
        _dirty = true;
        await saveToKV();
        _dirty = false;
      }
      return db;
    } catch (e) {
      console.error('[DB] KV load failed:', e.message);
    }
  }
  
  // 回退到 Supabase
  if (useSupabase()) {
    await initSupabaseStorage();
    try {
      const cloud = await loadFromSupabase();
      if (cloud) {
        db = cloud;
        const defaults = getDefaultData();
        Object.keys(defaults).forEach(k => { if (db[k] === undefined) db[k] = defaults[k]; });
        Object.keys(defaults.nextId).forEach(k => { if (db.nextId[k] === undefined) db.nextId[k] = defaults.nextId[k]; });
      } else {
        db = getDefaultData();
        seedData();
        _dirty = true;
        await saveToSupabase();
        _dirty = false;
      }
      return db;
    } catch (e) {
      console.error('[DB] Supabase load failed, using memory:', e.message);
    }
  }
  
  // 最终回退：内存模式（数据不持久化）
  db = getDefaultData();
  seedData();
  return db;
}

async function saveDB() {
  if (!db || !_dirty) return;
  if (useKV()) {
    try {
      await saveToKV();
      _dirty = false;
    } catch (e) {
      console.error('[DB] KV save failed:', e.message);
    }
    return;
  }
  if (useSupabase()) {
    try { await saveToSupabase(); _dirty = false; } catch (e) { console.error('[DB] Supabase save failed:', e.message); }
  }
}

// 兼容旧接口
async function ensureDB() { return loadDB(); }
async function initDB() { return loadDB(); }
function markDirty() { _dirty = true; }
function getNextId(t) { if (!db.nextId[t]) db.nextId[t] = 1; return db.nextId[t]++; }

// ===== 种子数据 =====
const AVATAR_COLORS = ['#8B2323','#C9A227','#6B1A1A','#D4AF37','#A52A2A','#B8860B','#CD853F','#DA8A2C','#8B4513','#BDB76B','#9B2226','#BB9457','#6D1A1A','#CFA636','#7A1F1F','#DAA520','#A0522D','#BC8F8F','#8B6914','#D2691E'];

const SEED_USERS = [
  { username: '15118312809', nickname: '论坛管理员', department: '管理团队', role: 'admin' },
  { username: 'night_owl_2026', nickname: '深夜刷题人', department: '高中部', role: 'student' },
  { username: 'canteen_critic', nickname: '食堂测评员', department: '高中部', role: 'student' },
  { username: 'sleep_deprived_g3', nickname: '高三不眠者', department: '高中部', role: 'student' },
  { username: 'math_struggler', nickname: '数学困难户', department: '高中部', role: 'student' },
  { username: 'dream_chaser_g3', nickname: '追梦高三党', department: '高中部', role: 'student' },
  { username: 'library_ghost', nickname: '图书馆幽灵', department: '高中部', role: 'student' },
  { username: 'exam_anxiety', nickname: '考试焦虑症', department: '高中部', role: 'student' },
  { username: 'coffee_addict_g3', nickname: '咖啡续命党', department: '高中部', role: 'student' },
  { username: 'quiet_observer', nickname: '沉默围观者', department: '高中部', role: 'student' },
  { username: 'dorm_snack_king', nickname: '宿舍零食王', department: '高中部', role: 'student' },
  { username: 'rebel_without_cause', nickname: '叛逆初中生', department: '初中部', role: 'student' },
  { username: 'homework_drowner', nickname: '作业溺水者', department: '初中部', role: 'student' },
  { username: 'basketball_fan_j2', nickname: '篮球少年J2', department: '初中部', role: 'student' },
  { username: 'anime_lover_j3', nickname: '二次元初三党', department: '初中部', role: 'student' },
  { username: 'growing_pains_j1', nickname: '成长的烦恼', department: '初中部', role: 'student' },
  { username: 'science_geek_j2', nickname: '科学小怪人', department: '初中部', role: 'student' },
  { username: 'shy_bookworm_j', nickname: '腼腆书虫', department: '初中部', role: 'student' },
  { username: 'class_clown_j3', nickname: '班级活宝', department: '初中部', role: 'student' },
  { username: 'early_bloomer_j1', nickname: '早起鸟初一', department: '初中部', role: 'student' },
  { username: 'little_scientist', nickname: '小小科学家', department: '小学部', role: 'student' },
  { username: 'jump_rope_champ', nickname: '跳绳冠军', department: '小学部', role: 'student' },
  { username: 'drawing_master_p', nickname: '画画小达人', department: '小学部', role: 'student' },
  { username: 'cartoon_fan_p5', nickname: '动画迷五年级', department: '小学部', role: 'student' },
  { username: 'milk_lover_p3', nickname: '牛奶爱好者', department: '小学部', role: 'student' },
  { username: 'recess_runner_p', nickname: '课间飞毛腿', department: '小学部', role: 'student' },
  { username: 'puzzle_solver_p4', nickname: '谜题破解者', department: '小学部', role: 'student' },
  { username: 'story_teller_p6', nickname: '故事大王', department: '小学部', role: 'student' },
  { username: 'little_singer_p', nickname: '小小歌唱家', department: '小学部', role: 'student' },
  { username: 'curious_cat_p2', nickname: '好奇小猫', department: '小学部', role: 'student' },
  { username: 'global_citizen_i', nickname: '世界公民', department: '国际部', role: 'student' },
  { username: 'ielts_fighter', nickname: '雅思斗士', department: '国际部', role: 'student' },
  { username: 'culture_bridge_i', nickname: '文化桥梁', department: '国际部', role: 'student' },
  { username: 'toefl_dreamer_i', nickname: '托福追梦人', department: '国际部', role: 'student' },
  { username: 'multilingual_i', nickname: '多语种爱好者', department: '国际部', role: 'student' },
  { username: 'strict_but_caring', nickname: '严师出高徒', department: '高中部', role: 'teacher' },
  { username: 'homeroom_teacher_g', nickname: '高三班主任', department: '高中部', role: 'teacher' },
  { username: 'young_teacher_j', nickname: '新锐教师', department: '初中部', role: 'teacher' },
  { username: 'patient_teacher_p', nickname: '耐心园丁', department: '小学部', role: 'teacher' },
  { username: 'international_edu', nickname: '国际教育者', department: '国际部', role: 'teacher' },
  { username: 'lurker_no1', nickname: '潜水一号', department: '高中部', role: 'student' },
  { username: 'lurker_no2', nickname: '吃瓜群众甲', department: '初中部', role: 'student' },
  { username: 'lurker_no3', nickname: '吃瓜群众乙', department: '高中部', role: 'student' },
  { username: 'lurker_no4', nickname: '吃瓜群众丙', department: '小学部', role: 'student' },
  { username: 'lurker_no5', nickname: '吃瓜群众丁', department: '国际部', role: 'student' },
  { username: 'occasional_poster', nickname: '偶尔冒泡', department: '高中部', role: 'student' },
  { username: 'silent_reader', nickname: '默默阅读者', department: '初中部', role: 'student' },
  { username: 'weekend_sleeper', nickname: '周末补觉专家', department: '高中部', role: 'student' },
  { username: 'stationery_hoarder', nickname: '文具囤积狂', department: '初中部', role: 'student' },
  { username: 'hallway_walker', nickname: '走廊散步家', department: '高中部', role: 'student' },
];

const CATEGORIES = [
  { name: '学习交流', slug: 'study', icon: 'book-open', color: '#C9A227', description: '分享学习心得，讨论难题，互助进步', sort_order: 1 },
  { name: '校园生活', slug: 'campus-life', icon: 'school', color: '#8B2323', description: '记录校园日常，分享生活点滴', sort_order: 2 },
  { name: '社团活动', slug: 'clubs', icon: 'users', color: '#BB9457', description: '社团招新、活动通知、成果展示', sort_order: 3 },
  { name: '体育竞技', slug: 'sports', icon: 'trophy', color: '#DA8A2C', description: '赛事讨论、运动健身、体育精神', sort_order: 4 },
  { name: '艺术天地', slug: 'arts', icon: 'palette', color: '#A52A2A', description: '音乐、美术、舞蹈、摄影等艺术分享', sort_order: 5 },
  { name: '升学就业', slug: 'future', icon: 'graduation-cap', color: '#6B1A1A', description: '高考备考、志愿填报、职业规划', sort_order: 6 },
  { name: '失物招领', slug: 'lost-found', icon: 'search', color: '#B8860B', description: '丢失物品寻回，拾到物品归还', sort_order: 7 },
  { name: '建议反馈', slug: 'suggestions', icon: 'lightbulb', color: '#D4AF37', description: '对学校和论坛的建议与反馈', sort_order: 8 },
];

const SAMPLE_POSTS = [
  { user_idx: 4, cat_slug: 'campus-life', title: '准高三想问问，高三连周放假那周能不能周五下午就回家？', content: '马上升高三了，还没开学，但听学长学姐说高三会连周上课。\n\n意思是连续上两周或三周才放一次假，而且放假那周六下午才让走，周日晚上又要回来。\n\n在家待不到24小时，这也太短了吧？\n\n想问问大家，放假那周能不能周五下午就让走？多在家待一晚，周一回来状态也好一些。\n\n学长学姐们觉得这个提议合理吗？如果合理的话我想开学后跟老师反映一下。', tags: ['高三', '连周', '放假', '准高三'], is_hot_post: true, poll: { question: '你支持放假那周提前到周五下午离校吗？', agree: 32, disagree: 8 } },
  { user_idx: 1, cat_slug: 'study', title: '高二期末数学考了132分，分享下复习方法', content: '这次期末考试数学132分，年级排名前20，分享一下我的复习方法：\n\n1. 错题本是关键，考前两周只看错题本，不看新题\n2. 选择填空控制在40分钟内，大题留够时间\n3. 导数大题先做第一问，第二问有时间再做\n4. 圆锥曲线记住韦达定理的几个变形，考试直接套\n\n希望对大家有帮助，有问题的可以评论区问。', tags: ['数学', '复习方法', '期末'] },
  { user_idx: 6, cat_slug: 'campus-life', title: '新学期开学第一天，大家有什么期待？', content: '明天就开学了，整理了下书包发现暑假作业还差一点没写完...\n\n不过新学期新开始，这学期的目标：\n1. 数学稳在130以上\n2. 英语词汇量到3500\n3. 坚持每天跑步\n4. 少刷手机多看书\n\n大家新学期有什么目标？一起加油！', tags: ['新学期', '目标', '开学'] },
  { user_idx: 8, cat_slug: 'campus-life', title: '推荐几道食堂二楼新出的菜', content: '这周发现食堂二楼多了几道新菜，尝了一下：\n\n1. 酸汤肥牛：酸度刚好，肥牛量也足，15块性价比高\n2. 麻辣香锅：可以自选食材，微辣刚好不辣嘴\n3. 蛋包饭：颜值高味道也不错，就是排队人有点多\n\n推荐大家试试酸汤肥牛，目前是我在食堂的最爱。', tags: ['食堂', '美食', '推荐'] },
  { user_idx: 12, cat_slug: 'clubs', title: '文学社这周活动：一起读《活着》', content: '这周五下午文学社活动，这周读余华的《活着》。\n\n上学期读过余华的《兄弟》，感觉他的文字特别有力量。《活着》据说更催泪，提前看了个开头确实很沉重。\n\n活动时间：周五下午4:30\n地点：图书馆二楼活动室\n\n感兴趣的都可以来，不用报名，直接到就行。', tags: ['文学社', '读书', '活动'] },
  { user_idx: 13, cat_slug: 'sports', title: '体育课篮球测试，三步上篮技巧分享', content: '下周体育课要考三步上篮，分享下练习技巧：\n\n1. 第一步要大，跨出去降低重心\n2. 第二步要小，为起跳做准备\n3. 起跳时右手上篮，左脚起跳（右撇子）\n4. 球出手时用手指拨球，不要用手掌推\n\n关键就是节奏：大-小-跳。练熟了以后闭着眼都能进。\n\n还没练好的同学抓紧时间练，考试不难的。', tags: ['体育', '篮球', '考试'] },
];

const SAMPLE_COMMENTS = [
  { post_idx: 0, user_idx: 1, content: '太真实了，周五下午让走多好，多睡一晚第二天状态完全不一样' },
  { post_idx: 0, user_idx: 2, content: '认同+1，周六上午上课效率低得要命，大家都在倒数放假' },
  { post_idx: 0, user_idx: 4, content: '其实学校也是为了我们好，但方式可以改改' },
  { post_idx: 0, user_idx: 5, content: '回家也就睡一觉，不如在学校多刷两套题' },
  { post_idx: 0, user_idx: 6, content: '楼上你是卷王吧，正常人都想多回家待会儿' },
  { post_idx: 0, user_idx: 7, content: '连周第三周了，我感觉我快抑郁了，每天就是做题做题做题' },
  { post_idx: 0, user_idx: 8, content: '支持楼主，已投票' },
  { post_idx: 0, user_idx: 10, content: '上次跟班主任反映了，说是年级统一安排，改不了' },
  { post_idx: 0, user_idx: 11, content: '建议走建议反馈渠道正式提，光在论坛说没用' },
  { post_idx: 0, user_idx: 14, content: '我们国际部不连周，但看你们这样也挺惨的' },
  { post_idx: 0, user_idx: 20, content: '小学部路过，你们好辛苦' },
  { post_idx: 0, user_idx: 21, content: '等高考完就好了，再坚持坚持' },
  { post_idx: 0, user_idx: 25, content: '可以周六上午用来自习，不安排新课，愿意走的走' },
  { post_idx: 0, user_idx: 29, content: '投了认同，希望学校能看到这个帖子' },
  { post_idx: 0, user_idx: 30, content: '已转发到班群让大家来投' },
  { post_idx: 0, user_idx: 36, content: '看到大家的反馈了，我会跟年级组反映这个问题，感谢同学们的合理表达' },
  { post_idx: 0, user_idx: 37, content: '作为班主任也理解同学们的辛苦，我会帮忙沟通' },
  { post_idx: 1, user_idx: 3, content: '错题本真的有用，我靠错题本提了20分' },
  { post_idx: 1, user_idx: 5, content: '选择填空40分钟太赶了吧，我做不完' },
  { post_idx: 2, user_idx: 4, content: '我暑假作业一点没写，开学要完蛋了' },
  { post_idx: 2, user_idx: 9, content: '目标不错，但坚持才是最难的' },
  { post_idx: 3, user_idx: 5, content: '酸汤肥牛确实好吃！昨天刚吃过' },
  { post_idx: 3, user_idx: 10, content: '蛋包饭排队太久了，建议错峰去' },
  { post_idx: 4, user_idx: 7, content: '《活着》真的催泪，看完哭了半天' },
  { post_idx: 4, user_idx: 15, content: '文学社活动一直想去，这次一定去' },
  { post_idx: 5, user_idx: 8, content: '大-小-跳这个节奏口诀好记，谢谢分享' },
  { post_idx: 5, user_idx: 11, content: '三步上篮其实不难，多练几次就熟了' },
];

const SAMPLE_SUGGESTIONS = [
  { user_idx: 1, title: '建议延长图书馆开放时间至晚上10点', content: '期末考试期间，很多同学希望能在图书馆自习到更晚。目前9点闭馆，建议延长至10点，方便同学们复习。', category: 'campus', priority: 2 },
  { user_idx: 2, title: '建议增加食堂菜品种类，特别是素食选项', content: '目前食堂素食种类较少，建议增加素菜窗口，满足不同饮食习惯同学的需求。', category: 'canteen', priority: 1 },
  { user_idx: 3, title: '建议在教学楼增设饮水机', content: 'B栋教学楼目前只有一楼有饮水机，三楼四楼的同学接水不方便，建议每层都增设。', category: 'facility', priority: 2 },
  { user_idx: 4, title: '建议开设心理健康咨询预约线上通道', content: '目前心理咨询需要线下预约，很多同学觉得不好意思。建议开通线上匿名预约通道，保护隐私。', category: 'welfare', priority: 3 },
  { user_idx: 5, title: '建议校园WiFi覆盖操场区域', content: '操场区域目前没有WiFi信号，体育课用手机查资料不方便，建议增加AP覆盖。', category: 'facility', priority: 1 },
  { user_idx: 6, title: '建议举办跳蚤市场活动', content: '毕业季很多同学有闲置物品，建议学校组织跳蚤市场，既环保又能促进交流。', category: 'activity', priority: 1 },
];

const SAMPLE_ANNOUNCEMENTS = [
  { user_idx: 0, title: '关于期末考试安排的通知', content: '期末考试将于下周一至周三进行，请同学们合理安排复习时间。具体安排请查看教务处通知。', type: 'info' },
];

function seedData() {
  const pw = bcrypt.hashSync('123456', 8);
  const adminPw = bcrypt.hashSync('Qq65318320', 8);
  const now = Date.now();
  SEED_USERS.forEach((u, i) => {
    const bios = ['论坛管理员','高三生活分享','美食爱好者','坚持就是胜利','好好学习','记录校园日常','考试加油','咖啡因依赖','默默努力','热爱生活'];
    db.users.push({ id: getNextId('users'), username: u.username, password: u.role==='admin'?adminPw:pw, nickname: u.nickname, avatar_color: AVATAR_COLORS[i%AVATAR_COLORS.length], bio: bios[i%bios.length], department: u.department, created_at: new Date(now-(50-i)*86400000).toISOString(), post_count:0, comment_count:0, like_received:0, role: u.role||'student' });
  });
  CATEGORIES.forEach(c => db.categories.push({ id: getNextId('categories'), ...c }));
  SAMPLE_POSTS.forEach((p, idx) => {
    const u = db.users[p.user_idx], c = db.categories.find(x=>x.slug===p.cat_slug);
    const hot = p.is_hot_post;
    const cc = SAMPLE_COMMENTS.filter(x=>x.post_idx===idx).length;
    db.posts.push({ id: getNextId('posts'), user_id:u.id, category_id:c.id, title:p.title, content:p.content, images:'[]', created_at:new Date(now-(SAMPLE_POSTS.length-idx)*3600000*6).toISOString(), views:hot?Math.floor(Math.random()*200)+800:Math.floor(Math.random()*300)+50, likes:hot?Math.floor(Math.random()*20)+80:Math.floor(Math.random()*30)+5, upvotes:hot?Math.floor(Math.random()*20)+60:Math.floor(Math.random()*20)+3, downvotes:hot?Math.floor(Math.random()*3)+2:Math.floor(Math.random()*3), comment_count:cc, is_pinned:hot?1:0, is_hot:hot?1:0, tags:JSON.stringify(p.tags||[]) });
    if (p.poll) db.post_polls.push({ id: getNextId('post_polls'), post_id:db.posts[db.posts.length-1].id, question:p.poll.question, agree:p.poll.agree, disagree:p.poll.disagree });
  });
  SAMPLE_COMMENTS.forEach((c, i) => { const p=db.posts[c.post_idx], u=db.users[c.user_idx]; db.comments.push({ id: getNextId('comments'), post_id:p.id, user_id:u.id, parent_id:null, content:c.content, created_at:new Date(now-(SAMPLE_POSTS.length-c.post_idx)*3600000*5+i*600000).toISOString(), likes:Math.floor(Math.random()*8) }); });
  SAMPLE_SUGGESTIONS.forEach(s => { const u=db.users[s.user_idx]; db.suggestions.push({ id: getNextId('suggestions'), user_id:u.id, title:s.title, content:s.content, category:s.category, status:s.priority>=3?'reviewing':(s.priority>=2?'accepted':'pending'), priority:s.priority, created_at:new Date(now-Math.random()*7*86400000).toISOString(), support_count:Math.floor(Math.random()*30)+5, admin_reply:'' }); });
  SAMPLE_ANNOUNCEMENTS.forEach(a => { const u=db.users[a.user_idx]; db.announcements.push({ id: getNextId('announcements'), user_id:u.id, title:a.title, content:a.content, type:a.type||'info', created_at:new Date(now-2*86400000).toISOString() }); });
  db.users.forEach(u => { u.post_count=db.posts.filter(p=>p.user_id===u.id).length; u.comment_count=db.comments.filter(c=>c.user_id===u.id).length; u.like_received=db.posts.filter(p=>p.user_id===u.id).reduce((s,p)=>s+p.likes,0); });
}

// ===== Query Helpers =====
function getDB() { return db; }
function findById(t, id) { return db[t].find(r => r.id === id); }
function findOne(t, c) { return db[t].find(r => Object.entries(c).every(([k,v]) => r[k] === v)); }
function findAll(t, c) { if (!c) return [...db[t]]; return db[t].filter(r => Object.entries(c).every(([k,v]) => r[k] === v)); }
function insert(t, d) { const r = { id: getNextId(t), ...d }; db[t].push(r); _dirty = true; return r; }
function update(t, id, u) { const r = findById(t, id); if (r) { Object.assign(r, u); _dirty = true; } return r; }
function remove(t, c) { const before = db[t].length; db[t] = db[t].filter(r => !Object.entries(c).every(([k,v]) => r[k] === v)); if (db[t].length !== before) _dirty = true; }
function increment(t, id, f, a=1) { const r = findById(t, id); if (r) { r[f] = (r[f]||0)+a; _dirty = true; } }

module.exports = { loadDB, saveDB, getDB, ensureDB, initDB, findById, findOne, findAll, insert, update, remove, increment, markDirty, setEnv };
