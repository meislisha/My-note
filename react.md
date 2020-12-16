# react

### 1. 脚手架

```
npm i -g create-react-app
npx create-react-app demo
cd demo 
yarn start

```

1. *Fragment*:添加一个顶级元素，但是无需向DOM添加额外节点

使用charles  mock数据

```
配置后还是404：localhost换为localhost.charlesproxy.com
```



```
当state或props发生改变，render函数就会重新执行
当父组件的render函数被运行时，子组件的render都将被重新运行
```



## 1.简介

### 1.state --- 状态

```
通过this.setState赋值
```

### 2.props

```
父组件得传值,不可变
```

### 3.api

```
设置状态：setState
替换状态：replaceState
设置属性：setProps
替换属性：replaceProps
强制更新：forceUpdate
获取DOM节点：findDOMNode
判断组件挂载状态：isMounted
```

## 2.生命周期

### 1.componentWillMount

```
在渲染前调用
```

### 2.componentDidMount

```
在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过
this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，
可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作
(防止异部操作阻塞UI)
```

### 3.componentWillReceiveProps 

```
在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。
```

### 4.shouldComponentUpdate

```
返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。 
可以在你确认不需要更新组件时使用。
```

### 5.componentWillUpdate

```
在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
```

### 6.componentDidUpdate 

```
在组件完成更新后立即调用。在初始化时不会被调用。
```

### 7.componentWillUnmount

```
在组件从 DOM 中移除的时候立刻被调用
```

```
	constructor:
	初始化state
	
componentWillMount:
	发送网络请求
	
componentWillUnMount:
	清理资源
```

## 3.路由

### 1.文档

```
https://react-guide.github.io/react-router-cn/
```

### 2.安装

```
npm install --save react-router
```

### 3.Api说明

```
Router ---- 路由外壳
Route  ---- 单个路由配置
IndexRoute ---- 首页路由,默认路由
hashHistory ---- history的模式
```

### 4.路由跳转方式

#### 1.Link --- 声明式路由

```
    <Link to="/list">to list</Link>
```

#### 2.push --- 编程式路由

```
     hashHistory.push('/detail/' + value)
     两者都可以带参数
```

#### 3.获取路由参数

```
     this.props.parmas.id
```

#### 例子:

```
React.render((
    <!-- 路由 -->
    <Router>
        <!-- 路由包裹层 -->
        <Route path="/" component={App}>
            {/* 当 url 为/时渲染 Dashboard */}
            <IndexRoute component={Dashboard} />
            <Route path="about" component={About} />
            <Route path="inbox" component={Inbox}>
                <Route path="messages/:id" component={Message} />
            </Route>
        </Route>
    </Router>
    ), document.body)
```

### 4.路由钩子

```
onUpdate ---- 路由发生变化时调用
onEnter --- 进入路由是调用
onLeave --- 路由离开时调用
```

### 5.组件中拦截路由

```
routerWillLeave --- 路由跳转前确认
    import { Lifecycle } from 'react-router'

    const Home = React.createClass({

    // 假设 Home 是一个 route 组件，它可能会使用
    // Lifecycle mixin 去获得一个 routerWillLeave 方法。
    mixins: [ Lifecycle ],

    routerWillLeave(nextLocation) {
        if (!this.state.isSaved)
        return 'Your work is not saved! Are you sure you want to leave?'
    },

    // ...

    })
```

```
1. StyleSheet.create来集中定义组件的样式  然后 <Text style={styles.red}></Text>
2. 处理文本输入： onChangeText  onSubmitEditing
	        <TextInput
      style={{height: 40}}
      placeholder="Type here to translate!"
      onChangeText={(text) => this.setState({text})}
    />
3. 触摸事件onPress
	1. <Button
		  onPress={() => {
		    Alert.alert("你点击了按钮！");
		  }}
		  title="点我！"
		/> 
4. 滚动视图 ScrollView
5. 使用长列表 FlatList
6. 图片 <Image  source={}>
```



```
1. 特点
	1. 虚拟dom
	2. 单向数据刘或数据绑定
	3. 可以进行服务器端渲染
2. 优点：
	1. 提高应用性能
	2. 可以方便的在客户端和服务器端使用
	3. 由于jsx，代码的可读性很好
3. 局限性
	1. 只是一个库，而不是一个完整的框架（一整套的解决方案）
4. javascript xml  是react使用的一中文件，

20. React组件生命周期的阶段是什么？
React 组件的生命周期有三个不同的阶段：
初始渲染阶段：这是组件即将开始其生命之旅并进入 DOM 的阶段。
更新阶段：一旦组件被添加到 DOM，它只有在 prop 或状态发生变化时才可能更新和重新渲染。这些只发生在这个阶段。
卸载阶段：这是组件生命周期的最后阶段，组件被销毁并从 DOM 中删除。
```

