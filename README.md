# 前端学习指引

本项目内容已整理为小书，请前往 <https://app.evecalm.com/frontend-guideline/> 来访问

项目持续完善中, 如有问题欢迎[提交 issue](https://github.com/oe/frontend-guideline/issues), 也欢迎你将本小书分享给其他人。


>[!TIP]
> 本项目使用 [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) 构建


## 开发步骤
推荐使用 pnpm 进行安装依赖，如果没有安装 pnpm 可以使用 npm 安装
```bash
npm install -g pnpm
```

安装依赖
```bash
pnpm install
```

启动本地服务
```bash
pnpm dev
```
文档存放在 `src/content/docs` 目录下，可以在该目录下创建新的 `.md` 或 `.mdx` 文件来添加新的文档


构建项目
```bash
pnpm build
```

预览构建后的项目
```bash
pnpm preview
```

## 项目结构
```sh
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   ├── docs/ # 文档
│   │   └── config.ts
│   └── env.d.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

