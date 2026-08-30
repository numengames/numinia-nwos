---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
id: "MIS-120"
title: "Multi-language numinia.org: es-ES first"
status: done
priority: high
effort: L
guild: "Alchemists"
territory: "TBA"
type_execution: digital
assigned_to: "ursa"
completed: "2026-08-29"

# REGISTRO
type: mission
version: "4.0.0"
created: "2026-08-28T11:06:19Z"
created_source: "git:61353f6"
created_confidence: exact
updated: "2026-08-30T23:30:00+02:00"
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

One mission, six phases in the end (four planned, two more spun off the
(d) retirement), **one checkbox each** (Oracle instruction, 2026-08-28:
phases are checkboxes here, not sub-missions). Each phase lands as its
own PR against this brief; the box is ticked in the same PR that
completes the work.

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

- [x] **(e) The translate button** — **RETIRED, superseded by (f)** (Oracle,
      2026-08-29). Built (`34b3de9`) and evaluated: a client-side button
      using the `Translator` API (`.create()`/`.translate()`), on-device,
      Chrome/Edge 138+ only, gated behind transient activation. Never
      merged — (f) made it unnecessary before it shipped.

      The `EN | ES` pair in the navigation would have stopped being two
      links to two routes and become two buttons acting on the page in
      front of the reader. Superseded because the mechanism it hand-built
      (walk the DOM, call an on-device model, restore from memory) is
      exactly what every major browser already offers for free, unprompted,
      with no model download and no Chromium-only gate — see (f).

- [x] **(f) Delete /es/, let the browser translate** — Oracle, 2026-08-29,
      PR #124 (`bc76270`). The actual close of this mission.

      `/es/` had a real, undiagnosed cost: every page under it declared
      `lang="es"`, which tells a browser the document is *already*
      Spanish — suppressing the native "Translate this page?" prompt for
      exactly the readers who wanted it. A Spanish reader landing on
      `/es/missions` got a Spanish nav wrapped around an English mission
      board, with no way to ask for a real translation. Worst of both
      worlds, and self-defeating.

      Deleted in one PR: the five `/es/*` routes and the Astro i18n config
      behind them, the `EN | ES` selector (desktop + mobile), and
      `TranslateButton.astro` — the (e) experiment, unmerged and now moot.
      `lang` reverted to the page's real language everywhere, restoring the
      browser's own translate offer (Chrome/Edge/Safari/Firefox, desktop
      and mobile, zero model download, zero API gate, works for every
      locale a reader's browser supports — not just the ones this repo
      names). `web/src/i18n/ui.ts` survives, trimmed, for the UI strings
      still read by chrome components (DocToolbar, Footer, Navigation,
      SiteSearch, SpeechPlayer, MissionsView) — dictionary infrastructure
      that outlived the feature it was built for.

      No `.md` was ever duplicated per locale, at any point in this
      mission's life. That acceptance line never had to be walked back.

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

(e) RETIRED — criteria void, not failed. Built, never merged. Superseded
    by (f) before it needed real-browser QA — see the retirement note
    above for why the mechanism itself (Chromium-only Translator API) lost
    to the browser's own native translate prompt.

(f) ✓ /es/ removed — zero Spanish-prefixed routes under web/src/pages/
    ✓ EN | ES selector removed, desktop and mobile
    ✓ TranslateButton.astro removed (the (e) experiment)
    ✓ lang reflects the page's real language everywhere (was "es"
      site-wide since (b); native translate prompt now reachable)
    ✓ no .md is duplicated per locale — true from mission start to close
```

## Execution log

- **2026-08-30 · verification, this closure** — cross-checked against the
  live site (`numinia.org`, footer confirms build `13affa6`): no `EN|ES`
  selector, no `Translator` reference in served HTML; `/es/` returns
  `200` but is a 262-byte redirect stub to `/` (`cf-cache-status: HIT`,
  stale cache of the old route, not a live page). Repo confirms:
  `web/astro.config.mjs` has no `i18n` block, `Layout.astro:32` hardcodes
  `const locale = "en"`, `web/src/pages/es/` does not exist. All consistent
  with PR #124 having actually shipped and being the mission's real end —
  not, as first read, an abandoned phase (e) with no successor. `34b3de9`
  (the (e) button) is an orphaned commit — reachable in the local object
  store, no branch or PR — correctly unmerged, not lost work to recover.

- **2026-08-29 · (f) SHIPPED — delete /es/, let the browser translate**
  — Oracle, PR #124 (`bc76270`, merged; `8382a09` on the source branch).
  Removed: the five `/es/*` routes + Astro i18n config, the `EN | ES`
  selector (desktop + mobile), `TranslateButton.astro` (216 lines, the
  (e) experiment, never merged on its own). `lang` reverted to each
  page's real language, undoing the site-wide `lang="es"` that (b) had
  set and that silently suppressed every browser's native translate
  offer for exactly the readers who wanted one. `web/src/i18n/ui.ts` cut
  from ~120 keys to the ~40 still read by shared chrome (DocToolbar,
  Footer, Navigation, SiteSearch, SpeechPlayer, MissionsView) — kept
  because those components still branch on it, not because the mission
  needs it. Net diff: 15 files, +88/-424.

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

- **What was done:** numinia.org serves one English site. The reader's
  own browser offers translation natively (Chrome/Edge/Safari/Firefox,
  desktop and mobile) because pages now declare their real language
  instead of a blanket `lang="es"`. No `/es/` route, no language
  selector, no translated `.md` in the repo, no per-locale build step —
  DEC-006 ("translations live in the web layer, not the repo") holds
  exactly as written, by removing the layer rather than building one.
- **What diverged, and why:** the mission's own plan predicted four
  phases; it took six. (d) — build-time translation to committed `.md` —
  was built, went green in CI, and was retired unmerged: it minted
  unlicensed derivatives of ten reserved documents and cost 7-11h GPU
  per locale. (e) — a client-side Translator-API button — was built as
  (d)'s replacement and retired unmerged in turn, superseded by (f)
  before it shipped: the mechanism it hand-built (walk the DOM, call an
  on-device model) turned out to be what browsers already do for free,
  and better, once `lang` stopped lying about the document's language.
  Two retired phases are not two failures — they are the cost of finding
  out DEC-006 meant "delete the layer," not "build a smarter one."
- **Evidence:** live site checked 2026-08-30 — footer commit `13affa6`,
  zero `EN|ES`/`Translator` markup in served HTML, `/es/` a stale
  redirect stub (`cf-cache-status: HIT`, 262 bytes). Repo checked same
  date — no `i18n` block in `astro.config.mjs`, `Layout.astro:32`
  hardcodes `locale = "en"`, `web/src/pages/es/` absent, `34b3de9`
  (phase e) an orphaned commit with no branch, correctly so.
- **Closed:** 2026-08-29 (PR #124, `bc76270`) · **documented:** 2026-08-30
  · **by:** ursa (agent), on Oracle instruction — the phase history had
  drifted out of this brief and was reconstructed from git log, not from
  memory, per instruction not to guess at lost specifics.
