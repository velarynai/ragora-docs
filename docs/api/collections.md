---
title: "Collections"
sidebar_label: "Collections"
sidebar_position: 5
description: "Create and manage workspaces"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Create and manage workspace collections.

## Overview

Collections are containers for your documents. Each collection is a separate searchable workspace with its own documents, settings, and access controls.

---

## Create Collection

Create a new collection.

### Parameters

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

### Example

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

client = RagoraClient()

collection = await client.create_collection(
    name="Product Documentation",
    description="All product manuals and user guides",
    slug="product-docs",
)
print(f"Created: {collection.id}")
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient();

const collection = await client.createCollection({
  name: 'Product Documentation',
  description: 'All product manuals and user guides',
  slug: 'product-docs',
});
console.log(`Created: ${collection.id}`);
```

  </TabItem>
</Tabs>

---

## List Collections

List all collections you have access to.

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

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

client = RagoraClient()

collections = await client.list_collections(limit=50, offset=0, search="docs")
for c in collections.data:
    print(f"{c.name} - {c.total_documents} docs")
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient();

const collections = await client.listCollections({ limit: 50, offset: 0, search: 'docs' });
collections.data.forEach(c => console.log(`${c.name} - ${c.totalDocuments} docs`));
```

  </TabItem>
</Tabs>

---

## Get Collection

Get details of a specific collection.

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

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

client = RagoraClient()

collection = await client.get_collection("product-docs")
print(f"{collection.name} - {collection.total_documents} documents")
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient();

const collection = await client.getCollection('product-docs');
console.log(`${collection.name} - ${collection.totalDocuments} documents`);
```

  </TabItem>
</Tabs>

---

## Update Collection

Update collection metadata.

### Parameters

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | New collection name |
| `slug` | string | New URL-friendly identifier |
| `description` | string | New description |
| `capability_config` | object | MCP tool configuration (JSON) |

### Response (200)

Returns the updated collection object.

### Example

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

client = RagoraClient()

updated = await client.update_collection(
    "coll_abc123",
    name="Product Documentation v2",
    description="Updated documentation for version 2.0",
)
print(f"Updated: {updated.name}")
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient();

const updated = await client.updateCollection('coll_abc123', {
  name: 'Product Documentation v2',
  description: 'Updated documentation for version 2.0',
});
console.log(`Updated: ${updated.name}`);
```

  </TabItem>
</Tabs>

---

## Delete Collection

Delete a collection and all its documents.

**Warning:** This permanently deletes all documents and chunks in the collection.

### Response (204)

No content.

### Example

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

client = RagoraClient()

await client.delete_collection("coll_abc123")
print("Collection deleted")
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient();

await client.deleteCollection('coll_abc123');
console.log('Collection deleted');
```

  </TabItem>
</Tabs>

---

## Get Collection Statistics

Get detailed statistics about a collection.

:::note
This endpoint is available via the REST API. There is no dedicated SDK method at this time.
:::

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

:::note
This endpoint is available via the REST API. There is no dedicated SDK method at this time.
:::

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

:::note
This endpoint is available via the REST API. There is no dedicated SDK method at this time.
:::

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

:::note
Analytics endpoints are available via the REST API. There are no dedicated SDK methods at this time.
:::

### Chunk Analytics

See which chunks are most frequently retrieved:

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

<Tabs>
  <TabItem value="python" label="Python" default>

```python
import asyncio
from ragora import RagoraClient

async def main():
    client = RagoraClient()

    # 1. Create a collection
    collection = await client.create_collection(
        name="My Workspace",
        description="Product documentation and guides",
    )
    print(f"Created: {collection.id}")

    # 2. Upload a document
    doc = await client.upload_document(
        collection_id=collection.id,
        file_path="document.pdf",
    )
    print(f"Uploaded: {doc.id}")

    # 3. Wait for processing
    await client.wait_for_document(doc.id)
    print("Processing complete")

    # 4. Search the collection
    results = await client.retrieve(
        query="What is the main topic?",
        collection_ids=[collection.id],
    )
    for result in results.results:
        print(f"[{result.score:.2f}] {result.text[:100]}...")

asyncio.run(main())
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient();

// 1. Create a collection
const collection = await client.createCollection({
  name: 'My Workspace',
  description: 'Product documentation and guides',
});
console.log(`Created: ${collection.id}`);

// 2. Upload a document
const doc = await client.uploadDocument({
  collectionId: collection.id,
  filePath: 'document.pdf',
});
console.log(`Uploaded: ${doc.id}`);

// 3. Wait for processing
await client.waitForDocument(doc.id);
console.log('Processing complete');

// 4. Search the collection
const results = await client.retrieve({
  query: 'What is the main topic?',
  collectionIds: [collection.id],
});
results.results.forEach(r => {
  console.log(`[${r.score.toFixed(2)}] ${r.text.slice(0, 100)}...`);
});
```

  </TabItem>
</Tabs>

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
