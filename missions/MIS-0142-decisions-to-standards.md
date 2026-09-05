---
id: "MIS-142"
uid:
title: "Recalify decisions/ as standards: a template for the series, and the archive's own standard"
status: in-progress
priority: high
effort: L
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
started: "2026-09-03T06:27:46Z"
completed: null

type: mission
version: "0.2.0"
created: "2026-09-03T06:27:46Z"
updated: "2026-09-03T06:27:46Z"
author: "ursa"
owner: "oracle"
tags: [decisions, standards, template, adr, refactor]
license: "CC0-1.0"
---

# MIS-142 — Recalify `decisions/` as standards

> **Summary:** The nine documents in `decisions/` are policies wearing the
> ADR label. Give the standards series a template it never had, then move
> what is policy to `standards/`, one document at a time, with the Oracle.
> **Epistemic:** Why an ADR is not a policy, and which of the nine is which.
> **Pragmatic:** The template every new standard is copied from, and the
> running record of each recalification.
> **Audience:** Agents · Oracles

---

## Context

The industry definition of an ADR (Nygard 2011; `adr.github.io`; AWS and
Microsoft prescriptive guidance) is narrow on four points: one decision per
record, architecturally significant, context/decision/consequences, and
**immutable once accepted** — a superseded decision is replaced by a new
record, never edited.

This corpus fails the fourth point by design, not by accident:
`ADR-001` is at `v2.0.0`, `ADR-030` at `v3.0.0`, and the series carries an
`absorbs:` field for merging records. A versioned, mergeable record is not
a decision log — it is a living policy.

Oracle ruling, 2026-09-02/03:

1. The nine documents are **policies**, not decisions. They state what must
   be true; they have no actor and no steps.
2. Policy lives in `standards/` (a rule that can be checked and failed),
   not in `protocols/` (a procedure with an actor and steps). The existing
   split already holds without exception: seven verbs in `protocols/`, five
   rules in `standards/`.
3. The ADR series **resets to zero**. Nothing currently in `decisions/` is a
   fixed decision, so nothing carries a stable version. `decisions/` fills
   again when the Oracle signs an actual change to a policy — and from
   `1.0.0` onward, the immutability rule applies.
4. A document must communicate **one thing**, which may be a grouping of
   concepts if the grouping is a single conceptual distinction — not a
   shared date, mission, or amendment target.
5. **No cross-references in prose.** A document that points into the live
   body of another document rots when that document is rewritten. Measured
   here: `ADR-035` cites `S-005 §2` eight times for a genre→folder→ID table
   that has only ever existed in `PRO-010:62`; `ADR-023` and `STD-001` each
   delegate the four canonical terms to the other and neither enumerates
   them. Structural relations in frontmatter (`absorbs`, `supersedes`,
   `superseded_by`) are exempt: `check-references.mjs` verifies them
   mechanically, and without `absorbs` every historical citation of a merged
   record stops resolving.

---

## Scope

- `templates/` — new folder for apparatus. Templates are scaffolding, not
  corpus: they are not published and carry no series identifier.
- `templates/STD-TEMPLATE.md` — the standard series template. Does not
  exist today; the five current `STD-` documents share no section
  structure at all.
- `standards/STD-004-header-standard.md` — one normative section making the
  template mandatory for new `STD-` documents.
- `decisions/` — the nine records, one at a time, each with the Oracle.
- `standards/` — receives whatever is policy.

> **Scope and Acceptance criteria are written when the mission OPENS and are
> not edited afterwards.** What happened goes in `Closure`.

## Out of scope

Deliberately excluded, recorded so they are not lost:

- **`suspended` status for standards.** The Oracle must be able to turn a
  standard off without retiring it, and turn it back on. Today the lifecycle
  is `draft → active → closed` and `closed` reads as dead. Needs a new value
  **and** the guards that enforce a suspended standard must stop failing the
  build — that second half is real work and is not costed here.
- **Migrating existing templates** (`missions/TEMPLATE*.md`,
  `agents/_template/`) into `templates/`.
- **Document size.** `STD-001` (1,574 lines) and the Design System master
  (1,524) already violate "one thing". Separate mission.
- **The ADR definition and the policy⇄decision cycle** as written doctrine:
  belongs in the governance policy, to be added when that document is
  reached.

---

## Acceptance criteria

```
✓  ls templates/STD-TEMPLATE.md succeeds                    (today: no such file)
✓  node scripts/lint-naming.mjs exits 0                     (today: 0 — must stay)
✓  node scripts/lint-frontmatter.mjs exits 0                (today: 0 — must stay)
✓  node scripts/check-references.mjs reports 0 NEW breaks   (today: 0 — must stay)
✓  grep -c 'STD-TEMPLATE' standards/STD-004-header-standard.md > 0   (today: 0)
```

- [ ] `templates/` is registered as apparatus in `scripts/lib/rules.json`,
      so `lint-naming` does not hold it to a series filename scheme
- [ ] `STD-TEMPLATE.md` carries the section skeleton, the RFC 2119
      convention, and a conformance section that is mandatory
- [ ] `STD-004` names the template as required for new standards
- [ ] Every recalified document is signed by the Oracle before it lands

---

## Ledger

| # | Document | Verdict | Lands as | State |
|---|---|---|---|---|
| 1 | — | template for the series | `templates/STD-TEMPLATE.md` + `STD-004` §10 | **done** (`53b6cb5`) |
| 2 | `ADR-001` | policy — substrate, format, data sovereignty | `STD-006` (draft) | **done** |
| 3 | `ADR-004` | pending review | — | pending |
| 4 | `ADR-005` | pending review | — | pending |
| 5 | `ADR-023` | pending review | — | pending |
| 6 | `ADR-026` | pending review | — | pending |
| 7 | `ADR-027` | pending review | — | pending |
| 8 | `ADR-030` | pending review | — | pending |
| 9 | `ADR-035` | pending review | — | pending |
| 10 | `ADR-036` | pending review | — | pending |

---

## Findings recorded before the work starts

These are stated here because they are evidence, and a later reader should
not have to rediscover them:

- **`ADR-001`'s hosting clause is false.** It states the corpus and its
  published surface run on infrastructure the project controls, and cites
  Cloudflare Workers as proof. `DEC-001`, the record it absorbed, was marked
  `superseded` on 2026-08-30 with the opposite finding: *"the NWOS web
  deploys on Cloudflare Workers — a SaaS."* The clause revives a rule the
  corpus had already retired, using the counter-example that retired it.
- **`ADR-001`'s authority clause is already in `STD-002`** — G-11 (emitter
  duties), G-12 (sovereignty of derived repositories) and "Versioning
  authority" cover it. It is duplication, not content, and does not migrate.
- **`ADR-004` declares `status: active` and closes with "Oracle: pending".**
  Obsolete text: the Oracle signs everything in this repository. Corrected
  when that document is reached.
- **`ADR-035` was patched by `sed`.** It contains the literal string
  ``​`ADR-032` (now in `ADR-030`)`` eight times, mid-sentence.

---

## Closure

*(Fill when the mission closes. Not before, and not with intentions.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** · **by:**

---

## Version history

- v0.1.0 (2026-09-03) — Mission opened. Scope, criteria and pre-work
  findings recorded.
- v0.2.0 (2026-09-03) — `ADR-001` recalified: `STD-006` drafted, the record
  superseded in place with its withdrawn clauses documented.

