---
title: "Marketplace API"
sidebar_label: "Marketplace"
sidebar_position: 7
description: "Browse, purchase, and sell products"
---

Browse, purchase, and sell knowledge products.

## Overview

The Marketplace API lets you browse public products, purchase access, and manage your own products as a seller. Use these endpoints to build custom marketplace integrations or automate product management.

---

## Browsing Products

### List Marketplace Products

Browse public marketplace products.

```
GET /v1/marketplace
```

**Note:** This endpoint is public (authentication optional).

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `search` | string | - | Search term |
| `category` | string | - | Filter by category |
| `sort` | string | `popular` | Sort order: `popular`, `recent`, `rating` |
| `limit` | integer | 20 | Results per page |
| `offset` | integer | 0 | Number to skip |

#### Response (200)

```json
{
  "object": "list",
  "data": [
    {
      "id": "prod_abc123",
      "title": "Legal Document Templates",
      "slug": "legal-templates",
      "description": "500+ legal document templates for business",
      "seller": {
        "id": "user_xyz",
        "name": "LegalDocs Inc",
        "verified": true
      },
      "average_rating": 4.8,
      "review_count": 124,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "has_more": true,
  "total": 150
}
```

#### Example

```bash
# Search for API documentation products
curl "https://api.ragora.app/v1/marketplace?search=api+documentation&sort=rating" \
  -H "Authorization: Bearer sk_live_xxx"
```

```python
import requests

def search_marketplace(query: str, limit: int = 20):
    response = requests.get(
        "https://api.ragora.app/v1/marketplace",
        headers={"Authorization": "Bearer sk_live_xxx"},
        params={"search": query, "limit": limit, "sort": "rating"}
    )
    return response.json()["data"]

products = search_marketplace("machine learning")
for p in products:
    print(f"{p['title']} - ${p['pricing']['price_usd']}/mo - ⭐{p['rating_avg']}")
```

---

### Get Product Details

Get full details of a marketplace product.

```
GET /v1/marketplace/{id}
```

The `{id}` can be the product ID or slug.

#### Response (200)

```json
{
  "id": "prod_abc123",
  "title": "Legal Document Templates",
  "slug": "legal-templates",
  "description": "Comprehensive collection of 500+ legal document templates...",
  "long_description": "Full markdown description...",
  "seller": {
    "id": "user_xyz",
    "name": "LegalDocs Inc",
    "verified": true,
    "products_count": 5,
    "member_since": "2023-06-01T00:00:00Z"
  },
  "average_rating": 4.8,
  "review_count": 124,
  "total_vectors": 15000,
  "total_chunks": 15000,
  "has_access": false,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-20T00:00:00Z"
}
```

---

### Get Product Pricing

Get pricing options for a product.

```
GET /v1/marketplace/{id}/pricing
```

#### Response (200)

```json
{
  "product_id": "prod_abc123",
  "listings": [
    {
      "id": "listing_001",
      "type": "subscription",
      "price_amount_usd": 29.99,
      "price_interval": "month"
    },
    {
      "id": "listing_002",
      "type": "one_time",
      "price_amount_usd": 199.99,
      "price_interval": null
    }
  ]
}
```

#### Pricing Types

| Type | Description |
|------|-------------|
| `subscription` | Recurring monthly/yearly payment |
| `one_time` | Single payment, permanent access |
| `usage_based` | Pay per retrieval |
| `free` | No payment required |

---

## Purchasing Products

### Activate Pay-Per-Use Product

Activate access to a usage-based product (no upfront payment).

```
POST /v1/marketplace/activate
```

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `product_id` | string | **Yes** | Product to activate |

#### Response (201)

```json
{
  "status": "active",
  "product_id": "prod_abc123",
  "message": "Pay-per-use access activated. You will be charged per retrieval."
}
```

After activation, retrievals from this product will deduct credits from your balance.

---

## Product Reviews

### List Reviews

Get reviews for a product.

```
GET /v1/products/{id}/reviews
```

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | integer | 10 | Results per page |
| `offset` | integer | 0 | Number to skip |

#### Response (200)

```json
{
  "data": [
    {
      "id": "review_abc",
      "rating": 5,
      "comment": "Excellent collection of templates. Saved me hours!",
      "reviewer": {
        "name": "John D.",
        "verified_purchase": true
      },
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "has_more": true,
  "total": 124,
  "average_rating": 4.8
}
```

---

### Create Review

Leave a review for a product you have access to.

```
POST /v1/products/{id}/reviews
```

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `rating` | integer | **Yes** | Rating 1-5 |
| `comment` | string | No | Review text |

#### Response (201)

```json
{
  "id": "review_xyz",
  "product_id": "prod_abc123",
  "user_id": "user_xyz789",
  "rating": 5,
  "comment": "Great product, highly recommend!",
  "is_visible": true,
  "created_at": "2024-01-22T15:30:00Z"
}
```

#### Restrictions

- Cannot review your own product (403 Forbidden)
- Must have active marketplace access to the product (403 Forbidden)
- One review per user per product (409 Conflict if already reviewed)

---

### Update Review

Update your existing review.

```
PATCH /v1/products/{id}/reviews/{review_id}
```

#### Request Body

| Field | Type | Description |
|-------|------|-------------|
| `rating` | integer | New rating 1-5 |
| `comment` | string | Updated comment |

---

### Delete Review

Delete your review.

```
DELETE /v1/products/{id}/reviews/{review_id}
```

---

## Seller API

### Create Product

Create a new product to sell on the marketplace.

```
POST /v1/products
```

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | **Yes** | Product title |
| `slug` | string | No | URL-friendly identifier (auto-generated if omitted) |
| `description` | string | No | Short description |
| `version` | string | No | Version label (e.g., `v1.0`) |
| `status` | string | No | `draft`, `active`, `archived` (default: `draft`) |

#### Response (201)

```json
{
  "id": "prod_new123",
  "seller_id": "user_xyz789",
  "collection_id": "coll_xyz",
  "title": "My Workspace",
  "slug": "my-knowledge-base",
  "description": "",
  "status": "draft",
  "attributes": {
    "version": "v1.0"
  },
  "created_at": "2024-01-22T15:30:00Z"
}
```

Creating a product also creates an associated collection for storing documents. The slug is auto-generated as `{slugified-title}-{first-8-chars-of-user-id}` if not provided.

---

### List My Products

List products you own.

```
GET /v1/products
```

#### Response (200)

```json
{
  "object": "list",
  "data": [
    {
      "id": "prod_abc123",
      "title": "My Workspace",
      "slug": "my-knowledge-base",
      "status": "active",
      "total_documents": 50,
      "average_rating": 4.5,
      "review_count": 12,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### List Accessible Products

List all products you have access to (owned, purchased, or pay-per-use activated).

```
GET /v1/products/accessible
```

#### Response (200)

```json
{
  "object": "list",
  "data": [
    {
      "id": "prod_abc123",
      "title": "My Workspace",
      "access_type": "owned"
    },
    {
      "id": "prod_def456",
      "title": "Legal Templates",
      "access_type": "subscription"
    },
    {
      "id": "prod_ghi789",
      "title": "Research Papers",
      "access_type": "usage_based"
    }
  ],
  "count": 3
}
```

| Access Type | Description |
|-------------|-------------|
| `owned` | You own this product |
| `one_time` | Purchased with permanent access |
| `subscription` | Active subscription |
| `usage_based` | Pay-per-use activated |
| `free` | Free product |

---

### Update Product

Update product details.

```
PATCH /v1/products/{id}
```

#### Request Body

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | New title |
| `description` | string | New description |
| `status` | string | `draft`, `active`, `archived` |

---

### Delete Product

Delete a product.

```
DELETE /v1/products/{id}
```

**Warning:** This removes the product from the marketplace. Existing buyers retain access.

**Note:** Cannot delete products with paid buyers (subscription or one-time purchases). Returns 409 Conflict if deletion is blocked.

---

## Product Pricing (Credit Costs)

Set per-operation credit costs for pay-per-use access.

### Get Product Pricing

```
GET /v1/products/{id}/pricing
```

**Note:** This endpoint is public (no authentication required).

#### Response (200)

```json
{
  "product_id": "prod_abc123",
  "cost_per_query": 0.002,
  "cost_per_retrieval": 0.005,
  "cost_per_chat": 0.020,
  "is_custom": false
}
```

| Field | Default | Description |
|-------|---------|-------------|
| `cost_per_query` | 0.002 | Cost per search query |
| `cost_per_retrieval` | 0.005 | Cost per retrieval |
| `cost_per_chat` | 0.020 | Cost per chat completion |

---

### Update Product Pricing

Set custom pricing for your product.

```
PUT /v1/products/{id}/pricing
```

#### Request Body

| Field | Type | Description |
|-------|------|-------------|
| `cost_per_query` | number | Cost per search query |
| `cost_per_retrieval` | number | Cost per retrieval |
| `cost_per_chat` | number | Cost per chat completion |

#### Response (200)

```json
{
  "product_id": "prod_abc123",
  "cost_per_query": 0.003,
  "cost_per_retrieval": 0.008,
  "cost_per_chat": 0.025
}
```

---

## Product Listings (Pricing)

### Create Listing

Add a pricing option to your product.

```
POST /v1/products/{id}/listings
```

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | **Yes** | `subscription`, `one_time`, `usage_based`, `free` |
| `price_amount_usd` | number | For paid | Price in USD |
| `price_interval` | string | For subscription | `month` or `year` |
| `price_per_retrieval_usd` | number | For usage_based | Cost per retrieval |

#### Example: Subscription Pricing

```json
{
  "type": "subscription",
  "price_amount_usd": 29.99,
  "price_interval": "month"
}
```

#### Example: One-Time Purchase

```json
{
  "type": "one_time",
  "price_amount_usd": 199.99
}
```

#### Example: Pay-Per-Use

```json
{
  "type": "usage_based",
  "price_per_retrieval_usd": 0.01
}
```

#### Validation Rules

| Type | Requirements |
|------|--------------|
| `free` | All prices must be 0, no interval |
| `subscription` | `price_amount_usd` > 0, `price_interval` required (`month` or `year`) |
| `one_time` | `price_amount_usd` > 0, no interval |
| `usage_based` | `price_per_retrieval_usd` > 0, `price_amount_usd` must be 0 |

**Note:** Creating paid listings requires completing payment setup in the dashboard first. Each product can only have one active listing per type.

#### Response (201)

```json
{
  "id": "listing_001",
  "product_id": "prod_abc123",
  "seller_id": "user_xyz789",
  "type": "subscription",
  "price_amount_usd": 29.99,
  "price_interval": "month",
  "price_per_retrieval_usd": null,
  "is_active": true,
  "buyer_count": 0,
  "created_at": "2024-01-22T15:30:00Z",
  "updated_at": "2024-01-22T15:30:00Z"
}
```

---

### List Listings

Get all pricing options for your product.

```
GET /v1/products/{id}/listings
```

---

### Update Listing

Update pricing.

```
PATCH /v1/products/{id}/listings/{listing_id}
```

**Note:** Changes apply to new purchases only. Existing subscribers keep their rate.

---

### Delete Listing

Remove a pricing option.

```
DELETE /v1/products/{id}/listings/{listing_id}
```

---

## Seller Earnings

### Get Seller Balance

Check your earnings balance.

```
GET /v1/billing/seller/balance
```

#### Response (200)

```json
{
  "available_balance_usd": 125.50,
  "pending_balance_usd": 45.00,
  "lifetime_revenue_usd": 1250.00,
  "last_payout_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-22T15:30:00Z"
}
```

| Field | Description |
|-------|-------------|
| `available_balance_usd` | Ready to withdraw |
| `pending_balance_usd` | Processing (from recent sales) |
| `lifetime_revenue_usd` | Lifetime earnings |
| `last_payout_at` | When the last payout was made (nullable) |

---

### Get Earnings Breakdown

See earnings by product.

```
GET /v1/billing/seller/earnings
```

#### Response (200)

```json
{
  "total_earnings_usd": 1250.00,
  "this_month_usd": 175.50,
  "by_product": [
    {
      "product_id": "prod_abc123",
      "product_title": "Legal Templates",
      "earnings_usd": 850.00,
      "sales_count": 45
    },
    {
      "product_id": "prod_def456",
      "product_title": "Medical Research",
      "earnings_usd": 400.00,
      "sales_count": 20
    }
  ]
}
```

---

### Request Payout

To request a payout of your earnings, use the Ragora dashboard:

**[https://ragora.app/billing](https://ragora.app/billing)**

---

## Seller Onboarding

To set up your account to receive payments from sales, use the Ragora dashboard:

**[https://ragora.app/billing](https://ragora.app/billing)**

---

## Error Responses

### 403 Not Owner

```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "You do not own this product"
  }
}
```

### 409 Already Purchased

```json
{
  "error": {
    "code": "CONFLICT",
    "message": "You already have access to this product"
  }
}
```

### 400 Invalid Listing

```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "Cannot create multiple listings of the same type"
  }
}
```

### 409 Product Has Buyers

```json
{
  "error": {
    "code": "RESOURCE_IN_USE",
    "message": "Cannot delete product with active paid buyers"
  }
}
```
