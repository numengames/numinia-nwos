---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
id: "MIS-120"
title: "Multi-language numinia.org: es-ES first"
status: in-progress
priority: high
effort: L
guild: alchemists
area: web
type_execution: digital
assigned_to: "ursa"
completed: null

# REGISTRO
type: mission
version: "1.1.0"
created: "2026-08-28"
updated: "2026-08-28"
author: "ursa"
owner: "oracle"
tags: [web, alchemists, i18n]
license: "CC-BY-4.0"

paths: [web/src/pages/, web/astro.config.mjs, web/src/data/navigation.ts, web/src/i18n/, scripts/]
---
# MIS-120 — Multi-language numinia.org: es-ES first

> **Summary:** a reader can use numinia.org fully in Spanish — visible
> `EN | ES` selector, Spanish UI chrome, and the whole corpus readable in
> Spanish through build-time machine translation, with hand-reviewed twins
> overriding the machine where commissioned.
> **Epistemic:** how a sovereign archive serves two languages without
> maintaining two archives — one canonical corpus, one derived surface.
> **Pragmatic:** the es-ES reader Numen actually has (the Oracle) uses the
> site in his language; the mechanism generalizes to any future locale.
> **Audience:** Agents · Oracles

---

## Scope

One mission, four phases, **one checkbox each** (Oracle instruction,
2026-08-28: phases are checkboxes here, not sub-missions). Each phase
lands as its own PR against this brief; the box is ticked in the same PR
that completes the work.

- [x] **(a) The served routes speak English** — 19 renames
      (`/decisiones`→`/decisions`, `/planos`→`/blueprints` +meta,
      `/reportes`→`/reports` +5 dailies, `/agente` `/continuidad`
      `/idioma` `/simulaciones` `/soluciones` `/ventas` → EN), 19
      permanent 301s, 14 internal hrefs, 3 nav hrefs. Words untouched —
      files, not words. *(PR #106, 2026-08-28)*
- [ ] **(b) The dictionary and the selector** — `web/src/i18n/ui.ts`
      (~120 typed strings), Astro native i18n (`/es/` prefixed, EN
      unprefixed), `EN | ES` text selector in the nav (no flags), 5 pilot
      pages under `/es/`.
- [ ] **(c) The sweep** — remaining ~28 pages + components (DocToolbar,
      SpeechPlayer, SiteSearch, Footer, aria-labels): zero hardcoded UI
      literals outside the dictionary; one language per locale.
- [ ] **(d) The build translator** — `scripts/translate-corpus.mjs`:
      EN→es-ES with a LOCAL model (evaluate opus-mt/NLLB vs small local
      LLM before wiring; SaaS rejected), cache by content hash, fixed
      notice *"Traducción automática — el original inglés es el documento
      de registro"*, governance excluded (canon/, decisions/, LEGAL_DEBT),
      a hand-reviewed `*.es.md` twin overrides the machine by existing.
      Measure build cost OUTSIDE CF Workers Builds before wiring CI.

### Signed decisions (Oracle, 2026-08-28)

1. Astro native i18n; `/es/` prefixed, English on today's unprefixed URLs.
2. The hybrid: hand dictionary for UI · machine translation at build for
   the corpus · reviewed twins override per document.
3. Routes first (phase a executes the route scope of decision 4A,
   kanban `t_d4936cc8`; that card keeps file renames, DS tokens, C-005
   frontmatter keys).
4. Selector as text in the navigation bar. No flags.

### Out of scope

- The RPG manual (`numinia-lore`, reserved lore, ADR-024 exception).
- A hand-maintained mirror corpus — refused; the machine layer plus
  opt-in twins is the model.
- Retiring the 301s — old Spanish URLs answer forever.

## Acceptance criteria

> Phase-scoped; every criterion FALSE at that phase's base commit.

```
(a) ✓ no Spanish-named page under web/src/pages/     (base 631f643: 19)
    ✓ every old route 301s to its EN target in dist  (verified 12/12)
    ✓ zero old hrefs in src                          (was 14)
    ✓ build page count unchanged (655)

(b) ✓ /es/ serves the 5 pilot pages with 100% ES chrome
    ✓ selector round-trips preserving path (/missions ⇄ /es/missions)
    ✓ hreflang pairs present on piloted pages
    ✓ EN pages byte-identical outside the nav

(c) ✓ grep for hardcoded UI literals outside ui.ts returns 0
    ✓ the mixed-language table (plan v3) reads one language per locale

(d) ✓ /es/ serves every publishable corpus doc in Spanish
    ✓ unchanged doc = cache hit (measured, no re-translation)
    ✓ governance exclusion enforced (greppable list)
    ✓ notice present on every machine-translated page
    ✓ a planted *.es.md twin overrides its machine output
```

## Execution log

- **2026-08-28 · (a) done** — PR #106. Divergence: the plan said "13
  routes"; the pre-move measurement found 19 served routes (5 dailies
  under `/reportes/diario-*`, plus `/planos/meta`). Counted before moving,
  nothing broke. Evidence: build 655 = base; dist redirect check 12/12
  incl. dynamic `/decisiones/adr-*`; old hrefs 0; guards green.

## Closure

*(Fill when all four boxes are ticked.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** · **by:**
