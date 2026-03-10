---
title: "Adding Data"
sidebar_label: "Adding Data"
sidebar_position: 2
description: "Upload files, ingest URLs, import from GitHub, and connect external sources"
---

Ragora supports multiple ways to add data to your workspaces. This guide covers each method using the UI.

Ragora supports content in **100+ languages** — upload documents in any language and search across them with cross-language retrieval built in.

---

## Upload Files

The simplest way to add data is uploading files directly from your workspace page.

1. Go to **Workspaces** and open your workspace
2. In the document manager (left panel), click the **Upload** button
3. Select files from your computer, or drag and drop files/folders onto the panel
4. Files are automatically queued for processing

**Supported file types:** PDF, DOCX, TXT, Markdown, Excel, PowerPoint, images (with OCR), audio (MP3, WAV), video (MP4, WEBM), source code, and 50+ more formats.

### File Drop Zone

When dragging files over the upload area:
- The border turns blue to indicate it's ready to accept files
- Drop to add all selected files at once
- You can also click **Browse files** or **Select folder** to use the system file picker

### Supported Format Badges

The upload area shows badges for commonly accepted types: PDF, TXT, MD, DOCX, Audio, Video.

### After Upload

Files appear in the document list with status indicators:
- **Pending** (clock) — queued for processing
- **Processing/Indexing** (spinner) — being chunked, embedded, and indexed
- **Completed** (checkmark) — fully searchable
- **Failed** (alert) — processing error; review and re-upload if needed

### Skipped Files

If you upload unsupported file types, you'll see a warning listing which files were skipped.

---

## Ingest URLs

Add content from web pages directly.

1. Open the URL ingestion tab
2. Enter the URL in the input field (e.g., `https://example.com/article`)
3. Optionally enter a **Custom Name** for the document
4. Check the disclaimer: "I confirm I have the right to ingest this content and it complies with the source's terms of service."
5. Click **Ingest URL**

### URL Type Detection

Ragora automatically detects the URL type:
- **Web page** — "Web page - will extract content" (proceeds normally)
- **YouTube** — "YouTube URL detected - ingestion disabled in UI to avoid blacklisting" (blocked to protect the service)
- **GitHub** — "GitHub detected - use GitHub tab for better support" (suggests switching tabs)

### Troubleshooting URL Ingestion

If a URL fails, it's usually because:
- The website blocks cross-origin requests (CORS)
- The page requires JavaScript rendering
- The URL is inaccessible or returns an error

---

## Import from GitHub

Import files from any public or private GitHub repository.

1. Open the GitHub ingestion tab
2. **Add a GitHub token** (optional but recommended):
   - Expand "Add GitHub token"
   - Paste your personal access token (`ghp_xxxxx...`)
   - This increases the rate limit from 60 to 5,000 requests/hour
   - The token is saved to your browser for future use
3. **Paste a GitHub URL** — supports:
   - Repository root: `https://github.com/owner/repo`
   - Branch/tag folder: `https://github.com/owner/repo/tree/main/docs`
   - Single file: `https://github.com/owner/repo/blob/main/README.md`
4. Click **Fetch Files** to scan the repository

### Filtering Options

- **Docs only toggle** — filter for markdown, rst, and txt files only
- **Base path** — limit to a specific directory (e.g., `docs/`). Suggested paths appear when "Docs only" is enabled: `docs/`, `documentation/`, `wiki/`, `content/`, `pages/`
- **Advanced filters** (expand with the filter icon):
  - **Include patterns** — comma-separated globs (e.g., `*.md, *.txt`)
  - **Exclude patterns** — comma-separated globs (e.g., `**/node_modules/**, **/.git/**`)

### Review and Ingest

After fetching, files appear in the preview list showing:
- File path and directory
- File size
- Duplicate detection (files already in the workspace are flagged)
- Version badges (if version tagging is set)
- Remove button to exclude individual files

For large imports (100+ files), a warning appears: "N files will be ingested sequentially. This may take several minutes."

Click **Ingest N File(s)** to start the import.

---

## Ingest Page

In addition to the workspace detail page, Ragora provides a dedicated **Ingest Page** (`/ingest`) with a full-featured ingestion workflow.

### Target Collection

At the top of the page, select the **Target Collection** (workspace) where ingested data will be stored. All files, URLs, and GitHub imports on this page go into the selected collection.

### Source Tabs

The ingest page provides four source tabs:

| Tab | Purpose |
|-----|---------|
| **Files** | Upload local files and folders |
| **URLs** | Ingest individual web pages |
| **GitHub** | Import from GitHub repositories |
| **Connections** | Connect external data sources for recurring sync |

### Use-Case Templates

Templates pre-configure processing settings for common scenarios. Select a template to auto-fill content type, scan mode, and other options:

| Template | Pre-configured for |
|----------|-------------------|
| **Meeting Notes** | Transcripts, meeting minutes, call recordings |
| **Software Docs** | Technical documentation, READMEs, API docs |
| **Legal / Contracts** | Contracts, policies, compliance documents |
| **Chat Archives** | Discord, Slack, Telegram message exports |
| **General Documents** | Reports, mixed content, general files |

### File Staging

Files are **staged first** before ingestion begins. After selecting files, they appear in a staging area where you can:

- Review the file list and sizes
- See **estimated vectors** for the staged files
- Remove individual files before ingesting
- Set processing options and metadata

Click **Ingest N File(s)** to start processing all staged files in bulk.

### Jobs Panel

A slide-over **Jobs Panel** shows the progress of all active and recent ingestion jobs:

- Progress bars with percentage completion
- Estimated time remaining (ETA)
- Current processing stage (e.g., parsing, chunking, embedding)
- Retry information for failed jobs
- Job history for completed items

### Error Handling

If the ingestion queue is full, a `QUEUE_FULL` error is returned. Wait for existing jobs to complete before submitting more files, or try again later.

---

## Processing Options

When adding data, you can configure processing behavior:

### Content Type

Choose the type that best matches your content. The dropdown is organized into categories:

**General**

| Value | Use when your content is mostly |
|------|----------------------------------|
| `generic` | General reports, docs, mixed content |

**Chat Platforms**

| Value | Use when your content is mostly |
|------|----------------------------------|
| `chat:discord` | Discord message archives |
| `chat:slack` | Slack exports/messages |
| `chat:telegram` | Telegram exports/messages |
| `chat:auto` | Mixed chat content (auto-detected platform) |

**Specialized**

| Value | Use when your content is mostly |
|------|----------------------------------|
| `code` | Source code, API docs, and code-heavy technical files |
| `software_docs` | Product docs, technical docs, READMEs |
| `transcript` | Meetings, interviews, calls, media transcripts |
| `legal` | Contracts, policies, compliance/legal docs |
| `medical` | Clinical/healthcare material |
| `financial` | Financial reports/statements |

### Scan Mode

| Mode | Use when | Tradeoff |
|------|----------|----------|
| `fast` | Normal text docs | Faster processing |
| `hi_res` | Scanned/image-heavy docs | Better OCR, slower |

### Optional Metadata

| Field | Why it helps |
|------|---------------|
| `version_tag` | Enables version-aware retrieval and version listing in MCP tools |
| `source_name` | Better citation/source readability |
| `tags` | Better filtering and scoped retrieval |
| Temporal fields (`document_time`, `effective_at`, `expires_at`) | Time-aware retrieval behavior |

---

## Connect External Data Sources

For **recurring sync** from external services, use Data Sources under Integrations.

1. Go to **Integrations** → **Data Sources** (`/integrations?tab=sources`)
2. Click **Add Data Source**
3. Select a provider

### Available Providers

| Provider | Status | Connection Type |
|----------|--------|----------------|
| **Docs Website** | Available | Crawl4AI web crawler |
| GitHub | Coming soon | OAuth |
| Google Drive | Coming soon | OAuth |
| Dropbox | Coming soon | OAuth |
| Amazon S3 | Coming soon | Access keys |
| Notion | Coming soon | OAuth |

### Docs Website Setup (Crawl4AI)

This connector crawls documentation websites and syncs them into your workspace.

**Step 1: Configure Web Crawler**
1. Enter the **Root URL** (e.g., `https://docs.example.com`)
2. Optionally add **Include patterns** — one glob per line (e.g., `/docs/**`)
3. Optionally add **Exclude patterns** — one glob per line (e.g., `/changelog/**`)
4. Click **Next**

Note: JavaScript-rendered sites are not supported. This connector only syncs pages that can be fetched over plain HTTP.

**Step 2: Select Destination**
1. Choose a **Destination Workspace** from the dropdown
2. Set **Sync Frequency**: Daily, Weekly, or Monthly
3. Choose **Content Type**: `software_docs` (default), `generic`, `code`, `legal`, `medical`, or `financial`
4. Click **Create & Preview**

**Step 3: Review Preview**
The sync preview shows:
- Total files discovered
- Estimated size
- New vs already-synced files
- File type breakdown (e.g., `html: 42`, `md: 15`)
- Estimated duration
- Sample items from the crawl

Click **Start Sync** to begin the initial sync.

### Managing Data Sources

Each connected source card shows:
- Provider icon and resource name
- Status badge (Active or Paused)
- File count and last sync time
- Sync frequency

**Available actions:**
- **Sync Now** — trigger an immediate sync
- **Remove** — disconnect the source (already-synced data is preserved)

---

## Monitoring Processing

After adding data, monitor progress on the workspace page:

| Status | Meaning |
|--------|---------|
| `pending` | Queued for processing |
| `processing` | Being parsed, chunked, and embedded |
| `completed` | Fully indexed and searchable |
| `failed` | Processing error — check file format and retry |
| `unsupported` | File type not accepted |

Processing times vary by content:
| Document Type | Time |
|---------------|------|
| Text files | Seconds |
| PDF (text) | 10–30 seconds |
| PDF (scanned) | 1–2 minutes |
| Audio/Video | 2–5 min per hour |

---

## Duplicate Detection

Ragora automatically detects duplicate files:
- Files already in the workspace are flagged as **Duplicate** (shown in red with strikethrough)
- Duplicates are skipped during ingestion
- If you set a version tag, duplicates can be ingested as **New Version** instead (shown in green)
