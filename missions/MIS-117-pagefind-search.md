---
id: "MIS-117"
title: "Add client-side search to numinia.org with Pagefind"
status: backlog
priority: medium
effort: S
guild: alchemists
area: web
type_execution: digital
assigned_to: null
completed: null

type: mission
version: "1.1.0"
created: "2026-08-28"
updated: "2026-08-28"
author: "ursa"
owner: "oracle"
tags: [web, alchemists]
license: "CC-BY-4.0"

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

---

## Scope

The public viewer only (`web/`). Adds a search index generated at build time
and a search UI on the served site. Touches `web/astro.config.mjs`,
`web/package.json`, and one or two components/pages under `web/src/`.

**Out of scope:** the corpus itself (no document changes), the PDF pipeline
(`/print/` intermediates must stay out of the index — same exclusion the
sitemap already applies), and any server-side or third-party search service.
Rejected by principle, not by cost: SaaS search (Algolia et al.) contradicts
the sovereignty stance; a search server contradicts the static deploy.

---

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

---

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

---

## Acceptance criteria

```
✓  numinia.org serves /pagefind/pagefind.js after deploy          (today: 404)
✓  a search UI is reachable from the site header or /search       (today: none)
✓  querying "MIS-109" returns the mission page among results      (today: impossible)
✓  querying a /print/ path returns no /print/ results             (index excludes intermediates)
✓  `npm run build` completes with the integration enabled          (today: N/A — not installed)
```

Every criterion is FALSE at base commit 40d0eb0 (no search exists).

---

## Closure

*(written when the mission closes)*
