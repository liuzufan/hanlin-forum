# 翰林校园论坛

东莞市翰林实验学校校园论坛 - 学习交流·校园生活·社团活动

## 功能特性

- 学生/老师注册登录，游客可浏览
- 发帖、评论、点赞、收藏、投票
- 管理员后台：删帖、发布公告、禁言、发起投票、查看用户统计
- PWA 移动端支持，可添加到主屏幕
- 暖色渐变主题 UI（锈红→暖沙金），Apple 风格设计

## 管理员账号

管理员账号在首次启动时自动创建，凭据存储在服务端配置中，不对外公开。

## 技术栈

- 后端：Node.js + Express + JWT
- 数据库：JSON 文件存储（零配置）
- 前端：原生 JS SPA + Hash 路由
- UI：Glassmorphism + Noto Sans/Serif SC

## 本地运行

```bash
npm install
node server.js
```

访问 http://localhost:3000

## 部署

### 方式一：Zeabur（推荐，国内访问快）

1. 访问 https://zeabur.com 注册
2. 连接 GitHub 仓库
3. 选择本仓库，自动部署
4. 绑定域名即可国内访问

### 方式二：Render

1. 访问 https://render.com 注册
2. 创建 Web Service，连接 GitHub 仓库
3. Build Command: `npm install`
4. Start Command: `node server.js`

### 方式三：Railway

1. 访问 https://railway.app 注册
2. New Project → Deploy from GitHub repo
3. 自动检测并部署

## 自动更新

推送到 GitHub main 分支后，已连接的平台会自动重新部署。
