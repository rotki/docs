import type { Plugin } from 'vite';

interface RedirectTarget {
  /** Default destination when no anchor matches */
  default: string;
  /** Map anchor hashes to specific destinations (for split-page redirects) */
  anchors?: Record<string, string>;
}

export type RedirectValue = string | RedirectTarget;

export interface RedirectsConfig {
  /**
   * Map of old paths to new paths.
   * Keys are relative to site root without leading slash (e.g. 'usage-guides/old-page').
   * Values are either a string (simple redirect) or a RedirectTarget (anchor-aware).
   *
   * @example
   * {
   *   'usage-guides/old-page': '/usage-guides/new-page',
   *   'usage-guides/split-page': {
   *     default: '/usage-guides/section-a',
   *     anchors: {
   *       '#some-section': '/usage-guides/section-b',
   *     },
   *   },
   * }
   */
  redirects: Record<string, RedirectValue>;
  /** Base path for the site (default: '/') */
  base?: string;
}

function generateRedirectHtml(target: RedirectValue, base: string): string {
  const resolveUrl = (path: string) => base === '/' ? path : `${base}${path}`;

  if (typeof target === 'string') {
    const url = resolveUrl(target);
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0;url=${url}">
  <link rel="canonical" href="${url}">
  <title>Redirecting...</title>
</head>
<body>
  <p>This page has moved. Redirecting to <a href="${url}">${url}</a>...</p>
  <script>window.location.replace('${url}' + window.location.hash)</script>
</body>
</html>`;
  }

  const defaultUrl = resolveUrl(target.default);
  const anchors = target.anchors ?? {};

  const anchorEntries = Object.entries(anchors).map(
    ([hash, dest]) => `    ${JSON.stringify(hash)}: '${resolveUrl(dest)}'`,
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0;url=${defaultUrl}">
  <link rel="canonical" href="${defaultUrl}">
  <title>Redirecting...</title>
</head>
<body>
  <p>This page has moved. Redirecting to <a href="${defaultUrl}">${defaultUrl}</a>...</p>
  <script>
  (function() {
    var hash = window.location.hash;
    var anchors = {
${anchorEntries.join(',\n')}
    };
    for (var key in anchors) {
      if (hash === key || hash.startsWith(key + '.') || hash.startsWith(key + '-')) {
        window.location.replace(anchors[key] + hash);
        return;
      }
    }
    window.location.replace('${defaultUrl}' + hash);
  })();
  </script>
</body>
</html>`;
}

/**
 * Returns the list of source paths that are redirects,
 * for use with vitepress-plugin-llms ignoreFiles.
 */
export function getRedirectPaths(redirects: Record<string, RedirectValue>): string[] {
  return Object.keys(redirects).map(path => `${path}.md`);
}

/**
 * Vite plugin that generates redirect HTML files at build time.
 * Replaces manual redirect stub .md files.
 */
export function redirectsPlugin(config: RedirectsConfig): Plugin {
  const { redirects, base = '/' } = config;

  return {
    name: 'vitepress-redirects',
    enforce: 'post',
    generateBundle() {
      for (const [oldPath, target] of Object.entries(redirects)) {
        const html = generateRedirectHtml(target, base);
        const fileName = oldPath.endsWith('.html')
          ? oldPath
          : `${oldPath}.html`;

        this.emitFile({
          type: 'asset',
          fileName,
          source: html,
        });
      }
    },
  };
}
