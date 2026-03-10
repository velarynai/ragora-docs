---
title: "API Overview"
sidebar_label: "Overview"
sidebar_position: 1
description: "Authentication, SDKs, and getting started"
---

Build applications with Ragora's REST API.

## Base URL

All API requests go to:

```
https://api.ragora.app/v1
```

## Authentication

Authenticate using Bearer tokens in the `Authorization` header:

```bash
curl https://api.ragora.app/v1/retrieve \
  -H "Authorization: Bearer sk_live_your_key_here" \
  -H "Content-Type: application/json"
```

### Getting an API Key

1. Go to **Settings** → **API Keys** in your dashboard
2. Click **Create New Key**
3. Copy and store your key securely — it's only shown once

API keys start with `sk_live_` for production.

---

## Request Format

- **Content-Type**: `application/json` for most endpoints
- **Multipart**: `multipart/form-data` for file uploads
- **Encoding**: UTF-8

### Example Request

```bash
curl -X POST https://api.ragora.app/v1/retrieve \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "How do I reset the device?",
    "collection_ids": ["coll_abc123"],
    "top_k": 5
  }'
```

---

## Response Format

All responses return JSON with consistent structure.

### Success Response

```json
{
  "object": "retrieval",
  "results": [...],
  "fragments": [...],
  "system_instruction": "When using information from these fragments, cite the source using [source_id].",
  "knowledge_graph": {...},
  "global_graph_context": {...},
  "usage": {
    "cost_usd": 0.005
  }
}
```

### Error Response

```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "Missing required field: query"
  }
}
```

---

## Response Headers

Every response includes useful headers:

| Header | Description |
|--------|-------------|
| `X-Request-ID` | Unique request ID for debugging |
| `X-Ragora-API-Version` | API version |
| `X-Ragora-Cost-USD` | Cost of this operation (billing endpoints) |
| `X-Ragora-Balance-Remaining-USD` | Your remaining credit balance (billing endpoints) |
| `X-RateLimit-Limit` | Rate limit ceiling |
| `X-RateLimit-Remaining` | Requests remaining in window |
| `X-RateLimit-Reset` | Unix timestamp when limit resets |
| `Retry-After` | Seconds to wait (on 429 responses) |

---

## Pagination

List endpoints support pagination via `limit` and `offset`:

```bash
GET /v1/documents?collection_id=coll_xxx&limit=20&offset=40
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | integer | 10 | Results per page (max 100) |
| `offset` | integer | 0 | Number of results to skip |

Responses include pagination metadata:

```json
{
  "object": "list",
  "data": [...],
  "has_more": true,
  "total": 150
}
```

---

## SDKs & Libraries

### Python

```python
import requests

class RagoraClient:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.ragora.app/v1"

    def retrieve(self, query: str, collection_ids: list = None, top_k: int = 5):
        response = requests.post(
            f"{self.base_url}/retrieve",
            headers={"Authorization": f"Bearer {self.api_key}"},
            json={
                "query": query,
                "collection_ids": collection_ids,
                "top_k": top_k
            }
        )
        response.raise_for_status()
        return response.json()

# Usage
client = RagoraClient("sk_live_xxx")
results = client.retrieve("What is the return policy?")
```

### JavaScript / TypeScript

```typescript
class RagoraClient {
  constructor(private apiKey: string) {}

  private baseUrl = "https://api.ragora.app/v1";

  async retrieve(query: string, options?: {
    collection_ids?: string[];
    top_k?: number;
  }) {
    const response = await fetch(`${this.baseUrl}/retrieve`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query, ...options })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  }
}

// Usage
const client = new RagoraClient("sk_live_xxx");
const results = await client.retrieve("What is the return policy?");
```

### cURL

```bash
# Set your API key
export RAGORA_API_KEY="sk_live_xxx"

# Search documents
curl -X POST https://api.ragora.app/v1/retrieve \
  -H "Authorization: Bearer $RAGORA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the return policy?", "top_k": 5}'
```

---

## Versioning

The API is versioned via the URL path (`/v1`). We maintain backward compatibility within a version.

Breaking changes result in a new version (e.g., `/v2`). You'll receive deprecation notices via email before any version is retired.

---

## Rate Limits

Rate limits are applied at multiple levels:

| Level | Limit | Description |
|-------|-------|-------------|
| Global IP | 500/min | Applied to all requests |
| Session | 120/min | Per authenticated user |
| Retrieve/Chat | 120/min | Search and chat endpoints |
| Upload | 60/min | Document upload endpoint |

When you exceed the limit, you'll receive a `429 Too Many Requests` response:

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Retry after 32 seconds."
  }
}
```

The `Retry-After` header indicates how many seconds to wait before retrying.

---

## Billing

### What's Free

- **Retrieval API** from collections you own or have subscription access to
- **Document uploads** within your tier limits

### What Costs Credits

- **Chat Completions API** (`/v1/chat/completions`)
- **Pay-per-use marketplace products**

Check your balance:

```bash
curl https://api.ragora.app/v1/credits/balance \
  -H "Authorization: Bearer sk_live_xxx"
```

```json
{
  "balance_usd": 12.50
}
```

---

## Next Steps

- [Retrieve API](/docs/api/retrieve) — Search your workspaces
- [Chat Completions](/docs/api/chat-completions) — RAG-augmented chat
- [Documents API](/docs/api/documents) — Upload and manage files
- [Collections API](/docs/api/collections) — Organize your data
