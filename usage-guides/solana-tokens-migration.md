# Solana Tokens Migration

We've updated how Solana tokens work in rotki. If you previously added Solana tokens manually, you'll need to migrate them.

## What You'll See

When you open rotki, you'll get a notification telling you that your Solana tokens need to be migrated. This is a one-time process.

![Migration notification](/images/solana_migration_notification.png)

## Migration Steps

### 1. Open the Migration Screen

Click on the notification to go to the migration screen. You'll see all your Solana tokens that need updating.

![Migration screen](/images/solana_migration_screen.png)

### 2. Migrate Each Token

For each token, click the **Migrate** button. You'll need to provide:

- **Token address**: The unique identifier for the token on the Solana blockchain
- **Decimals**: The number of decimal places the token uses (e.g., 6 means the token can be divided into millionths)
- **Token kind**: This should always be set to "SPL token" for Solana tokens

![Token migration form](/images/solana_token_migration_dialog.png)

### 3. Finding Token Information

#### Get the Token Address from CoinGecko

1. Go to [coingecko.com](https://www.coingecko.com)
2. Search for your token
3. Open the token's page
4. Copy the Solana contract address

![Finding token on CoinGecko](/images/coingecko_token_search.png)

![Copying token address from CoinGecko](/images/coingecko_token_address.png)

#### Get the Decimals from Solscan

> **Tip**: CoinGecko token pages have an "Explorers" section with a "Solscan" button that takes you directly to the token's Solscan page.

1. Open [solscan.io](https://solscan.io)
2. Paste the token address in the search
3. Find the **Decimals** field on the token page
4. Note the value

![Finding decimals on Solscan](/images/solscan_token_decimals.png)

### 4. Complete the Migration

1. Enter the token address and decimals
2. Click **Confirm**
3. Repeat for all tokens

## After Migration

Once all tokens are migrated, the notification will no longer appear on subsequent login into your account.
