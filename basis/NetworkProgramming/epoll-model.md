# epoll model

* [1. 什么是epoll](#1. 什么是epoll)
* [2. epoll函数接口](#2. epoll函数接口)
* [3. epoll工作原理](#3. epoll工作原理)
* [4. linux下epoll如何实现高效处理百万句柄的](#4. linux下epoll如何实现高效处理百万句柄的)
* [5. LT和ET两种工作方式](#5. LT和ET两种工作方式)
* [6. epoll相对于select/poll的优势](#6. epoll相对于select/poll的优势)
* [7. 使用建议](#7. 使用建议)
* [8. 疑问](#8. 疑问)
* [9. epoll使用框架](#9. epoll使用框架)
* [10. 一个实例](#10. 一个实例)

**reference url:**  <br/>

1. http://blog.fatedier.com/2015/01/25/introduction-of-using-epoll/
2. http://blog.lucode.net/linux/epoll-tutorial.html
3. https://www.cnblogs.com/panfeng412/articles/2229095.html

4. https://blog.csdn.net/xiajun07061225/article/details/9250579 (!!!)

### 1. 什么是epoll

epoll是为处理大批量句柄而作了改进的poll。是多路*I/O*就绪通知方法。

### 2. epoll函数接口

```c++
//头文件
#include <sys/epoll.h>
```

#### 创建epoll实例

```c++
//创建一个epoll实例
int epoll_create1(int flags);
int epoll_create(int size) //从2.68的Linux内核开始，size参数不再生效，内核会动态分配所需的数据结构。
/*
epoll_create1() 如果flags的值是0，epoll_create1()等同于epoll_create()除了过时的size被遗弃了。当然flasg可以使用 EPOLL_CLOEXEC。
*/
```

失败返回-1，成功则该函数会返回一个文件描述符，并占用一个fd值，所以在使用完之后要记得close该文件描述符。<br/>

如果返回-1，则标志出现了问题，我们可以读取errno来定位错误，有如下errno会被设置：<br/>

```wiki
EINVAL : 无效的标志
EMFILE : 用户打开的文件超过了限制
ENFILE : 系统打开的文件超过了限制
ENOMEM : 没有足够的内存完成当前操作
```

#### 管理epoll事件

```c++
//用于对epoll实例执行不同的操作的函数。
int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event);
```

| parameter | usage                                                        |
| --------- | ------------------------------------------------------------ |
| epfd      | 使用epoll_create()返回的文件描述符，即epoll实例的fd。        |
| op        | 用三个宏表示不同的操作<br />EPOLL_CTL_ADD：注册新的fd到epfd中；<br />EPOLL_CTL_MOD：修改已经注册的fd的监听事件；<br />EPOLL_CTL_DEL：从epfd中删除指定fd；<br /> |
| fd        | 要监听的文件描述符                                           |
| event     | event 是与指定fd关联的epoll_event结构，包含了监听事件，附加数据 |

event是一个如下结构体的一个实例：<br/>

```c++
typedef union epoll_data {
    void        *ptr;
    int          fd;
    __uint32_t   u32;
    __uint64_t   u64;
} epoll_data_t;
struct epoll_event {
    __uint32_t   events; /* Epoll events */
    epoll_data_t data;   /* User data variable */
};
```

- data是一个联合体，能够存储fd或其它数据，我们需要根据自己的需求定制。

- events表示监控的事件的集合，是一个状态值，通过状态位来表示，可以设置如下事件：

  ```wiki
  EPOLLERR : 文件上发上了一个错误。这个事件是一直监控的，即使没有明确指定
  EPOLLHUP : 文件被挂断。这个事件是一直监控的，即使没有明确指定
  EPOLLRDHUP : 对端关闭连接或者shutdown写入半连接
  EPOLLET : 开启边缘触发，默认的是水平触发，所以我们并未看到EPOLLLT
  EPOLLONESHOT : 一个事件发生并读取后，文件自动不再监控
  EPOLLIN : 文件可读
  EPOLLPRI : 文件有紧急数据可读
  EPOLLOUT : 文件可写
  EPOLLWAKEUP : 如果EPOLLONESHOT和EPOLLET清除了，并且进程拥有CAP_BLOCK_SUSPEND权限，那么这个标志能够保证事件在挂起或者处理的时候，系统不会挂起或休眠
  //注意一下，EPOLLHUP并不代表对端结束了连接，这一点需要和EPOLLRDHUP区分。通常情况下EPOLLHUP表示的是本端挂断，造成这种事件出现的原因有很多，其中一种便是出现错误
  ```

- 如果返回-1，则标志出现了问题，我们可以读取errno来定位错误，有如下errno会被设置：

  ```wiki
  EBADF : epfd或者fd不是一个有效的文件描述符
  EEXIST : op为EPOLL_CTL_ADD，但fd已经被监控
  EINVAL : epfd是无效的epoll文件描述符
  ENOENT : op为EPOLL_CTL_MOD或者EPOLL_CTL_DEL，并且fd未被监控
  ENOMEM : 没有足够的内存完成当前操作
  ENOSPC : epoll实例超过了/proc/sys/fs/epoll/max_user_watches中限制的监听数量
  ```

#### 等待epoll事件

```c++
//该函数等待epoll实例中的fd集合有就绪事件
int epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout);
//如果成功，返回已就绪的事件的个数；如果达到超时时间仍然没有就绪事件，返回0；如果出现错误，返回-1并置errno值
```

```wiki
epfd：使用epoll_create()返回的文件描述符
events：指向处于就绪状态的事件集合
maxevents：最多maxevents数量的事件集合会被返回
timeout：超时时间，单位为毫秒；指定为-1没有超时时间，指定为0则立即返回并返回0
```

### 3. epoll工作原理

epoll同样只告知那些就绪的文件描述符，而且当我们调用epoll_wait()获得就绪文件描述符时，返回的不是实际的描述符，而是一个代表就绪描述符数量的值，你只需要**去epoll指定的一个数组中依次取得相应数量的文件描述符即可**，这里也使用了**内存映射（mmap）技术**，这样便彻底省掉了这些文件描述符在系统调用时复制的开销。<br/>
另一个本质的改进在于**epoll采用基于事件的就绪通知方式**。在select/poll中，进程只有在调用一定的方法后，内核才对所有监视的文件描述符进行扫描，而epoll事先通过epoll_ctl()来注册一个文件描述符，一旦基于某个文件描述符就绪时，内核会采用类似callback的回调机制，迅速激活这个文件描述符，当进程调用epoll_wait()时便得到通知。<br/>

### 4. linux下epoll如何实现高效处理百万句柄的

epoll比select/poll的优越之处：因为后者每次调用时都要传递你所要监控的所有socket给select/poll系统调用，这意味着需要将用户态的socket列表copy到内核态，如果以万计的句柄会导致每次都要copy几十几百KB的内存到内核态，非常低效。而我们调用epoll_wait时就相当于以往调用select/poll，但是这时却不用传递socket句柄给内核，因为内核已经在epoll_ctl中拿到了要监控的句柄列表。<br/>
所以，实际上在你调用*epoll_create*后，内核就已经在内核态开始准备帮你存储要监控的句柄了，每次调用*epoll_ctl*只是在往内核的数据结构里塞入新的*socket*句柄。<br/>

**当一个进程调用epoll_creaqte方法时，Linux内核会创建一个eventpoll结构体，这个结构体中有两个成员与epoll的使用方式密切相关：** <br/>

```c++
/*
 171 * This structure is stored inside the "private_data" member of the file
 172 * structure and represents the main data structure for the eventpoll
 173 * interface.
 174 */
 
 175struct eventpoll { 
 176        /* Protect the access to this structure */
 177        spinlock_t lock;
 178
 179        /*
 180         * This mutex is used to ensure that files are not removed
 181         * while epoll is using them. This is held during the event
 182         * collection loop, the file cleanup path, the epoll file exit
 183         * code and the ctl operations.
 184         */
 185        struct mutex mtx; 
 186 
 187        /* Wait queue used by sys_epoll_wait() */
 188        wait_queue_head_t wq;
 189 
 190        /* Wait queue used by file->poll() */
 191        wait_queue_head_t poll_wait;
 192
 193        /* List of ready file descriptors */
 194        struct list_head rdllist;
 195
 196        /* RB tree root used to store monitored fd structs */
 197        struct rb_root rbr;//红黑树根节点，这棵树存储着所有添加到epoll中的事件，也就是这个epoll监控的事件
 198
 199        /*
 200         * This is a single linked list that chains all the "struct epitem" that
 201         * happened while transferring ready events to userspace w/out
 202         * holding ->lock.
 203         */
 204        struct epitem *ovflist;
 205
 206        /* wakeup_source used when ep_scan_ready_list is running */
 207        struct wakeup_source *ws;
 208
 209        /* The user that created the eventpoll descriptor */
 210        struct user_struct *user;
 211
 212        struct file *file;
 213
 214        /* used to optimize loop detection check */
 215        int visited;
 216        struct list_head visited_list_link;//双向链表中保存着将要通过epoll_wait返回给用户的、满足条件的事件
 217};
```

**每一个epoll对象都有一个独立的eventpoll结构体，这个结构体会在内核空间中创造独立的内存，用于存储使用epoll_ctl方法向epoll对象中添加进来的事件。这样，重复的事件就可以通过红黑树而高效的识别出来。** <br/>

在epoll中，对于每一个事件都会建立一个epitem结构体：<br/>

```c++
/*
 130 * Each file descriptor added to the eventpoll interface will
 131 * have an entry of this type linked to the "rbr" RB tree.
 132 * Avoid increasing the size of this struct, there can be many thousands
 133 * of these on a server and we do not want this to take another cache line.
 134 */
 135struct epitem {
 136        /* RB tree node used to link this structure to the eventpoll RB tree */
 137        struct rb_node rbn;
 138
 139        /* List header used to link this structure to the eventpoll ready list */
 140        struct list_head rdllink;
 141
 142        /*
 143         * Works together "struct eventpoll"->ovflist in keeping the
 144         * single linked chain of items.
 145         */
 146        struct epitem *next;
 147
 148        /* The file descriptor information this item refers to */
 149        struct epoll_filefd ffd;
 150
 151        /* Number of active wait queue attached to poll operations */
 152        int nwait;
 153
 154        /* List containing poll wait queues */
 155        struct list_head pwqlist;
 156
 157        /* The "container" of this item */
 158        struct eventpoll *ep;
 159
 160        /* List header used to link this item to the "struct file" items list */
 161        struct list_head fllink;
 162
 163        /* wakeup_source used when EPOLLWAKEUP is set */
 164        struct wakeup_source __rcu *ws;
 165
 166        /* The structure that describe the interested events and the source fd */
 167        struct epoll_event event;
 168};
```

此外，epoll还维护了一个双链表，用户存储发生的事件。当*epoll_wait*调用时，仅仅观察这个*list*链表里有没有数据即eptime项即可。有数据就返回，没有数据就*sleep*，等到*timeout*时间到后即使链表没数据也返回。所以， *epoll_wait* 非常高效。<br/>

而且，通常情况下即使我们要监控百万计的句柄，大多一次也只返回很少量的准备就绪句柄而已，所以，*epoll_wait*仅需要从内核态*copy*少量的句柄到用户态而已。<br/>

那么，这个准备就绪list链表是怎么维护的呢？当我们执行epoll_ctl时，除了把socket放到epoll文件系统里file对象对应的红黑树上之外，还会给内核中断处理程序注册一个回调函数，告诉内核，如果这个句柄的中断到了，就把它放到准备就绪list链表里。所以，当一个socket上有数据到了，内核在把网卡上的数据copy到内核中后就来把socket插入到准备就绪链表里了。<br/>

```tiki wiki
总结：
如此，一颗红黑树，一张准备就绪句柄链表，少量的内核cache，就帮我们解决了大并发下的socket处理问题。执行epoll_create时，创建了红黑树和就绪链表，执行epoll_ctl时，如果增加socket句柄，则检查在红黑树中是否存在，存在立即返回，不存在则添加到树干上，然后向内核注册回调函数，用于当中断事件来临时向准备就绪链表中插入数据。执行epoll_wait时立刻返回准备就绪链表里的数据即可。
```

### 5. LT和ET两种工作方式

epoll 默认使用LT的工作方式，当指定事件就绪时，内核通知用户进行操作，如果你只处理了部分数据，只要对应的套接字缓冲区中还有剩余数据，下一次内核仍然还会继续通知用户去进行处理，所以使用这种模式来写程序较为简单。<br/>

ET工作方式是一种高速工作方式，只能使用非阻塞socket，它的效率要比LT方式高。当一个新事件就绪时，内核通知用户进行操作，**如果这时用户没有处理完缓冲区的数据，缓冲区中剩余的数据就会丢失**，用户无法从下一次epoll_wait调用中获取到这个事件。因此，**在该事件就绪后，需要不断调用read函数来获取缓冲区数据，直到产生一个EAGAIN错误或者read函数返回的读取到的数据长度小于请求的数据长度时才认为此事件处理完成。write也是一样的处理方式。**<br/>

总结：Level为只要处于水平，那么就一直触发，而Edge则为上升沿和下降沿的时候触发。0->1这种类型的事件就是Edge，而Level则正好相反，1->1这种类型就是，由此可见，当缓冲区有数据可取的时候，ET会触发一次事件，之后就不会再触发，而LT只要我们没有取完缓冲区的数据，就会一直触发。

| ET（Edge Trigger） | LT（Level Trigger）      |
| ------------------ | ------------------------ |
| no-block socket    | block和no-block socket   |
| T效率比LT高        | LT更加易用，不容易出错。 |
| 需要设置EPOLLET    | 默认工作方式             |

### 6. epoll相对于select/poll的优势

1. 使用mmap加速内核与用户空间的消息传递,不再需要每次把fd集合从用户态**拷贝**到内核态。

   ```wiki
   这点实际上涉及到epoll的具体实现。无论是select,poll还是epoll都需要内核把FD消息通知给用户空间，如何避免不必要的内存拷贝就显 得很重要，在这点上，epoll是通过内核于用户空间mmap同一块内存实现的。而如果你像我一样从2.5内核就开始关注epoll的话，一定不会忘记手 工mmap这一步的。
   ```

2. 支持一个进程打开大数目的socket描述符(FD)。select一般只支持1024个文件描述符，而epoll没有类似的限制。

   ```wiki
   select 最不能忍受的是一个进程所打开的FD是有一定限制的，由FD_SETSIZE设置， 默认值是2048。对于那些需要支持上万连接数目的IM服务器来说显然太少了。这时候你一是可以选择修改这个宏然后重新编译内核，不过资料也同时指出这样 会带来网络效率的下降；二是可以选择多进程的解决方案(传统的Apache方案)，不过虽然linux上面创建进程的代价比较小，但仍旧是不可忽视的，加 上进程间数据同步远比不上线程间同步高效，所以这也不是一种完美的方案。不过epoll 没有这个限制，它所支持的FD上限是最大可以打开文件的数目，这个数字一般远大于select 所支持的2048。举个例子，在1GB内存的机器上大约是10万左右，具体数目可以cat /proc/sys/fs/file-max察看，一般来说这个数目和系统内存关系很大。
   ```

3.  IO效率不随FD数目增加而线性下降，不再需要在每次就绪时**遍历fd集合**中的所有fd来检查哪些fd处于就绪状态，epoll只返回就绪的fd集合。

   ```wiki
   传统select/poll的另一个致命弱点就是当你拥有一个很大的socket集合，由于网络得延时，使得任一时间只有部分的socket是"活跃" 的，而select/poll每次调用都会线性扫描全部的集合，导致效率呈现线性下降。但是epoll不存在这个问题，它只会对"活跃"的socket进 行操作---这是因为在内核实现中epoll是根据每个fd上面的callback函数实现的。于是，只有"活跃"的socket才会主动去调用 callback函数，其他idle状态的socket则不会，在这点上，epoll实现了一个"伪"AIO，因为这时候推动力在os内核。在一些 benchmark中，如果所有的socket基本上都是活跃的---比如一个高速LAN环境，epoll也不比select/poll低多少效率，但若 过多使用的调用epoll_ctl，效率稍微有些下降。然而一旦使用idle connections模拟WAN环境，那么epoll的效率就远在select/poll之上了。
   ```

4. 内核微调

   ```wiki
   这一点其实不算epoll的优点，而是整个linux平台的优点。也许你可以怀疑linux平台，但是你无法回避linux平台赋予你微调内核的能力。比 如，内核TCP/IP协议栈使用内存池管理sk_buff结构，可以在运行期间动态地调整这个内存pool(skb_head_pool)的大小---通 过echo XXXX>/proc/sys/net/core/hot_list_length来完成。再比如listen函数的第2个参数(TCP完成3次握 手的数据包队列长度)，也可以根据你平台内存大小来动态调整。甚至可以在一个数据包面数目巨大但同时每个数据包本身大小却很小的特殊系统上尝试最新的 NAPI网卡驱动架构。
   ```

### 7. 使用建议

1. 使用epoll一定要加定时器，否则后患无穷
2. 如果多个线程观察的fd相同(通常是server socket fd)，据说epoll_wait会有惊群问题
3. 联合体data中的那个ptr是很有用的，只不过这就意味着你将该对象的生命周期交给了epoll，不排除会有潜在bug的影响，需要辅以timeout
4. 多线程环境下使用epoll，多考虑EPOLLONESHOT
5. EPOLLLT也是一个不错的选择，除非你的框架能够确保每次事件触发后，都读/写至EAGAIN
6. 同属IO复用，除了epoll，我们也能选择select和poll，之间的性能比较需要视场景而定，通常对于Web服务这种场景，epoll会更加适合，若想深究，请大家阅读一下源码，自然明了，也就2～3KLoC。



### 8. 疑问

1. 什么是惊群问题？怎么解决？



### 9. epoll使用框架

```c++
for( ; ; )
    {
        nfds = epoll_wait(epfd,events,20,500);
        for(i=0;i<nfds;++i)
        {
            if(events[i].data.fd==listenfd) //如果是主socket的事件，则表示有新的连接
            {
                connfd = accept(listenfd,(sockaddr *)&clientaddr, &clilen); //accept这个连接
                ev.data.fd=connfd;
                ev.events=EPOLLIN|EPOLLET;
                epoll_ctl(epfd,EPOLL_CTL_ADD,connfd,&ev); //将新的fd添加到epoll的监听队列中
            }
            else if( events[i].events&EPOLLIN ) //接收到数据，读socket
            {

            if ( (sockfd = events[i].data.fd) < 0) continue;
                n = read(sockfd, line, MAXLINE)) < 0    //读
                ev.data.ptr = md;     //md为自定义类型，添加数据
                ev.events=EPOLLOUT|EPOLLET;
                epoll_ctl(epfd,EPOLL_CTL_MOD,sockfd,&ev);//修改标识符，等待下一个循环时发送数据，异步处理的精髓
            }
            else if(events[i].events&EPOLLOUT) //有数据待发送，写socket
            {
                struct myepoll_data* md = (myepoll_data*)events[i].data.ptr;    //取数据
                sockfd = md->fd;
                send( sockfd, md->ptr, strlen((char*)md->ptr), 0 );        //发送数据
                ev.data.fd=sockfd;
                ev.events=EPOLLIN|EPOLLET;
                epoll_ctl(epfd,EPOLL_CTL_MOD,sockfd,&ev); //修改标识符，等待下一个循环时接收数据
            }
            else
            {
                //其他情况的处理
            }
        }
    }
```



### 10. 一个实例

```c++
//echo man
#include <stdio.h>  
#include <stdlib.h>  
#include <unistd.h>  
#include <errno.h>  
#include <sys/socket.h>  
#include <netinet/in.h>
#include <arpa/inet.h>
#include <fcntl.h>  
#include <netdb.h>
#include <sys/epoll.h>  
#include <string.h>  
#define MAXEVENTS 64
int create_and_bind (int port) {
    int sfd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if(sfd == -1) {
        return -1;
    }
    struct sockaddr_in sa;
    bzero(&sa, sizeof(sa));
    sa.sin_family = AF_INET;
    sa.sin_port   = htons(port);
    sa.sin_addr.s_addr = htonl(INADDR_ANY);
    if(bind(sfd, (struct sockaddr*)&sa, sizeof(struct sockaddr)) == -1) {
        return -1;
    }
    return sfd;
}
int make_socket_non_blocking (int sfd) {
    int flags = fcntl (sfd, F_GETFL, 0);
    if (flags == -1) {
        return -1;
    }
    if(fcntl (sfd, F_SETFL, flags | O_NONBLOCK) == -1) {
        return -1;
    }
    return 0;
}
/* 此函数用于读取参数或者错误提示 */
int read_param(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf (stderr, "Usage: %s [port]\n", argv[0]);
        exit (EXIT_FAILURE);
    }
    return atoi(argv[1]);
}
int main (int argc, char *argv[]) {
    int sfd, s;
    int efd;
    struct epoll_event event;
    struct epoll_event *events;
    int port = read_param(argc, argv);
    /* 创建并绑定socket */
    sfd = create_and_bind (port);
    if (sfd == -1) {
        perror("create_and_bind");
        abort ();
    }
    /* 设置sfd为非阻塞 */
    s = make_socket_non_blocking (sfd);
    if (s == -1) {
        perror("make_socket_non_blocking");
        abort ();
    }
    /* SOMAXCONN 为系统默认的backlog */
    s = listen (sfd, SOMAXCONN);
    if (s == -1) {
        perror ("listen");
        abort ();
    }
    efd = epoll_create1 (0);
    if (efd == -1) {
        perror ("epoll_create");
        abort ();
    }
    event.data.fd = sfd;
    /* 设置ET模式 */
    event.events = EPOLLIN | EPOLLET;
    s = epoll_ctl (efd, EPOLL_CTL_ADD, sfd, &event);
    if (s == -1) {
        perror ("epoll_ctl");
        abort ();
    }
    /* 创建事件数组并清零 */
    events = calloc (MAXEVENTS, sizeof event);
    /* 开始事件循环 */
    while (1) {
        int n, i;
        n = epoll_wait (efd, events, MAXEVENTS, -1);
        for (i = 0; i < n; i++) {
            if (events[i].events & (EPOLLERR | EPOLLHUP)) {
                /* 监控到错误或者挂起 */
                fprintf (stderr, "epoll error\n");
                close (events[i].data.fd);
                continue;
            } 
            if(events[i].events & EPOLLIN) {
                if (sfd == events[i].data.fd) {
                    /* 处理新接入的socket */
                    while (1) {
                        struct sockaddr_in sa;
                        socklen_t len = sizeof(sa);
                        char hbuf[INET_ADDRSTRLEN];
                        int infd = accept (sfd, (struct sockaddr*)&sa, &len);
                        if (infd == -1) {
                            if ((errno == EAGAIN) || (errno == EWOULDBLOCK)) {
                                /* 资源暂时不可读，再来一遍 */
                                break;
                            } else {
                                perror ("accept");
                                break;
                            }
                        }
                        inet_ntop(AF_INET, &sa.sin_addr, hbuf, sizeof(hbuf));
                        printf("Accepted connection on descriptor %d "
                                    "(host=%s, port=%d)\n", infd, hbuf, sa.sin_port);
                        /* 设置接入的socket为非阻塞 */
                        s = make_socket_non_blocking (infd);
                        if (s == -1) abort ();
                        /* 为新接入的socket注册事件 */
                        event.data.fd = infd;
                        event.events = EPOLLIN | EPOLLET;
                        s = epoll_ctl (efd, EPOLL_CTL_ADD, infd, &event);
                        if (s == -1) {
                            perror ("epoll_ctl");
                            abort ();
                        }
                    }
                    //continue;
                } else {
                    /* 接入的socket有数据可读 */
                    while (1) {
                        ssize_t count;
                        char buf[512];
                        count = read (events[i].data.fd, buf, sizeof buf);
                        if (count == -1) {
                            if (errno != EAGAIN) {
                                perror ("read");
                                close(events[i].data.fd);
                            }
                            break;
                        } else if (count == 0) {
                            /* 数据读取完毕，结束 */
                            close(events[i].data.fd);
                            printf ("Closed connection on descriptor %d\n", events[i].data.fd);
                            break;
                        }
                        /* 输出到stdout */
                        s = write (1, buf, count);
                        if (s == -1) {
                            perror ("write");
                            abort ();
                        }
                        event.events = EPOLLOUT | EPOLLET;
                        epoll_ctl(efd, EPOLL_CTL_MOD, events[i].data.fd, &event);
                    }
                }
            } else if((events[i].events & EPOLLOUT) && (events[i].data.fd != sfd)) {
                /* 接入的socket有数据可写 */
                write(events[i].data.fd, "it's echo man\n", 14);
                event.events = EPOLLET | EPOLLIN;
                epoll_ctl(efd, EPOLL_CTL_MOD, events[i].data.fd, &event);
            }
        }
    }
    free (events);
    close (sfd);
    return EXIT_SUCCESS;
}
```

可以通过ncat命令和它聊天：<br/>

```c++
[codesun@lucode ~]$ ncat 127.0.0.1 8000
hello
it's echo man
```

