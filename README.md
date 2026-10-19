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
- **作者的观点、立场和实践取舍是本书的核心内容。** 编辑应保留判断、理由、具体例子和原文的力度；可以精简重复，不能把明确批评降格成温和提醒，也不能为了压缩篇幅把推导过程删成几条口号。
- 本书坚持：英语阅读与 Google 检索是程序员持续发展的基本功；远离百度，不以低质中文技术社区为学习主线；开发笔记本首推 MacBook，预算有限再看 Windows；主动学习也要保留眼前工作之外的好奇心。更新资料时同步检查首页、基本素养与资源页，不能在其他章节又改成相反的默认建议。
- 区分事实纠错与观点分歧。失效链接、错误语法、过时规格必须修正；不准确的数字和绝对化技术断言应换成准确解释，保留其支撑的作者判断。有争议的评价用 `<small>` 简注个人观点或经验，不能借免责声明把正文改成「各有优势、按需选择」。
- 改写前先读对应章节的历史版本，完成后对照 diff 检查是否删掉了原有观点、例子和个人经验。变更说明应交代实质性的观点调整；未经作者要求，不得用更「中立」的立场替换原意。
- 每章优先给默认选择、具体做法和验收方式；删除只说“按需选择”“注意风险”却不给判断依据的空话。选型主观性强时用 `<small>` 简注个人观点；涉及产品规格、版本和收费的建议标明核对日期并附官方来源。

## 验证与构建

```bash
pnpm check       # Astro、内容 schema 和 TypeScript 检查
pnpm test        # 链接检查器的回归测试
pnpm audit --audit-level moderate  # 检查已知的中危及以上依赖漏洞
pnpm build       # 类型检查、静态构建、站内链接、锚点与 SEO 检查
pnpm preview     # 预览 dist/ 中的构建结果
```

构建完成后也可单独运行 `pnpm check:links` 和 `pnpm check:seo`。链接检查覆盖生成页面中的站内链接、锚点和本地脚本、样式、图片，不检查外部网站是否可用。SEO 检查覆盖生产地址、标题与描述、分享元数据及图片、结构化数据、sitemap 与 404 的禁止收录标记。

提交前请运行 `pnpm test`、`pnpm build`，并预览改动页面。依赖更新时同时提交 `package.json` 和 `pnpm-lock.yaml`；Astro 与 Starlight 应一起检查兼容性。原生依赖的安装脚本仅允许 `package.json` 中列出的 `@parcel/watcher`、`esbuild` 和 `sharp`。

目前对 `postcss-nested@6` 的解析器依赖定向覆盖为 `postcss-selector-parser >=7.1.6`，修复 [GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf)。已使用 postcss-nested 6.2.0 的上游 69 个用例和本站构建验证兼容性，生成的 CSS 与覆盖前一致。上游 Expressive Code 升级到已修复的依赖链后，应移除这项临时覆盖并重新运行审计与构建。

## 搜索与分享

Starlight 生成每页 canonical、描述与 sitemap；`src/route-data.ts` 补充站点/文章 JSON-LD、中文 Open Graph locale 和分享图，修正首页重复标题。404 页面使用 `noindex, follow`，并且不进入 sitemap。

分享图为 `public/social-card.png`（1200 × 630），源文件是 `src/assets/social-card.svg`。修改 SVG 后，在安装了 Noto Sans CJK SC 字体的环境中重新生成并提交 PNG：

```bash
node --input-type=module -e "import sharp from 'sharp'; await sharp('src/assets/social-card.svg').png().toFile('public/social-card.png');"
```

项目部署在子路径，`/frontend-guideline/robots.txt` 不会被搜索引擎作为站点规则读取。需要由根站点在 **https://app.evecalm.com/robots.txt** 中保留现有规则并追加：

```text
Sitemap: https://app.evecalm.com/frontend-guideline/sitemap-index.xml
```

也可以在 Google Search Console 或 Bing Webmaster Tools 中提交该 sitemap；需要相应站点的管理权限。部署后应确认未知路径返回 HTTP 404，正文页与分享图返回 200，且未被域名根目录的 robots 规则或 CDN 的 `X-Robots-Tag` 阻止收录。

## 自动化与部署

GitHub Actions 对 main 的推送和 PR 执行锁文件安装、依赖漏洞审计与完整构建。只有 main 分支的非 PR 运行会将验证通过的 `dist/` 发布到 `gh-pages`，延续现有的分支部署方式。仓库 Pages 设置应使用 `gh-pages` 分支的根目录。

网站配置使用 `site: https://app.evecalm.com` 与 `base: /frontend-guideline/`。修改部署地址时，需要同步检查内容链接、`post-a11y.js` 的引用路径、SEO 检查器的预期生产地址与根站点的 sitemap 声明。

Dependabot 每月检查 npm 依赖与 GitHub Actions 的更新，Astro 相关包分组提交以便一起验证。

## 项目结构

```text
.
├── .github/workflows/ci.yml  # 验证与部署
├── public/                  # 原样复制的静态资源
├── script/check-links.mjs   # 构建产物站内链接检查
├── script/check-seo.mjs     # 元数据、分享图与 sitemap 检查
├── src/
│   ├── assets/              # 自定义样式
│   ├── components/          # Starlight 组件覆盖
│   ├── content/docs/        # 文档与文档图片
│   ├── content/i18n/        # 界面文案
│   ├── content.config.ts    # 内容加载器与 schema
│   ├── pages/404.astro      # 自定义未找到页面
│   ├── route-data.ts        # 页面 SEO 元数据
│   └── env.d.ts
├── astro.config.ts
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```
