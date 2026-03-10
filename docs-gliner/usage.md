---
title: GLiNER Usage
sidebar_label: Usage
sidebar_position: 2
description: API reference and deployment guide for the GLiNER inference server
---

# GLiNER Usage

## Quick Start (Docker)

### Run with GPU (recommended)

Prerequisite: NVIDIA Container Toolkit installed.

```bash
docker run --rm --gpus all \
  -p 8089:8089 \
  -e GLINER_DEVICE=cuda \
  <dockerhub-namespace>/gliner-inference:latest
```

If you see GPU OOM during ingestion, start with smaller batches and shorter chunks:

```bash
docker run --rm --gpus all \
  -p 8089:8089 \
  -e GLINER_DEVICE=cuda \
  -e GLINER_BATCH_SIZE=1 \
  -e GLINER_GPU_MEM_LIMIT=8G \
  -e GLINER_MAX_CHARS=900 \
  <dockerhub-namespace>/gliner-inference:latest
```

### Run with CPU

```bash
docker run --rm \
  -p 8089:8089 \
  -e GLINER_DEVICE=cpu \
  <dockerhub-namespace>/gliner-inference:latest
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | `GET` | Liveness check and active model/device |
| `/ready` | `GET` | Readiness check and queue depth |
| `/metrics` | `GET` | Prometheus metrics |
| `/models` | `GET` | Active model configuration |
| `/extract` | `POST` | Single-text extraction |
| `/extract/batch` | `POST` | Batch extraction |

### POST /extract

Request:

```json
{
  "text": "Apple Inc. was founded by Steve Jobs in Cupertino.",
  "labels": ["person", "organization", "location"],
  "threshold": 0.5
}
```

Response:

```json
{
  "entities": [
    {
      "text": "Apple Inc.",
      "label": "organization",
      "score": 0.99,
      "start": 0,
      "end": 10
    }
  ],
  "model": "onnx-community/gliner_small-v2.1",
  "latency_ms": 12.4
}
```

### POST /extract/batch

Request:

```json
{
  "texts": [
    "Apple acquired Beats in 2014.",
    "Google was founded in Mountain View."
  ],
  "labels": ["organization", "date", "location"],
  "threshold": 0.5
}
```

Response:

```json
{
  "results": [
    { "text_index": 0, "entities": [] },
    { "text_index": 1, "entities": [] }
  ],
  "model": "onnx-community/gliner_small-v2.1",
  "latency_ms": 23.7
}
```

## Common Integration Flow

1. Start the container.
2. Poll `GET /ready` until `ready=true`.
3. Send extraction requests to `POST /extract` or `POST /extract/batch`.
4. Parse entities and store/index downstream.

## Configuration

Configure via environment variables:

| Env var | Default | Description |
|---------|---------|-------------|
| `GLINER_MODEL` | `onnx-community/gliner_small-v2.1` | Model ID or local model path |
| `GLINER_DEVICE` | `cuda` | `cuda` or `cpu` |
| `PORT` | `8089` | HTTP port |
| `GLINER_BATCH_SIZE` | `4` | Max texts per inference batch |
| `GLINER_BATCH_TIMEOUT_MS` | `50` | Wait time to fill batch |
| `GLINER_MAX_QUEUE_DEPTH` | `1000` | Request queue cap before rejection |
| `GLINER_THRESHOLD` | `0.5` | Default confidence threshold |
| `GLINER_DEFAULT_LABELS` | `person,organization,location,date,product,event,money` | Default labels when request labels are omitted |
| `GLINER_MAX_CHARS` | `1200` | Chunk size for long-text preprocessing |
| `GLINER_CHUNK_OVERLAP` | `100` | Overlap across chunks |
| `GLINER_GPU_MEM_LIMIT` | `4G` | GPU memory cap for ONNX Runtime |

## Troubleshooting OOM

Typical symptoms include messages like `Available memory ... smaller than requested bytes`.

Recommended tuning order:

1. Reduce `GLINER_BATCH_SIZE` to `1` or `2`.
2. Reduce `GLINER_MAX_CHARS` to `700-1000`.
3. Increase `GLINER_GPU_MEM_LIMIT` (for example `6G` or `8G`).
4. Use CPU mode (`GLINER_DEVICE=cpu`) if GPU memory is constrained.

## Health Checks

```bash
curl -s http://localhost:8089/health
curl -s http://localhost:8089/ready
```
