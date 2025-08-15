> [!NOTE]
> This is an experimental feature, and you may find some imperfections. However, we are going to continuously improve it.

# Onchain Transactions

rotki allows you to perform onchain transactions by connecting your wallet (either through a browser wallet or WalletConnect).
At the moment rotki only supports sending native tokens and ERC-20 tokens on all supported EVM chains.

![Onchain send tokens](/images/onchain_send.png)

::: info
You can only send tokens from an address that is registered as an EVM account in rotki. Otherwise, rotki won't be able to retrieve the list of tokens.
:::

There are 2 ways to connect the wallet:

## Connect using Wallet Connect

You can connect the wallet via Wallet Connect. For example, if you want to connect to the wallet on your phone, or by using Safe Wallet.

1. Select the tab `Wallet Connect`

2. Click `Connect Wallet` button and proceed from there

![Onchain wallet connect](/images/onchain_wallet_connect.png)

## Connect using Browser Wallet

If you don't want to connect via Wallet Connect, you can also connect locally to your browser wallet.

1. Select the tab `Local`

2. Click `Connect Wallet` button

3. If you access rotki via the app, it will open a tab in your browser. It attempts to scan the wallet you have in your browser. You need to keep this browser tab open while doing transactions.
   ![Open browser wallet bridge](/images/onchain_browser_wallet_1.png)

4. Go back to your main app. You will see this popup after rotki scans which browser wallet you have. You can choose any and finish the connection.
   ![Select browser wallet](/images/onchain_browser_wallet_2.png)

5. If it's successful, it will look like this, and show your connected address on top.
   ![Browser wallet connection success](/images/onchain_browser_wallet_3.png)

You're now connected and can perform transactions.

## Troubleshooting

1. **I keep getting a "could not coalesce" error:**

If you get an error looking like this in the console:

```
Error: could not coalesce error (error={ "code": "INVALID_ARGUMENT", "message": "" }, payload={ "id": 6, "jsonrpc": "2.0", "method": "eth_sendTransaction", "params": [ { "from": "0xfoo", "gas": "0x5208", "nonce": "0x1f4", "to": "0x6ea158145907a1fac74016087611913a96d96624", "value": "0x38d7ea4c68000" } ] }, code=UNKNOWN_ERROR, version=6.14.0)
```

You can clear the cache (Help > Clear Cache), and then restart the app.

2. **Cannot switch chain from the app.**

At the moment, if you connect using the browser wallet bridge, you can switch chains only through the wallet directly and not from the rotki app.
