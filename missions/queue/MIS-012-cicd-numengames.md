---
id: "MIS-00012"
title: "Configurar pipeline CI/CD numengames.com"
type: mission
status: backlog
created: "2026-04-04T00:00:00Z"
area: "Infraestructura"
guild: "Centinelas"
tipo: "digital"
priority: "high"
effort: "M"
license: "CC-BY-4.0"
---
# MIS-012 — Configurar pipeline CI/CD numengames.com

> **Resumen:** Misión del sistema NWOS con criterios, valor epistémico y pragmático.
> **Epistémico:** Qué aprendes leyendo este documento.
> **Pragmático:** Qué puedes hacer con este documento.
> **Audiencia:** Agentes · Oráculos

---


**Area:** Infraestructura · **Gremio:** Centinelas · **Tipo:** 🤖 Digital · **Prioridad:** 🟠 Alta · **Esfuerzo:** M

## Historia

Como agente, quiero poder hacer deploy de numengames.com via PR sin intervención manual, para reducir fricción de despliegue.

## Criterios de aceptación

- [ ] GitHub Actions configurado para numengames.com
- [ ] Deploy automático en merge a main
- [ ] Tests de build obligatorios antes de merge
- [ ] Notificación de deploy en Telegram

## Valor epistémico

Mide la madurez del flujo de trabajo del equipo técnico.

## Valor pragmático

Los agentes pueden hacer mejoras sin depender de Pablo para el deploy.
