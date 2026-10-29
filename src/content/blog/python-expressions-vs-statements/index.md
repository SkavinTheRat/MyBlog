---
title: 'Python 表达式与语句的区别'
description: '借助 print、eval 与四对孪生写法，分清有返回值的表达式和执行动作的语句。'
publishDate: 2026-10-11
tags: ['python', 'syntax', 'expression', 'statement']
language: zh-CN
---
## 一、核心区别：表达式有值，语句无值
0.表达式：一段能"算出结果"的代码，**一定有值**
    检测法：能放进 `print()`、能赋给变量、能作为函数参数、能作为 `eval()` 的参数
    例子：`1+2`、`len("ab")`、`x > 3`、`[i*2 for i in range(3)]`、`lambda x: x+1`
1.语句：让程序"做一件事"的动作，**本身没有值**
    检测法：不能放进 `print()`、`eval()` 会报 SyntaxError
    例子：赋值 `x=1`、`if`、`for`、`def`、`import`、`del`、`while`、`return`
2.万能检测器：`eval()`
    `eval("1+2")` 通过 → 表达式
    `eval("x=1")`、`eval("if True: 1")` 报 SyntaxError → 语句
3.一句话：**表达式是"算一个数"，语句是"干一件事"**

## 二、四对孪生：语句 ↔ 对应的表达式写法
0.if 语句 ↔ 三元表达式（条件表达式）
    if 语句：`if x>0: y='正'` + `else: y='负'`（无值，靠副作用改 y）
    三元：`y = '正' if x>0 else '负'`（有值，可直接赋值）
1.for 语句 ↔ 推导式
    for 语句：`lst=[]` + `for i in range(3): lst.append(i*2)`（无值）
    推导式：`lst = [i*2 for i in range(3)]`（有值，直接生成列表）
2.def 语句 ↔ lambda 表达式
    def 语句：`def f(x): return x+1`（定义动作，无值）
    lambda：`f = lambda x: x+1`（有值，返回一个函数对象）
3.赋值语句 ↔ 海象运算符 `:=`（赋值表达式，3.8+）
    赋值语句：`x = 1`（无值）
    海象：`y = (x := 1)`（有值，边赋值边取值，y 得到 1）
规律：**想"要值/内联"用表达式；想"做动作/可读性"用语句**

## 三、C 程序员最易踩的坑：赋值是语句，不是表达式
0.C 里：赋值是表达式，有值
    可以链式 `a = b = c = 1`；可以 `while ((c = getchar()) != EOF)`
1.Python 里：赋值是语句，**没有值**
    不能 `print(x = 1)` → 报错（print 里 `=` 被当成关键字参数）
    不能 `if x = 1` → 判断相等要写 `==`
    链式 `a = b = c = 1` 是 Python 的**特殊语法**，不是"赋值返回值的链"
2.想"边赋值边用值" → 海象运算符 `:=`

## 四、语句与表达式速查清单
0.语句（执行动作，无值）：
    赋值 `=`、`if/elif/else`、`for`、`while`、`def`、`class`、`return`、`import`、`del`、`pass`、`break/continue`、`global/nonlocal`、`try/except`、`with`
1.表达式（算出结果，有值）：
    字面量、变量、算术/比较/逻辑运算、函数调用、属性/下标访问、`lambda`、三元、推导式、海象 `:=`
2.特殊：函数调用本身是表达式（有返回值），如 `print()` 返回 `None`——但"调用"这个动作仍是表达式

## 五、一句话总结
**表达式 = 有值 = 能放进 print / eval / 等号右边；语句 = 无值 = 只能"做动作"**
四对孪生记牢：if↔三元、for↔推导式、def↔lambda、赋值↔海象
