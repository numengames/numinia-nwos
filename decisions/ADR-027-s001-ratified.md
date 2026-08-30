---
id: "ADR-027"
title: "S-001 is ratified: the archive already obeys it"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-28T16:00:00Z"
created_source: "git:8d944bf"
created_confidence: exact
updated: "2026-08-28T16:00:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [decision, adr, glossary, vocabulary, ratification, debt]
license: "CC-BY-4.0"
visibility: "public"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: "S-001 ratified at v4.0.0; the body's DRAFT line withdrawn"
related: ["S-001", "S-004", "D-009", "D-010", "D-016", "P-012"]
---
# ADR-027 — S-001 is ratified: the archive already obeys it

> **Summary:** `S-001` declared itself `active` in its frontmatter and
> `DRAFT — not signed` in its body. The contradiction is resolved in favour
> of `active`, and the ratification is recorded here.
> **Epistemic:** The archive could not answer "is the glossary in force?"
> from the glossary. Now it can.
> **Pragmatic:** Unblocks `D-009`, `D-010` and the migration cluster, which
> were correctly refusing to migrate data to an unsigned rule.

## The contradiction

`standards/S-001-glossary.md` at `8d944bf`:

```
frontmatter :  status: active
line 28     :  > **Status:** DRAFT — not signed. Blockers 1–2 executed…
```

**64 documents cite `S-001` as authority.** Whether they are citing a rule
or a proposal depended on which half of the file the reader opened. This is
the highest-leverage ambiguity in the corpus: it is not one document's state,
it is the state of the thing that defines every other document's state.

## Why ratify rather than downgrade

Both readings are internally consistent. The tie is broken on evidence of
**what the archive has actually been doing** — and the archive has been
treating `S-001` as binding for weeks:

| Dependency asserted | Measured at `8d944bf` | Command |
|---|---|---|
| Many documents cite it as authority | **64 files** | `grep -rl "S-001" --include="*.md" canon/ decisions/ debt/ protocols/ standards/ missions/ agents/ reports/ \| wc -l` |
| Its rules have been executed as rulings | `D-016`: 12 missions migrated against **`S-001` §7** | `grep -n "S-001" debt/D-016-cancelled-status-retired.md` (entry extinguished 2026-08-30, ADR-030; text in git history) |
| A guard already enforces it mechanically | `lint-frontmatter.mjs` cites `S-001` **5 times**; 865 findings baselined | `grep -c "S-001" scripts/lint-frontmatter.mjs` |
| `S-004` was built on top of it | `S-004` §6 defers to `S-001` §6.3 globals and §5.0 registration | `#114`, `#116` |

Downgrading to `draft` would declare that 64 citations point at a proposal,
that `D-016`'s executed migration was performed against a non-rule, and that
the CI guard enforces something not in force. **The document is not awaiting
ratification; it is describing a state of affairs that already obtains.** The
`DRAFT` line is a stale artefact of the v1→v4 review, not a live reservation.

The reverse test settles it: if `S-001` is a draft, `D-016` must be reopened
and 12 missions reverted. Nobody believes that. The line goes.

## Decision

1. **`S-001` is ratified at v4.0.0**, effective 2026-08-28. Its frontmatter
   already says so; the body's `DRAFT — not signed` line is withdrawn and
   replaced by a dated ratification note pointing here.
2. **`ratified_by: "ADR-027"`** is added to its frontmatter — the field
   `S-004` §6 registers for `standards/`, so ratification becomes a machine
   -readable fact rather than a sentence in prose.
3. **`D-009` and `D-010` are unblocked.** Their stated blocker — *"migrating
   data to an unsigned rule is the mistake this debt exists to avoid"* — was
   correct and is now satisfied. They may execute.

## What would make this wrong (P-012)

This ruling asserts four facts, each measured above with its command. It is
wrong if any of these is false:

- that the 64 citations treat `S-001` as binding rather than as a proposal;
- that `D-016` was executed against `S-001` §7 and stands;
- that no *deliberate* reservation is being held on `S-001` by the Oracle —
  i.e. that the `DRAFT` line is residue, not an intent to withhold signature.

**The third is not measurable from the repository.** It is the Oracle's own
state of mind, and it is the one fact this ADR cannot verify. If the Oracle
was in fact withholding signature on purpose, this ADR is wrong and `S-001`
must go to `draft` instead — with the consequence that `D-016` reopens and
the lint's authority is provisional. Stated here so the ruling can be refuted
rather than merely obeyed.

## Consequences

- The migration cluster proceeds: `D-009` (59 missions with retired statuses,
  up from 45 — the count grew because `missions/TEMPLATE.md` teaches the bug),
  `D-010`, and the baseline reductions that follow.
- `S-004` inherits a signed foundation; its own four ratifications remain open
  and are unaffected by this one.
- Future standards state ratification in **one** place: the frontmatter, via
  `status` + `ratified_by`. Prose status lines in the body are prohibited —
  they are the mechanism that produced this contradiction.

## Record

| | |
|---|---|
| Decided | 2026-08-28 |
| Deciders | Oracle |
| Prepared by | ursa, in session |
| Supersedes | the `DRAFT — not signed` line of `S-001` v4.0.0 |
| Unblocks | `D-009`, `D-010` |
