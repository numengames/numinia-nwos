---
title: "Governance — who may change what, and at what cost"
id: "STD-002"
uid: ""
type: documentation
status: active
version: "3.0.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-09-05T09:30:00+02:00"
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

Four rules settle every conflict in this corpus. Nothing else grants authority.

| | Rule |
|---|---|
| **1** | Git history outranks every document. When a document and the history disagree, the history is the record and the document is a claim. |
| **2** | The tree outranks the prose. When a document says the code does something and the code does not, the code wins and the document is corrected. |
| **3** | Between two documents, the one that costs more agreement to change wins: `sealed`, then `governed`, then `closed`, then `open`. |
| **4** | At equal cost, the later ruling wins — and a later ruling must name what it overrides. |

A claim of precedence written inside a document is void unless it rests on one
of these four. A document does not become authoritative by saying it is.

**Why cost of change and not importance.** A hierarchy by importance invites an
argument about what is important. Cost of change is already recorded — it is how
much agreement each series demands before it may be edited — and a reader can
verify it without asking anyone.

This is why the canon outranks a standard: not because it matters more, but
because changing it costs the Oracle's signature, and changing a standard costs
a pull request.

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

| Role | Who | What it may do |
|---|---|---|
| `oracle` | Pablo FM | maximum authority; approves structural change |
| `custodian` | Adonaz and equivalents | document management, index, changelog |
| `active-agent` | operational agents | writes its own files and its assigned missions |
| `design-agent` | agents in design phase | read only |
| `system` | automation | restricted write, reports only |

---

## Permissions by series

| Series | Create | Modify | Archive or delete | Approval |
|---|---|---|---|---|
| `canon/` | oracle | oracle | oracle | oracle — `sealed` |
| `standards/` | oracle + custodian | oracle + custodian | mark `superseded` or `withdrawn` | oracle — `governed` |
| `protocols/` | oracle + custodian | new version = new file | mark `superseded` | oracle |
| `decisions/` | oracle + custodian | only add `superseded_by` | **never delete** | oracle |
| `system/` | oracle + agents | oracle + agents | oracle | oracle |
| `agents/{own}/` | oracle | active-agent (own) + oracle | oracle | oracle |
| `agents/{other}/` | oracle | oracle | oracle | oracle |
| `guilds/` | oracle | oracle | oracle | oracle |
| `operations/` | oracle + custodian | oracle + custodian | oracle | oracle |
| `missions/` — `todo` | oracle + custodian | oracle | oracle | oracle |
| `missions/` — `in-progress` · `in-review` | active-agent + oracle | only the executor | Oracle sets `done` | oracle |
| `missions/` — `done` | automatic on close | substance: nobody; form: with the commit saying so | oracle | — |
| `blueprints/` | oracle + agents | oracle + agents | oracle | oracle |
| `reports/` — `subtype: daily` | active-agent + system | same day only | consumer tests | auto-merge |
| `reports/` — `audit` · `analysis` · `proposal` | author + oracle | closed on publication, form only | consumer tests | oracle |
| `debt/` | any agent | any agent | mark `closed`, **never delete** | — |
| `history/` | on retirement only | nobody | **never** | oracle |
| `templates/` | oracle + custodian | oracle + custodian | oracle | oracle |

An agent opens a debt entry without asking: naming a gap is not a change to the
system, and requiring approval to admit a problem is how a corpus learns to
stay quiet.

### What each series answers

The permission table says who. This says what belongs there — the question a
reader is holding when they open the folder.

| Series | The question it answers | What it is not |
|---|---|---|
| `canon/` | What is foundational? | Operating policy or a procedure |
| `standards/` | What must an artifact comply with? | A description of how things work |
| `protocols/` | What does an actor execute? | A rule an artifact satisfies |
| `system/` | How does it work today? | A norm or a future design |
| `agents/` | Who acts, with what authority? | A user account |
| `guilds/` | How do actors group? | The definition of one agent |
| `missions/` | What work is promised or done? | A general policy |
| `decisions/` | Why was this chosen? | A restatement of a standard |
| `blueprints/` | What could exist? | A record of what happened |
| `reports/` | What was observed, and when? | A plan or a list of closed missions |
| `operations/` | What sustains the business? | Canon |
| `debt/` | What do we know is missing? | A substitute for fixing it |
| `history/` | What was tried and replaced? | A live design |

The `standards` ⟷ `protocols` boundary is the mechanism, not the topic: a
standard is complied with, a protocol is executed.

**The folder is a filing decision; `type:` is a declared genre.** They are
independent, and they must agree. When they disagree the document moves — its
declared genre is not edited to match the shelf it landed on.

Citing a document does not change what you are. A standard that cites canon is
still a standard, and a mission that cites a standard does not become one.

---

### Change thresholds

The table above says **who**. The glossary says **how much agreement**, and the
two are read together.

| Threshold | What it takes | Applies to |
|---|---|---|
| `sealed` | the Oracle's signature and a recorded decision; the previous version stays reachable | `canon/` |
| `governed` | a decision record, or a pull request the Oracle approves | `standards/` · `protocols/` · `decisions/` |
| `closed` | substance is not reopened; form may be corrected and the commit must say so | `missions/` done · `reports/` |
| `open` | normal pull request | everything else |

**Nothing here is immutable, and this document does not claim otherwise.**

**What is mechanically enforced, and what is not.** The `protect-main` ruleset
is active on the default branch — pull requests, required status checks, linear
history, no force-push, no deletion, **zero bypass actors**, verified against
the ruleset API on 2026-09-03. What the permission table **cannot** enforce is
*who approves*: the rows name authorities the platform does not distinguish.
Those rows are a convention held by people. The branch is not.

---

## The rules

| Rule | Description |
|---|---|
| G-01 | When a mission contradicts the canon, the mission is wrong. Escalate. |
| G-02 | One active mission has exactly one executor. Collaboration is declared. |
| G-03 | Only the executor edits an active mission. Others read. |
| G-04 | Agents never modify their own `SOUL.md` or `OPERATOR.md`. |
| G-05 | No agent deletes documents from `missions/` done or `decisions/`. |
| G-06 | Escalation runs agent → Oracle, per the escalation protocol. |
| G-07 | When in doubt about sensitivity, do not commit. Escalate first. |
| G-08 | A mission sitting in `todo` more than 90 days without activity is stale. |
| G-09 | Any change to `canon/` requires the canon-change label and explicit Oracle approval. |
| G-10 | The Oracle has 48 hours to answer a mission that requires approval. |
| G-11 | Canon propagates by pin and digest, never by copy. The emitter publishes, versions, signs, generates and notifies; the consumer pins, verifies and reports upstream. |
| G-12 | A derived NWOS repository is sovereign. Updates are offered, never imposed; the emitter's authority ends at notification. |

### Canon emission — the canon is not copied, it is pinned

The repository that governs a law writes it, versions it, generates its derived
artifacts and publishes them. Consumers keep no copy: they pin a version and a
digest, verify drift in their own pipeline, and report upstream instead of
patching. **A local copy is a fork waiting to happen.**

Per governed artifact, the emitter **publishes** at a stable public address for
the master and every derived artifact; **versions** it in the artifact itself
and in the path, so a new version never overwrites an old address; **signs** it
with a manifest carrying a digest per file; **generates** derived artifacts from
the master by script, never by hand; **notifies** known consumers of every new
version with its digest; and keeps an **append-only** history inside the master,
never reusing a retired number.

### Sovereignty of derived repositories

**Once an organization has created its own NWOS repository, it is sovereign.**
We publish; they adopt. Nothing written here becomes law inside their repository
by inheritance, fork relationship or template lineage.

| Not this | This |
|---|---|
| "it is a fork of the mould, so it receives our document" | the mould is **versioned**; the organization **pins a version** |
| a practice written upstream is mandatory downstream | a new version is **published and announced**; adopting it is their decision |
| "consumer repositories must never drift" | drift is legitimate; drifting **silently while claiming to be current** is not |
| sync imposed | update **offered**, with a changelog of what changes and why |

The emitter's duties hold unchanged. What sovereignty adds is the limit of the
emitter's authority: **its duty ends at notification.** A sovereign organization
may stay on an old version forever, and that is not debt on their side — it is a
fact our tooling must be able to read.

**Watch for this error class:** any artifact that assumes authority over a
repository it does not own — a requirement aimed downstream, a mandatory sync, a
guard that fails someone else's build for not being current. Register it as a
contradiction before acting on it.

---

## Relation vocabulary

Declare a relation when it matters for retrieval, audit, or a future change.

| Relation | Meaning |
|---|---|
| `related` | Relevant to one another, no stronger direction known |
| `supersedes` / `superseded_by` | A later record replaces an earlier one, which stays reachable |
| `absorbs` | A later record carries the earlier reasoning into itself; the identifier keeps resolving |
| `ratified_by` | An authority promoted or confirmed the record |
| `parent_mission` | A bounded child of a larger mission |
| `former_id` | The identifier this record carried before a governed move |

Do not use `related` when a stronger relation is known, and do not infer a
relation from a shared folder, author, or subject.

---

## Versioning authority

Every artifact follows a two-stage lifecycle. Semantic versioning itself is
defined in the glossary; this table says **who may move a version**.

| Transition | Who authorizes |
|---|---|
| new artifact → v0.1.0 | digital agent — every artifact starts at v0.1.0, no exceptions |
| v0.1.0 → v0.2.0, development iteration | digital agent |
| **v0.X.0 → v1.0.0, stable promotion** | **Oracle only** — signals production-ready |
| v1.0.0 → v1.1.0, stable iteration | digital agent |
| **v1.X.0 → v2.0.0, major breaking** | **Oracle only** |

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

| ID | Name | Why cited |
|---|---|---|
| `STD-001` | The glossary | Defines the change thresholds this document's permission table is read against, and semantic versioning. |
| `PRO-005` | The escalation protocol | Carries the escalation path that rule G-06 names. |
| `PRO-008` | The decision protocol | Carries the request format the approval scale is scored in. |
| `SYS-004` | Document relations | Absorbed into this document. Its genre map and relation vocabulary are the two sections above; the identifier resolves here. |

---
