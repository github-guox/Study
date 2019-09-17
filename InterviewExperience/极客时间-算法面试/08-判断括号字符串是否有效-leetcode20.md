# 判断括号字符串是否有效-leetcode20.

### 目录：

[20.有效的括号](#20.有效的括号) <br/>
[22.括号生成](#22.括号生成) <br/>
[32.最长有效括号](#32.最长有效括号) <br/>
[301.删除无效的括号](#301.删除无效的括号) not ok<br/>
[1003.检查替换后的词是否有效](#1003.检查替换后的词是否有效) not ok<br/>



#### [20.有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

```wiki
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

示例 1:
输入: "()"
输出: true

示例 2:
输入: "()[]{}"
输出: true

示例 3:
输入: "(]"
输出: false

示例 4:
输入: "([)]"
输出: false

示例 5:
输入: "{[]}"
输出: true
```

**方法一：使用stack结构** <br/>

```c++
class Solution {
public:
    bool isValid(string s) {
        int len = s.length(); //或者s.size()

        stack<char> sta;
        for(int i=0;i<len;i++){
            if(sta.size()!=0 ){
                if(s[i]==')' && sta.top()=='(')
                    sta.pop();
                else if (s[i]==']' && sta.top()=='[')
                    sta.pop();
                else if (s[i]=='}' && sta.top()=='{')
                    sta.pop();
                else
                    sta.push(s[i]);   //缺点：在出现右括号且不匹配时，不能直接返回false，仍会直接push        
            }else{
                sta.push(s[i]);
            }            
        }
        
        if(sta.empty())
            return true;
        else
            return false;
        
    }
};
```

左括号直接push，右括号判断是否匹配。<br/>

**实现二：** <br/>

```c++
class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for(int i=0;i<s.size();i++)
        {
            if(st.empty()&&(s[i]==')'||s[i]=='}'||s[i]==']'))
               return false;    //栈空，遇到右边的括号，直接返回false
            if(s[i]==')'||s[i]=='}'||s[i]==']')  //遇到右边的括号，判断栈顶是否
               {                                 //是对应的左边的括号。
                   if(s[i]-st.top()==1||s[i]-st.top()==2)
                       st.pop();   //对应的话，栈顶元素退栈。
                   else
                       return false;  //不对应的话，直接返回false。
               }
            else
               st.push(s[i]);   //遇到左边的括号，进栈。
        }
        return st.empty();  //栈空，说明括号都匹配了。
    }
};

```

s[i]-st.top()==2 是因为ASCII中]比[，{ 比 }的值大2。<br/>

**实现三：利用map建立哈希表，实现括号一一对应关系** <br/>

```c++
class Solution {
public:
    bool isValid(string s) {
        if(s.length()%2!=0) return false;//一但是奇数说明不是有效的括号
        map<char,char> wordbook;//建立哈希表
        //wordbook.insert(map<char,char>::value_type(')','('));
        //wordbook.insert(map<char,char>::value_type(']','['));
        //wordbook.insert(map<char,char>::value_type('}','{'));
     		wordbook.insert(make_pair(')','('));
        wordbook.insert(make_pair(']','['));
        wordbook.insert(make_pair('}','{'));
        stack<char> mystack;//建立栈
        for(int i=0;i<s.length();i++)
        {
            if(s[i]=='['||s[i]=='{'||s[i]=='(')//匹配到左括号
                mystack.push(s[i]);//放入栈中
            else if(s[i]==']'||s[i]=='}'||s[i]==')')//匹配到右括号
            {
                if(mystack.empty()) return false;
                //匹配到右括号，栈中应该存在左括号。否则就是无效的括号
                if(wordbook[s[i]]==mystack.top())//与栈顶元素进行匹配
                {
                    mystack.pop();//匹配成功删除栈顶元素
                    continue;
                }
                else return false;
            }
        }
        return mystack.empty();
    }
};
```



#### [22.括号生成](https://leetcode-cn.com/problems/generate-parentheses/)

**回溯算法** <br/>

```wiki
给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。

例如，给出 n = 3，生成结果为：
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
```

DFS+少量的剪枝，剪枝的条件为：左括号的数目一旦小于右括号的数目，以及，左括号的数目和右括号数目均大于n。<br/>

```c++
class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> res;
        generate(res,"",0,0,n);
        return res;
    }
    
    void generate(vector<string>& res,string str,int l,int r,int n){
        if(l>n || r>n || r>l) return; //回溯出的结果是错误的，舍弃
        if(l==n && r==n){
            res.push_back(str);
            return;
        }
        generate(res,str+"(",l+1,r,n);
        generate(res,str+")",l,r+1,n);
        return;
    }
};
```



#### [32.最长有效括号](https://leetcode-cn.com/problems/longest-valid-parentheses/)

```wiki
给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。

示例 1:
输入: "(()"
输出: 2
解释: 最长有效括号子串为 "()"

示例 2:
输入: ")()())"
输出: 4
解释: 最长有效括号子串为 "()()"
```

**动态规划** <br/>

```wiki
创建动态规划数组dp[n],dp[i]为以index=i为结尾的最大有效括号范围。
所以凡是s[i]=='('，肯定不能作为结尾,dp[i]=0；

如果s[i]==')',有可能作为结尾
寻找i对应的索引：pre = i-1- dp[i-1];
若pre对应'('，则匹配。否则不匹配，dp[i]=0;
匹配时，如果pre前面还有元素，要加上其dp值，即：dp[i] = dp[i-1] + 2 + dp[pre-1];
没有元素，就在dp[i-1]的基础上加2。
```



```c++
class Solution {
public:
    int longestValidParentheses(string s) {
        int n = s.size();
        int ans = 0;
        vector<int> dp(n,0);
        
        for(int i = 1; i < n; ++i){
            if(s[i] == '('){  //匹配的括号串，不可能以(结束
                dp[i] = 0;
            }else{  //s[i]为右括号时，取决于前一个是'('还是')'。
                int pre = i-1- dp[i-1]; //当i-1为')'时，与i匹配的元素的索引
                //如果s[i-1]=='(',dp[i-1]=0,pre=i-1
                //如果s[i-1]==')',pre为i对应匹配位置。
                if(pre >= 0 && s[pre] == '('){
                    if(pre > 0){
                        dp[i] = dp[i-1] + 2 + dp[pre-1];
                        //此处当i-1为'('，dp[i-1]=0；当i-1为')'的时候，为此时的最长字符串。
                    }else{
                        dp[i] = dp[i-1] + 2;
                    }
                }//没有匹配，使用默认值0
            }
        }        
        for(int i = 0;i < n; ++i){
            ans = max(ans,dp[i]);
        }      
        return ans;
    }
};

链接：https://leetcode-cn.com/problems/longest-valid-parentheses/solution/dp-er-shua-by-mike-meng/
```



一个错误的实现：

```c++
class Solution {
public:
    int longestValidParentheses(string s) {
        int n = s.size();
        int ans = 0;
        vector<int> dp(n,0);
        
        for(int i = 1; i < n; ++i){
            if(s[i] == '('){  //匹配的括号不可能以(结束
                dp[i] = 0;
            }else{  //s[i]为右括号时，取决于前一个是'('还是')'。
                if(s[i-1]=='(')
                    dp[i] = dp[i-2] + 2; //i-2会超索引 
                    //注意是i-2而不是i-1，i-1是左括号一定为0，不能知道与i-2是否连续
                else{
                    int pre = i-1- dp[i-1]; //当i-1为')'时，与i匹配的元素的索引
                    if(pre>0 && s[pre] == '(')
                        dp[i] = dp[i-2] + 2 + dp[pre-1];
                    else if(pre==0 && s[pre] == '(')
                        dp[i] = dp[i-2] + 2;
                    else
                        dp[i] = 0;
                    }
                }
        }        
    
        for(int i = 0;i < n; ++i)
            ans = max(ans,dp[i]);
    
        return ans;
    }
};
```

由于i是从1开始的，所以可以保证i-1>=0，但是不能保证i-2>=0。<br/>



#### [301.删除无效的括号](https://leetcode-cn.com/problems/remove-invalid-parentheses/)













#### [1003.检查替换后的词是否有效](https://leetcode-cn.com/problems/check-if-word-is-valid-after-substitutions/)