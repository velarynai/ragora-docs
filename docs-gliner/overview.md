---
title: GLiNER Inference Server
sidebar_label: Overview
sidebar_position: 1
description: HTTP inference server for Named Entity Recognition using GLiNER models
---

# GLiNER Inference Server

Production-ready HTTP service for Named Entity Recognition (NER) using GLiNER models.

## What This Service Does

This service extracts structured entities from unstructured text, for example:

- `person`
- `organization`
- `location`
- `date`
- Custom domain labels you provide

It supports both single text and batch extraction, and is designed for high-throughput inference workloads.

## Who This Is For

This server is for teams that want to add fast entity extraction to products without managing model runtime details directly:

- Search and knowledge indexing pipelines
- Document processing and enrichment systems
- Compliance, risk, and monitoring workflows
- Customer support and automation platforms
- Any backend that needs NER as an API

## Built On gline-rs

This project uses the [gline-rs](https://github.com/fbilhaut/gline-rs) Rust library for GLiNER inference.

The server wraps `gline-rs` with production API concerns such as batching, queueing, long-text chunking, health/readiness probes, and Prometheus metrics.

## Why Use This API Instead of Calling the Model Directly

- Better throughput via request batching
- Safer handling of long texts through automatic chunk/merge
- Standard HTTP interface for multi-service environments
- Operational endpoints for Kubernetes and monitoring

## Next Steps

- [Usage Guide →](./usage)
