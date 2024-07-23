# Troubleshooting

## Out of gas error during eth_call

If you see an error like the following:

```log
[17/12/2020 18:31:29 CET] WARNING rotkehlchen.chain.ethereum.manager: Failed to query own node for <bound method EthereumManager._call_contract of <rotkehlchen.chain.ethereum.manager.EthereumManager object at 0x7f4b16b8bc90>> due to Error doing call on contract 0x06FE76B2f432fdfEcAEf1a7d4f6C3d41B5861672: {'code': -32000, 'message': 'out of gas'}
```

while rotki is querying your local geth node for something, then it means that the query has hit the gas limit cap.

You can fix this by simply adding the `--rpc.gascap 0` argument to your geth node. This will have an unlimited gas cap. Be careful if it's a node exposed to the public as this may allow a malicious `eth_call` to crash your node.

## Local system clock is not synchronized

Your local system clock must be synchronized with certain remote servers, such as exchanges. If your clock is not synchronized, requests to these servers will fail. rotki will either display a specific error message (e.g., a 409 status code indicating a local system clock synchronization issue) or a generic 500 error message (please, report it to us).

To resolve this issue, follow the official guidelines provided by your operating system on how to synchronize your clock with an Internet Time Server. You can find detailed instructions for fixing this problem on Windows, Mac, and Linux in this link: [Fixing Clock Synchronization](https://github.com/tiagosiebler/awesome-crypto-examples/wiki/Timestamp-for-this-request-is-outside-of-the-recvWindow). Once synchronized, try the request again.

## Restoring backed up database at new account creation fails

Please, make sure you are using your premium subscription API keys/secret and the same password.

## Data with multiple accounts/devices is not synced

Please, make sure all your accounts have the "Allow data sync with rotki Server" switched on, and that on each log-in you make the appropriate choice when prompted to replace the local database. See the section [Sync data with rotki server](/usage-guides/introduction.html#sync-data-with-rotki-server) for more information about how to sync data with multiple accounts/devices.

## ENS data not updating for newly registered name/address combination

If you just registered your ENS name and you don't see the name and/or avatar being properly displayed in rotki, then that means that the value is cached and you need to force a refresh. You can do that by going to `Accounts & Balances → Blockchain Balances` view and pressing the refresh button next to the Ethereum balances table.

## My asset is not showing in rotki

If your asset is not showing in Rotki, even though you are sure that you have a balance, you need to first ensure that the asset is present on the list of assets (read [inspecting list of assets](/usage-guides/assets.html#inspecting-list-of-assets)).

If you still cannot find your asset, it might be ignored. By default, Rotki only displays un-ignored assets in the table. To also show the ignored assets, choose the `Filter by ignored status → Show all`, and then unignore the asset manually. Additionally, you can whitelist the asset to prevent it from being automatically ignored by rotki's spam detection. (read: [whitelisting of ignored assets](/usage-guides/assets.html#whitelisting-of-ignored-assets))

If the asset is still not showing, you may need to add it manually.
