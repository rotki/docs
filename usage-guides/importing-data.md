# Importing data

In this section, we will explain how you can import data by integrating with external services such as crypto exchanges.

### Adding an exchange

![Adding exchanges](/images/rotki_add_exchange_1.png)

You can integrate many different exchanges with Rotki. Currently supported exchanges are:

- Kraken
- Poloniex
- Binance
- Bitmex
- Coinbase
- Coinbase Pro
- Gemini
- Bitstamp
- Binance US
- Bitfinex
- Bitcoin.de
- Iconomi
- KuCoin
- Independent Reserve
- Bitpanda
- OKX
- Woo
- Bybit
- HTX

To do so, you need to go to your exchange and create an API key (see the section [API key permissions](#api-key-permissions)).

Click on the "API keys" on the left sidebar. This will take you to the place where you can add new exchange API keys. Press the plus button to open the exchange addition menu.

![Add API keys for a new exchange](/images/rotki_add_exchange_2.png)

Then copy and paste the `API Key` and the `API Secret` in the respective text fields and press Save.

If all went well, you should be able to see your newly added exchange. If not, please double-check that the key and secret are correct.

You also have the option to enable/disable synchronization for the connected exchanges. Usually, you may want to disable synchronization to prevent your IP from getting banned due to too many syncs.

> **Note**: At the moment, [margin trades](https://github.com/rotki/rotki/issues/1980) and [future trades](https://github.com/rotki/rotki/issues/1606) are not yet supported in Rotki.

![List of connected exchanges](/images/rotki_add_exchange_3.png)

## API key permissions

Rotki only needs read-only permissions for your accounts. As a general rule, exchanges (e.g., Binance, Coinbase Pro) group all the read-only permissions as "read" or "view".

![Simple API key permissions](/images/add_exchange_api_keys_binance.png)

In the case of an exchange providing a more granular permissions scheme (e.g., Coinbase, Kraken) or having additional options (e.g., query limits, passphrase), refer to the exchange documentation or get in touch via their customer support channel.

![Granular API key permissions](/images/add_exchange_api_keys_coinbase.png)

You may also try creating an API key with the minimum read-related permissions, then adding it in Rotki and finally checking that the connection was successful and data was loaded as expected. Otherwise, try again adding more read-related permissions.

### Kraken

When inputting the API key for Kraken, you need to specify the type of your Kraken account, which depends on your Kraken account verification level. Refer to [this](https://support.kraken.com/hc/en-us/articles/360001395743-Verification-levels-explained) for more information.

![Kraken account type](/images/exchanges_add_kraken.png)

### Binance / Binance US

To improve the speed of querying trade information using the Binance API, you can specify which market pairs to query instead of querying all possible pairs. This reduces the number of requests made to Binance servers, avoiding potential rate limits and failures. To select specific markets, edit your Binance exchange instance configuration.

![Edit Binance in the exchanges section](/images/exchanges_edit_binance.png)

And choose the markets in the `Filter market pair(s)` search.

![Binance markets selection](/images/binance_markets_selection.png)

Once finished, click on save.

## External services

Rotki relies on various external services for data such as historical crypto prices or EVM transactions. To get that data, some of these services require API keys. So you should go to their webpage, create a free account, and generate an API key. Once this is done, you can enter the API key in the section of the API keys page.

Go to `API Keys → External Services`.

### Etherscan

At the moment, there is no compulsory API key. But if you don't use your own node, Etherscan queries without an API key are really slow. So if you don't already have an account with them, please create one [here](https://etherscan.io/register) and then generate a free API key and set it in the app as explained above. It's free of charge.

![Add Etherscan keys](/images/add_etherscan_keys.png)

### Loopring balances

To have your Loopring balances detected, you will need an API Key from Loopring. To get one, visit [Loopring Security](https://loopring.io/#/layer2/security) and unlock your account. In the list of options, click on **Export Account**.

![Get Loopring keys](/images/get_loopring_keys.png)

Then in Rotki, you need to add the API key in the `Loopring` section.

![Add Loopring key](/images/loopring_add_key.png)

After following these steps, your balances in the dashboard will be updated including the Loopring information.

![Loopring balances in the UI](/images/loopring_balances.png)

### Monerium

As long as you provide Monerium credentials, all Monerium transactions on Mainnet, Polygon, and Gnosis chain will be decorated with bank data (or chain bridging data), which you can also see in the Monerium app.

1. For bank transfers from/to your address, you will be able to see the destination/source IBAN along with the memo of the transfer.
2. For automatic EURe bridging between EVM chains, you will see amounts, from/to EVM chains along with from/to address.

![Monerium decorated transactions](/images/monerium_transactions.png)

> **Note**: Monerium API can only use basic authentication at the moment. We are in contact with their team and they will add API keys eventually. But for now, they only have basic authentication, which means your username and password are stored in Rotki (encrypted). Take necessary security precautions and don't use unless you understand the potential risks.

![Add Monerium](/images/monerium_add_key.png)

### Gnosis Pay

You can integrate Gnosis Pay with Rotki to import your transaction data. Note that this feature is **experimental** and is only available for premium users.

#### Adding Gnosis Pay Session Token

To add your Gnosis Pay session token:

1. **Login to Gnosis Pay:**

   - Go to [Gnosis Pay](https://app.gnosispay.com/dashboard) and log in to your account.

2. **Retrieve the Session Token:**

   - Open your browser's developer tools (right-click on the page and select `Inspect` or press `F12` / `Ctrl+Shift+I`/`Cmd+Option+I`).
   - Go to the **Application** tab in the developer tools.
   - In the **Storage** section on the left sidebar, click on **Cookies** and select `https://app.gnosispay.com` (marked as **1** in the image).
   - Look for the cookie named `__Secure-authjs.session-token` in the list (marked as **2** in the image).
   - Copy the value of the cookie from the **Cookie Value** section at the bottom (marked as **3** in the image).

   ![Retrieve Gnosis Pay Session Token](/images/gnosispay_add_key.png)

3. **Add Session Token to Rotki:**
   - In Rotki, navigate to `API Keys → External Services`.
   - Scroll to the **Gnosis Pay** section.
   - Paste the session token into the **Session Token** field.
   - Click **Save**.

> **Note**: The session token only provides read-only access to your Gnosis Pay data

### The Graph

Rotki uses The Graph to obtain Balancer balances and particular ENS data. You can create one [here](https://thegraph.com/studio/apikeys).

![Create The Graph API key](/images/create_the_graph_api_key.png)

After creating the API key, you can add it to Rotki. Additionally, ensure that the generated API key is authorized for the Balancer and ENS subgraphs.

![The Graph subgraphs](/images/the_graph_subgraphs.png)

## Import exchange data (CSV)

For exchanges that don't support integration through API keys (or haven't integrated to Rotki), you can still import your trades or transactions. First, export the CSV file from the exchange's user interface. Then, import this CSV file into Rotki.

Go to `Import Data`.

![Import CSV Data](/images/sc_data_import.png)

You can only use a CSV file here. Additionally, the time format in the CSV might differ from what Rotki expects. To address this, enable the `Use custom date format to parse your file` setting before clicking `Import`. Then, specify the time format used in the CSV file.

### Cointracking.info

You can also import data from [cointracking.info](https://cointracking.info/) into Rotki by clicking on "Import Data" on the left sidebar and then following the instructions.

Rotki can import any trade CSV data exported from cointracking.info. But in general, it's not recommended to utilize cointracking as their exported data are missing a lot of information.

### Binance.com

You can import data from [binance.com](https://binance.com/) into Rotki by clicking on "Import Data" on the left sidebar and then following the instructions.

Rotki can import a CSV data file exported from Binance. But due to Binance's CSV format, some data may not be importable. You will see warnings if this happens.

By importing a CSV file, you can import more than with the API. Particularly: Trades, Deposits and Withdrawals, Small assets exchange BNB, ETH 2.0 Staking and ETH 2.0 Staking Rewards, Launchpool Interests, POS savings interest, POS savings purchase, POS savings redemption.

### BitMEX.com

You can import data from [bitmex.com](https://bitmex.com/) into Rotki by clicking on "Import Data" on the left sidebar and then following the instructions.

Rotki can import a CSV data file exported from BitMEX. You may see warnings if data can't be imported. If this happens, please reach out to us on Discord or open an issue on GitHub.

### Bitstamp.net

You can import data from [bitstamp.net](https://www.bitstamp.net/) into Rotki by clicking on "Import Data" on the left sidebar and then following the instructions.

Rotki can import a CSV data file exported from Bitstamp. You may see warnings if data can't be imported. If this happens, please reach out to us on Discord or open an issue on GitHub.

### ShapeShift.com

You can import trade CSV data file exported from ShapeShift.com. Transactions will come from adding your Blockchain Accounts used with ShapeShift to Rotki.

Import data in the same section as the image above in the prior heading. When exporting trades from ShapeShift, the selected wallet may show DEX trades in the user interface. If it is not the Native wallet, DEX trades may not show up in the user interface, but they still export to CSV. This importer ignores DEX trades, as they are covered by premium support for Uniswap and SushiSwap.

### Uphold.com

You can import transaction history CSV data exported from the uphold.com activity page. Transactions will be created when the row's origin currency and destination currency are the same. Trades will be created if the currencies differ and a rate will be determined automatically.

## Rotki Generic Import

You can import data (trades & events) from exchanges not supported by Rotki by clicking "Import Data" on the left sidebar, selecting "Custom Import" and following the prompt. This involves the user converting the source (a not directly supported exchange, protocol, etc.) data to match the import format of Rotki.

> **Note**: Keep in mind that all assets that you enter are identified by their asset identifier and not the symbol, as symbols are not unique. The identifier differs per asset and at the moment for ERC20 tokens follows the [CAIP-19](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-19.md) format, and for others, it's just the asset symbol or a random string for manually input tokens.

For the CAIP-19 format, it's essentially calculated by knowing the chain ID and the address of your token. So for mainnet (chain ID 1) and USDT (0xdAC17F958D2ee523a2206206994597C13D831ec7), it's `eip155:1/erc20:0xdAC17F958D2ee523a2206206994597C13D831ec7`.

You can easily find the identifier of each asset by going to `Manage Assets > Assets` section and copying the identifier of the asset in question.

The import is split into two types:

### Rotki Generic Trades Import

This is solely for importing generic trades. The expected file format is **CSV** with the following headers and descriptions as a guide:

1. **Location**: This is the source of the data. It should be one of Rotki's [supported locations](#supported-locations). If it is not supported, use `"external"`.
2. **Base Currency**: The currency bought in a `"Buy"` and sold in a `"Sell"`. e.g., BTC/ETH where BTC is the base currency.
3. **Quote Currency**: The currency sold in a `"Buy"` and bought in a `"Sell"`, e.g., BTC/ETH where ETH is the quote currency.
4. **Type**: The type of trade made. It can either be a `"Buy"` or a `"Sell"`.
5. **Buy Amount**: The amount of the currency bought.
6. **Sell Amount**: The amount of the currency sold.
7. **Fee**: The amount charged for the trade. This is optional.
8. **Fee Currency**: The currency in which the fee was charged. This is optional.
9. **Description**: A description of the trade if any. This is optional.
10. **Timestamp**: The UTC Unix timestamp at which the trade took place. This is a milliseconds timestamp.

A sample generic trades template can be found below:

<CsvTable title="rotki Generic Trades Template" csvUrl="/files/rotki_generic_trades.csv" />

### Rotki Generic Events Import

This is for importing generic events. Supported events are `"Deposit"`, `"Withdrawal"`, `"Income"`, `"Loss"`, `"Spend"` and `"Staking"`. The expected file format is **CSV** with the following headers and descriptions as a guide:

1. **Type**: The event type. It can be one of `"Deposit"`, `"Withdrawal"`, `"Income"`, `"Loss"`, `"Spend"` or `"Staking"`.
2. **Location**: This is the source of the data. It should be one of Rotki's [supported locations](#supported-locations). If it is not supported, use `"external"`.
3. **Currency**: The currency used during the specified event.
4. **Amount**: The amount of the currency used by the event.
5. **Fee**: The amount charged for the event. This is optional.
6. **Fee Currency**: The currency in which the fee was charged. This is optional.
7. **Description**: A description of the event that was carried out, if any. This is optional.
8. **Timestamp**: The UTC Unix timestamp at which the event took place. This is a milliseconds timestamp.

A sample generic events template can be found below:

<CsvTable title="rotki Generic Events Template" csvUrl="/files/rotki_generic_events.csv" />

### Supported Locations

A list of supported locations in Rotki are `"external"`, `"kraken"`, `"poloniex"`, `"bittrex"`, `"binance"`, `"bitmex"`, `"coinbase"`, `"banks"`, `"blockchain"`, `"gemini"`, `"equities"`, `"realestate"`, `"commodities"`, `"cryptocom"`, `"uniswap"`, `"bitstamp"`, `"binanceus"`, `"bitfinex"`, `"bitcoinde"`, `"iconomi"`, `"kucoin"`, `"balancer"`, `"loopring"`, `"ftx"`, `"nexo"`, `"blockfi"`, `"independentreserve"`, `"gitcoin"`, `"sushiswap"`, `"shapeshift"`, `"uphold"`, `"bitpanda"`, `"bisq"`, `"ftxus"` and `"okx"`.

> **Note**: In the columns where an asset is expected, you will need to use the identifier that such asset has in Rotki; otherwise, the row won't be read.

> **Note**: If at any point, you're confused about the CSV format, feel free to send us a message on [Discord](https://discord.rotki.com).
