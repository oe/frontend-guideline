---
title: "开发工具"
description: "以 VS Code、AI 编程工具、Chrome、Node LTS 与 pnpm 组成主力工具链，给出扩展、调试、设计协作和旧工具的明确取舍。"
sidebar:
  order: 4
---

**先装一套能完成开发、调试、提交和发布的工具，再考虑美化终端与收集插件。** 本书推荐从 VS Code、Chrome、Git、Node LTS 和 pnpm 开始；AI 编程工具选一个认真用，别先订阅一排套餐。

<small>更新于 2026-10-19。个人工具偏好；收费、额度与平台支持看官网，已有项目沿用仓库配置。</small>

## 开工清单

| 任务 | 默认推荐 | 为什么选它 |
| --- | --- | --- |
| 写代码 | **VS Code** | JS/TS、Git、调试能力齐全，框架扩展和团队配置容易复用 |
| AI 辅助 | VS Code 中的 Copilot / Codex，或直接用 Cursor | 留在编辑器里完成读代码、改文件和检查；先选一种工作方式 |
| 浏览器调试 | **Chrome DevTools** | Elements、Network、Sources、Performance 能覆盖大部分日常问题 |
| 运行项目 | **Node LTS + fnm** | 按仓库切版本，避免每换项目就重装运行环境 |
| 管理依赖 | 新项目优先 **pnpm** | 多项目管理方便；已有项目按锁文件与 `packageManager` 使用 |
| 版本控制 | 编辑器内置 Git + 命令行，图形客户端选 Sourcetree | 随时检查差异，熟悉提交、分支、合并，不只会按同步按钮 |
| 设计协作 | **Figma** | 查看布局、组件、资源与设计标注，直接对照实现 |

安装与版本切换的具体命令在[开发环境配置](/frontend-guideline/basic/fontend-env/)。读完这篇，只安装自己马上会用的项目。

## 编辑器

### 默认用 VS Code

[VS Code](https://code.visualstudio.com/) 是本书给初学者和普通项目的首选。[Stack Overflow 2026 开发者调查](https://survey.stackoverflow.co/2026/technology/data/dev-ide)中，VS Code 仍是使用最多的编辑器，受访者选择率为 70.9%；这是多选、自选样本调查，用来了解生态，不是性能排名。

先学会全局搜索、跳转定义、重命名、断点和差异比较。它们天天用得上，价值远高于装十套主题。

扩展按项目装，先看发布者是否正确：

- **ESLint**：`dbaeumer.vscode-eslint`，项目使用 ESLint 时安装。
- **Prettier**：`esbenp.prettier-vscode`，项目使用 Prettier 时安装；已有 Biome 等方案就沿用它，不要叠加两个格式化器。
- **Vue (Official)**：`Vue.volar`，Vue 3 项目安装，别再跟着旧教程装 Vetur。
- **Astro**：`astro-build.astro-vscode`，编辑本站这类 Astro 项目时安装。
- **Tailwind CSS IntelliSense**：`bradlc.vscode-tailwindcss`，使用 Tailwind 时才装。
- **WSL**：`ms-vscode-remote.remote-wsl`，Windows + WSL 开发时安装。

JS/TS、Git、HTML/CSS、Emmet 和浏览器调试已经有[内置支持](https://code.visualstudio.com/docs/getstarted/overview)，不用再搜一个「JavaScript 全家桶」扩展包。React 项目也不用为 JSX 另装一堆重叠的语法扩展。

格式化器先读项目配置，再开保存时格式化。扩展只是入口，真正的 ESLint、Prettier 等版本应在项目依赖中固定；别让自己的编辑器悄悄把全仓库改一遍。Vue 扩展选择可对照[官方工具指南](https://vuejs.org/guide/scaling-up/tooling.html)，格式化配置见 [Prettier 编辑器集成](https://prettier.io/docs/editors)。

### 其他编辑器怎么选

- **[Cursor](https://cursor.com/docs/agent/overview)**：想围绕 AI Agent 工作，可以直接选它。先练会让 Agent 阅读现有项目、做小范围改动、运行检查，再追更复杂的并行任务。
- **[WebStorm](https://www.jetbrains.com/webstorm/)**：偏爱开箱即用的项目索引、导航与重构时值得考虑。非商用免费，商业开发需要相应授权，别把「个人项目」直接当成非商用的同义词，见[许可说明](https://www.jetbrains.com/help/webstorm/register.html)。
- **[Sublime Text](https://www.sublimetext.com/)**：快速打开、编辑零散文件仍然顺手；已经熟练就继续用。新手从零搭现代框架项目，优先 VS Code。

Atom 已归档，不再作为新装环境的推荐；也没必要为了学前端先配置一套 Neovim 插件体系。

### 字体

个人推荐 [Fira Code](https://github.com/tonsky/FiraCode) 和 [Cascadia Code](https://github.com/microsoft/cascadia-code)。试用时重点看 `0/O`、`1/l/I` 是否容易分辨，字号先调舒服。支持连字的字体不等于必须开启连字，`=>`、`!=` 合并显示让你认不清就关掉。

## AI 编程工具

**推荐用，推荐认真检查它做了什么。** 让它接手一个能描述清楚、能验收的任务，比让它「优化整个项目」更有效。

- **保留 VS Code**：先用 [GitHub Copilot](https://code.visualstudio.com/docs/copilot/overview)，或者 [Codex](https://developers.openai.com/codex/) 的编辑器/命令行工作方式，不必为了 AI 立即换编辑器。
- **愿意换 AI 编辑器**：选 Cursor，先把一个项目的规则和检查命令配置好。
- **偏好终端与仓库任务**：可以选 [Claude Code](https://code.claude.com/docs/en/overview) 或 [Codex CLI](https://developers.openai.com/codex/cli/)，适合读仓库、批量修改和运行检查。

一个实用流程：先提交当前进度 → 给出目标、相关文件和验收方式 → 让工具提出改动并执行 → 看 diff → 自己操作页面 → 运行项目检查。生成的代码、依赖和命令都要看，尤其是删除文件、改认证流程或跑迁移时。

初学时多让它解释报错、给最小例子、指出代码哪里和预期不同。自己完全读不懂的整页代码，复制进项目只会把问题推迟。涉及公司代码时使用团队批准的账号与设置，密钥和生产数据不要塞进提示词。

先用一种工具，看看它是否真的缩短任务时间，再决定付费。订阅费、模型用量和调用限额可能分开计算，别把「买了编辑器会员」理解成所有模型无限用；也不要为了云端 Agent 再去买一块独显。

## SHELL

**macOS：系统终端 + Zsh 就能开工。** 想换更舒服的终端，推荐 [Ghostty](https://ghostty.org/docs/install/binary)；已经用熟 [iTerm2](https://iterm2.com/) 也很好。Git、fnm 等命令行软件用 [Homebrew](https://brew.sh/) 管理。

**Windows：Windows Terminal + WSL 2 + Ubuntu。** Node、Git 和依赖装在 WSL 里，编辑器通过 WSL 扩展连接，项目放 `~/projects/`。具体步骤见[Windows 环境配置](/frontend-guideline/basic/fontend-env/#windows)。

先会 `pwd`、`cd`、`ls`、`mkdir`、搜索文件和查看进程。终端主题、提示符和插件管理器以后再折腾，运行报错时看清自己在 Zsh、Bash 还是 PowerShell，别混抄命令。

## 包管理器, 构建工具(命令行)

[Node.js](https://nodejs.org/en/about/previous-releases) 新装选择 **LTS**。本次更新时推荐 Node 24；Node 26 仍是 Current，官方计划 2026-10-28 转 LTS，之后新项目可以按支持范围采用。已有项目先看 `.nvmrc`、`.node-version` 与 `engines`。

包管理器的判断很简单：

- **新项目本书优先 pnpm**，把确切版本写进 `packageManager` 并提交锁文件。
- 仓库是 `package-lock.json` 就用 npm，是 `pnpm-lock.yaml` 就用 pnpm，是 `yarn.lock` 就用项目要求的 Yarn；别进门先给别人迁移工具链。
- pnpm 的[当前版本线已是 12](https://pnpm.io/installation)，本书仓库仍固定 10.34.7，两者不要混为一谈。维护本站按仓库版本执行，别顺手升级锁文件。
- **[Bun](https://bun.sh/docs)** 可以用于明确验证过兼容性的项目，入门教程和跨团队协作仍先用 Node LTS，不要在学习语法时额外叠加运行时差异。

新建普通前端项目默认 [Vite](https://cn.vite.dev/guide/)，内容站选 [Astro](https://docs.astro.build/zh-cn/getting-started/)。不要为了开发热更新单独装一个 Live Server，再靠手工刷新处理模块依赖。具体脚手架步骤见[项目初始化](/frontend-guideline/dev/init/)。

## 浏览器

开发默认用 **[Chrome](https://www.google.com/chrome/)**。日常先用熟这几个 [DevTools 面板](https://developer.chrome.com/docs/devtools)：

| 问题 | 先打开 | 先看什么 |
| --- | --- | --- |
| 布局或样式不对 | Elements | Computed 里最终生效的值、盒模型、Flex/Grid |
| 页面白屏 | Console | 第一条相关错误与调用栈 |
| 接口、图片或脚本失败 | Network | URL、状态、响应体、请求耗时 |
| 点按钮没反应 | Sources | 事件断点、作用域、调用栈 |
| 页面卡顿 | Performance | 录制同一次操作，找主线程长任务与布局开销 |

发版前再用 Safari、Firefox 检查主要流程，别把 Chrome 和 Edge 都测了一遍当成跨引擎验证。涉及 iPhone 用户的页面，真机 Safari 要测；[Playwright 的 WebKit](https://playwright.dev/docs/browsers)很有用，但不等于完整的 Safari 和 iOS 设备。实操见[调试方法](/frontend-guideline/dev/debug/)。

### 浏览器特性检测

查 [Can I Use](https://caniuse.com/) 和 MDN 的兼容性表。只有需要针对不支持的环境提供不同实现时，再做 `CSS.supports()` 等特性检测；不必每个项目先装 Modernizr。

## Git 版本控制工具

默认先用编辑器的 Git 面板看 diff、暂存、提交，用命令行理解分支和同步。想看完整提交图与合并历史，推荐 [Sourcetree](https://www.sourcetreeapp.com/)。具体流程见 [Git 安装与使用](/frontend-guideline/basic/git/)。

## API 文档查看器 Docset App

在线查 API，先打开 **MDN 或项目官网**，用站内搜索、`site:` 和编辑器悬浮提示定位，不要先找转载手册。

需要聚合查询可以用 [DevDocs](https://devdocs.io/)。经常离线时，macOS 选 [Dash](https://kapeli.com/dash)，Windows/Linux 选 [Zeal](https://zealdocs.org/)。装完确认对应版本的文档已下载，否则「离线文档工具」也没东西可查。

## 设计、接口与常用辅助工具

- **设计交接用 [Figma](https://www.figma.com/dev-mode/)**：先看组件、布局约束和设计变量，再导出图片/SVG。复制一堆绝对定位 CSS 不等于实现了响应式页面。
- **接口调试先用 Network**：直接看页面发出的请求，必要时复制为 cURL 复现。需要整理共享接口集合时再用 [Bruno](https://www.usebruno.com/) 或团队现有客户端。
- **本地模拟接口用 [MSW](https://mswjs.io/docs/)**：把正常、空数据、失败和慢请求都保存为可重现的场景，不依赖一个可能随时下线的免费假 API。
- **表单和 CSS 小实验用 [CodePen](https://codepen.io/pen/) 或 [JSFiddle](https://jsfiddle.net/)**；包含包依赖的最小项目可用 [StackBlitz](https://stackblitz.com/)。准备长期维护的项目放进本地 Git 仓库。

### JS 函数性能在线测试

小实验可以用 [JSBench](https://jsbench.me/)，业务卡顿先用 Performance。`Number("1.5")` 与 `parseInt("1.5", 10)` 的结果不同，语义都不同的写法不要按跑分替换。

## 容器按需安装

普通 Vite / Astro 练习项目先在本机跑 Node，不必第一天就装 Docker。需要数据库、Redis、接入团队容器环境时，再装 [Docker Desktop](https://docs.docker.com/desktop/)；Mac 上也推荐试 [OrbStack](https://orbstack.dev/)，注意个人和商业使用的授权区别。

数据库等配套服务可以放容器，前端开发服务器留在宿主机，修改代码与文件监听更直接。已有团队 Compose 配置就按它启动，详见 [Docker 的使用](/frontend-guideline/cicd/docker/)。

## GUI 工具

新项目不推荐把 Prepros、CodeKit 或全局 Grunt/Gulp 作为默认入口。构建、检查与预览写进 `package.json` 的 scripts，团队和 CI 才能用相同命令执行；接手旧项目时按原配置维护即可。

**装好这套工具就开始写页面。** 能把页面跑起来、查到错误、提交改动，再逐项补齐工作中用到的能力，比收集「开发者必备软件清单」有效得多。
