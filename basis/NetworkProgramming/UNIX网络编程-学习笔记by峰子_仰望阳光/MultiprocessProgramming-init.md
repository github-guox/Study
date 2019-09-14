# Multiprocess Programming

REF: <br/>

1. https://www.cnblogs.com/hicjiajia/archive/2011/01/20/1940154.html
2. 







### 多进程编程

进程这个概念是针对系统而不是针对用户的，对用户来说，他面对的概念是程序。当用户敲入命令执行一个程序的时候，对系统而言，它将启动一个进程。但和程序不同的是，在这个进程中，系统可能需要再启动一个或多个进程来完成独立的多个任务。多进程编程的主要内容包括进程控制和进程间通信。<br/>

#### 1 Linux下进程的结构

Linux下**一个进程在内存里有三部分的数据，就是"代码段"、"堆栈段"和"数据段"**。其实学过汇编语言的人一定知道，一般的CPU都有上述三种段寄存器，以方便操作系统的运行。这三个部分也是构成一个完整的执行序列的必要的部分。<br/>

- "代码段"，顾名思义，就是存放了程序代码的数据，假如机器中有数个进程运行相同的一个程序，那么它们就可以使用相同的代码段。<br/>
- "堆栈段"存放的就是子程序的返回地址、子程序的参数以及程序的局部变量。<br/>
- 数据段则存放程序的全局变量，常数以及动态数据分配的数据空间（比如用malloc之类的函数取得的空间）。<br/>

系统如果同时运行数个相同的程序，它们之间就不能使用同一个堆栈段和数据段。<br/>

#### 2 Linux下的进程控制

在传统的Unix环境下，有两个基本的操作用于创建和修改进程：函数fork( )用来创建一个新的进程，该进程几乎是当前进程的一个完全拷贝；函数族exec( )用来启动另外的进程以取代当前运行的进程。<br/>

调用fork函数时发生了什么呢？<br/>

fork函数启动一个新的进程，这个进程几乎是当前进程的一个拷贝：子进程和父进程使用相同的代码段；子进程复制父进程的堆栈段和数据段。这样，父进程的所有数据都可以留给子进程，**但是，子进程一旦开始运行，虽然它继承了父进程的一切数据，但实际上数据却已经分开，相互之间不再有影响了，也就是说，它们之间不再共享任何数据了**。它们再要交互信息时，只有通过**进程间通信**来实现。<br/>

既然它们如此相象，系统如何来区分它们呢？<br/>

这是由函数的返回值来决定的。对于父进程， fork函数返回了子程序的进程号，而对于子程序，fork函数则返回零。在操作系统中，我们用ps函数就可以看到不同的进程号，对父进程而言，它的进程号是由比它更低层的系统调用赋予的，而对于子进程而言，它的进程号即是fork函数对父进程的返回值。在程序设计中，父进程和子进程都要调用函数fork()下面的代码，而我们就是利用fork()函数对父子进程的不同返回值用if...else...语句来实现让父子进程完成不同的功能。<br/>

🔥如果一个大程序在运行中，它的数据段和堆栈都很大，一次fork就要复制一次，那么fork的系统开销不是很大吗？<br/>

**其实UNIX自有其解决的办法，大家知道，一般CPU都是以"页"为单位来分配内存空间的，每一个页都是实际物理内存的一个映像，象INTEL的CPU，其一页在通常情况下是 4086字节大小，而无论是数据段还是堆栈段都是由许多"页"构成的，fork函数复制这两个段，只是"逻辑"上的，并非"物理"上的，也就是说，实际执行fork时，物理空间上两个进程的数据段和堆栈段都还是共享着的，当有一个进程写了某个数据时，这时两个进程之间的数据才有了区别，系统就将有区别的" 页"从物理上也分开。系统在空间上的开销就可以达到最小。** <br/>

#### 3 Linux下的进程间通信

- 首先，进程间通信至少可以通过传送打开文件来实现，不同的进程通过一个或多个文件来传递信息，事实上，在很多应用系统里，都使用了这种方法。
- 但一般说来，进程间通信（IPC：InterProcess Communication）不包括这种似乎比较低级的通信方法。
- Unix系统中实现进程间通信的方法很多，而且不幸的是，极少方法能在所有的Unix系统中进行移植（唯一一种是半双工的管道，这也是最原始的一种通信方式）。而Linux作为一种新兴的操作系统，几乎支持所有的Unix下常用的进程间通信方法：管道、消息队列、共享内存、信号量、套接口等等。下面我们将逐一介绍。

##### 1 管道

管道是进程间通信中最古老的方式，它包括**无名管道和有名管道两种**，前者用于父进程和子进程间的通信，后者用于运行于同一台机器上的任意两个进程间的通信。

1. 无名管道由pipe()函数创建<br/>

   ```c++
   #include <unistd.h>
   int pipe(int filedis[2])；
   //参数filedis返回两个文件描述符：filedes[0]为读而打开，filedes[1]为写而打开。filedes[1]的输出是filedes[0]的输入。
   ```

   下面的例子示范了如何在父进程和子进程间实现通信:<br/>

   ```c++
    1 #define INPUT 0
    2 #define OUTPUT 1
    3 
    4 void main() {
    5    int file_descriptors[2];
    6    /*定义子进程号 */
    7    pid_t pid;
    8    char buf[256];
    9    int returned_count;
   10    /*创建无名管道*/
   11    pipe(file_descriptors);
   12    /*创建子进程*/
   13    if((pid = fork()) == -1) {
   14       printf("Error in fork\n");
   15       exit(1);
   16    }
   17    /*执行子进程*/
   18    if(pid == 0) {
   19       printf("in the spawned (child) process...\n");
   20       /*子进程向父进程写数据，关闭管道的读端*/
   21       close(file_descriptors[INPUT]);
   22       write(file_descriptors[OUTPUT], "test data", strlen("test data"));
   23       exit(0);
   24    } else {
   25       /*执行父进程*/
   26       printf("in the spawning (parent) process...\n");
   27       /*父进程从管道读取子进程写的数据，关闭管道的写端*/
   28       close(file_descriptors[OUTPUT]);
   29       returned_count = read(file_descriptors[INPUT], buf, sizeof(buf));
   30       printf("%d bytes of data received from spawned process: %s\n",
   31       returned_count, buf);
   32    }
   33 }
   ```

   

2. 有名管道可由两种方式创建：命令行方式mknod系统调用和函数mkfifo <br/>

   下面的两种途径都在当前目录下生成了一个名为myfifo的有名管道：<br/>

   - 方式一：mkfifo("myfifo","rw");
   - 方式二：mknod myfifo p

   生成了有名管道后，就可以使用一般的文件I/O函数如open、close、read、write等来对它进行操作。<br/>

   下面即是一个简单的例子，假设我们已经创建了一个名为myfifo的有名管道:<br/>

   ```c++
    1/* 进程一：读有名管道*/
    2#include <stdio.h>
    3#include <unistd.h>
    4void main() {
    5    FILE * in_file;
    6    int count = 1;
    7    char buf[80];
    8    in_file = fopen("mypipe", "r");
    9    if (in_file == NULL) {
   10        printf("Error in fdopen.\n");
   11        exit(1);
   12    }
   13    while ((count = fread(buf, 1, 80, in_file)) > 0)
   14        printf("received from pipe: %s\n", buf);
   15    fclose(in_file);
   16}
   17/* 进程二：写有名管道*/
   18#include <stdio.h>
   19#include <unistd.h>
   20void main() {
   21    FILE * out_file;
   22    int count = 1;
   23    char buf[80];
   24    out_file = fopen("mypipe", "w");
   25    if (out_file == NULL) {
   26        printf("Error opening pipe.");
   27        exit(1);
   28    }
   29    sprintf(buf,"this is test data for the named pipe example\n");
   30    fwrite(buf, 1, 80, out_file);
   31    fclose(out_file);
   32}
   33
   ```

   

##### 2 消息队列

消息队列用于运行于同一台机器上的进程间通信，它和管道很相似，事实上，它是一种正逐渐被淘汰的通信方式，我们可以用流管道或者套接口的方式来取代它，所以，我们对此方式也不再解释，也建议读者忽略这种方式。

##### 3 共享内存

共享内存是运行在同一台机器上的**进程间通信最快的方式**，因为数据不需要在不同的进程间复制。通常由一个进程创建一块共享内存区，其余进程对这块内存区进行读写。<br/>

得到共享内存有两种方式：映射/dev/mem设备和内存映像文件。<br/>

前一种方式不给系统带来额外的开销，但在现实中并不常用，因为它控制存取的将是实际的物理内存，在Linux系统下，这只有通过限制Linux系统存取的内存才可以做到，这当然不太实际。常用的方式是**通过shmXXX函数族**来实现利用共享内存进行存储的。<br/>

> 首先要用的函数是shmget，它获得一个共享存储标识符。

```cassandra
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/shm.h>
int shmget(key_t key, int size, int flag);

这个函数有点类似大家熟悉的malloc函数，系统按照请求分配size大小的内存用作共享内存。Linux系统内核中每个IPC结构都有的一个非负整数的标识符，这样对一个消息队列发送消息时只要引用标识符就可以了。这个标识符是内核由IPC结构的关键字得到的，这个关键字，就是上面第一个函数的 key。数据类型key_t是在头文件sys/types.h中定义的，它是一个长整形的数据。
```

> 当共享内存创建后，其余进程可以调用shmat()将其连接到自身的地址空间中。

```c++
void *shmat(int shmid, void *addr, int flag);
shmid为shmget函数返回的共享存储标识符，addr和flag参数决定了以什么方式来确定连接的地址，函数的返回值即是该进程数据段所连接的实际地址，进程可以对此进程进行读写操作。
```

使用共享存储来实现进程间通信的注意点是对数据存取的同步，必须确保当一个进程去读取数据时，它所想要的数据已经写好了。通常，**信号量被要来实现对共享存储数据存取的同步**。<br/>

> 另外，可以通过使用shmctl函数设置共享存储内存的某些标志位如SHM_LOCK、SHM_UNLOCK等来实现。



##### 4 信号量

信号量又称为信号灯，它是用来协调不同进程间的数据对象的，而最主要的应用是前一节的共享内存方式的进程间通信。<br/>

**本质上，信号量是一个计数器，它用来记录对某个资源（如共享内存）的存取状况。**<br/>

一般说来，为了获得共享资源，进程需要执行下列操作：<br/>

```wiki
（1） 测试控制该资源的信号量。
（2） 若此信号量的值为正，则允许进行使用该资源。进程将进号量减1。
（3） 若此信号量为0，则该资源目前不可用，进程进入睡眠状态，直至信号量值大于0，进程被唤醒，转入步骤（1）。
（4） 当进程不再使用一个信号量控制的资源时，信号量值加1。如果此时有进程正在睡眠等待此信号量，则唤醒此进程。
```

> 维护信号量状态的是Linux内核操作系统而不是用户进程。
>
> 可以从头文件/usr/src/linux/include　/linux　/sem.h 中看到内核用来维护信号量状态的各个结构的定义。

信号量是一个数据集合，用户可以单独使用这一集合的每个元素。<br/>

> 要调用的第一个函数是semget，用以获得一个信号量ID。

```c++
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/sem.h>
int semget(key_t key, int nsems, int flag);
```

* key是前面讲过的IPC结构的关键字，它将来决定是创建新的信号量集合，还是引用一个现有的信号量集合。<br/>
* nsems是该集合中的信号量数。如果是创建新集合（一般在服务器中），则必须指定nsems；如果是引用一个现有的信号量集合（一般在客户机中）则将nsems指定为0。<br/>

> semctl函数用来对信号量进行操作。

```c++
int semctl(int semid, int semnum, int cmd, union semun arg);
```

不同的操作是通过cmd参数来实现的，在头文件sem.h中定义了7种不同的操作，实际编程时可以参照使用。<br/>

> semop函数自动执行信号量集合上的操作数组。

```c++
int semop(int semid, struct sembuf semoparray[], size_t nops);
```

- semoparray是一个指针，它指向一个信号量操作数组。<br/>
- nops规定该数组中操作的数量。<br/>

下面，我们看一个具体的例子，它**创建一个特定的IPC结构的关键字和一个信号量，建立此信号量的索引，修改索引指向的信号量的值，最后我们清除信号量。**在下面的代码中，**函数ftok**生成我们上文所说的唯一的IPC关键字。<br/>

```c++
 1#include <stdio.h>
 2#include <sys/types.h>
 3#include <sys/sem.h>
 4#include <sys/ipc.h>
 5void main() {
 6    key_t unique_key; /* 定义一个IPC关键字*/
 7    int id;
 8    struct sembuf lock_it;
 9    union semun options;
10    int i;
11
12    unique_key = ftok(".", 'a'); /* 生成关键字，字符'a'是一个随机种子*/
13    /* 创建一个新的信号量集合*/
14    id = semget(unique_key, 1, IPC_CREAT | IPC_EXCL | 0666);
15    printf("semaphore id=%d\n", id);
16    options.val = 1; /*设置变量值*/
17    semctl(id, 0, SETVAL, options); /*设置索引0的信号量*/
18
19    /*打印出信号量的值*/
20    i = semctl(id, 0, GETVAL, 0);
21    printf("value of semaphore at index 0 is %d\n", i);
22
23    /*下面重新设置信号量*/
24    lock_it.sem_num = 0; /*设置哪个信号量*/
25    lock_it.sem_op = -1; /*定义操作*/
26    lock_it.sem_flg = IPC_NOWAIT; /*操作方式*/
27    if (semop(id, &lock_it, 1) == -1) {
28        printf("can not lock semaphore.\n");
29        exit(1);
30    }
31
32    i = semctl(id, 0, GETVAL, 0);
33    printf("value of semaphore at index 0 is %d\n", i);
34
35    /*清除信号量*/
36    semctl(id, 0, IPC_RMID, 0);
37}
```



##### 5 套接口

套接口（socket）编程是实现Linux系统和其他大多数操作系统中进程间通信的主要方式之一。我们熟知的WWW服务、FTP服务、TELNET服务等都是基于套接口编程来实现的。除了在异地的计算机进程间以外，套接口同样适用于本地同一台计算机内部的进程间通信。



### **Linux的进程和Win32的进程/线程比较**

熟悉WIN32编程的人一定知道，WIN32的进程管理方式与Linux上有着很大区别，在UNIX里，只有进程的概念，但在WIN32里却还有一个"线程"的概念，那么Linux和WIN32在这里究竟有着什么区别呢？<br/>

WIN32里的进程/线程是继承自OS/2的。在WIN32里，"进程"是指一个程序，而"线程"是一个"进程"里的一个执行"线索"。从核心上讲，WIN32的多进程与Linux并无多大的区别，在WIN32里的线程才相当于Linux的进程，是一个实际正在执行的代码。但是，WIN32里同一个进程里各个线程之间是共享数据段的。这才是与Linux的进程最大的不同。<br/>

下面这段程序显示了WIN32下一个进程如何启动一个线程。<br/>

```c++
 1 int g;
 2 DWORD WINAPI ChildProcess( LPVOID lpParameter ){
 3     int i;
 4     for ( i = 1; i <1000; i ++) {
 5         g ++;
 6         printf( "This is Child Thread: %d\n", g );
 7     }
 8     ExitThread( 0 );
 9 };
10 
11 void main()
12 {
13     int threadID;
14     int i;
15     g = 0;
16     CreateThread( NULL, 0, ChildProcess, NULL, 0, &threadID );
17     for ( i = 1; i <1000; i ++) {
18         g ++;
19         printf( "This is Parent Thread: %d\n", g );
20     }
21 }
```

- 在WIN32下，使用CreateThread函数创建线程，与Linux下创建进程不同，WIN32线程不是从创建处开始运行的，而是由 CreateThread指定一个函数，线程就从那个函数处开始运行。此程序同前面的UNIX程序一样，由两个线程各打印1000条信息。
-  threadID是子线程的线程号，另外，全局变量g是子线程与父线程共享的，这就是与Linux最大的不同之处。
- WIN32的进程/线程要比Linux复杂，在Linux要实现类似WIN32的线程并不难，只要fork以后，让子进程调用ThreadProc函数，并且为全局变量开设共享数据区就行了，但在WIN32下就无法实现类似fork的功能了。所以现在WIN32下的C语言编译器所提供的库函数虽然已经能兼容大多数 Linux/UNIX的库函数，但却仍无法实现fork。

对于多任务系统，共享数据区是必要的，但也是一个容易引起混乱的问题，在WIN32下，一个程序员很容易忘记线程之间的数据是共享的这一情况，一个线程修改过一个变量后，另一个线程却又修改了它，结果引起程序出问题。但在Linux下，由于变量本来并不共享，而由程序员来显式地指定要共享的数据，使程序变得更清晰与安全。<br/>

至于WIN32的"进程"概念，其含义则是"应用程序"，也就是相当于UNIX下的exec了。<br/>

Linux也有自己的多线程函数pthread，它既不同于Linux的进程，也不同于WIN32下的进程。<br/>

