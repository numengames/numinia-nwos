---
id: "blueprints-index"
uid: "018ef810-0057-7000-8000-000000000058"
title: "Blueprints — Index"
type: meta
status: active
version: "1.0.0"
created: "2026-04-07T19:03:00Z"
updated: "2026-04-07T19:03:00Z"
author: "nimrod"
owner: "oracle"
tags: [blueprints, index]
license: "CC-BY-4.0"
---
# Blueprints — System Designs

> **Summary:** Index of all blueprint documents in the NWOS system.
> **Epistemic:** What designs exist, their status, and what gaps they address.
> **Pragmatic:** Find the right blueprint before designing something that already exists.
> **Audience:** Agents · Oracles

---

Blueprints are architectural designs and frameworks — not decisions (those live in `decisions/`) and not protocols (those live in `protocols/`). A blueprint moves from `draft` → `review` → `approved` before implementation.

## Active blueprints

| ID | Title | Status | Version | Area |
|----|-------|--------|---------|------|
| [BP-cao](BP-cao.md) | CAO — Centralized Autonomous Organization | 🟡 active (needs update) | v0.1.0 | CAO |

## Draft blueprints

| ID | Title | Status | Version | Area |
|----|-------|--------|---------|------|
| [BP-business-metrics](BP-business-metrics.md) | Business Metrics Framework | 📝 draft | 0.1.0 | CAO / Business |
| [BP-mission-system-v2](BP-mission-system-v2.md) | Mission System v2 — Kanban, Sub-missions, States, IDs | 📝 draft | 0.1.0 | CAO / Product |

## How to create a blueprint

1. Create `blueprints/BP-{descriptor}.md` using the standard frontmatter
2. Set `status: draft`
3. Add to this INDEX
4. When ready for review: open PR with label `blueprint-review`
5. Oracle approves → status moves to `active`

---

## Version history

- v1.0.0 (2026-04-07) — Initial creation. Adonaz QA finding: fund had no index. (MIS-057)
