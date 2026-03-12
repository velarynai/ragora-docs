---
title: "Errors & Limits"
sidebar_label: "Errors & Limits"
sidebar_position: 8
description: "Error handling and rate limits"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Handle errors and understand rate limiting.

## Error Format

All errors follow a consistent format:

```json
{
  "error": {
    "code": "error_code",
    "message": "Human-readable error description",
    "details": {}
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `code` | string | Machine-readable error code |
| `message` | string | Human-readable description |
| `details` | object | Additional context (optional) |

---

## HTTP Status Codes

| Status | Description |
|--------|-------------|
| `200` | Success |
| `201` | Created |
| `204` | No Content (successful deletion) |
| `400` | Bad Request - Invalid parameters |
| `401` | Unauthorized - Invalid or missing API key |
| `402` | Payment Required - Insufficient credits or tier limit |
| `403` | Forbidden - No access to resource |
| `404` | Not Found - Resource doesn't exist |
| `409` | Conflict - Duplicate or conflicting state |
| `413` | Payload Too Large - File exceeds size limit |
| `415` | Unsupported Media Type - File type not supported |
| `429` | Too Many Requests - Rate limit exceeded |
| `500` | Internal Server Error |
| `503` | Service Unavailable - Temporary outage |

---

## Error Codes

### Authentication & Authorization

| Code | Status | Description |
|------|--------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or missing API key |
| `FORBIDDEN` | 403 | No access to the requested resource |

**Example:**

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

### Validation Errors

| Code | Status | Description |
|------|--------|-------------|
| `BAD_REQUEST` | 400 | Request body is malformed or missing fields |
| `VALIDATION_FAILED` | 400 | Parameter validation failed (includes field-level details) |

**Example:**

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Invalid request parameters",
    "details": {
      "fields": {
        "Query": "required"
      }
    }
  }
}
```

### Resource Errors

| Code | Status | Description |
|------|--------|-------------|
| `NOT_FOUND` | 404 | Requested resource doesn't exist |
| `CONFLICT` | 409 | Conflicting state (e.g., slug already exists) |
| `DUPLICATE_RESOURCE` | 409 | Resource already exists (duplicate key) |
| `RESOURCE_IN_USE` | 409 | Resource is referenced by other records |

**Example:**

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Collection not found"
  }
}
```

### Billing & Quota Errors

| Code | Status | Description |
|------|--------|-------------|
| `INSUFFICIENT_FUNDS` | 402 | Not enough credits for this operation |
| `QUOTA_EXCEEDED` | 402 | Tier document or vector storage limit reached |
| `RETRIEVAL_LIMIT_EXCEEDED` | 429 | Daily retrieval limit reached (free tier) |

**Example:**

```json
{
  "error": {
    "code": "QUOTA_EXCEEDED",
    "message": "Document limit exceeded",
    "details": {
      "documents_used": 200,
      "documents_limit": 200,
      "upgrade_required": true
    }
  }
}
```

### Rate Limit Errors

| Code | Status | Description |
|------|--------|-------------|
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |

**Example:**

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded"
  }
}
```

### Server Errors

| Code | Status | Description |
|------|--------|-------------|
| `INTERNAL_ERROR` | 500 | Internal server error |
| `SERVICE_UNAVAILABLE` | 503 | Temporary service outage |
| `QUEUE_FULL` | 503 | Ingestion queue is full, try again later |

### Other Codes

| Code | Status | Description |
|------|--------|-------------|
| `ONBOARDING_REQUIRED` | 403 | Stripe Connect onboarding required for seller operations |

---

## Rate Limits

Rate limits protect the API from abuse and ensure fair usage.

### Limits by Tier

| Tier | Requests/min | Retrieval/day | Concurrent |
|------|--------------|---------------|------------|
| Free | 60 | 200 | 5 |
| Starter | 300 | Unlimited | 20 |
| Pro | 1,000 | Unlimited | 50 |
| Enterprise | Custom | Unlimited | Custom |

### Handling Rate Limits

The SDK handles rate limits and retries automatically with exponential backoff. You can configure the retry behavior when initializing the client:

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient

# SDK retries rate-limited and transient errors automatically
client = RagoraClient(max_retries=5)  # default is 3
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient } from 'ragora';

// SDK retries rate-limited and transient errors automatically
const client = new RagoraClient({ maxRetries: 5 }); // default is 3
```

  </TabItem>
</Tabs>

If you need to handle rate limit errors explicitly (e.g., to show a message to users), catch the `RateLimitError` exception:

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient, RateLimitError

async with RagoraClient() as client:
    try:
        results = await client.search(query="...", collection="my-docs")
    except RateLimitError as e:
        print(f"Rate limited. Retry after {e.retry_after}s")
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient, RateLimitError } from 'ragora';

const client = new RagoraClient();

try {
  const results = await client.search({ query: '...', collection: 'my-docs' });
} catch (e) {
  if (e instanceof RateLimitError) {
    console.error(`Rate limited. Retry in ${e.retryAfter}s`);
  }
}
```

  </TabItem>
</Tabs>

---

## Error Handling

The SDK provides typed exceptions for all API error categories. Use try/catch to handle errors gracefully:

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraClient, RagoraException, AuthenticationError, RateLimitError, NotFoundError

async with RagoraClient() as client:
    try:
        results = await client.search(query="...", collection="my-docs")
    except AuthenticationError as e:
        print(f"Invalid API key: {e.message}")
    except RateLimitError as e:
        print(f"Rate limited. Retry after {e.retry_after}s")
    except NotFoundError as e:
        print(f"Collection not found: {e.message}")
    except RagoraException as e:
        print(f"API error [{e.status_code}]: {e.message}")
        print(f"Request ID: {e.request_id}")
        if e.is_retryable:
            print("This error is retryable")
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraClient, RagoraError, AuthenticationError, RateLimitError, NotFoundError } from 'ragora';

const client = new RagoraClient();

try {
  const results = await client.search({ query: '...', collection: 'my-docs' });
} catch (e) {
  if (e instanceof AuthenticationError) {
    console.error(`Invalid API key: ${e.message}`);
  } else if (e instanceof RateLimitError) {
    console.error(`Rate limited. Retry in ${e.retryAfter}s`);
  } else if (e instanceof NotFoundError) {
    console.error(`Not found: ${e.message}`);
  } else if (e instanceof RagoraError) {
    console.error(`API error [${e.statusCode}]: ${e.message}`);
    console.error(`Request ID: ${e.requestId}`);
    if (e.isRetryable) console.log('This error is retryable');
  }
}
```

  </TabItem>
</Tabs>

---

## Best Practices

### 1. Use Typed Error Handling

Catch specific SDK exceptions to handle different error types appropriately:

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from ragora import RagoraException

try:
    results = await client.search(query="...", collection="my-docs")
except RagoraException as e:
    if e.status_code == 402:
        print("Insufficient credits. Add credits at https://ragora.app/billing")
    else:
        print(f"Error [{e.status_code}]: {e.message}")
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { RagoraError } from 'ragora';

try {
  const results = await client.search({ query: '...', collection: 'my-docs' });
} catch (e) {
  if (e instanceof RagoraError && e.statusCode === 402) {
    console.error('Insufficient credits. Add credits at https://ragora.app/billing');
  } else if (e instanceof RagoraError) {
    console.error(`Error [${e.statusCode}]: ${e.message}`);
  }
}
```

  </TabItem>
</Tabs>

### 2. Retries Are Automatic

The SDK automatically retries transient errors (`429`, `500`, `503`) with exponential backoff. No manual retry logic is needed.

### 3. Monitor Rate Limit Headers

Track your remaining requests to proactively avoid hitting limits. Rate limit metadata is available on SDK responses:

<Tabs>
  <TabItem value="python" label="Python" default>

```python
results = await client.search(query="...", collection="my-docs")
if results.rate_limit_remaining < 10:
    print("Warning: Approaching rate limit")
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
const results = await client.search({ query: '...', collection: 'my-docs' });
if (results.rateLimitRemaining < 10) {
  console.warn('Warning: Approaching rate limit');
}
```

  </TabItem>
</Tabs>

### 4. Check Balance Before Expensive Operations

<Tabs>
  <TabItem value="python" label="Python" default>

```python
balance = await client.get_balance()
if balance.balance_usd < 1.0:
    print("Low balance. Add credits at https://ragora.app/billing")
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
const balance = await client.getBalance();
if (balance.balanceUsd < 1.0) {
  console.warn('Low balance. Add credits at https://ragora.app/billing');
}
```

  </TabItem>
</Tabs>

---

## Debugging

### Request ID

Every response includes a unique request ID. Include this when contacting support.

The request ID is available on SDK exceptions via `e.request_id` (Python) or `e.requestId` (TypeScript).

### Debug Mode

Enable debug mode to log all requests and responses:

<Tabs>
  <TabItem value="python" label="Python" default>

```python
client = RagoraClient(debug=True)  # logs all requests
```

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
const client = new RagoraClient({ debug: true });
```

  </TabItem>
</Tabs>

### Test Mode

Use test API keys (starting with `sk_test_`) for development without affecting production data or billing.
