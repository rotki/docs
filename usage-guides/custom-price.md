# Adding missing prices

Sometimes rotki might be unable to retrieve prices for some assets. In order to always have the ability to show a price we provide two types of manual price additions: `Manage Prices → Latest Prices` and `Manage Prices → Historical Prices`.

- Latest price: Will be the price displayed when we need to display the current price of an asset.
- Historical price: The price used in a specific time in the past for an asset.

![Price management](/images/price_management.png)

To add a new price you have to press the plus button. This will open the add form.

![Adding a new price](/images/price_management_add.png)

There you can specify the assets, the price and the date of the price. Then you can proceed to save the entry.
After saving you should be able to see the new entry.

When a latest price is used it will be visually displayed in the UI. It will show an orange icon near the price, with a tooltip: "Manually defined price".

![Edited latest price UI indicator](/images/latest_price.png)
