import path from 'node:path';
import process from 'node:process';
import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vitepress';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';

const __dirname = path.dirname(fileURLToPath(new URL(import.meta.url)));

const isLatest = process.env.DOCS_VERSION === 'latest';
const base = isLatest ? '/latest' : '/';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Rotki Documentation',
  base,
  description: 'All you need to start using rotki, or contributing to it.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/requirement-and-installation' },
      { text: 'Download', link: 'https://rotki.com/download' },
      {
        text: isLatest ? 'Latest' : 'Stable',
        items: [
          isLatest
            ? {
                text: 'Stable',
                link: 'https://docs.rotki.com/',
                target: '_blank',
              }
            : {
                text: 'Latest',
                link: 'https://docs.rotki.com/latest/',
                target: '_blank',
              },
        ],
      },
    ],

    sidebar: [
      {
        text: 'System Requirements & Installation',
        items: [
          { text: 'Introduction', link: '/requirement-and-installation' },
          { text: 'Packaged Binaries', link: '/requirement-and-installation/packaged-binaries' },
          { text: 'Build From Source', link: '/requirement-and-installation/build-from-source' },
        ],
      },
      {
        text: 'Usage Guides',
        items: [
          { text: 'Introduction', link: '/usage-guides/' },
          { text: 'Customization', link: '/usage-guides/customization' },
          { text: 'Importing Data', link: '/usage-guides/importing-data' },
          { text: 'Tracking accounts & Balances', link: '/usage-guides/accounts-and-balances' },
          { text: 'Historical Events', link: '/usage-guides/historical-events' },
          { text: 'Customization of the list of supported assets', link: '/usage-guides/assets' },
          { text: 'Adding missing prices', link: '/usage-guides/custom-price' },
          { text: 'Decentralized Finance', link: '/usage-guides/decentralized-finance' },
          { text: 'Creating a profit/loss report', link: '/usage-guides/pnl' },
          { text: 'Statistic', link: '/usage-guides/statistic' },
          { text: 'Global Search', link: '/usage-guides/global-search' },
          { text: 'Taking Notes In-App', link: '/usage-guides/user-notes' },
          { text: 'Address Book', link: '/usage-guides/address-book' },
          { text: 'Calendar', link: '/usage-guides/calendar' },
        ],
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Set the backend\'s arguments', link: '/usage-guides/backend-arguments' },
          { text: 'Rotki data directory', link: '/usage-guides/data-directory' },
          { text: 'Accessing the database manually', link: '/usage-guides/accessing-db-manually' },
          { text: 'Long running tasks', link: '/usage-guides/long-running-tasks' },
          { text: 'Using rotki from mobile', link: '/usage-guides/using-rotki-from-mobile' },
          { text: 'Troubleshooting', link: '/usage-guides/troubleshooting' },
        ],
      },
      {
        text: 'Frequently Asked Questions',
        items: [
          { text: 'Application', link: 'faq#questions-on-the-application' },
          { text: 'Premium', link: 'faq#questions-on-premium' },
          { text: 'Roadmap & Features', link: 'faq#questions-on-roadmap-and-features' },
          { text: 'Miscellaneous', link: 'faq#miscellaneous-questions' },
        ],
      },
      {
        text: 'Contribution Guides',
        items: [
          { text: 'Bug Reporting', link: '/contribution-guides' },
          { text: 'Feature Requests', link: '/contribution-guides/feature-requests' },
          { text: 'Contributing as a Developer', link: '/contribution-guides/contribute-as-developer' },
          { text: 'Working on Issues', link: '/contribution-guides/working-on-issues' },
          { text: 'Python Code Testing', link: '/contribution-guides/python-testing' },
          { text: 'Vue/Typescript', link: '/contribution-guides/vue-typescript' },
          { text: 'Manual Testing', link: '/contribution-guides/manual-testing' },
          { text: 'Code Profiling', link: '/contribution-guides/code-profiling' },
          { text: 'rotki Database', link: '/contribution-guides/rotki-database' },
          { text: 'Docker Publishing (manual)', link: '/contribution-guides/docker-publishing' },
          { text: 'Working with frontend', link: '/contribution-guides/working-with-frontend' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'x', link: 'https://x.com/rotkiapp' },
      { icon: 'discord', link: 'https://discord.rotki.com' },
      { icon: 'github', link: 'https://github.com/rotki/rotki' },
    ],

    search: {
      provider: 'local',
    },
  },
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin);
    },
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../'),
      },
    },
  },
  srcExclude: ['**/README.md', '**/LICENSE.md'],
  rewrites: {
    'latest/:path*': ':path*',
  },
});
