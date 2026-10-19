---
title: "常用的第三方库及框架"
description: "了解当前常用框架、工具库和测试工具，并区分新项目选择与旧项目维护。"
sidebar:
  order: 5
---

先学习 HTML、CSS、JavaScript，再根据项目需要选择框架。优先阅读官方文档，确认版本、维护状态和浏览器支持范围。

## UI 框架与库

- [React](https://react.dev/learn) / [中文文档](https://zh-hans.react.dev/learn)：通过组件和状态构建界面。[源码](https://github.com/facebook/react)
- [Vue 3](https://cn.vuejs.org/guide/introduction.html)：提供渐进式的组件开发方式。[源码](https://github.com/vuejs/core)
- [Angular](https://angular.dev/tutorials)：提供路由、表单、依赖注入等完整应用能力。[源码](https://github.com/angular/angular)
- [Svelte](https://svelte.dev/docs)：通过编译组件构建界面。[源码](https://github.com/sveltejs/svelte)

不需要同时学习所有框架。完成一个包含数据请求、状态管理、表单和路由的小项目，比只比较框架名词更有帮助。

## 应用与内容框架

- [Next.js](https://nextjs.org/docs)：基于 React 的应用框架。
- [Nuxt](https://nuxt.com/docs)：基于 Vue 的应用框架。
- [Astro](https://docs.astro.build/zh-cn/getting-started/)：适合文档、博客等以内容为主的网站；本书使用 Astro 与 [Starlight](https://starlight.astro.build/zh-cn/) 构建。

根据是否需要服务端渲染、静态生成、接口服务与部署适配器选择方案，避免为简单页面引入过多运行时依赖。

## 常用工具库

- [Lodash](https://lodash.com/)：集合、对象和函数等工具。使用前可以先确认 JavaScript 原生 API 是否已经满足需求。
- [date-fns](https://date-fns.org/) / [Day.js](https://day.js.org/)：日期处理工具，涉及跨时区业务时需额外确认时区支持。
- [jQuery](https://jquery.com/)：仍会在旧项目中出现；新项目的许多 DOM、事件和网络请求需求可以直接使用浏览器 API。

[Moment.js](https://momentjs.com/docs/#/-project-status/) 已进入维护模式，维护既有项目时可以继续了解，新项目优先评估更适合的替代方案。

## CSS 与组件

- [Bootstrap](https://getbootstrap.com/)：包含布局与常用 UI 组件的 CSS 框架。
- [Tailwind CSS](https://tailwindcss.com/docs)：按工具类组合样式的方案。
- [Primer](https://primer.style/)：GitHub 的设计系统与组件资源。
- [WeUI](https://github.com/Tencent/weui)：面向微信场景的界面样式库。
- [Framework7](https://framework7.io/)：面向移动端 Web 应用的框架。[源码](https://github.com/framework7io/framework7)

组件库并不代替可访问性、响应式布局和交互设计。选择前先确认与项目框架版本的兼容性。

## 模块化与构建

新项目通常使用 [JavaScript 模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules) 的 `import` / `export`，并通过 [Vite](https://cn.vite.dev/) 等工具构建。RequireJS（AMD）、SeaJS（CMD）、Browserify（CommonJS 打包）主要用于理解和维护旧项目。

## 自动化测试

- [Vitest](https://vitest.dev/guide/)：单元测试与集成测试，适合 Vite 项目。
- [Testing Library](https://testing-library.com/docs/)：从用户可观察的行为测试界面。
- [Playwright](https://playwright.dev/docs/intro)：在真实浏览器引擎中执行端到端测试。
- [Mocha](https://mochajs.org/) / [Chai](https://www.chaijs.com/)：测试框架与断言库，也常见于已有项目。

PhantomJS 已停止维护，新项目应使用持续维护的浏览器测试工具。测试应覆盖关键行为与故障场景，避免只检查实现细节。

## 图标与更多资源

- [Font Awesome](https://fontawesome.com/) / [Lucide](https://lucide.dev/)：图标资源，使用前确认许可、署名要求与实际打包体积。
- [TodoMVC](https://todomvc.com/)：通过同类示例了解不同框架的写法。
- [Awesome](https://github.com/sindresorhus/awesome)：按主题整理的开发资源列表。
