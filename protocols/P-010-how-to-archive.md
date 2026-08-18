---
id: "P-010"
title: "How to Archive — el protocolo de archivo de NWOS"
type: protocol
status: draft
version: "0.3.0"
created: "2026-08-18"
updated: "2026-08-18"
author: "claude-fable-5"
owner: "oracle"
tags: [protocols, archive, taxonomy, naming, iso-15489]
license: "CC-BY-4.0"
supersedes: "protocols/2026_04_14-Read_Me_How_to_Archive-v0.2.0.md"
review_next: "2027-02-18"
---
# P-010 — How to Archive (v0.3.0, draft)

> **Resumen:** Cómo se nombra, dónde vive y cómo envejece cada documento del
> archivo NWOS. Sucede a `Read_Me_How_to_Archive` v0.2.0 (era Drive),
> adaptándolo a la realidad git + web del sistema.
> **Epistémico:** La taxonomía y el ciclo de vida documental del sistema.
> **Pragmático:** Ante cualquier fichero nuevo: qué nombre, qué carpeta, qué
> frontmatter. Ante cualquier duda de archivo: este protocolo decide.
> **Audiencia:** Agentes · Oráculo
> **Estado:** BORRADOR — pendiente de firma del Oráculo (MIS-089 fase 0).

---

## 0. Linaje y regla de contradicción

Desciende de `Read me How to archive` v0.1.12 (2024, Drive) y v0.2.0
(2026-04-14, este repo). **En caso de contradicción con esas versiones,
prevalece el criterio de hoy** (orden del Oráculo, 2026-08-18). Qué se hereda
y qué se descarta, en §7.

## 1. Principios

1. **File Over App.** El documento es el entregable; el repo es el archivo.
2. **Una fuente, cero copias.** Se enlaza, nunca se copia. Una copia derivada
   en otro repo declara su máster (patrón FLAG-1 de operations/legal).
3. **Git versiona el contenido; el frontmatter versiona el documento.** La
   versión semántica vive en `version:` del frontmatter — nunca en el nombre
   del fichero de un documento operativo.
4. **Carpetas por tipo; gremio en metadato.** La estructura primaria es el
   tipo de documento (decisión del Oráculo 2026-08-18); la dimensión guild se
   expresa en `guild:` del frontmatter, no en carpetas.
5. **Espejo web 1:1.** Cada carpeta de tipo tiene su sección en numinia.org;
   `/corpus` es el catálogo global transversal.
6. **Profundidad limitada.** Máximo dos niveles bajo la raíz
   (`reports/daily/`, `operations/legal/`). Heredado de v0.1.12 y vigente.

## 2. Taxonomía: tipo → carpeta → ID → sección web

| Tipo | Carpeta | Esquema de ID | Sección web |
|---|---|---|---|
| Canon | `canon/` | `C-XXX` | `/canon` (pendiente, MIS-089 F2) |
| Misión | `missions/` | `MIS-XXX` | `/missions` ✓ |
| Decisión | `decisions/` | `DEC-XXX` / `ADR-XXX` | `/decisiones` ✓ |
| Plano | `blueprints/` | `BP-<slug>` | `/planos` ✓ |
| Protocolo | `protocols/` | `P-XXX` | `/protocolos` (pendiente) |
| Reporte diario | `reports/daily/` | `RPT-YYYY-MM-DD` | `/reportes` (hoy hardcodeado — MIS-065) |
| Auditoría | `reports/audits/` | `AUD-YYYY-MM-DD-<slug>` | `/audits` ✓ |
| Agente | `agents/<nombre>/` | nombre del agente | `/agentes` (pendiente) |
| Guild | `guilds/` | nombre del guild | `/guilds` (pendiente) |
| Operación | `operations/` | por subcarpeta | `/operaciones` (pendiente) |
| Estándar | `standards/` | por documento | `/estandares` (pendiente) |
| Gobernanza raíz | `/` (README, GOVERNANCE…) | nombre convencional | catálogo `/corpus` |
| Fondo de archivo | según origen (`archive-*` / fechados) | ver §3.2 | `/archive` ✓ |

## 3. Nombres

### 3.1 Documentos operativos (vivos)

`<ID>-<slug-en-kebab-case>.md` — ejemplo: `MIS-089-information-architecture.md`,
`P-010-how-to-archive.md`. Sin espacios, sin caracteres especiales, sin
versión ni fecha en el nombre (git y el frontmatter ya las llevan).

**Asignación de IDs con agentes concurrentes.** El siguiente ID libre se
calcula sobre lo COMMITEADO tras un `git pull`, no sobre el working tree.
Si dos agentes colisionan, conserva el ID quien commiteó primero; el
segundo renumera el suyo y corrige sus referencias. (Regla nacida de la
colisión doble MIS-090/MIS-091 del 2026-08-18, resuelta renumerando a
MIS-092/MIS-093.)

### 3.2 Fondos de archivo (artefactos congelados)

Los documentos históricos que se archivan como artefacto — no evolucionan —
conservan la convención heredada `YYYY_MM_DD-Titulo_Con_Guiones_Bajos-vX.Y.Z.md`.
Es la marca visible de "esto es una foto, no un documento vivo".

### 3.3 Frontmatter mínimo obligatorio

`id`, `title`, `type`, `status`, `version`, `created`, `updated`, `license`,
`tags`. Opcionales normalizados: `guild`, `owner`, `author`, `supersedes`,
`review_next`. (El guard de CI hoy exige `license`; extenderlo al mínimo
completo es trabajo de MIS-089 F3.)

## 4. Versionado semántico documental

Heredado de v0.1.12, vigente, pero en frontmatter:

- **Major** — reestructuración o cambio no retrocompatible del contenido.
- **Minor** — secciones o mejoras retrocompatibles.
- **Patch** — correcciones que no cambian el sentido.

## 5. Ciclo de vida

`draft → active → superseded | frozen → fondo de archivo`

- Un documento **superseded** no se borra: declara `supersedes`/sucesor y,
  cuando deja de consultarse, pasa al fondo con nombre de artefacto (§3.2).
- **Borrar** solo duplicados exactos verificados (diff limpio), con registro
  en la misión que lo ordena.
- Cadencia de revisión: `review_next` en frontmatter (heredado del
  "NEXT REVIEW ON" de v0.1.12); las inspecciones ISO 15489 (MIS-067) lo
  auditan.

## 6. Cumplimiento

- **ISO 15489** (gestión documental) como marco de las inspecciones — MIS-067.
- El catálogo `/corpus` es el inventario vivo (sucede al árbol-en-Excel de
  v0.1.12); cero exclusiones silenciosas.
- Guard de CI: hoy licencia-frontmatter; candidatos futuros: lint de nombres
  y de frontmatter mínimo (MIS-089 F3).

## 7. Qué se hereda y qué se descarta de v0.1.12 / v0.2.0

**Vive:** semver documental (§4) · reglas de caracteres en nombres (§3) ·
profundidad limitada (§1.6) · unicidad por enlace (§1.2) · ciclo de vida y
disposición (§5) · cadencia de revisión (§5) · marco ISO (§6) · onboarding de
agentes (ya encarnado en P-002).

**Se descarta (criterio de hoy prevalece):** carpetas por gremio → carpetas
por tipo + `guild:` en metadato · versión y fecha en el nombre de operativos
→ frontmatter + git · árbol exportado a Excel para Adonaz → catálogo
`/corpus` generado en build · cifrado/MFA/roles de Drive → visibilidad del
repo + firmas del Oráculo (C-005: lo público es oferta de licencia viva) ·
formación mensual presencial → protocolos P-002/P-007 ejecutables por
agentes.
