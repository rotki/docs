# Payment Process

This guide walks you through the process of purchasing a rotki premium subscription.

## Step 1: Select Your Plan

1. Visit the [pricing page](https://rotki.com/pricing)
2. Review the available tiers and their features
3. Choose between monthly or yearly billing
4. Click the purchase button for your selected tier

::: tip Have a Referral Code?
If you have a referral code, you can enter it during checkout to get 10% off your first subscription. See [Using a Referral Code](/premium/referrals#using-a-referral-code) for details.
:::

## Step 2: Apply Discount/Referral Code (Optional)

If you have a referral code or discount code:

1. Look for the **Referral Code** or **Discount Code** input field during checkout
2. Enter your code
3. The discount will be applied to your purchase
4. Verify the discounted amount before proceeding

See [Referral Program](/premium/referrals) for more information about referral codes.

## Step 3: Choose Payment Method

rotki premium supports three payment methods. Choose the one that works best for you:

### Credit/Debit Card (Auto-Renewable)

Pay with your credit or debit card for automatic renewals.

**Benefits:**

- Automatic monthly or yearly renewals
- No need to manually repurchase
- Manage cards from [payment methods page](/premium/payment-methods)

**How it works:**

1. Enter your card details at checkout
2. Complete the payment
3. Your card is automatically saved for future renewals
4. Subscription renews automatically until canceled

::: tip Saved Cards
Cards used for subscription payments are automatically saved to your account. You can view and manage them from the [payment methods page](https://rotki.com/home/payment-methods).

If you have multiple saved cards, you can set your preferred card for renewals (premium subscribers only).
:::

**Payment Processor:** Braintree (a PayPal company)

### PayPal (Auto-Renewable)

Pay through your PayPal account for automatic renewals.

**Benefits:**

- Automatic monthly or yearly renewals
- Use your existing PayPal balance or linked payment methods
- Secure PayPal authentication

**How it works:**

1. Select PayPal as your payment method
2. Log in to your PayPal account
3. Review and approve the payment
4. Subscription renews automatically through PayPal until canceled

::: info PayPal Subscriptions
Your PayPal subscription can also be managed from your PayPal account settings. However, we recommend managing it from your [rotki subscription page](https://rotki.com/home/subscription) for the best experience.
:::

### Cryptocurrency (Non-Renewable)

Pay with cryptocurrency for a one-time subscription period.

**Benefits:**

- Privacy-focused payment option
- No recurring charges
- Support for various cryptocurrencies

**How it works:**

1. Select crypto as your payment method
2. Choose your preferred cryptocurrency
3. Transfer the **exact amount** shown to the provided address
4. Wait for blockchain confirmation

::: warning Important: Non-Renewable
Crypto subscriptions do **NOT** automatically renew. When your subscription expires, you'll need to manually purchase a new subscription.

**Exact Amount Required:** You must transfer the exact amount displayed. The system detects payments automatically, but only if the amount matches precisely.
:::

**Supported cryptocurrencies:** Check the payment page for the current list of supported coins.

## Step 4: Payment Confirmation

After completing payment:

1. You'll receive a confirmation email
2. An invoice will be generated and available on your [subscription page](https://rotki.com/home/subscription)
3. Your premium subscription is now active

## Step 5: Generate Your API Keys

After successful payment, you need to manually generate your API credentials:

1. Go to your [subscription page](https://rotki.com/home/subscription)
2. Click the **Create** button
3. Your API Key and Secret will be generated and displayed
4. You can view both credentials anytime from your subscription page

See [API Keys & Secrets](/premium/api-keys) for detailed instructions.

## Step 6: Activate Premium in the App

Add your API credentials to the rotki application:

1. Open rotki
2. Navigate to **API Keys** → **rotki Premium**
3. Enter your API Key and Secret
4. Click **Save**

See the [Usage Guide](/usage-guides/api-keys#rotki-premium) for detailed app setup instructions.

## Invoices and Receipts

All payment invoices are automatically generated and stored in your account.

**To access invoices:**

1. Go to your [subscription page](https://rotki.com/home/subscription)
2. View the payment history section
3. Download invoices as needed

## Payment Issues

### Payment Failed

If your payment fails:

1. Verify your payment details are correct
2. Check that you have sufficient funds
3. Contact your bank or payment provider
4. Try an alternative payment method

### Crypto Payment Not Detected

If your crypto payment isn't detected:

1. Verify you sent the **exact amount** shown
2. Check the transaction on the blockchain explorer
3. Wait for sufficient confirmations
4. Contact [info@rotki.com](mailto:info@rotki.com) with your transaction hash if issues persist

### Renewal Failed

If an automatic renewal fails:

1. Check your [payment methods](https://rotki.com/home/payment-methods)
2. Verify your card hasn't expired
3. Ensure sufficient funds are available
4. Update your payment method if needed

::: tip
You'll receive email notifications before renewals and if renewal attempts fail, giving you time to update payment information.
:::
