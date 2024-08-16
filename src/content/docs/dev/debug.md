---
title: "调试工具及调试方法"
description: "## Chrome Dev Tools (跨平台) :thumbsup:"
sidebar:
  order: 2
---

# 调试工具及调试方法

## Chrome Dev Tools (跨平台) :thumbsup:

Chrome Dev Tools(Google 开发者工具)已内置在 Chrome 浏览器中, 可以方便的审查 HTML 元素, 查看源码, 修改调试样式, 调试 js 代码(支持断点调试) , 记录网络请求, 监控页面执行性能等功能.

- 浏览器下载: <http://www.google.com/chrome/>
- 官方文档：<https://developer.chrome.com/devtools>
- 视频教程：<http://discover-devtools.codeschool.com/>
- 中文翻译文档(部分可能已过时):<https://leeon.gitbooks.io/devtools/content/learn_basic/overview.html>
- [Chrome Dev Tools 使用技巧](http://gold.xitu.io/entry/5642a9ee60b27f7a01823288)

### 使用 Chrome Dev Tools 调试 android 上打开的页面

在电脑上使用 Chrome (版本不小于 32) 可调试 android (版本不小于 4.0)上 打开的 web 页面，详细开参阅[官方文档](https://developers.google.com/web/tools/chrome-devtools/debug/remote-debugging/remote-debugging).

使用步骤如下(先保证 android 和 chrome 版本满足要求):

1. 开启 android 的开发者调试功能: 进入 设置 -> 开发者选项 -> 启用 USB 调试。由于国产定制的 android UI 乱七八糟，设置各不一样，如若找不到相关设置项，请自行搜索解决
2. 使用 USB 链接电脑和手机, 并在手机弹出的对话框上信任电脑，即允许电脑调试
3. 在电脑 chrome 上打开地址 [chrome://inspect/](chrome://inspect/)(需手动拷贝然后复制到地址栏打开), 在该页面即可看到已连接的手机及手机上打开的网页，点击 **Inspect** 即可调试

   > 如果你在大陆，电脑网络未进行特殊设置，那么毫无意外，点开 Inspect 后你会看到一个空白页面，这是因为调试用到的代理页面 [chrome-devtools-frontend.appspot.com](chrome-devtools-frontend.appspot.com) 被屏蔽所致，想办法解除屏蔽即可正常调试。

### 使用 Chrome Dev Tools 调试 iOS 上 Safari 打开的页面

调试 iOS 上 Safari 打开的页面一般只能借助 Mac 电脑上的 Safari，而 Mac 上的 Safari 调试功能薄弱，且需要有一台 Mac 电脑，这给调试带来诸多不便。 按以下步骤，即可在电脑 chrome 上调试 iOS Safari 打开的页面:

1. 安装 ios webkit debug proxy by Google: Mac & linux 请 [安装官方版](https://github.com/google/ios-webkit-debug-proxy), window 用户请 [安装 window 分支](https://github.com/artygus/ios-webkit-debug-proxy-win32)
2. 开启 iOS 上 Safari 的调试：进入 设置 -> Safari -> 高级 -> Web 审查器，将其启用
3. 使用 USB 链接电脑和手机
4. 在电脑的 终端 或者 cmd 中执行命令 `ios_webkit_debug_proxy -f chrome-devtools://devtools/bundled/inspector.html` , 正常会提示 _Connected :9222 to xxxxx(设备名称)_， 若有异常，自行搜索解决:)
5. 在 chrome 中打开网址 [localhost:9221](http://localhost:9221), 该页面会列出手机 Safari 上所有已打开的页面，点开任意一个即可调试。若点击无反应，右键点击选择 **拷贝链接地址**, 然后在新窗口的地址栏中粘贴打开。

## JSConsole(在线服务)

通过在自己的 web app 中引入 JSConsole 的 js, 即可在电脑浏览器中查看在手机上打印出的日志.

官方网站: <http://jsconsole.com/>

## localtunnel

将本机 web 服务暴露到互联网，得到一个外网可以访问域名(支持 https)，方便局域网外的用户访问你的 web 服务。

官方 Repo <https://github.com/localtunnel/localtunnel>

### 安装

```sh
npm install -g localtunnel
```

### 使用

```sh
# 使用 --port 指定本机web服务使用的端口
lt --port 8000
```

执行完命令即可得到一个外网可访问的地址，默认返回 `https` 地址，可手动改为 `http` 来访问。

## 代理

### lightrpoxy
[lightproxy](https://github.com/alibaba/lightproxy)