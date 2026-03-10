---
title: "Bot Integrations"
sidebar_label: "Bot Integrations"
sidebar_position: 3
description: "Connect Discord and Slack bots to sync messages and answer questions"
---

Connect chat platform bots to your Ragora workspaces. Bots can sync channel messages into your knowledge base and answer questions using your data.

## Navigating to Integrations

Click **Integrations** in the sidebar or go to `/integrations`. The page has two tabs:

- **Bot Integrations** <a className="btn-inline" href="https://ragora.app/integrations?tab=bots">Bot Integrations &rarr;</a> — connect Discord and Slack bots
- **Data Sources** <a className="btn-inline" href="https://ragora.app/integrations?tab=sources">Data Sources &rarr;</a> — connect external data sources (see [Adding Data](/docs/guides/adding-data#connect-external-data-sources))

---

## Connecting a Bot

### Prerequisites

You need at least one workspace before connecting a bot. If you don't have one, the page will prompt: "Create a workspace first from the Workspaces page, then come back here."

### Steps

1. Go to **Integrations** → **Bot Integrations**
2. In the connection card, select a **Destination workspace** from the dropdown
3. Click a platform card in the connect area:
   - **Discord** — redirects to Discord OAuth to authorize the bot
   - **Slack** — redirects to Slack OAuth to authorize the bot
   - **Telegram** — visible in the UI but disabled with a "Coming Soon" label
4. Complete the OAuth flow on the platform
5. You'll be redirected back to the Integrations page with a success notification

After connecting, the bot appears as a card showing:
- Platform name and connection status
- Destination workspace
- Message sync count

**What happens next:** The bot joins your workspace/server and can respond to @mentions, sync messages from channels you choose, and auto-reply to forum posts.

---

## Managing Connected Bots

Each connected bot card shows:

| Element | Description |
|---------|-------------|
| **Platform icon** | Discord or Slack logo |
| **Status badge** | "Connected" (green), "Paused" (amber), or the raw status text with a secondary badge for any other state |
| **Sync info** | "Syncing messages to [workspace] · N messages" |
| **Workspace selector** | Inline dropdown on the bot card to change the destination workspace (appears when multiple workspaces exist) |

### Bot Actions

- **Pause / Resume** — temporarily stop or restart the bot without disconnecting
- **Disconnect** — remove the bot entirely (synced messages in your workspace are preserved)
- **Expand** — click the chevron to open the channel manager

---

## Channel Management

Expand a bot card to manage which channels are synced.

### Channel Tabs

- **Watched (N)** — channels currently being synced
- **Available (N)** — channels the bot has access to but isn't syncing

Use the **search bar** to filter channels by name.

### Adding Channels

1. Switch to the **Available** tab
2. Find the channel you want to sync
3. Click the **Watch** button (+ icon) next to it
4. The channel moves to the Watched tab and begins syncing

### Watched Channel Controls

Each watched channel shows:
- `#channel_name` with message count
- **Auto-reply toggle** — enable/disable automatic bot responses (MessageSquare icon)
  - Green with "On" text when enabled
  - Gray with "Off" text when disabled
- **Remove button** (X) — stop watching the channel

### Removing a Channel

Click the **X** button on a watched channel to stop syncing. The channel moves back to the Available tab. Already-synced messages remain in your workspace.

---

## Bot Stats

At the top of the Bot Integrations tab, you'll see:
- **N Connected Bot(s)** — total active bot connections
- **N Watched Channel(s)** — total channels being synced across all bots

---

## Platform-Specific Notes

### Discord

- The bot is added to your Discord server via OAuth
- It can access text channels, forums, and threads
- Forum auto-reply works on new forum posts in watched channels

### Slack

- The bot is installed to your Slack workspace via OAuth
- It can access public and invited channels
- Works with threads and channel messages

### Telegram

- Visible in the dashboard UI as a disabled card with a "Coming Soon" label
- Telegram support exists server-side for admin-configured bots

---

## Disconnecting a Bot

1. Click the **Disconnect** button on the bot card
2. Confirm in the dialog: "The bot will be removed from your workspace. Synced messages in your knowledge base will be preserved."
3. Click **Disconnect** to confirm

The bot stops syncing and is removed from the platform. Data already synced into your workspace remains searchable.

---

## OAuth Troubleshooting

| Issue | Fix |
|-------|-----|
| OAuth returns an error | Check that you have admin permissions on the platform |
| Bot not appearing after connect | Refresh the page; check for success/error notifications |
| No channels in Available tab | Verify the bot has access to channels on the platform |
| Channels exist but won't sync | Ensure the channel is added to Watched and the bot is not paused |
