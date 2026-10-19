---
title: "前端开发环境的安装配置"
description: "安装编辑器、Node.js 与包管理器，建立可重复的本地开发环境。"
sidebar:
  order: 5
---

## 安装编辑器

推荐使用 [Visual Studio Code](https://code.visualstudio.com/)。它内置 JavaScript、TypeScript 和 Git 支持；安装项目使用的框架扩展即可开始开发。也可以使用 [Sublime Text](https://www.sublimetext.com/) 或其他熟悉的编辑器。

建议打开自动保存，并按照项目已有配置使用 ESLint 检查代码、Prettier 格式化代码。格式化规则应由项目统一管理，避免不同编辑器产生无关改动。

## 安装 Node.js

[Node.js](https://nodejs.org/zh-cn/download) 提供浏览器之外的 JavaScript 运行环境，也是多数前端构建工具的运行基础。安装当前受支持的 LTS 版本；维护已有项目时，优先遵循 `.nvmrc`、`.node-version` 或 `package.json` 中的 `engines` 要求。本书的文档站推荐 Node.js 24 LTS。

安装完成后，在终端检查：

```sh
node --version
npm --version
```

需要同时维护多个 Node.js 版本时，macOS/Linux 可使用 [nvm](https://github.com/nvm-sh/nvm)，Windows 可使用 [fnm](https://github.com/Schniz/fnm)。修改版本后重新打开终端，并再次检查版本。

## 选择包管理器

npm 随 Node.js 一起安装，也可以选择 [pnpm](https://pnpm.io/zh/installation)。已有项目优先使用 `packageManager` 字段指定的版本，并沿用仓库中的锁文件。

本书仓库使用 pnpm：

```sh
npm install -g pnpm@10.34.7
pnpm install --frozen-lockfile
pnpm dev
```

常见锁文件分别为 `package-lock.json`（npm）、`pnpm-lock.yaml`（pnpm）、`yarn.lock`（Yarn）。同一项目应统一包管理器，并将锁文件提交到 Git；不要交替运行多个包管理器生成不同锁文件。

## 在项目内安装开发工具

现代项目通过本地依赖和 `package.json` 的 scripts 管理工具，无需全局安装 Less、Gulp、Grunt、JSHint 或 JSCS。JSCS 等旧工具已停止维护，新项目可参考 [ESLint](https://eslint.org/docs/latest/use/getting-started) 与 [Prettier](https://prettier.io/docs/install) 的配置指南。

```sh
npm install --save-dev prettier
npx prettier --check .
```

上例用于 npm 项目；pnpm 项目对应使用 `pnpm add -D prettier` 和 `pnpm exec prettier --check .`。加入现有项目时，先查看它是否已配置这些工具，再运行相应的 scripts。

## 启动与排查

1. 从仓库根目录安装依赖，查看 README 和 `package.json` 中可用的命令。
2. 运行项目的开发命令，例如 `npm run dev` 或 `pnpm dev`，在浏览器中打开终端显示的本地地址。
3. 启动失败时，先检查 Node.js 版本、当前目录和错误信息。端口被占用时，停止旧服务或使用工具提供的端口选项。
4. 开发服务器用于本地开发；上线前需要执行构建并预览产物。后续可阅读[项目初始化及开发](/frontend-guideline/dev/init/)。
