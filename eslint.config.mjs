import rotki from '@rotki/eslint-config';

export default rotki({
  vue: true,
  typescript: true,
  markdown: true,
  formatters: true,
}, {
  files: ['shims-vue.d.ts'],
  rules: {
    'import/no-default-export': 'off',
  },
}, {
  files: ['**/*.yml', '**/*.yaml'],
  rules: {
    '@stylistic/spaced-comment': 'off',
  },
}, {
  files: ['.vitepress/theme/index.ts', '.vitepress/config.mts'],
  rules: {
    'import/no-default-export': 'off',
  },
}, {
  files: ['**/*.md'],
  rules: {
    'max-lines': ['error', { max: 500 }],
  },
});
