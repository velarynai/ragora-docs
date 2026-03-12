---
title: "Bot Integrations"
sidebar_label: "Bot Integrations"
sidebar_position: 3
description: "Connect Discord and Slack bots to sync messages and answer questions from your knowledge base"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Connect chat platform bots to your Ragora workspaces. Bots can **sync channel messages** into your knowledge base and **answer questions** using your data — directly in Discord or Slack.

## Supported Platforms

| Platform | Message Sync | Q&A Bot | Auto-Reply on Forums | Install Method |
|----------|:---:|:---:|:---:|----------------|
| **Discord** | Yes | Yes | Yes | OAuth from dashboard |
| **Slack** | Yes | Yes | — | OAuth from dashboard |
| **Telegram** | Coming soon | Coming soon | — | — |

---

## What Can Bots Do?

### 1. Sync Messages into Your Knowledge Base

Bots watch channels you select and continuously sync messages into a Ragora workspace. Synced messages become searchable — through the dashboard, API, MCP, or other bots.

**Example:** Sync your `#support` Discord channel, then search it programmatically:

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

async with RagoraClient() as client:
    # Search synced Discord/Slack messages
    results = await client.search(
        query="How do I configure SSO?",
        collection="support-workspace",
        source_type=["discord"],  # filter to Discord messages only
        top_k=5,
    )
    for r in results.results:
        print(f"[{r.score:.2f}] {r.content[:150]}")
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

const client = new RagoraClient();

// Search synced Discord/Slack messages
const results = await client.search({
  query: 'How do I configure SSO?',
  collection: 'support-workspace',
  sourceType: ['discord'],  // filter to Discord messages only
  topK: 5,
});
results.results.forEach(r => {
  console.log(`[${r.score.toFixed(2)}] ${r.content.slice(0, 150)}`);
});
```

  </TabItem>
</Tabs>

### 2. Answer Questions in Chat

When a user @mentions the bot or posts in a watched channel with auto-reply enabled, the bot retrieves relevant context from your workspace and responds with a grounded, cited answer.

**Example:** Use the same workspace via the Chat API to build similar Q&A flows in your own app:

<Tabs>
  <TabItem value="python" label="Python" default>

```python
async with RagoraClient() as client:
    response = await client.chat(
        messages=[{"role": "user", "content": "What's our refund policy?"}],
        retrieval={
            "collection": "support-workspace",
            "top_k": 8,
            "enable_reranker": True,
        },
    )
    print(response.choices[0].message.content)

    # Sources the answer was based on
    for s in response.sources:
        print(f"  Source: {s.metadata.get('filename', 'chat message')} (score: {s.score:.2f})")
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
const response = await client.chat({
  messages: [{ role: 'user', content: "What's our refund policy?" }],
  retrieval: {
    collection: 'support-workspace',
    topK: 8,
    enableReranker: true,
  },
});
console.log(response.choices[0].message.content);

// Sources the answer was based on
response.sources.forEach(s => {
  console.log(`  Source: ${s.metadata?.filename ?? 'chat message'} (score: ${s.score.toFixed(2)})`);
});
```

  </TabItem>
</Tabs>

### 3. Forum Auto-Reply (Discord)

On Discord, the bot can automatically reply to new forum posts in watched channels — useful for support forums where users post questions as threads.

---

## Setting Up a Bot

### Prerequisites

You need at least one workspace before connecting a bot.

### Steps

1. Go to **Integrations** → **Bot Integrations** <a className="btn-inline" href="https://ragora.app/integrations?tab=bots">Bot Integrations &rarr;</a>
2. Select a **Destination workspace** from the dropdown
3. Click the platform card (**Discord** or **Slack**) to start the OAuth flow
4. Complete authorization on the platform
5. You'll be redirected back with a success notification

After connecting, the bot appears as a card showing platform, status, destination workspace, and sync count.

### Add Channels to Watch

1. Click the expand chevron on the bot card to open the channel manager
2. Switch to the **Available** tab
3. Click **Watch** next to channels you want to sync
4. Toggle **Auto-reply** on channels where you want the bot to respond to messages

---

## Managing Connected Bots

Each bot card shows:

| Element | Description |
|---------|-------------|
| **Status badge** | "Connected" (green) or "Paused" (amber) |
| **Sync info** | "Syncing messages to [workspace] · N messages" |
| **Workspace selector** | Change the destination workspace from the bot card |

### Actions

- **Pause / Resume** — temporarily stop or restart without disconnecting
- **Disconnect** — remove the bot entirely (synced messages are preserved)

### Channel Controls

| Control | Effect |
|---------|--------|
| **Auto-reply toggle** | Enable/disable automatic bot responses per channel |
| **Unwatch** (X) | Stop syncing the channel (already-synced messages remain) |

---

## Platform Notes

### Discord

- Added to your server via OAuth
- Accesses text channels, forums, and threads
- Responds to @mentions in watched channels
- Auto-replies to new forum posts when enabled
- Synced content is tagged with `source_type: discord`

### Slack

- Installed to your workspace via OAuth
- Accesses public channels and channels the bot is invited to
- Responds to @mentions in watched channels
- Works with threads and channel messages
- Synced content is tagged with `source_type: slack`

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| OAuth returns an error | Check that you have admin permissions on the platform |
| Bot not appearing after connect | Refresh the page; check for success/error notifications |
| No channels in Available tab | Verify the bot has access to channels on the platform |
| Bot installed but silent | Ensure channels are in Watched tab and auto-reply is on |
| Answers miss expected context | Check destination workspace has the right data; see [Q&A Bots](/docs/bots/qa-bots) for tuning |

---

## Related

- [Message Sync](/docs/bots/message-sync) — detailed sync configuration and deployment patterns
- [Q&A Bots](/docs/bots/qa-bots) — retrieval scope tuning and operating profiles
- [Chat Widget](/widget/getting-started) — embed AI chat on your website instead
