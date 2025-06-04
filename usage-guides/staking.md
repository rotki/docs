# Staking

rotki currently supports staking tracking for:

1. Ethereum (ETH2)
2. Liquity
3. Kraken

## ETH2 Staking

You can track ETH2 staking in 2 ways:

1. Add the ETH account that deposited funds for the validator - this automatically detects and tracks associated validators.
2. Add a validator manually:
   - Go to `Accounts → EVM Account > Validators`
   - Click `Add account`
   - Enter the validator's public key and/or index
   - Optional: Set ownership percentage if sharing the validator

![Track an ETH2 validator](/images/eth2_add_validator.png)

After adding a new validator you will see a list showing the status and balance of each validator.
Validator status may be `PENDING`, `ACTIVE`, `EXITING`, `EXITED`, or `CONSOLIDATED`.

Validators with a status of `CONSOLIDATED` have been merged with another validator.
Consolidation was introduced in Ethereum's Pectra upgrade with EIP-7251 raising the maximum effective balance from 32 ETH to 2048 ETH.
To take advantage of the higher limit a validator must first be converted into an accumulating validator, changing its withdrawal credentials from `0x00` or `0x01` to `0x02`.
Once converted, additional ETH can be deposited into the validator, and other validators can be consolidated into it combining their balances.

rotki detects consolidation via the execution layer consolidation request transaction (see an example transaction [here](https://etherscan.io/tx/0x812eeeb8a786650afa1826d8e9d46aa2073e28f1ed261f0c3da4ea18b7d7cd82)).

![ETH2 validator balances](/images/eth2_validators.png)

View your ETH staking details under menu `Staking > ETH`.
ETH2 stakers can track their earnings both at current ETH prices and based on the value of daily staking rewards.

Validator profit is calculated from several different sources:

- Outstanding CL (Consensus Layer) rewards - The amount by which the validator's current balance exceeds the maximum effective balance (32 or 2048 ETH depending on if its an accumulating validator).
- CL skimming withdrawals - Profit withdrawn from the validator on the consensus layer.
  Accumulating validators also support user requested partial withdrawals that are not profit, so rotki detects partial versus skimming withdrawals by checking if there is a corresponding execution layer withdrawal request transaction.
- Block and MEV rewards - rotki must be tracking the receiving address to count these in the validator's profit.
- Exits - When a validator is exited the profit is calculated as the exited amount minus the deposited amount.

![ETH2 validator stats](/images/rotki_eth2_staking.png)

You can see the summary of how much ETH was earned each day, on the daily stats section.

![ETH2 validator daily stats](/images/rotki_eth2_daily_stats.png)

These earnings are included in profit/loss reports and can be exported to CSV for spreadsheet analysis.

![ETH2 validator earning CSV](/images/rotki_eth2_pnl.png)

## Liquity Staking

If you stake LQTY in the protocol you can see stability pool deposits, staked amount, and the stake events.

![See your Liquity staking gains](/images/sc_staking_liquity.png)

On the left side, we display information for your current deposited amount of `LUSD` in the stability pool along with the `ETH` and `LQTY` rewards that you haven't claimed yet. On the right side, we display the staked `LQTY` and the `ETH` and `LUSD` that are available to claim.

The Liquity statistics are calculated using the queried events and you might need to wait for some time until all the events are queried to get the final values. The values in terms of USD can be displayed using prices at the moment of the different events (`historical`) or using prices at the present (`current`).

- Total Gains Stability Pool: This is the value of Ether and `LQTY` claimed from the stability pool.
- Total Deposited Stability Pool: This is the value of `LUSD` deposited in the stability pool.
- Total Withdrawn Stability Pool: This is the value of `LUSD` withdrawn from the stability pool.
- Stability Pool Gains: A breakdown of the gains already claimed from the pool.
- Estimated PnL: This value represents your returns from the stability pool after losing LUSD in exchange for `ETH` and `LQTY`. For more information on how the stability pool works check [the Liquity docs](https://docs.liquity.org/faq/stability-pool-and-liquidations#how-do-i-benefit-as-a-stability-provider-from-liquidations). This amount is calculated in rotki as follows:

```
A = Total Deposited Stability Pool - Total Withdrawn Stability Pool
LG = Claimed Liquity gains in current price.
R = Not claimed rewards in current price.
B = Total Gains Stability Pool + LG + R
C = (A - Current deposited amount) in current price
PnL = B - C
```

For `LQTY` staking we display the claimed rewards.

![Liquity Statistics](/images/liquity_stats.png)

## Kraken Staking

If you stake on Kraken you can see your gains, and events in the various staked assets.

![See your Kraken staking gains](/images/sc_staking_kraken.png)
