---
title: "前端进阶知识 & 产品研发"
description: "从浏览器原理、类型系统和工程质量，逐步扩展到不同应用形态。"
sidebar:
  order: 4
---

掌握基础语法和常用框架后，可以围绕实际项目逐步补齐以下能力。先理解问题与平台，再选择工具。

## 浏览器、网络与异步编程

- [JavaScript 执行模型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Execution_model)：调用栈、任务与微任务。
- [HTTP 概述](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview)：请求响应、状态码、缓存与 HTTPS。
- [Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)：处理网络请求、中断与失败状态。

## TypeScript

[TypeScript 官方手册](https://www.typescriptlang.org/docs/handbook/intro.html) 介绍类型收窄、联合类型与泛型等能力。类型检查发生在开发与构建阶段，不能替代对接口返回值和用户输入的运行时校验。

## 响应式网页、性能与可访问性

- [响应式设计](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)：布局随视口和内容变化。
- [媒体查询完整教程（英文）](https://polypane.app/blog/the-complete-guide-to-css-media-queries/)
- [Core Web Vitals](https://web.dev/articles/vitals?hl=zh-cn)：理解加载、交互和布局稳定性，先测量再优化。
- [WAI 入门教程](https://www.w3.org/WAI/tutorials/)：语义化、键盘操作、表单标签与可访问性检查。

## 工程质量

在[自动化测试](/frontend-guideline/learning/frameworks/#自动化测试)之外，还需要代码检查、可重复构建和发布验证。可以从[项目初始化](/frontend-guideline/dev/init/)、[打包发布](/frontend-guideline/dev/pack/)和 [GitHub CI/CD](/frontend-guideline/cicd/github/)开始实践。

## 不同应用形态

- **小程序**：先阅读[微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)，再评估跨端框架；也可查看微信官方维护的 [小程序示例仓库](https://github.com/wechat-miniprogram/miniprogram-demo)学习组件和 API 用法。
- **桌面客户端**：[Electron](https://www.electronjs.org/docs/latest/) / [Tauri](https://v2.tauri.app/)；注意更新机制、权限与安装包体积。
- **移动客户端**：[React Native](https://reactnative.dev/docs/getting-started) / [Flutter](https://docs.flutter.dev/)；与移动网页的运行环境和发布流程不同。
- **服务端 JavaScript**：[Node.js 学习文档](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)与 [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)；也可了解 [Deno](https://docs.deno.com/runtime/)。
- **浏览器扩展**：[Chrome Extensions](https://developer.chrome.com/docs/extensions/get-started)；理解权限模型、内容脚本与后台任务。
- **Bookmarklets**：[Bookmarklets](https://www.ph-uhl.com/0010-Bookmarklets/)；通过书签执行简短脚本，需考虑页面的安全策略限制。
- **UserScripts**：[Tampermonkey 文档](https://www.tampermonkey.net/documentation.php)；脚本拥有访问页面内容的能力，应理解来源与权限。
