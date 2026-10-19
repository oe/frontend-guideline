---
title: "项目初始化及开发"
description: "用 Vite 创建 JavaScript 或 TypeScript 项目，按目标选择框架，并通过一个完整功能建立开发、检查和协作流程。"
sidebar:
  order: 1
---

## 先明确项目目标

**练基础用原生项目，做组件应用用 React/Vue，内容站用 Astro。** 不需要先比较十个脚手架。先把[开发环境](/frontend-guideline/basic/fontend-env/)配好，再从下面选一条路：

| 要做什么 | 建议起点 |
| --- | --- |
| 学 HTML、CSS、DOM 和事件 | Vite 的 `vanilla` 模板 |
| 练 TypeScript 与组件化应用 | Vite 的 `react-ts` 或 `vue-ts`，只选一个 |
| 博客、文档、内容网站 | [Astro](https://docs.astro.build/zh-cn/getting-started/)，文档站加 Starlight |
| 带服务端能力的完整产品 | 按[应用框架建议](/frontend-guideline/learning/frameworks/#应用与内容框架)选择 Next.js / Nuxt 等 |

## 用 Vite 创建一个基础项目

新项目沿用本书的 pnpm 默认方案。先完成[包管理器配置](/frontend-guideline/basic/fontend-env/#选择包管理器)，目录 `my-app` 应是新目录：

```sh
pnpm create vite@latest my-app --template vanilla
cd my-app
corepack use pnpm@latest
pnpm dev
```

`corepack use` 会把当前确切 pnpm 版本写进新项目，并执行依赖安装。要练 React + TypeScript，把模板改成 `react-ts`；Vue + TypeScript 改成 `vue-ts`。新模板运行要求见 [Vite 官方指南](https://cn.vite.dev/guide/)，已有旧 Node 时先切到当前受支持的 LTS。

只用 npm 也可以：创建命令是 `npm create vite@latest my-app -- --template vanilla`，再运行 `npm install` 和 `npm run dev`。选定一种后在该项目一直使用，不要生成两份锁文件。

打开终端实际打印的地址，在页面放一个按钮，点击后更新计数。再关闭开发服务、重新启动，确认知道哪个文件决定了页面内容。

接下来依次加上：可编辑的数据列表 → 输入校验 → 接口请求 → 加载/失败状态。**先把一条功能做完整，再增加路由、状态库和组件库。**

## 接手已有项目

1. 先读 README，确认工作目录、Node 版本、包管理器与必需服务；不要重新跑脚手架覆盖仓库。
2. 根据锁文件安装：npm 用 `npm ci`，pnpm 用 `pnpm install --frozen-lockfile`。版本不匹配时先查 `packageManager`，别删除锁文件碰运气。
3. 从环境变量示例创建本地配置；需要后端、数据库或容器时按项目说明启动它们。
4. 从最新 main 开自己的分支，**先不改代码跑一次检查和构建**，记住项目原本是否健康。
5. 完成改动后重跑相同检查，看 diff 里有没有无关内容，再提交 PR。

本书仓库使用 `pnpm dev` 开发、`pnpm build` 完整验证，默认地址包含 `/frontend-guideline/` 前缀。

## 日常开发

默认一次完成一个可验收的小改动。先写清「什么输入、应该看到什么结果」，实现后亲自操作，包含空数据、失败和重复点击；再看控制台和 Network，最后跑构建。

找不到原因时，按[调试流程](/frontend-guideline/dev/debug/)缩小问题，不要同时升级依赖、改目录和重写数据流。构建通过后再按[打包及发布](/frontend-guideline/dev/pack/)验收产物。
