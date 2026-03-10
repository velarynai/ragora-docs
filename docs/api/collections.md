---
title: "Collections"
sidebar_label: "Collections"
sidebar_position: 5
description: "Create and manage workspaces"
---

Create and manage workspace collections.

## Overview

Collections are containers for your documents. Each collection is a separate searchable workspace with its own documents, settings, and access controls.

---

## Create Collection

Create a new collection.

```
POST /v1/collections
```

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes | `Bearer sk_live_xxx` |
| `Content-Type` | Yes | `application/json` |

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | **Yes** | Collection name (1-255 characters) |
| `slug` | string | No | URL-friendly identifier (auto-generated if omitted) |
| `description` | string | No | Description of the collection's contents |

### Response (201)

```json
{
  "object": "collection",
  "data": {
    "id": "coll_abc123",
    "owner_id": "user_xyz789",
    "name": "Product Documentation",
    "slug": "product-docs",
    "description": "All product manuals and user guides",
    "total_documents": 0,
    "total_vectors": 0,
    "total_chunks": 0,
    "total_size_bytes": 0,
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### Example: cURL

```bash
curl -X POST https://api.ragora.app/v1/collections \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Documentation",
    "slug": "product-docs",
    "description": "All product manuals and user guides"
  }'
```

### Example: Python

```python
import requests

def create_collection(name: str, description: str = None):
    response = requests.post(
        "https://api.ragora.app/v1/collections",
        headers={
            "Authorization": "Bearer sk_live_xxx",
            "Content-Type": "application/json"
        },
        json={
            "name": name,
            "description": description
        }
    )
    response.raise_for_status()
    return response.json()

collection = create_collection("Support Articles", "Customer support workspace")
print(f"Created collection: {collection['id']}")
```

---

## List Collections

List all collections you have access to.

```
GET /v1/collections
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | integer | 20 | Results per page (max 100) |
| `offset` | integer | 0 | Number of results to skip |
| `search` | string | - | Search term for collection names |

### Response (200)

```json
{
  "object": "list",
  "data": [
    {
      "id": "coll_abc123",
      "owner_id": "user_xyz789",
      "name": "Product Documentation",
      "slug": "product-docs",
      "description": "All product manuals and user guides",
      "total_documents": 42,
      "total_chunks": 3500,
      "total_size_bytes": 125000000,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-20T14:15:00Z",
      "product": {
        "id": "prod_123",
        "title": "Product Docs",
        "status": "active"
      }
    }
  ],
  "total": 2,
  "limit": 20,
  "offset": 0,
  "hasMore": false
}
```

### Example

```bash
curl "https://api.ragora.app/v1/collections?limit=50" \
  -H "Authorization: Bearer sk_live_xxx"
```

---

## Get Collection

Get details of a specific collection.

```
GET /v1/collections/{id}
```

The `{id}` can be either the collection ID (`coll_abc123`) or slug (`product-docs`).

### Response (200)

```json
{
  "id": "coll_abc123",
  "owner_id": "user_xyz789",
  "name": "Product Documentation",
  "slug": "product-docs",
  "description": "All product manuals and user guides",
  "total_documents": 42,
  "total_vectors": 3500,
  "total_chunks": 3500,
  "total_size_bytes": 125000000,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:15:00Z",
  "product": {
    "id": "prod_123",
    "title": "Product Docs",
    "status": "active"
  }
}
```

### Example

```bash
curl "https://api.ragora.app/v1/collections/product-docs" \
  -H "Authorization: Bearer sk_live_xxx"
```

---

## Update Collection

Update collection metadata.

```
PATCH /v1/collections/{id}
```

### Request Body

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | New collection name |
| `slug` | string | New URL-friendly identifier |
| `description` | string | New description |
| `capability_config` | object | MCP tool configuration (JSON) |

### Response (200)

Returns the updated collection object.

### Example

```bash
curl -X PATCH "https://api.ragora.app/v1/collections/coll_abc123" \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Documentation v2",
    "description": "Updated documentation for version 2.0"
  }'
```

---

## Delete Collection

Delete a collection and all its documents.

```
DELETE /v1/collections/{id}
```

**Warning:** This permanently deletes all documents and chunks in the collection.

### Response (204)

No content.

### Example

```bash
curl -X DELETE "https://api.ragora.app/v1/collections/coll_abc123" \
  -H "Authorization: Bearer sk_live_xxx"
```

---

## Get Collection Statistics

Get detailed statistics about a collection.

```
GET /v1/collections/{id}/stats
```

### Response (200)

```json
{
  "object": "collection_stats",
  "collection": {
    "id": "coll_abc123",
    "name": "Product Documentation",
    "total_documents": 42,
    "total_vectors": 3500,
    "total_chunks": 3500,
    "total_size_bytes": 125000000
  },
  "documents_by_status": {
    "completed": 40,
    "processing": 1,
    "failed": 1,
    "unsupported": 0,
    "pending": 0
  },
  "product": {
    "id": "prod_xyz789",
    "title": "Product Documentation",
    "status": "active",
    "review_count": 12,
    "access_count": 5
  }
}
```

---

## Delete Failed Files

Delete all failed documents in a collection.

```
DELETE /v1/collections/{id}/failed-files
```

### Response (200)

```json
{
  "deleted_count": 3,
  "message": "Deleted 3 failed documents"
}
```

---

## Delete Unsupported Files

Delete all documents with unsupported file types.

```
DELETE /v1/collections/{id}/unsupported-files
```

### Response (200)

```json
{
  "deleted_count": 2,
  "message": "Deleted 2 unsupported documents"
}
```

---

## Collection Analytics

Get analytics for a collection. The `{id}` can be a collection ID, slug, or `all` to aggregate across all your collections.

### Chunk Analytics

See which chunks are most frequently retrieved:

```
GET /v1/collections/{id}/analytics/chunks
```

### Response (200)

```json
{
  "collection_id": "coll_abc123",
  "period": "30_days",
  "chunks": [
    {
      "chunk_id": "chunk_001",
      "access_count": 142,
      "avg_relevance_score": 0.87,
      "last_accessed_at": "2024-01-22T15:30:00Z"
    }
  ]
}
```

Returns top 50 most accessed chunks over the past 30 days.

### File Analytics

See which files are most accessed:

```
GET /v1/collections/{id}/analytics/files
```

### Response (200)

```json
{
  "collection_id": "coll_abc123",
  "period": "30_days",
  "files": [
    {
      "file_id": "doc_abc123",
      "filename": "api-reference.pdf",
      "access_count": 523,
      "unique_chunks": 45,
      "last_accessed_at": "2024-01-22T16:45:00Z"
    }
  ]
}
```

Returns top 50 most accessed files over the past 30 days.

### Query Analytics

See search patterns and top queries:

```
GET /v1/collections/{id}/analytics/queries
```

### Response (200)

```json
{
  "collection_id": "coll_abc123",
  "period": "30_days",
  "stats": {
    "total_queries": 15420,
    "unique_users": 42,
    "avg_top_score": 0.82,
    "missed_queries": 15,
    "avg_latency_ms": 245.3,
    "hit_rate": 98.78,
    "mrr": 0.92,
    "avg_chunks_per_query": 3.5,
    "avg_retrieval_latency_ms": 180.5
  },
  "top_queries": [
    {"query_text": "how to reset password", "count": 234},
    {"query_text": "pricing plans", "count": 189},
    {"query_text": "api rate limits", "count": 156}
  ]
}
```

| Metric | Description |
|--------|-------------|
| `hit_rate` | Percentage of queries that returned results (0-100) |
| `mrr` | Mean Reciprocal Rank - ranking quality metric (0-1) |
| `avg_chunks_per_query` | Average context coverage per query |
| `avg_retrieval_latency_ms` | Retrieval-only timing |

### Graph Analytics

Get GraphRAG statistics for entity-enhanced search:

```
GET /v1/collections/{id}/analytics/graph
```

### Response (200)

```json
{
  "collection_id": "coll_abc123",
  "period": "30_days",
  "stats": {
    "total_graph_queries": 42,
    "avg_matched_files": 2.3,
    "avg_matched_chunks": 5.8,
    "avg_graph_filter_latency_ms": 23.5
  }
}
```

---

## Examples

### Complete Workflow

```python
import requests

API_KEY = "sk_live_xxx"
BASE_URL = "https://api.ragora.app/v1"
HEADERS = {"Authorization": f"Bearer {API_KEY}"}

# 1. Create a collection
collection = requests.post(
    f"{BASE_URL}/collections",
    headers={**HEADERS, "Content-Type": "application/json"},
    json={"name": "My Workspace"}
).json()

print(f"Created: {collection['id']}")

# 2. Upload documents
with open("document.pdf", "rb") as f:
    doc = requests.post(
        f"{BASE_URL}/documents",
        headers=HEADERS,
        files={"file": f},
        data={"collection_id": collection["id"]}
    ).json()

print(f"Uploaded: {doc['id']}")

# 3. Wait for processing
import time
while True:
    status = requests.get(
        f"{BASE_URL}/documents/{doc['id']}/status",
        headers=HEADERS
    ).json()

    if status["status"] == "completed":
        break
    if status["status"] == "failed":
        raise Exception(status["error"])

    time.sleep(2)

# 4. Search the collection
results = requests.post(
    f"{BASE_URL}/retrieve",
    headers={**HEADERS, "Content-Type": "application/json"},
    json={
        "query": "What is the main topic?",
        "collection_ids": [collection["id"]]
    }
).json()

for result in results["results"]:
    print(f"[{result['score']:.2f}] {result['text'][:100]}...")
```

---

## Error Responses

### 404 Not Found

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Collection not found"
  }
}
```

### 403 Forbidden

```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "You do not have access to this collection"
  }
}
```

### 409 Conflict

```json
{
  "error": {
    "code": "DUPLICATE_RESOURCE",
    "message": "A collection with this slug already exists"
  }
}
```
