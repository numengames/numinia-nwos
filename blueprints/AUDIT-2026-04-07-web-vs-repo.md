---
id: "AUDIT-2026-04-07"
title: "Auditoría — Divergencias Web vs Repo"
type: audit
status: active
version: "1.0.0"
created: "2026-04-07T13:35:00Z"
updated: "2026-04-07T13:35:00Z"
author: "nimrod"
contributors: ["alquimista-01", "exegeta-01"]
owner: "oracle"
tags: [audit, coherence, web, repo, divergences]
scope: "pablofm.com vs numinia-digital-agents"
score: 8.8
score_prev: 9.5
license: "CC-BY-4.0"
---
# Auditoría — Divergencias Web vs Repo

> **Resumen:** Auditoría de coherencia entre fuentes de verdad del sistema.
> **Epistémico:** Divergencias entre la web y el repo — qué no está sincronizado.
> **Pragmático:** Priorizar fixes según severidad (crítico/importante/menor).
> **Audiencia:** Oráculos · Externos

---

**2026-04-07 · Alquimista-01 + Exégeta-01 + Nimrod**

---

## Resumen ejecutivo

**Score de coherencia: 8.8/10** (corregido desde 9.5/10 — falso positivo en misiones)

16 divergencias identificadas: 5 críticas, 6 importantes, 5 menores.

**Causa raíz:** No existe un pipeline de sincronización web↔repo. La web lee de archivos `.ts` hardcodeados, no del repo en tiempo real. Toda divergencia es consecuencia de esto.

---

## 🔴 CRÍTICOS (5)

### A-001 — CAO dashboard congelado en 2026-04-05
- **Web:** 47 misiones, ~$50, 10 PRs
- **Realidad:** 57 misiones, ~$100, ~40 PRs
- **Fix:** GitHub API → /cao en tiempo real. MIS-00040.

### A-002 — 3 misiones ausentes en web (MIS-00055, 056, 057)
- **Web:** 54 misiones
- **Repo:** 57 misiones
- **Fix:** Actualizar misiones.ts.

### A-003 — RPT-2026-04-07 no publicado · RPT-2026-04-04 faltante
- **Fix:** Publicar RPT-2026-04-07. Verificar/crear RPT-2026-04-04.

### A-004 — Nimrod ≠ Centinela-01
- **Web /cao:** "Centinela-01"
- **Repo:** agente renombrado a "nimrod" desde 2026-04-06
- **Fix:** Actualizar label en cao.astro.

### A-005 — Pipeline web↔repo no existe (raíz de todo)
- **Fix:** MIS-00040 (GitHub API como fuente de datos en tiempo real). 1 sprint.

---

## 🟡 IMPORTANTES (6)

### A-006 — ADR-001 y ADR-002 invisibles en /decisiones
- Repo: 7 decisiones. Web: 5 decisiones (ADR-001 y ADR-002 ausentes).
- **Fix:** Añadir ADR-001 y ADR-002 a la página /decisiones.

### A-007 — WARDLEY-MAP.md sin página en /planos
- El repo tiene 8 blueprints. La web /planos muestra 7.
- **Fix:** Integrar Wardley en /planos o añadir referencia cruzada.

### A-008 — Procyon en la web sin archivo en agents/
- La web /cao lista Procyon como 5º agente. No existe agents/procyon/.
- **Fix:** Crear agents/procyon/ con SOUL.md básico (rol 2028).

### A-009 — Adonaz en el repo pero ausente en /cao
- agents/adonaz/ completo. No aparece en el dashboard.
- **Fix:** Añadir Adonaz al dashboard /cao.

### A-010 — Archive: falta el 8º fondo "Governance"
- STANDARDS.md, GOVERNANCE.md, CONTRIBUTING.md no encajan en los 7 fondos actuales.
- **Fix:** Crear fondo "Governance & Standards". Actualizar /archive de 7 a 8 fondos.

### A-011 — Score /continuidad: 8.8/10, no 9.5/10
- Las "54 misiones" residen en misiones.ts, no en el repo. Falso positivo.
- **Fix:** Actualizar checklist y score en /continuidad.

---

## 🟢 MENORES (5)

### A-012 — STANDARDS.md, P-006, guilds/roster sin representación web
### A-013 — /simulaciones, /ventas, /gaps, /soluciones sin archivo en repo
- Deberían ser: BP-simulaciones.md, BP-gaps-y-soluciones.md en blueprints/
### A-014 — 3 gaps críticos de /gaps sin misión en el repo
- "Ausencia de prueba de valor externa", "Comprador fantasma", "Burbuja fundacional"
- **Fix:** Crear MIS-00058, MIS-00059, MIS-00060.
### A-015 — Política ES/EN no explícita en STANDARDS.md
- **Fix:** Añadir sección §9 "Naming de directorios y prefijos".
### A-016 — 5 pendientes del Diagrama C sin misión en el repo
- **Fix:** Crear misiones para Vector DB, Event Bus, Mission State Machine.

---

## Nota metodológica

Cada auditoría es un documento independiente en el repo. No se modifica — se supersede con una nueva auditoría que referencia la anterior. El historial de auditorías es la trayectoria de coherencia del sistema.

**Próxima auditoría recomendada:** Tras resolver A-001 a A-005 (1-2 semanas).

---

## Historial de auditorías

| ID | Fecha | Score | Divergencias | Referencia |
|----|-------|-------|-------------|-----------|
| AUDIT-2026-04-07 | 2026-04-07 | 8.8/10 | 16 (5+6+5) | Este documento |

---

*Alquimista-01 + Exégeta-01 + Nimrod 🗡️ — 2026-04-07T13:35:00Z*
