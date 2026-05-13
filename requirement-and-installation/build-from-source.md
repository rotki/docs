---
description: Build rotki from source for development or to run unreleased code, with backend, frontend, and packaging instructions.
---

# Build from Source

Building rotki from source is for contributors and for users who want to run unreleased code from git branches. If you just want to use rotki, the [packaged binaries](/requirement-and-installation/download) are easier.

> [!WARNING]
> Don't switch between unreleased git builds and official releases on the same [data directory](/usage-guides/advanced/data-directory). Unreleased code has no forward-compatibility guarantees for the database schema.

## Prerequisites

Before starting, ensure you have the following installed:

- [Git](https://git-scm.com/downloads)
- [Python 3.11.x](https://www.python.org/downloads/)
- [uv](https://github.com/astral-sh/uv) — Python package manager
- [Node.js](https://nodejs.org/en/) — check `frontend/package.json` `engines` for the exact supported range
- [pnpm](https://pnpm.io/) — managed via `corepack` (see [Installing pnpm](#installing-pnpm))
- [Rust / Cargo](https://www.rust-lang.org/tools/install) — needed to build the Colibri service locally

## Get the source

Fork the rotki repository on GitHub, then clone your fork locally:

```sh
git clone https://github.com/your-user/rotki.git
cd rotki
```

This guide assumes you checked out the `develop` branch, which is the default for contributors.

## Backend setup

The backend setup is the same across Linux, macOS, and Windows — install `uv`, then run `uv sync --locked` to create the development environment. OS-specific notes are below.

### Install uv

**Linux and macOS:**

```sh
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Windows (PowerShell):**

```sh
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### Install dependencies

From the rotki repo root:

```sh
uv sync --locked --group dev --group lint
```

This creates a `.venv` and installs the backend, dev, and lint dependency groups.

### Verify the backend

Start the backend once to confirm it runs:

```sh
uv run python -m rotkehlchen
```

You should see:

```
rotki REST API server is running at: 127.0.0.1:5042
```

Stop it with `Ctrl+C` — we'll run everything together once the frontend is set up.

### OS-specific notes

::: tabs

== macOS

Install [Homebrew](https://brew.sh/) first if you don't have it. Homebrew is used as a bootstrap for Python 3.11 and other toolchain dependencies.

== Windows

1. Install [Python 3.11](https://www.python.org/downloads/release/python-3117/) (64-bit).
2. Make sure Python is on your `Path`. If not, add both the root Python directory and the `Scripts` subdirectory via **Control Panel → System → Advanced system settings → Environment Variables**.
3. Test with `python` in a Command Prompt. If Windows opens the Store instead, disable the `python.exe` and `python3.exe` aliases under **App execution aliases**.
4. Install the [Visual Studio Build Tools](https://visualstudio.microsoft.com/vs/) with the **Desktop development with C++** workload.
5. After `uv sync`, download [miniupnpc for Windows](https://github.com/mrx23dot/miniupnp/releases/download/miniupnpd_2_2_24/miniupnpc_64bit_py39-2.2.24.zip) and copy `miniupnpc.dll` into the venv's site-packages directory. Find the path with:

   ```sh
   uv run python -c "import site; print(site.getsitepackages()[0])"
   ```

== Linux

No extra steps — `uv sync` handles everything.

:::

## Frontend setup

The frontend lives under `frontend/` and uses pnpm.

### Installing pnpm

The repo uses [corepack](https://nodejs.org/api/corepack.html) to manage pnpm. Enable it and corepack will automatically use the version pinned in `frontend/package.json` under `packageManager`:

```sh
corepack enable pnpm
pnpm --version
```

### Install dependencies

```sh
cd frontend
pnpm install --frozen-lockfile
```

### Run rotki in development mode

From the `frontend/` directory:

```sh
pnpm run dev
```

This starts the Electron app together with the backend, the Colibri service (if Cargo is available), and the frontend dev server. If `VITE_BACKEND_URL` is set in `frontend/app/.env.development.local`, the [development proxy](/contribution-guides/working-with-frontend#development-proxy) starts as well.

For browser-only development (no Electron), use:

```sh
pnpm run dev:web
```

See [Working with the Frontend](/contribution-guides/working-with-frontend) for environment variables, feature flags, and proxy configuration.

## Packaging

To build a distributable package for your platform:

```sh
# Install packaging dependencies
uv sync --locked --group packaging

# Run the packaging script (works on all platforms)
uv run python ./package.py --build full
```

## Nix

If you use [Nix](https://nixos.org/download), create a `flake.nix` at the repo root with the following:

```nix
{
  description = "rotki project with uv-managed virtualenv";

  inputs = {
    nixpkgs.url          = "github:NixOS/nixpkgs/nixos-24.05";
    nixpkgs-unstable.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url      = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        python311         = pkgs.python311;
        nodejsWithPython  = pkgs.nodejs.override { python3 = python311; };
        nodePackages      = pkgs.nodePackages.override { nodejs = nodejsWithPython; };
        pnpmWithPython311 = nodePackages.pnpm;

        devShell = pkgs.mkShell {
          name = "rotki-dev";
          buildInputs = [
            pkgs.gcc
            pkgs.stdenv.cc.cc.lib
            pkgs.bash
            pkgs.git
            pkgs.lzma
            pnpmWithPython311
            python311
            pkgs.uv
          ];

          shellHook = ''
            uv sync
            cd frontend
            pnpm install
            cd ..
          '';
        };
      in { inherit devShell; });
}
```

Then enter the development environment with:

```sh
nix develop
cd frontend
pnpm run dev:web
```

## Building a Docker image

To build a Docker image from source using the repo's `Dockerfile`:

```sh
docker build -t rotki .
```

## Troubleshooting

### Blank screen when running the dev server

If you get a blank screen on Electron when starting the dev server, check the console for a syntax-error message:

![Syntax Error](/images/troubleshooting_syntax_error.png)

If you see one, go to `Help → Clear Cache`, then `View → Force Reload`. If the issue persists, follow the frontend [troubleshooting steps](/contribution-guides/vue-typescript#troubleshooting).

### Windows build tool errors

If `uv sync` fails on Windows with errors like `Microsoft Visual C++ 14.0 is required`, the Visual Studio Build Tools aren't installed correctly. Make sure you selected the **Desktop development with C++** workload when installing — see the [prerequisites](#backend-setup) above.
