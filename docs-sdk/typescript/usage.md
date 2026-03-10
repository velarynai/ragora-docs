---
title: TypeScript SDK Usage
sidebar_label: Usage Guide
sidebar_position: 2
description: Complete guide to using the Ragora TypeScript SDK
---

# TypeScript SDK Usage Guide

## Collections

```typescript
// Create a collection
const collection = await client.createCollection({
  name: 'My Collection',
  description: 'Optional description',
  slug: 'my-collection', // optional, auto-generated if not provided
});

// List collections
const collections = await client.listCollections({ limit: 20, offset: 0 });
for (const coll of collections.data) {
  console.log(`${coll.name}: ${coll.totalDocuments} documents`);
}

// Get a collection by ID or slug
const collection = await client.getCollection('collection-id-or-slug');

// Update a collection
const updated = await client.updateCollection('collection-id', {
  name: 'New Name',
  description: 'Updated description',
});

// Delete a collection
const result = await client.deleteCollection('collection-id');
console.log(result.message);
```

## Documents

```typescript
// Upload a document (Node.js with Buffer)
import { readFileSync } from 'fs';

const upload = await client.uploadDocument({
  file: readFileSync('./document.pdf'),
  filename: 'document.pdf',
  collectionId: 'collection-id', // optional, uses default if not provided
});

// Upload a document (Browser with Blob/File)
const upload = await client.uploadDocument({
  file: fileInput.files[0], // from <input type="file">
  filename: fileInput.files[0].name,
  collectionId: 'collection-id',
});

// Check document status
const status = await client.getDocumentStatus(upload.id);
console.log(`Status: ${status.status}`);
console.log(`Progress: ${status.progressPercent}%`);
console.log(`Stage: ${status.progressStage}`);

// Wait for processing to complete
const status = await client.waitForDocument(upload.id, {
  timeout: 300000, // max wait time in ms (default: 5 minutes)
  pollInterval: 2000, // time between status checks in ms
});

// List documents in a collection
const documents = await client.listDocuments({
  collectionId: 'collection-id',
  limit: 50,
  offset: 0,
});

// Delete a document
const result = await client.deleteDocument('document-id');
```

## Search

```typescript
const results = await client.search({
  collectionId: 'collection-id',
  query: 'What is machine learning?',
  topK: 5, // number of results
  sourceType: ['sec_filing'],
  customTags: ['ticker:aapl', 'form:10-k'],
  filters: { filing_year: { $gte: 2023 } },
  versionMode: 'latest',
  enableReranker: true,
});

for (const result of results.results) {
  console.log(`Score: ${result.score.toFixed(3)}`);
  console.log(`Content: ${result.content}`);
  console.log(`Document ID: ${result.documentId}`);
  console.log('---');
}
```

### Friendly Collection References

You can pass human-friendly names instead of IDs:

```typescript
// Search by collection name
const search = await client.search({
  collection: 'SEC Filings',
  query: 'gross margin',
});

// Upload/list docs by collection name
await client.uploadDocument({
  file: new Blob(['hello']),
  filename: 'hello.txt',
  collection: 'Internal Docs',
});

const docs = await client.listDocuments({ collection: 'Internal Docs' });
```

The `collection` parameter accepts a UUID, slug, or name. Do not pass both `collection` and `collectionId` in the same call.

## Chat Completions

### Non-streaming

```typescript
const response = await client.chat({
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain RAG' },
  ],
  generation: {
    model: 'google/gemini-2.5-flash',
    temperature: 0.7,
    maxTokens: 1000,
  },
  retrieval: {
    collectionId: 'collection-id',
    versionMode: 'latest',
    documentKeys: ['sec:10k:0000320193'],
    domain: ['financial'],
    domainFilterMode: 'strict',
    enableReranker: true,
  },
});

console.log(response.choices[0].message.content);
console.log(`Sources used: ${response.sources.length}`);
```

### Streaming

```typescript
for await (const chunk of client.chatStream({
  messages: [{ role: 'user', content: 'Explain RAG' }],
  retrieval: { collectionId: 'collection-id' },
})) {
  process.stdout.write(chunk.content);

  // Sources are included in the final chunk
  if (chunk.sources.length > 0) {
    console.log(`\n\nSources: ${chunk.sources.length}`);
  }
}
```

### Chat Options

`chat()` and `chatStream()` use grouped options:

- `generation`: model/temperature/maxTokens
- `retrieval`: collection/product scope + retrieval filters
- `agentic`: mode/systemPrompt/session/sessionId
- `metadata`: source attribution fields

### Friendly Product References

```typescript
// Chat by product title/slug
const chat = await client.chat({
  messages: [{ role: 'user', content: 'Summarize key risks' }],
  retrieval: { products: ['Apple 10-K Pack'] },
});
```

The same retrieval controls (`sourceType`, `sourceName`, `version`, `versionMode`, `documentKeys`, `customTags`, `domain`, `domainFilterMode`, `filters`, `graphFilter`, `temporalFilter`, `enableReranker`) are available across `search` and `chat`.

## Agent Chat (Auto Retrieval)

```typescript
const agent = await client.createAgent({
  name: 'SEC Analyst',
  collectionIds: ['collection-id'],
  retrievalPolicy: {
    default_top_k: 8,
    max_top_k: 15,
    constraints: {
      domain: ['financial'],
      domain_filter_mode: 'strict',
      custom_tags: ['ticker:aapl'],
    },
  },
});

const reply = await client.agentChat(agent.id, {
  message: 'Summarize 2024 gross margin drivers for AAPL',
  sessionId: 'optional-session-id',
  collectionIds: ['collection-id'], // optional session-level collection scope
});

console.log(reply.message);
```

## Marketplace

```typescript
// Browse marketplace products
const products = await client.listMarketplace({ limit: 10, search: 'AI' });
for (const product of products.data) {
  console.log(`${product.title} - ${product.averageRating.toFixed(1)} stars`);
}

// Get product details (by ID or slug)
const product = await client.getMarketplaceProduct('product-slug');
console.log(`${product.title}: ${product.totalVectors} vectors`);
if (product.listings) {
  for (const listing of product.listings) {
    console.log(`  ${listing.type}: $${listing.priceAmountUsd}`);
  }
}
```

## Credits

```typescript
const balance = await client.getBalance();
console.log(`Balance: $${balance.balanceUsd.toFixed(2)} ${balance.currency}`);
```

## Response Metadata

Every response includes metadata from API headers:

```typescript
const response = await client.search({...});

console.log(`Request ID: ${response.requestId}`);
console.log(`API Version: ${response.apiVersion}`);
console.log(`Cost: $${response.costUsd?.toFixed(4)}`);
console.log(`Remaining balance: $${response.balanceRemainingUsd?.toFixed(2)}`);
console.log(`Rate limit: ${response.rateLimitRemaining}/${response.rateLimitLimit}`);
console.log(`Rate limit resets in: ${response.rateLimitReset}s`);
```

## Error Handling

```typescript
import {
  RagoraClient,
  RagoraError,
  AuthenticationError,
  NotFoundError,
  RateLimitError,
  ServerError,
} from 'ragora';

const client = new RagoraClient({ apiKey: 'your-api-key' });

try {
  const results = await client.search({...});
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.log('Check your API key');
  } else if (error instanceof RateLimitError) {
    console.log(`Rate limited - retry after ${error.retryAfter}s`);
  } else if (error instanceof NotFoundError) {
    console.log('Resource not found');
  } else if (error instanceof ServerError) {
    console.log('Server error - safe to retry');
  } else if (error instanceof RagoraError) {
    console.log(`Error: ${error.message}`);
    console.log(`Status code: ${error.statusCode}`);
    console.log(`Request ID: ${error.requestId}`);
  }
}
```

The SDK retries 429 and 5xx errors automatically (configurable via `maxRetries`, default: 2).

## Next.js Integration

### App Router (Server Components)

```typescript
// app/api/search/route.ts
import { RagoraClient } from 'ragora';
import { NextResponse } from 'next/server';

const client = new RagoraClient({
  apiKey: process.env.RAGORA_API_KEY!,
});

export async function POST(request: Request) {
  const { query, collectionId } = await request.json();

  const results = await client.search({
    collectionId,
    query,
    topK: 5,
  });

  return NextResponse.json(results);
}
```

### Streaming Chat (App Router)

```typescript
// app/api/chat/route.ts
import { RagoraClient } from 'ragora';

const client = new RagoraClient({
  apiKey: process.env.RAGORA_API_KEY!,
});

export async function POST(request: Request) {
  const { messages, collectionId } = await request.json();

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of client.chatStream({
        messages,
        retrieval: { collectionId },
      })) {
        controller.enqueue(encoder.encode(chunk.content));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
```

### Pages Router

```typescript
// pages/api/chat.ts
import { RagoraClient } from 'ragora';
import type { NextApiRequest, NextApiResponse } from 'next';

const client = new RagoraClient({
  apiKey: process.env.RAGORA_API_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { messages, collectionId } = req.body;

  const response = await client.chat({
    messages,
    retrieval: { collectionId },
  });

  res.status(200).json(response);
}
```

## Examples

See the [`examples/`](https://github.com/velarynai/ragora-node/tree/main/examples) directory for complete, runnable examples:

| Example | Description | Command |
|---------|-------------|---------|
| [Search](https://github.com/velarynai/ragora-node/blob/main/examples/search.ts) | Search documents and access response metadata | `npm run example:search` |
| [Chat](https://github.com/velarynai/ragora-node/blob/main/examples/chat.ts) | Chat completions with RAG context | `npm run example:chat` |
| [Streaming](https://github.com/velarynai/ragora-node/blob/main/examples/streaming.ts) | Streaming chat responses | `npm run example:streaming` |
| [Collections CRUD](https://github.com/velarynai/ragora-node/blob/main/examples/collections-crud.ts) | Create, list, get, update, delete collections | `npm run example:collections` |
| [Documents](https://github.com/velarynai/ragora-node/blob/main/examples/documents.ts) | Upload, process, list, delete documents | `npm run example:documents` |
| [Marketplace](https://github.com/velarynai/ragora-node/blob/main/examples/marketplace.ts) | Browse marketplace products and listings | `npm run example:marketplace` |
| [Credits](https://github.com/velarynai/ragora-node/blob/main/examples/credits.ts) | Check balance and track costs | `npm run example:credits` |
| [Agentic RAG](https://github.com/velarynai/ragora-node/blob/main/examples/agentic-rag/chat.ts) | Multi-turn agent chat with auto retrieval | `npm run example:agentic-rag` |
| [Next.js Integration](https://github.com/velarynai/ragora-node/blob/main/examples/nextjs-integration.ts) | App Router search, chat, and streaming handlers | `npm run example:nextjs` |

Set your API key before running:

```bash
export RAGORA_API_KEY="your-api-key"
npm run example:search
```
