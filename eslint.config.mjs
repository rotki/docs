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
  files: ['.vitepress/theme/index.ts', '.vitepress/config.mts', '**/*.data.ts'],
  rules: {
    'import/no-default-export': 'off',
  },
}, {
  files: ['**/*.md'],
  rules: {
    'max-lines': ['error', { max: 500 }],
    // The rule slugifies headings the GitHub way, which disagrees with VitePress
    // on punctuation ('type/subtype', 'Traefik + basic auth'). `pnpm check:anchors`
    // gates the same thing against VitePress' own slugger and runs in CI.
    'markdown/no-missing-link-fragments': 'off',
  },
});
