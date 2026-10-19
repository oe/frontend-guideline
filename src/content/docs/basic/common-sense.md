---
title: "开发人员通用知识"
description: "了解版本控制、Markdown、命令行、网络、编码和开源许可等开发基础。"
sidebar:
  order: 2
---

这些知识不必一次学完，遇到实际问题时可回到对应章节查阅。

## git

[Git](https://git-scm.com/) 是分布式版本控制系统，可以在本地记录提交、比较差异，并通过远程仓库协作。分支与轻量标签主要是指向提交的引用，创建它们的额外开销很小；新的提交、文件对象与附注标签仍会占用空间，不能据此认为仓库大小不会增长。

继续阅读 [Git 的安装及使用](/frontend-guideline/basic/git/)。

## markdown

[Markdown](https://daringfireball.net/projects/markdown/) 由 John Gruber 创建，并有 Aaron Swartz 等人的贡献；它不是从 LaTeX 派生的语言。Markdown 使用简单的纯文本标记描述标题、列表、链接等结构，常用于 README、开发文档与笔记。

代码高亮、表格、数学公式和流程图等能力取决于使用的平台、语法扩展和渲染工具。把 `.md` 文件上传服务器后，是否能显示为网页，也取决于服务器或网页是否配置了 Markdown 渲染。

### 学习 markdown

- [CommonMark 帮助与交互教程](https://commonmark.org/help/)
- [GitHub 的基本撰写与格式语法](https://docs.github.com/zh/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [GitLab Flavored Markdown](https://docs.gitlab.com/user/markdown/)
- [Mermaid 文档](https://mermaid.js.org/intro/)与[在线编辑器](https://mermaid.live/)：用文本描述图形，需要所在平台提供相应支持。

### 支持 markdown 的软件及工具

- [Visual Studio Code](https://code.visualstudio.com/docs/languages/markdown)：支持 Markdown 编辑和预览。
- [Typora](https://typora.io/)：提供试用的付费 Markdown 编辑器，并非永久免费软件。
- [Obsidian](https://obsidian.md/)：以本地 Markdown 文件为基础的笔记工具，附加服务及使用条款以官网为准。
- [Notion](https://www.notion.com/) / [Craft](https://www.craft.do/)：支持部分 Markdown 输入或导入导出，原生文档模型与普通 Markdown 文件不同，迁移时需检查格式和附件。

工具的价格、平台支持和同步功能会变化，选择前查看当前说明，并确认文件是否便于导出与备份。

### 其他

纯文本还可以用于定义图形、配置和演示文稿，但不同工具的格式和能力并不相同。

## shell, terminal & ssh

终端（Terminal）提供文本交互界面；Shell（如 Bash、Zsh、PowerShell）解释并执行命令。两者不是同一概念，命令语法也不一定跨 Shell 通用。

SSH 用于通过加密连接访问远程主机，也可供 Git 认证。连接时核对主机信息，私钥保存在自己的设备上；需要共享给服务器的是公钥。

- [Linux Command](https://github.com/jaywcjlove/linux-command)
- [PowerShell 文档](https://learn.microsoft.com/zh-cn/powershell/)
- [通过 SSH 连接 GitHub](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh)

## 算法及数据结构

了解数组、映射、集合、栈、队列与树，以及时间和空间复杂度。大 O 描述随输入规模增长的趋势，不代表一次操作的实际耗时；选择方案时还要考虑数据量与可读性。

- [数据结构和算法动态可视化](https://visualgo.net/zh)
- [JavaScript 算法与数据结构](https://github.com/trekhleb/javascript-algorithms/blob/master/README.zh-CN.md)

## 版本号及开源协议

### 版本号

项目采用什么版本策略，需要查看它的发布规则，不能仅凭数字形式推断。

#### 语义化版本

遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/) 的项目，在定义公开 API 后按 `主版本.次版本.修订版本` 发布：不兼容 API 变更增加主版本，向后兼容的功能增加次版本，向后兼容的问题修复增加修订版本。

`0.y.z` 用于初始开发，API 可能随时改变；先行版本如 `1.0.0-beta.1` 也不应视作稳定承诺。依赖能否安全升级仍需看更新说明、版本范围与测试结果。

#### 日期版本

[日期版本（CalVer）](https://calver.org/) 使用年、月等时间信息，例如 `2026.10`。具体格式由项目约定，它并不自动说明 API 兼容性。

### 开源协议

公开源码不等于允许任意使用。使用第三方代码、字体、图片或数据前，应检查许可证及署名、版权声明、再分发等条件；没有许可证时，不能默认按开源许可使用。

MIT 和 Apache-2.0 通常允许商用，但仍有保留声明、许可文本等义务，Apache-2.0 还有专利及 NOTICE 等条款。Copyleft 许可证的具体义务取决于许可证与使用、分发方式，不能简单概括为“用到就必须全部开源”。

参考 [Choose a License](https://choosealicense.com/licenses/)，具体项目应阅读许可证原文。

## http 协议及 API

HTTP 定义客户端与服务器交换请求、响应的方式。先理解 URL、请求方法、状态码、请求头、响应体、缓存与 HTTPS，再学习具体的接口调用方式。

- `GET` 通常用于读取资源，`POST` 常用于提交数据；接口具体行为仍需遵循服务端契约。
- HTTPS 通过 TLS 保护传输，不会自动解决应用自身的输入校验或权限问题。
- `fetch()` 遇到 HTTP 404/500 时通常仍会返回响应对象，需要检查 `response.ok`；网络错误等情况才会让 Promise 拒绝。
- CORS 是浏览器的跨源访问控制机制，不是用户认证或服务端权限校验。

参考 [MDN HTTP 概述](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview)与 [Fetch 使用指南](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)。

## 设计模式、设计原则、DRY, KISS, YAGNI & SOLID

这些原则提供设计时的思考角度，不是需要同时套用的模板。DRY 关注避免知识的重复表达，KISS 强调保持简单，YAGNI 提醒不要提前实现尚无需求的能力。优先把当前需求与边界说明白，再决定是否需要额外抽象。

参考[设计模式目录](https://refactoringguru.cn/design-patterns/catalog)。

## 字符编码

字符集、编码与字体分别处理“有哪些字符”“如何存储”“如何显示”等问题。Web 项目通常统一使用 UTF-8，并在 HTML 中声明 `<meta charset="utf-8">`。

JavaScript 字符串以 UTF-16 码元表示，`.length` 不一定等于用户看到的字符数，表情和组合字符尤其如此。处理文本时需根据需求选择码点遍历或字素分割，不能仅凭字节数和字符串长度推断显示宽度。

参考 [MDN 字符编码](https://developer.mozilla.org/en-US/docs/Glossary/Character_encoding)与 [JavaScript 字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)。

## 正则表达式

正则表达式用于匹配文本模式。需要区分正则字面量和字符串构造时的转义；复杂 HTML、JSON 等结构应使用相应解析器。处理不受信输入时也要留意某些表达式的回溯开销。

- [MDN 正则表达式指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions)
- [轻松学习正则表达式](https://github.com/ziishaned/learn-regex/blob/master/translations/README-cn.md)

## 相关推荐链接

- [计算机专业的学生应该知道什么（英文）](https://matt.might.net/articles/what-cs-majors-should-know/)
- [Every Programmer Should Know](https://github.com/mtdvio/every-programmer-should-know)
