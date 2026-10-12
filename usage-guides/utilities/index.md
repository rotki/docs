---
description: Quick-access utilities in rotki, including global search for fast navigation, taking notes in-app, and monitoring long-running background tasks.
---

# Utilities

## Global Search

You can use global search provided to speed up your actions by clicking the icon on the top bar, or using the shortcut `Control-/` (`Command-/` if you are using Mac).

![The global search box before anything is typed](/images/usage-guides/utilities/index/global_search_empty.webp)

Some actions provided by this global search:

- Navigate to any page in rotki.
- Quick-add actions, such as `Add a manual balance`, `Add blockchain account`, `Add an exchange` or `Create Tag`. These take you to the relevant page with the add dialog already open.
- Go to a certain owned asset overview page.
- Go to a certain location overview page. Your connected exchanges and the chains you track both appear here.

One query returns all of them together, ranked in a single list.

![Search results for "bal", mixing pages, a connected exchange, a quick-add action and an owned asset](/images/usage-guides/utilities/index/global_search_results.webp)

## Taking Notes In-App

You can now take notes in various sections of the application. Note taking is categorized into two types:

1. **General Notes**: These are notes available & visible across the application.

   ![General notes](/images/usage-guides/utilities/index/general_notes.webp)

2. **Location-specific Notes**: These are notes restricted to the location in which they were created in the application.

   ![Location specific notes](/images/usage-guides/utilities/index/location_specific_notes.webp)

You can also pin notes; the pinned notes will appear at the top.

## Notifications

rotki reports what it is doing, and anything that needs your attention, through the **notification
area** in the toolbar. Opening it shows every notification received this session, grouped into four
tabs: `View All`, `Needs Action`, `Reminder` and `Error`. Many notifications carry an action, such as
adding a missing API key or opening the dialog that resolves what they are about. Any task still
running is shown above the tabs, with its progress.

![The notification area](/images/usage-guides/utilities/index/notifications.webp)

Notifications also appear briefly as a **popup** in the corner of the window as they arrive.

### Silencing popups

If the popups interrupt you, click **Silence notification popups** in the notification area. The
button then reads `Popups silenced. Click to allow them again`, and you can turn them back on the
same way.

![Silencing notification popups](/images/usage-guides/utilities/index/notifications_silence.webp)

Nothing is lost while popups are silenced. Every notification still arrives in the notification area
with its actions intact; only the transient popup is suppressed. The setting is stored with your
account, so it stays as you left it the next time you log in.

### How often a notification repeats

Notifications about a condition that persists — a missing API key, or a chain with no indexer
available — would otherwise greet you at every login. Instead each one backs off: you see it
immediately, then again a day later, then two days after that, then a week after that, and after
that it stops interrupting you.

It still appears in the notification area with its action, so you can deal with it whenever you
like, and the schedule starts over if you change that chain's indexer order or that service's key.
Chains and services are tracked separately, so silencing one never affects another.

To stop the "No indexers available" notification for a chain you have no intention of configuring,
see [Suppressing indexer notifications](/usage-guides/settings/blockchain#suppressing-indexer-notifications).

### Clearing notifications

Use the clear button to dismiss all active notifications at once; rotki asks for confirmation first.
The area holds a maximum of 200 notifications, after which the oldest are dropped.

## Background Tasks

While rotki works in the background, a small pill in the bottom-right corner names the most
important job and how far along it is, for example `History refresh 12 of 43`, with `+N more` when
other jobs run beside it. Click the pill to open the task panel, and again to close it.

The panel lists each job you started as one row, with a progress bar and a count. Jobs keep the
order they started in, and a job that finishes stays where it is until everything is done, so rows
do not jump while you read them. Work that is over within a second is not listed at all.

Click the arrow beside a job to see what it is made of. A history refresh, for instance, lists each
chain, exchange and online query, and each chain lists its accounts and the decoding of its
transactions:

- chains, exchanges and banks show their icon, and accounts show their address with buttons to
  copy it or open it in a block explorer;
- a running account shows which query it is on (transactions, internal transactions or token
  transfers) and the date range it has reached; a running exchange or bank shows which kind of
  events it is querying;
- a decode shows how many transactions it has processed, and lists the protocol caches it filled
  along the way;
- a job shows a line per section, such as `Transaction sync 9/13`, with a mark that turns red when
  something in that section failed.

While a history refresh runs, the panel also explains what the first sync does, and suggests
adding a free Etherscan API key if you have not set one, since it speeds syncing up considerably.

### When a job finishes

A finished job stays in the panel until you dismiss it, so you can read the outcome whenever you
come back. A clean run reads, for example, `40 done · 2 skipped`. When something failed, the pill
says so, and the failed items are listed under the job without having to open it. Failures that
share the same reason, such as several accounts that need the same missing API key, are grouped
under that reason once, with a button to retry all of them and a `Retry` button on each item.

Dismissing a job shrinks the pill to a small icon, which reopens what you dismissed. The icon goes
away on its own ten seconds after everything is dismissed, as long as the panel is closed and you
are not hovering it.

### Stopping jobs

A running job has a stop button, and rotki asks you to confirm first. When several jobs are
running, `Stop all` stops the ones that are safe to interrupt, such as balance refreshes and history
syncs: what they already fetched is kept, and running them again finishes the rest. Jobs that change
your data, such as imports, asset database updates or re-decoding, keep running, and the
confirmation tells you how many.
