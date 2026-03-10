---
title: Billing & Pricing
sidebar_label: Billing & Pricing
sidebar_position: 6
description: Subscription tiers, credits, and usage
---

# Billing & Pricing

Understand how Ragora's billing works so you can choose the right plan and manage your usage.

## How Billing Works

Ragora uses a **subscription + usage** model:

1. **Subscription Tier** — Monthly plan that determines your vector storage limits and features
2. **Credits** — Pay-as-you-go balance for API operations (chat completions, marketplace access)

Your subscription provides vector storage capacity. Retrieval from your own collections is always free. Bots, chat widgets, and chat completions include a free monthly allowance — after that, usage is billed from your credit balance.

---

## Subscription Tiers

| Tier | Vectors | Retrievals/Day | Audio/Video | Data Blocks | Price |
|------|---------|----------------|-------------|-------------|-------|
| **Free** | 3K | 200 | 30 min | — | $0/month |
| **Pro** | 30K | Unlimited | 300 min | Available | $19.99/month |
| **Enterprise** | Unlimited | Unlimited | Unlimited | Available | Custom |

> **Note:** Enterprise tier is coming soon. [Contact us](mailto:support@ragora.app) for enterprise pricing.

### Free — For hobbyists and testing

- ~2,000 pages of knowledge storage
- 200 Retrievals/day
- 30 min Audio/Video
- ~400 AI messages/mo
- 20% Platform Fee + $0.50/tx
- Community Support
- Storage grows as you sell

### Pro — For developers and teams

- ~20,000 pages of knowledge storage
- Unlimited Retrievals
- Data connectors included
- Slack and Discord ingestion and retrieval
- 300 min Audio/Video
- ~2,000 AI messages/mo
- Priority Support
- Scale with Data Blocks

---

## Data Blocks (Vector Storage Add-on)

Need more storage? **Pro** subscribers can purchase Data Blocks to expand vector capacity beyond the base 30K vectors.

### How It Works

| Detail | Value |
|--------|-------|
| **Vectors per block** | 150K |
| **Price per block** | $99.99/month |
| **Maximum blocks** | 10 |
| **Maximum expansion** | +1.5M vectors |
| **Total with max blocks** | 1.5M vectors (30K base + 1.5M addon) |
| **Estimated pages per block** | ~100K pages |

### Purchase Data Blocks

1. Go to **Billing** (`/billing`)
2. Click **Add Data Blocks**
3. Select the number of blocks (1–10)
4. Complete payment via Stripe

### Adjust or Remove

- **Increase blocks:** Go to Billing and adjust the block count. You'll be charged a prorated amount immediately.
- **Decrease blocks:** Reduce the block count. A prorated credit applies to your next invoice.
- **Remove entirely:** Click **Remove Data Blocks**. If your current usage exceeds the base tier limit, new uploads will be blocked until you reduce usage or re-add blocks.

### Proration

When you change your block count mid-billing cycle, Stripe automatically calculates prorated charges or credits:

- **Adding blocks:** You're charged for the remaining days in the current billing period.
- **Removing blocks:** You receive a credit applied to the next invoice.

---

## Bonus Storage for Sellers

Sellers on the marketplace earn bonus vector storage based on platform revenue:

| Detail | Value |
|--------|-------|
| **Bonus rate** | +1K vectors per $10 in rolling 12-month revenue |
| **Maximum bonus** | 100K vectors |

Your total vector limit is: **Base (from tier) + Bonus (from revenue) + Addon (from Data Blocks)**.

---

## What Counts as a Vector?

When you upload a document, Ragora splits it into semantic chunks and creates vectors for search. The number of vectors depends on content density:

| Content Type | Vectors per Page |
|--------------|------------------|
| Dense text (academic papers, legal docs) | 6–8 vectors |
| Normal documents (reports, articles) | 4–6 vectors |
| Sparse content (slides, forms) | 2–4 vectors |

**Rough estimate:** ~1.5 vectors per page on average.

---

## Credit System

Credits are a prepaid balance (measured in USD) for LLM usage and marketplace access.

### What's Always Free

- **Retrieval API** — Search and retrieve from any collection you own or have subscription access to (no LLM call, no cost)
- **Document uploads** — Ingesting files, URLs, and connected sources

### Monthly LLM Credits

Every account receives monthly LLM credits that refresh on the 1st of each month. The amount depends on your tier — see the [Pricing page](https://ragora.app/pricing) for details.

Monthly LLM credits cover **all** LLM usage: Playground, bots, widgets, Chat Completions API, and agent chat. When your monthly credits run out, usage draws from your purchased credit balance.

### When Credits Are Used

- **All LLM-powered chat** — Playground, bot responses, widget messages, and API calls
- **Pay-per-use Marketplace Products** — Accessing third-party workspaces (pricing set by the seller)

### LLM Usage Pricing

Chat completions (including bot and widget messages) are billed at the upstream LLM provider cost plus a **10% markup**. This markup covers RAG infrastructure costs including retrieval, reranking, and context assembly. The underlying LLM cost varies by model — you can see the exact cost of each request in the billing response and your usage history.

---

## Managing Your Balance

### Check Your Balance

Go to **Billing** (`/billing`) to see your current balance and usage history.

### Add Credits

1. Go to **Billing** (`/billing`)
2. Click **Add Credits**
3. Choose an amount or enter a custom amount
4. Complete payment via Stripe

Credits never expire while your account is active.

---

## Changing Plans

### Upgrade

1. Go to **Billing** (`/billing`)
2. Click **Change Plan**
3. Select a higher tier
4. Changes apply immediately

You'll be charged a prorated amount for the remainder of the billing period.

### Downgrade

1. Go to **Billing** (`/billing`)
2. Click **Change Plan**
3. Select a lower tier
4. Changes apply at the end of your billing period

> **Warning:** If you exceed the new tier's limits, you may need to delete documents before the downgrade takes effect. Any active Data Blocks will also need to be removed before downgrading to Free.

### Cancel

1. Go to **Billing** (`/billing`)
2. Click **Cancel Subscription**
3. Your plan continues until the end of the billing period
4. After cancellation, you'll be moved to the Free tier

Your data is retained for 30 days after cancellation.

---

## Platform Fees

When you sell products on the marketplace:

| Fee Type | Amount |
|----------|--------|
| **Platform Fee** | 20% of sale price |
| **Transaction Fee** | $0.50 per transaction |

Example: A $10 product sale nets you $7.50 ($10 − $2.00 platform fee − $0.50 transaction fee).

---

## FAQ

### When do I need credits?

Retrieval from your own collections is always free. Every account gets monthly LLM credits (amount depends on tier — see [Pricing](https://ragora.app/pricing)) that cover all chat usage. When monthly credits run out, purchased credits are used for Chat Completions API calls and pay-per-use marketplace products.

### Do unused credits roll over?

Yes. Credits don't expire while your account is active.

### What happens if I run out of credits?

Chat Completions API calls and pay-per-use product access will stop working. Add credits to resume usage.

### Can I get a refund?

Credit purchases are non-refundable. Subscription cancellations are prorated.

### What happens if I exceed my vector limit?

New uploads will be blocked until you free up space (delete documents) or expand your limit (upgrade tier or add Data Blocks). Existing data remains searchable.

### How do I see my usage history?

Go to **Billing** (`/billing`) → **Usage History** to see a detailed breakdown of your operations.
