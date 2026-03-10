---
title: "Retrieve"
sidebar_label: "Retrieve"
sidebar_position: 2
description: "Search and retrieve from your workspaces"
---

Search your workspaces using natural language queries.

## Overview

The Retrieve API performs hybrid search (semantic + lexical) across your collections and returns the most relevant document chunks with metadata.

```
POST /v1/retrieve
```

---

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes | `Bearer sk_live_xxx` |
| `Content-Type` | Yes | `application/json` |

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | **Yes** | Natural language search query |
| `collection_ids` | string[] | No | Collection IDs or slugs to search. Omit to search all accessible collections |
| `top_k` | integer | No | Number of results to return (default: 3, max: 20) |
| `enable_reranker` | boolean | No | Use reranker for improved relevance (default: false) |
| `version_mode` | string | No | Version filtering mode: `latest` (default), `all`, or `exact` |
| `document_keys` | string[] | No | Filter to specific document keys |

### Filtering Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `source_type` | array | Filter by source type: `upload`, `youtube`, `html`, `github`, `gdrive`, `dropbox`, `confluence`, `discord`, `slack` |
| `source_name` | array | Filter by filename or source name |
| `version` | array | Filter by document version |
| `custom_tags` | array | Filter by custom tags |
| `domain` | array | Filter by domain: `general`, `legal`, `medical`, `financial`, `software_docs`, `code`, `transcript`, `chat` |
| `domain_filter_mode` | string | `preferred` (boost matching domains) or `strict` (only matching domains) |

### Advanced Filters

Use MongoDB-style operators for metadata filtering:

```json
{
  "filters": {
    "page_number": {"$gte": 10, "$lte": 20},
    "file_size": {"$gt": 1000},
    "language": {"$in": ["en", "es"]}
  }
}
```

Supported operators: `$gt`, `$gte`, `$lt`, `$lte`, `$in`, `$ne`, `$eq`

### Temporal Filter

Filter results by document time:

```json
{
  "temporal_filter": {
    "since": "2024-01-01T00:00:00Z",
    "until": "2024-06-01T00:00:00Z",
    "recency_weight": 0.5,
    "recency_decay": "exponential",
    "decay_half_life": 30
  }
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `as_of` | string (ISO 8601) | Return documents effective at this point in time |
| `since` | string (ISO 8601) | Return documents created after this date |
| `until` | string (ISO 8601) | Return documents created before this date |
| `recency_weight` | float | Weight for recency boosting (0-1) |
| `recency_decay` | string | Decay function: `exponential` or `linear` |
| `decay_half_life` | integer | Half-life in days for decay function |

### Graph Filters (Entity-based)

Filter results based on extracted entities:

```json
{
  "graph_filter": {
    "entities": ["John Smith", "Acme Corp"],
    "entity_type": "PERSON",
    "file_ids": ["file_123", "file_456"]
  }
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `entities` | array | Filter to chunks mentioning these entities (AND logic) |
| `entity_type` | string | Filter by entity type: `PERSON`, `ORG`, `LOCATION`, `CONCEPT` |
| `file_ids` | array | Filter to specific files |
| `version_of` | string | Find versions of a specific file ID |
| `relation_type` | string | Filter by relationship type: `SUPERSEDES`, `CITES`, etc. |

---

## Response

### Success Response (200)

```json
{
  "object": "retrieval",
  "results": [
    {
      "id": "chunk_abc123",
      "text": "To reset the device, hold the power button for 10 seconds until the LED flashes blue.",
      "parent_text": "Chapter 5: Troubleshooting\n\nTo reset the device, hold the power button for 10 seconds until the LED flashes blue. This will restore factory settings without deleting your data.",
      "score": 0.89,
      "metadata": {
        "file_id": "file_xyz789",
        "filename": "user-manual.pdf",
        "source": "user-manual.pdf",
        "source_type": "upload",
        "source_name": "Product Documentation",
        "custom_tags": ["manual", "v2.0"],
        "created_at": "2024-01-15T10:30:00Z",
        "chunk_index": 42,
        "page_number": 15
      },
      "graph_context": {
        "entities": [
          {"name": "LED", "type": "CONCEPT"},
          {"name": "power button", "type": "CONCEPT"}
        ]
      }
    }
  ],
  "fragments": [
    {
      "content": "To reset the device, hold the power button for 10 seconds until the LED flashes blue.",
      "source_id": "chunk_abc123",
      "file_id": "file_xyz789",
      "page_number": 15,
      "metadata": {
        "source": "user-manual.pdf",
        "chunk_id": "chunk_abc123"
      },
      "score": 0.89
    }
  ],
  "system_instruction": "When using information from these fragments, cite the source using [source_id]. If a version is specified, include it in your citation.",
  "knowledge_graph": {
    "relations": [],
    "expansion_paths": []
  },
  "global_graph_context": {
    "all_relations": [],
    "expansion_paths": []
  },
  "knowledge_graph_summary": "",
  "graph_debug": {
    "graph_filter_applied": false,
    "entities_enriched": true,
    "unique_entities_found": 2
  },
  "usage": {
    "cost_usd": 0.0
  }
}
```

### Result Fields (`results[]`)

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique chunk identifier |
| `text` | string | The matched text chunk |
| `parent_text` | string | Larger context window around the chunk |
| `parent_id` | string | Parent chunk ID |
| `score` | float | Relevance score (0-1, higher is better) |
| `metadata` | object | Document and chunk metadata |
| `entities` | array | File-level extracted entities |
| `graph_context` | object | Chunk-level graph context (entities + relations) |

### Fragment Fields (`fragments[]`)

| Field | Type | Description |
|-------|------|-------------|
| `content` | string | The matched text content |
| `source_id` | string | Stable chunk identifier for citations |
| `source_url` | string | URL to the source (if available) |
| `collection_id` | string | Collection the chunk belongs to |
| `product_id` | string | Product the chunk belongs to |
| `product_name` | string | Product display name |
| `seller_name` | string | Seller display name |
| `version` | string | Document version tag |
| `file_id` | string | Parent file ID |
| `page_number` | integer | Page number (for PDFs) |
| `language` | string | Detected language |
| `metadata` | object | Additional chunk metadata |
| `parent_text` | string | Larger context window |
| `graph_context` | object | Chunk-level graph context |
| `score` | float | Relevance score |

### Top-Level Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `results` | array | Legacy result format (see Result Fields above) |
| `fragments` | array | Agent-native retrieval fragments (see Fragment Fields above) |
| `system_instruction` | string | Suggested citation instruction for downstream LLM prompts |
| `knowledge_graph` | object | Cross-chunk relations and expansion paths |
| `global_graph_context` | object | Backward-compatible alias of graph context |
| `knowledge_graph_summary` | string | Human-readable summary of graph relationships |
| `graph_debug` | object | Debug and observability information for graph enrichment |
| `usage` | object | `{ cost_usd, balance_remaining_usd }` |

### Metadata Fields

| Field | Type | Description |
|-------|------|-------------|
| `file_id` | string | Parent document ID |
| `filename` | string | Original filename |
| `source` | string | Source identifier |
| `source_type` | string | How the document was added |
| `source_name` | string | Human-readable source name |
| `custom_tags` | array | User-defined tags |
| `created_at` | string | When document was ingested |
| `chunk_index` | integer | Position within document |
| `page_number` | integer | Page number (for PDFs) |

---

## Examples

### Basic Search

```bash
curl -X POST https://api.ragora.app/v1/retrieve \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "How do I reset my password?",
    "top_k": 5
  }'
```

### Search Specific Collections

```bash
curl -X POST https://api.ragora.app/v1/retrieve \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "authentication setup",
    "collection_ids": ["docs-v2", "coll_abc123"],
    "top_k": 10
  }'
```

### Filter by Source Type

```bash
curl -X POST https://api.ragora.app/v1/retrieve \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "API rate limits",
    "source_type": ["github", "upload"],
    "domain": ["software_docs", "code"],
    "top_k": 5
  }'
```

### Search with Entity Filter

```bash
curl -X POST https://api.ragora.app/v1/retrieve \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "project status update",
    "graph_filter": {
      "entities": ["Project Alpha", "Q4 2024"],
      "entity_type": "CONCEPT"
    },
    "top_k": 10
  }'
```

### Python Example

```python
import requests

def search_documents(query: str, collections: list = None, top_k: int = 5):
    response = requests.post(
        "https://api.ragora.app/v1/retrieve",
        headers={
            "Authorization": "Bearer sk_live_xxx",
            "Content-Type": "application/json"
        },
        json={
            "query": query,
            "collection_ids": collections,
            "top_k": top_k,
            "enable_reranker": True
        }
    )
    response.raise_for_status()
    return response.json()

# Search all collections
results = search_documents("What is the refund policy?")

# Print results with scores
for result in results["results"]:
    print(f"[{result['score']:.2f}] {result['metadata']['filename']}")
    print(f"  {result['text'][:200]}...")
    print()
```

### JavaScript Example

```javascript
async function searchDocuments(query, options = {}) {
  const response = await fetch("https://api.ragora.app/v1/retrieve", {
    method: "POST",
    headers: {
      "Authorization": "Bearer sk_live_xxx",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      collection_ids: options.collections,
      top_k: options.topK || 5,
      enable_reranker: true
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "Search failed");
  }

  return response.json();
}

// Usage
const results = await searchDocuments("How do I configure webhooks?", {
  collections: ["api-docs"],
  topK: 10
});

results.results.forEach(r => {
  console.log(`[${r.score.toFixed(2)}] ${r.metadata.filename}`);
  console.log(`  ${r.text.slice(0, 200)}...`);
});
```

---

## Error Responses

### 400 Bad Request

Missing or invalid parameters:

```json
{
  "error": {
    "code": "invalid_request",
    "message": "Missing required field: query"
  }
}
```

### 401 Unauthorized

Invalid or missing API key:

```json
{
  "error": {
    "code": "authentication_error",
    "message": "Invalid API key"
  }
}
```

### 402 Payment Required

Insufficient credits for pay-per-use product:

```json
{
  "error": {
    "code": "insufficient_balance",
    "message": "Insufficient credits. Add funds at https://ragora.app/billing"
  }
}
```

### 403 Forbidden

No access to requested collection:

```json
{
  "error": {
    "code": "permission_denied",
    "message": "No access to collection: coll_xyz"
  }
}
```

### 429 Rate Limit Exceeded

```json
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Retrieval limit exceeded for free tier (200/day)",
    "retry_after": 3600
  }
}
```

---

## Billing

Retrieval is **free** for:
- Collections you own
- Products you have subscription access to

Retrieval **costs credits** for:
- Pay-per-use marketplace products (price set by seller)

Cost headers are included in responses:
- `X-Ragora-Cost-USD`: Cost of this request
- `X-Ragora-Balance-Remaining-USD`: Your remaining balance
