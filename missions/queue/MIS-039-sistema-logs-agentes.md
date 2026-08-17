---
id: "MIS-00039"
title: "Sistema de logs de agentes"
type: mission
status: backlog
created: "2026-04-04T00:00:00Z"
area: "CAO"
guild: "Centinelas"
tipo: "digital"
priority: "high"
effort: "S"
license: "CC-BY-4.0"
---
# MIS-039 — Sistema de logs de agentes

> **Resumen:** Misión del sistema NWOS con criterios, valor epistémico y pragmático.
> **Epistémico:** Qué aprendes leyendo este documento.
> **Pragmático:** Qué puedes hacer con este documento.
> **Audiencia:** Agentes · Oráculos

---


**Area:** CAO · **Gremio:** Centinelas · **Tipo:** 🤖 Digital · **Prioridad:** 🟠 Alta · **Esfuerzo:** S

## Historia

Como operador, quiero un log estructurado de cada acción ejecutada por cada agente, para auditar el sistema en cualquier momento.

## Criterios de aceptación

- [ ] Formato de log definido: timestamp, agente, acción, resultado, coste
- [ ] Log escrito automáticamente en cada misión
- [ ] Logs accesibles en el repo (operations/logs/)
- [ ] Resumen incluido en reporte diario

## Valor epistémico

Sin logs, no hay auditoría. Sin auditoría, no hay confianza.

## Valor pragmático

Trazabilidad completa de qué hizo cada agente y cuánto costó.
