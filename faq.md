# Frequently Asked Questions

## Questions on the application

### What is rotki?

rotki is an open-source portfolio tracking, analytics, and tax reporting application that respects your privacy. It is focused on crypto assets but will also slowly facilitate tracking of more traditional assets.

### Why should I use it?

Unlike virtually every other service out there which offers you the ability to track crypto assets, get analytics, and generate tax reports, rotki is a local application. And its basic version is also free.

A local application allows you to **own your data**. You don't need to give your API keys, or any of your financial history to a centralized third party. We strongly advise against using any such centralized services. Your data is not safe with them.

### What does it offer me?

rotki offers tracking of all your crypto assets no matter where they are. Either on a blockchain or on one of the supported exchanges.

You can also manually input information on your Fiat assets (i.e., how much EUR, USD, etc. you own) so that the analytics also take them into account. Manual input of actions that you did and would like to be tracked is also possible by adding an "external trade".

It also allows you to get a tax report, essentially calculating all trades in a given period and determining your profit or loss depending on your given settings. For more details on what is offered and how to use it check the [Usage Guide](/usage-guides/).

### Will it remain free to use?

rotki's base version will always remain open-source and free to use. It's on GitHub and even if the current maintainer stops developing for whatever reason, anyone can pick it up and continue.

## Questions on Premium

### What is rotki Premium?

rotki is an open-source and free application. In order to fund development, we also have a paid tier which offers more features and for which many new awesome features will be developed.

If you like rotki, you can support us with a premium subscription and you not only get to fund open-source but also get additional features. To get a rotki subscription register on [our website](https://rotki.com/products). There you can also see what exactly is offered in premium.

### Is there a lifetime premium plan?

Short answer: **No**

At rotki, we believe in building sustainable, long-term software that delivers continuous value to our users. Offering a lifetime subscription may sound appealing on the surface, but in reality, it’s a model that often leads to the collapse of the very products it’s meant to support. Many companies that adopt this approach either shut down within a few years or abandon the product once the initial influx of revenue dries up.

rotki has been around since 2017, delivering continuous, original improvements every month. Offering a lifetime subscription would require us to put a fixed price on the indefinite future work of our entire team, which is simply not realistic or fair. Building and maintaining a privacy-respecting, local-first, open-source financial tool involves real and growing costs.

It’s also worth noting that our current pricing model hasn’t changed since 2017. We’re currently re-evaluating it to better reflect the actual cost of development, support, and infrastructure, especially in light of inflation and the expanded scope of what rotki offers today. Our goal is to keep rotki accessible while ensuring its long-term health and independence.

## Questions on Roadmap and Features

### How can I see what's planned for rotki?

Please take a look at the GitHub issues [here](https://github.com/rotki/rotki/issues). For more specific planning check the GitHub [milestones](https://github.com/rotki/rotki/milestones).

### Why doesn't rotki support exchange X/Y/Z or have feature X/Y/Z?

rotki is open-source software and we welcome Pull Requests. If you would like something to be done about a feature request, you can create an issue on GitHub or do it yourself. Questions are welcome in our [Discord](https://discord.rotki.com).

## Miscellaneous Questions

### Where does the name come from?

rotki is an abbreviation for Rotkehlchen. That is the German word for the bird known in English as the [European Robin](https://en.wikipedia.org/wiki/European_robin). For pronunciation check [here](https://upload.wikimedia.org/wikipedia/commons/4/42/De-Rotkehlchen2.ogg).

## Common Issues

### Restoring backed up database at new account creation fails

Please, make sure you are using your premium subscription API keys/secret and the same password.

### Data with multiple accounts/devices is not synced

Please, make sure all your accounts have the "Allow data sync with rotki Server" switched on, and that on each log-in you make the appropriate choice when prompted to replace the local database. See the section [Sync data with rotki server](/usage-guides/#sync-data-with-rotki-server) for more information about how to sync data with multiple accounts/devices.

### ENS data not updating for newly registered name/address combination

If you just registered your ENS name and you don't see the name and/or avatar being properly displayed in rotki, then that means that the value is cached and you need to force a refresh. You can do that by going to `Accounts → EVM Accounts` view and pressing the refresh button on the top.

### My asset is not showing in rotki

If your asset is not showing in rotki, even though you are sure that you have a balance, you need to first ensure that the asset is present on the list of assets (read [inspecting list of assets](/usage-guides/assets.html#inspecting-list-of-assets)).

If you still cannot find your asset, it might be ignored. By default, rotki only displays un-ignored assets in the table. To also show the ignored assets, choose the `Filter by ignored status → Show all`, and then unignore the asset manually. Additionally, you can whitelist the asset to prevent it from being automatically ignored by rotki's spam detection (read: [whitelisting of ignored assets](/usage-guides/assets.html#whitelisting-of-ignored-assets)).

After whitelisting the token, you may need to re-detect it to see it in your balances (read: [token detection methods](/usage-guides/assets.html#whitelisting-and-re-detecting-missing-tokens)).

If the asset is still not showing, you may need to add it manually.

### My transaction is not showing in rotki

If a transaction is not showing in rotki, it may be due to an ignored asset being part of the transaction.

To view transactions with ignored assets, enable `Show entries with ignored assets`, and if your transaction is now visible, check which assets used in the transaction are ignored and then un-ignore them manually.

For more information on un-ignoring and optionally whitelisting assets, see [My asset is not showing in rotki](/faq.html#my-asset-is-not-showing-in-rotki) above.

### My balances are not showing after importing my history/creating history events

It's not a bug. At the moment, we don't use events to determine current holdings. Balances are only calculated from connected exchanges, connected blockchain addresses, and manual balances.

### I receive a notification error: `can't deserialize XXX,  unknown asset YY found`

The most common reason for this issue is that when you moved your user database to a new computer (either by doing it manually or using premium sync), you forgot to move the `global database` from your old computer. The global database contains some important data, including your assets (especially custom ones), so it also needs to be moved.

Important to remember that the global DB is not moved by the premium sync mechanism. You can follow the instructions here to manually move the global database: [manually move global database](/usage-guides/#manually-move-global-database).

If you are affected by this, there are a number of things you can do.

- For assets that are EVM tokens with identifiers like `eip155:10/erc20:0x99C59ACeBFEF3BBFB7129DC90D1a11DB0E91187f` if you press [redecode all history events](/usage-guides/historical-events.html#redecoding-evm-transactions) then the redecoding process should repopulate them in the global db.
- If you have an asset with a unique identifier that looks like `a19964d9-20da-a6dc-1b50-9f293eb85c0d` then that means it's a custom asset or a manually input asset and we have no idea what it is. To figure out you would need to [access the database manually](/usage-guides/accessing-db-manually) and query the event or trade that had it. For example for trades:

```sql
SELECT * from trades WHERE base_asset='a19964d9-20da-a6dc-1b50-9f293eb85c0d' OR quote_asset='a19964d9-20da-a6dc-1b50-9f293eb85c0d';
```

Or for history events:

```sql
SELECT * from history_events WHERE asset='a19964d9-20da-a6dc-1b50-9f293eb85c0d';
```

Then, from the response, understand which asset it is, recreate it, and merge it with the old identifier following the merging process outlined [here](/usage-guides/assets#merging-two-assets)
