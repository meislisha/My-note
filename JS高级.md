#### 基础

```
1.in 
	1. 判断对象中 是否有某个值
	2. 判断数组中是否有某个下标
2. delete关键字  
	1. 删除 没有使用 var 声明的变量
	2. 删除数组 中的元素，但是位置还在，只是值为undefined   ，后面的位置不会往前挪
	3.  删除对象中的属性  属性没了
3.js代码的引入方式
	1. <input type="button" onclick="alert('点我干嘛');">
	2. <a href="javascript:alert('点你咋地')">点一点</a>
  3.  script支持设置的属性   async
    	async 异步加载 不阻塞后面的解析
    	<script async src="./js/longlongTime.js"></script>//这样就不会等先引入的文件执行完在执行后面的代码
    	
3. 异常捕获
      try{
        可能会出错的代码，哪怕出错了 后续代码还是会正常执行
      }
      catch(data){
        // 如果出错了 会执行这里的代码
      }finally{
        无论包裹的代码是否有问题 都会执行这里面的代码
        如果有些 无论如何都必须执行的操作 可以放在 finally中
        比如 释放变量 person = null;
      }
      throw{
        手动抛出的错误
       }
```

> 银饰全局变量不具有生命提升
> 严格模式：禁止给没有声明过的变量赋值

#### 

## 面向对象

```
1. 好处：避免全局变量污染
2. js中 对象的属性 是可以 动态添加的 这种特性叫做  动态特性
3.  构造函数
 	1. 构造函数 return了
	    return 基本数据类型没有影响
	    return 复杂数据类型 覆盖默认的返回值
	2. 不使用new关键字调用
	    构造函数，p 对象 undefined 数组 构造函数
	    不使用new关键字 就相当于普通函数的调用
		 var p = Person('超人','小超人'); // 等同于 window.Person，

4.构造函数	 var dog1 = new Dog('哈士奇');
 	 var dog2 = new Dog('萨摩耶');
	   function Dog(name){
	    this.name=name,
	    this.bark=function(){
	      console.log(this.name+'wuwuuwuwuw');
	    }
	    }
			console.log(dog1.bark==dog2.bark)//false 
	5.   function Dog(name){
			    this.name=name,
			    this.bark=bark
			  }
			  	function bark(){
		  console.log(this.name+'wuwuuwuwuw');
		}
	console.log(dog1.bark==dog2.bark)//true   
	优化代码 让所有 dog的 bark方法 指向的都是同一个 function	
```

> setinterval()//this 指向window

### 面向对象

```
1. 一开始我们是面向过程编程，一步一步实现需求，这样比较繁琐，多次使用时，代码太多；
2. 后来就面向函数编程，将面向过程的代码封装到函数中，随着封装的函数越来越多，全局变量也会越来越多，但是这样会造成全局变量污染，
3. 然后就面向对象编程，把原本的函数，变量全部放在这个对象中，使用这种方式，只增加了一个全局变量，其他的方法、属性都在这个对象的内部，解决了全局变量污染的问题；记忆的成本也下降了，只需要记得是哪个对象、接口，通过对象根据文档，或者直接在控制台输出这歌对象，就可以查看这个对象的属性和方法
4.后来就是模块化开发：
    1.使用闭包来实现存在的缺点：
        1. 随着功能的增加，暴露的全局变量也会越来越多；
        2.不能很好的解决模块依赖的问题
    2.使用主流的一些模块化的库，比如requirejs来实现：几乎没有全局变量，解决功能之间的依赖关系，能更好的复用；
```


​         

## 原型

```
1. 是通过构造函数能够访问的一个属性
2. Plant.prototype.constructor:指向的是 构造函数本身
3. 把想要共享的部分 丢到 构造函数的原型中
通过这个构造函数 创建出来的对象 都能够访问原型中的属性
	  // 因为 全部丢在 构造函数中 使用匿名函数 会造成 内存的过分消耗
	  // 原型 把需要实例化的对象 公用的部分 丢到原型中
	//私有的放在构造函数中
	4.  构造函数访问原型
		  属性名是 .proto
		  不建议使用 
	5. 注意点
	      可以为实例化的对象 添加跟原型同名的属性 并不会影响原型中的属性
	      通过实例化的对象访问属性时,先找自己身上的,没有在原型中找
	6.  注意点
	      原型可以直接赋值一个新的对象
	      如果直接赋值一个新的对象 没有了 constructor这个属性了
	        原本的原型3角关系 被破坏了 并不会影响我们常规代码的执行
	      如果我们要把这个关系 再建立起来
	        为了保证3角的稳定性 还是建议写上
	7. 下面会报错，
	8.   
		1.    function Person(){}    
		        Person.prototype.sayHi=function(){console.log(this.name)}
		          var person=new Person();
		        person.sayHi();
		这样不会报错，Person原型对象定义了公共的say方法，虽然此举在构造实例之后出现，但因为原型方法在调用之前已经声明，因此之后的每个实例将都拥有该方法。
		2. 下面的写法；person.say方法没有找到，所以报错了
				  function Person(){}    
		        Person.prototype={
		            constructor:Person,
		            name:'lisi',
		            age:14,
		            sayHi:function(){
		                console.log(this.name);
		            }
		        }
		          var person=new Person();
		        person.sayHi();
			当var person = new Person()时，Person.prototype为：Person {}(当然了，内部还有constructor属性),即Person.prototype指向一个空的对象{}。而对于实例person而言，其内部有一个原型链指针proto,该指针指向了Person.prototype指向的对象，即{}。接下来重置了Person的原型对象，使其指向了另外一个对象,即
		Object {say: function}，
		这时person.proto的指向还是没有变，它指向的{}对象里面是没有say方法的，因为报错。
```

  	构造函数和类对象的区别，	



```

```



## 继承的优缺点

1. **原型链继承**  Child.prototype = new Parent();

   缺点：

   ​	a. 引用类型的属性被所有实例共享，一个对象修改了原型属性，其他的原型属性也会被修改

   ​	b.在创建child的实例时，不能向parent传递参数

   ```
   function  parent(){this.names = ['kevin', 'daisy'];}
   Parent.prototype.getName = function () {
     console.log(this.name);
   }
    function Child () {
   }
   Child.prototype = new Parent();
   var child1 = new Child();
   console.log(child1.getName()) // kevin
   
   child1.names.push('yayu');
   var child2 = new Child();
   //child1.names==child2.names //["kevin", "daisy", "yayu"]
   ```

2. **借用构造函数**（经典继承）  Parent.call(this);

   ```
   function Parent () {
     this.names = ['kevin', 'daisy'];
   }
   function Child () {
     Parent.call(this);
   }
   var child1 = new Child();
   child1.names.push('yayu');
   console.log(child1.names); // ["kevin", "daisy", "yayu"]
   var child2 = new Child();
   console.log(child2.names); // ["kevin", "daisy"]
   ```

   1. 优点： 

      1. 避免了引用类型的属性被所有实例共享

      2. 可以在child中向Parent传参

         ```
         function Child (name) {
           Parent.call(this, name);
         }
         ```

   2. 缺点：方法都在构造函数中定义，每次创建实例都会创建一遍方法

3. **组合继承**（原型链链继承和经典继承双剑合璧）

   ```
   function Parent (name) {
       this.name = name;
       this.colors = ['red', 'blue', 'green'];
   }
   Parent.prototype.getName = function () {
       console.log(this.name)
   }
   function Child (name, age) {
       Parent.call(this, name);
       this.age = age;
   }
   Child.prototype = new Parent();
   var child1 = new Child('kevin', '18');
   child1.colors.push('black');
   console.log(child1.name); // kevin
   console.log(child1.age); // 18
   console.log(child1.colors); // ["red", "blue", "green", "black"]
   var child2 = new Child('daisy', '20');
   console.log(child2.name); // daisy
   console.log(child2.age); // 20
   console.log(child2.colors); // ["red", "blue", "green"]
   ```

   优点：融合原型链继承和构造函数的有点，是javascript中最常见的继承模式

   缺点：调用了两次父构造函数

4. 原型式继承

   ```
   function createObj(o) {
       function F(){}
       F.prototype = o;
       return new F();
   }//就是Object.create的模拟实现,将传入的对象作为创建的对象的原型
   ```

   缺点： 包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样

   ```
   var person = {
      name: 'kevin',
       friends: ['daisy', 'kelly']
   }
   var person1 = createObj(person);
   var person2 = createObj(person);
   person1.name = 'person1';
   console.log(person2.name); // kevin
   person1.firends.push('taylor');
   console.log(person2.friends); // ["daisy", "kelly", "taylor"]
   ```

5. 寄生式继承

   ```
   创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来增强对象，最后返回对象
   function createObj (o) {
       var clone = object.create(o);
       clone.sayName = function () {
           console.log('hi');
       }
       return clone;
   }
   ```

   缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法

6. 寄生组合式继承

   ```
   function object(o) {
       function F() {}
       F.prototype = o;
       return new F();
   } 
   function prototype(child, parent) {
       var prototype = object(parent.prototype);
       prototype.constructor = child;
       child.prototype = prototype;
   }
   // 当我们使用的时候：
   prototype(Child, Parent);
   ```

   







```
1. 原型实现继承
	1. son.prototype=old;
	2. old是一个对象；若是一个构造函数，son.prototype=（old new 出来的一个实例对象）
	3.  把对象复制给原型，需要把人为的添加原型三角（手动加constructor）
	  // 把oldLing 赋值给 LittleLing的原型
	  LittleLing.prototype = oldLing;
	  // 人为的添加原型三角
	  LittleLing.prototype.constructor =LittleLing;
	3.   继承的作用
      对象A 直接从 另外对象中 获取所有的 属性 方法
      可以为 对象A 添加他独有的属性 方法 不会影响原来的
    缺点：
    		
      
2. 原型加混入型：既有继承，还有自己的内容
3. 混入型
	for (var key in oldKing) {
	      littleKing[key] = oldKing[key];
	    }
	    // littleKing 拥有了 oldking的 所有属性
	    console.log(littleKing==oldKing);
4.  Object.create（）方法//（对象）
		ES5 新推出了一个 继承的方法  浏览器中 兼容较好的是 ES5  兼容较差的是 ES6
	  new了一个新的对象
	  把 传入 作为 参数的 那个对象 设置给 新创建的这个对象 的原型属性
	  这种语法 其实 不太好体现 继承的过程 为了方便理解 可以看上面的代码
	  var newFruit = Object.create(goodfruit);
	  console.log(newFruit.lookat);
	js中实现继承的常用方法 混入 原型 原型+混入 Object.create，上下文模式实现继承
	创建一个没有原型对象：var a=Object.create(null)  a._proto_=undefined
5. 上下文模式实现继承 ：call  apply 动态改变this 
    Parent.prototype.grand = 'grand';
    function Parent (name) {
         this.name = name || 'parent';
         this.color = ['red', 'orange', 'yellow'];
     }
     function Child (name,) {
          Parent.call(this, name);
     }
     var child1 = new Child('child1');
     var child2 = new Child('child2');
     优点：1.解决了引用值共享的问题
         2.可以通过Child向Parent传参
      缺点：1.多执行了一次函数 call
					2.Parent上的原型不能被继承
2. Array 扩展内置原型
	1.   Array.prototype.addInfo = function (place) {
		    console.log('原型中的addInfo')
		    for (var i = 0; i < this.length; i++) {
		      this[i] += '--来自于 ' + place;
		    }
		  }
			// 让数组 有这么一个方法
				// addInfo(place) 功能是 调用之后 可以为数组中的 所有元素 追加一条信息 
	3. 安全的扩张
		1.  // 希望拥有数组的全部功能 -- 继承的数组
			  var fatherArr = new Array();
			  XMArray.prototype = fatherArr;
		2. // 为数组 添加一个 自己的 功能 addInfo
			  // 因为是添加在 自己创建的构造函数上,所以并不会影响 Array的原型
			  XMArray.prototype.addInfo = function () {
			    console.log('xmArr--调用了原型中的方法');
			  }
		3.  var xmArr1 = new XMArray();
			  xmArr1.push('大明');
			  xmArr1.push('老明');
			  console.log(xmArr1);
			  xmArr1.addInfo();
		4. // 小红 为数组添加addInfo功能
		  // 这个时候 再去 为Array的原型 添加 同名方法 并不会影响 之前 起别名的那个构造函数
		  Array.prototype.addInfo = function () {
		    console.log('数组的原型中的addInfo');
		  }

var foo = function (){}; var ret = foo();   ret为undefined               
如果函数在执行时，没有指定返回值。但却用变量接收函数执行后的返回值。相当于定义变量，但没赋初值。那么变量的值为undefined。

```

 			

## 原型链

```
1.    对象有原型    __proto__
	  原型也是对象  __proto__
	  对象有原型    __proto__
	  原型也是对象 
	  .......
	  这种链式结构 这种把多个原型 串联起来 形成的结构 称之为  ---原型链
	  原型链的顶端是什么 Object.prototype的原型
2.   对象访问属性的 查找规则
	  自己内部找 =>有 
	            =>没有 自己的原型中找 =>有
	                                 =>原型的原型中找 =>有
	                                 =>原型的原型的原型中找 找到Object.prototype为止
	  如果找到 Object.prototype 都没有 报错 或者返回 undefined
	  找的越远性能越差 所以 如果为了性能考虑 会把属性 定义在 对象中
	  如果找到头还没有 其实是浪费了 很多的性能 这个时候 为了避免这种情况 不要去 访问为null的属性
	  主要是自己写代码的时候注意即可
3. Object.prototype的常见方法
	1.  hasOwnProperty 自己的属性 原型链上不算
	2.   isPrototypeOf 是否是某个对象的原型
		  var objPro = Object.prototype;
		  console.log(objPro.isPrototypeOf(p1));//true
		//isPrototypeOf(p1)   ()里面是实例出来的对象，不能写person(这里输出false)
	3.  toLocaleString
	4.   toString
	5.   valueOf
4. 

对象中有原型，原型也是对象，对象有原型。。。。这样的链式结构把多个原型串联起来形成的结构，就称为原型链，原型链的顶端是Object.prototype的原型也就是null，（Object.prototype.__proto__==null）;
一般对象访问属性的查找规则是，首先在自己内部找，如果自己身上没有，就去原型中找，原型中也没有，就去原型的原型中去找，知道找到Object.prototype为止
在定义构造函数时，一般共有的部分，放在原型中，这样通过构造函数实例出来的对象就都能访问原型中的属性了；
```

## 函数也是对象

```
1. 函数:直接就可以使用 但是 js中全局环境下添加的函数 其实就是 window对象的 方法
 // 方法:对象.出来的

2. // js中 函数就是对象
function Person(name) {
	    this.name = name;
	  }
	  Person.eatFood = function () {
	    console.log('吧唧吧唧嘴,好好吃');
	  }
	  // 通过构造函数来访问
	  Person.eatFood();
	var p = new Person();
	  // p.eatFood();//报错
2. 函数创建的几种方式
	  1. 函数声明
	  function eatNoodle(){
	    console.log('滋遛滋遛');
	  }
	  eatNoodle();
	
	  2. 函数表达式
	  var eatBigSuan = function(){
	    console.log('口感嘎嘣脆');
	  }
	  eatBigSuan();
	
	  3. 使用Function 来创建
	  // 如果之传入一个 字符串 作为函数体
	  // 如果传入 多个字符串 最后一个 作为函数体 之前的 作为 形参
	  // 这种用法 实际开发时 不是很频繁
	  // 面试官问 如何使用Function创建函数 如何设置函数体 形参
	  var eatDumpling = new Function('name','console.log(name+"好吃不过饺子;蘸醋才好吃")');
	  eatDumpling('三鲜饺子');
3. 使用Function 创建  函数体很长的解决方案
	1. 拼接字符串
	2. 创建函数 多行
		1. var eatDumplings = new Function('name',
		    'for(var i =0;i<10;i++){' +
		    'console.log(name+"好好吃 "+i);' +
		    'console.log("老板再来一碗");' +
		    '}'
		  )
	3. 创建函数 多行 --03 模板的方式来实现
		1. var eatDumplings = new Function('name',document.querySelector('script[type="text/html"]').innerHTML);
	4. 创建函数 多行 --04 如果 js支持 多行字符串呢?
		 // 使用 ``(数字1的左边) 可以写多行字符串 
		  // ECMAScript的 版本6 ES6 
		  var eatDumplings = new Function('name',
		  `for(var i =0;i<100;i++){
		      console.log(name+'好好吃'+i);
		    }
		    console.log("老板,我吃不下了");`
		  );
		  eatDumplings('番茄鸡蛋饺子');
	5. Function 原型关系图
		1. 函数也是 对象
		  构造函数 是对象
		  函数既然是对象 他就是他自己的构造函数
		  所有函数的构造函数都是 Function
	6. 实例成员 p.name
	7. 静态方法(静态属性)   Person.sayHello();
	8. 总结:
	      原型
	        公共的部分 丢原型中
	        实例化出来的对象 都有
	      原型链
	        对象使用属性 方法 会顺着原型链 依次往上找 
	        如果忘记代码 可以试着顺着原型链往上去检索 对应的关键字
	      函数也是对象
	        所以看到 函数.属性 函数.方法 不要诧异
	9. arguments caller
		1. arguments 实参 模拟函数重载
		2. caller
			1.  在哪个函数中 调用的 这个函数
			2.  如果是全局环境下 那么 为null
			3.  如果是在其他函数中 调用 就能够访问到那个函数
		3. 直接通过 函数对象 访问的 属性 静态属性
			length 形参的个数
	10. arguments
		1. 函数的arguments属性 跟 函数内部的 arguments有什么区别?
	      内容是一样的
	      函数.arguments是 定义在 Function原型上的属性
	      第二个是 函数内部的变量
			 console.log(TDDog.arguments == arguments);//false
	11. arguments.callee 函数自身
		1. arguments.callee的使用情境
			避免 外部 修改了 函数名 指向的 内容 导致无法实现 递归
		12. eval()
			1.  eval这个函数
			  可以把 字符串格式的js代码 转化为 可以执行的js代码
			  相当于 把我们传入的 字符串 变为 普通的js代码 然后放在 调用 eval的 位置
			2. 转化JSON格式的字符串
				1.  var JSONString = '{"name":"泰罗奥特曼","enemy":"小怪兽","enemyName":"小林林"}';
				2. var obj= eval(JSONString);//会报错，
				3. JS中 
					1. 没有 块级作用域 ， 
					2. js会忽略 {} ，
					3. 为了让 js不忽略这个大括号 让js把他们看作是一个整体 (1+1)*2
					4. 可以：a.var obj = eval('(' + JSONString + ')'); 
							b. 'var obj = {"name":"泰罗奥特曼","enemy":"小怪兽","enemyName":"小林林"}'
			3. 优点
				4. 缺点：
			1. 别人可以随意的输入 js代码 并且被解析为 js，eval 慎用
```

> // eval 能不能解析JSON?  能
> // 如何解析? 两边加上大括号
> // 不加小括号错在哪? 忽略了 两边的 大括号

> 在js 中  对象都最终继承自Object.prorotype

![yuanxinglian](C:/%E4%BF%A1%E6%81%AF%E7%9B%B8%E5%85%B3/2019/%E8%B5%84%E6%96%99/yuanxinglian.png)

## 四、第四天

### 一、递归

```
  1. 递归是什么
          函数内部  调用这个函数
  2. 如何写一个能够正常执行的递归
    函数内部  调用这个函数
    要有跳出的条件
  3. 递归用来干什么
      用来解决一些算法问题
      用简洁的代码来是写一些复杂的功能
  4. 如何使用递归来实现一些功能
        递归需要我们分析出规律
        把规律转化为代码  
5. example:
	1. function getResult3(n){//斐波那契数列
		    if(n==1||n==2)return 1;
		    return getResult3(n-1) + getResult3(n-2);
		  }
		  console.log(getResult3(100));      
	2. function getResult1(n) {//阶乘
		    if (n == 1) return 1;
		    return getResult1(n - 1) * n;
		  }
	  console.log(getResult1(100));  
	3. function getResult2(n, m) {//求n的m次方
	    if (m == 1) return n;
	    return getResult2(n, m - 1) * n;
	  }
	  console.log(getResult2(100,100));   
	4. 通过递归获取后代元素
		1. 通过not 选择器 console.log(document.querySelectorAll('body *:not(script)'));  
			语法 :not(普通选择器)//对 括号中的 选择器 取反    
		2. 递归获取后代元素：
			 var list=[];
		    function findChildren(ele){
		        var childrenlist=ele.children;
		         for(var i = 0 ; i < childrenlist.length; i++){
		             list.push(childrenlist[i]);
		             findChildren(childrenlist[i])
		           }
		    }
		    findChildren(document.body);
		    console.log(list) 
		3. 自己实现 根据id获取dom元素
			 function getIdChild(id){
		         for(var i = 0 ; i < list.length; i++){
		             if(id==list[i].id){
		                 return list[i];
		             }
		           }
		    }
		    console.log(getIdChild('special'))
		4. 根据class获取 dom数组
			    var classList=[];
			    function getClass(classname){
			         for(var i = 0 ; i < list.length; i++){
			             if(list[i].classList.contains(classname)){
			                 classList.push(list[i]);
			             }
			           }
			    }
			    getClass('first');
			    console.log(classList)                                                                                                
```

### 二、作用域

```
变量的查找规则:
  当我们使用某个变量时,会依次逐级的顺着作用域往外找,找到最顶级 window 为止,
查找的这个过程中,相当于 把这些作用域串起来了,这个结构 我们称之为 作用域链
  静态作用域(词法作用域)? js是静态作用域
  变量的值是多少,取决于函数定义的位置,跟函数调用的位置没有 半毛钱关系

函数可以创建作用域 作用域中可以在定义函数 函数可以创建作用域 作用域中可以定义函数
作用域中 可以再次创建作用域 可以循环往复
```

#####  如何改变函数的作用域，也就是this指针

```
1. 使用apply()方法：
   #
       function sum(x, y) {
        alert(this); return x + y;//这里的this指的是callS对象方法
       }
       function callS() {
        callS.callSum1(1, 2);
       }
       callS.callSum1 = function (x, y) {
        alert(this);//这里的this是callS方法
        var s = sum.apply(this, arguments);
        return s;
       }
        callS();
2. 使用call()方法：
   #
       window.color="red";
       var o ={color:"blue"};
       function sayColor(a,b){
        alert(this.color);
       }
       sayColor();//red
       sayColor.call(this,1,2);//red
       sayColor.call(window,1,2);//red
       sayColor.call(o,1,2);//blue  
3. new关键字：
   #
       function Person(name,age){
            this.name=name;
            this.age=age;  this.sayName=function(){alert(this.name);};
       }
       var p1 = new Person("james",27);
       var p2 = new Person("coook",24);
       p1.sayName(); p2.sayName();
   1. 创建对象；
   2. 将构造函数作用域赋值给新对象(this就指向了该新对象)；
   3. 执行构造函数中的代码(为新对象添加属性)；
   4. 返回新对象
```



### 三、变量提升

```
1. a.预解析阶段，提升 
	b. 变量的声明  函数的声明 到变量所在作用域的 顶端
2. 函数同名：最后声明的 会把 之前声明的 覆盖
3. 函数 跟变量同名：
	1. 最终的结果是 我们通过那个名字获得的是 函数
		 drinkWater();
	    var drinkWater = '自来水,最解渴,但是别贪杯哦';
	    function drinkWater() {
	      console.log('咕噜咕噜');
	    }//输出'咕噜咕噜'
	2. 报错
	   var drinkWater = '自来水,最解渴,但是别贪杯哦';
	    function drinkWater() {
	      console.log('咕噜咕噜');
	    }	
```

 			drinkWater();
	4. 条件式 声明
			1. 变量能够提升,但是需要注意的是 如果 条件式声明 函数 只会提升 声明 函数的 代码 不会提升
  			如果是条件式 语句 中是 函数声明 可以把它看做 var func = function(){}只会提升 var func 赋值语句不会提升
				// bark();
		        console.log(bark);
		        var isDog = true;
		        if (isDog == true) {
		            function bark() {
		                console.log('嗷呜~!~!~!~!~!~!~!~!');
		            }
		        } else {
		            function bark() {
		                console.log('喵喵~!~!~!~!');
		            }
		        }
	5. 变量提升 是分 区域的
		1. 提升到了 变量所在 的 script标签的 顶端之后 不会跨域 script标签
		2. 从上往下执行，所以后面script标签可以访问上面的script标签
	5. 函数表达式 如何提升
		1.  // sing();//会报错，var sing  提升了，所以调用会报错；
			  console.log(sing);//undefined
			  var sing = function () {
			    console.log('叽叽喳喳叫,崩~!!!!!.不叫了');
			  }

> Function.constructor:Function

## 五、第五天

### 一、闭包

```
1.   闭包是什么?
      函数中 返回函数(对象)
      function outer(){
        function inner(){}
        return inner;
      }
      函数能够创建作用域
      函数执行完毕之后 这个函数创建的作用域 不在?在? 
        不在的 会被回收,会被释放
      在函数创建的作用域中 声明的变量 还能够被访问到吗?
    闭包能够干嘛?
      延长变量的 生命周期
      对外提供有限的访问权限
    闭包的缺点?
      会导致内存无法回收  消耗内存
      实际开发中 慎用
2. 作用：利用闭包 对外提供有限的访问权限，对某些变量提供保护功能  来解决 直接修改的问题
3.   1.闭包
	    函数内部 返回函数 函数也是对象
	    函数内部 返回对象
	  2.闭包的作用是 
	    对外提供有限的访问权限
	    对某些变量提供保护功能
	  3.如果要在方法中返回多个值
	    return 多次 肯定是不行
	    第一个return 会终结这段代码
	    返回一个对象 把要返回的内容 丢到 对象中 即可
3. 下面这种写法：可以直接修改 money属性
```

 		  有一天 有意或者无意的直接修改了 某个属性的值 会造成 逻辑的问题，采用闭包就不会有这种问题
		var moneyBag = {
		    money: 1000,
		    useMoney: function () {
		      this.money -= 100;
		    },
		    earnMoney: function () {
		      this.money += .5;
		    }
		  }

```
4. 内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除（最后设置成null）
```

### 闭包

```
1. 闭包函数中返回函数(对象)，就是能够读取其他函数内部变量的函数。
2. 对外提供有限的访问权限（想jquery就是用），延长变量的使用周期，但是会导致内存泄漏，所以实际开发中会慎用，
3. 一般的使用场景有：
进行模块化时，一般可能会使用闭包,
闭包可以用在许多地方。它的最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中，不会在f1调用后被自动清除。
    b.如果一段代码想通过setTimeout来调用,也会用到闭包；
    1. 匿名自执行函数
    2.结果缓存  
        处理一个很耗时的函数对象时（比如斐波拉切数列），每次调用都会花费很长时间，那我们就可以使用闭包，因为它不会释放外部的引用。调用这个函数时，首先在缓存中找，如果找不到，则进行计算，然后更新缓存并返回值，如果找到了，直接返回查找到的值即可
    3.封装（模块化），在封装的函数外无法访问其内部的变量，而通过提供闭包的形式来访问；像requirejs中就经常用到闭包；
    4. 实现面向对象的对象，函数中返回对象，对象拥有一些属性和方法，这样实例化的不同对象，就拥有独立的成员和状态，互不干涉；
```

### 强制釋放閉包

```
 var outer = (function () {
            var num = 100;
            return {
                add: function () {
                    console.log(num);
                },
                clear: function () {
                    num = null;
                }
            }
        })()
```



## 二、缓存

```
1. 缓存是什么?
	      占时保存某些东西,需要使用的时候可以拿出来用
	    缓存的特点?
	      暂时保存某些东西
	      大小有限制
	      如果保存的东西太多了会清除之前的内存
	        把一些东西占时保存起来,下次需要使用时,直接使用
	        提升用户体验,让原本需要等待很长时间的操作,变得十分的方便快捷
2.  使用缓存来优化代码
  把一些内容保存在缓存中
  每次要计算时 缓存中是否有
                        -->有  直接使用
                        -->没有 计算结果 保存到缓存中
                          ----------------结果
3. 闭包实现缓存功能
	 1.缓存数据
      cache = {};
    2.有限的缓存量
      maxCount = 20;
    3.容量用完了之后,删除第一个保存进来数据
      删除保存的数据 delete cache[key]
      使用数组 keys = [] 来保存下标
      每次保存数据
        数据保存到对象中 cache[key] = value
        保存到数组中 keys.push(key);
        如果保存满了
          取出数组的第一个元素 var firstKey = keys[0];
          delete cache[firstKey];
          删除数组的 第一个元素 shift
4. function createCache_plus() {
    var cache = {}; // 缓存对象
    var maxCount = 3; // 最大保存数量
    var keys = []; // 保存很多键 删除第一条数据时 方便获取
    return function (key, value) {
      if (value != undefined) {
        if (keys.push(key) > maxCount) {
          delete cache[keys.shift()];
        }
        cache[key] = value;
      } else {
        return cache[key];
      }
    };
  }
5.js中函数也是对象
      最终优化利用了 这个特点吧数据保存在了 返回的命名函数上 节约了一个对象声明
      优化到了这一步
        暴露了所有的数据外部可以肆意的修改
 	function createCache_plus() {//
    var maxCount = 3; // 最大保存数量
    var keys = []; // 保存很多键 删除第一条数据时 方便获取
    return function (key, value) {
      if (value != undefined) {
        if (keys.push(key) > maxCount) {
          delete arguments.callee[keys.shift()];
        }
        arguments.callee[key] = value;
      } else {
        return arguments.callee[key];
      }
    };
  }
6. Jquery实现闭包缓存功能代码
	  function createCache() {
    var keys = [];
    return function (key, value) {
      if (keys.push(key + " ") > 50) {
		//jQuery的缓存中 对于 传入的key 额外追加了 " "
		//目的是 避免跟函数对象自身存在的属性重名 造成 属性覆盖的问题
        // Only keep the most recent entries
        delete arguments.callee[keys.shift()];
      }
      return (arguments.callee[key + " "] = value);
    };
  }
```

## 三、自执行函数和沙箱（沙盒模式）

```
1. 自执行函数
	1. 自执行函数 需要被正常的解析 必须跟之前的代码 有一个明显的分隔，否则就会出现无法正常解析的问题
		(function(){console.log('我调用了')}())
			;(function(){console.log('我也调用了哦')})()
	2. 沙箱：  使用自执行函数实现密闭空间  封闭,这种模式 称之为沙箱
		 1.  (function () {
			    // 缓存对象
			    var cache = {};
			    // 有一些框架 不是使用return 而是直接 对外暴露 这个对象的 访问权限
			    // console.log('自执行函数');
			    // 使用这种方式暴露 一般是 某些框架
			    // 严格告诉你 要用我的这个框架 必须使用哪个对象
			    // 直接访问window 相当于内部世界 直接影响外部世界
			    window.cache = window. = cache;
			  })()
		2.    推荐的写法
			  // 形参 等同于 在函数的最顶部 声明了一个变量
			  // 下面这种写法 是外部主动的传递给内部
			  // 方便 代码压缩工具去压缩代码
			  // 压缩的原理是 找到 声明的变量 把名字 变为 var abc = a; vac hahaha = b
			  // 使用下面这种方式 也是可以让我们压缩代码
			  (function (window) {
			    // 缓存对象
			    var cache = {};
			    // 有一些框架 不是使用return 而是直接 对外暴露 这个对象的 访问权限
			    // console.log('自执行函数');
			    // 使用这种方式暴露 一般是 某些框架
			    // 严格告诉你 要用我的这个框架 必须使用哪个对象
			    // 直接访问window 相当于内部世界 直接影响外部世界
			    window.cache = window. = cache;
			  })(window)
	3. jQuery的沙箱模式
		  // jQuery的最外层组成
		  // jQuery第二个形参是undefined的含义
		  // 全局环境下 有一个叫做 undefined的变量 默认值 是 undefined
		  // 早期undefined是可以被修改的
		  // 我们希望 undefined就是 undefined 但是undefined可以被修改
		  // 定义了一个叫做undefined的形参 不传入任何的 实参 那么 这个undefined 就是 undefined
		  (function (window, undefined) {//不传第二个参数，undefined就是undefined
		    console.log(undefined);
		    // 声明变量
		    var cache = {};	
		    // 为这个变量增加功能
		    // 对外暴露使用的方式
		    // window.jQuery = window.$ = jQuery;
		    window.cache = window._CACHE = cache;
		  })(window)
	4. 数组的循环方法：forEach  map
		1. forEach
			Array.prototype.myeach=function(fn){
			    for (var i = 0; i < this.length; i++) {
			        fn(this[i],i,this);
			    };
			}
			var arr=[1,2,3,4];
				arr.myeach(function(v,i,arr){
				    console.log(v,i,arr)
				})
		2. map
			Array.prototype.mymap=function(fn){
	    		var data=[];
			    for (var i = 0; i < this.length; i++) {
			        data.push(fn(this[i],i,this));
			    };
			    return data;
			}
```


​	

```

	    		var result=arr.mymap(function(v,i,a){
	    		    console.log(v,i,a);
	    		    return i+'heheda';
	    		})
			var result=arr.mymap(function(v,i,a){
console.log(v,i,a);

		    return i+'heheda';

		})
```

 		 

## 四、函数的几种调用方式 this是谁

```
Javascript函数的this指向调用方，谁调用this就指向谁，如果没人谁调用这个函数，严格模式下指向undefined，非严格模式指向window。
1. 当做函数开直接调用
	 相当于是省略了 window
	  function eatFood(){
	    console.log(this);
	  }
	  eatFood();// 省略了 window.
2. 当做方法调用
	  谁点出来的 就是谁
	  var obj = {
	    sayHi:function(){
	      console.log(this);
	    }
	  }
	  obj.sayHi();
	  obj['sayHi']();
3. 构造函数
	  使用new关键字 调用时 构造函数内部的this 是指向 创建出来的实例化对象
	  var obj = {}; this = obj
	  function Person(){
	    console.log(this);
	  }
	  new Person();

		  function person() {
	            console.log(this);
	            return  1;
	            return  [1,2];
	        }
	       var p= person();
	       console.log(p)
	        var p1=new person();
	        console.log(p1)
4. 一些问题
	1. 问题1 
		  // 函数的调用情境 是可以更改的
		  var ani = {
		    bark:function(){
		      console.log(this);
		    }
		  }
		  ani.bark();// ani
		  var bark = ani.bark;
		
		  bark();//window

    2. 数组也是对象
		  // 对象[key]() this 就是 对象
		  var arr =[
		    function(){
		      console.log(this);
		    },
		    function(){
		      console.log(this);
		    }
		  ];
		  arr[0](); // this 是arr

   3. 问题3
	  // {}在比较时 作为key是 会调用 toString()
	  // {}.toString() [object Object];
	  var obj2 = {
	    name:'rose'
	  };
	  obj2[{}] = function(){
	    console.log(this);
	  }
	  // this 是谁? 当前这个对象
	  obj2[{}]();
	
	  // 使用点语法来访问 我们[{}] 绑定的 那个函数 
	  // obj2.'{}';//报错
	  obj2['[object Object]']();
	
	  // 复杂数据类型 跟基本数据类型比较时 会调用 valueOf toString方法
	  // 如果把一个对象 直接当做key
	  // obj[{}] 内部 调用{}的 toString方法
	  // 等同于 obj['[object Object]'] = value
```

## 五、jQuery插件写法

```
1. jQuery.extend
	  // 这种功能一般是为$对象 直接增加可以访问的方法 
	  // 使用频率较低
		  $.extend({
			    sayHello: function () {
			      console.log('你好我是jQuery,这是一个打招呼的插件');
			      console.log(this);
			      console.log(this == $);
			    }
			  })
			  // this 是谁：$
			  $.sayHello();
2. $.fn.extend   this 是jQuery对象
	$.fn.extend({
	    becomeYellow: function () {
	      console.log('我们是黄种人');
	      // this 是jQuery对象
	      // 因为我们在调用是 是 通过jQuery对象.出来的
	      // $('div').becomeYellow();
	      console.log(this);
	      // 既然this是jQuery对象
	      this.css('backgroundColor', 'yellow');
	      // 为了能够链式编程 还要 返回 this
	      return this;
	    }
	  }) 
3. 特殊情况  这里this不是jquery对象，而是Dom 对象
	$('body').click(function(){
	     console.log(this);
	     this.innerHTML = '我是Dom';
	   })//知识绑定事件，实际点击时是document.body.onclick
	  jQuery基于js封装的一些函数库
	  $('body').click(function(){console.log(this);});
	  内部 可以理解为 就是 document.body.onclick  = function(){}
	  当我们触发了 body的 点击事件时 等同于 document.body.onclick();
	  所以这里的this 就是 绑定的那个 dom对象
```

## 六、apply()、call()上下文调用模式

```
bind  不会立马执行，只有触发的时候才会执行，apply和call
1. bind()
	1. 第一个参数this的指向
	2. 第二个参数开始是接收的参数列表。区别在于bind方法返回值是函数以及bind接收的参数列表的使用
	3. bind返回值时函数，不会立即执行，而是返回了一个改变上下文this后的函数，而原函数的this并没有被改变
	4. 自己写if (!Function.prototype.bind) {
    Function.prototype.bind = function () {
        var self = this,                        // 保存原函数
            context = [].shift.call(arguments), // 保存需要绑定的this上下文
            args = [].slice.call(arguments);    // 剩余的参数转为数组
        return function () {                    // 返回一个新函数
            self.apply(context, [].concat.call(args, [].slice.call(arguments)));
	        }
	    }
	}
1. call()
	1. 动态的改变this
	2. 参数1 是this是谁
	3. 参数2 ...参数n 传递给 函数的 实参
    		4.  test.call({name:'jack',skill:'you jump i jump'},'icemountain','robot');
    1. apply()
       1. 动态的改变this
       2. 参数1 this是谁
          1. 参数2 传入一个数组(伪数组),传递给函数的 实参
          2. 如果是伪数组 length 跟 个数不匹配 不足的使用undefined补齐 如果length较短去掉多余
          3. 伪数组 {0:'jack',1:'rose',length:2};//length一定要写
          4. test.apply({name:'rose',skill:'swim'},{0:'jack',1:'rose',length:1});
          5. test.apply({name:'rose',skill:'swim'},['ice','rose','lilis']);
    2. call(),apply() 注意点
       1. 若什么都不传，内部的this是 window
       2. call(null),apply(null) 内部的this也是 window
       3. 如果传入的是 基本数据类型 把他转化为 其 对应的 包装类型，this 就是 传入的这个基本类型的 包装类型
           test.call(1); // num
            test.apply('eatFood');// string
            test.apply(false);// boolean
    3. apply应用（第一个参数传入调用的那个对象：目的是为了希望this不要发生修改，还是传入之前调用的那个对象）
       1. 准备一个真数组 把伪数组的内容全部都 丢到 真数组
            realArr.push.apply(realArr, fakeArr);
       2. 计算数组的 最大值
          	var max = Math.max.apply(Math,numArr);
    4. call()应用
       1. 使用typeof（复杂数据类型 除了 function 都是 object）
       2. 如何才能够获取真实的类型呢?
       3. 开发时如果要获取更为详细的类型 可以使用 Object.prototype.toString.call(对象(数组,日期等));
          Object.prototype.toString.call([]); 获取详细类型
       4. console.log(Object.prototype.toString.call(obj2));
    5. 自己为所有的对象 都添加一个 可以获取类型的方法call()
       	 Object.prototype.heima_toString=function(){
       			// 返回的格式 [object Object/Date]
       	        var result="[object ";
       			//通过对象获取原型 通过原型 获取构造函数的名字
       	        result+=this.__proto__.constructor.name;
       	        result+="]";
       	        return result;
       	    }
       	    console.log(arr.heima_toString()); 
    6. 上下文模式实现继承
       1. function Student(){
              this.skill = '上课睡觉流口水';
              this.goodAt = '体育';
            }
            function StudentKing(){
              // 继承普通学员的内容//构造函数调用是 this 是创建出来的 那个学霸对象
              Student.call(this);
              // 自己的技能
              this.selfSKill = '这次考得真差';
            }
```

### bind apply bind 区别

```
1. bind返回对应函数，便于稍后调用；applyy\call则是立即调用
2. 在es6箭头函数下  call、apply将失效
	1. 箭头函数体内this对象，就是定义时所在的对象，而不是使用时所在的对象
	2. 剪头函数不可以当做构造函数，也就是说不可以使用new命令，否则会抛出一个错误
	3. 箭头函数不可以使用arguments对象，该对象在函数体内不存在，如果要用，可以用Rest参数代替
	4. 不可以使用yield命令，因此剪头函数不能用作Generator函数
```

#### 模拟实现call\apply\bind

1. 改变this

   改变一个函数的this很简单，首先将这个函数赋值给this要指的对象，然后对象调用这个函数，执行完从对象上删除这个函数就可以了

   ```
   obj.foo=foo
   obj.foo()
   delete obj.foo
   ```

   ```
   Function.prototype.call2=function(context){
     context=context||{}
     context.func=this
     context.func()
     delete context.func
   }
   ```

2. 传参调用

   ```
   Function.prototype.call2=function(context){
     context=context||{}
     var params = [...arguments].slice(1);//因为第一个是this指向
     context.func=this
     context.func(...params)//参数传到func中
     //另一种方式eval():参数拼接成一个字符串，传给eval函数去执行，
      eval('context.func(' + params.join(",") + ')');
     delete context.func
   }
   ```

3. call、apply另外两个重要的特性，

   1. 可以返回函数执行结果

   2. 接受null或undefind为参数的时候将this指向window，

      ```
      Function.prototype.call2 = function(context) {
        context = context || window;
        var params = [...arguments].slice(1);//因为第一个是this指向
        // 注意，此处的this是指的被调用的函数
        context.func = this;
        var res = eval('context.func(' + params.join(",") + ')');
        delete context.func;
        return res;
      }
      ```

   3. this:基本数据类型 把他转化为 其 对应的 包装类型

      ###### 步骤：

      ```
      1. 更改被调用函数的this 这里就可以content.fn=this   content.fn()  delete  this
      2.将参数传给被调用函数  var args = [...arguments].slice(1); content.fn(args) 
      3. 将被调用函数结果返回
      4.第一个参数为null或undefind的时候，被调用函数的this指向window
      5. 为基本数据类型时，返回其包装类型
      
      //最终版
      Function.prototype.mycall = function(context) {
      	 if (context === null || context === undefined) {
      		context = window;
        } else {
      		context = Object(context) || context;
        }
      	// 给context添加一个属性
      	context.fn = this;
      	// 获取参数
      	var args = [...arguments].slice(1);
      	// 执行该函数
      	var result = context.func(...args);
      	// 删除fn	
      	delete context.fn;
      	// 返回执行结果
      	return result;
      }
      
      Function.prototype.myApply = function(context) {
      	 if (context === null || context === undefined) {
      		context = window;
        } else {
      		context = Object(context) || context;
        }
      	// 给context添加一个属性
      	context.fn = this;
      	var result
        // 需要判断是否存储第二个参数
        // 如果存在，就将第二个参数展开
        if (arguments[1]) {
          result = context.fn(...arguments[1])
        } else {
          result = context.fn()
        }
      	// 删除fn	
      	delete context.fn;
      	// 返回执行结果
      	return result;
      }
      
      
      
      Function.protptype.mybind=function(context){
      	let self=this;
      	return function(){
      		return self.call(context,arguments);
      	}
      }
      
      Function.prototype.myBind=function(context){
      	if(typeof this!=='function'){
      		thorw new TypeError('Error')
      	}
      	var _this=this
      	var args=[...arguments.slice(1)]
      	return function F(){
      		if(this instanceOf F){
      			return new _this(...args,...arguments)
      		}
      		return _this.apply(context,args.concat(...arguments))
      	}
      }
      ```

      

## 七、沙箱（沙盒）模式/自执行函数

```
1. 使用自执行函数实现密闭空间   封闭,这种模式 称之为沙箱
2. 有一些框架 不是使用return 而是直接 对外暴露 这个对象的 访问权限
3. 严格告诉你 要用我的这个框架 必须使用哪个对象
4. 直接访问window 相当于内部世界 直接影响外部世界
		window.cache = window.$ = cache;
5.   (function (window) {
		    var cache = {};
		    window.cache = window.$ = cache;
		  })(window)
6. jquery沙箱模式
	1.  (function (window, undefined) {
	    var cache = {};
	    // window.jQuery = window.$ = jQuery;
	    window.cache = window._CACHE = cache;
	  })(window)
	2. jQuery第二个形参是undefined的含义
		1. 全局环境下 有一个叫做 undefined的变量 默认值 是 undefined
		2. 早期undefined是可以被修改的
		3. 我们希望 undefined就是 undefined 但是undefined可以被修改
		4. 定义了一个叫做undefined的形参 不传入任何的 实参 那么 这个undefined 就是 undefined，有两个形参，但是只传一个参数，所以undedfined 就是undefined
```

#### js的底层原理 、执行上下文

```
js的执行上下文分为3种：

1. 全局执行环境
2. 局部执行环境
3. eval()执行环境
在一段代码中可能会产生多个执行上下文，在JS中用栈这种数据结构来管理执行上下文，栈的特点是“先进后出，后进先出”

执行上下文的特点
  1. 栈底永远是全局执行上下文，有且仅有一个
  2. 全局执行上下文只有在浏览器关闭时，才会弹出栈
  3. 其他的执行上下文的数量没有限制
  4. 栈顶永远是当前活动执行上下文，其余的都处于等待状态中，一旦执行完毕，立即弹出栈，然后控制权交回下一个执行上下文
  函数只有在每次被调用时，才会为其创建执行上下文，函数被声明时是没有的。
执行上下文可以形象的理解为一个普通的JS对象，一个执行上下文的生命周期大概包含两个阶段：
	1. 创建阶段：此阶段主要完成三件事件，1、创建变量对象 2、建立作用域链 3、确定this指向
	2. 执行阶段：此阶段主要完成变量赋值、函数调用、其他操作
js运行原理：
  1. 每调用一个函数就会生成一个执行环境，执行上下文环境数量没有限制
  2. 栈顶永远是正在执行的函数，函数执行完，弹出栈，以此类推，全局环境在最底部，
  3. 单线程
  4. 同步执行，只有栈顶的上下文处于执行中，其他上下文需要等待
  5. 每次某个函数被调用，就会有个新的执行上下文为其创建，即使是调用的自身函数，也是如此
  
  
  垃圾回收机制：
  1. 标记清除：当变量进入环境时，会标记为"进入环境"，而当变量离开环境时，会标记为"离开环境"。垃圾收集器运行时会给所有存储在内存中的变量都加上标记，然后它会去掉环境中的变量以及被环境中的变量引用的变量的标记。而再次之后在被标记的变量就是被视为准备删除的变量，因为环境中的变量已经无法访问到这些变量了。
  2. 引用计数：声明变量，并将一个引用类型赋值给该变量时，则引用计数+1，如果同一个值赋值给另一个变量，则引用计数-1；当引用计数为0的就会被回收
```



## 框架步骤

```
1. 面向过程
2. 函数封装
3. 抽取到对象中（this.songList）
4. 构造函数+原型
5. 闭包保护对象（songList  共有的对象）
	1. 提供有限的访问权限
	2. 因为权限有很多 所以我们返回一个对象
6. 构造函数+闭包+原型
7. 构造函数+闭包+原型+自执行函数
```

> 数组中删除某个值， var index=this.songList.indexOf(obj);
>                 this.songList.splice(index,1)

```
函数调用：window 
```

  方法调用：指向调用的对象 
 构造函数调用 
 上下文模式：可以改变

```
  function Person(a,age){
	  this.name=a;
	  this.age=age;
	  this.sayhi=function(){
		  console.log(this);
	  }
  }
  var p1=new Person('lisi',40)
  console.log(p1.__proto__==Person.prototype);//t
  console.log(p1.__proto__.__proto__);//==Object.prorotype
  console.log(Object.prototype==Person.prototype);//f
  console.log(Function.prototype==Person.__proto__);//t
  console.log(Object.prototype==p1.__proto__.__proto__);//t
  console.log(({}).__proto__==p1.__proto__.__proto__);//t
  console.log(({}).prototype==p1.__proto__.__proto__);//f
  console.log(Object.prototype==Person.prototype.prototype);//f
  console.log(Object.prototype==Person.prototype.__proto__);//t
  console.log(({}).__proto__.toString.call([]));//[object Array]
```



## 补充

```
1. 获取类型
	1. 如果把一对大括号赋值给其他变量，或者参与运算，那么大括号就变成了字面对象。
 console.log(obj.toString()===Object.prototype.toString());//true
    console.log(arr.toString()===Object.prototype.toString());//false
	{}.toString();//错误，代码块不能调用方法
2. jquery对外暴露的jquer和$ ，调用这两个方法，可以得到jQuery实例对象，jquer和$ 实际上是一个工厂函数；
3. jQuery实例对象是一个伪数组对象
	var $div=$('<div></div>');
    console.log($div);//[<div></div>];
    console.log(({}).toString.call($div));//[object Object]
4. 借用数组的push方法给obj按照下标的方式添加属性值，并且会自动维护lenghth属性
	1. [].push.apply(obj,[1,2,3,4]);
5. 借用数组的pop方法删除obj最后一个属性值
    [].pop.call( obj );
6. jq入口对不同参数处理的规律：
    1、传入null、undefined、0、NaN、''返回空对象( 即空实例 )
    2、传入字符串，那么需要判断是html片段 还是 其它，
    如果是片段，则创建对应的DOM，然后添加到实例身上；
    否则按照选择器获取页面中的DOM，然后把获取到的DOM添加到实例身上。
    3、如果是数组或许伪数组，那么把每一项分别添加到实例身上。
    4、除了上面的数据类型，剩余的，统一添加到实例身上。
```



```
   function fn(){
       num=100;            //num没有声明就直接赋值
   }

   //console.log(num);       //隐式全局变量不具有声明提升，15行会报错

   fn();
   console.log(num);       //num就是一个全局变量

 //ES5的严格模式：禁止给一个没有声明过的变量赋值
    "use strict";
    function f1(){
        str="hello";
    
    }
    f1();
     for(var i=0;i<6;i++){
	        setTimeout((function(){
	            var currenti=i;
	            return function(){
	                console.log(currenti);
	            }
	        })(),i1000)
	    }
	//将var 变成let   就可以不用使用闭包
	    for(let i=0;i<6;i++){
	        setTimeout(function(){
	            console.log(i);
	        },i1000)
	    }
	
```

```
let  if for 外访问不到i,没有变量提升
```

####隐式转换

```
1. 转成string类型： +（字符串连接符） 2..转成number类型：++/--(自增自减运算符) + - * / %(算术运算符) > < >= <= == != === !=== (关系运算符)
！！
2. 转成boolean类型：!（逻辑非运算符）
```

1. 闭包是什么，有什么特性，对页面有什么影响，闭包的实例

   ```
   1. 函数中返回函数(对象)，内部函数可以访问其所在的外部函数的变量和参数；
   2. 对外提供有限的访问权限（想jquery就是用），延长变量的使用周期，但是会导致内存泄漏，所以实际开发中会慎用，
   
   特性：
   1. 封闭性：外界无法访问闭包内部的数据，闭包内声明变量，外界是无法访问的，除非闭包主动像外界提共访问接口
   2. 持久性:不会被垃圾回收，实现对数据的持久使用
   闭包的实例:定时器，缓存，点击事件
   ```

2. js中的继承和作用域链

   ```
   混入继承
   原型继承
   call  apply 上下文实现继承
   class继承
   Object.create()
   ```

   #### 
   
   1. 如何实现按需加载
   
      ```
      1. requires
      2. 图片懒加载
      3. vue按需加载
         1. router  component : resolve =>require(['../index'],resolve)
         2. .vue中按需加载  import
      ```
   
   2. 排序算法
   
      ```
      
      ```

### 设计模式

### 1.单例模式

#### 使用场景

```
	 单例模式只允许创建一个对象，因此节省内存，加快对象访问速度，
	因此对象需要被公用的场合适合使用，如多个模块使用同一个数据源连接对象等等。如： 
    1.需要频繁实例化然后销毁的对象。 
    2.创建对象时耗时过多或者耗资源过多，但又经常用到的对象。 
    3.有状态的工具类对象。 
    4.频繁访问数据库或文件的对象。 
```

#### 优缺点

```
	主要优点：
	1、提供了对唯一实例的受控访问。
	2、由于在系统内存中只存在一个对象，因此可以节约系统资源，
	   对于一些需要频繁创建和销毁的对象单例模式无疑可以提高系统的性能。
	3、允许可变数目的实例。
	 
	主要缺点：
	1、由于单利模式中没有抽象层，因此单例类的扩展有很大的困难。
	2、单例类的职责过重，在一定程度上违背了“单一职责原则”。
	3、滥用单例将带来一些负面问题，如为了节省资源将数据库连接池对象设计为的单例类，
	  可能会导致共享连接池对象的程序过多而出现连接池溢出；如果实例化的对象长时间不被利用，
	  系统会认为是垃圾而被回收，这将导致对象状态的丢失。
```

#### 实例代码

```
	// 设计模式--------单例模式:一个构建函数,只能创建出一个实例
		var obj;
		(function(){
			var im ;
			obj = function creat(){
				if(im){
					return im
				}
				im = this;
				this.age = 16;
				this.name = "索隆";
			}
		})();
		var a = new obj();
		var b = new obj();
		console.log(a==b);//true
```

### 发布订阅模式





多个没有联系的模块之间通信（web component shadow dom,single spa），





正则表达是验证邮箱、手机号

```
var boor=/^\w+@qq.com$/.test('8388@qq.com');
console.log(reg)

var test=/\w+/.test('12390430483')
        console.log(test
```
