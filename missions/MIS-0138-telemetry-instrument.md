---
id: "MIS-138"
uid: ""
title: "Build the telemetry instrument so every live figure in the corpus is measured, not typed"
status: todo
priority: high
effort: L
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
completed: null

type: mission
version: "1.0.0"
created: "2026-09-02T12:07:58Z"
updated: "2026-09-02T12:07:58Z"
author: "ursa"
owner: "oracle"
tags: [telemetry, measurement, evidence, STD-001, DBT-006, count-evidence, archive]
license: "CC0-1.0"

context: "2026-09-02"
paths: [scripts/count-evidence.py, scripts/measuring_root.py, scripts/experiments/, scripts/blind-spots.json, standards/STD-001-glossary.md, debt/DBT-001-series-prefixes-not-applied.md]
---
# MIS-138 — Build the telemetry instrument so every live figure in the corpus is measured, not typed

> **Summary:** One program measures the corpus and writes one dataset — every figure with its definition, its unit, the `HEAD` and the time it was measured at. A document that needs a figure renders it from the dataset or states it with its date; it stops typing numbers. `count-evidence.py` and the one-shot censuses in `scripts/experiments/` fold into the instrument.
> **Epistemic:** today, whether a number in this archive is a measurement or a memory cannot be decided from the text. After this mission it can: a measured figure carries its predicate and its `HEAD`; anything else is prose.
> **Pragmatic:** one command answers "how many" for any registered figure, at any commit, reproducibly. A PR that moves the corpus re-runs it, and the diff of `telemetry/latest.json` *is* the change report.
> **Audience:** Agents · Oracles

---

## Context — measured at `e4b94e7`, 2026-09-02

Every figure below was produced by a script at the base commit and is stated with the predicate that produced it. That is the discipline this mission installs; the brief obeys it first.

- **152 live figures in 28 documents are hand-typed.** Predicate: a corpus-state number ("N of M", "N/M", "N files|documents|missions|entries|violations|references|links|pages|series|headers") inside a document that claims currency — `standards/`, `protocols/`, `debt/`, `decisions/`, `canon/` with `status: active`; `missions/` with `status: todo|in-progress`; `web/src/views` and `web/src/pages` — outside record sections (Version history, Execution log, Closure, Status check, ledgers) and outside lines that already carry a date, a commit or a PR number. Heaviest carriers: `MIS-0121` (20), `STD-001` (18), `DBT-001` (13), `DBT-003` (11), `DBT-004` (11).
- **The same fact, 6 values.** Pages built by the site: 278 (`DBT-003`) · 559 (`STD-001`) · 662 (`PRO-013`) · 673 (`MIS-0123`) · 679 (`DBT-010`) · 688 (`DBT-004`). None was wrong when written; none says when. No instrument has a `pages_built` key.
- **Two figures published on 2026-09-02 were withdrawn the same day** (`MIS-135` v1.1.1): "43 of 62" done missions without Closure was 34 of 62; "78 `TBA`" was 38. The scripts had printed a number without its predicate. The rule that follows: *a figure without its definition beside it is not delivered*.
- **The instrument exists in pieces.** `scripts/count-evidence.py` emits 21 keys with `--json` and the §10.1 provenance header, but no units, no definitions and no history. 8 one-shot censuses live in `scripts/experiments/` (`complexity-census.py`, `dates-vs-commits.py`, `frontmatter-census.py`, `index-coverage.py`, `protocol-anchor.py`, `provenance-census.py`, `public-surface-census.py`, `regime-crossings.py`), each re-deriving the corpus its own way. 5 ratchet baselines in `scripts/` each know exactly one number (`frontmatter-baseline.json` 21, `naming-baseline.json` 0, `prose-baseline.json` None, `references-baseline.json` 669, `url-baseline.json` 624). `scripts/blind-spots.json` has 2 entries; `count-evidence.py` is among them.
- **The status census this brief would once have typed** — `done` 63 · `frozen` 38 · `todo` 29 · `in-progress` 6 (`count-evidence.py --json` → `misiones_por_status`, files `missions/MIS-*.md` by frontmatter `status`) — is here only to show what a rendered figure looks like: value, unit, predicate, `HEAD`.
- `DBT-006` names the same failure one level up: 145 compliance assertions the system never reads back. This mission is the mechanism for the numeric subset of that debt, not its closure.

---

## Scope

**1 · The instrument — `scripts/telemetry.py`.** One entry-point, stdlib only, read-only on the corpus, deterministic. It:

- prints the provenance header (`measuring_root.cabecera`, `STD-001` §10.1) and formats every count with its unit (`measuring_root.cifra`, §10.2);
- measures the v1 key set below and writes `telemetry/latest.json`:
  `{ "head", "measured_at", "root_dirty", "figures": { "<key>": { "value", "unit", "definition" } } }`;
- appends one line per run to `telemetry/history.jsonl` (`head`, `measured_at`, values only) — the time series;
- `--check` exits non-zero when `latest.json` was not produced at `HEAD` or a fresh run disagrees with it. This is the future CI hook (`PRO-013`); **it is not wired in this mission** (Oracle, 2026-09-02: CI waits until the guards stop contradicting each other);
- `--render` rewrites the blocks between `<!-- telemetry:begin key=… -->` and `<!-- telemetry:end -->` in the documents that carry them; `--render --check` fails when a block is stale;
- declares what it does not measure in `scripts/blind-spots.json` (§10.4).

**2 · The v1 key set.** Each key ships with its definition inside the dataset; this table is the contract.

| key | definition (the predicate) | unit | who types it today |
|---|---|---|---|
| `missions_by_status` | files `missions/MIS-*.md` grouped by frontmatter `status` | missions | `STD-001` §4.1, `MIS-135`, the board |
| `missions_by_{guild,territory,priority,effort,assigned_to}` | same files grouped by that field; `null` counted as `null` | missions | `MIS-124`, `DBT-008` |
| `territory_tba` | missions with `territory: "TBA"` | missions | `MIS-123`, `MIS-124` |
| `done_without_closure` | `status: done` ∧ no `## Closure` heading | missions | `MIS-134`, `MIS-135` |
| `done_edited_after_done` | `status: done` ∧ a commit touches the file after the commit that set `done` (`git log --follow`) | missions | `DBT-002`, `DBT-006`, `STD-001` |
| `missions_without_author` | mission files with no `author:` key | missions | `DBT-008` |
| `series_registration` | per series: files matching the registered id form / total, apparatus and frozen artefacts excluded — `count-evidence` `matricula` | files | `STD-001` §4.1, `DBT-001` |
| `docs_total`, `docs_with_frontmatter` | tracked `.md` outside `web/`, `reports/evidence/`, `node_modules` — `count-evidence` | documents | `STD-001` |
| `uid_present`, `uid_collisions` | `count-evidence` | documents | `MIS-122`, `MIS-123` |
| `baselines` | for each `scripts/*-baseline.json`: its `count` | entries | `MIS-121`, `DBT-010`, `CHANGELOG` |
| `ci_guards` | steps of `.github/workflows/ci.yml` whose `run:` invokes a file under `scripts/` | steps | `PRO-013` §4, `STD-001` |
| `pages_built` | `find web/dist -name index.html` when `web/dist` exists; otherwise `null` with the reason recorded | pages | `DBT-003`, `DBT-004`, `DBT-010`, `MIS-123`, `PRO-013` |
| `redirects_declared` | entries of `redirects` in `web/astro.config.mjs` | redirects | `DBT-004` |
| `live_figures` | the predicate in *Context*, per document | figures | this mission |

Every one of the 21 keys of `count-evidence.py --json` maps to one of these; the mapping table is committed beside the instrument and `count-evidence.py` becomes a client of the dataset — same text, same legacy keys — until the Oracle retires it (decision 3).

**3 · Two documents rendered, not typed.** `STD-001` §4.1 (the series-coverage table, merged by hand on 2026-09-02 and stale once already) and the coverage table of `DBT-001`. They receive markers; the instrument fills them. **No other document body is edited by this mission.**

**4 · Filing.** `telemetry/README.md` (`type: meta`: what the dataset is, how it is regenerated, how a merge conflict on it is resolved — by re-running, never by hand); a `REUSE.toml` stanza (`telemetry/**` → `CC0-1.0`, it is data); the document guards untouched (they read `.md`; the folder carries one `.md` of apparatus).

## Out of scope

- **The burndown of the 152 live figures.** This mission makes them countable and renders the two worst documents. Rewriting the other 26 documents is editorial work under a rule that does not exist yet (decision 2) — a sibling mission once the rule is signed.
- **CI.** `--check` exists and is documented; wiring it is a `PRO-013` handoff the Oracle has deferred.
- **The web.** The board computes its own counts from the same corpus at build (`MissionsView.astro`): a second *computed* source, not a typed one. The hand-typed copy in `AgentView` / `ContinuityView` ("54 misiones", April 2026) is dated marketing text and stays. A later criterion may assert dataset = build counts.
- **`DBT-006` as a whole** — its non-numeric assertions need a different mechanism.
- **`reports/`.** An annex is never rewritten; a report cites the dataset at a `HEAD`, it does not embed a live block.

---

## Acceptance criteria

Each is false at `e4b94e7`; the value it returns today is stated.

- [ ] `python3 scripts/telemetry.py` exits 0, prints the §10.1 header, and writes `telemetry/latest.json` in which every figure carries `value`, `unit` and `definition`, and the file carries `head` and `measured_at`. — today: `ls telemetry/latest.json` → *No such file*
- [ ] Every key of the v1 table is present in `latest.json`, and every key of `count-evidence.py --json` (21) has a row in the committed mapping table. — today: 0 keys, no table
- [ ] Two runs at the same `HEAD` write identical `latest.json` apart from `measured_at` — `diff <(jq 'del(.measured_at)' a.json) <(jq 'del(.measured_at)' b.json)` is empty. — today: no instrument
- [ ] `python3 scripts/telemetry.py --check` exits 0 where `latest.json` is fresh, and non-zero after one frontmatter `status` is changed in a scratch worktree without re-running. — today: exit 2, no such file
- [ ] `STD-001` §4.1 and the `DBT-001` coverage table sit between `telemetry:begin` / `telemetry:end` markers, and `python3 scripts/telemetry.py --render --check` exits 0. — today: `grep -c 'telemetry:begin'` → standards/STD-001-glossary.md:0, debt/DBT-001-series-prefixes-not-applied.md:0
- [ ] `latest.json` carries `live_figures` with its predicate text and a per-document breakdown whose total equals an independent run of the predicate at the same `HEAD`. — today: no key (152 figures / 28 documents measured ad hoc)
- [ ] `scripts/blind-spots.json` has an entry for `scripts/telemetry.py` and `node --test scripts/test/blindness.test.mjs` passes. — today: no entry (2 entries, none for telemetry)
- [ ] `count-evidence.py --json` at one `HEAD` is dict-equal before and after it becomes a client of the dataset. — today: not applicable, it is the source
- [ ] `reuse lint` passes with `telemetry/**` covered by `REUSE.toml`. — today: no stanza, folder absent
- [ ] `telemetry/history.jsonl` has one line per run and the file is append-only in `git log -p` (no line ever removed). — today: absent

---

## Decisions for the Oracle

Numbered. The mission starts on the recommendation and re-does on a different ruling; 1 and 4 are cheap to reverse, 2 and 3 are not.

1. **Home of the dataset.** Recommended: `telemetry/` at the repository root — it is data, not a document series (`ADR-005` does not govern it), and it is the one thing this mission wants visible. Alternative: `scripts/telemetry/`, beside the baselines, where nobody looks.
2. **The rule.** A new `STD-001` §10.5 `[MANUAL]`: *"A live document does not type a corpus figure. It renders it from `telemetry/latest.json` between markers, or states it with the `HEAD` and the date it was measured at."* The proposed text ships in this mission's PR as a separate commit; without the signature the burndown has no rule to stand on and the 152 figures stay legal.
3. **`count-evidence.py`.** Recommended: a client of the dataset for one release, then retired — its 13 citing documents point at history, not at a living tool. Alternative: keep both. Two sources of the same figures is the disease this mission treats.
4. **Committing `latest.json`.** Recommended: yes — the instrument is deterministic, so a merge conflict on the file is resolved by re-running it, no judgement involved, and the diff in a PR is the change report. Alternative: build-time only — no history, no diff, nothing to audit.

---

## Closure

*(Fill when the mission closes. Not before, and not with intentions.
Add here — never edit `Scope` or the criteria to match what happened.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** YYYY-MM-DD · **by:** agent-id

## Epistemic value

Hypothesis: most figure drift in this archive is not miscounting but **un-dated copying** — a number correct at one `HEAD`, re-read as current at another.
Validated by: `live_figures` per document at `e4b94e7` against the same predicate after the two rendered blocks land; and `history.jsonl` across the next ten corpus PRs — if the values move while the documents' prose does not, the hypothesis holds.
