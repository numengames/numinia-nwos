---
id: "P-010"
title: "How to Archive — the NWOS archival protocol"
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
# P-010 — Cómo archivar (v0.3.0, borrador)

> **Resumen:** Cómo se nombra cada documento en el archivo NWOS, dónde
> reside y cómo envejece. Sustituye a `Read_Me_How_to_Archive` v0.2.0 (anteriormente
> Drive), adaptándolo a la realidad del sistema git + web.
> **Epistémico:** La taxonomía y el ciclo de vida del documento del sistema.
> **Práctico:** Para cualquier nuevo archivo: qué nombre, qué carpeta, qué
> metadatos. Para cualquier duda sobre el archivo: este protocolo decide.
> **Público objetivo:** Agentes · Oráculo
> **Estado:** BORRADOR — pendiente de firma del Oráculo (fase 0 de MIS-089).

---

## 0. Línea de descendencia y regla de contradicción

Desciende de `Read me How to archive` v0.1.12 (2024, Drive) y v0.2.0
(2026-04-14, este repositorio). **En caso de contradicción con esas versiones,
el criterio actual prevalece** (orden del Oráculo, 2026-08-18). Lo que se
hereda y lo que se descarta, en el §7.

## 1. Principios

1. **Archivo sobre aplicación.** El documento es el producto; el repositorio es el
   archivo.
2. **Un solo origen, cero copias.** Enlazar, nunca copiar. Una copia derivada en
   otro repositorio declara su documento maestro (patrón FLAG-1 de operaciones/legal).
3. **Git versiona el contenido; el metadato versiona el documento.**
   La versión semántica vive en el `version:` del metadato — nunca en el
   nombre de archivo de un documento operativo.
4. **Carpeta por tipo; gremio en metadatos.** La estructura principal es
   el tipo de documento (decisión del Oráculo, 2026-08-18); la dimensión del gremio se
   expresa en `guild:` en el metadato, no en carpetas.
5. **Espejo 1:1 en la web.** Cada carpeta de tipo tiene su sección en numinia.org;
   `/corpus` es el catálogo global transversal.
6. **Profundidad limitada.** Máximo dos niveles bajo la raíz (`reports/daily/`,
   `operations/legal/`). Heredado de v0.1.12 y aún vigente.

## 2. Taxonomía: tipo → carpeta → ID → sección web

| Tipo | Carpeta | Esquema de ID | Sección web |
|---|---|---|---|
| Canon | `canon/` | `C-XXX` | `/canon` (pendiente, MIS-089 F2) |
| Misión | `missions/` | `MIS-XXX` | `/missions` ✓ |
| Decisión | `decisions/` | `DEC-XXX` / `ADR-XXX` | `/decisiones` ✓ |
| Plan | `blueprints/` | `BP-<slug>` | `/planos` ✓ |
| Protocolo | `protocols/` | `P-XXX` | `/protocolos` (pendiente) |
| Informe diario | `reports/daily/` | `RPT-YYYY-MM-DD` | `/reportes` (codificado hoy — MIS-065) |
| Auditoría | `reports/audits/` | `AUD-YYYY-MM-DD-<slug>` | `/audits` ✓ |
| Agente | `agents/<nombre>/` | nombre del agente | `/agentes` (pendiente) |
| Gremio | `guilds/` | nombre del gremio | `/guilds` (pendiente) |
| Operación | `operations/` | por subcarpeta | `/operaciones` (pendiente) |
| Estándar | `standards/` | por documento | `/estandares` (pendiente) |
| Gobierno raíz | `/` (README, GOVERNANCE…) | nombre convencional | catálogo `/corpus` |
| Fondo de archivo | por origen (`archive-*` / fechado) | ver §3.2 | `/archive` ✓ |

## 3. Nombres

### 3.1 Documentos operativos (activos)

`<ID>-<slug-en-formato-kebab>.md` — ejemplo: `MIS-089-information-architecture.md`,
`P-010-how-to-archive.md`. Sin espacios, sin caracteres especiales, sin versión o
fecha en el nombre del archivo (git y el metadato ya los llevan).

**Asignación de ID con agentes concurrentes.** El siguiente ID libre se calcula
contra lo que está COMITTEADO después de un `git pull`, no en el árbol de trabajo. Si dos
agentes colisionan, quien comiteó primero conserva el ID; el segundo
re-numera el suyo y corrige sus referencias. (Regla nacida de la doble
colisión MIS-090/MIS-091 el 2026-08-18, resuelta renumerando a
MIS-092/MIS-093.)

### 3.2 Fondos de archivo (artefactos congelados)

Documentos históricos archivados como un artefacto — que no evolucionan —
mantienen la convención heredada `YYYY_MM_DD-Title_With_Underscores-vX.Y.Z.md`.
Es la marca visible de "esto es una fotografía, no un documento activo."

### 3.3 Metadatos mínimos obligatorios

`id`, `title`, `type`, `status`, `version`, `created`, `updated`,
`license`, `tags`. Opciones normalizadas: `guild`, `owner`, `author`,
`supersedes`, `review_next`. (El guardián CI actual solo requiere `license`;
extenderlo al mínimo completo es el trabajo de MIS-089 F3.)

## 4. Versionado semántico de documentos

Heradado de v0.1.12, aún vigente, pero en el metadato:

- **Mayor** — reestructuración o cambio de contenido no compatible hacia atrás.
- **Menor** — secciones compatibles hacia atrás o mejoras.
- **Parche** — correcciones que no cambian el significado.

## 5. Ciclo de vida

`borrador → activo → sustituido | congelado → fondo de archivo`

- Un documento **sustituido** no se elimina: declara
  `supersedes`/sucesor y, una vez que ya no se consulta, se mueve al fondo
  bajo un nombre de artefacto (§3.2).
- **Eliminación** solo para duplicados verificados exactamente (diferencia limpia), registrada en
  la misión que lo ordena.
- Cadencia de revisión: `review_next` en el metadato (heredado de la "PRÓXIMA REVISIÓN EN" de v0.1.12); inspecciones según ISO 15489 (MIS-067) lo auditán.

## 6. Cumplimiento

- **ISO 15489** (gestión de registros) como marco de las inspecciones —
  MIS-067.
- El catálogo `/corpus` es el inventario activo (sustituye al árbol en Excel de v0.1.12); cero exclusiones silenciosas.
- Guardián CI: actualmente licencia en metadato; candidatos futuros: lint de nombres y
  lint de metadato mínimo (MIS-089 F3).

## 7. Lo que se hereda y lo que se descarta de v0.1.12 / v0.2.0

**Se mantiene:** versionado semántico de documentos (§4) · reglas de caracteres en nombre de archivo (§3) · profundidad limitada (§1.6) · un origen por enlace (§1.2) · ciclo de vida y disposición (§5) · cadencia de revisión (§5) · marco ISO (§6) · incorporación de agentes (ya incorporado en P-002).

**Descartado (prevalece el criterio actual):** carpetas por gremio → carpetas por tipo + `guild:` en metadatos · versión y fecha en nombres de archivos operativos → metadato + git · árbol exportado a Excel para Adonaz → catálogo `/corpus` generado en la compilación · cifrado/MFA/roles de Drive → visibilidad del repositorio + firmas del Oráculo (C-005: lo público es una oferta de licencia activa) · capacitación mensual presencial → protocolos P-002/P-007 ejecutables por agentes.