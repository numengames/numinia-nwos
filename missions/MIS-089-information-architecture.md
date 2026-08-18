---
id: "MIS-089"
title: "Arquitectura de la información: el archivo se ordena y la web lo refleja por secciones"
type: mission
status: draft
version: "1.0.0"
created: "2026-08-18"
updated: "2026-08-18"
author: "claude-fable-5"
owner: "oracle"
tags: [archive, taxonomy, web, viewer, information-architecture]
license: "CC-BY-4.0"
mission_id: "MIS-089"
area: "Archivo + Viewer / numinia.org"
guild: "Exegetes"
type_execution: "digital"
priority: "high"
effort: "XL"
requested_by: "oracle"
assigned_to: "numinia-nwos"
requires_oracle_approval: true
depends_on: []
---
# MIS-089 — Arquitectura de la información

> **Resumen:** Plan maestro para ordenar el archivo (duplicados, nombres,
> taxonomía) y llevar cada familia documental a su propia sección web, con
> `/corpus` como catálogo global. Se planifica ANTES de construir: esta
> misión es el plan; nada se ejecuta sin firma del Oráculo.
> **Epistémico:** Dónde está desordenada la información y cuál es el orden
> objetivo.
> **Pragmático:** Firmada fase a fase, convierte el repo en un archivo
> navegable sin duplicados ni zonas grises.
> **Audiencia:** Oráculo · Agente numinia-nwos

---

**Area:** Archivo + Viewer / numinia.org
**Guild:** Exegetes
**Type:** digital
**Priority:** high
**Effort:** XL

---

## Story

Como Oráculo, quiero un archivo con taxonomía clara, sin duplicados y con
cada familia documental navegable en su sección de numinia.org, para que
humanos y agentes encuentren y confíen en la información sin conocer el
filesystem.

---

## Decisiones ya tomadas por el Oráculo (2026-08-18)

1. **Taxonomía por tipo** de documento (carpetas actuales, limpiadas); el
   gremio va en frontmatter, no en carpetas.
2. **`/corpus` queda como catálogo global** transversal; la navegación prima
   las secciones por familia.
3. El criterio de hoy prevalece sobre `Read_Me_How_to_Archive` v0.1.12/v0.2.0;
   lo aprovechable ya está destilado en **P-010 (draft)**.

## Registro de duplicados y anomalías (auditoría 2026-08-18)

| # | Hallazgo | Disposición propuesta |
|---|---|---|
| D1 | `canon/Numinia. El juego de rol (manual completo).txt` **y** `canon/Numinia-El-juego-de-rol-manual-completo.md` | El .md es canónico; verificar diff y retirar el .txt (borrado registrado o fondo, a decidir en F1) |
| D2 | `blueprints/AUDIT-2026-04-07-web-vs-repo.md` y `blueprints/AUDIT-numengames-2026-04-08.md` | Mover a `reports/audits/` con frontmatter adaptado al esquema de audits (IDs `AUD-…`) |
| D3 | `blueprints/archive-summa-{fundacional,arquitectura,prompt}-v0.1.0.md` | Son fondo de archivo, no planos: mover a fondo (nomenclatura §3.2 de P-010); destino exacto en F1 |
| D4 | `reports/daily/` (8 × RPT-*.md) vs 5 páginas `diario-*.astro` **hardcodeadas** en la web; 3 reportes ni se muestran | `/reportes` pasa a construirse de `reports/daily/` en build (cierra el flanco pendiente de MIS-065); las .astro hardcodeadas se retiran |
| D5 | Tres convenciones de nombre conviviendo (IDs, fechados, nombres libres con espacios: `About Session Zero.md`, `Numinia Brand and Culture.md`…) | Renombrado por lotes según P-010 §3, con registro de mapeo y redirects donde cambien URLs |
| D6 | `INDEX.md` manuales en `canon/`, `decisions/`, `blueprints/`, `reports/`, `agents/` que duplican lo que el build genera | Retirarlos cuando su sección web exista; conservar solo los que aporten curaduría real (convertidos a README de carpeta) |
| D7 | `protocols/2026_04_14-Read_Me_How_to_Archive-v0.2.0.md` queda superseded por P-010 | Al firmarse P-010: marcar superseded y pasar a fondo según ciclo de vida §5 |
| D8 | Ficheros sin frontmatter (~32 según guard: README, INDEX, plantillas…) | Dotar de frontmatter mínimo (P-010 §3.3) o declararlos plantilla/fondo explícitamente |

## Fases (cada una se firma por separado)

- **F0 — El protocolo.** Revisar y firmar P-010 v0.3.0 (draft ya escrito).
  Sin protocolo firmado no se mueve un fichero.
- **F1 — Duplicados.** Ejecutar D1–D3 y D7 del registro; cada movimiento con
  `git mv`, verificación de enlaces entrantes y nota en esta misión.
- **F2 — Secciones web.** Una sección por familia al estilo missions/audits:
  `/protocolos`, `/canon`, `/agentes`, `/guilds`, `/operaciones`,
  `/estandares`, y `/reportes` desde `reports/daily/` (D4). `/corpus` pasa a
  catálogo: lista todo, enlaza a la sección de cada familia. PDFs (MIS-088)
  siguen automáticos vía las rutas print.
- **F3 — Nombres y frontmatter.** D5, D6 y D8 por lotes; extender el guard de
  CI a nombres y frontmatter mínimo.
- **F4 — Aterrizajes.** MIS-015 (documento canónico del stack) se redacta y
  archiva en la estructura nueva; MIS-067 ejecuta la primera inspección
  ISO 15489 como validación del conjunto.

## Puntos abiertos (decidir durante las fases)

- Idioma de las secciones nuevas: la nav mezcla hoy inglés y español
  (Missions/Decisiones); DEC-006 declara el inglés oficial del repo.
- Destino exacto del fondo de archivo (¿carpeta `archive/` raíz vs los
  actuales `archive-*` dispersos?).
- Si los agentes ganan página propia por identidad (agents/<nombre>/ tiene
  varios ficheros por agente) o ficha única por agente.

---

## Acceptance criteria

- [ ] P-010 firmado (F0) y v0.2.0 marcado superseded (D7).
- [ ] Registro D1–D8 resuelto: cada línea con su disposición ejecutada y
      anotada, o descartada con motivo firmado.
- [ ] Cada familia documental navegable en su sección web; `/corpus` como
      catálogo que enlaza a las secciones; cero exclusiones silenciosas.
- [ ] `/reportes` construido desde `reports/daily/` (las 8+), páginas
      hardcodeadas retiradas.
- [ ] Guard de CI ampliado a nombres y frontmatter mínimo, en verde.
- [ ] Redirects vivos para toda URL que cambie; verificación en producción.

---

## Epistemic value

El sistema aprende cuál es su propia taxonomía: qué tipos de documento
existen, cómo envejecen y qué superficie pública les corresponde.

## Pragmatic value

Buscar deja de requerir conocer el filesystem: cada familia tiene sección,
el catálogo lo cruza todo, y los duplicados dejan de sembrar dudas sobre
cuál es la fuente.

---

## Execution log

*(Fill when completing the mission — por fases, con firma del Oráculo en cada una)*

---

## Execution Reality

*(Fill when closing the mission — the real plans vs the ideal plans)*

- **Technology/approach used:** (vs what was planned)
- **Why it diverged:** (what challenge modified the path)
- **Key learning:** (the knowledge that lives in that gap)
- **Closing date:** YYYY-MM-DD
- **Executing agent:** (name / agent-id)

> *"The ideal plans show the intention. The real plans show the knowledge."*
