---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
id: "MIS-120"
title: "Multi-language numinia.org: es-ES first"
status: in-progress
priority: high
effort: L
guild: alchemists
territory: "TBA"
type_execution: digital
assigned_to: "ursa"
completed: null

# REGISTRO
type: mission
version: "3.0.0"
created: "2026-08-28T11:06:19Z"
created_source: "git:61353f6"
created_confidence: exact
updated: "2026-08-29T14:45:00Z"
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
- [x] **(b) The dictionary and the selector** — `web/src/i18n/ui.ts`
      (~120 typed strings), Astro native i18n (`/es/` prefixed, EN
      unprefixed), `EN | ES` text selector in the nav (no flags), 5 pilot
      pages under `/es/`. *(PR pending merge, 2026-08-28)*
- [x] **(c) The sweep** — remaining ~28 pages + components (DocToolbar,
      SpeechPlayer, SiteSearch, Footer, aria-labels): zero hardcoded UI
      literals outside the dictionary; one language per locale.
- [~] **(d) The build translator** — **RETIRED, not incomplete** (Oracle,
      2026-08-29). Built and merged (#115, #118), served green in CI (#120,
      `1d0c2a0`, 670 pages), then retired: it produced translated `.md`
      files in the repo, which **DEC-006 already forbids** — *"translations
      live there [the web layer], not in the repo. This avoids duplicate
      files and keeps the canonical source clean."* The mission had drifted
      from a standing decision; (e) brings it back.

      PR #120 closed unmerged. `scripts/translate-corpus.mjs` is dead code
      pending the cleanup mission. Three costs confirmed it: it mints
      derivative works (10 reserved documents sat inside the translator's
      INCLUDE), it costs 7-11 h GPU per locale, and it drifts silently from
      its source.

- [ ] **(e) The translate button** — what replaces (d), and DEC-006's
      "web layer handles i18n" made concrete.

      The `EN | ES` pair in the navigation stops being two links to two
      routes and becomes two buttons acting on the page in front of the
      reader: click ES, the document turns Spanish in place; click EN, the
      English returns from memory. No navigation, no stored artefact, no
      `.md` duplicated per locale — and the same button serves zh, ja, ko,
      fr or any future locale without adding a file.

      Mechanism, because the distinction is not obvious: the browser's own
      "Translate this page" bar **cannot be triggered from JavaScript**
      (Chromium exposes no such API by design). So the button uses the
      **Translator API** — `Translator.create()` then `.translate()`,
      on-device, free, private. Chrome/Edge 138+ desktop, HTTPS, inside a
      real user click: `create()` requires transient activation, which is
      why this is a button and not an on-load behaviour. Elsewhere the
      button says so and points at the browser's own feature — progressive
      enhancement, never a broken page. Most of the market is Chromium.

      Deliberate: `<pre>`, `<code>`, `<kbd>` are skipped (translating a
      documented command corrupts it); a fragment that fails stays English
      rather than blank; the first translation is cached in memory so
      EN/ES afterwards is a swap; `documentElement.lang` follows the state.

      Acceptance:
      ✓ clicking ES translates the visible document, no navigation
      ✓ clicking EN restores the English exactly
      ✓ a non-supporting browser gets the hint, never a broken page
      ✓ code blocks and identifiers come through untouched
      ✓ no `.md` is added to the repository by using it

      Out of scope, recorded so it is not lost: the `/es/` route is now a
      **candidate for removal** — it adds little once the button exists —
      but removing it is its own reviewable act, not decided here.

### Signed decisions (Oracle, 2026-08-28)

1. Astro native i18n; `/es/` prefixed, English on today's unprefixed URLs.
2. ~~The hybrid: hand dictionary for UI · machine translation at build for
   the corpus · reviewed twins override per document.~~ **AMENDED (Oracle,
   2026-08-29):** hand dictionary for UI stands; the corpus is served in
   English and translated by the reader's browser at read time — which is
   what **DEC-006** required all along ("translations live there [the web
   layer], not in the repo"). The archive stores no translated document and
   duplicates no `.md` per locale. A per-locale glossary of narrative terms
   is commissioned in its place (the world-lexicon decision, kanban
   `t_29a907cd`).
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

(d) RETIRED — criteria void, not failed. The mechanism they described
    (build-time machine translation into committed .md files) is the one
    DEC-006 already ruled out. Superseded by:
    ✓ /es/ serves the corpus in English with Spanish chrome  (a)(b)(c)
    ✓ no .md file is duplicated per locale                   (nothing built)
    ~ per-locale glossary of narrative terms                 (commissioned)

(e) ✓ clicking ES translates the visible document, no navigation
    ✓ clicking EN restores the English exactly
    ✓ a non-supporting browser gets the hint, never a broken page
    ✓ code blocks and identifiers come through untouched
    ✓ no .md is added to the repository by using it
```

## Execution log

- **2026-08-29 · (e) DECLARED — the translate button** — the phase that
  replaces (d). Written into this brief only now: the label "MIS-120(e)" was
  used in a commit before the phase existed here. Built on
  `mission/MIS-120e-translate-button` (`34b3de9`), build green at 668 pages
  — no new route. **Not verified in a real browser by the agent**: headless
  CDP in the sandbox showed the button present and `Translator` available as
  a function, but the click had not resolved within the wait, and "slow
  model download" could not be told from "broken" there. QA is the Oracle's.

- **2026-08-29 · a redundant ADR was drafted, then deleted unmerged** — an
  architecture decision record was written to state "the browser
  translates". The Oracle rejected it: the decision already exists in
  **DEC-006** (2026-04-07), which puts translations in the web layer,
  *"not in the repo… this avoids duplicate files and keeps the canonical
  source clean."* 230 lines were spent re-deciding a four-month-old
  decision. The mechanism belongs in this brief, where the work is; the
  rule was never missing. Deleted before merge — no number consumed,
  nothing left to supersede.

- **2026-08-29 · (d) RETIRED — the browser translates** — Oracle.
  PR #120 went green in CI (`1d0c2a0`: 6/6 checks, 670 pages, licence guard
  298/323, both Spanish pages serving with notice and model line) and was
  **closed unmerged**. Working it surfaced three things that decided the
  mechanism, not the bug: (1) build-time translation MINTS DERIVATIVE WORKS
  — 10 reserved documents (`guilds/**`, `operations/strategy/O-007`,
  `standards/S-003`) sit inside the translator's INCLUDE with no exclusion,
  so a run would have minted CC-BY-4.0 derivatives of reserved canon,
  irrevocably, the LD-001 pattern; (2) the `/es/` route built ZERO pages and
  reported success — the English `filePath` keeps a `../` the Spanish key had
  stripped, so the maps never intersected and the red licence check hid it;
  (3) cost is 7-11 h GPU per locale (log below) and Spanish is the first of
  six foreseen. Decision: the reader's browser translates, the archive stores
  no translated document, no `.md` is duplicated per locale — same reasoning
  as MIS-119's voice player, which pre-generated no MP3. Browser-side
  translation had NEVER been evaluated: the 2026-08-28 comparison was one
  corpus vs two corpora. `scripts/translate-corpus.mjs` is now dead code,
  registered for the cleanup mission. A per-locale glossary of narrative
  terms is commissioned to replace the one thing this loses: lexical control.

- **2026-08-28 · (d) engine built + model signed** — head-to-head eval on
  3 corpus samples (canon prose / mission brief / protocol with tables):
  **qwen3:14b WINS** — IDs 3/3, headings 6/6, table rows 5/5, natural
  es-ES, ~60-92s per 1.8K chars. gpt-oss:20b REJECTED: 2-3x slower and
  returned empty/structureless output on 2 of 3 samples under the same
  prompt. `scripts/translate-corpus.mjs`: content-hash cache (sha256 of
  source+prompt-version+model), hand-reviewed `.es.md` sibling shadows
  machine output, governance dirs excluded (decision 2), fidelity gate
  rejects any translation losing headings/tables/IDs or drifting >±40%
  length (S-001: serve honest English over broken Spanish). Streaming
  fetch (undici kills non-streamed responses at 300s). Frontmatter never
  reaches the model — schema keys are machine surface; split, translate
  body, reattach. Verified on MIS-119 full doc: 175s, structure intact,
  frontmatter byte-identical. HONEST COST: 218 eligible docs × ~2-3 min
  ≈ **7-11 h GPU single-threaded** for a cold cache; warm cache = only
  changed docs. CF Workers Builds has no GPU — translation runs local/CI,
  cache travels as artifact/commit, deploy stays static (as planned).
- **2026-08-28 · (c) done** — shared chrome fully dictionary-backed:
  SiteSearch, DocToolbar (incl. JS Copied/Error via data-t-* attrs),
  SpeechPlayer (10 data-t-* keys, JS reads dataset with EN fallback),
  missions board columns/filters/stats (+7 filter keys added to ui.ts).
  Verified in dist: ES board shows Todas/Críticas/En curso; EN board
  leak-free; grep for hardcoded aria-label/placeholder in shared chrome
  returns ZERO. FOUND, out of scope, recorded: ~13 pages under English
  routes carry 100% Spanish CONTENT (gaps, sales, simulations, the five
  dailies, blueprints/meta, archive index…) — that is document text in
  the wrong locale tree, phase (d) territory or editorial debt, not
  chrome; listed for the Oracle.
- **2026-08-28 · (b) done** — dictionary `web/src/i18n/ui.ts` (~70 typed
  keys, `satisfies` forces EN/ES parity at compile time); Astro native
  i18n with `fallback: redirect` (`fallbackType: rewrite` tried and
  rejected: it re-renders overlapping dynamic routes under /es/ and the
  build dies — recorded in astro.config.mjs); `EN | ES` selector in nav
  (desktop + mobile, text, no flags, aria-current); 5 pilots under /es/
  via thin wrappers over shared `views/` (no content duplication).
  FOUND IN PASSING: the whole site declared `lang="es"` while serving
  English — wrong for screen readers, Pagefind indexing, og:locale, and
  MIS-119's voice pick. Fixed: `lang` follows the real locale; hreflang
  en/es/x-default pairs on every page. Build 662 (655+5 pilots+2 locale
  redirects); ES pages 100% ES chrome; EN pages leak-free; round-trip
  selector verified in dist.
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
