# 链表（Linked List）







#### [876.链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

```wiki
给定一个带有头结点 head 的非空单链表，返回链表的中间结点。
如果有两个中间结点，则返回第二个中间结点。

示例 1：
输入：[1,2,3,4,5]
输出：此列表中的结点 3 (序列化形式：[3,4,5])
返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
注意，我们返回了一个 ListNode 类型的对象 ans，这样：
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next = NULL.

示例 2：
输入：[1,2,3,4,5,6]
输出：此列表中的结点 4 (序列化形式：[4,5,6])
由于该列表有两个中间结点，值分别为 3 和 4，我们返回第二个结点。
 
提示：
给定链表的结点数介于 1 和 100 之间。
```

```c++
//使用双指针，一个每次走一步，一个每次走两步。
class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        if(head==NULL)
            return head;
        ListNode* f = head;
        ListNode* b = head;
        while(b && b->next){
            f = f->next;
            b = b->next;
            if(b)
                b = b->next;
        }
        return f;
    }
};
/*
奇数时，如果b->next为空，则b到达最后一个节点，f为中点。
偶数时，如果b为空，则b到达最后一个节点的下一个（NULL）位置，f为中点。
*/
```



#### [203.移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/)

```wiki
删除链表中等于给定值 val 的所有节点。

示例:
输入: 1->2->6->3->4->5->6, val = 6
输出: 1->2->3->4->5
```

错误的代码：<br/>

```c++
class Solution {
public:
    ListNode* removeElements(ListNode* head, int val) {
        if(head==NULL)
            return head;
        ListNode* pre = head; //pre指向第一个元素
        ListNode* curr = head->next;  //curr指向第二个元素，如果第一个元素是要删除的
                                     //当前算法会忽略第一个元素
        while(curr){
            if(curr->val==val){ //删除当前元素
                ListNode* todel = curr;
                pre->next = curr->next;
                curr = curr->next;
                                
            }else{
                pre = curr;
                curr = curr->next;
            }
        }
        return head;
    }
};
```

```wiki
错误的例子
输入
[7,2,7,3,4,5,6]
7
输出
[7,2,3,4,5,6]
预期结果
[2,3,4,5,6]
```

说明，head是指向第一个节点的 。<br/>

```c++
class Solution {
public:
    ListNode* removeElements(ListNode* head, int val) {
        if(head==NULL)
            return head;
        ListNode* newHead = new ListNode(-1);
        newHead->next = head;
        ListNode* pre = newHead;
        ListNode* curr = head;
        while(curr){
            if(curr->val==val){ //删除当前元素
                //ListNode* todel = curr;
                pre->next = curr->next;
                curr = curr->next;
                                
            }else{
                pre = curr;
                curr = curr->next;
            }
        }
        return newHead->next;
    }
};
```



#### [19.删除链表的倒数第N个节点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

```wiki
给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

示例：
给定一个链表: 1->2->3->4->5, 和 n = 2.
当删除了倒数第二个节点后，链表变为 1->2->3->5.

说明：
给定的 n 保证是有效的。

进阶：
你能尝试使用一趟扫描实现吗？
```

```c++
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        if(head==NULL)
            return head;
        //删除倒数第n个应该找倒数第n-1个元素
        //由于是删除元素，应该保存被删除元素的前一个节点，这里直接找前一个节点即可。
        ListNode* newHead = new ListNode(-1);
        newHead->next = head;
        ListNode* f = newHead; //有可能会删除头节点，因此f初始化为newHead而不是head
        ListNode* b = head;
        //b先走n步
        while(b && (--n)){
            b = b->next;
        }        
        while(b && b->next){
            f = f->next;
            b = b->next;
        }        
        f->next = f->next->next;
        return newHead->next;        
    }
};
```

建立了一个前头节点，以便于对头节点的删除<br/>



#### [24.两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

```wiki
给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

示例:

给定 1->2->3->4, 你应该返回 2->1->4->3.
```

```c++
class Solution {
public:
    //使用pre保存前一个节点
    ListNode* swapPairs(ListNode* head) {
        if(head==NULL || head->next==NULL)  //为空或只有一个元素时，一个元素因为有head = head->next;不直接返回会报错
            return head;
        ListNode* pre = head;
        ListNode* curr = head; //放到head = head->next;前面
        head = head->next;
        while(curr && curr->next){
            ListNode* pnext = curr->next;
            ListNode* tmp = pnext->next;
            pre->next = pnext;
            pnext->next = curr;
            curr->next = tmp;
            if(tmp && tmp->next){
                pre = curr;
                curr = tmp;
            }else{
                break;
            }    
        }
        return head;
    }
};
```

可以尝试新加一个头头节点试试。<br/>



#### [61.旋转链表](https://leetcode-cn.com/problems/rotate-list/)

```wiki
给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。

示例 1:
输入: 1->2->3->4->5->NULL, k = 2
输出: 4->5->1->2->3->NULL
解释:
向右旋转 1 步: 5->1->2->3->4->NULL
向右旋转 2 步: 4->5->1->2->3->NULL

示例 2:
输入: 0->1->2->NULL, k = 4
输出: 2->0->1->NULL
解释:
向右旋转 1 步: 2->0->1->NULL
向右旋转 2 步: 1->2->0->NULL
向右旋转 3 步: 0->1->2->NULL
向右旋转 4 步: 2->0->1->NULL
```

```wiki
我的想法
1. 与“删除链表的倒数第N个节点”题目类似，使用双指针
2. k=1时，寻找倒数第1个节点的前一个节点。k=2时，寻找倒数第2个节点的前一个节点。
3. 考虑k很大时，要循环很多遍：用一个数记录初始k，如t=k;没走一步k--，当走到结束的时候，可仍然大于0，则使用 k = t % (t-k+1).然后重新从头指针走k步。
```



```wiki
思路一：
1.求链表长度，然后用k膜一下长度，这样才是真正的右移k位
2.双指针，快指针先走k步，然后再和慢指针一起一次走一步，当快指针到结尾的时候，慢指针到倒数第k个节点
3.这个时候指来指去就行了
```

```c++
class Solution {
public:
        ListNode* rotateRight(ListNode* head, int k) {
        if(head == NULL || head->next == NULL) return head;
        int length = 0;
        ListNode* cur = head;
        while(cur != NULL){
            cur = cur->next;
            length++;
        }
        cur = head;
        k %= length;
        
        ListNode* lastK = head;
        for(int i = 0; i < k; i++){
            cur = cur->next;
        }
        while(cur->next != NULL){
            cur = cur->next;
            lastK = lastK->next;
        }
        
        cur->next = head;
        ListNode* res = lastK->next;
        lastK->next = NULL;
        return res;
        
    }
};
```



```wiki
思路二：
取得链表长度len
让它成环（即tail -> next = head)
向右移动k步相当于head顺着指针路线走len-k步
然后向右移动len-1步找到tail节点,让他指向nullptr
```

```c++
class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if(k == 0 || !head || !(head -> next))  return head;
        ListNode *temp = head;
        int len = 0;
        while(temp){
            ++ len;
            temp = temp -> next;
        }
        k = k % len;
        temp = head;
        for(int i = len - 1; i > 0; -- i)   temp = temp -> next;
        temp -> next = head;
        temp = head;
        for(int j = len - k; j > 0; -- j)   temp = temp -> next;
        head = temp;
        for(int m = len - 1; m > 0; -- m)   temp = temp -> next;
        temp -> next = nullptr;
        return head;
    }
};
```



#### [83.删除排序链表中的重复元素](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)

```wiki
给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

示例 1:
输入: 1->1->2
输出: 1->2

示例 2:
输入: 1->1->2->3->3
输出: 1->2->3
```

```wiki
解法1：直接法（一个指针操作）
如果当前指针与下一指针 值相等，则删除下一个节点。
如果当前指针与下一指针不相等，则当前指针向下移动一个位置。
```

```c++
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        if(head==NULL || head->next==NULL)
            return head;
        
        ListNode* p = head;  //头节点不会被删除，所以不用考虑增加头头节点
        while(p && p->next){
            if(p->val==p->next->val)
                p->next = p->next->next;
            else
                p = p->next;
        }
        return head;
    }
};
```



```wiki
解法2：递归法
1. 找终止条件：当head指向链表只剩一个元素的时候，自然是不可能重复的，因此return
2. 想想应该返回什么值：应该返回的自然是已经去重的链表的头节点
3. 每一步要做什么：宏观上考虑，此时head.next已经指向一个去重的链表了，而根据第二步，我应该返回一个去重的链表的头节点。因此这一步应该做的是判断当前的head和head.next是否相等，如果相等则说明重了，返回head.next，否则返回head

```

```c++
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        if(!head||!head->next)
            return head;
        head->next=deleteDuplicates(head->next);
        if(head->val==head->next->val) head=head->next;
        return head;
    }
};
```



#### [82.删除排序链表中的重复元素 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)

```wiki
给定一个排序链表，删除所有含有重复数字的节点，只保留原始链表中 没有重复出现 的数字。

示例 1:
输入: 1->2->3->3->4->4->5
输出: 1->2->5

示例 2:
输入: 1->1->1->2->3
输出: 2->3
```



```wiki
1. 可能会删除首元素，建立头头节点。
2. while循环找到所有的重复元素
3. 对一个节点来说有两种情况（注意区分两种情况）：
	- 该节点没有重复节点，pre后移1位，curr后移1位。
	- 该节点有重复节点，pre不移动直接指向p，curr移动到p。
```

```c++
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        if(head==NULL || head->next==NULL)
            return head;
        ListNode* newHead = new ListNode(-1);
        newHead->next = head;
        
        ListNode* pre = newHead;
        ListNode* curr = head;
        while(curr){
            ListNode* p = curr; 
            while(p){ //p最终会移动到第一个不相等元素的位置
                if(p->val == curr->val){
                    p = p->next;
                }else{
                    break;
                }
            }
            if(curr->next != p) //两个元素不相邻时，说明有重复元素
                pre->next = p;  //删除重复的元素
            else
                pre = curr; //前指针向后移动一位
            curr = p;
        }
        return newHead->next;
    }
};
```



#### [92.反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

```wiki
反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。

说明:
1 ≤ m ≤ n ≤ 链表长度。

示例:
输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL
```











#### [109.有序链表转换二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/)













#### [147.对链表进行插入排序](https://leetcode-cn.com/problems/insertion-sort-list/)













#### [148.排序链表](https://leetcode-cn.com/problems/sort-list/)











#### [2.两数相加](https://leetcode-cn.com/problems/add-two-numbers/)

```wiki
给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
```











#### [21.合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

```wiki
将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

示例：
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```











#### [23.合并K个排序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)

```wiki
合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。

示例:
输入:
[
  1->4->5,
  1->3->4,
  2->6
]
输出: 1->1->2->3->4->4->5->6
```







#### [25.K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)

```wiki
给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。
k 是一个正整数，它的值小于或等于链表的长度。
如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

示例 :
给定这个链表：1->2->3->4->5
当 k = 2 时，应当返回: 2->1->4->3->5
当 k = 3 时，应当返回: 3->2->1->4->5

说明 :
你的算法只能使用常数的额外空间。
你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
```





#### [86.分隔链表](https://leetcode-cn.com/problems/partition-list/)

```wiki
给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于 x 的节点都在大于或等于 x 的节点之前。
你应当保留两个分区中每个节点的初始相对位置。

示例:
输入: head = 1->4->3->2->5->2, x = 3
输出: 1->2->2->4->3->5
```







#### [143.重排链表](https://leetcode-cn.com/problems/reorder-list/)

```wiki
给定一个单链表 L：L0→L1→…→Ln-1→Ln ，
将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…
你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

示例 1:
给定链表 1->2->3->4, 重新排列为 1->4->2->3.

示例 2:
给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.
```









