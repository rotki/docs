# Creating a profit/loss report

rotki helps you track your cryptocurrency profits and losses (PnL) by analyzing your trading history and other transactions. Here's what you need to know about how these reports work:

## Key Features

### Multiple Accounting Methods

You can choose how rotki calculates your profits:

- **FIFO (First In - First Out)** - Default method: Assets bought first are sold first
- **LIFO (Last In - First Out)** - Most recently bought assets are sold first
- **HIFO (Highest In - First Out)** - Highest-priced purchases are sold first
- **ACB (Average Cost Basis)** - Uses the average purchase price of all your assets

### Tax-Free Period Support

If your country has tax-free holding periods (like Germany's 1-year rule), you can set this in rotki. Just go to "Accounting Settings" to specify the period in days.

### Smart Balance Tracking

When you generate a report for a specific time period, rotki is smart about your previous holdings.

For example:

- You traded Bitcoin from 2017 to 2019
- You had 0.1 BTC on December 31, 2017
- If you generate a report for 2018-2019, rotki will include that 0.1 BTC as your starting balance

This ensures your reports are accurate even when looking at specific time periods.

## Creating Your PnL Report

![View profit/loss report list](/images/sc_pnl_report.png)

### Step-by-Step Guide

1. Find and click the `Profit and Loss Report` button in the left menu
2. Select your preferred time period:
   - Choose from preset periods
   - Or click "Custom" to set specific start and end dates
3. Click `Generate` to create your report

### Important Notes

- Report generation might take a few minutes, especially for longer periods
- You can review your current accounting settings in the "Accounting settings" section
- Having problems? Check our [troubleshooting guide](/usage-guides/pnl.html#pnl-report-creation-problems)

### Managing Your Reports

- All your previously generated reports are visible on the same screen
- You can view, download, or delete old reports
- **Free Account Limit**: You can store up to 20 reports

> [!NOTE]
> Before generating a new report, make sure all your transactions are properly imported and your accounting settings are correct to ensure accurate results.

## Results of the PnL report

Once done you have an overview of the profit/loss for the given period, how much of that is taxable, and how much each taxable event category contributes to the total.

![Overview of the profit/loss report](/images/sc_pnl_report1.png)

Additionally below the overview you get a table containing all of the events that were taken into account in the calculation along with how much of the `profit_currency` you lost or gained through that event.

![Event list of the profit/loss report](/images/sc_pnl_report2.png)

Finally you can get a CSV export by pressing the "Export CSV" button. This export is meant to be imported into
Google Sheets. Press the button and then choose a directory to write the CSV files to. Once done you can import the CSV
files into Google Sheets via its import menu.

> [!IMPORTANT]
> CSV export only works for the latest report generated in the active session.

Following are definitions for the all_event document's columns

- `type` is a string describing the type of event a user engaged in, e.g. in "I buy ETH for EUR", buy is the `type`.
- `location` is a string describing the location the event occurred at. For example "kraken" for kraken trades.
- `asset` is a string identifying the asset an event was paid in, e.g. in "I bought 1 ETH for 100 EUR", EUR is the `asset`.
- `free_amount`: is a number specifying the amount of `asset` that won't be taken into consideration for tax purposes.
- `taxable_amount`: is a number specifying the amount of `asset` needed to be taken into consideration for tax purposes according to the accounting settings, e.g. "I sold 1 ETH for 120 EUR", 1 ETH is the `taxable_amount`.
- `timestamp` is a string containing the date and time an event was executed.
- `price` is `asset` price in `profit_currency` at the time the event was executed.
- `pnl_free` is a number describing the amount of `asset` converted to the user's `profit_currency` that won't be taken into consideration for tax purposes.
- `pnl_taxable` is a number describing the amount of `asset` converted to the user's `profit_currency`. Note that rotki additionally subtracts an exchange's trading fees from this number.
- `cost_basis` If this is a spending event, this field contains information about where the amount that is spent came from according to the user's setting. Which buys contributed to this spend. If not enough information is known then this is also stated.
- `notes` Information about the event.

> [!NOTE]
> To learn more about `profit_currency` or to adjust it, see the section [change profit currency](/usage-guides/customization.html#profit-currency)

Results from past profit and loss reports are saved so the user can later review them without the need to run a new execution.

![Profit and loss reports from past executions](/images/sc_pnl_saved_reports.png)

## Cost basis

Cost basis is a really important aspect of accounting. For each sell event it lets you know what was the price at which the sold asset was acquired depending on a number of settings.

Cost basis is calculated in rotki for all trades/events we support. Trades/events that rotki recognizes are:

- All trades performed in our supported centralized exchanges
- All trades done in our supported AMMs. As of this writing this is uniswap, sushiswap, balancer.
- All manual trades inserted by the user.

For all those trades you can see the cost basis when you create a profit loss report by:

1. Either navigating to the trade in the generated table after the PnL report and pressing the arrow to show more details.

![Cost basis in PnL report table](/images/sc_pnl_reports_costbasis.png)

2. Export the report to CSV and import it in a spreadsheet tool. We have tested it works with google spreadsheets and libreoffice. The cost basis column contains the info you seek.

![Cost basis in PnL report spreadsheet](/images/sc_pnl_reports_costbasis_spreadsheet.png)

## PnL report creation problems

### No documented acquisition found

It's possible that rotki is not able to find an acquisition event for a sale. In which case it will warn you and ask you to fix it.

![Missing acquisitions found for asset](/images/sc_pnl_missing_acquisitions.png)

This can happen for many reasons. The asset may have been acquired in a non-supported exchange/protocol, some event not detected etc.

The way to fix it is to add either a [manual trade](/usage-guides/historical-events.html#adding-manual-trades) to tell rotki how you acquired that asset or an acquisition history event.

### Error when importing CSV formulas to Google Docs

This is caused by the different Google Doc language configurations.
Simply change the language on Google doc to United States. This can be done in File > Spreadsheet settings > General > Locale

### Timeout or price not found for timestamp

![Missing prices asset](/images/sc_pnl_missing_prices.png)

It's possible that rotki is not able to find the price of assets. You have to input the price manually, otherwise the event will be skipped from pnl reports. For example if you are creating a GBP profit/loss report and the asset is GNO then make sure to create the GNO -> GBP historical price cache. You can add the prices on the spot, or open [manage historical price cache](/usage-guides/customization.html#manage-historical-price-oracle-cache).

### The result of the generated PnL report is not what you expected.

The results of the generated PnL report can vary depending on the
[accounting settings](/usage-guides/customization.html#accounting-settings). Check if any settings align with unusual treatments for your events, so you can adjust the settings to resolve the issue yourself.

If you have any question or are confused about the settings, feel free to send us a message on [Discord](https://discord.rotki.com).

### Seeking help with complicated errors during PnL report generation

![Export PnL debug data](/images/sc_pnl_export_debug_data.png)

It's possible that many errors could occur during the PnL report generation due to certain event(s) not accounted for properly. In such a scenario if all else fails, exporting the PnL debug data allows us to fully replicate the issue encountered and find a solution.

> [!WARNING]
> Only share PnL debug data with the developers as it may contain sensitive information.
