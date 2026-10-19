# 前端学习指引

本项目内容已整理为小书，请前往 <https://app.evecalm.com/frontend-guideline/> 访问。

项目持续完善中，如有问题欢迎[提交 issue](https://github.com/oe/frontend-guideline/issues)，也欢迎[贡献内容](https://github.com/oe/frontend-guideline/pulls)。

> 本项目使用 [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) 构建。

## 环境要求

- Node.js 22.22.0 或更高版本，推荐 Node.js 24 LTS（与 `.nvmrc` 和 CI 一致）。使用 nvm 的开发者可以运行 `nvm install && nvm use`。
- pnpm 10.34.7，版本固定在 `package.json` 的 `packageManager` 字段中。

```bash
npm install -g pnpm@10.34.7
pnpm install --frozen-lockfile
pnpm dev
```

打开终端提示的地址，默认是 <http://localhost:4321/frontend-guideline/>。

## 内容维护

文档存放在 `src/content/docs/`，支持 `.md` 和 `.mdx`。每页应包含 `title`、描述正文内容的 `description`，以及可选的 `sidebar.order`：

```yaml
---
title: 页面标题
description: 页面内容简介
sidebar:
  order: 1
---
```

- 同一目录下的页面按侧边栏顺序组织，新增内容尽量附上官方参考资料。
- 站内链接使用包含部署前缀的页面路径，例如 `/frontend-guideline/dev/init/`；不要链接到源码的 `.md` 文件。
- 图片使用相对路径，提供描述图片内容的 `alt` 文本；独立图片的说明会显示在图下。
- 保留现有页面路径，避免破坏读者收藏的链接。标题锚点变更后需要同步更新引用。

## 验证与构建

```bash
pnpm check       # Astro、内容 schema 和 TypeScript 检查
pnpm test        # 链接检查器的回归测试
pnpm build       # 类型检查、静态构建、站内链接与锚点检查
pnpm preview     # 预览 dist/ 中的构建结果
```

构建完成后也可单独运行 `pnpm check:links`。检查覆盖生成页面中的站内链接、锚点和本地脚本、样式、图片，不检查外部网站是否可用。

提交前请运行 `pnpm test`、`pnpm build`，并预览改动页面。依赖更新时同时提交 `package.json` 和 `pnpm-lock.yaml`；Astro 与 Starlight 应一起检查兼容性。原生依赖的安装脚本仅允许 `package.json` 中列出的 `@parcel/watcher`、`esbuild` 和 `sharp`。

## 自动化与部署

GitHub Actions 对 main 的推送和 PR 执行锁文件安装与完整构建。只有 main 分支的非 PR 运行会将验证通过的 `dist/` 发布到 `gh-pages`，延续现有的分支部署方式。仓库 Pages 设置应使用 `gh-pages` 分支的根目录。

网站配置使用 `site: https://app.evecalm.com` 与 `base: /frontend-guideline/`。修改部署地址时，需要同步检查内容链接及 `post-a11y.js` 的引用路径。

Dependabot 每月检查 npm 依赖与 GitHub Actions 的更新，Astro 相关包分组提交以便一起验证。

## 项目结构

```text
.
├── .github/workflows/ci.yml  # 验证与部署
├── public/                  # 原样复制的静态资源
├── script/check-links.mjs   # 构建产物站内链接检查
├── src/
│   ├── assets/              # 自定义样式
│   ├── components/          # Starlight 组件覆盖
│   ├── content/docs/        # 文档与文档图片
│   ├── content/i18n/        # 界面文案
│   ├── content.config.ts    # 内容加载器与 schema
│   ├── pages/404.astro      # 自定义未找到页面
│   └── env.d.ts
├── astro.config.ts
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```
