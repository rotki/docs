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
