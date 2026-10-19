---
title: "开发人员通用知识"
description: "先用好 Git、命令行与 HTTP，再按实际任务补齐 Markdown、版本号、许可、数据结构、编码和正则。"
sidebar:
  order: 2
---

**先把 Git、命令行和 HTTP 用起来。** 这三项直接决定你能否保存改动、运行项目、解释接口为什么失败。其余主题随项目补齐，不要先把这一页所有链接都读完才开始写页面。

## git

每完成一个可说明的小改动就提交，提交前看 diff，每天结束前把需要保留的工作推到远程仓库。别用 `项目最终版2`、`最终版-真-final` 管理代码。

先掌握 `status`、`diff`、`add`、`commit`、`switch`、`pull`、`push`，再处理分支和合并。[Git 安装与使用](/frontend-guideline/basic/git/)有完整起步流程；遇到破坏性命令先看它会丢掉什么，别从搜索结果复制一条 `reset --hard` 就运行。

## markdown

README、项目笔记和排错记录默认用 Markdown。先学标题、列表、链接、图片、代码块，足够写大部分文档。语法入口：[CommonMark](https://commonmark.org/help/)与 [GitHub Markdown](https://docs.github.com/zh/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)。

好的 README 先回答：项目做什么、需要什么环境、怎么安装、怎么启动、怎么构建。把代码放进注明语言的代码块，不要拿截图当可复制的命令。

### 支持 markdown 的软件及工具

- **项目文档**：直接用 [VS Code](https://code.visualstudio.com/docs/languages/markdown)，和代码一起提交、评审。
- **长期个人笔记**：本书推荐 [Obsidian](https://obsidian.md/)，本地 Markdown 文件方便迁移与备份；整理出自己能查到的笔记比堆插件重要。
- **偏爱所见即所得**：可以选 [Typora](https://typora.io/)，它是付费软件，有试用。
- **团队协作已在 [Notion](https://www.notion.com/) / [Craft](https://www.craft.do/)**：按团队使用，重要资料定期验证导出与附件备份，别等迁移时才发现格式不完整。

### 其他

要解释状态流或部署结构，可以用 [Mermaid](https://mermaid.js.org/intro/)画一个小图；先确认发布平台支持它。别为了两条关系引入一套复杂绘图流程。

## shell, terminal & ssh

终端是交互窗口，Shell 负责解释命令；Zsh、Bash 和 PowerShell 的语法不完全相同。运行前先确认教程写给哪个 Shell，路径、引号和变量不要混抄。

日常至少练会：进入项目目录、列文件、找某段文本、查看当前进程、停止旧开发服务。记不住先用 `--help` 与 [tldr](https://tldr.sh/)，需要完整参数再看手册。

SSH 用来连接远程主机或做 Git 认证。**服务器需要公钥，私钥留在自己设备上。** 首次连接核对主机指纹；操作步骤见[GitHub SSH 指南](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh)。

## 算法及数据结构

先把数组、对象、`Map`、`Set`、队列和树用在真实数据里。比如两份列表按 ID 关联，用映射保存索引，避免每个元素都再扫一遍完整列表；大列表再考虑分页和虚拟滚动，别只优化一处循环语法。

用 [VisuAlgo](https://visualgo.net/zh)理解结构与复杂度，再从 [JavaScript 算法与数据结构](https://github.com/trekhleb/javascript-algorithms/blob/master/README.zh-CN.md)挑当前需要的主题练。面试刷题可以集中做，日常开发别把所有问题都改写成算法竞赛。

## 版本号及开源协议

### 版本号

升级前看发布说明与破坏性变更，升级后跑检查和构建。版本号帮助判断风险，不能替你验收项目。

#### 语义化版本

遵循 [SemVer](https://semver.org/lang/zh-CN/) 的项目使用 `主版本.次版本.修订版本`。读 `package.json` 时重点看范围与锁文件：

- `^1.2.3` 通常接受 `>=1.2.3 <2.0.0` 的稳定版本。
- `~1.2.3` 通常接受 `>=1.2.3 <1.3.0` 的稳定版本。
- `^0.2.3` 的上界是 `0.3.0`，不要把零主版本也当作允许随意升级到下一个次版本。

确切安装结果看锁文件。CI 按锁文件安装，更新依赖时把清单和锁文件一起提交，别只把数字改得看上去很新。

#### 日期版本

[CalVer](https://calver.org/)把日期放进版本，如 `2026.10`。它告诉你发布时间线，不自动说明接口是否兼容，升级仍要读该项目的迁移说明。

### 开源协议

装依赖、复制代码、使用图标和字体时先看许可证。MIT / Apache-2.0 等仍有保留版权与许可声明等要求，Copyleft 的义务要看具体条款与使用方式；**没找到许可证，就别默认可以搬进商业项目**。

用 [Choose a License](https://choosealicense.com/licenses/)识别常见许可，再阅读项目自己的 LICENSE；交付时一并保留要求的声明。拿不准的具体商用与分发问题交给项目负责人核实，不要靠「源码公开」替代授权。

## http 协议及 API

每接一个新接口，先写清方法、URL、参数、认证方式、成功响应与失败响应，再实现页面。Network 面板里应该能找到同一组信息。

下面是最常见的排错区别：

- **401 / 403**：先查登录状态和服务端权限，不先改页面样式。
- **404**：检查请求基址、路径、方法与部署前缀。
- **500**：读取安全可展示的错误信息，交给服务端日志定位。
- **CORS**：由服务端响应头和浏览器规则决定，改前端 `fetch` 选项不能凭空获得权限。
- **`fetch` 没进入 `catch`**：HTTP 错误通常仍返回响应对象，先检查 `response.ok`；网络失败才会让请求 Promise 拒绝。

参考 [MDN HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview)与 [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)。加载、空数据、失败和重试应有各自的界面，不要把所有情况都表现成无限转圈。

## 设计模式、设计原则、DRY, KISS, YAGNI & SOLID

本书的默认建议是：**先写清楚，再消除真正的重复，最后才加抽象。** 两个看起来相似的表单，不一定应该马上揉成带二十个开关的万能组件。

DRY 用来避免同一规则散落多处，KISS 帮你压低复杂度，YAGNI 提醒你先别实现没人要的扩展点。需要解决实际结构问题时再查[设计模式目录](https://refactoringguru.cn/design-patterns/catalog)，别为了套一个名词拆出十个文件。

## 字符编码

Web 项目统一 UTF-8，HTML 声明 `<meta charset="utf-8">`。页面乱码先查文件实际编码、响应头和声明是否一致，换字体通常修不好编码错误。

JavaScript 的 `.length` 统计 UTF-16 码元，不一定等于用户看到的字符数。做昵称长度、文本截断和表情输入时，先确定产品需要按字节、码点还是可见字素计算，再用对应处理方式；涉及可见字素可看 `Intl.Segmenter`。参考 [MDN 字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)。

## 正则表达式

正则适合已知文本模式，别拿它硬拆 HTML 或 JSON。先写正常输入、空输入、边界输入的例子，再写表达式；正则字面量与 `new RegExp()` 的字符串转义也要区分。

遇到很长的用户输入，测试一下执行时间，避免嵌套量词等表达式在失败匹配时长时间回溯。参考 [MDN 正则指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions)与[练习教程](https://github.com/ziishaned/learn-regex/blob/master/translations/README-cn.md)。

## 相关推荐链接

[Every Programmer Should Know](https://github.com/mtdvio/every-programmer-should-know)用于按主题查漏。一次解决一个自己能描述的知识缺口，比把一整张知识图谱打勾更有用。
