---
description: Default rotki data directory locations on Linux, macOS, and Windows, plus backup recommendations.
---

# rotki data directory

rotki saves user data by default in a different directory per OS. For each OS, data is stored in the respective standards-compliant equivalent directory.

- **Linux**: `~/.local/share/rotki/data/`
- **OSX**: `~/Library/Application Support/rotki/data` - please note this folder is hidden by default
- **Windows**: `%LOCALAPPDATA%/rotki/data`

Before v1.6.0, rotki was saving data in `$USER/.rotkehlchen`. From v1.6.0, that directory got migrated to the OS equivalent standard directory, and it should be safe for users to delete the old directory as long as the new directory contains the migrated DB.

A very good idea for the rotki data directory would be to make frequent backups of it as it contains all of the data of all of your rotki accounts and cache data for historical price queries.

> [!WARNING]
> Do not copy the SQLite database files while rotki is running. The database may have pending writes in its WAL/journal files, so a filesystem copy can capture an inconsistent state that fails to open or is silently corrupted. Always fully close rotki before copying the data directory.
>
> For a safer alternative, use the [in-app backup feature](/usage-guides/settings/account#database-info-user-database-backups), which creates a consistent snapshot while rotki is running.

## Data directory for unreleased development code

If you are running rotki from unreleased code from git branches,
please note that [the data directory is in a slightly different
location](/contribution-guides/contribute-as-developer#working-with-the-develop-branch).
