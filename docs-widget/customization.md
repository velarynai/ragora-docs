---
title: Widget Customization
sidebar_label: Customization
sidebar_position: 3
description: Styling, custom instructions, domain restrictions, and advanced configuration
---

# Widget Customization

## Styling

The widget runs inside a Shadow DOM, so page styles do not leak in. Use script attributes to match your brand:

```html
<script
  src="https://api.ragora.app/widget/ragora-chat.js"
  data-key="wk_your-key-here"
  data-mode="support"
  data-theme="light"
  data-accent-color="#0ea5e9"
  data-font-family="Inter, system-ui, sans-serif"
  data-border-radius="14px">
</script>
```

| Attribute | Description |
|-----------|-------------|
| `data-theme` | `light` or `dark` base theme |
| `data-accent-color` | CSS color for launcher, actions, and highlights |
| `data-font-family` | CSS font-family value |
| `data-border-radius` | Surface corner radius (default: `16px`) |

## Dashboard Configuration

The widget key dashboard lets you configure behavior without changing code:

- **Title** — displayed at the top of the widget
- **Placeholder** — input field placeholder text
- **Welcome message** — shown when the widget first opens
- **Suggested questions** — starter prompts shown to the user
- **Widget system prompt** — custom instructions for the assistant
- **Escalation URL and label** — link shown when the assistant has low confidence
- **Theme** — light or dark
- **Support position** — where the floating launcher appears
- **Rate limits** — per-key request rate limiting
- **Daily message limit** — cap on daily messages per visitor
- **Retrieval settings** — `top_k` and `temperature`

## Domain Locking

Widget keys can be restricted to specific domains.

| Pattern | Matches |
|---------|---------|
| `example.com` | only `example.com` |
| `*.example.com` | subdomains like `docs.example.com` |

If a request comes from an unlisted domain, the widget returns `403 Forbidden`.

Include explicit dev hosts like `localhost` or `127.0.0.1` when needed for local development.

## Security

| Concern | How it is handled |
|---------|-------------------|
| Key visible in HTML | Widget keys are chat-scoped and limited to configured collections |
| Unauthorized domains | `Origin` is validated against allowed domains |
| Abuse | Per-key request rate limit and daily message cap |
| Collection access | Collection IDs are enforced server-side from the widget key |
| Billing | Usage is charged to the widget key owner account |
| Cookie issues | Widget auth uses the `X-Widget-Key` header only |

## API Reference

### Get Widget Config

```http
GET /v1/widget/config
X-Widget-Key: wk_your-key-here
```

Response fields include:

- `title`
- `placeholder`
- `welcome_message`
- `system_prompt`
- `collection_ids`
- `escalation_url`
- `escalation_label`
- `theme`
- `position`
- `daily_message_limit`
- `top_k`
- `temperature`
- `suggested_questions`

### Widget Chat

```http
POST /v1/widget/chat
X-Widget-Key: wk_your-key-here
Content-Type: application/json
```

```json
{
  "messages": [
    { "role": "user", "content": "How do I reset my password?" }
  ],
  "stream": true
}
```

The response is streamed over SSE and can include:

- Answer text deltas
- Sources
- Follow-up questions
- Low-confidence escalation metadata
- Conversation and message IDs

### Widget Key Management

These endpoints use your regular authenticated dashboard session or API key, not the widget key.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/v1/widget/keys` | Create a widget key |
| `GET` | `/v1/widget/keys` | List widget keys |
| `PATCH` | `/v1/widget/keys/:id` | Update widget key settings |
| `DELETE` | `/v1/widget/keys/:id` | Delete a widget key |

## Troubleshooting

### The widget does not appear

- Check the browser console for `[Ragora Widget]` warnings
- Make sure `data-key` is present and starts with `wk_`
- Verify the script URL is `https://api.ragora.app/widget/ragora-chat.js`

### Ask AI does not open

- Make sure `data-mode="search"` is set
- Verify `data-trigger-selector` matches an element on the page
- If using the shortcut, make sure `data-shortcut` is not set to `false`

### Embedded mode does not mount

- Make sure `data-mode="embedded"` is set
- Verify the target element exists before the script loads
- Check that `data-target` matches the page element exactly

### Origin not allowed

- Add the current hostname to the widget key allowed domains
- Include explicit dev hosts like `localhost` or `127.0.0.1` when needed

### Styles do not match the site

The widget runs inside a Shadow DOM. Use `data-accent-color`, `data-font-family`, and `data-border-radius` to match your brand.
