> [!NOTE]
> This is an experimental feature, and you may find some imperfections. However, we are going to continuously improve it.

# Onchain Transactions

rotki allows you to perform onchain transactions by connecting your wallet (either through a browser wallet or WalletConnect).
At the moment rotki only supports sending native tokens and ERC-20 tokens on all supported EVM chains.

![Onchain send tokens](/images/onchain_send.png)

::: info
You can only send tokens from an address that is registered as an EVM account in rotki. Otherwise, rotki won't be able to retrieve the list of tokens.
:::

## Connect to a Browser Wallet from the Electron App

If you're using rotki via the Electron app, you won't be able to connect directly to your browser wallet. Instead, rotki provides a bridge for this purpose. Follow these steps:

1. Click the "Open Browser Wallet Bridge" button. This will open a page in your browser.
   ![Open browser wallet bridge](/images/onchain_browser_wallet_bridge_1.png)

2. On the bridge page, the first step is to connect it to your browser wallet.
   ![Connect wallet in browser wallet bridge](/images/onchain_browser_wallet_bridge_2.png)

3. Once connected, the page should display your wallet status.
   ![Wallet connect bridge connected](/images/onchain_browser_wallet_bridge_3.png)

4. Now you’ll need the `WalletConnect Pair URI`. Go back to the Electron app, click `Connect Wallet`, and choose `WalletConnect`.
   ![Wallet Connect](/images/onchain_browser_wallet_bridge_4.png)

5. Wait for the QR code to appear, then click `Copy Link`. The Pair URI will be copied to your clipboard. It will look something like this:
   `wc:0579c1fee69aad512b6ef19a977a08f6c60b19415661cfa2882039da038a24fb@2?relay-protocol=irn&symKey=55d16a7cfc2198dfc1058254a7862c98aad401814bb86219041687d5b6de4020&expiryTimestamp=1744297123`
   ![Copy Wallet Connect pairing URI](/images/onchain_browser_wallet_bridge_5.png)

6. Return to the bridge page in your browser, paste the Pair URI, and click `Start Pairing`.
   ![Wallet Connect bridge start pairing](/images/onchain_browser_wallet_bridge_6.png)

You're now connected and can perform transactions from the Electron app.

## Troubleshooting

1. **I keep getting this error:**

```
Error: could not coalesce error (error={ "code": "INVALID_ARGUMENT", "message": "" }, payload={ "id": 6, "jsonrpc": "2.0", "method": "eth_sendTransaction", "params": [ { "from": "0xfoo", "gas": "0x5208", "nonce": "0x1f4", "to": "0x6ea158145907a1fac74016087611913a96d96624", "value": "0x38d7ea4c68000" } ] }, code=UNKNOWN_ERROR, version=6.14.0)
```

You can clear the cache (Help > Clear Cache), and then restart the app.

2. **Cannot switch chain from the app.**

At the moment, if you connect using the browser wallet bridge, you can switch chains only through the wallet directly and not from the rotki app.
