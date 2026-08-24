---
description: Add and manage blockchain accounts across EVM chains, Bitcoin, Substrate, and Solana in rotki, and connect exchanges to track all your balances in one place.
---

# Tracking Accounts

To manage Blockchain Accounts, you need to visit the `Accounts` section from the left sidebar.

![Blockchain accounts page](/images/usage-guides/portfolio/accounts/overview.webp)

## Blockchain Accounts

rotki allows to track balances of blockchain accounts.

For now, the following chains are supported in rotki (and the list will be growing as we add more chains in the future):

| Chain Type           | Blockchain          | Chain ID for importing purposes |
| -------------------- | ------------------- | ------------------------------- |
| **EVM Chains**       | Ethereum            | eth                             |
|                      | Optimism            | optimism                        |
|                      | Polygon PoS         | polygon_pos                     |
|                      | Arbitrum One        | arbitrum_one                    |
|                      | Base                | base                            |
|                      | Gnosis              | gnosis                          |
|                      | Scroll              | scroll                          |
|                      | Binance Smart Chain | binance_sc                      |
|                      | Avalanche           | avax                            |
|                      | zkSync Lite         | zksync_lite                     |
|                      |                     |                                 |
| **Bitcoin Chains**   | Bitcoin             | btc                             |
|                      | Bitcoin Cash        | bch                             |
|                      |                     |                                 |
| **Substrate Chains** | Polkadot            | dot                             |
|                      | Kusama              | ksm                             |
|                      |                     |                                 |
| **Solana Chains**    | Solana              | solana                          |

### Steps to Add an Account:

1. Go to the chain category sub-page
2. Click `Add Account` (top right)
3. Select your blockchain
4. Enter the address in `Account` textbox
5. Click `Save`

### Adding Multiple Accounts:

- Check `Add multiple addresses` box
- Enter addresses as comma-separated list

### Adding Account to all EVM Chains

- Choose `All Supported Chains` in the chain selector.

![Add a blockchain account](/images/_shared/add_blockchain_account.webp)

You can edit or delete an account using the buttons at the end of the row.
For editing, you can modify the label or the tags.

> [!WARNING] Account detection on Binance SC
>
> We verify whether an address should be tracked by querying its on-chain activity through the indexers you have configured.
> Since Binance Smart Chain is not accessible under the free tier for any supported indexer, a paid Etherscan API key is required to detect activity there. If that key is not provided, BSC address detection will not work.

### Bitcoin Chains

The Bitcoin and Bitcoin Cash account form has a single address field that accepts either:

- A **plain address** (a single BTC or BCH address), or
- An **xpub** (extended public key) for automatic address discovery.

rotki detects which one you pasted and adapts the form accordingly — you don't need to switch modes.

#### What is an xpub?

An xpub is a special key that lets rotki find all your wallet addresses without giving access to your funds. When you provide an xpub, rotki will:

- Generate your addresses locally
- Query the blockchain activity for each address
- Stop when it finds unused addresses
- Store this information securely in your local database

#### Address types

| Type        | Common Name   | Address Starts With | Description                         |
| ----------- | ------------- | ------------------- | ----------------------------------- |
| P2PKH       | Legacy        | "1"                 | The original Bitcoin address format |
| P2SH-P2WPKH | Segwit        | "3"                 | More efficient than legacy          |
| WPKH        | Native Segwit | "bc1"               | Most efficient for transactions     |
| P2TR        | Taproot       | "bc1p"              | Newest type with enhanced privacy   |

#### How to add an account

Paste your address or xpub into the input. The form reacts as follows:

- **Plain BTC/BCH address** — the address type is inferred from the prefix and no extra choice is needed.
- **`ypub...`** — automatically tracked as Segwit (P2SH-P2WPKH).
- **`zpub...`** — automatically tracked as Native Segwit (WPKH).
- **`xpub...`** — ambiguous (it can back any of the four wallet layouts). All four address-type buttons appear inline, with **Native Segwit** selected by default. Pick the one your wallet uses; the picker stays visible so you can correct a misclick before saving.

![Add a Bitcoin account](/images/usage-guides/portfolio/accounts/add_btc.webp)

> [!INFO] Good to know
>
> - For Ledger hardware wallet users, you can get your xpub by following [this guide](https://support.ledger.com/article/6275459128989-zd)
> - Bitcoin Cash only works with Legacy (P2PKH) and Segwit (P2SH-P2WPKH) addresses

### Filtering accounts

Accounts are narrowed from the filter bar above the table, which works the same way as the one on the
history events page. Each filter is a pill: `Chain` shows each network with its logo, `Accounts` lets
you pick one or more tracked accounts from a list showing each one's avatar, name and address, and
`Tags` filters by the tags you assigned. Typing in the bar narrows across all of them at once. See
[Filtering history events](/usage-guides/history/filtering) for the shared syntax and keyboard
handling.

![Filter or delete a blockchain account](/images/usage-guides/portfolio/accounts/filter_chains.webp)

A set of filters you return to can be saved as a named view from the star button in the bar, and
applied again in one click. Filters you had already saved for this table are carried over the first
time you open the views menu.

> [!NOTE]
> A bookmarked link to this page that carried an account filter needs to be taken again. Filters are
> written into the address differently now, so an older link will not restore the same selection.

Additionally, there is an option to toggle between viewing the aggregated assets across all chains or displaying the assets per individual chain. This provides flexibility, allowing you to either get a total balance view from all chains at once or focus on specific chain assets.

![Filter or delete a blockchain account](/images/usage-guides/portfolio/accounts/aggregated_view_per_chain.webp)

### ENS names resolution

rotki automatically resolves ENS name and ENS avatar for every EVM address that has ENS name set in ethereum mainnet. If there is a primary ENS name specified for an address, this name will be shown instead of a raw blockchain address across the app. You can find the blockchain address by hovering the mouse over the ENS name. If an ENS avatar is set, it will be shown instead of the address blockie.

### Token detection

For EVM accounts, it is possible to trigger the process of detecting tokens before refreshing the balances. There are several ways to do that:

![Refresh all accounts tokens](/images/usage-guides/portfolio/accounts/refresh_all_tokens.webp)

1. To re-detect tokens for all EVM accounts in all chains, go to the dashboard and toggle the arrow here. You can change the default behavior of the refresh button to `Re-detect tokens and refresh balances` and then click the refresh button.

![Refresh particular accounts tokens](/images/usage-guides/portfolio/accounts/refresh_particular_tokens.webp)

2. To re-detect tokens for all addresses of one EVM chain, click `Re-detect tokens` in the EVM accounts section.

3. To re-detect tokens for only one account, click the refresh button in the corresponding row.

### Import and Export Blockchain Accounts (CSV)

You can export your blockchain accounts to CSV and then import them again into another rotki account (if you need to do it for your tax accountant, etc.). Also, if you have many accounts that you want to add to rotki, you can create your CSV and import it into rotki.

You can do it in from any submenu from the menu `Accounts` by clicking the three-dot menu.

![Import and Export Blockchain Accounts](/images/usage-guides/portfolio/accounts/import_and_export.webp)

<CsvTable title="Blockchain Accounts CSV" csvUrl="/files/blockchain-accounts.csv" />

1. The `address` field is **required**. For an xpub, input the xpub address. For a validator, input the publicKey.
2. The `address extras` field is **optional**. You can specify `ownershipPercentage=xx` for validators and `derivationPath=xx` for xpubs.
3. The `chain` field is **required**. You can find supported chain IDs in the [supported blockchain](#blockchain-accounts) section. Use `evm` to add to all EVM chains.
4. The `label` field is **optional**.
5. The `tags` field is **optional**. Multiple tags should be separated by semicolons (`;`).

### Blockchain aggregated balances

You can see the list of aggregated assets from Blockchain Accounts from menu `Balances > Blockchain Balances`.
You can also see the breakdown of the assets, which locations they belong to, whether they are in the wallet, or being put into some protocol.

![Aggregated list of assets from blockchain accounts](/images/usage-guides/portfolio/accounts/blockchain_balances.webp)
