---
id: "BP-infraestructura"
title: "Infraestructura"
type: blueprint
status: active
version: "v0.1.0"
created: "2026-04-05T00:00:00Z"
updated: "2026-04-05T00:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [blueprint, ops, infrastructure, server]
area: "Ops"
semaforo: "amarillo"
license: "CC-BY-4.0"
---
# BP — Infraestructura

> **Resumen:** Plano del sistema: estado actual, objetivo, gaps y dependencias.
> **Epistémico:** El estado real vs. el objetivo — dónde estamos y hacia dónde vamos.
> **Pragmático:** Identificar qué misiones abren los gaps documentados.
> **Audiencia:** Agentes · Oráculos

---


> *Plano recuperado de los registros técnicos de la CAO. Documenta la arquitectura física sobre la que Numinia opera.*

**Semáforo:** 🟡 En progreso

---

## Estado actual

- VPS 161.35.215.224 — 7.8GB RAM, 4 CPUs, 154GB disco
- Umami Analytics corriendo en :3001 (analytics.pablofm.com via Caddy)
- Cal.com corriendo en :3002 (cal.pablofm.com via Caddy)
- Caddy como reverse proxy con SSL automático (Let's Encrypt)
- Sin Ollama — sin modelos locales
- PC dedicado on-premises en camino (Ryzen 9 7950X + RTX 4080)

## Estado objetivo

- Caddy operativo para todos los servicios
- analytics.pablofm.com → Umami ✅
- cal.pablofm.com → Cal.com ✅
- Ollama con Qwen2.5:7B y Llama3.2:3B (cuando llegue el PC)
- PC dedicado — migrar toda la infra (MIS-052)

## Decisiones relacionadas

- DEC-001: Self-hosting sobre SaaS — control de datos, filosofía ZK, coste 0 en servicios
- Docker Compose por servicio: aislamiento, fácil de mantener
- PostgreSQL sobre MongoDB: relacional, fiable, mejor para joins

## Delta (brecha → misión)

| Brecha | Misión |
|---|---|
| Sin Ollama | MIS-052 — PC on-premises |
| PC en camino | MIS-052 — Ubuntu + CUDA + Ollama |

## Preguntas abiertas

- ¿Cuándo llega el PC dedicado exactamente?
- ¿Qué servicios migran primero al PC local?

## Dependencias

- BP-web
- BP-cao

---

*Nimrod 🗡️ — 2026-04-05*
