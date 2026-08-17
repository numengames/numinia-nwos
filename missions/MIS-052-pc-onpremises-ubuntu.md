---
id: "MIS-00052"
title: "On-premises infrastructure — Dedicated PC"
type: mission
status: in-progress
version: "1.1.0"
created: "2026-04-05T00:00:00Z"
updated: "2026-04-07T18:00:00Z"
author: "pablo-fm"
owner: "oracle"
tags: [infrastructure, hardware, ollama, sentinels]
license: "CC-BY-4.0"
mission_id: "MIS-052"
assigned_to: "nimrod"
requested_by: "oracle"
area: "Infrastructure"
guild: "Sentinels"
tipo: "digital"
priority: "high"
effort: "L"
status: "in-progress"
started: null
completed: null
blocked_reason: "PC in transit — pending physical arrival"
---
# MIS-052 — On-premises infrastructure — Dedicated PC

> **Summary:** NWOS system mission.
> **Epistemic:** What you learn by reading this document.
> **Pragmatic:** What you can do with this document.
> **Audience:** Agents · Oracles

---

**Area:** Infrastructure · **Guild:** Sentinels · **Type:** 🤖 Digital
**Priority:** 🟠 High · **Effort:** L

---

## Story

As operator, I want a dedicated on-premises PC with Ubuntu 24.04 and Ollama, to reduce inference costs by 60-70% by running local models.

---

## Acceptance criteria

- [ ] Ubuntu 24.04 LTS installed on Ryzen 9 7950X + RTX 4080
- [ ] NVIDIA drivers + CUDA configured
- [ ] Ollama installed with Mistral 7B, Qwen2.5 14B
- [ ] OpenClaw connected to local node
- [ ] VPS services migrated

---

## Epistemic value

Determines which models fit in 16 GB VRAM and which tasks can migrate to local.

## Pragmatic value

Drastic reduction in monthly Anthropic API costs (~60-70%).

---

## Hardware

- **CPU:** AMD Ryzen 9 7950X
- **GPU:** RTX 4080 (16 GB VRAM)
- **RAM:** 32 GB DDR5
- **SSD:** Corsair MP600 2TB NVMe
- **Motherboard:** ASUS PRIME X670E-PRO WIFI
- **OS:** Ubuntu 24.04 LTS

---

## Notes

PC in transit. When it arrives: install Ubuntu → CUDA → Ollama → connect to OpenClaw as local node.

---

## Version history

- v1.0.0 (2026-04-05) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
