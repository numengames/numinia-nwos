---
id: "BP-infraestructura"
title: "Infrastructure"
type: blueprint
status: active
version: "v0.1.0"
created: "2026-04-05T00:00:00Z"
updated: "2026-04-05T00:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [blueprint, ops, infrastructure, server]
area: "Ops"
semaforo: "amarillo"
license: "CC-BY-4.0"
---
# BP — Infrastructure

> **Summary:** System blueprint: current state, target, gaps and dependencies.
> **Epistemic:** The real state vs. the target — where we are and where we are going.
> **Pragmatic:** Identify which missions close the documented gaps.
> **Audience:** Agents · Oracles

---


> *Blueprint recovered from the CAO's technical records. It documents the physical architecture Numinia operates on.*

**Traffic light:** 🟡 In progress

---

## Current state

- VPS [VPS-IP redacted — see ops-credential-map] — 7.8GB RAM, 4 CPUs, 154GB disk
- Umami Analytics running on :3001 (analytics.pablofm.com via Caddy)
- Cal.com running on :3002 (cal.pablofm.com via Caddy)
- Caddy as reverse proxy with automatic SSL (Let's Encrypt)
- No Ollama — no local models
- Dedicated on-premises PC on the way (Ryzen 9 7950X + RTX 4080)

## Target state

- Caddy operational for all services
- analytics.pablofm.com → Umami ✅
- cal.pablofm.com → Cal.com ✅
- Ollama with Qwen2.5:7B and Llama3.2:3B (when the PC arrives)
- Dedicated PC — migrate all the infra (MIS-052)

## Related decisions

- DEC-001: Self-hosting over SaaS — data control, ZK philosophy, zero cost in services
- Docker Compose per service: isolation, easy to maintain
- PostgreSQL over MongoDB: relational, reliable, better for joins

## Delta (gap → mission)

| Gap | Mission |
|---|---|
| No Ollama | MIS-052 — on-premises PC |
| PC on the way | MIS-052 — Ubuntu + CUDA + Ollama |

## Open questions

- When exactly does the dedicated PC arrive?
- Which services migrate to the local PC first?

## Dependencies

- BP-web
- BP-cao

---

*Nimrod 🗡️ — 2026-04-05*
