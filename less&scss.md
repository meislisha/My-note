###less和sass 区别
	1. 编译环境不一样：sass需要安装ruby，属于服务端处理，然而less是基于JavaScript运行，要引入less.js,属于客户端处理
	2. 变量声明不一样：sass:$width;less:@width; 
	3. 输出格式设置：，sass可以使用特定的输出格式，less无输出格式
		1. nested:嵌套缩进的css代码
		2. expanded：展开的多行css代码
		3. compact:简洁格式的css代码
		4. compressed:压缩后的css代码
	4. 混合不同mixin
		1. sass:添加@minix声明，通过@include来调用它
			@mixin error($borderWidth:2px){
			  border:$borderWidth solid #f00;
			  color: #f00;
			}
			/*调用error Mixins*/
			.generic-error {
			  @include error();/*直接调用error mixins*/
			}
		2. less
			.error(@borderWidth:2px){
			  border:@borderWidth solid #f00;
			  color: #f00;
			}
			/*调用error Mixins*/
			.generic-error {
			  .error();/*直接调用error mixins*/
			}
	5. 继承  .block{}
		1. sass：p{ @extend:.block; }
		2. less: p{ .block }
	6. sass支持条件语句，for循环，而less不可以；
### LESS
	1. 变量:@width:10px;	
	2. 混入mixin
		1. 立即执行  .test{color:#000;}
			1-1 .stydy{ &:extend(.test) }
			1-2 .stydy{ .test; }
		2. 非立即执行  .test(){color:#000;}
			2-1 .stydy{ .test() }
			2-2 .stydy{ .test; }
			小结：当调用mixin时，括号是可选的
		3. minin组合使用 .test(){color:#000;}
			3-1 .study{ .test };  .study2:extend(.study){}
			3-2 .study,.study2{ .test }
			小结：extend中不能调用mixin函数，错误用法（.study:extend(.test){}）
		4. 可以带参数 (可以多参数)
			4-1 .test(@color){color:@color;} .study{ .test(#000) }; 
		5. 带默认参数 .test(@color:#fff){color:@color;} .study{ .test(#000) };
	3. 嵌套 
	4. &解析的是同一个元素或次元素的伪类。没有&解析时后代元素
	5. Escaping:  
			@min768: (min-width: 768px);
			.element {
			  @media @min768 {
			    font-size: 1.2rem;
			  }
			}
	6. 函数
		1. width: percentage（@width）： 变成50%；
		2. color: saturate(@base, 5%) ： 将颜色饱和度增加5%；
		3. image-width("file.png");image-height("file.png"); ： 10px
		4. convert(9s, "ms") ： 9000ms
		5. margin: if((2 > 1), 0, 3px);
	7. Maps
		    #colors() {
			  primary: blue;
			  secondary: green;
			}
			
			.button {
			  color: #colors[primary];
			  border: 1px solid #colors[secondary];
			}
	8. 作用域
		@var: red;
		#page {
		  @var: white;//
		  #header {
		    color: @var; // white
		  }
		  @var: white;
		}
	9. importing 导入
		@import "library"; // library.less
		@import "typo.css";

### scss
	1. 父选择符： &
	2. 变量：$width: 5em;
	3. 引入：@import
	4. 混合mixin
		 @mixin border-radius($radius) {
	          border-radius: $radius;
		      -ms-border-radius: $radius;
		     -moz-border-radius: $radius;
		     -webkit-border-radius: $radius;
		}
		.box {
		  @include border-radius(10px);
		}
	5. 继承
		%message-common {
		  border: 1px solid #ccc;
		  padding: 10px;
		  color: #333;
		}
		
		.message {
		  @extend %message-common;
		}
	6. 操作符+、-、*、/、%
	7. 嵌套属性：CSS许多属性都位于相同的命名空间（例如font-family、font-size、font-weight都位于font命名空间下），Scss当中只需要编写命名空间一次，后续嵌套的子属性都将会位于该命名空间之下
		.demo {
		  // 命令空间后带有冒号:
		  font: {
		    family: fantasy;
		    size: 30em;
		    weight: bold;
		  }
		}
