---
title: "Documents"
sidebar_label: "Documents"
sidebar_position: 4
description: "Upload and manage documents"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Upload, manage, and monitor document processing.

## Overview

The Documents API lets you upload files, track processing status, manage versions, and retrieve transcripts. Documents are automatically chunked, embedded, and indexed for search.

---

## Upload Document

Upload a file for processing and indexing.

### Upload Options

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | file | **Yes** | The file to upload |
| `collection_id` | string | No | Target collection ID or slug (uses default if omitted) |
| `relative_path` | string | No | Full path for folder uploads (e.g., `docs/guides/README.md`) |
| `domain` | string | No | Document domain for optimized chunking |
| `scan_mode` | string | No | PDF extraction mode: `fast` or `hi_res` |
| `source_type` | string | No | Source classification (e.g., `api_docs`, `web_page`) |
| `source_name` | string | No | Source identifier (e.g., `stripe`, `nextjs`) |
| `version` | string | No | Version label for the document |
| `custom_tags` | string | No | JSON array of tags (e.g., `["guide", "v2.0"]`) |
| `metadata` | string | No | JSON object of custom metadata |

### Domain Types

| Domain | Description |
|--------|-------------|
| `general` | Default for most documents |
| `software_docs` | Technical documentation, READMEs |
| `code` | Source code files |
| `transcript` | Meeting notes, interviews |
| `legal` | Contracts, policies |
| `medical` | Clinical notes, research |
| `financial` | Reports, statements |
| `chat` | Discord, Slack, Telegram exports |

### Response (201)

```json
{
  "object": "document",
  "id": "doc_abc123",
  "collection_id": "coll_xyz789",
  "collection_slug": "my-docs",
  "collection_name": "My Documentation",
  "status": "processing",
  "file_name": "user-guide.pdf",
  "file_size": 2457600
}
```

If uploading a duplicate filename, the response indicates replacement:

```json
{
  "object": "document",
  "id": "doc_new456",
  "is_replacement": true,
  "replaced_file_id": "doc_abc123",
  "version_number": 2,
  "message": "File replaced. New version created."
}
```

### Example

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

client = RagoraClient(api_key="sk_live_xxx")

# Upload from file path
upload = await client.upload_file(
    file_path="./user-guide.pdf",
    collection="docs",
    domain="software_docs",
    custom_tags=["guide", "v2.0"],
    scan_mode="fast",
)
print(f"Uploaded: {upload.id} - Status: {upload.status}")

# Or upload from bytes
upload = await client.upload_document(
    file_content=open("user-guide.pdf", "rb").read(),
    filename="user-guide.pdf",
    collection="docs",
    domain="software_docs",
)
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';
import { readFileSync } from 'fs';

const client = new RagoraClient({ apiKey: 'sk_live_xxx' });

// Upload from file path (Node.js)
const upload = await client.uploadFile('./user-guide.pdf', 'docs');

// Or upload from buffer with options
const upload = await client.uploadDocument({
  file: readFileSync('./user-guide.pdf'),
  filename: 'user-guide.pdf',
  collection: 'docs',
  domain: 'software_docs',
  customTags: ['guide', 'v2.0'],
  scanMode: 'fast',
});
console.log(`Uploaded: ${upload.id} - Status: ${upload.status}`);
```

  </TabItem>
</Tabs>

---

## List Documents

List documents in a collection.

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `collection_id` | string | - | Collection ID or slug |
| `limit` | integer | 10 | Results per page (max 100) |
| `offset` | integer | 0 | Number of results to skip |
| `status` | string | - | Filter by status: `pending`, `uploading`, `processing`, `retrying`, `completed`, `failed`, `unsupported` |

### Response (200)

```json
{
  "object": "list",
  "data": [
    {
      "id": "doc_abc123",
      "filename": "user-guide.pdf",
      "collection_id": "coll_xyz789",
      "status": "completed",
      "size_bytes": 2457600,
      "source_type": "upload",
      "created_at": "2024-01-15T10:30:00Z",
      "completed_at": "2024-01-15T10:32:15Z",
      "chunk_count": 85
    }
  ],
  "has_more": true,
  "total": 142
}
```

### Example

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

client = RagoraClient(api_key="sk_live_xxx")

docs = await client.list_documents(collection="docs", limit=20, offset=0)
for doc in docs.data:
    print(f"{doc.filename} - {doc.status}")
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient({ apiKey: 'sk_live_xxx' });

const docs = await client.listDocuments({ collection: 'docs', limit: 20, offset: 0 });
docs.data.forEach(doc => console.log(`${doc.filename} - ${doc.status}`));
```

  </TabItem>
</Tabs>

---

## Get Document Status

Check processing status of a document.

### Response (200)

```json
{
  "id": "doc_abc123",
  "status": "processing",
  "progress_percent": 65.5,
  "chunks_created": 55,
  "error": null,
  "completed_at": null
}
```

### Status Values

| Status | Description |
|--------|-------------|
| `pending` | Queued for processing |
| `uploading` | File is being uploaded to storage |
| `processing` | Currently being processed |
| `retrying` | Processing failed, automatically retrying |
| `completed` | Successfully indexed |
| `failed` | Processing failed (see `error` field) |
| `unsupported` | File type is not supported |

### Example

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

client = RagoraClient(api_key="sk_live_xxx")

status = await client.get_document_status("doc_abc123")
print(f"Status: {status.status}, Progress: {status.progress_percent}%")
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient({ apiKey: 'sk_live_xxx' });

const status = await client.getDocumentStatus('doc_abc123');
console.log(`Status: ${status.status}, Progress: ${status.progressPercent}%`);
```

  </TabItem>
</Tabs>

---

## Stream Progress (SSE)

Stream real-time processing updates via Server-Sent Events.

### Response

```
event: progress
data: {"chunks": 42, "percent": 50.5}

event: progress
data: {"chunks": 65, "percent": 76.5}

event: complete
data: {"chunks": 85, "status": "completed"}
```

### Example

The SDK provides `wait_for_document` / `waitForDocument`, which automatically polls for completion. For most use cases, this is simpler than consuming the SSE stream directly.

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

client = RagoraClient(api_key="sk_live_xxx")

# Upload and wait for processing in one flow
upload = await client.upload_file(
    file_path="./user-guide.pdf",
    collection="docs",
)

# Blocks until processing completes or times out
status = await client.wait_for_document(
    upload.id,
    timeout=300.0,
    poll_interval=2.0,
)
print(f"Status: {status.status}, Vectors: {status.vector_count}, Chunks: {status.chunk_count}")
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient({ apiKey: 'sk_live_xxx' });

// Upload and wait for processing in one flow
const upload = await client.uploadFile('./user-guide.pdf', 'docs');

// Blocks until processing completes or times out
const status = await client.waitForDocument(upload.id, {
  timeout: 300000,
  pollInterval: 2000,
});
console.log(`Status: ${status.status}, Vectors: ${status.vectorCount}, Chunks: ${status.chunkCount}`);
```

  </TabItem>
</Tabs>

:::tip
The raw SSE endpoint (`GET /v1/documents/{id}/progress`) is still available for custom implementations that need granular real-time updates. See the endpoint details above for the event format.
:::

---

## Get Transcript

Get extracted text from a document (useful for audio/video).

### Response (200)

```json
{
  "text": "Welcome to our product demo. Today we'll be showing you...",
  "language": "en",
  "word_count": 4521,
  "duration_seconds": 1820
}
```

### Example

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

client = RagoraClient(api_key="sk_live_xxx")

transcript = await client.get_transcript("doc_abc123")
print(f"Language: {transcript.language}, Words: {transcript.word_count}")
print(transcript.text)
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient({ apiKey: 'sk_live_xxx' });

const transcript = await client.getTranscript('doc_abc123');
console.log(`Language: ${transcript.language}, Words: ${transcript.wordCount}`);
console.log(transcript.text);
```

  </TabItem>
</Tabs>

---

## Download Document

Download the original uploaded file.

### Example

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

client = RagoraClient(api_key="sk_live_xxx")

content = await client.download_document("doc_abc123")
with open("downloaded-file.pdf", "wb") as f:
    f.write(content)
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';
import { writeFileSync } from 'fs';

const client = new RagoraClient({ apiKey: 'sk_live_xxx' });

const content = await client.downloadDocument('doc_abc123');
writeFileSync('downloaded-file.pdf', Buffer.from(content));
```

  </TabItem>
</Tabs>

---

## Delete Document

Remove a document and its associated chunks.

### Response (204)

No content.

### Example

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

client = RagoraClient(api_key="sk_live_xxx")

await client.delete_document("doc_abc123")
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient({ apiKey: 'sk_live_xxx' });

await client.deleteDocument('doc_abc123');
```

  </TabItem>
</Tabs>

---

## Retry Failed Document

Retry processing of a failed document.

:::note
This endpoint is available via the REST API. There is no dedicated SDK method at this time.
:::

### Response (200)

```json
{
  "id": "doc_abc123",
  "status": "processing",
  "message": "Retry initiated"
}
```

---

## Document Versions

Ragora tracks document versions when you re-upload files.

### List Versions

:::note
Version management is available via the REST API. There are no dedicated SDK methods for these endpoints at this time.
:::

### Response (200)

```json
{
  "data": [
    {
      "id": "ver_001",
      "version": 3,
      "created_at": "2024-01-20T14:00:00Z",
      "status": "active",
      "chunk_count": 92
    },
    {
      "id": "ver_002",
      "version": 2,
      "created_at": "2024-01-15T10:00:00Z",
      "status": "archived",
      "chunk_count": 85
    }
  ]
}
```

### Replace Document

Upload a new version of an existing document. Uses the same form fields as the upload endpoint.

### Rollback Version

Restore a previous version.

### Response (200)

```json
{
  "id": "doc_abc123",
  "version": 2,
  "status": "active",
  "message": "Rolled back to version 2"
}
```

### Purge Old Versions

Delete all old versions, keeping only the current one.

---

## Import from URL

Import content from a web page.

```
POST /v1/documents/html
```

### Request Body

```json
{
  "url": "https://example.com/docs/getting-started",
  "collection_id": "web-content"
}
```

### Response (201)

```json
{
  "id": "doc_web123",
  "filename": "getting-started",
  "source_type": "html",
  "status": "processing"
}
```

:::note
URL import is available via the REST API. There is no dedicated SDK method for this endpoint at this time.
:::

---

## Import YouTube Video

Import and transcribe a YouTube video.

```
POST /v1/documents/youtube
```

### Request Body

```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "collection_id": "video-content"
}
```

### Response (201)

```json
{
  "id": "doc_yt123",
  "filename": "Video Title",
  "source_type": "youtube",
  "status": "processing",
  "duration_seconds": 212
}
```

:::note
YouTube import is available via the REST API. There is no dedicated SDK method for this endpoint at this time.
:::

---

## Supported File Types

Ragora supports 50+ file types:

| Category | Extensions |
|----------|------------|
| Documents | `.pdf`, `.doc`, `.docx`, `.txt`, `.rtf`, `.odt` |
| Spreadsheets | `.xls`, `.xlsx`, `.csv`, `.ods` |
| Presentations | `.ppt`, `.pptx`, `.odp` |
| Code | `.py`, `.js`, `.ts`, `.go`, `.rs`, `.java`, `.cpp`, `.c`, `.rb`, `.php` |
| Markup | `.md`, `.html`, `.xml`, `.json`, `.yaml` |
| Images | `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp` (OCR) |
| Audio | `.mp3`, `.wav`, `.m4a`, `.ogg`, `.flac` |
| Video | `.mp4`, `.mov`, `.avi`, `.webm`, `.mkv` |

---

## Error Responses

### 409 Conflict (Duplicate)

```json
{
  "error": {
    "code": "DUPLICATE_RESOURCE",
    "message": "This file has already been uploaded"
  }
}
```

### 402 Payment Required

```json
{
  "error": {
    "code": "QUOTA_EXCEEDED",
    "message": "Document limit exceeded. Upgrade at https://ragora.app/billing"
  }
}
```

### 413 Payload Too Large

```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "File exceeds maximum size of 100MB"
  }
}
```

### 415 Unsupported Media Type

```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "File type .xyz is not supported"
  }
}
```
