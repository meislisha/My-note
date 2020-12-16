### 构建工具，gulp\webpack 区别

```
1. gulp,grunt,Fis3,Npm Script，rollUP
2. gulp 基于任务流的自动化构建工具，不包括模块化的功能，如果要用到的话，需要引入外部文件，比如requirejs
	1. 优点：好用灵活，可以单独构建也可以和其他工具搭配使用，适合多页面应用开发
	2. 缺点：和grunt一样，集成度不高，要写很多配置后才可以用，无法做到开箱即用
3. webpack 前段模块化打包工具,实现了模块化和文件处理
	1. 优点：
		1. 专注于处理模块化的项目，能做到开箱即用，一步到位
		2. 可通过Plugin配置，完整好用又不失灵活
		3. 使用场景不局限于web开发
		4. 开发体检好
		适合SPA单页应用的开发
	缺点L:通过babel编译后的js代码打包后体积过大

```

### 管理多个单页应用

```
1. 使用了web-webpack-plugin的Webplugin
```

webpack原理,配置，loader,plugin

```
- 入口(entry): 程序的入口js
- 输出(output): 打包后存放的位置
- loader: 用于对模块的源代码进行转换
	css,less,image(小于5KB用base64)
- 插件(plugins): 插件目的在于解决 loader无法实现的其他事，从打包优化和压缩，到重新定义环境变量
		1.html插件(html-webpack-plugin)：html文件，自动引入bundle.js,打包会自动生成index.html
		2.清除dist(clean-webpack-plugin)

使用devServer解决跨域问题:devServer的proxy功能，在webpack.dev.js中进行配置：
webpack优化
	1. 抽离css mini-css-extract-plugin
	2. css压缩 optimize-css-assets-webpack-plugin插件来完成
	3. js代码分离
			有三种常用的代码分离方法：
        - 入口起点(entry points)：使用entry配置手动地分离代码。
        - 防止重复(prevent duplication)：使用 SplitChunksPlugin去重和分离 chunk。
        - 动态导入(dynamic imports)：通过模块的内联函数调用来分离代码。
	4. 将Vue项目中的库抽取成Dll  DllReferencePlugin
	5. 浏览器缓存:众多代码分离的优化后，其目的是为了利用浏览器缓存，output节点的filename中使用placeholder语法，根据代码内容生成文件名的hash,如果有改变，会生成新的hash作为文件名，浏览器就不会使用缓存了，而第三方模块不会重新打包生成新的名字，则会继续使用缓存
```

webpack bundle和vendor区，



```
webpack-dev-server&webpack

相同点:
	都能进行打包，webpack有的功能，webpack-dev-server都有，并且还有些功能是webpack不具备了(比如热更新)
	
	webpack --progress --config xxxx
	webpack-dev-server --progress --config xxxx
	
区别:
	应用场景不一样
	
		webpack-dev-sever 用在开发阶段，在浏览器内存中生成bundle.js
		
		webpack 用在生产阶段，它会在项目dist目录下面生成一个实实在在的bundle.js
		
	产生的效果不一样
		webpack-dev-server 打包之后，除了在内存中生成一个bundle.js文件，它还会开启一个Node服务，来运行我们的index.html和bundle.js
		
		webpack 打包之后，不会开启服务运行我们的index.html和bundle.js，这个必须要借助于VSCode Ease Server
```

```
webpack是一个项目构建、模块打包的工具

项目构建：1. 代码压缩.html css js
      2. 代码混淆
      3. 文件合并
      4. 等其它自动化工作. sass转换为css.

模块打包: 将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。
        ---->本身只能打包js模块，自带BGM如虎添翼（Loader转换器）【将各种类型的资源转换成js模块】
```

webpack主要做了2部分工作：

```
1. 分析得到所有必须模块并合并
2. 提供让这些模块有序，正常的执行环境
```

bundle.js:webpack输出文件
vendor.js:第三方库（太大路由懒加载）
manifest.js  webpack manifest文件用来引导所有模块的交互。manifest文件包含了加载和处理模块的逻辑。





VSCODE安装了什么插件

```
Auto Rename tag
Beautify
Eslint
Html scss support
Html css support
open in browser
Path Autocomplete
vetur
vue 
vue2 snippets
```

