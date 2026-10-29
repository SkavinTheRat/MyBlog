---
title: 'Python 中的迭代与迭代器'
description: '分清可迭代对象与迭代器，理解 iter、next、游标和生成器为什么共享同一套迭代协议。'
publishDate: 2026-10-11
tags: ['python', '迭代器', 'generator', 'protocol']
language: zh-CN
---
1."迭代"：一个动作--逐次取出元素，重复处理
    for循环是一个迭代：对对象中的每一个元素进行处理
2.可迭代对象：可以被for循环遍历的东西（序列、range、字典、文件......）
3.过程：迭代对象调用迭代器（iteration），迭代器再反复调用next()函数
    注意：这三个主体都是相互独立的，链接通过指针和方法表实现
    结束：取空就抛出异常，使循环自然结束
    迭代器本身不保留数据，只是暂时性地中转，是“一次性”的
    迭代器如何传出数据：
        只存两样东西：**一个指向底层数据的指针 + 一个“读到哪了”的游标**
            list 迭代器：`it_seq`（指向底层 list）+ `it_index`（游标）
        每次 next() 是**传引用、不是复制**，做三件事：
            ① 按游标抓出 list 指针数组里该位置的指针 `ob_item[it_index]`，不新建任何东西
            ② 游标 `it_index` + 1
            ③ 引用计数 +1（把这个引用“借”出去）
        证据：`next(it) is lst[0]` 为 True；改取出的可变元素，原列表也被改（本就是同一对象）
        **str 迭代器例外**：字符串是连续缓冲区，没有独立的“字符对象”可引用，所以每次 next 都新建一个单字符 str--结合理解：str不可变（连续内存空间），List是指针数组
        取空：C 层返回 NULL → 上层抛 StopIteration（有 default 参数则返回 default）
4.迭代器的意义--"惰性"：
    将列表和迭代器分开/用迭代的方式处理列表，本质是将元素一次次拿出，这样简单且分开处理数据的方法是好的（占用内存少）
5.next()函数的实现：
    next() 是一个**内置函数**（C 里叫 `builtin_next`），不是迭代器对象的方法，对所有迭代器均适用
        `next(it)` 与 `it.__next__()` **完全等价**——next 只是包一层，内部就是调用 `__next__()`
        两种写法：`next(it)` 取空抛 StopIteration；`next(it, default)` 取空返回 default 不抛异常
    底层调用链：next → 读 `ob_type` → 找 **tp_iternext 槽**（函数指针）→ **调用具体 C 实现 **→ 返回元素或 NULL（本质和其他方法相同）
    与 iter() 对称（迭代器协议的两半）：
        `iter(obj)` → `__iter__()` → `tp_iter` 槽（“雇手”）
        `next(it)` → `__next__()` → `tp_iternext` 槽（“取货”）
    for 循环的底层：先 `iter()` 雇手，再反复 `next()` 取货，直到取到空 StopIteration停止
