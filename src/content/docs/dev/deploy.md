---
title: "部署"
description: "静态站默认选择托管服务，按 GitHub Pages、Cloudflare Workers、Vercel 与服务端需求给出发布、域名和回退方案。"
sidebar:
  order: 4
---

**普通静态站先用托管服务，别为了上线一个前端页面先租服务器、装 Nginx、配一套运维。** 有服务端代码或特殊网络要求时再增加复杂度。

<small>下面是个人选型建议，按普通项目的交付成本排序；价格、额度和区域访问表现会变化，正式选用前用自己的页面与目标用户网络验证。</small>

## 静态网站

| 项目 | 本书推荐 | 配置时抓住这几项 |
| --- | --- | --- |
| 开源项目文档、项目主页 | [GitHub Pages](https://docs.github.com/zh/pages) | CI 构建后发布，确认仓库子路径、Pages 来源和自定义域名 |
| 新建静态站或 SPA，准备使用 Cloudflare | [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) | 产物目录、SPA 回退或 404 规则、域名；不必先写 Worker 服务端代码 |
| Next.js 产品 | [Vercel](https://vercel.com/docs) | 按框架导入，配置运行环境、环境变量和预览部署 |
| 团队已有 Netlify 等托管流程 | [Netlify](https://docs.netlify.com/)等原平台 | 沿用已验证的构建、预览和域名配置，别为换平台重做一切 |

Cloudflare 现在[明确建议新项目选 Workers 而非 Pages](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/)。已有 Pages 项目可以继续维护，不需要仅因名称变化立刻迁移。本书本身仍使用 GitHub Actions → `gh-pages` 的现有发布链路。

第一次部署按这五步走：

1. 在本机跑通生产构建，确认实际产物目录，例如 Vite/Astro 的 `dist/`。
2. 在平台连接仓库，填写项目根目录、Node 版本、构建命令和产物目录。
3. 先用平台提供的预览域名，直接打开详情页并刷新，确认资源和路由都正常。
4. 再绑定正式域名、配置 DNS，等 HTTPS 可用后检查证书与重定向。
5. 保存这次发布对应的提交和平台部署记录，确认能回退上一个版本。

SPA 刷新详情页 404 时，检查入口回退；普通多页静态站的未知路径则应该返回 404。不要为了「不报错」把所有不存在的地址都变成首页。

## 服务端应用

用了 SSR、私有 API 或数据库，先确认平台支持框架要求的运行时和适配器。Next.js 默认先看 Vercel；常规 Node 服务可以从 [Render](https://render.com/docs) 或 [Railway](https://docs.railway.com/)起步。团队已有服务器或容器平台，再按团队流程部署。

正式发布前把下面几项填清楚：启动命令、监听端口、运行时环境变量、数据库连接、迁移步骤、持久化存储。数据别只留在一次部署就会销毁的本地文件系统里。

后端密钥放服务端环境变量，浏览器端只放允许公开的配置。部署成功但接口全失败，先看浏览器请求地址和服务端日志，再检查生产环境是否漏配变量或数据库迁移。

## 发布后检查

打开[构建验收清单](/frontend-guideline/dev/pack/#部署前验证)，在**正式地址**再走一次：首页 → 详情页直接访问 → 表单提交 → 刷新 → 错误页面。手机网络也要试；只在自己的电脑开过首页，不能算发布完成。

故障时先回退到上一份已验证的产物，再排查原因。不要一边让用户继续遇到故障，一边在生产机器上临时改文件。
