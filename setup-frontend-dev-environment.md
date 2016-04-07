# 前端开发环境的安装配置

## 软件安装
1. [Download Sublime Text](https://www.sublimetext.com/3)
2. [Download Nodejs](https://nodejs.org/en/download/) (windows 系统请下载msi版本)  
    nodejs 安装完成之后，打开命令行，粘贴 `npm install less jade coffeelint csslint jshint grunt-cli gulp -g` 并回车执行
3. [Download Prepros](https://prepros.io/downloads)

## Sublime Text

### 基础配置
由Sublime Text菜单项 Preferences -> Settings-User, 进入编辑器的自定义偏好设置, 在配置中插入以下配置项并保存:

```json
{
    // 设置在80字符宽度处显示竖线，提示单行代码不要过长
    "rulers":
    [
        80
    ],
    // 单个tab大小为2个空格
    "tab_size": 2,
    // 自动将tab转换为空格
    "translate_tabs_to_spaces": true,
    // 自动换行
    "word_wrap": true
}

```

### Package Control
在Sublime Text中按 `ctrl+\``打开console，将以下代码粘贴进去并按回车执行. 也可以参考[官方详细说明](https://packagecontrol.io/installation)

```
import urllib.request,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

#### 安装常用插件
由Sublime Text菜单项 Preferences -> Package-Settings -> Package Control -> Settings-User, 进入Package Control的自定义偏好设置, 在配置中插入以下配置项, 保存并重启编辑器:

```js
{
    "bootstrapped": true,
    "in_process_packages":
    [
    ],
    "installed_packages":
    [
        "AlignTab",
        "AutoFileName",
        "BracketHighlighter",
        "ConvertToUTF8",
        "DocBlockr",
        "Emmet",
        "HTML-CSS-JS Prettify",
        "JS Snippets",
        "LESS",
        "MarkdownEditing",
        "Nodejs",
        "Package Control",
        "SideBarEnhancements",
        "SublimeCodeIntel",
        "SublimeLinter",
        "SublimeLinter-csslint",
        "SublimeLinter-html-tidy",
        "SublimeLinter-jshint",
        "Trimmer",
        "URLEncode"
    ]
}
```

### 快捷键及插件使用
1. [常用快捷键](http://www.daqianduan.com/4820.html)
2. [Gif快捷键演示](http://blog.jobbole.com/82527/)
3. [插件AlignTab](https://github.com/randy3k/AlignTab)
4. [插件Emmet 快捷输入列表](http://docs.emmet.io/cheat-sheet/), [完整官方文档](http://docs.emmet.io/)
5. [插件DocBlockr](https://github.com/spadgos/sublime-jsdocs)
6. [插件Trimmer](https://github.com/jonlabelle/Trimmer), 可以使用超级面板命令调用该插件
7. [插件SublimeLinter](https://sublimelinter.readthedocs.org/en/latest/lint_modes.html)
8. 插件URLEncode, 选中文字，在超级面板中输入 decode/encode来调用
9. [MarkdownEditing](https://github.com/SublimeText-Markdown/MarkdownEditing)


