---
id: "AUD-2026-08-24-canon-edit"
uid:
title: "Audit — the 2026-05-06 canon edit: authorised, complete, coherent?"
type: report
subtype: audit
status: published
version: "1.0.0"
created: "2026-08-24T20:40:00Z"
updated: "2026-08-24T20:40:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [audit, canon, governance, terminology, coherence]
license: "CC-BY-4.0"
scope: "canon/Welcome to Numinia.md · commit fee903b · and its propagation across the corpus"
---
# AUD-2026-08-24 — The canon edit of 2026-05-06

> **Summary:** A canon document was edited four months ago. This audit asks the
> three questions nobody asked: was it authorised, was it complete, and does the
> canon now say what we believe it says.
> **Epistemic:** Turns an illustrative example into examined evidence.
> **Pragmatic:** Read before signing `S-001`. The findings affect what the
> archive can claim about its own terminology.

---

## Why this audit exists

`S-001` §2.0 cites this edit to prove that "immutable" was a false word. That is
a semantic argument, and it stopped there. The Oracle's objection is correct:

> *"The question nobody asks is: was it authorised, and does the canon say today
> what you think it says? That is an AUD- or a decision, not an illustrative
> paragraph."*

The answer to the second question is **no**. That is the finding.

---

## 1. The facts

| | |
|---|---|
| Commit | `fee903b321e2d19b25b64e75035c115a466d7d61` |
| Author | Christian Märtens `<christianmartens@numengames.com>` |
| Date | 2026-05-06 17:41:13 +0200 |
| Message | `Update Welcome to Numinia.md` |
| Parent | `73040db` — single parent, **not a merge commit** |
| Changes | 6 insertions, 6 deletions, one file |

```bash
git show fee903b -- "canon/Welcome to Numinia.md"
```

### What changed

```diff
-  It is the operating system: the set of ideas, principles, and organizational
+  It is the germinal motive: the set of ideas, principles, and organizational

-2. **Functional Model**
+2. **Regulatory Model**
```

Two conceptual definitions in the founding document of the system.

---

## 2. Was it authorised?

**Undeterminable, and that is itself the finding.**

- The commit has a **single parent**: it did not arrive through a merged pull
  request. It is a direct push to `main`.
- There is **no ADR** recording the terminological change.
- There was **no ruleset** on `main` in May 2026 — nor is there today (`D-011`).
- CODEOWNERS exists but review was not required by any mechanism.

So the question "was it authorised" has no answer the repository can give. Not
because the author did anything irregular — **a direct push to `main` was
permitted, and still is** — but because the system kept no record of
authorisation for a change of this class.

> This is not an accusation. It is the measurement of a gap: the archive cannot
> distinguish an authorised canon edit from an unauthorised one, because it
> records neither.

---

## 3. Was it complete?

**No.** The edit changed two occurrences and left the rest of the document
carrying the old term.

`canon/Welcome to Numinia.md`, today:

| Line | Text |
|--:|---|
| 25 | *"Numinia is projected from an **operating system** as if it were a living city…"* |
| 38 | *"It is the **germinal motive**: the set of ideas…"* ← **edited** |
| 41 | *"2. **Regulatory Model**"* ← **edited** |
| 42 | *"…responds to the needs of the **operating system**…"* |
| 105 | *"…its purpose within the Numen Games **operating system**."* |

**The founding document uses both terms, in adjacent lines.** Line 41 announces
the *Regulatory Model*; line 42 explains it in terms of the *operating system*
that line 38 replaced.

---

## 4. Does the canon say today what we believe it says?

**No. The canon contradicts itself, and the corpus follows the older canon.**

Measured across all tracked `.md`:

| Term | Documents | Status |
|---|--:|---|
| `operating system` | **28** | replaced in one line of one document |
| `Functional Model` | **21** | **withdrawn from canon four months ago** |
| `germinal motive` | 7 | the new term |
| `Regulatory Model` | 7 | the new term |

Of the 21 documents still carrying the withdrawn `Functional Model`, **four are
canon itself**:

- `canon/Numinia Brand and Culture.md`
- `canon/Role structure in the Numinia system.md`
- `canon/2026_04_15-Epistemic_Relations_Between_Numen_Games_and_Numina-v0.2.0.md`
- `canon/README.md`

And it has propagated outward: `agents/adonaz/MEMORY.md` and
`agents/nimrod/MEMORY.md` carry the retired term in agent memory, and
`MIS-085` cites it in an active mission.

> **The consequence, stated plainly.** The canon is the document the archive
> tells agents to read before asserting anything about the model. An agent
> reading `Welcome to Numinia` learns *Regulatory Model*; an agent reading
> `Brand and Culture` learns *Functional Model*. Both are canon. Both are wrong
> about the other.

---

## 5. What this changes for `S-001`

The edit is not merely evidence that "immutable" was false. It is evidence of
something sharper:

1. **A `sealed` threshold without a mechanism does not fail loudly — it fails
   silently and spreads.** The 2026-05-06 edit was small, plausible and
   uncontested. Four months later the terminology it introduced has reached 7
   documents while the term it retired survives in 21.

2. **Partial edits to canon are worse than no edit.** A wholesale replacement
   would have left the corpus consistent-but-outdated. A partial one leaves it
   *incoherent*, and nothing detects that.

3. **The archive has no terminology guard.** `S-001` §7 closes vocabularies for
   frontmatter fields. Nothing closes the vocabulary of the prose — which is
   where the canon actually lives.

---

## 6. Recommendations

**R1 — The Oracle rules on the term.** `germinal motive` / `Regulatory Model`,
or `operating system` / `Functional Model`. Either is defensible; the current
state is not. This is a canon decision and belongs in an ADR, not in this audit.

**R2 — Propagate the ruling completely**, in one operation: the 4 canon
documents first, then the 21 across the corpus, then the two `MEMORY.md` files.
Verified with `scripts/check-references.mjs` and a term count before and after.

**R3 — Register the terminology gap as debt** until R1 and R2 are done →
**D-012**.

**R4 — Do not repeat the pattern.** Any future canon edit carries an ADR stating
what changed and why, and a term-propagation check. That requirement is only
enforceable once `D-011` closes: without a ruleset, R4 is a request, not a rule.

---

## 7. What this audit does not claim

- It does not claim the edit was wrong. `germinal motive` may well be the better
  term; the Oracle decides.
- It does not claim the author acted improperly. Direct push to `main` was, and
  remains, permitted.
- It does not claim malice anywhere. The finding is about **mechanism**, not
  conduct.

---

## Reproduce

```bash
git show fee903b --format='%H%n%an <%ae>%n%ad' --date=iso
git log --format='%h %p %s' -1 fee903b        # single parent → direct push
grep -ril "Functional Model" --include='*.md' . | wc -l
grep -ril "operating system" --include='*.md' . | wc -l
grep -n "operating system\|germinal motive" "canon/Welcome to Numinia.md"
```
