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

## Los documentos seminales — serie C

> **Renumerado el 2026-08-25 (`MIS-109` fase C).** La serie seminal usaba
> `S-NNN`, que `ADR-005` asignó a `standards/`: `S-001` y `S-003` significaban
> dos documentos vivos cada uno. Ahora los seminales son `C-NNN`. **El número
> viejo se conserva en la tabla**: es lo que citan los documentos anteriores a
> esta fecha, y un identificador es una promesa sobre el pasado (`ADR-004`).

| # | ID | Antes | Documento | Archivo | Idioma | Valor |
|---|----|-------|-----------|---------|--------|-------|
| 1 | **C-001** | `S-001` | Welcome to Numinia | `C-001-welcome-to-numinia.md` | EN | 9/10 |
| 2 | **C-002** | `S-002` | Numinia Brand & Culture | `C-002-brand-and-culture.md` | EN | 9/10 |
| 3 | **C-003** | `S-004` | Compendium of Attributes | `C-003-attributes-and-ranks.md` | EN | 9/10 |
| 4 | **C-004** | `S-005` | Role Structure | `C-004-role-structure.md` | EN | 10/10 |
| 5 | **C-005** | — | Canon de Licencias | `C-005-licensing.md` | ES | — |
| 6 | **C-006** | `S-007` | About Session Zero | `C-006-session-zero.md` | EN | 8/10 |
| 7 | **C-007** | `S-009` | Rank Specifications | `C-007-rank-specifications.md` | EN | 7/10 |

**Siete documentos seminales.** Empezaron siendo diez: uno cambió de serie, uno
vive en otro repositorio y uno era aparato. Los tres están abajo, porque un
lector que recuerde diez tiene derecho a saber dónde fueron.

### Documentos fechados, no numerados

Artefactos congelados (`P-010` §3.2): un nombre con fecha es una fotografía, y
la matriculación numera series vivas. **No llevan `C-NNN`.**

| Antes | Documento | Archivo |
|-------|-----------|---------|
| `S-003` | Epistemic Relations | `2026_04_15-Epistemic_Relations_Between_Numen_Games_and_Numina-v0.2.0.md` |
| — | Pragmatic Numen System | `2026_04_15-Pragmatic_Numen_System-v0.2.0.md` |

`Epistemic Relations` es la fuente de la distinción *Germinal Motive /
Regulatory Model* (`ADR-023`), y **el enlace de este índice apuntó durante
meses a `Epistemic relations between Numen Games and Numinia.md`**, un nombre
retirado cuando el documento se resubió fechado el 2026-04-15. Corregido en
esta fase.

### Los tres que ya no están en la serie

| Antes | Documento | Dónde está | Por qué |
|-------|-----------|------------|---------|
| `S-006` | Platform Role System | **`standards/S-003-platform-role-system.md`** | Género: una matriz de permisos regula un artefacto, no nombra el mundo. `ADR-023`. Conserva régimen reservado (`D-030`) |
| `S-008` | Numinia — El Juego de Rol | **`numinia-lore`**, fuera de este repositorio | El manual vive en el repositorio de lore. Se conserva aquí como puntero externo: quien no lo encuentre concluiría que no existe, y existe |
| `S-010` | Archive System | `canon/README.md` | **Aparato, no seminal**: es regenerable desde los demás. Un índice que se lista a sí mismo como fundacional confunde instrumento con registro |

### Documentos en `canon/` que este índice no listaba

Encontrados al verificar la cuenta de los diez, `MIS-109` fase C:

| Documento | En el canon desde |
|-----------|-------------------|
| `2026_04_15-Pragmatic_Numen_System-v0.2.0.md` | 2026-04-15 — **cuatro meses sin figurar** |
| `archive-lore.md` | 2026-08-17 |
| `C-005-licensing.md` | 2026-08-16 |

`Pragmatic Numen System` es el documento cuyo §2.3 resolvió la cuestión
`Functional`/`Regulatory` en `ADR-023`: se usó como autoridad un documento que
el índice del canon no reconocía.

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
| **C-003** Compendium | `extended_by` | **C-007** Rank Specifications |
| Epistemic Relations *(fechado)* | `grounds` | **C-004** Role Structure |
| Epistemic Relations *(fechado)* | `grounds` | **C-002** Brand & Culture |
| **C-004** Role Structure | `implements` | `standards/S-003` Platform Role System |
| **C-006** Session Zero | `instantiates` | Manual del juego de rol *(`numinia-lore`)* |
| **C-001** Welcome | `summarizes` | **C-002**, **C-004**, `standards/S-003` |
| Manual del juego de rol *(`numinia-lore`)* | `is_narrative_of` | Epistemic Relations *(fechado)* |

> **La colisión de `S-003` está resuelta.** Hasta el 2026-08-25 este número
> significaba dos documentos vivos: *Epistemic Relations* en el canon y
> *Platform Role System* en `standards/`. La renumeración a `C-NNN` la cerró —
> los seminales ya no usan `S-`, que `ADR-005` reservó para `standards/`.
> `Epistemic Relations` no toma número: es un artefacto fechado.

## Documents that left the canon

| Was | Left | Now | Why |
|---|---|---|---|
| `S-006` Platform Role System | 2026-08-25 | `standards/S-003-platform-role-system.md` | Genre, not filing: a permissions matrix for an artifact is a standard, not world vocabulary. Oracle ruling, `ADR-023` |

**A series change with a file move is recorded here, in the index of origin —
not with a tombstone in the folder.** `canon/` is `sealed`, and adding a file to
signal that another one left is what that threshold exists to discourage. `git
mv` keeps the history; the index is where a reader looks.

`S-006` is not reissued. An identifier is a promise about the past (`ADR-004`).

---

*El canon no se cuestiona en el trabajo diario. Se consulta.*
*Si el trabajo diario revela que el canon está equivocado, documenta la discrepancia y decide explícitamente.*
