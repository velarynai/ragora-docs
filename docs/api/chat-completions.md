---
title: "Chat Completions"
sidebar_label: "Chat Completions"
sidebar_position: 3
description: "RAG-augmented chat with OpenAI compatibility and agentic multi-step retrieval"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

RAG-augmented chat with OpenAI-compatible responses and optional session memory.

## Request

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `messages` | array | **Yes** | Conversation history in OpenAI format |
| `model` | string | No | OpenRouter model (defaults to org/platform model) |
| `stream` | boolean | No | Stream tokens via SSE (default: `false`) |
| `temperature` | number | No | Sampling temperature |
| `max_tokens` | integer | No | Max generated tokens |
| `top_k` | integer | No | Retrieval chunk count (default: `5`, max: `20`) |
| `collection_ids` | string[] | No | Collection scope (UUIDs/slugs) |
| `product_ids` | string[] | No | Legacy scope field |
| `mode` | string | No | `simple` or `agentic` |
| `session` | boolean | No | Stateful memory toggle (default: `false`) |
| `session_id` | string(UUID) | No | Existing session to continue |
| `system_prompt` | string | No | Agentic system prompt override |
| `metadata` | object | No | Request attribution metadata |

### Retrieval Filters

`source_type`, `source_name`, `version`, `version_mode`, `document_keys`, `custom_tags`, `domain`, `domain_filter_mode`, `filters`, `enable_reranker`, `graph_filter`, `temporal_filter`.

### Mode and Session Resolution

If `mode` is omitted, request is auto-routed to `agentic` when **any** of the following is present:

- `session=true`
- `session_id`
- `system_prompt`

Otherwise it runs as `simple`.

### Validation Rules (400)

- `session_id` must be a valid UUID.
- `session=false` with `session_id` is invalid.
- `mode="simple"` with any of `session`, `session_id`, or `system_prompt` is invalid.

## Response Behavior

### Non-Streaming

- OpenAI-compatible `chat.completion` response.
- `ragora.session_id` is returned only for **stateful agentic** calls.
- Stateless calls do not expose reusable session identifiers.

### Streaming (SSE)

Ragora sends standard token deltas plus Ragora events:

1. `ragora_metadata`
2. `ragora.step` (agent progress updates, optional)
3. `ragora_complete`
4. `data: [DONE]`

For stateful streams, `ragora_stats.conversation_id` is included in `ragora_metadata` and `ragora_complete`.

## Examples

### 1) Simple Chat

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

client = RagoraClient()

response = await client.chat(
    messages=[
        {"role": "user", "content": "Summarize the onboarding docs"},
    ],
    retrieval={"collection": "support-docs"},
)
print(response.choices[0].message.content)
print(f"Sources: {len(response.sources)}")
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient();

const response = await client.chat({
  messages: [
    { role: 'user', content: 'Summarize the onboarding docs' },
  ],
  retrieval: { collection: 'support-docs' },
});
console.log(response.choices[0].message.content);
console.log(`Sources: ${response.sources.length}`);
```

  </TabItem>
</Tabs>

### 2) Streaming Chat

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

client = RagoraClient()

async for chunk in client.chat_stream(
    messages=[{"role": "user", "content": "Explain the return policy"}],
    retrieval={"collection": "support-docs"},
):
    print(chunk.content, end="", flush=True)
    if chunk.thinking:
        print(f"\n[{chunk.thinking.type}] {chunk.thinking.message}")
    if chunk.sources:
        print(f"\nSources: {len(chunk.sources)}")
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient();

for await (const chunk of client.chatStream({
  messages: [{ role: 'user', content: 'Explain the return policy' }],
  retrieval: { collection: 'support-docs' },
})) {
  process.stdout.write(chunk.content);
  if (chunk.thinking) {
    console.log(`\n[${chunk.thinking.type}] ${chunk.thinking.message}`);
  }
  if (chunk.sources.length > 0) {
    console.log(`\nSources: ${chunk.sources.length}`);
  }
}
```

  </TabItem>
</Tabs>

### 3) Agentic Chat with Session

Setting `session=true` auto-routes to agentic mode. The response includes a `session_id` you can save for follow-up requests.

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

client = RagoraClient()

response = await client.chat(
    messages=[{"role": "user", "content": "Track my previous question context"}],
    retrieval={"collection": "support-docs"},
    agentic={"mode": "agentic", "session": True},
)
print(response.choices[0].message.content)

# Save the session ID for follow-up requests
session_id = response.ragora.session_id
print(f"Session ID: {session_id}")
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient();

const response = await client.chat({
  messages: [{ role: 'user', content: 'Track my previous question context' }],
  retrieval: { collection: 'support-docs' },
  agentic: { mode: 'agentic', session: true },
});
console.log(response.choices[0].message.content);

// Save the session ID for follow-up requests
const sessionId = response.ragora?.sessionId;
console.log(`Session ID: ${sessionId}`);
```

  </TabItem>
</Tabs>

### 4) Continue Existing Session

Pass a previously returned `session_id` to continue the conversation with full context.

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

client = RagoraClient()

# Use the session_id from a previous agentic response
response = await client.chat(
    messages=[{"role": "user", "content": "Now compare that with the enterprise plan"}],
    agentic={"session": True, "session_id": session_id},
)
print(response.choices[0].message.content)
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient();

// Use the sessionId from a previous agentic response
const followUp = await client.chat({
  messages: [{ role: 'user', content: 'Now compare that with the enterprise plan' }],
  agentic: { session: true, sessionId },
});
console.log(followUp.choices[0].message.content);
```

  </TabItem>
</Tabs>

### 5) Custom Model & Generation Options

Override the default model and fine-tune generation parameters per request.

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

client = RagoraClient()

response = await client.chat(
    messages=[
        {"role": "system", "content": "You are helpful."},
        {"role": "user", "content": "Summarize the onboarding docs"},
    ],
    generation={"model": "google/gemini-2.5-flash", "temperature": 0.7, "max_tokens": 1000},
    retrieval={"collection": "support-docs", "top_k": 5, "enable_reranker": True},
)
print(response.choices[0].message.content)
print(f"Sources: {len(response.sources)}")
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient();

const response = await client.chat({
  messages: [
    { role: 'system', content: 'You are helpful.' },
    { role: 'user', content: 'Summarize the onboarding docs' },
  ],
  generation: { model: 'google/gemini-2.5-flash', temperature: 0.7, maxTokens: 1000 },
  retrieval: { collection: 'support-docs', topK: 5, enableReranker: true },
});
console.log(response.choices[0].message.content);
console.log(`Sources: ${response.sources.length}`);
```

  </TabItem>
</Tabs>
