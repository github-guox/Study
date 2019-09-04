# socket & http

### 1. socket编程

##### 什么是socket？

Socket起源于Unix，而Unix基本哲学之一就是“一切皆文件”，都可以用“打开open –> 读写write/read –> 关闭close”模式来操作。**Socket就是该模式的一个实现，网络的Socket数据传输是一种特殊的I/O，Socket也是一种文件描述符。**Socket也具有一个类似于打开文件的函数调用：Socket()，该函数返回一个整型的Socket描述符，随后的连接建立、数据传输等操作都是通过该Socket实现的。<br/>

常用的Socket类型有两种：**流式Socket（SOCK_STREAM）和数据报式Socket（SOCK_DGRAM）**。流式是一种面向连接的Socket，针对于面向连接的TCP服务应用；数据报式Socket是一种无连接的Socket，对应于无连接的UDP服务应用。<br/>

##### socket通信

网络中的进程之间如何通过Socket通信呢？首要解决的问题是如何唯一标识一个进程，否则通信无从谈起！**在本地可以通过进程PID来唯一标识一个进程**，但是在网络中这是行不通的。其实TCP/IP协议族已经帮我们解决了这个问题，**网络层的“ip地址”可以唯一标识网络中的主机，而传输层的“协议+端口”可以唯一标识主机中的应用程序（进程）**。这样利用**三元组（ip地址，协议，端口）就可以标识网络的进程**了，网络中需要互相通信的进程，就可以利用这个标志在他们之间进行交互。<br/>

### 2. WebSocket 和socket、HTTP的区别和联系

| socket         | http                               | websocket                                            |
| -------------- | ---------------------------------- | ---------------------------------------------------- |
| 传输控制层接口 | 应用层协议                         | 应用层协议                                           |
| 全双工         | 全双工                             | 单向：客户端->服务端                                 |
|                | 基于TCP的，都是可靠性传输协议      | 基于TCP的，都是可靠性传输协议                        |
|                | 需要浏览器和服务器握手进行建立连接 | 浏览器发起向服务器的连接，服务器预先并不知道这个连接 |

注：<br/>

1. Socket其实**并不是一个协议**，而是为了方便使用TCP或UDP而抽象出来的一层，是位于应用层和传输控制层之间的**一组接口**。

2. **当两台主机通信时，必须通过Socket连接**，Socket则利用TCP/IP协议建立TCP连接。TCP连接则更依靠于底层的IP协议，IP协议的连接则依赖于链路层等更低层次。

3. WebSocket在建立握手时，数据是通过HTTP传输的。但是建立之后，在真正传输时候是不需要HTTP协议的。即：在WebSocket中，只需要服务器和浏览器通过HTTP协议进行一个握手的动作，然后**单独建立一条TCP的通信通道**进行数据的传送。

   ```wiki
   首先，客户端发起http请求，经过3次握手后，建立起TCP连接；http请求里存放WebSocket支持的版本号等信息，如：Upgrade、Connection、WebSocket-Version等；
   然后，服务器收到客户端的握手请求后，同样采用HTTP协议回馈数据；
   最后，客户端收到连接成功的消息后，开始借助于TCP传输信道进行全双工通信。
   ```

4. HTTP只能走TCP,SOCKET不仅能走TCP,而且还能走UDP。

##### http协议

HTTP协议（HyperText Transfer Protocol，**超文本传输协议**）是用于从WWW服务器传输超文本到本地浏览器的传送协议。它可以使浏览器更加高效，使网络传输减少。它不仅保证计算机正确快速地传输超文本文档，还确定传输文档中的哪一部分，以及**哪部分内容首先显示(如文本先于图形)**等。<br/>

HTTP是一个**应用层协议**，由请求和响应构成，是一个标准的**客户端服务器**模型。HTTP是一个**无状态**的协议。<br/>

1. 在TCP/IP协议栈中的位置

    HTTP协议通常承载于TCP协议之上，有时也承载于TLS或SSL协议层之上(HTTPS)。

2. HTTP的请求响应模型

   永远都是客户端发起请求，服务器回送响应（限制了使用HTTP协议，无法实现在客户端没有发起请求的时候，服务器将消息推送给客户端）

3. 工作流程

   一次HTTP操作称为一个**事务**，其工作过程可分为四步：<br/>

   | steps                                                        |
   | ------------------------------------------------------------ |
   | (1)首先客户机与服务器需要建立连接。只要单击某个超级链接，HTTP的工作开始。 |
   | (2)建立连接后，客户机发送一个请求给服务器，请求方式的格式为：**统一资源标识符（URL）、协议版本号**，后边是MIME信息包括请求修饰符、客户机信息和可能的内容。 |
   | (3)服务器接到请求后，给予相应的响应信息，其格式为**一个状态行，包括信息的协议版本号、一个成功或错误的代码**，后边是MIME信息包括服务器信息、实体信息和可能的内容。 |
   | (4)客户端接收服务器所返回的信息通过浏览器显示在用户的显示屏上，然后**客户机与服务器断开连接**。 |

4. 最显著的特点

   客户端发送的每次请求都需要服务器回送响应，在请求结束后，会主动释放连接。从建立连接到关闭连接的过程称为“一次连接”。




