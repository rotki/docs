# Statistics

If you have a premium subscription you can get statistics on all your assets and trades.

Click on the `Statistic` page on the left sidebar to go to your statistics page.

## Net value over time

Since rotki is tracking all your assets over time the first thing you can see is a value/time graph of your entire net value.

> Note: The starting point of these statistics will be when you started using the application as rotki takes balance snapshots daily. We also plan to provide analytics on data before that in a best effort basis as detailed in [this](https://github.com/rotki/rotki/issues/1379) issue.

![Net value over time graph](/images/sc_stats_netvalue.png)

Following that you can see a graph of quantity of an asset superimposed on its USD value over time.

## Asset amount and value over time

![Asset amount and value over time](/images/sc_stats_asset_amount_value.png)

We have introduced an option in the asset graphs to select the `Missing snapshot multiplier`. It sets after how many hours between two snapshots the graph will display zero balances. This allows to improve graphs for periods where the balance of an asset was zero.

![Multiplying option in assets graphs](/images/statistics_multipliying_option.png)

All the assets graphs as well as the dashboard graph have the possibility of selecting a range for zooming. This can be done by left clicking and dragging on the graph itself or using the selector under the graph. The graph can be zoomed out by double clicking on it.

![Zooming in the graphs](/images/zooming_in_graph.png)

![Zooming in the graphs](/images/zooming_in_graph_statistics.png)

### Use historical events and prices

By default, the asset amount and value use snapshot data, which is typically taken daily (depends on the setting). If you want to view more detailed data, you can use `historical events and prices`. Additionally, you can click `Refresh daily prices`, and rotki will attempt to populate the graph with daily prices, allowing you to observe price movements over time.

![Asset amount and value from historical events processing](/images/asset_amount_and_value_from_historical.png)

## Value distribution by location

Furthermore you can see a piechart of the distribution of your netvalue across different locations. So you can determine how exposed you are to having a big part of your net value in exchanges, in banks e.t.c.

![Distribution of networth by location](/images/sc_stats_distribution_location.png)

## Value distribution by asset

Moreover you can see a piechart of the distribution of your netvalue across all of the assets you own. This is an important analytics tool as it can help you determine your exposure on each asset and if some rebalancing of your portfolio is in order.

![Distribution of networth by asset](/images/sc_stats_distribution_asset.png)
