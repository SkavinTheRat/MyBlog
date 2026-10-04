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
