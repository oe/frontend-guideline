---
title: "Git 的安装及使用"
description: "理解 Git 的本地与远程操作、分支协作、文件大小写和约定式提交。"
sidebar:
  order: 6
---

**每个可说明的小改动做一次提交，推送前看 diff。** Git 在本地保存历史，GitHub、GitLab 等托管平台负责交换与协作；本地提交不会自动备份到远程。

## GIT 基本概念及常用命令

### 基本概念

- **工作区**：当前正在编辑的文件。
- **暂存区**：准备包含在下次提交中的内容。
- **提交**：记录文件快照及其历史关系。
- **分支**：可随新提交移动的引用；标签常用于标记版本。
- **远程仓库**：用于交换提交的其他仓库，本地提交不会自动上传。

参考 [Pro Git 简体中文译本](https://github.com/progit/progit2-zh)。

### 常用命令

**日常提交、看 diff、检查分支和处理合并，本书优先推荐 GUI。** 把改动和历史直接摆出来，比凭记忆敲命令更容易检查，也没必要为了显得专业而只用终端。命令行仍要学，至少能看状态、读差异、理解正在执行什么；看不懂效果的命令不要运行，尤其是搜索结果里的重置、清理与强制推送。

以下命令用于查看状态，不会修改工作区：

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

默认用 Homebrew 运行 `brew install git`，再用 `git --version` 检查。已经通过系统命令行工具安装也可以继续用，重点确认终端实际执行的是哪一个版本。

#### Windows & Linux

按本书推荐的 WSL 开发方式，在 Ubuntu 里运行 `sudo apt-get install git`，代码和 Git 操作都留在 WSL。必须用原生 Windows 工作流时再装 [Git for Windows](https://git-scm.com/downloads)。安装后用 `git --version` 确认，别让两个环境交替改同一份依赖目录。

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

图形客户端本书推荐 [Sourcetree](https://www.sourcetreeapp.com/)。把提交历史、分支和文件差异放在图形界面里看，对理解 Git 很有帮助，也方便在提交前认真检查自己改了什么。

已经习惯 VS Code 内置的源代码管理界面，也可以继续用；其他选择有 [Fork](https://git-fork.com/) 和 Windows 上的 [TortoiseGit](https://tortoisegit.org/)。先把提交、分支和合并的含义弄清楚，别把折腾客户端当成学习 Git。

GUI 与命令行都应遵循团队约定，不必统一强制创建合并提交。

## GIT 的使用

### 分支问题

**小项目默认用 main + 短期功能分支 + PR。** 合并后继续从更新过的 main 开新分支，别为一个人维护的练习项目先搭五层长期分支。加入已有团队则遵守它的发布流程；默认分支叫什么，以仓库实际配置为准。

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

分支名用 `fix/readme-link`、`feature/user-profile` 这种能看懂任务的形式，避免只叫 `test` 或 `new`。名称约束见 [Git 引用规则](https://git-scm.com/docs/git-check-ref-format)。

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

个人项目和开源项目，本书优先推荐 [GitHub](https://github.com/)。把代码、README、issue 和 PR 放在一起维护，便于别人了解、使用和参与你的项目；认真维护一个可运行、有说明、有提交记录的项目，也比只列一串「熟悉某某技术」更能展示你的能力。

团队已经使用 [GitLab](https://gitlab.com/)、[Bitbucket](https://bitbucket.org/) 等平台，就先按团队流程协作。需要自建托管或特定部署能力时再比较方案，选择套餐前核对当前功能与额度。

继续阅读 [GitHub CI/CD](/frontend-guideline/cicd/github/)与 [GitLab CI/CD](/frontend-guideline/cicd/gitlab/)。
