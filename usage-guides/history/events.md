---
description: Browse, filter, decode, and edit historical events from exchanges and blockchains in rotki, redecode transactions, add events by hash, and export them to CSV.
---

# History events

> [!TIP]
> **Trying to understand event types?** See the [Event Types & Subtypes Reference](/usage-guides/tax-accounting/event-types) for a complete guide to what each event category means, with examples and default tax treatments.

rotki is capable of pulling and decoding a bunch of different events, ranging from EVM chain transactions to exchanges events and more. When you visit the `History Events` section the process to obtain all the information will start. You will be able to check the status in an informative breakdown per blockchain address. Free users are limited to a number of latest events.

## Supported events

Currently, these events are detected automatically by rotki:

- Transactions from registered **EVM accounts** (except Avalanche).
- Transactions from registered **Bitcoin** and **Bitcoin Cash** accounts.
- Transactions from registered **Solana** accounts.
- Events from registered exchanges.
- ETH withdrawal events
- ETH block events
- ETH deposit events
- Asset movement events (deposits and withdrawals).
- Swap events (trades).

Additionally, you can add your custom events.

## Events filtering

Events are narrowed with a filter bar that holds one pill per active filter, with pills for the
date, asset, amount, protocol, location, entry type, event type and subtype, transaction hash,
address, validator, account and event state.

![The history events filter bar](/images/_shared/history_events_page.webp)

See **[Filtering history events](/usage-guides/history/filtering)** for the full reference: every
available filter, the typed date and amount syntax, excluding entry types, the state markers and
saved views.

## Refreshing Events

You can choose to refresh all events by clicking the main `Refresh` button, or you can open the menu and choose to refresh only certain types of events or accounts.

### By Chain

Refreshes specific chains, optionally limited to only specific accounts on those chains.

![Refreshing onchain events](/images/usage-guides/history/events/refreshing_onchain.webp)

To see the status, you can click the button here:

![See query status](/images/usage-guides/history/events/query_status_button.webp)

Basically, what happens when you refresh the transactions/events is:

1. It will query the transactions from the "last queried time" to the current time.
2. For EVM events, after rotki queries these new transactions, it will try to decode them.
3. The events will be displayed correctly in the UI only after they are properly decoded.

![Events query status](/images/usage-guides/history/events/query_status.webp)

### Exchange Events

Refreshes the events from specific exchanges.

![Refreshing exchange events](/images/usage-guides/history/events/refreshing_exchange.webp)

### ETH Staking Events

Refreshes ETH withdrawals and block production events.

![Refreshing eth staking events](/images/usage-guides/history/events/refreshing_eth_staking.webp)

### Protocol Events

Refreshes events from specific protocols such as Monerium and Gnosis Pay, pulling data from the protocol's API to enrich the existing onchain events.

![Refreshing protocols events](/images/usage-guides/history/events/refreshing_protocols.webp)

## Redecoding blockchain transactions

Sometimes you may need to redecode events for blockchain transactions (EVM and Solana).

### Redecode a single transaction

1. Click the three-dots `⋮` menu on the transaction row
2. Click `Redecode events`

This will re-read and re-decode the transaction's events and try to understand what happened. If the transaction contains custom events, you will get an extra confirmation asking whether to also reset these custom events.

![Redecode events for a transaction](/images/usage-guides/history/events/redecode.webp)

::: tip Advanced: Redecode with options
If you need more control, use `Redecode with options` (button at the right of `Redecode events`) to:

- Select how custom events should be handled by the redecoding logic
- Choose the priority for indexers that we want to use when re-querying remote information about the transaction
  :::

### Redecode all queried transactions

To redecode all transactions that have been queried, click `Redecode All Transactions` at the top of the page.

![Menu to redecode all queried EVM transactions events](/images/usage-guides/history/events/redecode_all.webp)

### Transaction decoding status

To see the status of event decoding, click the menu button and go to `Transaction Decoding Status`.

![Menu to redecode events for an EVM transaction](/images/usage-guides/history/events/redecode_status_button.webp)

You will see the status of the EVM events redecoding.

![EVM events redecoding breakdown](/images/usage-guides/history/events/redecode_status.webp)

### Notes

EVM transactions and events can be deleted, but to restore them you will have to either purge all transactions or add by the transaction hash.

## Export history events as CSV

Events can be exported as CSV, click on `Export CSV` button and accept prompt to download exported events.

![Button to download events as csv](/images/usage-guides/history/events/csv_export.webp)

## Delete transactions & events

![Menu to delete EVM transactions events](/images/usage-guides/history/events/delete_transaction_events.webp)

## Add transaction by hash

![Add transaction by hash](/images/usage-guides/history/events/add_tx_by_hash.webp)

If you want to add a transaction that was either deleted or for some reason missed, or was not found by rotki, you can add it by transaction hash by clicking the menu as seen in the picture.

## Re-Pulling events missed in the past

It is possible that due to network issues, RPC errors, or other problems, some events may have been missed during the initial sync. This can happen when:

- An RPC node provided broken information.
- Etherscan or other indexers had wrong data.
- Sources used were not fully synced.
- Other kind of bugs.

You can find the menu by clicking the three-dots `⋮` menu in the top right and selecting `Re-pulling Events`.
You can pull blockchain transaction events and events that come from exchanges.

![Repull transactions](/images/usage-guides/history/events/repull_transactions.webp)

If any missed transactions are found, you'll see a notification indicating how many new transactions were discovered. You can click the action in the notification to view the pulled transactions.

![Repulled transactions result](/images/usage-guides/history/events/repull_transactions_notification.webp)

After the transactions are pulled, blockchain transactions need to be decoded, while events from exchanges will appear directly. For blockchain transactions, you can either:

- Wait a few moments for automatic decoding
- Click the refresh button to trigger decoding manually
- Check the transaction decoding status to monitor progress

Once decoded, the blockchain transactions will appear in the history view with all their associated events.

## Missing accounting rule

If you see this warning button, it means the event won't be processed correctly in accounting. It could be due to improper decoding or a missing accounting rule for that event. You can fix it by editing the event or adding the missing accounting rule. You can also edit the events if they have special meaning to you, such as OTC trades or transfers between accounts.

![The button indicates that the event won't be processed correctly.](/images/usage-guides/history/events/not_processed.webp)

## Edit accounting rule

![Edit accounting rule](/images/usage-guides/history/events/edit_accounting_rule.webp)

You can customize how events are processed in accounting by editing their accounting rules. When editing an accounting rule, you have two options:

1. **Apply to all matching events** - Updates all existing events that share the same combination of event type, subtype, and counterparty. This creates a general rule that affects all similar events.

2. **Apply to this specific event only** - Creates a special accounting rule that targets only the selected event, without affecting other similar events.

## Ignore events in accounting

By default, all events will be processed in accounting, but you can ignore unwanted events, so they won't be processed. You can click on the three-dots `⋮` menu to display the options for the group of events, and click `Ignore events in accounting`/`Unignore events in accounting`.

## Select multiple events

You can go to selection mode and select multiple events by clicking this menu in the top left:

![Selection mode](/images/usage-guides/history/events/selection_mode.webp)

You can perform two actions:

1. Delete the selected events
2. Set regular accounting rules for specific events
   - Note: Multiple selected events must have the same entry type/subtype combination to apply custom accounting rules.

![Select multiple events](/images/usage-guides/history/events/select_multiple.webp)

## Add / edit events

There are 11 types of events in rotki:

:::tabs
== History Event

![History event form](/images/usage-guides/history/events/history_event_form.webp)

Here the non obvious fields are:

- `Action`: What the event does, named as a verb. See [Choosing an action](#choosing-an-action) below.
- `Sequence Index`: Is an internal index that sets the order in which events happened in the transactions. This allows knowing how events are sorted and should be taken into account. By default it corresponds to the event log index in the blockchain with a few exceptions.

== EVM Event

![EVM event form](/images/usage-guides/history/events/evm_event_form.webp)

Currently we support EVM events for these chains:

- Ethereum
- Optimism
- Polygon PoS
- Arbitrum One
- Base
- Gnosis
- Scroll
- Binance Smart Chain
- ZkSync Lite

Here the non obvious fields are:

- `Action`: What the event does, named as a verb. See [Choosing an action](#choosing-an-action) below.
- `Sequence Index`: Is an internal index that sets the order in which events happened in the transactions. This allows knowing how events are sorted and should be taken into account. By default it corresponds to the event log index in the blockchain with a few exceptions.
- `Location Label`: This is the address related to the event, for example if you are receiving one asset in a transfer or calling a contract will match with your address.
- `Address`: Registered rotki account which this event is linked to.
- `Counterparty`: This is the other part of the transaction, the address you are interacting with. Can be a protocol identifier if the transaction is decoded as part of a protocol.

== EVM Swap Event

![EVM swap event form](/images/usage-guides/history/events/evm_swap_event_form.webp)

Basically it's similar to `EVM Event`, but it's specifically for swap events.
You can add multiple `spend` and `receive` assets.

== ETH Withdrawal Event

![ETH withdrawal event form](/images/usage-guides/history/events/eth_withdrawal_event_form.webp)

== ETH Block Event

![ETH block event form](/images/usage-guides/history/events/eth_block_event_form.webp)

== ETH Deposit Event

![ETH deposit event form](/images/usage-guides/history/events/eth_deposit_event_form.webp)

== Asset Movement Event

![Asset movement event form](/images/usage-guides/history/events/asset_movement_form.webp)

== Bitcoin Event

![Bitcoin event form](/images/usage-guides/history/events/bitcoin_event_form.webp)

Use this entry type for a decoded Bitcoin or Bitcoin Cash transaction event. The form automatically uses `BTC` for Bitcoin and `BCH` for Bitcoin Cash, so the asset cannot be changed independently.

The key fields are `Transaction ID` (the transaction hash), `Location` (Bitcoin or Bitcoin Cash), `Timestamp`, `Amount`, `Action`, `Sequence Index`, and `Counterparty`. An amount is required. Location and transaction ID are fixed after creation.

Advanced options include `Group Identifier` and `Extra Data` for additional context. When adding an event to an existing Bitcoin transaction, rotki pre-fills the transaction ID, location, timestamp, and group identifier from that transaction.

== Swap Event

![Swap event form](/images/usage-guides/history/events/swap_event_form.webp)

== Solana Event

![Solana event form](/images/usage-guides/history/events/solana_event_form.webp)

Similar to an EVM Event but for the Solana blockchain. The location is fixed to Solana. Key fields include:

- `Signature`: The Solana transaction signature (equivalent to a transaction hash).
- `Action`: The same action picker as other event types.
- `Sequence Index`: Order of the event within the transaction.
- `Counterparty`: The protocol or address you interacted with.

Advanced options include `Group Identifier` and `Extra Data` for additional context.

== Solana Swap Event

![Solana swap event form](/images/usage-guides/history/events/solana_swap_event_form.webp)

Similar to the EVM Swap Event but for the Solana blockchain. The location is fixed to Solana. You can add multiple `spend` and `receive` assets, along with optional fee entries. Key fields include:

- `Signature`: The Solana transaction signature.
- `Spend` / `Receive`: Lists of assets spent and received in the swap, each with an asset and amount.
- `Fee`: Optional fee entries that can be enabled via the fee checkbox.
- `Contract Address`: The Solana program or contract address involved.
- `Sequence Index` / `Counterparty`: Same as other event types.
  :::

For history event, and EVM history event, if any event was not decoded the way you expected it to be, you can always customize events using the settings described above or file a bug report via the in-app Report Issue dialog (Help & Support > Report Issue), on our github repository, or in our discord server. The customizations that you make also affect how events are processed in accounting.

### Choosing an action

Every event form has one `Action` field describing what the event does, written as a verb rather than
as a raw type and subtype pair. Open it and you get a searchable list, so you can type `bridge` or
`airdrop` instead of working out which combination expresses it.

![The action picker](/images/usage-guides/history/events/action_picker.webp)

Actions are grouped by intent: `Trade`, `Transfer`, `DeFi deposit & withdraw`, `DeFi borrow & repay`,
`Staking`, `Income`, `Expense`, `Donation`, `NFT`, `Bridge`, `Centralized exchange`, `Validator`,
`Governance`, `Approval`, `Loss` and `Other`. Each row carries a one-line description of what it
means for your accounting, and a direction badge (`In`, `Out` or `Neutral`) telling you which way the
assets move. That badge is how two rows sharing a name are told apart: a swap has both an `Out` and
an `In` side, and so does a bridge or a migration.

The actions you pick most often are collected in a `Recent` group pinned to the top of the list. Use
`↑` `↓` to move, `↵` to select and `esc` to close.

The list only offers actions the entry type you are editing can actually produce, so an action that
would make no sense for the event in front of you is never shown.

> [!NOTE]
> `Action` is a friendlier way to set the same event type and subtype rotki has always stored, not a
> replacement for them. Accounting rules, the P&L report and the filter bar's `Type` and `Subtype`
> filters still work on the underlying pair, which is documented in the
> [Event Types & Subtypes Reference](/usage-guides/tax-accounting/event-types).

### Common customization

These are some common customizations you may want to do, based on the issue. Each names the `Action`
to pick:

- `transfer` if you are sending money to a friend (or to another account you own) and don't want the event to be taxable.
- `account deposit` / `account withdraw` if you're moving assets between exchanges or wallets. These won't be taxable in P&L reports and ensure balance tracking is accurate.
- `protocol deposit` / `protocol withdrawal` if assets are going to or coming from a DeFi protocol (staking, lending, etc.) without receiving a receipt token back. These won't be taxable in P&L reports and ensure balance tracking is accurate.
- `bridge out` if you are depositing to a bridge in order to move something to another chain, and `bridge in` if you are receiving something from another chain via a bridge.
- For a swap: both events get `swap`, the first one the `Out` side and the second the `In` side. What's also important is the `sequence_index`. They need to be subsequent and the send should come before the receive.
- `send` / `receive` if it is a plain expenditure / receipt.
- `claim reward` if you got a reward for something.
- `airdrop` if you received an airdrop.
- `deposit` / `return` if you interacted with a protocol (e.g. Curve, Yearn, Aave, etc.) and received a wrapped token / returned one to reclaim the underlying asset.
- `fee` if you are paying a fee for some of your actions.
- `migrate` if it is a migration of assets from one protocol to another and you don't lose / gain anything from this event. For example when migrating from SAI to DAI. There are two events in a migration, and both get `migrate`: the `Out` side for the old asset you sent, the `In` side for the new one you received.
- `stake` if it is a staking deposit event. For example staking in eth2 or in liquity.
- `renew` if it is a renewal of any subscription or service that you are paying for.
- `informational` if the event contains some useful information but it shouldn't be considered in accounting at all.

Events that have been modified will appear marked in the UI.

![Customized events in the UI](/images/usage-guides/history/events/customized.webp)

## Updating the price of an event

The fiat value shown next to an asset on a history event row is computed from the historic price rotki has for that asset at the event timestamp. If the value looks wrong (for example, the oracle returned a bad price for that block, or no oracle has data that far back), you can override it directly from the event row without leaving the page.

Click the asset chip on the event row to open its menu and pick the **Update price** action (the dollar icon).

![Update price action on an event row](/images/usage-guides/history/events/price_edit_button.webp)

This opens the price update dialog:

![Update price dialog for a history event](/images/usage-guides/history/events/price_edit_dialog.webp)

The dialog prefills with the price rotki currently has stored for `(asset, your main currency, event timestamp)`:

- If a cached oracle entry exists for that timestamp, you can choose between **updating the oracle entry** (overriding the value the source returned, keeping the source attribution) or **saving a manual price** that takes precedence over the oracle. The toggle shows the actual source name (`Cryptocompare`, `CoinGecko`, `DefiLlama`, etc.).
- If nothing is cached for that timestamp, the dialog only offers the manual option.

Saving updates the stored historic price and invalidates rotki's in-memory cache, so any other view showing that price (other history events with the same asset/timestamp, balances, snapshots, P&L reports) updates immediately.

## Resolving Issues

rotki detects issues with your history events that may affect accounting accuracy, and collects them
in the **actions center** at the top of the page.

See **[Resolving history event issues](/usage-guides/history/issues)** for what each category means
and how to clear it: unmatched asset movements and bridge transactions, duplicate customized events,
internal transaction conflicts and undecoded transactions.
