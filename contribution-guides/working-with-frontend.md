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
