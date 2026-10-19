---
title: "前端编码规范"
description: "不论是前端， 还是 C++，Java 等，都有各自的编码规范，良好的编码规范可以提升代码的可读性，可维护性，以及避免一些错误，采用统一的规范也有利于后期做一些代码层面等优化，在团队中尤其要注意应采用同一套规范。"
sidebar:
  order: 3
---

不论是前端， 还是 C++，Java 等，都有各自的编码规范，良好的编码规范可以提升代码的可读性，可维护性，以及避免一些错误，采用统一的规范也有利于后期做一些代码层面等优化，在团队中尤其要注意应采用同一套规范。

市面上已经有很多编码规范了，如:

- [编码规范 by @mdo](https://codeguide.bootcss.com/)

以下是我在工作中总结的一套编码规范。缩进、引号、分号、命名和属性顺序主要是团队约定，不是语言强制要求；接手已有项目时，优先遵循它的 ESLint、格式化工具和框架规则。下文会单独说明影响正确性的语言规则。

---

## 代码的目录结构

项目目录结构根据项目大小和框架不同而变化。下面是直接使用静态文件的示例；模块化项目通常使用 `src/`、包管理器和构建配置，不需要手动把第三方包复制到 `lib/`。

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

代码文件统一使用 **无 BOM 头的 utf-8**(utf-8 without BOM) 的编码方式. [什么是 BOM?](https://zh.wikipedia.org/zh-cn/%E7%AB%AF%E5%BA%8F%E8%A8%98%E8%99%9F)

### 文件命名

文件名称以及文件后缀中的 **英文字母统一使用小写** , 如 `bg.png`, `index.html`, `app.js`等. 详细请参阅 [为什么文件名要小写？](http://www.ruanyifeng.com/blog/2017/02/filename-should-be-lowercase.html)

普通静态文件建议采用小写英文、数字与连字符，例如 `user-module.js`、`sidebar.css`，以减少跨系统的大小写问题。这是命名建议，不是操作系统或语言的统一限制；`README.md`、`.gitignore`、`App.vue`、`[id].tsx` 等工具和框架约定应按项目规则保留。

### 文件后缀

- HTML 文件要以 `.html` 结尾.
- JavaScript 普通脚本常用 `.js`；模块、JSX 与 TypeScript 项目还可能使用 `.mjs`、`.cjs`、`.jsx`、`.ts` 和 `.tsx`，以项目配置为准。
- CSS 文件以 `.css` 结尾

## 编码规范

### 通用规范

#### 缩进

代码文件统一使用 2 个空格来作为一次缩进, 不要使用 tab 或者 tab 与空格混用, 以保证代码在不同环境下显示一致.

可在代码编辑器的配置中将一个 tab 的大小设置为 2 个空格.

#### 注释

根据需要，在可能的情况下给代码块(或者函数)做注释：这块实现了什么功能，它的目的是什么，为什么这种方案更好？（注释代码不是强制要求，视乎项目性质和复杂程度）

#### 待办事项

可使用 `TODO(负责人或 issue 编号)` 标记待办事项，并说明背景。发布前应确认关键功能和安全问题已解决，非阻塞的后续工作可以保留可追踪的 TODO；不能仅用“没有 TODO”判断是否可发布。

```js
// TODO(issue-123): 支持服务端返回的业务错误码。
function submitOrder(data) {
  if (!data || typeof data !== 'object') {
    throw new TypeError('订单数据必须是对象');
  }
  // 在这里接入项目的提交逻辑。
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
<meta charset="utf-8">
```

#### 缩进

除了统一使用 2 个空格作为一次缩进, 在嵌套节点上也应当有缩进.

```html
<ul>
  <li>子节点</li>
</ul>
```

#### 大小写

HTML 标签名和普通属性名通常统一使用小写。属性值中的 URL 路径、class、id 与数据可能区分大小写，不能随意转换；SVG 的 `viewBox` 等属性及 JSX 组件命名也需要遵循各自规则。

```html
<img class="avatar" src="face.png" alt="User Avatar">
```

#### 语法

- 本文 HTML 示例使用双引号；单引号也是合法 HTML 语法，团队保持一致即可。
- 普通 HTML 的空元素（如 `img`、`input`）无需结尾斜线，斜线不会使普通 HTML 元素自动闭合；JSX/XML 的自闭合语法应按对应规则书写。
- 不要忽略可选的关闭标签（例如，`</li>` 和 `</body>`）.

#### 实用高于完美

尽量遵循 HTML 标准和语义，但是不应该以浪费实用性作为代价.任何时候都要用尽量小的复杂度和尽量少的标签来解决问题

#### 减少标签数量

在编写 HTML 代码时，需要尽量避免多余的父节点.很多时候，需要通过迭代和重构来使 HTML 变得更少. 参考下面的示例:

```html
<!-- 不推荐 -->
<span class="avatar"> <img src="..." alt="头像"> </span>

<!-- 推荐 -->
<img class="avatar" src="..." alt="头像">
```

#### 属性顺序

HTML 属性应该按照特定的顺序出现以保证易读性.

- id
- class
- name
- data-\*
- src, for, type, href
- title, alt

属性顺序不会改变页面语义，选择一致的团队规则即可。`id` 在文档内应唯一，常用于锚点、标签关联和可访问性引用；class 可用于复用样式。

#### Boolean 属性

HTML 布尔属性可只写属性名；属性存在就表示真，因此 `disabled="false"` 仍会禁用控件，要表示假应移除属性。`aria-*`、`data-*` 和 `contenteditable` 等不属于同一种布尔属性规则。参见 [MDN 布尔属性](https://developer.mozilla.org/en-US/docs/Glossary/Boolean/HTML)。

```html
<input type="text" disabled> <input type="checkbox" value="1" checked>
<select>
  <option value="1" selected>1</option>
</select>
```

#### 引入 CSS 和 JavaScript

在引入外部 CSS 和 JavaScript 文件时不需要指明 type，因为 text/css 和 text/javascript 分别是他们的默认值.

是否使用 CDN 需根据访问条件、缓存、依赖稳定性和安全策略评估，不能保证一定比自托管更快。直接引用第三方脚本时应固定版本，并按需要配置完整性校验（SRI）与内容安全策略（CSP）。

##### CSS

- CSS 文件的引入一般放在 head 标签内, 以避免页面加载是出现页面闪烁的情况
- 覆盖第三方 CSS 时要理解层叠、层、选择器优先级等规则。只有其他比较条件相同时，后出现的声明才优先；仅调整引入顺序不一定生效。
- 不要直接修改第三方 CSS 文件内的样式
- 可复用样式优先使用 class；动态计算的尺寸、CSS 自定义属性等也可合理使用 `style`，它不是无条件禁止的语法。
- 同时也应减少使用 javascript 操作 dom 的 style 属性来修改样式, 推荐使用修改 class 的方式来修改样式
- 样式可放在外部文件、组件样式或工具生成的 `style` 标签中，应结合复用范围、缓存和构建方式管理。

样式应有明确归属，避免全局污染；组件化项目可以将相关样式与组件放在一起。

##### Javascript

- 普通外部脚本可在 head 中使用 `defer`，在文档解析后按顺序执行；`type="module"` 的模块脚本默认延后执行。`async` 脚本不保证执行顺序，不能直接用于有顺序依赖的脚本。
- 使用模块的 `import` 显式表达依赖；传统全局脚本则需要安排依赖的加载和执行顺序。
- 不要直接修改第三方库的 javascript 文件.
- 原生 DOM 编程优先用 `addEventListener` 组织事件。React 等框架的 `onClick` 属性属于其事件绑定机制，不能与原生 HTML 内联脚本混为一谈。

将 JavaScript 按模块和职责组织；组件文件中的逻辑应遵循框架规则。

### CSS 部分

#### 语法

- 使用组合选择器时，保持每个独立的选择器占用一行.
- 为了代码的易读性，在每个声明的左括号前增加一个空格.
- 声明块的右括号应该另起一行.
- 每条声明 `:` 后应该插入一个空格.
- 每条声明应该只占用一行来保证错误报告更加准确.
- 所有声明应该以分号结尾.虽然最后一条声明后的分号是可选的，但是如果没有他，你的代码会更容易出错.
- 逗号分隔的取值，都应该在逗号之后增加一个空格.比如说 box-shadow
- 颜色函数可使用逗号分隔或现代空格分隔语法，遵循目标浏览器与格式化配置；`0.5` 与 `.5` 都是合法数字写法。
- 所有的十六进制值都应该使用小写字母，例如 `#fefefe`.
  尽可能使用短的十六进制数值，例如使用 `#fff` 替代 `#ffffff`.
- 为选择器中的属性取值添加引号，例如 `input[type="text"]`. 他们只在某些情况下可有可无，所以都使用引号可以增加一致性.
- 表示零长度时通常可省略单位，例如 `margin: 0`。这个规则不适用于所有值类型：时间值应写成 `0s`，`calc()` 和自定义属性中的值也要遵循上下文的类型要求。

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

这是针对未经构建的浏览器运行时串行加载的建议：导入链可能延迟发现后续样式。直接使用 `<link rel="stylesheet">` 通常更便于尽早发现资源。

构建工具可在构建期处理 `@import`，CSS 还支持结合 `@layer` 管理导入规则；因此不应把所有 `@import` 一概禁止。参见 [MDN @import](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/At-rules/@import)。

#### 媒体查询位置

尽量将媒体查询的位置靠近他们相关的规则. 不要将他们一起放到一个独立的样式文件中, 或者丢在文档的最底部.这样做只会让大家以后更容易忘记他们. 下面是一个正确示例.

```css
.element {
  /* 示例规则。 */
}
.element-avatar {
  /* 示例规则。 */
}
.element-selected {
  /* 示例规则。 */
}

@media (min-width: 480px) {
  .element {
    /* 示例规则。 */
  }
  .element-avatar {
    /* 示例规则。 */
  }
  .element-selected {
    /* 示例规则。 */
  }
}
```

#### 前缀属性

按目标浏览器决定是否需要私有前缀，通常交给构建工具处理，不要无条件添加已无必要的旧前缀。确实需要兼容写法时，标准声明一般放在后面。

```css
.selector {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}
```

#### 单条声明的声明块

无论声明数量多少，都可由格式化工具统一布局。以下示例采用每条声明单独一行；单行声明块也是合法语法。

一致的格式有助于阅读差异和定位问题，但格式本身不保证语法正确。

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

简写可以同时设置多个相关属性，也可能把未写明的成员重置为初始值。按实际意图选择简写或展开写法，不能认为简写要求显式写出每一个成员。常见的简写属性包括：

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
  /* 示例规则。 */
}
.red {
  /* 示例规则。 */
}
.header {
  /* 示例规则。 */
}

/* 推荐 */
.tweet {
  /* 示例规则。 */
}
.important {
  /* 示例规则。 */
}
.tweet-header {
  /* 示例规则。 */
}
```

#### 选择器

- class 有助于明确样式归属、控制选择器优先级，不能仅凭 class 与标签选择器的区别断定页面性能。
- 属性选择器是正常的 CSS 能力。优先避免不必要的广泛匹配与复杂依赖，发现性能问题时通过实际测量定位，不做没有依据的微优化。
- 减少选择器的长度，每个组合选择器选择器的条目应该尽量控制在 3 个以内。

```css
/* 不推荐 */
span {
  /* 示例规则。 */
}
.page-container #stream .stream-item .tweet .tweet-header .username {
  /* 示例规则。 */
}
.avatar {
  /* 示例规则。 */
}

/* 推荐 */
.avatar {
  /* 示例规则。 */
}
.tweet-header .username {
  /* 示例规则。 */
}
.tweet .avatar {
  /* 示例规则。 */
}
```

### JAVASCRIPT 部分

#### 缩进,分号,单行长度

- 分号可由格式化配置统一；JavaScript 也有自动分号插入规则，不能只按换行判断语句边界。
- 单行长度，理论上不要超过 80 列, 方便阅读
- 接上一条，如果需要换行，存在操作符的情况，一定在操作符后换行，然后换的行缩进 2 个空格

```js
const user = { hasRead: true };
let url;

if (!user || user.hasRead !== true) {
  url = 'https://demo.example.com/location2.js';
} else {
  url = 'https://demo.example.com/location4.js';
}
```

#### 大括号

和大多数语言一样 Javascript 使用大括号`{}` 来区分代码区块, 表示区块起始的大括号不要新起一行, 而应当放置在区块起始行的行尾.

```js
// 不推荐
if (condition)
{
    // 示例逻辑。
}

function foo()
{
    // 示例逻辑。
}

// 推荐
if (condition) {
    // 示例逻辑。
}

function foo() {
    // 示例逻辑。
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
    num *= 2;
  }
  return num;
}
```

#### 空行

- 不同函数或逻辑段之间可留空行
- 注释前是否留空行取决于上下文，避免将紧贴下一行的说明割裂
- 逻辑块之间加空行增加可读性

#### 变量命名

- 用能表达职责的名称，不设置通用的最小字符数；`id`、`x` 等在明确上下文中也可以使用。
- 标准变量采用驼峰标识
- 缩写和品牌词的大小写按团队规则统一，例如 `userId`、`requestUrl`、`androidVersion` 和 `iosVersion`。
- 模块级固定配置可采用大写加下划线；`const` 只限制绑定重新赋值，不会自动冻结对象内容，也不要求所有 `const` 变量都大写。
- 构造函数，大写第一个字母

```js
var thisIsMyName

var userId

var requestUrl

var androidVersion

var iosVersion

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

`null` 常用于明确表示“没有对象”或业务上有意留空，是否接受应由接口契约决定。`typeof null` 的结果是 `"object"`，因此仅用 `typeof value === "object"` 不能排除 null。

#### 不适合 null 的使用场景

`value === null` 只判断值是否为 null，不能判断标识符是否声明，也不能同时覆盖 undefined。区分“字段缺失”“字段为 undefined”和“字段明确为 null”时应按业务含义分别处理。

#### undefined 使用场景

一个只声明未定义的变量其值即为`undefined`, 不要给一个刚声明的变量赋值为`undefined`.

已声明的变量可以用 `value === undefined` 判断。`typeof missingName === "undefined"` 还能检查未声明的标识符，但在 `let` / `const` 的暂时性死区中仍可能抛出异常。不要在局部作用域重新定义 `undefined`。参见 [MDN undefined](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。

```js
let person;
console.log(person === undefined); // true
console.log(typeof person); // "undefined"
console.log(typeof missingName); // "undefined"（假设没有同名声明）
```

#### 字面量

普通对象、数组和字符串等通常优先使用字面量。`new String`、`new Number`、`new Boolean` 会创建包装对象，行为与原始值不同；自定义类、`Map`、`Set`、`Date` 等仍有合理的构造用法。

```js
// 对象的字面量
// 不推荐
var team = new Object()
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
var reg = new RegExp('\\s+', 'g')
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
- 独占一行时与所说明的代码保持相同缩进，需要分隔逻辑段时可在注释前留空行。
- 可位于一个代码行的末尾，注意这里的格式

```js
// 推荐
if (condition) {
  // 通过安全检查
  allowed()
}

var zhangsan = 'zhangsan' // 行尾注释与前面的代码之间留空格，双斜线后保留一个空格
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

[要不要写注释(谷歌团队的建议, 英文)](https://testing.googleblog.com/2017/07/code-health-to-comment-or-not-to-comment.html)

#### 文档注释

对于函数以及全局变量, 需要有详细的文档注释. 文档注释是使用`@param` `@return`等标签来注解, 请参考 <https://jsdoc.app/>

函数注释格式如下

```js
/**
 * 函数功能描述
 * @param  {参数类型}   参数名      参数描述
 * @return {返回数据类型}           返回数据描述
 */

// 例如
/**
 * 判断参数是否为有限的 number 原始值，不接受数字字符串。
 * @param {unknown} value 待判断的参数。
 * @returns {boolean} 有限数字返回 true；NaN、Infinity 和非数字返回 false。
 */
function isNum(value) {
  return Number.isFinite(value);
}

isNum(1.5); // true
isNum("1.5"); // false
isNum(null); // false
isNum(NaN); // false
```

全局变量注释格式如下。新代码通常优先使用 `const`，需要重新赋值时用 `let`；本节部分 `var` 示例保留用于说明旧代码写法，不要求在新项目中沿用。

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
const PAGE_SIZE = 10;
```

#### 其他

尽量避免使用 `==` `!=`, 推荐使用严格比较 `===` `!==` .

- `eval` 非特殊业务， 禁止使用
- `with` 非特殊业务， 禁止使用

## 其他开发规范

[bootcss 编码规范](http://codeguide.bootcss.com/)
[JavaScript Style Guide by AirBnb(英文)](https://github.com/airbnb/javascript)
