---
title: "前端基础知识"
description: "标记有 :thumbsup: 的均为推荐项"
sidebar:
  order: 2
---

标记有 :thumbsup: 的均为推荐项

## Javascript
学习Javascript时, 建议直接在浏览器中练习, 可参考[本文档来操作](/frontend-guideline/learning/readme/#使用-chrome-开发者工具学习)

### 必看
- [JavaScript 标准参考教程](https://javascript.ruanyifeng.com/), 包含语言基础、浏览器 API 与 DOM 介绍；部分内容年代较早，现代模块、异步和新语法建议结合 MDN 指南核对
- [JS交互课程 :thumbsup:](https://learnjavascript.online/), 英文, 如果你的英文不错, 推荐在这个网站再次学习, 强化对JS语言对使用. 该网站提供交互式课程, 一步一步引导你深入学习, 非常适合初学者

### 进阶提升
- [MDN JavaScript 指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)：按主题学习语言行为与常见用法。
- [整洁的Javascript代码](https://github.com/beginor/clean-code-javascript), 教你如何写出高质量的JS代码. (原始文档地址 [clean code javascript](https://github.com/ryanmcdermott/clean-code-javascript), 英文)
- [如何使用原生 JS 实现 jQuery 的功能](https://github.com/nefe/You-Dont-Need-jQuery/blob/master/README.zh-CN.md) [jQuery](https://www.jquery123.com/)是一个简洁高效的JS工具库, 但是随着技术发展, 浏览器的更新换代, jQuery很多功能都可以使用原生JS轻松实现, 你不需要引入一个上百Kb的库来实现一个简单功能.
- [王得发的JS](https://wtfjs.com/), 记录JS的诡异行为, 了解这些能避免JS的一些莫名奇妙的bug

### 参考手册
[Javascript 参考手册](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) MDN 是由 Mozilla 发起、社区共同维护的 Web 文档项目，可用于查询 JavaScript 语言、Web API 与浏览器兼容性；它不是 Firefox 浏览器单独编写的语言标准。


- [Awesome Javascript](https://github.com/wwsun/awesome-javascript)


## HTML

- [MDN Web 开发学习](https://developer.mozilla.org/zh-CN/docs/Learn_web_development)：从语义化 HTML、表单到浏览器基础。

- [MDN：使用 HTML 构建 Web](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content)：学习文本、链接、多媒体、表格与表单。
- [Html 参考手册](https://www.w3school.com.cn/html/index.asp)
- [Marksheet :thumbsup:](http://marksheet.io/) html & css 学习教程，in English
- [Html reference :thumbsup:](http://htmlreference.io/) html 手册，可以根据标签类型快速筛选，in English

## CSS

- [MDN CSS 学习](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics)：基础样式与布局。先掌握 Flexbox、Grid、媒体查询和 CSS 自定义属性，再按需要学习预处理器。

- [CSS 学习](https://www.w3school.com.cn/css/index.asp)
- [谷歌推出的CSS学习指南](https://web.dev/learn/css/) 可在网站选择语言，翻译覆盖情况以当前页面为准
- [MDN CSS 参考 :thumbsup:](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)：查询属性、选择器、规则与浏览器兼容性。
- [CSS 参考手册历史源码](https://github.com/doyoe/css-handbook)：原手册作者的仓库，保留旧版内容与离线文件；现代 CSS 特性以当前文档为准。
- [CSS Reference](http://cssreference.io/) 可视化的 CSS 使用指南
- [CSS Pro Tips](https://github.com/AllThingsSmitty/css-protips)
- [Flexbox defense](http://www.flexboxdefense.com/) 使用游戏方式学习 CSS 的 Flex 布局
- [Defensive css](https://defensivecss.dev) 编写更健壮、适配性更好的 CSS 的技巧

### 相关
* [css选择器练习](https://css-speedrun.netlify.app/)
* [loading 动画生成](https://whirl.netlify.app/)

## 前端开发规范

[前端开发规范 :thumbsup:](/frontend-guideline/learning/guideline/)

## 预处理语言(用其他语言来生成 js, css)

先掌握原生 JavaScript 与 CSS，再按项目选择预处理工具。Less、Sass 的价值不只取决于项目大小；CoffeeScript 常见于旧项目，不是现代 JavaScript 学习的必修前置。

- [Less :thumbsup:](https://lesscss.org/) CSS 预处理器，提供变量、混入和函数等能力。
- [Sass](https://sass-lang.com/guide/) CSS 预处理器，提供模块、混入与函数等能力，是否采用取决于项目需求。
- [Coffeescript](https://coffeescript.org/) javascript 预处理器, 语法简洁, 可读性高, 提供了一系列语法糖

## Markdown

- [Markdown 语法](http://wowubuntu.com/markdown/)
- [Github Flavoured Markdown 语法 :thumbsup:](https://docs.github.com/zh/get-started/writing-on-github) Github 扩展的 markdown，支持语法高亮
- [CommonMark 交互式教程](https://commonmark.org/help/tutorial/)：在浏览器中练习 Markdown 语法。

## 其他

- [devhints](https://devhints.io) (英文) 开发文档快捷查看表, 包含各种开发库(React, jQuery 等)及 各种工具(vim, bash, vscode 等) 的说明文档, 比原始文档更容易阅读使用.
- [tldr 官方网站](https://tldr.sh/) 命令行帮助文档工具, 可用于替代 `man`, 使用 `npm install -g tldr` 即可安装, 帮助文档提供常见用法示例，适合快速查阅；完整参数和行为仍需查看工具的官方帮助.

## 相关阅读
- [Front-End Developer Handbook 2019](https://frontendmasters.com/books/front-end-handbook/2019/)：历史资料，工具版本需结合当前官方文档核对。
- [谷歌推出的web.dev](https://web.dev/learn/) 提供多个 Web 平台主题的学习课程，可按页面支持情况切换语言
- [Web Design Stack](http://webdesignstack.com/)
- [免费编程书籍](https://github.com/EbookFoundation/free-programming-books/blob/main/books/free-programming-books-zh.md)
- [freeCodeCamp 免费编程课程（英文）](https://www.freecodecamp.org/learn/)：按课程练习 Web 开发及其他编程主题。
