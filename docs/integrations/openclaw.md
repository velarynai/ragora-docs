---
title: "OpenClaw"
sidebar_label: "OpenClaw"
sidebar_position: 3
description: "Give your self-hosted AI agent access to Ragora workspaces"
---

Connect OpenClaw to your Ragora workspaces so your autonomous agent can search, retrieve, and reason over your data.

## What is OpenClaw?

OpenClaw (formerly Clawdbot/Moltbot) is an open-source, self-hosted autonomous AI agent that runs on your machine. It provides deep, persistent access to files, browsers, and local applications — and connects to chat platforms like Discord, WhatsApp, and Slack as a "personal butler" that executes tasks using LLMs.

By loading the **Ragora skill file**, OpenClaw learns how to authenticate with your Ragora account, discover your workspaces, and run grounded searches with source attribution — all through the Model Context Protocol (MCP).

## Quick Start

### 1. Download the skill file

<a href="/skills/ragora.md" download>Download ragora.md</a>

Or fetch it directly:

```bash
curl -O https://ragora.app/skills/ragora.md
```

### 2. Get a Ragora API key

Create one from your [dashboard](https://ragora.app/settings?tab=developer). The key is shown **once** — copy and store it securely. Format: `sk_live_<uuid>`.

### 3. Configure the MCP connection

Point your agent's MCP config at the Ragora server:

```yaml
name: ragora
type: http
url: https://mcp.ragora.app/mcp
headers:
  Authorization: Bearer ${RAGORA_API_KEY}
```

Or JSON format (Claude Desktop / Cursor / VS Code):

```json
{
  "mcpServers": {
    "ragora": {
      "type": "http",
      "url": "https://mcp.ragora.app/mcp",
      "headers": {
        "Authorization": "Bearer sk_live_your_key_here"
      }
    }
  }
}
```

### 4. Verify the connection

Have the agent run:

```text
discover_collections()
```

If it returns your collections, you're good. If empty, you may need to [access a workspace](https://ragora.app/marketplace) first.

## What the Skill Teaches the Agent

The skill file instructs the agent on:

- **Authentication** — how to pass the API key and handle auth errors.
- **Tool discovery** — always call `discover_collections()` before searching.
- **Search strategy** — prefer targeted `search_collection()` over broad `search()`, use iterative multi-pass queries, and tune `top_k` by task type.
- **Source attribution** — always cite collection and source in answers.
- **Credit awareness** — check the [billing page](https://ragora.app/billing) when billing errors occur.
- **Failure recovery** — broaden queries on empty results, narrow on noisy results, surface conflicts transparently.

## Available Tools

### Static tools (always available)

| Tool | Description |
|------|-------------|
| `discover_collections()` | List all accessible workspaces with stats and usage hints. |
| `search(query, top_k?)` | Search across all collections at once. `top_k`: 1–20, default 5. |
| `search_collection(collection_name, query, top_k?, custom_tags?, filters?)` | Search a specific collection by name or slug. |

### Dynamic tools (per-collection)

Generated for each collection you have access to. The `{slug}` is the collection's URL-safe name.

| Tool | Description |
|------|-------------|
| `search_{slug}(query, top_k?, version?, custom_tags?, filters?)` | Semantic search within a specific collection. Supports versioned docs. |
| `get_topic_{slug}(topic)` | Retrieve information about a specific topic. |
| `list_versions_{slug}()` | List available documentation versions for the collection. |

### MCP Prompts

| Prompt | Parameters | Description |
|--------|-----------|-------------|
| `search_collection_prompt` | `collection_name`, `query` | Pre-built search prompt. |
| `summarize_collection` | `collection_name` | Summarize an entire collection. |
| `compare_sources` | `collection_names`, `question` | Compare information across collections. |

## HTTP Fallback

If MCP tool binding isn't available, the agent can use the Gateway REST API directly:

| Endpoint | Description |
|----------|-------------|
| `GET /v1/mcp/manifest` | List all available tools for the authenticated user. |
| `POST /v1/mcp/execute` | Execute a tool by name with arguments. |

Both require `Authorization: Bearer <RAGORA_API_KEY>`.

```bash
# Get manifest
curl https://api.ragora.app/v1/mcp/manifest \
  -H "Authorization: Bearer sk_live_your_key"

# Execute a tool
curl -X POST https://api.ragora.app/v1/mcp/execute \
  -H "Authorization: Bearer sk_live_your_key" \
  -H "Content-Type: application/json" \
  -d '{"tool":"search_employee_handbook","arguments":{"query":"vacation policy","top_k":5}}'
```

## Security

- API keys use `sk_live_` prefix — there is no test mode.
- Keys are hashed (SHA-256 + bcrypt) and the raw value is only shown once at creation.
- The skill file instructs the agent to never expose API keys in outputs.
- Each key scopes access to the owner's collections only.

## Billing

- **Own collections and subscriptions**: free MCP access.
- **Pay-per-use marketplace products**: each retrieval deducts credits based on seller pricing.
- Check your balance and top up credits at [ragora.app/billing](https://ragora.app/billing).
