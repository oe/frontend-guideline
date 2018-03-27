# 前端开发环境的安装配置


## 软件安装
下列为推荐软件，软件 1 及 2 必装，3 和 4 根据需要选其一即可。

1. [Download Sublime Text](https://www.sublimetext.com/3) 跨平台代码编辑器。 付费，可无限期免费试用
2. [Download Nodejs](https://nodejs.org/en/download/) (windows 系统请下载msi版本) 
	nodejs 安装完成之后，打开命令行，粘贴 `npm install less jade coffeelint csslint jshint grunt-cli gulp jscs -g` 并回车执行
3. [Download Prepros](https://prepros.io/downloads) 跨平台的前端开发辅助工具，可用于自动化压缩代码，编译less,coffee等文件，构建web服务器，开发页面时可以自动刷新浏览器。付费，可无限期免费试用
4. [Download Codekit](https://incident57.com/codekit/) 与 Prepros 类似，只支持OS X平台，体验比Prepros更好。付费，提供试用。

## Sublime Text

### 基础配置
由Sublime Text菜单项 Preferences -> Settings-User, 进入编辑器的自定义偏好设置, 在配置中插入以下配置项并保存:

```
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
在Sublime Text中按 `` ctrl+` `` 打开console，将以下代码粘贴进去并按回车执行. 也可以参考[官方详细说明](https://packagecontrol.io/installation)

```
import urllib.request,os,hashlib; h = '6f4c264a24d933ce70df5dedcf1dcaee' + 'ebe013ee18cced0ef93d5f746d80ef60'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
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
		// 代码对齐工具
		"AlignTab",
		// 编码输入字符串时 自动提示文件路径／文件名
		"AutoFileName",
		// 括号高亮
		"BracketHighlighter",
		// 将不同编码的代码文件转换至utf8
		"ConvertToUTF8",
		// 快速生成代码注释块
		"DocBlockr",
		// html, css 快捷输入
		"Emmet",
		// html, js, css 美化
		"HTML-CSS-JS Prettify",
		// 常用js代码片段
		"JS Snippets",
		// less语言高亮
		"LESS",
		// 提升sublime text 编辑markdown的体验
		"MarkdownEditing",
		// sublime text插件管理工具
		"Package Control",
		// sidebar 右键菜单增强工具
		"SideBarEnhancements",
		// 代码自动提示
		"SublimeCodeIntel",
		// 代码语法错误校验引擎
		"SublimeLinter",
		// css 语法校验
		"SublimeLinter-csslint",
		// html 语法校验
		"SublimeLinter-html-tidy",
		// js 语法校验
		"SublimeLinter-jshint",
		// js 编码风格校验
		"SublimeLinter-jscs",
		// 根据设定的代码风格，快速格式化代码
		"JSCS-Formatter",
		// 快速清除空白字符
		"Trimmer",
		// 字符串URL编码及解码工具
		"URLEncode"
	]
}
```


### Sublime Text快捷键及插件使用
1. [常用快捷键](http://www.daqianduan.com/4820.html)
2. [Gif快捷键演示](http://blog.jobbole.com/82527/)
3. [插件AlignTab](https://github.com/randy3k/AlignTab)
4. [插件Emmet 快捷输入列表](http://docs.emmet.io/cheat-sheet/), [完整官方文档](http://docs.emmet.io/)
5. [插件DocBlockr](https://github.com/spadgos/sublime-jsdocs)
6. [插件Trimmer](https://github.com/jonlabelle/Trimmer), 可以使用超级面板命令调用该插件
7. [插件SublimeLinter](https://sublimelinter.readthedocs.org/en/latest/lint_modes.html)
8. 插件URLEncode, 选中文字，在超级面板中输入 decode/encode来调用
9. [MarkdownEditing](https://github.com/SublimeText-Markdown/MarkdownEditing)

### 代码风格检查
一个团队应该有一个统一的编码规范及代码风格，以提升代码可读性，可维护性，及团队协作效率。

代码风格的自动化检查使用基于 Nodejs 的 工具 [jscs](http://jscs.info/). 该工具[支持各种代码编辑器](http://jscs.info/overview#friendly-packages)，针对推荐的Sublime Text，如果已按照上述步骤完成操作，则只需要按下述方法增加 jscs的配置文件即可在 Sublime Text 实现代码风格的实时校验。

在项目根目录(或者在sublime text左侧目录树的根目录)中增加名字为 `.jscsrc` 的文件，并将下列内容拷贝至文件中:

```json
{
    "preset": "airbnb",
    "requireTrailingComma": false,
    "safeContextKeyword": "me"
}
```

推荐使用 airbnb 预设的代码风格，也可以使用[其它预设风格](http://jscs.info/overview#presets), 亦可以[完全自定义](http://jscs.info/rules)。


