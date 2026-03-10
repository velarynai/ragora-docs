---
title: "Managing Workspaces"
sidebar_label: "Workspaces"
sidebar_position: 1
description: "Create, organize, and manage your knowledge workspaces"
---

Workspaces are the core unit of Ragora. Each workspace holds a set of documents that form a searchable knowledge base. In the API, workspaces are referred to as "collections."

## Navigating to Workspaces

Click **Workspaces** in the sidebar or go to <a className="btn-inline" href="https://ragora.app/kb">Workspaces &rarr;</a> This page lists all workspaces you own or have purchased access to.

The list page has two tabs:
- **My Workspaces** — workspaces you created
- **Shared With Me** — workspaces shared with you by other users or teams

Each workspace card shows:
- Cover image (category-based default if not set)
- Workspace name and description
- Document count
- Visibility badge (**Private** or **Published**)
- Owner or organization name
- Pricing label (for marketplace products)

---

## Creating a Workspace

1. On the Workspaces page, click **Create Workspace** in the header
2. Fill in the creation form:
   - **Workspace Name** (required)
   - **Description** (optional)
   - **Category** — choose one: `General`, `Code`, `Software Docs`, `Transcript`, `Legal`, `Medical`, `Financial`. Pick the closest category to your content. This helps Ragora store your data correctly and return better search results.
   - **Cover Image** — optional image upload with preview. Recommended: 1600x900px (16:9). Minimum 1200px wide for best quality.
   - **Selling toggle** — check "I'm selling this workspace" to set a price
3. Click **Create**

The workspace is created as **Private** by default. You can publish it to the marketplace later.

---

## Workspace Detail Page

Open a workspace by clicking its card. The detail page <a className="btn-inline" href="https://ragora.app/kb">Workspace Dashboard &rarr;</a> has a split layout:

| Panel | Purpose |
|-------|---------|
| **Left — Document Manager** | Upload files, view documents, check processing status |
| **Right — Knowledge Playground** | Test queries against your workspace, validate retrieval quality |

### Header Actions

At the top of the page you'll find:
- **Settings** (gear icon) — open workspace settings
- **Visibility badge** — a read-only badge showing **Private** or **Published** status
- **Publish to Marketplace** — opens the publish modal to list on the marketplace (see [Publishing](#publishing-to-the-marketplace))
- **Delete** (trash icon) — permanently remove the workspace and all its documents
- **Download** — download all files as ZIP (available for one-time purchased products)

---

## Uploading Documents

The document manager on the left panel lets you upload files directly to your workspace.

1. Click the **Upload** button (or drag and drop files onto the panel)
2. Supported formats include: PDF, DOCX, TXT, Markdown, and more
3. Files enter the ingestion pipeline automatically

After upload, each document shows:
- Filename
- **Status indicator:**
  - Checkmark (completed) — fully processed and searchable
  - Spinner (processing/indexing) — currently being processed
  - Clock (pending) — queued for processing
  - Alert triangle (failed) — processing error, review and retry
- Upload time
- Delete option via the three-dot menu

An info box explains: "Uploading triggers a full ingestion pipeline: Ragora extracts content, chunks it, builds vectors, and indexes it for grounded answers in the playground."

### Empty State

If no documents exist yet, you'll see: "No documents yet. Upload documents to populate this workspace and start testing."

---

## Testing with Knowledge Playground

The right panel provides the **Knowledge Playground** to test your workspace.

### Starting a Conversation

- Type a question in the input field at the bottom
- Or click one of the suggested prompts:
  - "What is this knowledgebase about?"
  - "Summarize the key topics covered"
  - "What can I learn from these documents?"

### Session Management

- Click **Sessions** to view conversation history
- Click **New Chat** to start a fresh conversation
- Each session shows the date, first message preview, and message count
- Delete sessions you no longer need

Every response is grounded in the documents in your workspace, with source citations included.

A disclaimer appears below the chat input: "AI can make mistakes. Check important info."

---

## Workspace Settings

Click the **Settings** (gear) icon to open the settings dialog. You can update:

- **Name** — the workspace title
- **Description** — a summary of what the workspace contains
- **Category** — the content domain (General, Code, Software Docs, etc.)
- **Cover Image** — upload or replace the workspace thumbnail

Click **Save Changes** to apply changes.

---

## Publishing to the Marketplace

To make your workspace available for others to access:

1. Open your workspace
2. Click the **Publish to Marketplace** button
3. Fill in the publish modal:
   - **Description** — what the workspace contains
   - **Category** — content category
   - **Pricing** — choose one:
     - **Free** — anyone can access at no cost
     - **One-Time Purchase** — buyers pay once for permanent access (enter price in USD)
     - **Subscription** — buyers pay monthly (enter monthly price in USD)
     - **Usage-Based** — buyers pay per query or usage
4. Click **Publish**

**Prerequisites for paid products:**
- You must have at least 1 document uploaded
- You must connect a Stripe bank account (a "Connect with Stripe" button appears if not connected)

Once published, the workspace appears on the [Marketplace](https://ragora.app/marketplace) for others to discover and purchase.

---

## Workspace Visibility

Visibility is shown as a read-only badge in the workspace header:

- **Private** — only you and your team can access. This is the default for new workspaces.
- **Published** — listed on the marketplace, accessible to buyers. Shows a green "Published" badge.

To publish a private workspace, use the **Publish to Marketplace** button, which opens the publish modal. To unpublish a published workspace, use workspace settings. Existing buyers retain access even if you unpublish.

---

## Deleting a Workspace

1. Open the workspace
2. Click the **Delete** (trash) icon
3. Confirm the deletion

This permanently removes the workspace and all associated documents and vectors. This action cannot be undone.

---

## Workspace Categories

Categories influence how documents are processed and help buyers find your workspace on the marketplace:

| Category | Best for |
|----------|----------|
| General | Reports, mixed content, general documents |
| Code | Source code and code-heavy technical files |
| Software Docs | Product docs, READMEs, technical documentation |
| Transcript | Meetings, interviews, media transcripts |
| Legal | Contracts, policies, compliance documents |
| Medical | Clinical and healthcare material |
| Financial | Financial reports and statements |
