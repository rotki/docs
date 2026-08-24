---
description: Find rotki's default data directory on Linux, macOS, and Windows, learn where development builds store their data, and get recommendations for backing it up.
---

# rotki data directory

rotki saves user data by default in a different directory per OS. For each OS, data is stored in the respective standards-compliant equivalent directory.

- **Linux**: `~/.local/share/rotki/data/`
- **OSX**: `~/Library/Application Support/rotki/data` - please note this folder is hidden by default
- **Windows**: `%LOCALAPPDATA%/rotki/data`

Before v1.6.0, rotki was saving data in `$USER/.rotkehlchen`. From v1.6.0, that directory got migrated to the OS equivalent standard directory, and it should be safe for users to delete the old directory as long as the new directory contains the migrated DB.

## Opening it from the app

In the desktop app you do not have to go looking for either directory. The **Help** menu in the
application menu bar has two entries that open them in your file manager:

- **Logs Directory** — where rotki writes its log files.
- **Data Directory** — the directory the running backend actually resolved, which is not necessarily
  the default above if you configured a different one.

> [!NOTE]
> **Data Directory** stays disabled until the backend is running, because until then rotki does not
> yet know which directory is in use. Both entries are in the desktop application's own menu bar, not
> the in-app `?` menu, so they are not available when running rotki in a browser through Docker.

A very good idea for the rotki data directory would be to make frequent backups of it as it contains all of the data of all of your rotki accounts and cache data for historical price queries.

> [!WARNING]
> Do not copy the SQLite database files while rotki is running. The database may have pending writes in its WAL/journal files, so a filesystem copy can capture an inconsistent state that fails to open or is silently corrupted. Always fully close rotki before copying the data directory.
>
> For a safer alternative, use the [in-app backup feature](/usage-guides/settings/account#database-info-user-database-backups), which creates a consistent snapshot while rotki is running.

## Data directory for unreleased development code

If you are running rotki from unreleased code from git branches,
please note that [the data directory is in a slightly different
location](/contribution-guides/contribute-as-developer#working-with-the-develop-branch).
