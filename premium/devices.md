# Device Management

Manage devices using your rotki premium subscription and understand device limits for your plan tier.

## What are Device Limits?

Each rotki premium tier includes a limit on how many devices can use the same API Key and Secret simultaneously. This prevents unauthorized sharing while allowing you to use rotki on multiple devices you own.

Device limits vary by tier - check the [pricing page](https://rotki.com/pricing) for your tier's specific limit.

## Accessing Device Management

You can manage devices from two locations:

### Website (rotki.com)

Visit the [devices list page](https://rotki.com/home/devices) to manage devices online.

### rotki Application

Manage devices directly from the app:

1. Open rotki
2. Go to **Settings** → **Account** → **Premium Devices**
3. View and manage all registered devices

For detailed app instructions, see [Managing Premium Devices](/usage-guides/api-keys#managing-premium-devices).

## Viewing Your Devices

### On the Website

From the [devices list page](https://rotki.com/home/devices), you can see:

- **Device name** - Identifier for each device
- **Last active** - When the device last connected
- **Registration date** - When the device was first added
- **Current count** - How many devices are active
- **Your limit** - Maximum allowed for your tier

### In the App

From **Settings** → **Account** → **Premium Devices**:

- View all devices using your API credentials
- See active device count vs. your limit
- Identify which device you're currently using
- Access device management options

## Managing Device Names

### Editing Device Names

Device names help you identify which device is which (e.g., "Work Laptop", "Home Desktop", "MacBook Pro").

**On the Website:**

1. Go to the [devices list page](https://rotki.com/home/devices)
2. Find the device you want to rename
3. Click **Edit** or the edit icon
4. Enter a new name
5. Click **Save**

**In the App:**

1. Go to **Settings** → **Account** → **Premium Devices**
2. Find the device to rename
3. Click the edit option
4. Enter a new name
5. Save changes

::: tip Naming Strategy
Use descriptive names to easily identify devices:

- "MacBook Pro 2023"
- "Home Desktop PC"
- "Work Laptop"
- "Linux Server"

This makes it easier to identify and remove unused devices later.
:::

## Removing Devices

### Why Remove Devices

Remove devices when:

- You've reached your device limit and need to add a new device
- You no longer use a particular device
- You've replaced or sold a device
- A device is showing but shouldn't be

### How to Remove Devices

**On the Website:**

1. Go to the [devices list page](https://rotki.com/home/devices)
2. Find the device to remove
3. Click **Delete** or **Remove**
4. Confirm the deletion

**In the App:**

1. Go to **Settings** → **Account** → **Premium Devices**
2. Find the device to remove
3. Click the remove/delete option
4. Confirm the action

::: warning Immediate Effect
Removing a device takes effect immediately. If rotki is running on that device, it will lose premium access and may show authentication errors.
:::

## Device Limit Exceeded

### What Happens When You Exceed the Limit

If you try to use rotki on a new device after reaching your limit:

- Authentication will fail
- You'll see an error message in the app
- Premium features won't activate
- The app may prompt you to manage devices

### Resolving Device Limit Issues

To continue using rotki on a new device:

**Option 1: Remove Unused Devices**

1. Identify devices you no longer use
2. Remove them from the website or another active device
3. Try authenticating again on the new device

**Option 2: Upgrade Your Plan**

If you genuinely need more devices:

1. Review higher tiers on the [pricing page](https://rotki.com/pricing)
2. Upgrade directly from your [subscription page](https://rotki.com/home/subscription)
3. See [Upgrading Your Subscription](/premium/plans-and-pricing#upgrading-your-subscription) for details

For detailed troubleshooting, see the [Usage Guide](/usage-guides/api-keys#device-limit-exceeded).

## Understanding Device Registration

### When is a Device Registered?

A device is registered when you:

1. Add rotki premium API credentials to the app
2. Successfully authenticate
3. The app connects to rotki servers

### How Devices are Identified

Devices are identified by:

- Hardware identifiers
- Operating system information
- Installation instance

::: info Same Computer, Different Users
Installing rotki multiple times on the same computer (e.g., different user accounts) may register as multiple devices, each counting toward your limit.
:::

### Device Registration Limits

- Only successfully authenticated devices count toward your limit
- Failed authentication attempts don't register devices
- Removed devices immediately free up a slot

## Managing Multiple Devices

### Best Practices

If you use rotki across multiple devices:

1. **Use descriptive names** - Make it easy to identify each device
2. **Regularly audit** - Remove devices you no longer use
3. **Plan ahead** - Consider your device needs when choosing a tier
4. **Keep track** - Know which devices are actively using your subscription

### Syncing Data Across Devices

Device management is separate from data syncing. To sync your rotki data across devices:

1. Enable "Allow data sync with rotki Server" in each rotki instance
2. Use the same API credentials on all devices
3. See [Sync Data Guide](/usage-guides/#sync-data-with-rotki-server) for details

::: warning Don't Run Simultaneously
Avoid running rotki on multiple devices at the same time to prevent data sync conflicts.
:::

## Checking Your Device Limit

To see your tier's device limit:

**Option 1: Subscription Page**

Visit your [subscription page](https://rotki.com/home/subscription) to see your current tier and limits.

**Option 2: Pricing Page**

Check the [pricing page](https://rotki.com/pricing) for device limits across all tiers.

**Option 3: Devices Page**

The [devices list page](https://rotki.com/home/devices) shows your current count and limit.

## Troubleshooting

### Device not showing in the list

If a device should appear but doesn't:

1. Verify the device successfully authenticated (check in the app)
2. Refresh the devices page
3. Wait a few moments - registration may be processing
4. Check you're logged in to the correct rotki.com account

### Can't remove a device

If you can't delete a device:

1. Ensure you have an active premium subscription
2. Try refreshing the page
3. Try removing from the app instead of the website (or vice versa)
4. Contact [info@rotki.com](mailto:info@rotki.com) for assistance

### Device keeps re-appearing after removal

If a removed device reappears:

1. Ensure rotki isn't still running on that device
2. If you still have access to the device, remove the API credentials from the app
3. The device will re-register if it's still trying to authenticate

### Wrong device count

If the device count seems incorrect:

1. Remove and re-add API credentials in the app to force re-registration
2. Wait a few minutes for the count to update
3. Contact support if the issue persists

### Multiple entries for the same device

If one physical device shows multiple entries:

- This can happen if rotki was reinstalled or data was reset
- Remove the duplicate/old entries
- Keep only the active registration

## Security Considerations

### Unauthorized Devices

If you see devices you don't recognize:

1. **Immediately** remove them from the devices list
2. Regenerate your API credentials from the [subscription page](https://rotki.com/home/subscription) by clicking **Regenerate**
3. Update your legitimate devices with the new credentials
4. Contact [info@rotki.com](mailto:info@rotki.com) to report the issue

See [API Keys & Secrets](/premium/api-keys#if-credentials-are-compromised) for security best practices.

### Regular Audits

::: tip Security Best Practice
Periodically review your devices list (monthly or quarterly) to:

- Ensure all listed devices are yours
- Remove old devices you no longer use
- Verify no unauthorized access has occurred
  :::
