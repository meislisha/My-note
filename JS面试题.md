#### 一、防抖和节流

##### 1.1 场景

​	会对一些触发频率较高的事件进行监听，如果在回调里执行高性能消耗的操作，反复触发会使得性能消耗提高，浏览器卡顿，用户体验差，或者需要对触发的事情执行回调，此时可以借助throttle/debounce函数实现需求

##### 1.2 防抖 -- debounce

​	用户每次停止输入后，延时超过500ms，才去搜索此时的string,这就是防抖

​	1. eg:滚动事件scroll,不停滚动会触发多次滚动事件，从而调用帮i的那个回调函数，我们希望当我们停止滚动时，才触发一次回调，这就是可以使用函数防抖

2. 原理：将若干个函数调用合成为一次，并在给定时间过去之后仅被调用一次，每次触发，都会重新计算函数执行时间

3. 代码实现

   ```
   function debounce (fn,delay){
   	var timer=null;
   	return function(){
   		let context=this;
   		let args=arguments;
   		clearTimeout(timer)
   		timer=setTimeout(function(){
   			fn.apply(context,args)
   		})
   	}
   }
   let flag=0;
   function foo(){
   	flag++
   	console.log('Number of calls:%d',flag)
   }
   document.addEventListener('scroll',debounce(foo,1000))(这里用document.body.add不行)
   //一直滚动是不会打印的，只有在停止滚动，并且delay后才会打印
   //如果停止滚动，但是在delay时间内重新滚动，也不会打印
   ```

   > 1. debounce函数封装后，返回内部函数
   > 2. 每一次事件被触发，都会清除当前的timer然后重新设置超时并调用。这会导致每一次高频事件都会取消前一次的超时调用，导致事件初始程序不能被触发
   > 3. 只有当高频事件停止，最后一次事件触发的超时调用才能在delay后执行
   > 4. this和参数，是为了让debounce函数最终返回的函数this指向不变以及依旧能接受到e参数

补充：浏览器在处理setTimeout和setInterval时，有最小间隔

​			setTimeout的最短时间间隔是4ms，setInterval最短时间间隔是10ms，也就是说小于10ms的时间间隔会被调整到10ms

事实上，未优化时，scroll事件频繁触发的事件间隔也是这个最小时间间隔；

也就是说当我们在debounce函数中的间隔事件设置不恰当（小于这个最小时间间隔），会使debounce无效

##### 1.3 节流 -- throttle

​	节流函数用于限制触发的频率，每个delay时间间隔，最多只能执行函数一次

​	比防抖要宽松些,这是我们不想用户以为的输入，而是给用户一些搜索提示，所以在当中限制没过500ms就查询一次此时的String,这就是节流

​	eg:移动端通过scroll实现分页，不断滚动，不希望不断发送请求，只有当到达某个条件，比如，距离手机窗口底部150px才发送一个请求

1. 原理：当达到一定的时间间隔就会执行一次，可以理解为缩减执行频率

2. 代码实现：一中是时间戳，一种定时器

   1. 时间戳

      ```
      function throttle(func,delay){
      	let prev=Date.now()
      	return function(){
      		const context=this;
      		const args=arguments;
      		const now=Date.mow()
      		if(now-prev>=delay){
      			func.apply(context,args)
      			prev=Date.now()
      		}
      	}
      }
      //页面刷新时到滚动开始之间，超过delay，一开始滚动就会打印一次
      //一直滚动时，每超过delay时，就会打印一次
      //停止滚动，也停止打印，再次滚动，如果距离上次超过delay则再次开始滚动时，也会打印一次
      ```

      > 当高频事件触发，第一次应该会立即执行，给事件绑定的那个函数与真正触发事件的间隔如果大于delay的话，而后再怎么频繁触发事件，也都是会每delay秒才执行一次，而当最后一次事件触发完毕后，事件也不会再执行了

   2. 定时器实现

      ```
      function throttle(func,delay){
      	let timer=null
      	return function(){
      		const context=this;
      		const args=arguments;
      		const now=Date.mow()
      		if(!timer){
      			timer=setTimeout(function(){
      				func.apply(context,args)
      				timer=null
      			})
      		}
      	}
      }
      ```

      > 第一次触发事件，肯定不会立即执行函数，而是在delay秒后，之后连续不断触发事件，也会每delay秒执行一次，当最后一次停止触发时，由于定时器的delay延迟，可能还会执行一次函数

   3. 结合使用时间戳与定时器，完成一个事件触发时立即执行，触发完毕还能执行一次的节流函数

#### 如何实现a(1)(2)(3)  a(1).a(1).a(1)的调用

```
var add = function(a){
    return function(b){
        return function(c){
         return a+b+c;
        };
    };
};
add(1)(2)(3)// 闭包 

var a = function(a){
    return {
      a:function(b){
          return {
            a:function(c){
            	return a+b+c
            }
    	  }
      }
    }
};
a(1).a(1).a(1)
```

创建一个没有圆形对象，

滑块实现思路

怎么促进项目进展，

构造函数和类对象的区别

改变原数组的方法，



####  写一个通用的时间侦听器函数？

```
markyun.Event = {
// 页面加载完成后
readyEvent : function(fn) {
    if (fn==null) {
        fn=document;
    }
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = fn;
    } else {
        window.onload = function() {
            oldonload();
            fn();
        };
    }
},

// 视能力分别使用dom0||dom2||IE方式 来绑定事件
// 参数： 操作的元素,事件名称 ,事件处理程序

addEvent : function(element, type, handler) {
    if (element.addEventListener) {
        //事件类型、需要执行的函数、是否捕捉
        element.addEventListener(type, handler, false);    //ie8及以前 不支持
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, handler);         //支持ie8及以前
    } else {
        element['on' + type] = handler;
    }
},
```

```
// 移除事件
removeEvent : function(element, type, handler) {
    if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);    //ie8及以前 不支持
    } else if (element.detachEvent) {
        element.detachEvent('on' + type, handler);      //支持ie8及以前
    } else {
        element['on' + type] = null;
    }
}, 
// 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
stopPropagation : function(ev) {
    if (ev.stopPropagation) {
        ev.stopPropagation();            //ie8及以前不支持
    } else {
        ev.cancelBubble = true;         //支持ie8及以前
    }
},
// 取消事件的默认行为
preventDefault : function(event) {
    if (event.preventDefault) {
        event.preventDefault();         //ie8及以前不支持
    } else {
        event.returnValue = false;      //支持ie8及以前
    }
},
// 获取事件目标
getTarget : function(event) {
    return event.target || event.srcElement;
},
// 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
getEvent : function(e) {
    var ev = e || window.event;
    if (!ev) {
        var c = this.getEvent.caller;
        while (c) {
            ev = c.arguments[0];
            if (ev && Event == ev.constructor) {
                break;
            }
            c = c.caller;
        }
    }
    return ev;
}
```

}; 

#### 懒加载的原理，怎么实现？风险？

```
在前端开发中用的比较多的图片懒加载技术，所谓图片懒加载就是页面刷新的时候只是请求视图之前的图片资源，对于之后的图片资源等到他在视图范围内之后再进行加载，这样子较少了很多http请求，很好的web应用程序的性能。
实现原理：
1）对于img标签，只要将图片地址赋给src属性，浏览器解析的时候就会自动去请求图片地址所指向的资源，浏览器的这个机制我们是没办法改变的，那么我们只能在src属性上做文章，在刚开始的时候我们把图片地址赋给img标签一个自定义属性例如data-src，src属性留空。
2）设置一个定时器定时检测出现在视图内的图片，并将其data-src属性的值赋值给src属性。（其实这个地方也可以通过事件来检测）
•   
```

4.对象改成一个树状结构的对象