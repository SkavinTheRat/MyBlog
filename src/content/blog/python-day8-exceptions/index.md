---
title: 'Python自学D8--异常处理与 CPython 机制'
description: '从异常树和 try/except 到异常对象、异常表、traceback 与跨帧传播，理解错误如何被接住。'
publishDate: 2026-10-16
tags: ['python', '异常', 'cpython', 'debugging']
language: zh-CN
---
## 一、异常的存在--代码中的错误与报错
0. 异常的层次结构（异常树）：

```text
BaseException:所有异常的根
├── BaseExceptionGroup            # 3.11+
├── GeneratorExit
├── KeyboardInterrupt
├── SystemExit
└── Exception
├── ArithmeticError → FloatingPointError / OverflowError / ZeroDivisionError
├── AssertionError
├── AttributeError
├── BufferError
├── EOFError
├── ExceptionGroup             # 3.11+，同时继承 BaseExceptionGroup
├── ImportError → ModuleNotFoundError
├── LookupError → IndexError / KeyError
├── MemoryError
├── NameError → UnboundLocalError
├── OSError                 # IOError / EnvironmentError / WindowsError 是别名
│   ├── BlockingIOError
│   ├── ChildProcessError
│   ├── ConnectionError → BrokenPipeError / ConnectionAbortedError / ConnectionRefusedError / ConnectionResetError
│   ├── FileExistsError
│   ├── FileNotFoundError
│   ├── InterruptedError
│   ├── IsADirectoryError
│   ├── NotADirectoryError
│   ├── PermissionError
│   ├── ProcessLookupError
│   └── TimeoutError
├── ReferenceError
├── RuntimeError → NotImplementedError / RecursionError / PythonFinalizationError(3.13+)
├── StopAsyncIteration
├── StopIteration
├── SyntaxError → IndentationError → TabError
├── SystemError
├── TypeError
├── ValueError → UnicodeError → UnicodeDecodeError / UnicodeEncodeError / UnicodeTranslateError
└── Warning → BytesWarning / DeprecationWarning / EncodingWarning(3.10+) / FutureWarning / ImportWarning / PendingDeprecationWarning / ResourceWarning / RuntimeWarning / SyntaxWarning / UnicodeWarning / UserWarning
```

1.报错的具体结构：调用链+出错文件位置+出错文件行号+异常类型+具体消息+异常链
2.异常的类型和对应内容：英文都说的很明白，到时候看就行；有整理Python中的报错信息汇总
## 二、捕获并处理异常
0.语法：`try-except`语句--`try:<>检测范围> \n except:<执行语句>
    也可以在except后执行一个具体异常，语法：`except<异常名>:`
    进一步：`except <报错名> as <标识符>`，之后可以使用这个变量来代表报错
        注意：异常名字和报错信息不一样：`ZeroDivisionError和division by zero
        使用快捷键`ctr+c`或点击暂停按钮，也是异常--`keyboardinterrupt`
    进一步：不知道会有什么报错：使用元组把报错信息全部计入
    `except: (\n) pass`，若有报错，try部分直接跳过
    `try-except-else`，若try后的内容没有报错，则执行else语句中的内容
    `try-except-finally`，finally后的语句无论报错与否都会执行（可与else搭配）
        即：try后内容始终会进入、被执行；放可能出错、出错之后要特殊关照的内容
            except后当try内报异常、且类型匹配时会被执行；处理可以处理的错误
            else在try未报异常后执行，放不属于危险代码、成功之后执行的内容
            finally无论如何都执行，放收尾内容
                注意：多个except是从上至下匹配的，有就进
    执行过程：`try-except(有异常)-else(无异常)-finally-若异常没有接住，则向上抛，到上一层
1.异常也可以嵌套（将try语句理解为if语句）
    先从内部开始判断，再逐渐向外部逐层判断（函数逐渐调用是同样的道理）
2.raise语句：主动触发异常
    语法：`raise<异常名> (<输出内容>)`--输出：`<异常名>:<输出内容>`
        注意：异常名必须存在
3.异常链：
    语法：`raise <异常名> (<输出内容>) from <异常名> `--异常中触发异常
4.assert语句：同样，if语句，如果后面的表达式为假就抛assert异常
    语法：`assert <判断句>`
    在调试时有用（assert-v.断言）
5.try-raise-except语句实现跳转--利用raise主动报错，直接跳转到except部分，执行后面的语句
## 三、CPython原理：**异常也是对象--“一切皆对象！”**
0.总览：本质是两个C结构体+一套约定：
    线程状态中的“异常栈“负责”存储“异常（3个部分），而代码对象中的异常表负责定位
    同时C规定函数出错就返回`NULL`，错误信息放在异常状态里
1.异常的存储--异常对象和异常栈
    异常栈是一个单独的栈（线程中的一部分），栈顶是当前的异常
        异常栈中存储一个结构体--异常对象。其中有异常类型（except后内容）、异常消息（报错）、回溯对象
        还有一个指针指向上层异常
        其中携带的信息（以指针为主）：构造异常时的参数、异常经过的帧链、异常原因、异常因果链、附加说明
2.异常的抛出--C的”约定“
    当程序中执行一些非法内容时（如除0），对应函数只返回`NULL`，返回异常状态错误详情在异常对象之中--抛出方只负责登记，不处理--解释器处理报错。（异常对象在函数调用失败时被创建）
    异常状态：包含异常对象、traceback追溯链
3.异常的传播--解释器主循环+异常表
    解释器主循环执行字节码，在调用函数时会**检查返回值**`NULL`。当发现异常之后，检查有没有`except`在当前帧中--在代码对象中有一个异常表，在编译时期就确定了内容（try字节码的起始范围，由try字节码就有异常表）
        在出现异常之后，解释器就会去查对应的异常表，找handler(异常处理器)，有就跳到异常对象里，再跳到代码块里；没有就退出帧，将异常向上抛
            handler是什么：异常处理器--和对应except结合，有except才执行--是异常发生之后接手的代码。其具体会判断类型是否匹配，匹配就执行代码，抛except后内容
4.捕获--跳入异常处理器后的执行：
    （在一个帧之中）若异常类型匹配成功就进入except代码块执行，不匹配则抛出，向上求索。到最顶层，还没有接住，则打印traceback并退出，若有一帧的except匹配成功，将其接住，则停止
    如果没有匹配成功，就记录一条traceback，再返回失败状态给调用者--逐渐上升（到上一个函数-上一个帧），直到程序顶端，返回错误信息，程序报错崩溃
5.本质是异常逐渐”上升“，”处理“的过程--从最局部开始执行，报错一层层向上传递，而”raise“就是强制令其上升一层的过程
6.补充理解：Python必要补充知识--内存中的帧栈堆基础
