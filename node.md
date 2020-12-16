### KOA 基于nodejs平台的下一代web开发框架

```
1. Async+await处理异步
2. 洋葱圈型的中间件机制
	const app = new Koa()
	app.use(async(ctx, next)=>{
	  ctx.body = '3'
	  await next()
	  ctx.body += '4'
	})
	1. ctx是：封装了requesth和response	
	2. next是下一个中间件
	3. App是：启动应用

3. 加上koa-router
	const Router = require('koa-router')
	const app = new Koa()
	const router = new Router()
	
	router.get('/',(ctx,next)=>{
	  ctx.body = '齐天大圣孙悟空'
	})
	router.get('/zhubajie',(ctx,next)=>{
	  ctx.body = '猪八戒'
	})
	// 
	app.use(koaLog)
	app
	  .use(router.routes())
	  .use(router.allowedMethods());
```

### nodeJS

### 一.node的基本介绍

#### 1.node是什么

```
用js语言用来开发后台应用程序，它也是一个平台，和Web平台不一样
Web平台:展示&交互
	作用1:给浏览器提供数据 ----- 请求
		  返回整个页面 ------- 后台渲染
			xtemplate(占位)/xtpl(数据代替占位符)	
	作用2:大量的数据统计
```

#### 2.运行环境 --- REPL

```
	`启动好`的一个Node环境，这个时候我们把这个环境就称之为
	REPL环境，有了这个环境之后我们就可以运行js代码
```

#### 3.核心模块 --- node一打开就会加载到内存中

```
	HTTP模块:开启Web服务，处理浏览器请求的
	URL模块:为了明白浏览器的意图
	querystring:处理请求的参数的（GET/POST）
	fs模块:file system
	path模块:文件的路径
```

### 二.服务端渲染的流程图

```
	浏览器输入网址 ---- 服务器通过url路径得知所需的页面如
	index.html ---- 从服务器硬盘读取页面 --- 从数据库中
	读取数据代替占位符生成完整页面返回给浏览器 --- 浏览器解析
	页面,解析到如css,js,再发起请求
```

##### http模块开启了web服务

```
1. 导入http模块 var http=require('http') 
2. 使用导入的http模块创建服务 var sever=http.createServer()
3. 服务开始监听浏览器请求，处理之后，响应给浏览器
	server.on('request',function(req,res){
		 res.setHeader("Content-Type","text/plain;charset=utf-8")
	    res.end("<h1>我是一个好人啊...</h1>")
	}
4. 启动web服务器
	server.listen(8899,'127.0.0.1',function(err){
	    if(err){
	        console.log(err)
	    }
	    console.log("start OK")
	})
```

#### 后台处理get请求

```
1. 开启web服务
2. 处理路径，接收参数
	1. 用url模块，来处理URL字符串，把它转成URL对象
	2. 使用querystrin模块，对键值对的字符串转成js对象
	 const urlString = req.url
     const urlObj = url.parse(urlString)
     params = querystring.parse(urlObj.query)
```

#### 后台处理post请求

```
1. 开启web服务
2. 处理路径，接收参数
	1. 通过req两个事件`data`、`end`来接受键值对的字符串
	2. 使用querystrin模块，对键值对的字符串转成js对象
		req.url
		req两个事件 data end 获取到键值对的字符串
		querystring
		server.on('request',(req,res)=>{
		    let body = ''
		    req.on('data',(chunk)=>{
		        body+=chunk
		    })
		    req.on('end',()=>{
		        //把 username=laowang&pwd=laowang 转成js对象
		        const params = querystring.parse(body)
		        console.log(params)
		    })
		    res.end("OK")
		})
```

#### Node中的处理不一样(参数的处理)

```
		GET : url、querystring处理
		POST : 通过req对象的两个事件 `data`，`end`事件，先接收键值对的字符串(username=laowang&pwd=laowang)，在使用querystring进行处理，转成js对象
```

### 模块

```
1. http模块
2. url模块
3. fs 
	文件夹
		创建 mkdir
		判断是否存在 exists
		重命名 rename
		删除 rmdir
	
	文件
		覆盖写入 writeFile 
		追加写入 appendFile 
		判断是否存在 exists
		重命名 rename
		监控 watch
		删除 unlink
```

### fs文件读取

```
fs.readFile 异步
fs.readFileSync 同步 
```

#### 同步&异步

```
1. 同步：从上往下执行，上步没执行完，下面不会执行
2. 异步，从上往下执行，发现有异步函数，先把回调函数放入到事件队列中，继续执行后面的代码，等所有代码执行完毕后，再去事件队列中，找到回调函数执行
3. 耗时操作一般用异步，其他用同步
```

## NodeJS模块化开发(自定义模块)

### NodeJS中模块(包)的分类

```
1. 核心模块 http url xxx，作者提供的，只要REPL环境一开启，就会加载到REPL开辟的内存中去
2. 第三方模块(包)  导入之后使用即可
```

### 自定义模块(CommonJS) 以计算器为例	

```
1. NodeJS中自己写一个模块，要遵循CommonJS规范
把我们写好的东西暴露，导出去，Web平台我们是挂载到window上面的
	
	注意:
		1、在我们自定义模块中，我们可以把一个模块就认为是一个js文件
		2、我们在导入自定义模块的时候，路径写完整
		3、我们暴露出去的是什么类型，别人导入时候获取到的就是什么类型
		
	导出语法:
		module.exports = 暴露出去的成员
		
	开发中的建议:
		如果只需要暴露唯一一个 module.exports = 要暴露的成员
		如果要导出多个，建议这样写 module.exports = {成员1,成员2,xxx}
	导入 require('dd')
```

### 什么是服务端&浏览器端渲染

```
浏览器端渲染
	浏览器会有解析引擎，解析html，css，js最终呈现在浏览器里面给用户看
	
	程序员需要做的事情，静态页面+Ajax请求+artTemplate模版生成页面
	
服务端渲染(服务端动态生成网页)
	
	程序员需要做的事情，静态页面
```

### 服务端渲染的模版引擎

```
1. xtemplate:: 在页面中写占位代码
2. XTPL: 在node中，用真实数据替换，页面中写占位代码，然后生成好完整的页面
	xtpl.renderFile
```

### Express比我们的原生的优势

```
1、获取GET&POST请求参数
	get:req.query
	post:req.body

2、路由处理，分门别类的处理请求
	路由文件（manRouter.js）  
		2.1 创建路由
		2.2 处理具体的请求
		2.3 导出去
		代码:
			1、manRouter.js
				创建一个路由
					const manRouter = express.Router()
				处理男士区域的请求
					manRouter.get/post(xxx)
					
				导出
					module.exports = manRouter
	入口文件
		导入路由文件
		app.use('一级路径',路由文件)
		
3、在处理静态资源的时候，非常简单
	入口文件
		以中间件的形式来设置，静态资源根目录
		app.use(express.static(path.join(__dirname,'statics')))
	在需要的地方(html页面)，在发送请求的时候
	href、src中写的url地址是除开静态资源根路径之后的路径
```

### 注意点:

```
1、router和app都能处理请求，app处理全局的请求，router处理每个路由自己内部请求
```

### mongoDb

```
1. 下载、安装
2. 导包
	var MongoClient = require('mongodb').MongoClient
3. 建立连接(连接到mongodb数据库，并且获取到db对象)
4. 使用db对象进行进一步操作
	MongoClient.connect(url, function(err, db) {
	    if(err){
	        console.log(err)
	    }
	    //获取到集合 student_info
	    var collection = db.collection('student_info')
	  //插入一条
	    collection.insertOne(
	        {name : "王菲",age:40},
	    function(err, result) {
	        console.log(result)
	    });
		增 insertMany/insertOne 
		修改 updateOne 
		删除 deleteOne 
		查找 findAll/findOne	
   db.close();})
```

###  

```
1. 验证码判断：判断浏览器传过来的验证码和session中的验证码是否一样
2.  权限验证
	核心:
	1、我能够拦截到所有的请求
		在入口文件中拦截，app.all('/*')
	
	2、对拦截到的请求，进行权限判断，如果有权限，让你继续操作，如果没有权限
		app.all('/',(req,res,next)=>{
		next()
	})
```

### node开发项目

```
1. 根据浏览器url请求服务器端，找到对应的页面，然后返回请求中的数据代替占位符，返回给浏览器
```



​    





