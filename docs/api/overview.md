---
title: "SDK Overview"
sidebar_label: "Overview"
sidebar_position: 1
description: "Authentication, SDKs, and getting started"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Build applications with Ragora's official Python and TypeScript SDKs.

## Authentication

Authenticate by initializing the SDK with your API key:

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

# Pass the key explicitly
async with RagoraClient(api_key="sk_live_your_key_here") as client:
    ...

# Or set the RAGORA_API_KEY environment variable and omit it
async with RagoraClient() as client:
    ...
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

// Pass the key explicitly
const client = new RagoraClient({ apiKey: 'sk_live_your_key_here' });

// Or set the RAGORA_API_KEY environment variable and omit it
const client = new RagoraClient();
```

  </TabItem>
</Tabs>

### Getting an API Key

1. Go to **Settings** → **API Keys** in your dashboard
2. Click **Create New Key**
3. Copy and store your key securely — it's only shown once

API keys start with `sk_live_` for production.

---

## SDKs & Libraries

Install the official SDK for your language:

<Tabs>
  <TabItem value="python" label="Python" default>

```bash
pip install ragora-sdk
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```bash
npm install ragora
```

  </TabItem>
</Tabs>

### Quick Start

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

async with RagoraClient(api_key="sk_live_xxx") as client:
    # Search a collection
    results = await client.search(
        query="What is the return policy?",
        collection="coll_abc123",
        top_k=5,
    )
    for result in results:
        print(result)

    # RAG-augmented chat
    response = await client.chat(
        messages=[{"role": "user", "content": "Summarize the return policy"}],
        retrieval={"collection": "coll_abc123"},
    )
    print(response)
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient({ apiKey: 'sk_live_xxx' });

// Search a collection
const results = await client.search({
  query: 'What is the return policy?',
  collection: 'coll_abc123',
  topK: 5,
});
console.log(results);

// RAG-augmented chat
const response = await client.chat({
  messages: [{ role: 'user', content: 'Summarize the return policy' }],
  retrieval: { collection: 'coll_abc123' },
});
console.log(response);
```

  </TabItem>
</Tabs>

Both SDKs handle authentication, automatic retries, rate-limit backoff, and error handling out of the box. See the [full SDK documentation](/sdk/getting-started) for advanced usage.

---

## Pagination

List methods support `limit` and `offset` parameters:

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

async with RagoraClient(api_key="sk_live_xxx") as client:
    page = await client.list_collections(limit=20, offset=40)
    print(page)
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient({ apiKey: 'sk_live_xxx' });

const page = await client.listCollections({ limit: 20, offset: 40 });
console.log(page);
```

  </TabItem>
</Tabs>

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | integer | 10 | Results per page (max 100) |
| `offset` | integer | 0 | Number of results to skip |

---

## Rate Limits

Rate limits are applied at multiple levels:

| Level | Limit | Description |
|-------|-------|-------------|
| Global IP | 500/min | Applied to all requests |
| Session | 120/min | Per authenticated user |
| Retrieve/Chat | 120/min | Search and chat endpoints |
| Upload | 60/min | Document upload endpoint |

When you exceed the limit, the SDK will automatically retry with backoff. See [Errors & Limits](/docs/api/errors) for details on configuring retry behavior.

---

## Billing

### What's Free

- **Retrieval** from collections you own or have subscription access to
- **Document uploads** within your tier limits

### What Costs Credits

- **Chat Completions** — RAG-augmented chat
- **Pay-per-use marketplace products**

Check your balance:

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

async with RagoraClient(api_key="sk_live_xxx") as client:
    balance = await client.get_balance()
    print(balance)
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient({ apiKey: 'sk_live_xxx' });

const balance = await client.getBalance();
console.log(balance);
```

  </TabItem>
</Tabs>

```json
{
  "balance_usd": 12.50
}
```

---

## Next Steps

- [Retrieve](/docs/api/retrieve) — Search your workspaces
- [Chat Completions](/docs/api/chat-completions) — RAG-augmented chat
- [Documents](/docs/api/documents) — Upload and manage files
- [Collections](/docs/api/collections) — Organize your data
