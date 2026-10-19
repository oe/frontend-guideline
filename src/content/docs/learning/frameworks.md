---
title: "常用的第三方库及框架"
description: "给出 React/Vue、Vite、Next.js、Astro、组件库、状态管理和测试工具的选型建议，避免把学习变成追框架清单。"
sidebar:
  order: 5
---

**没有团队约束时，本书建议先学 React + TypeScript，用 Vite 做一个完整项目。** 先掌握组件、状态、表单与异步数据；已经进入 Vue 团队就直接学 Vue 3，不需要为了证明自己全面，把四个框架各看一遍入门视频。

<small>个人观点：以下按普通 Web 业务的学习与交付成本推荐，不是性能排名。</small>

## UI 框架与库

| 选择 | 本书建议 | 先做什么 |
| --- | --- | --- |
| [React](https://react.dev/learn) / [中文文档](https://zh-hans.react.dev/learn) | 从零选型的默认起点，配 TypeScript | 做一个带列表、筛选、详情和表单的应用，先用好组件与状态 |
| [Vue 3](https://cn.vuejs.org/guide/introduction.html) | 团队已有 Vue，或更喜欢模板语法时直接选 | 用单文件组件、组合式 API 和 Vue Router 完成同一个项目 |
| [Angular](https://angular.dev/tutorials) | 企业项目已采用时深入，不作为本书的入门默认 | 先搞清项目的依赖注入、路由和表单组织方式 |
| [Svelte](https://svelte.dev/docs) | 对编译式组件感兴趣、能自行处理生态取舍时尝试 | 先完成小应用，再评估项目所需的组件与集成 |

**别从零拼一套生产框架。** 学习组件和浏览器行为，可以从 Vite 起步；正式做带路由、服务端能力的产品，再按 React / Vue 官方的[项目创建建议](https://react.dev/learn/creating-a-react-app)和下面的应用框架选型。旧项目用什么，就先把那个项目维护好，别借修 bug 做框架迁移。

## 应用与内容框架

| 项目 | 默认选择 | 关键取舍 |
| --- | --- | --- |
| 练习、前后端分离的管理后台 | [Vite](https://cn.vite.dev/guide/) + React / Vue | 部署静态产物即可，API 由后端提供 |
| React 全栈产品，需要服务端渲染、路由与服务端逻辑 | [Next.js](https://nextjs.org/docs) | 接受它的服务端/客户端边界和部署方式，别给纯静态小页硬套一整套服务 |
| Vue 全栈产品 | [Nuxt](https://nuxt.com/docs) | 在 Vue 体系内处理路由、数据与渲染 |
| 博客、文档、内容网站 | [Astro](https://docs.astro.build/zh-cn/getting-started/) | 默认少发客户端 JS，交互组件按需加；文档站直接用 [Starlight](https://starlight.astro.build/zh-cn/) |

选择渲染方式先回答两个问题：页面是否要在没有客户端 JS 的情况下就提供完整内容？有没有必须留在服务端的逻辑？答案决定是否需要服务端运行时；SEO 需求本身也可以用静态生成解决。

## 常用工具库

默认从平台自带能力开始，重复出现的问题再引入库：

- **数据请求**：简单请求先用 `fetch`。React 项目出现缓存、请求去重、分页和后台刷新时，推荐 [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)，别把这些状态全塞进全局 store。
- **本地状态**：先用框架自己的状态与组件组合。Vue 的跨组件状态可用 [Pinia](https://pinia.vuejs.org/)，React 确实需要轻量全局状态时可选 [Zustand](https://zustand.docs.pmnd.rs/)。不要因为项目初始化了就自动装三个状态库。
- **数据校验**：接口数据和表单输入需要运行时校验时，可以用 [Zod](https://zod.dev/)。TypeScript 类型不会自动检查服务端返回的 JSON。
- **日期**：普通显示先用 `Intl.DateTimeFormat`，日期运算再选 [date-fns](https://date-fns.org/) 或 [Day.js](https://day.js.org/)。涉及跨时区预约、账单等业务，把时区作为数据契约写清楚。
- **集合与对象**：原生 `map`、`filter`、`Set` 已经能解决很多问题；确有复杂工具函数需求再用 [Lodash](https://lodash.com/)，不要为了一个小函数引入整套依赖。

新项目不推荐再以 jQuery 和 Moment.js 为基础。[Moment 已进入维护模式](https://momentjs.com/docs/#/-project-status/)，维护旧项目时照旧排查即可，别把「不推荐新用」理解成马上全量重写。

## CSS 与组件

默认先掌握 CSS 的 Flexbox、Grid、自定义属性和响应式布局。需要快速迭代统一视觉时，本书推荐 [Tailwind CSS](https://tailwindcss.com/docs)；团队已经有成熟的 CSS Modules / Sass 体系，就沿用现有组织方式。

- **React 管理后台**：先看 [Ant Design](https://ant.design/docs/react/introduce)，成熟的表单、表格、弹窗比自己重造快；样式可控、愿意自己维护组件代码时再看 [shadcn/ui](https://ui.shadcn.com/docs)。
- **Vue 管理后台**：先看 [Element Plus](https://element-plus.org/)，把表单、表格、分页和请求失败流程连起来。
- **微信场景**：[WeUI](https://github.com/Tencent/weui) 可以作为界面样式参考，实际能力以小程序 / Web 各自的平台为准。
- **旧站维护**：遇到 [Bootstrap](https://getbootstrap.com/) 就理解它的布局与组件约定，不必为了一个页面立即换掉它。

组件库能省时间，仍要自己处理数据、校验、加载和错误状态。挑库时先把项目最复杂的表单或表格做出来，别只看首页示例漂亮不漂亮。

## 模块化与构建

新项目使用 JavaScript 模块的 `import` / `export`，普通项目用 Vite。RequireJS、SeaJS、Browserify 放进「维护旧项目时查询」的列表，不要把学完它们当作进入现代框架的门槛。

## 自动化测试

**默认用 [Vitest](https://vitest.dev/guide/) 测关键逻辑，用 [Playwright](https://playwright.dev/docs/intro) 测关键用户流程。** 界面断言可以配 [Testing Library](https://testing-library.com/docs/)，按用户能看见和操作的行为写。

从最容易出事故的地方开始：金额和权限相关逻辑、提交表单、登录退出、加载失败后重试、刷新详情页。不要为了覆盖率给每个 getter 都写一遍同义反复的测试，也别只断言「按钮存在」就说付款流程测完了。

旧项目用了 Mocha / Chai 就继续维护，PhantomJS 这类停止维护的浏览器工具不要用于新方案。

## 图标与更多资源

图标默认推荐 [Lucide](https://lucide.dev/)，按需引入，保持同一套视觉；已有项目用 Font Awesome 就沿用。学习框架差异可看 [TodoMVC](https://todomvc.com/)，查特定方向资料再用 [Awesome](https://github.com/sindresorhus/awesome)。资料列表是检索入口，别把点过多少仓库当成学习进度。
