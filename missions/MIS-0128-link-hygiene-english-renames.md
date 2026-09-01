---
id: "MIS-128"
uid: ""
title: "Link hygiene after the English renames: canonicals, raw-md, OG image, and a 404 that helps"
status: done
priority: high
effort: S
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
completed: "2026-08-30"

type: mission
version: "1.1.0"
created: "2026-08-30T20:43:02+02:00"
created_source: "git:a3fa9b9"
created_confidence: exact
updated: "2026-08-30T23:40:00+02:00"
author: "ursa"
owner: "oracle"
tags: [web, url-lifecycle, seo, D-028]
license: "CC0-1.0"

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

- [x] `dist/decisions/adr-001/index.html` declares
      `<link rel="canonical" href="https://numinia.org/decisions/adr-001">`
      (today: `…/decisiones/adr-001`, a noindex stub). Same pattern for
      blueprints. Verify:
      `grep -o 'canonical[^>]*' dist/decisions/adr-001/index.html`

      Verified 2026-08-30 against a fresh build: `adr-001` →
      `.../decisions/adr-001`, `blueprints/agent-experience` →
      `.../blueprints/agent-experience`. Two more instances of the same
      bug were caught during verification and fixed in the same PR:
      `decisions.astro` and `blueprints.astro` (the *index* pages, not
      just `[id].astro`) still declared `canonicalPath="/decisiones"` /
      `"/planos"` — not in the original scope list, same defect class.
- [x] Every `mdUrl` the decisions and blueprints toolbars emit resolves to
      a file in dist. Verify: the audit's linkchecker reports 0 dead links
      under `/decisiones/` and `/planos/` (today: 34).

      Verified: 0 dead links under either prefix, full-site crawl
      (862 HTML files, 6,311 internal links checked).
- [x] `dist/og-default.png` exists, is 1200×630, and weighs under 100 KB
      (today: absent, while every page references it).

      Verified: exists, PNG 1200×630, 38 KB.
- [x] `dist/404.html` exists and contains the site navigation (today:
      absent), and `wrangler.toml` declares
      `not_found_handling = "404-page"` (today: no key).

      Verified: `dist/404.html` present with nav markup;
      `wrangler.toml:41` declares `not_found_handling = "404-page"`.
- [x] `/archive` links zero `/archive/archive-summa-*.md` paths; the three
      download links point at `/corpus/blueprints/…` copies that exist in
      dist (today: 3 dead).

      Verified: zero matches for `/archive/archive-summa-*.md` in
      `dist/archive/index.html`.
- [x] `npm run build` exits 0 and total dead internal links (excluding
      `/pdf/*` = D-035, and the 2 D-032 orphan refs) is 0
      (today: 38 = 34 md + 3 summa + 1 duplicate-counted stub).

      Verified: `npm run build` exit 0, 668 pages. Full-site crawl finds
      3 non-`/pdf/*` dead targets, all pre-existing and out of this
      mission's declared scope, not new: 2 are false positives of the
      verification script (plain-text `[^…]` in MIS-111 prose, not an
      `<a href>`), 1 is `/nwos` inside D-032 orphan pages — explicitly
      out of scope (line 73 of this brief). Zero net-new dead links.

---

## Closure

- **What was done:** all four defects from the 2026-08-30 audit fixed —
  canonicals, raw-md toolbar links, the missing OG image, and a real
  404 page wired into `wrangler.toml`. Plus the `/archive` Summa
  repoint found in passing. Shipped as one commit, PR #149.
- **What diverged, and why:** verification found two more instances of
  the canonical bug outside the original scope list — `decisions.astro`
  and `blueprints.astro` (the index pages) had the same
  `canonicalPath="/decisiones"` / `"/planos"` defect as the `[id].astro`
  pages the brief named. Fixed in the same PR rather than filed as a
  new mission, since it's the same defect class the audit was already
  paying to fix, and leaving it would have meant closing this mission
  with the exact bug it exists to kill still live on two pages.
- **Evidence:** full-site crawl of a fresh `npm run build` (668 pages,
  862 HTML files, 6,311 internal links) run twice — once against `main`
  before this PR (354 non-trivial dead links) and once against the PR
  branch (316) — isolating a net -38, all of them the fixes this
  mission claims (the apparent "+38 broken /pdf/ links" is the same
  pre-existing D-035 debt renamed from `/pdf/planos/` to
  `/pdf/blueprints/`, not a regression). All 6 acceptance criteria
  re-verified individually against `dist/` after merge, not just at
  PR time. Guards green: `lint-frontmatter` and `check-references` both
  report zero new violations.
- **Closed:** 2026-08-30 (PR #149, merged) · **by:** ursa (agent), on
  Oracle instruction to verify against a real build before treating any
  claim as settled.
