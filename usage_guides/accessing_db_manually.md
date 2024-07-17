# Accessing the database manually

To detect potential problems with data or modify the state of the database, you might need to access it manually. Here’s a guide on how to do this using `DB Browser for SQLite` or `sqlcipher` CLI tool.

## Using DB Browser for SQLite

1. **Download and Install**: Get [DB Browser for SQLite](https://sqlitebrowser.org/dl/). It's available for Windows, macOS, and Linux.
2. **Starting the Program**: Launch the program with the SQLCipher functionality.
3. **Opening the Rotki Database**:
    - Navigate to the Rotki database in the [rotki data directory](/usage_guides/data_directory.html#rotki-data-directory).
    - Enter the password you use to unlock your Rotki account to decrypt the database.
4. **Browsing and Modifying Data**:
    - Use the `Browse Data` tab to view the information.
    - Execute custom SQL commands if needed. However, be cautious and ensure you have double-checked commands with our team or are confident in what you are doing.
    - Always take backups before modifying the database to avoid inconsistent states.

## Using sqlcipher CLI Tool

1. **Installation**:
    - **Debian and Ubuntu Users**: Ensure you have a recent version of sqlcipher (v4 or later). The versions in the distribution repositories might be outdated. Use a [PPA](https://launchpad.net/ubuntu/+ppas) **(use at your own risk)** or follow this [StackOverflow thread](https://stackoverflow.com/questions/48105035/sqlite-browser-without-sqlcipher-support-in-ubuntu) to recompile `sqlitebrowser` with sqlcipher support.
2. **Opening the Database**:
    - Use the command line tool `sqlcipher` (not `sqlite3` since the database is encrypted).
    - After opening the database, specify the password to decrypt it by entering:
      ```sql
      PRAGMA key='your-secret-key';
      ```

By following these steps, you can access and modify the Rotki database securely. Always ensure to backup your database before making any changes.
