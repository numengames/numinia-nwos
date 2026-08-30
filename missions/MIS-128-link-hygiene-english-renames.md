---
id: "MIS-128"
title: "Link hygiene after the English renames: canonicals, raw-md, OG image, and a 404 that helps"
status: in-progress
priority: high
effort: S
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
completed: null

type: mission
version: "1.0.0"
created: "2026-08-30T20:43:02+02:00"
created_source: "git:a3fa9b9"
created_confidence: exact
updated: "2026-08-30T20:43:02+02:00"
author: "ursa"
owner: "oracle"
tags: [web, url-lifecycle, seo, D-028]
license: "CC-BY-4.0"
context: "2026-08-30"
paths: [web/src/pages/decisions/, web/src/pages/blueprints/, web/src/pages/archive/, web/src/layouts/Layout.astro, web/wrangler.toml]
---
# MIS-128 — Link hygiene after the English renames: canonicals, raw-md, OG image, and a 404 that helps

> **Summary:** the MIS-120a renames left `/decisions` and `/blueprints` pages
> declaring canonicals on their retired Spanish stubs and linking raw-markdown
> endpoints that no longer exist. This mission repairs both, ships the OG
> image every page already promises, and gives the site the 404 page that
> DEUDA-404's accepted breakages assume readers have.
> **Pragmatic:** search engines stop receiving canonical→noindex
> contradictions on 30+ pages; every "MD" toolbar button on decisions and
> blueprints works again; shared links render a real card; a lost reader
> lands on navigation instead of Cloudflare's bare 404.
> **Audience:** Agents · Oracles

---

## Scope

Four defects found by the 2026-08-30 audit of the build at `4c60c12`
(681 pages, 1,040 unique internal hrefs, 360 dead — 320 of them the known
D-035 PDFs; the rest are this mission, minus two D-032 orphan links):

1. **Canonicals** — `web/src/pages/decisions/[id].astro` and
   `web/src/pages/blueprints/[id].astro` (and `blueprints/meta.astro`)
   emit `canonicalPath` under `/decisiones/…` and `/planos/…`. Those URLs
   are 301 stubs marked `noindex`: each real page declares its canonical
   to be a page that tells crawlers "don't index me".
2. **Raw-md links** — the same two files build `mdUrl` under the Spanish
   prefixes, but the `.md.ts` endpoints emit under `/decisions/` and
   `/blueprints/`. Astro's redirects cover `[id]`, not `[id].md`: all 34
   toolbar "MD" links 404. Prev/next links also bounce through the stubs.
   The `/print/` intermediate slugs for both collections keep the Spanish
   prefixes too and move in the same commit, so the derived `/pdf/…` paths
   stay aligned for the day D-035 is resolved.
3. **OG image** — `Layout.astro` defaults every page's `og:image` to
   `/og-default.png`; the file does not exist anywhere in the repo.
4. **404 page** — no `404.astro`, so `dist/404.html` is never built, and
   `wrangler.toml` has no `not_found_handling`, so Workers would not serve
   it anyway. Both halves ship together.

Plus one repair in the same class, found in passing: `b40fbe6` repointed
the Archive Summa downloads in the blueprint but missed
`web/src/pages/archive/index.astro`, which still links the three
`/archive/archive-summa-*.md` files deleted in `d039463`. Repoint to the
corpus copies that commit verified.

**Out of scope:** the dead-link CI guard (proposed step 5 of the audit —
its own mission if the Oracle wants it), D-035 (the 320 PDF links),
D-032 orphan pages, the `/nwos` links inside orphan pages, and the
`web/README.md` drift (D-015 territory).

---

## Acceptance criteria

- [ ] `dist/decisions/adr-001/index.html` declares
      `<link rel="canonical" href="https://numinia.org/decisions/adr-001">`
      (today: `…/decisiones/adr-001`, a noindex stub). Same pattern for
      blueprints. Verify:
      `grep -o 'canonical[^>]*' dist/decisions/adr-001/index.html`
- [ ] Every `mdUrl` the decisions and blueprints toolbars emit resolves to
      a file in dist. Verify: the audit's linkchecker reports 0 dead links
      under `/decisiones/` and `/planos/` (today: 34).
- [ ] `dist/og-default.png` exists, is 1200×630, and weighs under 100 KB
      (today: absent, while every page references it).
- [ ] `dist/404.html` exists and contains the site navigation (today:
      absent), and `wrangler.toml` declares
      `not_found_handling = "404-page"` (today: no key).
- [ ] `/archive` links zero `/archive/archive-summa-*.md` paths; the three
      download links point at `/corpus/blueprints/…` copies that exist in
      dist (today: 3 dead).
- [ ] `npm run build` exits 0 and total dead internal links (excluding
      `/pdf/*` = D-035, and the 2 D-032 orphan refs) is 0
      (today: 38 = 34 md + 3 summa + 1 duplicate-counted stub).

---

## Closure

*(Fill when the mission closes.)*
