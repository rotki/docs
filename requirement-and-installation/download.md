---
description: Download and install rotki on Linux, macOS, or Windows using the official pre-built binaries.
---

# Download & Install

The easiest way to run rotki is to download a pre-built binary for your operating system from the [official releases page](https://github.com/rotki/rotki/releases/latest).

Pick the package for your platform:

- **Linux** — `rotki-linux_x86_64-*.AppImage` (or `.tar.xz`)
- **macOS** — `rotki-darwin-*.dmg` (Intel or Apple Silicon)
- **Windows** — `rotki-win32-*.exe` (installer)

After installing, you can optionally [verify your download](/requirement-and-installation/verify) to confirm the binary is authentic.

## Linux

### AppImage

Download the `linux-x64` AppImage from the [latest release](https://github.com/rotki/rotki/releases/latest) and make it executable:

```sh
chmod +x rotki-linux_x86_64-vx.x.x.AppImage
```

Replace `vx.x.x` with the version you downloaded, then run the file to start rotki.

### Tarball

Alternatively, download the `.tar.xz` archive and unpack it in a directory of your choice. The extracted folder contains a `rotki` executable — run it from the terminal to start rotki.

## macOS

### Homebrew

The simplest option on macOS is Homebrew:

```sh
brew install --cask rotki
```

### Manual install

Download the `darwin-x64` (Intel) or `darwin-arm64` (Apple Silicon) `.dmg` from the [latest release](https://github.com/rotki/rotki/releases/latest). Open the installer and drag the rotki icon into your **Applications** folder. You can then launch rotki from Launchpad or Finder.

> [!NOTE]
> If macOS blocks the app the first time you open it, go to **System Settings → Privacy & Security** and allow rotki to run. See [this guide](https://ccm.net/faq/29619-mac-os-x-run-apps-downloaded-from-unknown-sources) for screenshots.

## Windows

Download the `win32-x64` installer from the [latest release](https://github.com/rotki/rotki/releases/latest) and run it. Windows Defender or your antivirus may prompt you — the binary is signed by **Rotki Solutions GmbH**, which you can confirm by right-clicking the installer and checking its digital signature.

## First launch

When rotki starts for the first time you'll see a sign-in/sign-up screen. From there you can create a local account and begin tracking your portfolio — see the [Quick Start Guide](/usage-guides/quick-start) for a step-by-step walkthrough.

## Troubleshooting

If rotki fails to start or crashes during use, please [open an issue on GitHub](https://github.com/rotki/rotki/issues/new/choose) and include the log files found at:

| OS      | Log directory                               |
| ------- | ------------------------------------------- |
| Linux   | `~/.config/rotki/logs/`                     |
| macOS   | `~/Library/Application Support/rotki/logs/` |
| Windows | `%APPDATA%\rotki\logs\`                     |

On Windows, you can also run the executable from the Command Prompt to capture startup errors printed to the console.

## See also

- [Verify Your Download](/requirement-and-installation/verify) — confirm your binary is authentic
- [Docker & Self-Hosting](/requirement-and-installation/docker) — run rotki in a container
- [Build from Source](/requirement-and-installation/build-from-source) — for contributors and developers
