---
title: "Settings"
sidebar_label: "Settings"
sidebar_position: 4
description: "Configure your account, team, branding, API keys, and chat widget"
---

The Settings page <a className="btn-inline" href="https://ragora.app/settings">Settings &rarr;</a> contains all account and organization configuration. Access it by clicking **Settings** in the sidebar.

Settings is organized into five tabs, accessible via URL parameters:

| Tab | URL | Purpose |
|-----|-----|---------|
| Profile | <a className="btn-inline" href="https://ragora.app/settings?tab=profile">Profile &rarr;</a> | Account info and deletion |
| Team | <a className="btn-inline" href="https://ragora.app/settings?tab=team">Team &rarr;</a> | Member management and invitations |
| Branding | <a className="btn-inline" href="https://ragora.app/settings?tab=branding">Branding &rarr;</a> | Organization appearance and public page |
| API Keys | <a className="btn-inline" href="https://ragora.app/settings?tab=developer">API Keys &rarr;</a> | Manage API keys for programmatic access |
| Widget | <a className="btn-inline" href="https://ragora.app/settings?tab=widget">Widget &rarr;</a> | Create and configure chat widget keys |

---

## Profile

View your account information and manage your account.

**Displayed info:**
- Avatar showing your profile image from your login provider (falls back to the first letter of your name)
- Full Name (managed by your login provider — not editable)
- Email Address (managed by your login provider — not editable)

### Delete Account

At the bottom of the Profile tab:

1. Click **Delete Personal Account**
2. A dialog titled **"Are you absolutely sure?"** appears with the warning: "This action cannot be undone. This will permanently delete your account and remove your data from our servers."
3. Click **Yes, delete my account** to confirm

This permanently deletes your account and all associated data.

---

## Team

Manage who has access to your organization.

### Inviting Members

1. Click the **Invite Member** button (Plus icon) in the top right
2. Enter the person's **Email Address**
3. Select a **Role**:
   - **Member** — can view and edit standard resources
   - **Admin** — full access to team settings
4. Click **Send Invite**

The invitee receives an email with a link to join. Pending invitations appear in the **Pending Invitations** section with their status and expiration.

### Managing Invitations

For pending invitations, admins and owners can:
- View the invited email, role, and status
- See if an invitation has expired (shown in red)
- Click **Revoke** to cancel the invitation

### Managing Members

The **Permissions** section shows all current members with:
- Avatar, name, and email
- Role (Owner shown with shield icon)
- Join date
- Remove button (trash icon) — only visible to admins/owners, not shown for the owner role

To remove a member:
1. Click the trash icon next to their name
2. Confirm: "Are you sure you want to remove [name] from the organization?"
3. Click **Remove Member**

---

## Branding

Customize how your public chat interface looks to your users.

### Organization & Text

| Field | Description | Placeholder |
|-------|-------------|-------------|
| **Organization Name** | Your team name used in internal settings | "e.g. Acme Corp" |
| **Display Title** | Main title on your public page | "e.g. Acme Corp Workspace" |
| **Subheader / Tagline** | Short description under the title | "e.g. Find answers to your questions" |

### Visual Identity

| Element | Description | Recommendation |
|---------|-------------|----------------|
| **Company Logo** | Shown on your public page | 512x512px PNG or SVG |
| **Storefront Banner Image** | Large banner image | 1600x400px JPG or PNG |
| **Brand Color** | Used for buttons, links, accents | Hex color picker |
| **Font Color** | Used for text and headings | Hex color picker |

### Public Domain

Your storefront is accessible at `[slug].ragora.app`. You can customize the slug:
- Only lowercase letters, numbers, and hyphens
- Minimum 3 characters, maximum 48 characters
- The `.ragora.app` suffix is fixed

A **Preview** link lets you open your public page in a new tab to see how it looks.

Click **Save Changes** when done.

---

## API Keys

Create and manage API keys for programmatic access to the Ragora API.

### Creating an API Key

1. Click the **Create Key** button (Plus icon) next to "API Keys"
2. Fill in:
   - **Name** — a label for the key (e.g., "Production Server")
   - **Permission** — `Read & Write` or `Read Only`
   - **Expiration** — `Never`, `30 days`, or `1 year`
3. Click **Create Key**

**Important:** The full API key is shown only once. Copy it immediately and store it securely. After dismissing, you'll only see the key prefix (`sk_live_...`).

### API Key Card

Each key shows:
- Key name and permission badge (Read-Write or Read-Only)
- Key prefix (e.g., `sk_live_abc...`)
- Created date
- Last used time (e.g., "2h ago" or "Never")
- Expiration date (if set)

### Deleting an API Key

1. Click the trash icon on the key card
2. Confirm: "Are you sure you want to delete [key name]? Any applications using this key will lose access immediately."
3. Click **Delete Key**

---

## Widget

Create chat widget keys to embed an AI assistant on your website.

### Creating a Widget Key

1. Click the **Create Widget** button (Plus icon) next to "Widget Keys"
2. Fill in:
   - **Name** — internal label (e.g., "Docs Chat", "Support Bot")
   - **Allowed Domains** — comma-separated list of domains where the widget can load (e.g., `example.com, *.example.com`)
   - **Collections** — select which workspaces the widget can search (click to toggle; selected workspaces show a checkmark)
   - **Appearance:**
     - **Theme** — Light or Dark
     - **Position** — Right or Left (for floating widget)
     - **Widget Title** — the heading shown in the widget (e.g., "Chat")
     - **Welcome Message** — greeting text (e.g., "How can I help you today?")
3. Click **Create Widget**

**Important:** Copy the widget key (`wk_...`) immediately — it's shown in a highlighted banner after creation.

### Widget Key Card

Each widget key shows:
- Widget name
- Theme badge (Light/Dark with sun/moon icon)
- Position badge (Left/Right)
- Key value
- Created date
- Allowed domains list

### Getting the Embed Code

1. Click the **Code** button on the widget card
2. The embed snippet expands below:

```html
<script src="https://api.ragora.app/widget/ragora-chat.js" data-key="wk_..." defer></script>
```

3. Click **Copy** to copy the snippet
4. Paste it before the closing body tag on your website

### Editing a Widget

Click the **Edit** (pencil) icon on a widget card to update its name, domains, workspaces, theme, position, title, or welcome message.

### Deleting a Widget Key

1. Click the trash icon on the widget card
2. Confirm: "Are you sure you want to delete [widget name]? The widget will stop working on all websites using this key."
3. Click **Delete Widget**

---

## Quick Reference

| Task | Where to go |
|------|------------|
| Change profile info | Profile tab (managed by login provider) |
| Invite a team member | Team tab → Invite Member |
| Customize public page | Branding tab |
| Create an API key | API Keys tab → Create Key button |
| Set up a chat widget | Widget tab → Create Widget button |
| Delete your account | Profile tab → Delete Personal Account |
