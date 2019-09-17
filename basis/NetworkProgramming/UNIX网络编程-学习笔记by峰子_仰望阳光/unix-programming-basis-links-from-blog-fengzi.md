# readme

Ref: https://www.cnblogs.com/xiehongfeng100/p/4768209.html

## 目录

- [网络编程基础](#网络编程基础)
- [并发编程](#并发编程)
- [多线程](#多线程)



## 网络编程基础

1. [《UNIX网络编程 卷1》之"学习环境搭建"（CentOS 7）](https://www.cnblogs.com/xiehongfeng100/p/4593337.html)

2. [Linux 套接字编程中的 5 个隐患（转)](https://www.cnblogs.com/xiehongfeng100/p/4595391.html)
   - [隐患 1．忽略返回状态](https://www.cnblogs.com/xiehongfeng100/p/4595391.html#autoid-0-0-0)
   - [隐患 2．对等套接字闭包](https://www.cnblogs.com/xiehongfeng100/p/4595391.html#autoid-1-0-0)
   - [隐患 3．地址使用错误（EADDRINUSE）](https://www.cnblogs.com/xiehongfeng100/p/4595391.html#autoid-2-0-0)
   - [隐患 4．发送结构化数据](https://www.cnblogs.com/xiehongfeng100/p/4595391.html#autoid-3-0-0)
     - [🔥网络传输struct类型数据&TCP粘包处理](https://blog.csdn.net/rock_joker/article/details/60885270) 
     - [🔥字节序列转换-主机字节序-网络字节序](https://www.cnblogs.com/my_life/articles/5787195.html)
   - [隐患 5．TCP 中的帧同步假定](https://www.cnblogs.com/xiehongfeng100/p/4595391.html#autoid-4-0-0)
   - [调试套接字应用程序的工具](https://www.cnblogs.com/xiehongfeng100/p/4595391.html#autoid-5-0-0)
   - [查看网络子系统的细节](https://www.cnblogs.com/xiehongfeng100/p/4595391.html#autoid-6-0-0)
   - [监视流量](https://www.cnblogs.com/xiehongfeng100/p/4595391.html#autoid-6-1-0)
   - [总结](https://www.cnblogs.com/xiehongfeng100/p/4595391.html#autoid-6-2-0)

3. [netstat 的10个基本用法（转）](https://www.cnblogs.com/xiehongfeng100/p/4595404.html)
   - [Netstat 简介](https://www.cnblogs.com/xiehongfeng100/p/4595404.html#autoid-0-0-0)
   - [1. 列出所有连接](https://www.cnblogs.com/xiehongfeng100/p/4595404.html#autoid-1-0-0)
   - [ 2. 只列出 TCP 或 UDP 协议的连接](https://www.cnblogs.com/xiehongfeng100/p/4595404.html#autoid-1-1-0)
   - [ 3. 禁用反向域名解析，加快查询速度](https://www.cnblogs.com/xiehongfeng100/p/4595404.html#autoid-1-2-0)
   - [4. 只列出监听中的连接](https://www.cnblogs.com/xiehongfeng100/p/4595404.html#autoid-1-3-0)
   - [ 5. 获取进程名、进程号以及用户 ID](https://www.cnblogs.com/xiehongfeng100/p/4595404.html#autoid-1-4-0)
   - [ 6. 打印统计数据](https://www.cnblogs.com/xiehongfeng100/p/4595404.html#autoid-1-5-0)
   - [7. 显示内核路由信息](https://www.cnblogs.com/xiehongfeng100/p/4595404.html#autoid-1-6-0)
   - [ 8. 打印网络接口](https://www.cnblogs.com/xiehongfeng100/p/4595404.html#autoid-1-7-0)
   - [9. netstat 持续输出](https://www.cnblogs.com/xiehongfeng100/p/4595404.html#autoid-1-8-0)
   - [10. 显示多播组信息](https://www.cnblogs.com/xiehongfeng100/p/4595404.html#autoid-1-9-0)
   - [更多用法](https://www.cnblogs.com/xiehongfeng100/p/4595404.html#autoid-1-10-0)
   - [ 打印 active 状态的连接](https://www.cnblogs.com/xiehongfeng100/p/4595404.html#autoid-2-0-0)
   - [ 查看服务是否在运行](https://www.cnblogs.com/xiehongfeng100/p/4595404.html#autoid-2-1-0)
4. [什么是网络套接字（Socket](https://www.cnblogs.com/xiehongfeng100/p/4598128.html)
   - [Socket定义](https://www.cnblogs.com/xiehongfeng100/p/4598128.html#autoid-0-0-0)
   - [Socket类型](https://www.cnblogs.com/xiehongfeng100/p/4598128.html#autoid-1-0-0)
   - [Socket网络层次](https://www.cnblogs.com/xiehongfeng100/p/4598128.html#autoid-2-0-0)
   - [Socket API](https://www.cnblogs.com/xiehongfeng100/p/4598128.html#autoid-3-0-0)
5. [套接字编程相关函数（1：套接字地址结构、字节序转换、IP地址转换）](https://www.cnblogs.com/xiehongfeng100/p/4597803.html)
   - [1. 套接字地址结构](https://www.cnblogs.com/xiehongfeng100/p/4597803.html#autoid-0-0-0)
     - [1.1 IPv4套接字地址结构](https://www.cnblogs.com/xiehongfeng100/p/4597803.html#autoid-1-0-0)
     - [1.2 IPv6套接字地址结构](https://www.cnblogs.com/xiehongfeng100/p/4597803.html#autoid-1-1-0)
   - [2. 整形字节序转换函数](https://www.cnblogs.com/xiehongfeng100/p/4597803.html#autoid-1-2-0)
   - [3. IP地址转换函数](https://www.cnblogs.com/xiehongfeng100/p/4597803.html#autoid-2-0-0)
   - [参考资料](https://www.cnblogs.com/xiehongfeng100/p/4597803.html#autoid-3-0-0)
6. [套接字编程相关函数（2：TCP套接字编程相关函数）](https://www.cnblogs.com/xiehongfeng100/p/4613951.html)
   - [基本套接字函数](https://www.cnblogs.com/xiehongfeng100/p/4613951.html#autoid-0-0-0)
   - [socket函数](https://www.cnblogs.com/xiehongfeng100/p/4613951.html#autoid-1-0-0)
   - [connect函数](https://www.cnblogs.com/xiehongfeng100/p/4613951.html#autoid-1-1-0)
   - [bind函数](https://www.cnblogs.com/xiehongfeng100/p/4613951.html#autoid-1-2-0)
   - [listen函数](https://www.cnblogs.com/xiehongfeng100/p/4613951.html#autoid-1-3-0)
   - [accept函数](https://www.cnblogs.com/xiehongfeng100/p/4613951.html#autoid-1-4-0)
   - [close函数](https://www.cnblogs.com/xiehongfeng100/p/4613951.html#autoid-1-5-0)
   - [getsockname和getpeername函数](https://www.cnblogs.com/xiehongfeng100/p/4613951.html#autoid-1-6-0)
   - [附：值-结果参数（书3.3节）]()
     - 1）从进程到内核传递套接字地址结构的函数有3个：bind、connect和sendto
     - 2）从内核到进程传递套接字地址结构的有4个函数：accept、recvfrom、getsockname 和 getpeername
7. [Unix/Linux中的read和write函数](https://www.cnblogs.com/xiehongfeng100/p/4619451.html)
   - [文件描述符](https://www.cnblogs.com/xiehongfeng100/p/4619451.html#autoid-0-0-0)
   - [write函数](https://www.cnblogs.com/xiehongfeng100/p/4619451.html#autoid-1-0-0)
   - [read函数](https://www.cnblogs.com/xiehongfeng100/p/4619451.html#autoid-2-0-0)
   - [read/write的语义：为什么会阻塞？](https://www.cnblogs.com/xiehongfeng100/p/4619451.html#autoid-3-0-0)
   - [blocking（默认）和nonblock模式下re...](https://www.cnblogs.com/xiehongfeng100/p/4619451.html#autoid-4-0-0)
   - [read/write对连接异常的反馈行为](https://www.cnblogs.com/xiehongfeng100/p/4619451.html#autoid-5-0-0)
   - [还需要做什么?](https://www.cnblogs.com/xiehongfeng100/p/4619451.html#autoid-6-0-0)
   - [参考资料](https://www.cnblogs.com/xiehongfeng100/p/4619451.html#autoid-7-0-0)
8. [传输控制协议（TCP） -- 连接建立及终止过程](https://www.cnblogs.com/xiehongfeng100/p/4605765.html)
   - [TCP简介](https://www.cnblogs.com/xiehongfeng100/p/4605765.html#autoid-0-0-0)
   - [TCP头格式](https://www.cnblogs.com/xiehongfeng100/p/4605765.html#autoid-1-0-0)
   - [TCP连接的建立和终止](https://www.cnblogs.com/xiehongfeng100/p/4605765.html#autoid-2-0-0)
     - [三路握手](https://www.cnblogs.com/xiehongfeng100/p/4605765.html#autoid-3-0-0)
     - [TCP连接终止](https://www.cnblogs.com/xiehongfeng100/p/4605765.html#autoid-3-1-0)
     - [观察分组](https://www.cnblogs.com/xiehongfeng100/p/4605765.html#autoid-3-2-0)
   - [实验](https://www.cnblogs.com/xiehongfeng100/p/4605765.html#autoid-3-3-0)
     - [Wireshark与对应的OSI七层模型](https://www.cnblogs.com/xiehongfeng100/p/4605765.html#autoid-4-0-0)
     - [TCP包的具体内容](https://www.cnblogs.com/xiehongfeng100/p/4605765.html#autoid-4-1-0)
     - [Wireshark使用](https://www.cnblogs.com/xiehongfeng100/p/4605765.html#autoid-4-2-0)
   - [参考资料](https://www.cnblogs.com/xiehongfeng100/p/4605765.html#autoid-4-3-0)
9. [传输控制协议（TCP） -- TCP状态转换图](https://www.cnblogs.com/xiehongfeng100/p/4605786.html)
   - [TCP状态转换图](https://www.cnblogs.com/xiehongfeng100/p/4605786.html#autoid-0-0-0)
   - [TCP状态转换两条主线](https://www.cnblogs.com/xiehongfeng100/p/4605786.html#autoid-1-0-0)
   - [各状态解释](https://www.cnblogs.com/xiehongfeng100/p/4605786.html#autoid-2-0-0)
   - [几个问题](https://www.cnblogs.com/xiehongfeng100/p/4605786.html#autoid-3-0-0)
   - [参考资料](https://www.cnblogs.com/xiehongfeng100/p/4605786.html#autoid-4-0-0)
10. [TCP 的那些事儿-上(转)](https://www.cnblogs.com/xiehongfeng100/p/4627130.html)
    - [TCP头格式](https://www.cnblogs.com/xiehongfeng100/p/4627130.html#autoid-0-0-0)
    - [TCP的状态机](https://www.cnblogs.com/xiehongfeng100/p/4627130.html#autoid-1-0-0)
    - [数据传输中的Sequence Number](https://www.cnblogs.com/xiehongfeng100/p/4627130.html#autoid-2-0-0)
    - [TCP重传机制](https://www.cnblogs.com/xiehongfeng100/p/4627130.html#autoid-3-0-0)
      - [超时重传机制](https://www.cnblogs.com/xiehongfeng100/p/4627130.html#autoid-4-0-0)
      - [快速重传机制](https://www.cnblogs.com/xiehongfeng100/p/4627130.html#autoid-4-1-0)
      - [SACK 方法](https://www.cnblogs.com/xiehongfeng100/p/4627130.html#autoid-4-2-0)
      - [Duplicate SACK – 重复收到数据的问题](https://www.cnblogs.com/xiehongfeng100/p/4627130.html#autoid-4-3-0)
11. [TCP 的那些事儿（下）](https://coolshell.cn/articles/11609.html)
12. [TCP中的MSS解读（转）](https://www.cnblogs.com/xiehongfeng100/p/4629341.html)
13. [IP协议详解（转）](https://www.cnblogs.com/xiehongfeng100/p/4627746.html)                                              
    - [IPv4与IPv6头部的对比](https://www.cnblogs.com/xiehongfeng100/p/4627746.html#autoid-0-0-0)
    - [“我尽力”](https://www.cnblogs.com/xiehongfeng100/p/4627746.html#autoid-1-0-0)
    - [Header Checksum算法](https://www.cnblogs.com/xiehongfeng100/p/4627746.html#autoid-2-0-0)
    - [总结](https://www.cnblogs.com/xiehongfeng100/p/4627746.html#autoid-3-0-0)
14. [Linux中的端口占用问题](https://www.cnblogs.com/xiehongfeng100/p/4617194.html)
    - [问题描述](https://www.cnblogs.com/xiehongfeng100/p/4617194.html#autoid-0-0-0)
    - [解决方法1：关闭使用该端口的进程](https://www.cnblogs.com/xiehongfeng100/p/4617194.html#autoid-1-0-0)
    - [解决方法2：设置端口为可重用](https://www.cnblogs.com/xiehongfeng100/p/4617194.html#autoid-2-0-0)
      - 可重用：两个进程可以同时绑定同一个端口并发服务器

15. [网络知识点大杂烩](https://www.cnblogs.com/xiehongfeng100/p/4768209.html)

- [SYN Flood](https://www.cnblogs.com/xiehongfeng100/p/4768209.html#autoid-0-0-0)
- [几种TCP连接中出现RST的情况 ](https://www.cnblogs.com/xiehongfeng100/p/4768209.html#autoid-1-0-0)
  - [端口未打开](https://www.cnblogs.com/xiehongfeng100/p/4768209.html#autoid-2-0-0)
  - [请求超时](https://www.cnblogs.com/xiehongfeng100/p/4768209.html#autoid-2-1-0)
  - [提前关闭](https://www.cnblogs.com/xiehongfeng100/p/4768209.html#autoid-2-2-0)
  - [在一个已关闭的socket上收到数据](https://www.cnblogs.com/xiehongfeng100/p/4768209.html#autoid-2-3-0)
- [长连接与短连接](https://www.cnblogs.com/xiehongfeng100/p/4768209.html#autoid-2-4-0)
  - [长连接与短连接概念](https://www.cnblogs.com/xiehongfeng100/p/4768209.html#autoid-3-0-0)
  - [长连接与短连接的操作过程](https://www.cnblogs.com/xiehongfeng100/p/4768209.html#autoid-3-1-0)
  - [什么时候用长连接，短连接？](https://www.cnblogs.com/xiehongfeng100/p/4768209.html#autoid-3-2-0)
  - [长连接程序实例](https://www.cnblogs.com/xiehongfeng100/p/4768209.html#autoid-3-3-0)





## 并发编程

1. [网络I/O中的同步、异步、阻塞和非阻塞概念](https://www.cnblogs.com/xiehongfeng100/p/4763225.html)
   - [同步I/O与异步I/O区别](https://www.cnblogs.com/xiehongfeng100/p/4763225.html#autoid-0-0-0)
   - [同步I/O](https://www.cnblogs.com/xiehongfeng100/p/4763225.html#autoid-1-0-0)
     - [阻塞式I/O模型](https://www.cnblogs.com/xiehongfeng100/p/4763225.html#autoid-2-0-0)
     - [非阻塞式I/O模型](https://www.cnblogs.com/xiehongfeng100/p/4763225.html#autoid-2-1-0)
     - [I/O复用模型](https://www.cnblogs.com/xiehongfeng100/p/4763225.html#autoid-2-2-0)
     - [信号驱动式I/O模型](https://www.cnblogs.com/xiehongfeng100/p/4763225.html#autoid-2-3-0)
   - [异步I/O](https://www.cnblogs.com/xiehongfeng100/p/4763225.html#autoid-2-4-0)
   - [参考资料](https://www.cnblogs.com/xiehongfeng100/p/4763225.html#autoid-3-0-0)
2. [并发服务器--01（基于进程派生）](https://www.cnblogs.com/xiehongfeng100/p/4617531.html)
   - [fork和exec函数](https://www.cnblogs.com/xiehongfeng100/p/4617531.html#autoid-0-0-0)
     - [🔥Fork与Exec使用&多进程编程(进程通信)](https://www.cnblogs.com/hicjiajia/archive/2011/01/20/1940154.html)
     - [🔥fork使用注意](https://blog.kghost.info/2013/04/27/fork-multi-thread/) 
   - [并发服务器](https://www.cnblogs.com/xiehongfeng100/p/4617531.html#autoid-1-0-0)
   - [示例](https://www.cnblogs.com/xiehongfeng100/p/4617531.html#autoid-2-0-0)
     - [示例1](https://www.cnblogs.com/xiehongfeng100/p/4617531.html#autoid-3-0-0)
     - [示例2：改进示例1-处理僵尸进程](https://www.cnblogs.com/xiehongfeng100/p/4617531.html#autoid-3-1-0)
   - [参考资料](https://www.cnblogs.com/xiehongfeng100/p/4617531.html#autoid-3-2-0)
3. [孤儿进程与僵尸进程](https://www.cnblogs.com/xiehongfeng100/p/4619913.html)
   - [基本概念](https://www.cnblogs.com/xiehongfeng100/p/4619913.html#autoid-0-0-0)
   - [问题及危害](https://www.cnblogs.com/xiehongfeng100/p/4619913.html#autoid-1-0-0)
   - [测试](https://www.cnblogs.com/xiehongfeng100/p/4619913.html#autoid-2-0-0)
     - [孤儿进程](https://www.cnblogs.com/xiehongfeng100/p/4619913.html#autoid-3-0-0)
     - [僵尸进程](https://www.cnblogs.com/xiehongfeng100/p/4619913.html#autoid-3-1-0)
   - [僵尸进程解决方法](https://www.cnblogs.com/xiehongfeng100/p/4619913.html#autoid-3-2-0)
     - [POSIX信号处理](https://www.cnblogs.com/xiehongfeng100/p/4619913.html#autoid-4-0-0)
     - [法一：通过信号机制](https://www.cnblogs.com/xiehongfeng100/p/4619913.html#autoid-4-1-0)
     - [法二：fork两次](https://www.cnblogs.com/xiehongfeng100/p/4619913.html#autoid-4-2-0)
     - [法三：关掉僵死进程的父进程](https://www.cnblogs.com/xiehongfeng100/p/4619913.html#autoid-4-3-0)
   - [参考资料](https://www.cnblogs.com/xiehongfeng100/p/4619913.html#autoid-4-4-0)
4. [并发服务器--02（基于I/O复用——运用Select函数）](https://www.cnblogs.com/xiehongfeng100/p/4634361.html)
   - [I/O模型](https://www.cnblogs.com/xiehongfeng100/p/4634361.html#autoid-0-0-0)
   - [I/O复用](https://www.cnblogs.com/xiehongfeng100/p/4634361.html#autoid-1-0-0)
     - [概念](https://www.cnblogs.com/xiehongfeng100/p/4634361.html#autoid-2-0-0)
     - [👉描述符就绪条件](https://www.cnblogs.com/xiehongfeng100/p/4634361.html#autoid-2-1-0)
   - [I/O复用——运用Select函数](https://www.cnblogs.com/xiehongfeng100/p/4634361.html#autoid-2-2-0)
     - [函数说明](https://www.cnblogs.com/xiehongfeng100/p/4634361.html#autoid-3-0-0)
     - [修订的str_cli函数](https://www.cnblogs.com/xiehongfeng100/p/4634361.html#autoid-3-1-0)
     - [shutdown函数](https://www.cnblogs.com/xiehongfeng100/p/4634361.html#autoid-3-2-0)
     - [👉修订TCP回射服务器程序](https://www.cnblogs.com/xiehongfeng100/p/4634361.html#autoid-3-3-0)
     - [运用Select函数存在的问题](https://www.cnblogs.com/xiehongfeng100/p/4634361.html#autoid-3-4-0)
   - [参考资料](https://www.cnblogs.com/xiehongfeng100/p/4634361.html#autoid-3-5-0)
5. [并发服务器--02（基于I/O复用——运用epoll技术）](https://www.cnblogs.com/xiehongfeng100/p/4636118.html)
   - [epoll介绍](https://www.cnblogs.com/xiehongfeng100/p/4636118.html#autoid-0-0-0)
   - [epoll接口](https://www.cnblogs.com/xiehongfeng100/p/4636118.html#autoid-1-0-0)
     - [epoll_create](https://www.cnblogs.com/xiehongfeng100/p/4636118.html#autoid-2-0-0)
     - [epoll_ctl](https://www.cnblogs.com/xiehongfeng100/p/4636118.html#autoid-2-1-0)
     - [epoll_wait](https://www.cnblogs.com/xiehongfeng100/p/4636118.html#autoid-2-2-0)
   - [epoll工作模式](https://www.cnblogs.com/xiehongfeng100/p/4636118.html#autoid-2-3-0)
   - [示例](https://www.cnblogs.com/xiehongfeng100/p/4636118.html#autoid-3-0-0)
     - [示例1：回射程序(LT模式)](https://www.cnblogs.com/xiehongfeng100/p/4636118.html#autoid-4-0-0)
     - [示例2：回射程序(ET模式)](https://www.cnblogs.com/xiehongfeng100/p/4636118.html#autoid-4-1-0)
   - [参考资料](https://www.cnblogs.com/xiehongfeng100/p/4636118.html#autoid-4-2-0)
   - [特附博文Epoll在LT和ET模式下的读写方式](https://www.cnblogs.com/xiehongfeng100/p/4636118.html#autoid-5-0-0)
6. [并发服务器--02(基于多线程)](https://www.cnblogs.com/xiehongfeng100/p/4640749.html)
   - [客户端程序](https://www.cnblogs.com/xiehongfeng100/p/4640749.html#autoid-0-0-0)
   - [服务端程序](https://www.cnblogs.com/xiehongfeng100/p/4640749.html#autoid-1-0-0)
   - [参考资料](https://www.cnblogs.com/xiehongfeng100/p/4640749.html#autoid-2-0-0)

> **select的调用过程如下所示：**
>
> ​       1）**使用copy_from_user从用户空间拷贝fd_set到内核空间**
>
> 　　2）注册回调函数__pollwait
>
> 　　3）**遍历所有fd，调用其对应的poll方法**（对于socket，这个poll方法是sock_poll，sock_poll根据情况会调用到tcp_poll,udp_poll或者datagram_poll）
>
> 　　4）以tcp_poll为例，其核心实现就是__pollwait，也就是上面注册的回调函数。
>
> 　　5）__pollwait的主要工作就是把current（当前进程）挂到设备的等待队列中，不同的设备有不同的等待队列，对于tcp_poll来说，其等待队列是sk->sk_sleep（注意把进程挂到等待队列中并不代表进程已经睡眠了）。在设备收到一条消息（网络设备）或填写完文件数据（磁盘设备）后，会唤醒设备等待队列上睡眠的进程，这时current便被唤醒了。
>
> 　　6）**poll方法返回时会返回一个描述读写操作是否就绪的mask掩码，根据这个mask掩码给fd_set赋值。**
>
> 　　7）如果遍历完所有的fd，还没有返回一个可读写的mask掩码，则会**调用schedule_timeout是调用select的进程（也就是current）进入睡眠**。当设备驱动发生自身资源可读写后，会唤醒其等待队列上睡眠的进程。如果超过一定的超时时间（schedule_timeout指定），还是没人唤醒，则调用select的进程会重新被唤醒获得CPU，进而重新遍历fd，判断有没有就绪的fd。
>
> 　　8）**把fd_set从内核空间拷贝到用户空间。**

**select的几大缺点：** <br/>

　　**1）每次调用select，都需要把fd集合从用户态拷贝到内核态，这个开销在fd很多时会很大** <br/>

　　**2）同时每次调用select都需要在内核遍历传递进来的所有fd，这个开销在fd很多时也很大** <br/>

　　**3）select支持的文件描述符数量太小了，默认是1024** <br/>







🔥 👉

## 多线程

