---
title: "部署"
description: "根据静态网站、服务端应用与接口需求选择托管方案，并验证发布结果。"
sidebar:
  order: 4
---

## 静态网站

纯前端项目或静态生成的网站可以将构建产物部署到静态托管服务，无需单独维护 Node.js 服务器。

- [GitHub Pages](https://docs.github.com/zh/pages)：适合开源文档和项目网站，支持通过 GitHub Actions 构建后发布。
- [Cloudflare Pages](https://developers.cloudflare.com/pages/)：支持 Git 集成与静态资源托管。
- [Netlify](https://docs.netlify.com/)：提供构建部署、预览与重定向配置。
- [Vercel](https://vercel.com/docs)：支持静态站点与多种框架，也可按框架需求使用服务端能力。

免费额度、流量和商用限制会变化，选择前请查看平台的当前定价。本书通过 GitHub Actions 将 `dist/` 发布到 `gh-pages` 分支。

## 服务端应用

如果项目包含服务端渲染、私有 API、数据库访问或后台任务，需要支持相应运行时的平台，例如 [Render](https://render.com/docs)、[Railway](https://docs.railway.com/) 或自行维护的服务器。Astro 等框架通常需要安装与平台匹配的适配器。

后端密钥通过平台环境变量配置；数据库迁移、持久化存储和备份需要单独安排。Heroku 已取消过去的免费 dyno 方案，旧教程中的免费额度不能作为选型依据。

## 发布后检查

完成[构建产物验证](/frontend-guideline/dev/pack/)后，配置域名、HTTPS 与正确的资源前缀。发布后再次验证首页、内部页面直接访问、静态资源和接口请求，并确认 404 页面正常。发现问题时，回退到上一次通过验证的版本。
