---
title: "Governance — who may change what, and at what cost"
id: "STD-002"
uid: ""
type: documentation
status: active
version: "4.0.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-09-05T10:40:00+02:00"
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

Four rules settle every conflict. Nothing else grants authority.

**1. The git history outranks every document.** When a document and the history
disagree, the history is the record and the document is a claim.

**2. The documents outrank the code.** They are the source of truth; the code
implements them. When the code does something the documents do not say, the
code is wrong and gets corrected — not the document.

*Exception:* when a document describes what the code already does and describes
it wrong, that is a broken description, and the description is fixed. The test
is direction. A rule the code disobeys is a bug in the code. A description the
code contradicts is a bug in the description.

**3. The document that is harder to change wins.** Harder means more agreement
needed. In order: sealed, governed, closed, open.

*Why this and not importance:* importance is an argument. How much agreement a
change needs is already written down, per series, so anyone can check it without
asking. The canon outranks a standard because changing the canon needs an
Oracle's signature and changing a standard needs a pull request — not because
the canon matters more.

**4. At equal difficulty, the newer ruling wins** — and it must name what it
replaces. A ruling that silently contradicts an older one is not a ruling.

A document does not become authoritative by saying it is. Any claim of
precedence not resting on these four rules is void.

---

## Changing a standard

The question comes up more than any other, so it is answered here in full.

1. **Anyone may propose.** A standard changes by a pull request the Oracle
   approves, or by a decision record. There is no third route.
2. **The change lands in the standard itself.** A rule that lives in a decision,
   a mission, or a comment is not a rule yet — the standard is where a reader
   looks, so that is where the sentence goes.
3. **Retiring a rule needs an heir or an admission.** `superseded` means a
   replacement exists and is named. `withdrawn` means the rule is gone and
   nothing replaced it. A rule does not simply stop.
4. **The version moves.** New rule or changed obligation: minor. Removed or
   reversed obligation: major, which the Oracle authorises.
5. **A `draft` standard binds nobody.** It may still be the only written answer
   to its question, and agents may follow it — but until `status: active`, a
   breach is not a breach.

The same five steps govern a protocol. The difference is what the document
says, not how it changes.

---

## Roles

**Oracles** hold maximum authority. They approve structural change, seal the
canon, and are the only ones who promote an artifact to stable or break it.

**Archons** lead other agents and hold structural responsibility over the
system, not only over their own work. They authorise development iterations
below the stable line.

**Digital agents** write their own files and their assigned missions, and move
patch versions.

**Custodians** manage documents, indexes and the changelog. **Automation**
writes reports only.

Rank is defined by the canon of roles, not here. This document only says what
each rank may do to a document.

---

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
it, and no series overrides it.**

- **open** — normal pull request. Everything not listed below.
- **closed** — substance is not reopened; form may be corrected, and the commit
  says so. Done missions, reports.
- **governed** — a decision record, or a pull request an Oracle approves.
  Standards, protocols, decisions.
- **sealed** — an Oracle's signature and a recorded decision; the previous
  version stays reachable. Canon.

Two exceptions, both deliberate. Any agent may open a debt entry without
approval, because naming a gap is not a change to the system, and requiring
permission to admit a problem is how a corpus learns to stay quiet. And nothing
in `history/` is ever deleted, by anyone, at any state.

### What each series answers

Every folder answers one question. If your document does not answer that
folder's question, it belongs in another folder.

**canon/** — what is foundational. **standards/** — what an artifact must
comply with. **protocols/** — what an actor executes. **system/** — how it
works today. **agents/** — who acts, and with what authority. **guilds/** —
how actors group.

**missions/** — what work is promised or done. **decisions/** — why something
was chosen. **blueprints/** — what could exist. **reports/** — what was
observed, and when. **operations/** — what sustains the business. **debt/** —
what we know is missing. **history/** — what was tried and replaced.

The line between a standard and a protocol is the mechanism, not the topic: a
standard is complied with, a protocol is executed.

The folder is a filing decision; the `type:` field is a declared genre. They
must agree. When they disagree the document moves — you do not edit its genre
to match the shelf it landed on.

Citing a document does not change what you are. A standard that cites canon is
still a standard, and a mission that cites a standard does not become one.

---

### What is actually enforced

Nothing here is immutable, and this document does not claim otherwise.

The `protect-main` ruleset is active on the default branch: pull requests,
required status checks, linear history, no force-push, no deletion, zero bypass
actors. Verified against the ruleset API on 2026-09-03.

What the machine **cannot** enforce is *who approves*. Oracle, Archon and agent
are ranks the platform does not distinguish. Those rules are a convention held
by people. The branch protection is not.

---

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

We use **Semantic Versioning 2.0.0** ([semver.org](https://semver.org)). We did
not invent it and we do not redefine it here: `MAJOR.MINOR.PATCH`, where MAJOR
breaks compatibility, MINOR adds it, PATCH fixes without changing it. Read the
spec for what each number means. This section only says **who may move which
number.**

**Digital agents move the patch.** A fix that changes nothing anyone depends on.

**Archons move the minor.** A new capability, backwards compatible. This is the
ordinary development iteration.

**Oracles move the major**, and only Oracles. A break is a promise withdrawn,
and it costs a signature. Promotion to `1.0.0` is a major move: it declares the
artifact production-ready.

Every artifact starts at `0.1.0`, no exceptions.

---

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
