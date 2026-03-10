---
title: "Add a Multilingual AI Chat Agent to Your Website — One Line of Code"
description: "Your website visitors speak different languages. Now your chat agent does too. Embed a multilingual AI assistant that answers questions from your own content — in your visitor's language."
authors: [ragora-team]
tags: [product, chat-widget, multilingual, integrations]
date: 2026-03-01
---

You've built a great website. You've written helpful docs, FAQs, and guides. But your visitors still can't find what they need — especially if they don't speak English.

What if every visitor could ask a question in their own language and get an instant, accurate answer pulled straight from your content?

That's exactly what Ragora's Support widget does, and the same assistant can also be deployed as an Ask AI overlay or an embedded panel.

<!-- truncate -->

## What Is It?

It's a small chat bubble that sits on your website. When a visitor clicks it, they can type a question — in any language — and get a helpful answer based on your actual documents, pages, and workspace.

No chatbot scripts. No decision trees. No "I didn't understand that." Just real answers from your real content.

## Why Multilingual Matters

Over half the internet doesn't browse in English. If your support docs are in English but your customers are in Tokyo, Berlin, or Sao Paulo, they're stuck.

The Ragora widget handles this automatically:

- **A visitor asks in Spanish** → gets an answer in Spanish
- **Your docs are in English** → doesn't matter, the system understands them across languages
- **Someone switches languages mid-conversation** → it keeps up

There's nothing to configure. No translation files. No language dropdowns. It just works — across 100+ languages.

## How It Works (The Simple Version)

1. You upload your content to Ragora (PDFs, docs, text — whatever you have)
2. You grab a one-line code snippet from your dashboard
3. You paste it into your website
4. Visitors start chatting — in any language they want

The AI reads your content, understands the question, and writes a clear answer grounded in what you actually wrote. If it pulls from a specific document, it shows the source so visitors can dig deeper.

## One Line. Seriously.

Here's the entire setup:

```html
<script
  src="https://api.ragora.app/widget/ragora-chat.js"
  data-key="wk_your-key-here"
  data-mode="support">
</script>
```

Paste that before `</body>` in your HTML. Done. Works with any website — WordPress, Shopify, Wix, Squarespace, Next.js, plain HTML. If you can add a script tag, you can add the widget.

## Make It Yours

The widget matches your brand out of the box, but you can customize:

- **Colors** — set your brand's accent color
- **Welcome message** — greet visitors however you want
- **Custom instructions** — tell the AI to respond in a specific tone, focus on certain topics, or follow your support style
- **Escalation link** — when the AI isn't confident, it shows a "Contact us" button pointing wherever you choose

You control all of this from the Ragora dashboard. If you want a docs-style experience instead of a floating launcher, the same widget key can also generate Ask AI overlay and Embedded install snippets.

## Built for Real Websites

A few things you don't have to worry about:

- **It won't break your styles.** The widget runs in its own isolated container — your CSS doesn't affect it, and it doesn't affect yours.
- **It's fast.** The script is tiny (~15 KB) and loads without slowing your page.
- **It's secure.** Widget keys only work on domains you approve. Visitors can only search the collections you choose. No one can access your full account through the widget.
- **It's affordable.** Every account gets monthly LLM credits that cover widget chat usage. For most small sites, that's more than enough. See [Pricing](https://ragora.app/pricing) for details.

## Who Is This For?

- **SaaS companies** that want 24/7 support without hiring more people
- **Documentation sites** that want visitors to find answers faster
- **Online stores** where customers ask product questions in their own language
- **Agencies** building sites for international clients
- **Anyone** with a website and content worth making searchable

## Learn How to Set It Up

Follow our step-by-step guides to get your chat widget live:

- [Chat Widget Documentation](/docs/integrations/chat-widget) — full setup guide with customization options, domain restrictions, and styling
- [Quick Start Guide](/docs/getting-started) — create your account and first knowledge collection
- [Billing & Pricing](/docs/billing) — see what's included in your plan and widget message limits

## Try It Today

Sign up at [ragora.app](https://ragora.app), upload your content, and grab your widget code. Your first 1,000 messages each month are free.

Your visitors are already asking questions. Now they'll get answers — in whatever language they speak.
