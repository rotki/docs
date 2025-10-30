# Tracking Accounts & Balances

To manage Blockchain Accounts, you need to visit the `Accounts` section from the left sidebar.

![Blockchain accounts page](/images/accounts.png)

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

![Add a blockchain account](/images/add_blockchain_account.png)

You can edit or delete an account using the buttons at the end of the row.
For editing, you can modify the label or the tags.

### Bitcoin Chains

There are two ways to add your Bitcoin or Bitcoin Cash addresses to rotki:

1. Manual entry of individual addresses
2. Using an xpub (extended public key) for automatic address discovery

#### What is an xpub?

An xpub is a special key that lets rotki find all your wallet addresses without giving access to your funds. When you provide an xpub, rotki will:

- Generate your addresses locally
- Query the blockchain activity for each address
- Stop when it finds unused addresses
- Store this information securely in your local database

#### Types of XPUB

| Type        | Common Name   | Address Starts With | Description                         |
| ----------- | ------------- | ------------------- | ----------------------------------- |
| P2PKH       | Legacy        | "1"                 | The original Bitcoin address format |
| P2SH-P2WPKH | Segwit        | "3"                 | More efficient than legacy          |
| WPKH        | Native Segwit | "bc1"               | Most efficient for transactions     |
| P2TR        | Taproot       | "bc1p"              | Newest type with enhanced privacy   |

#### How to Use Your xpub

1. Check what type of addresses your wallet generates
2. Select the matching type in rotki's dropdown menu

> [!INFO] Good to know
>
> - If your xpub starts with "ypub" or "zpub", rotki will automatically detect the correct type
> - For Ledger hardware wallet users, you can get your xpub by following [this guide](https://support.ledger.com/article/6275459128989-zd)
> - Bitcoin Cash only works with Legacy (P2PKH) and Segwit (P2SH_P2WPKH) addresses

![Add a bitcoin account using XPUB](/images/add_xpub_key.png)

### Aggregated view filtering

In the EVM Chains section, the chain selection allows you to filter accounts based on specific blockchain networks. This functionality works as a filter, meaning you can click on any chain, like Ethereum, Gnosis, or Polygon, and view only the accounts that are associated with those chains. You can even filter by multiple chains simultaneously.

![Filter or delete a blockchain account](/images/filter_chains.png)

Additionally, there is an option to toggle between viewing the aggregated assets across all chains or displaying the assets per individual chain. This provides flexibility, allowing you to either get a total balance view from all chains at once or focus on specific chain assets.

![Filter or delete a blockchain account](/images/aggregated_view_per_chain.png)

### ENS names resolution

rotki automatically resolves ENS name and ENS avatar for every EVM address that has ENS name set in ethereum mainnet. If there is a primary ENS name specified for an address, this name will be shown instead of a raw blockchain address across the app. You can find the blockchain address by hovering the mouse over the ENS name. If an ENS avatar is set, it will be shown instead of the address blockie.

### Token detection

For EVM accounts, it is possible to trigger the process of detecting tokens before refreshing the balances. There are several ways to do that:

![Refresh all accounts tokens](/images/refresh_all_accounts_tokens.png)

1. To re-detect tokens for all EVM accounts in all chains, go to the dashboard and toggle the arrow here. You can change the default behavior of the refresh button to `Re-detect tokens and refresh balances` and then click the refresh button.

![Refresh particular accounts tokens](/images/refresh_particular_account_tokens.png)

2. To re-detect tokens for all addresses of one EVM chain, click `Re-detect tokens` in the EVM accounts section.

3. To re-detect tokens for only one account, click the refresh button in the corresponding row.

### Import and Export Blockchain Accounts (CSV)

You can export your blockchain accounts to CSV and then import them again into another rotki account (if you need to do it for your tax accountant, etc.). Also, if you have many accounts that you want to add to rotki, you can create your CSV and import it into rotki.

You can do it in from any submenu from the menu `Accounts` by clicking the three-dot menu.

![Import and Export Blockchain Accounts](/images/import_and_export_blockchain_accounts.png)

<CsvTable title="Blockchain Accounts CSV" csvUrl="/files/blockchain-accounts.csv" />

1. The `address` field is **required**. For an xpub, input the xpub address. For a validator, input the publicKey.
2. The `address extras` field is **optional**. You can specify `ownershipPercentage=xx` for validators and `derivationPath=xx` for xpubs.
3. The `chain` field is **required**. You can find supported chain IDs in the [supported blockchain](#blockchain-accounts) section. Use `evm` to add to all EVM chains.
4. The `label` field is **optional**.
5. The `tags` field is **optional**. Multiple tags should be separated by semicolons (`;`).

### Blockchain aggregated balances

You can see the list of aggregated assets from Blockchain Accounts from menu `Balances > Blockchain Balances`.
You can also see the breakdown of the assets, which locations they belong to, whether they are in the wallet, or being put into some protocol.

![Aggregated list of assets from blockchain accounts](/images/sc_blockchain_balances.png)

### Loopring balances

From the balances section you can quickly get an overview of the accounts having balances in Loopring and what assets these accounts hold.

![Loopring balances detailed per address](/images/loopring_balances_detailed.png)

## Exchange Balances

You can check all of the asset balances that you have in each connected exchange in the `Exchange Balances` sub-page. Clicking the `Add exchange` button takes you to the API Keys page where you can manage your exchange connections (see [Exchanges API Keys](/usage-guides/api-keys#exchanges-api-keys)).

![Exchange Balance](/images/sc_exchange_balances.png)

## Manual Balances

You can add any type of asset to rotki, that may not officially supported yet. This includes things like:

- Real estate
- Stocks
- Assets from unsupported blockchains or exchanges

To add or edit a manual balance:

1. Go to the Manual Balances page
2. Click `Add Manual Balance` (top right)
3. Add a unique label
4. Select your asset from the dropdown
5. Add any tags you want
6. Enter the amount and location

You can also filter the manual balances by `location`, `name` or `asset`.

![The manually tracked balances](/images/sc_manual_balances.png)

By pressing the edit button for the account you can also add tags to the blockchain account. If you want to create a new tag or edit an existing one you can open the [tag manager](/usage-guides/tag-management) and choose the name, description and colors of the tag.

## NFTs

rotki provides an NFT gallery where you can view the NFTs owned by your accounts.

![NFT Gallery](/images/sc_nfts.png)

You have an overview of the total value of your NFTs in the application dashboard, on the NFTs table.

![NFT Value Dashboard](/images/sc_nf_balances_dashboard.png)

An estimation of the value of the NFTs you own is counted into your total net worth. The estimation strategy is currently the maximum of either the floor price of the collection or the last sale of the NFT. If a manual price has been given this is always preferred.

![NFT Value Dashboard](/images/sc_nft_balances.png)

If a price cannot be found for an NFT asset or if you want to change the calculated price estimate you can easily set the price for an NFT asset manually. You can do this by either clicking on the `>` button in the NFTs table in the dashboard or by going to `Blockchains & Accounts → NFT Balances`. And then click on the pen icon for the NFT you are interested in.

For privacy concerns, it is possible to allow all or only a certain list of domains for images rendered, this can be done here by clicking on the icon highlighted below.

More details here [Critical Privacy Vulnerability: Getting Exposed by MetaMask](https://medium.com/@alxlpsc/critical-privacy-vulnerability-getting-exposed-by-metamask-693c63c2ce94)

The configuration menu:

![NFT Image Render Settings](/images/sc_nf_image_render_settings.png)

Highlight details:

1. Link to blog post about image rendering and privacy.
2. Option to allow all NFT images to be rendered.
3. Option to allow only whitelisted domains.
4. If only whitelist, input list of allowed domains.
5. Save button.

![NFT Image Render Settings](/images/sc_nf_image_render_settings_whitelist.png)

This will enable image rendering of only whitelisted NFT domains.

## Filtering by tags

You can filter the tables by a combination of tags.

![Filter the accounts by tag](/images/filter_by_tag.png)

Simply add the tags you wish to filter by in the filter textbox above the tables.

## Hide small balances

You can filter out small balances and set the threshold yourself.

By default, this setting will apply to all balance types (blockchain balances, exchange balances, and manual balances).
You can uncheck the checkbox to apply the setting only to the current balances view.

> [!NOTE]
> You need to press "Apply Changes" for the setting to take effect.

![Hide small balances](/images/hide_small_balances.png)

## Airdrops

rotki can detect some airdrops for you

![rotki airdrops detection](/images/rotki_airdrops.png)

The list of currently supported airdrops is:

- Uniswap
- 1INCH
- Tornado
- Cornichon
- Grain
- Furocombo
- Lido
- Curve
- Convex
- Shapeshift
- ENS
- ParaSwap
- Saddle finance
- Cow
- Diva
- Shutter
- Starknet
- Optimism 4
- Degen 2
- Omni
- Eigen token

For some airdrops, you may see the status `Unknown`. This means rotki can't determine the status of the airdrop, whether it has been claimed or not. You need to check it yourself.

## Balances Snapshots

The application automatically saves balance snapshots to your local database:

- Occurs at login
- Default interval: every 24 hours (configurable)

To manually create a snapshot:

1. Click the `arrow down` near the graph
2. Select `Force Save`

![Force snapshots saves](/images/rotki_snapshot_forcing.png)

### Error Handling

- Snapshots won't save if there are external source query errors
- To save despite errors, select `Ignore Errors`

### Modify a snapshot point

1. Click on a snapshot point in the dashboard's net value graph
2. From the menu you can:
   - Edit snapshot data
   - Remove the snapshot
   - Download the snapshot

![Delete snapshot](/images/delete_snapshot_menu.png)

### Edit Snapshots Value

- Click a snapshot point
- Select edit
- Modify values for assets and locations as needed

![Edit snapshot](/images/edit_snapshot_menu.png)

### Delete Snapshots

Click a snapshot point and select delete to remove saved information.

### Download/Export Snapshots

When exporting, four files are generated:

1. Two files for future data import
2. Two human-readable files for accounting:
   - `balances_snapshot`: Asset balances at snapshot time
   - `location_data_snapshot`: Value per location for each asset

### Import Snapshot Back

To import previously exported snapshot data:

1. Use files with `_import` suffix
2. Click the `Arrow down` button near the chart
3. Select `Import`

![Import snapshots information](/images/import_snapshot.png)
