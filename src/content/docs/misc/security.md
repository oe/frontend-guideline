---
title: "安全及优化"
description: "从实际慢页面、权限绕过、XSS 和部署问题出发，给出定位、修复与验证方法，并补齐 SEO 发布检查。"
sidebar:
  order: 2
---

## 性能优化

**先找到最慢的那一段，再改。** 页面主要时间花在图片下载上，就先处理图片；点击后主线程堵住，就录制交互。不要用户还在等一个大请求，你却忙着比较 `for` 和 `forEach` 谁快一点。

| 用户遇到什么 | 看哪里 | 第一轮常见改动 |
| --- | --- | --- |
| 首屏主要内容迟迟不出现 | Network、LCP 对应元素与请求 | 缩小首屏图片、去掉无用阻塞资源，优先发现和加载关键内容 |
| 页面突然上下跳 | CLS、布局偏移记录 | 给图片/视频预留尺寸，避免异步插入内容把正在看的部分顶走 |
| 点按卡住、输入延迟 | Performance 主线程、INP 相关交互 | 拆长任务、减少无用重渲染，把重计算移出交互关键路径 |
| 后续页面每次都重新等资源 | Network 缓存与响应头 | 带内容哈希资源用合适的长期缓存，HTML 使用能及时更新的缓存策略 |
| 加载了大量用不到的代码 | 构建报告、Coverage、Network | 移除没用的依赖，按路由/交互拆分，别把整个图标库塞进首屏 |

先记录一个可重复场景：设备、网络条件、页面和操作顺序。修改一次，在相同条件下复测，再看其他流程有没有受影响。Lighthouse 用来找线索，别把本机跑到 100 分当成所有用户都很快。

参考 [Core Web Vitals](https://web.dev/articles/vitals?hl=zh-cn)、[Chrome Performance](https://developer.chrome.com/docs/devtools/performance/)和 [web.dev 性能课程](https://web.dev/learn/performance/)。有真实用户数据后再看设备、网络和访问路径差异，优先解决影响主要用户的问题。

## 安全

**浏览器里的代码、界面状态和客户端配置都可以被查看或修改。** 页面把按钮藏起来，只完成了交互控制；服务端每次都要验证用户能否执行这个操作。

| 风险 | 常见错误 | 推荐做法与验收 |
| --- | --- | --- |
| XSS | 把评论、URL 参数、接口文本直接拼进 `innerHTML` | 纯文本用 `textContent`；富文本使用成熟清洗方案，并用含标签/事件属性的输入验证 |
| 越权 | 按钮不显示就认为接口安全 | 服务端校验登录身份与资源权限；测试更换资源 ID 后能否访问别人的数据 |
| 泄露密钥 | 把私钥放 `VITE_*` / `PUBLIC_*`，以为 `.env` 不提交就不会泄露 | 服务端密钥只在服务端使用；检查构建产物和真实网络请求，浏览器配置只放可公开值 |
| CSRF | 有 Cookie 登录却只依赖 CORS | 按服务端方案使用 SameSite、CSRF token 等保护，验证跨站请求不能完成敏感操作 |
| 依赖风险 | 审计红了一直忽略，或者只改版本字符串不更新锁文件 | 核对公告和依赖路径，更新后冻结安装、构建与验收，再提交完整锁文件 |

例如只展示用户名时，直接把文本交给 DOM：

```js
function showUsername(element, username) {
  element.textContent = username;
}
```

别因为名字里出现 `<` 就手写一套替换规则再拼 HTML；输出位置不同，规则也不同。富文本、URL 与脚本上下文按 [OWASP XSS 防护指南](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)处理。CSRF 见 [OWASP 指南](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)，CORS 见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/CORS)。

发现真实凭据已进入仓库或日志，先撤销/轮换，再清理泄露位置和排查使用记录；删掉当前文件并不会让历史里的凭据自动失效。

## SEO 与收录

文档、博客、公开产品页需要让读者能找到内容。默认把这几件事做实：

1. **每页有独立标题和描述**，正文的主标题与页面用途对应，别所有页面都只叫「首页」。
2. **canonical 指向正式地址**，包含正确部署前缀；预览域名、参数和重复 URL 不要互相打架。
3. **sitemap 列出应收录的页面**，分享图用可公开访问的绝对 URL。
4. **未知路径返回 HTTP 404**，错误页标记 `noindex`，别把错误地址都返回 200 首页。
5. **部署后检查真实响应**：HTML 已包含主要内容，资源不 404，没有误加 `noindex` 或 `X-Robots-Tag` 阻止正文收录。

本站已把这些基础项接入构建检查。部署在 `/frontend-guideline/` 时，robots.txt 必须由域名根站点提供；放在子目录不会成为爬虫读取的根规则，配置方式见[仓库说明](https://github.com/oe/frontend-guideline#搜索与分享)。

<small>这些是工程验收项；搜索排名与具体收录时间由搜索引擎决定。</small>
