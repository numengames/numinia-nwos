---
title: "Governance — who may change what, and at what cost"
id: "STD-002"
uid: ""
type: documentation
status: active
version: "6.0.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-09-05T14:10:00+02:00"
author: "nimrod"
owner: "oracle"
tags: [governance, roles, permissions, thresholds, versioning, precedence, relations]
absorbs: ["SYS-004"]
license: "CC0-1.0"
---

# Governance — who may change what, and at what cost

> **Summary:** Which document wins, who may change what, at what cost, and who
> must approve it.
> **Epistemic:** Roles, permissions per series, change thresholds, versioning
> authority, approval scale.
> **Pragmatic:** Before creating, modifying or deleting any document, find your
> row here.
> **Audience:** Agents · Oracles

---

## Which document wins

Settled by `CORE-01` through `CORE-05`, in the core rules standard. Five rules,
in this order: the git history outranks every document; the documents outrank
the code; between two documents the one that costs more agreement to change
wins; at equal cost the later ruling wins and must name what it overrides; and
no document holds authority except by those four.

They lived here until 2026-09-05. They were also written, in different words,
in the core rules standard — the same law in two `governed` documents, neither
naming the other. This document keeps the thresholds that make rule three
measurable, in §Permissions by series, and states them once.

---

## Changing a standard

Who may approve is `CORE-07`; where the rule lands is `CORE-63`; retiring a
rule is `CORE-45`; which number moves is `CORE-22` and `CORE-23`; and a `draft`
binding nobody is stated with the precedence rules. All in the core rules
standard.

What this document adds: the same five steps govern a protocol. The difference
is what the document says, not how it changes.

---

## Roles

What each rank may do to a document is `CORE-65`. Who holds which rank is the
canon of roles, `CAN-004`. Neither is restated here.


## What a document can be

A normative document — canon, standard or protocol — has four states:

- **draft** — written, not yet binding on anyone
- **active** — in force; you must comply with it
- **superseded** — replaced by a newer document, which it names
- **withdrawn** — retired without replacement; the rule is gone

Everything else uses three: **draft**, **active**, **closed** — closed meaning
finished, kept for the record, not reopened.

A rule that binds must be switchable off without lying about why it stopped
binding. That is what `superseded` and `withdrawn` are for.

---

## Permissions by series

One rule covers every series: **a document's change state says who may touch
it, and no series overrides it.** The four states — `open`, `closed`,
`governed`, `sealed` — and what each costs are defined in the glossary,
`STD-001` §The series. Their order of precedence is `CORE-03`.

Two exceptions, both deliberate. Any agent may open a debt entry without
approval, because naming a gap is not a change to the system, and requiring
permission to admit a problem is how a corpus learns to stay quiet. And nothing
in `history/` is ever deleted, by anyone, at any state.

### What each series answers

Every folder answers one question, and if a document does not answer that
folder's question it belongs in another folder. Which question each folder
answers is defined in the glossary, `STD-001` §The series, with the **IS / IS
NOT** test for each — including the `standards` ⟷ `protocols` boundary, which
is the mechanism and not the topic.


## The rules

**On authority.** When a mission contradicts the canon, the mission is wrong;
escalate (G-01). Any change to `canon/` needs the canon-change label and an
Oracle's explicit approval (G-09). Escalation runs from agent to Oracle, per the
escalation protocol (G-06), and an Oracle has 48 hours to answer a mission
waiting on approval (G-10).

**On who writes what.** An active mission has exactly one executor, and only
that executor edits it; collaboration is declared (G-02, G-03). Agents never
modify their own `SOUL.md` or `OPERATOR.md` (G-04). Nobody deletes a done
mission or a decision (G-05).

**On doubt.** When unsure whether something is sensitive, do not commit —
escalate first (G-07). A mission sitting in `todo` for more than 90 days without
activity is stale (G-08).

**On distribution.** The canon propagates by pin and digest, never by copy
(G-11). A derived NWOS repository is sovereign: updates are offered, never
imposed (G-12).

### Canon emission and sovereignty — not yet in force

**Status: green.** This describes where we are going, not where we are. Three
consumer repositories still keep local copies of the design kit; `MIS-102` is
the mission that ends that, and it has not started. Treat the rest of this
section as a target, not as a rule you can be measured against today.

**Emission.** The repository that governs a law writes it, versions it,
generates its derived artifacts and publishes them. Consumers keep no copy:
they pin a version and a digest, check for drift in their own pipeline, and
report upstream instead of patching. A local copy is a fork waiting to happen.

The emitter publishes at a stable public address, versions the artifact in the
path so a new version never overwrites an old address, ships a manifest with a
digest per file, generates derived artifacts by script rather than by hand, and
notifies known consumers of each new version.

**Sovereignty.** Once an organization has created its own NWOS repository, it
is sovereign. We publish; they adopt. Nothing written here becomes law inside
their repository by inheritance, fork relationship or template lineage. They
pin a version; a new one is announced, and adopting it is their decision.
Staying on an old version forever is legitimate, and is not debt on their side.
Drifting silently while claiming to be current is the thing that is not.

The emitter's authority ends at notification. Watch for any artifact that
assumes authority over a repository it does not own — a requirement aimed
downstream, a mandatory sync, a guard that fails someone else's build for not
being current.

---

## Relation vocabulary

Declare a relation when it matters for retrieval, audit, or a future change.

**related** — relevant to one another, no stronger direction known.
**supersedes** / **superseded_by** — a later record replaces an earlier one,
which stays reachable. **absorbs** — a later record carries the earlier
reasoning into itself, and the old identifier keeps resolving. **ratified_by** —
an authority promoted or confirmed the record. **parent_mission** — a bounded
child of a larger mission. **former_id** — the identifier this record carried
before a governed move.

Do not use `related` when a stronger relation is known, and do not infer a
relation from a shared folder, author, or subject.

---

## Versioning authority

Which number moves is `CORE-22` and `CORE-23`. Who may move it is `CORE-64`: a
digital agent moves the patch, an Archon moves the minor, an Oracle moves the
major. All in the core rules standard, which also records that we adopt
Semantic Versioning 2.0.0 as published.

## Human approval scale

This is the definition of `human_approval_score`: a **gate**, scored before
acting — how much human approval an action needs.

| Score | Category | Description | Response time |
|---|---|---|---|
| 1–2 | routine | no risk, instantly reversible | none required |
| 3–4 | operational | limited impact, reversible | 24h |
| 5–6 | tactical | moderate impact, partially reversible | 24h |
| 7–8 | strategic | affects multiple systems or agents | 12h |
| 9 | systemic | modifies canon, operator, security | immediate |
| 10 | foundational | irreversible, reputation, real money | immediate, and a meeting |

---

## References

- [`STD-001` — The glossary](STD-001-glossary.md). Defines the change
  thresholds this document is read against.
- [`STD-009` — Core rules](STD-009-core-rules.md). Holds the precedence rules
  and the rules for changing a document. This document points at them by
  identifier and does not restate them.
- [`PRO-005` — Escalation](../protocols/PRO-005-escalation.md). The path rule
  G-06 names.
- [`PRO-008` — Decision](../protocols/PRO-008-decision.md). The request format
  the approval scale is scored in.
- [`MIS-0102` — Consumers pin the emitted kit](../missions/MIS-0102-consumers-pin-the-emitted-kit.md).
  The mission that puts canon emission into force. Still `todo`.
- [Semantic Versioning 2.0.0](https://semver.org). Adopted as-is, not
  redefined here.
- `SYS-004` — Document relations. Absorbed into this document; the identifier
  resolves here.

---

---

## Amendment, 2026-09-05

Two sections were emptied on the day this document reached v4.0.0.

§Which document wins stated the same law as `CORE-01`..`CORE-05`, and
§Changing a standard restated `CORE-07`, `CORE-22`, `CORE-23` and `CORE-45`.
The law was written twice, in two `governed` documents, and neither named the
other. Both sections are now pointers.

Four formulations were better here than there, and moved rather than being
deleted: the worked example of cost (`CORE-03`), "a document does not become
authoritative by saying it is" (`CORE-05`), the `superseded`/`withdrawn`
distinction (`CORE-45`), and "a `draft` binds nobody". One had no rule at all
and became `CORE-63`: the change lands in the document it governs.

`CORE-02` was corrected in the move. It said the code outranks the documents;
the Oracle settled on 2026-09-05 that the documents are the source of truth and
the code implements them, and this document already said so. The core rules
standard did not.

This is a removal of obligations from this document, which `CORE-23` makes a
major. The obligations are not gone — they are stated once, where they can be
cited by number.

## Amendment, 2026-09-05 (second)

Four more sections were emptied, in the same operation as the first two.

§Versioning authority restated Semantic Versioning and named who moves which
number. The adoption and the numbers are `CORE-21`, `CORE-22` and `CORE-23`;
who may move them had no rule anywhere and became `CORE-64`.

§Permissions by series listed the four change thresholds. The glossary defines
them in more detail — including the reason they are thresholds and not
properties of a file — so the definition stays there and this document points
at it. The two exceptions are not stated anywhere else and stay here: a debt
entry needs no approval, and nothing in `history/` is deleted.

§What each series answers listed twelve folders in two lines. The glossary
gives each one an **IS / IS NOT** test, which is the part that settles an
argument.

§Roles said what each rank may do to a document. That became `CORE-65`. Who
holds a rank was already the canon's, and this document said so.

Three thresholds tables existed in this corpus — here, in the glossary, and in
the core rules. Two are now pointers.
