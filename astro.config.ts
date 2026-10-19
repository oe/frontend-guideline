import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';

import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
	site: 'https://app.evecalm.com',
	base: '/frontend-guideline/',
	trailingSlash: 'always',
	markdown: {
    processor: unified({
      rehypePlugins: [
        [rehypeExternalLinks, {
          target: '_blank', rel: ['noopener', 'noreferrer'],
        }],
      ],
    }),
  },
	integrations: [
		starlight({
			title: '前端开发学习指引',
			description: '面向前端初学者的中文学习指引，涵盖 HTML、CSS、JavaScript、开发工具、工程化、部署与 Web 安全。',
			routeMiddleware: './src/route-data.ts',
			disable404Route: true,
			defaultLocale: 'root',
			locales: { root: { lang: 'zh-CN', label: '简体中文' } },
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/oe/frontend-guideline' },
				{ icon: 'twitter', label: 'Twitter', href: 'https://twitter.com/forth_ink' },
			],
			editLink: {
				baseUrl: 'https://github.com/oe/frontend-guideline/edit/main/'
			},
			customCss: [
				'./src/assets/style.scss'
			],
			head: [
				{
					tag: 'script',
					attrs: {
						src: '/frontend-guideline/post-a11y.js',
						defer: true
					}
				}
			],
			components: {
				// Component that overrides a built-in component:
				SocialIcons: './src/components/SocialIcons.astro',
			},
			credits: true,
			sidebar: [
				{
					label: '首页',
					link: '/'
				},
				{
					label: '准备工作',
					items: [{ autogenerate: { directory: 'basic' } }],
				},
				{
					label: '学习',
					items: [{ autogenerate: { directory: 'learning' } }],
				},
				{
					label: '开发',
					items: [{ autogenerate: { directory: 'dev' } }],
				},
				{
					label: '自动化相关',
					items: [{ autogenerate: { directory: 'cicd' } }],
				},
				{
					label: '其他',
					items: [{ autogenerate: { directory: 'misc' } }],
				},
			],
		}),
	],
});
