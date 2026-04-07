# Using rotki for Tax Accounting

This guide walks you through using rotki to calculate your cryptocurrency taxes. If you just installed rotki and want to generate a tax report, this is the page for you.

> [!NOTE]
> rotki does not provide tax or legal advice. Always consult a qualified tax advisor for your specific situation. rotki helps you organize your data and generate reports that you can share with your advisor.

## Overview

The two most important sections of rotki for tax accounting are:

1. **[History Events](/usage-guides/historical-events)** — where you review, correct, and customize all of your transactions
2. **[Profit/Loss Report](/usage-guides/pnl)** — where you generate the actual PnL (profit and loss) report for a given time period

Everything else in rotki (adding accounts, importing data, configuring settings) feeds into these two sections.

## Step-by-step tax workflow

### 1. Connect your data sources

Before you can generate a tax report, rotki needs to know about your transactions.

- **Exchanges**: Add API keys for your centralized exchanges under [API Keys](/usage-guides/api-keys). rotki will automatically pull your trade history, deposits, and withdrawals.
- **Blockchain accounts**: Add your EVM, Bitcoin, or Solana addresses under [Accounts & Balances](/usage-guides/accounts-and-balances). rotki will pull and decode on-chain transactions automatically.
- **CSV imports**: For exchanges that don't support API integration (or that no longer exist, like FTX), you can [import CSV files](/usage-guides/import-csv) with your trade history.

### 2. Configure your accounting settings

Go to **Settings → Accounting Settings** ([detailed reference](/usage-guides/customization#accounting-settings)) and configure:

- **Cost basis method**: FIFO, LIFO, HIFO, or ACB — check which method your tax jurisdiction requires. See [accounting rule options explained](/usage-guides/accounting-rules) for details.
- **Crypto to crypto trades**: Whether swapping one crypto for another is a taxable event (it is in most jurisdictions).
- **Tax-free period**: If your country allows tax-free treatment after a holding period (e.g., Germany's 1-year rule), set it here.
- **Profit currency**: The fiat currency your taxes are denominated in (e.g., EUR, USD, GBP). Change this via the currency icon in the top-right menu.

### 3. Review your history events

Go to **History Events** in the left sidebar. This is where all your transactions live. rotki automatically decodes most on-chain transactions, but you should review them for accuracy:

- **Check for missing events**: If you moved assets through unsupported protocols or peer-to-peer, you may need to [add events manually](/usage-guides/historical-events#add--edit-events).
- **Fix incorrectly categorized events**: rotki may not always correctly identify what a transaction represents. See the [event types and subtypes reference](/usage-guides/event-types) to understand each category, and the [common customization guide](/usage-guides/historical-events#common-customization) for how to re-categorize events.
- **Check for missing accounting rules**: Events with a warning icon won't be processed correctly. Either edit the event or add a [missing accounting rule](/usage-guides/historical-events#missing-accounting-rule).
- **Match asset movements**: If you have exchange deposits/withdrawals that aren't linked to on-chain transactions, use the [asset movement matching](/usage-guides/historical-events#unmatched-asset-movements) feature.

### 4. Add missing prices

Some assets or time periods may not have price data available from rotki's oracles. Go to **Add Missing Prices** ([guide](/usage-guides/custom-price)) to manually specify prices for assets that rotki can't find automatically.

### 5. Generate your PnL report

1. Click **Profit and Loss Report** in the left sidebar
2. Select the time period (e.g., the tax year)
3. Click **Generate**

The report shows:

- A summary of total profit/loss and how much is taxable
- A detailed table of every event that contributed to the calculation
- The cost basis for each sell event (where the sold assets were originally acquired)

### 6. Export and review

- Click **Export CSV** to download the report for use in Google Sheets or LibreOffice
- Share the export with your tax advisor for review
- See the [PnL report guide](/usage-guides/pnl#results-of-the-pnl-report) for column definitions

## Common issues and how to fix them

| Problem                                       | Likely cause                                                 | Solution                                                                                                                                    |
| --------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| "No documented acquisition found"             | rotki doesn't know when/where you originally bought an asset | [Add a manual trade](/usage-guides/historical-events#add--edit-events) or acquisition event                                                 |
| Event counted as taxable when it shouldn't be | Wrong event type/subtype                                     | [Edit the event](/usage-guides/historical-events#common-customization) to the correct type                                                  |
| Missing price for an asset                    | Oracle doesn't have data for that asset/timestamp            | [Add missing price manually](/usage-guides/custom-price)                                                                                    |
| PnL numbers seem wrong                        | Accounting settings may not match your jurisdiction          | Review [accounting settings](/usage-guides/customization#accounting-settings) and [accounting rule options](/usage-guides/accounting-rules) |
| Report generation gets stuck                  | Often caused by exchange API rate limits                     | Check [troubleshooting](/usage-guides/pnl#pnl-report-generation-gets-stuck)                                                                 |

## What rotki currently does NOT support

Understanding what's not available saves you time:

- **Custom cost basis overrides**: You cannot set an arbitrary cost basis for assets you already hold (e.g., market price on a specific date when moving tax jurisdictions). The workaround is to add a manual trade that represents the acquisition at the desired price. This is tracked in [rotki/rotki#9816](https://github.com/rotki/rotki/issues/9816).
- **Custom counterparty definitions in accounting rules**: Accounting rules can be set per counterparty, but only for counterparties that rotki already recognizes (protocol identifiers like "uniswap", "aave", etc.). You cannot define your own custom smart contract as a counterparty for accounting rule purposes. This is tracked in [rotki/rotki#9803](https://github.com/rotki/rotki/issues/9803).

## Further reading

- [Event types and subtypes reference](/usage-guides/event-types) — what each event category means
- [Accounting rule options explained](/usage-guides/accounting-rules) — detailed explanation of every accounting setting
- [Profit/Loss Report guide](/usage-guides/pnl) — full report documentation
- [History Events guide](/usage-guides/historical-events) — managing and customizing your transaction history
- [Import CSV](/usage-guides/import-csv) — importing data from unsupported exchanges
