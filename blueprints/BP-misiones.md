---
id: "BP-misiones"
title: "Sistema de Misiones"
type: blueprint
status: active
version: "v0.1.0"
created: "2026-04-05T00:00:00Z"
updated: "2026-04-07T00:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [blueprint, cao, missions, system]
area: "CAO"
semaforo: "amarillo"
license: "CC-BY-4.0"
---
# BP — Sistema de Misiones

> **Resumen:** Plano del sistema: estado actual, objetivo, gaps y dependencias.
> **Epistémico:** El estado real vs. el objetivo — dónde estamos y hacia dónde vamos.
> **Pragmático:** Identificar qué misiones abren los gaps documentados.
> **Audiencia:** Agentes · Oráculos

---


> *En Numinia, las misiones son el pulso del trabajo. Este plano documenta cómo se crean, asignan, ejecutan y archivan.*

**Semáforo:** 🟡 En progreso

---

## Estado actual

- 54 misiones (MIS-001 a MIS-054)
- Completadas: MIS-016, MIS-037, MIS-051, MIS-053
- En curso: MIS-052, MIS-054
- Backlog: resto
- Mission Template v0.2.0 + DoD v0.2.0
- Tablero público en pablofm.com/misiones
- Repo numinia-digital-agents como fuente de verdad ✅

## Estado objetivo

- Cada misión = .md en repo numinia-digital-agents
- pablofm.com/misiones lee GitHub API en tiempo real
- Sistema de estados actualizable por agentes via PR

## Decisiones relacionadas

- .md por misión: legible por humanos y agentes, versionable en git
- Tipos 🧬/🤖/🔀: explicitan el coste y colaboración antes de activar
- Valor epistémico + pragmático obligatorio

## Delta (brecha → misión)

| Brecha | Misión |
|---|---|
| Web sin integración GitHub API | Futuro — cuando el repo sea fuente de verdad live |
| MIS-002 a 015 sin páginas de detalle | Completar datos progresivamente |

## Preguntas abiertas

- ¿Las misiones tienen épicas o sprints?
- ¿Quién puede crear misiones además de Oráculos?

## Dependencias

- BP-repo
- BP-cao

---

*Nimrod 🗡️ — 2026-04-05*
