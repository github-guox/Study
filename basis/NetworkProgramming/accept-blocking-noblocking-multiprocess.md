# accept阻塞与非阻塞

Server处理多个Client

- 多进程server方法
- non-blocking与select结合

Ref https://blog.csdn.net/qq_17308321/article/details/73188035

### 多进程方法(每个子进程单独处理一个client连接)

在每个accept成功之后，使用fork创建一个子进程专门处理该client的connection，父进程(server)本身可以继续accept其他新的client的连接请求。<br>

```c++
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <arpa/inet.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <unistd.h>
#include <signal.h>
#include <sys/wait.h>

#define DEFAULT_PORT    1984    //默认端口
#define BUFFER_SIZE     1024    //buffer大小

void sigCatcher(int n) {
    //printf("a child process dies\n");
    while(waitpid(-1, NULL, WNOHANG) > 0);
}

int clientProcess(int new_sock);

int main(int argc, char *argv[]) {
    unsigned short int port;

    //get port, use default if not set
    if (argc == 2) {
        port = atoi(argv[1]);
    } else if (argc < 2) {
        port = DEFAULT_PORT;
    } else {
        fprintf(stderr, "USAGE: %s [port]\n", argv[0]);
        return 1;
    }

    //create socket
    int sock;
    if ( (sock = socket(PF_INET, SOCK_STREAM, 0)) == -1 ) {
        perror("socket failed, ");
        return 1;
    }
    printf("socket done\n");

    //create socket address and initialize
    struct sockaddr_in bind_addr;
    memset(&bind_addr, 0, sizeof(bind_addr));
    bind_addr.sin_family = AF_INET;
    bind_addr.sin_addr.s_addr = htonl(INADDR_ANY);  //设置接受任意地址
    bind_addr.sin_port = htons(port);               //将host byte order转换为network byte order

    //bind (bind socket to the created socket address)
    if ( bind(sock, (struct sockaddr *) &bind_addr, sizeof(bind_addr)) == -1 ) {
        perror("bind failed, ");
        return 1;
    }
    printf("bind done\n");

    //listen
    if ( listen(sock, 5) == -1) {
        perror("listen failed.");
        return 1;
    }
    printf("listen done\n");

    //handler to clear zombie process
    signal(SIGCHLD, sigCatcher);

    //loop and respond to client
    int new_sock;
    int pid;
    while (1) {
        //wait for a connection, then accept it
        if ( (new_sock = accept(sock, NULL, NULL)) == -1 ) {
            perror("accept failed.");
            return 1;
        }
        printf("accept done\n");

        pid = fork();
        if (pid < 0) {
            perror("fork failed");
            return 1;
        } else if (pid == 0) {
            //这里是子进程
            close(sock);            //子进程中不需要server的sock
            clientProcess(new_sock);    //使用新的new_sock和client进行交互
            close(new_sock);        //关闭client的连接
            exit(EXIT_SUCCESS);     //子进程退出
        } else {
            //这里是父进程
            close(new_sock); //由于new_sock已经交给子进程处理，这里可以关闭了
        }
    }
    return 0;
}

int clientProcess(int new_sock) {
    int recv_size;
    char buffer[BUFFER_SIZE];

    memset(buffer, 0, BUFFER_SIZE);
    if ( (recv_size = recv(new_sock, buffer, sizeof(buffer), 0)) == -1) {
        perror("recv failed");
        return 1;
    }
    printf("%s\n", buffer);

    char *response = "This is the response";
    if ( send(new_sock, response, strlen(response) + 1, 0) == -1 ) {
        perror("send failed");
        return 1;
    }
    return 0;
} 
```

**其中的signal(SIGCHLD, sigCatcher)代码为了处理zombie process问题：当server进程运行时间较长，且产生越来越多的子进程，当这些子进程运行结束都会成为zombie process，占据系统的process table。解决方法是在父进程(server进程)中显式地处理子进程结束之后发出的SIGCHLD信号：调用wait/waitpid清理子进程的zombie信息**。 <br/>

- 多进程方法的优点：<br/>

  每个独立进程处理一个独立的client，对server进程来说只需要accept新的连接，对每个子进程来说只需要处理自己的client即可。<br/>

- 多进程方法的缺点：<br/>

  子进程的创建需要独立的父进程资源副本，开销较大，对高并发的请求不太适合；且一个进程仅处理一个client不能有效发挥作用。另外有些情况下还需要进程间进行通信以协调各进程要完成的任务。<br/>

### 使用select实现non-blocking socket

#### blocking socket VS non-blocking socket

默认情况下socket是blocking的，即函数accept(), recv/recvfrom, send/sendto，connect等，需等待函数执行结束之后才能够返回(此时操作系统切换到其他进程执行)。accpet()等待到有client连接请求并接受成功之后，recv/recvfrom需要读取完client发送的数据之后才能够返回。<br/>

设置socket为non-blocking模式，即调用函数立即返回，而不是必须等待满足一定条件才返回。<br/>

#### 设置socket为非阻塞non-blocking

使用函数fcntl()   *file control*可设置创建的socket为非阻塞的non-blocking:

```c++
#include <unistd.h>
#include <fcntl.h>
sock = socket(PF_INET, SOCK_STREAM, 0);
int flags = fcntl(sock, F_GETFL, 0);
fcntl(sock, F_SETFL, flags | O_NONBLOCK);
```

这样使原本blocking的各种函数，可以立即获得返回结果。通过判断返回的errno了解状态：

```wiki
- accept():
在non-blocking模式下，如果返回值为-1，且errno == EAGAIN或errno == EWOULDBLOCK表示no connections没有新连接请求；
- recv()/recvfrom():
在non-blocking模式下，如果返回值为-1，且errno == EAGAIN表示没有可接受的数据或很在接受尚未完成；
- send()/sendto():
在non-blocking模式下，如果返回值为-1，且errno == EAGAIN或errno == EWOULDBLOCK表示没有可发送数据或数据发送正在进行没有完成。
- read/write:
在non-blocking模式下，如果返回-1，且errno == EAGAIN表示没有可读写数据或可读写正在进行尚未完成。
- connect():
在non-bloking模式下，如果返回-1，且errno = EINPROGRESS表示正在连接。
```

```c++
int main(int argc, char *argv[]) {
    int sock;
    if ( (sock = socket(PF_INET, SOCK_STREAM, 0)) == -1 ) {
        perror("socket failed");
        return 1;
    }
    //set socket to be non-blocking
    int flags = fcntl(sock, F_GETFL, 0);
    fcntl(sock, F_SETFL, flags | O_NONBLOCK);
    //create socket address to bind
    struct sockaddr_in bind_addr
    ...
      
    //bind
    bind(...)
    ...

    //listen
    listen(...)
    ...

    //loop 
    int new_sock;
    while (1) {
        new_sock = accept(sock, NULL, NULL);
        if (new_sock == -1 && errno == EAGAIN) {
            fprintf(stderr, "no client connections yet\n");
            continue;
        } else if (new_sock == -1) {
            perror("accept failed");
            return 1;
        }
        //read and write
        ...
    }   
    ...
} 
```

纯non-blocking程序缺点：如果运行如上程序会发现调用accept可以立即返回，但这样会耗费大量的CPU time，实际中并不会这样使用。实际中将non-blocking和select结合使用。

#### non-blocking和select结合使用

select通过轮询，监视指定file descriptor(包括socket)的变化，知道:哪些ready for reading, 哪些ready for writing，哪些发生了错误等。select和non-blocking结合使用可很好地实现socket的多client同步通信。

```c++
#include <sys/time.h>
#include <sys/types.h>
#include <unistd.h>
int select(int maxfd, fd_set* readfds, fd_set* writefds, fd_set* errorfds, struct timeval* timeout);
//maxfd: 所有set中最大的file descriptor + 1
//readfds: 指定要侦听ready to read的file descriptor，可以为NULL
//writefds: 指定要侦听ready to write的file descriptor，可以为NULL
//errorfds: 指定要侦听errors的file descriptor，可以为NULL
//timeout: 指定侦听到期的时间长度，如果该struct timeval的各个域都为0，则相当于完全的non-blocking模式；如果该参数为NULL，相当于block模式；

//select返回total number of bits set in readfds, writefds and errorfds，当timeout的时候返回0，发生错误返回-1。
//另外select会更新readfds(保存ready to read的file descriptor), writefds(保存read to write的fd), errorfds(保存error的fd)，且更新timeout为距离超时时刻的剩余时间。
```

fd_set类型需要使用如下4个宏进行赋值：

```c++
FD_ZERO(fd_set *set);       //Clear all entries from the set.
FD_SET(int fd, fd_set *set);    //Add fd to the set.
FD_CLR(int fd, fd_set *set);    //Remove fd from the set.
FD_ISSET(int fd, fd_set *set);  //Return true if fd is in the set. 
```

因此通过如下代码可以将要侦听的file descriptor/socket添加到响应的fd_set中:

```c++
fd_set readfds;
FD_ZERO(&readfds);
int sock;
sock = socket(PF_INET, SOCK_STREAM, 0);
FD_SET(sock, &readfds);     //将新创建的socket添加到readfds中
FD_SET(stdin, &readfds);    //将stdin添加到readfds中 
```

struct timeval类型：

```c++
struct timeval {
    int tv_sec;     //seconds
    int tv_usec;    //microseconds，注意这里是微秒不是毫秒，1秒 = 1000, 000微秒
}; 
```

因此，使用select函数可以添加希望侦听的file descriptor/socket到read, write或error中(如果对某一项不感兴趣，可以设置为NULL)，并设置每次侦听的timeout时间。

```wiki
1. 注意如果设置timeout为：
 struct timeval timeout;
    timeout.tv_sec = 0;
    timeout.tv_usec = 0; 
相当于每次select立即返回相当于纯non-blocking模式；
2. 如果设置timeout参数为NULL，则每次select持续等待到有变化则相当于blocking模式。
```

使用select和non-blocking实现server处理多client实例：

```c++
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <arpa/inet.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <sys/time.h>

#define DEFAULT_PORT    1984    //默认端口
#define BUFF_SIZE       1024    //buffer大小
#define SELECT_TIMEOUT  5       //select的timeout seconds

//函数：设置sock为non-blocking mode
void setSockNonBlock(int sock) {
    int flags;
    flags = fcntl(sock, F_GETFL, 0);
    if (flags < 0) {
        perror("fcntl(F_GETFL) failed");
        exit(EXIT_FAILURE);
    }
    if (fcntl(sock, F_SETFL, flags | O_NONBLOCK) < 0) {
        perror("fcntl(F_SETFL) failed");
        exit(EXIT_FAILURE);
    }
}
//函数：更新maxfd
int updateMaxfd(fd_set fds, int maxfd) {
    int i;
    int new_maxfd = 0;
    for (i = 0; i <= maxfd; i++) {
        if (FD_ISSET(i, &fds) && i > new_maxfd) {
            new_maxfd = i;
        }
    }
    return new_maxfd;
}

int main(int argc, char *argv[]) {
    unsigned short int port;

    //获取自定义端口
    if (argc == 2) {
        port = atoi(argv[1]);
    } else if (argc < 2) {
        port = DEFAULT_PORT;
    } else {
        fprintf(stderr, "USAGE: %s [port]\n", argv[0]);
        exit(EXIT_FAILURE);
    }

    //创建socket
    int sock;
    if ( (sock = socket(PF_INET, SOCK_STREAM, 0)) == -1 ) {
        perror("socket failed, ");
        exit(EXIT_FAILURE);
    }
    printf("socket done\n");

    //in case of 'address already in use' error message
    int yes = 1;
    if (setsockopt(sock, SOL_SOCKET, SO_REUSEADDR, &yes, sizeof(int))) {
        perror("setsockopt failed");
        exit(EXIT_FAILURE);
    }

    //设置sock为non-blocking
    setSockNonBlock(sock);

    //创建要bind的socket address
    struct sockaddr_in bind_addr;
    memset(&bind_addr, 0, sizeof(bind_addr));
    bind_addr.sin_family = AF_INET;
    bind_addr.sin_addr.s_addr = htonl(INADDR_ANY);  //设置接受任意地址
    bind_addr.sin_port = htons(port);               //将host byte order转换为network byte order

    //bind sock到创建的socket address上
    if ( bind(sock, (struct sockaddr *) &bind_addr, sizeof(bind_addr)) == -1 ) {
        perror("bind failed, ");
        exit(EXIT_FAILURE);
    }
    printf("bind done\n");

    //listen
    if ( listen(sock, 5) == -1) {
        perror("listen failed.");
        exit(EXIT_FAILURE);
    }
    printf("listen done\n");

    //创建并初始化select需要的参数(这里仅监视read)，并把sock添加到fd_set中
    fd_set readfds;
    fd_set readfds_bak; //backup for readfds(由于每次select之后会更新readfds，因此需要backup)
    struct timeval timeout;
    int maxfd;
    maxfd = sock;
    FD_ZERO(&readfds);
    FD_ZERO(&readfds_bak);
    FD_SET(sock, &readfds_bak);

    //循环接受client请求
    int new_sock;
    struct sockaddr_in client_addr;
    socklen_t client_addr_len;
    char client_ip_str[INET_ADDRSTRLEN];
    int res;
    int i;
    char buffer[BUFF_SIZE];
    int recv_size;

    while (1) {

        //注意select之后readfds和timeout的值都会被修改，因此每次都进行重置
        readfds = readfds_bak;
        maxfd = updateMaxfd(readfds, maxfd);        //更新maxfd
        timeout.tv_sec = SELECT_TIMEOUT;
        timeout.tv_usec = 0;
        printf("selecting maxfd=%d\n", maxfd);

        //select(这里没有设置writefds和errorfds，如有需要可以设置)
        res = select(maxfd + 1, &readfds, NULL, NULL, &timeout);
        if (res == -1) {
            perror("select failed");
            exit(EXIT_FAILURE);
        } else if (res == 0) {
            fprintf(stderr, "no socket ready for read within %d secs\n", SELECT_TIMEOUT);
            continue;
        }

        //检查每个socket，并进行读(如果是sock则accept)
        for (i = 0; i <= maxfd; i++) {
            if (!FD_ISSET(i, &readfds)) {
                continue;
            }
            //可读的socket
            if ( i == sock) {
                //当前是server的socket，不进行读写而是accept新连接
                client_addr_len = sizeof(client_addr);
                new_sock = accept(sock, (struct sockaddr *) &client_addr, &client_addr_len);
                if (new_sock == -1) {
                    perror("accept failed");
                    exit(EXIT_FAILURE);
                }
                if (!inet_ntop(AF_INET, &(client_addr.sin_addr), client_ip_str, sizeof(client_ip_str))) {
                    perror("inet_ntop failed");
                    exit(EXIT_FAILURE);
                }
                printf("accept a client from: %s\n", client_ip_str);
                //设置new_sock为non-blocking
                setSockNonBlock(new_sock);
                //把new_sock添加到select的侦听中
                if (new_sock > maxfd) {
                     maxfd = new_sock;
                }
                     D_SET(new_sock, &readfds_bak);
            } else {
                //当前是client连接的socket，可以写(read from client)
                memset(buffer, 0, sizeof(buffer));
                if ( (recv_size = recv(i, buffer, sizeof(buffer), 0)) == -1 ) {
                    perror("recv failed");
                    exit(EXIT_FAILURE);
                }
                printf("recved from new_sock=%d : %s(%d length string)\n", i, buffer, recv_size);
                //立即将收到的内容写回去，并关闭连接
                if ( send(i, buffer, recv_size, 0) == -1 ) {
                    perror("send failed");
                    exit(EXIT_FAILURE);
                }
                printf("send to new_sock=%d done\n", i);
                if ( close(i) == -1 ) {
                    perror("close failed");
                    exit(EXIT_FAILURE);
                }
                printf("close new_sock=%d done\n", i);
                //将当前的socket从select的侦听中移除
                FD_CLR(i, &readfds_bak);
            }
        }
    }

    return 0;
} 
```





















