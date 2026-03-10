---
title: "Chat Completions"
sidebar_label: "Chat Completions"
sidebar_position: 3
description: "RAG-augmented chat with OpenAI compatibility and agentic multi-step retrieval"
---

RAG-augmented chat with OpenAI-compatible responses and optional session memory.

## Endpoint

```
POST /v1/chat/completions
```

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes | `Bearer sk_live_xxx` |
| `Content-Type` | Yes | `application/json` |

### Body Parameters

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

### 1) Stateless Simple Chat

```bash
curl -X POST https://api.ragora.app/v1/chat/completions \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Summarize the onboarding docs"}
    ],
    "collection_ids": ["support-docs"]
  }'
```

### 2) Stateful Agentic Chat (auto-agentic via `session=true`)

```bash
curl -X POST https://api.ragora.app/v1/chat/completions \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Track my previous question context"}
    ],
    "collection_ids": ["support-docs"],
    "session": true
  }'
```

### 3) Continue Existing Session

```bash
curl -X POST https://api.ragora.app/v1/chat/completions \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Now compare that with the enterprise plan"}
    ],
    "session_id": "4fe10c93-c5e2-4f07-bf03-b7835f4a130f"
  }'
```

### 4) Invalid Combination (`mode=simple` + `session`)

```bash
curl -X POST https://api.ragora.app/v1/chat/completions \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "simple",
    "session": false,
    "messages": [
      {"role": "user", "content": "hello"}
    ]
  }'
```

Expected error:

```json
{
  "error": {
    "code": "invalid_request",
    "message": "mode \"simple\" cannot be used with session, session_id, or system_prompt"
  }
}
```

### 5) Invalid Combination (`session=false` + `session_id`)

Expected error:

```json
{
  "error": {
    "code": "invalid_request",
    "message": "session cannot be false when session_id is provided"
  }
}
```
