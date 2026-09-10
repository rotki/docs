# rotki docs

Source for [docs.rotki.com](https://docs.rotki.com): rotki's user guide and contributor
documentation, built with [VitePress](https://vitepress.dev).

## Prerequisites

- Node 24, the version pinned in [`.nvmrc`](.nvmrc)
- pnpm, pinned by `packageManager` in [`package.json`](package.json). Run `corepack enable`
  once and the right version is picked up automatically.

## Local development

```sh
pnpm install
pnpm run dev
```

`dev` serves the site with hot reload on every save.

To exercise a production build instead:

```sh
pnpm run build
pnpm run preview
```

`preview` only serves what `build` last wrote to disk, so build first or you are previewing a
stale site.

## Checks

CI runs all of these on every pull request and fails on any of them. Running them locally first
is faster than a round trip through CI:

```sh
pnpm run lint
pnpm run check:images
pnpm run check:anchors
pnpm run check:app-links
```

| command           | what it enforces                                                                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `lint`            | eslint across markdown, TypeScript and Vue sources. `pnpm exec eslint . --fix` clears most of what it reports.                                                                             |
| `check:images`    | Every reference resolves to a real image, every image is referenced by at least one page, and each image sits in the directory mirroring the page that owns it.                            |
| `check:anchors`   | Every internal `#anchor` points at a heading that exists. VitePress verifies the linked page but never the anchor on the end of it, so renaming a heading otherwise breaks links silently. |
| `check:app-links` | The deep links the rotki app makes into these docs still resolve. The app ships with those URLs baked in, so when this fails the fix belongs in the docs, not in the list.                 |

Each script in [`scripts/`](scripts) opens with a comment explaining why it exists and what broke
before it did. A pre-commit hook runs eslint over staged files, so most lint problems surface
before you push.

## Branches and versions

Three branches are published at once, mirroring the release branches in the main
[rotki](https://github.com/rotki/rotki) repository. A push to any of them rebuilds and redeploys
all three:

| branch     | version | published at                     |
| ---------- | ------- | -------------------------------- |
| `main`     | stable  | <https://docs.rotki.com>         |
| `develop`  | latest  | <https://docs.rotki.com/latest/> |
| `bugfixes` | patch   | <https://docs.rotki.com/patch/>  |

Target the branch matching the release your change describes: `main` for the current stable
release, `develop` for what ships in the next minor, `bugfixes` for the next patch. A change that
is true of more than one release has to land on each of those branches separately. See
[releasing.md](contribution-guides/releasing.md) for how the underlying release branches work.

## Writing the docs

Page conventions, the contribution workflow and the guides themselves live in
[`contribution-guides/`](contribution-guides/index.md).
