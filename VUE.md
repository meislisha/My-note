### 相关原理、对比

#### 特点

```
渐进式、轻量级、双向数据绑定、组件化
```



#### MVC与MVVM区别

```
1. mvc 用户操作 view--controller进行业务逻辑处理--Model---结果反馈给view
2. mvvm : 一数据双向绑定为核心思想
   1. view 和modal之间没有联系，通过viewmodal进行交互，而modal和viewmoadal之间的交互式双向的
   2. 专注于处理业务逻辑，而不是去关心dom操作


1. MVC
	模型-视图-控制器,MVC是单向通信,View跟Model，必须通过Controller来承上启下
2. MVVM

```

#### vue和react的区别

```
vue：双向数据绑定，MVVM
		模板语法渲染
react:单向数据流,MVC
			通过jsx渲染模板
			vnode不一样，vue不需要重新渲染整个组件树
									react每当状态改变，组件都会重新渲染，所以react需要shouldComponentUpdate这个生命周期函数方法来进行控制
			然后就是组件通信，数据管理vuex redux
```

#### 数据响应式,原理

```
核心 --- Object.defineProperty（ES5才有的属性,不兼容IE8以下）
视图 ---> 数据 ---> 视图
vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()Vue模型初始化时，劫持各个属性的setter，getter（这也是vue不支持在vue实例创建以后动态的添加响应式属性），然后再通过正则表达式找到v-xxx指令，和data中的属性匹配，如果匹配成功，通过发布订阅者模式,将其联系起来，放入数组中，在数据变动时触发notify发布消息给订阅者，触发相应的监听回调update()。
```

#### 双向绑定

#### 单项数据结构绑定和双向的好处，

```
１单向数据流　数据流动方向可以跟踪，流动单一，追查问题的时候可以跟快捷。缺点就是写起来不太方便。要使UI发生变更就必须创建各种action来维护对应的state
2　双向流动　值和UI双绑定，这种好处大家都懂。但是由于各种数据相互依赖相互绑定，导致数据问题的源头难以被跟踪到，子组件修改父组件，兄弟组件互相修改有有违设计原则。　但　好处就是　太特么方便了。
```

#### 虚拟DOM与diff算法 

```
直接操作页面上dom元素比较耗性能（引起重绘或重排），但是操作js对象比较简单，所以就将dom结构映射成js对象，然后diff算法通过比较改变前后的js的对象得出，需要改动得最小范围，然后遍历生成新的的dom元素

当数据发生改变时，set方法会让调用Dep.notify通知所有订阅者Watcher，订阅者就会调用patch给真实的DOM打补丁，更新相应的视图。
1.set方法会让调用Dep.notify通知所有订阅者Watcher，
2.订阅者就会调用patch(oldVnode,Vnode),（isSameVnode）
		判断俩节点是否值得比较，值得比较则执行patchVnode
		不值得比较则用Vnode代替oldVnode
3. patchVnode会根据不同情况做出处理（old有子节点vnode没有，都只有文本节点啊 都有子节点啊）
4. 更新相应的试图
```

![diff](C:\信息相关\2019\新建文件夹\done\image\diff.png)

#### 什么是数据驱动

```
在vuejs中，所谓的数据驱动就是当数据发生变化的时候，用户界面发生相应的变化，开发者不需要手动的去修改dom。发布订阅者模式以一个观察者来实现数据的驱动
```

#### 什么是函数式编程和响应式编程

```
函数时编程
1. 函数必须有入参，并且函数的产出会根据入参的不同而变化。
   2. 函数执行的整个流程中，不会对全局变量、外部属性等产生影响。
2. 函数式编程代码量小，干净。
响应式编程特点：
	1. 同步发生，结果会随着修改参数而实时、动态地变化。
	2. 存在固定的映射关系。

```

#### event BUS:应用场景，原理

```

```

### vue基础

#### v-show与v-if

```
都可以控制元素在页面的显示与否.
----------------------------------------
区别和应用场景
    v-if:控制元素是否在DOM树上出现,v-show:控制的是元素的display:none
    v-if:用于元素操作次数比较少的场景,v-show:用于需要频繁控制元素显示与否的场景
    控制元素是否存在于DOM树上,比较控制元素的display属性要消耗性能
```

#### key的优缺点，以及实现原理

```
key的作用主要是为了高效的更新虚拟DOM。另外vue中在使用相同标签名元素的过渡切换时，也会使用到key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。

diff算法
```

#### mixin

```
封装多个组件用到的统一功能
```

#### keep-alive --- 缓存组件/路由,切换时不会白屏

```
	<keep-alive>
		<router-view></router-view>
	</keep-alive>
缺点：只缓存ui，但是数据没有发送到后台，导致需要清理很多数据，
控制是否缓存组件/路由
1.增加 router.meta 属性
    // routes 配置
    export default [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
        keepAlive: true // 需要被缓存
        }
    }, {
        path: '/:id',
        name: 'edit',
        component: Edit,
        meta: {
        keepAlive: false // 不需要被缓存
        }
    }
    ]
    2.设置
<keep-alive>
    <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
    </router-view>
</keep-alive>

<router-view v-if="!$route.meta.keepAlive">
    <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
</router-view>
```

#### 通过路由守卫判断是否重新刷新目标路由

```
beforeRouteLeave
```

### 组件、通信

```
父子组件：
	1. props和自定义事件
	2. 可以通过$refs、$children(是个数组)调用子元素方法、$parents
	3. 属性修饰符.sync：子组件改变了一个prop的值时，变化也会同步到父组件中，不用.sync,就只能通过事件监听
爷孙组件： 
	1. $attrs：包含了父组件不被认为props的特性绑定，子组件可以通过v-bind="$attrs"传入孙子组件
	2.$listens:包含了父组件中（不包括.native修饰）v-on事件监听器，通过v-on="$listeners"传入孙子组件
非父子组件：
	1. vuex 
	2. bus 事件总线

插槽

 
 高级方式：
 深度原生事件/自定义事件
 v-model
	作用域插槽slot-scope
```



#### 封装组件的基本步骤

```
1.通过props来接收外部得参
2.通过事件监听将基本组件触发得行为告知外部
3.最好代理自己的一些基本方法共外部使用,从而形成功能得闭环
```

#### 父子组件传值

```
父组件想调用子组件的方法：this.$refs.childSented.getData();  this.$children[0].child_fun()
子组件想调用父组件的方法：this.$parent.fatherMethod();

父传子:
  1. 通过显示的声明props
   在子组件中定义 props:[ 'msgFather' ] (或者对象形式props:{msgFather：{type:'Boolean',default:true})父组件中在<son :msg-father='true'></son>
  2. 父在created中请求的数据传给子组件，由于子组件渲染出来，父组件请求的数据还未请求回来，所以在子组件中用computed的属性

子传父:
  1.子:this.$emit('事件',参数)
  2.父:@'监听的事件'='回调处理事件'
    通过 this.$emit("sendiptVal", this.inputValue) ；父组件中<son @sendiptVal='showChildMsg'></son>
```

#### 父子组件渲染顺序

```
1. father-beforeCreated
2. father-created
3. father-beforeMount
4. son-beforeCreated
5. son-created
6. son-beforeMount
7. son-mounted
8. father-mounted
9. father beforeUpdate
10. son-beforeUpdate
11. son-updated
12. father updated
13. father beforeDestory
14. son beforeDestory
15. son destroyed
16. father destroyed
```

#### 非父子

```
1.bus --- 事件总线
  this.bus.$emit('事件',参数)
  this.bus.$on('事件','回调函数')
2.vuex
```

#### vuex

```
    state:数据，里面是键值对 {userList:[]}
    getter:获取数据用的，里面是函数
    mutations:同步更新数据(store.dispatch('setUserList',item)){setUserList(state,data){state.userList=data}}
    action:异步的mutations或者提交多个mutations{commitUserList:({commit},userList)=>commit('setUserList',userList)}
    module:代表可以拥有多个仓库


```

##### 购物车的数据放在本地 vuex 服务器端的优缺点

```
1.Vuex是把数据放在内存中的，不太适合保存购物车的数据，页面一刷新或关闭就没了
2.cookies:(浏览器本地)
		优点:减少服务器压力，节省服务器资源  1K  1000万
		缺点:容易丢失用户某次的购买行为
3.服务器端:
		优点:不会丢失用户加入购物车中的商品，更加利于分析用户的购买行为，给用户推荐，促进更多的交易
		缺点:增加服务器压力，增加服务器的存储空间
```

#### 插槽 与ref

```
插槽 -- 父组件决定子组件得渲染
默认插槽
具名插槽
子组件:
<child>
    <slot></slot>//1.默认插槽
     <slot name="header"></slot>
</child>
父组件:
<child>
   <div>渲染的内容</div> //1.默认插槽
     <template v-slot:header>  // <template #header>可以这样缩写
      <h1>Here might be a page title</h1>
    </template>
</child>

ref：
  用来获取子组件或者DOM元素的应用,通过this.$refs.名称拿到
  <input type="text" ref="input1"/>
    一般来讲，获取DOM元素，需document.querySelector（".input1"）获取这个dom节点，然后在获取input1的值。但是用ref绑定之后，我们就不需要在获取dom节点了，直接在上面的input上绑定input1，然后$refs里面调用就行。
    然后在javascript里面这样调用：this.$refs.input1  这样就可以减少获取dom节点的消耗了
 
```

### 插件

#### axios 

```
1. 设置拦截 config/axios.js
//请求拦截axios.interceptors.request.use
//响应拦截
	axios.interceptors.response.use(
	    response => {
	        if (response.data) {
	            if (response.data.status == '407') {
	                window.open(response.data.url, '_self', '');
	            }
	        }
	        return response;
	    },
	    error => {
	        if (error.response) {
	            return Promise.reject(error.response.data)   // 返回接口返回的错误信息
	        }
	
	    });
	

```

#### mock (vue cli3)

```
1. npm i mock.js --save
2. 根目录下创建一个mock文件，存放模拟数据
3. 根目录中找到vue.config.js,修改为 
	const mockdata = require('./mock/test.json');
	module.exports={
	  devServer: {
	    port:4000,
	    before(app){
	      app.get('/goods/list',(req,res,next)=>{
	        res.json(mockdata);
	      })
	    }
	  }
	}
4. vue中 axios.get('/goods/list').then()....
5. vue cli2中 第三部修改为： 在build目录下webpack.dev.conf.js
	devServer中
	before(app){
      app.get('/goods/list',(req,res,next)=>{
        res.json(goodsList);
      })
    }
```

#### eslint

```
1. template 中：
    1.标签后不能有空格：Trailing spaces not allowed (no-trailing-spaces)
2. style：
    1.style标签后需要空出一行：Newline required at end of file but not found
3. script:
    1. 用单引号
    2. 没有分好，
    3. ()前后都有一个空格
    4. ：后面有一个空格
```

### 路由

前段路由的核心：就在于---改变试图的同时不会向后端发出请求

```
1. <router-link tag="li" :to="/index"></>
2. goBack () {
  window.history.length > 1
    ? this.$router.go(-1)
    : this.$router.push('/')

```

##### 声明式路由

```
to='/goods/:id'
```

##### 编程式路由

```
    this.$router.push({ name: 'pictureAndText', params: { goodsId: this.$route.params.goodsId }})
    匹配路由: {name:'pictureAndText',path:'/pictureAndText',component:pictureAndText},
    刷新会消失,所以要传递参数用下面这一种
    this.$router.push({ path: '/goods/goodscomment', query: { goodsId: this.$route.params.goodsId }})
    形式:?xxx=xxx  获取参数: this.$route.query.xxx
    匹配路由:{path:'/goods/goodscomment',component:goodscomment}
```

> router是“路由实例,主要是实现路由跳转使用；
> route是路由对象信息

#### 路由守卫

##### 1.全局守卫

```
    const router = new VueRouter({ ... })
    router.beforeEach((to, from, next) => {
        // ...
    })
    to: Route: 即将要进入的目标 路由对象
    from: Route: 当前导航正要离开的路由
    next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
    next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
    next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，
    那么 URL 地址会重置到 from 路由对应的地址。
    next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向
    next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to
    prop 或 router.push 中的选项。
    next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 
    router.onError() 注册过的回调.
```

##### 2.路由独享的守卫

```
    const router = new VueRouter({
        routes: [
            {
            path: '/foo',
            component: Foo,
            beforeEnter: (to, from, next) => {
                // ...
            }
            }
        ]
    })
```

##### 3.组件内的守卫

```
    const Foo = {
    template: `...`,
    beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
         next(vm => {
            // 通过 `vm` 访问组件实例
        })
    },
    beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
    },
    beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
    }
}
```

### 生命周期

#### 声明周期钩子

```
1. beforeCreate： data和$el都没有初始化，全部为undefined
2. created:data初始化完成，$el没有初始化
3. beforeMount：data和$el均已存在，但dom为虚拟dom任未完全加载
4. mounted：data和$el均已存在，并且dom加载完成，完成挂载
5. beforeUpdate：渲染完成，并检测到data发生变化，在变化的数据重新渲染视图之前会触发，这也是重新渲染之前最后修改数据的机会
6. updated：监测到data发生变化，并完成渲染更新视图之后触发
7. beforeDestory：实例销毁之前调用，实例任然完全可用
8. destoryd：实例销毁后调用，调用后看，实例只是的多有东西都会解绑，所有的事件监听器会移除，所有的子实例也会被销毁
9. keep-alive独有的生命周期：activeted和deactivated
	1. 页面第一次进入，钩子的触发顺序created--monted--activated
	2. 退出时触发deactivated
	3. 再次进入（前进或后退）时，只触发activated.
	
	mounted钩子回家setimeout 20ms延时，因为浏览器的刷新通常是17ms一次,
 然后在destroyed钩子里清除计时器clearTimeout(this.timer)
当data中数据发生改变时触发update相关函数
```

#### 生命周期使用场景

```
1. beforeCreate：加loading效果，在created时移除
2. created:数据请求获取，初始化数据
3. beforeMount
4. mounted：挂载元素内dom节点的获取；有依赖dom的请求放这里
5. beforeUpdate:更新之前 提示框啊  是否删除啊类似的
6. updated：提示框  删除成功啊
7. beforeDestory:是否离开；被销毁之前  记录未被提交的数据，等在进来的时候那这些数据填充上，记录页面的浏览位置
8. destoryed:
9. 数据修改后更新dom的操作可以放在this.$nextTick回调
10. created和destoryed可以做数据统计，

nextTick:涉及到Vue中DOM的异步更新
1.在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中
2. 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进Vue.nextTick()的回调函数中。
```

#### **methods,watch,computed的区别**

```
computed是具有缓存的，这就意味着只要计算属性的依赖没有进行相应的数据更新，那么computed会直接从缓存中获取值，多次访问都会返回之前的计算结果。
总结：
computed:计算，一个数据受多个数据影响
watch:观察，一个数据影响多个数据
	在App.vue中，通过watch方法来监控路由的变化：watch:{$route:function(){})
```

#### 计算属性和缓存和方法调用有什么区别

```
计算属性：必须返回结果，依赖于缓存，一个计算属性所依赖的数据发生变化时，它才会重新取值
计算属性是根据依赖自动执行的，methods需要事件执行
使用计算属性还是methods取决于是否需要缓存，当遍历大数组和做大量计算时，应当使用计算属性，除非你不希望得到缓存

```



### 配置与优化

#### 动态改变document.title

```
router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
  if (to.meta.title) {
  	document.title = to.meta.title
  }
	next()
})
```

##### vue history和hash的区别

```
hash--即地址栏中的#符号；hash虽然出现在url中，但不会被包括http请求中，对后端没有影响，改变hash不会重新加载页面；每次刷新页面都会多加个#
history--利用了HTML5的history interface 中新增的pushState()和replaceState()方法，这两个方法用于浏览器的历史记录栈，在当前已有的back\forward\go的基础上。提供了
history模式：需要在后端进行简单的路由配置，解决前端路由访问404
```



#### webpack 配置

```
1.  devtool: '#source-map',（//打包代码的同时生成一个sourcemap文件，并在打包文件的末尾添加//# souceURL，注释会告诉JS引擎原始文件位置）（上线后出现bug事好定位bug位置）
2. cross-env： 由于*unix和windows设置NODE_ENV的语句有所差异，以达到兼容的目的
3.  vue项目实现手机预览  config/index.js  dev下host改成本机地址（cmd：ipconfig 的IPV4地址）或0.0.0.0，然后重新运行；如果还不可以：则将电脑的防火墙关掉
```

移动端如何调试?

```
vconsole 和 vue 0.0.0.0  fiddler抓包
```

#### SPA单页面应用优缺点：

```
优点：内容改变不需要加载整个页面，对服务器压力小，前后端分离
缺点：不利于SEO(服务端渲染)、初次加载慢、导航不可用，如果一定要导航需要自行实现前进、后退
    
初次加载慢、首页白屏
1.loading;2.骨架屏；3.ssr 服务端渲染；4.预渲染（初始数据）（）;5:GZIP压缩
6.图片压缩；
7.去掉.map文件 :   productionSourceMap:false
8:cdn外部加载
路由懒加载
		https://blog.csdn.net/weixin_45389051/article/details/109188392
```

#### vue项目优化

```
vendor.js  是node_modules 打包出来的
manifest 静态资源的清单

1. 路由懒加载（之前是同步加载）
		1. 当路由被访问的时候才加载对应组件（结合VUE的异步组件和webpack的代码分割功能code splitting feature,实现路由组件的异步加载）
	    const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
		2. 如果想把某个路由下的所有组件都打包在同个异步块（chunk）中，只需要命名chunk，用注释语法来提供chunk name ,用webpackChunkName
2. 开启gzip压缩  config/index.js productionGzip: true(vue-cli2)
		前提是服务器那边得开启gzip
		前段：npm i compression-webpack-plugin -D
			vue.config.js:
				const CompressionPlugin = require("compression-webpack-plugin")
        module.exports = {
          configureWebpack: () => {
            if (process.env.NODE_ENV === 'production') {
              return {
                plugins: [
                  new CompressionPlugin({
                    test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
                    threshold: 10240, //归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
                    deleteOriginalAssets: false, // 是否删除原文件
                    minRatio: 0.8
                  })
                ]
              }
            }
          }
        }
3. 拆分bundle.js 抽离出css;抽离css需要使用到webpack的插件extract-text-webpack-plugin
4.使用CDN(内容分发网络)
5.减少HTTP请求次数 精灵图使用
6.屏蔽sourceMap  productionSourceMap:false,
7.代码优化  item设置key值  减少watch数据，base64
8. 缓存 keepalive 浏览器缓存
9. 骨架屏
抽离第三档包,抽离静态资源如图片


8.增加Expires Header
    	通过使用Expires Header缓存图片文件,脚本文件,样式表等,
    	这样也可以减少http的请求次数和大小
    	http头的cache-control和expires的属性，可设定浏览器缓存，缓存时间可以自定义。
9.把样式表放在头上 把脚本文件放在底部
10. 避免css表达式
    	css表达式的执行次数比较多:如页面显示,resize时,当页面滚屏
    	时都会执行;最好用明确的数值代替,或者当腰动态设置的值时,用
    	事件处理函数代替
11. 把js和css放到外部文件中
    外部文件会被浏览器缓存,且减少了页面的大小
12. 减少DNS的查询次数
    DNS用于映射主机名和地址,一般一次解析需要20ms--120ms
13.避免重定向
14.删除重复的脚本文件
15.缓存ajax
    缓存ajax,减少请求的次数,同样可以加快页面的响应速度;如jq中的$.ajax传参中设置
    cache:true
16.配置ETags	

```

#### 骨架屏

```
4. 小米商城使用骨架屏进行首屏在资源数据还没有加载完成时显示，给很好的体验效果。 常见的骨架屏实现方案有ssr服务端渲染和pre1. prerender渲染骨架屏幕
		1. 需要配置webpack-plugin,已经有实现好的prerender-spa-plugin可用
			var path = require('path')
			var PrerenderSpaPlugin = require('prerender-spa-plugin')
			
			module.exports = {
			  // ...
			  plugins: [
			    new PrerenderSpaPlugin(
			      // Absolute path to compiled SPA
			      path.join(__dirname, '../dist'),
			      // List of routes to prerender
			      ['/']
			    )
			  ]
			}
		2. 进入页面时显示骨架屏，数据加载完，需要移除骨架屏
			<template>
			  <div id="app">
			    <mainSkeleton v-if="!init"></mainSkeleton>
			    <div v-else>
			      <div class="body"></div>
			    </div>
			  </div>
			</template>
	2. ssr服务端渲染
		优点：1. 更好的SEO；2. 利于首屏渲染
		局限：1.服务端压力较大；2.开发条件受限
		1. 服务端渲染的核心就在于：通过vue-server-renderer插件的renderToString()方法，将Vue实例转换为字符串插入到html文件
		2. 服务端和客户端是两个vue实例各自进行自己的渲染，然后拼接在一起的；服务端渲染是根据VUE实例获取对应路由的SEO信息，然后添加到返回到返回的单页面应用html上；客户端渲染就是平时单页面应用
```

#### vue项目权限控制

```
1. 独立登录，使用 newrouter 根据登录返回的权限值配置路由
2. 使用vuex 进行状态管理，在登录页以及main.js分别通过dispatch方法设置vuex的状态，以及addrouter方法添加路由。
3。使用vue中的mixin等全局方法，通过设置v-if 控制路由权限，哪些可以显示，那些不能显示，这种方法通常有一个问题，用户直接输入URL访问页面，将不会被拦截，需要通过beforeRouter钩子配合使用。

	1. 登录时获取用户权限
	2. 通过router.beforeEach中进行判断以及addRouter方法动态添加路由
	3. 通过vuex管理路由表，然后动态渲染菜单栏；
	4. 通过mixin等全局方法，
```

```
基于vue的才能用vue.use（）；
比如axios  不基于vue，所以不能通过use,所以要在每个用axios的组件中import axios from 'axios'（这样比较麻烦）,也可以在main.js中  可以：vue.prototype.$axios=axios;在后面就可以this.$axios.....
```

#### 如何vue从头搭建一个项目

#### 打包后怎么预览html

### 开发思路

工程化有什么了解

#### 控制底部tabBar显示

```
app.vue中 <tab v-if="isActiveTab"><tab/>
data(){return {isActiveTab:false}}
watch:{
    '$route'(to,from){
      if(to.path=='/index'||to.path=='/mine'){
        this.isActiveTab=true;
      }else{
        this.isActiveTab=false;
      }
    }
  }
```

#### ul下li下的div每个控制显示隐藏,重复点就toggle

```
<div v-for="(resource,index) in resourceList" :key="index">
  <mt-cell :title="resource.name" is-link @click.native="resourceListShow(index)">
  </mt-cell>
  <ul v-show="showIndex==index&& resource.hide" >
  </ul>
</div>
methods: {
  resourceListShow(index) {
     this.showInde=index;
     let obj = this.resourceList[index]; // 找到点击的dom对象
     obj.hide = !obj.hide;  
     this.$set(this.resourceList, index, obj); 
    }
}
```



element  form el-select  修改获取数据赋值时，select页面操作，数据变了，但是页面显示没有变。解决办法：

```
在赋值时：使用this.$set()来显式更新对象的属性：
 this.$set(this.form,'roleIds',response.data.roleIds)
```

### VUE3.0

```
VUE3.0优势：更快、更小、更易维护、更易于原生+

1. main.js中引入了一个心点函数createApp ,会把容易挂载到它上面来
2. data 用以下方式去初始化数据
	export default {
   setup(){
     const name = reactive({
       name:'hello 番茄'
     })
     return {name}
   }  
  }
  setUp等效于2.0版本当中beforeCreate、created
3. 生命周期变化了
	 created->请使用setup()
	 beforeMount->onBeforeMount
	 mounted->onMounted
	 beforeUpdate->onBeforeUpdate
	 update->onUpdated
	 beforeDestory->onBeforeUnmount
	 destoryd->onUnmounted
	 errorCaptured->onErrorCaptured
4. 按需引入：如果在页面中使用声明周期函数的，需要引入，这就是为什么3.0能够将代码压缩到更低的原因
      import {reactive, ref, onMounted} from 'vue'
      export default {
       setup(){
         const name = reactive({
           name:'王'
         })
         const count=ref(0)
         const increamt=()=>{
           count.value++
         }
         onMounted(()=>{
           console.log('123')
         })
         return {name,count,increamt}
       }  
  5. 数据监听
  	2.0是使用es5的Object.defineProperty 来劫持对象属性的 geter 和 seter 操作，当数据发生改变发出通知；3.0是通过ES6的新特性proxy来劫持数据，当数据改变时发出通知，基于proxy监听其实就是lazy-by default，可以理解为‘按需监听’，官方给出的诠释是：速度加北，同时内存占用还减半
  	<body>
    <div>
        <input type="text" id="input">
        <span id="text"></span>
    </div>
</body>
</html>
<script>
    var obj = {};
    var obj1 = new Proxy(obj, {
        // target就是第一个参数obj, receive就是返回的obj(返回的proxy对象)
        get: function (target, key, receive) {
            // 返回该属性值
            return target[key];
        },
        set: function (target, key, newVal, receive) {
            // 执行赋值操作
            target[key] = newVal;
            document.getElementById('text').innerHTML = target[key];
        }
    })
    document.addEventListener('keyup', function (e) {
        obj1[0] = e.target.value;
    });
</script>
6. 目录结构变了 config文件寂静一处 
```



## vue 源码

Vue
一.基础梳理
1.Vue为构造函数
new Vue()，入口this._init()### 4.——
2.new Vue(options)
将options合到(merge)到vm.$options上，data，methods的等
3.访问data属性
如：this.msg实质访问的是this._data.msg.实现通过属性劫持getter，setter。
4._render:将实例渲染成虚拟Node
5.实例的为何不能挂载在body或者html上
因为Vue通过render生成的节点会替换挂载节点

6. Virtual DOM
1.VNode Dom
是对真实 DOM的一种抽象描述，它的核心定义无非就几个关键属性，标签名、数据
、子节点、键值等，其它属性都是都是用来扩展 VNode 的灵活性以及实现一些特殊
feature 的。由于 VNode只是用来映射到真实 DOM 的渲染，不需要包含操作 DOM 
的方法，因此它是非常轻量和简单的
2.映射到真实的 DOM 实际上要经历 VNode 的 create、diff、patch 等过程
3.组件挂载的关键点
vue实例 ---（render）----> 占位vnode ---（path）--> 创建元素 --->
    发现是组件（占位vnode）---(createComponentInstanceForVnode) --->  
    组件vue实例 ---（render）----> 渲染vode （path）--> 创建元素 --->
    挂载到vnode.elm ---> body
    递归调用，先创建父组件，然后是子组件。先执行子组件的挂载。然后父组件。
7.生命周期
1.根据组件挂载的逻辑可知：
beforecreate，created，父组件早于子组件（先创建）
    beforeMouunt，父组件早于子组件 （确定父子挂载关系）
    mounted：子组件早于父组件 （先执行子组件的挂载，再执行父组件）
    beforeDestory：父组件早于子组件 （先确定销毁组件）
    destroyed：子组件早于父组件（先将子组件从父组件中销毁，并取消与父组件之间的关系）
8.异步组件
按需加载组件，单独抽成js。减少包体积，减少首屏时间。跟懒加载类似。
    https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%A4%84%E7%90%86%E5%8A%A0%E8%BD%BD%E7%8A%B6%E6%80%81
9.响应式对象
1.核心：Object.defineProperty
添加getter，setter。
    getter：依赖收集，即依赖该属性的对方
    setter：派发更新，属性更新时触发依其的地方进行更新
2.初始化的过程
递归的给data或者props中的属性添加getter或者sette，变成响应式的对象。
    这就是要在data中显示的声明会动态变化的属性。如果一开始没有声明，那么
    初始化则不会变成响应式的对象。
3.依赖收集
mountComponent ---> new Watch() ---> watch.get()--->pushTarget(this)
    将当前的渲染watch推到对应的依赖栈中。cleanupDeps()清空旧的依赖栈。且
    将this.getter赋值为updateComponent 。
4.派发更新
dep.notify() ---> 遍历依赖栈中watch，并调用watch._updata --->
    将wacth推到存储栈中，并且保证当一个watch依赖多响应式对象时，也只push
    一次。-flushSchedulerQueue--> 将watch实例进行排序，保证父组件的watch
    早于子组件的watch执行。用户手写的watch早于优先于渲染watch。
    （如果一个组件在父组件的 watcher 执行期间被销毁， 那么它对应的
    watcher 执行都可以被跳过， 所以父组件的 watcher 应该先执行。）--->
    watch.run ---> watch.get() ---> 新一轮的依赖收集
5.nextTick
一般我们在nextTick中进行渲染后的回调，nextTick的实现原理是在下个事件
    tick的最开始执行nextTick中的回调，vue在更新渲染的时候，会将渲染Watach
    的回调推到nextTick的事件回调栈中。然后在指向nextTick时，遍历里面的回
    调函数并执行。所以在this.$nextTick中拿到渲染完的DOM并操作。
6.$set()及数组的push()等解决Vue可以解决检测不到的问题
原理会将对象新增的key变成一个响应式的对象，然后手动触发notify。在
    依赖收集的，在派发跟新的时候重新渲染。
    数组的话会改写原生的API，然后手动调用dep.notify
7.computed --- 计算属性
computed在init的过程中也会生成对应的watch，将渲染watch放入其的依赖数
    组中但是不会立即求值。等访问到时才会去求值。然后计算属性的表达式中有
    其他的响应式对象,则会将computed放到其的依赖数组中。然后进行更新。
    当其依赖的响应对象发生变化时，则会触发computed的Watch的求值，然后
    将新值与旧值比较，相等则不会调用render重新渲染。不相等则会重新渲染。
    即其依赖的响应式对象变化时，都会触发求值，但只有新值与旧值不等时才会
    触发更新。
8.watch --- 侦听属性
初始化的时候会遍历watch，拿到每一个hander。因为watch可以写成对象或者
    数组。然后建立对应的watch，并收集依赖。deep选项，会对侦听的对象深度
    遍历从而对其建立对应的watch，所以深层对象想要改变其子属性时触发watch
    应该增加deep属性。但由于遍历去触发子属性的getter，来收集依赖，所以
    开销会增大。
10.组件更新
Watch重新渲染触发patch函数。
 当更新的 vnode 是一个组件 vnode 的时候， 会执行prepatch的方法,所以父组件
 更新子组件的props时，自组件会调用props对应的setter，从而进行更新。
 实际还是操作DOM，尽量较小的跟新Don。减少创建，移动等DOM操作。
1.新旧节点不相同
创建新的节点 ---> 跟新父的占位节点 ----> 删除旧的节点
2.新旧节点相同
1.当新的Vnode的text属性存在
即Vnode为文本节点，且oldVnode.text !== Vnode.text 则直接将新的text
    赋值。
2.当新的Vnode的text属性不存在，即不为文本节点时
ch = Vnode.childern，oldCh = oldVnode.childern
1.新ch与oldCh都存在时
ch与oldch不相等时，调用updateChildren
    updateChildren --- diff算法的实现。判断新旧Vnode的startNode及endNode
    之前的关系。来得到最优的跟新方案，比如v-for中需要key值来标记item，例
    如push一个item时，就不会打乱之前的顺序，而是创建一个新元素插入到Dom
    最前。如果key是index时，则push时不会移动Don，只是将item的vode的内容
    换下，最后在添加一个item插入最末。
    具体实现可以阅读updateChildren函数。
    核心：尽量较小的跟新Don。减少创建，移动等DOM操作。
2.新ch存在且oldCh不存在时
直接将ch加入到挂载dom
3.新ch不存在且oldCh存在时
直接将oldCh从挂载DOM时移除
4.新ch与oldCh都不存在且oldVnode.text存在
直接将挂载DOM的text设置为空