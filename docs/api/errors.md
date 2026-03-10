---
title: "Errors & Limits"
sidebar_label: "Errors & Limits"
sidebar_position: 8
description: "Error handling and rate limits"
---

Handle errors and understand rate limiting.

## Error Format

All API errors follow a consistent format:

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

### Rate Limit Headers

Every response includes rate limit information:

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests allowed |
| `X-RateLimit-Remaining` | Requests remaining in window |
| `X-RateLimit-Reset` | Unix timestamp when limit resets |

**Example Headers:**

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1706745660
```

### Handling Rate Limits

When you receive a `429` response, wait before retrying:

```python
import time
import requests

def make_request_with_retry(url, headers, json_data, max_retries=3):
    for attempt in range(max_retries):
        response = requests.post(url, headers=headers, json=json_data)

        if response.status_code == 429:
            retry_after = int(response.headers.get("Retry-After", 30))
            print(f"Rate limited. Waiting {retry_after} seconds...")
            time.sleep(retry_after)
            continue

        return response

    raise Exception("Max retries exceeded")
```

### Exponential Backoff

For production applications, use exponential backoff:

```python
import time
import random

def exponential_backoff(attempt, base_delay=1, max_delay=60):
    delay = min(base_delay * (2 ** attempt), max_delay)
    jitter = random.uniform(0, delay * 0.1)
    return delay + jitter

def make_request_with_backoff(url, headers, json_data, max_retries=5):
    for attempt in range(max_retries):
        response = requests.post(url, headers=headers, json=json_data)

        if response.status_code == 429:
            delay = exponential_backoff(attempt)
            print(f"Rate limited. Retrying in {delay:.1f}s...")
            time.sleep(delay)
            continue

        if response.status_code >= 500:
            delay = exponential_backoff(attempt)
            print(f"Server error. Retrying in {delay:.1f}s...")
            time.sleep(delay)
            continue

        return response

    raise Exception("Max retries exceeded")
```

### JavaScript Example

```javascript
async function fetchWithRetry(url, options, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await fetch(url, options);

    if (response.status === 429) {
      const retryAfter = parseInt(response.headers.get("Retry-After") || "30");
      console.log(`Rate limited. Waiting ${retryAfter}s...`);
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      continue;
    }

    if (response.status >= 500) {
      const delay = Math.min(1000 * Math.pow(2, attempt), 60000);
      console.log(`Server error. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      continue;
    }

    return response;
  }

  throw new Error("Max retries exceeded");
}
```

---

## Best Practices

### 1. Check for Errors

Always check response status codes:

```python
response = requests.post(url, headers=headers, json=data)

if not response.ok:
    error = response.json().get("error", {})
    print(f"Error {error.get('code')}: {error.get('message')}")
    # Handle specific error codes
    if error.get("code") == "INSUFFICIENT_FUNDS":
        # Prompt user to add credits
        pass
```

### 2. Implement Retries

Implement automatic retries for transient errors:

- `429` - Rate limit exceeded
- `500` - Internal server error
- `503` - Service unavailable

### 3. Use Exponential Backoff

Increase delay between retries to avoid overwhelming the server.

### 4. Monitor Rate Limit Headers

Track your remaining requests to avoid hitting limits:

```python
remaining = int(response.headers.get("X-RateLimit-Remaining", 0))
if remaining < 10:
    print("Warning: Approaching rate limit")
```

### 5. Handle Insufficient Credits

Check your balance before making expensive operations:

```python
# Check balance first
balance = requests.get(
    "https://api.ragora.app/v1/credits/balance",
    headers=headers
).json()

if balance["balance_usd"] < 1.0:
    print("Low balance. Add credits at https://ragora.app/billing")
```

---

## Debugging

### Request ID

Every response includes a unique request ID in the `X-Request-ID` header. Include this when contacting support:

```
X-Request-ID: req_abc123xyz
```

### Verbose Logging

Enable verbose logging to debug issues:

```python
import logging
import requests

logging.basicConfig(level=logging.DEBUG)

# This will log all request/response details
response = requests.post(url, headers=headers, json=data)
```

### Test Mode

Use test API keys (starting with `sk_test_`) for development without affecting production data or billing.
