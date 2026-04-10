---
description: Install rotki from pre-built binaries, run it in Docker, or build from source.
---

# Installation

rotki runs locally on your machine — no accounts or cloud services are required to get started. Pick the path that matches your use case:

<NavCards :cards="[
  { icon: '💾', title: 'Download & Install', description: 'Pre-built binaries for Linux, macOS, and Windows. The fastest way to get started.', link: '/requirement-and-installation/download' },
  { icon: '🐳', title: 'Docker & Self-Hosting', description: 'Run rotki in a container with Docker or Docker Compose.', link: '/requirement-and-installation/docker' },
  { icon: '🔐', title: 'Verify Your Download', description: 'Confirm your binary is authentic using SHA512 checksums or GitHub attestations.', link: '/requirement-and-installation/verify' },
  { icon: '🛠️', title: 'Build from Source', description: 'For contributors and developers who want to run unreleased code.', link: '/requirement-and-installation/build-from-source' },
]" />

## System requirements

| Requirement | Minimum                                                   |
| ----------- | --------------------------------------------------------- |
| **Linux**   | Any modern 64-bit distribution with glibc 2.28+           |
| **macOS**   | Big Sur (11) or later, Intel or Apple Silicon             |
| **Windows** | Windows 10 (64-bit) or later                              |
| **RAM**     | 4 GB (8 GB recommended for large portfolios)              |
| **Disk**    | 2 GB free for the app, plus space for your local database |

## What's next?

Once rotki is installed, head to the [Quick Start Guide](/usage-guides/quick-start) for a step-by-step walkthrough from creating an account to generating your first PnL report.
