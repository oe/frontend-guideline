---
title: "项目初始化及开发"
description: "根据项目目标选择脚手架，安装依赖，并建立日常开发与协作流程。"
sidebar:
  order: 1
---

## 先明确项目目标

练习 HTML、CSS、JavaScript 时，可以先使用普通静态页面或[在线练习工具](/frontend-guideline/learning/readme/)。需要模块导入、开发服务器和生产构建时，可以使用 [Vite](https://cn.vite.dev/guide/)；内容网站可选择 [Astro](https://docs.astro.build/zh-cn/getting-started/)，需要服务端渲染或全栈能力时，再评估框架提供的方案。

学习框架前先打好语言与浏览器基础，不必一次安装所有框架。React、Vue 等资源见[常用的第三方库及框架](/frontend-guideline/learning/frameworks/)。

## 用 Vite 创建一个基础项目

先安装 Vite 当前版本支持的 Node.js LTS，以下示例使用 npm，创建原生 JavaScript 项目：

```sh
npm create vite@latest my-app -- --template vanilla
cd my-app
npm install
npm run dev
```

需要 TypeScript 时将模板改为 `vanilla-ts`；也可以选择 `react-ts` 或 `vue-ts`。以当前官方文档中的模板和环境要求为准。

打开终端提示的地址，修改入口文件并观察浏览器自动更新。`package.json` 记录项目依赖与命令；`src/` 通常保存源码，`public/` 保存不经转换直接复制的资源。

## 接手已有项目

1. 阅读 README、Node.js 版本文件、`packageManager` 字段及 `scripts`，不要重新运行脚手架覆盖现有文件。
2. npm 项目有 `package-lock.json` 时使用 `npm ci`；pnpm 项目使用 `pnpm install --frozen-lockfile`，保证依赖与锁文件一致。
3. 根据项目说明创建本地环境变量文件。只提交不含密钥的示例，真实凭据放入本地配置或部署平台。
4. 从 main 创建工作分支，启动开发服务，在较小的改动范围内提交代码。
5. 提交 PR 前运行项目已有的类型检查、代码检查、测试和构建，并说明验证结果。

本书仓库的开发命令是 `pnpm dev`，完整验证命令是 `pnpm build`。

## 日常开发

遇到页面问题时，先用[浏览器开发者工具](/frontend-guideline/dev/debug/)查看控制台、网络请求与元素样式。实现功能后同时检查移动端布局、键盘操作和加载失败状态，再按[打包及发布](/frontend-guideline/dev/pack/)验证生产产物。
