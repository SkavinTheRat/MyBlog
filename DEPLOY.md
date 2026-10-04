# 部署指南（SkavinTheRat Blog）

本项目为**纯静态站点**（Astro static output），构建产物在 `dist/`，可部署到任何静态托管平台。
推荐路径：**GitHub 仓库 → Vercel 一键导入**。全程免费。

---

## 第一步：推送到 GitHub

```bash
cd /d/MyBlog
git init            # 已完成可跳过
git add .
git commit -m "feat: 博客初始化"
# 在 GitHub 网页上新建一个空仓库（如 myblog），不要勾选 README，然后：
git remote add origin https://github.com/<你的用户名>/myblog.git
git branch -M main
git push -u origin main
```

> 验证方式：刷新 GitHub 仓库页面能看到代码；Actions 标签页中 "Build Check" 工作流变绿。

## 第二步：Vercel 导入（2 分钟）

1. 打开 <https://vercel.com>，用 **GitHub 账号登录**；
2. 点击 **Add New → Project**，选择刚才的 `myblog` 仓库；
3. Vercel 会自动识别 Astro 项目，**无需修改任何配置**，直接点 **Deploy**；
4. 约 1 分钟后得到访问地址：`https://<项目名>.vercel.app`。

> 验证方式：打开该地址能看到首页海报大字。此后每次 `git push`，Vercel 自动重新构建上线。

## 第三步（可选）：绑定自定义域名

1. 在域名服务商（阿里云/腾讯云/Namecheap）购买域名；
2. Vercel 项目 → **Settings → Domains** → 添加域名；
3. 按提示在域名服务商处添加 DNS 记录（CNAME 指向 `cname.vercel-dns.com`）；
4. 修改 `astro.config.ts` 中的 `site` 为你的域名，重新 push。

## 第四步（可选）：开启评论（Waline）

1. 按 <https://waline.js.org/guide/get-started/> 部署 Waline 服务端（Vercel + Neon/LeanCloud 免费方案）；
2. 得到服务端地址后，编辑 `src/site.config.ts`：
   ```ts
   waline: { enable: true, server: 'https://你的waline地址/' }
   ```
3. push 后文章底部即出现评论区。

## 第五步（可选）：访问统计

推荐 [Umami](https://umami.is/)（自托管、免费、隐私友好），部署后在 `src/site.config.ts` 的
`head` 数组中加入其 tracking script。

---

## 日常更新流程（网站上线后这样用）

### 发一篇博客文章

```bash
# 1. 在 src/content/blog/ 下新建文件夹（文件夹名即 URL，用英文短横线），内建 index.md
#    例：src/content/blog/python-notes-1/index.md
```

文章头部（frontmatter）格式，参考现有文章 `hello-world`：

```yaml
---
title: '文章标题（60 字内）'
description: '一句话摘要，会显示在列表页'
publishDate: 2026-10-04
tags: ['python', '笔记']
---
```

正文直接写 Markdown。

### 配图怎么传

- **文章配图**：与 `index.md` 放同一个文件夹（如 `cover.jpg`），正文里用 `![说明](./cover.jpg)` 引用；封面图在 frontmatter 加 `heroImage: { src: './cover.jpg', alt: '说明' }`。构建时自动压缩优化。
- **不改动的通用文件**（favicon、软件截图等长期资源）：放 `public/images/`，用 `/images/xxx.png` 绝对路径引用。
- **头像**：直接替换 `src/assets/avatar.png`（保持文件名不变）。

### 发一条随记

在 `src/content/notes/` 下新建 `.md` 文件（文件名随意，不进 URL）：

```yaml
---
publishDate: 2026-10-05
tags: ['想法']
---
正文一两句话即可。
```

### 更新音乐板块

编辑 `src/pages/music/index.astro` 顶部的三个数组（文件内有格式注释）：
`tracks` 最近在听 / `albums` 专辑 / `playlists` 歌单外链。

### 改站点信息

站名、简介、导航菜单、社交链接都在 `src/site.config.ts`。

### 本地预览与发布

```bash
npm run dev      # 本地实时预览（localhost:4321），写完先看一眼
git add .
git commit -m "post: 文章标题"   # 提交信息随意
git push         # 推送后 Vercel 约 1 分钟自动构建上线
```

**建议频率**：每月 1–2 篇文章 + 随想随手记随记。持续比爆发重要。

---

## 常见问题

| 问题 | 原因与解决 |
|------|-----------|
| Vercel 构建失败 "command not found" | 确认 Vercel 项目 Node 版本 ≥ 20（Settings → General → Node.js Version） |
| 页面 404 样式丢失 | 检查 `astro.config.ts` 的 `site` 是否与访问域名一致 |
| 搜索不可用 | Pagefind 依赖构建索引，本地需先 `npm run build` 再 `npm run preview` 才有效 |
| 首页插图不显示 | 确认图片在 `src/assets/home/` 内且通过 `import` 引用 |

## 日常更新流程

```bash
# 1. 写文章：在 src/content/blog/ 下新建文件夹 + index.md（参考 hello-world）
# 2. 写随记：在 src/content/notes/ 下新建 .md（只需 publishDate 和正文）
# 3. 本地预览
npm run dev
# 4. 上线（Vercel 自动构建）
git add . && git commit -m "post: 新文章标题" && git push
```
