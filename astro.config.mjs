import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Frontend Guidelines',
			social: {
				github: 'https://github.com/oe/frontend-guideline',
			},
			editLink: {
				baseUrl: 'https://github.com/oe/frontend-guideline/edit/main/'
			},
			sidebar: [
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
