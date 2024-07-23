# Manual Testing

To ensure the final executable works as a complete package (including the UI), a bit of manual testing with the final binaries is required. This should eventually be reduced as the E2E test suite becomes more complete. Everything below that can be E2E tested should be.

If time allows, test the following on the binaries for all OSes. If not, test on at least one.

## Startup

### New User

- Create a new user and verify that it works, both with and without a premium key. With a premium key, ensure you can verify that pulling data from the server works.
- Provide mismatched passwords and check that they are handled properly.
- Provide incorrect premium keys and check that they are handled properly.

### Sign in Existing User

- Sign in an existing user with an incorrect password and check that it is handled properly.
- Sign in a non-existing user and check that it is handled properly.
- Sign in an existing user and verify that it works.

## External Trades

- Add an external trade and verify that it appears in the table.
- Edit an external trade from the table and verify that the changes are saved.
- Delete an external trade from the table and verify that it is removed.
- Expand the details on a trade and check that they are shown properly.

## Data Importing

- Import data from cointracking.info and verify that it works properly.

## Exchanges

- Add an invalid exchange API key and check that it is handled properly.
- Add a valid exchange API key and verify that it works. Ensure that dashboard balances are also updated.
- Remove an exchange and verify that it works and that the dashboard balances are updated.

## External Services

- Add an API key for all external services and verify that it works.
- Remove an API key for all external services and verify that it works.

## Application and Accounting Settings

- Change all application settings one by one and verify that the changes are reflected.
- Enter invalid values (if possible) for application settings and check that they are handled properly.
- Change the profit currency and verify that it works.
- Change all accounting settings one by one and verify that the changes are reflected.
- Enter invalid values (if possible) for accounting settings and check that they are handled properly.

## Accounts and Balances

### Fiat

- Add a fiat balance and verify that it works.
- Remove a fiat balance and verify that it works.
- Check that adding non-numeric or negative values is handled properly.

### Ethereum Accounts

- Add an Ethereum account and verify that it works.
- Add an invalid Ethereum account and check that it is handled properly.
- Remove an Ethereum account and verify that it works.
- After adding tokens to an account that has them, expand the account and check that all tokens owned by it are shown.

### Ethereum Tokens

- Track an Ethereum token and verify that it is added:
  - In the dashboard.
  - In the owned tokens.
  - In total blockchain balances.
  - In the expanded asset details of ETH accounts that own it.
- Remove an Ethereum token and verify that it is removed from all the above locations.

### Bitcoin Accounts

- Add a Bitcoin account and verify that it works.
- Add an invalid Bitcoin account and check that it is handled properly.
- Remove a Bitcoin account and verify that it works.

## Tax Report

- Check that invalid input in the date range is handled properly.
- Create a large tax report covering many exchanges over a long period and verify that it is correct and no unexpected problems occur.
- Create a CSV export of the report and verify that it works.

## Premium Analytics

- Verify that premium analytics features work for a premium account.
- Modify the range of the net value graph and check that it works properly.
- Change the asset and modify the range of the graph of the amount and value of an asset and check that it works properly.
- Verify that the net value distribution by location works properly.
- Verify that the net value distribution by asset works properly and that you can modify the number of assets shown in the graph.

## Updating the Documentation

Rotki is continuously changing, and sometimes documentation becomes outdated. One way to contribute to rotki is by helping to keep the documentation up to date. To do so, you have to edit the corresponding section in the `.rst` files inside the `docs` folder of the git repo.

To review your changes, you can compile the documentation using the command:

```sh
make html
```

inside the `docs` folder.

### Guide Screenshots

When updating the user guide documentation, you might need to update the application screenshots.

![Capturing screenshots](/images/contrib_screen.png)

To be consistent, use the Chrome Developer Tools in the Electron application to capture the screenshots.

First, toggle the device toolbar (1).

If this is the first time you are taking a screenshot, click on the **Dimensions** dropdown menu and select **Edit** (2).

![Adding a custom screen resolution](/images/contrib_dimens.png)

You will be given the option to **Add custom device**. Use the following settings:

- **Resolution**: 1600x900
- **DPR**: 1

In the user agent, ensure that **Desktop** is selected. Then, save the entry.

After making sure that this entry is selected, press the overflow menu (3) and select **Capture Screenshot** to capture a new screenshot.
