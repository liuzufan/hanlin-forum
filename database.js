/**
 * 翰林校园论坛 - JSON 文件存储数据库
 * 纯 JavaScript 实现，无需原生编译
 */
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'data', 'forum_db.json');

let db = null;

function getDefaultData() {
  return {
    users: [],
    categories: [],
    posts: [],
    comments: [],
    post_likes: [],
    post_votes: [],
    comment_likes: [],
    suggestions: [],
    suggestion_supports: [],
    notifications: [],
    favorites: [],
    post_polls: [],
    poll_votes: [],
    announcements: [],
    banned_users: [],
    nextId: { users: 1, categories: 1, posts: 1, comments: 1, suggestions: 1, notifications: 1, post_likes: 1, post_votes: 1, comment_likes: 1, suggestion_supports: 1, favorites: 1, post_polls: 1, poll_votes: 1, announcements: 1, banned_users: 1 },
  };
}

function loadDB() {
  if (db) return db;
  if (fs.existsSync(DB_PATH)) {
    try {
      const raw = fs.readFileSync(DB_PATH, 'utf-8');
      db = JSON.parse(raw);
      // 迁移：补充旧数据文件中缺失的新表
      const defaults = getDefaultData();
      Object.keys(defaults).forEach(key => {
        if (db[key] === undefined) db[key] = defaults[key];
      });
      Object.keys(defaults.nextId).forEach(key => {
        if (db.nextId[key] === undefined) db.nextId[key] = defaults.nextId[key];
      });
    } catch (e) {
      console.error('[DB] Failed to parse DB file, creating new one:', e.message);
      db = getDefaultData();
    }
  } else {
    db = getDefaultData();
    seedData();
    saveDB();
  }
  return db;
}

function saveDB() {
  if (!db) return;
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
  } catch (e) {
    console.error('[DB] Failed to save:', e.message);
  }
}

let saveTimer = null;
function scheduleSave() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => { saveDB(); saveTimer = null; }, 100);
}

function getNextId(table) {
  if (!db.nextId[table]) db.nextId[table] = 1;
  return db.nextId[table]++;
}

// ===== 种子数据 =====
const AVATAR_COLORS = [
  '#8B2323', '#C9A227', '#6B1A1A', '#D4AF37', '#A52A2A',
  '#B8860B', '#CD853F', '#DA8A2C', '#8B4513', '#BDB76B',
  '#9B2226', '#BB9457', '#6D1A1A', '#CFA636', '#7A1F1F',
  '#DAA520', '#A0522D', '#BC8F8F', '#8B6914', '#D2691E',
];

const SEED_USERS = [
  { username: '15118312809', nickname: '论坛管理员', department: '管理团队', role: 'admin' },
  // 高中部学生 (匿名昵称)
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
  // 初中部学生
  { username: 'rebel_without_cause', nickname: '叛逆初中生', department: '初中部', role: 'student' },
  { username: 'homework_drowner', nickname: '作业溺水者', department: '初中部', role: 'student' },
  { username: 'basketball_fan_j2', nickname: '篮球少年J2', department: '初中部', role: 'student' },
  { username: 'anime_lover_j3', nickname: '二次元初三党', department: '初中部', role: 'student' },
  { username: 'growing_pains_j1', nickname: '成长的烦恼', department: '初中部', role: 'student' },
  { username: 'science_geek_j2', nickname: '科学小怪人', department: '初中部', role: 'student' },
  { username: 'shy_bookworm_j', nickname: '腼腆书虫', department: '初中部', role: 'student' },
  { username: 'class_clown_j3', nickname: '班级活宝', department: '初中部', role: 'student' },
  { username: 'early_bloomer_j1', nickname: '早起鸟初一', department: '初中部', role: 'student' },
  // 小学部学生
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
  // 国际部学生
  { username: 'global_citizen_i', nickname: '世界公民', department: '国际部', role: 'student' },
  { username: 'ielts_fighter', nickname: '雅思斗士', department: '国际部', role: 'student' },
  { username: 'culture_bridge_i', nickname: '文化桥梁', department: '国际部', role: 'student' },
  { username: 'toefl_dreamer_i', nickname: '托福追梦人', department: '国际部', role: 'student' },
  { username: 'multilingual_i', nickname: '多语种爱好者', department: '国际部', role: 'student' },
  // 老师
  { username: 'strict_but_caring', nickname: '严师出高徒', department: '高中部', role: 'teacher' },
  { username: 'homeroom_teacher_g', nickname: '高三班主任', department: '高中部', role: 'teacher' },
  { username: 'young_teacher_j', nickname: '新锐教师', department: '初中部', role: 'teacher' },
  { username: 'patient_teacher_p', nickname: '耐心园丁', department: '小学部', role: 'teacher' },
  { username: 'international_edu', nickname: '国际教育者', department: '国际部', role: 'teacher' },
  // 潜水/吃瓜用户 (只评论不发帖)
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
  // 核心热门帖: 高三连周上学 — 超高讨论度，带投票
  {
    user_idx: 3, cat_slug: 'campus-life',
    title: '高三连周上学太累了，放假那周能不能不要周六才回去',
    content: '真的扛不住了。连周上学第三周了，每天6点起11点睡，周末只有半天假。\n\n放假那周六下午才让回去，周日晚上又要回来，在家待不到24小时。\n\n我知道高三辛苦是应该的，但能不能放假那周五下午就让走？多在家待一晚，周一来学校状态都不一样。\n\n大家觉得呢？',
    tags: ['高三', '连周', '放假'],
    is_hot_post: true,
    poll: { question: '你认同放假那周提前到周五下午离校吗？', agree: 142, disagree: 25 },
  },
  // 食堂吐槽
  {
    user_idx: 2, cat_slug: 'campus-life',
    title: '食堂伙食一般般，说说我的真实感受',
    content: '吃了一学期了，说点实话：\n\n一楼套餐：菜品就那几样轮换，红烧肉有时候肥肉比肉多，青菜经常炒过头发黄。\n\n二楼风味：糖醋排骨还行但是量少，一碗面12块就那么几根。\n\n早餐豆浆兑水太多了，包子馅儿也越来越少。\n\n不是说难吃到不能吃，就是觉得伙食费一学期交那么多，质量能不能提一下？',
    tags: ['食堂', '伙食', '吐槽'],
  },
  // 学习求助
  {
    user_idx: 1, cat_slug: 'study',
    title: '导数压轴题做了一晚上还是不会，有没有大佬讲讲思路',
    content: '题目：已知f(x)=lnx-ax²，若f(x)≤0恒成立，求a的范围。\n\n我试着分离参数，但lnx/x²求导以后搞不下去了。看答案说要用到洛必达法则但我们没学过。\n\n有没有不超纲的解法？或者有谁能讲讲这个思路？',
    tags: ['数学', '导数', '高三'],
  },
  {
    user_idx: 4, cat_slug: 'study',
    title: '圆锥曲线真的要放弃了，每次考试都空着',
    content: '从高二到现在，圆锥曲线大题没有一次做完整过。\n\n联立方程算到一半就算错，韦达定理代进去以后化简不出来。\n\n感觉这题就是给学霸准备的，普通学生还是老老实实拿前面的分吧。\n\n有没有同感的？',
    tags: ['数学', '圆锥曲线', '放弃'],
  },
  // 校园生活
  {
    user_idx: 6, cat_slug: 'campus-life',
    title: '图书馆自习室能不能管管占座的',
    content: '每天早上去图书馆，一半座位放着书没人。有些人一本书放那儿占一天，下午才来。\n\n能不能跟学校建议一下，超过30分钟不在座位上的就算自动放弃？\n\n期末了大家都需要自习位置，这样太不公平了。',
    tags: ['图书馆', '占座', '自习'],
  },
  {
    user_idx: 10, cat_slug: 'campus-life',
    title: '宿舍查违禁品越来越严了，小风扇也被没收',
    content: '上周宿管突击检查，我的USB小风扇被收了，说是违禁电器。\n\n就一个巴掌大的小风扇，5V的，能有什么安全隐患？\n\n夏天宿舍空调26度以上才开，上铺热的睡不着，不带个小风扇怎么活？\n\n有没有人知道哪里能申诉拿回来的？',
    tags: ['宿舍', '违禁品', '小风扇'],
  },
  {
    user_idx: 7, cat_slug: 'campus-life',
    title: '一模考完心态崩了，比月考退步了50分',
    content: '一模成绩出来了，总分比上次月考退了50分。\n\n数学最后一道大题完全没思路，英语阅读理解错了5个，理综时间不够最后一道实验题空着。\n\n越想越慌，感觉高考完了。有没有过来人说说一模和高考差距大不大？',
    tags: ['一模', '心态', '退步'],
  },
  {
    user_idx: 8, cat_slug: 'campus-life',
    title: '小卖部咖啡涨价了，从5块涨到7块',
    content: '开学的时候雀巢速溶5块一包，这周去变7块了。\n\n高三党每天靠咖啡续命，一个月多花四五十块。\n\n有没有人知道小卖部定价是谁管的？能不能提个意见。',
    tags: ['小卖部', '咖啡', '涨价'],
  },
  // 升学就业
  {
    user_idx: 5, cat_slug: 'future',
    title: '强基计划到底值不值得报？有没有了解的',
    content: '班主任建议我报强基计划，说是多一次机会。\n\n但我看了下专业都是基础学科，数学、物理、化学这些，我想学计算机。\n\n如果高考正常发挥能上985的话，是不是就不用走强基了？\n\n有没有学长学姐了解的给点建议？',
    tags: ['强基计划', '高考', '志愿'],
  },
  // 初中相关
  {
    user_idx: 12, cat_slug: 'campus-life',
    title: '初二作业也太多了吧，写到11点还没完',
    content: '语文一张卷子+作文，数学两页练习册，英语背50个单词+完形填空，物理一张卷子。\n\n这还是一天的量，明天还有。\n\n才初二就这样，初三怎么办？有没有人觉得作业量不合理？',
    tags: ['初二', '作业', '减负'],
  },
  {
    user_idx: 14, cat_slug: 'clubs',
    title: '学校能不能搞个动漫社团，想认识同好',
    content: '看了下社团列表，有辩论社、文学社、航模社，就是没有动漫社。\n\n喜欢看番的同学其实挺多的，课间讨论的也不少。\n\n能不能跟学校申请一个？大家觉得有必要吗？',
    tags: ['动漫社', '社团', '申请'],
  },
  // 国际部
  {
    user_idx: 32, cat_slug: 'future',
    title: '雅思第三次考了6.0，口语还是上不去',
    content: '听力7.0阅读7.0写作6.0，口语5.0拖后腿。\n\n每次考官问问题我脑子里就空白，准备的素材一个都用不上。\n\n有没有口语上7的大佬分享下经验？要不要报个一对一？',
    tags: ['雅思', '口语', '国际部'],
  },
  // 老师发帖
  {
    user_idx: 36, cat_slug: 'study',
    title: '看到同学们吐槽连周上学，作为老师说两句',
    content: '看到有同学发帖说连周辛苦，理解大家的感受。\n\n但说一下学校的角度：高三冲刺阶段，连续学习确实有助于保持节奏。如果频繁放假，很多同学回家以后学习状态会断掉。\n\n当然也不是不能商量，如果大家有合理建议可以走建议反馈渠道，学校会考虑的。',
    tags: ['老师', '连周', '回应'],
  },
  // 体育
  {
    user_idx: 13, cat_slug: 'sports',
    title: '篮球场能不能延长开放时间，晚自习前根本抢不到',
    content: '篮球场5点半开放6点半关闭，中间就一个小时。\n\n初二晚自习6点40，打不了几分钟就得走。\n\n能不能跟学校说说延长到6点20？多打20分钟也好啊。',
    tags: ['篮球场', '开放时间', '体育'],
  },
  // 失物招领
  {
    user_idx: 46, cat_slug: 'lost-found',
    title: '在篮球场捡到一副黑色半框眼镜',
    content: '今天下午在篮球场边捡到一副黑色半框眼镜，度数挺高的。\n\n放在门卫室了，丢的同学去拿就行。',
    tags: ['失物招领', '眼镜'],
  },
  // 学习方法
  {
    user_idx: 9, cat_slug: 'study',
    title: '背单词用APP还是纸质书？试了一个月说说效果',
    content: '之前一直用百词斩，每天刷100个，但感觉记不住。\n\n这个月改用纸质词汇书+艾宾浩斯记忆法，每天30个但反复复习。\n\n效果明显好很多，做阅读的时候能认出来的词多了。\n\n个人感觉APP适合快速过一遍，真正记住还是得靠反复看纸质书。',
    tags: ['背单词', '英语', '方法'],
  },
  // 校园生活
  {
    user_idx: 49, cat_slug: 'campus-life',
    title: '学校门口文具店比网上贵好多，大家都在哪买',
    content: '同样的斑马中性笔，门口文具店8块，网上4块5。\n\n笔记本也贵，一本普通B5本子门口12块，拼多多6块包邮。\n\n但网上买要等2-3天，急用的时候只能门口买。\n\n大家有没有什么好的购买渠道推荐？',
    tags: ['文具', '价格', '购物'],
  },
  {
    user_idx: 48, cat_slug: 'campus-life',
    title: '宿舍空调能不能统一调到25度，上铺快热死了',
    content: '宿舍空调遥控器在宿管那里，统一设的27度。\n\n下铺还行，上铺离天花板近，热得跟蒸笼一样。\n\n能不能调到25度？或者至少26度？27度真的太热了。\n\n住过上铺的都懂这种感觉。',
    tags: ['宿舍', '空调', '温度'],
  },
  {
    user_idx: 42, cat_slug: 'campus-life',
    title: '运动会今年能不能搞个趣味项目多一些的',
    content: '去年运动会就跑步跳远铅球，大部分同学都只能看着。\n\n能不能加点趣味项目？比如两人三足、拔河、丢沙包之类的，参与度高一点。\n\n不爱运动的同学也想参加运动会啊。',
    tags: ['运动会', '趣味项目', '建议'],
  },
];

const SAMPLE_COMMENTS = [
  // === "高三连周上学"帖子的33条评论 (post_idx: 0) ===
  { post_idx: 0, user_idx: 1, content: '太真实了，周五下午让走多好，多睡一晚第二天状态完全不一样' },
  { post_idx: 0, user_idx: 2, content: '认同+1，周六上午上课效率低得要命，大家都在倒数放假' },
  { post_idx: 0, user_idx: 4, content: '其实学校也是为了我们好，但方式可以改改' },
  { post_idx: 0, user_idx: 5, content: '回家也就睡一觉，不如在学校多刷两套题' },
  { post_idx: 0, user_idx: 6, content: '楼上你是卷王吧，正常人都想多回家待会儿' },
  { post_idx: 0, user_idx: 7, content: '连周第三周了，我感觉我快抑郁了，每天就是做题做题做题' },
  { post_idx: 0, user_idx: 8, content: '支持楼主，已投票' },
  { post_idx: 0, user_idx: 9, content: '关键不是回家不回家的问题，是连周连太久没有缓冲期' },
  { post_idx: 0, user_idx: 10, content: '上次跟班主任反映了，说是年级统一安排，改不了' },
  { post_idx: 0, user_idx: 11, content: '建议走建议反馈渠道正式提，光在论坛说没用' },
  { post_idx: 0, user_idx: 12, content: '初三也连周，但只有两周，高三三周确实多了' },
  { post_idx: 0, user_idx: 13, content: '在家24小时确实太短了，光路上就花了两三个小时' },
  { post_idx: 0, user_idx: 14, content: '我们国际部不连周，但看你们这样也挺惨的' },
  { post_idx: 0, user_idx: 15, content: '其实最痛苦的是放假那周六上午还要考试' },
  { post_idx: 0, user_idx: 16, content: '考完试下午走，到家天都黑了，第二天下午又要回来' },
  { post_idx: 0, user_idx: 17, content: '投了认同，虽然我觉得提了也没用' },
  { post_idx: 0, user_idx: 18, content: '去年也是这样，提了一学期也没改' },
  { post_idx: 0, user_idx: 19, content: '支持支持支持，连周太折磨人了' },
  { post_idx: 0, user_idx: 20, content: '小学部路过，你们好辛苦' },
  { post_idx: 0, user_idx: 21, content: '等高考完就好了，再坚持坚持' },
  { post_idx: 0, user_idx: 22, content: '坚持个鬼，该提意见就提，身体最重要' },
  { post_idx: 0, user_idx: 23, content: '我们班好几个同学生病了，就是连周累的' },
  { post_idx: 0, user_idx: 24, content: '周五下午走的话，周六上午的课怎么办？补不补？' },
  { post_idx: 0, user_idx: 25, content: '可以周六上午用来自习，不安排新课，愿意走的走' },
  { post_idx: 0, user_idx: 26, content: '这个方案好，自主选择' },
  { post_idx: 0, user_idx: 27, content: '但老师会说不统一安排会影响教学进度' },
  { post_idx: 0, user_idx: 28, content: '进度进度进度，天天进度，学进去才算数啊' },
  { post_idx: 0, user_idx: 29, content: '投了认同，希望学校能看到这个帖子' },
  { post_idx: 0, user_idx: 30, content: '已转发到班群让大家来投' },
  { post_idx: 0, user_idx: 31, content: '85%认同了吧，希望校领导重视' },
  { post_idx: 0, user_idx: 40, content: '同感，每次放假在家不到一天又要收拾东西回来' },
  { post_idx: 0, user_idx: 47, content: '说实话连周最大的问题是睡眠不足，上课打瞌睡的越来越多' },
  { post_idx: 0, user_idx: 36, content: '看到大家的反馈了，我会跟年级组反映这个问题，感谢同学们的合理表达' },
  { post_idx: 0, user_idx: 37, content: '作为班主任也理解同学们的辛苦，我会帮忙沟通' },
  // === 食堂帖子评论 (post_idx: 1) ===
  { post_idx: 1, user_idx: 3, content: '红烧肉确实肥肉多，上次吃了一块全是肥的' },
  { post_idx: 1, user_idx: 4, content: '早餐豆浆真的是兑水兑到没味了' },
  { post_idx: 1, user_idx: 5, content: '二楼面确实少，但味道还行吧' },
  { post_idx: 1, user_idx: 6, content: '我觉得一楼套餐性价比还行，不能要求太高' },
  { post_idx: 1, user_idx: 37, content: '食堂问题会反馈给后勤，感谢同学的具体反馈' },
  // === 导数帖子评论 (post_idx: 2) ===
  { post_idx: 2, user_idx: 5, content: '分离参数法要注意x的范围，x>0' },
  { post_idx: 2, user_idx: 4, content: '同不会，导数大题太变态了' },
  { post_idx: 2, user_idx: 10, content: '可以用端点效应试试，f(1)=0这个点很关键' },
  // === 圆锥曲线帖子评论 (post_idx: 3) ===
  { post_idx: 3, user_idx: 7, content: '圆锥曲线我放弃了，时间花在导数上更划算' },
  { post_idx: 3, user_idx: 9, content: '联立方程用韦达定理以后别急着展开，先整体代换' },
  // === 图书馆占座帖子评论 (post_idx: 4) ===
  { post_idx: 4, user_idx: 1, content: '占座太烦了，建议扫码签到，离开超30分钟自动释放' },
  { post_idx: 4, user_idx: 6, content: '去教学楼空教室吧，图书馆又热又挤' },
  // === 宿舍小风扇帖子评论 (post_idx: 5) ===
  { post_idx: 5, user_idx: 2, content: '我的也被收过，找班主任签字就能拿回来' },
  { post_idx: 5, user_idx: 8, content: '买那种充电式的小风扇，不带线的就不算违禁' },
  // === 一模退步帖子评论 (post_idx: 6) ===
  { post_idx: 6, user_idx: 3, content: '一模本来就是为了暴露问题的，别太灰心' },
  { post_idx: 6, user_idx: 11, content: '我一模比高考低了80分，最后高考超常发挥了' },
  { post_idx: 6, user_idx: 36, content: '一模难度通常高于高考，查漏补缺才是关键，别盯着分数' },
  // === 咖啡涨价帖子评论 (post_idx: 7) ===
  { post_idx: 7, user_idx: 9, content: '7块也太贵了，我从网上买了一箱放宿舍' },
  { post_idx: 7, user_idx: 10, content: '小卖部租金贵，涨价也正常吧' },
  // === 强基计划帖子评论 (post_idx: 8) ===
  { post_idx: 8, user_idx: 5, content: '强基录取了就不能转专业，想学计算机的话慎重考虑' },
  { post_idx: 8, user_idx: 11, content: '当保底可以，但别抱太大期望' },
  // === 初二作业帖子评论 (post_idx: 9) ===
  { post_idx: 9, user_idx: 13, content: '初二还好，初三更恐怖' },
  { post_idx: 9, user_idx: 15, content: '语文作业最浪费时间，抄写生词这种毫无意义' },
  // === 动漫社帖子评论 (post_idx: 10) ===
  { post_idx: 10, user_idx: 14, content: '支持！我也想加动漫社' },
  { post_idx: 10, user_idx: 18, content: '学校大概率不会批，之前有人提过' },
  // === 雅思帖子评论 (post_idx: 11) ===
  { post_idx: 11, user_idx: 33, content: '口语建议找外教多练，或者跟同学用英语对话' },
  { post_idx: 11, user_idx: 35, content: 'P2题库刷完口语能上6.5，推荐试试' },
  // === 老师回应帖子评论 (post_idx: 12) ===
  { post_idx: 12, user_idx: 1, content: '谢谢老师理解，希望真的能改改' },
  { post_idx: 12, user_idx: 7, content: '老师说得对，但连周确实太长了' },
  // === 篮球场帖子评论 (post_idx: 13) ===
  { post_idx: 13, user_idx: 11, content: '5点半到6点半确实太短了' },
  { post_idx: 13, user_idx: 12, content: '可以中午去打，中午人少' },
  // === 失物招领帖子评论 (post_idx: 14) ===
  { post_idx: 14, user_idx: 46, content: '谢谢楼主，是我的眼镜' },
  // === 背单词帖子评论 (post_idx: 15) ===
  { post_idx: 15, user_idx: 4, content: '百词斩确实记不住，图形干扰太大' },
  { post_idx: 15, user_idx: 8, content: '墨墨背单词不错，有遗忘曲线提醒' },
  // === 文具帖子评论 (post_idx: 16) ===
  { post_idx: 16, user_idx: 49, content: '拼多多真的香，凑单买一学期量更便宜' },
  { post_idx: 16, user_idx: 43, content: '急用就门口买，不急就网上买，两全其美' },
  // === 宿舍空调帖子评论 (post_idx: 17) ===
  { post_idx: 17, user_idx: 48, content: '上铺+1，27度真的睡不着' },
  { post_idx: 17, user_idx: 3, content: '买个usb风扇偷偷用，别被查到就行' },
  // === 运动会帖子评论 (post_idx: 18) ===
  { post_idx: 18, user_idx: 44, content: '拔河必须有！去年我们班输了不服气' },
  { post_idx: 18, user_idx: 46, content: '两人三足好玩，支持加趣味项目' },
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
  const hashedPassword = bcrypt.hashSync('123456', 8);
  const adminPassword = bcrypt.hashSync('Qq65318320', 8);
  const now = Date.now();

  SEED_USERS.forEach((user, idx) => {
    const color = AVATAR_COLORS[idx % AVATAR_COLORS.length];
    const bios = [
      '论坛管理员',
      '高三生活分享',
      '美食爱好者',
      '坚持就是胜利',
      '好好学习',
      '记录校园日常',
      '考试加油',
      '咖啡因依赖',
      '默默努力',
      '热爱生活',
    ];
    db.users.push({
      id: getNextId('users'),
      username: user.username,
      password: user.role === 'admin' ? adminPassword : hashedPassword,
      nickname: user.nickname,
      avatar_color: color,
      bio: bios[idx % bios.length],
      department: user.department,
      created_at: new Date(now - (50 - idx) * 86400000).toISOString(),
      post_count: 0,
      comment_count: 0,
      like_received: 0,
      role: user.role || 'student',
    });
  });

  CATEGORIES.forEach(cat => {
    db.categories.push({
      id: getNextId('categories'),
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon,
      color: cat.color,
      description: cat.description,
      sort_order: cat.sort_order,
    });
  });

  SAMPLE_POSTS.forEach((post, idx) => {
    const user = db.users[post.user_idx];
    const cat = db.categories.find(c => c.slug === post.cat_slug);
    const isHot = post.is_hot_post;
    const views = isHot ? Math.floor(Math.random() * 200) + 800 : Math.floor(Math.random() * 300) + 50;
    const likes = isHot ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 30) + 5;
    const upvotes = isHot ? Math.floor(Math.random() * 20) + 60 : Math.floor(Math.random() * 20) + 3;
    const downvotes = isHot ? Math.floor(Math.random() * 3) + 2 : Math.floor(Math.random() * 3);
    const commentCount = SAMPLE_COMMENTS.filter(c => c.post_idx === idx).length;
    db.posts.push({
      id: getNextId('posts'),
      user_id: user.id,
      category_id: cat.id,
      title: post.title,
      content: post.content,
      images: '[]',
      created_at: new Date(now - (SAMPLE_POSTS.length - idx) * 3600000 * 6).toISOString(),
      views, likes, upvotes, downvotes,
      comment_count: commentCount,
      is_pinned: isHot ? 1 : 0,
      tags: JSON.stringify(post.tags || []),
    });

    if (post.poll) {
      db.post_polls.push({
        id: getNextId('post_polls'),
        post_id: db.posts[db.posts.length - 1].id,
        question: post.poll.question,
        agree: post.poll.agree,
        disagree: post.poll.disagree,
      });
    }
  });

  SAMPLE_COMMENTS.forEach((comment, idx) => {
    const post = db.posts[comment.post_idx];
    const user = db.users[comment.user_idx];
    const likes = Math.floor(Math.random() * 8);
    db.comments.push({
      id: getNextId('comments'),
      post_id: post.id,
      user_id: user.id,
      parent_id: null,
      content: comment.content,
      created_at: new Date(now - (SAMPLE_POSTS.length - comment.post_idx) * 3600000 * 5 + idx * 600000).toISOString(),
      likes,
    });
  });

  SAMPLE_SUGGESTIONS.forEach(sug => {
    const user = db.users[sug.user_idx];
    const supportCount = Math.floor(Math.random() * 30) + 5;
    const status = sug.priority >= 3 ? 'reviewing' : (sug.priority >= 2 ? 'accepted' : 'pending');
    db.suggestions.push({
      id: getNextId('suggestions'),
      user_id: user.id,
      title: sug.title,
      content: sug.content,
      category: sug.category,
      status,
      priority: sug.priority,
      created_at: new Date(now - Math.random() * 7 * 86400000).toISOString(),
      support_count: supportCount,
      admin_reply: '',
    });
  });

  SAMPLE_ANNOUNCEMENTS.forEach(ann => {
    const user = db.users[ann.user_idx];
    db.announcements.push({
      id: getNextId('announcements'),
      user_id: user.id,
      title: ann.title,
      content: ann.content,
      type: ann.type || 'info',
      created_at: new Date(now - 2 * 86400000).toISOString(),
    });
  });

  db.users.forEach(u => {
    u.post_count = db.posts.filter(p => p.user_id === u.id).length;
    u.comment_count = db.comments.filter(c => c.user_id === u.id).length;
    u.like_received = db.posts.filter(p => p.user_id === u.id).reduce((sum, p) => sum + p.likes, 0);
  });

  console.log(`[DB] Seeded ${db.users.length} users, ${db.categories.length} categories, ${db.posts.length} posts, ${db.comments.length} comments, ${db.suggestions.length} suggestions, ${db.post_polls.length} polls, ${db.announcements.length} announcements`);
}

// ===== Query Helpers =====
function getDB() { return loadDB(); }

function findById(table, id) {
  return db[table].find(r => r.id === id);
}

function findOne(table, condition) {
  return db[table].find(r => {
    return Object.entries(condition).every(([k, v]) => r[k] === v);
  });
}

function findAll(table, condition) {
  if (!condition) return [...db[table]];
  return db[table].filter(r => {
    return Object.entries(condition).every(([k, v]) => r[k] === v);
  });
}

function insert(table, data) {
  const record = { id: getNextId(table), ...data };
  db[table].push(record);
  scheduleSave();
  return record;
}

function update(table, id, updates) {
  const record = findById(table, id);
  if (record) {
    Object.assign(record, updates);
    scheduleSave();
  }
  return record;
}

function remove(table, condition) {
  const before = db[table].length;
  db[table] = db[table].filter(r => {
    return !Object.entries(condition).every(([k, v]) => r[k] === v);
  });
  if (db[table].length !== before) scheduleSave();
}

function increment(table, id, field, amount = 1) {
  const record = findById(table, id);
  if (record) {
    record[field] = (record[field] || 0) + amount;
    scheduleSave();
  }
}

module.exports = {
  loadDB, saveDB, getDB,
  findById, findOne, findAll,
  insert, update, remove, increment,
  scheduleSave,
};
