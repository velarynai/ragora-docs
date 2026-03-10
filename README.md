<p align="center">
  <img src="static/img/logo.png" alt="Ragora" width="80" />
</p>

<h1 align="center">Ragora Docs</h1>

<p align="center">
  Documentation for <a href="https://ragora.app">Ragora</a> — the AI-powered knowledge search platform.
</p>

<p align="center">
  <a href="https://docs.ragora.app">docs.ragora.app</a>
</p>

---

## What's Inside

| Section | Path | Description |
|---------|------|-------------|
| **Platform Docs** | `docs/` | Getting started, guides, integrations, billing, API reference |
| **SDKs** | `docs-sdk/` | Python and TypeScript client libraries |
| **MCP Server** | `docs-mcp-server/` | Connect Claude, Cursor, and other AI assistants to Ragora |
| **Chat Widget** | `docs-widget/` | Embed an AI chatbot on any website |
| **GLiNER** | `docs-gliner/` | Named entity recognition inference server |
| **OpenClaw** | `docs-openclaw/` | Teach AI agents how to use Ragora |

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (hot-reload at localhost:3000)
npm start

# Production build
npm run build

# Preview production build
npm run serve
```

Requires **Node.js 20+**.

## Project Structure

```
ragora-docs/
├── docs/                 # Main platform documentation
├── docs-sdk/             # SDK docs (Python, TypeScript)
├── docs-mcp-server/      # MCP server docs
├── docs-widget/          # Chat widget docs
├── docs-gliner/          # GLiNER docs
├── docs-openclaw/        # OpenClaw docs
├── blog/                 # Blog posts
├── src/
│   ├── css/              # Custom styles
│   ├── pages/            # Custom pages (landing)
│   └── theme/            # Swizzled Docusaurus components
├── static/               # Static assets (images, favicons)
├── config/               # Shared config (tiers.json for pricing)
├── scripts/              # Build scripts (dynamic doc generation)
└── docusaurus.config.ts  # Site configuration
```

## Dynamic Docs

Billing and FAQ pages are auto-generated from `config/tiers.json` so pricing is never hardcoded. The generation runs automatically before `build` and `start`:

```bash
npm run generate-dynamic-docs
```

## Built With

- [Docusaurus 3](https://docusaurus.io/) — static site generator
- [Ragora Chat Widget](https://docs.ragora.app/widget/getting-started) — integrated Ask AI search (dogfooding)
