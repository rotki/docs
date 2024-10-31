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
