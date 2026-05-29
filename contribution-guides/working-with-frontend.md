---
description: Frontend development setup including editor integration, environment variables, and development proxy config.
---

# Working with the Frontend

## Editor Integration

While working with the frontend code, type errors will be displayed inside the page. To make clicking the errors open in your editor or IDE, you need to set the [`LAUNCH_EDITOR`](https://github.com/yyx990803/launch-editor#supported-editors) environment variable in your system.

## Environment Variables

The frontend uses Vite environment variables for configuration. These variables are prefixed with `VITE_` and are accessed via `import.meta.env` at runtime. Non-`VITE_` variables are only available at build time (e.g., in `vite.config.ts` or Node scripts).

You can override any variable by creating a `.env.development.local` file in `frontend/app/`. This file is gitignored and won't be committed.

### Development Tools

| Variable             | Default | Description                                                                                                              |
| -------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `ENABLE_DEV_TOOLS`   | –       | Set to `true` to enable Vue DevTools in the Electron app during development. Build-time only (used in `vite.config.ts`). |
| `DEBUGGER_PORT`      | –       | Set a port number to enable the Node.js debugger for the Electron main process (used by the dev script).                 |
| `VITE_DEV_LOGS`      | –       | When set, stores Electron main process logs in the project directory instead of the system app data directory.           |
| `VITE_VERBOSE_CACHE` | –       | When set, enables verbose logging for the item cache composable. Useful for debugging cache behavior.                    |
| `VITE_PERSIST_STORE` | –       | When set to `true`, enables persistence of the Pinia debug store across page reloads.                                    |

### API & Service URLs

| Variable                 | Default                 | Description                                                                                                                                                                  |
| ------------------------ | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_BACKEND_URL`       | `http://127.0.0.1:4242` | URL for the rotki backend API. When set in `.env.development.local`, the dev script automatically starts the [development proxy](#development-proxy) alongside the frontend. |
| `VITE_COLIBRI_URL`       | `http://127.0.0.1:4343` | URL for the Colibri service.                                                                                                                                                 |
| `VITE_ROTKI_WEBSITE_URL` | `https://rotki.com`     | URL for the rotki website. Can be pointed to a local instance during development.                                                                                            |
| `VITE_PUBLIC_PATH`       | –                       | When set, adjusts the base path for the router and API URL resolution. Used in Docker builds.                                                                                |

## Development Proxy

The frontend includes a development proxy (`frontend/dev-proxy`) that sits between the frontend and the real backend. It forwards all requests to the backend by default, but allows you to mock specific endpoints — useful for developing frontend features in parallel with the backend or testing premium features without the premium backend.

### Starting the Proxy

When `VITE_BACKEND_URL` is set in `.env.development.local`, the proxy starts **automatically** when you run `pnpm run dev`. The typical setup is:

```bash
# frontend/app/.env.development.local
VITE_BACKEND_URL=http://localhost:4243
```

This points the frontend to the proxy (port 4243), which in turn forwards requests to the real backend (port 4242).

You can also start the proxy manually:

```bash
pnpm run --filter @rotki/dev-proxy serve
```

### Proxy Configuration

Configure the proxy via environment variables or a `.env` file in the `frontend/dev-proxy/` directory:

| Variable                | Default                 | Description                                                                                          |
| ----------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------- |
| `PORT`                  | `4243`                  | The port the proxy listens on.                                                                       |
| `BACKEND`               | `http://localhost:4242` | The URL of the real backend to forward requests to.                                                  |
| `PREMIUM_COMPONENT_DIR` | –                       | Path to the premium components source directory. Only needed for testing premium components locally. |

### Mocking Endpoints

The proxy can mock backend responses using an `async-mock.json` file in the `frontend/dev-proxy/` directory. See `async-mock.example.json` for the format.

```json
{
  "/api/1/assets/updates": {
    "GET": {
      "result": { "local_version": 1, "remote_version": 6 },
      "message": ""
    }
  }
}
```

- Use an **object** for a static mock that returns the same response every time.
- Use an **array** to return different responses on successive requests (cycling through items, repeating the last one when exhausted).

Any endpoint without a mock entry is forwarded to the real backend.

## Running Multiple Instances

`pnpm dev` can run several isolated dev environments side by side, each with its own user-data directory and its own block of ports. This is useful for working on more than one branch at once (for example, paired with git worktrees) without the instances stepping on each other's data or ports.

### Starting an Instance

Run the dev environment with `--instance <name>` from the `frontend` directory:

```bash
# Named instance
pnpm dev --instance scratch

# Bare --instance derives the name from $INSTANCE_NAME, then the current git branch
pnpm dev --instance

# Force the default (non-instance) environment, even if INSTANCE_NAME is set
pnpm dev --no-instance
```

Plain `pnpm dev` (no flag) continues to use the default ports and the production data directory, exactly as before.

### Port Allocation

Each instance is assigned a **slot**. Slot 0 is reserved for the default `pnpm dev` (ports 8080 dev / 4242 backend / 4243 proxy / 4343 colibri). Instance slots start at port `13000` and pack tightly — each slot owns four contiguous ports laid out as `dev`, `backend`, `proxy`, `colibri`, with a small gap between slots:

| Slot | Dev   | Backend | Proxy | Colibri |
| ---- | ----- | ------- | ----- | ------- |
| 1    | 13000 | 13001   | 13002 | 13003   |
| 2    | 13010 | 13011   | 13012 | 13013   |

The browser URL is the round base port (e.g. `http://localhost:13000`). Slot assignments are recorded in a `.port-index.json` registry under the instances directory so the same instance name keeps its slot across runs. Ports that would collide with the Node inspector (`9229`) or the fixed e2e ports (`30301`–`30304`) are skipped.

### Data Directories

Instance data lives under `<app-data>/rotki-dev/<name>` (e.g. `~/.local/share/rotki-dev/scratch` on Linux). On first run the data directory is **seeded** from your production rotki data directory so the instance starts with your existing users and global DB:

- Pass `--no-seed` to start with an empty data directory.
- Pass `--include-backups` to also copy `*.backup` files (skipped by default to keep the seed lean).
- Set `ROTKI_SEED_SOURCE` to seed from a different directory (e.g. an existing `develop_data` mirror).
- Set `ROTKI_DEV_INSTANCES_DIR` to relocate the parent directory that holds all instances.

### Managed Environment Block

When running in instance mode, the dev script writes a managed block to `frontend/app/.env.development.local` so Vite and the renderer pick up the instance's ports:

```bash
# >>> rotki dev:web managed (do not edit by hand)
INSTANCE_NAME=scratch
INSTANCE_PORT_SLOT=1
VITE_BACKEND_URL=http://localhost:13002
VITE_COLIBRI_URL=http://localhost:13003
DEV_PORT=13000
# <<< rotki dev:web managed
```

Only the keys inside this block are managed; anything else in the file is left untouched. If you have manually set any of the managed keys yourself, the script stops and asks you to confirm with `--accept-managed-env` before it takes them over. Switching back with `--no-instance` removes the block.

### Lifecycle Commands

These subcommands inspect or clean up instances and then exit:

| Command                   | Description                                                                                           |
| ------------------------- | ----------------------------------------------------------------------------------------------------- |
| `pnpm dev --list`         | List all instances with their branch, slot, size, last-used time, and whether they're currently live. |
| `pnpm dev --clean <name>` | Remove a single instance (its data dir and slot). Prompts for confirmation.                           |
| `pnpm dev --clean-all`    | Remove every instance (double-confirmed).                                                             |
| `pnpm dev --prune`        | Remove instances whose git worktree no longer exists. Dry-run unless `--yes`.                         |
| `pnpm dev --repair`       | Rebuild the `.port-index.json` registry from the per-instance sidecar files. Dry-run unless `--yes`.  |

Additional modifiers:

- `--yes` skips the confirmation prompts for `--clean`, `--clean-all`, `--prune`, and `--repair`.
- `--older-than <duration>` narrows `--prune` to instances last used before a cutoff (e.g. `30d`, `12h`, `45m`).

A live instance (one with ports currently in use) is never deleted — stop it first. Pressing <kbd>Ctrl+C</kbd> shuts a running instance down cleanly across the electron, vite, and cargo processes.

## Workspace Structure

The frontend is a pnpm workspace with several packages:

| Package            | Directory            | Description                                                                                   |
| ------------------ | -------------------- | --------------------------------------------------------------------------------------------- |
| `@rotki/app`       | `frontend/app`       | The main rotki application (Electron + web).                                                  |
| `@rotki/common`    | `frontend/common`    | Shared utilities and types used across packages.                                              |
| `@rotki/dev-proxy` | `frontend/dev-proxy` | Development proxy for mocking backend endpoints. See [Development Proxy](#development-proxy). |

### Vite Configurations

The app uses three separate Vite configuration files for different build targets:

| File                     | Purpose                              |
| ------------------------ | ------------------------------------ |
| `vite.config.ts`         | Main renderer process (the Vue app). |
| `vite.config.main.ts`    | Electron main process.               |
| `vite.config.preload.ts` | Electron preload script.             |

When making configuration changes, ensure you edit the correct file for the target you're working on.

## Linting & Type Checking

The project uses ESLint with `@rotki/eslint-config` and Stylelint for CSS. All commands are run from the `frontend` directory:

```sh
# Lint TypeScript/Vue files
pnpm run lint

# Lint and auto-fix
pnpm run lint:fix

# Lint CSS styles
pnpm run lint:style

# Lint styles and auto-fix
pnpm run lint:style:fix

# Type check with vue-tsc
pnpm run typecheck
```

To set up pre-commit hooks that run linting automatically:

```sh
pnpm run setup:hooks
```

## Feature Flags

| Variable             | Default | Description                                                                                                                                                                                                                                                                                  |
| -------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_NO_AUTO_FETCH` | –       | Set to `true` to disable automatic balance fetching on login, periodic balance refresh, and automatic transaction syncing when navigating to the history page. Manual refresh buttons continue to work normally. Useful during frontend development to avoid waiting for backend data loads. |
| `VITE_DEMO_MODE`     | –       | Set to `minor` or `patch` to enable demo mode. Hides certain UI elements (e.g., privacy mode, redecode button) and adjusts indicators for demo purposes.                                                                                                                                     |

### Internationalization

| Variable                       | Default | Description                                                                                                     |
| ------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------- |
| `VITE_I18N_LOCALE`             | `en`    | Sets the active locale for the application.                                                                     |
| `VITE_I18N_FALLBACK_LOCALE`    | `en`    | Sets the fallback locale when a translation is missing.                                                         |
| `VITE_SILENT_TRANSLATION_WARN` | –       | Set to `true` to suppress missing translation warnings in the console. Enabled by default in test environments. |

### Third-Party Services

| Variable                             | Default         | Description                                                |
| ------------------------------------ | --------------- | ---------------------------------------------------------- |
| `VITE_WALLET_CONNECT_PROJECT_ID`     | (set in `.env`) | The WalletConnect project ID used for wallet integrations. |
| `VITE_GOOGLE_FORM_URL`               | (set in `.env`) | Google Form URL used for the in-app bug report dialog.     |
| `VITE_GOOGLE_FORM_TITLE_ENTRY`       | (set in `.env`) | Google Form field entry ID for the issue title.            |
| `VITE_GOOGLE_FORM_DESCRIPTION_ENTRY` | (set in `.env`) | Google Form field entry ID for the issue description.      |

### Internal / Test-Only

These variables are used internally by the build system and test environments. You typically don't need to set them manually.

| Variable      | Description                                                                                |
| ------------- | ------------------------------------------------------------------------------------------ |
| `VITE_DOCKER` | Set to `true` in the Docker build. Adjusts login page behavior (e.g., backend host input). |
| `VITE_TEST`   | Set to `true` in test environments. Disables development-only features.                    |
| `VITE_E2E`    | Set to `true` during E2E tests. Exposes `window.interop` for Playwright.                   |

## Environment Files

The frontend uses several `.env` files for different contexts:

| File                     | Purpose                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `.env`                   | Base defaults shared across all modes.                                                     |
| `.env.development.local` | **Your local overrides** (gitignored). Create this file for personal development settings. |
| `.env.docker`            | Overrides used when building the Docker image.                                             |
| `.env.e2e`               | Overrides used when running E2E tests.                                                     |
| `.env.test`              | Overrides used when running unit tests.                                                    |

### Example `.env.development.local`

```bash
# Enable Vue DevTools
ENABLE_DEV_TOOLS=true

# Use a different backend port
VITE_BACKEND_URL=http://127.0.0.1:4243

# Skip automatic data fetching on login
VITE_NO_AUTO_FETCH=true

# Enable Electron debugger
DEBUGGER_PORT=9229

# Store Electron logs in project directory
VITE_DEV_LOGS=true

# Persist debug store
VITE_PERSIST_STORE=true
```
