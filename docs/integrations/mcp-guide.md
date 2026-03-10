---
title: "MCP Integration"
sidebar_label: "MCP Integration"
sidebar_position: 1
description: "Connect AI assistants like Claude and Cursor"
---

Connect AI assistants like Claude, Cursor, and VS Code to your Ragora workspaces using the Model Context Protocol (MCP).

## What is MCP?

MCP (Model Context Protocol) lets AI assistants access external tools and data sources. With Ragora's MCP server, your AI assistant can search your workspaces directly—no local installation required.

## Quick Setup

Ragora uses **HTTP mode** for MCP connections. Just configure your AI tool with the server URL and API key.

### Claude Desktop

**Option 1: CLI command (recommended)**

```bash
claude mcp add --transport http ragora https://mcp.ragora.app/mcp \
  --header "Authorization: Bearer sk_live_your_key_here"
```

**Option 2: Config file**

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

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

### Cursor

Add to `.cursor/mcp.json` in your project:

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

### VS Code

Add to `.vscode/mcp.json` in your project:

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

### Codex

1. Open **Settings** → **MCP Servers**
2. Click **Add Server**
3. Configure the server:
   - **Name:** `ragora`
   - **Type:** `HTTP`
   - **URL:** `https://mcp.ragora.app/mcp`
4. In **Headers**, add:
   - **Key:** `Authorization`
   - **Value:** `Bearer sk_live_your_key_here`
5. Click **Save**

## Available Tools

Once connected, your AI assistant has access to these built-in tools:

### `discover_collections`

List all workspaces you have access to, including descriptions, stats, available operations, and usage examples.

**Example prompt:**
> "List my available workspaces"

### `search`

Search across all accessible collections at once.

**Parameters:**
- `query` (required): Your search query
- `top_k` (optional): Number of results, 1–20 (default: 5)

**Example prompt:**
> "Search my workspaces for authentication configuration"

### `search_collection`

Search a specific collection by name or slug with optional filtering.

**Parameters:**
- `collection_name` (required): Collection name or slug
- `query` (required): Your search query
- `top_k` (optional): Number of results, 1–20 (default: 5)
- `custom_tags` (optional): List of tags to scope retrieval
- `filters` (optional): Metadata filters object

**Example prompt:**
> "Search the employee handbook for remote work policy"

### Dynamic Collection Tools

For each collection you have access to, the system generates dedicated tools using the collection's slug:

- `search_{slug}` — semantic search with optional `version`, `custom_tags`, and `filters` parameters
- `get_topic_{slug}` — retrieve information about a specific topic
- `list_versions_{slug}` — list available documentation versions

For example, a collection with slug `employee_handbook` gets:

- `search_employee_handbook`
- `get_topic_employee_handbook`
- `list_versions_employee_handbook`

These tools let the AI route queries to specific collections automatically.

### MCP Resources

The server also exposes **MCP Resources** for each collection, allowing AI assistants to read collection metadata and stats directly.

### MCP Prompts

Pre-built prompts are available for common workflows:

| Prompt | Parameters | Description |
|--------|-----------|-------------|
| `search_collection_prompt` | `collection_name`, `query` | Pre-built search prompt for a specific collection. |
| `summarize_collection` | `collection_name` | Summarize an entire collection. |
| `compare_sources` | `collection_names`, `question` | Compare information across multiple collections. |

## Configuring Collection Tools

Make your collections easier for AI to discover:

1. Open a workspace from **Workspaces** <a className="btn-inline" href="https://ragora.app/kb">Workspaces &rarr;</a>
2. Open workspace settings
3. Set a **Tool Prefix** (e.g., `employee_handbook`)
4. Add a **Description** (helps the AI understand when to use it)

This creates a tool like `search_employee_handbook` that appears in your AI assistant.

## Usage Examples

### Searching Documentation

**You:** "Search my docs for webhook event handling"

**Claude:** *Uses search to find relevant documentation*

### Searching a Specific Collection

**You:** "Look up our refund policy in the employee handbook"

**Claude:** *Uses search_employee_handbook (if configured) to find the policy*

### Multi-Collection Search

**You:** "What workspaces do I have, and what's in them?"

**Claude:** *Uses discover_collections first, then searches relevant collections*

## Troubleshooting

### "Tool not found" error
- Restart your AI application after updating the config
- Verify your API key is correct and starts with `sk_live_`
- Check the URL is exactly `https://mcp.ragora.app/mcp`

### "Unauthorized" error
- Ensure the header is `Authorization: Bearer sk_live_...` (with "Bearer " prefix)
- Verify your API key hasn't expired
- Check that the key has MCP access enabled

### No results returned
- Verify documents have been uploaded to your collections
- Check that documents finished processing (status: `completed`)
- Try broader search queries

### Connection timeout
- Ensure you have internet access
- Check firewall settings aren't blocking HTTPS connections
- Verify the MCP server is online at `https://mcp.ragora.app/health`

## Security

- Your API key determines which collections the AI can access
- The AI can only search collections you own or have purchased access to
- API keys should be kept secret—don't commit them to version control

## Billing

MCP operations are **free for your own collections** and collections you have subscription access to.

For **pay-per-use** marketplace products, each retrieval consumes credits based on the seller's pricing.

Check your balance anytime from the [billing page](https://ragora.app/billing).
