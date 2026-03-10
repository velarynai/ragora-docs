#!/usr/bin/env node

/**
 * generate-dynamic-docs.mjs
 *
 * Generates billing.md and faq.md from tiers.json config so pricing is never
 * hardcoded in documentation. Port of billing-content.ts and faq-content.ts.
 *
 * Usage:
 *   node scripts/generate-dynamic-docs.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

// ---------------------------------------------------------------------------
// Load tiers.json
// ---------------------------------------------------------------------------

const tiersConfig = JSON.parse(
  readFileSync(join(rootDir, "config", "tiers.json"), "utf-8")
);

const constants = tiersConfig.constants;
const tiers = tiersConfig.tiers;
const order = tiersConfig.order;

// ---------------------------------------------------------------------------
// Helper functions (ported from tiers.ts)
// ---------------------------------------------------------------------------

function formatLimit(value) {
  if (value < 0) return "Unlimited";
  return value.toLocaleString("en-US");
}

function formatVectors(count) {
  if (count < 0) return "Unlimited";
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${Math.round(count / 1000)}K`;
  }
  return count.toString();
}

function vectorsToPagesEstimate(vectors) {
  if (vectors < 0) return "Unlimited";
  const vpp = constants.vectorsPerPage;
  const pages = Math.round(vectors / vpp);
  if (pages >= 1000) {
    return `~${Math.round(pages / 1000)}K`;
  }
  return `~${pages}`;
}

function getResolvedFeatures(tierId) {
  const tier = tiers[tierId];
  if (!tier) return [];
  if (!tier.inheritsFrom) return tier.features;
  const parentFeatures = getResolvedFeatures(tier.inheritsFrom);
  return [...parentFeatures, ...tier.features];
}

// Ordered array excluding hidden tiers
const tiersArray = order.map((id) => tiers[id]).filter((t) => !t.hidden);

// ---------------------------------------------------------------------------
// Generate billing.md (ported from billing-content.ts)
// ---------------------------------------------------------------------------

function generateBillingContent() {
  const free = tiers.free;
  const pro = tiers.pro;
  const enterprise = tiers.enterprise;

  const addonPrice = constants.vectorAddonPriceMonthly;
  const addonVectors = constants.vectorAddonVectors;
  const addonMaxBlocks = constants.vectorAddonMaxBlocks;
  const maxAddonVectors = addonVectors * addonMaxBlocks;

  // Build tier comparison rows
  const tierRows = tiersArray
    .map((t) => {
      const vectors = formatVectors(t.limits.baseVectors);
      const retrievals =
        t.limits.retrievalsPerDay < 0
          ? "Unlimited"
          : formatLimit(t.limits.retrievalsPerDay);
      const audioVideo =
        t.limits.audioVideoMinutes < 0
          ? "Unlimited"
          : `${formatLimit(t.limits.audioVideoMinutes)} min`;
      const price = t.priceMonthly < 0 ? "Custom" : `${t.price}/month`;
      const addon = t.id === "free" ? "\u2014" : "Available";
      return `| **${t.name}** | ${vectors} | ${retrievals} | ${audioVideo} | ${addon} | ${price} |`;
    })
    .join("\n");

  return `---
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
${tierRows}

> **Note:** ${enterprise.comingSoon ? "Enterprise tier is coming soon." : ""} [Contact us](mailto:support@ragora.app) for enterprise pricing.

### ${free.name} — ${free.description}

${free.features.map((f) => `- ${f}`).join("\n")}

### ${pro.name} — ${pro.description}

${pro.features.map((f) => `- ${f}`).join("\n")}

---

## Data Blocks (Vector Storage Add-on)

Need more storage? **Pro** subscribers can purchase Data Blocks to expand vector capacity beyond the base ${formatVectors(pro.limits.baseVectors)} vectors.

### How It Works

| Detail | Value |
|--------|-------|
| **Vectors per block** | ${formatVectors(addonVectors)} |
| **Price per block** | $${addonPrice}/month |
| **Maximum blocks** | ${addonMaxBlocks} |
| **Maximum expansion** | +${formatVectors(maxAddonVectors)} vectors |
| **Total with max blocks** | ${formatVectors(pro.limits.baseVectors + maxAddonVectors)} vectors (${formatVectors(pro.limits.baseVectors)} base + ${formatVectors(maxAddonVectors)} addon) |
| **Estimated pages per block** | ${vectorsToPagesEstimate(addonVectors)} pages |

### Purchase Data Blocks

1. Go to **Billing** (\`/billing\`)
2. Click **Add Data Blocks**
3. Select the number of blocks (1–${addonMaxBlocks})
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
| **Bonus rate** | +${formatVectors(constants.vectorBonusPer10USD)} vectors per $10 in rolling 12-month revenue |
| **Maximum bonus** | ${formatVectors(constants.vectorBonusMaxVectors)} vectors |

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

Chat completions (including bot and widget messages) are billed at the upstream LLM provider cost plus a **${free.llmMarkupPercent}% markup**. This markup covers RAG infrastructure costs including retrieval, reranking, and context assembly. The underlying LLM cost varies by model — you can see the exact cost of each request in the billing response and your usage history.

---

## Managing Your Balance

### Check Your Balance

Go to **Billing** (\`/billing\`) to see your current balance and usage history.

### Add Credits

1. Go to **Billing** (\`/billing\`)
2. Click **Add Credits**
3. Choose an amount or enter a custom amount
4. Complete payment via Stripe

Credits never expire while your account is active.

---

## Changing Plans

### Upgrade

1. Go to **Billing** (\`/billing\`)
2. Click **Change Plan**
3. Select a higher tier
4. Changes apply immediately

You'll be charged a prorated amount for the remainder of the billing period.

### Downgrade

1. Go to **Billing** (\`/billing\`)
2. Click **Change Plan**
3. Select a lower tier
4. Changes apply at the end of your billing period

> **Warning:** If you exceed the new tier's limits, you may need to delete documents before the downgrade takes effect. Any active Data Blocks will also need to be removed before downgrading to Free.

### Cancel

1. Go to **Billing** (\`/billing\`)
2. Click **Cancel Subscription**
3. Your plan continues until the end of the billing period
4. After cancellation, you'll be moved to the Free tier

Your data is retained for 30 days after cancellation.

---

## Platform Fees

When you sell products on the marketplace:

| Fee Type | Amount |
|----------|--------|
| **Platform Fee** | ${free.platformFeePercent}% of sale price |
| **Transaction Fee** | $${free.transactionFeeFlat.toFixed(2)} per transaction |

Example: A $10 product sale nets you $${(10 - (10 * free.platformFeePercent) / 100 - free.transactionFeeFlat).toFixed(2)} ($10 − $${((10 * free.platformFeePercent) / 100).toFixed(2)} platform fee − $${free.transactionFeeFlat.toFixed(2)} transaction fee).

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

Go to **Billing** (\`/billing\`) → **Usage History** to see a detailed breakdown of your operations.
`;
}

// ---------------------------------------------------------------------------
// Generate faq.md (ported from faq-content.ts)
// ---------------------------------------------------------------------------

function generateFaqContent() {
  const free = tiers.free;
  const pro = tiers.pro;

  const addonVectors = constants.vectorAddonVectors;
  const addonPrice = constants.vectorAddonPriceMonthly;
  const addonMaxBlocks = constants.vectorAddonMaxBlocks;
  const maxAddonVectors = addonVectors * addonMaxBlocks;

  return `---
title: FAQ
sidebar_label: FAQ
sidebar_position: 8
description: Common questions and answers
---

# FAQ

Common questions about Ragora.

---

## General

### What is Ragora?
Ragora is a RAG platform that turns your documents into an AI-searchable workspace with accurate, cited answers.

### What file types are supported?

Ragora supports 50+ file types including documents (PDF, Word, Excel, PowerPoint), images (with OCR), audio/video (transcribed via AI), source code, and more.

### What languages are supported?

Ragora supports **100+ languages** including English, Chinese, Japanese, Korean, Arabic, Hindi, Nepali, Spanish, French, German, and many more. You can upload documents in any language and search across them — even query in one language and find results from another. No configuration needed.

---

## Data & Security

### Is my data used to train AI models?
**No.** Your documents are never used to train any AI models.

### Can I delete my data?
Yes. Deleting a collection permanently removes all associated documents and vectors.

---

## Pricing

### What are vectors and how do they translate to pages?

Ragora stores your documents as **vectors** (semantic chunks used for AI search). As a rough guide:

| Content Type | Vectors per Page |
|--------------|------------------|
| Dense text (academic papers, legal docs) | 6–8 vectors |
| Normal documents (reports, articles) | 4–6 vectors |
| Sparse content (slides, forms) | 2–4 vectors |

**Rough estimate:** ~1.5 vectors per page on average.

### How much storage do I get?

| Tier | Vectors | Estimated Pages | Price |
|------|---------|-----------------|-------|
| **${free.name}** | ${formatVectors(free.limits.baseVectors)} | ${vectorsToPagesEstimate(free.limits.baseVectors)} pages | ${free.price}/month |
| **${pro.name}** | ${formatVectors(pro.limits.baseVectors)} | ${vectorsToPagesEstimate(pro.limits.baseVectors)} pages | ${pro.price}/month |
| **Data Block** (add-on) | +${formatVectors(addonVectors)} | ${vectorsToPagesEstimate(addonVectors)} pages | $${addonPrice}/month each |

Pro users can purchase up to ${addonMaxBlocks} Data Blocks for a maximum of +${formatVectors(maxAddonVectors)} additional vectors.

### Is there a free tier?

Yes! The ${free.name} tier includes ${formatVectors(free.limits.baseVectors)} vectors (${vectorsToPagesEstimate(free.limits.baseVectors)} pages), ${free.limits.retrievalsPerDay} retrievals/day, and ${free.limits.audioVideoMinutes} minutes of audio/video transcription.

### What are the paid tiers?

See the [Pricing page](https://ragora.app/pricing) for current plans and limits, or the [Billing & Pricing](/docs/billing) docs for full details including Data Blocks.

### What are Data Blocks?

Data Blocks are vector storage add-ons for Pro subscribers. Each block adds ${formatVectors(addonVectors)} vectors for $${addonPrice}/month. You can purchase up to ${addonMaxBlocks} blocks for a total of +${formatVectors(maxAddonVectors)} additional vectors. See [Billing & Pricing](/docs/billing) for details.

### How does billing work?

Retrieval from your own collections is always free. Every account gets monthly LLM credits (amount depends on tier — see [Pricing](https://ragora.app/pricing)) that cover all chat usage — Playground, bot responses, widget messages, and API calls. When monthly credits run out, purchased credits are used for additional messages and pay-per-use marketplace products.

### Why is Ragora so much cheaper than competitors?

We've optimized our infrastructure for efficiency. Our business model focuses on marketplace transactions rather than charging high storage fees.

---

## Technical

### How long does processing take?
| Document Type | Time |
|---------------|------|
| Text files | Seconds |
| PDF (text) | 10–30 seconds |
| PDF (scanned) | 1–2 minutes |
| Audio/Video | 2–5 min per hour |

### Can I use my own LLM?
Yes. The \`/v1/retrieve\` endpoint returns search results without an LLM response.

---

## Integrations

### Can I embed a chat widget on my website?

Yes. Ragora provides an embeddable chat widget you can add to any site with a single script tag. Create a widget key from **Settings** → **Widget**, choose a mode (Support, Ask AI, or Embedded), and paste the snippet into your HTML. See the [Chat Widget guide](/docs/integrations/chat-widget) for details.

### What is MCP and how do I use it?

MCP (Model Context Protocol) lets AI assistants like Claude Desktop, Cursor, and VS Code search your Ragora workspaces directly. You configure an HTTP MCP server URL and API key in your AI tool's settings. See the [MCP Integration guide](/docs/integrations/mcp-guide) for setup instructions.

### Can I connect external data sources?

Yes. Ragora supports cloud connectors for syncing external content into workspaces. The Docs Website (Crawl4AI) connector is fully available for crawling documentation sites. GitHub, Google Drive, Dropbox, S3, and Notion connectors are coming soon. See the [Cloud Connectors guide](/docs/integrations/connectors) for setup instructions.

### Can I sync Discord or Slack messages?

Yes. Install a bot from **Integrations** → **Bot Integrations**, select a destination workspace, and add channels to watch. Synced messages become searchable in your workspace. See [Message Sync](/docs/bots/message-sync) for details.

---

## Troubleshooting

### Search results aren't relevant
- Try more specific queries
- Verify you're searching the correct collection
- Check that your documents were processed successfully
`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const docsDir = join(rootDir, "docs");
mkdirSync(docsDir, { recursive: true });

const billingContent = generateBillingContent();
const faqContent = generateFaqContent();

writeFileSync(join(docsDir, "billing.md"), billingContent, "utf-8");
console.log("Generated docs/billing.md");

writeFileSync(join(docsDir, "faq.md"), faqContent, "utf-8");
console.log("Generated docs/faq.md");
