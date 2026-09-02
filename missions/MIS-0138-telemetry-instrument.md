---
id: "MIS-138"
uid: ""
title: "Build the telemetry instrument so every live figure in the corpus is measured, not typed"
status: in-progress
priority: high
effort: L
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
started: "2026-09-02T13:15:54Z"
completed: null

type: mission
version: "1.1.0"
created: "2026-09-02T12:07:58Z"
updated: "2026-09-02T13:15:54Z"
author: "ursa"
owner: "oracle"
tags: [telemetry, measurement, evidence, tokens, entropy, contradictions, STD-001, DBT-006, MIS-127, archive]
license: "CC0-1.0"

context: "2026-09-02"
paths: [scripts/telemetry.mjs, scripts/lib/, telemetry/, scripts/count-evidence.py, scripts/measuring_root.py, scripts/resolve-citations.py, scripts/experiments/, standards/STD-001-glossary.md]
---
# MIS-138 — Build the telemetry instrument so every live figure in the corpus is measured, not typed

> **Summary:** One program measures the corpus and writes one dataset — every figure with its value, unit, definition, `HEAD` and `corpus_hash`. One rendered document (`telemetry/latest.md`) states figures; every other occurrence of a corpus figure anywhere in the archive is a *citation* that names its key and the `HEAD` it was measured at. The twelve scripts that measure today fold into the instrument and are retired.
> **Epistemic:** today, whether a number in this archive is a measurement or a memory cannot be decided from the text. After this mission it can: a figure either carries its key and `HEAD` or it is prose — and the instrument counts the prose.
> **Pragmatic:** one command answers "how many" for any registered figure at any commit, reproducibly, and answers "how big" in tokens per document, folder and type — the cost of navigating this archive for an agent. The dataset's diff in a PR *is* the change report.
> **Audience:** Agents · Oracles

---

## Context

### Snapshot at `e4b94e7` (2026-09-02, ad-hoc scripts — superseded by `telemetry/history.jsonl` line 1 when the instrument lands)

Kept from v1.0.0 as dated citations; the predicate of each is in v1.0.0's text and in the scripts that produced them.

- **152 hand-typed live figures in 28 documents** — a corpus-state number inside a document that claims currency, outside record sections and outside lines that already carry a date, commit or PR. Heaviest carriers: `MIS-0121` (20), `STD-001` (18), `DBT-001` (13).
- **The same fact, 6 values**: pages built by the site — 278 (`DBT-003`) · 559 (`STD-001`) · 662 (`PRO-013`) · 673 (`MIS-0123`) · 679 (`DBT-010`) · 688 (`DBT-004`). None was wrong when written; none says when.
- **Two figures published on 2026-09-02 were withdrawn the same day** (`MIS-135` v1.1.1) because their scripts had printed a number without its predicate. A third ("tests 35/35", PR #204 body) was typed from a command whose output had not been read. The rule that follows: *a figure without its definition beside it is not delivered.*
- `count-evidence.py` emits 21 keys with `--json` and the §10.1 provenance header, but no units, no definitions and no history; 9 one-shot censuses in `scripts/experiments/` each re-derive the corpus their own way.

### Measured at `cb29f58` (2026-09-02, this revision's generator; same discipline: predicate stated)

- **"How many missions" has three correct answers**: 139 `.md` files in `missions/` · 138 with `type: mission` · 135 registered as `MIS-0NNN` (`count-evidence` `matricula`). None is wrong; without the predicate beside it, each "lies". This is the whole problem in one line.
- **Corpus**: 592 tracked files; 271 `.md` (269 outside `web/`); 57 code files in `scripts/` (`.py` / `.mjs` / `.sh`).
- **Tokens** (`cl100k_base`, whole file with frontmatter, the 269 `.md` outside `web/`): **595,479**. `missions/` carries 38.825550523192256 %; `done` missions alone 19.88399255053495 % (62 docs, 118,405 tokens). Two documents exceed 20k: `2026_08_18-Sistema_de_Diseno-v5.1.0.md` (45,633) and `STD-001` (21,284) — the one every agent must read is the second most expensive. `scripts/` code: 106,776 tokens, 18 % of the documentation's size.
- **`MIS-127`'s baseline is not comparable to this**: "328 md files, 570,202 tokens at `eb2d8f4`, method not preserved" (its own words). Fewer files today, more tokens — or a different predicate. Nobody can tell. That is a finding about the archive, not a trend.
- **`started` timestamps**: 20 missions use the `Z` form, 1 uses `+02:00` (`MIS-0135-normalisation-residue-register.md`). The author of this brief had claimed the opposite in review on 2026-09-02; measured, he was the outlier. Recorded because it is the failure mode this mission removes.
- `DBT-006` names the same failure one level up: 145 compliance assertions the system never reads back. This mission is the mechanism for the numeric subset of that debt, not its closure.

---

## Design

Six decisions, each with its reason. The Oracle asked for the design to be judged, not listed; the judgement is in the first sentence of each.

### D1 · One instrument, in Node, beside the guards

`scripts/telemetry.mjs` + `scripts/lib/` (shared with the guards), stdlib only for everything except tokens.

- **Node, not Python**, for one reason the repo already paid for: the guards are `.mjs`, and on 2026-09-02 `count-evidence.py` (Python) and `lint-naming.mjs` disagreed on what "apparatus" is (naming-baseline 2 → 0 once aligned). An instrument that shares `scripts/lib/` with the guards counts with the same classifiers the guards enforce; a Python one re-implements them and drifts again. The Astro build can also run it without a second toolchain.
- **Tokens need a dependency in either language.** Python's `tiktoken` fetches its rank files from the network on first use and caches them — a reproducibility hole for an instrument whose point is reproducibility. A pure-JS tokenizer that bundles the ranks (candidate: `gpt-tokenizer`; proven by criterion 6, not by this sentence) goes in a root `package.json` with a lockfile: one dependency. The `tokens` family reports `null` with a reason when it is absent; every other key runs on bare `node`.
- **Absorbs and retires the 12 measurers** (1,340 lines, 15,580 tokens @cb29f58): `count-evidence.py`, `measuring_root.py`, `resolve-citations.py`, `complexity-census.py`, `dates-vs-commits.py`, `frontmatter-census.py`, `index-coverage.py`, `mis127-token-delta.py`, `protocol-anchor.py`, `provenance-census.py`, `public-surface-census.py`, `regime-crossings.py`. Each key they produce is reproduced under a v1 key first; the file is deleted after dict-equality (criterion 2).
- **Does not absorb the 12 guards** (31,596 tokens @cb29f58). A guard *blocks* a PR; telemetry *describes*. Fusing them would make the CI decision the Oracle has deferred un-deferrable. The instrument reads the guards' baselines and `ci.yml` as data.
- **Does not touch the 20 dead migration files** (`phase0`…`phase8b`, `backfill-dates`, …: 28,263 tokens, 26 % of `scripts/` @cb29f58). Same hygiene, different mission: a row for `MIS-127`.

### D2 · The dataset — `telemetry/`

| file | content | why separate |
|---|---|---|
| `latest.json` | `{ head, corpus_hash, measured_at, root_dirty, tokenizer, figures: { key: { value, unit, definition } } }` — aggregates only | small enough to read whole |
| `docs.json` | one row per tracked document: path, series, type, status, chars, `tokens_cl100k`, `tokens_o200k`, uncited figures | the per-document table is the bulk; kept out of `latest.json` |
| `history.jsonl` | one line per distinct `corpus_hash`: `{ head, corpus_hash, measured_at, values }`; append-only | the time series; re-running at the same hash adds nothing |
| `claims.json` | the verified contradiction register (D4, layer 2) | hand-found, machine-checked |
| `latest.md` | the **only** rendered document that states figures; `type: meta`; header names `head`, `corpus_hash`, `measured_at` and whether `HEAD`'s tree still matches | what humans and agents read |
| `README.md` | `type: meta`: what the dataset is, the command, and the conflict rule — *a conflict on any file here is resolved by re-running, never by hand* | |

`corpus_hash` = SHA-256 over the lines of `git ls-tree -r HEAD` excluding `telemetry/`. **Reproducibility replaces trust**: whoever ran the instrument carries no authority; anyone re-runs and compares hashes. A `latest.json` whose `corpus_hash` is not `HEAD`'s is stale or altered, and `--check` says so without CI. `REUSE.toml`: `telemetry/**` → `CC0-1.0` (it is data).

### D3 · Key families (v1)

| family | keys | predicate | unit | replaces |
|---|---|---|---|---|
| `corpus` | `files_by_ext`, `docs_by_dir`, `docs_by_type`, `scripts` (per file: language, role, in CI, callers, citing docs, first line) | `git ls-files` at `HEAD`; frontmatter `type` | files | this brief's generator, `phase0-inventory` |
| `series` | `registration` (per series: registered / total, apparatus excluded by the guards' rule), `index_coverage` | `count-evidence` `matricula`; `index-coverage.py` | files | `STD-001` §4.1, `DBT-001`, `DBT-003` |
| `missions` | `by_status`, `by_guild`, `by_territory`, `by_priority`, `by_effort`, `by_assignee`, `territory_tba`, `done_without_closure`, `done_edited_after_done`, `without_author` | `missions/MIS-*.md` by frontmatter; `## Closure` heading; `git log --follow` after the commit that set `done` | missions | `MIS-124`, `MIS-134`, `MIS-135`, `DBT-002`, `DBT-008`, the board |
| `headers` | `docs_with_frontmatter`, `uid_present`, `uid_collisions`, `created_T000000Z`, `field_usage` | `count-evidence`; `frontmatter-census.py` | documents | `STD-001`, `STD-004`, `MIS-121`, `MIS-122` |
| `guards` | `baselines` (each `scripts/*-baseline.json` → `count`), `ci_steps` (steps of `ci.yml` invoking `scripts/`), `blind_spots` | read as data | entries · steps | `PRO-013`, `STD-001` §10.4, `CHANGELOG` |
| `web` | `pages_built` (when `web/dist` exists, else `null` + reason), `redirects_declared`, `public_surface` | `find web/dist -name index.html`; `astro.config.mjs`; `public-surface-census.py` | pages · redirects · files | `DBT-003`, `DBT-004`, `DBT-010`, `MIS-123` |
| `tokens` | `total`, `by_dir`, `by_type`, `by_status` (missions), `per_doc` (in `docs.json`), `scripts_total`; each for `cl100k_base` and `o200k_base` | whole file incl. frontmatter; tokenizer named in `tokenizer` | tokens | `MIS-127`, `mis127-token-delta.py` |
| `figures` | `live` (per document: figures with no key and no `HEAD` — the detector, heuristic, predicate in the definition), `stale_citations` (cited `key @ hash` whose value at `HEAD` differs) | D5 | figures | this mission |
| `contradictions` | `classes` (D4 layer 1: per class, distinct values + locations), `claims_open` / `resolved` / `moved` (layer 2) | D4 | classes · claims | `MIS-135` |
| `provenance` | `authorship` (nature of author per document), `dates_vs_commits`, `regime_crossings`, `protocol_anchor` | the four censuses, ported | documents | `DBT-005`, `DBT-008`, `RPT-014`, `RPT-015` |
| `legacy` | the 21 keys of `count-evidence.py --json`, same names, same values | mapping table committed beside the instrument | (theirs) | `count-evidence.py`, until retired |

### D4 · Contradictions — counted and located, never touched

A machine does not detect contradictions in general; it detects *distinct values of a claim class it knows how to extract*. Two layers, both counted, both located, neither edited:

1. **Extractor classes** (automatic): `pages_built`, `series_registered`, `status_vocabulary`, `ci_guards_vs_[CI]_markers` (steps in `ci.yml` vs rules marked `[CI]` in `STD-001`), `id_form_per_series`. A contradiction is a class with ≥ 2 distinct values; the output lists every value with `path#line`.
2. **Verified register** (`claims.json`, found by reading — as `MIS-135`'s twenty rows were): each entry carries the exact quote and its path; every run checks the quote is still there → `open` / `resolved` / `moved`. The *count* of open contradictions is machine-verified even though a human found them. Seed: the class above and `MIS-135`'s deferred rows.

`latest.md` renders both as one table with `path#line` links. The instrument never edits a document; disambiguation is the Oracle's, one row at a time.

### D5 · The rule — proposed `STD-001` §10.5 (decision 2, the one to read twice)

**Recommended form — every figure is a citation:**

> **10.5 A corpus figure is produced once and cited everywhere else** `[MANUAL]`
> The only document that *states* corpus figures is `telemetry/latest.md`, rendered from `telemetry/latest.json`. Any other document that shows a corpus figure *cites* it: the figure carries the key it came from and the `HEAD` (or `corpus_hash`) it was measured at — inline (`done_without_closure = 34 @ e4b94e7`) or once for the block that contains it (a heading or lead sentence naming the `HEAD`). A figure with neither key nor `HEAD` is a claim without evidence; `figures.live` counts it. Acceptance criteria name a key and a target, never a current value. Closures cite the `history.jsonl` line. Records keep their figures with their date. Instrument: `figures.live`, `figures.stale_citations`.

**Alternative — the pure ban:** *no document outside `telemetry/` contains a corpus figure.* It reads simpler and is worse on three counts: (a) a reader who wants the number that motivates a mission must open a second file — more tokens per read for an agent, not fewer; (b) closures, reports and version histories need an exemption on day one, so the rule has an exception anyway; (c) "a figure about the corpus" is not machine-decidable without semantics, so the ban stays `[MANUAL]` with false positives, while the citation form has a mechanical shape (`@hash`) a detector can find and a staleness a ratchet can measure.

Under either form there is exactly **one source of truth**; under the recommended form the other documents are allowed to *quote* it, dated. The Oracle's principle is preserved; the archive stays readable. What changes for a mission: Context cites `key = value @ HEAD`; criteria say `done_without_closure = 0`, not "34 today"; Closure evidence is `history.jsonl@<corpus_hash>`. This brief is written in that form.

### D6 · What the mission adds to the system and what it removes (@cb29f58, `cl100k_base`)

| | adds | removes |
|---|---|---|
| programs | 1 instrument + `scripts/lib/` (estimate ≈ 1,000 lines; measured when it exists) | 12 measurers — 1,340 lines, 15,580 tokens |
| sources of corpus figures | 1 | 12 |
| undefined figures | 0 | 21 keys without unit or definition; 152 undated claims once the burndown mission runs |
| data | `telemetry/` (5 files; `history.jsonl` grows one line per corpus change, ≈ 300 B) | — |
| rules | §10.5 | — |
| dependencies | 1 (`gpt-tokenizer`, root `package.json`) | — |
| things an agent must know | "run `telemetry`, read the key" | "which of 12 scripts measures X, and is it still valid?" |

Net in tokens: roughly neutral inside `scripts/` (≈ −15,580 + the instrument), unchanged in documents until the burndown. Net in *entropy that matters for navigation*: sources 12 → 1, undefined figures 21 → 0, and every figure gains a definition — the system gets one more thing and many fewer claims. The largest cut available in `scripts/` is not this mission's: the 20 dead migrations (28,263 tokens, `MIS-127`).

**Surprise**, measured: the distance between what the documents say and what the corpus is. Today it cannot be measured — no figure names its key. After: `figures.stale_citations` (a quoted figure whose key now has another value) and `contradictions.claims_open`, both with a trend in `history.jsonl`. Two numbers replace a feeling.

---

## Scope

1. `scripts/telemetry.mjs` + `scripts/lib/` per D1: provenance header (§10.1), unit on every count (§10.2), families of D3, `--check`, `--render`, `--legacy-json`; blind spots declared in `scripts/blind-spots.json` (§10.4).
2. `telemetry/` per D2, with `REUSE.toml` stanza and `README.md`.
3. Contradiction layers per D4, seeded.
4. Retirement: the 12 measurers deleted after criterion 2; the 8 live documents that cite them by path (`DBT-001`, `DBT-003`, `DBT-005`, `DBT-008`, `ADR-004`, `ADR-005`, `STD-001`, `STD-004`) re-pointed at the instrument — *text* edits, no figures typed; `STD-001` `evidence_script:` → `scripts/telemetry.mjs`. Records (15 closed missions, reports, `CHANGELOG`) keep their citations.
5. The proposed §10.5 text shipped as a separate commit for the Oracle's signature; `STD-001` §10 gains it only when signed.
6. Root `package.json` + lockfile with the tokenizer; `web/` untouched.

## Out of scope

- **The burndown of the 152 live figures** — editorial work under §10.5; a sibling mission once the rule is signed. This mission makes them countable.
- **CI.** `--check` exists and is documented; wiring it is a `PRO-013` handoff the Oracle has deferred until the guards stop contradicting each other.
- **The web.** The board computes its own counts at build — a second *computed* source, not a typed one. A later criterion may assert dataset = build counts.
- **The dead migrations** (`MIS-127`), **`DBT-006`** as a whole, **`reports/`** (never rewritten; a report cites a `corpus_hash`).
- **Rendering blocks inside other documents** (v1.0.0's markers) — dropped: one rendered document, everything else cites.

---

## Acceptance criteria

Key and target, with the command that decides; no current values typed (§10.5 form).

- [ ] `node scripts/telemetry.mjs` exits 0 on bare `node` (no dependencies) and writes `telemetry/latest.json` carrying `head`, `corpus_hash`, `measured_at`, `root_dirty`, and `value` · `unit` · `definition` on every figure.
- [ ] Every family and key of D3 is present; `--legacy-json` is dict-equal to `python3 scripts/count-evidence.py --json` at the same `HEAD` (`diff <(… | jq -S .) <(… | jq -S .)` empty) — checked *before* the Python file is deleted.
- [ ] Two runs at the same `HEAD` produce identical `latest.json` and `docs.json` apart from `measured_at`.
- [ ] `corpus_hash` changes when any tracked file outside `telemetry/` changes and stays when only `telemetry/` changes (scratch worktree, both directions).
- [ ] `--check` exits non-zero when `latest.json`'s `corpus_hash` ≠ `HEAD`'s, zero otherwise. Not wired in `ci.yml`.
- [ ] With the tokenizer installed, `tokens.per_doc["standards/STD-001-glossary.md"].cl100k_base` equals Python `tiktoken`'s count at the same `HEAD` (zero difference — the port is proven across implementations); without it, `tokens` is `null` with a `reason` and the run still exits 0.
- [ ] `figures.live` reports per-document counts with its predicate text in `definition`; `figures.stale_citations` is present.
- [ ] `contradictions.classes.pages_built` lists ≥ 2 distinct values with `path#line` while that is true of the corpus; every `claims.json` entry resolves to `open` / `resolved` / `moved`.
- [ ] `history.jsonl` has one line per distinct `corpus_hash`, and `git log -p -- telemetry/history.jsonl` shows no removed line.
- [ ] `telemetry/latest.md` renders from `latest.json`, carries `type: meta`, and `--render --check` exits 0 when fresh.
- [ ] The six CI guards and both test files (`node scripts/test/<file>`) pass with `telemetry/` present; `reuse lint` reports no failure that `origin/main` did not already have.
- [ ] The 12 measurers are deleted; no `status: active` standard, protocol, decision or debt cites one by path; `check-references` reports no new broken reference.

---

## Decisions for the Oracle

Numbered; the mission runs on the recommendation until ruled otherwise.

1. **Home of the dataset** — `telemetry/` at the root. *Resolved 2026-09-02* (Oracle: "centrado en telemetry").
2. **The rule's form** — D5. *Open.* Recommended: the citation form. Alternative: the pure ban, with the three costs stated. Not reversible cheaply once documents are rewritten under one form.
3. **`count-evidence.py`** — retired after criterion 2; one source. *Resolved 2026-09-02* (Oracle: "una sola fuente de verdad").
4. **Committing the dataset** — yes, with `corpus_hash` as the authority instead of the executor's identity. *Adopted on the recommendation 2026-09-02*; reversible (delete the folder, keep the instrument).
5. **Node + one tokenizer dependency** (D1) — *new; recommended.* Alternative: Python with vendored rank files. The least reversible decision once code exists.
6. **`type: meta` for `telemetry/*.md`** — apparatus by the guards' rule, no new series. *New; minor.* Alternative: a registered series via `ADR-005`.
7. **Two tokenizers reported** — `cl100k_base` (continuity with `MIS-127`) and `o200k_base` (closer to current models), both named in the definition. *Assumed;* cheap to change.

---

## Closure

*(Fill when the mission closes. Not before, and not with intentions.
Add here — never edit `Scope` or the criteria to match what happened.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** YYYY-MM-DD · **by:** agent-id

## Epistemic value

Hypothesis 1: most figure drift in this archive is not miscounting but **un-dated copying** — a number correct at one `HEAD`, re-read as current at another.
Validated by: `figures.live` per document across the next ten corpus PRs — if `stale_citations` grows while the documents' prose does not change, the hypothesis holds.

Hypothesis 2: the archive's *surprise* — documents that disagree with the corpus — is dominated by a handful of claim classes, not spread evenly.
Validated by: `contradictions.classes` at the first run — if ≤ 5 classes account for the open contradictions, the burndown can be ordered by class rather than by document.

## Execution log

- 2026-09-02 — **Iteration 1 with the Oracle** (design review before any instrument code). Re-cut: Node beside the guards; the 12 measurers absorbed, the guards not; families `corpus` · `tokens` · `contradictions` · `provenance` added; v1.0.0's render markers inside other documents dropped for a single `telemetry/latest.md`; `corpus_hash` as the authority for a committed dataset; §10.5 re-drafted as the citation form with the pure ban as the costed alternative; entropy and surprise accounted (D6). Decisions 1 and 3 resolved by the Oracle, 4 adopted, 5–7 opened. `status: in-progress` set by the executor (`PRO-003` §2). No code yet.

## Version history

- v1.0.0 (2026-09-02) — brief opened (#204): instrument, dataset, v1 key table, two documents rendered by markers, four decisions.
- v1.1.0 (2026-09-02) — iteration 1: Design section (D1–D6); markers dropped; `corpus_hash`; rule re-drafted; criteria rewritten in key + target form; decisions re-stated (1, 3 resolved; 4 adopted; 5–7 new); `status: in-progress`, `started` set. Context split into the `e4b94e7` snapshot (cited) and this revision's measurements.
