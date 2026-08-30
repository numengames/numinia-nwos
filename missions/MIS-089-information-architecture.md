---
id: "MIS-089"
title: "Information architecture: the archive gets ordered and the web mirrors it by sections"
type: mission
status: todo
version: "1.0.0"
created: "2026-08-18T10:51:09Z"
created_source: "git:9f25053"
created_confidence: exact
updated: "2026-08-27T22:05:37Z"
author: "claude-fable-5"
owner: "oracle"
tags: [archive, taxonomy, web, viewer, information-architecture]
license: "CC-BY-4.0"
mission_id: "MIS-089"
territory: "Archive"
guild: "Exegetes"
type_execution: "digital"
priority: "high"
effort: "XL"
requested_by: "oracle"
assigned_to: "numinia-nwos"
requires_oracle_approval: true
depends_on: []
---
# MIS-089 — Information architecture

> **Summary:** Master plan to order the archive (duplicates, names,
> taxonomy) and bring every document family to its own web section, with
> `/corpus` as the global catalog. Planned BEFORE building: this mission is
> the plan; nothing executes without the Oracle's signature.
> **Epistemic:** Where the information is disordered and what the target
> order is.
> **Pragmatic:** Signed phase by phase, it turns the repo into a navigable
> archive with no duplicates and no gray zones.
> **Audience:** Oracle · numinia-nwos agent

---

**Area:** Archive + Viewer / numinia.org
**Guild:** Exegetes
**Type:** digital
**Priority:** high
**Effort:** XL

---

## Story

As an Oracle, I want an archive with a clear taxonomy, no duplicates, and
every document family navigable in its numinia.org section, so that humans
and agents find and trust the information without knowing the filesystem.

---

## Decisions already taken by the Oracle (2026-08-18)

1. **Taxonomy by document type** (the current folders, cleaned up); the
   guild goes in frontmatter, not in folders.
2. **`/corpus` remains the transversal global catalog**; navigation
   prioritizes the per-family sections.
3. Today's criterion prevails over `Read_Me_How_to_Archive` v0.1.12/v0.2.0;
   what was worth keeping is already distilled into **P-010 (draft)**.

## Register of duplicates and anomalies (audit 2026-08-18)

| # | Finding | Proposed disposition |
|---|---|---|
| D1 | ~~`canon/Numinia. El juego de rol (manual completo).txt` **and** `canon/Numinia-El-juego-de-rol-manual-completo.md`~~ | ✅ **RESOLVED 2026-08-25 — the proposed disposition was wrong.** «The .md is canonical» is false: the .md was 131 lines saying *«[Contenido completo del manual — ver el archivo adjunto]»*; the manual was in the .txt (4,667 lines). Executing D1 to the letter would have **deleted the manual and kept the note**. Both retired; the manual **does not return to this repo**: `canon/INDEX.md` points at `numinia-lore` (v0.6.0). |
| D2 | `blueprints/AUDIT-2026-04-07-web-vs-repo.md` and `blueprints/AUDIT-numengames-2026-04-08.md` | Move to `reports/audits/` with frontmatter adapted to the audits schema (`AUD-…` IDs) |
| D3 | `blueprints/archive-summa-{fundacional,arquitectura,prompt}-v0.1.0.md` | They are archive fondo, not blueprints: move to a fondo (P-010 §3.2 nomenclature); exact destination in F1 |
| D4 | `reports/daily/` (8 × RPT-*.md) vs 5 **hardcoded** `diario-*.astro` pages on the web; 3 reports not even shown | `/reportes` is built from `reports/daily/` at build (closes MIS-065's pending flank); the hardcoded .astro pages are retired |
| D5 | Three naming conventions coexisting (IDs, dated, free names with spaces: `C-006-session-zero.md`, `C-002-brand-and-culture.md`…) | Batch rename per P-010 §3, with a mapping record and redirects where URLs change |
| D6 | Manual `INDEX.md` files in `canon/`, `decisions/`, `blueprints/`, `reports/`, `agents/` duplicating what the build generates | Retire them when their web section exists; keep only those adding real curation (converted to folder READMEs) |
| D7 | `protocols/2026_04_14-Read_Me_How_to_Archive-v0.2.0.md` superseded by P-010 | When P-010 is signed: mark superseded and move to a fondo per the §5 lifecycle |
| D8 | Files without frontmatter (~32 per the guard: README, INDEX, templates…) | Give them minimal frontmatter (P-010 §3.3) or declare them template/fondo explicitly |

## Phases (each signed separately)

- **F0 — The protocol.** Review and sign P-010 v0.3.0 (draft already
  written). Without a signed protocol not one file moves.
- **F1 — Duplicates.** Execute D1–D3 and D7 from the register; every move
  with `git mv`, incoming-link verification and a note in this mission.
- **F2 — Web sections.** One section per family in the missions/audits
  style: `/protocolos`, `/canon`, `/agentes`, `/guilds`, `/operaciones`,
  `/estandares`, and `/reportes` from `reports/daily/` (D4). `/corpus`
  becomes the catalog: lists everything, links to each family's section.
  PDFs (MIS-088) stay automatic via the print routes.
- **F3 — Names and frontmatter.** D5, D6 and D8 in batches; extend the CI
  guard to names and minimal frontmatter.
- **F4 — Landings.** MIS-015 (the stack's canonical document) is written
  and archived in the new structure; MIS-067 runs the first ISO 15489
  inspection as validation of the whole.

## Open points (decide during the phases)

- Language of the new sections: the nav today mixes English and Spanish
  (Missions/Decisiones); DEC-006 declares English the repo's official
  language.
- Exact destination of the archive fondo (a root `archive/` folder vs the
  current scattered `archive-*`?).
- Whether agents gain their own page per identity (agents/<name>/ has
  several files per agent) or a single sheet per agent.

---

## Acceptance criteria

- [ ] P-010 signed (F0) and v0.2.0 marked superseded (D7).
- [ ] D1–D8 register resolved: every line with its disposition executed and
      annotated, or discarded with a signed reason.
- [ ] Every document family navigable in its web section; `/corpus` as the
      catalog linking to the sections; zero silent exclusions.
- [ ] `/reportes` built from `reports/daily/` (all 8+), hardcoded pages
      retired.
- [ ] CI guard extended to names and minimal frontmatter, green.
- [ ] Live redirects for every changed URL; verified in production.

---

## Epistemic value

The system learns its own taxonomy: which document types exist, how they
age, and which public surface belongs to each.

## Pragmatic value

Searching stops requiring filesystem knowledge: every family has a section,
the catalog crosses everything, and duplicates stop sowing doubt about
which one is the source.

---

## Execution log

*(Fill when completing the mission — per phase, with the Oracle's signature on each)*

---

## Execution Reality

*(Fill when closing the mission — the real plans vs the ideal plans)*

- **Technology/approach used:** (vs what was planned)
- **Why it diverged:** (what challenge modified the path)
- **Key learning:** (the knowledge that lives in that gap)
- **Closing date:** YYYY-MM-DD
- **Executing agent:** (name / agent-id)

> *"The ideal plans show the intention. The real plans show the knowledge."*
