# Import CSV

Go to `Import Data` menu in the sidebar.

## Import exchange data (CSV)

For exchanges that don't support integration through API keys (or haven't integrated to rotki), you can still import your trades or transactions.

![Import CSV Data](/images/sc_data_import.png)

### Steps to Import CSV Files:

1. Export CSV from your exchange
2. In rotki:
   - Navigate to `Import Data`
   - Select your CSV file

### Date Format Settings:

If time format doesn't match rotki's default:

1. Enable `Use custom date format to parse your file`
2. Specify your CSV's time format

### Import Process:

- Select data source
- Click "Import Data" in left sidebar
- Follow provided instructions

### Cointracking.info

rotki can import any trade CSV data exported from [cointracking.info](https://cointracking.info/). But in general, it's not recommended to utilize cointracking as their exported data are missing a lot of information.

### Binance.com

rotki can import a CSV data file exported from [binance.com](https://binance.com/). But due to Binance's CSV format, some data may not be importable. You will see warnings if this happens.

By importing a CSV file, you can import more than with the API. Particularly: Trades, Deposits and Withdrawals, Small assets exchange BNB, ETH 2.0 Staking and ETH 2.0 Staking Rewards, Launchpool Interests, POS savings interest, POS savings purchase, POS savings redemption.

### BitMEX.com

rotki can import a CSV data file exported from [BitMex](https://bitmex.com/). You may see warnings if data can't be imported. If this happens, please reach out to us on Discord or open an issue on GitHub.

### Bitstamp.net

rotki can import a CSV data file exported from [Bitstamp](https://www.bitstamp.net/). You may see warnings if data can't be imported. If this happens, please reach out to us on Discord or open an issue on GitHub.

### Bittrex

[Bittrex](https://bittrexglobal.com/) is a now bankrupt exchange and as such you probably can use this only if you had exported the files while it was running.

rotki can import trades, deposit/withdrawals from the different bittrex CSVs.

### Bisq

You can import data from [Bisq](https://bisq.network/) into rotki. All trades from Bisq can be picked up by the given CSV.

### Block.fi

[BlockFi](https://en.wikipedia.org/wiki/BlockFi) is a now bankrupt exchange and as such you probably can use this only if you had exported the files while it was running.

rotki can import two different CSV files from BlockFi. One for the trades and one for all other transactions.

### Blockpit

rotki can import trades and other activity data from [Blockpit](https://www.blockpit.io/)'s CSV files.

### Bitcoin.tax

You can import trades, income and spending CSV files from [Bitcoin.tax](https://bitcoin.tax/).

### Crypto.com mobile

You can import data from [crypto.com](https://crypto.com/) mobile app into rotki. Note that this concerns only the Crypto.com mobile application. If you want to connect your Crypto.com Exchange account, please wait until we support it and then connect to it as an exchange.

### Kucoin

rotki can import the trades CSV file from [Kucoin](https://www.kucoin.com/).

### Nexo

rotki can import the transactions CSV file from [Nexo](https://nexo.com/).

### ShapeShift.com

You can import trade CSV data file exported from [ShapeShift](https://shapeshift.com/). Transactions will come from adding your Blockchain Accounts used with ShapeShift to rotki.

Import data in the same section as the image above in the prior heading. When exporting trades from ShapeShift, the selected wallet may show DEX trades in the user interface. If it is not the Native wallet, DEX trades may not show up in the user interface, but they still export to CSV. This importer ignores DEX trades, as they are covered by premium support for Uniswap and SushiSwap.

### Uphold.com

You can import transaction history CSV data exported from the [Uphold](https://uphold.com/) activity page. Transactions will be created when the row's origin currency and destination currency are the same. Trades will be created if the currencies differ and a rate will be determined automatically.

## rotki Generic Import

You can import data (trades & events) from exchanges not supported by rotki by clicking "Import Data" on the left sidebar, selecting `Custom Import` and following the prompt. This involves the user converting the source (a not directly supported exchange, protocol, etc.) data to match the import format of rotki.

> **Note**: Keep in mind that all assets that you enter are identified by their asset identifier and not the symbol, as symbols are not unique. The identifier differs per asset and at the moment for ERC20 tokens follows the [CAIP-19](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-19.md) format, and for others, it's just the asset symbol or a random string for manually input tokens.

For the CAIP-19 format, it's essentially calculated by knowing the chain ID and the address of your token. So for mainnet (chain ID 1) and USDT (0xdAC17F958D2ee523a2206206994597C13D831ec7), it's `eip155:1/erc20:0xdAC17F958D2ee523a2206206994597C13D831ec7`.

You can easily find the identifier of each asset by going to `Manage Assets > Assets` section and copying the identifier of the asset in question.

The import is split into two types:

### rotki Generic Trades Import

This is solely for importing generic trades. The expected file format is **CSV** with the following headers and descriptions as a guide:

1. **Location**: This is the source of the data. It should be one of rotki's [supported locations](#supported-locations). If it is not supported, use `"external"`.
2. **Spend Currency**: The currency you spent in the trade, can be a token address (e.g., `eip155:1/erc20:0xdAC17F958D2ee523a2206206994597C13D831ec7`) or symbol (e.g., `BTC`).
3. **Spend Amount**: The amount of currency you spent.
4. **Receive Currency**: The currency you received in the trade, can be a token address or symbol.
5. **Receive Amount**: The amount of currency you received.
6. **Fee**: The amount charged for the trade. This is optional.
7. **Fee Currency**: The currency in which the fee was charged. This is optional.
8. **Description**: A description of the trade if any. This is optional.
9. **Timestamp**: The UTC Unix timestamp at which the trade took place. This is a milliseconds timestamp.

A sample generic trades template can be found below:

<CsvTable title="rotki Generic Trades Template" csvUrl="/files/rotki_generic_trades.csv" />

### rotki Generic Events Import

This is for importing generic events. Supported events are `"Deposit"`, `"Withdrawal"`, `"Income"`, `"Loss"`, `"Spend"` and `"Staking"`. The expected file format is **CSV** with the following headers and descriptions as a guide:

1. **Type**: The event type. It can be one of `"Deposit"`, `"Withdrawal"`, `"Income"`, `"Loss"`, `"Spend"` or `"Staking"`.
2. **Location**: This is the source of the data. It should be one of rotki's [supported locations](#supported-locations). If it is not supported, use `"external"`.
3. **Currency**: The currency used during the specified event.
4. **Amount**: The amount of the currency used by the event.
5. **Fee**: The amount charged for the event. This is optional.
6. **Fee Currency**: The currency in which the fee was charged. This is optional.
7. **Description**: A description of the event that was carried out, if any. This is optional.
8. **Timestamp**: The UTC Unix timestamp at which the event took place. This is a milliseconds timestamp.

A sample generic events template can be found below:

<CsvTable title="rotki Generic Events Template" csvUrl="/files/rotki_generic_events.csv" />

### Supported Locations

A list of supported locations in rotki are `"external"`, `"kraken"`, `"poloniex"`, `"bittrex"`, `"binance"`, `"bitmex"`, `"coinbase"`, `"banks"`, `"blockchain"`, `"gemini"`, `"equities"`, `"realestate"`, `"commodities"`, `"cryptocom"`, `"uniswap"`, `"bitstamp"`, `"binanceus"`, `"bitfinex"`, `"bitcoinde"`, `"iconomi"`, `"kucoin"`, `"balancer"`, `"loopring"`, `"ftx"`, `"nexo"`, `"blockfi"`, `"independentreserve"`, `"gitcoin"`, `"sushiswap"`, `"shapeshift"`, `"uphold"`, `"bitpanda"`, `"bisq"`, `"ftxus"` and `"okx"`.

> **Note**: In the columns where an asset is expected, you will need to use the identifier that such asset has in rotki; otherwise, the row won't be read.

> **Note**: If at any point, you're confused about the CSV format, feel free to send us a message on [Discord](https://discord.rotki.com).
