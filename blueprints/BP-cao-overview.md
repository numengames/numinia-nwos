---
id: "BP-cao-overview"
title: "CAO — overview"
type: blueprint
status: active
version: "1.0.0"
created: "2026-08-17T19:30:52Z"
created_source: "git:809f717"
created_confidence: exact
updated: "2026-08-27T22:31:29Z"
author: "nimrod"
owner: "oracle"
tags: [blueprint, cao, overview]
territory: "CAO"
license: "CC-BY-4.0"
extraction_note: "Extracted verbatim from web/src/pages/cao.astro (MIS-071 phase 2 — File over App). Page-only content: the public dashboard snapshot (per-agent metrics, KPI totals, ROI claim, dashboard note and hero prose) absent from BP-cao.md and BP-cao-architecture.md. The agent roster also diverges from BP-cao.md: the page lists Alquimista-01 and Exegeta-01 (not Ursa/Senet), Adonaz on claude-sonnet-4.6, and Procurador-01 in estado 'diseñado' without target year. Translated to English under MIS-116 (ADR-024) — language only."
---

# Agent Dashboard

> **Numen Games · CAO**

Real-time metrics for the digital agents of the Centralized Autonomous Organization.

**Period:** 2026-04-02 / 2026-04-07 · **Updated:** 2026-04-07

---

## Global KPIs

| KPI | Value | Note |
|-----|-------|------|
| Missions | 58 | completed |
| Total cost | $102 | USD in 3 days |
| Active agents | 2/6 | of 6 designed |
| Estimated ROI | +40x | infra valued >$2K |

---

## Agents

| Agent | Role | Guild | Model | State | Missions | PRs | Docs | Cost |
|-------|-----|-------|-------|-------|----------|-----|------|------|
| Nimrod | Guardián de las Puertas | Centinelas | claude-sonnet-4.6 | Active | 58 | 41 | 80 | $100 |
| Alquimista-01 | Digital CTO | Alquimistas | claude-sonnet-4.6 | Designed | 0 | 0 | 0 | $0 |
| Exegeta-01 | Content & Lore | Exegetas | claude-haiku-3.5 | Designed | 0 | 0 | 0 | $0 |
| Procurador-01 | Sales & BD | Procuradores | claude-haiku-3.5 | Designed | 0 | 0 | 0 | $0 |
| Adonaz | Archivista General | Exégetas | claude-sonnet-4.6 | Active | 2 | 0 | 5 | $2 |
| Procyon | CAO Coordinator | Coordinador | claude-sonnet-4.6 | Planned 2028 | 0 | 0 | 0 | $0 |

*State labels on the original page: `activo` → «Activo» · `diseñado` → «Diseñado» · `previsto-2028` → «Previsto 2028». The «Docs» column exists in the data but is not rendered on the agent cards (only Missions, PRs and Cost).*

---

## About this dashboard

Metrics of Numen Games' CAO (Centralized Autonomous Organization). The digital agents operate 24/7 executing missions while the Oracles rest. Automatic update on every reporting cycle.

---

*Metadata of the original page (`cao.astro`), translated: HTML title «CAO Dashboard — Numen Games» · description «Metrics panel of the Numen Games Centralized Autonomous Organization. Digital agents, missions, costs and ROI.» · canonical route `/cao`.*
