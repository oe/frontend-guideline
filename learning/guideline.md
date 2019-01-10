# 前端编码规范

不论是前端， 还是 C++，Java 等，都有各自的编码规范，良好的编码规范可以提升代码的可读性，可维护性，以及避免一些错误，采用统一的规范也有利于后期做一些代码层面等优化，在团队中尤其要注意应采用同一套规范。

市面上已经有很多编码规范了，如:

- [编码规范 by @mdo](https://codeguide.bootcss.com/)

以下是我在工作中总结的一套编码规范。

---

## 代码的目录结构

项目目录结构根据项目大小，使用的框架技术不同， 目录结构会有所不同。下面列出的是一个最简单的前端的目录结构如下。

不论项目的目录结构如何千变万化，有一点是不变的，良好的目录结构能大大提升代码的可读性和可维护性，相关的文件/文件夹应放在一起。

```
./ 项目根目录
│  index.html 首页面
│
└─assets     静态资源文件夹
    ├─css    CSS代码文件夹, 也可以放置less, sass等CSS预处理语言的代码
    │  │
    │  └─img CSS引用的图片, 比如图标, 背景图片等
    │
    ├─img    页面直接引用的图片, 比如轮播图片
    │
    ├─js     JS代码文件夹, 也可以放置coffeescript等js预处理语言的代码
    │
    └─lib    第三方库的文件夹, 每一个库应单独建立一个文件夹,
                  用来放置该库的所有文件, 包括js,css,图片, 字体等

```

## 文件规范

### 编码方式

代码文件统一使用 **无 BOM 头的 utf-8**(utf-8 without BOM) 的编码方式.

### 文件命名

文件名称以及文件后缀中的 **英文字母统一使用小写** , 如 `bg.png`, `index.html`, `app.js`等. 详细请参阅 [为什么文件名要小写？](http://www.ruanyifeng.com/blog/2017/02/filename-should-be-lowercase.html)

文件名命名只能使用 **英文字母** 、**数字** 以及 **-** (连字符), 不要使用中文字符. 一般使用多个单词组合使用连字符连接, 单词可使用常见缩写, 不可过度缩写. 如 `user-module.js`, `sidebar.css`, `i18n-tpl.html`等.

### 文件后缀

- HTML 文件要以 `.html` 结尾.
- Javascript 文件以 `.js` 结尾
- CSS 文件以 `.css` 结尾

## 编码规范

### 通用规范

#### 缩进

代 码文件统一使用 2 个空格来作为一次缩进, 不要使用 tab 或者 tab 与空格混用, 以保证代码在不同环境下显示一致.

可在代码编辑器的配置中将一个 tab 的大小设置为 2 个空格.

#### 注释

根据需要，在可能的情况下给代码块(或者函数)做注释：这块实现了什么功能，它的目的是什么，为什么这种方案更好？（注释代码不是强制要求，视乎项目性质和复杂程度）

#### 待办事项

在代码的注释中使用 `TODO` (全大写)关键字来标识待办事项, 使用`TODO(联系人)` 的形式附上联系信息(姓名, 邮箱等)方便联系; 在冒号后加上待办事项内容. 在代码发布时要确认代码中无任何`TODO`标识.

```js
// TODO(张工): 参数暂未校验
funtion submitOrder (data) {
    ....
}
```

#### 行尾空格

删除所有的行尾空白.

### HTML 部分

#### 文档类型

推荐使用 HTML5 文档类型 `<!DOCTYPE html>`

#### 编码方式

编码方式除统一使用`utf-8 without BOM`之外, 在 HTML 的 head 还需要指定编码方式:

```html
<meta charset="utf-8" />
```

#### 缩进

除了一个使用 2 个空格作为一次缩进, 在嵌套节点上也应当有缩进.

```html
<ul>
  <li>子节点</li>
</ul>
```

#### 大小写

所有代码只使用小写：包括标签、选择器、属性及属性值（文本节点例外，作为内容时例外）.

```html
<img class="avatar" src="face.png" alt="User Avatar" />
```

#### 语法

- 在属性上，使用双引号，不要使用单引号.
- 不要在自动闭合标签结尾处使用斜线
- 不要忽略可选的关闭标签（例如，`</li>` 和 `</body>`）.

#### 实用高于完美

尽量遵循 HTML 标准和语义，但是不应该以浪费实用性作为代价.任何时候都要用尽量小的复杂度和尽量少的标签来解决问题

#### 减少标签数量

在编写 HTML 代码时，需要尽量避免多余的父节点.很多时候，需要通过迭代和重构来使 HTML 变得更少. 参考下面的示例:

```html
<!-- 不推荐 -->
<span class="avatar"> <img src="..." /> </span>

<!-- 推荐 -->
<img class="avatar" src="..." />
```

#### 属性顺序

HTML 属性应该按照特定的顺序出现以保证易读性.

- id
- class
- name
- data-\*
- src, for, type, href
- title, alt

Classes 是为高可复用组件设计的，理论上他们应处在第一位.Ids 更加具体而且应该尽量少使用（例如, 页内书签），所以他们处在第二位.但为了突出 id 的重要性， 把 id 放到了第一位.

#### Boolean 属性

不要为 Boolean 属性添加取值.

```html
<input type="text" disabled /> <input type="checkbox" value="1" checked />
<select>
  <option value="1" selected>1</option>
</select>
```

#### 引入 CSS 和 JavaScript

在引入外部 CSS 和 JavaScript 文件时不需要指明 type，因为 text/css 和 text/javascript 分别是他们的默认值.

对于比较流行的第三方库, 可以考虑使用第三方 CDN(如微软,新浪等)托管的库, 以提升文件的加载速度.

##### CSS

- CSS 文件的引入一般放在 head 标签内, 以避免页面加载是出现页面闪烁的情况
- 由团队自己开发的的 CSS 文件一般在第三方 CSS 文件之后引入, 以提升团队开发的样式的优先级, 方便修改第三方库的样式
- 不要直接修改第三方 CSS 文件内的样式
- 不要使用 `style` 属性去设置元素样式
- 同时也应减少使用 javascript 操作 dom 的 style 属性来修改样式, 推荐使用修改 class 的方式来修改样式
- 尽量避免使用`style`标签来书写样式(404,500, 403 等错误页面除外).

所有的样式应集中在外部的 css 文件中, 方便维护和管理.

##### Javascript

- javascript 文件的引入一般放在 body 结束标签之前, 避免由于 javascript 加载及执行时间太长导致整个页面长时间无法完成加载
- 由团队自己开发的 javascript 文件一般应在第三方库之后引入, 避免团队开发 的 javascript 文件引入第三方库时报错
- 不要直接修改第三方库的 javascript 文件.
- 不要使用`onclick`, `onload`等以`on`开头的属性来给 HTML 元素绑定事件; 同时也应减少使用无 `src`属性的`script`标签.

所有的 javascript 代码应集中在 js 文件中, 方便维护和管理.

### CSS 部分

#### 语法

- 使用组合选择器时，保持每个独立的选择器占用一行.
- 为了代码的易读性，在每个声明的左括号前增加一个空格.
- 声明块的右括号应该另起一行.
- 每条声明 `:` 后应该插入一个空格.
- 每条声明应该只占用一行来保证错误报告更加准确.
- 所有声明应该以分号结尾.虽然最后一条声明后的分号是可选的，但是如果没有他，你的代码会更容易出错.
- 逗号分隔的取值，都应该在逗号之后增加一个空格.比如说 box-shadow
- 不要在颜色值 `rgb()` `rgba()` `hsl()` `hsla()`和 `rect()` 中增加空格，并且不要带有取值前面不必要的 `0` (比如，使用 `.5` 替代 `0.5`).
- 所有的十六进制值都应该使用小写字母，例如 `#fefefe`.
  尽可能使用短的十六进制数值，例如使用 `#fff` 替代 `#ffffff`.
- 为选择器中的属性取值添加引号，例如 `input[type="text"]`. 他们只在某些情况下可有可无，所以都使用引号可以增加一致性.
- 不要为 0 指明单位，比如使用 `margin: 0;` 而不是 `margin: 0px;`.

```css
/* 不推荐 */
.selector,
.selector-secondary,
.selector[type='text'] {
  padding: 15px;
  margin: 15px;
  margin-bottom: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #ffffff;
}

/* 推荐 */
.selector,
.selector-secondary,
.selector[type='text'] {
  padding: 15px;
  margin: 15px;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
}
```

#### 不要使用 @import

与 <link>标签相比, @import 更慢, 增加了额外的页面请求，可能还会导致不可预见的问题.避免使用它们, 改用以下的方法:

- 多用几个 <link> 标签
- 将你的 css 编译到一个文件里

#### 媒体查询位置

尽量将媒体查询的位置靠近他们相关的规则. 不要将他们一起放到一个独立的样式文件中, 或者丢在文档的最底部.这样做只会让大家以后更容易忘记他们. 下面是一个正确示例.

```css
.element {
  ...;
}
.element-avatar {
  ...;
}
.element-selected {
  ...;
}

@media (min-width: 480px) {
  .element {
    ...;
  }
  .element-avatar {
    ...;
  }
  .element-selected {
    ...;
  }
}
```

#### 前缀属性

当使用浏览器私有前缀属性时，通过缩进使取值垂直对齐以便多行编辑, 并将标准属性放置在最后.

```css
.selector {
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}
```

#### 单条声明的声明块

在一个声明块中只包含一条声明的情况下，为了易读性和快速编辑可以考虑移除其中的换行. 所有包含多条声明的声明块应该分为多行。

这样做的关键因素是错误检测. 例如, 一个 CSS 验证程序显示你在 183 行有一个语法错误,如果是一个单条声明的行，那就是他了。在多个声明的情况下，你必须为哪里出错了费下脑子。

```css
/* 单条声明 */
.span1 {
  width: 60px;
}
.span2 {
  width: 140px;
}
.span3 {
  width: 220px;
}

/* 多条声明 */
.sprite {
  display: inline-block;
  width: 16px;
  height: 15px;
  background-image: url(../img/sprite.png);
}
```

#### 属性简写

坚持限制属性取值简写的使用，属性简写需要你必须显式设置所有取值。常见的属性简写滥用包括:

- padding
- margin
- font
- background
- border
- border-radius

大多数情况下，我们并不需要设置属性简写中包含的所有值。例如，HTML 头部只设置上下的 margin，所以如果需要，只设置这两个值。过度使用属性简写往往会导致更混乱的代码，其中包含不必要的重写和意想不到的副作用。

```css
/* 不推荐 */
.element {
  margin: 0 0 10px;
  background: red;
  background: url('image.jpg');
  border-radius: 3px 3px 0 0;
}

/* 推荐 */
.element {
  margin-bottom: 10px;
  background-color: red;
  background-image: url('image.jpg');
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
```

#### class 命名

- 保持 class 命名为全小写，可以使用连字符（不要使用下划线和 camelCase 命名）。短划线应该作为相关类的自然间断。(例如，`.btn` 和 `.btn-danger`)。
- 避免过度使用简写，不应少于三个字符。`.btn` 可以很好地描述 _button_，但是 `.s` 不能代表任何元素。
- Class 的命名应该尽量短，也要尽量明确。
- 使用有意义的名称；使用结构化或者作用目标相关，而不是抽象的名称。
- 命名时使用最近的父节点或者父 class 作为前缀。
- 使用 `.js-*` classes 来表示行为(相对于样式, 方便 js 来标记元素)，但是不要在 CSS 文件中为其编写样式。

```css
/* 不推荐 */
.t {
  ...;
}
.red {
  ...;
}
.header {
  ...;
}

/* 推荐 */
.tweet {
  ...;
}
.important {
  ...;
}
.tweet-header {
  ...;
}
```

#### 选择器

- 使用 classes 而不是通用元素标签来优化渲染性能。
- 避免在经常出现的组件中使用一些属性选择器 (例如，`[class^="..."]`)。浏览器性能会受到这些情况的影响。
- 减少选择器的长度，每个组合选择器选择器的条目应该尽量控制在 3 个以内。

```css
/* 不推荐 */
span {
  ...;
}
.page-container #stream .stream-item .tweet .tweet-header .username {
  ...;
}
.avatar {
  ...;
}

/* 推荐 */
.avatar {
  ...;
}
.tweet-header .username {
  ...;
}
.tweet .avatar {
  ...;
}
```

### JAVASCRIPT 部分

#### 缩进,分号,单行长度

- 每条语句之后一律以分号结束，不可以省略
- 单行长度，理论上不要超过 80 列, 方便阅读
- 接上一条，如果需要换行，存在操作符的情况，一定在操作符后换行，然后换的行缩进 2 个空格

```js
if (
  typeof user === 'undefined' ||
  typeof user.readed === 'undefined' ||
  user.readed !== true
) {
  url = 'http://demo.example.com/location2.js'
} else {
  url = 'http://demo.example.com/location4.js'
}
```

#### 大括号

和大多数语言一样 Javascript 使用大括号`{}` 来区分代码区块, 表示区块起始的大括号不要新起一行, 而应当放置在区块起始行的行尾.

```js
// 不推荐
if (condition)
{
    ...
}

function foo()
{
    ...
}

// 推荐
if (condition) {
    ...
}

function foo() {
    ...
}

```

#### 空格

- 数值操作符(如, +/-/\*/% 等)两边留空
- 赋值操作符/等价判断符两边留一空格
- js 语言关键字后应有空格
- for 循环条件中, 分号后留一空格
- 变量声明语句, 数组值, 对象值及函数参数值中的逗号后留一空格
- 空行不要有空格
- 行尾不要有空格
- 逗号和冒号后一定要跟空格
- 点号前后不要出现空格
- 空对象和数组不需要填入空格
- 函数名末尾和左括号之间不要出现空格
- 左大括号之前应该有空格

```js
function foo(num) {
  if (num < 2) {
    num *= 2
  }
  return num
}
```

#### 空行

- 方法之间加
- 单行或多行注释前加
- 逻辑块之间加空行增加可读性

#### 变量命名

- 变量名不应少于三个字符(循环中使用的迭代变量 i,j,k 等除外)，过短的名字不能体现其代表等意义，将使代码变得不可读
- 标准变量采用驼峰标识
- 使用的 ID 的地方一定全大写
- 使用的 URL 的地方一定全大写
- 涉及 Android 的，一律大写第一个字母
- 涉及 iOS 的，一律小写第一个，大写后两个字母
- 常量采用大写字母，下划线连接的方式
- 构造函数，大写第一个字母

```js
var thisIsMyName

var goodID

var reportURL

var AndroidVersion

var iOSVersion

var MAX_COUNT = 10

function Person(name) {
  this.name = name
}
```

#### 字符常量

一般情况下统一使用 `''` 单引号

```js
var name = 'Judy'
```

#### null 的使用场景

- 初始化一个将来可能被声明为一个对象的变量
- 与一个可能是对象或者非对象的初始化变量相比
- 传入一个对象待定的函数
- 作为一个对象待定的函数的返回值

#### 不适合 null 的使用场景

- 不要使用 null 来测试一个一个变量是否存在
- 不要用 null 来测试一个没声明的变量

#### undefined 使用场景

一个只声明未定义的变量其值即为`undefined`, 不要给一个刚声明的变量赋值为`undefined`.

永远不要直接使用 undefined 进行变量判断, 使用字符串 "undefined" 对变量进行判断.

```js
// 不推荐
var person
console.log(person === undefined) //true

// 推荐
console.log(typeof person) // "undefined"
```

#### 字面量

使用字面量的方式来定义 javascript 内置类型的变量, 不要使用 new 操作符. 使用字面量更容易阅读, 而且不会出现潜在错误.

```js
// 对象的字面量
// 不推荐
var team = new Team()
team.title = 'AlloyTeam'
team.count = 25
// 推荐
var team = {
  title: 'AlloyTeam',
  count: 25
}

// 数组的字面量
// 不推荐
var colors = new Array('red', 'green', 'blue')
var numbers = new Array(1, 2, 3, 4)
// 推荐
var colors = ['red', 'green', 'blue']
var numbers = [1, 2, 3, 4]

// 正则字面量
// 不推荐
var reg = new RegExp('s+', g)
// 推荐
var reg = /\s+/g

// 字符串字面量
// 不推荐
var str = new String('Hello')
// 推荐
var str = 'Hello'

// 数字字面量
// 不推荐
var num = new Number(12)
// 推荐
var num = 12

// 布尔字面量
// 不推荐
var isLoaded = new Boolean(false)
// 以下语句会弹出对话框 Yes
if (isLoaded) {
  alert('Yes')
}
// 推荐
var isLoaded = false
// 以下语句中的alert则不会执行
if (isLoaded) {
  alert('Yes')
}
```

#### 单行注释

- 双斜线后，必须跟注释内容保留一个空格
- 可独占一行, 前边不许有空行, 缩进与下一行代码保持一致
- 可位于一个代码行的末尾，注意这里的格式

```js
// 推荐
if (condition) {
  // 通过安全检查
  allowed()
}

var zhangsan = 'zhangsan' // 双斜线距离分号一个缩进, 双斜线后保留一个空格
```

#### 多行注释

- 最少三行, 格式如下
- 前边留空一行

```js
/*
 * 注释内容与星标前保留一个空格
 */
```

##### 何时使用

- 难于理解的代码段
- 可能存在错误的代码段
- 浏览器特殊的 HACK 代码
- 业务逻辑强相关的代码

#### 文档注释

对于函数以及全局变量, 需要有详细的文档注释. 文档注释是使用`@param` `@return`等标签来注解, 请参考 <http://usejsdoc.org/>

函数注释格式如下

```js
/**
 * 函数功能描述
 * @param  {参数类型}   参数名      参数描述
 * @return {返回数据类型}           返回数据描述
 */

// 例如
/**
 * 判断参数是否为数字
 * @param  {Number}   num   待判断的参数, 可以是任意类型
 * @return {Boolean}        若参数为数字则返回true, 否则false
 */
function isNum(num) {
  return !isNaN(num)
}
```

全局变量注释格式如下

```js
/**
 * 常量描述
 * @type {常量类型}
 */

// 例如
/**
 * 每页请求的数据条数
 * @type {Number}
 */
var PAGE_SIZE = 10
```

#### 其他

尽量避免使用 `==` `!=`, 推荐使用严格比较 `===` `!==` .

- `eval` 非特殊业务， 禁止使用
- `with` 非特殊业务， 禁止使用

## 其他开发规范

[code guide, bootcss](http://codeguide.bootcss.com/)
