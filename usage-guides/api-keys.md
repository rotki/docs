# API Keys

In this section, we will explain various API Keys you can add to rotki.
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

## External services

### Why External API Keys Are Needed

Required for accessing:

- Historical crypto prices
- EVM transactions
- Other external data services

### How to External Add API Keys:

1. Create free account on service website
2. Generate API key
3. In rotki:
   - Go to `API Keys → External Services`
   - Enter your API key(s)

![External services](/images/external_services.png)

### Etherscan

We **strongly recommend** getting an Etherscan API Key - it's completely free and will make the queries much faster!
Without it, the queries will be really slow. You just need to:

1. Create an account at [here](https://etherscan.io/register)
2. Generate a free API Key
3. Add the key to rotki.

You only need one Etherscan API key for all EVM chains since the key is now unified.

### Loopring balances

To have your Loopring balances detected, you will need an API Key from Loopring. To get one, visit [Loopring Security](https://loopring.io/#/layer2/security) and unlock your account. In the list of options, click on **Export Account**.

![Get Loopring keys](/images/get_loopring_keys.png)

Then in rotki, you need to add the API key in the `Loopring` section.

After following these steps, your balances in the dashboard will be updated including the Loopring information.

![Loopring balances in the UI](/images/loopring_balances.png)

### Monerium

You can integrate Monerium with rotki to import your transaction data. This feature is only available for premium users.

As long as you provide Monerium credentials, all Monerium transactions on Mainnet, Polygon, and Gnosis chain will be decorated with bank data (or chain bridging data), which you can also see in the Monerium app.

1. For bank transfers from/to your address, you will be able to see the destination/source IBAN along with the memo of the transfer.
2. For automatic EURe bridging between EVM chains, you will see amounts, from/to EVM chains along with from/to address.

![Monerium decorated transactions](/images/monerium_transactions.png)

#### Adding Monerium OAuth Token

![Monerium get access token](/images/monerium_get_access_token.png)
![Monerium OAuth](/images/monerium_oauth.png)

To connect your Monerium account:

1. **Get Access Token:**
   - In rotki, navigate to `API Keys → External Services → Monerium`.
   - Click the **Get access token** button.

2. **Complete OAuth Flow:**
   - You will be redirected to rotki.com to connect via Monerium OAuth.
   - Follow the authentication flow on the Monerium OAuth page.

3. **Return to rotki:**
   - **Standard mode**: You will be automatically redirected back to the app after completing the OAuth flow.
   - **Docker mode**: You will need to manually copy the access token and refresh token from the OAuth page and input them into rotki.

4. **Redecode Transactions:**
   - After successfully adding your Monerium credentials, you need to redecode the Monerium transactions in the history events section to see the updated bank data. See [Redecoding blockchain transactions](/usage-guides/historical-events#redecoding-blockchain-transactions) for more information on how to redecode transactions.

> **Note**: The Monerium credentials only provide read-only access to your Monerium data. When you authenticate, Monerium's OAuth consent screen may show that rotki is requesting broad permissions. This is because Monerium's API doesn't currently support granular permission scopes, so all OAuth tokens appear to request full access. However, rotki only performs read-only operations and cannot modify your account, initiate transfers, or make changes to your Monerium data. The OAuth authentication flow described above is mandated by Monerium's API requirements, not a design choice by rotki. rotki simply integrates with their authentication system as required.

### Gnosis Pay

![Gnosis Pay SIWE](/images/gnosis_pay_siwe.png)

You can integrate Gnosis Pay with rotki to import your transaction data. This feature is only available for premium users.

#### Adding Gnosis Pay Access Token

To connect your Gnosis Pay account:

1. **Connect Wallet:**
   - In rotki, navigate to `API Keys → External Services → Gnosis Pay`.
   - Click the **Sign in with Ethereum** button.
   - Connect the wallet that controls the Safe wallet of your Gnosis Pay account.

2. **Sign Message:**
   - Sign the message to authenticate and get the access token.

3. **Redecode Transactions:**
   - After successfully connecting your Gnosis Pay account, you need to redecode the Gnosis Pay transactions in the history events section to enrich the transaction details. See [Redecoding blockchain transactions](/usage-guides/historical-events#redecoding-blockchain-transactions) for more information on how to redecode transactions.

> **Note**: The access token only provides read-only access to your Gnosis Pay data. The "Sign in with Ethereum" authentication process described above is mandated by Gnosis Pay's API requirements, not a design choice by rotki. rotki simply integrates with their authentication system as required.

### The Graph

rotki uses The Graph to obtain Balancer balances and particular ENS data. You can create one [here](https://thegraph.com/studio/apikeys).

![Create The Graph API key](/images/create_the_graph_api_key.png)

After creating the API key, you can add it to rotki. Additionally, ensure that the generated API key is authorized for the Balancer and ENS subgraphs.

![The Graph subgraphs](/images/the_graph_subgraphs.png)

### DefiLlama

rotki integrates with DefiLlama for price data. An API key is not required, but a paid API key will provide higher rate limits. You can find more information about their API [here](https://defillama.com/pro-api).

### CoinGecko

rotki uses CoinGecko for cryptocurrency data. An API key is not required, but a paid API key will provide higher rate limits. You can find more information about their API [here](https://www.coingecko.com/en/api).
