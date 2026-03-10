---
title: MCP Server Setup
sidebar_label: Setup
sidebar_position: 2
description: Install and configure the Ragora MCP server for Claude, Cursor, and VS Code
---

# MCP Server Setup

## 1. Get an API Key

Sign up at [ragora.app](https://ragora.app) and create an API key at **Settings > API Keys**.

## 2. Connect Your AI Tool

### Claude Desktop

**Option 1: CLI (recommended)**

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

### Claude Code

```bash
claude mcp add --transport http ragora https://mcp.ragora.app/mcp \
  --header "Authorization: Bearer sk_live_your_key_here"
```

### Cursor

Add to `.cursor/mcp.json` in your project root:

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

### VS Code / GitHub Copilot

Add to `.vscode/mcp.json` in your project root:

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

### Windsurf

Add to `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "ragora": {
      "serverUrl": "https://mcp.ragora.app/mcp",
      "headers": {
        "Authorization": "Bearer sk_live_your_key_here"
      }
    }
  }
}
```

### Any MCP Client

Ragora uses **Streamable HTTP** transport. Point any MCP-compatible client to:

- **URL:** `https://mcp.ragora.app/mcp`
- **Method:** `POST`
- **Header:** `Authorization: Bearer sk_live_your_key_here`

## 3. Verify the Connection

Ask your AI assistant to run `discover_collections`. If it returns your collections, the connection is working.

If the result is empty, you may need to [upload documents](https://ragora.app) or [access a knowledge base from the marketplace](https://ragora.app/marketplace) first.

## Links

- [Ragora](https://ragora.app) — Sign up and manage your knowledge bases
- [MCP Integration Guide](https://ragora.app/mcp) — Full documentation
- [API Keys](https://ragora.app/settings?tab=developer) — Create your API key
- [Model Context Protocol](https://modelcontextprotocol.io/) — MCP specification
