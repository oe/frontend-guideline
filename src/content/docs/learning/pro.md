---
title: "前端进阶知识 & 产品研发"
description: "用请求竞态、类型边界、性能定位、可访问性和发布回退等真实任务检验进阶能力，再选择新的应用平台。"
sidebar:
  order: 4
---

**进阶的标准是能处理更难的问题，解释为什么这样做，并把改动稳定地交付。** 再学一个框架名字不算升级。下面这些练习比背一份「高级前端知识图谱」更值得做。

## 浏览器、网络与异步编程

给现有搜索页面加上快速输入、取消请求和失败重试。人为让第一个请求慢、第二个请求快，确认旧结果不会覆盖新结果；再断开网络，页面仍能解释当前状态。

用这个问题串起 [JavaScript 执行模型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Execution_model)、[HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview)与 [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)。能在 Network 和断点里验证，比只会复述微任务定义更重要。

## TypeScript

把一个接口响应从 `any` 改成清楚的类型，在数据入口校验，再传给页面。把「加载中」「成功但为空」「成功有数据」「失败」表示成不会互相矛盾的状态，减少到处散落的布尔开关。

遇到类型报错，先查是不是接口设计或状态模型不合理，再考虑类型断言。参考 [TypeScript 手册](https://www.typescriptlang.org/docs/handbook/intro.html)。给不可能的数据加上测试，比再写一个复杂泛型谜题更接近实际工作。

## 响应式网页、性能与可访问性

给自己的项目做一次真实检查：

1. **布局**：从手机宽度到大屏逐渐拖动，换成长标题、长用户名和空数据。哪里先溢出就修哪里，参考[响应式设计](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)。
2. **性能**：用 Performance 录制一段慢操作，先找到最耗时的请求、图片或主线程任务，再做一次修改并按同样步骤复测。用 [Core Web Vitals](https://web.dev/articles/vitals?hl=zh-cn)理解 LCP、INP、CLS 对应的体验。
3. **可访问性**：只用键盘完成导航和提交表单，检查焦点是否可见、弹窗能否关闭、报错能否找到对应字段。按 [WAI 教程](https://www.w3.org/WAI/tutorials/)补上缺失行为。

练习结果应该是一份记录：复现方式、修改前的证据、改动、复测结果。不要只写一句「已优化性能」。

## 工程质量

给最关键的一条用户流程补上[自动化测试](/frontend-guideline/learning/frameworks/#自动化测试)，让 PR 自动执行检查和构建，再发布一次并演练回退。

这条链路做通后，README 应能让另一个人从干净环境启动项目；失败时知道看哪份日志；线上出错知道回退哪个提交。实践入口：[项目初始化](/frontend-guideline/dev/init/)、[构建与发布](/frontend-guideline/dev/pack/)、[GitHub CI/CD](/frontend-guideline/cicd/github/)。

## 不同应用形态

默认先把 Web 产品做完整，再按真实需求扩展平台：

| 目标 | 建议起点 | 先验证的东西 |
| --- | --- | --- |
| 微信小程序 | [官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)与[官方示例](https://github.com/wechat-miniprogram/miniprogram-demo) | 登录、权限、网络请求和发布限制，不先套一个跨端框架遮住平台差异 |
| 桌面应用 | 已有 Web 团队可先看 [Electron](https://www.electronjs.org/docs/latest/)；愿意处理 Rust 与系统差异再看 [Tauri](https://v2.tauri.app/) | 安装包、自动更新、权限与本机文件访问 |
| 移动客户端 | React 团队先看 [React Native](https://reactnative.dev/docs/getting-started)，独立评估跨平台 UI 可看 [Flutter](https://docs.flutter.dev/) | 真机调试、原生依赖、签名与商店发布 |
| 服务端 JavaScript | 先用 [Node LTS](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)做一个 API | 参数校验、鉴权、日志、超时和数据库连接，不把浏览器代码直接搬进服务端 |
| 浏览器扩展 | [Chrome Extensions](https://developer.chrome.com/docs/extensions/get-started) | 最小权限、内容脚本与后台通信，先完成一个只改当前页面的小功能 |

临时自动化网页操作，可用 [Bookmarklet](https://www.ph-uhl.com/0010-Bookmarklets/) 或 [UserScript](https://www.tampermonkey.net/documentation.php)。当脚本开始保存用户数据、需要后台服务或长期分发，就重新评估是否该做成正规的应用或扩展。
