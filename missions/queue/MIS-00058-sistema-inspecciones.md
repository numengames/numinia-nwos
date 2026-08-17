---
id: "MIS-00058"
title: "Sistema de Inspecciones — tipo documental, directorio y primera inspección ISO 15489"
type: mission
status: backlog
version: "1.0.0"
created: "2026-04-07T13:42:00Z"
updated: "2026-04-07T13:42:00Z"
author: "pablo-fm"
owner: "oracle"
tags: [cao, inspections, iso, standards, archive]
license: "CC-BY-4.0"
mission_id: "MIS-00058"
assigned_to: "nimrod"
requested_by: "oracle"
area: "CAO"
guild: "Centinelas"
tipo: "digital"
priority: "high"
effort: "M"
phase: "backlog"
human_approval_score: 5
---
# MIS-00058 — Sistema de Inspecciones

> **Resumen:** Misión del sistema NWOS con criterios, valor epistémico y pragmático.
> **Epistémico:** Qué aprendes leyendo este documento.
> **Pragmático:** Qué puedes hacer con este documento.
> **Audiencia:** Agentes · Oráculos

---


**Area:** CAO · **Gremio:** Centinelas · **Tipo:** 🤖 Digital · **Prioridad:** 🟠 Alta · **Esfuerzo:** M  
**Aprobación humana requerida:** 5/10

---

## Origen

Las auditorías miden divergencias entre fuentes de verdad.  
Las inspecciones miden conformidad con estándares externos.  
Son tipos documentales distintos — necesitan su propio sistema.

Identificado durante auditoría AUDIT-2026-04-07.

---

## Historia

Como sistema NWOS, quiero tener un tipo documental de inspección estándar, para poder evaluar periódicamente la conformidad del Archive Summa y las operaciones con estándares externos (ISO y propios).

---

## Diferencia entre tipos documentales

| Tipo | Qué mide | Frecuencia | Resultado |
|------|----------|-----------|-----------|
| Auditoría | Divergencias entre fuentes de verdad | Periódica / bajo demanda | AUDIT-YYYY-MM-DD.md |
| Inspección | Conformidad con un estándar externo | Trimestral / por evento | INSP-YYYY-MM-DD-{estándar}.md |
| QA | Calidad de un output concreto | Por misión | Sección en la misión |

---

## Criterios de aceptación

- [ ] Directorio `inspections/` creado en el repo
- [ ] `INSP-template.md` con estructura estándar
- [ ] Tipo `inspection` añadido a STANDARDS.md §8 (tipos de documento)
- [ ] Cadencia definida: ¿trimestral? ¿por evento? → decisión en Dark Council
- [ ] Primera inspección real: ISO 15489 del Archive Summa

---

## ISOs de referencia (Adonaz las conoce)

| ISO | Ámbito | Aplicación en NWOS |
|-----|--------|-------------------|
| ISO 15489 | Records Management | Archive Summa — gestión documental |
| ISO 27001 | Information Security | Operaciones — seguridad de información |
| ISO 9001 | Quality Management | Procesos — mejora continua |
| ISO 22301 | Business Continuity | Continuidad del sistema — P-006, backups |

---

## Valor epistémico

Las inspecciones convierten el cumplimiento en conocimiento. No son burocracia — son el mecanismo por el que el sistema aprende si está haciendo bien lo que dice que hace.

## Valor pragmático

Cuando Numen Games tenga clientes, las inspecciones son la prueba de que el NWOS funciona según estándares. No hay que inventarse los criterios — existen.

---

*Nimrod 🗡️ — 2026-04-07T13:42:00Z*
