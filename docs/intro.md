---
title: "Introduction"
sidebar_label: "What is Ragora?"
sidebar_position: 0
description: "Ragora is a RAG-as-a-Service platform that turns documents, files, and data sources into AI-searchable workspaces with accurate, cited answers."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Ragora is a **Retrieval-Augmented Generation (RAG) platform** that transforms your documents into AI-searchable workspaces. Upload PDFs, code, audio, video, chat archives, or connect data sources — then search, chat, or integrate via API to get accurate, source-cited answers grounded in your actual content.

## Key Features

| Feature | Description |
|---------|-------------|
| **Knowledge Workspaces** | Organize content into searchable collections. Upload 50+ file types, connect GitHub, Google Drive, Dropbox, and more. |
| **Hybrid Search** | Combines semantic understanding with keyword matching for precise retrieval across 100+ languages. |
| **RAG Chat** | AI-powered Q&A that cites your documents. OpenAI-compatible API with streaming support. |
| **Knowledge Graph** | Automatically extracts entities (people, organizations, products) and connects related information across documents. |
| **Cross-Encoder Reranking** | A second-pass model scores every result against your exact query, filtering noise before the LLM sees it. |
| **Multilingual** | Upload and search in 100+ languages with cross-language retrieval — query in English, find results in Japanese. |
| **Marketplace** | Publish workspaces as products and earn revenue when AI agents access your content. |
| **Integrations** | Connect via MCP (Claude, Cursor, VS Code), embed a chat widget, or deploy Discord/Slack/Telegram bots. |
| **Official SDKs** | Python (`ragora-sdk`) and TypeScript (`ragora`) SDKs with full type support, streaming, and automatic retries. |

---

## Who Uses Ragora?

- **Developer teams** — Make internal docs, runbooks, and architecture decisions searchable by AI assistants
- **Support teams** — Build AI agents that answer customer questions using product documentation
- **Legal & compliance** — AI that cites exact policy clauses instead of giving vague answers
- **Researchers** — Search across papers, reports, and technical whitepapers with semantic understanding
- **Content creators** — Monetize expertise by publishing knowledge workspaces on the marketplace
- **Open source maintainers** — Provide always-current documentation that AI tools can access via MCP

---

## How Does It Work?

1. **Upload** — Add documents, connect data sources, or import from URLs and GitHub
2. **Process** — Ragora parses, chunks, embeds (1024-dim multilingual vectors), and extracts entities automatically
3. **Search** — Hybrid semantic + lexical search finds the most relevant passages
4. **Answer** — An LLM generates grounded, cited responses using your retrieved context

See [How It Works](/docs/features/how-it-works) for the full technical pipeline.

---

## Quick Start with SDKs

Install the official SDK and start searching in minutes:

<Tabs>
  <TabItem value="python" label="Python" default>

```bash
pip install ragora-sdk
```

```python
import asyncio
from ragora import RagoraClient

async def main():
    async with RagoraClient(api_key="sk_live_xxx") as client:
        # Search your workspace
        results = await client.search(
            query="How do I reset my password?",
            collection="support-docs",
            top_k=5,
        )
        for r in results.results:
            print(f"[{r.score:.2f}] {r.content[:100]}")

        # Chat with RAG context
        response = await client.chat(
            messages=[{"role": "user", "content": "Summarize the onboarding process"}],
            retrieval={"collection": "support-docs"},
        )
        print(response.choices[0].message.content)

asyncio.run(main())
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```bash
npm install ragora
```

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient({ apiKey: 'sk_live_xxx' });

// Search your workspace
const results = await client.search({
  query: 'How do I reset my password?',
  collection: 'support-docs',
  topK: 5,
});
results.results.forEach(r => {
  console.log(`[${r.score.toFixed(2)}] ${r.content.slice(0, 100)}`);
});

// Chat with RAG context
const response = await client.chat({
  messages: [{ role: 'user', content: 'Summarize the onboarding process' }],
  retrieval: { collection: 'support-docs' },
});
console.log(response.choices[0].message.content);
```

  </TabItem>
</Tabs>

See the [SDK documentation](/sdk/getting-started) for complete guides, or jump to the [Quick Start](/docs/getting-started) to set up your first workspace.

---

## Common Questions

### What file types does Ragora support?

Ragora supports **50+ file types** including PDF, Word, Excel, PowerPoint, Markdown, HTML, source code (Python, JavaScript, Go, Rust, and more), images (with OCR), audio (MP3, WAV, FLAC), and video (MP4, WEBM). YouTube URLs can be imported and auto-transcribed.

### What languages are supported?

Ragora supports **100+ languages** out of the box, including English, Chinese, Japanese, Korean, Arabic, Hindi, Nepali, Spanish, French, German, and many more. Cross-language retrieval works automatically — query in one language and find results from documents in another.

### How much does Ragora cost?

Ragora has a **free tier** with 3K vectors (~2K pages), 200 retrievals/day, and 30 minutes of audio/video transcription. Paid plans start at $19.99/month with expanded limits. Retrieval from your own workspaces is always free on paid plans. Chat completions use monthly credits included with your plan. See the [Pricing page](https://ragora.app/pricing) for current plans.

### Is my data secure?

Your documents are **never used to train AI models**. Data is stored encrypted and isolated per organization. Deleting a workspace permanently removes all associated documents and vectors.

### Can I choose which LLM model to use?

Yes. The Chat API lets you pass any model available on OpenRouter as a parameter — Gemini Flash, Claude, GPT-4o, Llama, and more. Just set `model` in your chat request:

```python
response = await client.chat(
    messages=[{"role": "user", "content": "Summarize this"}],
    generation={"model": "google/gemini-2.5-flash"},
    retrieval={"collection": "my-docs"},
)
```

You can also use `client.search()` to get retrieval results without any LLM generation, then feed them into your own model or pipeline.

### What SDKs are available?

Official SDKs for **Python** ([`ragora-sdk`](https://pypi.org/project/ragora-sdk/)) and **TypeScript/Node.js** ([`ragora`](https://www.npmjs.com/package/ragora)). Both include full type support, streaming, automatic retries, and async/await patterns. See the [SDK docs](/sdk/getting-started).

### How do I integrate with AI assistants?

Ragora supports **MCP (Model Context Protocol)** for direct integration with Claude Desktop, Cursor, VS Code, and other MCP-compatible tools. Configure the MCP server URL and API key in your AI tool. See the [MCP Guide](/docs/integrations/mcp-guide).

### Can I monetize my content?

Yes. Publish any workspace to the **Ragora Marketplace** as a product with subscription, one-time, or pay-per-use pricing. Earn revenue when other users or AI agents access your content. See [Marketplace](/docs/marketplace).

### How do bots work?

Install official Ragora bots for **Discord**, **Slack**, or **Telegram** to sync messages into workspaces (making chat history searchable) or deploy Q&A bots that answer questions using your knowledge base. See [Bot Integrations](/docs/guides/integrations-guide).

---

## Next Steps

| Goal | Where to Go |
|------|-------------|
| Set up your first workspace | [Quick Start](/docs/getting-started) |
| Install the Python or TypeScript SDK | [SDK Documentation](/sdk/getting-started) |
| Understand the RAG pipeline | [How It Works](/docs/features/how-it-works) |
| Connect AI assistants via MCP | [MCP Guide](/docs/integrations/mcp-guide) |
| Embed a chat widget on your site | [Chat Widget](/widget/getting-started) |
| Browse the API reference | [API Overview](/docs/api/overview) |
| Explore real-world use cases | [Use Cases](/docs/features/use-cases) |
