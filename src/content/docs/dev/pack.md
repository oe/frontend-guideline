---
title: "打包及发布"
description: "理解生产构建、静态资源路径与环境变量，并在部署前验证构建产物。"
sidebar:
  order: 3
---

**发布的是检查过的生产产物。** 先在本地预览它，再让 CI 用锁文件重复构建；不要把开发服务器直接当线上服务。

## 开发服务与生产构建

开发服务器提供热更新和调试能力。生产构建则会处理模块依赖、转换代码、压缩资源并生成部署产物。Vite、Astro 等工具通常输出到 `dist/`，其他框架可能使用不同目录，应以项目配置为准。

```sh
# npm 项目，仓库中应已有 package-lock.json
npm ci
npm run build
npm run preview
```

pnpm 项目对应运行 `pnpm install --frozen-lockfile`、`pnpm build`、`pnpm preview`。这些命令必须已在 `package.json` 中配置；预览服务用于本地验收。

## 检查构建配置

- **部署路径**：部署到域名根目录和 `/project/` 子目录时，资源路径不同。Vite 使用 `base`；Astro 使用 `site` 与 `base`。应通过工具配置处理路径，避免手工修改产物。
- **环境变量**：构建时读取的值通常会被写入产物，修改后需要重新构建。Vite 的 `VITE_*`、Astro 的 `PUBLIC_*` 变量会暴露给浏览器，不能存放密码、私钥或服务端令牌。
- **路由**：普通静态网站为每个路径输出 HTML；使用 history 路由的单页应用通常需要服务端配置回退到入口 HTML。服务端渲染项目还需要对应运行时，不能只上传静态资源目录。
- **浏览器兼容性**：构建工具的语法转换并不自动补齐所有 Web API，使用新功能时仍需确认目标浏览器支持情况。

参考 [Vite 生产构建](https://cn.vite.dev/guide/build.html) 与 [Astro 部署指南](https://docs.astro.build/zh-cn/guides/deploy/)。

## 部署前验证

1. 运行项目已有的类型检查、代码检查、测试与生产构建，确认命令正常退出。
2. 预览构建产物，直接打开并刷新内部页面，检查页面路由、图片、样式与脚本的路径。
3. 检查浏览器控制台和网络面板，确认没有运行时错误、404 请求或错误的接口环境配置。
4. 验证手机布局、键盘导航、表单及关键交互；不要只查看首页。
5. 记录发布对应的 Git 提交与构建结果，便于故障时回退到上一份可用产物。

## 失败时先查什么

| 现象 | 先查 |
| --- | --- |
| 本地能跑，CI 找不到模块 | 导入路径大小写、是否漏提交文件、Node 和包管理器版本 |
| 上线后脚本或样式 404 | 构建的 `base` 与真实部署路径，打开 HTML 看实际资源 URL |
| 刷新详情页 404 | SPA 的入口回退；多页站则查有没有生成该路径 |
| 改了环境变量没有效果 | 变量是在构建时还是运行时读取，是否需要重新构建发布 |
| 发布后仍看到旧页面 | 部署记录是否对应本次提交、HTML/CDN/Service Worker 是否缓存旧版本 |

记录具体失败命令和第一条相关错误，再修复；反复删依赖和重试构建不能代替定位。

## 本书文档站的构建

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm preview
```

`pnpm build` 依次进行 Astro 检查、静态构建、站内链接与 SEO 检查，覆盖页面、锚点、本地资源、canonical、分享元数据与 sitemap。预览地址为 `http://localhost:4321/frontend-guideline/`，站点部署时保留 `/frontend-guideline/` 前缀。

GitHub Actions 在 PR 中执行同样的构建，main 更新后才发布到 `gh-pages`。继续阅读[部署](/frontend-guideline/dev/deploy/)选择托管方式。
