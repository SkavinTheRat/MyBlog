---
title: 'Python 常见异常与报错信息速查'
description: '按异常类型整理常见原始报错、触发原因与排查方向，作为异常处理文章的配套速查表。'
publishDate: 2026-10-15
tags: ['python', '异常', 'debugging', 'reference']
language: zh-CN
---
| 异常                       | 典型信息                                                                       | 具体原因                                                                            |
| ------------------------ | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `EOFError`               | `EOF when reading a line`                                                  | 需要读一行，但流已经结束，什么都没读到。`input()` 最常见。                                              |
| `pickle` 的 `EOFError`    | `Ran out of input`                                                         | pickle 要读完整对象，空流或数据不完整。截断数据还可能报 `UnpicklingError: pickle data was truncated`。   |
| `marshal` 的 `EOFError`   | `EOF read where object expected`                                           | marshal 要读一个完整对象，但流提前结束。                                                        |
| `json.JSONDecodeError`   | `Expecting value: line 1 column 1 (char 0)`                                | JSON 输入为空，或格式不完整。空文件、空字符串都会这样。                                                  |
| `FileNotFoundError`      | `[Errno 2] No such file or directory: 'a.txt'`                             | 路径不存在，或拼写、工作目录不对。属于 `OSError`。                                                  |
| `PermissionError`        | `[Errno 13] Permission denied: 'a.txt'`                                    | 没有读、写或执行权限，文件也可能被占用。                                                            |
| `FileExistsError`        | `[Errno 17] File exists: 'a.txt'`                                          | 创建文件或目录时目标已存在，例如 `os.mkdir`。                                                    |
| `IsADirectoryError`      | `[Errno 21] Is a directory: 'folder'`                                      | 把目录当文件打开。                                                                       |
| `NotADirectoryError`     | `[Errno 20] Not a directory: 'a.txt/x'`                                    | 路径中间把文件当成了目录。                                                                   |
| `OSError`                | `[Errno 28] No space left on device`                                       | 操作系统级错误的总类，磁盘满、文件描述符耗尽等。                                                        |
| `BlockingIOError`        | `[Errno 11] Resource temporarily unavailable`                              | 非阻塞 I/O 暂时无法完成。                                                                 |
| `InterruptedError`       | `[Errno 4] Interrupted system call`                                        | 系统调用被信号打断。                                                                      |
| `ProcessLookupError`     | `[Errno 3] No such process`                                                | 操作的目标进程不存在。                                                                     |
| `TimeoutError`           | `[Errno 110] Connection timed out` 或 `timed out`                           | 网络或 I/O 超时，消息随平台和场景变化。                                                          |
| `ConnectionRefusedError` | `[Errno 111] Connection refused`                                           | 目标端口没有服务监听。                                                                     |
| `ConnectionResetError`   | `[Errno 104] Connection reset by peer`                                     | 对端强制断开连接。                                                                       |
| `BrokenPipeError`        | `[Errno 32] Broken pipe`                                                   | 管道另一端已关闭，常见于 `head`、`less` 提前退出。                                                |
| `UnicodeDecodeError`     | `'utf-8' codec can't decode byte 0xff in position 0: invalid start byte`   | 用错误编码读取字节，或文件本身不是该编码。                                                           |
| `UnicodeEncodeError`     | `'ascii' codec can't encode characters ...: ordinal not in range(128)`     | 把非 ASCII 文本写入只接受 ASCII 的目标。                                                     |
| 异常                       | 典型信息                                                                       | 具体原因                                                                            |
| `ModuleNotFoundError`    | `No module named 'foo'`                                                    | 按 `sys.path` 搜索后没找到模块，属于 `ImportError` 子类。                                      |
| `ImportError`            | `cannot import name 'bar' from 'foo'`                                      | 模块找到了，但里面没有这个名字，常见于循环导入。                                                        |
| `ImportError`            | `attempted relative import with no known parent package`                   | 直接运行包内文件，缺少包上下文。                                                                |
| `NameError`              | `name 'x' is not defined`                                                  | 运行到该名字时，局部、闭包、全局和内置里都找不到它。                                                      |
| `UnboundLocalError`      | `cannot access local variable 'x' where it is not associated with a value` | 函数里某处给 `x` 赋值，于是 `x` 被视为局部变量，但读取发生在赋值之前。                                        |
| `AttributeError`         | `'str' object has no attribute 'append'`                                   | 对象类型根本没有这个属性，或属性名拼错。                                                            |
| `TypeError`              | `unsupported operand type(s) for +: 'int' and 'str'`                       | 操作符用在了不兼容的类型上。                                                                  |
| `TypeError`              | `'int' object is not callable`                                             | 把不可调用的对象当函数调用。                                                                  |
| `TypeError`              | `f() missing 1 required positional argument: 'x'`                          | 函数调用缺少参数，或多给了参数。                                                                |
| `ValueError`             | `invalid literal for int() with base 10: 'abc'`                            | 类型正确但值不合法，`int("abc")` 就是典型例子。                                                  |
| `ValueError`             | `too many values to unpack (expected 2)`                                   | 解包的元素个数和变量个数不匹配。                                                                |
| `IndexError`             | `list index out of range`                                                  | 序列下标越界，负下标越界也算。                                                                 |
| `KeyError`               | `'name'`                                                                   | 字典里没有这个键。`KeyError` 的消息通常是键的 `repr`。                                            |
| `ZeroDivisionError`      | `division by zero`                                                         | 分母为零。整除和取模的消息可能是 `integer division or modulo by zero`、`integer modulo by zero`。 |
| `AssertionError`         | `AssertionError` 或自定义消息                                                    | `assert` 条件为假。注意 `python -O` 会跳过断言，不适合做用户输入校验。                                  |
| `NotImplementedError`    | `NotImplementedError`                                                      | 抽象方法或暂未实现的分支。它属于 `RuntimeError`。                                                |
| `RecursionError`         | `maximum recursion depth exceeded`                                         | 递归超过 `sys.getrecursionlimit()`，通常是无限递归。                                         |
| `MemoryError`            | `MemoryError`，往往没有消息                                                       | 内存不够，常见于一次性构造超大列表或字符串。                                                          |
| `SyntaxError`            | `invalid syntax`                                                           | 解析阶段语法错误，通常发生在导入或编译文件时，不是运行时。                                                   |
| `IndentationError`       | `expected an indented block after function definition on line 3`           | 缩进结构不合法，属于 `SyntaxError`。                                                       |
| `TabError`               | `inconsistent use of tabs and spaces in indentation`                       | 同一文件混用 Tab 和空格，属于 `IndentationError`。                                           |
| `RuntimeError`           | `dictionary changed size during iteration`                                 | 运行时状态不一致，最典型是遍历字典时修改字典。                                                         |
| `StopIteration`          | `StopIteration`                                                            | `next()` 迭代器耗尽。若在生成器内部逃出，会被转换成 `RuntimeError: generator raised StopIteration`。  |
| `ReferenceError`         | `weakly-referenced object no longer exists`                                | 使用 `weakref` 代理时，原对象已经被回收。                                                      |
| `BufferError`            | `Existing exports of data: object cannot be re-sized`                      | 对象已导出缓冲区，不能被重新调整大小。                                                             |
| `SystemError`            | 各种内部错误信息                                                                   | 通常不是用户代码逻辑问题，可能是 C 扩展或解释器内部错误。                                                  |
