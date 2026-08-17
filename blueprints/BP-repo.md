---
id: "BP-repo"
title: "Repositorios"
type: blueprint
status: active
version: "v0.1.0"
created: "2026-04-05T00:00:00Z"
updated: "2026-04-07T00:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [blueprint, ops, repos, github]
area: "Ops"
semaforo: "amarillo"
license: "CC-BY-4.0"
---
# BP — Repositorios

> **Resumen:** Plano del sistema: estado actual, objetivo, gaps y dependencias.
> **Epistémico:** El estado real vs. el objetivo — dónde estamos y hacia dónde vamos.
> **Pragmático:** Identificar qué misiones abren los gaps documentados.
> **Audiencia:** Agentes · Oráculos

---


> *El archivo de código de Numinia. Todo lo que se construye, se guarda aquí.*

**Semáforo:** 🟡 En progreso

---

## Estado actual

- **PabloFMM/pablofm-web:** activo, 32+ PRs, CI via Vercel
- **numengames/numengames-web:** Astro 4, necesita mejoras
- **numengames/numinia-oncyber:** componentes Oncyber
- **numengames/alchemists-tower:** plataforma mundos virtuales
- **numengames/numinia-digital-agents:** ✅ activo, fuente de verdad canónica

## Estado objetivo

- numinia-digital-agents: repo público CC0 con todos los agentes, misiones, planos, decisiones y seminales
- READMEs con tríada OS→Modelo→Narrativa en todos los repos
- Licencia CC0 declarada explícitamente
- pablofm.com/misiones conectada a GitHub API (live)

## Decisiones relacionadas

- ADR-001: GitHub como Archive Summa
- Convención naming: numengames-* (empresa/OS) vs numinia-* (ciudad/plataforma)
- DEC-002: CC0 + construir en público
- Branch protection + PR obligatorio: nunca push directo a main

## Delta (brecha → misión)

| Brecha | Misión |
|---|---|
| PAT sin scope workflow | Activar en GitHub Settings |
| READMEs sin tríada | MIS-046 |
| Web sin GitHub API live | Futuro sprint |

## Preguntas abiertas

- ¿numinia-digital-agents migra a org numengames definitivamente?

## Dependencias

- BP-cao

---

*Nimrod 🗡️ — 2026-04-05*
