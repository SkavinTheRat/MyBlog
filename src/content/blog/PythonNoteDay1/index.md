---
title: 'Python 一月预习：环境、包管理与版本控制'
description: 'venv 隔离依赖、uv 加速装包、Git 回溯版本——把 Python 环境与版本控制一次理清。'
publishDate: 2026-10-14
tags: ['python', '笔记']
---

> **主线一句话**：先把"环境"搭好——venv 给每个项目一个独立的依赖空间，uv 让装包又快又省心，Git 让代码每一步都能回溯。

---

**一. 虚拟环境（venv）—— 为什么需要"隔离"**
	1. 问题：依赖版本冲突
		不同项目可能依赖同一个包、但要求的版本不同；若都装在系统全局，就会互相冲突
		==**解决思路：一个项目一个独立目录**==——把每个项目的依赖都装进它自己的 .venv 目录，互不干扰
	2. 创建虚拟环境（在项目文件夹里执行）：
		python -m venv .venv
			-m 表示"执行 python 里的一个模块"（这里是 venv 模块）
			.venv 是虚拟环境的名字（一个目录，装着这个项目专属的依赖）
		注：==**要在对应项目文件夹里操作，不要乱动路径**==，否则命令行容易报错
	3. 激活：
		.venv\Scripts\activate
		==**激活的本质：把 .venv 目录（及其子目录）临时加到系统环境变量 PATH 里**==
			这样命令行敲 python、pip 时，会优先找到 .venv 里那个，而不是全局的
			查看当前虚拟环境：cmd 用 echo %VIRTUAL_ENV%，PowerShell 用 $env:VIRTUAL_ENV
		激活后再装依赖（pip install xxx），就会装进 .venv 目录，而不是全局
	4. 退出：deactivate
	5. 小技巧：命令行按 TAB 键可自动补全命令 / 文件名（由当前目录决定补全内容）

**二. 包管理工具 UV**
	1. UV 是什么：新一代的包管理 / 环境管理工具
		能装多个 python 本身的版本；能建虚拟环境、管理依赖包
	2. UV 相比 pip 的两大优势：
		依赖计算快——==**全局规划而非反复试错**==（一次性算出整个依赖关系）
		网络下载快——==**并行下载而非排队串行**==
	3. 安装 UV：用 scoop 装，然后 uv --version 验证
		（原文写作 uv –version 是错的，应为两个连字符 --version）
	4. 配置镜像源（国内加速）：
		setx UV_DEFAULT_INDEX https://pypi.tuna.tsinghua.edu.cn/simple
			==**setx 是 Windows 自带命令，写环境变量并永久生效**==（写入注册表）；和 set 不同——set 只在当前窗口有效
			UV_DEFAULT_INDEX 是 uv 专属环境变量，指定默认包索引（镜像）地址
			*镜像源：把国外包仓库"镜像"到国内服务器，下载更快*
	5. 初始化项目：
		在 GUI 文件夹地址栏输入 cmd 可直接在该目录打开命令行（也可右键"在终端中打开"）
		uv init --no-package    （--no-package 让项目结构更简单）
		会生成 pyproject.toml——记录项目信息 + 依赖
	6. 创建虚拟环境：uv venv（内部调 python 原生的 venv，自动创建并激活）
	7. 安装与管理依赖：
		先uv init--生成.toml文件和.lock文件
		uv add 依赖名         安装依赖
		uv tree               查看依赖树（装 A 还连带装了 B、C、D）
		uv remove 依赖名      移除依赖
		装完后 pyproject.toml 的 dependencies 里会记录依赖名、版本要求、安装源
	8. pyproject.toml 与 uv.lock：
		pyproject.toml：记录项目信息 + 声明"要哪些依赖"
		uv.lock：锁文件，记录==**精确的依赖树、版本号、下载路径、文件大小、下载时间**==
			==**作用：任何人在任何机器上 uv sync，都能装出完全一致的环境**==（可复现）
			会出现两个 .lock：一个在项目目录（信息详细），一个在 .venv 里（空的，防止并发操作冲突）
	9. 分发代码：
		不复制 .venv（占空间大、没必要），只把项目文件发给别人
		别人拿到后执行 uv sync——自动读 uv.lock + toml，把依赖原样装好
	10. 其他命令：
		uv python install 版本号   安装指定版本 python
		uv python pin 版本号       锁定项目用的 python 版本
		uv self update             更新 uv 自身
		uv tool install ruff       安装 ruff（代码检查工具）
		ruff check 文件名.py       检查代码

**三. Git 版本控制**
	1. Git 是什么：==**版本控制工具**==（把同一文件的不同版本都保存下来，随时可回溯）
		一个文件夹被 git 管理后，就变成 git 仓库，内部生成一个 .git 子文件夹存版本信息
	2. 核心概念：
		Commit（提交）是版本控制的基本单元——每提交一次，git 就保存当时所有文件的快照
		提交多了就形成一条版本链，==**每一版都能回溯**==（git 库 = 文件本身 + 历史快照的集合）
	3. 本地仓库 vs 远程仓库：
		本地仓库（local）在自己电脑上；远程仓库（如 GitHub）在网络上
		GitHub 是最大的远程仓库平台，有公开仓库（开源）和私人仓库
	4. .gitignore：
		声明"哪些文件不受 git 管理、也不会被开源"（如存密钥的文件、第三方依赖大文件）
		方法：新建 .gitignore 文件，把不受管理的文件名写进去；==**是目录的话末尾要加正斜杠 /**==
	5. 斜杠规范（路径 / 选项 / 转义 / URL）：
		路径：Linux/macOS/URL/跨平台 用 /；Windows 传统路径、批处理 用 \
		命令选项：Linux/macOS/PowerShell/Git 用 - 或 --；Windows cmd 老命令常用 /（如 dir /w）
		转义：Unix shell/正则/JSON/代码 里 \ 常是转义；cmd 用 ^；PowerShell 用 `
		实用记法：跨平台写 /、URL 写 /、Windows 批处理写 \、Windows 命令里 / 开头多半是选项
	6. 核心工作流（CLI）——==**三步走：add → commit → push**==：
		git init              把当前文件夹变成 git 仓库
		git clone <url>       从远程克隆一份到本地
		git add <文件>        把改动加入暂存区（git add . 一次全加）
		git commit -m "说明"  提交，双引号里写本次改了什么
		git push origin main  推送到远程
		==**底层：工作区 → 暂存区 → 仓库**==，add 是放进暂存区，commit 是存进仓库
		分支相关：
		git branch            查看所有分支
		git branch <名>       创建新分支
		git checkout <名>     切换分支（新版可用 git switch <名>）
		git merge <名>        把指定分支合并到当前分支
		git branch -d <名>    删除分支
		==**分支的本质：指针 + 哈希值**==——每个分支是指向某个具体版本的指针；最初是 main/master，可新建分支、不干扰主分支地改代码
		远程相关：
		git remote add origin <url>   首次关联远程仓库（origin 是默认别名）
		git remote -v                 查看远程仓库地址
		git pull                      拉取远程更新并自动合并
		git fetch                     只拉取更新、不合并（更安全）
		撤销（"后悔药"）：
		git restore <文件>            丢弃工作区改动，恢复到最后一次提交
		git restore --staged <文件>   把已暂存的文件撤回到工作区（取消 add）
		git revert <提交号>           撤销某次提交，保留历史（推荐，安全）
		git reset --hard <提交号>     强制回退到某版本（危险，会丢改动，慎用）
		git stash                     临时保存现场，稍后 git stash pop 恢复
	7. PyCharm 内置 git：
		左侧边栏"提交"，ctrl+k 提交（commit+add）、"提交并推送"、ctrl+p 拉取
		左下角 git 面板看日志（log）、管理分支
		discard：放弃还没 commit 的改动（程度最轻的"后悔药"）
	8. 线上 GitHub：
		域名：github.com/作者名/仓库名
		代码库里每个文件后有两个信息：commit 留言 + 修改时间
		star=点赞收藏；fork=复制仓库到自己名下；issue=线上讨论；releases=发布记录；assets=打包好的软件
		快捷键：/ 打开搜索、? 快捷键速查表、. 打开网页版 vscode
