# Tree 简单类型-20









#### [606.根据二叉树创建字符串](https://leetcode-cn.com/problems/construct-string-from-binary-tree/)

```wiki
你需要采用前序遍历的方式，将一个二叉树转换成一个由括号和整数组成的字符串。
空节点则用一对空括号 "()" 表示。而且你需要省略所有不影响字符串与原始二叉树之间的一对一映射关系的空括号对。

示例 1:
输入: 二叉树: [1,2,3,4]
       1
     /   \
    2     3
   /    
  4     
输出: "1(2(4))(3)"

解释: 原本将是“1(2(4)())(3())”，
在你省略所有不必要的空括号对之后，
它将是“1(2(4))(3)”。

示例 2:
输入: 二叉树: [1,2,3,null,4]
       1
     /   \
    2     3
     \  
      4 
输出: "1(2()(4))(3)"

解释: 和第一个示例相似，
除了我们不能省略第一个对括号来中断输入和输出之间的一对一映射关系。
```







#### [617.合并二叉树](https://leetcode-cn.com/problems/merge-two-binary-trees/)

```wiki
给定两个二叉树，想象当你将它们中的一个覆盖到另一个上时，两个二叉树的一些节点便会重叠。

你需要将他们合并为一个新的二叉树。合并的规则是如果两个节点重叠，那么将他们的值相加作为节点合并后的新值，否则不为 NULL 的节点将直接作为新二叉树的节点。

示例 1:
输入: 
	Tree 1                     Tree 2                  
          1                         2                             
         / \                       / \                            
        3   2                     1   3                        
       /                           \   \                      
      5                             4   7                  
输出: 
合并后的树:
	     3
	    / \
	   4   5
	  / \   \ 
	 5   4   7
注意: 合并必须从两个树的根节点开始。
```









#### [637.二叉树的层平均值](https://leetcode-cn.com/problems/average-of-levels-in-binary-tree/)

```wiki
给定一个非空二叉树, 返回一个由每层节点平均值组成的数组.

示例 1:
输入:
    3
   / \
  9  20
    /  \
   15   7
输出: [3, 14.5, 11]

解释:
第0层的平均值是 3,  第1层是 14.5, 第2层是 11. 因此返回 [3, 14.5, 11].

注意：
节点值的范围在32位有符号整数范围内。
```







#### [653.两数之和 IV - 输入 BST](https://leetcode-cn.com/problems/two-sum-iv-input-is-a-bst/)

```wiki
给定一个二叉搜索树和一个目标结果，如果 BST 中存在两个元素且它们的和等于给定的目标结果，则返回 true。

案例 1:
输入: 
    5
   / \
  3   6
 / \   \
2   4   7
Target = 9
输出: True
 
案例 2:
输入: 
    5
   / \
  3   6
 / \   \
2   4   7
Target = 28
输出: False
```







#### [669.修剪二叉搜索树](https://leetcode-cn.com/problems/trim-a-binary-search-tree/)

```wiki
给定一个二叉搜索树，同时给定最小边界L 和最大边界 R。通过修剪二叉搜索树，使得所有节点的值在[L, R]中 (R>=L) 。你可能需要改变树的根节点，所以结果应当返回修剪好的二叉搜索树的新的根节点。

示例 1:

输入: 
    1
   / \
  0   2

  L = 1
  R = 2

输出: 
    1
      \
       2
示例 2:

输入: 
    3
   / \
  0   4
   \
    2
   /
  1

  L = 1
  R = 3

输出: 
      3
     / 
   2   
  /
 1
```











#### [671.二叉树中第二小的节点](https://leetcode-cn.com/problems/second-minimum-node-in-a-binary-tree/)

```wiki
给定一个非空特殊的二叉树，每个节点都是正数，并且每个节点的子节点数量只能为 2 或 0。如果一个节点有两个子节点的话，那么这个节点的值不大于它的子节点的值。 

给出这样的一个二叉树，你需要输出所有节点中的第二小的值。如果第二小的值不存在的话，输出 -1 。

示例 1:
输入: 
    2
   / \
  2   5
     / \
    5   7
输出: 5
说明: 最小的值是 2 ，第二小的值是 5 。

示例 2:
输入: 
    2
   / \
  2   2
输出: -1
说明: 最小的值是 2, 但是不存在第二小的值。
```









#### [687.最长同值路径](https://leetcode-cn.com/problems/longest-univalue-path/)







#### [429.N叉树的层序遍历](https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/)







#### [559.N叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-n-ary-tree/)









#### [589.N叉树的前序遍历](https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/)









#### [590.N叉树的后序遍历](https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/)









#### [700.二叉搜索树中的搜索](https://leetcode-cn.com/problems/search-in-a-binary-search-tree/)











#### [783.二叉搜索树结点最小距离](https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/)









#### [872.叶子相似的树](https://leetcode-cn.com/problems/leaf-similar-trees/)









#### [897.递增顺序查找树](https://leetcode-cn.com/problems/increasing-order-search-tree/)









#### [938.二叉搜索树的范围和](https://leetcode-cn.com/problems/range-sum-of-bst/)









#### [965.单值二叉树](https://leetcode-cn.com/problems/univalued-binary-tree/)









#### [993.二叉树的堂兄弟节点](https://leetcode-cn.com/problems/cousins-in-binary-tree/)









#### [1022.从根到叶的二进制数之和](https://leetcode-cn.com/problems/sum-of-root-to-leaf-binary-numbers/)









