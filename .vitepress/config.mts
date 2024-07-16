import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Rotki Documentation",
  description: "All you need to start using rotki, or contributing to it.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/usage_guides/introduction' },
      { text: 'Download', link: 'https://rotki.com/download' }
    ],

    sidebar: [
      {
        text: 'Usage Guides',
        items: [
          { text: 'Introduction', link: '/usage_guides/introduction' },
          { text: 'Customization', link: '/usage_guides/customization' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'x', link: 'https://x.com/rotkiapp' },
      { icon: 'discord', link: 'https://discord.rotki.com' },
      { icon: 'github', link: 'https://github.com/rotki/rotki' },
    ],

    search: {
      provider: 'local'
    }
  },
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    }
  }
})
