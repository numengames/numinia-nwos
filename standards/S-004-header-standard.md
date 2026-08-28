---
id: "S-004"
title: "The header in three rings: identity, provenance, extension"
type: documentation
subtype: standard
status: draft
version: "0.1.0"
created: "2026-08-28T15:10:00Z"
created_source: "git:pending"
created_confidence: exact
updated: "2026-08-28T15:10:00Z"
author: "ursa"
owner: "oracle"
license: "CC-BY-4.0"
tags: [frontmatter, standard, lint, metadata]
---

# S-004 — The header in three rings

> **Status: DRAFT.** Nothing here obliges anything until the Oracle signs.
> This document proposes; `S-001` §6-§8 currently governs. On signature,
> this standard absorbs §6-§7 by reference and S-001 points here.
>
> **Design rule of this standard:** every normative statement carries a
> check identifier (`H-NN`) and is written so that `lint-frontmatter`
> (D-021 / t_1134d057) can implement it mechanically, 1:1. A rule that
> cannot be checked is marked `[MANUAL]` and says why. There is no third
> kind.

## 0. The problem, measured

Census of 2026-08-28 (`scripts/experiments/frontmatter-census.py`,
reproducible, corpus tree excluding `web/` and `evidence/`):

| Measure | Value |
|---|---|
| `.md` documents | 314 |
| with frontmatter | 296 |
| **without frontmatter** — invisible to every instrument | **18** |
| distinct fields in use | **127** |
| fields used ≤2 times (noise or stillborn conventions) | **62** |
| distinct `type` values vs 10 admitted by S-001 §7 | **18** |
| dates without time (`T00:00:00Z` or bare date) | 114 |
| empty values written instead of omitted | 75 |
| `version` with `v` prefix | 7 |

Two readings. First: the header is the machine interface of the corpus —
every census, guard, index and the web read it — and half its surface is
noise. Second: **the drift concentrates where authority concentrates**
(`canon/`, `standards/` carry parallel Spanish-era fields: `estado`,
`fecha`, `licencia`, `revision`). The instruments are least reliable
exactly where being wrong costs most.

## 1. The three rings

A header is complete when it answers three questions a third party would
ask of any archived document: **what is this** (identity), **where did it
come from** (provenance), **what else does its series need** (extension).

```
┌─ Ring 3 · EXTENSION ── per-series, registered here or invalid ─┐
│ ┌─ Ring 2 · PROVENANCE ── who/whence, degrades to declared ──┐ │
│ │ ┌─ Ring 1 · IDENTITY ── 8 fields, strict, no exceptions ─┐ │ │
│ │ │  id · title · type · status · version                  │ │ │
│ │ │  created · updated · license                           │ │ │
│ │ └────────────────────────────────────────────────────────┘ │ │
│ │   author · owner · provenance · created_source             │ │
│ │   created_confidence · requested_by · relations            │ │
│ └────────────────────────────────────────────────────────────┘ │
│    missions: priority effort guild … · reports: severity …     │
└────────────────────────────────────────────────────────────────┘
```

The rings are cumulative: Ring 1 is mandatory for every document, Ring 2
for every document that makes a claim (all but apparatus), Ring 3 as each
series registers. **A field in no ring is invalid** — that single rule is
what stops 127 fields becoming 200.

## 2. Ring 1 — identity (strict)

The eight fields of S-001 §6.1, unchanged in meaning, now each with its
check:

| Field | Rule | Check |
|---|---|---|
| `id` | present; matches `^[A-Z]+-` and its series' prefix per ADR-005; or `registration: exempt` with reason | **H-01** |
| `title` | present, non-empty, English | **H-02** (presence; language `[MANUAL]` — detectors lie) |
| `type` | present; value ∈ §4 vocabulary | **H-03** |
| `status` | present; value ∈ the lifecycle of its `type` (§5) | **H-04** |
| `version` | present; SemVer, **no `v` prefix** (7 violations today) | **H-05** |
| `created` | present; ISO 8601 **with time**; `T00:00:00Z` rejected for new documents (114 legacy carry it; baseline, §7) | **H-06** |
| `updated` | present; ISO 8601 with time; `>= created` | **H-07** |
| `license` | present; SPDX; agrees with `REUSE.toml` | **H-08** (exists today: `check-license-frontmatter.mjs`) |

**H-00 (the gate):** every `.md` under governed series carries
frontmatter. The 18 naked documents (GOVERNANCE.md, CONTRIBUTING.md,
CHANGELOG.md, …) are the subject of t_1c32aeb0; this standard defines
what they must carry, that card decides when.

**Empty is absent (H-09):** a field with an empty value is a lint error.
`null` is not a value; if it does not apply, it is not written (S-001
§6.3). 75 violations today.

## 3. Ring 2 — provenance (strict where evidence exists)

| Field | Rule | Check |
|---|---|---|
| `author` | who wrote it (person or agent, ∈ identity file of D-026 when it exists) | **H-10** (presence per series policy; identity match deferred to D-026) |
| `owner` | who answers for it now | **H-11** |
| `provenance` | `human` · `ai-assisted` · `ai-generated` (S-001 §7) | **H-12** |
| `created_source` | `git:<sha>` or `declared` — where the date came from (S-001 §8) | **H-13** |
| `created_confidence` | `exact` · `inferred` — never invented (D-021) | **H-14** |
| `requested_by` | optional; who commissioned | **H-15** (vocabulary-free; presence only) |
| `supersedes` / `superseded_by` / `derived_from` | resolvable identifiers; superseded documents are never deleted (P-010 §5) | **H-16** (resolvability) |

Ring 2 admits `declared` where git cannot testify — the point is that a
reader can always tell **evidence from claim** (S-001: *a date derived
from a commit is evidence; a typed one is a claim*).

## 4. The `type` vocabulary — adopt reality where it is right

S-001 §7 declares 10 values; the corpus uses 18. The census splits the 8
intruders into two classes, and they deserve opposite treatment:

**Legitimate, propose to ADMIT (needs its ADR per S-001 §7):**

- **`agent`** — 24 documents, the whole `agents/` series. S-001 §3's own
  canonical map has **no row for `agents/`**: the series that answers
  "who acts" has no admitted genre. This is a gap in the standard, not
  drift in the corpus. Admit `type: agent` ↔ `agents/`, strict.

**Drift, propose to MIGRATE (mechanical, one PR each):**

| Value | Count | Correction (already ruled by S-001 §7) |
|---|---|---|
| `decision` | 6 | → `adr` |
| `audit` | 2 | → `report` + `subtype: audit` |
| `roster` | 4 | → `meta` |
| `standard` | 3 | → `documentation` (+ `subtype: standard`, see below) |
| `technical` | 4 | → `documentation` |
| `proposal` | 2 | → the genre it proposes (`adr` draft, `blueprint`) `[MANUAL]` — read each |
| `template` | 1 | → `meta` |

**H-03 enforces the closed list; H-17** enforces the §3 type↔series map
(strict for the strict 9 — the 8 of S-001 plus `agent` — warn-only for
`documentation` and `meta`, exactly as S-001 §3 already concedes).

**`subtype` becomes load-bearing (H-18):** free-text today, it is how
`report/audit` and `documentation/standard` keep their identity after
migration. Rule: if present, value ∈ registered list per type. Registered
now: `report: audit, daily` · `documentation: standard, guide`.

## 5. Status lifecycles

S-001 §7 defines the mission lifecycle. This standard states the check
and adds the two lifecycles the corpus already uses implicitly:

- **missions:** `todo → in-progress → in-review → done` + `frozen`
  (**H-04**; the 45 `backlog`/`draft` documents are D-009's migration,
  carried as baseline until it lands)
- **adr:** `draft → active → superseded` (census: `Active` ×9 — case
  normalizes to lowercase, **H-19**)
- **everything else:** `draft → active → closed` unless its series
  registers otherwise in Ring 3

## 6. Ring 3 — extension by series (the anti-entropy rule)

**The rule that keeps 127 from becoming 200 (H-30):** a field not in
Ring 1, Ring 2, or the registry below is a lint **error**. Adding a field
= one line in this table + the ADR that justifies it. The registry IS the
standard; there is no out-of-band extension.

Initial registry — transcribed from actual majority use, not invented:

| Series | Registered fields |
|---|---|
| `missions/` | `priority` `effort` `guild` `territory` `assigned_to` `started` `completed` `mission_id` `type_execution` `freeze_reason` `in_review_at` |
| `reports/` | `severity` `period` `subtype` |
| `decisions/` | `deciders` `consulted` `outcome` |
| `agents/` | `role` `platform` `model` `soul` |
| `debt/` | `severity` `detected` `refuted` `source_audit` |
| `standards/` `canon/` `protocols/` | `supersedes_version` `ratified_by` |
| all | `tags` `visibility` `registration` `uid` (reserved-empty, S-001 §6.2 — **H-20**: non-empty `uid` is an error until the UID system exists) |

The remaining ~50 rare fields not registered here die by omission: the
lint flags them, their carriers migrate or the field earns its ADR. The
census names every one; the migration card executes against that list.

**Retirements already ruled by S-001 (the lint inherits them):**
`area` → `territory` (D-010, 142 carriers today) · `blocked_reason`
(D-002) · Spanish keys `documento/ambito/estado/fecha/licencia/revision`
(C-005 material, coordinated with t_d4936cc8) — each is a **H-31** wave
with its own baseline entry until its migration lands.

## 7. Enforcement: strict on the delta, baseline on the stock

The D-021 lesson is that a rule without a mechanism does not survive its
own author. But 296 documents cannot become conformant in one PR, and a
lint that fails on everything is a lint that gets disabled.

**The pattern (proven in this repo by `check-references.mjs`):**

1. `lint-frontmatter.mjs` runs on every PR over the full corpus.
2. Violations present at adoption are written to
   `scripts/frontmatter-baseline.json` — counted, dated, **allowed to
   exist but not to grow**.
3. Any NEW violation (file not in baseline, or new defect in a baselined
   file) **fails the build**.
4. Every migration card (D-009, D-010, t_1c32aeb0, t_c848ef09) shrinks
   the baseline; the baseline's size is the public entropy metric of the
   corpus. Zero is the finish line, visible from every PR.

Check-to-rule mapping is 1:1 by construction (H-00…H-31 above); the lint
prints the H-number with every finding, so a failure cites the standard
that condemns it.

**Scope note (D-017):** wiring the lint into CI workflows is Oracle
territory; the deliverable of t_1134d057 is the script + this mapping.

## 8. What this standard does NOT do

- It does not migrate anything. Every count above stays as-is until its
  card executes (D-009, D-010, t_1c32aeb0, t_c848ef09, t_d4936cc8).
- It does not rename fields or documents (S-001 §5.0.1 governs renames).
- It does not decide the 18 naked governance documents' content — only
  what a conformant header is when t_1c32aeb0 dresses them.
- It does not touch `web/src/content/` — Astro's own schema governs the
  site pipeline; this standard governs the corpus tree.
