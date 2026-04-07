# Accounting Rule Options Explained

This page explains every accounting setting in rotki in detail. These settings control how your transactions are processed when generating a [Profit/Loss Report](/usage-guides/pnl). You can configure them under **Settings → Accounting Settings** ([screenshot guide](/usage-guides/customization#accounting-settings)).

> [!IMPORTANT]
> rotki's default settings are based on German tax rules. Check with your tax advisor about what's required in your country and adjust accordingly.

## Cost basis method

The cost basis method determines which acquisition is matched to a sale when calculating profit or loss.

| Method   | Full Name             | How it works                                    | Best for                                                       |
| -------- | --------------------- | ----------------------------------------------- | -------------------------------------------------------------- |
| **FIFO** | First In, First Out   | The oldest acquisition is matched first         | Most common default; required in many jurisdictions            |
| **LIFO** | Last In, First Out    | The most recent acquisition is matched first    | Jurisdictions that allow it; can defer gains in rising markets |
| **HIFO** | Highest In, First Out | The highest-priced acquisition is matched first | Minimizing taxable gains (where allowed)                       |
| **ACB**  | Average Cost Basis    | Uses the weighted average price of all holdings | Required in some jurisdictions (e.g., Canada, UK for shares)   |

**Example (FIFO)**: You bought 1 ETH at $1,000, then another 1 ETH at $2,000. You sell 1 ETH at $3,000. Under FIFO, the sale is matched to the $1,000 purchase, so your taxable gain is $2,000.

**Example (HIFO)**: Same scenario — the sale is matched to the $2,000 purchase, so your taxable gain is only $1,000.

## Crypto to crypto trades

**Setting**: `True` (default) or `False`

Controls whether swapping one cryptocurrency for another is treated as a taxable event.

**When `True`**: Each crypto-to-crypto swap generates "virtual trades" through your profit currency. For example, swapping 1 ETH → 2000 USDC when ETH is worth €3,000 and you originally bought ETH at €1,000 creates:

- Virtual sell: Sell 1 ETH for €3,000 → PnL = €3,000 - €1,000 = **€2,000 gain**
- Virtual buy: Buy 2000 USDC for €3,000 → PnL = €0 (acquisition, not taxable yet)

**When `False`**: No profit/loss is calculated on the swap. The cost basis of the received asset inherits from what was given up.

**Most users should**: Leave this as `True`. Most tax jurisdictions treat crypto-to-crypto swaps as taxable dispositions.

## Crypto spending

This is part of the "Crypto to Crypto Trades" setting and controls whether spending crypto (on fees, purchases, etc.) triggers a cost basis PnL calculation.

**When `True`**: When you spend crypto, rotki calculates both the loss from spending and any profit/loss from price changes since you acquired the asset.

**Example**: You bought 1 ETH at €50. You later spend it on gas when ETH is worth €100.

- Loss from spending: -€100
- Gain from price increase: €100 - €50 = €50
- **Net PnL: -€50**

**When `False`**: Only the spending loss is counted. Net PnL: -€100.

## EVM gas costs

**Setting**: `True` (default) or `False`

Whether gas fees for on-chain transactions should be counted as a loss (expense) in PnL calculations.

**When `True`**: Gas costs reduce your PnL as an expense.

**When `False`**: Gas costs are ignored in PnL calculations.

## Tax-free period

**Setting**: Number of days, or disabled

If your country exempts crypto assets held for longer than a certain period from capital gains tax (e.g., Germany: 1 year = 365 days), enter the number of days here.

**How it works**: When you sell an asset that you've held longer than the tax-free period, the gain is moved to the `pnl_free` column instead of `pnl_taxable` in the PnL report.

## Calculate past cost basis

**Setting**: `True` (default) or `False`

Whether rotki should look at all of your historical transactions (even before the report period) to determine the cost basis of assets sold during the report period.

**When `True`**: If you bought ETH in 2020 and sell it in 2024, rotki uses the 2020 purchase price as the cost basis — even if your report period is only 2024.

**When `False`**: Only events within the report period are considered for cost basis. This means older acquisitions are ignored, which can result in "no documented acquisition found" warnings.

**Most users should**: Leave this as `True`. Turning it off means rotki can't trace the original purchase price for assets you've held for a long time.

## Omit ETH staking events

**Setting**: `True` or `False` (default)

Controls when ETH staking rewards become taxable.

**When `True`**: Staking rewards are only considered taxable after the Ethereum merge and withdrawals are enabled (September 2022+). Earlier rewards are omitted from PnL.

**When `False`**: All staking rewards are taxable at the time they are received, including pre-merge rewards.

## Include fees in cost basis

**Setting**: `True` (default) or `False`

Whether trading fees are added to the cost basis of the asset you're buying.

**Example**: You buy 1 ETH for €1,000 and pay a €10 fee.

**When `True`**: The cost basis of that ETH is €1,010. The fee is incorporated into the cost basis and will reduce your taxable gain when you eventually sell.

**When `False`**: The cost basis is €1,000. The €10 fee appears as a separate spend event.

## Understanding accounting rule properties

When you create or edit an [accounting rule](/usage-guides/customization#add-edit-accounting-rules), or when you look at the default rules in rotki's codebase, each rule has several properties that control how events are processed:

### Taxable

Whether the event is subject to tax. If `False`, the event is recorded but doesn't contribute to taxable PnL.

### Count entire amount as spend

For spending events, whether the full amount should be counted as an expense (negative PnL).

**Example**: You spend 0.01 ETH (worth €30) on gas.

- If `True`: The full €30 is counted as a loss.
- If `False`: The amount is not counted as a direct loss (but cost basis PnL may still apply).

### Count cost basis PnL

Whether to calculate the profit or loss between the asset's current value and its original acquisition price.

This is the setting the user named "Count cost basis PnL" in the UI. It determines whether, in addition to counting the event as a spend/acquisition, rotki also computes the capital gain or loss since you originally acquired the asset.

**Example**: You bought 1 ETH at €1,000. You later spend it when ETH is worth €3,000.

- If `True`: rotki records a €2,000 capital gain (€3,000 - €1,000) in addition to the €3,000 spend.
- If `False`: Only the spending amount is recorded; the difference from the acquisition price is ignored.

**When you'd set this to `False`**: For events where the "spend" is not a real disposal — for example, depositing into a protocol. You're moving your asset, not selling it, so there's no capital gain to realize.

### Accounting treatment: Swap

When multiple events are processed together (e.g., a trade that has both a spend and a receive event), the **Swap** treatment tells rotki to treat them as a single exchange.

In a swap:

1. The spend side disposes of the asset (potentially triggering a capital gain/loss)
2. The receive side acquires a new asset at the current market value

This is the default treatment for trades and DEX swaps. Without swap treatment, each side of a trade would be processed independently, which would produce incorrect PnL.

**Example**: You swap 1 ETH (bought at €1,000) for 3,000 USDC when ETH is worth €3,000.

- Spend side: Dispose of 1 ETH → capital gain of €2,000
- Receive side: Acquire 3,000 USDC at cost basis of €3,000

### Accounting treatment: Basis Transfer

**Basis Transfer** is used when you move assets between forms without realizing a gain or loss. The cost basis of the original asset is transferred to the new asset.

This is used for events like token migrations (SAI → DAI), protocol deposits where you receive a receipt token, and similar non-taxable conversions.

**Example**: You migrate 1,000 SAI (cost basis €900) to 1,000 DAI.

- With Basis Transfer: The 1,000 DAI inherits the €900 cost basis. No taxable event.
- Without Basis Transfer: The SAI disposal would trigger a gain/loss calculation, and DAI would be acquired at current market price.

**When it's used**: Token migrations, wrapping/unwrapping (ETH ↔ WETH), receipt tokens from lending protocols, and other conversions where economic value doesn't change.

## Custom accounting rules

You can create custom rules that override the defaults for specific combinations of:

- Event type
- Event subtype
- Counterparty (protocol identifier)

See [Add/Edit accounting rules](/usage-guides/customization#add-edit-accounting-rules) for how to create them in the UI.

### Limitations

- **Counterparty must be a known protocol**: You can only create rules for counterparties that rotki recognizes (e.g., "uniswap-v3", "aave", "makerdao_dsr"). Custom smart contract addresses cannot currently be used as counterparties for accounting rules. Support for custom counterparties is tracked in [rotki/rotki#9803](https://github.com/rotki/rotki/issues/9803).
- **Rules are global**: A rule applies to all events matching the type/subtype/counterparty combination. For per-event overrides, use [special accounting rules for specific events](/usage-guides/customization#special-accounting-rules-for-specific-events).

## CSV export settings

These settings control the format of exported PnL reports:

- **Export Formulas**: Whether to export cell formulas (for spreadsheet calculations) or just the computed values.
- **Have Summary**: Whether to include a summary section at the end of the CSV with totals and the rotki version/settings used.
