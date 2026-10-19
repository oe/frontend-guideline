---
title: "前端基础知识"
description: "按 HTML、CSS、JavaScript、HTTP 和 TypeScript 建立基础，每个主题都有练习目标与首选资料。"
sidebar:
  order: 2
---

**主线用 MDN，遇到具体 API 再查参考手册。** 先完成下列练习，不用先把收藏夹里所有教程读完。建议的学习顺序是 HTML → CSS → JavaScript → HTTP/异步 → TypeScript，实作路线见[学习方法](/frontend-guideline/learning/readme/)。

下面保留中文官方文档作为入门入口，但请从第一天就练习切换到英文原文：先读一个 API、一条报错，再读一段 issue 讨论。查不到、版本对不上就直接读英文，不要退回中文转载里碰运气；[英语与 Google 检索](/frontend-guideline/basic/literacy/)是这条学习路线的一部分。

## HTML

先写一个包含导航、文章、图片、联系表单的页面，重点掌握：

- 正确组织 `h1` 到 `h3`，用 `main`、`nav`、`article` 表达结构。
- 用链接跳页面、按钮执行操作，表单控件有 `label`，图片有合适的 `alt`。
- 理解相对路径与绝对路径，页面在子目录访问时也能加载图片。

**通过标准**：不加 CSS，内容仍有合理顺序；只用键盘也能操作主要链接和表单。

首选 [MDN：使用 HTML 构建 Web](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content)。忘了某个标签再查 [HTML Reference](https://htmlreference.io/)，别照着一篇旧教程把整页写成 `div`。

## CSS

默认先学盒模型、层叠、Flexbox、Grid、自定义属性与媒体查询。先别把 Sass、复杂动画、CSS 架构名词当作必修前置。

练习把上一节页面做成卡片列表：桌面多列、手机单列，卡片标题换成长文本也不溢出；图片加载前后布局不乱跳。

**通过标准**：能解释某个样式为什么没生效，能在 Computed 找到最终值，能修复小屏横向溢出。居中用 Flex/Grid，别背一套靠固定宽高和负 margin 的偏方。

- **主线**：[MDN CSS 学习](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics)或 [web.dev CSS 课程](https://web.dev/learn/css/)，选一个跟着做。
- **查询**：[MDN CSS 参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)。
- **练习**：[Flexbox Froggy](https://flexboxfroggy.com/)练布局，[CSS Speedrun](https://css-speedrun.netlify.app/)练选择器。
- **加深理解**：[Defensive CSS](https://defensivecss.dev)学习内容变长、空间不足等真实页面场景的处理。

## Javascript

默认在自己的页面和[Chrome 开发者工具](/frontend-guideline/learning/readme/#使用-chrome-开发者工具学习)里练。先掌握变量、函数、对象、数组、模块，再把 DOM、事件和异步接起来。

### 必看

[MDN JavaScript 指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)作为主线。不想只读文字，可以跟 [Learn JavaScript](https://learnjavascript.online/) 的交互练习做，先确认免费部分是否适合自己，再决定购买后续课程。

练一个可新增、编辑、筛选和删除的清单。把数据与渲染分开，事件触发后修改数据再更新界面。先自己写一遍，再让 AI 帮你检查遗漏，不要只生成成品然后宣布学会了。

**通过标准**：能解释一次点击经过哪个处理函数，数组为什么改变，页面为什么更新；输入为空、列表为空和数据格式错误都能处理。

### 进阶提升

- 用 `map`、`filter`、`find` 和 `Set` 处理一组实际数据，而不是只背方法名。
- 用 `import` / `export` 把代码拆成模块，讲清导入和导出的关系。
- 用 `fetch` 读取数据，处理 `response.ok`、加载失败与重试；练习取消请求和避免旧响应覆盖新结果。
- 搞清 `===`、`null` / `undefined`、闭包、事件循环各自会在什么场景影响你的代码。

[阮一峰 JavaScript 教程](https://javascript.ruanyifeng.com/)可以辅助理解基础，[整洁的 JavaScript 代码](https://github.com/beginor/clean-code-javascript)适合写过项目后对照阅读。不要把类型转换冷知识和「这行代码为什么输出 undefined」的谜题当成全部学习内容。

### 参考手册

查 API 首选 [MDN JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)，重点看参数、返回值、例外和兼容性。新代码不必为了 DOM 查询、事件绑定和请求先引入 jQuery；对照 [You Don't Need jQuery](https://github.com/nefe/You-Dont-Need-jQuery/blob/master/README.zh-CN.md)理解原生能力即可。

## HTTP 与接口

页面会显示假数据之后，就接一次真实接口。先打开 Network，观察请求地址、方法、状态码和响应体；区分「服务器返回 500」与「浏览器因跨域规则无法把响应交给脚本」。

参考 [MDN Fetch 使用指南](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)。练习时保存四份场景：正常数据、空数组、HTTP 失败、网络超时或断开。你的页面要能区分它们，不能全部显示一个转圈图标。

## TypeScript

开始做多文件或组件项目时就引入，不用等「完全精通 JS」。先给接口数据、组件参数、状态和函数边界写类型；遇到不确定的数据先校验，别用 `as` 或 `any` 一路糊过去。

首选 [TypeScript 官方手册](https://www.typescriptlang.org/docs/handbook/intro.html)。把上面的清单项目改成 TypeScript，让缺字段、错误参数等问题在检查阶段暴露，再进入[框架学习](/frontend-guideline/learning/frameworks/)。

## 前端开发规范

格式化交给工具，业务意图、命名、错误处理由自己负责，见[前端编码规范](/frontend-guideline/learning/guideline/)。

## 预处理语言(用其他语言来生成 js, css)

新手优先原生 CSS。项目已有 [Sass](https://sass-lang.com/guide/) 就按模块方式维护，已有 [Less](https://lesscss.org/) 就读懂配置和变量体系；不要为了写几个 CSS 变量先加一层预处理工具。CoffeeScript 不再是本书建议投入时间的新项目技能，遇到旧代码时再查。

## Markdown

先把项目 README 写好：它做什么、怎么启动、怎么构建、如何复现主要功能。学会标题、列表、链接、图片和代码块就能完成大部分工作，参考 [CommonMark 交互教程](https://commonmark.org/help/tutorial/)与 [GitHub Markdown](https://docs.github.com/zh/get-started/writing-on-github)。

## 其他

命令用法记不住，先查 `--help`，再看 [tldr](https://tldr.sh/) 的常见例子；复杂参数和例外回到工具自己的文档。开发到哪一步就补哪一步的知识，不需要先背完命令行手册。

## 相关阅读

[freeCodeCamp](https://www.freecodecamp.org/learn/)适合需要连续练习的人，[web.dev Learn](https://web.dev/learn/)适合按 Web 平台主题补课。[Front-End Developer Handbook 2019](https://frontendmasters.com/books/front-end-handbook/2019/)留作历史参考，不再按它的工具清单搭新环境。
