---
title: Ragora MCP Server
sidebar_label: Overview
sidebar_position: 1
description: Connect AI assistants to your Ragora knowledge base via Model Context Protocol
---

# Ragora MCP Server

Search your knowledge bases from any AI assistant using the [Model Context Protocol](https://modelcontextprotocol.io/).

Ragora's MCP server is a **hosted cloud service** — no local installation required. Just configure your AI tool with the server URL and your API key.

**Server URL:** `https://mcp.ragora.app/mcp`

## How It Works

```
Your AI Tool                        Ragora Cloud
┌──────────────────┐               ┌──────────────────┐
│ Claude / Cursor  │   HTTP POST   │  MCP Server      │
│ / VS Code / etc  │──────────────>│  (Streamable HTTP)│
└──────────────────┘    /mcp       └────────┬─────────┘
                                            │
                                   ┌────────▼─────────┐
                                   │  Gateway API      │
                                   │  (Auth + Search)  │
                                   └────────┬─────────┘
                                       ┌────┴────┐
                                       ▼         ▼
                                   Postgres    Qdrant
                                   (metadata)  (vectors)
```

- **No local install** — connect directly via HTTP
- **Multi-tenant** — your API key determines which collections you can access
- **Dynamic tools** — tools are generated based on your accessible collections
- **Hybrid search** — dense (E5-Large) + sparse (BM25) with reciprocal rank fusion

## Available Tools

### Static Tools

| Tool | Description |
|------|-------------|
| `discover_collections` | List all knowledge bases you have access to, with descriptions, stats, and usage examples |
| `search` | Search across **all** your knowledge bases at once |
| `search_collection` | Search a **specific** collection by name, with optional tag/metadata filters |

### Tool Parameters

**`search(query, top_k?)`**
- `query` (required): Natural language search query
- `top_k` (optional): Number of results to return (default: 5)

**`search_collection(collection_name, query, top_k?, custom_tags?, filters?)`**
- `collection_name` (required): Collection name or slug (use `discover_collections` to find names)
- `query` (required): Natural language search query
- `top_k` (optional): Number of results (default: 5)
- `custom_tags` (optional): Tags to scope retrieval
- `filters` (optional): Metadata filters

### Dynamic Collection Tools

For each collection you have access to, dedicated tools are generated using the collection's slug:

- `search_{slug}` — semantic search with optional version, tags, and filters
- `get_topic_{slug}` — retrieve information about a specific topic
- `list_versions_{slug}` — list available documentation versions

For example, a collection called "Employee Handbook" gets:
- `search_employee_handbook`
- `get_topic_employee_handbook`
- `list_versions_employee_handbook`

Configure tool names and descriptions in the Ragora dashboard under **Collection > MCP Settings**.

## Usage Examples

**Search all collections:**
> "Search my docs for webhook event handling"

**Search a specific collection:**
> "Look up the refund policy in the employee handbook"

**Discover what's available:**
> "What workspaces do I have, and what's in them?"

## Security

- API keys authenticate all requests via `Authorization: Bearer` header
- Each API key is scoped to the user's owned and purchased collections
- Cross-tenant data access is impossible — all queries are filtered by accessible collection IDs
- API keys should never be committed to version control

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Tool not found" | Restart your AI app after config changes. Verify your API key starts with `sk_live_` |
| "Unauthorized" | Check the `Authorization: Bearer` header format. Verify the key hasn't expired |
| No results | Ensure documents are uploaded and processing is complete. Try broader queries |
| Connection timeout | Check internet access. Verify server status at `https://mcp.ragora.app/health` |

## Next Steps

- [Setup Guide →](./setup)
