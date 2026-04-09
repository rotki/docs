---
description: Viewing exchange balances, adding manual balances, tracking NFTs, airdrops, and managing snapshots.
---

# Balances

## Exchange Balances

You can check all of the asset balances that you have in each connected exchange in the `Exchange Balances` sub-page. Clicking the `Add exchange` button takes you to the API Keys page where you can manage your exchange connections (see [Exchanges API Keys](/usage-guides/integrations/exchange-keys#exchanges-api-keys)).

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

By pressing the edit button for the account you can also add tags to the blockchain account. If you want to create a new tag or edit an existing one you can open the [tag manager](/usage-guides/data-management/tags) and choose the name, description and colors of the tag.

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
