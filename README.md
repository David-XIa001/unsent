# ✉️ 未寄 · Unsent

> **留在地表上的未寄之信**  
> 留在某个路口、某张长椅，终究未曾寄给对方的话。在物理坐标里留下心事，等待星夜里陌生人的善意回响。

---

## 🌟 核心特性

- 🌌 **深色星夜无水印底图**：基于 MapLibre GL 与高分辨率极夜底图，沉浸感深邃纯净。
- 💫 **五维情绪呼吸微光**：思念（蓝）、秘密（紫）、治愈（橙）、释怀（绿）、告白（红）全图动态波纹。
- ⏳ **时空信封与倒计时**：未到期内容封存于水晶外壳中，展示精确到秒的拆封倒计时。
- 📷 **拍立得图文与直传压缩**：支持手机相册上传、拍照与截图直接 `Ctrl+V` 粘贴，客户端自动等比轻量压缩。
- 🏷️ **拍立得分享海报 + 二维码**：一键生成自带经纬度印章的高清相纸海报，扫码直达此处的记忆坐标。
- ✈️ **纸飞机回音与微光共振**：点亮心灯伴随彩色礼花特效，拒绝争吵，仅保留善意回信。
- 🎲 **漫步地表 (任意门)**：如流星般穿梭地图，随机降落拆阅世界角落的陌生人独白。

---

## 🛠️ 技术选型

- **前端架构**：Vite + React 19 + TypeScript + Tailwind CSS
- **地图渲染**：MapLibre GL JS (WebGL 硬件加速)
- **海报与二维码**：`html-to-image` + `qrcode.react` + `canvas-confetti`
- **云端 BaaS (选填)**：Supabase (PostgreSQL + PostGIS 空间索引 + RLS 行级安全)
- **部署平台**：Vercel / Cloudflare Pages (永久 $0 成本上线)

---

## 🚀 极速本地运行

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 生产打包
npm run build
```

---

## ☁️ 0 成本云端上线步骤 (5分钟)

### 1. 数据库建表 (Supabase 免费层)
1. 前往 [Supabase](https://supabase.com) 免费创建新项目；
2. 进入项目 **SQL Editor**，粘贴并运行项目中的 [`src/supabase_schema.sql`](./src/supabase_schema.sql)；
3. 在 **Project Settings -> API** 中复制 `Project URL` 与 `anon public` key。

### 2. 前端部署 (Vercel)
1. 将本项目推送到你的 GitHub 仓库；
2. 登录 [Vercel](https://vercel.com)，点击 **Import** 导入该仓库；
3. 在 **Environment Variables** 填入两项环境变量：
   - `VITE_SUPABASE_URL` = 你的 Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = 你的 Supabase Anon Key
4. 点击 **Deploy**，约 1 分钟即可生成全球 CDN 加速的公网直达域名！
