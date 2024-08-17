import { defineConfig, squooshImageService } from 'astro/config';
import starlight from '@astrojs/starlight';

import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
	site: 'https://app.evecalm.com',
	base: '/frontend-guideline/',
	markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'prepend' }],
      [rehypeExternalLinks, {
        target: '_blank', rel: ['noopener', 'nofollow'],
      }]
    ],
  },
	image: {
		service: squooshImageService(),
	},
	integrations: [
		starlight({
			title: '前端开发学习指引',
			social: {
				github: 'https://github.com/oe/frontend-guideline',
				twitter: 'https://twitter.com/forth_ink',
			},
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
					autogenerate: { directory: 'basic' },
				},
				{
					label: '学习',
					autogenerate: { directory: 'learning' },
				},
				{
					label: '开发',
					autogenerate: { directory: 'dev' },
				},
				{
					label: '自动化相关',
					autogenerate: { directory: 'cicd' },
				},
				{
					label: '其他',
					autogenerate: { directory: 'misc' },
				},
			],
		}),
	],
});
