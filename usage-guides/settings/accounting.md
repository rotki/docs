---
description: Configuring accounting rules, cost basis methods, trade settings, and custom event rules for PnL reports.
---

# Accounting Settings

> [!TIP]
> For a detailed explanation of what each accounting option does (with worked examples), see [Accounting Rule Options Explained](/usage-guides/tax-accounting/accounting-rules).

![Customizing the accounting rules](/images/sc_accounting_custom_rule.png)

In the accounting menu, you can customize application settings related to accounting calculations. These settings will affect the PnL report calculations.

> [!IMPORTANT]
> Before changing any settings:
>
> 1. Review each option carefully
> 2. Check with your tax advisor about what's required in your country
> 3. Make adjustments based on their guidance

**Current Default Settings:**

- Based on German tax rules
- Uses first-in/first-out (FIFO) method for calculating profits/losses
- Treats crypto sales as tax-free after holding for 1 year

You can change these settings to match your country's tax requirements.

### Add/Edit Accounting Rules

![Add new accounting rules](/images/sc_accounting_add_rule.png)

You can add or edit accounting rules based on `Event type`, `Event subtype`, and `Counterparty`.

### Special Accounting Rules For Specific Events

![Special Accounting Rules](/images/sc_accounting_rules_special.png)

You can set custom accounting rules for individual events or groups of events directly from the History Events page. This allows you to override the default accounting behavior for specific events.

There are two ways to apply special rules:

- Use the [Edit accounting rule](/usage-guides/history/events#edit-accounting-rule) menu for individual events
- Use [Select multiple events](/usage-guides/history/events#select-multiple-events) to apply rules to multiple events at once

### Trade Settings

![Customizing the accounting trade settings](/images/sc_accounting_trade_settings.png)

#### Crypto to Crypto Trades

A setting to determine whether crypto to crypto trades or any events that spend crypto are taxable and should be taken into account. By default it's `True`.

:::tabs
== Crypto to Crypto Trades

> **Illustration:**
> You trade your `1 ETH`, to get `11 USDT`. Current price of ETH is `10 EUR`, but you bought it when it was `5 EUR`.

1. If `True`, virtual trades are generated, and profits/losses are calculated based on the difference in asset prices. By making this trade, we will create two virtual trade, which are:
   - **Virtual Trade 1**: Sell `1 ETH` for `10 EUR`. PnL of this virtual trade is calculated as `the value when you sell this ETH (10 EUR)` minus `the value when you bought this ETH (5 EUR)` = `5 EUR`.
   - **Virtual Trade 2**: Buy `11 USDT` with `10 EUR`. PnL of this virtual trade is `0 EUR` because it's a buy. However, later on, when you trade this `USDT` with another crypto, point (1) will also be applied.
     > **Total PnL** = `5 EUR`.

2. If `False`, no virtual trades are generated, and no additional profits/losses are calculated.
   > **Total PnL** = `0 EUR`.

== Crypto Spending

> **Illustration:**
> You have `1` ETH that you bought with price `50 EUR`. Then you spend this `1` ETH for gas fees, and the price at the moment is `100 EUR`.

1. If `True`, when you use crypto for fees, donations, or purchases, the profit and loss (PnL) calculation shows two things: the loss from spending the crypto and any profit or loss from the difference between the asset's current price and its buying price.
   - **Loss from spending** = `-100 EUR`.
   - **Profit from price difference** = `100 EUR (spend price) - 50 EUR (buy price) = 50 EUR`.
     > **Total PnL** = `-100 EUR + 50 EUR` = `-50 EUR`.

2. If `False`, only the spending loss is considered.
   > **Total PnL** = `-100 EUR`.

:::

#### EVM Gas Costs

Specify if EVM transaction gas costs should be counted as a loss.

#### Tax Free Period

Specify if there is a tax-free holding period for crypto assets.

#### Calculate Past Cost Basis

Enable or disable calculating cost basis from all past events, even before the report period.

#### Omit ETH Staking Events

Specify if ETH staking events are taxable only after the merge and withdrawals are enabled or at the point of receiving.

#### Use Asset Collections in Cost Basis

When enabled, assets that belong to the same collection share cost basis. For example, if WETH and ETH are in the same asset collection, buying WETH and later selling ETH will use the WETH purchase as the cost basis. By default, this setting is `True`.

#### Cost Basis Method

Select the cost basis calculation method: `FIFO`, `LIFO`, `HIFO`, or `ACB`.

#### Include Fees in Cost Basis

A setting to determine if trade fees should be included in the cost basis of the asset being bought/sold. By default, this setting is `True`.

> **Illustration:**
> You bought `1` ETH for `10 EUR` and paid `1 EUR` fee.

:::tabs
== True

The fee event only reduces the amount of the fee asset paid. The actual fee is then used to determine the cost basis of the asset being bought or sold.

> The cost basis of that ETH is `10 + 1` = `11 EUR`. This is where the fee is taken into account.

== False

The above does not happen.

> The cost basis of that ETH is `10 EUR`. But at the time of the trade you also have a spend event of `1 EUR` as fee.

:::

### CSV Export Settings

![Customizing the CSV export settings](/images/sc_accounting_csv_export_settings.png)

#### Export Formulas

Specify if formulas should be exported as formulas in the CSV or as actual values.

#### Have Summary

Specify whether the all_events CSV export should include a summary of all events and the total profit/loss at the end. This summary would also include the rotki version and the settings used during the PnL report, making it easier to reproduce a report run.
