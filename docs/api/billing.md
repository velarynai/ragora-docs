---
title: "Billing API"
sidebar_label: "Billing"
sidebar_position: 6
description: "Credits, subscriptions, and usage"
---

Manage credits, subscriptions, and usage programmatically.

## Overview

The Billing API lets you check balances, purchase credits, manage subscriptions, and track usage. Useful for building custom dashboards or automating billing workflows.

---

## Credits

### Get Balance

Check your current credit balance.

```
GET /v1/credits/balance
```

#### Response (200)

```json
{
  "balance_usd": 25.50
}
```

#### Example

```bash
curl https://api.ragora.app/v1/credits/balance \
  -H "Authorization: Bearer sk_live_xxx"
```

```python
import requests

response = requests.get(
    "https://api.ragora.app/v1/credits/balance",
    headers={"Authorization": "Bearer sk_live_xxx"}
)
balance = response.json()["balance_usd"]
print(f"Balance: ${balance:.2f}")
```

---

### Get Credit History

View your credit transaction history (last 50 entries).

```
GET /v1/credits/history
```

#### Response (200)

```json
{
  "object": "list",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "user_id": "user_xyz789",
      "delta_usd": -0.02,
      "balance_after_usd": 25.48,
      "reason": "CHAT_DEBIT",
      "description": "Chat completion",
      "reference_id": "chat_completion_123",
      "reference_type": "chat",
      "created_at": "2024-01-22T15:30:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "user_id": "user_xyz789",
      "delta_usd": 10.00,
      "balance_after_usd": 25.50,
      "reason": "PURCHASE",
      "description": "Credit purchase via Stripe",
      "reference_id": "pi_stripe_abc",
      "reference_type": "stripe_payment",
      "created_at": "2024-01-20T10:00:00Z"
    }
  ]
}
```

#### Reason Codes

| Reason | Description |
|--------|-------------|
| `PURCHASE` | Credit purchase |
| `SUBSCRIPTION_GRANT` | Credits granted from subscription |
| `SEARCH_DEBIT` | Search operation debit |
| `RETRIEVE_DEBIT` | Retrieval operation debit |
| `CHAT_DEBIT` | Chat completion debit |
| `INGEST_DEBIT` | Ingestion operation debit |
| `REFUND` | Refund credited |
| `PROMO` | Promotional credit |
| `ADMIN_ADJUSTMENT` | Manual admin adjustment |

---

### Get Credit Pricing

Get platform credit pricing for operations.

```
GET /v1/credits/pricing
```

#### Response (200)

```json
{
  "object": "list",
  "data": [
    {"operation": "search", "cost_per_operation": 0.002},
    {"operation": "retrieval", "cost_per_operation": 0.005},
    {"operation": "chat", "cost_per_operation": 0.020}
  ]
}
```

---

### Purchase Credits

To purchase credits, use the Ragora dashboard:

**[https://ragora.app/billing](https://ragora.app/billing)**

---

## Subscriptions

### Get Subscription Tiers

List available subscription tiers.

```
GET /v1/tiers
```

**Note:** This endpoint is public (no authentication required).

#### Response (200)

```json
[
  {
    "id": "free",
    "name": "Free",
    "description": "Get started with Ragora",
    "price_usd_per_month": 0,
    "max_documents": 200,
    "retrievals_per_day": 200,
    "storage_gb": 1
  },
  {
    "id": "starter",
    "name": "Starter",
    "description": "For individuals and small teams",
    "price_usd_per_month": 19.99,
    "max_documents": 2000,
    "retrievals_per_day": -1,
    "storage_gb": 10
  },
  {
    "id": "pro",
    "name": "Pro",
    "description": "For growing businesses",
    "price_usd_per_month": 99.99,
    "max_documents": 10000,
    "retrievals_per_day": -1,
    "storage_gb": 100
  }
]
```

**Note:** `retrievals_per_day: -1` means unlimited.

---

### Get Current Subscription

Get details of your active subscription.

```
GET /v1/billing/subscription
```

#### Response (200)

```json
{
  "id": "sub_abc123",
  "tier_id": "starter",
  "tier_name": "Starter",
  "status": "active",
  "current_period_start": "2024-01-01T00:00:00Z",
  "current_period_end": "2024-02-01T00:00:00Z",
  "cancel_at_period_end": false
}
```

#### Subscription Status

| Status | Description |
|--------|-------------|
| `active` | Subscription is active |
| `past_due` | Payment failed, grace period |
| `canceled` | Subscription cancelled |
| `trialing` | In trial period |

---

### Subscribe or Upgrade

To subscribe to a paid tier or upgrade your plan, use the Ragora dashboard:

**[https://ragora.app/billing](https://ragora.app/billing)**

---

### Cancel Subscription

Cancel your subscription at the end of the billing period.

```
POST /v1/billing/subscription/cancel
```

#### Response (200)

```json
{
  "status": "canceled",
  "cancel_at_period_end": true,
  "current_period_end": "2024-02-01T00:00:00Z",
  "message": "Subscription will be cancelled on 2024-02-01"
}
```

After cancellation, you'll retain access until `current_period_end`, then revert to the Free tier.

---

## Usage

### Get Current Usage

Check your usage against tier limits.

```
GET /v1/billing/usage
```

#### Response (200)

```json
{
  "tier_id": "starter",
  "retrievals_today": 45,
  "retrievals_limit": -1,
  "documents_used": 850,
  "documents_limit": 2000,
  "storage_used_bytes": 2500000000,
  "storage_limit_bytes": 10737418240
}
```

**Note:** `-1` means unlimited.

---

### Get Storage Usage

Get detailed storage breakdown.

```
GET /v1/billing/storage-usage
```

#### Response (200)

```json
{
  "total_bytes": 2500000000,
  "limit_bytes": 10737418240,
  "documents_count": 850,
  "by_source_type": {
    "upload": 2000000000,
    "github": 300000000,
    "youtube": 200000000
  }
}
```

---

## Purchased Products

### List Purchased Products

List marketplace products you have access to.

```
GET /v1/billing/access
```

#### Response (200)

```json
[
  {
    "product_id": "prod_abc123",
    "title": "Legal Document Templates",
    "access_type": "subscription",
    "expires_at": "2024-02-15T00:00:00Z",
    "purchased_at": "2024-01-15T10:30:00Z"
  },
  {
    "product_id": "prod_def456",
    "title": "Medical Research Papers",
    "access_type": "purchased",
    "expires_at": null,
    "purchased_at": "2024-01-10T08:00:00Z"
  },
  {
    "product_id": "prod_ghi789",
    "title": "Tech Documentation",
    "access_type": "usage_based",
    "expires_at": null,
    "purchased_at": "2024-01-20T14:00:00Z"
  }
]
```

#### Access Types

| Type | Description |
|------|-------------|
| `purchased` | One-time purchase, permanent access |
| `subscription` | Monthly subscription, expires if not renewed |
| `usage_based` | Pay-per-use, active until deactivated |
| `free` | Free product |

---

### Cancel Product Access

To cancel a marketplace product subscription, use the Ragora dashboard:

**[https://ragora.app/billing](https://ragora.app/billing)**

---

## Error Responses

### 402 Payment Required

```json
{
  "error": {
    "code": "insufficient_balance",
    "message": "Insufficient credits. Balance: $0.50, Required: $1.00"
  }
}
```

### 402 Limit Exceeded

```json
{
  "error": {
    "code": "document_limit_exceeded",
    "message": "Document limit exceeded. Upgrade at https://ragora.app/billing"
  }
}
```

### 400 Invalid Tier

```json
{
  "error": {
    "code": "invalid_tier",
    "message": "Cannot downgrade from 'pro' to 'starter' mid-cycle. Use /v1/billing/downgrade instead."
  }
}
```
