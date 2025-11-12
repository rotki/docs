# API Keys & Secrets

rotki premium uses API Keys and Secrets to connect your subscription to the rotki application. This guide explains how to create, manage, and secure your API credentials.

## What are rotki Premium API Keys?

API Keys and Secrets are authentication credentials that:

- Link your rotki app to your premium subscription
- Enable premium features in the application
- Allow cloud backup and sync across devices
- Identify your account for device limit management

## Creating API Keys

### First-Time Creation

After purchasing a subscription, you need to manually generate your API credentials:

1. Go to your [subscription page](https://rotki.com/home/subscription)
2. Navigate to the **API Keys** section
3. Click the **Create** button
4. Your credentials will be generated and displayed:
   - **API Key** - Your public identifier
   - **API Secret** - Your private authentication token
5. You can view both credentials anytime from your subscription page

::: info Manual Generation Required
API Keys and Secrets are not automatically created after payment. You must click the button to generate them for the first time.
:::

### Where to Find Existing Keys

You can view both your API Key and Secret anytime:

1. Visit your [subscription page](https://rotki.com/home/subscription)
2. Look in the API Keys section
3. Both your API Key and Secret will be displayed

## Using API Keys in the App

After creating your API credentials, add them to rotki:

1. Open the rotki application
2. Navigate to **API Keys** → **rotki Premium** in the sidebar
3. Enter your **API Key**
4. Enter your **API Secret**
5. Click **Save**

For detailed app setup instructions, see the [API Keys Usage Guide](/usage-guides/api-keys#rotki-premium).

## Managing API Keys

### Viewing Your Keys

From your [subscription page](https://rotki.com/home/subscription):

- Both your API Key and Secret are always visible
- You can copy them anytime you need
- You can see when the key was created

### Regenerating Keys

If you need to create new credentials:

1. Go to your [subscription page](https://rotki.com/home/subscription)
2. Click the **Regenerate** button
3. Your new API Key and Secret will be generated and displayed
4. Update credentials on all your devices

::: tip When to Regenerate

- If you suspect your credentials have been compromised
- If you want to revoke access from all devices
  :::

## Security Best Practices

### Protecting Your Credentials

::: danger Keep Your Secret Safe

- **Never** share your API Secret with anyone
- **Never** post it in public forums or Discord
- **Never** commit it to version control (Git, etc.)
- **Never** send it via unencrypted channels
  :::

### Storage Recommendations

Store your API credentials securely:

- Use a password manager (1Password, Bitwarden, KeePass, etc.)
- Keep backups in a secure location
- Don't save them in plain text files
- Don't email them to yourself

### If Credentials are Compromised

If you believe your API credentials have been exposed:

1. **Immediately** regenerate your API credentials from the [subscription page](https://rotki.com/home/subscription) by clicking **Regenerate**
2. Update all your legitimate devices with the new credentials
3. Monitor your account for unusual activity

## API Keys and Device Limits

Each premium tier has a device limit. When you add your API credentials to rotki:

- The device is registered to your account
- It counts toward your device limit
- You can view and manage devices from the [devices page](/premium/devices)

### Checking Device Usage

From your [subscription page](https://rotki.com/home/subscription):

- View current device count
- See your tier's device limit
- Access the [device list](https://rotki.com/home/devices) for details

### Device Limit Exceeded

If you reach your device limit:

- New devices cannot authenticate
- You'll see an error in the rotki app
- Remove unused devices to free up slots

See [Device Management](/premium/devices) for details on managing devices.

## Troubleshooting

### Invalid API Key/Secret Error

If you see authentication errors:

1. Verify you copied the credentials correctly (no extra spaces)
2. Ensure your subscription is active (check [subscription page](https://rotki.com/home/subscription))
3. Verify your API credentials are still visible on the subscription page
4. Try regenerating your credentials

### Can't See My API Key/Secret

If you can't see your credentials on the subscription page:

1. Verify you're logged in to the correct rotki.com account
2. Ensure you've already generated API credentials (if not, click the generate button)
3. Refresh the page
4. Contact [info@rotki.com](mailto:info@rotki.com) if the issue persists

### Premium Features Not Working

If premium features aren't activating:

1. Verify API credentials are entered correctly in the app
2. Check your subscription is active and not expired
3. Ensure you haven't exceeded your device limit
4. Try removing and re-adding the credentials
5. Check the app logs for specific errors

### Multiple Devices Not Syncing

If sync isn't working across devices:

1. Verify all devices use the same API credentials
2. Ensure "Allow data sync with rotki Server" is enabled (see [Sync Guide](/usage-guides/#sync-data-with-rotki-server))
3. Check you haven't exceeded device limits
4. Manually trigger sync from the toolbar
