#### 一、数据类型

```
1. 复杂数据类型|引用类型:赋值的是地址(赋值后多个变量指向同一个地址)
2. 基本数据类型|值类型： 基本数据类型都是值类型

null和undefined 区别
undefined:一个值，当声明的变量还没有初始化时，变量的值默认为undefined，可以看做空的比变量
null:表示尚未存在的对象，可以看做空的对象

3. 类型比较
   相等和不相等——先转换再比较（值）（==）
   全等和不全等——仅比较（值和类型）而不转换  （===）
   ==会自动转换类型
	===后者不会
	1. 如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值——false转为0.而true转为1
	2. 如果有一个操作数是字符串，另一个是数值，在标胶相等性之前先将字符串转换为数值
	3. 如果一个操作数是对象，另一个不是，则调用对象的valueOf()方法，用得到的基本类型值按照前面的规则进行比较
```

##### (1). 类型判断

1. typeof（基本数据类型没问题，引用数据类型不起作用）

```
typeof 'a'   //string   
typeof []/{}/null/ //"object" (对象,数组和nul)
typeof null //object  不是一个空引用，是一个原始值，只是期望此处将引用一个对象，遗留的bug，null是一个期望对象
typeof function(){} //function  
typeof undefined  //'undefined'
```

2. instanceof 

```
'a' instanceof  String    //false  (以对象字面量创建的基本数据类型，却不是实例) 
 new String('a') instanceof  String//true  new关键字创建基本数据类型，返回true
Function instanceof Function//true 复杂数据类型
Number instanceof Number;//false 基本数据类型
[] instanceof Array   //true   引用数据类型是可以的
```

3. constructor

```
('1').constructor===String //true
	[].constructor===Array //true
	似乎可以完全应对基本数据类型和引用数据类型，但并不是如此
	 function Fn(){};
   Fn.prototype=new Array();
   var f=new Fn();
   console.log(f.constructor===Fn);   //false
   console.log(f.constructor===Array);  //true
```

4.  Object.prototype.toString.call('a')  //[object String]



```
	1. null==undefind
	2. 在比较相等性之前，不能将null和undefind转换成其他值（0==null//false）
	3. 如果有一个是NaN,则==返回false  (0==NaN//false   0!==NaN//true) 且NaN!=NaN
	   {} [] 比较的是地址，而不是真实的值。
        []==![];//true//(!的优先级大于== ,![](转成false):[]==false ==> []==0 ==> ''([].toString()转换成'')==0 ==> 0==0)
        {}==!{}//false  ==> {}==false ==> NaN==0(对象没有valueOf()方法，则调用 toString() {}.toString()//NaN)
		console.log();//false
		console.log({}=='[object Object]');//true
	if([]){ //地址值？
		console.log(2);//会输出2
		}
		// 对象 不能直接跟字符串比
		// js进行比较的时候 内部 会偷偷的调用
		// 先调用 valueOf 如果还是无法比较 会再次调用 toString()
2. 数据	
   1. 复杂数据类型 引用类型
      引用类型赋值特点 赋值的是地址
      赋值之后 多个变量 会指向 同一个对象 修改某一个变量的值 其他指向这个对象的变量 也会受影响
      赋值 是地址 person1 跟person2 都指向 同一个对象
   2. 值类型的 赋值特点
        拷贝赋值
        js中 基本数据类型 都是 值类型
```



## 二、数组：

```
增：push  unshift  concat
删：pop shift  slice（0,10）(截取数组，从0到10，不包括10) splice(index,num,item,item)(从index开始删除num个，并添加item)
改：join   reverse sort 
查：
不改变原数组：concat join slice toString map filter
改变原数组：pop push reverse shift unshift sort splice  some every forEach

ES6:forEach map  filter reduce(累加)   reduceRight,类似字符串的indexof,lastIndexOf,Array.from(可以转为真正的数组)
```

#### 不改变原数组方法

```

toSource  toLocalString toString 

concat()   连接两个或多个数组，并将新的数组返回，不改变原数组，返回新的数组
join()     把数组中所有元素放入一个字符串，将数组转换为字符串，不改变原数组，返回字符串
slice()    从已有的数组中返回选定的元素，提取部分元素，放到新数组中，
	        参数解释：1：截取开始的位置的索引，包含开始索引；
		          2：截取结束的位置的索引，不包含结束索引。不改变原数组，返回一个新数组
toString() 把数组转为字符串，不改变原数组，返回数组的字符串形式
map()     对原数组进行操作后返回一个新的数组，不会对空数组操作  需要用return 返回新数组的每一项
filter()  对原数组进行操作后返回一个新的数组,不会对空数组操作  需要用return 返回新数组的每一项

```

#### 改变原数组方法

```

5、pop()      删除数组最后一个元素，如果数组为空，则不改变数组，返回undefined，改变原数组返回被删除的元素
6、push()     向数组末尾添加一个或多个元素，改变原数组，返回新数组的长度
7、reverse()  颠倒数组中元素的顺序，改变原数组，返回该数组
8、shift()    把数组的第一个元素删除，若空数组，不进行任何操作，返回undefined,改变原数组返回第一个元素的值
9、sort()     对数组元素进行排序，改变原数组，返回该数组
10、splice()  从数组中添加/删除项目，改变原数组，返回被删除的元素
11、unshift() 向数组的开头添加一个或多个元素，改变原数组，返回新数组的长度
14、some()
15、every()
16、forEach()       匿名函数中 return 无效,不会中断循环,使用break会报错Uncaught SyntaxError: Illegal break statement
```

```
以下方法添加到了Array.prototype对象上（isArray除外）,Array.isArray直接写在了Array构造器上，而不是prototype对象上
  
         var a1 = ['a', 10, 'b', 20, 'c', 30];
         var a2 = a1.filter(function(item) { 
             return typeof item == 'number'; 
         });
         console.log(a2); // logs [10,20,30]
```



### 长度为 100 的数组，求该数组的前 10 个元素之和。

```
第一种：
var arrNew = arr.slice(0,10);
    var sum = 0;
    arrNew.forEach(function (value){
        sum += value;
    })
第二种：
 // reduce() 方法对累加器和数组中的每个元素 (从左到右)应用一个函数，将其减少为单个值。
    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    var total = arr.slice(0, 10).reduce(function (sum, curVal) {
        return sum + curVal;
    });
    console.log(total);
```

### 实现对数组进行乱序。 

```
arr.sort(function(){
    return Math.random()>0.5?1:-1
})
```



### 数组的循环方式

```
  Array.prototype.myeach = function (fn) {
    for (var i = 0; i < this.length; i++) {
      fn(this[i], i.this)
    }
  }
  Array.prototype.mymap = function (fn) {
    var backArr = []
    for (var i = 0; i < this.length; i++) {
      backArr.push(fn(this[i], ithis))
    }
    return backArr
  }
```

### split() join()的区别？

```
split()是字符串分割成数组，返回数组
join()是将一个数组（伪数组）中的左右数组拼接为一个字符串，返回拼接好的字符串
```



```
 function changeStuff(a, b, c) {
    // var b;
    // var c;
    a = a * 10;
    b.item = "changed";
    c = {item: "changed"}; // x0fff67
  }
  var num = 10;
  var obj1 = {item: "unchanged"}; // 0xf0045
  var obj2 = {item: "unchanged"}; // 0xf0046
  changeStuff(num, obj1, obj2);
  console.log(num); //10
  console.log(obj1.item); // changed 
  console.log(obj2.item); // unchanged
```

### 去重

```
1. Array.from(new Set(arr))
2. 利用数组的indexOf、lastIndexOf下标属性来查询。 newArr.indexOf(arr[i]===-1)
3. 利用数组原型对象上的includes方法搭配for循环、filter、forEach
```



#### 排序算法

```
1. 冒泡排序:即比较相邻的元素，如果第一个比第二个大，就交换他们两个
2. 选择排序
3. 插入排序 与已经进行排序的进行比较再插入
4. 快速排序
5. sort 
	arr.sort(function(a,b){
    if(a>b){return 1}
    else if(a<b){return -1}
    else{return 0}
	})
	倒序：reverse
```

#### 判断是否是一个数组：

Array.prototype.isPrototypeOf(obj);
obj instanceof Array
Object.prototype.toString.call(obj)
Array.isArray()



### 三、字符串

```
不改变原字符串：indexOf slice substr subString
indexOf:查询索引  lastIndexOf
split：分割返回数组
slice(start,end(不包含)) 返回截取到的字符串
subStr(start,num) 返回截取到的字符串
subString(start,end(不包含)) 返回截取到的字符串
charAt(index) 根据所以取字符
concat  返回合并后的字符
toUpperCase() 转大写  toLowerCase
replace
match（）：使用正则表达式模式对字符串执行查找，并将包含查找结果最为结果返回 
    function MatchDemo(){ 
       var r, re;         // 声明变量。 
       var s = "The rain in Spain falls mainly in the plain"; 
       re = /ain/i;    // 创建正则表达式模式。 
       r = s.match(re);   // 尝试匹配搜索字符串。 
       return(r);         // 返回第一次出现 "ain" 的地方。 
    } 
Search（stringObject）：指明是否存在相应的匹配。如果找到一个匹配，search 方法将返回一个整数值，指明这个匹配距离字符串开始的偏移位置。如果没有找到匹配，则返回 -1。 
改变原字符串：暂时还没有


ES6---string新增方法:
    includes/endsWith/startsWith/repeat/`${}`模板字符串/字符串遍历方法：for…of：
        let str="wbiokr";
        for(let s of str){
            console.log(s)
        }
        //结果：w, b, i, o, k, r
```





### 去除字符串的前后空格 正则

var tempstr=Str.replace(/(^\s*)|(\s*)$/g,'')

### Javascript内置的常用对象有哪些？并列举该对象常用的方法？

```
DOM包含： DOM 是 W3C 的标准；提供了很多api,用来操作(增删查改)dom树里面的每一个对象。
        一些访问节点的api:getElementById..  一些事件啊addeventlistener
BOM:3. window 是 BOM 对象，而非 js 对象,它既是通过js访问浏览器窗口的一个接口，又是一个Global（全局）对象。这意味着在网页中定义的任何对象，变量和函数，都以window作为其global对象。window对象包含了document对象
    window  Window对象包含属性：document、location、navigator、screen、history、frames
     window.close()/open/alert.....
```

window
    document
    Math
    Array
    String
    Date
    RegExp: Regular Expresion
    Global

```
S中内置了17个对象，常用的是Array对象、Date对象、正则表达式对象、string对象、Global对象 
Array对象中常用方法：join。。。。。 
   
Global对象 
    是一个固有对象，目的是把所有的全局方法集中在一个对象中。 
    Global没有语法，直接调用其方法。 
    escape（）: 对 String 对象编码以便它们能在所有计算机上可读. 
    escape(charString) 
    必选项 charstring 参数是要编码的任意 String 对象或文字。 
    isNaN():判断一个值是否是NaN。 
    parseInt（）：返回由字符串得到的整数 

正则表达式对象 
    本对象包含正则表达式模式以及表明如何应用模式的标志。 
    语法 1 
    re = /pattern/[flags] 
    
    语法 2 
    re = new RegExp("pattern",["flags"]) 
    re为将要赋值正则表达式模式的变量名 
    pattern为正则表达式 
    flags为标记：有如下3中 
    1：g（全文查找） 
    2：i（忽略大小写） 
    3：m（多行查找） 
    当预先知道查找字符串时用语法 1。当查找字符串经常变动或不知道时用语法 2，比如由用户输入得到的字符串。
String对象 
Math对象
    ceil()：向上取整。
    floor():向下取整。
    round():四舍五入。
    random():取随机数。

Date对象

    get/setDate()：返回或设置日期(1-31)
    get/setDay:返回一周中的某一天（0-6）
    get/setFullYear():返回或设置年份，用四位数表示。
    
    get/setYear():返回或设置年份。
    
    get/setMonth():返回或设置月份。(0-24)
    
    get/setHours():返回或设置小时，24小时制(0-23)
    
    get/setMinutes():返回或设置分钟数。(0-59)
    
    get/setSeconds():返回或设置秒钟数。(0-59)
    
    get/setTime():返回 1970 年 1 月 1 日至今的毫秒数。或设置时间（毫秒为单位）
```

四、事件

#### 事件绑定和普通事件有什么区别？

```
普通添加事件的方法：

var btn = document.getElementById("one");
btn.onclick = function(){
    alert(1);
}
btn.onclick = function(){
    alert(2);
}
执行上面的代码只会alert 2 
```

```
事件绑定方式添加事件：

var btn = document.getElementById("two");
btn.addEventListener("click",function(){
    alert(1);
});
btn.addEventListener("click",function(){
    alert(2);
});
执行上面的代码会先alert 1 再 alert 2

两者区别：普通添加事件的方法不支持添加多个事件，最下面的事件会覆盖上面的，而事件绑定（addEventListener）方式添加事件可以添加多个。
```

####  

## 事件的三个阶段

```
 事件对象e.eventPhase 来获取事件的阶段
```

  值是1 就是捕获阶段
  值是2 就是目标阶段，当前触发事件的阶段
  值是3 就是冒泡阶段

阻止事件冒泡： e.stopPropagation();
			e.cancleBubble=true;

function stopPropagation(e){
  if(e&&e.stopPropagation){
    e.stopPropagation();
  }else{
    e.cancelBubble=true;
  }
}

a标签的跳转：
     //return false;
    //e.preventDefault(); //可以阻止a标签默认的跳转，但是ie8及以前是不支持的。
    //e.returnValue = false; //ie8里面默认的阻止a标签跳转的方式

```
1. DOM0事件模型
	1. 直接在dom对象上注册事件名称，就是DOM0写法
		1. document.getElementById("test").onclick = function(e){};
		2. document.getElementById("test")["onclick"] = function(e){};
	2. 基于DOM0的事件，对于同一个dom节点而言，只能注册一个，后边注册的同种事件会覆盖之前注册的；
	3. 解除设置成null:btn.onclick = null;
2. DOM2事件模型
	1. 支持同一dom元素注册多个同种事件
	2. 新增了捕获和冒泡的概念
	3. 通过addEventListener和removeEventListener(IE8及其以下版本浏览器对应的attachEvent和detachEvent);，分别为："事件名称", "事件回调", "捕获true/冒泡false";捕获事件要比冒泡事件先触发: window--document-body--(捕获)div--(冒泡)body--document-window
	4. 解除事件btn.removeEventListener
```

### 解释一下事件代理

```
1. 其实讲的是事件委托，事件委托的原理是利用事件冒泡，就是自己所触发的事件，让它的父元素代为执行；当li被点击时，由于冒泡原理，事件就会冒泡到ul上，因为ul上有点击事件，所以事件就会触发，
	<ul id="ul1">
	    <li>111</li>
	    <li>222</li>
	    <li>333</li>
	    <li>444</li>
	</ul>
2. 好处：
	1. 用事件委托的时候，根本就不需要去遍历元素的子节点，只需要给父级元素添加事件就好了，其他的都是在js里面的执行，这样可以大大的减少dom操作，提高性能
	2. 使用事件委托，动态添加的节点，事件是也会添加进来；
```



