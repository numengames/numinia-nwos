---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
id: "MIS-120a"
title: "The served routes speak English"
status: done
priority: high
effort: XS
guild: alchemists
area: web
type_execution: digital
assigned_to: "ursa"
completed: "2026-08-28"

# REGISTRO
type: mission
version: "1.0.0"
created: "2026-08-28"
updated: "2026-08-28"
author: "ursa"
owner: "oracle"
tags: [web, alchemists, i18n]
license: "CC-BY-4.0"

parent_mission: "MIS-120"
paths: [web/src/pages/, web/astro.config.mjs, web/src/data/navigation.ts]
---
# MIS-120a — The served routes speak English

> **Summary:** the thirteen Spanish-named routes (and the five daily-report
> pages under one of them) are renamed to English, with 301 redirects so no
> existing URL breaks.
> **Epistemic:** why a site whose canonical language is English (DEC-006,
> ADR-024) cannot present `/decisiones` as its unprefixed route once a
> Spanish locale exists — the unprefixed tree IS the English site.
> **Pragmatic:** the URL map is ready for `/es/` (MIS-120b); every old
> Spanish URL keeps answering, permanently, via 301.
> **Audience:** Agents · Oracles

---

## Scope

First phase of MIS-120 (multi-language, plan signed 2026-08-28). Executes
the route portion of the Oracle's decision 4A (kanban `t_d4936cc8`; the
rest of that card — file renames, Design System tokens, C-005 frontmatter
keys — stays there).

Renames, all inside `web/src/pages/`:

| Old route | New route |
|---|---|
| `/decisiones` (+`/[id]`, +`.md` endpoint) | `/decisions` |
| `/planos` (+`/[id]`, `/meta`, +`.md`) | `/blueprints` |
| `/reportes` (+5 daily pages `diario-*`) | `/reports` (+`daily-*`) |
| `/agente` | `/agent` |
| `/continuidad` | `/continuity` |
| `/idioma` | `/language` |
| `/simulaciones` | `/simulations` |
| `/soluciones` | `/solutions` |
| `/ventas` | `/sales` |

Plus: 19 new 301 entries in `astro.config.mjs` (the `/misiones`→`/missions`
pattern, extended), 14 internal `href`s across 11 pages, and the three
`href`s in `navigation.ts`.

### Out of scope

- **Labels and prose** — the nav still says "Decisiones"; UI text is
  MIS-120b's dictionary. This mission moves files, not words.
- **`activeNav` ids** — internal identifiers, invisible to readers.
- **Corpus documents** — no `.md` content changes at all.

## Acceptance criteria

> Every criterion FALSE at base commit `631f643`.

```
✓  ls web/src/pages/ lists no Spanish-named page or directory
                                    (today: 9 names + 5 diario-* files)
✓  dist/decisiones/index.html is a redirect to /decisions, and likewise
   for all 19 mapped routes including per-ADR dynamic ids
                                    (today: they are the served pages)
✓  grep -rn 'href="/decisiones|href="/planos|href="/reportes|…' web/src
   returns 0 matches               (today: 14 across 11 files)
✓  cd web && npm run build exits 0 with the same page count as base (655)
```

## Closure

- **What was done:** 19 renames (13 routes + 5 daily reports + meta),
  19 redirect entries, 14 internal hrefs in 11 files, 3 nav hrefs.
  Verified in dist/: 12/12 sampled redirects point at their English
  target, including dynamic `/decisiones/adr-*` pages; 655 pages, same
  as base.
- **What diverged, and why:** the brief estimated "13 pages"; the sweep
  found the five daily-report pages under `/reportes/diario-*` and the
  `/planos/meta` page — 19 served routes in total. The measurement was
  done before the move, so nothing broke; the count in the plan was
  simply short.
- **Evidence:** build 655 pages · redirect check script 12/12 ·
  `grep` for old hrefs = 0 · license guard 292/317 · no new broken refs.
- **Closed:** 2026-08-28 · **by:** ursa
