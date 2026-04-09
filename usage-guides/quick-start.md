---
description: Step-by-step walkthrough to get started with rotki, from installation to generating your first PnL report.
---

# Quick Start Guide

This guide walks you through the essential steps to get rotki up and running. By the end, you'll have your accounts connected, balances visible, and know how to generate a tax report.

> [!TIP]
> **Focused on tax reporting?** This quick start covers the essentials. For a dedicated walkthrough tailored to tax reporting — including connecting data sources, reviewing transactions, and handling edge cases — see the [Tax Accounting Guide](/usage-guides/tax-accounting/guide).

## 1. Install rotki

Download and install rotki for your operating system from the [official website](https://rotki.com/download) or follow the detailed [Installation Guide](/requirement-and-installation/).

## 2. Create Your Account

When you first launch rotki, you'll be prompted to create a local account. This account exists only on your device — rotki doesn't store your data on any server.

![rotki login screen](/images/rotki_login_screen.png)

1. Click **Create Account**
2. Choose a profile name
3. Set a strong password — this encrypts your local database

![Creating a new account](/images/rotki_create_account.png)

> [!WARNING]
> Do not forget your password. It encrypts all your local data and cannot be recovered.

If you have a premium subscription, you can link it during account creation to enable cloud backup and sync. See [Accounts & Sync](/usage-guides/) for full details.

## 3. Optimize Your Setup

Before adding accounts, set up a few things to make account detection and balance queries much faster:

- **Etherscan API Key** — Free and significantly speeds up EVM queries (and is required for some chains like Binance Smart Chain). Go to **API Keys → External Services** and add your key. See [External Services](/usage-guides/integrations/external-services#etherscan).
- **Custom RPC Nodes** — Add your own RPC endpoints (e.g., from Alchemy or Infura) for faster blockchain queries. Configure in **Settings → Blockchain & EVM → RPC Nodes**. See [RPC Node Settings](/usage-guides/settings/blockchain#rpc-node-setting).
- **Indexer Configuration** — Adjust the order of indexers (Etherscan, Blockscout, Routescan) per chain for optimal performance. See [Indexers](/usage-guides/settings/blockchain#indexers).

> [!TIP]
> At minimum, we strongly recommend adding a free Etherscan API key **before** adding your blockchain accounts. Without it, EVM queries and token detection will be significantly slower.

## 4. Add Your Accounts

### Blockchain Accounts

Navigate to **Accounts** in the sidebar and add your blockchain addresses:

1. Select the chain category (EVM, Bitcoin, Substrate, or Solana)
2. Click **Add Account**
3. Enter your address and click **Save**

For EVM addresses, you can select **All Supported Chains** to automatically detect activity across all EVM networks.

![Add a blockchain account](/images/add_blockchain_account.png)

See [Accounts](/usage-guides/portfolio/accounts) for details on xpub support, multi-address imports, and more.

### Exchange Connections

To track exchange balances and trade history:

1. Go to **API Keys → Exchanges** in the sidebar
2. Click **Add an exchange**
3. Enter your read-only API key and secret

![Add API keys for an exchange](/images/rotki_add_exchange_1.png)

See [Exchange API Keys](/usage-guides/integrations/exchange-keys) for the full list of supported exchanges and per-exchange setup instructions.

## 5. View Your Portfolio

Once your accounts are connected, head to the [Dashboard](/usage-guides/portfolio/dashboard) to see your portfolio overview:

![rotki Dashboard](/images/rotki_dashboard.webp)

The dashboard shows:

- **Total Balance** — Your combined net worth across all sources
- **Net Value Graph** — Historical portfolio value over time
- **Balance Breakdown** — Split by exchange, blockchain, and manual balances
- **Assets Table** — All holdings sorted by value

rotki will automatically query balances and detect tokens for your tracked accounts. This initial sync may take a few minutes depending on how many accounts and chains you have.

## 6. Review Your History

Navigate to **History → Events** to see all your transactions, trades, and DeFi interactions. rotki automatically decodes on-chain transactions and categorizes them by event type.

![History Events page](/images/events_filter.png)

You can:

- Filter events by type, time period, or asset
- Edit events that were decoded incorrectly
- Add manual events for off-chain activity

See [Historical Events](/usage-guides/history/events) for the full guide.

## 7. Generate a Tax Report

When you're ready to calculate your taxes:

1. Go to **Profit and Loss Report** in the sidebar
2. Select the reporting period (start and end dates)
3. Review your [Accounting Settings](/usage-guides/settings/accounting) — these control how trades are calculated (FIFO, LIFO, HIFO, or ACB) and whether to apply a tax-free holding period
4. Click **Generate**

![PnL Report](/images/sc_pnl_report.png)

The report calculates profit and loss for every taxable event in the period, broken down by event type (trades, fees, staking rewards, airdrops, etc.). You can export the results as CSV for your tax advisor, and re-run the report with different settings if needed.

> [!IMPORTANT]
> Tax rules vary by jurisdiction. Before filing, consult a tax professional and adjust your accounting settings to match your local requirements.

See [Profit/Loss Report](/usage-guides/history/pnl) for detailed instructions and the [Tax Accounting Guide](/usage-guides/tax-accounting/guide) for a comprehensive walkthrough.

## Next Steps

- **[Settings](/usage-guides/settings/general)** — Customize your profit currency, display preferences, and more
- **[Data Management](/usage-guides/data-management/assets)** — Manage assets, add missing prices, and organize with tags
- **[Premium Features](/premium/)** — Unlock extended timeframes, advanced analytics, cloud sync, and more
