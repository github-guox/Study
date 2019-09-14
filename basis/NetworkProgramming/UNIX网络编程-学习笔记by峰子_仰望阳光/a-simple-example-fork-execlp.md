# 一个进程启动另一个程序的执行

下面展示了一个进程如何来启动另一个程序的执行。在Linux中要使用exec函数族。系统调用execve()对当前进程进行替换，替换者为一个指定的程序，其参数包括文件名（filename）、参数列表（argv）以及环境变量（envp）。<br/>

exec函数族当然不止一个，但它们大致相同，在 Linux中，它们分别是：execl，execlp，execle，execv，execve和execvp，通过manexec命令来了解它们的具体情况。<br/>

一个进程一旦调用exec类函数，它本身就"死亡"了，系统把代码段替换成新的程序的代码，废弃原有的数据段和堆栈段，并为新程序分配新的数据段与堆栈段，唯一留下的，就是进程号，也就是说，对系统而言，还是同一个进程，不过已经是另一个程序了。（不过exec类函数中有的还允许继承环境变量之类的信息。）<br/>

那么如果我的程序想启动另一程序的执行但自己仍想继续运行的话，怎么办呢？那就是结合fork与exec的使用。下面一段代码显示如何启动运行其它程序：<br/>

```c++
 1#include <errno.h>
 2#include <stdio.h>
 3#include <stdlib.h>
 4
 5char command[256];
 6void main()
 7{
 8   int rtn; /*子进程的返回数值*/
 9   while(1) {
10       /* 从终端读取要执行的命令 */
11       printf( ">" );
12       fgets( command, 256, stdin );
13       command[strlen(command)-1] = 0;
14       if ( fork() == 0 ) {/* 子进程执行此命令 */
15          execlp( command, NULL );
16          /* 如果exec函数返回，表明没有正常执行命令，打印错误信息*/
17          perror( command );
18          exit( errno );
19       }
20       else {/* 父进程， 等待子进程结束，并打印子进程的返回值 */
21          wait ( &rtn );
22          printf( " child process return %d\n", rtn );
23       }
24   }
25}
```

此程序从终端读入命令并执行之，执行完成后，父进程继续等待从终端读入命令。

在这一节里，我们还要讲讲system()和popen()函数。system()函数先调用fork()，然后再调用exec()来执行用户的登录 shell，通过它来查找可执行文件的命令并分析参数，最后它么使用wait()函数族之一来等待子进程的结束。函数popen()和函数 system()相似，不同的是它调用pipe()函数创建一个管道，通过它来完成程序的标准输入和标准输出。这两个函数是为那些不太勤快的程序员设计的，在效率和安全方面都有相当的缺陷，在可能的情况下，应该尽量避免。<br/>

****

代码注释：<br/>

1. Exec函数原型：<br/>

   ```c++
   #include <unistd.h>
   extern char **environ;
   
   nt execl(const char *path, const char *arg, ...);
   int execlp(const char *file, const char *arg, ...);
   int execle(const char *path, const char *arg,..., char * const envp[]);
   int execv(const char *path, char *const argv[]);
   int execvp(const char *file, char *const argv[]);
   int execvpe(const char *file, char *const argv[],char *const envp[]);
   —————————————————————————————————————————————————————————————————————————
   https://blog.csdn.net/u014530704/article/details/73848573
   ```

2. 返回值：<br/>

   exec函数族的函数执行成功后不会返回，调用失败时，会设置errno并返回-1，然后从原程序的调用点接着往下执行。

3. 参数：<br/>

   - path：可执行文件的路径名字 
   - arg：可执行程序所带的参数，第一个参数为可执行文件名字，没有带路径且arg必须以NULL结束 
   - file：如果参数file中包含/，则就将其视为路径名，否则就按 PATH环境变量，在它所指定的各目录中搜寻可执行文件。

   ```markdown
   exec族函数参数极难记忆和分辨，函数名中的字符会给我们一些帮助： 
   l : 使用参数列表 
   p：使用文件名，并从PATH环境进行寻找可执行文件 
   v：应先构造一个指向各参数的指针数组，然后将该数组的地址作为这些函数的参数。 
   e：多了envp[]数组，使用新的环境变量代替调用进程的环境变量
   ```

**下面将exac函数归为带l、带p、带v、带e 四类来说明参数特点。**<br/>

**一、带l的一类exac函数（l表示list），包括execl、execlp、execle，要求将新程序的每个命令行参数都说明为 一个单独的参数。这种参数表以空指针结尾。** <br/>

以execl函数为例子来说明：<br/>

```c++
if(execl("./bin/echoarg","echoarg","abc",NULL) == -1)
{
		printf("execl failed!\n");      
}
```

**二、带p的一类exac函数，包括execlp、execvp、execvpe，如果参数file中包含/，则就将其视为路径名，否则就按 PATH环境变量，在它所指定的各目录中搜寻可执行文件。举个例子，PATH=/bin:/usr/bin** <br/>

```c++
if(execl("ps","ps","-l",NULL) == -1)
{
    printf("execl failed!\n");
} 
//输出execl failed!
```

上面这个例子因为参数没有带路径，所以execl找不到可执行文件。<br/>

```c++
if(execlp("ps","ps","-l",NULL) == -1)
{
    printf("execlp failed!\n");
}
//输出命令ps -l的结果
```

从上面的实验结果可以看出，上面的exaclp函数带p，所以能通过环境变量PATH查找到可执行文件ps。<br/>

**三、带v不带l的一类exac函数，包括execv、execvp、execve，应先构造一个指向各参数的指针数组，然后将该数组的地址作为这些函数的参数。** <br/>

如char *arg[]这种形式，且arg最后一个元素必须是NULL，例如char *arg[] = {“ls”,”-l”,NULL}; <br/>
下面以execvp函数为例说明：<br/>

```c++
if(execvp("ps",argv) == -1) 
{
    printf("execvp failed!\n");     
}
```

**四、带e的一类exac函数，包括execle、execvpe，可以传递一个指向环境字符串指针数组的指针。** <br/>

参数例如char *env_init[] = {“AA=aa”,”BB=bb”,NULL}; 带e表示该函数取envp[]数组，而不使用当前环境。 <br/>

下面以execle函数为例： <br/>

```c++
//文件execle.c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
//函数原型：int execle(const char *path, const char *arg,..., char * const envp[]);

char *env_init[] = {"AA=aa","BB=bb",NULL};
int main(void)
{
    printf("before execle****\n");
        if(execle("./bin/echoenv","echoenv",NULL,env_init) == -1)
        {
                printf("execle failed!\n");
        }       
    printf("after execle*****\n");
    return 0;
}
————————————————

//文件echoenv.c
#include <stdio.h>
#include <unistd.h>
extern char** environ;
int main(int argc , char *argv[])
{
    int i;
    char **ptr;
    for(ptr = environ;*ptr != 0; ptr++)
        printf("%s\n",*ptr);
    return 0;
}
————————————————

实验结果
ubuntu:~/test/exec_test$ gcc execle.c -o execle
ubuntu:~/test/exec_test$ ./execle
before execle****
AA=aa
BB=bb
```

先写一个显示全部环境表的程序，命名为echoenv.c，然后编译成可执行文件放到./bin目录下。然后再运行可执行文件execle，发现我们设置的环境变量确实有传进来。<br/>



****

wait函数：<br/>

wait（等待子进程中断或结束）<br/>

进程一旦调用了 wait，就***立即阻塞自己，由wait自动分析是否当前进程的某个子进程已经退出***，如果让它找到了这样一个已经变成僵尸的子进程，wait 就会收集这个子进程的信息， 并把它彻底销毁后返回；如果没有找到这样一个子进程，wait就会一直阻塞在这里，直到有一个出现为止。

```c++
ref: https://blog.csdn.net/21aspnet/article/details/1534093
#include<sys/types.h>
#include<sys/wait.h>

pid_t wait (int * status);

函数说明
wait()会暂时停止目前进程的执行，直到有信号来到或子进程结束。如果在调用wait（）时子进程已经结束，则wait（）会立即返回子进程结束状态值。子进程的结束状态值会由参数status 返回，而子进程的进程识别码也会一快返回。如果不在意结束状态值，则参数status 可以设成NULL。子进程的结束状态值请参考waitpid（）。

返回值
如果执行成功则返回子进程识别码（PID），如果有错误发生则返回-1。失败原因存于errno 中。
```

****

waitpid函数：<br/>

waitpid（等待子进程中断或结束）<br/>

```c++
#include<sys/types.h>
#include<sys/wait.h>

pid_t waitpid(pid_t pid,int * status,int options);
————————————————
函数说明
waitpid（）会暂时停止目前进程的执行，直到有信号来到或子进程结束。如果在调用waitpid（）时子进程已经结束，则waitpid（）会立即返回子进程结束状态值。子进程的结束状态值会由参数status 返回，而子进程的进程识别码也会一快返回。如果不在意结束状态值，则参数status 可以设成NULL。
————————————————
参数pid为欲等待的子进程识别码，其他数值意义如下：
pid<-1 等待进程组识别码为pid 绝对值的任何子进程。
pid=-1 等待任何子进程，相当于wait（）。
pid=0 等待进程组识别码与目前进程相同的任何子进程。
pid>0 等待任何子进程识别码为pid 的子进程。
————————————————
参数option可以为0或下面的OR组合：
WNOHANG 如果没有任何已经结束的子进程则马上返回，不予以等待。
WUNTRACED 如果子进程进入暂停执行情况则马上返回，但结束状态不予以理会。
————————————————
子进程的结束状态返回后存于status，下面有几个宏可判别结束情况：
WIFEXITED（status）如果子进程正常结束则为非0 值。
WEXITSTATUS（status）取得子进程exit（）返回的结束代码，一般会先用WIFEXITED 来判断是否正常结束才能使用此宏。
WIFSIGNALED（status）如果子进程是因为信号而结束则此宏值为真
WTERMSIG（status） 取得子进程因信号而中止的信号代码，一般会先用WIFSIGNALED 来判断后才使用此宏。
WIFSTOPPED（status） 如果子进程处于暂停执行情况则此宏值为真。一般只有使用WUNTRACED 时才会有此情况。
WSTOPSIG（status） 取得引发子进程暂停的信号代码，一般会先用WIFSTOPPED 来判断后才使用此宏。
————————————————
返回值
如果执行成功则返回子进程识别码（PID），如果有错误发生则返回-1。失败原因存于errno 中。
```

