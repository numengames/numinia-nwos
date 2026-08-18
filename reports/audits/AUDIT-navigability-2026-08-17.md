---
id: "AUDIT-navigability-2026-08-17"
title: "Audit — NWOS Navigability & Placement (read-only)"
type: report
subtype: audit
status: draft
version: "1.0.0"
created: "2026-08-17T16:30:00Z"
updated: "2026-08-17T16:30:00Z"
author: "claude-fable-5"
tags: [audit, navigability, taxonomy, file-over-app]
license: "CC-BY-4.0"
---

# Audit — NWOS Navigability & Placement — 2026-08-17

> **Summary:** What exists on disk vs what the viewer renders vs what a
> human can click to. Read-only; zero content mutations.
> **Method deviations (reported, not silent):** the brief's Set D expects
> `missions/{active,backlog,completed}/` and this report lives in
> `reports/audit/` — both contradict current canon (MIS-066 flat folder;
> existing `reports/audits/` directory). Audited against reality, briefed
> expectations listed under Open Questions.
> **Audience:** Oracle

## 1 · State declaration (Step 0, verbatim)

```
branch:      main
git status:  (clean)
last 5:      069b83a MIS-068 brief · 5de0615 session close · 91cf91f MIS-066
             done · 2eef3cc Merge PR #5 · d628f2b MIS-066 Phase 6
divergence:  0 0 (main...HEAD)
build:       exit 0 — 110 pages
```
No HALT condition met. Viewer reads content from disk at build (MIS-066);
the runtime-GitHub-API risk in the brief no longer applies.

## 2 · Numbers

| Set | Count | Notes |
|---|---|---|
| A — content files on disk | 190 (177 .md) | git-tracked, excl. .git/node_modules/dist |
| B — routes in build | 179 | 110 real pages + 69 redirect pages (old /misiones URLs, by design) |
| C — anchor-reachable from / | 108 | max click depth 2, avg 1.8 |
| A\B — .md rendered by no route | **109 of 177** | FT-01 below |
| B\C — routes nothing links to | 2 real (+69 redirects by design) | FT-02 below |

## 3 · FT-05 first — app-owned content (File Over App violations)

**41 of the 110 real routes render prose with no `.md` source** — the content lives inside `.astro` components or TS data modules:

| Route group | Routes | Where the prose actually lives |
|---|---|---|
| `/planos/*` | 8 | web/src/data/planos.ts |
| `/archive/*` | 7 | inline in archive/[fondo].astro (incl. `lore:` fields — reserved-regime content, see MIS-065) |
| `/decisiones/*` | 5 | web/src/data/decisiones.ts |
| `/reportes/*` | 5 | inline in each reportes/*.astro |
| `/` | 1 | inline in the page component |
| `/agente` | 1 | inline in the page component |
| `/archive` | 1 | inline in the page component |
| `/auditoria` | 1 | inline in the page component |
| `/cao` | 1 | inline in the page component |
| `/continuidad` | 1 | inline in the page component |
| `/decisiones` | 1 | inline in the page component |
| `/gaps` | 1 | inline in the page component |
| `/idioma` | 1 | inline in the page component |
| `/openclaw-test` | 1 | inline in the page component |
| `/planos` | 1 | inline in the page component |
| `/reportes` | 1 | inline in the page component |
| `/simulaciones` | 1 | inline in the page component |
| `/soluciones` | 1 | inline in the page component |
| `/ventas` | 1 | inline in the page component |
| `/wardley` | 1 | inline in the page component |

Already known and partially missioned: **MIS-065** (backlog) covers `/decisiones`, `/planos` and the `[fondo].astro` lore extraction. The single-page routes (`/cao`, `/gaps`, `/ventas`, `/soluciones`, `/agente`, `/idioma`, `/auditoria`, `/continuidad`, `/simulaciones`, `/wardley`, `/reportes/*`, `/`) are **not** covered by any mission yet.

## 4 · Defect table

| FT | Path / route | Evidence | Affected section |
|---|---|---|---|
| FT-01 | 109 .md files (see coverage matrix) | archive pages list documents as **plain text — zero links**, viewer renders only missions/*.md | canon 13 · agents 21 · blueprints 19 · protocols 11 · decisions 9 · reports 10 · guilds 8 · operations 3 · standards 1 · root 8 |
| FT-02 | `/openclaw-test` | in B, no anchor reaches it (test page) | web |
| FT-02 | `/reportes/diario-2026-04-07` | route exists; reportes index links only 04-02/03/05/06 | reportes |
| FT-03 | `/nwos` | linked from `/agente`, `/idioma`, `/wardley`; no such route (real page is `/`) | 3 pages |
| FT-04 | `standards/2026_04_14-Analogous_Terminology…` | lone file in lowercase `standards/` while norms live in root `STANDARDS.md` | standards |
| FT-04 | `web/public/archive/archive-summa-*.md` (×3) | canon-adjacent snapshots stored inside the viewer's public assets, served raw | web |
| FT-04 | `canon/About Session Zero.md` | filename contains spaces — breaks tooling and URLs | canon |
| FT-04 | `canon/Compendium of Attributes and Ranks in Numinia.md` | filename contains spaces — breaks tooling and URLs | canon |
| FT-04 | `canon/Numinia Brand and Culture.md` | filename contains spaces — breaks tooling and URLs | canon |
| FT-04 | `canon/Platform Role System.md` | filename contains spaces — breaks tooling and URLs | canon |
| FT-04 | `canon/Rank Specifications.md` | filename contains spaces — breaks tooling and URLs | canon |
| FT-04 | `canon/Role structure in the Numinia system.md` | filename contains spaces — breaks tooling and URLs | canon |
| FT-04 | `canon/Welcome to Numinia.md` | filename contains spaces — breaks tooling and URLs | canon |
| FT-07 | `reports/weekly/` | expected by brief and by GOVERNANCE.md retention table; absent | reports |
| FT-07 | root `STATUS.md` | expected by brief and referenced by P-006 close protocol; absent (only per-agent STATUS.md exist) | root |

## 5 · Coverage matrix

| Folder | Files | Rendered | Reachable | Shortest click-path | Verdict |
|---|---|---|---|---|---|
| `agents/` | 21 | 0 | — | — | INVISIBLE |
| `blueprints/` | 19 | 0 | — | — | INVISIBLE |
| `canon/` | 14 | 0 | — | — | INVISIBLE |
| `decisions/` | 9 | 0 | — | — | INVISIBLE |
| `guilds/` | 8 | 0 | — | — | INVISIBLE |
| `missions/` | 69 | 68 | board+detail /missions (1 click) | / → /missions | OK |
| `operations/` | 3 | 0 | — | — | INVISIBLE |
| `protocols/` | 11 | 0 | — | — | INVISIBLE |
| `reports/` | 10 | 0 | — | — | INVISIBLE |
| `scripts/` | 0 | 0 | — | — | n/a |
| `standards/` | 1 | 0 | — | — | INVISIBLE |
| `web/` | 12 | 0 | (is the viewer itself) | — | n/a |

Everything the viewer DOES expose is excellent on reachability: max 2 clicks, no deep orphan pages. The problem is not navigation depth — it is that **10 of 12 content folders have zero presence in the viewer**.

## 6 · Open questions for the Oracle (not resolved here)

1. The brief's Set D (`missions/{active,backlog,completed}/`) contradicts
   MIS-066's flat folder, which the Oracle approved and merged the same
   day. Assumed stale premise — confirm.
2. This report sits in `reports/audits/` (existing dir) instead of the
   brief's `reports/audit/`. Confirm or move.
3. Are the 109 invisible .md files *meant* to be invisible (internal
   governance vs public viewer), or is exposing them (e.g. archive pages
   linking to GitHub, or rendering canon/protocols read-only) the goal?
   That decision sizes the follow-up mission by an order of magnitude.
4. `canon/` filenames with spaces: rename (breaks inbound links, needs
   Oracle since canon is immutable-by-policy) or tolerate?
5. `/openclaw-test`: test page shipped to production — keep or gate?
6. Should `/nwos` exist as an alias of `/`, or should the three linking
   pages point at `/` instead?
7. `web/public/archive/*.md` snapshots: canonical location, or duplicates
   of canon that should be retired?
8. `STATUS.md` and `reports/weekly/`: create, or amend the docs that
   promise them?

## 7 · Audit integrity

`git status --short` after completion: only this report untracked; zero
tracked files modified. Temp scripts ran from the session scratchpad,
not the repo.
