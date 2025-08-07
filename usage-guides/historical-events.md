# History events

rotki is capable of pulling and decoding a bunch of different events, ranging from EVM chain transactions to exchanges events and more. When you visit the `History Events` section the process to obtain all the information will start. You will be able to check the status in an informative breakdown per blockchain address. Free users are limited to a number of latest events.

## Supported events

Currently, these events are detected automatically by rotki:

- Transactions from registered **EVM accounts** (except Avalanche). Events from non-EVM accounts are not retrieved at the moment
- Events from registered exchanges.
- ETH withdrawal events
- ETH block events
- ETH deposit events
- Asset movement events (deposits and withdrawals).
- Swap events (trades).

Additionally, you can add your custom events.

## Events filtering

History events can be filtered if you have a premium subscription activated. You can filter by:

- Account (a tracked blockchain address)
- Time range
- Asset involved in the transaction
- Protocol that interacted in the transaction
- Location of the event (ethereum, optimism, kraken, etc.)
- Event type (deposit, withdrawal, etc.)
- Event subtype (fee, spend, etc.)
- Entry type (EVM event, ETH block event, etc.)
- Counterparty address
- Tx hash of a particular transaction that you want to check
- Index of an eth2 validator that you want to see events for
- Show only customized events
- Show entries with ignored assets
- Should match exact filter (whether to only show the events that match the filter, excluding the other events in the same group)

![History events query status](/images/events_filter.png)

## Export history events as CSV

Events can be exported as CSV, click on `Export CSV` button and accept prompt to download exported events.

![Button to download events as csv](/images/events_csv_export.png)

## Ignore events in accounting

By default, all events will be processed in accounting, but you can ignore unwanted events, so they won't be processed. You can click on the three dots to display the options for the group of events, and click `Ignore events in accounting`/`Unignore events in accounting`.

## Refreshing Events

You can choose to refresh all events by clicking the main `Refresh` button, or you can open the menu and choose to refresh only certain types of events or accounts.

### By Chain

Refreshes specific chains, optionally limited to only specific accounts on those chains.

![Refreshing onchain events](/images/refreshing_onchain_events.png)

To see the status, you can click the button here:

![See query status](/images/see_query_status.png)

Basically, what happens when you refresh the transactions/events are:

1. It will query the transactions from the "last queried time" to the current time.
2. For EVM events, after rotki queries these new transactions, it will try to decode them.
3. The events will be displayed correctly in the UI only after they are properly decoded.

![Events query status](/images/events_query_status.png)

### Exchange Events

Refreshes the events from specific exchanges.

![Refreshing exchange events](/images/refreshing_exchange_events.png)

### ETH Staking Events

Refreshes ETH withdrawals and block production events.

![Refreshing eth staking events](/images/refreshing_eth_staking_events.png)

### Protocol Events

Refreshes events from specific protocols such as Monerium and Gnosis Pay, pulling data from the protocol's API to enrich the existing onchain events.

![Refreshing protocols events](/images/refreshing_protocols_events.png)

## Redecoding EVM transactions

It is possible that you need to redecode events for an EVM transaction. To do that you have two options. The first of them is to click on the three dots to display the options for an EVM transaction and click on `Redecode events`. This will start the process to read the transaction's events again and try to understand what happened in them. If there are any custom events in the transaction, there will be one more confirmation, asking whether to also reset these custom events or not.

![Redecode events for an EVM transaction](/images/redecode_events.png)

The second option is to redecode all EVM transactions that have been queried. To do so you need to click on `Redecode EVM Events` at the top of the page.

![Menu to redecode all queried EVM transactions events](/images/redecode_all_events.png)

To see the status of the event's decoding, you can click the menu button and go to `Transaction Decoding Status.`

![Menu to redecode events for an EVM transaction](/images/redecode_events_status_button.png)

You will see the status of the EVM events redecoding.

![EVM events redecoding breakdown](/images/redecode_events_status.png)

EVM Transactions and the events can be deleted, but to restore them you will have to either purge all transactions or add by the transaction hash.

## Delete event

![Menu to delete EVM transactions events](/images/delete_transaction_events.png)

## Add transaction by hash

![Add transaction by hash](/images/add_tx_by_hash.png)

If you want to add a transaction that was either deleted or for some reason missed, or was not found by rotki, you can add it by transaction hash by clicking the menu as seen in the picture.

## Re-Pulling Transactions

You can re-pull EVM transactions for a specific account within a selected time range, in case any past issues prevented events from being retrieved properly.

## Missing accounting rule

If you see this warning button, it means the event won't be processed correctly in accounting. It could be due to improper decoding or a missing accounting rule for that event. You can fix it by editing the event or adding the missing accounting rule. You can also edit the events if they have special meaning to you, such as OTC trades or transfers between accounts.

![The button indicates that the event won't be processed correctly.](/images/event_not_processed.png)

## Add / edit events

There are 6 types of events in rotki:

:::tabs
== History Event

![History event form](/images/events_history_event_form.png)

Here the non obvious fields are:

- `Event Type`: We have created a categorization of all the actions in a set of major event types. This field will describe the action category.
- `Event Subtype`: Inside an event type you can perform different actions. This subtype will let you describe exactly what is happening in the event.
- `Sequence Index`: Is an internal index that sets the order in which events happened in the transactions. This allows knowing how events are sorted and should be taken into account. By default it corresponds to the event log index in the blockchain with a few exceptions.

== EVM Event

![EVM event form](/images/events_evm_event_form.png)

Currently we support EVM events for these chains:

- Ethereum
- Optimism
- Polygon PoS
- Arbitrum One
- Base
- Gnosis

Here the non obvious fields are:

- `Event Type`: We have created a categorization of all the actions in a set of major event types. This field will describe the action category.
- `Event Subtype`: Inside an event type you can perform different actions. This subtype will let you describe exactly what is happening in the event.
- `Sequence Index`: Is an internal index that sets the order in which events happened in the transactions. This allows knowing how events are sorted and should be taken into account. By default it corresponds to the event log index in the blockchain with a few exceptions.
- `Location Label`: This is the address related to the event, for example if you are receiving one asset in a transfer or calling a contract will match with your address.
- `Address`: Registered rotki account which this event is linked to.
- `Counterparty`: This is the other part of the transaction, the address you are interacting with. Can be a protocol identifier if the transaction is decoded as part of a protocol.

== EVM Swap Event

![EVM swap event form](/images/events_evm_swap_event_form.png)

Basically it's similar to `EVM Event`, but it's specifically for swap events.
You can add multiple `spend` and `receive` assets.

== ETH Withdrawal Event

![ETH withdrawal event form](/images/events_eth_withdrawal_event_form.png)

== ETH Block Event

![ETH block event form](/images/events_eth_block_event_form.png)

== ETH Deposit Event

![ETH deposit event form](/images/events_eth_deposit_event_form.png)

== Asset Movement Event

![Asset movement event form](/images/events_asset_movement_form.png)

== Swap Event

![Swap event form](/images/events_swap_event_form.png)
:::

For history event, and EVM history event, if any event was not decoded the way you expected it to be, you can always customize events using the settings described above or file a bug report on our github repository / in our discord server. The customizations that you make also affect how events are processed in accounting.

Examples of customization. You can set:

- `Event Type` to `Transfer` if you are sending money to a friend / (another account you own) and don't want the event to be taxable. The `Event Subtype` should be `None` in that case.
- `Event Type` to `Deposit` / `Withdrawal` and `Event Subtype` to `Deposit Asset` / `Remove Asset` if you are depositing or withdrawing assets from an exchange or a protocol. Then this event won't be considered taxable in P&L reports. Currently rotki doesn't detect deposits / withdrawals automatically for all exchanges and protocols.
- `Event Type` to `Withdrawal` and `Event Subtype` to `Bridge` if you are receiving something from another chain via some kind of bridge. And `Event Type` to `Deposit` and `Event Subtype` to `Bridge` if you are depositing to a bridge in order to move something to another chain.
- For a swap: The first event should be `Event Type`: `Trade` and `Event Subtype`: `Spend`, while the second event should be `Event Type`: `Trade` and `Event Subtype`: `Receive`. But in swaps what's also important is the `sequence_index`. They need to be subsequent and the send should come before the receive.
- `Event Type` to `Spend` / `Receive` and `Event Subtype` to `None` if it is a plain expenditure / receipt.
- `Event Type` to `Receive` and `Event Subtype` to `Reward` if you got a reward for something.
- `Event Type` to `Receive` and `Event Subtype` to `Airdrop` if you received an airdrop.
- `Event Type` to `Receive` / `Spend` and `Event Subtype` to `Receive Wrapped` / `Return Wrapped` accordingly if you interacted with a protocol (e.g. Curve, Yearn, Aave, etc.) and received wrapped / returned some wrapped tokens.
- `Event Type` to `Spend` and `Event Subtype` to `Fee` if you are paying a fee for some of your actions.
- `Event Type` to `Migration` if it is a migration of assets from one protocol to another and you don't lose / gain anything from this event. For example when migrating from SAI to DAI. There is two events in a migration. Both should have type `Migration` and the OUT event should have `Event Subtype` set to `Spend`, while the IN event should have `Event Subtype` set to `Receive`.
- `Event Type` to `Staking` and `Event Subtype` to `Deposit Asset` if it is a staking deposit event. For example staking in eth2 or in liquity.
- `Event Type` to `Renew` and `Event Subtype` to `None` if it is a renewal of any subscription or service that you are paying for.
- `Event Type` to `Informational` and `Event Subtype` to `None` if the event contains some useful information but it shouldn't be considered in accounting at all.

Events that have been modified will appear marked in the UI.

![Customized events in the UI](/images/customized_events.png)
