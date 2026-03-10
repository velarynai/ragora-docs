---
title: Chat Widget Getting Started
sidebar_label: Getting Started
sidebar_position: 1
description: Embed an AI chatbot on any website with one line of code
---

# Chat Widget Getting Started

Add Ragora to any website with a single script tag. A widget key controls what the assistant knows and how it answers. Each install chooses how that key appears on the page.

Ragora supports 3 install modes:

- **Support** — floating assistant for product, pricing, and support pages
- **Ask AI** — search-style overlay for docs and app surfaces
- **Embedded** — inline assistant mounted into a page section

## Quick Start

### 1. Create a Widget Key

Open the Ragora dashboard and go to **Settings** > **Widget**.

Create a widget key with:

- **Name** — internal label for the assistant
- **Collections** — which workspaces it can search
- **Allowed Domains** — which sites can use the key
- **Prompt / behavior settings** — title, welcome message, escalation, retrieval settings

The widget key starts with `wk_`.

### 2. Pick an Install Mode

#### Support

```html
<script
  src="https://api.ragora.app/widget/ragora-chat.js"
  data-key="wk_your-key-here"
  data-mode="support"
  data-theme="light">
</script>
```

Use this for marketing sites, pricing pages, and support entry points.

#### Ask AI

```html
<button class="ask-ai-trigger">Ask AI</button>

<script
  src="https://api.ragora.app/widget/ragora-chat.js"
  data-key="wk_your-key-here"
  data-mode="search"
  data-trigger-selector=".ask-ai-trigger"
  data-shortcut="true"
  data-theme="light">
</script>
```

Use this for docs, dashboards, and knowledge surfaces where a search-style overlay is a better fit than a floating chat bubble.

#### Embedded

```html
<div id="docs-ai"></div>

<script
  src="https://api.ragora.app/widget/ragora-chat.js"
  data-key="wk_your-key-here"
  data-mode="embedded"
  data-target="#docs-ai"
  data-theme="light">
</script>
```

Use this when the assistant should live inside the page layout.

### 3. Customize In The Dashboard

The dashboard can generate install snippets for all 3 modes and configure:

- Title
- Placeholder
- Welcome message
- Suggested questions
- Widget system prompt
- Escalation URL and label
- Theme
- Support position
- Rate limits
- Daily message limit
- Retrieval settings like `top_k` and `temperature`

## Script Attributes

| Attribute | Values | Default | Description |
|-----------|--------|---------|-------------|
| `data-key` | `wk_...` | required | Widget key to use |
| `data-mode` | `support`, `search`, `embedded` | `support` | Install mode |
| `data-theme` | `light`, `dark` | `light` | Base theme |
| `data-trigger-selector` | CSS selector | none | Required for `search` mode. Opens Ask AI from matching elements |
| `data-target` | CSS selector | none | Required for `embedded` mode. Mount target |
| `data-shortcut` | `true`, `false` | `true` in `search` | Enables Cmd/Ctrl + K for Ask AI |
| `data-persist` | `true`, `false` | `true` in `support` and `embedded`, `false` in `search` | Persist conversation state |
| `data-accent-color` | CSS color | theme default | Accent color for launcher, actions, and highlights |
| `data-font-family` | CSS font-family | system stack | Widget font family |
| `data-border-radius` | CSS size | `16px` | Surface corner radius |

## How It Works

1. The script loads and renders inside a **Shadow DOM** so page styles do not leak into the widget.
2. The widget fetches display settings from `GET /v1/widget/config`.
3. When a user asks a question, the widget sends `POST /v1/widget/chat` with the `X-Widget-Key` header.
4. The server validates the widget key, applies domain checks and rate limits, then runs the same RAG pipeline used by the API.
5. Answers stream back in real time.
6. Sources, follow-up questions, and low-confidence escalation metadata are attached to the final response.

## Next Steps

- [Widget Modes →](./modes)
- [Customization →](./customization)
