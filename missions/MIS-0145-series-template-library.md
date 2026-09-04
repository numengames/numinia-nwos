---
id: "MIS-145"
uid: ""
title: "Series template library: every registered series gets a copy-from template in templates/"
status: done
priority: medium
effort: M
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
completed: "2026-09-04"

type: mission
version: "1.1.0"
created: "2026-09-03T10:22:10Z"
created_source: "git:7ca43b3"
created_confidence: exact
updated: "2026-09-04T20:15:00Z"
author: "ursa"
owner: "oracle"
tags: [templates, series, archive, standards]
license: "CC0-1.0"
---

# MIS-145 — Series template library: every registered series gets a copy-from template in templates/

> **Summary:** One copy-from template per registered series, consolidated in `templates/`,
> so a new document of any series starts from a canonical mould instead of archaeology.
> **Epistemic:** How many templates the archive needs, and what each series' contract requires.
> **Pragmatic:** Copy `templates/<PREFIX>-TEMPLATE` when creating any new series document;
> copy `agents/_template/` when creating a new agent.
> **Audience:** Agents · Oracles

---

## Background

The archive has 12 registered series (STD-001 §2; rules.json `series`), but only three have
templates, scattered:

- `templates/STD-TEMPLATE.md` — created by MIS-142, the only file in `templates/`.
- `templates/MIS-TEMPLATE`, `templates/MIS-TEMPLATE-CHANGES`, `templates/MIS-TEMPLATE-EXAMPLE` —
  the mission contract and its design record, living inside the series they scaffold.
- `agents/_template/` — the agent scaffold (AGENT.yaml, SOUL.md, OPERATOR.md, SOURCES.md,
  adapters/), living where it is copied from.

MIS-142 (decisions-to-standards) explicitly deferred this consolidation: its scope note names
"Migrating existing templates (`missions/TEMPLATE*.md`, `agents/_template/`) into `templates/`"
as out of scope. This mission closes that gap.

**Status note:** this mission opens at `todo` — the canonical status for "accepted, not
started" (STD-001 §7; `backlog` is the retired spelling, flagged by H-04, that the board
still renders in the same column, MIS-132). It flips to `in-progress` when execution starts.

## Scope

### Move into `templates/` (git mv — history follows)

- `templates/MIS-TEMPLATE` → `templates/MIS-TEMPLATE` — the canonical mission contract
  (the ten build-verified fields + Scope/Acceptance criteria/Closure). Take this one as the
  reference for consolidation: it is the most elaborated and the one the build verifies.
- `templates/MIS-TEMPLATE-CHANGES` → `templates/MIS-TEMPLATE-CHANGES` — the design record:
  the figures that rebuilt the v2 mission template. Epistemic value, kept with the template.
- `templates/MIS-TEMPLATE-EXAMPLE` → `templates/MIS-TEMPLATE-EXAMPLE` — a real filled mission.
  Pragmatic value, kept with the template.

### Create the missing series templates

Each carries its series' real frontmatter contract and required structure, derived from the
live corpus (headers of the actual documents), not invented:

| Series | File | Frontmatter contract | Document structure |
|---|---|---|---|
| Missions | `MIS-TEMPLATE` (moved) | 10 CORE fields the build verifies (content.config.ts) + REGISTRO block | Scope / Acceptance criteria / Closure; optional Story, Epistemic/Pragmatic value, Execution log |
| Standards | `STD-TEMPLATE.md` (exists) | STD-NNN, 5 required sections per STD-004 §10 | Purpose and scope / The norm (RFC 2119) / Conformance / What it does NOT do / Version history |
| Protocols | `PRO-TEMPLATE` | `type: protocol`, PRO-NNN | Purpose / Procedure steps / Verification / Escalation |
| Decisions | `ADR-TEMPLATE` | `type: adr`, ADR-NNN, append-only | Context / Decision / Consequences / Status |
| Debt | `DBT-TEMPLATE` | `type: documentation`, `absorbs:`, `related:`, `visibility:`, "Closes when" | The defect / Evidence / Closure condition |
| Reports | `RPT-TEMPLATE` | Two variants: RPT-NNN (`subtype: audit\|analysis\|proposal`) and RPT-YYYY-MM-DD (`subtype: daily`, `evidence_script`, `evidence_head`) | Numbered: audit/analysis/proposal body; Daily: session record |
| Operations | `OPS-TEMPLATE` | `type: documentation`, OPS-NNN | Record body, `extraction_note` when extracted from web |
| Canon | `CAN-TEMPLATE` | `type: seminal`, sealed threshold (Oracle signature + ADR) | What the system IS; governing principle |
| Blueprints | `BLU-TEMPLATE` | `type: blueprint`, `semaforo`, `related_missions`, territory | Future-state architecture plan |
| System | `SYS-TEMPLATE` | `type: documentation` + `subtype: reference`, `former_id` + note | Reference manual of how the system works today |
| Guilds | `GLD-TEMPLATE` | `type: charter` for charter and roster forms, GLD-NNN | Charter: identity + operational profile; Roster: active agents |

`templates/` is already apparatus in `scripts/lib/rules.json` (`pathPatterns` and
`templatePatterns` both include `^templates/`) and its licence regime is CC0-1.0
(REUSE.toml, MIS-142) — no guard or licence change needed.

### `agents/_template/` stays in `agents/`

Decision (Oracle-confirmed 2026-09-03): the agent scaffold does NOT move. Reasons:
it is a directory scaffold (5+ files, not one document); `agents/` is outside the filename
scheme by ADR-005 v1.1.0 ("identified by folder name, not filename"); the guards already
recognise `^agents/_template/` as apparatus where it is; moving it would change the web
corpus surface (`agents/**/*.md` is in the glob) with no benefit. `templates/README` points
to it as the copy source for new agents.

### `templates/README.md` (new)

The index of the library: what each template is for, the series → template map, and the
pointer to `agents/_template/` for new agents.

### STD-001 §2 gains the series → template map

A subsection in `standards/STD-001-glossary.md` §2 (the series section) listing, per
registered series, which `templates/` file to copy from. Governed change (STD-001 threshold:
governed — Oracle-approved PR).

### Repair citations broken by the moves (form-only edits on closed records, STD-001 §2.1)

- `protocols/PRO-003-mission-cycle.md` — "Use templates/MIS-TEMPLATE" → point at `templates/MIS-TEMPLATE`.
- `AGENTS.md` and `CONTRIBUTING.md` — same repoint.
- Missions citing `missions/TEMPLATE*.md` by path: MIS-0111, MIS-0115, MIS-0133, MIS-0135
  (and any other the reference guard flags). Form-only: never rewrite what a closed record
  claims.

**Amendment, 2026-09-04 (execution) — this clause was applied more narrowly than
written, and the narrowing needs Oracle confirmation.**

The first execution read "form-only repoint" as licence to rewrite every mention,
and a global substitution reached nine closed records: a 2026-04 history entry, a
signed report (`RPT-2026-08-25`), the `CHANGELOG`, and four `done` missions. Those
documents do not cite a live path — they narrate what a file was called at the time
they were written: in April the file was called TEMPLATE, in missions/. Rewriting that
makes the record say something it did not say, which STD-001 forbids: *an out-of-date
record is history*.

So the repoint was applied only to live documents — `PRO-003`, `AGENTS.md`,
`CONTRIBUTING.md`, `DBT-003`, `MIS-0121`, `MIS-0135` — and the nine surviving mentions
were added to `scripts/references-baseline.json` instead. This follows the precedent of
the `P-NNN` → `PRO-NNN` rename, whose `history/` mentions were baselined, not rewritten
(two entries still in the baseline today).

**Cost, stated plainly:** the baseline gained 9 entries, and its own header says the list
"should shrink over time and never grow". Net it fell 869 → 801 (77 unrelated references
healed in the same run), but the 9 are a real addition. The alternative was falsifying
nine records. If the Oracle prefers the rewrite, this is the line to reverse.

### Telemetry dataset

The corpus changes (three files leave `missions/`): regenerate and commit `telemetry/`
(`node scripts/telemetry.mjs --fetch-tokenizer` first, then `node scripts/telemetry.mjs`,
per the MIS-138 recipe) or `telemetry --check` fails CI.

## Out of scope

- ~~`infra/` — 0 eligible files, prefix reserved. No template until it has content.~~
  **This was false at the base commit** (see Closure, divergence 1): `infra/` has a
  tracked document. It was templated. The line is struck rather than deleted, because
  what the brief believed is part of what the mission found.
- Any content change to the moved templates beyond consolidation notes.
- Moving `agents/_template/` (explicitly kept in place, see Scope).
- Changes to the `templates/` licence regime (already CC0-1.0).
- Retiring the old `missions/TEMPLATE*` apparatus entries from rules.json — `^templates/`
  already covers the moved files; the old `^missions/TEMPLATE-` patterns simply stop matching.
  No guard edit needed.

## Acceptance criteria

> Every criterion must be FALSE at the base commit (today's state in parentheses).

```
✓  ls templates/ shows MIS-TEMPLATE, MIS-TEMPLATE-CHANGES, MIS-TEMPLATE-EXAMPLE,
   README, and one <PREFIX>-TEMPLATE per series: PRO ADR DBT RPT OPS CAN BLU SYS GLD
   (today: only STD-TEMPLATE.md)
✓  ls missions/TEMPLATE* returns nothing                              (today: 3 files)
✓  agents/_template/AGENT.yaml still exists                            (today: exists)
✓  templates/README exists                                             (today: absent)
✓  grep -c 'templates/MIS-TEMPLATE' protocols/PRO-003-mission-cycle.md > 0
                                                                       (today: 0)
✓  grep -c 'templates/' standards/STD-001-glossary.md > 0             (today: 0)
✓  node scripts/check-references.mjs reports no NEW broken reference   (today: passes)
✓  node scripts/telemetry.mjs --check exits 0                          (today: would fail after the moves)
✗  every series is covered                                             (a delta — it rots)
```

## Closure

**Closed 2026-09-04 by ursa.** Every criterion above holds. The mission was
re-opened after its first pass and executed a second time; what follows is the
difference between the brief and what the work found.

### What was done

- **Twelve moulds rewritten, not moved.** The first pass consolidated files and
  gave nine series a template. This pass replaced their content: each mould is
  now a worked example of its own series' contract — frontmatter split into
  required / optional with the optional ring commented out, and body prose that
  says what each section is for and what makes it fail.
- **Every mould is `.md`.** Twelve of the fourteen files were extensionless, so
  every markdown tool in the repository was blind to the documents the corpus is
  copied from. `check-references` indexed 263 documents before, 276 after.
- **`templates/INF-TEMPLATE.md` created** — see divergence 1.
- **`scripts/check-templates.mjs` written** (T-01…T-10), registered in CI as
  step 6b and in the blind-spot registry. Nothing had ever checked the moulds.
- **`scripts/lib/rings.mjs` extracted** from `lint-frontmatter.mjs`. The ring
  registry now has two consumers, so it stops being one guard's private copy —
  the same move MIS-138 made for the vocabularies, for the same reason.
- **`check-references` taught to recognise placeholders** — see divergence 3.
- **`check-license-frontmatter` exempts `templates/`** — see divergence 2.

### What diverged, and why

1. **The brief excluded `infra/`; the repository contradicted it.** Out of scope
   said "0 eligible files, prefix reserved". `git ls-files infra/` returns one
   tracked document, and the shelf had no ring-3 registry line — so any field
   beyond rings 1 and 2 was an H-30 violation by silence rather than by ruling.
   A registered series with content and no mould is exactly the gap this mission
   exists to close, so INF was templated and its registry line written. **The
   repo beat the brief.**

2. **A mould cannot satisfy `check-license-frontmatter`, by construction.** The
   mould's `license:` must teach the destination's regime — `CC-BY-4.0` for
   debt, `MIT` for infra, `LicenseRef-Numen-AllRightsReserved` for guilds —
   while the mould's own path is `templates/**`, which REUSE.toml declares
   `CC0-1.0`. That guard compares a file's frontmatter against its own path, so
   for a mould it demands precisely the answer that makes every document copied
   from it wrong. Six moulds failed it. The fix is not to make the moulds lie:
   `templates/` is now skipped there and checked harder in T-04, which resolves
   the destination directory and compares the regime there. The exemption is
   declared in the blind-spot registry, with the guard that covers it.
   That guard's own header records this drift recurring "three times, from three
   different templates" — this is why.

3. **`check-references` could not tell a shape from a citation.** `MIS-NNNN-slug.md`
   names a filename pattern; no document will ever carry that name. The guard
   read it as a broken reference, so the nine placeholder patterns already in the
   corpus had been silenced one at a time in the baseline. A template library
   would have added two dozen more entries that can never resolve by design.
   Placeholder recognition was added instead: the nine pre-existing entries now
   resolve and the class is closed. **A baseline is for real breakage awaiting
   repair — a shape is not breakage.**

4. **`agents/_template/` stayed, and so did the two `.github/` templates.** The
   brief asked for every template in the repository to move into `templates/`.
   Three cannot. The agent scaffold is a six-file *directory* whose shape is the
   thing being scaffolded; flattening it destroys it. GitHub reads
   `ISSUE_TEMPLATE/` and `PULL_REQUEST_TEMPLATE.md` by path — moving them would
   silently disable them. They are platform configuration written in markdown,
   not moulds for archive documents. `templates/README.md` states all three
   exclusions and why, so the next reader does not re-open the question.

### Evidence

Verified at `aa8ad06` + this branch, 2026-09-04:

- Twelve documents were generated by copying each mould to its destination and
  substituting only the placeholders a human must fill. All twelve passed
  `lint-frontmatter`, `lint-naming`, `check-license-frontmatter`,
  `check-frontmatter-yaml`, `check-frontmatter-delimiter` and `check-core-rules`
  with **no manual edit**, and `npm run build` completed — 299 pages, so the Zod
  schemas accept them. The probe documents were then removed; they were the
  experiment, not the deliverable.
- Falsification of the new guard: run against the templates as they stood on
  `main`, `check-templates` reports 27 findings — the twelve missing extensions,
  and the inline-comment corruption in `STD-TEMPLATE.md` whose `status` value
  read `draft          # draft|active|superseded|withdrawn`. A guard that only
  ever passes proves nothing.
- `check-references`: 9 previously-broken references now resolve; no new ones.
- Full guard sweep green: templates, frontmatter, naming, licence, YAML,
  delimiter, core rules, internal links, orphan content, plain writing.

### What remains open

- `MIS-TEMPLATE-CHANGES.md` and `MIS-TEMPLATE-EXAMPLE.md` cite four retired
  `D-` identifiers and three files that no longer exist. They are records of a
  design made on 2026-08-25, so their citations are historically correct and
  were left intact; they sit in the reference baseline rather than being
  rewritten. Correcting them would falsify a dated record.
- `check-templates` reads frontmatter contracts, not prose. Whether a mould's
  guidance is *good* remains an editorial judgment, declared as a blind spot.

