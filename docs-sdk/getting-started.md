---
title: Getting Started with Ragora SDKs
sidebar_label: Getting Started
sidebar_position: 1
description: Official SDKs for the Ragora RAG API
---

Ragora provides official SDKs for Python and TypeScript/Node.js to interact with the Ragora API.

## Choose Your Language

| SDK | Package | Install |
|-----|---------|---------|
| **Python** | [`ragora-sdk`](https://pypi.org/project/ragora-sdk/) | `pip install ragora-sdk` |
| **TypeScript** | [`ragora`](https://www.npmjs.com/package/ragora) | `npm install ragora` |

Both SDKs provide the same feature set:

- **Collections** — Create and manage knowledge workspaces
- **Documents** — Upload files, URLs, and text
- **Search** — Hybrid semantic + keyword retrieval
- **Chat** — RAG-augmented chat completions (OpenAI-compatible)
- **Agents** — Multi-step retrieval with agentic chat
- **Marketplace** — Browse and purchase knowledge products

## Authentication

All SDKs authenticate via API key. Get yours from [Settings > API Keys](https://ragora.app/settings?tab=developer).

```python
# Python
from ragora import RagoraClient
client = RagoraClient(api_key="your-api-key")
```

```typescript
// TypeScript
import { RagoraClient } from 'ragora';
const client = new RagoraClient({ apiKey: 'your-api-key' });
```

## Next Steps

- [Python SDK →](./python/installation)
- [TypeScript SDK →](./typescript/installation)
- [API Reference →](/docs/api/overview)
