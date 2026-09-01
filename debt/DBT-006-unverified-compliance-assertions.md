---
id: "DBT-006"
uid:
title: "Compliance assertions are falsifiable and nothing falsifies them"
type: documentation
status: active
version: "2.0.0"
created: "2026-08-25T18:00:00Z"
created_source: "git:2ba3fea"
created_confidence: exact
updated: "2026-08-31T23:20:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Sentinels"
territory: "Archive"
tags: [debt, compliance, verification, guards, STD-001, D-011, D-025, D-032]
license: "CC-BY-4.0"
visibility: "restricted-oracle"
visibility_reason: >
  Enumerates 132 compliance controls the system claims to satisfy and does
  not verify. That is finished reconnaissance, and F-48 is open. This one
  stays.
severity: high
opened_by: "Oracle, 2026-08-25, on the credential-map contradiction"
evidence_script: "salida/sesion-2026-08-25-fase0-websync/barrido-cumplimiento.py"
evidence_head: "392ffc6"
absorbs: ["D-033"]
---
# DBT-006 — Compliance assertions are falsifiable and nothing falsifies them

> **Summary:** **145 compliance assertions** across 282 documents. **132 (91%)
> are falsifiable by command and nobody falsifies them — and 61 of those are
> not pending at all: they are refuted by `STD-001` §2.0 and still written in the
> present tense.** One assertion was tested, by accident, and it was false.
> **Epistemic:** `STD-001` §2.1.1 says the reality is the record and the document
> is the claim. These are claims about the system's own state that the system
> never reads back.
> **Pragmatic:** a control declared satisfied and not satisfied produces no
> error. It produces **confidence** — which is why nobody looks again.

## Origin: one assertion, tested by accident

`operations/credential-map.md` asserted *"IP documented privately. Not in this
repo."* for **141 days**. The address was in **7 tracked files** and on **13
built pages**, live.

It was not found by a guard. A regex sweep for secret material, run to classify
that document for an unrelated reason, tripped over the contradiction. **The
sample size for "assertions ever tested" was one, and the failure rate was
100%.**

That is not a basis for estimating the other 131 — but it is a basis for
refusing to assume they hold.

## Measured

`ROOT = numengames/numinia-nwos · main` · `HEAD = 392ffc6` · 2026-08-25
Script: `salida/sesion-2026-08-25-fase0-websync/barrido-cumplimiento.py`

```
282  .md documents swept (debt/ excluded: it describes defects, not compliance)
145  compliance assertions matched
```

| Class | Count | Share |
|---|---:|---:|
| verifiable by command **and verified** | **12** | 8% |
| verifiable by command, **not verified** | **132** | **91%** |
| not verifiable — assertion of trust | 1 | 1% |

**The middle row is the debt.** It is the prose sibling of `[CI]` vs `[MANUAL]`:
those tag rules by who enforces them; nothing tags *sentences*, so a sentence
claiming enforcement reads exactly like a rule that has it.

### The 132 are two different states, and lumping them hid the worse one

```
132  verifiable, not verified
 61  of those, CONTRADICTED by STD-001 §2.0 — not pending: refuted
 71  genuinely pending verification
```

**"Not verified" and "known false" are not the same state.** The 61 that assert
`immutable` (29) or `append-only` (32) are not awaiting a verdict: §2.0 already
delivered one. It established that the archive *"claimed an immutability it
never had and never enforced"*, and measured it — **9 of 33 `done` missions were
edited after being marked done**.

So those 61 sentences are **refuted and still written in the present tense**,
spread across 40+ documents that §2.0 never reached. The standard was corrected;
the corpus quoting the old rule was not.

The 71 remainder — `read-only` (25), `must not` (15), `shall not` (9),
`not in this repo` (4), `no exceptions` (3), `enforced via` (2), and the rest —
are the ones where nobody knows, which is a milder and more honest problem.

**Not corrected here, deliberately.** Fixing 61 assertions across 40+ documents
is a mission of its own with its own review. This entry separates them so the
next reader is not told that 132 things are unknown when 61 of them are known
to be wrong.

### Where the unverified assertions live

```
 20  standards/STD-001-glossary.md
 11  operations/legal/OPS-004-terms-and-conditions-numengames.md
  6  protocols/P-011-security-audit.md
  5  blueprints/BLU-008 (deleted 2026-08-31)
  5  reports/RPT-2026-04-07-wardley-map.md
  4  STANDARDS.md
  4  reports/audits/AUD-2026-08-17-navigability.md
```

### What they assert

```
 32  append-only          25  read-only            9  shall not
 29  immutable            15  must not             4  not in this repo
  3  no exceptions         2  enforced via         2  requires Oracle approval
```

**`immutable` and `append-only` account for 61 of the 132.** `STD-001` §2.0
already established that the archive *"claimed an immutability it never had and
never enforced"* — 9 of 33 `done` missions were edited after closing. So a large
share of these are not merely unverified: they are **known false and still
written in the present tense**, scattered across documents that §2.0 never
reached.

The 20 in `STD-001` itself are mostly the document describing the thresholds it
proposes. That is the least alarming subset and still counts: **the standard
that says nothing is immutable contains the most unverified assertions of
immutability**, because it quotes what it is retiring.

## The class of failure

`STD-001` §10.0 applied to a control instead of a measurement:

| | omission (§10.0.1) | unverified control (this entry) |
|---|---|---|
| Produces | a valid, smaller artefact | a valid, more trusted artefact |
| Detected by | an independent enumeration | **an independent test of the claim** |
| Failure signal | none | none |

And §2.1.1 applied outside git: git enforces its own immutability, so a claim
about git is self-verifying. **Every claim about anything else is a sentence.**

`D-011` records that the four thresholds are unenforced. `D-025` records that
guards declare their blindness. This entry is the third face: **the prose makes
claims that no guard was ever asked to cover**, and unlike `D-011` these are not
in a table anyone reviews — they are in body text, in 40+ documents.

## Scope note, honestly

The sweep is a **first-level** pass: a regex over 145 sentence patterns. It will
have false positives (a document quoting a rule it is retiring) and false
negatives (an assertion phrased in a way the pattern misses). It was not tuned,
because tuning it before the Oracle sees the shape would be choosing the answer.

Per the Oracle's instruction, ambiguity was resolved **towards `not verified`**:
the cost of wrongly assuming a control works is not symmetric with the cost of
re-checking one that does.

**No assertion in this entry has been verified or refuted** beyond the
`credential-map` one that opened it. That work is deliberately not done here.

## What would close it

**1 · A verification pass over the 132**, in severity order: security and legal
first (`P-011`, `OPS-004`, `security-policy`), then standards, then the rest.
Each one gets a verdict: holds / fails / not testable.

**2 · Assertions carry their mechanism.** The same discipline `[CI]`/`[MANUAL]`
imposes on rules, applied to prose: a sentence claiming enforcement names what
enforces it, or is rewritten as an intention. *"Enforced via CODEOWNERS"* is
checkable; *"is protected"* is not.

**3 · A guard for new assertions.** The pattern list in the sweep script,
run in CI against changed files, so a new unbacked claim fails a PR the way a
new broken reference does.

**4 · The known-false ones are corrected first**, in place and with a record —
the `credential-map` §2.1.2 correction is the template. 61 `immutable`/
`append-only` claims against a standard that says otherwise is the largest
single inconsistency in the corpus.

## Closure

Marked RESOLVED when:

- [ ] The **71 pending** have verdicts, recorded, not silently edited
- [ ] The **61 refuted** are reconciled with `STD-001` §2.0 — own mission
- [ ] Assertions of enforcement name their mechanism or are downgraded
- [ ] A guard fails a PR introducing an unbacked compliance claim

| | |
|---|---|
| Severity | **high** — the system's self-description of its own safety is untested |
| Owner | Oracle |
| Blocked by | `D-017` for the CI step |
| Opened | 2026-08-25, from the `credential-map` contradiction |
| Closes when | a compliance claim either has a mechanism or does not exist |

---

## Renumbering note, 2026-08-31

This document was `D-033`. The `D-` series
was closed and renumbered densely to `DBT-NNN` under `ADR-004` rule 4 and
`ADR-005` v1.1.0 — see `RPT-001` §12. No `D-` number is reused.
