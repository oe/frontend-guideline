---
title: "有用的资讯、资源及学习网站"
description: "按补基础、查 API、练布局、读源码和找灵感选择资料，给出使用方法与优先级。"
sidebar:
  order: 6
---

**留一个主教程、一个参考手册、一个练习项目就够开始。** 本书推荐先用 MDN 补基础，自己做项目；遇到卡点再从下面挑资料。收藏夹越来越长，项目却始终没写完，是该暂停收集资源的信号。

**选资料时，一手英文资料优先，中文转载站靠后。** 中文教程可以辅助入门，但不要把「只读中文」当成长期学习方案。找不到中文版就读原文，不要换去 CSDN 拼凑答案；英语阅读和 Google 检索的练法见[基本素养](/frontend-guideline/basic/literacy/)。

## 资源站

| 你现在的问题 | 优先去哪里 | 怎么使用 |
| --- | --- | --- |
| 不知道怎么入门 HTML/CSS/JS | [MDN Learn](https://developer.mozilla.org/zh-CN/docs/Learn_web_development) | 选当前主题，读一小节就在项目里做一次 |
| API 参数、返回值或兼容性不清楚 | [MDN](https://developer.mozilla.org/zh-CN/)或该库官网 | 先看当前版本、示例与限制，再改自己的代码 |
| 想系统补性能和可访问性 | [web.dev Learn](https://web.dev/learn/) | 每学一个主题，用 DevTools 或键盘验证自己的页面 |
| 总是只看不练 | [freeCodeCamp](https://www.freecodecamp.org/learn/) | 固定一条课程线，连续完成练习，别每天换教程 |

## 学习网站

### CSS

- **[CSS Inspiration](https://chokcoco.github.io/CSS-Inspiration/#/)**：挑一个自己解释不了的效果，先改参数，再试着从空文件复现。
- **[Defensive CSS](https://defensivecss.dev/)**：优先读长文本、尺寸不足和内容溢出的处理，能直接用于业务页面。

### JS

- **[JavaScript.info](https://javascript.info/)**：需要成体系理解语言和浏览器时选它，章节后有练习。
- **[js13kGames](https://js13kgames.com/)**：对小游戏感兴趣再看，尝试用有限体积完成一个可玩的作品；不必为追求极小体积牺牲业务代码的可读性。

### 综合

- **[Frontend Masters Bootcamp](https://frontendmasters.com/bootcamp/)**：需要有人带着做 HTML、CSS 与 JavaScript 项目时使用，课程需要免费账号。
- **[30 seconds of code](https://www.30secondsofcode.org/)**：查小思路，不要不看边界条件就整段复制进生产项目。

## 源码分析系列

### Vue 源码解析

读当前 Vue 3 实现，优先从 [vuejs/core](https://github.com/vuejs/core)里自己用过的 API 追起：先写一个最小例子，找到入口，再跟调用链。不要上来从仓库第一行读到最后一行。

[逐行剖析 Vue.js 源码](https://nlrx-wjc.github.io/Learn-Vue-Source-Code/start/)针对 Vue 2，只适合研究历史实现；别拿它解释 Vue 3 当前的响应式机制。

## Build your own \* 系列

[Build your own React](https://pomb.us/build-your-own-react/)适合理解一个简化的渲染器如何组织工作。照着实现后，自己加一个更新场景，观察它和真实 React 有哪些差距。教学实现用来拆概念，不拿来替换生产框架。

## 资讯/博客

优先关注框架、运行时和构建工具的官方更新说明、维护者的文章与优秀开源项目。不要只盯当前公司的技术栈：工作里暂时用不到的渲染方式、交互效果和工程思路，也值得看一眼，感兴趣就做个小实验。知识面不该由眼前的业务需求决定。

探索可以大胆，给生产项目迁移则要有理由和验证。别因为一篇「某框架已死」的标题就安排重写；技术资讯用于扩展认识，不用于制造焦虑。

想找设计与交互灵感，可以逛 [奇趣网站收藏家](https://fuun.fun/)，记下具体喜欢的布局、动效或交互，再动手做一个小复现。

## 综合资源列表

[全栈前端工程师笔记](https://github.com/8483/notes)这类合集适合带着关键词查漏。一次只选能解决当前问题的条目，看完把结论记进项目笔记，别再把它转存成另一个永远不会打开的清单。
