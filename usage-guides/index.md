# Introduction

This guide explains how to use the rotki application.

## First Time Sign-Up

When you start rotki, you'll see a sign-in/signup prompt. rotki is a local app, so your account only exists on your local system. Your account on [rotki.com](https://rotki.com/) is only for managing premium subscription payments.

![Creating a new account](/images/rotki_login_screen.png)

To create a local account, press **Create Account**. If you have a premium subscription, you can link this local account using API keys.

To restore an account with premium sync during account creation:

1. **Enable premium**.
2. Enable **Restore synced database**.
3. Enter your **API Key** and **Secret** (found on your account page at [rotki.com](https://rotki.com/)).

Then click **Continue**.

![Enable premium sync](/images/rotki_create_account_enable_sync.png)

Next, provide a profile name and a password:

- **Profile Name**: An identifier for your local database. It doesn’t need to match any previous username or your premium subscription username on [rotki.com](https://rotki.com/).
- **Password**: Do not forget this password. It encrypts all your local files.

For a new account, you can add the premium API key and secret during setup or later using [Setup rotki premium](#set-up-rotki-premium).

![Creating a new account](/images/rotki_create_account.png)

## Restore a Backed-Up Database (Premium Users Only)

### Overview

If you need to move your rotki database to a new device (e.g., if your old one was destroyed), you can manually do this as long as you have backups. As a premium user, you can also restore the encrypted database backed up on the [rotki.com](https://rotki.com/) server.

### Steps to Restore

1. **Follow Instructions**: Refer to the instructions in the previous section.
2. **API Key/Secret**: Add your API key/secret.
3. **Password**: Use the same password as your local user database. Do not use your rotki.com account password.

> **Note**: If the password is not the same, the database won't open.

![Sign-up with existing premium subscription using a wrong password](/images/rotki_premium_signup_failed.png)

### Sync Data

Refer to the [Sync data with rotki server](#sync-data-with-rotki-server) section to understand how the premium subscription works with multiple accounts/devices and how to sync your data with the rotki server. Syncing is disabled by default.

### Important Considerations

- **User Database vs. Global Database**: Syncing only involves the user database, not the global database.
- **Global Database**: Contains all assets data, global address book for names, and historical prices. It’s recommended to manually move this database as well. It is located in the [rotki data directory](/usage-guides/data-directory).

Alternatively, you can use the [Exporting and importing user asset](/usage-guides/customization.html#exporting-and-importing-user-assets) function instead of moving the entire global database.

## Use an Account from a Different Installation

### Moving Data

To move your data to another system or restore it:

1. Identify the [rotki data directory](/usage-guides/data-directory) on both the source and destination systems.
2. Move the entire data directory from the source system to the destination system.
3. Ensure both systems use the same version of rotki.

## Sign-In

To sign in with your local rotki account, enter your profile name and password at the sign-in prompt. This is not the same as the online account you create at [rotki.com](https://rotki.com/) for a premium subscription.

## Set Up rotki Premium

If you decide to purchase [rotki Premium](https://rotki.com/products/) later, set it up via **API Keys > rotki Premium**.

![Set up rotki premium API key/secret pair in an existing account](/images/rotki_premium_set.png)

To replace or disassociate keys with your current account after setting up premium, use the same page.

![Delete rotki premium API key/secret pair in a premium account](/images/rotki_premium_del.png)

## Sync Data with rotki Server

### Enable Data Sync

To back up your data on the rotki Server:

1. Turn on "Allow data sync with rotki Server". This allows you to restore your data on any account/device using the same API key/secret and account password.

![Sync data with rotki Server](/images/rotki_premium_set_sync_data.png)

### Multiple Accounts/Devices

If you use multiple accounts/devices, the one with the most recent login will upload the latest data to the rotki Server. Using the same account from another device may prompt you to replace your local database with the remote one.

:::warning
Do not run rotki on multiple accounts/devices at the same time, as this opens up the risk of several issues relating to data consistency.
:::

![Replace local database with remote backup](/images/rotki_premium_replace_local_db_with_remote.png)

### Manually Move Global Database

You can also manually move the global database containing assets from one system to another:

1. Locate the [rotki data directory](/usage-guides/data-directory) on the source system.
2. The global database is located at `/global/global.db` under the data directory above. Move it to the equivalent location on the new system.

![Manual DB sync](/images/rotki_premium_manual_db_sync.png)

### Manual Sync

You can manually sync your database by clicking the "cloud" icon in the toolbar.

![Manual DB sync](/images/rotki_premium_automatic_db_sync_failed.png)

If automatic sync fails, a message will appear. For messages like "Remote database larger than the local one," you can perform a "force push" by clicking the button.

## Upgrading rotki After a Long Time

### Upgrade Steps

If you haven't used rotki for more than a year and a half and want to keep your data, follow these steps:

1. **Download rotki 1.25.2**: Get it [here](https://github.com/rotki/rotki/releases/tag/v1.25.2).
2. **Install and Log In**: Install rotki 1.25.2 and log into your account. This will update your database to version 34.
3. **Download the Latest Version**: Get the latest version [here](https://github.com/rotki/rotki/releases/).
4. **Install and Open**: Install the latest version and open your updated database.

### Supported Database Versions

- **rotki 1.25.2 and Earlier**: Supports database versions 1 to 34.
- **rotki 1.26.x and Later**: Supports database version 26 and above.
