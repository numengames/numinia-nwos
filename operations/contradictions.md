---
id: "ops-contradictions"
title: "Contradicciones pendientes — registro"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-17T00:00:00Z"
updated: "2026-08-17T00:00:00Z"
author: "claude-fable-5"
owner: "oracle"
tags: [operations, contradictions, backlog, truth]
license: "CC-BY-4.0"
---
# Contradicciones pendientes — registro

> **Resumen:** Contradicciones detectadas entre fuentes del sistema que
> nadie ha resuelto todavía. Se documentan, no se reconcilian en
> silencio: zanjarlas es decisión del Oráculo, en sesión dedicada.
> **Audiencia:** Oráculos · Agentes

**Regla:** un agente que detecta una contradicción la añade aquí con
sus dos fuentes y NO elige bando. Cuando el Oráculo la resuelve, la
entrada pasa a la sección "Resueltas" con la decisión y su fecha.

---

## Abiertas

### CON-001 — Roster CAO: página vs blueprint

- **Detectada:** 2026-08-17 (MIS-071 fase 2)
- **Fuente A:** `web/src/pages/cao.astro` — lista Alquimista-01 y
  Exegeta-01 como agentes diseñados; Adonaz en `claude-sonnet-4.6`;
  Procurador-01 "diseñado" sin año objetivo.
- **Fuente B:** `blueprints/BP-cao.md` (v0.2.0) — lista Ursa y Senet;
  Adonaz en `claude-haiku-3-5`.
- **Detalle:** `extraction_note` de `blueprints/BP-cao-overview.md`.

### CON-002 — Wardley: ventana de commoditización y capas

- **Detectada:** 2026-08-17 (MIS-071 fase 2, reconciliación)
- **Fuente A:** `blueprints/WARDLEY-MAP.md` (pre-v0.2.0) — ventana de
  12–18 meses; Mission System agrupado en "Frontier (Genesis)".
- **Fuente B:** página `/wardley` — ventana de 18–24 meses; Mission
  System en "The Differentiators"; coordenadas con jitter ±1 en 7 de
  12 componentes.
- **Estado actual:** ambas versiones conviven en `WARDLEY-MAP.md`
  v0.2.0, las de la página marcadas "(según /wardley)".

### CON-003 — Procedencia de engineering-standards.md

- **Detectada:** 2026-08-17 (adopción del estándar)
- **Fuente A:** `standards/engineering-standards.md` §Downstream y
  §7.1 — afirma que `numengames/numinia-nwos` "is a fork of the mould"
  (`numen-games-nwos-orgs/nwos-workspace-template`) y recibe el
  documento por la relación de fork.
- **Fuente B:** canon operativo del ecosistema — numinia-nwos ES la
  fuente de verdad; los repos de `numen-games-nwos-orgs` no beben de
  él, y numinia-nwos no es fork de nwos-workspace-template.
- **Nota:** la corrección, si procede, va upstream vía ADR + PR
  (§7.1); la copia local no se edita.

## Resueltas

*(Ninguna todavía.)*
