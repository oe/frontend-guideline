---
title: "Git 的安装及使用"
description: "理解 Git 的本地与远程操作、分支协作、文件大小写和约定式提交。"
sidebar:
  order: 6
---

Git 是分布式版本控制系统，可以离线记录本地提交，并与远程仓库交换提交。GitHub、GitLab 等是代码托管平台，不等同于 Git 本身。仓库大小取决于历史与对象，不能笼统认为 Git 一定比 SVN 仓库更小。

## GIT 基本概念及常用命令

### 基本概念

- **工作区**：当前正在编辑的文件。
- **暂存区**：准备包含在下次提交中的内容。
- **提交**：记录文件快照及其历史关系。
- **分支**：可随新提交移动的引用；标签常用于标记版本。
- **远程仓库**：用于交换提交的其他仓库，本地提交不会自动上传。

参考 [Pro Git 简体中文译本](https://github.com/progit/progit2-zh)。

### 常用命令

可选择命令行或 GUI，重点是看懂即将暂存、提交和推送的内容。以下命令用于查看状态，不会修改工作区：

```sh
git status
git diff
git diff --staged
git log --oneline -5
```

`git diff` 查看未暂存改动，`git diff --staged` 查看已经暂存的改动，两者不能互相替代。

## 安装

### GIT SHELL 程序安装

#### Mac

运行 `git --version` 检查；也可按系统提示安装命令行工具，或使用自己维护的软件包管理器安装。

#### Windows & Linux

Windows 可使用 [Git 官方下载](https://git-scm.com/downloads)中的 Git for Windows；Linux 通常通过发行版包管理器安装。安装后重新打开终端，运行 `git --version` 确认。

### GIT 命令行配置

设置提交身份。示例中的姓名和邮箱应替换为自己的信息，公开仓库可使用托管平台提供的隐私邮箱：

```sh
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

公司与个人项目需要不同身份时，可在仓库内去掉 `--global`，设置该仓库的配置。

`core.ignoreCase` 由 Git 在初始化或克隆时根据文件系统探测，并不是所有系统都默认忽略大小写。不要为“让文件名大小写生效”而全局设为 `false`；在不区分大小写的文件系统上，这可能产生非预期行为。仅修改文件名大小写时，可在仓库中通过一个尚不存在的临时名字分两步操作：

```sh
git mv example.js temporary-name.js
git mv temporary-name.js Example.js
git status
```

团队仍应统一命名，并留意 Linux CI 与本地文件系统的差异。参考 [Git 配置说明](https://git-scm.com/docs/git-config#Documentation/git-config.txt-coreignoreCase)。

### GUI 程序安装

VS Code 内置源代码管理界面，也可以选择 [Sourcetree](https://www.sourcetreeapp.com/)、[Fork](https://git-fork.com/) 或 Windows 上的 [TortoiseGit](https://tortoisegit.org/)。功能、收费和认证方式以当前官方说明为准；GUI 与命令行都应遵循团队约定，不必统一强制创建合并提交。

## GIT 的使用

### 分支问题

默认分支可能是 main、master 或其他名称，以仓库为准。Git flow、GitHub flow 和主干开发等协作方式各有适用场景，`dev` 不是 Git 规定的默认开发分支。

小型项目可从最新默认分支创建功能分支，通过 PR 合并。以下示例假设本地已有 main、工作区没有未提交改动，且团队使用快进更新：

```sh
git switch main
git pull --ff-only
git switch -c fix/readme-link
# 编辑文件，然后检查并暂存具体文件
git diff
git add README.md
git diff --staged
git commit -m "docs: correct README link"
git push -u origin fix/readme-link
```

分支名使用 `fix/readme-link`、`feature/user-profile` 等易读形式是一种团队约定。Git 对引用名称有自己的[限制](https://git-scm.com/docs/git-check-ref-format)，并非语言层面禁止所有中文分支名。

一次提交尽量对应一个清晰改动，先检查暂存内容再提交。不要把密钥、个人配置或生成依赖目录混入提交；`.gitignore` 不会自动移除已经跟踪的文件。

### 撤销与同步

- 只取消暂存可用 `git restore --staged 文件名`，它保留工作区改动。
- `git restore 文件名` 会丢弃对应的未暂存改动，执行前应确认差异。
- 已共享的提交需要撤销时，通常优先使用 `git revert 提交号` 生成反向提交。
- `reset --hard`、清理未跟踪文件和强制推送都可能导致内容丢失，理解影响并遵循团队流程后再使用。

远程认证按平台说明选择 HTTPS 凭据或 SSH；GitHub 的 HTTPS Git 操作不使用账户密码。参考 [GitHub 认证说明](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github)。

### 代码提交日志

[约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/)是一种可选的协作规范，不是 Git 的语法要求。团队采用时应统一配置与含义。

#### 结构

```text
<类型>[可选的作用域][可选的 !]: <描述>

[可选的正文]

[可选的脚注]
```

例如 `feat(search): support keyboard navigation`。冒号后跟一个空格，正文和脚注按规范分隔。

#### 类型说明

规范定义 `feat` 表示功能、`fix` 表示修复，并允许团队使用其他类型，例如 `docs`、`test`、`build`、`ci`、`perf`、`refactor` 和 `chore`。常用配置中的 `style` 通常指格式调整；修复页面样式缺陷仍可使用 `fix`，不应仅因修改 CSS 就归为 `style`。

#### 破坏性变更

在类型或作用域后添加 `!`，或者在脚注中使用 `BREAKING CHANGE: 描述`，都可以标记破坏性变更；两者可同时使用，但规范没有要求必须同时写。`BREAKING CHANGE` 不限于正文的第一行。

```text
feat(api)!: rename response field

BREAKING CHANGE: replace user_name with display_name in API responses
```

## 基于 Git 提供源码托管的服务

[GitHub](https://github.com/)、[GitLab](https://gitlab.com/)、[Bitbucket](https://bitbucket.org/) 等提供代码托管、评审与自动化能力，套餐和平台支持会变化。按团队协作、访问条件、部署需求和数据管理要求选择，不能假定所有免费套餐都包含相同功能。

继续阅读 [GitHub CI/CD](/frontend-guideline/cicd/github/)与 [GitLab CI/CD](/frontend-guideline/cicd/gitlab/)。
