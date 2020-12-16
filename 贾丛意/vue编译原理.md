# Vue编译原理
### 定义Vue构造函数
0. 定义Vue构造函数
1. 执行`initMixin`, 给Vue构造函数原型上加入`_init`方法
2. `stateMixin`方法, 给原型加`$set`,`$delete`,`$watch`方法
3. `eventsMixin`, 原型上加`$on, $once, $off, $emit`方法
4. `lifecycleMixin`, 原型上加`_update, $forceUpdate, $destroy`
5. `renderMixin`, `$nextTick, _render`

### new Vue
#### 1. 执行`this._init`方法
```
1. initLifeCycle
2. initEvents, 创建_events, 用于存储自定义事件的监听函数;
3. initRender, 初始化_c 和 $createElement方法
4. 触发生命周期 beforeCreate
5. initInjections
6. initState, 初始化props, methods, data(调用observe劫持data), computed, watch, 此处为Vue双向数据绑定劫持数据阶段;
7. initProvide
8. 触发生命周期created
9. vm.$mount(vm.$option.el)

```
#### 2. $mount
```
1. 通过query方法查到这个dom元素
2. 调用mountComponent(this,el,hydrating)方法
3. 触发beforeMount生命周期
4. 创建updateComponent函数, 用于组件更新
```
#### 3. 创建updateComponent函数, 用于组件更新
```
vm._update(vm._render(),hydrating)
vm._render方法返回一个vnode,
vm._update:比较更新或初始化dom
```
#### 4. new Watcher(vm,updateComponent...)
```
1. function Watcher(vm, expOrFn...){
  this.getter = expOrFn;//将render函数赋值给getter函数
}

2. 实例化watcher后, 执行watcher原型链上的get函数, 执行this.getter();即调用updateComponent方法
```
#### 5. 执行updateComponent方法
```
1. 拿到oldvnode和vnode
2. 调用this.__patch__方法, 比较更新或初始化dom
```
#### 6. 调用this.__patch__方法, 比较更新或初始化dom
```
1. 先判断oldvnode是不是realElement, 如果是, 就说明是首次渲染, 如果不是, 进行新旧节点比较更新

```
#### 7. 如果是真实dom节点
```
1. 将真是dom转换成vnode
2. 拿到oldvnode.elm, 再获取其父节点parentElm, 首次渲染的时候是body元素
3. 调用createElm方法, 根据vnode创建实际dom
```
#### 8. 调用createElm方法, 根据vnode创建实际dom
```
1. 先调用createComponent方法, 判断是否有data(原生dom的vnode不会有data), 有的话就调用组件的hook中的init方法, 调用createInstanceForVnode方法创建组件实例, return true

```
#### 9. 调用createInstanceForVnode方法创建组件实例
```
1. 调用使用extend继承实现的Vue的子构造器, 该构造器主要用于merge全局属性(component, directive, filter);
2. 将实例挂载到vnode.componentInstance属性上
3. 调用componentInstance的$mount方法, 参考之前的$mount方法流程
```
#### 10. 之后再次调用createElm方法生成子组件的实际dom
```
1. 如果有children就调用createChildren方法创建子dom
```
#### 11. 最后调用insert方法将生成的实际dom插入body中
#### 12. 调用removeVnodes方法移除app.vue中用于占位的dom(所以不能用body作为el, 因为最后会被移除)

### computed Watcher的原理
```
1. 第一次生成computed watcher的时候不会触发this.get方法;
2. 之后渲染watcher触发computed wathcer的get的时候, 它就会执行watcher.evaluate方法,这里面执行了this.get方法, 将computed watcher push进了target队列, 并赋值给了Dep.target
3. 之后依赖属性就都放入computed watcher的this.deps里面,然后将computed watcher pop出队列, 将之前的那个渲染watcher赋值给Dep.target;
4. 之后执行computed watcher的depend方法, 就将computed watcher放在this.deps里的依赖也同时依赖给了渲染watcher;
5. 之后这些依赖一旦发生变化,如果发现订阅的是computed watcher, 就会修改他的this.dirty为true, 同时也会触发渲染watcher的update, 进而再去取computed watcher的值, 取computed watcher的值时判断他的this.dirty是不是true, 如果是, 则表示值改变了, 需要重新计算, 如果是false, 则直接取之前计算的value值返回;
```
### 用户自己写的Watcher的原理
```
1. 用户自己写的watcher, 在调用`function Watcher (vm,expOrFn,cb,options,isRenderWatcher)` 构造函数的时候, 传入的第二个参数是当前监听的响应数据标识, 通过调用parsePath(expOrFn)方法返回一个获取标识所指向的响应变量的值的方法并赋值给this.getter;所以在new Watcher的时候会触发this.get, 会去取那个监听的响应数据的值, 就会触发响应数据的get方法, 将这个watcher收入订阅者队列中;
2. 而watcher所对应的用户所写的数据发生改变后, 调用的处理方法是传给第三个参数 cb ;
3. 之后这个响应数据发生变化, 触发watcher的run方法, 如果是用户自己写的watcher, 就会调用this.cb方法, 这个cb方法就是用户自己写的监听数据变化后要执行的方法
```