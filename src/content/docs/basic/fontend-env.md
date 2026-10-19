---
title: "前端开发环境的安装配置"
description: "在 Mac 上用 Homebrew、fnm 和 Corepack 配好开发环境；Windows 使用 WSL 2，并给出版本切换、项目启动与故障排查步骤。"
sidebar:
  order: 5
---

目标很明确：**终端能找到正确的 Node 和包管理器，编辑器打开正确的项目目录，同一套命令能在本机和 CI 运行。** 先完成这几件事，再装终端主题。

## 安装编辑器

默认安装 [VS Code](https://code.visualstudio.com/)，再按[工具清单](/frontend-guideline/basic/software/#默认用-vs-code)添加项目真正需要的扩展。编辑本站安装 Astro 扩展，Vue 3 项目安装 Vue (Official)，不要看到「前端扩展包」就整套装进去。

## macOS

1. 按 [Homebrew 官方安装说明](https://docs.brew.sh/Installation)安装 Homebrew，完成它最后输出的 PATH 配置；Apple silicon 默认路径是 `/opt/homebrew`。
2. 安装 Git 和 Node 版本管理器 [fnm](https://github.com/Schniz/fnm)：

```sh
brew install git fnm
```

3. 把下面这一行放进 `~/.zshrc`；已存在就别重复添加。重新打开终端使它生效：

```sh
eval "$(fnm env --use-on-cd --shell zsh)"
```

4. 安装 Node LTS。以下使用本书当前采用的 Node 24：

```sh
fnm install 24
fnm default 24
fnm use 24
node --version
npm --version
```

别再同时用 Homebrew Node、官网安装包、fnm 三套方式管理同一个开发环境。已有项目要求其他版本，就通过 fnm 安装和切换，别卸载整个工具链。

## Windows

新装开发环境推荐 **Windows 11 + WSL 2 + Ubuntu**。先在管理员 PowerShell 中运行：

```powershell
wsl --install -d Ubuntu
```

按提示重启，首次打开 Ubuntu 时创建 Linux 用户。之后的开发命令在 **Ubuntu 终端**执行，别原样粘到 PowerShell。

在 Ubuntu 中安装基础工具和 fnm：

```sh
sudo apt-get update
sudo apt-get install -y curl unzip git
curl -fsSL https://fnm.vercel.app/install -o /tmp/fnm-install.sh
bash /tmp/fnm-install.sh --install-dir "$HOME/.local/share/fnm" --skip-shell
```

把下面两行放进 `~/.bashrc`，然后重新打开 Ubuntu 终端：

```sh
export PATH="$HOME/.local/share/fnm:$PATH"
eval "$(fnm env --use-on-cd --shell bash)"
```

再运行上面的 `fnm install 24`、`fnm default 24`、`fnm use 24` 与版本检查。

VS Code 装在 Windows，安装 WSL 扩展。在 Ubuntu 终端中进入项目目录，再运行 `code .`；编辑器窗口应显示正在连接 WSL。

```sh
mkdir -p ~/projects
cd ~/projects
# 在这里克隆你的项目，再进入项目目录。
```

**项目放在 WSL 的 Linux 文件系统内，Node、Git 和 `node_modules` 也都留在 WSL。** 不要在 `/mnt/c/Users/...` 下用 Linux 工具安装整套依赖，更不要在两个系统间共用 `node_modules`。这是微软的[明确性能建议](https://learn.microsoft.com/en-us/windows/wsl/filesystems)。

## 安装 Node.js

新项目选当前受支持的 **LTS**，不要因为下载页出现了更新的 Current 就立刻换。版本时间表见 [Node.js Releases](https://nodejs.org/en/about/previous-releases)。

接手项目按下面顺序看：README → `.nvmrc` / `.node-version` → `package.json` 的 `engines`。fnm 的 `--use-on-cd` 能根据版本文件切换；本书仓库有 `.nvmrc`，安装对应版本后再启动项目。

## 选择包管理器

推荐通过 [Corepack](https://github.com/nodejs/corepack)按项目的 `packageManager` 管理 pnpm / Yarn 版本。Node 25 起不再随发行版附带 Corepack，不能假设每台机器都有它；使用 fnm 安装好 Node 后，显式安装更清楚：

```sh
npm install --global corepack@latest
corepack enable pnpm yarn
corepack --version
```

这是 Corepack 的一种安装方式；如果机器上已单独全局安装 pnpm / Yarn，先按其[安装说明](https://github.com/nodejs/corepack#how-to-install)处理重复的命令入口，别对着 `EEXIST` 直接加 `--force`。

已有项目有锁文件时，使用对应命令：

| 仓库中的锁文件 | 安装命令 |
| --- | --- |
| `package-lock.json` | `npm ci` |
| `pnpm-lock.yaml` | `pnpm install --frozen-lockfile` |
| `yarn.lock`，现代 Yarn 项目 | `yarn install --immutable`；Yarn Classic 按项目说明 |

本书仓库固定 pnpm 10.34.7，进入仓库后 Corepack 会读取这个版本：

```sh
pnpm --version
pnpm install --frozen-lockfile
pnpm dev
```

先确认输出是仓库要求的版本。给自己的**新 pnpm 项目**选好 Node 后，可运行 `corepack use pnpm@latest` 写入当前确切包管理器版本；不要在已有仓库里无意改掉团队的版本约定。

## 在项目内安装开发工具

ESLint、Prettier、TypeScript、Vite 等由项目依赖与 scripts 管理。不要靠全局安装这些工具来修复「这个项目运行不了」。

例如一个使用 npm 的项目，尚未安装 Prettier 时：

```sh
npm install --save-dev prettier
npx prettier --check .
```

pnpm 对应 `pnpm add -D prettier` 与 `pnpm exec prettier --check .`。已有项目先跑它提供的 `lint`、`check`、`test` 等 scripts，避免用另一个版本的工具重新格式化整个仓库。

## 启动与排查

按这个顺序查，通常比重装软件快：

| 现象 | 先检查 |
| --- | --- |
| `node` / `pnpm` 找不到 | 重新打开终端；确认 fnm 初始化行生效，再看 `command -v node` 和 `command -v pnpm` |
| Node 版本不对 | `pwd` 确认目录，查看版本文件，运行 `fnm use` 与 `node --version` |
| `Missing script: dev` | 看 `package.json` 的 `scripts`；可能应运行 `start`，也可能打开了错误目录 |
| 锁文件不匹配 | 确认包管理器版本、分支和 `package.json` 是否同步；别先删锁文件 |
| 原生模块、平台相关报错 | 确认 arm64/x64 和 Windows/WSL 是否混用；按正确环境重新安装依赖 |
| 端口被占用 | 看占用进程，停止旧开发服务，或按工具提示选择另一个端口 |

终端出现本地地址后再打开浏览器；生产上线前执行构建和预览。下一步是[创建第一个项目](/frontend-guideline/dev/init/)。
