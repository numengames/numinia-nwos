---
id: "MIS-141"
uid:
title: "Publish the telemetry dataset as a page on numinia.org"
status: in-review
priority: low
effort: S
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
started: "2026-09-03T00:20:00Z"
completed: null

type: mission
version: "1.0.0"
created: "2026-09-03T00:20:00Z"
updated: "2026-09-03T00:20:00Z"
author: "ursa"
owner: "oracle"
tags: [telemetry, web, mis-138, publication, view]
license: "CC0-1.0"
---

# MIS-141 — Publish the telemetry dataset as a page on numinia.org

> **Summary:** MIS-138 built the instrument and the dataset; nothing renders
> them on the site. This adds `/telemetry`: one page, one lens, no second
> instrument. `telemetry/latest.json` and `history.jsonl` are read at build
> time and displayed with each figure's predicate beside it.
> **Epistemic:** the dataset already answers questions the corpus answers
> wrongly — the corpus states the mission count 57 times in prose and none of
> those statements is the measured value. Publishing the measurement does not
> fix the prose, but it makes the disagreement visible to a reader who has
> only the website.
> **Pragmatic:** two new files, zero new dependencies, `package.json`
> untouched. The URL ratchet only guards disappearance, so a new address is
> free.
> **Audience:** Agents · Oracles · Readers

---

## Context

`telemetry/` carries four artefacts produced by `scripts/telemetry.mjs`:
`latest.json` (87 figures, each with `value`, `unit` and `definition`),
`latest.md` (the same figures as a rendered table), `docs.json`, and
`history.jsonl` (9 measurements). CI verifies all of it — steps 7–9 of
`ci.yml` fetch the tokenizer, run `--check`, and run the instrument's own
11 self-tests.

None of it is visible on numinia.org. A reader with only the website cannot
see any figure the instrument produces.

## What this mission does

One page, `/telemetry`, built from the dataset at build time.

**It computes nothing.** `web/src/lib/telemetry.ts` reshapes the dataset for
rendering — filter, group, diff, format — and derives no figure. If a number
on the page is wrong, the instrument is wrong, and the repair is to run the
instrument, never to edit the page.

### Structure, and why this order

1. **Identity** — `head`, this build's SHA, `corpus_hash`, `measured_at`, and
   whether the two labels agree. This is the only thing the page can say that
   `latest.md` cannot: which build is showing the figures, and therefore
   whether they still describe the tree being served.
2. **Four headline figures** — `corpus.docs_total`, `missions.total`,
   `tokens.total`, `contradictions.claims_open`. Each with its delta, the
   number of measurements behind it, its cadence, and its full `definition`.
3. **What moved** — the diff between the last two measurements. A reader who
   returns wants the change, not the census. Keys measured only once are
   excluded: appearing for the first time is a change in the instrument, not
   in the corpus.
4. **The census** — all published figures by family, each with its predicate.
   Composite values fold into `<details>`.
5. **What is not shown** — the omission, stated on the page itself.

### Three decisions worth recording

**The `legacy` family is excluded — 20 of 87 figures.** It is a
bug-compatible replica of the retired `count-evidence.py`, kept pinned by a
golden fixture so the migration can be verified. Three of its figures are
demonstrably false: `legacy.field()` matches with `\s*`, which spans the
newline, so an empty `uid:` captures the *next* key — 34 documents get
`uid = "title:"`, producing `uid_presentes = 34` and `uid_colisiones = 32`
where the true values are 0 and 0. `provenance.uid_present` says 0 and is
right. Those figures are correct as a replica and wrong as a measurement;
published beside 67 correct ones, with nothing to tell them apart, they would
make the page lie in three places. They stay measured, in the dataset, out of
the view.

**Heuristic figures are marked.** Twelve keys are detectors over free prose
rather than exact counts over a defined set. `figures.live` is the one that
matters: its own definition calls it "a detector, not a verdict", and a
manual classification of its hits found ~35% that cannot be corpus figures at
all — CSS values, quality scores, KPI targets, port ranges read as `N/M`.
That is a floor, not an estimate. The number is honest; its name is not, so
the page marks it.

**No chart.** The ledger holds 9 measurements taken over a period too short
to carry a trend. A line through them would assert a slope the data does not
support. It appears when the ledger earns it.

### Freshness is compared, not re-measured

The page does **not** call `telemetry.mjs`. Re-measuring at build time would
need git and the cl100k rank file (gitignored, fetched over the network in CI
step 7), and would make the page a second instrument — the duplication
MIS-138 exists to end. So it compares `head` against `WORKERS_CI_COMMIT_SHA`
and reports what it compared. A mismatch prints "not verifiable from this
page" rather than "stale", because `head` legitimately trails the build by one
commit: the instrument runs, then its output is committed, and *that* commit
is what the site builds from. The page cannot tell the two cases apart without
re-measuring, and saying so is cheaper than being wrong.

## Design system conformance

Checked against `standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md`, measured
on the built HTML rather than asserted:

- **Colour** — no hex in either source file; every colour is a token
  (`text-foreground`, `text-muted-foreground`, `text-dim`, `bg-card`,
  `border-border`, `text-accent`, and the §3.8 data palette for the chips).
- **§3.2 tertiary rule** — the Nocturno tertiary measures 4.33:1 over
  `bg-card`, below AA. The System states the rule: "inside surfaces, the
  minimum is the secondary". Fourteen occurrences of `text-dim` inside card
  surfaces were moved to `text-muted-foreground` (8.65:1). The three that
  remain sit on the base background (4.71:1, passes).
- **§4.2 sans/mono** — every figure is Mono with `tabular-nums`; prose is Sans.
- **§5 spacing** — every gap is on the 4 px scale.
- **§5 shape** — two radii: `rounded-lg` (frame) for cards and panels,
  `rounded-md` (control) for chips. `rounded-full` only on the status dot,
  which §5 permits for markers.
- **Elevation** — surface step and hairline, no shadows.
- **Touch targets** — 48 elements at `min-h-[44px]`.

Contrast measured for all eleven colour pairs the page uses; all pass AA
after the §3.2 fix.

## Responsive

Verified on the built HTML: every grid starts at `grid-cols-1` and steps up at
`sm:` and `lg:`; no fixed pixel widths (the only `[1100px]` is a `max-w`,
matching `PageHero`); no `<table>` — composite values render as `<dl>`, which
reflows instead of scrolling sideways; long hashes carry `break-all`.

## Acceptance criteria

1. `/telemetry` builds — **met**: 298 pages, exit 0.
2. Every figure on the page comes from `telemetry/latest.json`; the page
   computes none — **met**: 67 `data-figure-key` nodes, no arithmetic in the
   template beyond deltas taken from `history.jsonl`.
3. No `legacy.*` figure is published — **met**: 0 matches for
   `data-figure-key="legacy`.
4. The page states which corpus the figures are true of, and whether this
   build can verify it — **met**: identity block, with the mismatch case
   written out.
5. Design system conformance, measured not asserted — **met**: see above.
6. Every CI guard passes — **met**: all 11 steps green locally with the
   tokenizer fetched, as CI does in step 7.

## Files

- `web/src/lib/telemetry.ts` — the dataset, reshaped. Computes no figure.
- `web/src/pages/telemetry.astro` — the page.
- `web/src/components/Footer.astro` — one link on the build line.
- `web/src/i18n/ui.ts` — one key, `footer.telemetry`.

`telemetry/` is regenerated because adding this document changes the corpus.
`package.json` is untouched; `navigation.ts` is untouched — see Placement.

## Placement

**Footer, on the build line — not in the navigation.** The main nav is ordered
by authority over sections of the corpus, and `/telemetry` is not a section of
the corpus: it is a measurement of it. Putting it in the Navigation column
would assert a peerage with `/missions` and `/canon` that does not hold.

It sits instead beside the version and the commit SHA, in the signature line.
Those are the other two facts about the artefact you are reading rather than
about what the artefact says, and telemetry is the third. The placement is the
claim: this is provenance, not content. The Oracle ruled it "not something we
need to show prominently" (2026-09-03), which is the same reading.

One `t()` key added, `footer.telemetry`, per the i18n convention — no page
hardcodes footer prose.

## Deliberately out of scope

**`latest.md` is not rendered.** Rendering it alongside the JSON would create
two views of one dataset — the duplication MIS-138 removed.

**The instrument's defects are not fixed here.** They belong to MIS-138, which
is `in-review`:

1. `telemetry.mjs:80` — `scalar()` returns `null` for `v = null`, so a null
   figure is treated as a table and `render()` throws
   `Object.values(null)`. Triggers on every clone without the rank file. The
   writes are not atomic, so `latest.json` and `docs.json` land while
   `latest.md` does not, leaving two files in `telemetry/` disagreeing.
   Reproduced from a clean clone of `ec3133c`.
2. `corpus_hash` hashes `git ls-files -s` (the index) while figures are read
   from the working tree. Editing a tracked file without staging leaves the
   hash and `head` identical while figures move. `root_dirty` is the only
   signal.
3. `scripts/blind-spots.json` declares the instrument blind to citation
   checking, which `claims.mjs` builds. A stale declaration is worse than
   none under `DBT-010`.
