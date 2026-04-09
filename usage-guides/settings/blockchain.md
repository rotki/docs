---
description: Configuring EVM chain settings, RPC nodes, transaction indexers, price oracles, and DeFi modules.
---

# Blockchain & EVM Settings

## EVM

![EVM settings](/images/sc_evm_settings.png)

#### Treat Staked ETH as ETH

If enabled, ETH2 (staked ETH) will appear as ETH in the UI, and all tables and charts will combine the values of ETH and ETH2.

#### EVM Chains for Automatic Detection

Configure which EVM chains should not automatically detect tokens. By default, EVM chains detect activities of all registered EVM accounts in other EVM chains.

### Indexers

rotki uses several indexers to identify which transactions belong to your tracked addresses. The order used for each chain can be adjusted in the default settings and will apply unless a specific chain configuration overrides it. For example you may want to avoid using etherscan on Optimism and Base if you do not have a paid API key for those networks.

This lets you control which sources are queried and change the configuration if one of them is unreliable for a particular chain.

In addition to querying historical events, indexers are used when detecting onchain activity, for example when you add a new address to all supported EVM chains or when the periodic task performs this check in the background.

At the time of writing the only chain that cannot be queried for free is Binance SC because neither blockscout nor routescan are available and etherscan requires an API key under the Lite plan.

Regarding the need for API keys:

- Etherscan requires an API key in the free tier to perform API calls.
- Blockscout does not require an API key and has a default limit of 10 requests per second.
- Routescan offers a free tier comparable to etherscan and does not require an API key.

## Price Oracle Settings

![Change the order of price sources](/images/sc_price_oracle_order.png)

Here, you can customize the order in which price oracles are queried, both for current and historical prices. This determines which price source to check first, second, and so on.

Available price oracles include CoinGecko, CryptoCompare, Uniswap V2, Uniswap V3, DefiLlama, Alchemy, and custom (manual) prices. DeFi oracles like Uniswap V2 and Uniswap V3 use only on-chain information to get current prices. This makes querying a bit slower, but it relies solely on the Ethereum chain. Prices for some assets may differ from Coingecko or CryptoCompare, depending on the conditions of the pools at the time of the query.

### Oracle cache

![Creating a historical price cache](/images/sc_historical_price_cache.png)

Querying historical prices from oracles such as CryptoCompare and CoinGecko is slow and can be slower due to rate limiting. rotki creates historical price caches during idle times.

Request the creation of such a cache by going to the Oracle cache section, selecting the oracle, the from asset of the pair, the to asset of the pair, and then pressing "Cache pair prices".

Manage existing historical price cache entries, inspect start and end dates, and delete caches if needed.

### Oracle Penalty Settings

Configure penalty behavior for misbehaving price oracles at runtime.

#### Oracle Penalty Duration

The duration in seconds for which an oracle is penalized after exceeding the failure threshold. Default is 1800 seconds (30 minutes).

#### Oracle Penalty Threshold Count

The number of consecutive failures after which an oracle is penalized and temporarily skipped. Default is 5.

## RPC Node Setting

This setting lets you change the nodes used to connect to blockchains. We give you a list of public nodes, but sometimes they are busy or down. You will see a green or red icon showing if a node is working.

It is good to add more nodes and set their priority. We always try your own nodes first, then use some random public nodes if needed. If you don't have your own node, we use public nodes.

The node's weight (percentage) shows how likely it is to be used. You can turn nodes on or off with the toggle button.

![Customizing the app's connection to EVM nodes](/images/rotki_nodes_management.png)

In this menu you can also edit, delete or add more nodes.

![Add an EVM node](/images/rotki_nodes_management_addition.png)

### Local Nodes

#### Connecting to a Kusama Client

rotki attempts to connect to a local Kusama node running on the default port `9933`. If no client is running, blockchain queries will use an external service.

#### Connecting to a Polkadot Client

Set the RPC endpoint for a Polkadot node here.

#### Connecting to an ETH Consensus Layer Beacon Node

Set the RPC endpoint for the Ethereum consensus layer beacon node. If unreachable, beaconcha.in will be used. For DAppNode Ethereum validator users, find the RPC node setting in the DAppNode Package for the Execution Client.

#### Connecting to a Bitcoin Mempool instance

A local Bitcoin node can be used to query balances and transactions via [Mempool](https://mempool.space)'s API. [Mempool](https://github.com/mempool/mempool) is an open source project that can be self-hosted on Bitcoin nodes. It is readily available to install on many full-node distros such as Umbrel or Raspiblitz. Mempool uses port 4080 by default. Please include this when setting the endpoint (e.g. `http://localhost:4080`). Other custom ports should also work.
Please note that transaction querying is currently not supported and historical transaction fetching will fail. Only address balance querying is supported when using a custom mempool instance.

## Module Settings

Choose the "Module" section of the settings to customize the enabled modules and the queried addresses for each module.

Enabling only the modules you use and specifying addresses improves querying speed.

![Managing module settings](/images/module_settings.png)

### Activating/Deactivating Modules

View all modules in the table. Some are activated by default. Enable/disable a module by toggling the switch. Re-login for changes to take effect.

### Selecting Addresses

![Select address for modules](/images/module_settings_select_address.png)

To limit querying to selected addresses, click the "edit/pencil" button on the module to select addresses. If no addresses are selected, rotki checks all eligible addresses, increasing query duration.
