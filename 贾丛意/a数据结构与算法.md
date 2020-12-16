### 将有序数组转换为二叉搜索树
```js
function Node(value) {
  this.value = value;
  this.left = this.right = null
}
let nums = [-10, -3, 0, 5, 9]
function tt(nums) {
  if (!nums.length) {
    return null
  }
  let root = new Node(null)
  if (nums.length > 1) {
    root.left = tt(nums.splice(0, nums.length / 2))
  }
  root.value = nums[0]
  root.right = tt(nums.splice(1))

  return root;
}
let root = tt(nums)

```
### 简单的反转链表
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```js
//递归
function reverse(head){
  function revLink(pre, cur){
    if(cur===null) return pre;
    let next = cur.next;
    cur.next = pre;
    return revLick(cur,next)
  }
  return revLink(null, head)
}
//循环解法
let reverseList =  (head) => {
    if (!head)
        return null;
    let pre = null, cur = head;
    while (cur) {
        // 关键: 保存下一个节点的值
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
};
```
### 链表的区间反转
```js
//循环解法
var reverseBetween = function(head, m, n) {
    let count = n - m;
    let p = dummyHead = new ListNode();
    let pre, cur, start, tail;
    p.next = head;
    for(let i = 0; i < m - 1; i ++) {
        p = p.next;
    }
    // 保存前节点
    front = p;
    // 同时保存区间首节点
    pre = tail = p.next;
    cur = pre.next;
    // 区间反转
    for(let i = 0; i < count; i++) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    // 前节点的 next 指向区间末尾
    front.next = pre;
    // 区间首节点的 next 指向后节点(循环完后的cur就是区间后面第一个节点，即后节点)
    tail.next = cur;
    return dummyHead.next;
};

//递归
var reverseBetween = function(head, m, n) {
  // 递归反转函数
  let reverse = (pre, cur) => {
    if(!cur) return pre;
    // 保存 next 节点
    let next = cur.next;
    cur.next = pre;
    return reverse(cur, next);
  }
  let p = dummyHead = new ListNode();
  dummyHead.next = head;
  let start, end; //区间首尾节点
  let front, tail; //前节点和后节点
  for(let i = 0; i < m - 1; i++) {
    p = p.next;
  }
  front = p; //保存前节点
  start = front.next;
  for(let i = m - 1; i < n; i++) {
    p = p.next;
  }
  end = p;
  tail = end.next; //保存后节点
  end.next = null;
  // 开始穿针引线啦，前节点指向区间首，区间首指向后节点
  front.next = reverse(null, start);
  start.next = tail;
  return dummyHead.next;
}
```
### 两个一组翻转链表
给定 1->2->3->4, 你应该返回 2->1->4->3.
```js
//循环解法
var swapPairs = function(head) {
    if(head == null || head.next == null) 
        return head;
    let dummyHead = p = new ListNode();
    let node1, node2;
    dummyHead.next = head;
    while((node1 = p.next) && (node2 = p.next.next)) {
        node1.next = node2.next;
        node2.next = node1;
        p.next = node2;
        p = node1;
    }
    return dummyHead.next;
};
//递归解法
var swapPairs = function(head) {
    if(head == null || head.next == null)
        return head;
    let node1 = head, node2 = head.next;
    node1.next = swapPairs(node2.next);
    node2.next = node1;
    return node2;
};
```
### K个一组翻转链表
给定这个链表：1->2->3->4->5
当 k = 2 时，应当返回: 2->1->4->3->5
当 k = 3 时，应当返回: 3->2->1->4->5
```js
//循环解法
var reverseKGroup = function(head, k) {
    let count = 0;
    // 看是否能构成一组，同时统计链表元素个数
    for(let p = head; p != null; p = p.next) {
        if(p == null && i < k) return head;
        count++;
    }
    let loopCount = Math.floor(count / k);
    let p = dummyHead = new ListNode();
    dummyHead.next = head;
    // 分成了 loopCount 组，对每一个组进行反转
    for(let i = 0; i < loopCount; i++) {
        let pre = null, cur = p.next;
        for(let j = 0; j < k; j++) {
            let next = cur.next;
            cur.next = pre;
            pre = cur;
            cur = next;
        }
        // 当前 pre 为该组的尾结点，cur 为下一组首节点
        let start = p.next;// start 是该组首节点
        // 开始穿针引线！思路和2个一组的情况一模一样
        p.next = pre;
        start.next = cur;
        p = start;
    }
    return dummyHead.next;
};

//递归解法
var reverseKGroup = function(head, k) {
    let pre = null, cur = head;
    let p = head;
    // 下面的循环用来检查后面的元素是否能组成一组
    for(let i = 0; i < k; i++) {
        if(p == null) return head;
        p = p.next;
    }
    for(let i = 0; i < k; i++){
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    // pre为本组最后一个节点，cur为下一组的起点
    head.next = reverseKGroup(cur, k);
    return pre;
};

```
### 如何检测链表形成环？
给定一个链表，判断链表中是否形成环。
1. 思路一: 循环一遍，用 Set 数据结构保存节点，利用节点的内存地址来进行判重，如果同样的节点走过两次，则表明已经形成了环。
2. 思路二: 利用快慢指针，快指针一次走两步，慢指针一次走一步，如果两者相遇，则表明已经形成了环。
```js
//set判重
var hasCycle = (head) => {
    let set = new Set();
    let p = head;
    while(p) {
        // 同一个节点再次碰到，表示有环
        if(set.has(p)) return true;
        set.add(p);
        p = p.next;
    }
    return false;
}
//快慢指针
var hasCycle = function(head) {
    let dummyHead = new ListNode();
    dummyHead.next = head;
    let fast = slow = dummyHead;
    // 零个结点或者一个结点，肯定无环
    if(fast.next == null || fast.next.next == null) 
        return false;
    while(fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
        // 两者相遇了
        if(fast == slow) {
            return true;
        }
    } 
    return false;
};
```
### 如何找到环的起点
给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
```js
//set判重去第一个节点
var hasCycle = (head) => {
    let set = new Set();
    let p = head;
    while(p) {
        // 同一个节点再次碰到，表示有环
        if(set.has(p)) return p;
        set.add(p);
        p = p.next;
    }
    return false;
}
//快慢指针

var detectCycle = function (head) {
  let slowP = head, fastP = head // 都从头节点出发
  while (fastP) {                // 指向null就说明没有环，返回null
    if (fastP==null||fastP.next == null) return null // fastP.next为null也说明无环
    slowP = slowP.next           // 慢指针走一步
    fastP = fastP.next.next      // 快指针走两步
    if (slowP === fastP) {       // 首次相遇
      fastP = head               // 让快指针回到头节点
      while (true) {             // 开启循环，让快慢指针相遇
        if (slowP === fastP) {   // 相遇地点肯定在入环处
          return slowP
        }
        fastP = fastP.next       // 快慢指针都走一步
        slowP = slowP.next
      }
    }
  }
  return null
};
```
### 合并两个有序链表
将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```js
//递归
var mergeTwoLists = function(l1, l2) {
    const merge = (l1, l2) => {
        if(l1 == null) return l2;
        if(l2 == null) return l1;
        if(l1.val > l2.val) {
            l2.next = merge(l1, l2.next);
            return l2;
        }else {
            l1.next = merge(l1.next, l2);
            return l1;
        }
    }
    return merge(l1, l2);
};

//循环解法
var mergeTwoLists = function(l1, l2) {
    if(l1 == null) return l2;
    if(l2 == null) return l1;
    let p = dummyHead = new ListNode();
    let p1 = l1, p2 = l2;
    while(p1 && p2) {
        if(p1.val > p2.val) {
            p.next = p2;
            p = p.next;
            p2 = p2.next;
        }else {
            p.next = p1;
            p = p.next;
            p1 = p1.next;
        }
    }
    // 循环完成后务必检查剩下的部分
    if(p1) p.next = p1;
    else p.next = p2;
    return dummyHead.next;
};

```
### 合并 K 个有序链表
```js
//类似于归并排序
//递归(自上而下)
var mergeKLists = function(lists) {
    // 上面已经实现
    var mergeTwoLists = function(l1, l2) {/*上面已经实现*/};
    const _mergeLists = (lists, start, end) => {
        if(end - start < 0) return null;
        if(end - start == 0)return lists[end];
        let mid = Math.floor(start + (end - start) / 2);
        return mergeTwoList(_mergeLists(lists, start, mid), _mergeLists(lists, mid + 1, end));
    }
    return _mergeLists(lists, 0, lists.length - 1);
};

//循环(自下而上)
var mergeKLists = function(lists) {
    var mergeTwoLists = function(l1, l2) {/*上面已经实现*/};
    // 边界情况
    if(!lists || !lists.length) return null;
    // 虚拟头指针集合
    let dummyHeads = [];
    // 初始化虚拟头指针
    for(let i = 0; i < lists.length; i++) {
        let node = new ListNode();
        node.next = lists[i];
        dummyHeads[i] = node;
    }
    // 自底向上进行merge
    for(let size = 1; size < lists.length; size += size){
        for(let i = 0; i + size < lists.length;i += 2 * size) {
            dummyHeads[i].next = mergeTwoLists(dummyHeads[i].next, dummyHeads[i + size].next);
        }
    }
    return dummyHeads[0].next;
};
```
### 判断回文链表(求链表中间节点)
输入: 1->2->2->1
输出: true
用O(n) 时间复杂度和 O(1) 空间复杂度实现
```js
var isPalindrome = function(head) {
    let reverse = (pre, cur) => {
        if(!cur) return pre;
        let next = cur.next;
        cur.next = pre;
        return reverse(cur, next);
    }
    let dummyHead = slow = fast = new ListNode();
    dummyHead.next = head;
    // 注意注意，来找中点了, 黄金模板
    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    let next = slow.next;
    slow.next = null;
    let newStart = reverse(null, next);
    for(let p = head, newP = newStart; newP != null; p = p.next, newP = newP.next) {
        if(p.val != newP.val) return false;
    }
    return true;
};
```
### 多维数组 flatten
```js
function flat(arr){
  let res = [];
  function getFlat(res, arr){
    for(let i=0;i<arr.length;i++){
      let item = arr[i]
      if(Array.isArray(item)){
        getFlat(res,arr)
      }else {
        res.push(item)
      }
    }
  }
  getFlat(res,arr)
  return res;
}

```
### 二叉树层序遍历
```js
function ec(root){
  let res = []
  let stack = []
  let level = 0;
  stack.push(root)
  while(stack.length){
    res.push([]);
    let size = stack.length
    while(size--){
      let node = stack.shift();
      res[level].push(node.val);
      node.left&&stack.push(node.left)
      node.right&&stack.push(node.right)
    }
    level++
  }
  return res;
}

```
### 二叉树的锯齿形层次遍历
```js
function ec(root){
  let res = []
  let stack = []
  let level = 0;
  stack.push(root)
  while(stack.length){
    res.push([]);
    let size = stack.length
    while(size--){
      let node = stack.shift();
      res[level].push(node.val);
      node.left&&stack.push(node.left)
      node.right&&stack.push(node.right)
    }
    if(level%2) res[level].reverse();//相比于上一个问题, 只要增加这行代码就可以了
    level++
  }
  return res;
}

```
### 二叉树的右视图
```js
function ey(root){
  if(!root) return [];
  let stack = [];
  let res = [];
  stack.push(root)
  while(stack.length){
    res.push(stack[0].val)
    let size = stack.length;
    while(size--){
      let item = stack.shift();
      item.right&&stack.push(item.right)
      item.left&&stack.push(item.left)
    }
  }
  return res;
}
```
### 完全平方数
给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。
```js
function getM(n){
  let minArr = [0];//初始化整数0是0个
  for(let i=1;i<=n;i++){
    minArr[i]=i;//假设每个最开始都是由1+1+...+1组合的, 组合个数就是当前index;
    for(let j=0;j*j<=i;j++){
      minArr[i] = Math.min(minArr[i],minArr[i-j*j]+1)//这里其实是minArr[i-j*j]+minArr[j*j], 但因为minArr[j*j]就是由一个平方数组成的所以是1 .
    }
  }
  return minArr[n]
}
//时间复杂度为n*(Math.sqrt(n)), 取平方根的意思

```
### 单词接龙

```js
var ladderLength = function(beginWord, endWord, wordList) {
    // 两个单词在图中是否相邻
    const isSimilar = (a, b) => {
        let diff = 0
        for(let i = 0; i < a.length; i++) {
            if(a.charAt(i) !== b.charAt(i)) diff++;
            if(diff > 1) return false; 
        }
        return true;
    }
    let queue = [beginWord];
    let index = wordList.indexOf(beginWord);
    if(index !== -1) wordList.splice(index, 1);
    let res = 2;
    while(queue.length) {
        let size = queue.length;
        while(size --) {
            let front = queue.shift();
            for(let i = 0; i < wordList.length; i++) {
                if(!isSimilar(front, wordList[i]))continue;
                // 找到了
                if(wordList[i] === endWord) {
                    return res;
                }
                else {
                    queue.push(wordList[i]);
                }
                // wordList[i]已经成功推入，现在不需要了，删除即可
                // 这一步性能优化，相当关键，不然100%超时
                wordList.splice(i, 1);
                i --;
            }
        }
        // 步数 +1
        res += 1;
    }
    return 0;
};
```
### 前 K 个高频元素(使用优先队列的方式)
给定一个非空的整数数组，返回其中出现频率前 k 高的元素。
```js
// 输入: nums = [1,1,1,2,2,3], k = 2
// 输出: [1,2]
var topKFrequent = function(nums, k) {
   let map = {};
   let pq = new PriorityQueue(k, (a, b) => map[a] - map[b] < 0);
   for(let i = 0; i < nums.length; i++) {
       if(!map[nums[i]]) map[nums[i]] = 1;
       else map[nums[i]] = map[nums[i]] + 1;
   }
   let arr = Array.from(new Set(nums));
   for(let i = 0; i < arr.length; i++) {
       pq.enqueue(arr[i]);
   }
   return pq.maxHeap.data;
};
```
### 滑动窗口最大值
```js
//输入[1,3,-1,-3,5,3,6,7],  和k=3
//输出[3,3,,5,5,6,7]
function getmax(arr, k) {
  if (arr.length == 0 || !k) return [];
  let win = [], res = [];
  for (let i = 0; i < arr.length; i++) {
    if (win[0] !== undefined && win[0] <= i - k) {
      win.shift();
    }
    while (arr[win[win.length - 1]] < arr[i]) {
      win.pop()
    }
    win.push(i)
    if (i >= k - 1) {
      res.push(arr[win[0]])
    }
  }
  return res;
}

```
### 二叉树中序遍历
```js
function zx(root) {
  let res = [];
  function getzx(root) {
    if (root == null) return;
    getzx(root.left)
    res.push(root.val)
    getzx(root.right)
  }
  getzx(root);
  return res;
}
```
### 二叉树最大深度
```js
function bd(root) {
  if (root == null) return 0;
  return Math.max(bd(root.left) + 1, bd(root.right) + 1)
}
```
### 二叉树最小深度
```js
function bx(root){
  if(root==null) return 0;
  return Math.min(bx(root.left)+1,bx(root.right)+1);
}
```
### 对称二叉树
```js
function dc(root){
  function sureDc(left,right){
    if(!left && !right) return true;
    if(!left || !right || left.val!==right.val) return false;
    return sureDc(left.left,right.right)&&sureDc(left.right,right.left)
  }
  if(root == null) return true;
  return sureDc(root.left,root.right)
}
```
### 二叉树的最近公共祖先
```js
function zg(root, p, q) {
  if (root == null || root == p || root == q) return root;
  let left = zg(root.left, p, q)
  let right = zg(root.right, p, q)
  if (left == null) return right;
  else if (right == null) return left;
  return root;
}
```
### 二叉搜索树(即有序)的最近公共祖先
```js
function esz(root, p, q){
  if(root ==null || root == p || root == q) return root;
  if(root.val>q&& root.val>p) return esz(root.left,p,q)
  else if(root.val<p&&root.val<q) return esz(root.right,p,q)
  else return root;//如果比其中一个大, 比另一个小, 那么这个节点就是他们的最近公共父节点了
}
```
### 二叉树的直径
```js
function ezj(root){
  function help(node){
    if(root==null) return 0;
    let left = node.left ? help(node.left)+1 : 0
    let right = node.right? help(node.right)+1:0;
    let cur = left + right;
    if(cur>max) max = cur; //这个max走到最外层的时候已经在子节点中统计过一遍了
    return Math.max(left,right)//通过这个返回的操作可以将后续节点与父节点一起编织成路径, 最后统一至max处处理
  }
  let max = 0;
  if(root == null) return 0;
  help(root);
  return max;
}

```
### 二叉树的所有路径
```js
function getLJ(root){
  let res = []
  let path = [];
  function lj(node){
    if(node==null) return;
    path.push(node)
    lj(node.left)
    lj(node.right)
    if(!node.left && !node.right) {
      res.push(path.map(item=>item.val).join('->'))
    }
    path.pop();
  }
  lj(root)
  return res;
}

```
### 二叉树的最大路径和
```js
function getMinLJ(root){
  function help(node){
    if(node==null) return 0;
    let left = Math.max(help(node.left),0)
    let right = Math.max(help(node.right),0)
    let cur = left + node.val +right;
    if(cur>max) max = cur
    return Math.max(left,right)+node.val
  }
  let max = -Infinity
  help(root)
  return max;
}
```
### 验证二叉搜索树
```js
//利用中序遍历
function valify(root){
  let prev = null
  function help(node){
    if(node==null) return true;
    if(!help(node.left)) return false;//先遍历的节点都比后遍历的节点小, prev里存的也是先遍历的节点的值
    if(prev!==null&& prev >= node.val) return false;
    prev = node.val
    return help(node.right)
  }
  return help(root)
}



```
### 将有序数组转换为二叉搜索树
```js
function turnTo(arr){
  function help(start, end){
    if(start>end) return null;
    if(start==end) return new TreeNode(arr[start])
    let mid = Math.floor((start+end)/2)
    let node = new TreeNode(arr[mid])
    node.left = help(start, mid-1)
    node.right = help(mid+1,end)
    return node
  }
  return help(0, arr.length-1)
}

```
### 二叉树展开为链表
```js
//采用后序遍历
function turnToLink(root){
  if(root == null) return ;
  turnToLink(root.left);
  turnToLink(root.right)
  if(root.left){
    let p = root.left;
    while(p.right) p = p.right;
    p.right = root.right;
    root.right = root.left;
    root.left = null;
  }
}

```
### 不同的二叉搜索树
给定一个整数n, 生成所有由 1....n 为节点所组成的二叉搜索树
```js
function gene(n){
  function help(start, end){
    if(start>end) return [null]
    if(start===end) return [new TreeNode(start)]
    let res = [];
    for(let i=start;i<=end;i++){
      //先获取所有左右节点的可能组合
      let leftNodes = help(start,i-1)
      let rightNodes = help(i+1,end)
      //再将这些组合组合起来
      for(let j=0;j<leftNodes.length;j++){
        for(let k=0;k<rightNodes.length;k++){
          let root = new TreeNode(i);
          root.left = leftNodes[j]
          root.right = rightNodes[k]
          res.push(root)
        }
      }
    }
    return res;
  }
  if(n==0) return [];
  return help(1,n)
}


```







