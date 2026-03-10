---
title: Widget Modes
sidebar_label: Modes
sidebar_position: 2
description: Support, Ask AI, and Embedded widget modes
---

# Widget Modes

Ragora's chat widget supports three distinct install modes, each designed for different use cases.

## Support

Best for:

- Marketing sites
- Pricing pages
- Support portals
- Lead capture flows

Behavior:

- Floating launcher button in the corner of the page
- Conversation persistence by default
- Low-confidence escalation CTA
- Compact assistant layout

```html
<script
  src="https://api.ragora.app/widget/ragora-chat.js"
  data-key="wk_your-key-here"
  data-mode="support"
  data-theme="light">
</script>
```

## Ask AI

Best for:

- Docs sites
- App sidebars and headers
- Internal knowledge surfaces
- Command-palette style AI entry points

Behavior:

- Opens from a trigger element you define
- Supports Cmd/Ctrl + K keyboard shortcut by default
- Does not persist conversation by default
- Answer-first overlay with sources and follow-ups

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

### Trigger Configuration

The `data-trigger-selector` attribute accepts any CSS selector. All matching elements on the page will open the Ask AI overlay when clicked.

The `data-shortcut` attribute enables the Cmd/Ctrl + K keyboard shortcut. Set to `"false"` to disable it.

## Embedded

Best for:

- Help center pages
- Docs sidebars
- Account portals
- Custom layouts where the assistant is part of the page

Behavior:

- Mounts into a specific DOM target
- No floating launcher
- Persistence enabled by default

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

The `data-target` attribute must match an element that exists on the page before the script loads.

## Framework Examples

### Next.js

```tsx
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <button className="ask-ai-trigger">Ask AI</button>
        <Script
          src="https://api.ragora.app/widget/ragora-chat.js"
          data-key="wk_your-key-here"
          data-mode="search"
          data-trigger-selector=".ask-ai-trigger"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
```

### React

```tsx
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://api.ragora.app/widget/ragora-chat.js";
    script.setAttribute("data-key", "wk_your-key-here");
    script.setAttribute("data-mode", "support");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div>My app</div>;
}
```
