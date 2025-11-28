import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitepress';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';
import { markdownFitMedia } from './plugins/markdown-fit-media';

const __dirname = path.dirname(fileURLToPath(new URL(import.meta.url)));

const DOCS_VERSION = process.env.DOCS_VERSION;
const isLatest = DOCS_VERSION === 'latest';
const isPatch = DOCS_VERSION === 'patch';
const base = isLatest || isPatch ? `/${DOCS_VERSION}` : '/';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'rotki Documentation',
  base,
  description: 'All you need to start using rotki, or contributing to it.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    nav: [
      { text: 'Documentation', link: '/' },
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
        text: 'Introduction',
        link: '/',
      },
      {
        text: 'System Requirements & Installation',
        items: [
          { text: 'Installation', link: '/requirement-and-installation/' },
          { text: 'Packaged Binaries', link: '/requirement-and-installation/packaged-binaries' },
          { text: 'Build From Source', link: '/requirement-and-installation/build-from-source' },
        ],
      },
      {
        text: 'Usage Guides',
        items: [
          { text: 'Introduction', link: '/usage-guides/' },
          { text: 'Tracking Accounts & Balances', link: '/usage-guides/accounts-and-balances' },
          { text: 'Historical Events', link: '/usage-guides/historical-events' },
          { text: 'On-Chain Transactions', link: '/usage-guides/onchain' },
          { text: 'Staking', link: '/usage-guides/staking' },
          { text: 'Statistics', link: '/usage-guides/statistic' },
          { text: 'Profit/Loss Report', link: '/usage-guides/pnl' },
          { text: 'Tag Management', link: '/usage-guides/tag-management' },
          { text: 'Assets Management', link: '/usage-guides/assets' },
          { text: 'Add Missing Prices', link: '/usage-guides/custom-price' },
          { text: 'Address Book', link: '/usage-guides/address-book' },
          { text: 'API Keys', link: '/usage-guides/api-keys' },
          { text: 'Import CSV', link: '/usage-guides/import-csv' },
          { text: 'Calendar', link: '/usage-guides/calendar' },
          { text: 'Taking Notes In-App', link: '/usage-guides/user-notes' },
          { text: 'Global Search', link: '/usage-guides/global-search' },
          { text: 'Settings', link: '/usage-guides/customization' },
        ],
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Set the backend\'s arguments', link: '/usage-guides/backend-arguments' },
          { text: 'rotki data directory', link: '/usage-guides/data-directory' },
          { text: 'Accessing the database manually', link: '/usage-guides/accessing-db-manually' },
          { text: 'Long running tasks', link: '/usage-guides/long-running-tasks' },
          { text: 'Using rotki from mobile', link: '/usage-guides/using-rotki-from-mobile' },
        ],
      },
      {
        text: 'Premium',
        items: [
          { text: 'Overview', link: '/premium/' },
          { text: 'Plans & Pricing', link: '/premium/plans-and-pricing' },
          { text: 'Payment Process', link: '/premium/payment' },
          { text: 'Subscription Management', link: '/premium/subscription' },
          { text: 'API Keys & Secrets', link: '/premium/api-keys' },
          { text: 'Payment Methods', link: '/premium/payment-methods' },
          { text: 'Device Management', link: '/premium/devices' },
          { text: 'Referral Program', link: '/premium/referrals' },
        ],
      },
      {
        text: 'Frequently Asked Questions',
        items: [
          { text: 'Application', link: '/faq#questions-on-the-application' },
          { text: 'Premium', link: '/faq#questions-on-premium' },
          { text: 'Roadmap & Features', link: '/faq#questions-on-roadmap-and-features' },
          { text: 'Miscellaneous', link: '/faq#miscellaneous-questions' },
          { text: 'Common Issues', link: '/faq#common-issues' },
        ],
      },
      {
        text: 'Contribution Guides',
        items: [
          { text: 'Bug Reporting', link: '/contribution-guides/' },
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
      md.use(markdownFitMedia, {
        imgDir: './public',
        lazyLoad: true,
        decoding: 'auto',
        aspectRatio: true,
        imgSizeHint: true,
      });
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
    'patch/:path*': ':path*',
  },
});
