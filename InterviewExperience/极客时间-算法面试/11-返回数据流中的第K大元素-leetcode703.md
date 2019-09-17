# 返回数据流中的第K大元素-leetcode703

### 目录







#### [703.数据流中的第K大元素](https://leetcode-cn.com/problems/kth-largest-element-in-a-stream/)

```wiki
题目：
设计一个找到数据流中第K大元素的类（class）。注意是排序后的第K大元素，不是第K个不同的元素。

你的 KthLargest 类需要一个同时接收整数 k 和整数数组nums 的构造器，它包含数据流中的初始元素。每次调用 KthLargest.add，返回当前数据流中第K大的元素。

示例:
int k = 3;
int[] arr = [4,5,8,2];
KthLargest kthLargest = new KthLargest(3, arr);
kthLargest.add(3);   // returns 4
kthLargest.add(5);   // returns 5
kthLargest.add(10);  // returns 5
kthLargest.add(9);   // returns 8
kthLargest.add(4);   // returns 8
```

##### 解法1：维护一个大小为k的小根堆，则根节点就是第k大元素

堆相关函数的使用：https://elloop.github.io/c++/2016-11-29/learning-using-stl-72-make-heap <br/>

```c++
class KthLargest {
private:
    int len;
    vector<int> a;
public:
    KthLargest(int k, vector<int>& nums) { 
        len=k;
        sort(nums.begin(),nums.end(),ismax); //ismax后没有括号
        if(k>nums.size()) //所有数据全部拷贝
            a.assign(nums.begin(),nums.end());
        else
            a.assign(nums.begin(),nums.begin()+k);
        
        make_heap(a.begin(),a.end(),greater<int>());//创建小根堆，greater<int>后有括号
    }
    
    int add(int val) {
        a.push_back(val);
        push_heap(a.begin(),a.end(),greater<int>());
        //判断是否需要删除元素
        if(len<a.size()){
            pop_heap(a.begin(),a.end(),greater<int>());
            a.pop_back();
        }          
        return a[0];               
    }
    
    static bool ismax(int a,int b)
    {
        return a>b;  //从大到小排序
    }
};

```



##### 使用优先队列创建小根堆

C++中的“优先队列（priority_queue）"，包含在头文件queue中。优先队列具有队列的所有特性，包括基本操作，只是在这基础上添加了内部的一个排序，它本质是一个堆实现的。<br/>

```wiki
定义：priority_queue<Type, Container, Functional>

Type 就是数据类型，
Container 就是容器类型（Container必须是用数组实现的容器，比如vector,deque等等，但不能用 list。STL里面默认用的是vector），
Functional 就是比较的方式，当需要用自定义的数据类型时才需要传入这三个参数，使用基本数据类型时，只需要传入数据类型，默认是大根堆 。
```

```wiki
#降序队列（大根堆）
priority_queue <int,vector<int>,less<int> >q;

#升序队列（小根堆）
priority_queue <int,vector<int>,greater<int> > q;
```

```c++
class KthLargest {
private:
    int len;
    priority_queue<int,vector<int>,greater<int> >pq; //用的尖括号
public:
    KthLargest(int k, vector<int>& nums) {
        len = k;
        for(int i=0;i<nums.size();i++){
            pq.push(nums[i]);
            if(pq.size()>len)
                pq.pop();
        }
    }
    
    int add(int val) {
        pq.push(val);
        if(pq.size()>len)
                pq.pop();
        return pq.top();
    }
};
```



#### [215.数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

```wiki
题目：
在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

示例 1:
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5

示例 2:
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4

说明:
你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。
```



**使用优先队列 !!!面试的时候可能不让使用优先队列，要求自己写堆实现** <br/>

```c++
class Solution {
private:
    priority_queue<int,vector<int>,greater<int> > pq;
public:
    int findKthLargest(vector<int>& nums, int k) {
        //不足k个元素时？
        for(int i=0;i<nums.size();i++){
            pq.push(nums[i]);
            if(pq.size()>k)
                pq.pop();
        }
        return pq.top();
    }
};
```



**自己实现一个堆排序---一定要掌握！！！！！** <br/>

```c++
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        int n=nums.size();
        buildheap(nums,n);
        for(int i=n-1;i>=0;i--){
            swap(nums,0,i);
            k--;
            if(k==0){
                return nums[i];
            }
            heapadjust(nums,i,0);
        }
        return 0;
    }
    void buildheap(vector<int>& nums,int n)//初始堆
    {//结点与子结点关系，parent=i，lchild=2i+1,rchild=2i+2
        int parent=(n-2)/2;//最后一个非叶结点与总结点数的关系是,下标=(n-2)/2,n是总数
        for(int i=parent;i>=0;i--){//从最后一个非叶结点向前调整
            heapadjust(nums,n,i);
        }
        
    }
    void heapadjust(vector<int>& nums,int n,int i)//堆结构调整，保证大的在上，小的在下
    {//将父结点与孩子结点比较取大者，放到原父结点位置，这样交换的孩子结点数值会变，这个孩子结点当作下一层递归的父结点
    //继续与它的孩子结点比较，将这个分支上小的数一直往下移，大的数往上移
    //递归结束条件是当前的结点超过n，也就是上一层的结点没有孩子结点
        if(i>=n){
            return ;
        }
        int c1=2*i+1;
        int c2=2*i+2;
        int max=i;
        if(c1<n && nums[c1]>nums[max])//若有左子结点
            max=c1;
        if(c2<n && nums[c2]>nums[max])//若有右子结点
            max=c2;
        if(max!=i){
            swap(nums,i,max);
            heapadjust(nums,n,max);
        }
    }
    void swap(vector<int>&nums,int i, int max){//交换
        int temp=nums[i];
        nums[i]=nums[max];
        nums[max]=temp;
    }
};
```



**快速排序思想，数组划分---掌握！！！** <br/>

```wiki
利用快速排序思想，对数组进行划分，并且判断划分的边界元素位置mid是否为第k大的数(k - 1)；
若是则返回该数，若mid > k - 1说明第k大的数在左半边数组里；若mid < k - 1说明在右半边数组里。对其继续进行数组划分，直到找到第k大的数。
数组划分函数partation采用数组中心位置的元素值作为bound（边界），也可以采用随机元素，最好不要用第一个（最后一个）元素，防止数组绝大部分元素是有序的，影响查找效率。

```

```c++
class Solution {
public:
   int findKthLargest(vector& nums, int k) {
       int low = 0, high = nums.size() - 1, mid = 0;
       while (low <= high) {
           mid = partation(nums, low, high);
           if (mid == k - 1) return nums[mid];
           else if (mid > k - 1) high = mid - 1;
           else low = mid + 1;
       }
       //  实际上返回 -1 代表没有第 k 大的数，这里不存在
       return -1;
   }
   
   int partation(vector& nums, int low, int high) {
       int left = low + 1, right = high;
       swap(nums[low], nums[(low + high) / 2]);
       int bound = nums[low];
       //  双指针，快速排序，交换不符合条件的数据
       while (left <= right) {
           while (left < high && nums[left] >= bound) left++;
           while (nums[right] < bound) right--;
           if (left < right) 
               swap(nums[left++], nums[right--]);
           else break;
       }
       //  将bound放到换分完成后的两个数组之间，作为边界, 返回bound的位次
       swap(nums[low], nums[right]);
       return right;
   }
};
```



#### [347.前 K 个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)

```wiki
给定一个非空的整数数组，返回其中出现频率前 k 高的元素。

示例 1:
输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]

示例 2:
输入: nums = [1], k = 1
输出: [1]

说明：
你可以假设给定的 k 总是合理的，且 1 ≤ k ≤ 数组中不相同的元素的个数。
你的算法的时间复杂度必须优于 O(n log n) , n 是数组的大小。
```







#### [973.最接近原点的 K 个点](https://leetcode-cn.com/problems/k-closest-points-to-origin/)

```wiki
我们有一个由平面上的点组成的列表 points。需要从中找出 K 个距离原点 (0, 0) 最近的点。
（这里，平面上两点之间的距离是欧几里德距离。）
你可以按任何顺序返回答案。除了点坐标的顺序之外，答案确保是唯一的。

示例 1：
输入：points = [[1,3],[-2,2]], K = 1
输出：[[-2,2]]
解释： 
(1, 3) 和原点之间的距离为 sqrt(10)，
(-2, 2) 和原点之间的距离为 sqrt(8)，
由于 sqrt(8) < sqrt(10)，(-2, 2) 离原点更近。
我们只需要距离原点最近的 K = 1 个点，所以答案就是 [[-2,2]]。

示例 2：
输入：points = [[3,3],[5,-1],[-2,4]], K = 2
输出：[[3,3],[-2,4]]
（答案 [[-2,4],[3,3]] 也会被接受。）
 
提示：
1. 1 <= K <= points.length <= 10000
2. -10000 < points[i][0] < 10000
3. -10000 < points[i][1] < 10000

```





#### [324.摆动排序 II](https://leetcode-cn.com/problems/wiggle-sort-ii/)





#### [75.颜色分类](https://leetcode-cn.com/problems/sort-colors/)







