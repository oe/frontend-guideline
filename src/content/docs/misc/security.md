---
title: "安全及优化"
description: "理解前端安全边界，并用真实测量指导性能优化。"
sidebar:
  order: 2
---

## 性能优化

先确定页面、用户场景与目标指标，再测量和修改。一次循环的微基准不能代表整个页面的加载或交互表现；优化后应在相同条件下复测，同时确认功能和可读性没有受损。

- [Core Web Vitals](https://web.dev/articles/vitals?hl=zh-cn)：LCP 关注主要内容加载，INP 关注交互响应，CLS 关注布局稳定性。不要继续把已经被 INP 替代的 FID 当作当前核心指标。
- [Chrome Performance 面板](https://developer.chrome.com/docs/devtools/performance/)：定位长任务、渲染与布局开销。
- [web.dev 性能课程](https://web.dev/learn/performance/)：理解图片、字体、缓存和资源加载。

实验室测试有助于定位问题，真实用户数据有助于理解不同设备和网络条件下的体验，两者用途不同。常见工作包括压缩与按需加载资源、为图片预留尺寸、减少长时间占用主线程、按需求配置缓存，而不是无依据地替换每个语法写法。

## 安全

前端代码和打包进去的数据可被用户读取，权限控制与敏感数据处理不能只依赖界面判断。

- **XSS**：不把不受信文本直接作为 HTML 或脚本执行。展示纯文本可使用 `textContent`；确实需要富文本时，使用与场景匹配的清洗方案。CSP 提供额外限制，不能代替正确的输出编码。
- **认证与授权**：隐藏按钮、前端路由拦截或 CORS 都不能代替服务端权限检查；每次敏感操作仍需由服务端验证。
- **CSRF**：使用会由浏览器自动携带的认证凭据时，按服务端方案配置 SameSite、CSRF token 等防护。不能认为 CORS 默认阻止所有跨站请求。
- **凭据**：客户端环境变量和浏览器存储不适合保存服务端密钥。Cookie 的 HttpOnly 可限制脚本读取该 Cookie，但并不自动消除所有 XSS 影响。
- **传输与依赖**：使用 HTTPS，及时更新依赖并核对公告。依赖审计通过不是“应用没有漏洞”的证明，还需检查自己的数据流与权限设计。

参考 [OWASP XSS 防护指南](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)、[CSRF 防护指南](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)与 [MDN CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/CORS)。

进阶可阅读[斯坦福 CS253 Web Security](https://web.stanford.edu/class/cs253/)；课程内容和工具版本应结合当前平台说明核对。
