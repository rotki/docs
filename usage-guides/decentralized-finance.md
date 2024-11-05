# Decentralized Finance

To track and analyze your DeFi actions use the Decentralized Finance tab from the left side menu. You can choose from the different types of DeFi actions presented in the submenu.

## Overview

rotki provides an overview of your assets in the different Defi protocols.

![Defi Overview](/images/defi_overview.png)

> Note: This view is deprecated and does not show all supported protocols. Account and dashboard tokens should include all detected protocol tokens.

## Deposits

In the deposits section you can see the status of your different Defi lending protocols.
You can see the status of your Yearn Vaults, Aave lending, Compound supply along with
your DAI in MakerDAO DSR.

The accounts are auto-detected from your given blockchain accounts.
However you can, and most probably should, manage the different modules and addresses that are queried to make the retrieval faster.
For more information you can check [module setting](/usage-guides/customization.html#module-settings).

You can see how much of each asset you have locked over all of your accounts and how much of each is locked
for each account across the different protocols.

![DSR without premium](/images/sc_decentralized_deposits_no_premium.png)

You can also filter by account and protocol and you can see how the assets are locked in the various protocols.

![Defi Deposits with premium](/images/sc_decentralized_deposits.png)

You can see details about the assets locked in your Yearn vaults and check the profit/loss per asset.

![Defi Deposits Yearn Vaults](/images/sc_decentralized_deposits_yearn.png)

You can also get a detailed list of historical actions performed in the supported Defi protocols such as deposits withdrawals etc.

![Defi Deposits history](/images/sc_decentralized_deposits_history.png)

Finally you need to have a premium subscription in order for the total amount of earned or lost value per asset in a given time period to be counted in the profit/loss report.

## Liquidity Pools

![Defi LP positions in the dashboard](/images/lps_in_dashboard.png)

rotki allows its users to keep track of their Liquidity Pools. An overview is available in the dashboard and it is also possible to get a per protocol view in the deposits section.

![Defi Liquidity Pools](/images/sc_decentralized_lp.png)

These are the supported Liquidity Pools balances by rotki:

- Uniswap v2
- Uniswap v3 (Underlying assets available to premium users only)
- Sushiswap (Premium users only)
- Balancer (Premium users only)

![Defi Liquidity Pools PnL and Events](/images/sc_decentralized_lp_pnl_and_events.png)

The liquidity pool support allows premium users to see their balances, the per pool profit/loss and any events
(such as mint/burn) performed.

![Defi Liquidity Pools Summary on Dashboard](/images/sc_decentralized_lp_summary.png)

> Note: For the balancer pools, you need `The Graph` API key to get the balances. Read [The Graph API Key](/usage-guides/importing-data.html#the-graph)

## Liabilities

In the liabilities section you can find information on your Aave Borrowing, Compound Borrow, Liquity troves and MakerDAO Vaults.
These collateralized loans can be autodetected from your ethereum accounts and information about each one of them is displayed.
However you can manage the different modules and addresses that are queried to make the retrieval faster.
For more information you can check [module setting](/usage-guides/customization.html#module-settings).

As a normal non-premium user you can see all your vaults/troves, and for each one inspect the locked collateral, collateralization, debt generated and the liquidation price.

![MakerDAO vaults without a premium account](/images/sc_vaults_nonpremium.png)

The information displayed for a Liquity trove shows as in this capture

![Liquity troves information](/images/sc_liquity_troves.png)

With a premium subscription you can also see additional information such as the creation time of the vault, list of historical activities, total interest owed and liquidation events.

![MakerDAO vaults with a premium account](/images/sc_vaults_premium.png)

in the case of troves with a premium subscription you can see the history of events and the changes in collateral and debt

![MakerDAO vaults with a premium account](/images/sc_liquity_premium.png)

Premium users can also have makervault interest taken into account in the profit/loss report.

Finally premium users can create watchers for their vaults.

![MakerDAO vault watchers](/images/sc_vaults_premium_watchers.png)

They can add a target collateralization ratio they would like rotki to watch for in a vault.
If the collateralization ratio becomes less/greater than that ratio then an alert is sent to your email.
This watcher service runs on the rotki server so you don't even need to leave the application open.

Below you can see a small demonstration of the usage of makerdao vaults by a premium account.

![Makerdao vaults premium demo](/images/vaults_premium_demo1.png)

![Makerdao vaults premium choose account](/images/vaults_premium_demo2.png)

![Makerdao vaults premium more details](/images/vaults_premium_demo3.png)

![Makerdao vaults premium exit watcher](/images/vaults_premium_demo4.png)
