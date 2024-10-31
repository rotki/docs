# Customization of the list of supported assets

## Inspecting list of assets

You can now manage the list of supported assets by your local rotki instance.
You can inspect the list of all supported assets, edit them, delete them or add new ones. They're divided into 3 sections; assets, custom assets, and more sections (consist of "Manage CEX (Centralized Exchange) Mapping" and "Newly Detected Tokens" section).

![Manage the list of assets](/images/rotki_manage_assets.png)

## Whitelisting of ignored assets

Spam assets are a plague in EVM chains. rotki has an automatic algorithm trying to match assets as spam to not bother the user with automatically ignoring them. You can see all ignored assets in `Manage Assets → Assets` and filter by ignored. A problem with automatic algorithms marking something as spam is that mistakes can be made and a legit token may be ignored.

![Filter ignored assets](/images/asset_whitelist_filter.png)

To solve this problem we added a whitelist which you can add assets to as can be seen below. Once an asset is added to the whitelist it will be removed from the ignore list and the automatic algorithm will not mark it as spam in the future.

![Whitelist asset](/images/asset_whitelist_menu.png)

## Adding/editing an asset

![Add or edit an asset](/images/rotki_add_edit_asset.png)

![Add or edit an asset icon](/images/rotki_add_edit_asset_icon.png)

When you press the + button on the top right, or edit an existing asset you can see the Asset form.

You can fill in the following fields:

1. The type of asset being created. This is required.
2. The chain where the token is located. This is required if the asset type is `EVM Token`.
3. The token kind. This is required if the asset type is `EVM Token`.
4. The token address. This is required if the asset type is `EVM Token`.
5. The token name. This is required.
6. The token symbol. This is required.
7. The token decimals. This is required if the asset type is `EVM Token`.
8. Coingecko identifier. This is optional, but highly recommended. If the asset is supported by coingecko you should get its coingecko identifier. This will allow the usage of coingecko as a price oracle and also will automatically pull the asset icon from coingecko. You can get the coingecko identifier for an asset by searching this list: https://api.coingecko.com/api/v3/coins/list . It may also be the same as the last part of the coingecko url. For example from `https://www.coingecko.com/en/coins/ethereum` we have `ethereum` as the identifier for ETH.
9. Cryptocompare identifier. This is optional but recommended. At least one of coingecko or cryptocompare should be given so that prices can be queried. If not given, the symbol of the asset will be used. If that fails, then cryptocompare is not used. To get the cryptocompare identifier, search for the coin in cryptocompare, visit its url and take it from there. For example for https://www.cryptocompare.com/coins/eth/overview/USD the identifier is `ETH`. It's always what comes after `coins`.
10. Optional fields section. This section will be explained below.
11. Preview of the icon. This section will show the icon you upload, or the current icon on edit mode. Additionally, on edit mode, there is also a button to fetch the latest icon.
12. You can upload an icon for the asset. Any of the common image extensions is accepted (png, jpg, jpeg, webp). The custom icon always takes precedence over the one auto-detected by coingecko.

When you input the address of the token rotki will try to fetch its name, symbol and decimals and use them if they are available.

There are also some other fields that are completely optional and expand if you press the (7) Optional Fields section.

![Optional information when adding an asset](/images/rotki_add_edit_token_optionals.png)

1. You can specify a timestamp at which the asset started to exist. This should be the token deployment timestamp for tokens.
2. If the asset is part of a protocol, specify it here. For example 'uniswap' for uniswap pool tokens, 'aave' for aTokens etc.
3. If the token is swapped for another token, specify it here. For example LEND was swapped for AAVE.
4. A token can have underlying tokens. Like a pool, or a token set. Here add the underlying token's address.
5. You have to specify the token kind.
6. And here add the underlying token's weight.
7. Here you can edit or delete underlying token address/weights. Note: The weight of the underlying tokens should add up to 100%.

> Note: Underlying tokens only apply to asset type of `EVM Token`.

## Adding/editing a custom asset

There is a lot of assets that rotki can't automatically track and they don't fit into traditional crypto assets. For example an ETF, real estate, ancient coins, valuable art etc. To represent those you can create custom assets, and then add a manual balance of those assets.

![Add or edit a custom asset](/images/rotki_add_edit_custom_asset.png)

When you press the + button on the top right, or edit an existing custom asset you can see the Asset form.

You can fill in the following fields:

1. The name to be given to the custom asset. This is required.
2. The type of custom asset being represented. It's just a string. The type field remembers all previously used types. This is required.
3. The note to be added to the custom asset. This is optional.

## Manage CEX (Centralized Exchange) Mapping

Users can link assets on exchanges to those recognized by rotki. If you encounter an error such as `Asset XXX is not supported` or `Found exchange balance result with unknown asset XXX. Ignoring it`, you may need to specify how the XXX asset should be recognized in rotki.

![Manage centralized exchange asset mapping](/images/rotki_manage_cex_mapping.png)

## Newly detected tokens

All newly detected EVM tokens will appear in the list of newly detected tokens. You should inspect this list often and accept valid tokens and reject spam assets by adding them to the ignored tokens list.

![Manage newly detected tokens](/images/rotki_manage_newly_detected_tokens.png)

## Merging two assets

There are two possible situations where you might need to merge two assets into one.

1. You added a custom asset that was later officially supported on rotki. In this case you should merge your custom asset with the officially supported one. If you don't do this, you will see split balances between entries, especially for supported exchanges that will use the officially supported entry.

2. There was an issue and an Unknown asset notification is now visible. This can happen if you somehow end up deleting your global DB of assets. This way all your custom assets will be unknown. In this case you would need to re-add the deleted assets, and merge the old asset id that errors to the new one that you created.

![Merging of assets](/images/rotki_merge_assets.png)

To merge two assets you can use the merge dialog by pressing the Merge Asset button in the Asset Management screen.
In the dialog you can put the identifier of your custom or missing asset in the source field. For a custom asset,
you can get the identifier using the copy button in the asset table. If you have a missing asset then you can copy it
from the notification message

Then you can go to the target field and search for the asset into which the source will be merged to.
When both the source identifier and target asset are selected you can press the merge button.

On a successful merge you will be notified to either re-login or refresh the balances manually to see the changes
on the frontend.

## Special assets

rotki allows you to track special assets like:

1. _Uniswap/Sushiswap LP tokens_: You can track LP tokens by adding them and using `UNI-V2` as protocol. This will make the app query balances and prices. As for now historical prices are not queried so you will need to add missing prices manually.
2. _Yearn vaults_: To add a yearn vault you need to add a new ethereum token and use `yearn_vaults_v2` as protocol. In addition you need to specify the underlying token that the vault uses with a 100% weight.

## Ignoring assets

Specify which assets you own and would like to completely ignore from all calculations and balance queries. Any actions that involve these assets are ignored.
You can ignore/un-ignore the assets by toggling the switch on the table. You can also ignore/un-ignore multiple assets by using the checkboxes.

![Asset overview page](/images/asset_overview.png)

You can also ignore assets by clicking asset icons anywhere on the app, that will redirect you to this overview asset page. In this page, you can ignore or un-ignore a selected asset.

It is also possible to ignore NFTs. To do this navigate to `Accounts & Balances → Non fungible balances` and toggle the ignore NFT switch. Then you can use the filter to view the ignored NFTs.

![Ignoring NFTs](/images/rotki_ignore_nfts.png)
