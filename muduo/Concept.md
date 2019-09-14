# Concepts



1. thread per connection

   用于实现**并发的网络服务器**。

   

2. Reactor模式
   

3. 线程模型 One loop per thread + thread pool
   

4. 前向声明（forward declaration）

   - 前向声明能**显著缩短编译链接时间**
     类的前置声明只是告诉编译器这是一个类型，但无法告知类型的大小，成员等具体内容。在未提供完整的类之前，不能定义该类的对象，也不能在内联成员函数中使用该类的对象。而头文件则一一告之。`#include`会将包含所有的`.h`文件，编译器一下子需要编译无穷无尽的文件，即使需要调用的实际上只有一两个函数。这会拖慢编译时间。且减少include，可以**防止类间相互引用形成依赖**，造成编译不通过。

   - 前向声明的使用限制

     - 不能定义类的对象
     - 可以定义类的指针或者引用（可以定义，但不能去使用指针，因为类具体的实现并不知道）
     - 用于声明使用该类型作为形参或者返回类型的函数

   - 优点

     - 前置声明能够**节省编译时间**，多余的 #include 会迫使编译器展开更多的文件，处理更多的输入。
     - 前置声明能够节省**不必要的重新编译**的时间。 #include 使代码因为头文件中无关的改动而被重新编译多次。

   - 缺点

     - 前置声明**隐藏了依赖**关系，头文件改动时，用户的代码会**跳过必要的重新编译**过程。
     - 前置声明可能会被库的后续更改所破坏。前置声明函数或模板有时会**妨碍头文件开发者变动其 API**。例如扩大形参类型，加个自带默认参数的模板形参等等。
     - 前置声明来自`命名空间std:: 的 symbol 时`，其行为未定义。

   - 常见错误

     ```c++
        1:  
        2: #ifndef RESOURCE_H
        3: #define RESOURCE_H
        4: class 
        5: mybitmap;
        6: class 
        7: resource
        8: {
        9: public:
       10: resource();
       11: ~resource();
       12: private:
       13: mybitmap* 
       14: m_pBitmap;
       15: };
       16: #endif
       17: resource::~resource()
       18: {
       19: if ( 
       20: NULL != m_pBitmap )
       21: {
       22: delete m_pBitmap;
       23: }
       24: }
     ```

     程序编译时，会有一个警告: <br/>

     class A 声明仅仅告诉程序有这样一个类，你可以在这里声明类A的一个指针，但是此处并不能获得类A的具体信息，如果定义类A的一个指针是可以的，但定义一个类A的对象，则程序是错误的，因为不知道A的具体信息，故无法生成一个对象。 <br/>

     程序中用class声明的mybitmap类，在执行delete m_pBitmap时，因为它不知道mybitmap类的具体信息，所以无法调用它的析构函数，故内存并没有释放，造成内存泄漏。

   - 用法

     - 尽量避免前置声明那些定义在其他项目中的实体
     - 函数：总是使用#include
     - 类模板：优先使用#include

     Ref: <https://www.cnblogs.com/baochun968/archive/2012/05/03/2480137.html>

     ​		<http://www.voidcn.com/article/p-vpoaigaj-vc.html>

5. S

6. s

7. s

8. s

9. s

10. s

11. s

12. s

13. s

14. s

15. s

16. s

17. s

18. s

19. s

20. s

21. s

22. s

23. s

24. s

25. s

26. s

27. s

28. s

29. s

30. ss



