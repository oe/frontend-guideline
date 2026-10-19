---
title: "学习"
description: "按页面、交互、接口和框架逐步完成一个可发布项目，给出每个阶段的练习与验收标准。"
sidebar:
  order: 1
---

**从一个能上线的小项目开始，边做边查，别先收藏一百套教程。** 本书建议按下面的顺序练习：

| 阶段 | 做出来的东西 | 通过标准 |
| --- | --- | --- |
| HTML / CSS | 一个个人介绍页或产品页 | 有合理的标题、链接、图片和表单，手机与桌面都能读 |
| JavaScript / DOM | 带筛选和编辑功能的清单 | 点按有反馈，空列表和非法输入有处理，刷新后按设计保留数据 |
| HTTP / 异步 | 从接口读取和提交数据 | 有加载、空数据、失败与重试状态，能从 Network 找到请求 |
| 框架 / TypeScript | 把前面的应用拆成组件 | 组件职责清楚，数据流能解释，改一处不会复制到五处 |
| 工程与发布 | 把应用部署到可访问的地址 | 构建通过，刷新内部页面正常，README 写清启动方法 |

学完一节就做对应功能。卡住时带着具体问题查文档，比从头重看十小时视频有效。

- [前端基础知识](/frontend-guideline/learning/basic/)：按 HTML、CSS、JavaScript 补齐基础。
- [编码规范](/frontend-guideline/learning/guideline/)：把可读性与检查工具落实到项目。
- [前端进阶知识](/frontend-guideline/learning/pro/)：用真实问题练异步、类型、性能与工程质量。
- [框架与库](/frontend-guideline/learning/frameworks/)：默认方案与适用场景。
- [学习资源](/frontend-guideline/learning/resource/)：选一条主线，需要时再查补充资料。

## 学习方法

**大段代码写进文件，短实验放进 Console。** 代码要能保存、提交和重新运行，别在开发者工具里改了半天，刷新之后全部消失。

### 使用 Chrome 开发者工具学习

先安装 [Chrome](https://www.google.com/chrome/)，打开自己做的页面。Mac 用 `Command + Option + I`，Windows/Linux 用 `Ctrl + Shift + I` 打开 DevTools；也可以右键页面选择「检查」。

#### 学习 Javascript

- **Console**：适合练数组方法、检查表达式和查看当前页面对象。先试 `[1, 2, 3].map(n => n * 2)`，再把它放到自己的代码里；换行用 `Shift + Enter`。
- **Sources → Snippets**：需要反复执行多行代码时，新建片段、保存并运行。具体入口见 [Chrome Snippets](https://developer.chrome.com/docs/devtools/javascript/snippets/)。
- **文件与本地开发服务**：开始写 DOM 交互、多个模块或调用接口后，尽早使用[本地项目](/frontend-guideline/dev/init/)，别一直靠控制台凑功能。

#### 学习 HTML 及 CSS

在 **Elements** 选中元素，查看 Styles 和 Computed。先改 `display`、`gap`、`width` 等一个属性，观察效果，再把有效修改写回源码。这里看到的是浏览器当前的 DOM，可能已经被脚本修改，和服务器最初返回的 HTML 不完全相同。

练习时建议做这三件事：

1. 用盒模型面板解释一个元素为什么挤出容器。
2. 用 Flex / Grid 面板看清父容器如何安排子项。
3. 把浏览器宽度缩小，找到第一处溢出并修好。

这里的修改通常不会保存到项目；调出效果后就回编辑器落地。完整方法见[调试](/frontend-guideline/dev/debug/)。

### 使用在线练习(playground)网站学习

- **[CodePen](https://codepen.io/pen/)**：HTML/CSS 动画和小交互，打开就写，适合分享效果。
- **[JSFiddle](https://jsfiddle.net/)**：快速复现一个 DOM、CSS 或 JS 问题。
- **[StackBlitz](https://stackblitz.com/)**：需要 npm 依赖和项目文件时使用，适合分享框架问题的最小复现。

给别人提问时，发一个能打开、能复现的链接，附上预期和实际结果。不要只贴一张代码截图让人猜。

## 什么时候进入下一阶段

不要求背完所有 API，但要能自己完成当前阶段的小功能：不看视频也能写出主要结构，能解释数据从哪里来，出错知道先看哪个面板。复制教程能跑，不算已经掌握；换一份数据、加一个限制还能改对，才值得继续往下学。
