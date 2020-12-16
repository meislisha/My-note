## flex

## 一、HTML

#### 常用的meta标签

```
1. meta标签共有2个属性，分别是http-equiv和name属性；name属性主要用于描述网页，比如网页的关键字，叙述等；与之对应的属性值为content，content的内容是对name填入类型的具体描述，便于搜索引擎抓取；
	1. keywords
	2. description
	3. viewport(移动端的窗口)  content="width=device-width,initial-scale=1"
	4. robots(定义搜索引擎爬虫的索引方式)
		none、noindex、nofollow、all\index\follow
	5. author
	6. renderer(双核浏览器渲染方式)
2. http-equiv 相当于http的文件头作用
	http-equiv="content-type" content="text/html;charset="utf-8""
	1. content-Type 设定网页字符集，便于浏览器解析与渲染页面
	2. X-UA-Compatible 浏览器采取何种版本渲染当前页面 “ID=edge,chrome=1”  指定IE和Chrome使用最新版本渲染当前页面
	3. cache-control  
		1. no-cache 先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存
		2. no-store 不允许缓存
		3. public 缓存所有响应
		4. private 只为单个用户花奴才能，因此不允许任何中继进行缓存（比如说CDN就不允许缓存private的响应）
		5. maxage 表示当前请求开始，该响应在多久内能被缓存和重用，而不去服务器重新请求
		6. expires 网页到期时间
		7. refresh 自动刷新并指向某页面
			<meta http-equiv="refresh" content="2；URL=http://www.lxxyx.win/"> //意思是2秒后跳转向我的博客
		8. Set-Cookie 如果网页过期，那么这个网页存在本地的cookies也会被自动删除
```

#### 网页布局种类与区别

```
1. 百分比布局
3. flex布局
4. rem布局
5. 使用@media媒体查询响应式 给不同尺寸和设备切换不同的样式
	1. 设置meta标签 禁止缩放，1:1显示
  2. 媒体查询 768 992  1200、百分比布局、flex布局、bootstrap、rem布局
  3. flexable.js
6.使用视口单位
  自适应布局单位vw\vh  视口单位
  1vw:等于视口宽度的1%  宽度1920，高度950  1vw:1920px/100=19.px  1vh:950/100=9.5px
  1vh:等于视口高低的1%
  vmin:选取vw和vh中最小的那个
  vmax:选取vw和vh中最大的那个
  兼容性问题：在移动端ios8以上和android4.4以上支持，在微信向内核中也得到完美的支持
```

利用HTML5新特性改变浏览器地址后不刷新页面: history.pushState

#### Iframe的作用？

```
iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。 提供了一个简单的方式把一个网站的内容嵌入到另一个网站中。

iframe的优点就是隔离上下文网页，
缺点也很明显大量使用，打开一个网页加载过多iframe体验很不友好而且影响网页加载速度。
Iframes 阻塞页面加载
```

####  xhtml和html区别

```
XHTML是HTML像XML的一个过渡语言，它比HTML严谨性会高点，相比html更规范了,然后基本语言都还是沿用的HTML的标签，同时在标准上要求高了点比如标签的严格嵌套，标签结束,都要用小写等等
```

####  css reset的作用和用途

```
每个浏览器都有一些自带的或者共有的默认样式，会造成一些布局上的困扰，css reset的作用就是重置这些默认样式，使样式表现一致，比如 *{margin:0;padding:0}就是一个最简单的css reset
```

#### 在新窗口打开链接的方法是？

```
<a href="https://www.baidu.com" target="_blank">百度</a>

target的四种属性值: _self -->   默认。在相同的框架中打开被链接文档。

            _blank -->  在新窗口中打开被链接文档。

            _top -->    在整个窗口中打开被链接文档。             

            _parent --> 在父框架集中打开被链接文档。
```

#### 4. 什么是外边距重叠？重叠的结果是什么？（bfc块级上下文）

```
外边距重叠就是margin-collapse。
　　在CSS当中，相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。这种合并外边距的方式被称为折叠，并且因而所结合成的外边距称为折叠外边距。
　　折叠结果遵循下列计算规则：
1.  两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。
2.  两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。
3.  两个外边距一正一负时，折叠结果是两者的相加的和。
```

##### 水平垂直居中

```
absolute + 负margin	是	ie6+, chrome4+, firefox2+	安卓2.3+, iOS6+
absolute + margin auto	left:0;right:0;top:0;bottom:0;margin: auto;
absolute + calc	是	
absolute + transform	
writing-mode	否	ie6+, chrome4+, firefox3.5+	安卓2.3+, iOS5.1+
lineheight	否	ie6+, chrome4+, firefox2+	安卓2.3+, iOS6+
table	否	ie6+, chrome4+, firefox2+	安卓2.3+, iOS6+
css-table	否	display: table-cell;text-align: center; vertical-align: middle;  .son:inline-block;
flex	display:flex;justify-content;align-items:center;
grid	.fa{display:grid;} .box{align-self:center;justify-self:center}

```



## 二、HTML5

### h5标签缺点：

```
右键可以直接另存为
屏蔽广告技术上实现比较简单
```

#### H5新增的内容

```
1.新增了一些结构标签，新增的标签的兼容：自己写js代码创建一个dom元素，然后用条件编译命令，只在指定的条件下才执行，或者用第三方插件实现兼容cc:ie6
2. 推荐了自定义属性写法
3. 多媒体播放audio video (autoplay controls  loop )
4.新增了js中找dom元素的方法：queryselector
4. input新增的type取值：tel\email\url\color\number\date\
5.表单中新增的一些属性：
    required：代表它所在的input必须要有内容，否则提交不成功；
    autofocus:自动取得焦点
    multiple：用在type=file中，代表可以选择多个文件
6.js新增的操作元素的class方法dom.classList.remove()/add()/toggle();
7. 新增了本地存储：localStorage.getItem()/setItem()
                sessionStorage.getItem()/setItem();
 8. 新增了定位
   window.navigator.geolocation.getCurrentPosition(function (loc) {

        console.log(loc);
        console.log('您所在的位置纬度是：' + loc.coords.latitude + '经度是：', +loc.coords.longitude);
      
    })

9.元素的拖拽：draggable = 'true'
    ondragstart 当元素开始拖拽触发
    ondrag   当元素正在拖拽触发
    ondragend 当元素停止拖拽触发
```

#### HTML5语义化的作用

```
1. 搜索引擎优化
2. 可读性可维护性增强
3. 有利于解析代码
```

## 二、CSS

#### css清除（闭合）浮动得几种方法？

```
01：给父元素添加高度
02：给父元素设置overflow:hidden
03:伪元素
    .clearfix:after {
        content: "";
        display: block;
        clear: both;
        height: 0;
        line-height: 0;
        visibility: hidden;
    }
04：双伪元素
    .clearfix::before,.clearfix::after{
        content: "";
        display: block;
        clear:both;
    }
    .clearfix{
        zoom:1
    }
```

#### display： none；与visibility： hidden的区别是什么？

```
display : 隐藏对应的元素但不挤占该元素原来的空间。
visibility: 隐藏对应的元素并且挤占该元素原来的空间。
即是，使用CSS display:none属性后，HTML元素（对象）的宽度、高度等各种属性值都将“丢失”;而使用visibility:hidden属性后，HTML元素（对象）仅仅是在视觉上看不见（完全透明），而它所占据的空间位置仍然存在。
```

####  让盒子水平垂直居中

```
	1..wrapper{
    	position: absolute;
    	left: 	50%;
    	top: 	50%;
    	transform:translate(-50%,-50%);

    }
    2.body{
			display: 	flex;
			justify-content:center;
			align-items:center;
		}
		   .wrapper{
		        	
		 padding: 20px;
		            background: orange;
		            color: #fff;
		        }
	3.{
		position: absolute;
        left:0;
        right:0;
        top: 0;
        bottom: 0;
        margin: auto;
	}
	4.flex布局
```

#### CSS引入的方式有哪些? link和@import的区别是? 

```
Link属于html标签，而@import是CSS中提供的
在页面加载的时候，link会同时被加载，而@import引用的CSS会在页面加载完成后才会加载引用的CSS
@import只有在ie5以上才可以被识别，而link是html标签，不存在浏览器兼容性问题
Link引入样式的权重大于@import的引用（@import是将引用的样式导入到当前的页面中）
```

#### css优先级算法如何计算，哪些属性可以继承？ 

```
    !important >  id > class > 标签 
  !important 比 内联优先级高
  * 优先级就近原则，样式定义最近者为准;
  * 以最后载入的样式为准;
```

####  说说z-index的工作原理及适用范围? 

```
zindex这个属性控制着元素在z轴上的表现形式。可以理解为在z轴的顺序，值越大，越显示再最上层，越靠近屏幕；
仅适用于定位元素，即拥有relative,absolute，fixed属性的position与元素；
当未设置时，后来者居上，当父元素设置了时，它的子元素的zindex不能高于或低于这一层级；

浮动和相对定位可以一起使用；
浮动和绝对定位不能一起使用（浮动不起任何作用）。
```

手写实现三角形

## 四、CSS3

#### C3新增的内容

```
1.文字阴影、盒子阴影；
2.线性渐变，径向渐变；
3.自定义动画、过渡、视角、2d\3d转换等可以实现非常酷炫的效果
4.新增了flex伸缩布局，
5.新增了媒体查询，
6.背景相关的一些设置：background-origin,background-clip,background-size

1.颜色：新增RGBA，HSLA模式
2. 文字阴影（text-shadow、）
3.边框： 圆角（border-radius）边框阴影： box-shadow
4. 盒子模型：box-sizing
5.背景：background-size 设置背景图片的尺寸background-origin 设置背景图片的原点
background-clip 设置背景图片的裁切区域，以”，”分隔可以设置多背景，用于自适应布局
6.渐变：linear-gradient、radial-gradient
7. 过渡：transition，可实现动画
8. 自定义动画
9. 在CSS3中唯一引入的伪元素是 ：：selection.
10. 媒体查询，多栏布局
11. border-image
12.2D转换：transform：translate(x，y) rotate(x，y) skew(x，y) scale(x，y)
13. 3D转换
14.flex布局
```

## 你知道3D形变吗，介绍一下视口

```
transform: rotate translate sacle   rotateX, rotateY, rotateZ 
如果要有3D的透视效果，就需要给transform加perspective(距离，单位是px),值越大，效果越不明显，值越小效果越明显
```

####Flex

```
1. 父容器display:flex;
2. flex-direction主轴的方向：row,row-reverse,column,column-reverse
3. flex-wrap:nowrap,wrap,wrap-reverse
4. justify-content 主轴对齐方式：flex-start,flex-end,center,space-between,space-around
5. align-items:副轴上对齐方式：flex-start,flex-end,center,baseline,stretch
6. align-content:多跟轴线的对齐方式
```

#### Bootstrap 

```
12列
.col-xs- 超小屏幕手机 (<768px)
.col-sm- 小屏幕平板 (≥768px)
.col-md- 中等屏幕桌面显示器 (≥992px)
.col-lg- 大屏幕大桌面显示器 (≥1200px)

常用的手机屏幕都是多大?
1. iphone5:320*568
2. iphone6 375*667
3. iphone6 plus 414*736
```

### css3中有哪些动画相关的元素

```
1. transform:rotate/scale/translate位移、skew倾斜；
2. transition过渡:transition-property,transition-duration,transition-timing-function,transition-delay
3. animation:animation-name,animation-duration,animation-delay,animation-iteration-count,aimation-direction;
```

### 动画卡顿如何优化?

```
1. 在使用css3 transition做动画效果时，优先选择transform,尽量不要使用height，width，margin,和padding
2. 因为margin-left:20px；渲染到margin-left:0;需要margin-left:19px;--18--17这样一直到0；而transtorm合成县城一次将20转换到0；
```

#### 怎么知道动画结束 事件以及动画加速

```
animationEnd  AnimationStart AnimationInteration

webkitransitionEnd(transition 只有这一个事件)
o.addEventListener('webkitAnimationEnd',function(){
	console.log('end')
})
```

## 说一下如何实现一个无限循环的动画

```
轮播图实现原理然后加上定时器，就可以实现，一定要记得讲最图片最后克隆第一张图片；
```

#### CSS3盒子模型

```
1. 怪异盒模型,标准盒模型
	怪异模式主要表现在IE内核的浏览器。当不对doctype进行定义时，会
	触发怪异模式。

	1.在标准模式下，一个块的总宽度= width + margin(左右) + 
	padding(左右) + border(左右)

	2.在怪异模式下，一个块的总宽度= width + margin(左右)（即width
	已经包含了padding和border值）
	即:box-sizing = border-box
2. css3盒子模型:box-sizing  
	1. content-box 标准盒模型
	2. border-box 为IE盒子模型 怪异盒模型
	3. inherit
```

## 如何判断一个节点的类型，例如文本odeType  文本节点/注释节点 ：ul1.childNodes[0].nodeType   属性节点box.arrtributes[0].nodeType 

```
 nodeName  nodeValue

              元素节点         属性节点       文本节点          注释节点			document

  nodeType       1                2              3                8              9

  nodeName      标签名            属性名          #text           #comment		#document

  nodeValue     null             属性值          文本内容         注释内容				null
```

