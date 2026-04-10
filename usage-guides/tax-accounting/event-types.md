---
description: Complete reference of all event types and subtypes in rotki with examples and default tax treatments.
---

# Event Types and Subtypes Reference

This page provides a complete reference for all event types and subtypes in rotki. Understanding these categories is essential for reviewing your transaction history and ensuring your PnL reports are accurate.

## How event types work

Every transaction in rotki is categorized with two fields:

- **Event Type**: The broad category of what happened (e.g., Trade, Deposit, Spend)
- **Event Subtype**: The specific action within that category (e.g., Fee, Reward, Airdrop)

Together, these determine how rotki treats the event in accounting — whether it's taxable, whether it counts as an acquisition or a spend, and how it affects your cost basis.

Not every combination of type and subtype is valid. The table in [all valid type/subtype combinations](#all-valid-type-subtype-combinations) below lists every combination that rotki recognizes.

## Event Types

### Trade

A trade is an exchange of one asset for another. In rotki, trades are represented as a pair of events with consecutive `sequence_index` values:

- First event: `Trade` type with `Spend` subtype (what you gave up)
- Second event: `Trade` type with `Receive` subtype (what you got)

**Example**: Swapping 1 ETH for 2000 USDC on Uniswap.

**Default tax treatment**: Taxable (Swap accounting treatment). The spend side triggers a cost basis calculation. The receive side is an acquisition at the current market value.

**When to use**: Any swap, trade, or exchange of one asset for another — whether on a CEX, a DEX, or OTC.

| Subtype   | UI Category   | Direction | Example                    |
| --------- | ------------- | --------- | -------------------------- |
| `Spend`   | swap          | Out       | Sending 1 ETH in a swap    |
| `Receive` | swap          | In        | Getting 2000 USDC in swap  |
| `None`    | informational | Neutral   | Informational trade event  |
| `Fee`     | fee           | Out       | Trading fee on an exchange |

### Multi-Trade

Similar to Trade but used when a single transaction involves multiple assets being swapped (e.g., aggregator routes through multiple pools).

| Subtype   | UI Category | Direction | Example                           |
| --------- | ----------- | --------- | --------------------------------- |
| `Spend`   | swap        | Out       | Outgoing side of a multi-hop swap |
| `Receive` | swap        | In        | Incoming side of a multi-hop swap |
| `Fee`     | fee         | Out       | Fee on a multi-asset swap         |

### Deposit

Moving assets into an exchange, wallet, or protocol.

| Subtype               | UI Category      | Direction | Example                                |
| --------------------- | ---------------- | --------- | -------------------------------------- |
| `Deposit Asset`       | account deposit  | Neutral   | Depositing ETH to Kraken               |
| `Deposit For Wrapped` | deposit          | Out       | Depositing DAI to receive cDAI         |
| `Deposit To Protocol` | protocol deposit | Neutral   | Depositing into Aave lending pool      |
| `Bridge`              | bridge           | Out       | Sending ETH to the Arbitrum bridge     |
| `Place Order`         | deposit          | Out       | Placing a limit order (e.g., CoW Swap) |
| `Fee`                 | fee              | Out       | Fee on a deposit                       |

### Withdrawal

Moving assets out of an exchange, wallet, or protocol.

| Subtype                  | UI Category         | Direction | Example                                |
| ------------------------ | ------------------- | --------- | -------------------------------------- |
| `Remove Asset`           | account withdraw    | Neutral   | Withdrawing BTC from Binance           |
| `Redeem Wrapped`         | withdraw            | In        | Redeeming cDAI back to DAI             |
| `Withdraw From Protocol` | protocol withdrawal | Neutral   | Withdrawing from Aave lending pool     |
| `Bridge`                 | bridge              | In        | Receiving ETH from the Optimism bridge |
| `Cancel Order`           | cancel order        | In        | Cancelling a CoW Swap order            |
| `Refund`                 | refund              | In        | Getting refunded from a failed order   |
| `Generate Debt`          | borrow              | In        | Borrowing from a lending protocol      |
| `Fee`                    | fee                 | Out       | Fee on a withdrawal                    |

### Spend

A plain expenditure — you spent crypto and received nothing (or something non-crypto) in return.

| Subtype          | UI Category | Direction | Example                                | Notes                              |
| ---------------- | ----------- | --------- | -------------------------------------- | ---------------------------------- |
| `None`           | send        | Out       | Paying for a service with BTC          | Taxable (loss)                     |
| `Fee`            | fee         | Out       | Paying gas fees on Ethereum            | Depends on "EVM Gas Costs" setting |
| `Return Wrapped` | return      | Out       | Returning aDAI to Aave to get DAI back | Not taxable (protocol interaction) |
| `Payback Debt`   | repay       | Out       | Repaying a loan on Aave                |                                    |
| `Donate`         | donate      | Out       | Donating crypto to a cause             |                                    |
| `Payment`        | pay         | Out       | Making a payment                       |                                    |
| `Clawback`       | clawback    | Out       | Assets clawed back by protocol         |                                    |
| `Burn`           | burn        | Out       | Burning tokens                         |                                    |

### Receive

You received assets — this is an acquisition event.

| Subtype           | UI Category        | Direction | Example                                      | Notes                       |
| ----------------- | ------------------ | --------- | -------------------------------------------- | --------------------------- |
| `None`            | receive            | In        | Receiving a payment in crypto                | Taxable (income)            |
| `Reward`          | claim reward       | In        | Receiving CRV rewards from Curve             | Taxable (income)            |
| `Airdrop`         | airdrop            | In        | Receiving a governance token airdrop         | Taxable (income)            |
| `Receive Wrapped` | receive            | In        | Getting aDAI after depositing DAI to Aave    | Not taxable (receipt token) |
| `Return Wrapped`  | receive            | In        | Getting back wrapped tokens                  |                             |
| `Generate Debt`   | borrow             | In        | Borrowing assets from a lending protocol     |                             |
| `Donate`          | receive donation   | In        | Receiving a donation                         |                             |
| `Liquidate`       | liquidation reward | In        | Receiving assets from liquidating a position |                             |
| `Payment`         | receive payment    | In        | Receiving a payment                          |                             |
| `Grant`           | receive grant      | In        | Receiving a grant (e.g., Gitcoin)            |                             |
| `Interest`        | receive interest   | In        | Receiving interest from a lending protocol   |                             |
| `Cashback`        | cashback           | In        | Receiving cashback rewards                   |                             |
| `Refund`          | refund             | In        | Getting a refund                             |                             |
| `Spam`            | spam               | In        | Spam/phishing tokens sent to your address    | Ignored in accounting       |

### Transfer

Moving assets between your own accounts. Not taxable.

| Subtype  | UI Category | Direction | Example                               |
| -------- | ----------- | --------- | ------------------------------------- |
| `None`   | transfer    | Neutral   | Moving ETH from one wallet to another |
| `Donate` | donate      | Out       | Donating via a transfer               |
| `Fee`    | fee         | Out       | Fee on a transfer                     |

**When to use**: If rotki categorized a self-transfer as a spend or trade, change it to `Transfer` with subtype `None` to avoid it being counted as taxable.

### Staking

Events related to staking assets.

| Subtype               | UI Category    | Direction | Example                                  | Notes                                        |
| --------------------- | -------------- | --------- | ---------------------------------------- | -------------------------------------------- |
| `Deposit Asset`       | stake          | Out       | Staking ETH in the Eth2 deposit contract |                                              |
| `Deposit For Wrapped` | stake          | Out       | Staking and receiving a receipt token    |                                              |
| `Remove Asset`        | unstake        | In        | Unstaking and getting assets back        |                                              |
| `Redeem Wrapped`      | unstake        | In        | Redeeming staked receipt tokens          |                                              |
| `Reward`              | staking reward | In        | ETH2 consensus layer rewards             | Depends on "Omit ETH Staking Events" setting |
| `Block Production`    | new block      | In        | ETH block production reward              |                                              |
| `MEV Reward`          | mev            | In        | MEV reward from block building           |                                              |
| `Fee`                 | fee            | Out       | Fee related to staking                   |                                              |

### Migration (Migrate)

Moving assets from one version of a protocol to another, where you don't gain or lose value.

| Subtype   | UI Category | Direction | Example                              |
| --------- | ----------- | --------- | ------------------------------------ |
| `Spend`   | migrate     | Out       | Sending SAI in a SAI→DAI migration   |
| `Receive` | migrate     | In        | Receiving DAI in a SAI→DAI migration |

**When to use**: Protocol upgrades or token migrations where the economic value doesn't change. Both events should have type `Migrate`, with the outgoing side as `Spend` and the incoming side as `Receive`.

### Loss

Events where you lost assets involuntarily.

| Subtype                    | UI Category              | Direction | Example                             |
| -------------------------- | ------------------------ | --------- | ----------------------------------- |
| `None`                     | loss                     | Out       | General loss of assets              |
| `Liquidate`                | liquidation loss         | Out       | Getting liquidated on a loan        |
| `Hack`                     | hack                     | Out       | Losing assets in a protocol exploit |
| `Liquidity Provision Loss` | liquidity provision loss | Out       | Impermanent loss realized on exit   |

### Informational

Events that contain useful information but have no financial impact.

| Subtype            | UI Category   | Direction | Example                               |
| ------------------ | ------------- | --------- | ------------------------------------- |
| `None`             | informational | Neutral   | General informational event           |
| `Governance`       | governance    | Neutral   | Casting a governance vote             |
| `Deposit Asset`    | informational | Neutral   | Informational deposit event           |
| `Remove Asset`     | withdraw      | In        | Informational withdrawal event        |
| `Place Order`      | place order   | Neutral   | Order placement notification          |
| `Create`           | new project   | Neutral   | Creating a Maker vault or Gnosis Safe |
| `Update`           | update        | Neutral   | Updating a protocol position          |
| `Apply`            | apply         | Neutral   | Applying for something on-chain       |
| `Approve`          | approval      | Neutral   | Token approval (spending allowance)   |
| `Attest`           | attest        | Neutral   | On-chain attestation (e.g., EAS)      |
| `MEV Reward`       | mev           | In        | MEV reward info                       |
| `Block Production` | new block     | In        | Block production info                 |
| `Consolidate`      | combine       | Neutral   | Consolidating positions               |
| `Delegate`         | delegate      | Neutral   | Delegating voting power               |
| `Message`          | message       | Neutral   | On-chain message                      |

### Renew

Renewal of a subscription or recurring service payment.

| Subtype | UI Category | Direction | Example                          |
| ------- | ----------- | --------- | -------------------------------- |
| `None`  | renew       | Out       | Paying for an ENS domain renewal |

### Deploy

Deploying a smart contract.

| Subtype | UI Category       | Direction | Example                     |
| ------- | ----------------- | --------- | --------------------------- |
| `None`  | deploy            | Neutral   | Deploying a smart contract  |
| `Spend` | deploy with spend | Out       | Deploying with an ETH spend |
| `NFT`   | mint nft          | In        | Deploying/minting an NFT    |

### Mint

Minting tokens or NFTs.

| Subtype | UI Category | Direction | Example        |
| ------- | ----------- | --------- | -------------- |
| `NFT`   | mint nft    | In        | Minting an NFT |
| `Fee`   | fee         | Out       | Minting fee    |

### Burn

Burning tokens or NFTs.

| Subtype | UI Category | Direction | Example        |
| ------- | ----------- | --------- | -------------- |
| `NFT`   | burn        | Out       | Burning an NFT |

### Fail

A failed transaction (you still pay gas).

| Subtype | UI Category | Direction | Example                           |
| ------- | ----------- | --------- | --------------------------------- |
| `Fee`   | failed      | Out       | Gas fee from a failed transaction |

### Adjustment

Forced adjustments by a system like a centralized exchange (e.g., exchange delisting a token and converting it).

| Subtype   | UI Category | Direction | Example                              |
| --------- | ----------- | --------- | ------------------------------------ |
| `Spend`   | send        | Out       | Asset removed by exchange adjustment |
| `Receive` | receive     | In        | Asset received from adjustment       |

### Margin

Margin trading events.

| Subtype  | UI Category | Direction | Example                  |
| -------- | ----------- | --------- | ------------------------ |
| `Profit` | profit      | In        | Profit from margin trade |
| `Loss`   | loss        | Out       | Loss from margin trade   |
| `Fee`    | fee         | Out       | Margin trading fee       |

### Transaction to Self

A transaction where you sent assets to yourself (same address).

| Subtype | UI Category      | Direction | Example                         |
| ------- | ---------------- | --------- | ------------------------------- |
| `None`  | self transaction | Neutral   | Sending ETH to your own address |

### Exchange Adjustment

Adjustments made by exchanges to your balance.

| Subtype   | UI Category | Direction | Example                       |
| --------- | ----------- | --------- | ----------------------------- |
| `Spend`   | send        | Out       | Exchange debits your balance  |
| `Receive` | receive     | In        | Exchange credits your balance |

### Exchange Transfer

Transfers associated with exchange deposits/withdrawals that have both an on-chain and exchange side.

| Subtype   | UI Category      | Direction | Example                                 |
| --------- | ---------------- | --------- | --------------------------------------- |
| `Spend`   | account withdraw | Neutral   | On-chain side of an exchange withdrawal |
| `Receive` | account deposit  | Neutral   | On-chain side of an exchange deposit    |
| `Fee`     | fee              | Out       | Fee on the transfer                     |

## All valid type/subtype combinations

The following table lists every valid combination of event type and subtype recognized by rotki. Combinations not listed here are not valid.

<!-- BEGIN:GENERATED:valid-combinations -->

| Event Type          | Valid Subtypes                                                                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Trade               | Spend, Receive, None, Fee                                                                                                                                        |
| Staking             | Deposit Asset, Deposit For Wrapped, Reward, Remove Asset, Redeem Wrapped, Block Production, MEV Reward, Fee                                                      |
| Deposit             | Deposit Asset, Deposit For Wrapped, Deposit To Protocol, Bridge, Place Order, Fee                                                                                |
| Withdrawal          | Remove Asset, Redeem Wrapped, Withdraw From Protocol, Bridge, Cancel Order, Refund, Generate Debt, Fee                                                           |
| Transfer            | Donate, None, Fee                                                                                                                                                |
| Spend               | Return Wrapped, Payback Debt, Fee, Donate, Payment, None, Clawback, Burn                                                                                         |
| Receive             | Reward, Receive Wrapped, Generate Debt, Return Wrapped, Airdrop, Donate, None, Liquidate, Payment, Grant, Interest, Cashback, Refund, Spam                       |
| Adjustment          | Spend, Receive                                                                                                                                                   |
| Informational       | None, Governance, Deposit Asset, Remove Asset, Place Order, Create, Update, Apply, Approve, Attest, MEV Reward, Block Production, Consolidate, Delegate, Message |
| Migrate             | Spend, Receive                                                                                                                                                   |
| Renew               | None                                                                                                                                                             |
| Deploy              | None, Spend, NFT                                                                                                                                                 |
| Fail                | Fee                                                                                                                                                              |
| Loss                | Liquidate, Hack, Liquidity Provision Loss, None                                                                                                                  |
| Mint                | NFT, Fee                                                                                                                                                         |
| Burn                | NFT                                                                                                                                                              |
| Multi Trade         | Spend, Receive, Fee                                                                                                                                              |
| Margin              | Profit, Loss, Fee                                                                                                                                                |
| Transaction To Self | None                                                                                                                                                             |
| Exchange Adjustment | Spend, Receive                                                                                                                                                   |
| Exchange Transfer   | Spend, Receive, Fee                                                                                                                                              |

<!-- END:GENERATED:valid-combinations -->

## Quick reference: common customizations

| Situation                                | Event Type      | Event Subtype              |
| ---------------------------------------- | --------------- | -------------------------- |
| Swap / trade on DEX or CEX               | `Trade`         | `Spend` + `Receive` (pair) |
| Moving assets to an exchange             | `Deposit`       | `Deposit Asset`            |
| Moving assets from an exchange           | `Withdrawal`    | `Remove Asset`             |
| Depositing into DeFi (get receipt token) | `Deposit`       | `Deposit For Wrapped`      |
| Depositing into DeFi (no receipt token)  | `Deposit`       | `Deposit To Protocol`      |
| Withdrawing from DeFi (return receipt)   | `Withdrawal`    | `Redeem Wrapped`           |
| Withdrawing from DeFi (no receipt)       | `Withdrawal`    | `Withdraw From Protocol`   |
| Receiving wrapped/receipt tokens         | `Receive`       | `Receive Wrapped`          |
| Returning wrapped/receipt tokens         | `Spend`         | `Return Wrapped`           |
| Sending assets across a bridge           | `Deposit`       | `Bridge`                   |
| Receiving assets from a bridge           | `Withdrawal`    | `Bridge`                   |
| Transfer between own wallets             | `Transfer`      | `None`                     |
| Paying gas fees                          | `Spend`         | `Fee`                      |
| Receiving staking rewards                | `Staking`       | `Reward`                   |
| Claiming DeFi rewards                    | `Receive`       | `Reward`                   |
| Receiving an airdrop                     | `Receive`       | `Airdrop`                  |
| Paying for a service                     | `Spend`         | `None`                     |
| Getting paid in crypto                   | `Receive`       | `None`                     |
| Borrowing from a protocol                | `Withdrawal`    | `Generate Debt`            |
| Repaying a loan                          | `Spend`         | `Payback Debt`             |
| Token migration (old→new)                | `Migrate`       | `Spend` + `Receive` (pair) |
| ENS renewal, subscription                | `Renew`         | `None`                     |
| Token approval, governance vote          | `Informational` | `Approve` / `Governance`   |
| Lost in hack / exploit                   | `Loss`          | `Hack`                     |
| Liquidation (your position)              | `Loss`          | `Liquidate`                |
| Failed transaction (gas only)            | `Fail`          | `Fee`                      |

## Entry types

In addition to event type/subtype, rotki distinguishes between different **entry types** based on the source of the event:

| Entry Type               | Description                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **History Event**        | Generic events from any source (exchanges, manual input, CSV import)                          |
| **EVM Event**            | Decoded on-chain events from EVM chains (Ethereum, Optimism, Polygon, Arbitrum, Base, Gnosis) |
| **EVM Swap Event**       | A specialized EVM event for swaps, supporting multiple spend/receive assets                   |
| **ETH Withdrawal Event** | ETH consensus layer withdrawal                                                                |
| **ETH Block Event**      | ETH block production reward                                                                   |
| **ETH Deposit Event**    | ETH2 staking deposit                                                                          |
| **Asset Movement Event** | Exchange deposit or withdrawal                                                                |
| **Swap Event**           | A trade/swap from non-EVM sources                                                             |

The entry type determines which fields are available when editing an event. For example, EVM events have a `Counterparty` field (the protocol or address you interacted with), while generic history events do not.

## Editing events

If an event is miscategorized, you can edit it directly from the History Events page. See the [common customization guide](/usage-guides/history/events#common-customization) for step-by-step instructions and examples.

Changes you make to event types/subtypes directly affect how they are processed in the PnL report.
