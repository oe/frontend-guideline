---
title: "前端编码规范"
description: "用格式化和静态检查统一代码，把评审精力留给目录组织、命名、数据流、错误处理和真正影响维护的规则。"
sidebar:
  order: 3
---

**空格、引号和分号交给工具，评审时重点看代码是否容易理解、有没有处理失败。** 一套规范要能被执行：写进配置、在编辑器生效、在 CI 检查，比一篇没人照着做的长文强。

以下是本书的默认习惯。加入已有项目先沿用现成规则；需要改变时单独提交配置与格式化改动，别夹在业务修复里。

## 先把自动化配置好

新项目可以先用 [Prettier](https://prettier.io/docs/install) 做格式化，用 [ESLint](https://eslint.org/docs/latest/use/getting-started) 检查代码问题；已有 Biome 等方案就继续用，别让两个格式化器来回打架。

例如 npm 项目已有 ESLint 配置后，可以在 `package.json` 中提供：

```json
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

`format` 用于主动整理代码，CI 跑 `format:check` 和 `lint`，发现问题直接失败。类型检查使用框架模板提供的命令：Vue、React、Astro 的配置并不完全相同，别从另一项目硬抄一条 `tsc` 命令就当覆盖了所有文件。

一份简单的 `.prettierrc.json` 可以是：

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100
}
```

数值本身是团队偏好，重要的是所有人使用同一份配置。不要在 Review 里手工逐行挑空格，也不要顺手格式化与本次任务无关的整个仓库。

## 代码的目录结构

**相关的东西放在一起，重复使用后再抽成公共模块。** 不要一上来建二十个空目录，或者把所有东西都塞进 `utils`。

以一个普通组件化应用为例：

```text
src/
├── app/                  # 应用入口、路由和全局配置
├── features/
│   └── orders/
│       ├── OrderList.tsx # 页面或业务组件；Vue 项目可用 .vue
│       ├── api.ts        # 订单请求与数据转换
│       ├── model.ts      # 订单领域类型与逻辑
│       └── model.test.ts # 关键行为的测试
├── components/           # 已被多个功能复用的界面组件
└── assets/               # 参与构建的图片、字体等
public/                    # 需要原样发布的文件
```

Next.js、Nuxt、Astro 等框架有路由目录约定，先遵守它们；不要为了目录图好看把框架约定拆散。第三方库通过包管理器安装，不再手工复制进 `lib`。

## 文件规范

### 编码方式

统一 UTF-8。编辑器启用保存时格式化，提交前清理无关的换行和尾部空格；需要统一换行符时把规则写进仓库，而不是要求每人凭记忆设置。

### 文件命名

普通文件用有含义的小写加连字符，如 `request-client.ts`。组件遵循框架习惯，如 `UserCard.tsx`、`UserCard.vue`；`README.md`、`[id].tsx` 等约定文件名照规则保留。

重命名时检查导入路径的大小写。本地能运行、Linux CI 找不到模块，首先查这个问题，别先去清缓存。

### 文件后缀

`.ts` / `.tsx`、`.js` / `.jsx`、`.vue`、`.astro` 按项目使用；`.mjs` / `.cjs` 用于需要明确模块类型的脚本。看不懂模块边界时先读 `package.json` 的 `type` 和工具配置，别反复改后缀碰运气。

## 编码规范

### 通用规范

- **命名说清职责。** `isSaving` 比 `flag` 好，`loadOrders` 比 `handleData` 好；小作用域的 `id`、坐标 `x` 不需要为了凑长度改成长句。
- **函数只做一段说得清的工作。** 请求、数据转换、交互反馈混在一起越来越难改时，沿这些边界拆开；不要把每三行代码都抽成一个函数。
- **注释解释原因。** 「增加一」「遍历数组」这种翻译代码的注释删掉。业务例外、兼容性原因、为什么不能用看似简单的方案，才值得写下来。
- **TODO 留可追踪的下一步。** 写 issue 编号与未完成的行为，不要只留 `TODO: optimize`。
- **默认 `const`，需要重新赋值才用 `let`。** 新代码不再默认用 `var`；`const` 限制重新赋值，不会自动冻结对象。

### HTML 部分

#### 文档类型与编码

普通 HTML 页面使用 HTML5 文档类型、UTF-8，并提供页面标题与 viewport：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>订单列表</title>
  </head>
  <body>
    <main>
      <h1>订单列表</h1>
    </main>
  </body>
</html>
```

框架负责文档外壳时，在框架提供的入口配置这些内容，不要在组件里重复嵌一个 `html` 和 `body`。

#### 语义与交互

**能用 `button` 就别用 `div` 假装按钮。** 链接负责导航，按钮负责操作；输入框写关联的 `label`，图片提供能说明内容的 `alt`，纯装饰图片可以用空 `alt`。

```html
<form>
  <label for="email">邮箱</label>
  <input id="email" name="email" type="email" autocomplete="email" required>
  <button type="submit">订阅</button>
</form>
```

实现后用键盘走一遍 Tab、Enter 和 Escape。鼠标能点不等于交互已经完成。

#### Boolean 属性

`disabled="false"` 仍会禁用控件，普通 HTML 中要表示未禁用就移除 `disabled`。`aria-*` 的字符串值不是这套规则；JSX 和框架模板也应按各自的绑定方式处理。

#### 引入 CSS 和 JavaScript

原生页面的 CSS 用 `<link rel="stylesheet">` 放进 head，模块脚本用 `type="module"`；传统脚本按依赖需要使用 `defer`，别给有先后依赖的一组脚本随手加 `async`。

组件化项目通过构建工具管理依赖。修改第三方库应通过配置、适配层或补丁机制完成，不要手改 `node_modules` 后指望同事也有同样的文件。

### CSS 部分

#### 布局与尺寸

**默认用 Flexbox / Grid 组织布局。** `gap` 管间距，`max-width` 管内容最大宽度，媒体查询在布局需要变化的位置调整；不要用一长串绝对定位凑完整页面。

```css
.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1rem;
}
```

先用手机宽度和长文本试一遍，再调动画和阴影。图片预留宽高或比例，避免加载后把周围内容顶走。

#### class 命名

名字表达组件与职责，如 `.order-card`、`.order-card__title`。反复复用的颜色和间距写成设计变量；使用 Tailwind 的项目按其工具类组织，不需要再给每个节点虚构一个业务 class。

#### 选择器

本书建议选择器保持浅，样式归属到组件。先查是谁覆盖了声明，不要遇到冲突就追加 `!important`；为了某个页面改一个全局 `button`，往往会顺手改坏别的页面。

属性选择器、标签选择器都能正常使用，是否慢要看实际工作负载；别把微小的选择器差异当成性能优化的首要任务。

#### 属性简写

只想改背景颜色就写 `background-color`，避免用 `background` 意外重置图片、位置和重复方式。修改已有声明时先看它有没有同时设置其他子属性。

#### 样式导入

**未经构建的浏览器页面，优先用直接的 stylesheet 链接，避免层层 `@import` 延迟发现样式。** Vite 等构建工具处理的 CSS 导入可以正常使用；样式模块、CSS 层与浏览器运行时加载要分清，见 [MDN @import](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/At-rules/@import)。

#### 媒体查询位置

把响应式规则和所属组件放近些。改卡片布局时能同时看见它在小屏上的规则，比翻到另一个巨型文件里找方便。

### JAVASCRIPT 部分

#### 变量命名

布尔值优先用 `is`、`has`、`can` 说明含义，事件函数与实际动作对应。不要在一个函数里让 `data` 先表示响应对象，后表示数组，最后又变成字符串。

#### 字面量

对象和数组直接写 `{}`、`[]`；字符串、数字、布尔值使用原始值。别写 `new Boolean(false)`：它是一个对象，在条件判断中仍然为真。需要去重用 `Set`，需要键值映射时再考虑 `Map`。

#### null 的使用场景

接口明确返回「没有结果」时可以用 `null`。读取可选值时，缺失默认值用 `??`；`||` 会把 `0`、`false` 和空字符串也当成需要替换的值。

```js
const count = 0;
console.log(count ?? 10); // 0
console.log(count || 10); // 10
```

#### undefined 使用场景

已声明的值用 `value === undefined` 判断。读取对象属性不存在时会得到 `undefined`；若要区别「没有这个字段」与「字段明确为 undefined」，用 `Object.hasOwn()` 检查。

#### 文档注释

公开函数、难以从类型看出的边界行为值得说明。TypeScript 已经说清的类型不必再复制一遍到注释里；纯 JS 可以用 JSDoc：

```js
/**
 * 判断参数是否为有限的 number 原始值，不接受数字字符串。
 * @param {unknown} value 待判断的参数。
 * @returns {boolean} 有限数字返回 true；NaN、Infinity 和非数字返回 false。
 */
function isNum(value) {
  return Number.isFinite(value);
}

isNum(1.5); // true
isNum('1.5'); // false
isNum(null); // false
isNum(NaN); // false
```

表单里的数字先确认是不是空输入，再转换和校验；不要拿 `!isNaN(value)` 当作「它本来就是数字」的证明。

#### 异步与错误处理

**请求失败、空数据和重复提交都属于正常业务分支。** 给用户明确反馈，`catch` 后什么都不做只会把故障藏起来。HTTP 404/500 通常不会让 `fetch` 自动进入 `catch`，先检查响应状态：

```js
async function loadOrders(signal) {
  const response = await fetch('/api/orders', { signal });
  if (!response.ok) {
    throw new Error(`加载订单失败：HTTP ${response.status}`);
  }
  return response.json();
}
```

调用方负责显示加载/错误状态；取消请求按产品行为处理。提交按钮在请求期间禁用，结束后恢复；搜索框快速切换关键词时处理过期响应，别让较早的慢请求覆盖较新的结果。

#### 其他

默认用严格比较 `===` / `!==`。纯文本写进 `textContent`，避免把用户输入传给 `innerHTML`；确实要显示富文本时用成熟清洗方案。别用 `eval` 和 `with` 绕过正常的数据与作用域设计。

## 其他开发规范

提交前看一遍自己的 diff：有没有无关格式化、调试日志、写死的地址、漏掉的错误分支？再运行项目提供的检查与测试。这比背一份上百条的风格清单更能提高交付质量。

进一步参考 [ESLint](https://eslint.org/docs/latest/use/getting-started)、[Prettier](https://prettier.io/docs/)与 [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)。读风格指南时理解规则的理由，团队配置已经有答案的地方，按配置执行。
