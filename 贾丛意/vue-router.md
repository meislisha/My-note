
## vue-router的原理
```
1. 通过Vue.use, 调用vue-router的install方法, 在此方法中通过调用Vue.mixin中混入beforeCreate和destroyed等生命周期函数, 在此函数中通过this._route = this.$options.router存储vue-router实例, 并使用Vue.util.defineReactive(this, '_route', this._router.history.current)劫持, 在我们初始化router-view组件的时候, 会通过获取_route的值触发它的get方法, 进而将router-view组件的渲染watcher纳入他的订阅者队列中, 通过this._router.init(this)方法, 在里面调用History.listen((_route)=>{app._route = _route})传入一个回调函数, 这个回调函数的作用是在router更新的时候, 调用这个回调去更新所有vue实例里面的this._router变量, 进而触发之前劫持的_router的set();

2. router更新的时候, 会调用路由相应的push或replace方法, 在这些方法里面会调用this.transitionTo()方法, 在这个方法中会去先调用this.router.match方法去获取匹配的路由组件, 之后调用History.listen传入的回调方法, 更新每个vue实例的_router属性, 触发相应_router的set方法, 就会调用订阅他的渲染watcher.update方法执行相应的render函数, 这个渲染watcher这个时候是router-view组件的render方法, 该render方法中会获取匹配路由的组件, 并调用$createElement方法去初始化渲染这个组件, 进而渲染页面;

```


### vue-router 解析顺序
1. hash模式
  push:
```js
window.location.hash =route.fullPath
$router.push()-->HashHistory.push()-->History.transitionTo()-->History.updateRoute()-->{app.route =route}-->vm.render()
```
replace:
```js
const i = window.location.href.indexOf("#")
window.location.replace(window.location.href.slice(0,i>=0?i:0)+"#"+path)

$router.replace()-->HashHistory.replace()-->History.transitionTo()-->History.updateRoute()-->{app.route =route}-->vm.render()
```
地址栏直接修改:
```js
window.addEventListener("hashchange",()=>{this.transitionTo(getHash(),route => {replaceHash(route.fullPath)})})
```
2. history模式
  利用了h5里History提供的两个方法: pushState(), replaceState()可以对浏览器历史记录栈进行修改
```js
window.history.pushState(stateObject,title, URL)
window.history.replaceState(stateObject,title, URL)
```
如果是地址栏直接修改, 当浏览器跳转到新的状态时，将触发`popState`事件，该事件将携带这个stateObject参数的副本
```js
window.addEventListener("popstate",(e)=>{this.transitionTo()})
```
3. 两种模式的比较:
  history.pushState()相比于直接修改hash主要有以下优势：
  1 pushState设置的新URL可以是与当前URL同源的任意URL；而hash只可修改#后面的部分，故只可设置与当前同文档的URL
  2 pushState设置的新URL可以与当前URL一模一样，这样也会把记录添加到栈中；而hash设置的新值必须与原来不一样才会触发记录添加到栈中
  3 pushState通过stateObject可以添加任意类型的数据到记录中；而hash只可添加短字符串
  4 pushState可额外设置title属性供后续使用

4. history模式的一个问题
  我们知道对于单页应用来讲，理想的使用场景是仅在进入应用时加载index.html，后续在的网络操作通过Ajax完成，不会根据URL重新请求页面，但是难免遇到特殊情况，比如用户直接在地址栏中输入并回车，浏览器重启重新加载应用等。
  hash模式仅改变hash部分的内容，而hash部分是不会包含在HTTP请求中的
  而history模式则会将URL修改得就和正常请求后端的URL一样
  在此情况下重新向后端发送请求，如后端没有配置对应/user/id的路由处理，则会返回404错误。官方推荐的解决办法是在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。同时这么做以后，服务器就不再返回 404 错误页面，因为对于所有路径都会返回 index.html 文件。为了避免这种情况，在 Vue 应用里面覆盖所有的路由情况，然后在给出一个 404 页面。或者，如果是用 Node.js 作后台，可以使用服务端的路由来匹配 URL，当没有匹配到路由的时候返回 404，从而实现 fallback。

5. 本地项目启动
  故要想从文件系统直接加载Vue单页应用而不借助后端服务器，除了打包后的一些路径设置外，还需确保vue-router使用的是hash模式。

transitionTo函数
router-link
router-view