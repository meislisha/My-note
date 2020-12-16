#### AMD、CMD规范

```
AMD（requirejs）规范：异步加载模块，依赖前置（所有导入的模块放在最前面），模块导入和导出是使用：define,和require
	
CMD规范（SeaJS）：同步加载模块，模块导入和导出是使用：exports、module.exports(50行引入某个模块，就在49行引入),和require，依赖就近

AMD和CMD的区别
    1、对于依赖的模块，AMD是提前执行，CMD是延迟执行。
    2、AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一。
```

#### 对模块化的理解？

```
1.script标签 这是最原始的 JavaScript 文件加载方式
缺点太多：{
    1、污染全局作用域
    2、开发人员必须主观解决模块和代码库的依赖关系
    3、文件只能按照script标签的书写顺序进行加载
    4、在大型项目中各种资源难以管理，长期积累的问题导致代码库混乱不堪      

}
2.CommonJS规范
         该规范的核心思想是允许模块通过require方法来同步加载所要依赖的其他模块，然后通过 exports 或 module.exports 来导出需要暴露的接口
3.AMD规范
由于浏览器端的模块不能采用同步的方式加载，会影响后续模块的加载执行，因此AMD规范诞生了。AMD标准中定义了以下两个API

1、require([模板], 回调函数);
2、define(id, [模板], 回调函数);
require接口用来加载一系列模块，define接口用来定义并暴露一个模块。   

3.CMD规范
CMD规范和AMD很相似，尽量保持简单，并与CommonJS和Node.js的 Modules 规范保持了很大的兼容性。在CMD规范中，一个模块就是一个文件。


```

#### 