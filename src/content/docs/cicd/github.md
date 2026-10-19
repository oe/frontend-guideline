---
title: "GitHub 上的 CI/CD"
description: "使用 GitHub Actions 验证前端项目，并将验证与部署权限分开。"
sidebar:
  order: 2
---

GitHub Actions 可以在提交、PR 或打标签时运行安装、检查、测试和构建。持续集成（CI）验证改动，持续部署（CD）发布验证通过的产物。

## 创建 CI 工作流

在仓库的 `.github/workflows/ci.yml` 中添加配置。以下示例用于已有 `package-lock.json` 的 npm 项目：

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
        with:
          persist-credentials: false
      - uses: actions/setup-node@v7
        with:
          node-version: '24'
          cache: npm
      - run: npm ci
      - run: npm test --if-present
      - run: npm run build
```

`npm ci` 根据锁文件安装依赖；`--if-present` 允许没有 test 脚本的项目跳过该命令。如果测试是项目的必需检查，应使用 `npm test` 并确保脚本存在。类型检查与代码检查也应按项目 scripts 加入工作流。

pnpm 项目应先使用 `pnpm/action-setup`，通过 `packageManager` 固定版本，再用 `actions/setup-node` 缓存 pnpm，执行 `pnpm install --frozen-lockfile`。缓存加速下载，不应替代每个任务中的依赖安装。

本书仓库的实际配置见 [ci.yml](https://github.com/oe/frontend-guideline/blob/main/.github/workflows/ci.yml)。

## 部署静态网站

GitHub Pages 支持两种常见发布方式：将构建结果推送到专用分支，或使用 Pages 官方 Actions 上传并部署。两者需要对应的仓库 Pages 设置，选择一种即可。

本书沿用 `gh-pages` 分支部署。在仓库 `Settings → Pages` 中选择从 `gh-pages` 的根目录发布。其自动化流程是：

1. PR 和 main 更新都执行锁文件安装、Astro 检查、静态构建和站内链接检查。
2. main 的构建成功后，上传 `dist/` 作为本次运行的产物。
3. 单独的部署任务下载这份产物，通过 `peaceiris/actions-gh-pages@v4` 发布到 `gh-pages`。
4. 仅部署任务声明 `contents: write`，PR 不执行该任务。

部署路径要与构建配置一致。本书使用 `/frontend-guideline/` 前缀；普通单页应用还需根据托管平台配置路由回退。发布前的检查见[打包及发布](/frontend-guideline/dev/pack/)。

如果选择[官方 Pages 工作流](https://docs.github.com/zh/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)，应在 Pages 设置中选择 GitHub Actions，并配置 `pages: write`、`id-token: write` 与部署环境等要求。

## 权限与触发条件

- 使用默认只读权限，仅给需要部署或创建 Release 的任务增加相应写权限。
- PR 可能包含外部贡献者的代码。验证工作流使用 `pull_request`；不要用拥有写权限或密钥的 `pull_request_target` 执行 PR 中的代码。
- 部署限定 main 或受保护的标签，并通过 `needs` 依赖构建结果。使用 concurrency 避免旧构建覆盖新版本。
- Token 和私钥放在 Actions Secrets 中，不写入源码或构建日志。面向浏览器的环境变量仍会公开到产物中。
- 第三方 Actions 应核对来源和更新说明；需要更严格的供应链控制时，可固定到审查过的完整提交 SHA。

## 发布 npm 包

npm 包发布与静态站点部署是独立流程。优先参考 [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/)，在 npm 配置受信任仓库、工作流与环境后，通过 OIDC 发布，避免维护长期 Token。

工作流通常由受保护的版本标签触发，依次安装锁定依赖、检查、测试、构建和 `npm publish`。版本号、包内容（`npm pack --dry-run`）、访问权限与发布来源都应在发布前确认。使用 Token 的项目还需按 npm 当前要求设置有效期与发布权限。

## 发布客户端安装包

可以使用 GitHub CLI 上传构建产物到 GitHub Releases。以下步骤应接在实际构建步骤之后，且只在版本标签事件中执行；把文件名替换为项目产出的安装包路径。

```yaml
permissions:
  contents: write

# 放入已有 job 的 steps 中
steps:
  # 检出、安装依赖、构建安装包……
  - name: Create release and upload installer
    env:
      GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      GH_REPO: ${{ github.repository }}
      RELEASE_TAG: ${{ github.ref_name }}
    run: gh release create "$RELEASE_TAG" dist/client-app.exe --verify-tag --generate-notes
```

`gh release create` 会发布 Release，重复发布已有标签前需明确是更新附件还是创建新版本。旧的 `actions/create-release` 与 `actions/upload-release-asset` 已归档，不再作为新工作流的推荐方案。

## 参考资料

- [GitHub Actions 官方文档](https://docs.github.com/zh/actions)
- [GitHub Pages 官方文档](https://docs.github.com/zh/pages)
- [GitHub Actions 安全使用参考](https://docs.github.com/en/actions/reference/security/secure-use)
- [GitHub CLI release 命令](https://cli.github.com/manual/gh_release)

服务的免费额度会变化，选型时查看当前定价；其他托管选择见[部署](/frontend-guideline/dev/deploy/)。
