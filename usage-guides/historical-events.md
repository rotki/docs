# Historical events

## Adding manual trades

Rotki will pull all your trade history from the exchanges whenever it needs it. But most of us have probably also done some OTC trades or taxable events at some point. Such events could even just be mining tokens, depending on your jurisdiction, participating in an ICO or getting paid in crypto.

You can go to this page via `History → Exch. Trades`.
Clicking on the "Add an external trade" button will open a menu like the following.

![Add an external trade](/images/external_trade.png)

To add a new trade, fill in all the fields and press the "Save" button.

In the `amount` field you can register the amount of the base asset bought or sold. The `rate` field represents the rate of quote asset per base asset that was bought or sold. If there was a fee for the trade you should input it in the corresponding box and also enter the currency the fee was paid in. This field is optional so if the Fee was 0 you can leave this field empty. You can optionally provide additional notes or even links to blockchain explorers for each trade.

In the Trades page you can see a table of all your external trades. You can edit or delete a trade by clicking on the appropriate icon at the rightmost part of each trade under the "Actions" column.

Currently rotki tracks your balance by querying the different supported protocols, exchanges and blockchains. If you manually add information about a trade your balances will not be updated since trades are not consulted when updating the accounts' balances. If you want to manually update your balance for an asset please refer to the [manual balances section](/usage-guides/accounts-and-balances.html#adding-manual-balances).

## Filtering trades

Rotki supports filtering your trades with a combination of filters. All of the filters are applied at the same time
limiting the trades to the ones that satisfy all the applied filters.

![Filtering trades](/images/sc_history_trades_filter.png)

You can filter using the following keys:

- **base:** the base asset of the trades.
- **quote:** the quote asset of the trades.
- **action:** it can be buy or sell.
- **start:** will only filter any trades from that date onwards.
- **end:** will only filter any trades that happened before the selected date.
- **location:** the location of the trade, e.g. kraken, uniswap etc.

![Trade filter suggestions](/images/sc_history_trades_filter_suggestions.png)

When selecting a filter, by clicking or typing the filter you will get some suggestions based on the available data.

When a suggestion appears you can navigate to the next available suggestion using the tab button or you can also change
the select suggestion using the up/down arrows in your keyboard. You can submit the selected filter by pressing enter.

![Multiple trade filters applied](/images/sc_history_trades_filter_multi.png)

After adding your filters you can press enter to close the menu.

By default, all trades will be processed in accounting, but you can ignore unwanted trades, so they won't be processed.
You can select the checkbox on the left part of each entry and click `Ignore`/`Unignore`.

![Ignore trades](/images/sc_history_trades_ignore.png)

## Filtering deposits & withdrawals

You can filter your deposits and withdrawals in the same way you can filter your trades.

![Deposit filters](/images/sc_history_deposits_filter.png)

For deposits you can use the following filters:

- **asset:** the asset that was deposited or withdrawn.
- **action:** the actions (withdrawal or deposit).
- **start:** will only filter any trades from that date onwards.
- **end:** will only filter any trades that happened before the selected date.
- **location:** the location of the trade, e.g. kraken, uniswap etc.

By default, all deposits/withdrawals will be processed in accounting, but you can ignore unwanted deposit/withdrawals, so they won't be processed.
You can select the checkbox on the left part of each entry and click `Ignore`/`Unignore`.

![Ignore deposits/withdrawals](/images/sc_history_deposits_ignore.png)

## History events

Rotki is capable of pulling and decoding a bunch of different events, ranging from EVM chain transactions to exchanges events and more. When you visit the `History Events` section the process to obtain all the information will start. You will be able to check the status in an informative breakdown per blockchain address. Free users are limited to a number of latest events.

History events can be filtered if you have a premium subscription activated. You can filter by:

- Account (a tracked blockchain address)
- Time range
- Asset involved in the transaction
- Protocol that interacted in the transaction
- Location of the event (ethereum, optimism, kraken, etc.)
- Event type (deposit, withdrawal, etc.)
- Event sub type (fee, spend, etc.)
- Entry type (EVM event, ETH block event, etc.)
- Counterparty address
- Tx hash of a particular transaction that you want to check
- Index of an eth2 validator that you want to see events for
- Only show customized events
- ... more

![History events query status breakdown](/images/events_query_process.png)

By default, all events will be processed in accounting, but you can ignore unwanted events, so they won't be processed. You can click on the three dots to display the options for the group of events, and click `Ignore events in accounting`/`Unignore events in accounting`.

Events can be exported as CSV, click on `Export CSV` button and accept prompt to download exported events.

![Button to download events as csv](/images/events_query_process_export.png)

It is possible that you need to redecode events for an evm transaction. To do that you have two options. The first of them is to click on the three dots to display the options for an EVM transaction and click on `Redecode events`. This will start the process to read the transaction's events again and try to understand what happened in them. If there are any custom events in the transaction, there will be one more confirmation, asking whether to also reset these custom events or not.

![Menu to redecode events for an EVM transaction](/images/redecode_events.png)

The second option is to redecode all EVM transactions that have been queried. To do so you need to click on `Redecode EVM Events` at the top of the page.

![Menu to redecode all queried EVM transactions events](/images/redecode_all_events.png)

EVM Transactions and the events can be deleted, but to restore them you will have to either purge all transactions or add by the transaction hash.

![Menu to delete EVM transactions events](/images/delete_transaction_events.png)

If you see this warning button, it means the event won't be processed correctly in accounting. It could be due to improper decoding or a missing accounting rule for that event. You can fix it by editing the event or adding the missing accounting rule. You can also edit the events if they have special meaning to you, such as OTC trades or transfers between accounts.

![The button indicates that the event won't be processed correctly.](/images/event_not_processed.png)

There are 5 types of events in rotki:

:::tabs
== History Event

![History event form](/images/events_history_event_form.png)

Here the non obvious fields are:

- `Event Type`: We have created a categorization of all the actions in a set of major event types. This field will describe the action category.
- `Event Subtype`: Inside an event type you can perform different actions. This subtype will let you describe exactly what is happening in the event.
- `Sequence Index`: Is an internal index that sets the order in which events happened in the transactions. This allows knowing how events are sorted and should be taken into account. By default it corresponds to the event log index in the blockchain with a few exceptions.

== EVM Event

![History event form](/images/events_evm_event_form.png)

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

== ETH Withdrawal Event

![ETH withdrawal event form](/images/events_eth_withdrawal_event_form.png)

== ETH Block Event

![ETH block event form](/images/events_eth_block_event_form.png)

== ETH Deposit Event

![ETH deposit event form](/images/events_eth_deposit_event_form.png)

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
