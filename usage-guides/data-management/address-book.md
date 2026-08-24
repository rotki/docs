---
description: Manage global and private address book entries in rotki to replace blockchain addresses with readable names, and import multiple address books from CSV.
---

# Address Book

You can manage the address book in `Manage Address Book` menu in the sidebar.

rotki provides an address book for blockchains. This replaces addresses with names provided by the user across the application. You can click on `Save this name for all chains` to use the name for the provided address on all chains where that address appears. The address book is split into two different kinds:

1. **Global Address Book**: It replaces addresses with the names provided across the entire application irrespective of the user logged in.
2. **Private Address Book**: It replaces addresses with the names provided for the user currently logged in. It takes precedence over names found in the global address book.

![Adding entry to EVM address book](/images/usage-guides/data-management/address-book/add_evm.webp)

![Displaying behaviour of an EVM address book](/images/usage-guides/data-management/address-book/display_evm_behaviour.webp)

> **Note:** The address resolution order can be configured in the general user settings. The default order is:

> 1. Private Address Book
> 2. Blockchain Account Labels
> 3. Global Address Book
> 4. Ethereum Tokens
> 5. Hardcoded Mappings
> 6. ENS names.

## Filtering the address book

The address book uses the same filter bar as the rest of rotki, with a pill for `Address`, `Name` and
`Chain`. Chains are shown with their logo and name and picked from a list. There is also a
`Strict chain` pill: with it added, only entries recorded for that exact chain are shown, rather than
also including entries that apply to every chain.

Both the chain selector and the strict-chain checkbox used to sit beside the bar; they are pills
inside it now, so there is a single place to filter from. See
[Filtering history events](/usage-guides/history/filtering) for the shared syntax and keyboard
handling.

## Importing address book names (CSV)

You can add multiple address book entries at once with CSV import. You can find the menu in the three dots `⋮` menu here.

![Import Address Book Entries](/images/usage-guides/data-management/address-book/import_entries.webp)

<CsvTable title="Address Book Entries CSV" csvUrl="/files/address_book_entries.csv" />

1. The `address` field is **required**.
2. The `name` field is **required**.
3. The `blockchain` field is **optional**. You can find supported chain IDs in the [supported blockchains](/usage-guides/portfolio/accounts#blockchain-accounts) section. Leave it blank to add the entry to all chains.
4. The `location` field is **optional**. You can set it to either `global` or `private`. By default, it will be saved as `private`.
