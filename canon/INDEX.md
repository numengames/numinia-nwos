---
id: "canon-index"
title: "Canon — Index"
type: seminal
status: active
version: "1.2.1"
created: "2026-04-06T00:00:00Z"
updated: "2026-08-16T00:00:00Z"
author: "pablo-fm"
owner: "oracle"
tags: [canon, index, seminal]
license: "CC-BY-4.0"
changelog:
  - version: "1.2.1"
    date: "2026-08-16T00:00:00Z"
    change: "C-005 updated to v1.1.0 — repo is not a legal unit (apps/AGPL + packages/MIT via REUSE.toml), header exception for pinned files, CLA per repo."
  - version: "1.2.0"
    date: "2026-08-16T00:00:00Z"
    change: "Added C-005 Canon de Licencias — first operational canon (C-series) alongside the 10 seminales."
  - version: "1.1.0"
    date: "2026-04-07T12:59:00Z"
    change: "Added S-009 Rank Specifications (QA audit). Reclassified S-010 as meta-document. Total: 10 seminales."
  - version: "1.0.0"
    date: "2026-04-06T00:00:00Z"
    change: "Initial canon with 9 documents."
---
# Canon — Memoria Inmutable

> **Resumen:** Documento fundacional del universo Numinia.
> **Epistémico:** Conocimiento fundacional del universo Numinia.
> **Pragmático:** Fuente de verdad canónica — consultar antes de crear lore.
> **Audiencia:** Agentes · Oráculos · Externos

---


Los 10 documentos fundacionales de Numinia. Son inmutables por política y por enforcement técnico (CODEOWNERS). Son el suelo sobre el que todo lo demás se construye.

## Política de modificación

**Nadie** puede modificar estos documentos una vez publicados. Si se encuentra una contradicción con la realidad operativa:
1. Documentar la discrepancia en `decisions/` como ADR
2. Decidir explícitamente: cambiar la práctica o actualizar el canon
3. Actualizar el canon requiere consenso de Oráculos + label `canon-change`

## Los 10 Documentos Seminales

| # | ID | Documento | Archivo | Idioma | Valor |
|---|----|-----------|---------|--------|-------|
| 1 | S-001 | Welcome to Numinia | `Welcome to Numinia.md` | EN | 9/10 |
| 2 | S-002 | Numinia Brand & Culture | `Numinia Brand and Culture.md` | EN | 9/10 |
| 3 | S-003 | Epistemic Relations | `Epistemic relations between Numen Games and Numinia.md` | EN | 10/10 |
| 4 | S-004 | Compendium of Attributes | `Compendium of Attributes and Ranks in Numinia.md` | EN | 9/10 |
| 5 | S-005 | Role Structure | `Role structure in the Numinia system.md` | EN | 10/10 |
| 6 | S-006 | Platform Role System | `Platform Role System.md` | EN | 8/10 |
| 7 | S-007 | About Session Zero | `About Session Zero.md` | EN | 8/10 |
| 8 | S-008 | Numinia — El Juego de Rol | ⇒ **no vive aquí**, ver «Manual del juego de rol» abajo | ES | — |
| 9 | S-009 | Rank Specifications | `Rank Specifications.md` | EN | 7/10 |
| 10 | S-010 | Archive System | `README.md` (meta) | EN | — |

## Canon operativo (serie C)

Normas internas con rango de canon: inmutables salvo consenso formal, pero de
naturaleza operativa, no seminal. Autoridad: Brand & Culture > C-001…C-004
(canon de workspace NWOS) > serie C operativa > cualquier repositorio.

| # | ID | Documento | Archivo | Idioma | Versión |
|---|----|-----------|---------|--------|---------|
| 1 | C-005 | Canon de Licencias | `C-005-licensing.md` | ES | 1.1.0 |

## Canon que no vive en este repositorio

Documentos con rango de canon cuya **fuente de verdad está en otro repositorio**.
No se copian aquí: se apuntan. Una copia sería una segunda variante que envejece
por su cuenta — que es exactamente lo que produjo el stub retirado el 2026-08-25.

| Documento | Fuente de verdad | `derived_from` | Régimen | Versión |
|---|---|---|---|---|
| Numinia — Manual del juego de rol | `numengames/numinia-lore` → `seminal/Numinia_Manual_del_juego_de_rol_v0_6_0.md` | — (**es** el original; este repo no deriva, apunta) | `LicenseRef-Numen-AllRightsReserved` (C-005 §2) | 0.6.0 |

**Sustituye a** `Numinia. El juego de rol (manual completo).txt` (S-008, v0.1.0,
4.667 líneas) y a `Numinia-El-juego-de-rol-manual-completo.md` (131 líneas, un
stub que nunca contuvo el manual), ambos retirados el 2026-08-25.

**Por qué un puntero y no un fichero.** El manual v0.6.0 son 129.087 palabras. En
`canon/` lo globearía `web/src/content.config.ts` (patrón `canon/**/*.md`) y
numinia.org publicaría una página de 890 KB — 2,6× la más pesada del sitio — más
el `.md` crudo en abierto. Y habría dos copias del mismo documento en dos repos
sin declarar cuál manda: la condición exacta que produjo el stub.

**Por qué sin ID nuevo.** Un puntero no es un documento fundacional. Darle un
`C-00N` y un fichero propio fabrica el mismo objeto que acabamos de retirar, con
mejores intenciones. La entrada de índice basta y no consume identificador.

**Verificado 2026-08-25:** `numinia-lore` es público (`visibility: public`,
comprobado sin credenciales) y `seminal/**` declara reserva expresa de derechos en
su `REUSE.toml` — decisión firmada por el Oráculo el 2026-08-17 (MIS-085 D1). El
puntero resuelve para cualquier lector y el contenido conserva su régimen.

**Anomalía del documento fuente, registrada sin corregir:** la numeración de
«Fragmentos» del manual tiene huecos y un duplicado — cap. 2 salta del 5 al 7;
cap. 3 salta del 5 al 8; cap. 4 tiene dos «Fragmento 6» (*Sistema de
Enfrentamientos* y *Estados del PJ*). Viene así del original; corregirla es
decisión editorial del Oráculo, no de archivo.

## Notas sobre S-009

`Rank Specifications` fue elaborado el 2026-04-06 con Christian Märtens. Define la **dimensión social del Arconte**: que la profundidad técnica por sí sola no confiere el rango — se requiere también capacidad de liderazgo y contribución a la comunidad. Complementa S-004 (Compendium) añadiendo el *por qué* detrás de las distinciones de rango.

Fue detectado en la auditoría de QA del 2026-04-07 como documento existente sin ID canónico asignado.

## Notas sobre S-010

S-010 es un meta-documento: describe la carpeta canon en sí misma. Está incluido por completitud y navegabilidad, pero no es un seminal de contenido en el mismo sentido que S-001–S-009.

## Relaciones entre documentos (Knowledge Graph)

| Documento | Relación | Documento destino |
|-----------|----------|-------------------|
| S-004 Compendium | `extended_by` | S-009 Rank Specs |
| S-003 Epistemic | `grounds` | S-005 Role Structure |
| S-003 Epistemic | `grounds` | S-002 Brand & Culture |
| S-005 Role Structure | `implements` | S-006 Platform Role System |
| S-007 Session Zero | `instantiates` | S-008 RPG Manual |
| S-001 Welcome | `summarizes` | S-002, S-005, S-006 |
| S-008 RPG Manual | `is_narrative_of` | S-003 Epistemic |

---

*El canon no se cuestiona en el trabajo diario. Se consulta.*
*Si el trabajo diario revela que el canon está equivocado, documenta la discrepancia y decide explícitamente.*
