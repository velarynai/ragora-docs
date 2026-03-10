---
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
| **Free** | 3K | ~2K pages | $0/month |
| **Pro** | 30K | ~20K pages | $19.99/month |
| **Data Block** (add-on) | +150K | ~100K pages | $99.99/month each |

Pro users can purchase up to 10 Data Blocks for a maximum of +1.5M additional vectors.

### Is there a free tier?

Yes! The Free tier includes 3K vectors (~2K pages), 200 retrievals/day, and 30 minutes of audio/video transcription.

### What are the paid tiers?

See the [Pricing page](https://ragora.app/pricing) for current plans and limits, or the [Billing & Pricing](/docs/billing) docs for full details including Data Blocks.

### What are Data Blocks?

Data Blocks are vector storage add-ons for Pro subscribers. Each block adds 150K vectors for $99.99/month. You can purchase up to 10 blocks for a total of +1.5M additional vectors. See [Billing & Pricing](/docs/billing) for details.

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
Yes. The `/v1/retrieve` endpoint returns search results without an LLM response.

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
