---
title: "Bots"
sidebar_label: "Overview"
sidebar_position: 0
description: "Connect Discord and Slack bots to your Ragora workspaces"
---

# Bots

Ragora bots bring your knowledge base directly into your team's chat platforms. Install a bot, point it at a workspace, and your team can search and ask questions without leaving Discord or Slack.

## Supported Platforms

| Platform | Message Sync | Q&A Bot | Forum Auto-Reply | Status |
|----------|:---:|:---:|:---:|--------|
| **Discord** | Yes | Yes | Yes | Available |
| **Slack** | Yes | Yes | — | Available |
| **Telegram** | — | — | — | Coming soon |

## What Bots Do

Bots have two core capabilities:

- **Message Sync** — Continuously ingest channel messages into a Ragora workspace. Synced messages become searchable through the API, MCP, dashboard, or other bots. See [Message Sync](./message-sync) for configuration and deployment patterns.

- **Q&A** — When a user @mentions the bot or posts in a watched channel with auto-reply enabled, the bot retrieves relevant context from your workspace and responds with a grounded, cited answer. See [Q&A Bots](./qa-bots) for retrieval scope tuning and operating profiles.

Discord bots additionally support **Forum Auto-Reply** — automatically answering new forum posts in watched channels, useful for support forums.

## Quick Setup

1. Go to **Integrations** → **Bot Integrations** <a className="btn-inline" href="https://ragora.app/integrations?tab=bots">Bot Integrations &rarr;</a>
2. Select a **Destination workspace**
3. Click **Discord** or **Slack** to start the OAuth flow
4. After authorization, add channels to watch from the bot card

For detailed setup and management, see the [Bot Integrations guide](/docs/guides/integrations-guide).
