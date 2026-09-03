---
id: "STD-009"
uid:
title: "The rules of the corpus, and which one wins"
type: documentation
subtype: standard
status: draft
version: "0.1.0"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-03T22:10:00Z"
author: "ursa"
owner: "oracle"
license: "CC0-1.0"
tags: [standards, governance, precedence, rules, core]
---

# STD-009 — The rules of the corpus, and which one wins

> **Summary:** Sixty-two rules, one line each, every one of them able to pass
> or fail; and, first, the rule that settles what happens when two of them
> disagree.
> **Epistemic:** Why a corpus without a precedence rule grows contradictions
> faster than it grows documents, and why the count of rules matters less than
> the count of places they live in.
> **Pragmatic:** The whole normative layer in one document an agent can read
> before starting work.
> **Audience:** Agents · Oracles

---

## 1. Purpose and scope

This standard states the rules that bind every document in the corpus, and the
order in which they win.

It exists because the corpus said three hundred and twenty-eight obligating
things across nine documents, and no document said which one wins when two of
them disagree. In that silence, documents began granting themselves authority
over other documents, one argument at a time. Eighteen such claims were written
before anyone noticed, and forty-six pairs of statements ended up unable to
both hold.

**What this covers:** what a document must be, how it is named, versioned,
changed, archived and cited; how work is registered; how a rule becomes
enforceable; and who may decide any of it.

**What this does not cover:** how people are hired, welcomed, trained or paid;
what the world of Numinia contains; how a product looks. Those are governed
elsewhere, and a duty aimed at a person's calendar is not a rule of this
corpus.

**How to read a rule.** Every rule below is one sentence that a reader can
answer yes or no about. If a sentence here cannot be answered yes or no about
a given document, commit or action, that sentence is defective and the defect
is reported, not interpreted.

---

## 2. Precedence — the rule that settles the others

Everything else in this corpus is a claim. These five decide whose claim wins.

| ID | Rule | How it is checked |
|---|---|---|
| **CORE-01** | Git history outranks every document; when a document and the history disagree, the history is the record and the document is the claim. | Compare the assertion against `git log`. |
| **CORE-02** | The tree outranks the prose; when a document says the code does something and the code does not, the code wins and the document is corrected. | Grep for the symbol, file or step the prose names. |
| **CORE-03** | Between two documents, the one that costs more agreement to change wins: sealed, then governed, then closed, then open. | Read the threshold of each document's series. |
| **CORE-04** | At equal cost, the later ruling wins, and a later ruling names what it overrides. | Compare dates; check the ruling names its predecessor. |
| **CORE-05** | No document holds authority over another except by these four rules, and a claim of precedence written inside a document is void unless it rests on one of them. | Search for precedence claims; each cites its ground or fails. |

**Why cost of change and not rank.** A hierarchy by importance invites argument
about what is important. A hierarchy by cost of change is already recorded: it
is how much agreement each series demands before it may be edited. It is also
the order a reader can verify without asking anyone.

**Why the history wins.** What a document says can always be changed by
agreement. Who wrote a commit, and when, cannot be changed at any price worth
paying. The archive's strongest guarantee is not the one it declares — it is
the one it inherits.

---

## 3. Authority

| ID | Rule | How it is checked |
|---|---|---|
| **CORE-06** | Canon changes only with the Oracle's signature and a decision record giving the reason. | The decision record exists and is cited. |
| **CORE-07** | Standards, protocols and decisions change by a decision record, or by a pull request the Oracle approves. | Approval or decision record present. |
| **CORE-08** | A finished mission or a published report keeps its claims; its form may be corrected and the commit says so. | Diff touches form only, or the commit declares otherwise. |
| **CORE-09** | Everything else changes by an ordinary pull request. | A pull request exists. |
| **CORE-10** | Facing an irreversible act in doubt, an agent does not act and escalates instead. | No irreversible commit exists without a prior escalation. |

---

## 4. Identity and names

| ID | Rule | How it is checked |
|---|---|---|
| **CORE-11** | Every document carries the identifier of its series, and that identifier never changes. | The identifier matches the series pattern. |
| **CORE-12** | A filename carries no state; state lives in a declared field. | No check reads state from a name. |
| **CORE-13** | A filename carries no version; the version lives in a declared field. | No operational filename contains a version string. |
| **CORE-14** | An identifier once used is never reused, not even after the document is deleted. | The identifier appears at most once across history. |
| **CORE-15** | When two agents claim one identifier, whoever committed first keeps it and the second renumbers. | Commit order decides; no duplicate survives. |

---

## 5. The header

| ID | Rule | How it is checked |
|---|---|---|
| **CORE-16** | Every document opens with frontmatter fenced by three dashes on their own lines. | The delimiter check passes. |
| **CORE-17** | Frontmatter parses as valid YAML. | The YAML check passes. |
| **CORE-18** | A new frontmatter field requires both a line in the header standard's registry and a decision record. | Registry line and decision record both exist. |
| **CORE-19** | Every document declares its licence. | The licence check passes. |
| **CORE-20** | A field whose value is unknown is left empty, never filled with a guess. | No placeholder or invented value appears. |

---

## 6. Versions

| ID | Rule | How it is checked |
|---|---|---|
| **CORE-21** | Versions are semantic. | The version parses as three numbers. |
| **CORE-22** | Changing what a document requires raises at least the middle number. | Compare the diff against the version bump. |
| **CORE-23** | Reversing what a document requires raises the first number. | A reversal carries a major bump. |
| **CORE-24** | The version in the header and the version at the top of the document's own change log agree. | The two strings match. |

---

## 7. Git

| ID | Rule | How it is checked |
|---|---|---|
| **CORE-25** | Work reaches the main branch through a pull request, never by direct push. | Branch protection rejects the alternative. |
| **CORE-26** | A commit's first line says what changed and why, within seventy-two characters. | Read the first line; measure it. |
| **CORE-27** | A generated file is regenerated, never edited by hand. | The generator reproduces the file byte for byte. |
| **CORE-28** | Telemetry is regenerated after the commit it measures, never before. | The telemetry commit follows the commit it describes. |
| **CORE-29** | A conflict inside a generated file is resolved by regenerating it, not by choosing sides. | The resolved file matches fresh output. |
| **CORE-30** | History on a shared branch is never rewritten. | No force-push to a shared branch appears. |

---

## 8. Guards

| ID | Rule | How it is checked |
|---|---|---|
| **CORE-31** | A rule that does not break the build does not exist for an agent. | Every rule here names its check or declares it manual. |
| **CORE-32** | A guard is wired into the pipeline in the same change that writes it. | The workflow file runs every guard in the scripts directory. |
| **CORE-33** | A guard register is read from the workflow file, never remembered. | The register matches the workflow file exactly. |
| **CORE-34** | A baseline records damage that predates its rule and never absorbs damage the current change caused. | New entries in a baseline trace to older commits. |
| **CORE-35** | A green pipeline is not a clean tree, and a change declares what it left behind. | The change names its known residue. |

---

## 9. Work

| ID | Rule | How it is checked |
|---|---|---|
| **CORE-36** | Work is registered before it is executed. | The mission file predates the first commit of that work. |
| **CORE-37** | A mission states what would count as done before work starts. | Acceptance criteria present at creation. |
| **CORE-38** | A parent mission is not finished while any of its children is open. | No parent is done with an open child. |
| **CORE-39** | A paused mission declares why it is paused. | Every paused mission carries a reason. |
| **CORE-40** | A finished mission is not rewritten to match later doctrine. | Diffs on finished missions touch form only. |
| **CORE-41** | An agent reads the whole mission before acting, never the title alone. | Deliverable matches the full brief, not the heading. |

---

## 10. Sessions

| ID | Rule | How it is checked |
|---|---|---|
| **CORE-42** | A session begins by syncing the corpus, before any read or write. | The sync is the session's first recorded action. |
| **CORE-43** | A session ends with its record committed. | A closing commit exists. |
| **CORE-44** | An agent works from the corpus in the tree, never from a copy pasted elsewhere. | Claims resolve against the working tree. |

---

## 11. Archiving

| ID | Rule | How it is checked |
|---|---|---|
| **CORE-45** | A superseded document names its heir. | The heir is declared and resolves. |
| **CORE-46** | A retired document stays reachable at the address where it was published. | The address returns the document or redirects to a real one. |
| **CORE-47** | A redirect points at the destination that replaced the document, never at an index. | The target is a document, not a listing. |
| **CORE-48** | Nothing is deleted while something still cites it. | No citation resolves to a missing file. |
| **CORE-49** | A document is copied nowhere; it is linked, and a derived copy declares its master. | No second copy exists without a declared master. |

---

## 12. Citation

| ID | Rule | How it is checked |
|---|---|---|
| **CORE-50** | A citation names the document, not one of its section numbers. | No section-number pointer appears in prose. |
| **CORE-51** | Structural references live in one list at the end of the document. | References are gathered, not scattered. |
| **CORE-52** | A claim about the codebase names the file that proves it, and that file exists. | Grep the named file and symbol. |
| **CORE-53** | A broken link inside a closed document is a photograph, not a defect. | Closed documents are exempt from link repair. |

---

## 13. Secrets

| ID | Rule | How it is checked |
|---|---|---|
| **CORE-54** | No credential, token or key is ever written into the corpus. | The secret scan passes. |
| **CORE-55** | An exposed credential is rotated before the exposure is written down. | Rotation timestamp precedes the report. |
| **CORE-56** | A live finding is reported out of band, not committed to this repository. | No live finding appears in a commit. |
| **CORE-57** | An audit declares how many things it examined out of how many exist. | The denominator is stated. |

---

## 14. Licences

| ID | Rule | How it is checked |
|---|---|---|
| **CORE-58** | Every directory declares the licence of what it holds. | The manifest covers every directory. |
| **CORE-59** | The licence in a document and the licence in the manifest agree. | The two strings match. |
| **CORE-60** | A permanent publication is gated on a review of ownership. | The review is recorded before publication. |

---

## 15. Writing

| ID | Rule | How it is checked |
|---|---|---|
| **CORE-61** | A rule is one sentence that can be answered yes or no. | Read it; try to answer it. |
| **CORE-62** | Measurements and counts live in reports, not in the documents that bind. | No normative document carries a figure that ages. |

---

## 16. What this standard does not yet enforce

Stating this is a requirement of the corpus, not a courtesy.

Of the sixty-two rules above, the ones a pipeline can decide today are those
about delimiters, YAML, licences, identifiers, citations, dead addresses and
regenerated files. The rest — authority, precedence, registration before
execution, rotation before disclosure — depend on agreement and on a reader.
They are written here so that a breach can be named, which is the first
condition of ever enforcing it.

Five conflicts between the governance document and the protocols that govern
the same acts are unresolved. They are not decided here because deciding them
is not a measurement, and the corpus reserves that decision to the Oracle.

---

## 17. Version log

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-09-03 | First draft. Sixty-two rules extracted from the existing normative layer, plus the precedence article, which is new. |

---

## 18. References

- `STD-001` — the glossary, source of the change thresholds and of the rule that history outranks the document
- `STD-002` — governance, source of the authority rules
- `STD-004` — the header standard, holder of the frontmatter registry
- `STD-005` — engineering standards, source of most rules on git and guards
- `STD-006` — archive substance
- `STD-007` — plain writing, source of the citation rules
- `PRO-001` — the agent session
- `PRO-003` — the mission cycle
- `PRO-005` — escalation
- `PRO-008` — decisions
- `PRO-010` — archiving
- `PRO-011` — the security audit
- `PRO-013` — handing a guard to the pipeline
- `CAN-005` — licensing
- `MIS-146` — the mission under which this standard was written
