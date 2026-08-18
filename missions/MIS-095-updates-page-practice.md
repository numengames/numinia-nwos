---
id: "MIS-095"
title: "Toda web publica sus Updates: la evolución, legible por humanos"
type: mission
status: draft
version: "1.0.0"
created: "2026-08-18"
updated: "2026-08-18"
author: "claude-fable-5"
owner: "oracle"
tags: [standards, web, updates, changelog, practice]
license: "CC-BY-4.0"
mission_id: "MIS-095"
area: "Standards + todas las webs"
guild: "Procurators"
type_execution: "digital"
priority: "medium"
effort: "M"
requested_by: "oracle"
assigned_to: "numinia-nwos"
requires_oracle_approval: true
depends_on: []
---
# MIS-095 — Toda web publica sus Updates

> **Resumen:** `numinia.com/updates` existe, funciona y nadie lo pidió por
> escrito: ningún documento del sistema exige una página pública de
> evolución. Esta misión convierte esa práctica de facto en práctica
> firmada — propuesta upstream a `engineering-standards` — y la despliega
> en las webs que aún no la tienen.
> **Epistémico:** Qué separa un CHANGELOG interno de una página de Updates
> pública, y por qué las dos hacen falta.
> **Pragmático:** Cualquiera —Oráculo, cliente, agente nuevo— ve por dónde
> va cada web sin abrir git.
> **Audiencia:** Oráculo · Agentes de cada web

---

**Area:** Standards + todas las webs · **Guild:** Procurators
**Type:** digital · **Priority:** medium · **Effort:** M

---

## Story

Como Oráculo, quiero que cada web publique su historia de versiones en
lenguaje humano, para revisar por dónde evoluciona cada cosa sin leer
commits ni preguntar a un agente.

---

## Premisas verificadas (2026-08-18)

**No existe documento que lo especifique.** Lo más cercano, y ninguno lo
cubre:

| Fuente | Qué cubre | Por qué no basta |
|---|---|---|
| `standards/engineering-standards.md` **ARC-06** | commits convencionales, tags semver, GitHub Releases con notas | Artefacto interno de GitHub; no es una página del producto ni habla el idioma del lector |
| **PM-04** | `CHANGELOG.md` o releases generados de los commits | Fichero del repo, escrito para quien lee código |
| **PM-05** | roadmap/TODO como fichero en el repo | Mira adelante, no atrás |
| **MIS-010** (done) | roadmap público de Numinia en numengames.com | Promesas, no entregas |
| `CHANGELOG.md` de este repo | historia real del archivo | Sin versiones semver ni superficie web |

**La implementación de referencia ya existe** — `numinia.com/updates`
(construida por el agente de numinia-web): línea de tiempo de versiones
descendente (hoy v0.47.0 … v0.39.x), cada versión con **fecha real del
commit de sellado** (sin horas inventadas), **chips de misiones/ADRs** que
esa versión cierra, y entradas tipadas `NEW` / `FIX` / `UPD` escritas en
prosa para humanos; arriba, una sección **Incoming** alimentada del
roadmap. Datos como módulo de primera clase (`lib/updates.ts`), historia
antigua parseada de un changelog portado.

## Lo que esta misión propone

### 1. La práctica

> **Corrección de diseño (Oráculo, 2026-08-18 — CON-006, regla G-12).** El
> primer borrador de esta misión proponía escribir PM-06 upstream «para que
> aplique a todas las webs». Eso es el error que hay que vigilar: **una
> organización con su propio repositorio NWOS es soberana** — no recibe ley
> por relación de fork. Lo correcto: la práctica se publica en una
> **versión** del estándar y cada organización **decide adoptarla**. Dentro
> de Numen Games, quien firma la adopción es el Oráculo, repo a repo.

El fichero local sigue siendo copia inmutable (CLAUDE.md §estándares): la
redacción de la práctica va upstream vía ADR + PR **como propuesta para la
siguiente versión del molde**, no como mandato descendente. Texto
propuesto:

> **PM-06 · Página pública de Updates** — Todo producto con superficie web
> publica `/updates`: línea de tiempo de versiones descendente, cada una
> con su versión semver, la **fecha real del sellado** (del commit, nunca
> inventada), los **ids de misión/ADR** que cierra y entradas tipadas
> (`NEW`/`FIX`/`UPD`) **en lenguaje de usuario, no de commit**. La página
> se deriva del CHANGELOG/releases del repo (PM-04) — no se mantiene a
> mano en paralelo. Nivel: **SHOULD** para superficies internas, **MUST**
> para producto público **de la organización que adopte esta versión del
> estándar** (G-12: la adopción es soberana). Check: `[AUTO: presence
> check de /updates en el build]` + `[MANUAL: revisión de que las entradas
> están en prosa]`.

### 2. El despliegue por parcelas

| Web | Estado | Quién |
|---|---|---|
| numinia.com | ✅ implementación de referencia | numinia-web (hecho) |
| **numinia.org** | ❌ no existe | numinia-nwos (esta misión, fase 2) |
| numengames.com | ❌ por verificar | misión aparte, su agente |
| pablofm.com | ❌ por verificar | misión aparte, su agente |

### 3. Decisiones que necesitan la firma del Oráculo

1. **Versionado de numinia.org.** Este repo no tiene releases semver: su
   `CHANGELOG.md` agrupa por fecha y misión. Opciones: (a) empezar a
   sellar versiones semver del viewer (`web/package.json` está en 0.0.1),
   (b) publicar `/updates` agrupado por fecha/misión sin semver.
   *Recomendación: (a)* — el sellado por versión es lo que hace la página
   comparable entre webs, y ya hay material (MIS-086→095 en un día).
2. **Idioma.** numinia.com publica en 5 locales; numinia.org es es/en
   mezclado. Recomendación: seguir el idioma de cada web, sin traducir a
   mano lo que no se mantendrá.
3. **Nivel de PM-06** (SHOULD vs MUST) según superficie — la propuesta ya
   lo distingue; confirmar.

---

## Acceptance criteria

- [ ] ADR redactado y PR abierto upstream con PM-06 **como propuesta para
      la siguiente versión del molde** (o rechazo firmado); ningún repo
      ajeno queda obligado por el merge (G-12).
- [ ] `numinia.org/updates` en vivo, derivado del CHANGELOG del repo, con
      versión, fecha real, chips de misión y entradas en prosa.
- [ ] `CHANGELOG.md` de este repo alineado con el esquema (versiones
      selladas, no solo `[Unreleased]`).
- [ ] Misiones abiertas para las webs restantes (numengames.com,
      pablofm.com) en sus parcelas, apuntando a esta práctica.
- [ ] La práctica queda referenciada en `STANDARDS.md` local como adoptada.

---

## Epistemic value

Distingue dos artefactos que se confunden: el CHANGELOG (para quien lee
código) y los Updates (para quien usa el producto). La misma verdad, dos
lenguas.

## Pragmatic value

Un lugar por web donde ver qué se entregó y cuándo — sin abrir git, sin
preguntar, y comparable entre productos.

---

## Execution log

*(Fill when completing the mission)*

---

## Execution Reality

*(Fill when closing the mission — the real plans vs the ideal plans)*

- **Technology/approach used:** (vs what was planned)
- **Why it diverged:** (what challenge modified the path)
- **Key learning:** (the knowledge that lives in that gap)
- **Closing date:** YYYY-MM-DD
- **Executing agent:** (name / agent-id)

> *"The ideal plans show the intention. The real plans show the knowledge."*
