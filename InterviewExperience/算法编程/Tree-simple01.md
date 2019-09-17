# Tree 简单类型-20











#### [100.相同的树](https://leetcode-cn.com/problems/same-tree/)

```wiki
给定两个二叉树，编写一个函数来检验它们是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

示例 1:
输入:       1         1
          / \       / \
         2   3     2   3

        [1,2,3],   [1,2,3]

输出: true

示例 2:
输入:      1          1
          /           \
         2             2

        [1,2],     [1,null,2]

输出: false

示例 3:
输入:       1         1
          / \       / \
         2   1     1   2

        [1,2,1],   [1,1,2]

输出: false
```



```wiki
解法1：递归方法
如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
```

```c++
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if(p==NULL && q==NULL)
            return true;
        if(p!=NULL && q!=NULL && p->val==q->val)
            return isSameTree(p->left,q->left)&&isSameTree(p->right,q->right);
        else 
          	return false;
    }
};
```



```wiki
解法2：非递归
使用层序遍历，深度优先遍历，中序遍历，前序遍历。
```





#### [101.对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)

```wiki
给定一个二叉树，检查它是否是镜像对称的。

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

    1
   / \
  2   2
 / \ / \
3  4 4  3
但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

    1
   / \
  2   2
   \   \
   3    3
说明:

如果你可以运用递归和迭代两种方法解决这个问题，会很加分。
```

```wiki
方法一、递归
```

```c++
//错误的代码：
class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        if(root==NULL)
            return true;
        if(root->left==NULL && root->right==NULL) //叶子节点
            return true;
        else if(root->left!=NULL && root->right!=NULL && root->left->val==root->right->val)
            return isSymmetric(root->left) & isSymmetric(root->right);
        else
            return false;        
    }
};

/*

    1
   / \
  2   2
 / \  
3  4   
会认为上述的树也是对称的，但此树不是。

*/
```



```wiki
递归：通过镜像树来判断是否对称

若一个二叉树root是镜像对称的，则与克隆体rootcopy有：
1. 根节点相同
2. root每个右子树与rootcopy左子树镜像对称
3. root每个左子树与rootcopy右子树镜像对称
```

```c++
class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        if(root==NULL)
            return true;
        return ismirror(root,root);
    }
    
    bool ismirror(TreeNode* r1, TreeNode* r2){
        if(r1==NULL && r2==NULL)
            return true;
        if(r1==NULL || r2==NULL)
            return false;
        return r1->val==r2->val && ismirror(r1->left,r2->right) && ismirror(r1->right,r2->left);
    }
};
```



```wiki
迭代：
将树的左右节点按相关顺序插入队列中，判断队列中每两个节点是否相等。
```

```c++
class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        if (!root) {
            return true;
        }
        queue<TreeNode*> q;
        q.push(root);
        q.push(root);
        while (!q.empty()) {
            TreeNode *node1 = q.front();
            q.pop();
            TreeNode *node2 = q.front();
            q.pop();
            if (!node1 && !node2) {
                continue;
            }
            if (!node1 || !node2) {
                return false;
            }
            if (node1->val != node2->val) {
                return false;
            }
            q.push(node1->left);
            q.push(node2->right);
            q.push(node1->right);
            q.push(node2->left);          
        }
        return true;
    }
};
/*
每次读取两个节点，并同时插入四个子节点，注意顺序。
*/
```



```wiki
前序遍历的非递归，中序是不对的
遍历两遍：根左右，根右左。叶子节点用0.1表示，然后判断两次遍历的序列是否相等。
```

```c++
class Solution {
public:
    
    void pre_1(TreeNode* pRoot,vector<double>& result)  //根左右
    {
         stack<TreeNode*> s;
         s.push(pRoot);
         while(!s.empty())
         {
             TreeNode* temp = s.top();
             s.pop();
             if(temp!=NULL)
             {
                 result.push_back(temp->val);
                 s.push(temp->right);
                 s.push(temp->left);                 
             }
             else
             {
                 result.push_back(0.1);
             }
         }
    }
    
    void pre_2(TreeNode* pRoot,vector<double>& result)  //根右左
    {
         stack<TreeNode*> s;
         s.push(pRoot);
         while(!s.empty())
         {
             TreeNode* temp = s.top();
             s.pop();
             if(temp!=NULL)
             {
                 result.push_back(temp->val);
                 s.push(temp->left);
                 s.push(temp->right);                 
             }
             else
             {
                 result.push_back(0.1);
             }
         }          
    }
        
    bool isSymmetric(TreeNode* root) {
   
          vector<double> result_1;
          vector<double> result_2;
          pre_1(root,result_1);
          pre_2(root,result_2);
      
          int i=0;
          for(i=0;i<result_1.size();i++)
          {
              if(result_1[i]!=result_2[i])
                  break;
          }

          if(i==result_1.size())
              return 1;
          else
              return 0;                            
    }
};

```

使用string代替遍历后的数组vector<int>，更容易判断相等。<br/>

```c++
class Solution {
public:
    
    void pre_1(TreeNode* pRoot,string &str1)  //根左右
    {
         stack<TreeNode*> s;
         s.push(pRoot);
         while(!s.empty())
         {
             TreeNode* temp = s.top();
             s.pop();
             if(temp!=NULL)
             {
                 str1 += temp->val;
                 s.push(temp->right);
                 s.push(temp->left);                 
             }
             else
             {
                 str1 += '#';
             }
         }
    }
    
    void pre_2(TreeNode* pRoot,string &str2)  //根右左
    {
         stack<TreeNode*> s;
         s.push(pRoot);
         while(!s.empty())
         {
             TreeNode* temp = s.top();
             s.pop();
             if(temp!=NULL)
             {
                 str2 += temp->val;
                 s.push(temp->left);
                 s.push(temp->right);                 
             }
             else
             {
                 str2 += '#';
             }
         }          
    }        
    bool isSymmetric(TreeNode* root) {   
          string str1="";
          string str2="";
          pre_1(root,str1);
          pre_2(root,str2);
          
          if(str1==str2)
              return 1;
          else
              return 0;                            
    }
};
```



#### [104.二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

```wiki
给定一个二叉树，找出其最大深度。
二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，
    3
   / \
  9  20
    /  \
   15   7
返回它的最大深度 3 。
```



```wiki
方法一 用递归实现DFS：
输的最大深度=max(左子树的深度， 右子树的深度)+1；
```

```c++
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if(root==NULL)
            return 0;
        return max(maxDepth(root->left), maxDepth(root->right))+1;
    }
};
```



```wiki
方法二 用栈实现DFS：

```

```c++

```



```wiki
方法三 用队列实现BFS

```







#### [111.二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

```wiki
给定一个二叉树，找出其最小深度。
最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
说明: 叶子节点是指没有子节点的节点。

示例:
给定二叉树 [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回它的最小深度  2.
```



```wiki
错误的解法：
class Solution {
public:
    int minDepth(TreeNode* root) {
        if(root==NULL)
            return 0;      
        return min(minDepth(root->left),minDepth(root->right))+1;
    }
};

当树为一下情况时，
    1
   /
  2
此时树的最小深度为2。
此算法求出的是1. 
```

修改上述代码：<br/>

```wiki
1. 当左右节点均存在时，min(minDepth(root->left),minDepth(root->right))+1;
2. 只有左节点存在时，minDepth(root->left)+1；
		只关注左节点即可
3. 只有右节点存在时，minDepth(root->right)+1；
```

```c++
class Solution {
public:
    int minDepth(TreeNode* root) {
        if(root==NULL)
            return 0;     
        if(root->left && root->right)
            return min(minDepth(root->left),minDepth(root->right))+1;
        else if(root->left && !root->right)
            return minDepth(root->left)+1;
        else
            return minDepth(root->right)+1;
    }
};
```







#### [110.平衡二叉树](https://leetcode-cn.com/problems/balanced-binary-tree/)

```wiki
给定一个二叉树，判断它是否是高度平衡的二叉树。
本题中，一棵高度平衡二叉树定义为：
一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。

示例 1:
给定二叉树 [3,9,20,null,null,15,7]
    3
   / \
  9  20
    /  \
   15   7
返回 true 。

示例 2:
给定二叉树 [1,2,2,3,3,null,null,4,4]
       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
返回 false 。
```











#### [107.二叉树的层次遍历 II](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/)

```wiki
给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

例如：
给定二叉树 [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
返回其自底向上的层次遍历为：
[
  [15,7],
  [9,20],
  [3]
]

```











#### [108.将有序数组转换为二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)

```wiki
将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

示例:
给定有序数组: [-10,-3,0,5,9],
一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：
      0
     / \
   -3   9
   /   /
 -10  5
```











#### [112.路径总和](https://leetcode-cn.com/problems/path-sum/)

```wiki
给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。

说明: 叶子节点是指没有子节点的节点。

示例: 
给定如下二叉树，以及目标和 sum = 22，
              5
             / \
            4   8
           /   / \
          11  13  4
         /  \      \
        7    2      1
返回 true, 因为存在目标和为 22 的根节点到叶子节点的路径 5->4->11->2。
```













#### [226.翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)

```wiki
翻转一棵二叉树。

示例：
输入：
     4
   /   \
  2     7
 / \   / \
1   3 6   9
输出：
     4
   /   \
  7     2
 / \   / \
9   6 3   1
备注:
这个问题是受到 Max Howell 的 原问题 启发的 ：

谷歌：我们90％的工程师使用您编写的软件(Homebrew)，但是您却无法在面试时在白板上写出翻转二叉树这道题，这太糟糕了。
```



















#### [235.二叉搜索树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

```wiki
给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

例如，给定如下二叉搜索树:  root = [6,2,8,0,4,7,9,null,null,3,5]
```

![leetcode235](../../images/leetcode235.png)

```wiki
示例 1:
输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
输出: 6 
解释: 节点 2 和节点 8 的最近公共祖先是 6。

示例 2:
输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
输出: 2
解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。
 
说明:
所有节点的值都是唯一的。
p、q 为不同节点且均存在于给定的二叉搜索树中。
```















#### [257.二叉树的所有路径](https://leetcode-cn.com/problems/binary-tree-paths/)

```wiki
给定一个二叉树，返回所有从根节点到叶子节点的路径。

说明: 叶子节点是指没有子节点的节点。

示例:
输入:

   1
 /   \
2     3
 \
  5
输出: ["1->2->5", "1->3"]

解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3
```













#### [404.左叶子之和](https://leetcode-cn.com/problems/sum-of-left-leaves/)

```wiki
计算给定二叉树的所有左叶子之和。

示例：
    3
   / \
  9  20
    /  \
   15   7
在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24
```











#### [437.路径总和 III](https://leetcode-cn.com/problems/path-sum-iii/)

```wiki
给定一个二叉树，它的每个结点都存放着一个整数值。
找出路径和等于给定数值的路径总数。
路径不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。
二叉树不超过1000个节点，且节点数值范围是 [-1000000,1000000] 的整数。

示例：
root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8
      10
     /  \
    5   -3
   / \    \
  3   2   11
 / \   \
3  -2   1
返回 3。和等于 8 的路径有:

1.  5 -> 3
2.  5 -> 2 -> 1
3.  -3 -> 11
```





#### [501.二叉搜索树中的众数](https://leetcode-cn.com/problems/find-mode-in-binary-search-tree/)

```wiki
给定一个有相同值的二叉搜索树（BST），找出 BST 中的所有众数（出现频率最高的元素）。

假定 BST 有如下定义：
结点左子树中所含结点的值小于等于当前结点的值
结点右子树中所含结点的值大于等于当前结点的值
左子树和右子树都是二叉搜索树

例如：
给定 BST [1,null,2,2],

   1
    \
     2
    /
   2
返回[2].
提示：如果众数超过1个，不需考虑输出顺序

进阶：你可以不使用额外的空间吗？（假设由递归产生的隐式调用栈的开销不被计算在内）
```









#### [530.二叉搜索树的最小绝对差](https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/)

```wiki
给定一个所有节点为非负值的二叉搜索树，求树中任意两节点的差的绝对值的最小值。

示例 :
输入:
   1
    \
     3
    /
   2
输出:
1

解释:
最小绝对差为1，其中 2 和 1 的差的绝对值为 1（或者 2 和 3）。
注意: 树中至少有2个节点。
```











#### [538.把二叉搜索树转换为累加树](https://leetcode-cn.com/problems/convert-bst-to-greater-tree/)

```wiki
给定一个二叉搜索树（Binary Search Tree），把它转换成为累加树（Greater Tree)，使得每个节点的值是原来的节点值加上所有大于它的节点值之和。

例如：
输入: 二叉搜索树:
              5
            /   \
           2     13

输出: 转换为累加树:
             18
            /   \
          20     13
```











#### [543.二叉树的直径](https://leetcode-cn.com/problems/diameter-of-binary-tree/)

```wiki
给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过根结点。

示例 :
给定二叉树

          1
         / \
        2   3
       / \     
      4   5    
返回 3, 它的长度是路径 [4,2,1,3] 或者 [5,2,1,3]。

注意：两结点之间的路径长度是以它们之间边的数目表示。
```











#### [563.二叉树的坡度](https://leetcode-cn.com/problems/binary-tree-tilt/)

```wiki
给定一个二叉树，计算整个树的坡度。
一个树的节点的坡度定义即为，该节点左子树的结点之和和右子树结点之和的差的绝对值。空结点的的坡度是0。
整个树的坡度就是其所有节点的坡度之和。

示例:
输入: 
         1
       /   \
      2     3
输出: 1
解释: 
结点的坡度 2 : 0
结点的坡度 3 : 0
结点的坡度 1 : |2-3| = 1
树的坡度 : 0 + 0 + 1 = 1

注意:
任何子树的结点的和不会超过32位整数的范围。
坡度的值不会超过32位整数的范围。
```











#### [572.另一个树的子树](https://leetcode-cn.com/problems/subtree-of-another-tree/)

```wiki
给定两个非空二叉树 s 和 t，检验 s 中是否包含和 t 具有相同结构和节点值的子树。s 的一个子树包括 s 的一个节点和这个节点的所有子孙。s 也可以看做它自身的一棵子树。

示例 1:
给定的树 s:
     3
    / \
   4   5
  / \
 1   2
给定的树 t：
   4 
  / \
 1   2
返回 true，因为 t 与 s 的一个子树拥有相同的结构和节点值。

示例 2:
给定的树 s：
     3
    / \
   4   5
  / \
 1   2
    /
   0
给定的树 t：
   4
  / \
 1   2
返回 false。
```













