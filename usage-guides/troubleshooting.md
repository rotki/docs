# Troubleshooting

## Invalid input error during login

These errors happen due to an invalid value in the frontend settings
While the should not typically happen, it can occur due to a bug in the frontend.

The error appears as a red alert in the page with a message like this:.

![Redecode events for a transaction](/images/ts_profit_loss.png)

In this case, the problem is with the `'profitLossReportPeriod'`, so to fix it,
you need to modify the `profit_loss_report_period/` field in the frontend settings.

To do so:

1. Open the browser developer tools and go to the Console.
   - Ctrl + Shift + I on Windows/Linux
   - Cmd + Option + I (⌘ + ⌥ + I) on macOS
2. Then proceed to modify the part of the code that sets the value of the field. Paste it in the console and run it.

For example to fix the `profitLossReportPeriod` field you would need to run the following code:

```js
/* eslint-disable unicorn/prefer-top-level-await */
fetch('http://127.0.0.1:4242/api/1/settings')
  .then(response => response.json()) // Parse JSON response
  .then((data) => {
    const result = data.result;
    const frontend_settings = result.frontend_settings;
    const parsed = JSON.parse(frontend_settings);
    parsed.profit_loss_report_period = {
      quarter: 'ALL',
      year: '2025',
    };
    const stringified = JSON.stringify(parsed);

    fetch('http://127.0.0.1:4242/api/1/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        settings: {
          frontend_settings: stringified,
        },
      }),
      mode: 'cors', // Enable CORS
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

::: tip
You can also use the same approach to modify other values in the settings by changing the fields in `parsed` and sending them back with the `PUT` request.
:::
