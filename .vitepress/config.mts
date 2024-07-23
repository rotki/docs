import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import path from 'path';
import { fileURLToPath, URL } from 'url';

const __dirname = path.dirname(fileURLToPath(new URL(import.meta.url)));

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Rotki Documentation",
  description: "All you need to start using rotki, or contributing to it.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/requirement_and_installation/introduction' },
      { text: 'Download', link: 'https://rotki.com/download' }
    ],

    sidebar: [
      {
        text: 'System Requirements & Installation',
        items: [
          { text: 'Introduction', link: '/requirement_and_installation/introduction' },
          { text: 'Packaged Binaries', link: '/requirement_and_installation/packaged_binaries' },
          { text: 'Build From Source', link: '/requirement_and_installation/build_from_source' }
        ]
      },
      {
        text: 'Usage Guides',
        items: [
          { text: 'Introduction', link: '/usage_guides/introduction' },
          { text: 'Customization', link: '/usage_guides/customization' },
          { text: 'Importing Data', link: '/usage_guides/importing_data' },
          { text: 'Tracking accounts & Balances', link: '/usage_guides/accounts_and_balances' },
          { text: 'Historical Events', link: '/usage_guides/historical_events' },
          { text: 'Customization of the list of supported assets', link: '/usage_guides/assets' },
          { text: 'Adding missing prices', link: '/usage_guides/custom_price' },
          { text: 'Decentralized Finance', link: '/usage_guides/decentralized_finance' },
          { text: 'Creating a profit/loss report', link: '/usage_guides/pnl' },
          { text: 'Statistic', link: '/usage_guides/statistic' },
          { text: 'Global Search', link: '/usage_guides/global_search' },
          { text: 'Taking Notes In-App', link: '/usage_guides/user_notes' },
          { text: 'Address Book', link: '/usage_guides/address_book' },
          { text: 'Calendar', link: '/usage_guides/calendar' },
        ]
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Set the backend\'s arguments', link: '/usage_guides/backend_arguments' },
          { text: 'Rotki data directory', link: '/usage_guides/data_directory' },
          { text: 'Accessing the database manually', link: '/usage_guides/accessing_db_manually' },
          { text: 'Long running tasks', link: '/usage_guides/long_running_tasks' },
          { text: 'Using rotki from mobile', link: '/usage_guides/using_rotki_from_mobile' },
          { text: 'Troubleshooting', link: '/usage_guides/troubleshooting' },
        ]
      },
      {
        text: 'Frequently Asked Questions',
        items: [
          { text: 'Application', link: 'faq#questions-on-the-application' },
          { text: 'Premium', link: 'faq#questions-on-premium' },
          { text: 'Roadmap & Features', link: 'faq#questions-on-roadmap-and-features' },
          { text: 'Miscellaneous', link: 'faq#miscellaneous-questions' },
        ]
      },
      {
        text: 'Contribution Guides',
        items: [
          { text: 'Bug Reporting', link: '/contribution_guides/bug_reporting' },
          { text: 'Feature Requests', link: '/contribution_guides/feature_requests' },
          { text: 'Contributing as a Developer', link: '/contribution_guides/contribute_as_developer' },
          { text: 'Working on Issues', link: '/contribution_guides/working_on_issues' },
          { text: 'Python Code Testing', link: '/contribution_guides/python_testing' },
          { text: 'Vue/Typescript Testing', link: '/contribution_guides/vue_typescript_testing' },
          { text: 'Manual Testing', link: '/contribution_guides/manual_testing' },
          { text: 'Code Profiling', link: '/contribution_guides/code_profiling' },
          { text: 'rotki Database', link: '/contribution_guides/rotki_database' },
          { text: 'Docker Publishing (manual)', link: '/contribution_guides/docker_publishing' },
          { text: 'Working with frontend', link: '/contribution_guides/working_with_frontend' },
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
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../')
      }
    }
  }
})
