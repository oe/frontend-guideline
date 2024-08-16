---
title: "学习"
description: "在这里, 开启学习的大门, 你可以按以下目录, 循序渐进学习, 一步步提高."
sidebar:
  order: 1
---

# 学习
在这里, 开启学习的大门, 你可以按以下目录, 循序渐进学习, 一步步提高.

- [前端基础知识](./learning/basic)
- [编码规范](./learning/guideline)
- [前端进阶知识](./learning/pro)
- [常用框架/常用库](./learning/frameworks)
- [有用的资讯、资源及学习网站](./learning/resource)

## 学习方法
你可以直接使用代码编辑器+在本地开启服务器方式来学习前端知识, 但这对于前端初学者来说, 略显麻烦. 推荐使用下述方式来学习:

### 使用 Chrome 开发者工具学习
直接在浏览器中学习, 可以边看教程变学习. 请先确保你已经[下载并并安装了Chrome](https://www.google.cn/chrome/), 建议将其设置为默认浏览器.   
下载地址: <https://www.google.cn/chrome/>

#### 如何打开 Chrome开发者工具
打开 Chrome 开发者工具的方法很简单:
1. 启动Chrome
2. 打开任意网站
3. 右键点击网页并选择菜单 **Inspect**, 弹出的面板即为 「开发者工具」.
4. 也可以使用快捷键快速开启「开发者工具」. 建议记住快捷键, 因为在以后的开发工作中你会频繁的使用这个开发者工具
   1. Mac 下使用 <kbd>cmd</kbd> + <kbd>alt</kbd> + <kbd>i</kbd>
   2. Windows 下使用 <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>i</kbd>

#### 学习 Javascript
在开发者工具中, 有两种方便的方式可以用于学习JS
1. 使用 **Console** 面板
   1. 在开发者工具中激活 Console 面板
   2. 在该面板中直接输入JS代码按回车即执行代码, 若想换行可使用 shift + enter 快捷键
   3. 该面板中执行的JS可以访问网页上的DOM元素, 也能访问该网页的全局JS对象
   4. 该方式适合执行简短的JS语句, 大段的JS代码则推荐使用下边的方法
2. 使用 **Sources** 面板. 详细说明可查看[官方文档](https://developers.google.cn/web/tools/chrome-devtools/javascript/snippets)
   1. 在开发者工具中激活 Sources 面板
   2. 在左侧侧边栏中激活 Snippets 的Tab, 若找不到, 点击「>>」应该就能找到
   3. 在左侧侧边栏空白区域点击右键, 选择菜单 new , 新建代码片段
   4. 在右侧区域编辑代码, 可按 cmd(ctrl) + s 保存代码
   5. 右击左侧代码片段名字, 选择菜单 run 即可执行代码

#### 学习 HTML 及 CSS(不建议初学者使用该方法!)
学习 HTML 及 CSS 使用 **Elements** 面板即可. 详细说明可查看[官方文档](https://developers.google.cn/web/tools/chrome-devtools/css)
1. 该面板的左侧内容区显示的是当前页面的DOM结构, 也可以认为是页面实时(叫实时是因为DOM结构能被JS操作会被改变)的HTML源码; 右侧面板则是左侧DOM节点的属性信息: Styles(样式, 所有被使用样式)、Computed(计算后的样式, 即最终实际使用的样式属性)
2. 左侧的DOM内容区, 可以通过双击节点或者右击节点选择菜单「Edit as HTML」来对节点的HTML进行修改, 
3. 在左侧区域选中一个DOM节点, 右侧侧边栏即会发生对应变化, 在右侧的Styles的页签中可以直接编辑样式, 并可实时查看到对应DOM节点在网页中的最新样式效果
4. 可点击 开发者工具 左上角的 鼠标指针 图标, 使其变为蓝色选中态, 再点击网页中你关注的元素, 即可快速再 Elements 面板中定位到该节点的DOM, 并可在右侧查看到其样式


### 使用在线练习(playground)网站学习
网上有很多在线网站, 可以在线编写 html、css(甚至css的预编译语言 less、scss等)、JavaScript(甚至包括预编译语言 Typescript、Coffeescript等), 并可以实时看到效果. 在浏览器中即可演练, 无需在电脑上安装其他软件, 还可以可以保存演练的代码并生成唯一的访问地址分享给其他人, 非常方便.

以下是一些流行对在线练习网站:
1. [JSbin](http://jsbin.com/?html,css,js,output), 很轻量的练习网站, 访问很快, 但无法通过该网站练习代码分享给他人. 建议使用该网站来练习前端开发
2. [Codepen](https://codepen.io/pen/), 一个很流行的代码练习网站, 注册登录后可将你的代码片段分享给其他人. 也可以在上面查看别人分享的[有趣的代码](https://codepen.io/popular/pens/)
3. [CodeSandbox](https://codesandbox.io/s/vanilla), 一个功能更为强大的练习网站, 可以用于练习[React开发](https://codesandbox.io/s/new)、[Vue的开发](https://codesandbox.io/s/vue)、[Angular的开发](https://codesandbox.io/s/angular), 还可以在其内在线安装第三方库并直接使用
