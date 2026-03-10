---
title: "Managing Billing"
sidebar_label: "Billing"
sidebar_position: 6
description: "Manage your plan, credits, and data blocks"
---

The Billing page (`/billing`) lets you manage your subscription. Access it by clicking **Billing** in the sidebar.

---

## Current Plan

At the top of the page, you'll see your current plan:
- Plan name (Free, Pro, or Custom)
- Plan badge indicating type

If you're on the Free tier, a message appears: "You are on the Free tier. Upgrade to increase vectors, retrieval capacity, and monthly limits."

---

## Choosing a Plan

Below your current plan, pricing cards show available tiers:

### Free — $0/month
- ~2,000 pages of knowledge storage (3K vectors)
- 200 retrievals/day
- 30 min audio/video transcription
- ~400 AI messages/month
- Community support

### Pro — $19.99/month
- ~20,000 pages of knowledge storage (30K vectors)
- Unlimited retrievals
- Data connectors included
- Slack and Discord ingestion and retrieval
- 300 min audio/video transcription
- ~2,000 AI messages/month
- Priority support
- Scale with Data Blocks

### Self-Hosted

For organizations that need to run Ragora on their own infrastructure. [Contact us](mailto:support@ragora.app) for details and licensing.

> **Note:** An Enterprise tier with custom pricing is planned but not yet available on the billing page.

### Upgrading

1. Click **Choose plan** on the tier you want
2. Complete payment via Stripe
3. Changes apply immediately — you're charged a prorated amount for the rest of the billing cycle

### Downgrading

1. Click **Choose plan** on a lower tier
2. The change takes effect at the end of your current billing period
3. If you exceed the new tier's limits, you'll need to free up space first

---

## Credits

Credits are a prepaid balance (in USD) used for LLM-powered features:
- All chat messages (workspace chat, bots, widgets, Chat Completions API)
- Pay-per-use marketplace product access

### Monthly LLM Credits

Every account receives monthly credits that refresh on the 1st of each month. The amount depends on your tier. These cover all chat usage — when they run out, purchased credits are used.

### What's Always Free

- **Retrieval API** — searching and retrieving from your workspaces costs nothing
- **Document uploads** — ingesting files, URLs, and connected sources

### Adding Credits

Credits can be purchased via the API or by contacting support at [support@ragora.app](mailto:support@ragora.app). There is no credit purchase UI on the billing page.

- Preset amounts: **$10**, **$25**, **$50**, or **$100** (or a custom amount, $5 minimum / $1,000 maximum)
- Payment is processed through Stripe checkout

Credits never expire while your account is active.

### Credit Balance

Your credit balance is available via the API. Balance color coding:
- **Green** — normal balance
- **Red** — low balance (below $1.00)

---

## Data Blocks

Pro subscribers can purchase Data Blocks to expand vector storage beyond the base 30K vectors.

| Detail | Value |
|--------|-------|
| Vectors per block | 150,000 |
| Price per block | $99.99/month |
| Maximum blocks | 10 |
| Maximum expansion | +1.5M vectors |
| Estimated pages per block | ~100,000 pages |

### Purchasing Data Blocks

Data Blocks are managed via the API or by contacting support at [support@ragora.app](mailto:support@ragora.app). There is no Data Blocks purchase UI on the billing page.

### Adjusting Blocks

- **Increase:** Add more blocks. You're charged a prorated amount immediately.
- **Decrease:** Remove blocks. A prorated credit applies to your next invoice.
- **Remove entirely:** If your usage exceeds the base tier limit, new uploads will be blocked until you reduce usage or re-add blocks.

Block changes are handled through the API or by contacting support.

---

## Canceling Your Subscription

Subscription cancellation is handled through Stripe's customer portal or by contacting support at [support@ragora.app](mailto:support@ragora.app). There is no cancel button on the billing page.

- Your plan continues until the end of the billing period
- After cancellation, you're moved to the Free tier
- Your data is retained for 30 days after cancellation

---

## Quick Reference

| Task | How |
|------|-----|
| View current plan | Billing page (`/billing`), top section |
| Upgrade/downgrade plan | Billing page → **Choose plan** on desired tier |
| Add credits | API or contact support |
| Purchase Data Blocks | API or contact support |
| Cancel subscription | Stripe customer portal or contact support |
