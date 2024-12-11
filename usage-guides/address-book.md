# Address Book

rotki provides an address book for blockchains. This replaces addresses with names provided by the user across the application. You can click on `Save this name for all chains` to use the name for the provided address on all chains where that address appears. The address book is split into two different kinds:

1. **Global Addressbook**: It replaces addresses with the names provided across the entire application irrespective of the user logged in.
2. **Private Addressbook**: It replaces addresses with the names provided for the user currently logged in. It takes precedence over names found in the global address book.

![Adding entry to EVM address book](/images/add_evm_address_book.png)

![Displaying behaviour of an EVM address book](/images/display_evm_address_book_behaviour.png)

> **Note:** The address resolution order can be configured in the general user settings. The default order is:

> 1. Private Address Book
> 2. Blockchain Account Labels
> 3. Global Address Book
> 4. Ethereum Tokens
> 5. Hardcoded Mappings
> 6. ENS names.

## Import multiple address books (CSV)

You can add multiple address book entries at once with CSV import. You can find the menu in the three-dots menu here.

![Import Address Book Entries](/images/import_addressbook_entries.png)

<CsvTable title="Address Book Entries CSV" csvUrl="/files/address_book_entries.csv" />

1. The `address` field is **required**.
2. The `name` field is **required**.
3. The `blockchain` field is **optional**. You can find supported chain IDs in the [supported blockchains](/usage-guides/accounts-and-balances#adding-and-removing-blockchain-accounts) section. Leave it blank to add the entry to all chains.
4. The `location` field is **optional**. You can set it to either `global` or `private`. By default, it will be saved as `private`.

## Import multiple address books (CSV)

You can add multiple address book entries at once with CSV import. You can find the menu in the three-dots menu here.

![Import Address Book Entries](/images/import_addressbook_entries.png)

<CsvTable title="Address Book Entries CSV" csvUrl="/files/address_book_entries.csv" />

1. The `address` field is **required**.
2. The `name` field is **required**.
3. The `blockchain` field is **optional**. You can find supported chain IDs in the [supported blockchain](/usage-guides/accounts-and-balances#adding-and-removing-blockchain-accounts) section. Leave it blank to add it to all chains.
4. The `location` field is **optional**. You can either set it to `global` or `private`. By default it will be saved as `private`.
