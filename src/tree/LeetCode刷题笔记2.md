> 今天毛毛张分享的关于求解二叉树属性的4道LeetCode算法题，每道题目都是一题多解，并配上5道练习题，标签全部为简单题，赶快进来看看是不是真的简单吧！

[toc]

# 0.前言

- 今天毛毛张要分享的毛毛张整理的关于二叉树的比较基础的LeetCode算法题，这几道题目的本质还是在考察大家对于二叉树的遍历方式是否熟悉，同时帮助大家巩固二叉树的递归法和迭代法如何实现，并对每种方法的代码加上了详细的注释！
- 如果还不熟悉的小伙伴可以先学习毛毛张的这篇博客之后再来做下面的题目：[LeetCode刷题笔记：二叉树前序遍历、中序遍历、后序遍历和层序遍历 | 递归法 | 迭代法 | 统一迭代法 | 深度优先搜索 | 广度优先搜索](https://blog.csdn.net/weixin_48235955/article/details/139028925)

- 毛毛张在整理过程中，比较注重这些题之间的相关性，下面的这几道题目是关于二叉树的基础操作，并且在LeetCode上面的标签都是简单题目，但是有很多细节需要注意
- **在做下面几题之前，毛毛张想对下面的方法首先进行总结**
    - **深度优先遍历：**
        - **递归法：代码随想录的三步走方法论**
            - **前序遍历**
            - **中序遍历**
            - **后序遍历**
        - **迭代法：深度优先搜索使用迭代需要借助栈**
    - **广度优先搜索**
        - **递归法**
        - **迭代法：广度优先搜索使用迭代需要借助队列**
- 这个方法的总结也为大家在做一题多解提供了思路

# 1.[226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/)

> LeetCode难度标签：简单

## 1.1 题目说明

给你一棵二叉树的根节点 `root` ，翻转这棵二叉树，并返回其根节点。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/03/14/invert1-tree.jpg#pic_center)

```
输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2021/03/14/invert2-tree.jpg#pic_center)

```
输入：root = [2,1,3]
输出：[2,3,1]
```

**示例 3：**

```
输入：root = []
输出：[]
```

**提示：**

- 树中节点数目范围在 `[0, 100]` 内
- `-100 <= Node.val <= 100`

## 1.2 题解

- 实现二叉树的翻转，本质只需要交换每一个结点的左右子树就实现了整棵树的翻转

- 因此只需要对二叉树进行遍历，然后在遍历过程中对每个结点的左右子树进行交换就可以了

- 二叉树有四种遍历方式：前序遍历、中序遍历、后序遍历以及层序遍历

- **需要注意的是，唯独不可以的就是中序遍历**，以下图为例，中序遍历首先遍历的节点的是结点`4`，然后遍历结点`2`，并翻转节点`2`，翻转之后，此时结果如右图，按照中序遍历的顺序，**下面需要遍历右结点，此时右节点还是`2`，由于交换结点的时机在中间，导致结点`2`重复被反转，而结点`7`没有实现翻转**。

    ![img](https://assets.leetcode.com/uploads/2021/03/14/invert1-tree.jpg#pic_center)

- 说完上面的注意事项之后，下面就来看看几种比较常见的解法吧！👇

### 1.2.1 前序遍历+递归法

```java
class Solution {
    //递归法 三步走
    //1.确定形参和返回值：使用题目确定的形参的返回值
    public TreeNode invertTree(TreeNode root) {
        //2.确定终止条件
        if(root == null) return null;

        //3.确定单层递归逻辑
        //使用前序遍历，首先叫转中间节点的左右节点
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        //左
        invertTree(root.left);
        //右
        invertTree(root.right);
        //返回结果
        return root;
    }
}
```

### 1.2.2 前序遍历+迭代法

```java
class Solution {
    public TreeNode invertTree(TreeNode root) {
        //迭代法 迭代遍历 借助栈
        //所有首先创建栈，存储中间遍历结果
        Stack<TreeNode> stack = new Stack<>();
        //新建TreeNode对象，表示当前处理的节点，并初始化为根节点
        TreeNode cur = root;
        //根节点入栈
        stack.push(cur);
        //开始进行迭代，首先判断根节点是否为空,如果不为空就进入循环
        while(cur != null && !stack.isEmpty()){
            //这里采用前序遍历的迭代法
            //中
            //弹出栈顶元素，并交换该节点的左右子树
            cur = stack.pop();
            TreeNode temp = cur.left;
            cur.left = cur.right;
            cur.right = temp;
            //左
            if(cur.left != null) stack.push(cur.left);
            if(cur.right != null) stack.push(cur.right);
        }

        //返回结果
        return root;
    }
}
```

### 1.2.3 层序遍历+迭代法

```java
class Solution {
    public TreeNode invertTree(TreeNode root) {
        //迭代法 层序遍历 借助队列
        //所有首先创建队列，存储中间遍历结果
        Queue<TreeNode> queue = new LinkedList<>();
        //首先判断根节点，根节点不为空就入队
        if(root != null) queue.offer(root);
        //开始层序遍历迭代
        while(!queue.isEmpty()){
            //首先获取每一层的节点数量
            int size = queue.size();
            for(int i = 0;i<size;i++){
                //出队，创建临时变量接收出队的节点
                TreeNode cur = queue.poll();
                //交换该节点的左右子树
                TreeNode temp = cur.left;
                cur.left = cur.right;
                cur.right = temp;

                //交换完之后，把该节点的左右节点入队，下一层的时候会遍历
                //这一步的入队操作在交换左右子树之前都可以
                if(cur.left != null) queue.offer(cur.left);
                if(cur.right != null) queue.offer(cur.right);
            }
        }
        //返回结果
        return root;
    }
}
```

# 2.[101. 对称二叉树](https://leetcode.cn/problems/symmetric-tree/)

> LeetCode难度标签：简单

## 2.1 题目说明

给你一个二叉树的根节点 `root` ， 检查它是否轴对称。

**示例 1：**

![img](https://pic.leetcode.cn/1698026966-JDYPDU-image.png#pic_center)

```
输入：root = [1,2,2,3,4,4,3]
输出：true
```

**示例 2：**

![img](https://pic.leetcode.cn/1698027008-nPFLbM-image.png#pic_center)

```
输入：root = [1,2,2,null,3,null,3]
输出：false
```

**提示：**

- 树中节点数目在范围 `[1, 1000]` 内
- `-100 <= Node.val <= 100`

**进阶：你可以运用递归和迭代两种方法解决这个问题吗？**

## 2.2 题解

- 这个题目有两个关键点：一个是遍历的顺序，另一个是遍历终止的条件

- 判断一颗二叉树是否为对称二叉树，因此我们可以对称遍历这棵二叉树，所谓的对称遍历，意味着遍历左右子树的顺序应该相反

- 举例说明：如下图，以下面最小的两个子树为例，**对于根节点左子树的最小左子树，按照前序遍历中左右的顺序为：3-->5-->6，那么对于根节点右子树的最小右子树，需要按照中右左的顺序进行遍历，才能得到相同的顺序为：3-->5-->6**

    <img src="https://cdn.jsdelivr.net/gh/zzxrepository/image_bed@master/Leetcode2/image-20240602184102445.png#pic_center" alt="image-20240602184102445" />

- 遍历的顺序这个问题说完了，我们来看以下遍历时判定的终止条件：

    - 左节点为空，右节点不为空，不对称，return false
    - 左不为空，右为空，不对称 return false
    - 左右都为空，对称，返回true
    - 如果左右结点都不为空，就需要判断两个结点的值是否相等，如果不相等，就返回false

    ![img](https://pic.leetcode.cn/1698027008-nPFLbM-image.png#pic_center)

- 下面来看看代码怎么写吧！

### 2.2.1 递归法

```java
class Solution {
    public boolean isSymmetric(TreeNode root) {
        //首先判断特殊情况
        if(root == null) return true;
        //开始递归
        return compare(root.left,root.right);
    }
    //递归法 三步走
    //1.确定形参和返回值，在这个题目需要新建函数
    public boolean compare(TreeNode left,TreeNode right){
        //2.确定终止条件
        if(left == null && right == null) return true;
        else if(left != null && right == null) return false;
        else if(left == null && right != null) return false;

        //3.确定单层递归逻辑
        //能运行到这一步，说明两个节点都不为空
        //首先需要判断两个节点的值是否相等,创建变量记录该结果
        boolean res1 = false;
        if(left.val == right.val) res1 = true;

        //然后判断left.left节点和right.right是否相等
        boolean res2 = compare(left.left,right.right);

        //接着判断left.right节点和right.left是否相等
        boolean res3 = compare(left.right,right.left);

        //如果上面三个结果的值均为true,这个节点才是对称节点
        return res1 && res2 && res3;

//上面分开写比较好理解
//其实最后可以综合再一次，这样的预判速度比上面的要快
//return left.val == right.val && compare(left.left,right.right) && compare(left.right,right.left);
    }
}
```

> 你们觉得这个代码是什么遍历呢？

### 2.2.2 迭代法

```java
class Solution {
    public boolean isSymmetric(TreeNode root) {
        //迭代法 借助栈
        //首先创建栈，存储遍历的中间节点
        Stack<TreeNode> stack = new Stack<>();
        //判断根节点是否空，如果不为空，按照左右的顺序入栈
        if(root != null){
            stack.push(root.left);
            stack.push(root.right);
        }
        //开始迭代进行判断
        while(!stack.isEmpty()){
            //弹出栈顶的两个元素
            //首先弹出的顺序是右左
            TreeNode right = stack.pop();
            TreeNode left = stack.pop();
            //如果两个节点为空，说明是对称的
            if(right == null && left == null) continue;
            //如果左右一个节点不为空，或者都不为空但数值不相同，返回false
            else if(left != null && right == null) return false;
            else if(left == null && right != null) return false;
            else if(left.val != right.val) return false;
            //毛毛张在这里给大家留个问题：上面三行可以怎么合并？
            
            //判断完毕之后按照顺序入栈
            stack.push(left.left);      //左节点左孩子
            stack.push(right.right);    //右节点右孩子
            stack.push(left.right);     //左节点右孩子
            stack.push(right.left);     //右节点左孩子
        }
        //如果迭代完毕没有返回false，那表明这棵树是对称的，返回true
        return true;
    }
}
```

## 2.3 练习

- 大家在做完上面这个题目之后，下面是LeetCode上面两道类似的题目，大家可以尝试着做一下，做完再看答案

### 2.3.1 [100. 相同的树](https://leetcode.cn/problems/same-tree/)

> LeetCode难度标签：简单

#### 题目描述

给你两棵二叉树的根节点 `p` 和 `q` ，编写一个函数来检验这两棵树是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/12/20/ex1.jpg#pic_center)

```
输入：p = [1,2,3], q = [1,2,3]
输出：true
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2020/12/20/ex2.jpg#pic_center)

```
输入：p = [1,2], q = [1,null,2]
输出：false
```

**示例 3：**

![img](https://assets.leetcode.com/uploads/2020/12/20/ex3.jpg#pic_center)

```
输入：p = [1,2,1], q = [1,1,2]
输出：false
```

**提示：**

- 两棵树上的节点数目都在范围 `[0, 100]` 内
- `-104 <= Node.val <= 104`

#### 题解

```java
class Solution {
    //递归法 三步走
    //1.使用题目确定的形参和返回值
    public boolean isSameTree(TreeNode p, TreeNode q) {
        //2.确定终止条件
        if(p == null && q == null){
            return true;
        }else if(p == null && q != null){
            return false;
        }else if(p != null && q == null){
            return false;
        }else if(p.val != q.val){
            return false;
        }

        //3.确定单层的递归逻辑
        return isSameTree(p.left,q.left) && isSameTree(p.right,q.right);
    }
}
```

### 2.3.2 [572. 另一棵树的子树](https://leetcode.cn/problems/subtree-of-another-tree/)

> LeetCode难度标签：简单，但是并不是那么简单

#### 题目描述

给你两棵二叉树 `root` 和 `subRoot` 。检验 `root` 中是否包含和 `subRoot` 具有相同结构和节点值的子树。如果存在，返回 `true` ；否则，返回 `false` 。

二叉树 `tree` 的一棵子树包括 `tree` 的某个节点和这个节点的所有后代节点。`tree` 也可以看做它自身的一棵子树。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/04/28/subtree1-tree.jpg#pic_center)

```
输入：root = [3,4,5,1,2], subRoot = [4,1,2]
输出：true
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2021/04/28/subtree2-tree.jpg#pic_center)

```
输入：root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
输出：false
```

**提示：**

- `root` 树上的节点数量范围是 `[1, 2000]`
- `subRoot` 树上的节点数量范围是 `[1, 1000]`
- `-104 <= root.val <= 104`
- `-104 <= subRoot.val <= 104`

#### 题解

```java
class Solution {
    //递归遍历树 前序遍历
    //1.使用题目确定的形参和返回值
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        //2.确定终止条件
        if(root == null && subRoot == null){
            return true;
        }else if(root != null && subRoot == null){
            return true;
        }else if(root == null && subRoot != null){
            return false;
        }else if(isSameTree(root,subRoot)){
            return true;
        }

        //3.确定单层递归逻辑
        return isSubtree(root.left,subRoot) || isSubtree(root.right,subRoot);
    }

    //递归法 三步走
    //1.使用题目确定的形参和返回值
    public boolean isSameTree(TreeNode p, TreeNode q) {
        //2.确定终止条件
        if(p == null && q == null){
            return true;
        }else if(p == null && q != null){
            return false;
        }else if(p != null && q == null){
            return false;
        }else if(p.val != q.val){
            return false;
        }

        //3.确定单层的递归逻辑
        return isSameTree(p.left,q.left) && isSameTree(p.right,q.right);
    }
}
```

> 这题在LeetCode上面的标签是简单题，但是大家在看完解答之后，如果没前面的铺垫，一上来就是这道题目是不是会感觉很难

# 3.[104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)

> LeetCode难度标签：简单

## 3.1 题目说明

给定一个二叉树 `root` ，返回其最大深度。

二叉树的 **最大深度** 是指从根节点到最远叶子节点的最长路径上的节点数。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/11/26/tmp-tree.jpg#pic_center)

 

```
输入：root = [3,9,20,null,null,15,7]
输出：3
```

**示例 2：**

```
输入：root = [1,null,2]
输出：2
```

**提示：**

- 树中节点的数量在 `[0, 104]` 区间内。
- `-100 <= Node.val <= 100`

## 3.2 题解

> 这道题应该比较简单，大家应该先入为主的就是下面的第一种解法，下面跟着毛毛张一起看看有没有其它的解法吧！

### 3.2.1 递归法

#### 后序遍历递归：官方题解

```java
class Solution {
    //递归法 三步骤
    //1.确定形参和返回值：使用题目确定的形参和返回值
    public int maxDepth(TreeNode root) {
        //2.确定终止条件
        if(root == null) return 0;

        //3.确定单层递归逻辑
        //左边的高度
        int leftDepth = maxDepth(root.left);
        //右边的高度
        int rightDepth = maxDepth(root.right);
        //以该节点为根节点的树的高度
        return 1+Math.max(leftDepth,rightDepth);
        //简写
        //方式1：
        //return maxDepth(root.left) > maxDepth(root.right) ? maxDepth(root.left)+1 : maxDepth(root.right) + 1;
        //方式2：
        //return 1 + Math.max(maxDepth(root.left),maxDepth(root.right));
    }
}
```

#### 前序遍历递归：三种写法

> 毛毛张在这里介绍以下前序遍历递归的三种写法，这三种写法本质上是一样的，但是在处理特殊情况上的细节上是不一样的，代码本身没有很多要说的，ChatGPT推荐第一种方式，但是毛毛张写了另外两种写法，大家可以根据自己的喜欢来选择，同时也可以自己对一下这三种写法

**写法1：代码随想录**

```java
class Solution {
    //创建结果返回值
    int result;
    //前序遍历 
    //递归法 三步走
    //1.确定形参和返回值
    public void getDepth(TreeNode cur,int depth){
        //2.确定终止条件
        //到叶子节点了
        //中
        result = depth > result ? depth : result;
        if(cur.left == null && cur.right == null) return;

        //左
        if(cur.left != null){
            getDepth(cur.left,depth + 1);
        }
        //右
        if(cur.right != null){
            getDepth(cur.right,depth + 1);
        }
    }
    public int maxDepth(TreeNode root) {
        //初始化深度变量
        result = 0;
        //判断特殊情况
        if(root == null) return 0;
        //开始递归
        getDepth(root,1);
        return result;
    }
}
```

**写法2：毛毛张**

```java
class Solution {
    //创建结果返回值
    int result;
    //前序遍历 
    //递归法 三步走
    //1.确定形参和返回值
    public void getDepth(TreeNode cur,int depth){
        //2.确定终止条件
        //终止条件1:根节点为空
        if(cur == null) return;

        //终止条件2：到叶子节点了
        depth++;
        //中
        result = depth > result ? depth : result;
        if(cur.left == null && cur.right == null) return;

        //左
        if(cur.left != null){
            getDepth(cur.left,depth);
        }
        //右
        if(cur.right != null){
            getDepth(cur.right,depth);
        }
    }
    public int maxDepth(TreeNode root) {
        //初始化深度变量
        result = 0;
        //开始递归
        getDepth(root,0);
        return result;
    }
}
```

**写法3：毛毛张**

```java
class Solution {
    //创建结果返回值
    int result;
    //前序遍历 
    //递归法 三步走
    //1.确定形参和返回值
    public void getDepth(TreeNode cur,int depth){
        //2.确定终止条件
        //3.确定单层递归逻辑
        //这个递归里面的终止条件和单层递归逻辑是在一起的
        //如果进入了迭代，深度就要加1
        depth++;
        //同时更新为最大的深度
        result = depth > result ? depth : result;
        //中
        //判断是否到叶子节点了
        if(cur.left == null && cur.right == null) return;

        //左
        if(cur.left != null){
            getDepth(cur.left,depth);
        }
        //右
        if(cur.right != null){
            getDepth(cur.right,depth);
        }
    }
    public int maxDepth(TreeNode root) {
        //初始化深度变量
        result = 0;
        //判断特殊情况
        if(root == null) return 0;
        //开始递归
        getDepth(root,0);
        return result;
    }
}
```

### 3.2.2 广度优先遍历+迭代法+借助队列：官方题解

```java
class Solution {
    public int maxDepth(TreeNode root) {
        //广度优先遍历（BFS） 迭代法 借助队列
        //创建队列，存储迭代过程中的节点
        Queue<TreeNode> queue = new LinkedList<>();
        //判断特殊情况
        if(root != null) queue.offer(root);
        //创建变量，记录迭代的层数，就是树的深度
        int depth = 0;
        //开始迭代
        while(!queue.isEmpty()){
            //获取每一层的结点数
            int size = queue.size();
            //开始迭代每一层
            for(int i =0;i<size;i++){
                TreeNode cur = queue.poll();
                if(cur.left != null) queue.offer(cur.left);
                if(cur.right != null) queue.offer(cur.right);
            }
            //迭代完每一层深度加1
            depth++;
        }
        //迭代完毕，返回结果
        return depth;
    }
}
```

## 3.3 练习：[559. N 叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-n-ary-tree/)

> LeetCode难度标签：简单

### 3.3.1 题目描述

给定一个 N 叉树，找到其最大深度。

最大深度是指从根节点到最远叶子节点的最长路径上的节点总数。

N 叉树输入按层序遍历序列化表示，每组子节点由空值分隔（请参见示例）。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png#pic_center)

```
输入：root = [1,null,3,2,4,null,5,6]
输出：3
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2019/11/08/sample_4_964.png#pic_center)

```
输入：root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
输出：5
```

**提示：**

- 树的深度不会超过 `1000` 。
- 树的节点数目位于 `[0, 104]` 之间。

### 3.3.2 题解

> **注意：N叉树的结点定义和二叉树的不同**

#### 深度优先搜索

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, List<Node> _children) {
        val = _val;
        children = _children;
    }
};
*/
class Solution {
    public int maxDepth(Node root) {
        if (root == null) {
            return 0;
        }
        int maxChildDepth = 0;
        List<Node> children = root.children;
        for (Node child : children) {
            int childDepth = maxDepth(child);
            maxChildDepth = Math.max(maxChildDepth, childDepth);
        }
        return maxChildDepth + 1;
    }
}
```

#### 广度优先搜索

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, List<Node> _children) {
        val = _val;
        children = _children;
    }
};
*/
class Solution {
    public int maxDepth(Node root) {
        if (root == null) {
            return 0;
        }
        Queue<Node> queue = new LinkedList<Node>();
        queue.offer(root);
        int ans = 0;
        while (!queue.isEmpty()) {
            int size = queue.size();
            while (size > 0) {
                Node node = queue.poll();
                List<Node> children = node.children;
                for (Node child : children) {
                    queue.offer(child);
                }
                size--;
            }
            ans++;
        }
        return ans;
    }
}
```



# 4.[111. 二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree/)

> LeetCode难度标签：简单

## 4.1 题目说明

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

**说明：**叶子节点是指没有子节点的节点。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/10/12/ex_depth.jpg#pic_center)

```
输入：root = [3,9,20,null,null,15,7]
输出：2
```

**示例 2：**

```
输入：root = [2,null,3,null,4,null,5,null,6]
输出：5
```

**提示：**

- 树中节点数的范围在 `[0, 105]` 内
- `-1000 <= Node.val <= 1000`

## 4.2 题解

- **不知道大家做这道题目的情况如何，毛毛张一开始就是这种解法，被上面一题求最大深度给带偏了，把问题想简单了**

- **在求解的这道题目的时候不能单纯的取左右子树的最小深度，因为对于左斜树和右斜树来说是不适用的，另外一个子树的深度为零，这样计算返回这棵树的深度永远是1，因此需要对这两种情况单独考虑**

    <img src="https://cdn.jsdelivr.net/gh/zzxrepository/image_bed@master/Leetcode2/image-20240602191634373.png#pic_center" alt="image-20240602191634373" />

### 4.2.1 深度优先搜索

#### 4.2.1 递归法错解

```java
class Solution {
    //递归法 三步走
    //1.确定形参和方法值：使用题目确定的形参和方法值
    public int minDepth(TreeNode root) {
        //2.确定终止条件
        if(root == null) return 0;

        //3.确定单层递归逻辑
        //左边的高度
        int leftDepth = minDepth(root.left);
        //右边的高度
        int rightDepth = minDepth(root.right);
        //以该节点为根节点的树的高度
        return 1 + Math.min(leftDepth,rightDepth);
    }
}
```

#### 4.2.2 递归法正解

```java
class Solution {
    //递归法 三步走
    //1.确定形参和返回值：使用题目确定的形参和返回值
    public int minDepth(TreeNode root) {
        //2.确定终止条件
        //和求二叉树的最大深度一样
        if (root == null) return 0;

        //3.确定单层递归逻辑
        //这里和求二叉树的最大深度不一样
        int leftDepth = minDepth(root.left);
        int rightDepth = minDepth(root.right);
        //右斜树的深度
        if (root.left == null) {
            return rightDepth + 1;
        }
        //左斜树的深度
        if (root.right == null) {
            return leftDepth + 1;
        }
        //既不左斜，也不右斜
        return Math.min(leftDepth, rightDepth) + 1;
    }
}
```

### 4.2.2 广度优先搜索：迭代法

```java
class Solution {
    public int minDepth(TreeNode root) {
        //广度优先遍历（BFS） 迭代法 借助队列
        //创建队列，存储迭代过程中的节点
        Queue<TreeNode> queue = new LinkedList<>();
        //判断特殊情况
        if(root != null) queue.offer(root);
        //创建变量，记录迭代的层数，就是树的深度
        int depth = 0;
        //开始迭代
        while(!queue.isEmpty()){
            //获取每一层的结点数
            int size = queue.size();
            //迭代每一层深度加1
            depth++;
            //开始迭代每一层
            for(int i =0;i<size;i++){
                TreeNode cur = queue.poll();
                //遍历过程中遇到叶子节点就返回结果
                if(cur.left == null && cur.right == null) return depth;
                if(cur.left != null) queue.offer(cur.left);
                if(cur.right != null) queue.offer(cur.right);
            }
        }
        return depth;
    }
}
```

# 5.练习

## 5.1 二叉树叶子节点个数

**题目描述：求二叉树的叶子结点数量**

**方法1：** 递归 + 遍历思路

```java
class Solution {
    int leafCount = 0;
    //递归法 三步走
    //1.使用题目确定的形参和返回值
    public int getLeafNodeNum(TreeNode root) {
        //2.确定终止条件
        if(root == null) {
            return 0;
        }
        //3.确定单层递归逻辑
        // 左右都空 是叶子
        if(root.left == null && root.right == null) {
            leafCount++;
        }
        getLeafNodeNum(root.left);
        getLeafNodeNum(root.right);
        return leafCount;
    }
}
```

**方式2：** 递归 + 子问题思路

```java
class Solution {
    //递归法 三步走
    //1.使用题目确定的形参和返回值
    public int getLeafNodeNum(TreeNode root) {
        //2.确定终止条件
        if(root == null) {
            return 0;
        }
        //3.确定单层递归逻辑
        //左右都空是叶子
        if(root.left == null && root.right == null) {
            return 1;
        }
        return getLeafNodeNum(root.left) + getLeafNodeNum(root.right);
    }
}
```

## 5.2 二叉树第K层结点个数

```java
class Solution {
    //递归法 三步走
    //1.使用题目确定的形参和返回值
    public int getKLevelNodeNum(TreeNode root, int k) {
        //2.确定终止条件
        if(root == null || k <= 0) {
            return 0;
        }
        if(k == 1) { // 第一层
            return 1;
        }
        
        //3.确定单层递归逻辑
        return getKLevelNodeNum(root.left, k - 1) + getKLevelNodeNum(root.right, k - 1);
    }
}
```

# 参考文献

- <https://leetcode.cn/>
- <https://programmercarl.com/#%E6%9C%AC%E7%AB%99%E8%83%8C%E6%99%AF>
