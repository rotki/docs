# rotki Database

rotki uses two different SQLite databases: one with information about assets, prices, and other non-sensitive information (`global.db`), and one with user information (`rotkehlchen.db`). The latter is encrypted using an extension called [SQLCipher](https://github.com/sqlcipher/sqlcipher) that provides transparent 256-bit AES full database encryption.

## Database Location

Databases are stored in directories under the [rotki data directory](/usage-guides/data-directory.html#rotki-data-directory).

- The global database is stored at `global/global.db`.
- The accounts you create in rotki have their own database stored at `users/<account_name>/rotkehlchen.db`.

If you need to manually access the database, you can find the guide [here](/usage-guides/accessing-db-manually.html#accessing-the-database-manually).

## DB Upgrades

Database upgrades are needed when changes in the schema occur. rotki checks a setting in the database with the version and executes a check against the version to verify if the upgrade needs to happen.

When the database schema is changed, it is important to note that **the operation is not reversible**. Therefore, to open the upgraded database with an older version, you would need a backup. For more information, check [upgrade_manager.py](https://github.com/rotki/rotki/blob/da7062220abddc7bde9b99fc3d297412bb6552b4/rotkehlchen/db/upgrade_manager.py).

When adding a new upgrade, remember to bump `ROTKEHLCHEN_DB_VERSION` in [settings.py](https://github.com/rotki/rotki/blob/da7062220abddc7bde9b99fc3d297412bb6552b4/rotkehlchen/db/settings.py). Generally, we only make one upgrade per release, so if you need to make changes to the schema, simply add them to the latest unreleased migration.

rotki generates a backup before any schema upgrade. These backups are stored in the same directory as the database with the name `<timestamp>_rotkehlchen_db_v<version>.backup` or `<timestamp>_global_db_v<version>.backup`.

rotki uses the same mechanism of updating the schema for both the global and user databases.

## DB Migrations

When developers need to make changes in the data but the schema does not change, a data migration is made instead. This operation can be a simple task such as deleting old backup files, inserting some rows, or running a background task to update some table. In this case, the database can be opened using the previous version of rotki. For more information, check [data_migrations](https://github.com/rotki/rotki/tree/develop/rotkehlchen/data_migrations).
