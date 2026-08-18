---
id: "MIS-091"
title: "Los iconos hablan Phosphor y la tipografía cierra filas con el sistema"
type: mission
status: done
version: "1.0.0"
created: "2026-08-18"
updated: "2026-08-18"
author: "claude-fable-5"
owner: "oracle"
tags: [web, viewer, design-system, icons, typography]
license: "CC-BY-4.0"
mission_id: "MIS-091"
area: "Viewer / numinia.org"
guild: "Alchemists"
type_execution: "digital"
priority: "medium"
effort: "S"
requested_by: "oracle"
assigned_to: "numinia-nwos"
started: "2026-08-18"
completed: "2026-08-18"
depends_on: ["MIS-090"]
---
# MIS-091 — Los iconos hablan Phosphor y la tipografía cierra filas

> **Resumen:** numinia.org sustituye sus SVG sueltos por el subconjunto
> Phosphor de la casa (§7.3, autoalojado, currentColor) y adopta los
> fallbacks tipográficos y el foco canónicos. Incluye una propuesta de
> ampliación del subconjunto (4 glifos) para firma del Oráculo.
> **Epistémico:** Qué vocabulario iconográfico usa realmente el viewer.
> **Pragmático:** Un solo origen de iconos, un componente, cero glifos
> dibujados a mano.
> **Audiencia:** Oráculo · Agente numinia-nwos

---

**Area:** Viewer / numinia.org · **Guild:** Alchemists · **Type:** digital
**Priority:** medium · **Effort:** S

---

## Story

Como Oráculo, quiero que cada icono y cada pila tipográfica del viewer
salgan del Sistema de Diseño v5.0.0, para que ninguna pieza de interfaz
hable un dialecto propio.

## Propuesta de ampliación del subconjunto (§7.3 — pendiente de firma)

El subconjunto canónico (26 glifos) no cubre cuatro conceptos que el viewer
necesita; entran como propone §7.3 — con su concepto declarado:

| Glifo | Concepto declarado | Dónde |
|---|---|---|
| `copy` | copiar el .md canónico al portapapeles | DocToolbar |
| `file-pdf` | descargar el artefacto PDF (MIS-088) | DocToolbar |
| `list` | menú de navegación móvil | Navigation |
| `x` | cerrar / limpiar búsqueda (≠ `x-logo`, que es la red social) | buscador de misiones |

Si el Oráculo los rechaza, cada uso vuelve al glifo del subconjunto que él
designe.

## Execution log

- 2026-08-18 — 30 SVG autoalojados en `web/src/icons/` (los 26 canónicos
  copiados de `numinia-web:packages/ui/src/icons/` + los 4 propuestos,
  bajados de `phosphor-icons/core`, MIT; anotados en REUSE).
- 2026-08-18 — Componente `Icon.astro` (inline, currentColor, tamaño por
  prop; error de build si el nombre no está en el subconjunto — ampliar es
  decisión, no descuido).
- 2026-08-18 — 17 usos migrados: flecha de retorno → `caret-left` (12
  páginas), chevron de menú → `caret-down`, hamburguesa → `list`, buscador
  → `magnifying-glass` + `x`, DocToolbar → `copy` + `download-simple` +
  `file-pdf`. Los SVG de diagrama (archive, wardley) no son iconos y no se
  tocan.
- 2026-08-18 — Tipografía: pilas con los fallbacks canónicos §4.1
  (Inter/Aptos/Segoe UI/Arial · Consolas/Courier New); anillo de foco del
  kit (`2px #018EA1, offset 2`). La escala §4.3 completa queda para la
  convergencia con el kit `sistema.*` cuando se regenere.

## Execution Reality

- **Technology/approach used:** subconjunto autoalojado + componente Astro
  con glob raw — el mismo patrón que numinia-web, sin dependencia npm.
- **Why it diverged:** no divergió; la única decisión fue no inventar
  iconos: los 4 conceptos sin glifo canónico entran como propuesta formal
  en vez de colarse.
- **Key learning:** el vocabulario iconográfico real de un sitio cabe en
  una tabla — auditarlo primero evita importar catálogos enteros.
- **Closing date:** 2026-08-18
- **Executing agent:** claude-fable-5 (numinia-nwos)
