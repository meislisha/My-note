### vue组件渲染过程
keep-alive :
1. 首次渲染: patch( 执行 createComponent )-> initComponent ->通过cache[key]存储已经渲染过的组件实例
2. 缓存渲染: patch -> patchVnode -> prepatch -> updateChildComponent (这里会根据keepAlive属性, 并处理通过slot引用组件的组件,触发他们的render函数,从而执行 vnode.componentInstance = cache[key].componentInstance) -> createComponent -> init(isReactivated 为true, 所以不执行组件的create和mount) -> initComponent(vnode.elm = vnode.componentInstance.$el) -> reactivateComponent (insert(parentElm, vnode.elm, refElm) 将缓存的dom插入目标元素中)

