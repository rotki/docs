// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client';
import CsvTable from '@/components/CsvTable.vue';
import type { Theme } from 'vitepress';
import './style.css';

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    // https://vitepress.dev/guide/extending-default-theme#layout-slots
  }),
  enhanceApp({ app }) {
    enhanceAppWithTabs(app);
    app.component('CsvTable', CsvTable);
  },
} satisfies Theme;
