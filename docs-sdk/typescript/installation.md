---
title: TypeScript SDK Installation
sidebar_label: Installation
sidebar_position: 1
description: Install and configure the Ragora TypeScript SDK
---

# TypeScript SDK Installation

The Ragora TypeScript SDK is a fetch-based client that works in Node.js, browsers, and edge runtimes with full TypeScript type definitions.

## Requirements

- Node.js 18 or later
- TypeScript 5.0+ (recommended)

## Install

```bash
npm install ragora
```

Or with other package managers:

```bash
pnpm add ragora
yarn add ragora
```

## Quick Start

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient({ apiKey: 'your-api-key' });

// Create a collection
const collection = await client.createCollection({
  name: 'My Knowledge Base',
  description: 'Documentation and guides',
});
console.log(`Created collection: ${collection.id}`);

// Upload a document
const upload = await client.uploadDocument({
  file: new Blob(['Hello world']),
  filename: 'hello.txt',
  collectionId: collection.id,
});
console.log(`Uploaded: ${upload.filename} (ID: ${upload.id})`);

// Wait for processing to complete
const status = await client.waitForDocument(upload.id);
console.log(`Processing complete: ${status.vectorCount} vectors created`);

// Search the collection
const results = await client.search({
  collectionId: collection.id,
  query: 'How do I get started?',
  topK: 5,
});
results.results.forEach((result) => {
  console.log(`Score: ${result.score.toFixed(3)} - ${result.content.slice(0, 100)}...`);
});

// Chat with your knowledge base
const response = await client.chat({
  messages: [{ role: 'user', content: 'Summarize the main concepts' }],
  retrieval: { collectionId: collection.id },
});
console.log(response.choices[0].message.content);
```

## Client Initialization

```typescript
import { RagoraClient } from 'ragora';

// Basic usage
const client = new RagoraClient({ apiKey: 'your-api-key' });

// With custom settings
const client = new RagoraClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.ragora.app', // default
  timeout: 30000, // milliseconds
  fetch: customFetch, // optional custom fetch implementation
});
```

## Environment Variable

You can set your API key as an environment variable instead of passing it directly:

```bash
export RAGORA_API_KEY="your-api-key"
```

## Features

- **Fetch-based** — Works in Node.js, browsers, and edge runtimes
- **Full TypeScript** — Complete type definitions included
- **Streaming support** — Real-time chat completions with async iterators
- **Document management** — Upload, track progress, and manage documents
- **Collection CRUD** — Create, update, delete, and list collections
- **Cost tracking** — Monitor API costs per request
- **Next.js ready** — Works with App Router and Pages Router
- **Auto-retry** — Retries 429 and 5xx errors automatically (configurable via `maxRetries`, default: 2)

## Next Steps

- [Usage Guide →](./usage)
