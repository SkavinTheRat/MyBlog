# 写作规范（SkavinTheRat Blog）

写新文章前对照本文，可避免 90% 的格式问题。

---

## 一、文件放哪、怎么命名

| 类型 | 位置 | 网址 |
|------|------|------|
| 长文章 | `src/content/blog/<文件夹名>/index.md` | `/blog/<文件夹名>/` |
| 短随记 | `src/content/notes/<任意文件名>.md` | `/notes`（整篇直接展示） |

- **文件夹名用英文小写 + 短横线**（kebab-case），它会直接变成网址：`python-day1` → `/blog/python-day1/`
- 文件夹里**必须有一份 `index.md`**（这样网址末尾不会出现多余的 `/index`）
- 配图与 `index.md` 同目录，正文写 `![说明](./图.jpg)`

## 二、文件头（frontmatter）

文章最少需要这三项，缺一项 `npm run build` 就会失败：

```yaml
---
title: 'Python自学D1--环境与版本控制'
description: 'venv 隔离依赖、uv 加速装包、Git 回溯版本——把环境与版本控制一次理清。'
publishDate: 2026-10-14
tags: ['python', '环境']
---
```

可选字段：

| 字段 | 作用 |
|------|------|
| `updatedDate: 2026-10-20` | 显示"更新于" |
| `heroImage: { src: './cover.jpg', alt: '说明' }` | 封面图（图片放同目录） |
| `draft: true` | 草稿，线上不显示 |
| `pin: true` | 置顶 |

**标题命名规范**：Python 系列统一为 `Python自学D<天数>--<内容>`
例：`Python自学D3--分支结构与循环`

### 在 Obsidian 里编辑时的注意事项

| 事项 | 说明 |
|------|------|
| 属性名大小写 | Obsidian 会把日期属性改成小写 `publishdate`，**网站已做兼容**，两种写法都能发布 |
| 标签写法 | 属性面板里填 `python, 环境`（逗号分隔，不加方括号引号）；`.md` 源文件里写 `['python', '环境']` |
| 标签字符 | 只能用小写字母、数字、连字符、中文；**不要空格和标点**，否则网址会出现 `%20` |
| 不写标签 | 必须写 `tags: []`，留空会报错 |
| 别用 `[[双链]]` | 那是 Obsidian 内部链接，网站上不会跳转 |
| 别用 `==高亮==` | 那是 Obsidian 语法，网站不识别（发布前请改成 `**粗体**`） |

## 三、正文排版规范

**1. 小节标题用二级标题**，以中文数字开头：

```markdown
## 一、核心认知：序列
```

**2. 嵌套列表每层缩进 4 个空格，第一层顶格写**：

```markdown
1. 序列的特点：有序、可下标、可切片
    - 底层是对象头 + 指针数组
        - 查 a[i] 是 O(1)
```

> ⚠️ **绝对不要用 Tab 缩进**——Tab 在 Markdown 里会被当成代码块或被并进上一段，层级会全部消失。这是目前最主要的问题来源。

**3. 代码块**：Python 用 `python`，命令行用 `bash`

````markdown
```python title="创建虚拟环境"
import sys
print(sys.version)
```
````

````markdown
```bash title="常用命令"
uv add requests
git push
```
````

本站在线还支持：`{2,5-7}` 高亮指定行、`[!code++]` / `[!code--]` 标记增删、超过 15 行自动折叠。

**4. 诗歌 / 多行文本**：每行行尾加两个空格，否则会被合并成一段。

**5. 其他**
- 强调统一用 `**粗体**`
- 分隔线用 `---`（单独一行）
- 引用用 `> `

## 四、发布流程

```bash
cd /d/MyBlog
npm run build          # 必须先通过构建（有报错会直接告诉你是哪个文件的哪个字段）
git add .
git commit -m "post: Python自学D8--函数装饰器"
git push               # Vercel 自动构建上线，约 1 分钟
```

> Windows PowerShell 5.1 不支持 `&&`，请分三行执行，或用 `;` 连接。

## 五、报错速查

| 报错关键词 | 原因 | 解决 |
|-----------|------|------|
| `description: Required` | 缺摘要 | 补 `description` |
| `publishDate: Expected type "date"` | 日期为空或字段名被改 | 填 `publishDate: 2026-10-14` |
| `tags: Expected type "array"` | `tags:` 留空或写成字符串 | 写 `tags: []` 或 `tags: ['a', 'b']` |
| 层级显示成一坨 | 用了 Tab 缩进 | 改成每层 4 空格 |
| 代码块变成一大段文字 | 代码块用了 Tab 缩进 | 代码块顶格写，语言名写在反引号后 |
| 网站上出现 `[[xxx]]` / `==xxx==` | Obsidian 私有语法 | 改成普通文本或 `**粗体**` |
