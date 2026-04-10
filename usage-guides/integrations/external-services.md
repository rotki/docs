---
description: Configuring external service API keys such as Etherscan, CryptoCompare, and other data providers.
---

# External Services

## Why External API Keys Are Needed

Required for accessing:

- Historical crypto prices
- EVM transactions
- Other external data services

## How to Add External API Keys:

1. Create free account on service website
2. Generate API key
3. In rotki:
   - Go to `API Keys → External Services`
   - Enter your API key(s)

![External services](/images/external_services.png)

## Etherscan

We **strongly recommend** getting an Etherscan API Key - it's completely free and will make the queries much faster!
Without it, the queries will be really slow. You just need to:

1. Create an account at [here](https://etherscan.io/register)
2. Generate a free API Key
3. Add the key to rotki.

You only need one Etherscan API key for all EVM chains since the key is now unified.

## Blockscout

Blockscout is an open-source blockchain explorer that rotki can use as an alternative data source for on-chain transactions and token transfers. You can add per-chain API keys, allowing rotki to query Blockscout instances for specific EVM chains. This can be useful as a fallback or supplement to Etherscan.

## Helius

Helius is a Solana indexer and RPC provider. Adding a Helius API key allows rotki to query Solana transaction data more reliably and with higher rate limits. You can get an API key from [helius.dev](https://www.helius.dev/).

## CryptoCompare

CryptoCompare provides historical cryptocurrency price data. While rotki can use CryptoCompare without an API key, adding one increases the rate limits for price queries. You can get a free API key from [cryptocompare.com](https://www.cryptocompare.com/cryptopian/api-keys).

## Beaconchain

Beaconchain provides Ethereum consensus layer (beacon chain) data. Adding an API key allows rotki to query validator information with higher rate limits. You can get an API key from [beaconcha.in](https://beaconcha.in/user/settings#api).

## OpenSea

OpenSea is an NFT marketplace and data provider. Adding an OpenSea API key allows rotki to fetch NFT data such as collection information and valuations. You can request an API key from [opensea.io](https://docs.opensea.io/reference/api-keys).

## Alchemy

Alchemy is a multi-chain data provider and price oracle. rotki can use Alchemy for blockchain data queries and as an additional price source. Adding an API key improves rate limits and reliability. You can get a free API key from [alchemy.com](https://www.alchemy.com/).

## Loopring balances

To have your Loopring balances detected, you will need an API Key from Loopring. To get one, visit [Loopring Security](https://loopring.io/#/layer2/security) and unlock your account. In the list of options, click on **Export Account**.

![Get Loopring keys](/images/get_loopring_keys.png)

Then in rotki, you need to add the API key in the `Loopring` section.

After following these steps, your balances in the dashboard will be updated including the Loopring information.

![Loopring balances in the UI](/images/loopring_balances.png)

## Monerium

You can integrate Monerium with rotki to import your transaction data. This feature is only available for premium users.

As long as you provide Monerium credentials, all Monerium transactions on Mainnet, Polygon, and Gnosis chain will be decorated with bank data (or chain bridging data), which you can also see in the Monerium app.

1. For bank transfers from/to your address, you will be able to see the destination/source IBAN along with the memo of the transfer.
2. For automatic EURe bridging between EVM chains, you will see amounts, from/to EVM chains along with from/to address.

![Monerium decorated transactions](/images/monerium_transactions.png)

### Adding Monerium OAuth Token

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
   - After successfully adding your Monerium credentials, you need to redecode the Monerium transactions in the history events section to see the updated bank data. See [Redecoding blockchain transactions](/usage-guides/history/events#redecoding-blockchain-transactions) for more information on how to redecode transactions.

> **Note**: The Monerium credentials only provide read-only access to your Monerium data. When you authenticate, Monerium's OAuth consent screen may show that rotki is requesting broad permissions. This is because Monerium's API doesn't currently support granular permission scopes, so all OAuth tokens appear to request full access. However, rotki only performs read-only operations and cannot modify your account, initiate transfers, or make changes to your Monerium data. The OAuth authentication flow described above is mandated by Monerium's API requirements, not a design choice by rotki. rotki simply integrates with their authentication system as required.

## Gnosis Pay

![Gnosis Pay SIWE](/images/gnosis_pay_siwe.png)

You can integrate Gnosis Pay with rotki to import your transaction data. This feature is only available for premium users.

### Adding Gnosis Pay Access Token

To connect your Gnosis Pay account:

1. **Connect Wallet:**
   - In rotki, navigate to `API Keys → External Services → Gnosis Pay`.
   - Click the **Sign in with Ethereum** button.
   - Connect the wallet that controls the Safe wallet of your Gnosis Pay account.

2. **Sign Message:**
   - Sign the message to authenticate and get the access token.

3. **Redecode Transactions:**
   - After successfully connecting your Gnosis Pay account, you need to redecode the Gnosis Pay transactions in the history events section to enrich the transaction details. See [Redecoding blockchain transactions](/usage-guides/history/events#redecoding-blockchain-transactions) for more information on how to redecode transactions.

> **Note**: The access token only provides read-only access to your Gnosis Pay data. The "Sign in with Ethereum" authentication process described above is mandated by Gnosis Pay's API requirements, not a design choice by rotki. rotki simply integrates with their authentication system as required.

## The Graph

rotki uses The Graph to obtain Balancer balances and particular ENS data. You can create one [here](https://thegraph.com/studio/apikeys).

![Create The Graph API key](/images/create_the_graph_api_key.png)

After creating the API key, you can add it to rotki. Additionally, ensure that the generated API key is authorized for the Balancer and ENS subgraphs.

![The Graph subgraphs](/images/the_graph_subgraphs.png)

## DefiLlama

rotki integrates with DefiLlama for price data. An API key is not required, but a paid API key will provide higher rate limits. You can find more information about their API [here](https://defillama.com/pro-api).

## CoinGecko

rotki uses CoinGecko for cryptocurrency data. An API key is not required, but a paid API key will provide higher rate limits. You can find more information about their API [here](https://www.coingecko.com/en/api).
