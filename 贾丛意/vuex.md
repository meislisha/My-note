# vuex
### 模块添加命名空间后是怎么通过命名空间划分的
当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名, 具体就是 type = namespace + type

### 为什么要特意封装action来处理异步
1. 一方面是可以在异步处理时传入相应的参数, 进行相应操作
2. 另一方面最主要的原因是通过引入action, 可以使用vue的devtool来检测vuex的数据流向

