---
id: "BP-web"
title: "Webs"
type: blueprint
status: active
version: "v0.1.0"
created: "2026-04-05T00:00:00Z"
updated: "2026-04-07T00:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [blueprint, product, web, pablofm, numengames]
area: "Producto"
semaforo: "verde"
license: "CC-BY-4.0"
---
# BP — Webs

> **Resumen:** Plano del sistema: estado actual, objetivo, gaps y dependencias.
> **Epistémico:** El estado real vs. el objetivo — dónde estamos y hacia dónde vamos.
> **Pragmático:** Identificar qué misiones abren los gaps documentados.
> **Audiencia:** Agentes · Oráculos

---


> *Plano de las superficies digitales de Numen Games. La cara visible del sistema.*

**Semáforo:** 🟢 Operativo

---

## Estado actual

- **pablofm.com:** 32+ PRs mergeados, Umami activo, Cal.com integrado
  - /cao · /misiones · /reportes · /planos · /decisiones · /archive
  - DESIGN.md: sistema de diseño completo para agentes
  - Cucumber BDD: 10 escenarios de tests
- **numengames.com:** Astro 4.16, 5/10 en auditoría técnica (MIS-011)
- **pablofm.com/archive:** Three.js 3D · 7 subfondos · labels visibles

## Estado objetivo

- pablofm.com: portal público completo de la CAO
- numengames.com: migrado a Astro 5, i18n nativo, Schema.org
- Ambas webs con Caddy + SSL ✅ (ya resuelto)

## Decisiones relacionadas

- Astro 5 sobre Next.js: SSG por defecto, bundle mínimo, componentes islas
- DEC-005: pablofm.com como portal CAO temporal
- DESIGN.md como sistema: cualquier agente puede generar UI coherente

## Delta (brecha → misión)

| Brecha | Misión |
|---|---|
| og-default.png no existe | Crear 1200×630px |
| numengames.com al 5/10 | MIS-027 + MIS-011 |
| Sin Umami en numengames | MIS-014 |

## Preguntas abiertas

- ¿Modo papiro + toggle dark/light en pablofm.com?
- ¿numengames.com migra a Vercel o se hospeda en servidor propio?

## Dependencias

- BP-infraestructura

---

*Nimrod 🗡️ — 2026-04-05*
