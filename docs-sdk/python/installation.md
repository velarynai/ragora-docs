---
title: Python SDK Installation
sidebar_label: Installation
sidebar_position: 1
description: Install and configure the Ragora Python SDK
---

# Python SDK Installation

The Ragora Python SDK is an async-first client built on `httpx` with full type hints via Pydantic models.

## Requirements

- Python 3.10 or later

## Install

```bash
pip install ragora-sdk
```

Or with uv:

```bash
uv add ragora-sdk
```

## Quick Start

```python
import asyncio
from ragora import RagoraClient

async def main():
    client = RagoraClient(api_key="your-api-key")

    # Create a collection
    collection = await client.create_collection(
        name="My Knowledge Base",
        description="Documentation and guides"
    )
    print(f"Created collection: {collection.id}")

    # Upload a document
    upload = await client.upload_file(
        file_path="./document.pdf",
        collection_id=collection.id
    )
    print(f"Uploaded: {upload.filename} (ID: {upload.id})")

    # Wait for processing to complete
    status = await client.wait_for_document(upload.id)
    print(f"Processing complete: {status.vector_count} vectors created")

    # Search the collection
    results = await client.search(
        collection_id=collection.id,
        query="How do I get started?",
        top_k=5
    )
    for result in results.results:
        print(f"Score: {result.score:.3f} - {result.content[:100]}...")

    # Chat with your knowledge base
    response = await client.chat(
        messages=[{"role": "user", "content": "Summarize the main concepts"}],
        retrieval={"collection_id": collection.id},
    )
    print(response.choices[0].message.content)

if __name__ == "__main__":
    asyncio.run(main())
```

## Client Initialization

```python
from ragora import RagoraClient

# Basic usage
client = RagoraClient(api_key="your-api-key")

# With custom settings
client = RagoraClient(
    api_key="your-api-key",
    base_url="https://api.ragora.app",  # default
    timeout=30.0  # seconds
)

# Using as async context manager
async with RagoraClient(api_key="your-api-key") as client:
    results = await client.search(...)
```

## Environment Variable

You can set your API key as an environment variable instead of passing it directly:

```bash
export RAGORA_API_KEY="your-api-key"
```

## Features

- **Async-first** — Built on `httpx` for high-performance async operations
- **Full type hints** — Pydantic models with complete type coverage
- **Streaming support** — Real-time chat completions with async iterators
- **Document management** — Upload, track progress, and manage documents
- **Collection CRUD** — Create, update, delete, and list collections
- **Cost tracking** — Monitor API costs per request
- **Rate limit handling** — Access rate limit info from response metadata

## Next Steps

- [Usage Guide →](./usage)
