---
title: "开发工具"
description: "选择终端、编辑器、浏览器与常用开发辅助工具。"
sidebar:
  order: 4
---


## SHELL

- [Bash 官方手册](https://www.gnu.org/software/bash/manual/)与 [PowerShell 文档](https://learn.microsoft.com/zh-cn/powershell/)：先区分当前使用的 Shell，再查对应语法。

## 编辑器

- [Visual Studio Code](https://code.visualstudio.com/)：内置 JavaScript、TypeScript 和 Git 支持，扩展丰富。

- [Sublime Text](https://www.sublimetext.com/) 跨平台开发神器, 有丰富的扩展支持。 付费软件，可试用，具体条款以官网为准。
- [Phoenix Code](https://phcode.io/)：源自 Brackets 的编辑器项目。
- [Atom](https://github.com/atom/atom)：已停止维护并归档，仅供了解旧项目环境，新项目请选择持续维护的编辑器。
- [notepad++](https://notepad-plus-plus.org/) windows 平台, 免费开源, 支持多种语言, 多种文件编码, 支持扩展

可以比较 [Fira Code](https://github.com/tonsky/FiraCode) 和 [Cascadia Code](https://github.com/microsoft/cascadia-code) 等编程字体；是否使用连字取决于个人阅读习惯与编辑器支持。参见[关于字体及字符](https://blog.evecalm.com/2020/05/about-font-and-character.html)。

### Sublime Text 相关网站 :thumbsup:

- [官网](https://www.sublimetext.com/)
- [Package Control](https://packagecontrol.io/) ST 扩展管理器官网
- [Sublime Text 官方文档](https://www.sublimetext.com/docs/)
- [Sublime Text 快捷键及插件推荐](http://www.daqianduan.com/4820.html)

Sublime Text 提供的快捷键相当丰富，若想查看全部的快捷键，从 菜单栏 ➡ Preferences ➡️ Key Bindings - Default 查看所有快捷键的默认配置文件。

### 编辑器扩展

- [Emmet :thumbsup:](https://emmet.io/) 通过易记的缩写形式(支持模糊匹配)来快速生成 HTML 和 CSS, 并配有代码提示, 提高输入效率, 减少输错情况.

## API 文档查看器 Docset App

集合各种流行编程语言的 API 文档，方便进行检索查询。下列软件，可根据自身需要，择一即可。

- [Devdocs :thumbsup:](https://devdocs.io/) 在线的 API 文档合集，并且可将数据缓存至浏览器本地
- [Dash](https://kapeli.com/dash)：macOS 上的 API 文档查看器，试用和授权方式以官网当前说明为准。
- [Zeal](https://zealdocs.org/)：支持 Windows 和 Linux 的开源离线文档查看器。

## 浏览器特性检测

- [Can I Use :thumbsup:](https://caniuse.com/) 浏览器 js/css 特性兼容性查询
- [Modernizr :thumbsup:](https://modernizr.com/) 检测浏览器特性的 js 库

## Git 版本控制工具

- [Git 安装与使用](/frontend-guideline/basic/git/)：本书的版本控制入门。

## 包管理器, 构建工具(命令行)

- [Node.js](https://nodejs.org/)：JavaScript 运行时，不是包管理器本身。
- [npm](https://www.npmjs.com/) / [pnpm](https://pnpm.io/zh/)：管理项目依赖与运行 scripts。
- [Vite](https://cn.vite.dev/)：提供开发服务器与生产构建。
- [Grunt](https://gruntjs.com/) / [Gulp](https://gulpjs.com/)：任务自动化工具，维护已有项目时按配置使用，不是新项目的必装前置。

## GUI 工具

### Prepros（跨平台）

prepro 是一款前端工具,内置有 web 服务器,支持编译各种预编译语言代码(less, sass, coffee 等), 自动补全 css 样式属性的浏览器私有属性, 浏览器实时刷新(编写代码时, 保存代码即刷新), 代码合并及压缩等.

官方网站: <https://prepros.io/>

### CodeKit（macOS）

codekit 和 prepos 一样, 除了 prepos 的功能, 还支持管理维护第三方库.

官方网站: <https://codekitapp.com/>

图形工具的支持平台、试用与授权政策会变化，使用前核对官网；命令行项目优先沿用已有构建配置。

## 前端代码在线练习及代码片段分享网站

你可以在下述网站在线编写前端代码、查看效果(仅需浏览器，电脑无须安装编辑器及服务器)，并分享给他人(一般均需在网站注册)，也可以在网站上搜索他人分享的有用的代码片段。

支持写 html,css, js(包括引入第三方库):

- <https://jsfiddle.net/>
- <https://codepen.io/>
- <https://jsbin.com/>
- <http://liveweave.com/>
- <https://plnkr.co/>

偏向 HTML/CSS 的练习工具（能力以网站当前功能为准）：

- <http://dabblet.com/>

支持各种语言的playground:
- <https://riju.codes/>

## JS 函数性能在线测试

先确认候选写法的语义相同，再比较性能。例如 `Number("1.5")` 返回 `1.5`，`parseInt("1.5", 10)` 返回 `1`，它们不能仅按速度互换；一元 `+` 与 `Number()` 对 BigInt 的行为也不同。

可以使用 [JSBench](https://jsbench.me/) 做小规模实验。微基准会受引擎优化、预热、输入分布与浏览器版本影响，不能代替对真实页面的 Performance 分析；优先保持正确性与可读性。

## 工具

- [DB 关系图制作工具](https://dbdiagram.io/home)
- [mockups 给图加设备的壳](https://deviceshots.com/)
- [开发者工具箱](https://10015.io/) 包含了颜色转换、编码转换、css生成、图片裁剪、JSON格式化等几十个工具
- [模拟 API 用于测试和原型设计](https://jsoning.com/api/)

## 其他参考

- [Linux Desktop Setup](https://hookrace.net/blog/linux-desktop-setup/)
- [Mac生产力工具链推荐](https://github.com/Louiszhai/tool)
