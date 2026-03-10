---
title: "Documents"
sidebar_label: "Documents"
sidebar_position: 4
description: "Upload and manage documents"
---

Upload, manage, and monitor document processing.

## Overview

The Documents API lets you upload files, track processing status, manage versions, and retrieve transcripts. Documents are automatically chunked, embedded, and indexed for search.

---

## Upload Document

Upload a file for processing and indexing.

```
POST /v1/documents
```

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes | `Bearer sk_live_xxx` |
| `Content-Type` | Yes | `multipart/form-data` |

### Form Fields

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

### Example: cURL

```bash
curl -X POST https://api.ragora.app/v1/documents \
  -H "Authorization: Bearer sk_live_xxx" \
  -F "file=@user-guide.pdf" \
  -F "collection_id=docs" \
  -F "domain=software_docs" \
  -F "custom_tags=guide,v2.0"
```

### Example: Python

```python
import requests

def upload_document(file_path: str, collection_id: str):
    with open(file_path, "rb") as f:
        response = requests.post(
            "https://api.ragora.app/v1/documents",
            headers={"Authorization": "Bearer sk_live_xxx"},
            files={"file": f},
            data={
                "collection_id": collection_id,
                "domain": "software_docs"
            }
        )
    response.raise_for_status()
    return response.json()

doc = upload_document("user-guide.pdf", "docs")
print(f"Uploaded: {doc['id']} - Status: {doc['status']}")
```

### Example: JavaScript

```javascript
async function uploadDocument(file, collectionId) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("collection_id", collectionId);

  const response = await fetch("https://api.ragora.app/v1/documents", {
    method: "POST",
    headers: {
      "Authorization": "Bearer sk_live_xxx"
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status}`);
  }

  return response.json();
}
```

---

## List Documents

List documents in a collection.

```
GET /v1/documents
```

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

```bash
curl "https://api.ragora.app/v1/documents?collection_id=docs&limit=20" \
  -H "Authorization: Bearer sk_live_xxx"
```

---

## Get Document Status

Check processing status of a document.

```
GET /v1/documents/{id}/status
```

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

### Example: Polling

```python
import time
import requests

def wait_for_processing(doc_id: str, timeout: int = 300):
    start = time.time()
    while time.time() - start < timeout:
        response = requests.get(
            f"https://api.ragora.app/v1/documents/{doc_id}/status",
            headers={"Authorization": "Bearer sk_live_xxx"}
        )
        data = response.json()

        if data["status"] == "completed":
            return data
        if data["status"] == "failed":
            raise Exception(f"Processing failed: {data['error']}")

        print(f"Progress: {data['progress_percent']:.1f}%")
        time.sleep(2)

    raise TimeoutError("Processing timed out")

status = wait_for_processing("doc_abc123")
print(f"Done! Created {status['chunks_created']} chunks")
```

---

## Stream Progress (SSE)

Stream real-time processing updates via Server-Sent Events.

```
GET /v1/documents/{id}/progress
```

### Response

```
event: progress
data: {"chunks": 42, "percent": 50.5}

event: progress
data: {"chunks": 65, "percent": 76.5}

event: complete
data: {"chunks": 85, "status": "completed"}
```

### Example: JavaScript

```javascript
function watchProgress(docId, onProgress, onComplete) {
  const eventSource = new EventSource(
    `https://api.ragora.app/v1/documents/${docId}/progress`,
    {
      headers: { "Authorization": "Bearer sk_live_xxx" }
    }
  );

  eventSource.addEventListener("progress", (e) => {
    const data = JSON.parse(e.data);
    onProgress(data.percent, data.chunks);
  });

  eventSource.addEventListener("complete", (e) => {
    const data = JSON.parse(e.data);
    onComplete(data);
    eventSource.close();
  });

  eventSource.addEventListener("error", (e) => {
    console.error("Stream error:", e);
    eventSource.close();
  });

  return eventSource;
}

// Usage
watchProgress(
  "doc_abc123",
  (percent, chunks) => console.log(`${percent}% - ${chunks} chunks`),
  (data) => console.log("Complete!", data)
);
```

---

## Get Transcript

Get extracted text from a document (useful for audio/video).

```
GET /v1/documents/{id}/transcript
```

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

```bash
curl "https://api.ragora.app/v1/documents/doc_abc123/transcript" \
  -H "Authorization: Bearer sk_live_xxx"
```

---

## Download Document

Download the original uploaded file.

```
GET /v1/documents/{id}/download
```

### Response

Binary file with appropriate `Content-Type` and `Content-Disposition` headers.

### Example

```bash
curl "https://api.ragora.app/v1/documents/doc_abc123/download" \
  -H "Authorization: Bearer sk_live_xxx" \
  -o downloaded-file.pdf
```

---

## Delete Document

Remove a document and its associated chunks.

```
DELETE /v1/documents/{id}
```

### Response (204)

No content.

### Example

```bash
curl -X DELETE "https://api.ragora.app/v1/documents/doc_abc123" \
  -H "Authorization: Bearer sk_live_xxx"
```

---

## Retry Failed Document

Retry processing of a failed document.

```
POST /v1/documents/{id}/retry
```

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

```
GET /v1/documents/{id}/versions
```

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

Upload a new version of an existing document:

```
PUT /v1/documents/{id}
```

Uses the same form fields as the upload endpoint.

### Rollback Version

Restore a previous version:

```
POST /v1/documents/{id}/rollback/{version}
```

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

Delete all old versions, keeping only the current one:

```
POST /v1/documents/{id}/purge
```

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
