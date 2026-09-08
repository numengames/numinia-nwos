---
id: "STD-012"
uid: ""
title: "The corpus does not grow: every record has an exit, and records roll up by period"
type: documentation
subtype: standard
status: active
version: "1.1.0"
created: "2026-09-08T22:00:00Z"
updated: "2026-09-09T00:10:00+02:00"
author: "ursa"
owner: "oracle"
license: "CC0-1.0"
tags: [deflation, lifecycle, reports, missions, debt, compression]
ratified_by: "ADR-042"
related: ["ADR-030", "ADR-040", "ADR-042", "PRO-017", "STD-001", "CAN-001"]
---

# STD-012 — The corpus does not grow

> **Summary:** Every record — mission, report, debt — has a written exit, and
> records roll up by period into one document per week, quarter and year.
> What survives a roll-up is what changed a rule, opened a debt, or produced
> something with an address. The rest is history, and git is the archive.
> **Epistemic:** Why a corpus that only adds becomes unreadable, and what a
> reader may expect to find where.
> **Pragmatic:** The identifiers a deleted record used keep resolving; the
> address of the document they resolve to is always the highest living
> level.
> **Audience:** Agents · Oracles

---

## 1. Purpose and scope

An archive that only adds documents becomes, in months, larger than any
reader — human or agent — can hold. Between April and September 2026 this
repository grew to 133 missions and 528k tokens, most of it detail nobody
would open again. On 2026-09-08 it was cut to 18 missions and 324k tokens
in one day, by hand, at the cost of the Oracle's whole attention. This
standard makes that cut a rhythm instead of an event.

It binds the **register and narrative series**: `missions/`, `reports/`,
`debt/`, and `blueprints/`. It does not bind the axis (`canon/`,
`standards/`, `protocols/`): the axis deflates by consolidation
(`absorbs:`, `superseded`), which `ADR-030` governs. `decisions/` deflate
by becoming rules in a standard — a separate line of work — not by
roll-up, because an ADR is immutable and a summary of an ADR is not an ADR.

---

## 2. The norm

**DEF-001 — Git is the daily record.** No document MUST be written whose
only purpose is to say what happened today. The commit log is the daily
record; `git log --since` is the daily report. A document that exists in
order to be compressed later is inflation with a deadline.

**DEF-002 — Three levels, not more.** Records roll up into a **weekly**
report, weekly reports into a **quarterly** report, quarterly reports into
an **annual** report. There is no monthly level: a fourth rewriting adds
loss without adding a decision boundary. Each level is one document in
`reports/`, `subtype: rollup`, with a `period` field naming its span.

**DEF-003 — What survives a roll-up.** A line from a lower level MUST be
carried up if, and only if, it records one of:

- a rule that changed — a standard, protocol or canon amended, ratified or
  superseded;
- a debt that opened or closed;
- an artefact with an address — a URL, a released version, a merged PR in
  another repository.

Everything else falls at the first roll-up. This criterion is the same one
`RPT-017` applied without stating it. A line that meets none of the three
is work that had no consequence the corpus can point at; git remembers it.

**DEF-004 — The record dies when its line lands.** A mission that closes
(`done`, or `frozen` with its reason) gets its line in the current weekly
report and is deleted in the same PR, under `ADR-030`'s four tests. The
weekly report is the written resolution (test 3). A resolved debt does the
same. A blueprint that becomes a mission or is abandoned does the same.

**DEF-005 — The identifier resolves to the highest living level.** A deleted
record's identifier goes into the `absorbs:` of the report that carries its
line. When that report is itself rolled up and deleted, its `absorbs:` list
MUST move whole into the report above it, and every public redirect MUST be
repointed there in the same PR. A reader following `MIS-121` always lands
on the highest living document that holds its line, never on a 404 and
never on a dead intermediate.

**DEF-006 — Phase is an index, not a level.** A phase report (`RPT-017` for
the MVP, `RPT-018` for the alpha) is a pointer to the periods that compose
the phase and to what those periods concluded. It MUST NOT restate the
weekly lines; it cites them. Two documents that narrate the same closure
are the inflation this standard exists to prevent.

**DEF-007 — The roll-up is delegable; the criterion is not.** Any agent MAY
execute a roll-up following `PRO-017`. What counts as surviving is DEF-003
and is not the executing agent's judgement; a line the agent is unsure
about is carried up and marked for the Oracle, not dropped.

---

## 3. Conformance

| Check | Rule | Verified by |
|---|---|---|
| `DEF-001` | no document in `reports/` has `subtype: daily` or a one-day `period` | `node scripts/lint-frontmatter.mjs` (field vocabulary) · `[MANUAL]` for prose that is a daily in disguise |
| `DEF-002` | `period` on a rollup is a week, a quarter or a year | `[MANUAL]` — no guard reads `period` yet; declared as debt in `ADR-042` |
| `DEF-003` | every line carried up cites a rule, a debt or an address | `[MANUAL]` — a judgement about content; `PRO-017` makes the executor state which of the three |
| `DEF-004` | a closed mission or resolved debt is absent from its folder at the next roll-up | `node scripts/check-deletable.mjs --candidates` (lists closed records with no living citer) |
| `DEF-005` | every identifier in a deleted report's `absorbs:` appears in a living report's `absorbs:`; every redirect resolves | `node scripts/check-references.mjs` · `node scripts/check-url-lifecycle.mjs` |
| `DEF-006` | a phase report contains no line that a weekly report also contains | `[MANUAL]` |

---

## 4. What this standard does NOT do

It does not delete decisions, canon, standards or protocols. It does not
say what a weekly report looks like — `PRO-017` does. It does not decide
when a phase ends — the Oracle does. It does not retroactively roll up
what `RPT-017` already absorbed: that report is closed for growth and its
`absorbs:` is final; the first weekly report starts from `RPT-018`.

---

## 5. References

- `CAN-001` — the Dark Council, the Monday ritual this rhythm lands in.
- `ADR-030` — the four deletion tests every exit here still passes.
- `ADR-040` — `done` and `frozen` missions may be deleted.
- `ADR-042` — the decision that ratified this standard.
- `PRO-017` — the roll-up procedure.
- `RPT-017` · `RPT-018` — the two phase reports that precede this standard.
