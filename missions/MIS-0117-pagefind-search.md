---
id: "MIS-117"
uid: ""
title: "Add client-side search to numinia.org with Pagefind"
status: done
priority: medium
effort: S
guild: "Alchemists"
territory: "TBA"
type_execution: digital
assigned_to: "ursa"
completed: "2026-08-28"

type: mission
version: "1.3.1"
created: "2026-08-27T22:45:29Z"
created_source: "git:9f8627a"
created_confidence: exact
updated: "2026-09-02T01:55:26+02:00"
author: "ursa"
owner: "oracle"
tags: [web, alchemists]
license: "CC0-1.0"

mission_mode: spike     # first use — Oracle 2026-08-28: talk, design and build in one pass; a spike must close into a report or a planned mission
paths: [web/astro.config.mjs, web/package.json, web/src/components/, web/src/pages/]
---
# MIS-117 — Add client-side search to numinia.org with Pagefind

> **Summary:** give numinia.org a search box that works over every published
> page, with zero servers and zero external services.
> **Epistemic:** what a static, file-over-app search is and why it fits this
> archive; what was evaluated and rejected.
> **Pragmatic:** an implementation path an executor can follow without
> re-deriving the research.
> **Audience:** Agents · Oracles

`scope: numinia-nwos @ 40d0eb0 · public surface`

## Scope

The public viewer only (`web/`). Adds a search index generated at build time
and a search UI on the served site. Touches `web/astro.config.mjs`,
`web/package.json`, and one or two components/pages under `web/src/`.

**Out of scope:** the corpus itself (no document changes), the PDF pipeline
(`/print/` intermediates must stay out of the index — same exclusion the
sitemap already applies), and any server-side or third-party search service.
Rejected by principle, not by cost: SaaS search (Algolia et al.) contradicts
the sovereignty stance; a search server contradicts the static deploy.

## Research (2026-08-28, base 40d0eb0)

**Current state, measured:** `web/` has no search of any kind — zero
occurrences of pagefind/fuse/lunr in source or `package.json`. The build
generates 752 `index.html` pages. A reader on /corpus, /missions or /reports
has no way to search any of it.

**Candidate evaluated: [Pagefind](https://pagefind.app)** (MIT, Rust binary
shipped via npm, runs fully in the visitor's browser).

- Indexes `dist/` AFTER `astro build` — does not interfere with content
  collections, redirects, or the license-check prestep.
- Fragmented index: the browser downloads only the pieces a query needs
  (~100 KB budget for a site this size), so 752 pages stay cheap.
- The [`astro-pagefind`](https://github.com/shishkin/astro-pagefind)
  integration (maintained, Astro 5 compatible) wires the postbuild step and
  provides a `<Search />` component, so the change is config + one component.
- Deploy fit: Workers Builds runs `npm ci && npm run build` — the index is
  produced inside the existing pipeline, nothing new to operate. The static
  Workers deploy serves the extra `/pagefind/*` assets as plain files.
- File-over-app: the index is files in `dist/`, rebuilt from the corpus every
  deploy. No state anywhere else. Migrating hosts migrates search for free.

**Alternatives considered:** Fuse.js / Lunr (client-side too, but the index
must be hand-built and loaded whole — worse fit at 752 pages); Algolia/SaaS
(rejected on sovereignty); SSR search endpoint (rejected: the site is static
by design).

**Risk worth recording:** Pagefind indexes rendered HTML, so whatever is in
`dist/` is searchable. `/print/` intermediates are removed from `dist/`
before deploy (MIS-088), but the exclusion must be verified in the acceptance
criteria, not assumed.

## Design System compliance (v5.1.0) — added 2026-08-28

*Amendment note (S-001 §2.1.2): added after the Oracle asked whether the
mission complied with the Design System; the original draft did not cite it.
Version bumped 1.0.0 → 1.1.0.*

The standard is `standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md`. It binds
this mission because numinia.org is a **Velo-register surface** (§2.7, §2.8):

- **Pagefind's stock UI (`@pagefind/default-ui`) ships its own CSS and is
  therefore drift by construction** — the same class of drift §2.7.1 already
  marks `[FIX]` on the sky's Tailwind hexes. The executor MUST either style
  the UI entirely with §19.3 canonical tokens or use Pagefind's JS API with
  system-native markup. No stock stylesheet reaches production.
- **Search input** follows §9.3: `base` background, `linea.fuerte` border,
  `control` radius, label above in `type.etiqueta`, focus = Turquesa outline.
- **Results surface** follows §9.8: if modal, canonical veil
  `rgba(20,17,15,.72)`, trapped focus, Esc closes, background does not
  scroll; result rows 40 px; active/chosen = ink pill. Velo nuance applies
  (crystallization §10.1-11 allowed; the orchestrated moment is still one).
- **Velo hard rules** (§2.7): no new hexes — alphas over canonicals only;
  atmosphere behind, never over reading text; AA against the worst background.
- **Pre-delivery:** the §19.4 checklist runs before the implementation PR
  opens, and the mission's Closure records it.

## Acceptance criteria

```
✓  numinia.org serves /pagefind/pagefind.js after deploy          (today: 404)
✓  a search UI is reachable from the site header or /search       (today: none)
✓  querying "MIS-109" returns the mission page among results      (today: impossible)
✓  querying a /print/ path returns no /print/ results             (index excludes intermediates)
✓  `npm run build` completes with the integration enabled          (today: N/A — not installed)
```

Every criterion is FALSE at base commit 40d0eb0 (no search exists).

## Closure

**Spike executed in one pass (Oracle instruction, 2026-08-28) — mission doc
and implementation land in the same PR.** First use of `mission_mode: spike`.

**What was built** (base for implementation: `efd4bc3`, merge of main):

- `astro-pagefind@2.0.1` + `pagefind@1.5.2` (devDependencies); integration
  appended last in `astro.config.mjs` so it indexes the final `dist/`.
- `web/src/components/SiteSearch.astro` — Pagefind **JS API** with
  system-native markup; the stock `@pagefind/default-ui` CSS never loads
  (the compliance section's binding rule). Input per §9.3, modal per §9.8
  (canonical veil `rgba(20,17,15,.72)`, trapped focus, Esc closes, body
  scroll locked, 40px result rows), Cmd/Ctrl+K shortcut, ESC hint.
  Icon: `magnifying-glass`, already in the house Phosphor subset (§7.3).
- Mounted in `Navigation.astro` (desktop nav).

**The acceptance criterion that earned its keep:** the first build indexed
**761 pages including 301 `/print/` intermediates** — the risk the research
section said must be verified, verified. Fixed at the source:
`data-pagefind-ignore="all"` on the print variant's `<body>`
(`src/pages/print/[...slug].astro`). Second build: **336 fragments, zero
`/print/`**, `/missions/mis-117/` indexed and findable.

**Verification status: [MANUAL] local build only — an INTENTO until Workers
Builds goes green on main.** Criteria state at close (local evidence):

- `dist/pagefind/pagefind.js` exists ✓ (was 404)
- Search UI in the site header ✓ (was none)
- "MIS-117" findable ✓ (`/missions/mis-117/` in index)
- Zero `/print/` results ✓ (was 301 — caught and fixed in this spike)
- `npm run build` completes with the integration ✓

**Deviation from the research note:** the research assumed `/print/` was
excluded because MIS-088 deletes it from `dist/` before deploy — but the
PDF-generation step runs *after* the index is built, so Pagefind saw the
intermediates. The `data-pagefind-ignore` fix makes the exclusion true at
index time, independent of pipeline order. The plan/reality difference this
mission teaches: **"removed later" is not "absent when measured".**

**One dependency choice to record:** `pagefind` pins the Rust binary as a
devDependency so Workers Builds (`npm ci`) gets a deterministic version —
nothing global, nothing manual.

## Version history

- v1.3.1 (2026-09-02) — Form: import-era `---` rules removed. missions/ normalisation, lot 4.
