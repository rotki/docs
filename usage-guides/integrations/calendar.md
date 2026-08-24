---
description: Use the rotki calendar to add and track events, set reminders for actions, receive automatic alerts such as ENS expiry, and sync with Google Calendar.
---

# Calendar

rotki provides a calendar view where you can add and track events for your activities. You can also set reminders to perform some actions related to these events.

You can see today's selected events and upcoming events on the right pane.

![Calendar view](/images/usage-guides/integrations/calendar/overview.webp)

![Add calendar event](/images/usage-guides/integrations/calendar/add_event.webp)

Here the non-obvious fields are:

- **Notify me at event time**: Whether to also notify the user at the event time. If this setting is turned off, rotki will not notify you at the event time, other than the reminder you set beforehand.
- **Delete event once it has passed**: Whether to remove events after the time has passed. We recommend turning this feature on to save space, unless you want to keep the event.

## Automatic events

rotki can also create automatic events based on your on-chain activity. The events that rotki currently can check include:

- **Name service expiry and renewal** — for ENS, Basenames and Gwei Name Service (`.gwei`) names you hold.
- **Airdrop claim deadlines** — so a claimable airdrop does not expire unnoticed.
- **Yearn vesting escrows** — one entry at the cliff date and one when the escrow is fully vested.
- **CRV vote escrow** — when your locked CRV lock period ends.
- **VELO and AERO vote escrow** — when a veNFT lock period ends.
- **L2 bridging** — when funds bridged to or from an L2 become available.

You can customize how rotki handles automatic events by clicking the `setting` icon at the top.

![Automatic events setting](/images/usage-guides/integrations/calendar/automatic_events_setting.webp)

## Event reminder

The notification for the reminder of your event looks like this.

![Notification for the reminder](/images/usage-guides/integrations/calendar/reminder.webp)

## Sync with google calendar

You can sync rotki calendar events, to your Google Calendar for notifications and reminders.

1. Click the `Cog button` on the calendar page.
   ![Click cog button](/images/usage-guides/integrations/calendar/connect_google_1.webp)

2. Click the `Connect to Google Calendar` button. It will open a page in your browser to continue the Google authentication. In Linux for the electron app, this will open a clean rotki browser window. This is due to known limitations in Linux at the moment. If you need to use passkeys, or already connected google accounts in your default browser copy paste the URL to it. The URL is`https://rotki.com/oauth/google?mode=app`.

3. Click `Continue with Google` and choose your Gmail account to continue.
   ![Continue with google](/images/usage-guides/integrations/calendar/connect_google_2.webp)

4. After it's done, it will look like this. Click `Sync Now` to sync the events to Google Calendar on your selected account.
   ![Connected to google calendar](/images/usage-guides/integrations/calendar/connect_google_3.webp)
