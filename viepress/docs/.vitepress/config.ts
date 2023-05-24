import { defineConfig } from 'vitepress'
import { resolve } from 'path'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  lastUpdated: true,
  title: '测试网站11',
  description: '学习一下',
  srcDir: 'src',
  markdown: {
    lineNumbers: true,
    config: (md) => {
      // console.log('md: ', md);
    },
  },
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    lastUpdatedText: '更新时间',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'test', link: '/test' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  vite: {
    resolve: {
      alias: {
        'vue-hooks-plus': resolve('./src'),
      },
    },
  },
})
