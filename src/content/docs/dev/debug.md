---
title: "调试工具及调试方法"
description: "使用浏览器开发者工具定位界面、网络和脚本问题，并在真实手机上验证。"
sidebar:
  order: 2
---

## 浏览器开发者工具

Chrome、Edge、Firefox 和 Safari 均内置开发者工具。Chrome 中可右键选择“检查”，或使用 Windows/Linux 的 `Ctrl + Shift + I`、macOS 的 `Command + Option + I` 打开。

- **Elements / 元素**：检查 DOM、计算后的 CSS、布局和可访问性信息。这里修改的页面内容通常不会写回源码。
- **Console / 控制台**：查看错误堆栈与日志，执行简短 JavaScript。先定位最早出现的相关错误。
- **Sources / 源代码**：设置断点、单步执行、查看作用域与调用栈。Source Map 可以将构建后的代码映射回源码。
- **Network / 网络**：查看请求状态码、响应内容、缓存与耗时。排查失败时同时检查请求地址、方法和响应，而非只看状态码。
- **Performance / 性能**：录制用户操作，定位长任务、布局抖动与渲染开销，修改后按相同操作重新测量。

参考 [Chrome DevTools 官方文档](https://developer.chrome.com/docs/devtools/)与 [Firefox 开发者工具文档](https://firefox-source-docs.mozilla.org/devtools-user/)。

## 一个基本排查流程

1. 记录能稳定复现问题的页面、操作、浏览器和数据条件。
2. 查看控制台与失败的网络请求，区分脚本错误、接口错误和资源路径错误。
3. 使用元素检查或断点缩小范围，验证假设后再改代码。
4. 在相同条件下重试，并检查相关页面和移动端是否受影响。
5. 发布前预览生产构建。开发服务正常不代表构建后的资源路径与环境变量一定正确。

## 调试 Android 上的 Chrome

1. 按设备说明开启 Android 开发者选项和 USB 调试。
2. 使用 USB 连接电脑，在手机上确认允许调试。
3. 在电脑 Chrome 地址栏打开 `chrome://inspect/#devices`，开启设备发现。
4. 在手机上打开需要调试的页面，找到对应条目并点击 **Inspect**。

设备无法发现时，检查数据线、授权状态与系统驱动。具体步骤见 [Android 远程调试指南](https://developer.chrome.com/docs/devtools/remote-debugging/)。

## 调试 iPhone / iPad 上的 Safari

推荐使用 macOS Safari 的 Web Inspector：

1. 在 iPhone/iPad 的 Safari 高级设置中开启 Web 检查器（不同系统版本的设置入口可能不同）。
2. 连接并信任 Mac，在 Mac Safari 的设置中启用开发者功能。
3. 打开手机上的页面，从 Mac Safari 的“开发”菜单选择设备与页面。

参考 [WebKit Web Inspector 入门](https://webkit.org/web-inspector/enabling-web-inspector/)。旧教程中的 Chrome 与 WebKit 调试代理方案可能受协议和系统版本限制，不宜直接照搬。浏览器中的设备模拟不能替代真机对触摸、键盘和 Safari 行为的验证。

## 共享本地开发服务

[localtunnel](https://github.com/localtunnel/localtunnel) 可以为本地服务生成临时访问地址，方便远程协作或手机访问：

```sh
npx localtunnel --port 4321
```

使用前确保本地服务已经启动；子目录部署的项目还需在临时域名后保留路径前缀。隧道会将本地服务开放给可访问该地址的人，测试完应停止隧道，不要通过它暴露管理后台、真实密钥或私人数据。
