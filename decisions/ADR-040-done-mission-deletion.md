---
id: "ADR-040"
uid: ""
title: "A done mission can be deleted too — and, since v1.1.0, a frozen one: PRO-003 gets the exit ADR-030 already gave every other document"
type: adr
status: active
version: "1.1.0"
created: "2026-09-08T13:48:37Z"
updated: "2026-09-08T18:10:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [lifecycle, deletion, missions, entropy, mvp-reset, pro-003, pro-010]
amends: ["PRO-003"]
related: ["ADR-030", "PRO-010", "PRO-003", "MIS-127", "RPT-017"]
license: "CC-BY-4.0"
---

# ADR-040 — A `done` mission can be deleted too

> **Summary:** `PRO-003` never named an exit from `done`. This rules that
> one exists — the same four-test process `ADR-030` already gives every
> document — and amends `PRO-003` §2 to say so.
> **Epistemic:** `PRO-010`'s taxonomy already lists Mission among the
> document types its deletion process governs; `PRO-003`, the protocol an
> agent actually reads end-to-end for a mission, never said so. A rule
> that exists in one document and is silent in the one an agent consults
> is not a rule an agent will find.
> **Audience:** Agents · Oracle

---

## 1. Context

The Oracle asked, ahead of a planned corpus reset, to compress every
`status: done` mission into one narrative (`RPT-017`, merged) and then
begin deleting the individual mission files it summarizes — reducing the
`missions/` corpus the way `MIS-127` has already reduced `debt/`,
`decisions/` deliberation, and `canon/`.

Reading `PRO-003-mission-cycle.md` before acting on that surfaced a
contradiction worth stopping for. §2's state diagram has exactly one
terminal transition drawn — `frozen`, reachable from any non-terminal
state — and its own "rules that do not bend" list states, of a cancelled
mission: *"keeps its file, `frozen` with the reason. **Never deleted**."*
`done` has no equivalent line. It is not protected the way `frozen` is;
it is simply never mentioned again after `## Completing (Oracle)`. The
diagram has no arrow leaving it.

Meanwhile `ADR-030` (2026-08-30, absorbing ADR-032/033) already ruled a
general four-test deletion process — no live citations, no unredirected
public URL, a written resolution, and the folder's own threshold met —
and `PRO-010`'s taxonomy table lists **Mission → `missions/` → `MIS-NNNN`**
among the types that process governs. So the authority to delete a
`done` mission already exists in the corpus. `PRO-003`, the document an
agent actually opens to run a mission through its lifecycle, just never
says it does — an agent reading `PRO-003` alone would conclude the
opposite of what `PRO-010` and `ADR-030` already permit.

## 2. Decision

**A `done` mission may be deleted.** The process is `ADR-030`'s existing
four tests, run against `PRO-010`'s `missions/` threshold (`open`: a
normal PR the Oracle approves — `STD-001` §2.1's threshold table).
Nothing new is invented; this ADR closes a gap in `PRO-003`, it does not
create new deletion authority.

`PRO-003` §2 is amended: the state diagram gains a second terminal
transition, `done → (ADR-030 four tests) → deleted`, and the "rules that
do not bend" list gains a line stating the same, immediately after the
existing `frozen`/cancelled line — so the two terminal states read
side by side, one permanently kept, one conditionally removable, instead
of one protected and the other silent.

**This does not itself delete anything.** A `done` mission still needs
its four tests run and passed, file by file, before removal. `RPT-017`
supplies test 3 (a written resolution) for the 66 missions it compresses,
collectively — not automatically for each one; a mission whose specific
claims are not actually carried into `RPT-017`'s narrative fails test 3
individually and is not covered by citing this ADR.

**`frozen` stays exactly as protected as it already was.** Nothing here
touches it. A cancelled mission is a record of what was decided *not* to
do — that has no successor document to absorb its resolution into, so
test 3 can never be met for it by the same mechanism. This decision is
deliberately asymmetric: `done` acquires an exit, `frozen` does not.

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Delete the 66 `done` missions directly, citing `ADR-030` + `PRO-010` without amending `PRO-003` | Technically already legal by the letter of `PRO-010`'s taxonomy table, but leaves `PRO-003` self-contradicting — an agent reading only `PRO-003` (the protocol actually named for mission work) would refuse the deletion `PRO-010` permits. Silent authority is not authority an agent can act on with confidence. |
| Make `done` symmetric with `frozen`: also "never deleted" | Contradicts the Oracle's explicit instruction to reduce the `missions/` corpus ahead of the reset, and contradicts `ADR-030`, which already applies the four-test process to every document type without a `missions/` exception. Reversing that here would need its own justification this mission does not have. |
| A blanket rule — any `done` mission cited by `RPT-017` may be deleted, no per-file test | Rejected: `ADR-030` test 1 (no live citations) is per-document and mechanical (`check-references.mjs`); a blanket rule would delete files still cited elsewhere in the corpus without checking, which is exactly the failure mode `ADR-030` was written to prevent. |

## 4. Consequences

- **Obliges:** any agent proposing to delete a `done` mission runs
  `ADR-030`'s four tests per file, cites this ADR and the passing tests
  in the commit, and does not treat "it's in `RPT-017`" as sufficient on
  its own — test 3 requires the resolution to actually cover that
  mission's specific claims, not merely its presence in the corpus at
  the time the report was written.
- **Costs:** `PRO-003`'s diagram is one line more complex; a reader must
  now track two terminal exits instead of one. Deletion work on
  `missions/` still requires a `check-references.mjs` and
  `check-url-lifecycle.mjs` pass per batch — this ADR removes the
  interpretive gap, not the verification work.
- **Reversal:** if a deleted `done` mission's absence is later shown to
  have cost the corpus a citation, a public URL, or a claim `RPT-017`
  did not actually carry, that is grounds to supersede this ADR and
  restore the stricter reading.

## 5. Status

`active` — this PR is the Oracle's approval (`STD-001` §2.1: `governed`
= "An ADR, or a PR the Oracle approves").

## 6. Amendment, 2026-09-08 (v1.1.0) — `frozen` acquires the same exit

v1.0.0 kept `frozen` permanent on one argument: a cancelled mission has no
successor document to carry its resolution into, so test 3 could never be
met. The Oracle's instruction of 2026-09-08, after the 70 `done` missions
had been deleted into `RPT-017`, was to delete the 38 `frozen` ones too.
That instruction is also the answer to the argument: the successor
document exists as soon as someone writes it. `RPT-017` v0.3.0 records
every frozen mission's identifier, title and `freeze_reason` — for the 22
cancelled, the decision against; for the 16 parked, the trigger that
would reopen the question. That is the written resolution test 3 asks for.

**Decision.** A `frozen` mission may be deleted under `ADR-030`'s four
tests, where test 3 is met by a living document that records its
identifier, title and `freeze_reason`. `PRO-003` §2 is amended
accordingly (v4.5.0): the diagram gains the exit, the "never deleted"
line is replaced, and the asymmetry §2 above described is withdrawn.

**What this does not change.** The four tests still run per file. A
frozen mission whose reason is *not* carried into the resolving document
fails test 3 and stays. Restoring a deleted card is not the way to reopen
a parked question — a new mission is, citing the record.

**Reversal.** As in §4: if a deleted `frozen` mission's absence is later
shown to have lost a decision the corpus needed, that is grounds to
supersede this amendment.
