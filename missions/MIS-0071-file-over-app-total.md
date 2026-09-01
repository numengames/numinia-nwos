---
id: "MIS-071"
uid: ""
title: "File over App, total: every piece of the system exists as .md"
status: in-progress
priority: "high"
effort: "XL"
guild: "Exegetes"
territory: "CAO"
type_execution: "digital"
assigned_to: "claude-fable-5"
started: "2026-08-17"
completed: null

type: mission
version: "1.0.0"
created: "2026-08-17T18:33:20Z"
created_source: "git:a359761"
created_confidence: exact
updated: "2026-08-25T11:00:28Z"
author: "claude-fable-5"
owner: "oracle"
requested_by: "oracle"
tags: [file-over-app, content, extraction, web, ft-05, audits]
license: "CC0-1.0"

requires_oracle_approval: true
depends_on: ["MIS-065"]
divergence_log: null
---
# MIS-071 — File over App, total: every piece of the system exists as .md

> **Summary:** The Oracle's answer to the navigability audit's central
> open question: yes — diagrams, lifecycles, fondos, principles,
> failure patterns, gaps, Wardley, sales, simulations, ALL of it should
> exist as canonical .md. Today ~3,300+ lines of that content live only
> inside page components (FT-05). This mission extracts everything,
> renders the pages from the files, and merges the duplicated audit
> surfaces.
> **Epistemic:** What the system looks like when the web is purely a
> lens and the archive is complete.
> **Pragmatic:** Every named concept has a file a human or agent can
> read, diff, and download.
> **Audience:** Agents · Oracles

---

**Area:** CAO / Archive · **Guild:** Exegetes · **Priority:** high · **Effort:** XL

## Context — the Oracle's inventory question, answered (2026-08-17)

"¿Está en .md?" — the honest table today:

| Piece | In .md today? | Where it actually lives |
|---|---|---|
| Protocols, mission lifecycle | ✅ | `protocols/` (P-003 v3 etc.) |
| Missions | ✅ | `missions/` (flat, MIS-066) |
| Decisions (records) | ✅ | `decisions/` — but the web copy is a separate hardcoded `decisiones.ts` |
| Daily reports | ✅ | `reports/daily/` — but `/reportes` pages carry extra inline content |
| Audits | ✅ (as of today) | `reports/audits/` + `/audits` — **but `/auditoria` (367 lines, 16 divergences) is a richer, older, hardcoded duplicate** |
| Canon documents | ✅ | `canon/` |
| Blueprints/planos (records) | ✅ partial | `blueprints/` exists; the web `/planos` renders a separate hardcoded `planos.ts` |
| Layer architecture diagram (L0–L4), operating principles | ❌ | `index.astro` |
| Fondos (descriptions, lore, governance per fondo) | ❌ | `archive/[fondo].astro` |
| Relations between fondos | ❌ | `archive/index.astro` (3D graph data) |
| Agent cycle (curated presentation) | ❌ | `agente.astro` (407 lines) |
| Gaps map | ❌ | `gaps.astro` (345) — `GAPS.md` was never created; MIS-044 closed citing the page |
| System adaptability / continuity, failure patterns | ❌ | `continuidad.astro` (294) |
| Simulations | ❌ | `simulaciones.astro` (415) |
| Solutions | ❌ | `soluciones.astro` (320) |
| Sales | ❌ | `ventas.astro` (446) |
| Wardley map | ❌ | `wardley.astro` (556) |
| CAO overview, Idioma (dual nomenclature) | ❌ | `cao.astro` (205), `idioma.astro` (356) |

## Story

As the Oracle, I want every concept the web can show to exist first as
a canonical .md in the repo, so the site is a lens over the archive
instead of a second, divergent archive.

## Phases (Oracle gate between phases, MIS-066 style)

1. **Merge the audit surfaces** (Oracle: "una sola carpeta y una sola
   página"). Extract `/auditoria`'s 16 divergences into
   `reports/audits/2026-04-07-auditoria-web-vs-repo.md` (reconciling
   with the thinner `blueprints/AUDIT-2026-04-07-web-vs-repo.md`, which
   it supersedes), delete `auditoria.astro`, redirect `/auditoria` →
   `/audits`, remove the nav duplicate.
2. **Extract the essay pages** — one canonical .md per page: `GAPS.md`
   (root, as MIS-044's criteria originally demanded — reopen or annotate
   MIS-044's closure accordingly), wardley, ventas, soluciones,
   simulaciones, continuidad (adaptability + critical failure patterns),
   agente (agent cycle), cao, idioma, plus the index page's layer
   diagram (Diagrama C / L0–L4) and operating principles. Diagrams go as
   ASCII/Mermaid inside the .md (the standard planos/meta already
   mandates: diagrams without proprietary tools).
3. **MIS-065 executes as the data phase** — decisiones/planos from root
   content, fondos + lore out of `[fondo].astro` (this mission depends
   on it; its brief already carries the Oracle-signed reserved/CC-BY
   split).
4. **Render from the files** — extend the content-collection pattern
   (missions, audits) so each extracted page reads its .md; every
   detail view gets the DocToolbar (copy / download .md).
5. **Regime per piece (Oracle signs):** strategy content (ventas, gaps,
   funding perspectives) may be reserved rather than CC-BY-4.0 — decide
   per file, update REUSE.toml, guard verifies.

## Placement proposal (Oracle adjusts at phase 2)

`GAPS.md` → root (per MIS-044). Wardley + layer architecture →
`blueprints/`. Continuidad, simulaciones, soluciones → `operations/` or
a new `strategy/` — Oracle picks; ventas likewise (candidate for
reserved regime). Agente/cao/idioma → `canon/` adjacency or
`protocols/` — Oracle picks. Fondos → with MIS-065's extraction.

## Acceptance criteria

- [ ] `/auditoria` no longer exists as a page; its content lives in
      `reports/audits/` and old URLs redirect to `/audits`.
- [ ] Every row marked ❌ in the context table has a canonical .md, in
      English (DEC-006), with regime declared and guard-verified.
- [ ] The corresponding pages render from those files (or are retired
      with redirects); no prose lives only in a component.
- [ ] Every rendered .md detail carries copy/download (DocToolbar).
- [ ] The navigability audit's FT-05 list re-runs at (near) zero.

## Epistemic value

Whether a system that preaches File over App can pass its own audit at
100% — and what it costs to get the last 41 routes there.

## Pragmatic value

Nothing the web says is invisible to git, agents, or downloads. The
next cold agent reads everything the visitor sees.

## Execution log

- 2026-08-17 — Phase 1 DONE (audits/auditoria merge): all 16
  divergences, root cause, score history, checklist and next steps
  extracted verbatim to reports/RPT-007-system-audit.md
  (supersedes the thinner blueprints/AUDIT-2026-04-07 record, which
  stays as history); auditoria.astro deleted; /auditoria redirects to
  /audits; nav duplicate removed. One page, one folder — as ordered.
- 2026-08-17 — Phase 2 DONE (essay extraction, 4 parallel agents, 10
  pieces): `GAPS.md` at root (19 gaps, fulfils MIS-044's original
  criterion); `operations/OPS-001-continuity.md`, `OPS-005-simulations.md`,
  `OPS-006-solutions.md`; `operations/OPS-007-sales.md` under the reserved
  regime (C-005 §1 born-closed, new REUSE annotation for
  `operations/strategy/**`); `blueprints/BLU-008 (deleted 2026-08-31)` (L0–L4
  layers + principles from index), `SYS-002-agent-cycle.md`,
  `BLU-007-dual-nomenclature.md`, `BP-cao-overview.md` (page-only dashboard
  snapshot; roster divergence vs BP-cao.md flagged in its
  extraction_note, not silently reconciled); `RPT-003-wardley-map.md`
  reconciled to v0.2.0 (union of file + page, contradictions kept and
  marked "según /wardley"). All Spanish/English prose verbatim; source
  pages untouched. Build green (143 pages, licence guard passing); the
  new blueprints already render at /planos with .md endpoints.
- 2026-08-17 — Phase 3 was executed as MIS-065 (decisiones/planos/
  fondos/lore), closed in-review earlier today.

## Execution Reality

*(Fill when closing)*

- **Technology/approach used:**
- **Why it diverged:**
- **Key learning:**
- **Closing date:**
- **Executing agent:**
