---
description: "Manage rotki balance snapshots: take, filter, import, export, edit, reconcile, and delete saved portfolio records."
---

# Snapshots

Snapshots are saved records of your portfolio's balances and net worth at a particular time. rotki uses them to show the dashboard net-value graph and statistics over time. They are stored locally in your rotki database.

Open `Statistics → Snapshots` to manage them. You can also open a particular snapshot from the dashboard by clicking a point on the net-value graph.

## Browse snapshots

The snapshots page lists each saved record with its date, net worth, and change from the previous snapshot. Add a **Period** filter to focus on a date range, sort the table by date or value, and use pagination to move through the results.

![The snapshots list](/images/usage-guides/statistics/snapshots/list.png)

For each snapshot, you can:

- **Open** it in the editor.
- **Export** it for backup or transfer.
- **Delete** it after confirming the action.

Use **Refresh** to reload the list.

## Take or import a snapshot

Select **Take snapshot** to refresh all balances while ignoring the cache and save a new record. This can be slow and may be rate-limited by exchanges or other external services, so rotki asks you to confirm first.

![Take snapshot confirmation](/images/usage-guides/statistics/snapshots/take_snapshot_dialog.png)

If an exchange or blockchain balance query fails, the snapshot is not saved. Other failures, such as an NFT price lookup, do not block it. To save it anyway, enable **Ignore Errors** in the [snapshot controls](/usage-guides/portfolio/dashboard#snapshot-controls) next to the dashboard's net-value graph and take the snapshot again. The setting persists across sessions, and a snapshot saved this way may be incomplete.

To restore previously exported data, select **Import** and provide both import CSV files:

- `balances_snapshot_import.csv`
- `location_data_snapshot_import.csv`

![Import a snapshot manually](/images/usage-guides/statistics/snapshots/import_dialog.png)

After a successful import, rotki logs you out so the imported data is loaded on your next login.

## Edit a snapshot

Opening a snapshot shows its net worth, change since the previous snapshot, allocation by location, warnings, and a table of its asset balances, liabilities, and NFTs.

![The snapshot editor](/images/usage-guides/statistics/snapshots/editor.png)

You can add, edit, or remove balances. Every balance must be assigned to a location; when necessary, split a balance's value between several locations. The editor can also hide spam, ignored, and zero-value rows, and lets you remove zero-value balances in bulk.

Select **Edit locations** to add, edit, or remove location allocations, or distribute an allocation across locations. rotki checks that the balance total, location allocation, and stored net worth agree. If they do not, reconcile the totals before editing balances. The balance sum is used as the source of truth, and you can absorb the difference into a selected location.

![The locations drawer of the snapshot editor](/images/usage-guides/statistics/snapshots/editor_locations_drawer.png)

The editor flags potential data issues such as duplicate or negative balances, NFT amounts other than one, zero-value rows, and large changes in net worth. These are warnings to review, not automatic changes.

Changes stay in a draft until you select **Save**. You can review the pending changes, undo the last change, or discard the entire draft. rotki asks for confirmation before leaving a snapshot with unsaved changes.

## Export or delete from the editor

The editor's overflow menu also provides **Export** and **Delete**. Export downloads the snapshot data; in the desktop app, rotki lets you choose a folder for the exported CSV files. Deleting a snapshot is permanent after confirmation.

> [!NOTE]
> If your profit currency is not USD and rotki has no historic USD-to-currency rate for the snapshot date, set a manual historic exchange rate before editing values. This rate also affects price lookups close to that snapshot time.
