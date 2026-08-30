---
id: "MIS-126"
title: "The field decision index — ask the canon before asking the Oracle"
type: mission
status: done
version: "1.0.0"
created: "2026-08-30T11:20:00Z"
created_source: "git:b09311c"
created_confidence: exact
updated: "2026-08-30T11:20:00Z"
completed: "2026-08-30T11:20:00Z"
author: "ursa"
owner: "oracle"
license: "CC-BY-4.0"
territory: "Standards"
guild: "Alchemists"
tags: [governance, frontmatter, tooling, self-application]
priority: high
effort: S
type_execution: digital
---

# MIS-126 — The field decision index

## Why this exists

On 2026-08-30 I brought the Oracle three decisions and called them *pending*.
All three were already ruled, signed, and sitting in this repository:

| What I said | What the canon already said |
|---|---|
| "`territory` is blocked — decide the vocabulary" | `ADR-028` L144-148: 66 documents map, **76 take `TBA`** |
| "111 orphan fields — register them or delete them?" | `S-004` §6: **they die by omission** |
| "the guild vocabulary has thirteen values" | `S-001` L957: it has **four**. I invented the rest |

The Oracle answered the first two by pointing at documents he had already
signed. The third was worse: I did not misread a vocabulary, I **fabricated
one**, and then measured the corpus against my fabrication and reported the
result as a finding.

**Root cause, stated without softening it:** I read the guard's source, found
no rule, and concluded there was no rule. The guard is 273 lines. The corpus
is ~29,000 lines of governance. **A missing check means nothing at all.**

This is `D-021` — the self-application gap — in its purest form: the
instrument that measures the corpus was treated as the authority over it.

## What was built

`scripts/field-decisions.mjs`, which answers one question per field:

```
$ node scripts/field-decisions.mjs territory
territory  (70 uses, ring 3-all)
  status:     ruled
  decided by: S-004 §6
  vocabulary: CAO · Product · Platform · Infrastructure · Content · Sales · Funding · Archive
  note:       ADR-028: documents that do not map take TBA, owned by the mission
              that closes the vocabulary
  carried by: canon, debt, decisions, missions, protocols, reports, standards
```

The question that cost three round-trips with the Oracle now costs one second.

**It is generated, never hand-written.** It parses the guard's own ring
constants plus the `RETIRED` map, so it cannot drift from the guard. A
hand-maintained second copy would drift, and drift is the exact defect this
file exists to prevent.

## What it found on its first run

**131 fields carried by the corpus: 70 ruled, 61 unruled.**

The 61 unruled are not a crisis. The largest carries **11 uses**
(`visibility_reason`); most carry one. `S-004` §6 already sentenced them:
they die by omission unless a field earns an ADR.

It also found something I had catalogued by hand an hour earlier, and found
**more of it than I did** — five ring-table gaps, where I had counted three:

| Field | Registered for | Also carried by |
|---|---|---|
| `scope` | `reports` | `blueprints` |
| `human_approval_score` | `missions` | `protocols` |
| `extraction_note` | `blueprints`, `operations` | `reports` |
| `subtype` | `reports`, `standards` | `blueprints` |
| `context` | `missions` | `decisions` |

**These are not corpus debt. They are transcription gaps in the ring table
itself** — the same class of error `S-004`'s own amendment log records having
corrected twice before. The table widens; the documents are not touched.

I found three by reading. The script found five by counting. That difference
is the whole argument for the script.

## Acceptance criteria

- [x] **Every field carried by the corpus resolves to a ruling or is explicitly
  marked open.** 131/131 fields classified — 70 ruled, 61 `unruled` with the
  `S-004` §6 sentence attached. Verified: `node scripts/field-decisions.mjs`
- [x] **The index cannot drift from the guard.** It parses `RING1`, `RING2`,
  `RING3`, `RING3_ALL` and `RETIRED` out of `lint-frontmatter.mjs` at
  generation time. No ring is restated by hand.
- [x] **Ring-table gaps are detected, not remembered.** Five found
  automatically. Phase 5 of the burndown plan no longer depends on my notes.
- [x] **It is idempotent.** Second run produces a byte-identical file —
  `git diff --stat` empty after re-running `--write`.
- [x] **It changes nothing it measures.** Baseline stays at **543**, all four
  guards green, no document edited.

## What this does not do

It does not make the guard enforce anything new. It is a **reference**, not a
check. A field marked `unruled` still passes CI exactly as before.

That is deliberate. The failure it addresses was not the corpus breaking a
rule — it was an agent not knowing a rule existed.

## The honest limitation

The index derives *authority* from the guard's rings, which means it inherits
whatever the rings get wrong. It found five ring-table gaps precisely because
the rings and the corpus disagree — but if a rule is written in `S-001` and
has **no** guard implementation at all, this index will still call the field
`unruled`.

`territory` is the proof: it reports `ruled` only because I hand-wired the
`VOCAB` block from `S-001` L964 and `ADR-028`. Three vocabularies are wired
that way. **The other four declared vocabularies are not, and the index cannot
see them.**

So this reduces the failure. It does not eliminate it. Closing it properly
means the standards themselves becoming machine-readable — which is a larger
mission than this one, and not one I should open without the Oracle.

---

*Verified at `b09311c`, 2026-08-30. `node scripts/field-decisions.mjs --write`
reports 131 fields, 70 ruled, 5 ring-table gaps; four guards green; baseline
unchanged at 543.*
