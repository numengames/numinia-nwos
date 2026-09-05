---
id: "STD-009"
uid:
title: "The rules of the corpus, and which one wins"
type: documentation
subtype: standard
status: draft
version: "0.4.0"
created: "2026-09-03T22:10:00Z"
updated: "2026-09-05T13:05:00+02:00"
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

**What a rule here binds.** Unless a rule says otherwise, *document* means a
registered document of the corpus. It does not mean every markdown file in the
repository. The boundary is not restated here: `scripts/lib/rules.json` defines
apparatus — scaffolding around a series rather than a member of it — and
`scripts/lib/frontmatter.mjs` computes it. That computation is the definition,
and where this standard and the classifier disagree, the classifier is right
and this sentence is the defect.

A second class sits outside these rules without being apparatus: the files that
address a reader outside the corpus — the repository's own `README`, its
contribution notes, its changelog, its agent instructions. They are governed by
the conventions of the platform they serve, not by the numbered series.

**What executes.** Eight of these rules are executed by
`scripts/check-core-rules.mjs` — CORE-12, CORE-13, CORE-16, CORE-19, CORE-21,
CORE-26, CORE-45 and CORE-50. The rest are read by a person or an agent.
A rule moving from the second group to the first is an improvement that needs
no amendment to this document.

**What ratification changes, and how it is undone.** The `status` field of this
document is the switch. While it reads anything other than `active`, the guard
reports breaches and lets the build pass: nothing here binds. Setting it to
`active` makes those eight rules fail the build. Setting it back to `draft`
suspends them again, immediately and without touching any script.

No rule of this standard binds until the Oracle sets that field, and any rule
can be suspended by returning it. A standard that cannot be switched off is not
a standard; it is an accident.

---

## 2. Precedence — the rule that settles the others

Everything else in this corpus is a claim. These five decide whose claim wins.
They were `STD-002` §Which document wins until 2026-09-05; that section is now
a pointer here, and `CORE-02` was corrected in the move.

| ID | Rule | Verified by |
|---|---|---|
| **CORE-01** | Git history outranks every document; when a document and the history disagree, the history is the record and the document is the claim. | `[MANUAL]` — a claim about history is checked by reading `git log`, and no parser knows which claim to check |
| **CORE-02** | The documents outrank the code: they are the source of truth and the code implements them. When the code does something the documents do not say, the code is corrected. The exception is a document that describes what the code already does and describes it wrong — that is a broken description, and the description is fixed. The test is direction: a rule the code disobeys is a bug in the code; a description the code contradicts is a bug in the description. | `[MANUAL]` — deciding which of the two is the claim requires understanding both |
| **CORE-03** | Between two documents, the one that costs more agreement to change wins: sealed, then governed, then closed, then open. | `[MANUAL]` — the thresholds are declared, but recognising that two documents conflict is a judgement |
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
| **CORE-10** | Facing an irreversible act in doubt, an agent does not act and escalates instead. | `[MANUAL]` — an act not taken leaves no trace to check |
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
| **CORE-19** | Every document declares its licence. | `check-license-frontmatter.mjs` |
| **CORE-20** | A field whose value is unknown is left empty, never filled with a guess. | `check-core-rules.mjs` |
---

## 6. Versions

| ID | Rule | Verified by |
|---|---|---|
| **CORE-21** | Versions are semantic. | `check-core-rules.mjs` |
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

## 8. Guards

| ID | Rule | Verified by |
|---|---|---|
| **CORE-31** | A rule that does not break the build does not exist for an agent. | `[MANUAL]` — this table is the check; a reader confirms every row is filled |
| **CORE-32** | A guard is wired into the pipeline in the same change that writes it. | `[MANUAL]` — pending the guard register, `MIS-146` |
| **CORE-33** | A guard register is read from the workflow file, never remembered. | `[MANUAL]` — pending the guard register, `MIS-146` |
| **CORE-34** | A baseline records damage that predates its rule and never absorbs damage the current change caused. | `[MANUAL]` — tracing a baseline entry to its commit is archaeology |
| **CORE-35** | A green pipeline is not a clean tree, and a change declares what it left behind. | `[MANUAL]` — residue is what nobody noticed; a guard that could see it would fail on it |
---

## 9. Work

| ID | Rule | Verified by |
|---|---|---|
| **CORE-36** | Work is registered before it is executed. | `[MANUAL]` — comparing a mission's date to work that may predate its branch |
| **CORE-37** | A mission states what would count as done before work starts. | `[MANUAL]` — the section is checkable, whether it states a test is not |
| **CORE-38** | A parent mission is not finished while any of its children is open. | `[MANUAL]` — parent and child are declared in prose, not in a field |
| **CORE-39** | A paused mission declares why it is paused. | `[MANUAL]` — the reason is prose |
| **CORE-40** | A finished mission is not rewritten to match later doctrine. | `[MANUAL]` — same judgement as CORE-08 |
| **CORE-41** | An agent reads the whole mission before acting, never the title alone. | `[MANUAL]` — no trace distinguishes a full read from a skim |
---

## 10. Sessions

| ID | Rule | Verified by |
|---|---|---|
| **CORE-42** | A session begins by syncing the corpus, before any read or write. | `[MANUAL]` — the sync is a local act with no artefact |
| **CORE-43** | A session ends with its record committed. | `[MANUAL]` — the closing commit exists; that it closes the session is judgement |
| **CORE-44** | An agent works from the corpus in the tree, never from a copy pasted elsewhere. | `[MANUAL]` — a claim sourced from a paste looks identical to one sourced from the tree |
---

## 11. Archiving

| ID | Rule | Verified by |
|---|---|---|
| **CORE-45** | A `superseded` document names its heir. A document is `withdrawn` when the rule left and nothing replaced it — that state names no heir, and demanding one is the defect recorded in `DBT-015`. | `check-core-rules.mjs` |
| **CORE-46** | A retired document stays reachable at the address where it was published. | `check-url-lifecycle.mjs` |
| **CORE-47** | A redirect points at the destination that replaced the document, never at an index. | `[MANUAL]` — a redirect resolves; whether its target is the right heir does not |
| **CORE-48** | Nothing is deleted while something still cites it. | `check-references.mjs` |
| **CORE-49** | A document is copied nowhere; it is linked, and a derived copy declares its master. | `[MANUAL]` — pending; a content-hash scan would catch this and does not exist |
---

## 12. Citation

| ID | Rule | Verified by |
|---|---|---|
| **CORE-50** | A citation names the document, not one of its section numbers. | `check-core-rules.mjs` |
| **CORE-51** | Structural references live in one list at the end of the document. | `[MANUAL]` — gathering is a layout property, and layout has no schema here |
| **CORE-52** | A claim about the codebase names the file that proves it, and that file exists. | `[MANUAL]` — the named file is checkable, that it proves the claim is not |
| **CORE-53** | A broken link inside a closed document is a photograph, not a defect. | `[MANUAL]` — an exemption, not an obligation; nothing to check |
---

## 13. Secrets

| ID | Rule | Verified by |
|---|---|---|
| **CORE-54** | No credential, token or key is ever written into the corpus. | `[MANUAL]` — no secret scanner is wired; see `MIS-146` |
| **CORE-55** | An exposed credential is rotated before the exposure is written down. | `[MANUAL]` — rotation happens outside this repository |
| **CORE-56** | A live finding is reported out of band, not committed to this repository. | `[MANUAL]` — the absence of a report is not observable from inside |
| **CORE-57** | An audit declares how many things it examined out of how many exist. | `[MANUAL]` — the denominator is prose |
---

## 14. Licences

| ID | Rule | Verified by |
|---|---|---|
| **CORE-58** | Every directory declares the licence of what it holds. | `check-license-frontmatter.mjs` |
| **CORE-59** | The licence in a document and the licence in the manifest agree. | `check-license-frontmatter.mjs` |
| **CORE-60** | A permanent publication is gated on a review of ownership. | `[MANUAL]` — the review is recorded outside the corpus |
---

## 15. Writing

| ID | Rule | Verified by |
|---|---|---|
| **CORE-61** | A rule is one sentence that can be answered yes or no. | `check-plain-writing.mjs` |
| **CORE-62** | A normative document states no figure that its own subject will age: counts of the corpus, coverage and progress live in reports. A value the document itself defines — a token, a ratio, a threshold it sets — is specification, not measurement. | `[MANUAL]` — deciding whether a figure will age is the judgement the rule asks for |
---

## 16. What this standard does not yet enforce

Stating this is a requirement of the corpus, not a courtesy.

Every rule above names a verifier. 23 are decided by a script or by a
GitHub setting; 40 are marked `[MANUAL]` and say in one line why no
parser can decide them. There is no third kind: a rule with an empty verifier
column would be an opinion that had learnt to look official.

`[MANUAL]` is not a synonym for unenforced. It means the check exists and a
reader performs it. What it costs is that a breach is found by whoever looks,
not by the pipeline — so `[MANUAL]` rules fail late, and their number is the
honest measure of how far this standard is from `CORE-31`.

Four of them are marked pending rather than impossible: `CORE-32` and
`CORE-33` wait on the guard register, `CORE-49` on a content-hash scan, and
`CORE-54` on a secret scanner. Those are absent tools, not undecidable rules,
and `MIS-146` carries them.

The rules that bind are decided by this standard's own `status` field.
While it is anything but `active`, `check-core-rules.mjs` reports every
breach and lets the build pass.

Five conflicts between the governance document and the protocols that govern
the same acts are unresolved. They are not decided here because deciding them
is not a measurement, and the corpus reserves that decision to the Oracle.

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
