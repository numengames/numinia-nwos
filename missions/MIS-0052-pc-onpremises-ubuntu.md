---
id: "MIS-052"
uid: ""
title: "On-premises infrastructure — Dedicated PC"
status: todo
priority: "high"
effort: "L"
guild: "Sentinels"
territory: "Infrastructure"
type_execution: "digital"
assigned_to: null
started: null
completed: null

type: mission
version: "1.2.0"
created: "2026-04-07T05:49:03Z"
created_source: "git:e56f6e8"
created_confidence: inferred
updated: "2026-09-02T01:48:11+02:00"
author: "pablo-fm"
owner: "oracle"
requested_by: "oracle"
tags: [infrastructure, hardware, ollama, sentinels]
license: "CC0-1.0"
---
# MIS-052 — On-premises infrastructure — Dedicated PC

> **Summary:** Dedicated on-premises PC with Ubuntu 24.04 and Ollama, to reduce inference costs by 60-70% by running local models.
> **Epistemic:** Determines which models fit in 16 GB VRAM and which tasks can migrate to local.
> **Pragmatic:** Drastic reduction in monthly Anthropic API costs (~60-70%).
> **Audience:** Agents · Oracles

## Story

As operator, I want a dedicated on-premises PC with Ubuntu 24.04 and Ollama, to reduce inference costs by 60-70% by running local models.

## Acceptance criteria

- [ ] Ubuntu 24.04 LTS installed on Ryzen 9 7950X + RTX 4080
- [ ] NVIDIA drivers + CUDA configured
- [ ] Ollama installed with Mistral 7B, Qwen2.5 14B
- [ ] OpenClaw connected to local node
- [ ] VPS services migrated

## Epistemic value

Determines which models fit in 16 GB VRAM and which tasks can migrate to local.

## Pragmatic value

Drastic reduction in monthly Anthropic API costs (~60-70%).

## Hardware

- **CPU:** AMD Ryzen 9 7950X
- **GPU:** RTX 4080 (16 GB VRAM)
- **RAM:** 32 GB DDR5
- **SSD:** Corsair MP600 2TB NVMe
- **Motherboard:** ASUS PRIME X670E-PRO WIFI
- **OS:** Ubuntu 24.04 LTS

## Notes

PC in transit. When it arrives: install Ubuntu → CUDA → Ollama → connect to OpenClaw as local node.

## Version history

- v1.0.0 (2026-04-05) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
- v1.2.0 (2026-09-02) — context card completed from the brief's own Story/Epistemic/Pragmatic text; inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 2.

## Board triage — 2026-08-25

Returned from `in-progress` to `backlog` by the Oracle, in the triage of the 111
missions. **Nothing about the brief changed and the work is still wanted** —
what changed is the claim that it was underway.

- **Category:** D — stale. No commit has ever touched this mission outside a bulk maintenance commit.
- **Signal, not proof:** this mission was assigned to an agent whose identity is
  in question (`D-026`, `D-027`). That is context; the evidence for this move is
  the absence of its own commit, not who it was assigned to.
- **Signed by:** Oracle, 2026-08-25.

## Status check — 2026-09-02

*Read against `aebcf54` during the missions/ normalisation (lot 2). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** Triaged 2026-08-25 (category D, stale). Hardware in transit since April; 0/5 criteria. Assigned nimrod (retired).
- **Recommendation:** Unassign; freeze with reason 'waiting on hardware delivery' — a todo that cannot start is frozen by STD-001's own definition. Unfreeze when the PC exists.
