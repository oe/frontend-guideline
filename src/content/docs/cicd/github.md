---
title: "Github 上的 CI/CD"
description: "GitHub 是目前最流行的代码托管平台之一，前端开发者在 GitHub 上进行项目开发和维护非常普遍"
sidebar:
  order: 2
---

GitHub 是目前最流行的代码托管平台之一，前端开发者在 GitHub 上进行项目开发和维护非常普遍。为了保证项目的高质量和自动化，GitHub 自带的 CI/CD（持续集成与持续部署）功能为开发者提供了极大的便利。本篇文章将以前端开发为视角，详细介绍如何使用 GitHub 上的 CI/CD 功能，帮助你更加高效地管理和发布你的项目。

## 如何开启 GitHub 自带的 CI

GitHub 自带的 CI 功能是通过 GitHub Actions 实现的。GitHub Actions 允许你在代码变更时触发自动化流程，帮助你实现代码的持续集成。

1. **创建 GitHub Actions 配置文件**：
   要开启 GitHub 自带的 CI，你需要在项目的根目录下创建一个 GitHub Actions 配置文件，通常放在 `.github/workflows` 目录下。例如，可以创建一个名为 `ci.yml` 的文件：

   ```yaml
   name: Node.js CI

   on:
     push:
       branches:
         - main
     pull_request:
       branches:
         - main

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout repository
           uses: actions/checkout@v2

         - name: Setup Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '14'

         - name: Install dependencies
           run: npm install

         - name: Run tests
           run: npm test
   ```

2. **提交并触发工作流**：
   创建好配置文件后，将其提交到 GitHub 仓库中。每当有新的代码推送到指定分支时，GitHub Actions 将自动执行该工作流，完成测试等任务。

> [GitHub Actions 官方文档](https://docs.github.com/en/actions) 提供了详细的指导，帮助你了解如何编写和配置工作流。

## 如何编写 CI

编写 CI 主要包括以下几个部分：

1. **事件触发器**：定义在什么情况下触发工作流，比如 `push` 到某个分支，或者新建 `pull request`。上面的示例中，我们使用了 `push` 和 `pull_request` 事件来触发 CI。

2. **运行环境**：指定运行环境，如 `ubuntu-latest`、`windows-latest` 等。通常前端项目会选择 Linux 环境，因为它速度快且兼容性好。

3. **步骤（steps）**：在 `jobs` 中定义每个步骤，比如代码检出（checkout）、安装依赖、运行测试等。每个步骤可以是执行一个 Shell 命令，也可以是调用一个 GitHub Action。

## 注意事项

1. **权限配置**：
   - GitHub Actions 默认会自动配置一些权限来拉取代码，但对于涉及到推送操作或者访问其他敏感资源时，你可能需要配置额外的权限。
   - 可以使用 `secrets` 存储敏感信息，比如 Token、API 密钥等，以避免将敏感信息硬编码到配置文件中。GitHub Actions 可以通过 `${{ secrets.YOUR_SECRET_NAME }}` 来访问这些密钥。

2. **Token 使用**：
   - GitHub 提供了默认的 `GITHUB_TOKEN`，它可以用于在工作流中进行认证，但其权限相对受限。如果需要更高级的权限，可以使用 [GitHub Personal Access Token](https://github.com/settings/tokens)。

3. **并发限制**：
   - 免费的 GitHub 账户在使用 GitHub Actions 时有并发限制（目前是 20 个并发任务），并且每月有一定的免费运行时间限制（2000 分钟）。超出部分需要付费。

## CD：如何发布前端应用

### 1. 发布静态网站

#### 使用 GitHub Pages
GitHub 提供了 GitHub Pages 功能，可以非常方便地将静态网站部署到 GitHub 上。

1. **开启 GitHub Pages**：在你的项目中，进入 `Settings` -> `Pages`，选择要发布的分支和目录（比如 `/root` 或 `/docs`）。
2. **自动化发布**：可以通过 GitHub Actions 来自动发布构建后的静态网站到 GitHub Pages。例如：

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches:
         - main

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout repository
           uses: actions/checkout@v2

         - name: Install dependencies and build
           run: |
             npm install
             npm run build

         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./build
   ```

#### 使用第三方平台
- **Netlify**：[Netlify](https://www.netlify.com/) 提供免费的静态网站托管服务，且与 GitHub 集成良好。免费版有 100GB 的带宽和 300 个构建分钟数的限制。
- **Vercel**：[Vercel](https://vercel.com/) 也提供免费的静态托管服务，适合前端开发者，特别是基于 Next.js 的项目，免费版支持无限制的团队成员和一定的请求限制。

### 2. 发布带后台服务的应用
对于带后台服务的应用，可以使用以下平台：
- **Heroku**：支持全栈应用的托管，免费版提供 550 小时/月的应用运行时间，不过有休眠机制。
- **Render**：[Render](https://render.com/) 支持前后端的应用托管，免费版支持静态站点和 Web 服务的有限部署。
- **AWS、GCP、Azure**：这些平台也可以用于托管前端与后台服务，但相对复杂，并且免费额度较低。

### 3. 发布 NPM 包

要发布 npm 包，可以通过 GitHub Actions 实现持续发布：

1. **在 npm 上创建账户**，并在本地登录：
   ```sh
   npm login
   ```

2. **创建 Token 并保存到 GitHub Secrets**。

3. **GitHub Actions 发布配置**：
   ```yaml
   name: Publish Package

   on:
     push:
       tags:
         - 'v*.*.*'

   jobs:
     publish:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout repository
           uses: actions/checkout@v2

         - name: Setup Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '14'
             registry-url: 'https://registry.npmjs.org'

         - name: Install dependencies
           run: npm install

         - name: Publish package
           run: npm publish
           env:
             NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
   ```

### 4. 发布客户端应用
对于客户端应用发布，可以通过 GitHub Releases 功能，将构建好的安装包（如 `.exe`、`.dmg` 等）上传到 GitHub Release 中，方便用户下载。

**示例**：
1. **创建 Release**：可以通过 GitHub 网站直接创建 Release，或者通过 GitHub Actions 实现自动化发布。
2. **上传附件**：使用 `actions/upload-release-asset` Action 来自动上传构建好的安装包。

```yaml
name: Release Client

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Build client
        run: |
          npm install
          npm run build-client

      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false

      - name: Upload Release Asset
        uses: actions/upload-release-asset@v1
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: ./dist/client-app.exe
          asset_name: client-app.exe
          asset_content_type: application/octet-stream
```

## 第三方 CI 服务与 GitHub 集成
除了 GitHub Actions，很多第三方 CI 服务也可以与 GitHub 集成，例如：

- **Travis CI**：[Travis CI](https://travis-ci.com/) 是一个常用的 CI 服务，免费版支持公共项目。
- **CircleCI**：[CircleCI](https://circleci.com/) 也提供与 GitHub 的集成，适合公共项目。
- **Jenkins**：可以通过 GitHub Webhooks 集成，但需要自己维护 Jenkins 服务器。

这些第三方 CI 服务通常适用于更复杂的 CI 需求，或者当 GitHub Actions 的免费额度不够用时，可以考虑使用它们。

## 结论
GitHub 提供了强大且方便的 CI/CD 功能，通过 GitHub Actions，前端开发者可以轻松地实现代码的自动化测试、构建和发布。而结合第三方平台，前端项目可以更加灵活地完成部署，从而提高开发效率并保证软件的质量。希望这篇文章能帮助你更好地掌握 GitHub 上的 CI/CD 实践。


