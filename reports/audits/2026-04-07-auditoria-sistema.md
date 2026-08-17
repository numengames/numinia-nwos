---
id: "AUD-2026-04-07-sistema"
title: "Auditoría del sistema — 16 divergencias web vs repo"
type: report
subtype: audit
status: published
version: "1.0.0"
created: "2026-04-07T00:00:00Z"
updated: "2026-08-17T00:00:00Z"
author: "nimrod"
tags: [audit, transparency, divergences, web, repo]
license: "CC-BY-4.0"
extraction_note: "Extracted verbatim from web/src/pages/auditoria.astro (MIS-071 phase 1 — audits/auditoria merge). Supersedes and extends blueprints/AUDIT-2026-04-07-web-vs-repo.md. Content preserved in its original Spanish."
---

# Auditoría del sistema

> **Resumen:** Divergencias entre **pablofm.com** y el repositorio **numinia-nwos**. No nos avergonzamos de los gaps — los estudiamos y los resolvemos.
> **Audiencia:** Transparencia radical — pública (Numen Games · NWOS · Transparencia).

**Auditoría:** 2026-04-07 · Alquimista-01 + Exégeta-01 + Nimrod

| Métrica | Valor |
|---------|-------|
| Score de coherencia | **8.8/10** |
| Críticos | 5 |
| Importantes | 6 |
| Menores | 5 |

---

## ⚠ Causa raíz

### La fuente de verdad está dividida

El repo es la fuente de verdad declarada del NWOS. La web lee de archivos TypeScript hardcodeados. Mientras no haya un pipeline GitHub API → web, la divergencia es inevitable y creciente.

**Solución:** MIS-00040 (Dashboard KPIs con GitHub API). Estimación: 1-2 sprints. Impacto: resuelve A-001, A-002, A-003, A-005 y previene todas las futuras.

**Urgencia:** critical

---

## 🔴 Críticos — 5

*Afectan veracidad o continuidad.*

### A-001 — CAO dashboard congelado en 2026-04-05

- **Estado:** abierto
- **Divergencia:** Los datos del dashboard /cao están hardcodeados: 47 misiones, ~$50, 10 PRs. La realidad actual es 57 misiones, ~$100, ~40 PRs. No hay mecanismo de actualización automática.
- **Impacto:** Cualquier externo que vea /cao recibe información falsa sobre el estado del sistema.
- **Fix:** Conectar /cao a la GitHub API del repo para leer datos en tiempo real. MIS-00040 (Dashboard KPIs).

### A-002 — 3 misiones ausentes en la web (MIS-00055, 056, 057)

- **Estado:** abierto
- **Divergencia:** El repo tiene 57 misiones. La web muestra 54. MIS-00055 (Nomenclatura Dual), MIS-00056 (i18n), MIS-00057 (QA profundo) no están en la web.
- **Impacto:** El trabajo más reciente no es visible públicamente.
- **Fix:** Actualizar misiones.ts con las 3 misiones nuevas. Corto plazo: 1 PR.

### A-003 — RPT-2026-04-07 no publicado · RPT-2026-04-04 faltante

- **Estado:** abierto
- **Divergencia:** El reporte del 7 de abril existe en el repo pero no en la web. El reporte del 4 de abril tiene un hueco — no aparece ni en el listado.
- **Impacto:** El historial público de operaciones tiene lagunas.
- **Fix:** Publicar RPT-2026-04-07 y verificar/crear RPT-2026-04-04.

### A-004 — El agente se llama Nimrod, la web dice Centinela-01

- **Estado:** abierto
- **Divergencia:** El 2026-04-06 el agente fue renombrado a Nimrod. El /cao sigue mostrando 'Centinela-01' como nombre oficial.
- **Impacto:** Incoherencia de identidad — el agente tiene dos nombres según dónde mires.
- **Fix:** Actualizar el label en cao.astro. 5 minutos.

### A-005 — Pipeline web↔repo no existe — todo es manual

- **Estado:** raíz del problema
- **Divergencia:** La web lee de archivos .ts hardcodeados (misiones.ts, planos.ts, etc.), no del repo en tiempo real. Cada vez que el repo crece, la web queda obsoleta automáticamente.
- **Impacto:** Divergencia estructural garantizada. El sistema no puede ser coherente con sincronización manual.
- **Fix:** Implementar GitHub API como fuente de datos en tiempo real. MIS-00040. Estimación: 1 sprint.

---

## 🟡 Importantes — 6

*Afectan completitud.*

### A-006 — ADR-001 y ADR-002 no aparecen en /decisiones

- **Estado:** abierto
- **Divergencia:** El repo tiene 7 decisiones (ADR-001, ADR-002, DEC-00001 a DEC-00005). La web solo muestra las 5 DEC. Las decisiones técnicas de arquitectura (GitHub como Archive Summa, Markdown como formato universal) no son visibles.
- **Fix:** Añadir ADR-001 y ADR-002 a la página /decisiones.

### A-007 — WARDLEY-MAP.md sin página en /planos

- **Estado:** abierto
- **Divergencia:** El repo tiene 8 blueprints, incluido WARDLEY-MAP.md. La web /planos muestra 7 planos. El Wardley vive en /wardley como página separada, no integrado como el 8º plano.
- **Fix:** Añadir el Wardley Map a /planos o añadir referencia cruzada.

### A-008 — Procyon en la web sin archivo en el repo

- **Estado:** abierto
- **Divergencia:** La web /cao lista a Procyon como '5º agente / CAO Coordinator'. El repo agents/ tiene nimrod, adonaz, alquimista-01, exegeta-01, procurador-01 — Procyon no existe como archivo. Se le atribuye la generación de 54 misiones.
- **Fix:** Crear agents/procyon/ con SOUL.md básico que documente su rol futuro (2028).

### A-009 — Adonaz existe en el repo pero no en /cao

- **Estado:** abierto
- **Divergencia:** agents/adonaz/ tiene SOUL.md, OPERATOR.md y STATUS.md completos. Sin embargo, el dashboard /cao no lo muestra como agente activo.
- **Fix:** Añadir Adonaz al dashboard /cao.

### A-010 — Archive: falta el 8º fondo 'Governance'

- **Estado:** abierto
- **Divergencia:** STANDARDS.md, GOVERNANCE.md, CONTRIBUTING.md, APPROVAL-REQUEST-template.md y el futuro CHANGELOG.md son documentos de gobierno que no encajan en ninguno de los 7 fondos actuales. El Archive debería tener un 8º fondo.
- **Fix:** Crear el fondo 'Governance & Standards' y actualizar /archive de 7 a 8 fondos.

### A-011 — Score /continuidad: 8.8/10, no 9.5/10

- **Estado:** reconocido
- **Divergencia:** El checklist marca '✅ 54 misiones con detalle completo' — pero las misiones residen en misiones.ts del frontend, no en el repo. Es un falso positivo. Las misiones .md existen en el repo pero la web no las lee.
- **Fix:** Actualizar el score y el checklist para reflejar la realidad. Este documento.

---

## 🟢 Menores — 5

*Deuda técnica y gaps documentales.*

| ID | Título | Descripción | Fix |
|----|--------|-------------|-----|
| A-012 | STANDARDS.md, P-006 y guilds/roster sin representación web | Documentos fundamentales del sistema creados hoy que no tienen ninguna página en pablofm.com. | Crear /standards o integrar en /nwos. Decisión editorial pendiente. |
| A-013 | /simulaciones, /ventas, /gaps, /soluciones sin archivo en el repo | Análisis estratégicos de alta calidad que existen en la web pero no están en el Archive Summa. El conocimiento queda atrapado en el frontend. | Crear BP-simulaciones.md, BP-gaps-y-soluciones.md en blueprints/. Las soluciones concretas → misiones en backlog. |
| A-014 | 3 gaps críticos de /gaps sin misión en el repo | 'Ausencia de prueba de valor externa', 'El problema del comprador fantasma', 'Burbuja fundacional' — los 3 gaps con urgencia 10/10 no tienen misión correspondiente. | Crear MIS-00058, MIS-00059, MIS-00060 en missions/backlog/. |
| A-015 | Política ES/EN no explícita en STANDARDS.md | STANDARDS.md §3 dice 'ES para operaciones internas, EN para docs públicos' pero no cubre los IDs de prefijo (MIS-, DEC-, BP- son EN aunque los títulos sean ES). Ambigüedad que generará inconsistencias. | Añadir sección §9 'Política de naming de directorios y prefijos' en STANDARDS.md. |
| A-016 | 5 pendientes del Diagrama C sin misión en el repo | La página /agente lista 6 componentes pendientes (Vector DB, Event Bus, Mission State Machine, Knowledge Graph, Observability). Ninguno tiene misión correspondiente. | Crear misiones para al menos los 3 más críticos (Vector DB, Event Bus, Mission State Machine). |

---

## Score de coherencia — actualizado

**9.5/10** (Score previo, sobreestimado) → **8.8/10** (Score real, 2026-04-07)

El score anterior de 9.5/10 contaba las misiones como si estuvieran en el repo. En realidad, residen en `misiones.ts` del frontend. Los archivos .md individuales existen en el repo — pero la web no los lee. El claim de continuidad era un falso positivo.

- ✅ Nimrod con SOUL + OPERATOR + STATUS + MEMORY en el repo
- ✅ 10 seminales en canon/ con knowledge graph
- ✅ 7 decisiones en el repo (ADR-001/002 + DEC-00001/005)
- ✅ 6 días de reportes históricos
- ✅ 5 agentes con SOUL.md en el repo
- ✅ STANDARDS.md v1.0.0 — ISO 8601, UUID v7, frameworks
- ❌ 54 misiones en misiones.ts (web) → repo aún no las sirve
- ❌ Memoria diaria persistida en git al cierre
- ❌ Pipeline GitHub API → web (fuente de verdad en tiempo real)

---

## Próximos pasos para llegar al 10/10

| Severidad | Acción | Prioridad |
|-----------|--------|-----------|
| 🔴 | Actualizar CAO dashboard (Nimrod, 57 misiones, $100, 40 PRs) | Esta semana |
| 🔴 | Publicar RPT-2026-04-07 en la web | Esta semana |
| 🔴 | Añadir MIS-00055, 056, 057 a misiones.ts | Esta semana |
| 🟡 | Añadir ADR-001 y ADR-002 a /decisiones | Esta semana |
| 🟡 | Crear agents/procyon/ con SOUL.md básico | Esta semana |
| 🔴 | GitHub API como fuente de datos en tiempo real (MIS-00040) | Próximo sprint |
| 🟢 | BP-simulaciones.md y BP-gaps-y-soluciones.md en el repo | Próximo sprint |
| 🟡 | Validar nomenclatura /idioma → DEC-006 | Dark Council |

---

## Enlaces de la página original

- Missions → `/missions`
- Continuidad → `/continuidad`
- Repositorio → https://github.com/numengames/numinia-nwos

---

*Metadatos de la página original (`auditoria.astro`): título HTML «Auditoría del sistema — NWOS · Numen Games» · descripción «Divergencias entre pablofm.com y el repositorio numinia-nwos. Transparencia radical: no nos avergonzamos de los gaps, los estudiamos y los resolvemos.» · ruta canónica `/auditoria`.*
