---
title: "开发软件所需的通用知识"
description: "作为开发人员需要具备的通识, 即使你不从事前端开发, 你也应具备这些知识."
sidebar:
  order: 2
---

# 开发软件所需的通用知识

作为开发人员需要具备的通识, 即使你不从事前端开发, 你也应具备这些知识. 

**下边这些知识你不一定会立即用上, 可在需要时再回顾查阅**

## git 
Git 是流行的源码版本管理工具, 绝大多数公司均用Git来管理源码. 相比svn:
1. 可脱离远程服务器建立本地代码仓库
2. 代码存储分布式
3. 分支及tag不会额外增加仓库大小, 分支及tag管理非常方便

更详细说明请阅读 [GIT 的安装及使用](./basic/git)


## markdown
markdown是一种轻量的基于纯文本的「标记语言」(一般使用该语言编写的文件后缀为 .md), 源自 [LaTex](https://www.latex-project.org/)(另一种专为学术论文而设计的基于纯文本的「标记语言」), 它使用简单易记的标记能实现快速排版, 可用于便携开发文档、帮助手册等并能轻松的生成网站. 相比Word, 它的优势在于:
1. 轻量, 无需安装重型软件, 用记事本即可书写, 任何文本编辑器(代码编辑器均可), 当然它还拥有众多更专业的软件可供选择
2. 可方便的贴代码片段, 且支持代码高亮, 不用再为 word恼人的缩进、自动大写问题而闹心了
3. 借助工具, 可方便的转换为其他格式的文档: word, ppt, pdf 等
4. 可快速生成网站, 甚至可以不经过编译打包步骤, 直接将md文件上传服务器即可被相关工具直接渲染. 而且可基于 Web 技术, 对网站效果进行自定义
5. 高度可扩展, 可在 md 中编写 流程图、ER图、数学公示等等, 还可以使用其轻松做出样式精美的PPT

由于以上好处, markdown 在程序员中被广泛使用, 用于编写项目的 *readme* *接口文档* *开发手册* *用户手册*, 也会用作个人笔记记录之用, 而各类软件开发相关工具也都对其提供了良好的支持. 除了程序员, 在科研工作者、记者、作者、博客作者中使用也比较广泛.

### 学习 markdown
可参考下边的网站练习
* [markdown基本语法](https://wizardforcel.gitbooks.io/markdown-simple-world/2.html) 以及 [markdown高级语法](https://wizardforcel.gitbooks.io/markdown-simple-world/3.html)
* [Markdown 教程](https://www.zybuluo.com/mdeditor), 左侧为编辑器, 右侧为编辑后的效果展示

markdown还有不少扩展语法, 需在对应平台(软件), 或者相应插件支持方可使用, 比如:
* [Github 扩展语法](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown)
* [Gitlab 扩展语法](https://gitlab.com/help/user/markdown#gitlab-flavored-markdown-gfm)
* [Mermaid 图形库](https://mermaid-js.github.io/mermaid/#/flowchart), 支持在markdown中用文本绘制流程图、类图、时序图等, 可在[在线编辑器](https://mermaid-js.github.io/mermaid-live-editor/) 中在线体验题效果

### 支持 markdown 的软件及工具
支持markdown的软件众多, 这里只列举一些优秀的:
* [Vscode](https://code.visualstudio.com/), 微软开发的代码编辑器, 免费开源跨平台, 原生支持markdown, 安装插件[markdown all in one](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) 后可获得更好的编辑体验
* [Typora](https://typora.io/) 免费跨平台的所见即所得的markdown编辑器
* [Notion](https://www.notion.so/) 免费➕增值跨平台的笔记软件, 还有Web端: 交互友好, 操作简单, 页面精美, 不仅可以用于记笔记, 还可以用来记日程、待办事项、数据统计表, 其表格还支持强大的公式功能; 还有不同的模版可快速上手使用. 其免费功能即可满足个人使用, 普通用户无需付费, 但由于其为境外服务, 随时有被中断访问的风险
* [Bear](https://bear.app/)免费➕增值的笔记软件, 支持Mac和iOS, 支持使用标签快速管理笔记. 付费后可获得笔记在 Mac 和 iOS间同步的功能
* [Mweb](https://zh.mweb.im/) 付费笔记软件, 支持Mac和iOS, 由国人开发, 功能比 bear 更强大, 支持图片上传图床, 可将文字直接发布到服务器及其他第三方服务
* [Ulysses](https://ulysses.app/) 订阅制软件, 支持Mac和iOS , 价格略贵, 被很多作者、新闻工作者使用
* [Evernote(印象笔记)](https://evernote.com/) 免费+增值的跨平台笔记软件, 已经支持markdown、思维导图等功能了
* [有道云笔记](https://note.youdao.com/) 免费+增值的跨平台笔记软件, 网易出品, 也已经支持markdown了

### 其他
markdown 本质是基于纯文本扩展的语言, 下边还有其他的基于纯文本的工具服务可供参考  
[在线文字绘图工具(英文)](https://smusamashah.github.io/text-to-diagram)

## shell, terminal & ssh


- [Linux Command](https://github.com/jaywcjlove/linux-command)

## 算法及数据结构

- [数据结构和算法动态可视化](https://visualgo.net/zh)
- [JavaScript 算法与数据结构](https://github.com/trekhleb/javascript-algorithms/blob/master/README.zh-CN.md)
- [O与算法复杂度(英文)](https://algodaily.com/lessons/understanding-big-o-and-algorithmic-complexity)

## 语义化版本及开源协议
### 语义化版本
大多软件及库均使用[语义化版本](https://semver.org/lang/zh-CN/)(如 v1.0.2) 来标记自己的产品的版本, 我们需要知道版本号的含义, 并且在我们发布产品时使用正确的版本号. 完整的语义化版本说明可参考官方文档 <https://semver.org/lang/zh-CN/>, 简言之:
> 版本格式：主版本号.次版本号.修订号，版本号递增规则如下：
> 
> 主版本号：当你做了不兼容的 API 修改，  
> 次版本号：当你做了向下兼容的功能性新增，  
> 修订号：当你做了向下兼容的问题修正。  
> 先行版本号及版本编译元数据可以加到“主版本号.次版本号.修订号”的后面，作为延伸。

### 开源协议
软件开发中必然会使用第三方开源软件(库), 开源软件一般会声明自己用户协议(Licence, 即开源协议, 使用该开源软件的人需要遵守该协议), 该协议是具有一定法律效力的. 开源软件一般会直接引用流行的开源协议作为自己软件的用户协议: 有的协议要求使用本软件的软件也必须开源, 有的不要求一定要开源.

选择开源软件(库)的时候, 应当留意其用户协议, 避免留下法律隐患. 一般来说选择 MIT 及 Apache License 2.0 可放心使用, 允许商业软件使用, 且商业软件无需开源.

详细可参考: 
* [如何选择开源协议](https://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html)
* [开源协议对比](http://choosealicense.online/licenses/)



## http 协议及 API

## 设计模式、设计原则、DRY, KISS, YAGNI & SOLID

* [软件设计模式](https://refactoringguru.cn/design-patterns)
  * [设计模式目录](https://refactoringguru.cn/design-patterns/catalog)

* [计算机系统的设计原则(英文)](https://embeddedartistry.com/blog/2018/04/26/embedded-rules-of-thumb/), 这个网页收集了100多条计算机系统的设计原则，分成12个大类. 以下摘录几条:
  * 尽可能将错误从运行时转移到编译时
  * 没有文档的软件, 没有价值
  * 如果你没法用大白话描述行为, 那你也无法用代码实现它

## 字符编码

## 正则表达式
[轻松学习正则表达式](https://github.com/ziishaned/learn-regex/blob/master/translations/README-cn.md)

## 相关推荐链接

- [计算机专业的学生应该知道什么(英语)](http://matt.might.net/articles/what-cs-majors-should-know/)
- [Hacker laws 对开发人员有用的定律、理论、原则和模式](https://github.com/nusr/hacker-laws-zh)
