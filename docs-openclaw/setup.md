---
title: OpenClaw Setup
sidebar_label: Setup
sidebar_position: 2
description: Configure OpenClaw to connect your AI agent to Ragora
---

# OpenClaw Setup

## Prerequisites

- An [OpenClaw](https://openclaw.ai) instance (or any MCP-compatible AI client)
- A [Ragora](https://ragora.app) account
- A Ragora API key -- create one from your [dashboard](https://ragora.app/settings?tab=developer)

> API keys use the format `sk_live_<uuid>` and are shown **once** at creation. Copy and store it securely.

## 1. Download the Skill File

```bash
curl -O https://raw.githubusercontent.com/velarynai/ragora-openclaw/main/ragora.md
```

Or clone the repo:

```bash
git clone https://github.com/velarynai/ragora-openclaw.git
```

## 2. Configure the MCP Connection

### YAML (OpenClaw)

```yaml
name: ragora
type: http
url: https://mcp.ragora.app/mcp
headers:
  Authorization: Bearer ${RAGORA_API_KEY}
```

### JSON (Claude Desktop / Cursor / VS Code)

```json
{
  "mcpServers": {
    "ragora": {
      "type": "http",
      "url": "https://mcp.ragora.app/mcp",
      "headers": {
        "Authorization": "Bearer ${RAGORA_API_KEY}"
      }
    }
  }
}
```

> Set `RAGORA_API_KEY` as an environment variable. Never hardcode keys in config files that may be committed to version control.

## 3. Verify the Connection

Ask your agent to run:

```
discover_collections()
```

If it returns your collections, you're all set. If the result is empty, you may need to [access a knowledge base](https://ragora.app/marketplace) first.

## Links

- [Ragora](https://ragora.app) -- Knowledge base platform
- [Ragora Marketplace](https://ragora.app/marketplace) -- Browse knowledge bases
- [Ragora Docs](https://ragora.app/docs) -- Full documentation
- [OpenClaw](https://openclaw.ai) -- Open-source autonomous AI agent
