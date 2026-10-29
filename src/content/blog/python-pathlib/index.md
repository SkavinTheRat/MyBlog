---
title: 'Python 中的 pathlib：路径操作全整理'
description: '把路径当作对象来拼接、拆解、遍历和读写，系统整理 pathlib 的常用 API 与平台边界。'
publishDate: 2026-10-16
tags: ['python', 'pathlib', 'file-system', 'windows']
language: zh-CN
---
> **一句话**：`pathlib` 把「路径」变成对象 —— 用 `/` 拼接、用属性拆解、用方法读写磁盘。
> `Pure*` 系列只做纯字符串运算，`Path` 才是真正会碰磁盘的那个。

本文的 `->` 输出全部是在 **Windows + CPython 3.15.0** 上实测得到的（少数在 3.14 / 3.12 上交叉验证）；括号里的 `3.x+` 表示该功能的最低版本要求。

---

## 零、30 秒速查

```python
from pathlib import Path
```

| 想做的事             | 写法                                                                    |
| ---------------- | --------------------------------------------------------------------- |
| 当前目录 / 用户主目录     | `Path.cwd()` / `Path.home()`                                          |
| 拼路径              | `p / "sub" / "f.txt"`、`p.joinpath(...)`                               |
| 取名字 / 后缀 / 父目录   | `p.name` / `p.suffix` / `p.parent`                                    |
| 判断存在 / 是文件 / 是目录 | `p.exists()` / `p.is_file()` / `p.is_dir()`                           |
| 新建目录             | `p.mkdir(parents=True, exist_ok=True)`                                |
| 递归找文件            | `p.rglob("*.py")`、`p.glob("**/*.py")`                                 |
| 遍历整棵树            | `for root, dirs, files in p.walk():`                                  |
| 读写文本             | `p.read_text(encoding="utf-8")` / `p.write_text(s, encoding="utf-8")` |
| 删文件 / 删空目录       | `p.unlink()` / `p.rmdir()`                                            |
| 改名 / 覆盖式改名       | `p.rename(new)` / `p.replace(new)`                                    |
| 复制 / 移动（3.14+）   | `p.copy(target)` / `p.move(target)`                                   |
| 变成字符串            | `str(p)`、`os.fspath(p)`                                               |
| 绝对化              | `p.resolve()`（规范化）/ `p.absolute()`（不规范化）                              |

---

## 一、先分清两类：Pure 路径 与 具体路径

| 类 | 只算路径 | 会碰磁盘 | 用途 |
| --- | --- | --- | --- |
| `PurePath` | 是 | 否 | 平台通用基类；在 Windows 上实例化得到 `PureWindowsPath` |
| `PurePosixPath` / `PureWindowsPath` | 是 | 否 | 明确要按某个平台风格处理路径时 |
| `Path` | 是 | 是 | **日常首选**；Windows 上等于 `WindowsPath`，Linux/macOS 上等于 `PosixPath` |
| `PosixPath` / `WindowsPath` | 是 | 是 | 只能在对应系统上实例化 |

```python
PurePath("a/b")          # -> PureWindowsPath('a/b')     （Windows 上的默认 flavour）
Path("a/b")              # -> WindowsPath('a/b')
Path("a/b").exists()     # -> True/False      P 大写；Path 是具体类，才有 exists 等方法
```

- `Path` = `PurePath` + 一组系统调用方法（读、写、删、遍历…）。
- 在 Windows 上写 `PosixPath("a")` 会报 `UnsupportedOperation`（3.13+；更早版本是 `NotImplementedError`），反过来在 Linux 上写 `WindowsPath` 一样。
- 模块里还导出了：`UnsupportedOperation`（3.13+ 的专用异常）、`S_IMODE` / `S_ISREG` / `S_ISDIR` …（从 `stat` 转出来的判断函数）、`pathlib.types.PathInfo`（3.14+，只给静态类型检查用）。
- **所有路径对象都不可变**：任何"修改"（改后缀、改名、拼路径）都是**返回一个新对象**，原对象不动。

---

## 二、构造与拼接

### 2.1 三种构造方式

```python
Path("D:/data/log.txt")            # 一个整串，两种分隔符都认（Windows 上 / 和 \ 等价）
Path("D:/data", "log.txt")         # 多段参数，等价于拼起来
Path(Path("D:/data"))              # 用另一个路径对象构造
Path()                             # -> WindowsPath('.')   空参数就是当前目录
```

### 2.2 用 `/` 拼接：结果规则（实测）

| 表达式 | 结果 | 说明 |
| --- | --- | --- |
| `Path("D:/a") / "b" / "c.txt"` | `WindowsPath('D:/a/b/c.txt')` | 常规拼接 |
| `Path("D:/a") / "b/c"` | `WindowsPath('D:/a/b/c')` | 右侧带分隔符会被拆开 |
| `Path("D:/a") / r"\b"` | `WindowsPath('D:/b')` | **左侧盘符被重置** |
| `Path("D:/a") / "/b"` | `WindowsPath('D:/b')` | 同上（前导分隔符 = 从盘根开始） |
| `Path("D:/a") / "D:/x"` | `WindowsPath('D:/x')` | 右侧是绝对路径 → 整体替换 |
| `Path("D:/a") / "C:/b"` | `WindowsPath('C:/b')` | 含别的盘符 → 整体替换 |
| `PurePosixPath("a") / "/b"` | `PurePosixPath('/b')` | POSIX 同理 |
| `Path("a") / 1` | `TypeError` | 只能拼路径或字符串 |

规则一句话：**右侧一旦是"绝对路径"（带盘符、带前导分隔符），左侧就整体作废。**

```python
p = Path("D:/a")
p / "b"            # 返回新对象，p 本身还是 D:/a
p.joinpath("b", "c")   # 等价于 p / "b" / "c"
Path("a") + "b"    # -> TypeError   pathlib 不支持用 + 拼
os.path.join(Path("D:/a"), "x")   # -> 'D:\\a\\x'   os 的函数也接受 Path
```

### 2.3 `with_segments()`（3.12+）

用给定片段造一个**同类型**的新对象（自己写子类时能保住子类；`Path("a").with_segments("D:/", "x", "y.txt")` -> `WindowsPath('D:/x/y.txt')`）。

---

## 三、解析属性：把路径拆成零件

样例（下表都是 `PureWindowsPath(...)` 的实测结果）：

```text
D:/study/notes/python/script.tar.gz
C:/
D:/notes/
a/b/c.txt
../x/y.py
\\server\share\file.txt        （UNC 网络路径）
/abs/on/windows.txt            （Windows 上算"带根但不带盘符"，见下）
.bashrc
archive.
D:
D:/
```

### 3.1 结构类属性

| 输入 | `parts` | `drive` | `root` | `anchor` |
| --- | --- | --- | --- | --- |
| `D:/study/notes/python/script.tar.gz` | `('D:\\', 'study', 'notes', 'python', 'script.tar.gz')` | `'D:'` | `'\\'` | `'D:\\'` |
| `C:/` | `('C:\\',)` | `'C:'` | `'\\'` | `'C:\\'` |
| `D:/notes/` | `('D:\\', 'notes')` | `'D:'` | `'\\'` | `'D:\\'` |
| `a/b/c.txt` | `('a', 'b', 'c.txt')` | `''` | `''` | `''` |
| `\\server\share\file.txt` | `('\\\\server\\share\\', 'file.txt')` | `'\\\\server\\share'` | `'\\'` | `'\\\\server\\share\\'` |
| `/abs/on/windows.txt` | `('\\', 'abs', 'on', 'windows.txt')` | `''` | `'\\'` | `'\\'` |
| `D:` | `('D:',)` | `'D:'` | `''` | `'D:'` |
| `D:/` | `('D:\\',)` | `'D:'` | `'\\'` | `'D:\\'` |

要点：

- `parts` 是元组；**首元素包含 `root` + `drive`**（有的话）。
- `anchor` = `drive` + `root`，即"从头到根"这一截；`drive` / `root` 单独取会各自为空串。
- **`D:` 与 `D:/` 不同**：前者是"盘符相对"（`is_absolute()` 为 `False`），后者是绝对路径。
- `D:/notes/` 的**尾部分隔符被规范化掉了**（`parts` 里只剩 `notes`）—— 这是 pathlib 与 `os.path` 的一个重要区别（详见第十三节）。
- `PurePath("")` 的 `parts` 是 `()`，但 `str(Path(""))` 是 `'.'`。

### 3.2 名称类属性

| 输入 | `name` | `stem` | `suffix` | `suffixes` | `parent` |
| --- | --- | --- | --- | --- | --- |
| `D:/study/notes/python/script.tar.gz` | `'script.tar.gz'` | `'script.tar'` | `'.gz'` | `['.tar', '.gz']` | `D:/study/notes/python` |
| `C:/` | `''` | `''` | `''` | `[]` | `C:/`（自己） |
| `a/b/c.txt` | `'c.txt'` | `'c'` | `'.txt'` | `['.txt']` | `a/b` |
| `../x/y.py` | `'y.py'` | `'y'` | `'.py'` | `['.py']` | `../x` |
| `.bashrc` | `'.bashrc'` | `'.bashrc'` | `''` | `[]` | `.` |
| `archive.` | `'archive.'` | `'archive'` | `'.'` | `['.']` | `.` |
| `a/b/..` | `'..'` | `'..'` | `''` | `[]` | `a/b` |

要点：

- `name` 是最后一段（带后缀）；`stem` 是"去掉最后一个后缀"的名字；`suffix` **是属性，不加括号**。
- `.bashrc` 这类以点开头的名字**没有后缀**（点后面必须有别的东西才算后缀）。
- `archive.` 的 `suffix` 是 `'.'`（3.14 起才这么算；3.14 之前会报 `ValueError`）。同理 `with_suffix('.')` 在 3.14+ 合法。
- `suffixes` 返回**列表**，按顺序列出所有后缀；`suffix` 只给最后一个。
- `..` 不会被消掉，它就是一个普通片段（`parts` 里也照原样保留，`PurePath("a/../b") != PurePath("a/b")`）。

### 3.3 `parents` 与其它

```python
p = PureWindowsPath("D:/study/notes/python/script.tar.gz")
list(p.parents)
# -> [D:/study/notes/python, D:/study/notes, D:/study, D:/]

p.parents[0]     # -> D:/study/notes/python
p.parents[-1]    # -> D:/          （负索引、切片都是 3.10+ 支持）
list(PureWindowsPath("a").parents)   # -> [WindowsPath('.')]  相对路径到 '.' 就停
```

| 属性 / 方法 | 结果 | 说明 |
| --- | --- | --- |
| `is_absolute()` | `True` / `False` | **方法**，要加括号 |
| `as_posix()` | `'D:/study/notes'` | 全部换成 `/`（发给 URL、JSON、命令行时常用） |
| `parser`（3.13+） | `posixpath` / `ntpath` | 该 flavour 背后用的底层模块 |

---

## 四、改名与换后缀：`with_*` 家族

都以 `p = PureWindowsPath("D:/data/report.tar.gz")` 为例（实测）：

| 写法 | 结果 | 说明 |
| --- | --- | --- |
| `p.with_name("new.txt")` | `D:/data/new.txt` | 换掉最后一段（**只改名，不碰磁盘**） |
| `p.with_stem("report2")`（3.9+） | `D:/data/report2.gz` | 只换 stem，后缀保留 |
| `p.with_suffix(".zip")` | `D:/data/report.tar.zip` | 换**最后一个**后缀 |
| `p.with_suffix("")` | `D:/data/report.tar` | 传空串 = 删掉后缀 |
| `p.with_segments("D:/", "x", "y.txt")`（3.12+） | `D:/x/y.txt` | 整条重建 |

```python
PureWindowsPath("D:/a/b").with_suffix(".txt")   # -> D:/a/b.txt    （原来没后缀就加上）
PureWindowsPath("D:/a").with_name("D:/x")       # -> ValueError    新名字里不许有分隔符
PureWindowsPath("D:/a").with_suffix("txt")      # -> ValueError    后缀必须以 '.' 开头
```

这些方法**只是造新路径对象**，磁盘上的文件名字不会变 —— 想真改名用 `rename()` / `replace()`（见第十节）。

---

## 五、求相对路径：`relative_to` / `is_relative_to`

```python
p = PureWindowsPath("D:/study/notes/a.py")
p.relative_to("D:/study")            # -> PureWindowsPath('notes/a.py')
p.relative_to("D:/study/notes")      # -> PureWindowsPath('a.py')
p.relative_to("D:/other")            # -> ValueError   不是它的子路径
p.is_relative_to("D:/study/notes")   # -> True   只判断、不报错（3.9+）
p.is_relative_to("D:/stud")          # -> False  ==**不是字符串前缀判断**==

PureWindowsPath("D:/a/b/c.py").relative_to("D:/a/x", walk_up=True)   # -> ../b/c.py
PureWindowsPath("D:/A/B.py").relative_to("d:/a")                     # -> PureWindowsPath('B.py')  大小写不敏感
```

要点：

- `is_relative_to` 是**按路径段**比较，不是 `str.startswith`：`D:/stud` 不算 `D:/study` 的父级。
- `walk_up=True`（3.12+）允许返回 `..` 开头的相对路径；默认只允许"向下"。
- 3.14 起不能再传额外的位置参数（旧写法 `relative_to("D:/a", "b")` 已移除）。
- Windows 上比较**不区分大小写**，但返回结果保留原路径的大小写。

---

## 六、模式匹配：`match` 与 `full_match`

### 6.1 通配符一览（`match` / `full_match` / `glob` / `rglob` 通用）

| 通配符 | 含义 |
| --- | --- |
| `?` | 匹配**一个**非分隔符字符 |
| `*`（整段） | 匹配**一段**文件/目录名 |
| `*`（段内） | 匹配任意个非分隔符字符（含 0 个） |
| `**`（整段） | 匹配任意多段（含 0 段），即递归 |
| `[seq]` | 匹配 seq 中任一字符；支持范围，如 `[a-z]`、`[a-zA-Z0-9_]` |
| `[!seq]` | 匹配不在 seq 中的字符 |

想匹配字面意义的元字符就把它放进方括号里，例如 `[?]` 表示问号本身。

### 6.2 `match()`：从右往左的"非递归"匹配

```python
PurePosixPath("/a/b/c.py").match("*.py")       # -> True    只跟最后一段比
PurePosixPath("/a/b/c.py").match("b/*.py")     # -> True    可以是多段，但必须贴着末尾
PurePosixPath("/a/b/c.py").match("a/*.py")     # -> False   ← 常见误解
PurePosixPath("/a/b/c.py").match("/a/*.py")    # -> False   ← 绝对模式也匹配不上
PurePosixPath("a/b.py").match("[a-c]/b.py")    # -> True
PurePosixPath("a/b.py").match("?/b.py")        # -> True
PurePosixPath("/a/b/c.py").match("**/*.py")    # -> True    （** 在 match 里等同 *，不递归）
PurePosixPath("/a/b/c.py").match("")           # -> ValueError   空模式不合法
```

### 6.3 `full_match()`（3.13+）：整条路径必须完整匹配

```python
PurePosixPath("/a/b/c.py").full_match("*.py")          # -> False  整条路径≠一段
PurePosixPath("/a/b/c.py").full_match("b/*.py")        # -> False
PurePosixPath("/a/b/c.py").full_match("/*/*/*.py")     # -> True
PurePosixPath("/a/b/c.py").full_match("/a/**/*.py")    # -> True
PureWindowsPath("D:/a/b.py").full_match("D:/a/*.py")   # -> True   可以带盘符前缀
```

一句话区分：**`match` 只要求"尾部的几段"对得上；`full_match` 要求"从头到尾"都对得上。**

### 6.4 大小写

两者都有 `case_sensitive` 关键字参数（`match` 是 3.12+，`full_match` 是 3.13+）。默认 `None` 表示按平台规则：POSIX 区分大小写，**Windows 不区分**。

```python
PurePosixPath("/a/C.PY").match("*.py", case_sensitive=True)   # -> False
PureWindowsPath("D:/a/b.py").match("*.py")                    # -> True
```

---

## 七、遍历与查找：`iterdir` / `glob` / `rglob` / `walk`

本节用的例子目录（后面的输出都基于它）：

```text
tree
├── .hidden.py
├── top.md
├── docs
│   ├── notes.txt
│   └── readme.md
└── src
    ├── main.py
    ├── utils.py
    └── pkg
        ├── __init__.py
        └── sub
            └── deep.py
```

### 7.1 `iterdir()`：只列一层

```python
[p.name for p in Path("tree").iterdir()]
# -> ['.hidden.py', 'docs', 'src', 'top.md']

list(Path("tree/docs/readme.md").iterdir())   # -> NotADirectoryError（对文件用会报错）
```

- 返回生成器，**顺序不保证**（想稳定输出自己 `sorted()`）。
- 一步一层、不含子目录内容；给的是 `Path` 对象。

### 7.2 `glob()` / `rglob()`：按模式找

模式必须是**相对模式**（不能写 `../x` 那类的逃逸模式）。返回值同样是生成器，实测：

| 写法 | 结果 |
| --- | --- |
| `p.glob("*")` | `['.hidden.py', 'docs', 'src', 'top.md']` |
| `p.glob("*.py")` | 只匹配当前层；在 `src` 下是 `['main.py', 'utils.py']` |
| `p.glob("*/*.py")` | `['src/main.py', 'src/utils.py']` |
| `p.glob("**/*.py")` | `['.hidden.py', 'src/main.py', 'src/pkg/__init__.py', 'src/pkg/sub/deep.py', 'src/utils.py']` |
| `p.rglob("*.py")` | 与上一行等价 |
| `p.glob("**")` | `['.', '.hidden.py', 'docs', 'docs/notes.txt', 'docs/readme.md', 'src', 'src/main.py', 'src/pkg', 'src/pkg/__init__.py', 'src/pkg/sub', 'src/pkg/sub/deep.py', 'src/utils.py', 'top.md']` |
| `p.glob("src/*/")` | `['src/pkg']`（**尾部斜杠 = 只要目录**，3.11+） |
| `p.glob("[st]*")` | `['src', 'top.md']` |
| `p.glob("[!s]*")` | `['.hidden.py', 'docs', 'top.md']` |
| `p.glob("?.md")` | `[]`（`top.md` 是 6 个字符，`?` 只吃 1 个） |

Windows 上特别值得记的几条（实测）：

- **大小写不敏感**：`p.glob("*.PY")` 命中了 `.hidden.py`；要强制区分就写 `case_sensitive=True`。
- **点开头的文件不特殊**：`p.glob("*")` 直接列出了 `.hidden.py`，跟 `glob` 模块（默认跳过隐藏文件）不一样；等价于 `glob.glob(..., include_hidden=True)`。
- `**` 总是递归；**默认不跟随符号链接**，想跟随用 `recurse_symlinks=True`（3.13+）。
- 3.13 起：以 `**` 结尾的模式会返回**文件 + 目录**；3.13 之前只返回目录。
- 3.13 起：扫描过程中出现的 `OSError` 一律被忽略，不会把异常抛给你。
- 目录根本不存在时，`glob()` 返回空、**不报错**。
- 返回的对象和别的 Path 一样**不带尾部斜杠**，而且结果里**带上起始路径作前缀**（`path.glob("x")` 产出的是 `path/x` 这样的完整 Path，而 `glob.glob("x", root_dir=path)` 只给 `x`）。

### 7.3 `walk()`（3.12+）：像 `os.walk` 一样走整棵树

```python
for root, dirs, files in Path("tree").walk():
    print(root, dirs, files)

# -> tree                  ['docs', 'src']   ['.hidden.py', 'top.md']
# -> tree/docs             []                ['notes.txt', 'readme.md']
# -> tree/src              ['pkg']           ['main.py', 'utils.py']
# -> tree/src/pkg          ['sub']           ['__init__.py']
# -> tree/src/pkg/sub      []                ['deep.py']
```

| 参数 | 默认 | 作用 |
| --- | --- | --- |
| `top_down=True` | 顶向下 | 逐层从浅到深；`False` 则**先给子目录、最后给父目录**（适合自底向上删空目录） |
| `on_error=None` | 忽略扫描错误 | 传一个可调用对象（如 `print`），收到 `OSError`；抛出去就中断遍历 |
| `follow_symlinks=False` | 不跟随符号链接 | 为 `False` 时，符号链接一律被算进 `files` |

- `root` 是 `Path`，`dirs` / `files` 是**字符串名字列表**（不是 Path）。
- 顶向下遍历时，可以**就地改 `dirs`** 来剪枝：`if "__pycache__" in dirs: dirs.remove("__pycache__")`。
- 每层内部的顺序同样不保证（实测输出是排过序才好看；真实顺序取决于文件系统）。

---

## 八、查询状态与信息

### 8.1 判断类

| 方法 | 说明 |
| --- | --- |
| `exists()` | 存在（文件或目录）就 `True` |
| `is_file()` / `is_dir()` | 是普通文件 / 是目录 |
| `is_symlink()` | 是符号链接（**悬空链接也算** `True`） |
| `is_junction()` | 是 Windows 目录联结（3.12+） |
| `is_mount()` | 是挂载点（Windows 上：盘符根、UNC 共享、挂载的目录；Windows 支持是 3.12+） |
| `is_socket()` / `is_fifo()` / `is_block_device()` / `is_char_device()` | POSIX 专用类别，Windows 上基本恒为 `False` |
| `samefile(other)` | 是否指向同一个文件（看 inode/文件索引，不看字符串） |

要点：

- **都不报错，就返回 `False`**：路径不存在、没有权限、名字在 OS 层面无法表示……统统是 `False`。想区分"不存在"和"没权限"，得直接 `stat()` 抓异常。
- 3.14 起统一：上述方法**不抛任何 `OSError`**，只返回 `False`（之前是"部分抛、部分吞"，行为不一致）。
- 3.8 起：路径含 OS 无法表示的字符时返回 `False`，而不是抛异常。
- `exists()` / `is_file()` / `is_dir()` / `stat()` 都可以带 `follow_symlinks=False` 来"不穿透符号链接"：`exists` 是 3.12+，`is_file` / `is_dir` 是 3.13+，`stat` 是 3.10+。

### 8.2 `stat()` / `lstat()`

```python
p = Path("tree/src/main.py")
p.stat().st_size      # -> 13        字节数
p.stat().st_mtime     # -> 修改时间（时间戳）
p.stat().st_mode      # -> 权限/类型位；配合 stat.S_IMODE()、pathlib.S_ISREG() 使用（需 import stat）
p.lstat()             # 与 stat() 的区别：路径是符号链接时，stat() 看目标，lstat() 看链接本身
```

- `stat()` 返回 `os.stat_result`（和 `os.stat()` 同一个对象类型），**每次调用都重新查一次**。
- `stat()`/`lstat()` 遇到不存在的路径会抛 `FileNotFoundError`。

### 8.3 `info`（3.14+）：一次取到的文件类型信息

```python
Path("src").info.is_symlink()   # False
Path("src").info.is_dir()       # True
Path("src").info.is_file()      # False
Path("src").info.exists()       # True
Path("nope").info.exists()      # False
```

- `p.info` 是**属性**（不用加括号），可用方法只有 `exists()` / `is_dir()` / `is_file()` / `is_symlink()`。
- 特点：**结果会被缓存**，所以适合写成 `if ... elif ...` 的类型分派，减少系统调用。

---

## 九、读写文件

| 方法 | 返回 | 备注 |
| --- | --- | --- |
| `p.open(mode, ...)` | 文件对象 | 参数与内置 `open()` 一致（`mode`、`buffering`、`encoding`、`errors`、`newline`） |
| `p.read_text(encoding=None, errors=None, newline=None)` | `str` | 一次读完整个文件 |
| `p.write_text(data, ...)` | 写入的字符数 | 会**截断**已有内容（相当于 `w` 模式） |
| `p.read_bytes()` | `bytes` | 二进制整读 |
| `p.write_bytes(data)` | 写入的字节数 | 同上，二进制写 |

```python
p = Path("tree/docs/w.txt")
p.write_text("hello\nworld\n", encoding="utf-8")   # -> 12
p.read_text(encoding="utf-8")                      # -> 'hello\nworld\n'
p.read_text(encoding="utf-8").splitlines()         # -> ['hello', 'world']

with p.open("a", encoding="utf-8") as f:           # 追加模式要自己用 open()
    f.write("more")
```

要点：

- **永远显式写 `encoding="utf-8"`**。不写就走"平台默认编码"：3.15 起默认是 UTF-8（UTF-8 模式成为默认），但 3.15 之前的中文 Windows 上是 `cp936`，同一个文件换个版本/换个平台就会乱码。本机实测 `locale.getpreferredencoding(False)` 已是 `'utf-8'`。
- `write_text` **不是**追加：每次调用都会把文件重写。
- `read_text` 的 `newline` 参数是 3.13+、`write_text` 的 `newline` 是 3.10+。
- 大文件别用 `read_text`，用 `p.open()` 迭代（`for line in f:`）。
- `open(p)` / `Path.open()` 两者都可以；`json.dump(data, p.open("w", ...))` 这类写法也很常见。

---

## 十、创建、删除、改名、复制、移动

### 10.1 建

| 写法 | 行为 |
| --- | --- |
| `p.mkdir()` | 建一级目录；已存在 -> `FileExistsError` |
| `p.mkdir(exist_ok=True)` | 已存在也不报错（3.5+） |
| `p.mkdir(parents=True)` | 缺中间目录就一起建（类 `mkdir -p`） |
| `p.mkdir(parents=True, exist_ok=True)` | **最常用组合** |
| `p.mkdir(mode=0o755)` | 权限位（受 umask 影响；Windows 上意义有限） |
| `p.mkdir(parents=True, parent_mode=0o700)` | 3.15+ 新增：单独指定"中间层目录"的权限 |
| `p.touch()` | 建空文件；已存在就更新修改时间（`exist_ok` 默认就是 `True`） |
| `p.touch(exist_ok=False)` | 已存在则 `FileExistsError` |

### 10.2 删

```python
p.unlink()                 # 删文件或软链接；路径是目录 -> 报错（提示用 rmdir）
p.unlink(missing_ok=True)  # 不存在也不报错（3.8+）
p.rmdir()                  # 删目录，必须是空目录，否则 OSError
```

要删**非空目录**，pathlib 没有对应方法，得用 `shutil.rmtree(p)`。

### 10.3 改名 / 覆盖改名

| 写法 | 语义 |
| --- | --- |
| `p.rename(target)` | 改名/移动。**Unix** 上目标已存在且是文件会静默覆盖；**Windows** 上目标存在会报 `FileExistsError` |
| `p.replace(target)` | 目标存在就**直接覆盖**（跨平台一致，底层是 `os.replace`） |
| 返回值 | 3.8 起返回指向新位置的 **新 `Path` 对象** |

```python
p = Path("tree/new/t.txt"); p.touch()
q = p.rename(Path("tree/new/t2.txt"))   # q -> WindowsPath('.../t2.txt')
q.exists()                              # True
Path("tree/new/h.txt").replace(Path("tree/new/t2.txt"))   # 覆盖成功
```

### 10.4 复制与移动（3.14+ 新增，最省事的一节）

| 写法 | 语义 |
| --- | --- |
| `p.copy(target)` | 复制**文件或整棵目录树**到 `target`；目标已存在 -> `FileExistsError`；返回指向副本的新 `Path` |
| `p.copy_into(target_dir)` | 复制**到某个已存在的目录里**，名字沿用自己；返回副本的 `Path` |
| `p.move(target)` | 移动文件或目录树到 `target`；**目标已存在时覆盖** |
| `p.move_into(target_dir)` | 移动进已存在的目录，名字沿用自己 |

```python
Path("tree/a").copy(Path("tree/copy_of_a"))                  # 目录树整体复制
Path("tree/a").copy_into(Path("tree/into"))                  # -> .../into/a
Path("tree/a/f.txt").move(Path("tree/a/b/f.txt"))            # 覆盖已有的 f.txt
Path("tree/x").move_into(Path("tree/into"))                  # -> .../into/x
```

- 关键字参数：`follow_symlinks=True`、`preserve_metadata=False`。`preserve_metadata=True` 才会保留权限、时间戳、扩展属性等；**在 Windows 上复制文件时元数据总是保留**（该参数对文件无影响）。
- 目录**不会合并**：目标是已存在的目录时会报 `FileExistsError`（不像 `shutil.copytree(dir, dir, dirs_exist_ok=True)` 那样往里合）。
- 复制到自己身上会 `OSError`。
- 3.14 之前没有这些方法，只能 `shutil.copy2` / `shutil.copytree` / `shutil.move`。

### 10.5 与 `shutil` 的分工

| 需求 | pathlib | shutil |
| --- | --- | --- |
| 复制文件 | `p.copy(t)`（3.14+） | `shutil.copy(p, t)` / `copy2`（带元数据） |
| 复制目录树 | `p.copy(t)`（3.14+） | `shutil.copytree(src, dst, dirs_exist_ok=True)` |
| 移动 | `p.move(t)`（3.14+） | `shutil.move(src, dst)` |
| 删除整个目录树 | 没有对应方法 | `shutil.rmtree(p)` |

---

## 十一、链接、权限、所有者

### 11.1 创建链接

```python
p.symlink_to(target, target_is_directory=False)   # 让 p 变成指向 target 的软链接
p.hardlink_to(target)                             # 3.10+；让 p 成为 target 的硬链接
p.readlink()                                      # 3.9+；读出软链接指向哪里
```

- **注意参数顺序**：`p.symlink_to(target)` 里的 `p` 是**新链接的名字**，`target` 是被指向的东西（`os.symlink` 正好相反）。
- **Windows 上创建软链接需要开发者模式或管理员权限**，否则实测报 `OSError: [WinError 1314]`。
- `target_is_directory` 只在 Windows 上有意义。
- 3.13 起：如果平台不支持该操作，抛 `UnsupportedOperation`（更早版本抛 `NotImplementedError`）。

### 11.2 权限与所有者

```python
p.chmod(0o644)                      # 改权限
p.chmod(0o644, follow_symlinks=False)   # 3.13+（Windows 上也能用）
p.lchmod(0o644)                     # 改软链接自身（永远不跟随）
p.owner() / p.group()               # 所有者 / 所属组名（3.13+ 支持 follow_symlinks）
```

- **Windows 上的实测**：`chmod(0o444)` 会把文件变成只读（`stat.filemode()` 从 `-rw-rw-rw-` 变 `-r--r--r--`），`lchmod(0o666)` 能把它改回来 —— Windows 只有"只读"这一位有效，`0o777` 里的其它位没作用。
- **只读文件删不掉**：实测被 `chmod(0o444)` 过的文件在 `shutil.rmtree()` 时会 `PermissionError`，删之前先 `p.chmod(0o666)` 或用 `attrib -R`。
- `p.owner()` / `p.group()` 是 POSIX 概念，**Windows 上抛 `UnsupportedOperation`**（实测）。

---

## 十二、绝对化与相互转换

### 12.1 三个"变绝对"的方法，区别很关键

| 方法 | 是否规范化 | 是否解析符号链接 | 说明 |
| --- | --- | --- | --- |
| `p.absolute()` | 否，保留 `..` | 否 | 只把当前工作目录拼到前面 |
| `p.resolve()` | 是，消掉 `..`、`.` | 是 | 得到"真实"绝对路径；`strict=False`（默认）不要求路径存在 |
| `p.resolve(strict=True)` | 是 | 是 | 路径不存在就抛 `FileNotFoundError` |

```python
p = Path("tree/src/../src/main.py")
p.absolute()    # -> D:/.../tree/src/../src/main.py     ← '..' 还在
p.resolve()     # -> D:/.../tree/src/main.py            ← 被规范掉
Path("missing.txt").resolve()          # -> 不报错，直接给出绝对路径
Path("missing.txt").resolve(strict=True)   # -> FileNotFoundError
```

（3.13 起：符号链接成环也按普通 `OSError` 处理 —— `strict=True` 时抛异常，`strict=False` 时不抛；更早版本无论 `strict` 取值都抛 `RuntimeError`。）

### 12.2 三个"从环境拿路径"的方法

```python
Path.cwd()          # -> WindowsPath('D:/计算机学习文档')     当前工作目录
Path.home()         # -> WindowsPath('C:/Users/sTr')          用户主目录
Path("~/notes").expanduser()   # -> WindowsPath('C:/Users/sTr/notes')
```

- `expanduser()` 解析 `~` 与 `~user`；解析不出主目录时抛 `RuntimeError`（`os.path.expanduser` 是原样返回）。
- `Path("~")` 本身**不会**自动展开，必须显式调 `expanduser()`。

### 12.3 与字符串、URI、`os.path` 互操作

```python
str(Path("D:/a/b"))              # -> 'D:\\a\\b'   Windows 上转出来是反斜杠
os.fspath(Path("a"))             # -> 'a'         Path 实现了 os.PathLike 协议
Path("D:/a/b").as_posix()        # -> 'D:/a/b'    需要正斜杠时用这个
os.path.exists(Path("x"))        # os 的函数都接受 Path（内部走 os.fspath）
open(Path("f.txt"))              # 内置 open 也接受 Path

Path("D:/a/b.txt").as_uri()                  # -> 'file:///D:/a/b.txt'
Path.from_uri("file:///D:/x%20y.txt")        # -> WindowsPath('D:/x y.txt')      3.13+
Path.from_uri("file://server/share/x")       # -> WindowsPath('//server/share/x')
```

- `as_uri()` 要求路径是绝对的，否则 `ValueError`；空格等字符会被百分号转义。
- `from_uri()` 只在**具体类 `Path`** 上有（`PureWindowsPath.from_uri` 不存在，实测 `AttributeError`）；3.14 起会丢弃与本机主机名相同的 authority。
- **`Path("a") == "a"` 是 `False`**：别拿 Path 和字符串比相等，要比就 `str(p)` / `os.fspath(p)` 转出来再比；反过来 `Path("a") in {"a"}` 也是 `False`。

---

## 十三、和 `os` / `os.path` / `glob` / `shutil` 的对应关系

| os 侧 | pathlib 侧 |
| --- | --- |
| `os.path.dirname()` | `PurePath.parent` |
| `os.path.basename()` | `PurePath.name` |
| `os.path.splitext()` | `PurePath.stem` + `PurePath.suffix` |
| `os.path.join()` | `PurePath.joinpath()` / `/` |
| `os.path.isabs()` | `PurePath.is_absolute()` |
| `os.path.relpath()` | `PurePath.relative_to()` |
| `os.path.expanduser()` | `Path.expanduser()` |
| `os.path.realpath()` | `Path.resolve()` |
| `os.path.abspath()` | `Path.absolute()` |
| `os.path.exists()` / `isfile()` / `isdir()` / `islink()` / `isjunction()` / `ismount()` / `samefile()` | `Path.exists()` / `is_file()` / `is_dir()` / `is_symlink()` / `is_junction()` / `is_mount()` / `samefile()` |
| `os.getcwd()` | `Path.cwd()` |
| `os.stat()` / `os.lstat()` | `Path.stat()` / `Path.lstat()` |
| `os.listdir()` | `Path.iterdir()` |
| `os.walk()` | `Path.walk()` |
| `os.mkdir()` / `os.makedirs()` | `Path.mkdir()` |
| `os.link()` / `os.symlink()` / `os.readlink()` | `Path.hardlink_to()` / `Path.symlink_to()` / `Path.readlink()` |
| `os.rename()` / `os.replace()` / `os.remove()` / `os.unlink()` / `os.rmdir()` | `Path.rename()` / `Path.replace()` / `Path.unlink()` / `Path.rmdir()` |
| `os.chmod()` / `os.lchmod()` | `Path.chmod()` / `Path.lchmod()` |
| `glob.glob()` / `glob.iglob()` | `Path.glob()` / `Path.rglob()` |
| `shutil.copy/copy2/copytree/move/rmtree` | `Path.copy()` / `Path.copy_into()` / `Path.move()` / `Path.move_into()`（3.14+）；**`rmtree` 至今没有对应方法** |

两个必须知道的差异：

1. **`os.path.abspath()` 会消掉 `..`，`Path.absolute()` 不会**（保留 `..` 在处理符号链接时更安全）。
2. **pathlib 会自动规范化**：`Path("my_folder/")` -> `Path("my_folder")`、`Path("./prog")` -> `Path("prog")`。这两个变化在把路径交给系统 API / 命令行时可能改变含义（尾部分隔符没了、"当前目录下的可执行文件"可能变成去 `PATH` 里找）。所以 **pathlib 不是 `os.path` 的 drop-in 替代**。

另有一条常被忽略的点：`os` / `os.path` 支持 `bytes` 路径和"相对目录描述符"（`dir_fd`），**pathlib 不支持**；反过来 pathlib 是纯 Python 实现，比 C 写的 `os.path` 慢（日常场景几乎无感）。

---

## 十四、版本差异速查（用到旧版本时对照）

| 版本 | 变化 |
| --- | --- |
| 3.4 | `pathlib` 模块引入 |
| 3.5 | `Path.home()` / `expanduser()` / `read_text` / `write_text` / `read_bytes` / `write_bytes` / `samefile()`；`mkdir(exist_ok=)` |
| 3.6 | 支持 `os.PathLike` 协议；`resolve(strict=)` |
| 3.7 | `is_mount()` |
| 3.8 | `unlink(missing_ok=)`；`rename()` / `replace()` 有返回值；查询类方法遇到无法表示的字符返回 `False` |
| 3.9 | `readlink()`、`with_stem()`、`is_relative_to()` |
| 3.10 | `hardlink_to()`；`stat()` / `chmod()` 的 `follow_symlinks`；`write_text(newline=)`；`parents` 支持切片与负索引 |
| 3.11 | 模式以分隔符结尾时只匹配目录 |
| 3.12 | `walk()`、`is_junction()`、`with_segments()`；`match` / `glob` / `rglob` 的 `case_sensitive`；`exists(follow_symlinks=)`；`relative_to(walk_up=)`；`is_mount()` 支持 Windows |
| 3.13 | `full_match()`、`from_uri()`、`PurePath.parser`；`UnsupportedOperation` 取代 `NotImplementedError`；`is_file/is_dir(follow_symlinks=)`、`owner/group(follow_symlinks=)`；`read_text(newline=)`；`glob` 的 `recurse_symlinks`；以 `**` 结尾的模式返回文件+目录；软链接成环按 `OSError` 处理 |
| 3.14 | `copy()` / `copy_into()` / `move()` / `move_into()`；`Path.info`（`pathlib.types.PathInfo`）；`'.'` 视为合法后缀；查询类方法遇到 `OSError` 一律返回 `False`；`relative_to` / `is_relative_to` 的多参数写法移除；`from_uri` 的 authority 处理调整 |
| 3.15 | `mkdir(parent_mode=)`；`PurePath.is_reserved()` 已移除（3.13 起废弃） |

---

## 十五、易错点清单

1. `suffix` / `stem` / `name` / `parts` / `parent` 都是**属性，不加括号**；`is_file()` / `exists()` / `is_dir()` 是**方法，必须加括号**（写 `if p.is_file:` 永远为真）。
2. `Path` 不可变：`p.with_suffix(".txt")` 只返回新对象，`p` 没变；要生效得 `p = p.with_suffix(".txt")`。
3. `/` 拼接遇到右侧绝对路径会**丢掉左边**：`Path("D:/a") / "/b"` 结果是 `D:/b`。
4. `with_suffix` 只换最后一个后缀：`report.tar.gz` -> `with_suffix(".zip")` 得到 `report.tar.zip`。
5. `Path("a") == "a"` 为 `False`；和字符串比较先 `str()`。
6. `Path("D:A")`（盘符相对）不是绝对路径；`Path("D:/A")` 才是。
7. `Path("./x")` / `Path("x/")` 会被规范化，尾部分隔符丢失；需要"目录语义"时注意。
8. `exists()` 返回 `False` 可能是"没权限"而不是"不存在"；要区分就 `stat()` 抓异常。
9. `unlink()` 不能删目录、`rmdir()` 不能删非空目录；删目录树用 `shutil.rmtree()`。
10. `Path.rename()` 在 Windows 上目标存在会报错，想覆盖用 `Path.replace()`（或 3.14+ 的 `move()`）。
11. Windows 上大小写不敏感（相等比较、`glob` 都是），但返回结果保留原大小写 —— 跨平台代码不要依赖大小写。
12. `match` 是"右对齐"匹配：`match("*.py")` 能过，`match("/a/*.py")` 反而不行；要整条路径匹配用 `full_match()`（3.13+）。
13. Windows 上创建软链接需要开发者模式/管理员，否则 `OSError`；不想折腾就改用硬链接或直接复制。
14. `read_text()` / `write_text()` 不带 `encoding` 会跟随平台默认编码，中文环境老版本（< 3.15）上是 `cp936` —— 一律显式 `encoding="utf-8"`。
15. 只读文件（`chmod(0o444)` 过的）会挡住 `unlink` 和 `shutil.rmtree`，先改回可写。

---

## 十六、常用模板（可直接抄）

**列出目录下所有某类文件（含子目录，稳定排序）**

```python
from pathlib import Path

for f in sorted(Path("D:/data").rglob("*.csv")):
    print(f.name, f.stat().st_size, "bytes")
```

**只在一层里按后缀筛选，跳过目录**

```python
files = [p for p in sorted(Path(".").glob("*")) if p.is_file() and p.suffix in {".py", ".md"}]
```

**按扩展名把文件归档到子目录（先建目录再改名）**

```python
src = Path("D:/downloads")
for f in src.glob("*.*"):        # 只挑"带后缀"的文件，无后缀的 noext 不会被匹配
    if f.is_file():
        target_dir = src / f.suffix.lstrip(".").lower()
        target_dir.mkdir(exist_ok=True)
        f.replace(target_dir / f.name)      # 覆盖式移动
```

**统计目录占用（跳过某些子目录）**

```python
total = 0
for root, dirs, files in Path("D:/data").walk():
    if ".git" in dirs:
        dirs.remove(".git")                 # 顶向下遍历时剪枝
    total += sum((root / name).stat().st_size for name in files)
print(total / 1024 / 1024, "MB")
```

**自底向上清理空目录（含"删完后父目录也空了"的情况）**

```python
for root, dirs, files in Path("D:/logs").walk(top_down=False):
    # dirs 里是"扫描时"的子目录名，可能已被删掉，所以要重新确认它们是否还在
    if not files and not any((root / name).exists() for name in dirs):
        root.rmdir()
```

**路径拼接别手写字符串**

```python
base = Path("D:/计算机学习文档")
out = base / "output" / "report.md"       # 不要写 base + "\\output\\report.md"
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text("# 报告\n", encoding="utf-8")
```

**相对路径 + 绝对路径互转**

```python
root = Path("D:/project").resolve()
target = (root / "src" / "main.py").resolve()
print(target.relative_to(root))            # -> src/main.py
print(target.is_relative_to(root))         # -> True
```

---

## 附：事实来源与验证方式

- 内容依据官方文档 [pathlib — Object-oriented filesystem paths](https://docs.python.org/3/library/pathlib.html)（Python 3.15）；模式语法、`glob` 与 `glob` 模块的差异、`os`/`os.path` 对应表均取自该页。
- 本文所有 `->` 输出为 **Windows + CPython 3.15.0** 实机运行结果；涉及版本差异的行用 3.14.0 与 3.12.13 的 `dir(pathlib.Path)` 结果交叉核对（例如 `is_reserved` 只在 3.12/3.14 存在、3.15 已移除；`copy` / `move` / `info` 在 3.12 上不存在）。
- 相关笔记：Python自学D9-永久存储（`open()` 与文件对象）、D8-异常（这些方法会抛哪些异常）。
