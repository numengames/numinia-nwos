---
id: "ADR-028"
title: "The reader's browser translates; the archive keeps one corpus"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-29T11:25:00Z"
created_source: "git:df6b672"
created_confidence: exact
updated: "2026-08-29T11:25:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [decision, adr, i18n, translation, entropy, debt]
license: "CC-BY-4.0"
visibility: "public"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: "Build-time corpus translation retired; the browser translates, one corpus stands"
related: ["MIS-120", "ADR-024", "D-030", "C-005", "MIS-119"]
---
# ADR-028 — The reader's browser translates; the archive keeps one corpus

## Status

**Active.** Ruled by the Oracle, 2026-08-29. Amends decision 2 of the MIS-120
brief (v1.4.0, signed 2026-08-28) and retires its phase (d).

## Context

MIS-120 set out to serve numinia.org in Spanish. Its signed decision 2 chose
a hybrid: a hand-written dictionary for the interface, **machine translation
at build time for the corpus**, and hand-reviewed twins overriding the machine
per document. Phases (a), (b) and (c) — English routes, the dictionary, the
`EN | ES` selector, Spanish chrome — merged and are not in question here.

Phase (d) built the translator and phase (d2) served its output. PR #120
carried it: a committed translation cache, an Astro collection, an `/es/`
route, a standing notice on every machine-translated page. It went green in
CI on `1d0c2a0` — six checks, 670 pages, two Spanish documents served.

**It is closed unmerged.** What the work uncovered is why.

### What phase (d2) uncovered

**1. Build-time translation mints derivative works.** A translation is a
derivative of its source and carries the source's regime. The cache first
lived under `web/src/translations/`, where `REUSE.toml`'s `web/**` MIT
annotation silently relicensed CC-BY-4.0 corpus prose as code — the
licence-frontmatter guard refused the branch, correctly.

Moving the folder fixed that instance and exposed the general case: **ten
reserved documents** (`guilds/**`, `operations/strategy/O-007`,
`standards/S-003`) sit inside the translator's `INCLUDE` list and are excluded
by no rule. Translating any of them would have minted a CC-BY-4.0 derivative
of reserved canon — irrevocably, exactly the pattern `LEGAL_DEBT.md` records
as LD-001 for the CC0 incident. The fix (mirrored reserved overrides on
`translations/*/`, verified by nine assertions) worked. But the class of risk
is structural: every new locale re-opens it, and it brushes against D-030,
the open question on whether regime derives from path, which the Oracle
ordered left open.

**2. The measured cost does not scale.** The MIS-120 execution log records the
honest number: 218 eligible documents × ~2-3 min ≈ **7-11 h of GPU,
single-threaded, per locale, for a cold cache**. That loop OOM'd the machine
on 2026-08-28 and survived with 2 of 15 documents. Spanish is the first
locale, not the last: Chinese, Japanese, Korean, French and Italian are
foreseen. The cost is multiplied by each.

**3. A stored translation drifts silently.** Nothing forces the translator to
run before a merge, so editing an English document leaves its Spanish page
stale while still displaying the notice as if current. At two documents this
is invisible; at 218 × N locales it is a systematic lie.

**4. The route built zero pages and reported success.** The English `filePath`
keeps a `../` prefix that the Spanish key had stripped, so the two maps never
intersected and `getStaticPaths` returned `[]`. The red licence check hid it:
`astro build` never ran. Had the licence question been settled the easy way,
a green PR would have shipped a feature that did not exist.

### What was never evaluated

The comparison recorded on 2026-08-28 was **one corpus versus two corpora**: a
hand-maintained mirror corpus was refused, and machine translation at build
was chosen to avoid it. Browser-side translation was never on the table —
`MIS-120` and `ADR-024` contain no mention of it. This ADR does not reverse a
weighed comparison; it records one that was not made.

The stated goal of decision 2 was already **one corpus to maintain**. This
ADR keeps that goal and changes the mechanism that was meant to serve it.

## Decision

**The corpus is served in English. Translation into any other language is
performed by the reader's browser, on the reader's device, at read time. The
archive stores no translated document.**

1. **Phase (d) of MIS-120 is retired**, not left incomplete. Its brief is
   amended to record this ADR as the reason.
2. **No `.md` file is duplicated per locale.** `translations/**` is not
   created. The `corpusEs` collection, the `/es/corpus/[...slug]` route and
   the committed cache are not merged (PR #120, closed).
3. **The `/es/` locale survives** exactly as phases (a), (b) and (c) built it:
   English routes, the typed dictionary, the `EN | ES` selector, Spanish
   chrome. What changes is only the corpus body, which is served in English
   and translated by the reader.
4. **`scripts/translate-corpus.mjs` becomes dead code.** It stays in the tree
   until a dead-code mission removes it, tracked as debt (§ Consequences).
5. **A per-locale glossary is commissioned** (§ below). It is the one
   capability build-time translation had that this decision must replace by
   other means.

### Why, in the Oracle's terms

The precedent is MIS-119's voice player: **no MP3 was pre-generated per
document**; the browser reads the text aloud on demand. The reasoning
transfers without modification. Translators and speech synthesisers both
improve continuously and independently of this archive; binding a generated
artefact to today's model quality freezes the worse version into git forever.

The governing criterion is stated by the Oracle and recorded here as the
standard this decision is measured against:

> One corpus. Very clean, very clear, no incoherence, a very low level of
> entropy, and the minimum possible surprise. Numinia must be succinct in
> documents and in scope — the more it is contained, the better.

218 machine-written documents per locale, drifting from their originals and
each carrying its own licence regime, is entropy with a build step.

## Consequences

### Gained

- **One corpus.** Nothing generated, nothing to keep in sync, nothing to
  review that a machine wrote under Numinia's name.
- **The derivative-work class of risk disappears.** No artefact is minted, so
  no regime is assigned, no reserved document can be relicensed by a glob, and
  D-030 stays untouched by this mission.
- **Every language at once**, including those nobody has planned for.
- **Zero build cost**, zero GPU, zero OOM, deploy stays a pure function of
  the repo.
- **No drift.** A translation that is not stored cannot go stale.

### Lost, and accepted

- **Spanish (and any-language) SEO.** No `/es/corpus/…` URLs exist; search
  engines index the English corpus only. Accepted: numinia.org is an archive
  for Oracles and agents, not an acquisition surface.
- **Raw `.md` and PDF are not translated.** `/corpus/X.md` and the download
  button serve files; the browser does not touch them. A Spanish reader
  downloads English. This is consistent: the English document IS the record.
- **Terminology control** — the real cost, addressed below.

### The glossary, per locale

Browser translators will render Numinia's own lexicon however they choose, and
differently in each browser. For a corpus whose purpose is precise
terminology, that is the material loss, and the Oracle rules it must be
answered rather than absorbed:

**A per-locale glossary is commissioned to fix the words that carry the
narrative** — the terms whose mistranslation changes meaning rather than
register (El Velo / The Veil, Piedra del Camino / Waystone, Guardián de las
Puertas / Keeper of the Gates, and the rest of the world-lexicon list).

The glossary is a **published document of the corpus**, not a build input: it
states the intended reading of each term per language, so a reader using an
automatic translation can check any term against the archive's own authority.
Its scope, format and enforcement are the subject of its own mission. The
canonical world-lexicon decision is already drafted and awaiting the Oracle's
signature (kanban `t_29a907cd`, decision 1B of 2026-08-27); its ID is not
minted here, and this ADR does not pre-empt its content.

### Debt opened

- **Dead code:** `scripts/translate-corpus.mjs` and its `.gitattributes` entry
  have no consumer. Registered for the dead-code cleanup mission on the
  kanban; not removed here, because removal is its own reviewable act.
- **Unaffected and still open:** `web/node_modules` is a self-referential
  symlink committed to `main` in #119; it breaks `npm ci` on a clean clone.
  Unrelated to this decision, recorded so it is not lost.

## Evidence

- PR #120 (closed unmerged), CI green at `1d0c2a0`: 6/6 checks, 670 pages,
  licence guard 298/323, both Spanish pages served with notice and model line.
- Ten reserved documents inside the translator's `INCLUDE`, enumerated by
  script against `git ls-files` and the frontmatter regime.
- MIS-120 execution log, 2026-08-28: 218 documents × 2-3 min ≈ 7-11 h GPU per
  locale, cold cache; the 15-document batch that OOM'd, surviving 2.
- `MIS-120-multilanguage-es.md` and `ADR-024`: no occurrence of browser-side
  translation in either — the alternative was never evaluated.
