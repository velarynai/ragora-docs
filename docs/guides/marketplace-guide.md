---
title: "Using the Marketplace"
sidebar_label: "Marketplace"
sidebar_position: 5
description: "Browse, buy, and sell knowledge workspaces on the marketplace"
---

The Ragora Marketplace lets you discover and access workspaces created by others, or sell access to your own.

## Browsing the Marketplace

Go to **Marketplace** from the sidebar (`/marketplace`). The marketplace is also accessible to unauthenticated visitors.

### Product Grid

Products are displayed as cards showing:
- **Cover image** — category-based default if the seller hasn't uploaded one
- **Category badge** — content type (e.g., General, Code, Software Docs)
- **Pricing badge** — Free (green) or paid (amber)
- **Title** — product name
- **Description** — first two lines of the description
- **Owner** — organization name with "Verified Publisher" label
- The entire card is clickable and opens the product detail page

### Filtering

:::note
Category filtering is planned but not yet available in the UI. All products are currently shown in a single grid.
:::

---

## Product Detail Page

Click a product card to open its detail page (`/marketplace/[slug]`).

### Left Column — Product Info

- **Category** and **version** badges
- **Title** (large heading)
- **Metadata**: Published by [seller], chunk count, listing date
- **Description**: Full product description

If the product has a storefront with a chat interface:
- An "Interactive AI Agent Available" box appears
- Click **Try Chat** to open the chat interface in a new tab

### Right Column — Purchase

- **Cover image**
- **Access Type** label above the price
- **Price** displayed prominently:
  - "Free"
  - "$X.XX/mo" (subscription)
  - "$X.XXXX/use" (per-use)
  - "$X.XX one-time"
- **Benefits list**: Permanent API access, Lifetime updates, Query from playground

### Access States

The purchase card changes based on your relationship with the product:

| State | What you see | Actions |
|-------|-------------|---------|
| **Not purchased** | Price and Checkout button | Click **Checkout** for paid, or **Save to Library** for free |
| **Owner** | "You Own This Product" banner | **Start Chatting** button |
| **Active subscription** | "Active Subscription" banner | **Start Chatting** button |
| **One-time purchase** | "Purchased — You have full access" banner | **Start Chatting** button |
| **Pay-per-use** | "Pay-Per-Use Active — Billed per query" banner | **Start Chatting** button |

### Purchasing

**Free products:**
- Click **Save to Library (Free)** — instant access, no payment needed
- If the product has a storefront, both **Start Chatting** and **Save to Library (Free)** buttons are shown

**Paid products:**
- Click **Checkout** — redirects to Stripe for secure payment
- After payment, you're returned to the product page with access granted

---

## Selling on the Marketplace

Turn your workspaces into products that others can discover and purchase.

### Publishing a Workspace

1. Go to **Workspaces** (`/kb`)
2. Open the workspace you want to sell
3. Click the **Publish** button in the header
4. Fill in the publish form:
   - **Description** — what buyers will see
   - **Category** — content type
   - **Pricing**:
     - **Free** — no charge
     - **One-Time Purchase** — set a one-time price in USD
     - **Subscription** — set a monthly price in USD
5. Click **Publish**

### Stripe Setup

For paid products, you must connect a Stripe account:
1. When publishing, if Stripe is not connected, you'll see a **Connect with Stripe** button
2. Click it to complete Stripe's onboarding
3. Return to finish publishing

### Updating a Product

1. Open the published workspace
2. Click **Settings** (gear icon)
3. Update the description, category, or cover image
4. Click **Save Settings**

Adding new documents to the workspace automatically updates the product for all buyers.

### Unpublishing

Toggle the visibility from **Published** (globe) to **Private** (lock). The product is removed from the marketplace, but existing buyers retain their access.

---

## Revenue & Payouts

### Fee Structure

| Fee | Amount |
|-----|--------|
| Platform fee | 20% of sale price |
| Transaction fee | $0.50 per transaction |

**Example:** A $10 sale nets you $7.50 ($10 − $2.00 platform fee − $0.50 transaction fee).

### Receiving Payments

- **One-time and subscription** sales go directly to your Stripe account
- **Per-use** earnings accumulate and can be withdrawn once you reach the minimum threshold

---

## After Purchase

Once you buy or access a product:
- It appears in your **Workspaces** list with the seller's name and a "Paid" badge
- You can query it via:
  - The workspace chat interface
  - The Retrieval API
  - Chat Completions API
  - MCP tools
  - Connected bots
- Access persists based on purchase type (permanent for one-time, active subscription, or per-use billing)
