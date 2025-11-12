# Payment Methods

Manage your saved credit/debit cards and payment preferences for rotki premium subscriptions.

## Accessing Payment Methods

Visit the [payment methods page](https://rotki.com/home/payment-methods) at rotki.com to manage your saved payment methods.

## Overview

The payment methods page allows you to:

- View all saved credit/debit cards
- Add new cards without making a purchase
- Set a default card for subscription renewals (premium subscribers only)
- Remove cards you no longer use
- Update payment information for future renewals

::: info Automatic Card Saving
When you purchase a subscription with a credit/debit card, it's automatically saved to your account and will appear on this page. This ensures renewals can process smoothly.
:::

## Adding a Payment Method

### Add Card Without Purchase

You can save a card for future use without making an immediate purchase:

1. Go to the [payment methods page](https://rotki.com/home/payment-methods)
2. Click **Add Payment Method** or **Add Card**
3. Enter your card details:
   - Card number
   - Expiration date
   - CVV/CVC code
4. Click **Save**

The card is now available for subscription purchases and renewals.

### Cards Added During Purchase

When you buy a subscription with a credit/debit card:

1. Enter card details at checkout
2. Complete the payment
3. The card is **automatically saved** to your account
4. It will appear on the payment methods page
5. It's set as the default for future renewals

## Viewing Saved Cards

From the [payment methods page](https://rotki.com/home/payment-methods), you can see:

- **Card type** (Visa, Mastercard, Amex, etc.)
- **Last 4 digits** of the card number
- **Expiration date**
- **Default status** (which card will be used for renewals)

::: info Security
For security, only the last 4 digits of your card number are displayed. Full card numbers are never stored or shown.
:::

## Setting a Default Card

Active premium subscribers can choose which saved card to use for renewals.

### How to Set Default Card

1. Go to the [payment methods page](https://rotki.com/home/payment-methods)
2. Find the card you want to use for renewals
3. Click **Set as Default** or select the default option
4. The selected card will be used for all future renewals

::: tip Premium Subscribers Only
You must have an active premium subscription to set a default card. This feature ensures your subscription renews without interruption.
:::

### What Happens at Renewal

When your subscription renews:

- The default card is charged automatically
- You receive a confirmation email
- An invoice is generated and available on your [subscription page](https://rotki.com/home/subscription)
- If payment fails, you're notified and can update your payment method

## Removing a Payment Method

To delete a saved card:

1. Go to the [payment methods page](https://rotki.com/home/payment-methods)
2. Find the card you want to remove
3. Click **Delete** or the delete icon
4. Confirm the deletion

::: warning Removing the Default Card
If you remove the card set as default for renewals:

- Ensure you have another card saved
- Set a new default card to avoid renewal failures
- Or be prepared to manually renew your subscription
  :::

## Updating Card Information

You cannot directly edit a saved card. To update card details:

1. Add the new card as a payment method
2. Set it as the default (if needed)
3. Remove the old card

This ensures secure handling of payment information.

## Payment Methods and Renewals

### Card Renewals

Subscriptions paid with credit/debit cards renew automatically using your default card.

**Before each renewal:**

- Verify your default card is current and valid
- Ensure sufficient funds are available
- Check the expiration date hasn't passed

### PayPal Renewals

If you paid with PayPal:

- Renewals are processed through PayPal directly
- You manage the payment source in your PayPal account settings
- The payment methods page doesn't apply to PayPal subscriptions

### Crypto Subscriptions

Crypto subscriptions are **not auto-renewable**:

- Cards are not used or saved
- You must manually repurchase when the subscription expires
- See [Payment Process](/premium/payment#cryptocurrency-non-renewable) for details

## Troubleshooting

### My card won't save

If you have trouble saving a card:

1. Verify all card details are entered correctly
2. Check the card is valid and not expired
3. Ensure your billing address matches your card's registered address
4. Try a different browser or clear cache
5. Contact [info@rotki.com](mailto:info@rotki.com) if issues persist

### Renewal failed with my saved card

If an automatic renewal fails:

1. Check the card hasn't expired
2. Verify sufficient funds are available
3. Contact your bank to ensure the charge wasn't blocked
4. Update your payment method if needed
5. Manually renew from the [pricing page](https://rotki.com/pricing) if necessary

::: tip Renewal Notifications
You'll receive email notifications if a renewal fails, giving you time to update your payment method before your subscription expires.
:::

### Can't set a default card

If you can't set a default card:

1. Verify you have an **active** premium subscription
2. Ensure the card is already saved to your account
3. Try refreshing the page
4. Contact [info@rotki.com](mailto:info@rotki.com) for assistance

### I don't see my cards

If saved cards aren't showing:

1. Verify you're logged in to the correct account
2. Check if you completed a card payment (crypto payments don't save cards)
3. Clear browser cache and reload
4. Try adding a card manually

## Security and Privacy

### How Card Data is Stored

- Card details are processed and stored by Braintree (a PayPal company)
- rotki.com never directly stores full card numbers
- Only the last 4 digits and expiration date are displayed
- All payment processing follows PCI DSS compliance standards
