---
description: Connecting centralized exchanges to rotki via API keys, with per-exchange setup instructions.
---

# Exchange API Keys

In this section, we will explain how to connect exchanges to rotki via API Keys.
Go to the `API Keys` menu in the sidebar.

## rotki Premium

![Set up rotki premium API key/secret pair in an existing account](/images/rotki_premium_set.png)

A rotki premium subscription is activated in the app by adding your **API Key** and **API Secret**.
If you don't have a premium subscription yet, you can subscribe at [rotki.com/products](https://rotki.com/products/).

For detailed information about premium plans, pricing, payment options, and how to use your premium API key see the [Premium documentation](/premium/).

## Exchanges API Keys

![List of connected exchanges](/images/rotki_add_exchange_2.png)

You can integrate many different exchanges with rotki via API Keys.
Currently supported exchanges are:

- Kraken (Spot and Future)
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

![Add API keys for a new exchange](/images/rotki_add_exchange_1.png)

### Steps to Add Exchange API Key:

1. Create API key on your exchange (see [API key permissions](#api-key-permissions))
2. Navigate to `API Keys > Exchanges` in the left sidebar
3. Click button `Add an exchange` to open addition menu
4. Enter your:
   - API Key
   - API Secret (for the majority of exchanges)
   - Password (for some exchanges)
5. Click `Save`

### After Adding:

- Successful addition: Exchange will appear in your list
- If failed:
  - Verify key and secret are correct
  - Some exchanges may have issues due to timestamp difference between the computer and the server (e.g. binance, read [this](https://github.com/tiagosiebler/awesome-crypto-examples/wiki/Timestamp-for-this-request-is-outside-of-the-recvWindow))

### Sync Settings:

- Option to enable/disable exchange synchronization
- Consider disabling to avoid IP bans from frequent syncs

> **Note**: At the moment, [margin trades](https://github.com/rotki/rotki/issues/1980) and [future trades](https://github.com/rotki/rotki/issues/1606) are not yet supported in rotki.

### API key permissions

rotki only needs read-only permissions for your accounts. As a general rule, exchanges (e.g., Binance, Coinbase Pro) group all the read-only permissions as "read" or "view".

![Simple API key permissions](/images/add_exchange_api_keys_binance.png)

In the case of an exchange providing a more granular permissions scheme (e.g., Coinbase, Kraken) or having additional options (e.g., query limits, passphrase), refer to the exchange documentation or get in touch via their customer support channel.

![Granular API key permissions](/images/add_exchange_api_keys_coinbase.png)

You may also try creating an API key with the minimum read-related permissions, then adding it in rotki and finally checking that the connection was successful and data was loaded as expected. Otherwise, try again adding more read-related permissions.

#### Kraken

When inputting the API key for Kraken, you need to specify the type of your Kraken account, which depends on your Kraken account verification level. Refer to [this](https://support.kraken.com/hc/en-us/articles/360001395743-Verification-levels-explained) for more information.

![Kraken account type](/images/exchanges_add_kraken.png)

To track your Kraken Futures balances, you can optionally provide your Futures API key and Futures API secret in the same Kraken exchange form. Both fields must be provided together. When set, rotki will query your Kraken Futures cash, margin, and flex balances and merge them into your overall Kraken balance total.

#### Binance / Binance US

To improve the speed of querying trade information using the Binance API, you can specify which market pairs to query instead of querying all possible pairs. This reduces the number of requests made to Binance servers, avoiding potential rate limits and failures. To select specific markets, edit your Binance exchange instance configuration.

![Edit Binance in the exchanges section](/images/exchanges_edit_binance.png)

##### Market Pairs (required)

Choose the markets in the `Filter market pair(s)` search.

::: warning
**Due to Binance API limitations**, querying trade information does not work without specifying market pairs. Binance's endpoint requires every possible market pair to be queried individually, and their rate limits make it impossible to query all markets for your entire history. This API issue has existed for years and has not been fixed by Binance. You must select which specific markets you want to query for the integration to work properly.
:::

![Binance markets selection](/images/binance_markets_selection.png)

Once finished, click on save.
