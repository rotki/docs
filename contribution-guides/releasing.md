---
description: How rotki releases are cut, both minor (1.x.0) from develop and patch (1.x.y) from bugfixes.
---

# Releasing rotki

rotki uses three long-lived branches:

- `develop` — where new features land. Minor releases (`1.x.0`) are cut from here.
- `bugfixes` — where fixes against the current released minor land. Patch releases (`1.x.y`) are cut from here.
- `master` — always points at the latest release. Tags are created on this branch and trigger the release workflow.

The same three branches exist in the companion repositories
[`rotki/assets`](https://github.com/rotki/assets),
[`rotki/data`](https://github.com/rotki/data) (which uses `main` instead of
`master`), and [`rotki/test-caching`](https://github.com/rotki/test-caching).
Their release branches need to be advanced in lockstep with the main
repository so that the released app pulls assets, data, and cassettes that
match what was used during testing.

Releases are triggered by pushing a `v*` tag to `master`. The
[`rotki_release.yaml`](https://github.com/rotki/rotki/blob/develop/.github/workflows/rotki_release.yaml)
workflow then builds the artifacts, generates the release notes from
`docs/changelog.rst` via `tools/scripts/generate_changelog.py`, and publishes a
draft GitHub Release.

## Prerequisites

- A clean working tree on the branch you're releasing from.
- `pnpm >= 10` and `bump2version` available locally (the script checks both).
- For minor releases: every commit on `bugfixes` must already be merged into
  `develop`. `tools/scripts/bump.sh` enforces this through
  `tools/scripts/check_unmerged.sh`; if it complains, merge `bugfixes` →
  `develop` first and retry.
- The `docs/changelog.rst` file should already contain the user-facing entries
  that have accumulated since the last release. Entries are normally added by
  contributors as features and fixes land — the release step only adds the
  `:release:` line with the version and date.

## Minor release (`1.x.0`) from `develop`

1. **Sync and clean up `develop`.** Make sure `bugfixes` is fully merged into
   `develop` (see prerequisites). Pull the latest `develop`.
2. **Finalise the changelog.** On `develop`, add the release line at the top of
   `docs/changelog.rst`:
   ```
   * :release:`1.x.0 <YYYY-MM-DD>`
   ```
   Make sure the entries above it accurately describe what the release ships.
   Commit this change (it can be folded into the bump PR or a separate one
   merged first).
3. **Bump the version.** From the repo root, run:
   ```bash
   tools/scripts/bump.sh minor
   ```
   This invokes `bump2version`, which updates `docs/conf.py`,
   `frontend/app/package.json`, `pyproject.toml`, `colibri/Cargo.toml` and
   `colibri/Cargo.lock`, and creates a single bump commit. No tag is created
   (the config sets `tag = False`).
4. **Open a PR targeting `develop`** with the bump commit. Get it reviewed and
   merged like any other change.
5. **Merge `develop` into `master`** so `master` points at the bump commit
   (typically a fast-forward).
6. **Tag and push.** On `master`, at the bump commit:
   ```bash
   git tag v1.x.0
   git push upstream v1.x.0
   ```
   This triggers `rotki_release.yaml`, which builds, generates the changelog
   section for this version, and creates a draft GitHub Release.
7. **Sync the companion repositories.** In each of `rotki/assets`,
   `rotki/data`, and `rotki/test-caching`, merge `develop` into the release
   branch (`master`, or `main` for `rotki/data`) so the released app picks up
   the matching assets, data, and cassettes.

## Patch release (`1.x.y`) from `bugfixes`

Patch releases ship only the fixes that have accumulated on `bugfixes` since
the last release. They never include unreleased features from `develop`.

1. **Sync `bugfixes`** and make sure all the fixes intended for the patch
   release are merged.
2. **Finalise the changelog.** Add the release line to `docs/changelog.rst`:
   ```
   * :release:`1.x.y <YYYY-MM-DD>`
   ```
   The same changelog file is shared across branches; the changelog entries
   for fixes already on `bugfixes` should already be present.
3. **Bump the version.** From the repo root, with `bugfixes` checked out:
   ```bash
   tools/scripts/bump.sh patch
   ```
4. **Open a PR targeting `bugfixes`** with the bump commit and merge it.
5. **Merge `bugfixes` into `master`** so `master` points at the patched
   commit.
6. **Tag and push** on `master`:
   ```bash
   git tag v1.x.y
   git push upstream v1.x.y
   ```
7. **Sync the companion repositories.** In each of `rotki/assets`,
   `rotki/data`, and `rotki/test-caching`, merge `bugfixes` into the release
   branch (`master`, or `main` for `rotki/data`).

## After the tag is pushed

The release workflow produces a **draft** GitHub Release with the generated
changelog, the built installers for each platform, and the Docker images. The
release manager should:

- Review the generated release notes and tidy them up if needed.
- **Pick the release name and complete the title.** The workflow creates the
  draft with a title like `Rotki v1.x.y -` and leaves the name blank.
  - **Minor releases** get a fresh term taken from the
    [Glossary of bird terms](https://en.wikipedia.org/wiki/Glossary_of_bird_terms).
    The release manager picks the next notable entry from the glossary,
    generally moving forward and exhausting the current letter before
    jumping ahead — e.g. `1.41.0` _Ear Coverts_ → `1.42.0` _Egg Tooth_ →
    `1.43.0` _Emargination_. Check the previous release name and pick the
    next compelling entry after it.
  - **Patch releases** reuse the current minor's name with a short modifying
    adjective prepended, e.g. `1.41.0` _Ear Coverts_ → `1.41.1` _Fixed Ear
    Coverts_ → `1.41.2` _Shiny Ear Coverts_ → `1.41.3` _Crystal Ear
    Coverts_.
- **Add a manual header to the release notes.** The auto-generated changelog
  only contains the bullet list pulled from `docs/changelog.rst`. Prepend a
  hand-written header above it. For **minor releases** this should highlight
  the most important features with short descriptions and embedded
  screenshots/GIFs of the headline changes; for **patch releases** a brief
  summary line is usually enough. Screenshots can be attached via GitHub's
  drag-and-drop in the release editor.
- **Test every artifact before publishing.** Download and exercise each
  produced installer (Linux AppImage, macOS `.dmg`, Windows `.exe`) and pull
  the Docker image, then run rotki end-to-end on each: log in, sync
  balances, query history, and run through the headline features of the
  release. A release that fails to start on any supported platform is much
  more painful to fix after publication than before, so do not skip this
  step — even for patch releases.
- **Sign the Windows binary locally.** The Windows installer produced by CI
  is unsigned. Download it from the draft release, sign it locally with the
  code-signing certificate, delete the unsigned asset from the draft, and
  upload the signed installer in its place before publishing.
- Publish the draft when satisfied.
- **Back-merge `master` → `bugfixes` → `develop`.** Once the release is
  published, merge `master` into `bugfixes`, then `bugfixes` into `develop`,
  in every repository that participates in the release:
  - [`rotki/rotki`](https://github.com/rotki/rotki)
  - [`rotki/assets`](https://github.com/rotki/assets)
  - [`rotki/data`](https://github.com/rotki/data) (use `main` in place of
    `master`)
  - [`rotki/test-caching`](https://github.com/rotki/test-caching)

  This keeps the bump commit and any release-only fixes present on the
  development branches, satisfies the unmerged check in `bump.sh` for the
  next release, and ensures the next patch cycle starts from a clean base.

- Announce the release through the usual channels.
- **Roll over the milestone.** Close the milestone matching the released
  version on GitHub and move any still-open issues or PRs assigned to it to
  the next milestone. Anything that didn't make this release belongs on the
  next one.

If the workflow fails partway, delete the tag (`git push upstream
:refs/tags/v1.x.y` and `git tag -d v1.x.y`), fix the underlying issue, and
re-tag. Do **not** reuse a tag that has already been published.

## Troubleshooting

- **`bump.sh` refuses to run with "Git working directory is not clean"** —
  commit, stash, or discard your local changes before retrying.
- **`bump.sh` reports unmerged commits in `bugfixes`** — merge `bugfixes` into
  the branch you're releasing from first. The script always enforces this
  (`source tools/scripts/check_unmerged.sh force`).
- **The release workflow didn't trigger** — confirm the tag matches the `v*`
  pattern and that it was pushed to the canonical remote (the workflow only
  runs on pushes to the rotki/rotki repository).
