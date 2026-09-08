---
id: "STD-009"
uid:
title: "The rules of the corpus, and which one wins"
type: documentation
subtype: standard
status: draft
version: "0.13.0"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-08T19:30:00+02:00"
author: "ursa"
owner: "oracle"
territory: "CAO"
license: "CC0-1.0"
tags: [standards, governance, precedence, rules, core]
absorbs: ["STD-002"]
---

# STD-009 — The rules of the corpus, and which one wins

> **Summary:** The rules that bind every document of the corpus, one line
> each, every one able to pass or fail; and, first, the rule that settles what
> happens when two of them disagree. This is the governance document: what
> used to be `STD-002` lives here or in the protocol that executes it.
> **Epistemic:** A corpus without a precedence rule grows contradictions faster
> than it grows documents; the count of rules matters less than the count of
> places they live in.
> **Pragmatic:** The whole normative layer in one document an agent reads
> before starting work.
> **Audience:** Agents · Oracles

---

## 1. Purpose and scope

This standard states the rules that bind every document in the corpus, and the
order in which they win.

**What this covers:** what a document must be, how it is named, versioned,
changed, archived and cited; how work is registered; how a rule becomes
enforceable; and who may decide any of it.

**What this does not cover:** how people are hired, welcomed, trained or paid;
what the world of Numinia contains; how a product looks; and what an actor
does step by step — a standard is complied with, a protocol is executed. How
a guard is built is `STD-005`; how a mission or a session runs is `PRO-003`
and `PRO-001`; how prose is written is `STD-007`. A duty aimed at a person's
calendar is not a rule of this corpus.

**How to read a rule.** Every rule below is one sentence that a reader can
answer yes or no about. If a sentence here cannot be answered yes or no about
a given document, commit or action, that sentence is defective and the defect
is reported, not interpreted.

**What a rule here binds.** Unless a rule says otherwise, *document* means a
registered document of the corpus. It does not mean every markdown file in the
repository. The boundary is *apparatus* — scaffolding around a series rather
than a member of it; `scripts/lib/rules.json` transcribes that boundary and
`scripts/lib/frontmatter.mjs` computes it. Where this standard and the
classifier disagree, `CORE-02` settles it: the classifier is corrected.

A second class sits outside these rules without being apparatus: the files that
address a reader outside the corpus — the repository's own `README`, its
contribution notes, its changelog, its agent instructions. They are governed by
the conventions of the platform they serve, not by the numbered series.

**What executes.** Every rule's `Verified by` column names its verifier:
a script, a GitHub setting, or `[MANUAL]` with one line saying why no parser
can decide it. A rule moving from `[MANUAL]` to a script needs no amendment.

**The switch.** This document's `status` field decides whether the executed
rules bind. `check-core-rules.mjs` runs on every pull request; while `status`
is anything but `active` it reports breaches and lets the build pass, and
setting it to `active` makes them refuse a merge. Only the Oracle sets that
field, and setting it back suspends every rule at once.

**Identifiers are stable.** A rule keeps its `CORE-NN` for life. A rule that
leaves this document leaves a gap, never a renumbering: the number is an
address, and addresses do not move (`CORE-14`).

---

## 2. Precedence — the rule that settles the others

Everything else in this corpus is a claim. These five decide whose claim wins.

| ID | Rule | Verified by |
|---|---|---|
| **CORE-01** | Git history outranks every document; when a document and the history disagree, the history is the record and the document is the claim. | `[MANUAL]` — a claim about history is checked by reading `git log`, and no parser knows which claim to check |
| **CORE-02** | The documents outrank the code: they are the source of truth and the code implements them. When the code does something the documents do not say, the code is corrected. The exception is a document that describes what the code already does and describes it wrong — that is a broken description, and the description is fixed. The test is direction: a rule the code disobeys is a bug in the code; a description the code contradicts is a bug in the description. | `[MANUAL]` — deciding which of the two is the claim requires understanding both |
| **CORE-03** | Between two documents, the one that costs more agreement to change wins: `sealed`, then `governed`, then `closed`, then `open`. What each threshold costs is defined in the glossary, `STD-001`, and is not restated here. | `[MANUAL]` — the thresholds are declared, but recognising that two documents conflict is a judgement |
| **CORE-04** | At equal cost, the later ruling wins, and a later ruling names what it overrides. | `[MANUAL]` — a guard cannot tell a ruling from a mention |
| **CORE-05** | A document does not become authoritative by saying it is. No document holds authority over another except by `CORE-01`..`CORE-04`, and a claim of precedence written inside a document is void unless it rests on one of them. | `[MANUAL]` — an authority claim is a sentence, and no parser recognises one |
**Why cost of change and not rank.** A hierarchy by importance invites argument
about what is important. A hierarchy by cost of change is already recorded: it
is how much agreement each series demands before it may be edited. It is also
the order a reader can verify without asking anyone.

The canon outranks a standard because changing the canon costs an Oracle's
signature and changing a standard costs a pull request — not because the canon
matters more.

**A `draft` binds nobody.** A document in `draft` states an intention, not an
obligation. It is published so it can be read and argued with; it is cited so
the argument has an address. Until its state says otherwise, nothing in it can
be quoted against anyone — including this standard, while it is one.

**Why the history wins.** What a document says can always be changed by
agreement. Who wrote a commit, and when, cannot be changed at any price worth
paying. The archive's strongest guarantee is not the one it declares — it is
the one it inherits.

---

## 3. Authority

| ID | Rule | Verified by |
|---|---|---|
| **CORE-06** | Canon changes only with the Oracle's signature and a decision record giving the reason. | `[MANUAL]` — the decision record is verifiable, its adequacy is not |
| **CORE-07** | Standards, protocols and decisions change by a decision record, or by a pull request the Oracle approves. | `[MANUAL]` — GitHub records the approval; matching it to the change is judgement |
| **CORE-63** | The change lands in the document it governs. A rule written in a decision, a mission or a commit message is not a rule yet: the document is where a reader looks, so that is where the sentence goes. | `[MANUAL]` — recognising an obligation outside its document is the judgement |
| **CORE-08** | A finished mission or a published report keeps its claims; its form may be corrected and the commit says so. | `[MANUAL]` — separating a claim from its form needs a reader |
| **CORE-09** | Everything else changes by an ordinary pull request. | branch protection, GitHub settings |
| **CORE-67** | An agent never edits its own `SOUL.md` or `OPERATOR.md`; both are Oracle-approved. | `[MANUAL]` — CODEOWNERS could decide it; not wired |
| **CORE-10** | Facing an irreversible act in doubt, an agent does not act and escalates instead. | `[MANUAL]` — an act not taken leaves no trace to check |
| **CORE-65** | What each rank may do to a document: an Oracle approves structural change, seals canon, and alone promotes an artefact to stable or breaks it; an Archon authorises iterations below the stable line; a digital agent writes its own files and its assigned missions; a custodian maintains documents, indexes and changelogs; automation writes reports only. Which rank an actor holds is defined in the canon of roles, not here. | `[MANUAL]` — mapping an author to a rank needs the roster |

**States.** A normative document — canon, standard or protocol — is `draft`
(binds nobody), `active` (binds), `superseded` (replaced by the document it
names) or `withdrawn` (retired without replacement). Every other series has
`draft`, `active`, `closed`, unless it registers otherwise in `STD-004`. A
rule that binds must be switchable off without lying about why it stopped:
that is what `superseded` and `withdrawn` are for. Who holds which rank is
`CAN-004`.

---

## 4. Identity and names

| ID | Rule | Verified by |
|---|---|---|
| **CORE-11** | Every document carries the identifier of its series, and that identifier never changes. | `lint-naming.mjs` |
| **CORE-12** | A filename carries no state; state lives in a declared field. | `check-core-rules.mjs` |
| **CORE-13** | A filename carries no version; the version lives in a declared field. | `check-core-rules.mjs` |
| **CORE-14** | An identifier once used is never reused, not even after the document is deleted. | `check-core-rules.mjs` |
| **CORE-15** | When two agents claim one identifier, whoever committed first keeps it and the second renumbers. | `[MANUAL]` — resolved by commit order at the moment of collision, not by a later scan |
---

## 5. The header

| ID | Rule | Verified by |
|---|---|---|
| **CORE-16** | Every document opens with frontmatter fenced by three dashes on their own lines. | `check-frontmatter-delimiter.mjs` |
| **CORE-17** | Frontmatter parses as valid YAML. | `check-frontmatter-yaml.mjs` |
| **CORE-18** | A new frontmatter field requires both a line in the header standard's registry and a decision record. | `[MANUAL]` — the registry line is checkable; that the decision justifies it is not |
| **CORE-19** | Every document declares its licence. What the value must be — an SPDX identifier that agrees with the licence manifest — is `H-08` in the header standard. | `check-license-frontmatter.mjs` |
| **CORE-20** | A field whose value is unknown is never filled with a guess. An empty value is not the way to say so: absence is declared, in one of the three forms the glossary distinguishes — the field omitted, `null`, or `TBA` with the mission that resolves it. | `check-core-rules.mjs` |
---

## 6. Versions

| ID | Rule | Verified by |
|---|---|---|
| **CORE-21** | Versions are semantic, as defined by Semantic Versioning 2.0.0 (https://semver.org). Adopted as published, not redefined here. Every artefact starts at `0.1.0`. | `check-core-rules.mjs` |
| **CORE-64** | Who may move a number is set by which number it is: a digital agent moves the patch, an Archon moves the minor, and only an Oracle moves the major. Promotion to `1.0.0` is a major move. | `[MANUAL]` — matching an author to the number they moved is judgement |
| **CORE-22** | Changing what a document requires raises at least the middle number. | `[MANUAL]` — classifying a diff as a changed obligation is the judgement itself |
| **CORE-23** | Reversing what a document requires raises the first number. | `[MANUAL]` — same as CORE-22, and see `DBT-015` for the escalation it triggers |
| **CORE-24** | The version in the header and the version at the top of the document's own change log agree. | `check-core-rules.mjs` |
---

## 7. Git

| ID | Rule | Verified by |
|---|---|---|
| **CORE-25** | Work reaches the main branch through a pull request, never by direct push. | branch protection, GitHub settings |
| **CORE-26** | A commit's first line says what changed and why, and stays on one line. | `check-core-rules.mjs` |
| **CORE-27** | A generated file is regenerated, never edited by hand. | `generate-design-kit.mjs`, `telemetry.mjs --check` |
| **CORE-28** | Telemetry is regenerated after the commit it measures, never before. | `telemetry.mjs --check` |
| **CORE-29** | A conflict inside a generated file is resolved by regenerating it, not by choosing sides. | `[MANUAL]` — a resolved conflict looks like any other commit |
| **CORE-30** | History on a shared branch is never rewritten. | branch protection, GitHub settings |
---

## 8. Archiving

| ID | Rule | Verified by |
|---|---|---|
| **CORE-45** | A `superseded` document names its heir. A document is `withdrawn` when the rule left and nothing replaced it: that state names no heir, and the check is symmetric — `superseded` without an heir is a breach, `withdrawn` with one is a breach. | `check-core-rules.mjs` |
| **CORE-46** | A retired document stays reachable at the address where it was published. | `check-url-lifecycle.mjs` |
| **CORE-47** | A redirect points at the destination that replaced the document, never at an index. | `[MANUAL]` — a redirect resolves; whether its target is the right heir does not |
| **CORE-48** | Nothing is deleted while something still cites it. | `check-references.mjs` |
| **CORE-49** | A document is copied nowhere; it is linked, and a derived copy declares its master. | `[MANUAL]` — pending; a content-hash scan would catch this and does not exist |
---

## 9. Citation

| ID | Rule | Verified by |
|---|---|---|
| **CORE-50** | A citation names the document, not one of its section numbers. | `check-core-rules.mjs` |
| **CORE-51** | Structural references live in one list at the end of the document. | `[MANUAL]` — gathering is a layout property, and layout has no schema here |
| **CORE-52** | A claim about the codebase names the file that proves it, and that file exists. | `[MANUAL]` — the named file is checkable, that it proves the claim is not |
| **CORE-53** | A broken link inside a closed document is a photograph, not a defect. | `[MANUAL]` — an exemption, not an obligation; nothing to check |
---

## 10. Secrets

| ID | Rule | Verified by |
|---|---|---|
| **CORE-54** | No credential, token or key is ever written into the corpus. | `[MANUAL]` — no secret scanner is wired |
| **CORE-55** | An exposed credential is rotated before the exposure is written down. | `[MANUAL]` — rotation happens outside this repository |
| **CORE-56** | A live finding is reported out of band, not committed to this repository. | `[MANUAL]` — the absence of a report is not observable from inside |
| **CORE-57** | An audit declares how many things it examined out of how many exist. | `[MANUAL]` — the denominator is prose |
---

## 11. Licences

| ID | Rule | Verified by |
|---|---|---|
| **CORE-58** | Every directory declares the licence of what it holds. | `check-license-frontmatter.mjs` |
| **CORE-59** | The licence in a document and the licence in the manifest agree. | `check-license-frontmatter.mjs` |
| **CORE-60** | A permanent publication is gated on a review of ownership. | `[MANUAL]` — the review is recorded outside the corpus |
---

## 12. Conformance

Every rule from Identity to Licences carries its verifier in the third column; there is no
separate table. A rule whose verifier is a guard fails the build when broken.
A rule marked `[MANUAL]` is checked by whoever reads: the check exists, the
pipeline does not run it.

`[MANUAL]` is not a synonym for unenforced, and it is not a third kind: a
rule with an empty verifier column would be an opinion that had learnt to
look official. The share of `[MANUAL]` rules is the honest measure of how far
this standard is from `CORE-31` in `STD-005`; `telemetry/` reports it, this
document does not state it.

Two rules wait on a tool rather than on a decision: `CORE-49` on a
content-hash scan and `CORE-54` on a secret scanner. Neither is planned in a living document.

---

## 13. What this standard does NOT do

It does not explain the rules. A rule here is one line and a verifier; the
reasoning, the history and the examples live in the standard or protocol
the section cites in its heading.

It does not govern the platform, the product or the world. Its scope is the
archive: this repository and the corpus it holds.

It does not rank itself above the canon. `CORE-01` says where it sits.

---

## 14. References

- `STD-001` — the glossary, source of the change thresholds and of the rule that history outranks the document
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
- `RPT-019` — the week the refoundation that wrote this standard closed
