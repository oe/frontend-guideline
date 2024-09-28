---
title: "GIT 的安装及使用"
description: "GIT 是用于代码协作的工具, 与 SVN 类似, 但比 SVN 更优, 比如分布式存储, 可离线提交代码, 仓库大小会小很多."
sidebar:
  order: 6
---

GIT 是用于代码协作的工具, 与 SVN 类似, 但比 SVN 更优, 比如分布式存储, 可离线提交代码, 仓库大小会小很多. 

全球大部份开发者均使用 GIT 来进行代码管理, 且Git使用有不少细节需要注意, 故此处单独成章介绍说明.

## GIT 基本概念及常用命令

在使用之前, 你应当对 GIT 的基本概念有一定了解, 避免进入使用的误区.

### 基本概念

网络上已有较完整全面的概述, 在此直接引用, 请仔细阅读链接原文.

- [Git 基础(源自 GIT 项目官方)](https://book.git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-Git-%E5%9F%BA%E7%A1%80)
- [GIT 入门(阮一峰博客)](http://www.ruanyifeng.com/blog/2018/10/git-internals.html)

### 常用命令

日常工作中, 应尽量使用 GUI 软件来完成 GIT 相关操作. 若你不清楚你要执行的 git 命令会有什么效果, 请不要使用该命令! 错误的命令可能会导致花费数小时、数天来恢复代码, 甚至代码不可恢复!

- [常用命令清单(阮一峰博客)](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
- [常用 Git 命令使用教程](https://segmentfault.com/a/1190000011673663)

## 安装

GIT 工具分两部分, 原生的 git 命令行工具(提供 SHELL 命令) 以及 提供可视化界面的 GUI 软件. GIT 命令繁多, 功能强大, 为避免使用命令出现不必要的问题, 开发者应尽量使用 GUI 工具来操作代码仓库, 简单方便, 也无需记忆繁琐的命令.

一些 GUI 软件会内置 GIT SHELL 程序, 但是若系统未安装 GIT SHELL, 会导致无法在系统命令行中方便的使用 git 命令进行一些操作.

### GIT SHELL 程序安装

Mac 和 Windows 安装略有差异, 请根据自己电脑的操作系统, 按说明操作.

#### Mac

在命令行中输入 `git --version`, 若弹出对话框，则按提示安装命令行工具即可， 若直接输出 git 版本，则表示已安装，可跳过该步骤。

#### Windows & Linux

下载[原生 Git 客户端, 命令行工具](https://git-scm.com/downloads)

### GIT 命令行配置

GIT 默认对文件名称大小写不敏感(即修改文件名的大小写不会产生修改记录), 这往往导致一些问题. 安装完后执行下述命令来让 git 对文件大小写敏感:

```sh
git config --global core.ignorecase false
```

### GUI 程序安装

GIT 的 GUI 软件众多, 如 [sourcetree](https://www.sourcetreeapp.com/), [Fork](https://git-fork.com/), 以及和 TortoiseSVN 操作类似的 [TortoiseGit](https://tortoisegit.org/) (支持 Windows).

这里只推荐使用功能完善稳定的 [sourcetree](https://www.sourcetreeapp.com/), 点链接选择自己的操作系统平台下载即可.

注意点:

1. SourceTree 是免费软件， 但是需注册才能使用，注册时需要通过 Google 验证码验证， 即`需要翻墙才能注册`
2. SourceTree 设置界面中 Git 页签里，进行优化设置：
   1. 勾选 `Do not fast-forward when merging, always create commit`
   2. `Git Version` 中选择使用系统 Git `Use System Git`，windows 选择 `GIT SHELL 程序安装` 中安装的 git 路径， Mac 选择系统内置的 git 即可. 此操作保证命令行中的 Git 配置与GUI 中的git 行为一致.(其他内置git的GUI工具也应当类似设置)

## GIT 的使用

### 分支问题

1. 项目分支名称只能使用半角的 英文字符、数字、/ 、- 来命名, 禁止使用全角字符, 禁止使用中文
2. 一般项目默认分支为 dev 分支, 可用于提交代码合并代码; prerelease(预发布分支) / master(主干分支) 等分支则只能用于合并而不能用于提交代码
3. 日常开发应当在 dev 分支上进行, 若修改的问题, 或者新增的功能过于复杂(比如需要修改较多的代码文件, 或者需要耗费较长时间才能完成), 则应当开启单独分支去开发(一般从 dev 上开分支), 开发完后再合并会原来分支. 分支名称应当简短且能描述清该分支的含义, 格式应当注意:
   1. 修正问题, 则应当使用 `bugfix` 作为分支名称的前缀, 如 `bugfix-scolling-issues`
   2. 新功能开发, 则应使用 `feature` 作为分支名称的前缀, 如 `feature-page-template`
4. 只要改完一个问题, 就应当提交一次代码, 不论改动的代码量多少. 增加较复杂的情况, 则可分多次提交, 应避免一次提交大量的变更(相同的变更除外, 如批量修正几十个文件中对某个资源的引用路径).

### 代码提交日志

代码提交日志需遵循 [约定式提交](https://www.conventionalcommits.org/zh-hans/) 的规范, 以增加日志的可读性, 方便代码及项目维护. 约定式提交 有多种配置形式, 在项目中我们采用的是比较通用的 [config-conventional](https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/config-conventional/README.md)

下面进行一个简要的介绍.

#### 结构

提交的日志结构应当如下:

```
<类型>[可选的作用域]: <描述>

[可选的正文]

[可选的脚注]
```

注意:

1. 类型必须是英文字符, 默认有 `feat`(表示新功能) `fix`(表示问题修正)
2. 上述格式中冒号是必须的, 且必须是英文半角的冒号, 冒号后应当跟随一个空格.
3. 正文和注脚都是可选的, 他们之间应当用空行隔开, 正文和第一行之间也应当有空行.

日志示例:

```
feat(lang): add polish language
```

```
fix: correct minor typos in code

see the issue for details on the typos fixed

closes issue #12

```

#### 类型说明

可用的类型的有:

- `feat`: 完成了新功能
- `fix`: 修正了问题
- `build`: 调整了项目打包相关的脚本或配置
- `ci`: 调整了自动构建相关脚本或配置
- `chore`: 代码清理操作, 比如移除不必要的代码, 文件等
- `docs`: 文档相关的更新
- `perf`: 性能优化相关的更新
- `refactor`: 代码重构, 使用更优的方法来实现已有的功能
- `revert`: 代码回滚, 此时应写清回滚原因
- `style`: 样式相关问题修复
- `test`: 测试相关问题修复

#### 破坏性变更

如果提交包含了破坏性变更, 即导致产品出现前后不兼容的情况(比如 API 变更, 访问地址变更, 代码库的调用方式变更等), 必须在提交中声明:

1. 破坏性变更必须在提交的正文起始行开头写上全大写的文本 `BREAKING CHANGE`，后面紧跟冒号和空格
2. 在日志的首行 类型 之后应当增加 `!` 以提醒本次提交包含破坏性变更

日志示例:

```
chore!: drop Node 6 from testing matrix

BREAKING CHANGE: dropping Node 6 which hits end of life in April
```

## 基于 Git 提供源码托管的服务
目前有众多基于 Git 的源码托管服务, 大多数平台对免费用户都支持 `私有仓库`、`搭建静态网站`、`自动构建及持续集成(CD/CD)`等, 比较知名的有:

* [Github](https://github.com/), 全球最大的软件开发平台
* [Gitlab](https://gitlab.com/), 开源软件, 国内的Git源码平台几乎都是基于它定制开发而成
* [Bitbucket](https://bitbucket.org/), [Atlassian](https://www.atlassian.com/)旗下产品(SourceTree也是其产品)
* [Coding](https://coding.net/), 腾讯旗下产品
* [Gitee 码云](https://gitee.com/), [开源中国](https://www.oschina.net/)旗下产品

推荐使用 [Github](https://github.com/) 来托管自己的私人项目, Github在全球开发社区影响巨大, 有众多大牛, 大多数开源项目均选择使用 Github 托管代码, 还提供了众多的第三方服务的集成支持, 同时若你的开源项目有很高的影响(star 数和 fork数较高)也利于你找工作.


CI/CD介绍:

* [使用GitHub实现简单的CI/CD](https://www.linuxidc.com/Linux/2018-10/154824.htm)
* [GitLab CI/CD 介绍和使用](https://blinkfox.github.io/2018/11/22/ruan-jian-gong-ju/devops/gitlab-ci-jie-shao-he-shi-yong/)

