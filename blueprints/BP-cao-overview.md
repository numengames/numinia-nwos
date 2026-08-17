---
id: "BP-cao-overview"
title: "CAO — visión general"
type: blueprint
status: active
version: "1.0.0"
created: "2026-04-07T00:00:00Z"
updated: "2026-08-17T00:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [blueprint, cao, overview]
area: "CAO"
license: "CC-BY-4.0"
extraction_note: "Extracted verbatim from web/src/pages/cao.astro (MIS-071 phase 2 — File over App). Page-only content: the public dashboard snapshot (per-agent metrics, KPI totals, ROI claim, dashboard note and hero prose) absent from BP-cao.md and BP-cao-architecture.md. The agent roster also diverges from BP-cao.md: the page lists Alquimista-01 and Exegeta-01 (not Ursa/Senet), Adonaz on claude-sonnet-4.6, and Procurador-01 in estado 'diseñado' without target year."
---

# Dashboard de Agentes

> **Numen Games · CAO**

Métricas en tiempo real de los agentes digitales de la Organización Autónoma Centralizada.

**Período:** 2026-04-02 / 2026-04-07 · **Actualizado:** 2026-04-07

---

## KPIs globales

| KPI | Valor | Nota |
|-----|-------|------|
| Misiones | 58 | completadas |
| Coste total | $102 | USD en 3 días |
| Agentes activos | 2/6 | de 6 diseñados |
| ROI estimado | +40x | infra valorada >$2K |

---

## Agentes

| Agente | Rol | Gremio | Modelo | Estado | Misiones | PRs | Docs | Coste |
|--------|-----|--------|--------|--------|----------|-----|------|-------|
| Nimrod | Guardián de las Puertas | Centinelas | claude-sonnet-4.6 | Activo | 58 | 41 | 80 | $100 |
| Alquimista-01 | CTO Digital | Alquimistas | claude-sonnet-4.6 | Diseñado | 0 | 0 | 0 | $0 |
| Exegeta-01 | Content & Lore | Exegetas | claude-haiku-3.5 | Diseñado | 0 | 0 | 0 | $0 |
| Procurador-01 | Sales & BD | Procuradores | claude-haiku-3.5 | Diseñado | 0 | 0 | 0 | $0 |
| Adonaz | Archivista General | Exégetas | claude-sonnet-4.6 | Activo | 2 | 0 | 5 | $2 |
| Procyon | CAO Coordinator | Coordinador | claude-sonnet-4.6 | Previsto 2028 | 0 | 0 | 0 | $0 |

*Etiquetas de estado en la página original: `activo` → «Activo» · `diseñado` → «Diseñado» · `previsto-2028` → «Previsto 2028». La columna «Docs» existe en los datos pero no se renderiza en las tarjetas de agente (solo Misiones, PRs y Coste).*

---

## Sobre este dashboard

Métricas de la CAO (Organización Autónoma Centralizada) de Numen Games. Los agentes digitales operan 24/7 ejecutando misiones mientras los Oráculos descansan. Actualización automática en cada ciclo de reporting.

---

*Metadatos de la página original (`cao.astro`): título HTML «CAO Dashboard — Numen Games» · descripción «Panel de métricas de la Organización Autónoma Centralizada de Numen Games. Agentes digitales, misiones, costes y ROI.» · ruta canónica `/cao`.*
