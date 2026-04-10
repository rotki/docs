import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitepress';
import llmstxt, { copyOrDownloadAsMarkdownButtons } from 'vitepress-plugin-llms';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';
import { markdownFitMedia } from './plugins/markdown-fit-media';
import { getRedirectPaths, redirectsPlugin } from './plugins/redirects';

const redirects: Record<string, import('./plugins/redirects').RedirectValue> = {
  // Simple redirects (1:1 moves)
  'usage-guides/historical-events': '/usage-guides/history/events',
  'usage-guides/onchain': '/usage-guides/history/onchain',
  'usage-guides/pnl': '/usage-guides/history/pnl',
  'usage-guides/import-csv': '/usage-guides/history/import-data',
  'usage-guides/tax-accounting': '/usage-guides/tax-accounting/guide',
  'usage-guides/event-types': '/usage-guides/tax-accounting/event-types',
  'usage-guides/accounting-rules': '/usage-guides/tax-accounting/accounting-rules',
  'usage-guides/statistic': '/usage-guides/statistics',
  'usage-guides/assets': '/usage-guides/data-management/assets',
  'usage-guides/custom-price': '/usage-guides/data-management/prices',
  'usage-guides/address-book': '/usage-guides/data-management/address-book',
  'usage-guides/tag-management': '/usage-guides/data-management/tags',
  'usage-guides/calendar': '/usage-guides/integrations/calendar',
  'usage-guides/global-search': '/usage-guides/utilities/#global-search',
  'usage-guides/user-notes': '/usage-guides/utilities/#taking-notes-in-app',
  'usage-guides/long-running-tasks': '/usage-guides/utilities/#background-tasks',
  'usage-guides/help-support': '/usage-guides/utilities/help',
  'usage-guides/troubleshooting': '/usage-guides/advanced/troubleshooting',
  'usage-guides/backend-arguments': '/usage-guides/advanced/backend-config',
  'usage-guides/data-directory': '/usage-guides/advanced/data-directory',
  'usage-guides/accessing-db-manually': '/usage-guides/advanced/database-access',
  'usage-guides/using-rotki-from-mobile': '/usage-guides/advanced/mobile',
  // Anchor-aware redirects (split files)
  'usage-guides/accounts-and-balances': {
    default: '/usage-guides/portfolio/accounts',
    anchors: {
      '#exchange-balances': '/usage-guides/portfolio/balances',
      '#manual-balances': '/usage-guides/portfolio/balances',
      '#nfts': '/usage-guides/portfolio/balances',
      '#filtering-by-tags': '/usage-guides/portfolio/balances',
      '#hide-small-balances': '/usage-guides/portfolio/balances',
      '#airdrops': '/usage-guides/portfolio/balances',
      '#balances-snapshots': '/usage-guides/portfolio/balances',
    },
  },
  'usage-guides/api-keys': {
    default: '/usage-guides/integrations/exchange-keys',
    anchors: {
      '#rotki-premium': '/premium/api-keys',
      '#external-services': '/usage-guides/integrations/external-services',
      '#etherscan': '/usage-guides/integrations/external-services',
      '#loopring-balances': '/usage-guides/integrations/external-services',
      '#monerium': '/usage-guides/integrations/external-services',
      '#gnosis-pay': '/usage-guides/integrations/external-services',
      '#the-graph': '/usage-guides/integrations/external-services',
      '#defillama': '/usage-guides/integrations/external-services',
      '#coingecko': '/usage-guides/integrations/external-services',
    },
  },
  'usage-guides/customization': {
    default: '/usage-guides/settings/general',
    anchors: {
      '#accounting-settings': '/usage-guides/settings/accounting',
      '#trade-settings': '/usage-guides/settings/accounting',
      '#csv-export-settings': '/usage-guides/settings/accounting',
      '#evm': '/usage-guides/settings/blockchain',
      '#price-oracle-settings': '/usage-guides/settings/blockchain',
      '#rpc-node-setting': '/usage-guides/settings/blockchain',
      '#module-settings': '/usage-guides/settings/blockchain',
      '#interface-only-settings': '/usage-guides/settings/interface',
      '#disabling-the-tray-icon': '/usage-guides/settings/interface',
      '#account-settings': '/usage-guides/settings/account',
      '#database-settings': '/usage-guides/settings/account',
      '#backend-settings': '/usage-guides/settings/account',
    },
  },
};

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
          { text: 'Quick Start Guide', link: '/usage-guides/quick-start' },
          { text: 'Accounts & Sync', link: '/usage-guides/' },
          {
            text: 'Portfolio',
            collapsed: false,
            items: [
              { text: 'Dashboard', link: '/usage-guides/portfolio/dashboard' },
              { text: 'Accounts', link: '/usage-guides/portfolio/accounts' },
              { text: 'Balances', link: '/usage-guides/portfolio/balances' },
            ],
          },
          {
            text: 'History & Events',
            collapsed: false,
            items: [
              { text: 'Historical Events', link: '/usage-guides/history/events' },
              { text: 'On-Chain Transactions', link: '/usage-guides/history/onchain' },
              { text: 'Import Data', link: '/usage-guides/history/import-data' },
            ],
          },
          {
            text: 'Tax & Accounting',
            collapsed: false,
            items: [
              { text: 'Tax Accounting Guide', link: '/usage-guides/tax-accounting/guide' },
              { text: 'Profit/Loss Report', link: '/usage-guides/history/pnl' },
              { text: 'Event Types & Subtypes', link: '/usage-guides/tax-accounting/event-types' },
              { text: 'Accounting Rules', link: '/usage-guides/tax-accounting/accounting-rules' },
            ],
          },
          {
            text: 'Tracking',
            collapsed: false,
            items: [
              { text: 'Staking', link: '/usage-guides/staking' },
              { text: 'Statistics', link: '/usage-guides/statistics' },
            ],
          },
          {
            text: 'Integrations',
            collapsed: true,
            items: [
              { text: 'Exchange API Keys', link: '/usage-guides/integrations/exchange-keys' },
              { text: 'External Services', link: '/usage-guides/integrations/external-services' },
              { text: 'Calendar', link: '/usage-guides/integrations/calendar' },
            ],
          },
          {
            text: 'Utilities',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/usage-guides/utilities/' },
              { text: 'Help & Support', link: '/usage-guides/utilities/help' },
            ],
          },
          {
            text: 'Data Management',
            collapsed: true,
            items: [
              { text: 'Assets', link: '/usage-guides/data-management/assets' },
              { text: 'Missing Prices', link: '/usage-guides/data-management/prices' },
              { text: 'Address Book', link: '/usage-guides/data-management/address-book' },
              { text: 'Tags', link: '/usage-guides/data-management/tags' },
            ],
          },
          {
            text: 'Settings',
            collapsed: true,
            items: [
              { text: 'General', link: '/usage-guides/settings/general' },
              { text: 'Interface', link: '/usage-guides/settings/interface' },
              { text: 'Accounting', link: '/usage-guides/settings/accounting' },
              { text: 'Blockchain & EVM', link: '/usage-guides/settings/blockchain' },
              { text: 'Account & Database', link: '/usage-guides/settings/account' },
            ],
          },
          {
            text: 'Advanced',
            collapsed: true,
            items: [
              { text: 'Troubleshooting', link: '/usage-guides/advanced/troubleshooting' },
              { text: 'Backend Configuration', link: '/usage-guides/advanced/backend-config' },
              { text: 'Data Directory', link: '/usage-guides/advanced/data-directory' },
              { text: 'Database Access', link: '/usage-guides/advanced/database-access' },
              { text: 'Mobile / Docker', link: '/usage-guides/advanced/mobile' },
            ],
          },
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
      md.use(copyOrDownloadAsMarkdownButtons);
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
    plugins: [
      llmstxt({ ignoreFiles: getRedirectPaths(redirects) }),
      redirectsPlugin({ redirects, base }),
    ],
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
