---
title: 'Python自学D7--字典与集合'
description: 原理（哈希值与不可变性）已经理解，但是底层实现太难--先让AI整理，之后再回看
publishdate: 2026-10-15
tags:
  - python
  - 字典与集合
  - 哈希值
---
Python一月预习
## 一、字典：存储映射关系（集合间关系）--本质是有键值对应的集合
0.语法：`{键：值，键：值，键：值}`
1.本质：由键到值的映射表--键唯一（重复赋值，后面替换前面）、不可变（可哈希）、值任意
2.创建列表：
- 字面量：直接使用字典的语法创建 `<变量名> = {键：值，键：值}`--这里的键是字符串
- 函数关键字参数：`<变量名> = dict(键 = 值，键 = 值)
- 键值对序列：`<变量名> = dict([(键，值)，(键，值)])
- 转化：`.fromkeys(iter)`方法，将一个可迭代对象中的元素变成键（字符串则是每个字符）
3.读取字典：`print(<字典名>.get("hobby","无"))`--若没有对应元素，会返回默认值，即后面的参数--`.get`为常用安全访问方式
4.字典操作：
- 增/改：`<字典名>[键值] = 数据`--没有则新增，有则覆盖
    - 批量更新：`<字典名1>.update(<字典名2>)`--将d2的键值并入d1--有则覆盖，无则添加
- 删：`<字典名>.pop(删除元素，默认参数)`--没有则返回默认参数
    - `del <字典名>[键]`--直接删除对应元素；`del <字典名>`直接删除字典。等于.clear()方法
- 查：`<键> in <字典名>`直接o(1)查找；`.setdefault(键，默认参数)`，有则返回值，无则添加
5.字典的动态视图（视图对象）：item\key\value三个方法
- 语法：`<变量名> = <字典名>.keys()``<变量名> = <字典名>.items()`
- `<变量名> = <字典名>.values()`
    - item查找键值对；keys查找键；values查找值
- 视图对象会随着字典内容的变化而变化
6.字典可以实现嵌套：字典中嵌套字典，字典中嵌套序列--访问对应元素的参数要多几个
## 二、集合：--只有键的字典
0.什么是元素：**当前这个容器直接包含的对象**，不会自动递归展开内部
- 集合中以逗号分割的参数、列表中的元素（嵌套列表是子数组）、字符串中的一个个字符
1.基础语法：
- 创建：`<变量名> = {"<元素1>"，"<元素2>"}`；强制类型转换，转换序列类型（字符串也可以）
- 性质：**互异性（没有重复变量），无序性（存储不连续）**
    - 利用互异性：对一个列表，直接将其强制转换为集合，直接去重
    - `语法：len(<列表>)==len(<集合>)`
利用互异性：对一个列表，直接将其强制转换为集合，直接去重
    - `语法：len(<列表>)==len(<集合>)`
2.增删判断：
- 判断是否毫不相关（无交集）：.isdisjoint(<集合名>/集合)方法
- 判断是否为子集：.issubset
- 判断是否为超集：.issuperset
- 并集：.union()
- 交集：.intersection()
- 差集：.dfference()--找A中有，B中没有的元素
    - 并集、交集、差集：方法中有多个参数
- 对称差集：排除集合A、B中的共有集合
    - .symmetric_difference()
- 使用运算符：（两侧数据类型均为集合）
    - 真子集：`<> < <>
    - 子集：`<> <= <>
    - 真超集：`<> > <>
    - 超集：`<> >= <>
    - 并集：`<> | <>
    - 交集：`<> & <>
    - 差集：`<> - <>
    - 对称差集：`<>^<>
3.可变与不可变集合：
- set可变，frozenset不可变--可以做为元素和键
- 集合的改变（对可变set对象）：
    - .update(<多个参数>)--取并集
        - 与方法一起使用：.difference_update, .symmetric_update,
    - 删：.remove()与.discard()--如果没有对应元素，前者会报错，后者会静默处理
## 三、本质探究：哈希表原理--使查找复杂度变为o(1)
0.哈希值：原始数据经过哈希函数变为哈希值，本质是将不定长度的输入转化为定长输出
1.哈希值的特点：
- 定长性：输出的永远是固定长度
- 确定性：输入与输出永远对应（输入相同则输出相同，输入不同输出不同，哈希函数单值）
- “雪崩效应”：输入相差很小，输出却相差很多
- 不可逆性：不能从哈希函数反推原值（经过很过个复杂步骤）
2.哈希函数的计算过程：填充-初始化-扩展位块-压缩运算（移位、逻辑）-将所有状态字拼接
3.查找过程：
- 对字典中的键/集合中的元素调用hash()方法，得到对应的哈希值
- 将哈希值对表长取模，得到数组下标，将哈希值映射到槽位
    - --理解：序列第一个元素的下标值仍为0
- 遇到冲突（不同键算出相同槽位，“哈希冲突”）：开放寻址法，放入下一个空槽之中
- 判重：相同的元素，哈希值必然相同--所以多个元素必然会放到同一槽中，若相等-丢弃
    - “相等”-- == 真假判断，1=1.0=True，且哈希值相同，所以会被去重
        - 相等=哈希相同，但是哈希相同!=相等。哈希是“快速通道”，真正判断相等的是 ==
- 速度：o(1)，算一次哈希后直接跳到对应槽位，与数据量无关--比遍历快很多
- “不可变对象才能作为键/元素”--如果元素可变，放入时的位置和取出时的位置很可能无法对应

## 四、CPython 的结构体：字段逐个看（括号内为白话）
0.集合 set 的结构体 PySetObject（源码 Include/cpython/setobject.h）
- PyObject_HEAD：引用计数 + 类型指针（所有对象共有的"头"）
- hash：frozenset 的缓存哈希值（普通 set 用不到，恒为 -1）
- fill：元素 + dummy 的总数；used：真实元素数（判断满没满看 fill）
- mask：表大小 − 1（表大小恒为 2 的幂，用 hash & mask 取模定位）
- table：指向哈希表数组（实际指向内联的 smalltable）
- smalltable[8]：内联小表——对象体内自带 8 个槽，小集合省一次 malloc（空 set 216 字节的来源）
- finger：迭代游标（遍历时"指到第几格"）
- 每个槽 setentry = { key 元素对象 + hash 该元素的哈希值 }
1.字典 dict 的结构体 PyDictObject（3.6+ 紧凑表，源码 Include/cpython/dictobject.h）
- PyObject_HEAD：同上
- ma_used：键值对数量
- ma_version_tag：版本号——遍历中若字典被改，靠它 O(1) 检测并抛 RuntimeError
- ma_keys：指向 PyDictKeysObject（键表）
- ma_values：值数组（分离表时用，普通表为 NULL）
- PyDictKeysObject 内部（把一张哈希表拆成两个数组）：
    - dk_size：哈希表大小（2 的幂）；dk_usable：还能装多少；dk_nentries：已用条目数
    - dk_lookup：查找函数指针——按键类型选优化版本（见第七节）
    - dk_indices[]：稀疏索引数组（"号码牌墙"）——每格写"去条目第几号"，-1 = 空
    - dk_entries[]：紧凑条目数组（"存放区"）——按插入顺序存，保序
- 每个条目 PyDictKeyEntry = { me_key 键 + me_value 值 + me_hash 哈希值 }

## 五、建立集合 set 的完整过程（源码 → 字节码 → C 函数）
0.两种触发写法：
- 字面量 s = {1, 2, 3} → 字节码 BUILD_SET + SET_UPDATE（常量折叠，见 0.2）
- 构造 s = set([1, 2, 3]) → 字节码 CALL set（调用构造函数）
1.C 调用链（每个函数在做什么）：
- ① set_new → make_new_set：分配 PySetObject，初始化 smalltable 内联小表
- ② set_update_internal：拿到可迭代对象，逐个取出元素
- ③ set_add_entry：处理单个元素（插入的核心入口）
- ④ set_lookkey：算 hash → hash & mask 定槽 → 线性探测；槽里已有相等元素则返回"已存在"（去重的关键）
- ⑤ set_insert_key：把 {元素 + 哈希值} 写进空槽
- ⑥ set_table_resize：fill 超阈值（约 2/3）→ 翻倍扩容、重新哈希搬进新表
2.常量折叠：{1,2,3} 全是字面量常量 → 编译期预先算好冻成 frozenset 常量，运行时只建空集合再合并，更快
3.串起来：建对象 → 逐个 add（判重 + 写槽）→ 满了扩容

## 六、建立字典 dict 的完整过程
0.两种触发写法：
- 变量键 {x: 1, y: 2} → 字节码 BUILD_MAP 2（把 2 对键值压栈，一次构建）
- 常量键 {'a': 1, 'b': 2} → 字节码 BUILD_CONST_KEY_MAP 2（键已折成常量元组）
1.惰性初始化：空 dict 只占 64 字节，ma_keys 为 NULL、不分配键表；首次插入才分配（插入 1 个键后 184 字节）
2.C 调用链：
- ① dict_new → new_dict：分配 PyDictObject，空表（ma_keys 为 NULL）
- ② PyDict_SetItem：设置键值对（写操作统一入口）
- ③ insertdict：首次插入先调 _PyDict_NewKeys 分配键表（dk_size 初始为 8）；之后每次插入都走这里
- ④ lookdict（dk_lookup 指向的函数）：hash & mask 定槽 + 线性探测，找键是否已存在
- ⑤ 键已存在 → 覆盖 me_value；不存在 → 追加进 dk_entries，并回填 dk_indices
- ⑥ dictresize：dk_usable 耗尽（装填率 2/3）→ 翻倍扩容、rehash
3.串起来：建空对象 → 首次插入分配键表 → 逐个 set（查找 + 写入）→ 满了扩容

## 七、查找的核心：lookdict 与按类型的优化
0.dk_lookup 是函数指针，创建字典时按键类型选定，之后一直复用：
- 全 str 键 → lookdict_unicode：先比哈希值、再比指针、最后才逐字符比较，最快
- 全 int 键 → lookdict_index：直接按整数定位
- 混合键 → lookdict 通用版
1.通用查找算法：hash(key) & mask → 初始槽 → 线性探测 → 每步先比 hash（快筛，不等直接跳）再比 key（== 判相等）

## 八、删除与 dummy 墓碑
0.字节码：del d['a'] → DELETE_SUBSCR
1.C 调用链：dict_ass_sub → delitem_common → 把对应 dk_indices 格标记为 DKIX_DUMMY
2.为什么留 dummy 不清空：删中间的 b（a→槽3、b→槽4、c→槽5 撞车成链），若清空槽4，查找 c 走到槽4见"空"就停 → c 丢失；留 dummy 则跳过继续找到 c
3.代价与清理：dummy 占格子（用 fill 计数）、拖慢查找；装填率超 2/3 → dictresize 重建，只搬活元素，dummy 被清掉

## 九、开放寻址 vs 分离链
0.开放寻址：元素都在表内，冲突就探测下一个空位（Python set/dict）
1.分离链：每个槽挂一条链表，冲突就挂链上（C++ unordered_map / Java HashMap）
2.探测方式：线性探测（逐个 +1）、二次探测（按平方跳）、双重哈希（第二个哈希定步长）
3.CPython 选开放寻址的原因：连续内存、CPU 缓存友好；代价是删除要 dummy 兜底

## 十、一张总览表（操作 → 字节码 → C 函数）
- 建 set：BUILD_SET / SET_UPDATE 或 CALL set → set_new → set_add_entry
- 建 dict：BUILD_MAP 或 BUILD_CONST_KEY_MAP → dict_new → PyDict_SetItem
- 读 d['k']：BINARY_SUBSCR → PyDict_GetItem → lookdict
- 写 d['k']=v：STORE_SUBSCR → PyDict_SetItem → insertdict
- 删 del d['k']：DELETE_SUBSCR → dict_ass_sub → delitem_common
- 判成员 k in s：CONTAINS_OP → set_contains
- 增 s.add(x)：LOAD_ATTR + CALL → set_add → set_add_entry
