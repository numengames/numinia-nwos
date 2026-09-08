---
id: "DBT-017"
uid: ""
title: "Five guards block the merge and no document says what they enforce"
type: documentation
status: active
version: "0.1.0"
created: "2026-09-07T11:25:00+02:00"
updated: "2026-09-07T16:10:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, guards, ci, governance]
license: "CC-BY-4.0"
severity: high
severity_reason: "code is obliging where no document obliges, which inverts the system's founding rule"
detected: "2026-09-07"
visibility: "restricted-oracle"
visibility_reason: "internal structural debt"
opened_by: "ursa"
related: ["MIS-0146", "STD-009"]
---

# DBT-017 — Guards that enforce rules nobody wrote

> **Summary:** Fifteen guards exist; five are named by no document in the axis,
> and three of those eight run in CI and block the merge. Code is obliging where
> no document obliges.
> **Epistemic:** The claim "the documents rule over the code; the code implements
> them" is false for at least three enforced behaviours.
> **Pragmatic:** Closes when every guard that can fail a build cites the rule it
> implements, and that rule exists.
> **Audience:** Agents

---

## 1. The defect

The system's founding rule, stated in `STD-002`: **the documents rule over the
code. They are the source of truth; the code implements them.**

A guard is therefore an implementation of a rule that some document already
states. It cannot be the origin of the obligation — if it were, changing a script
would change the law, and the law would be whatever the last commit made it.

Measured at `79dfe38`:

| | Count |
|---|---|
| Guards in `scripts/` (excluding the `.test` file) | 15 |
| Named by `STD-009` as verifying a rule | 8 |
| Named by any axis document (`canon/`, `standards/`, `protocols/`) | 10 |
| **Named by no axis document** | **5** |
| Of those five, **running in CI with no `continue-on-error`** | **3** |

The five unnamed: `check-deletable`, `check-internal-links`, `check-orphan-content`,
`check-responsive`, `lint-frontmatter`.

The three that block a merge: **`check-internal-links`**, **`check-orphan-content`**,
**`lint-frontmatter`**.

`lint-frontmatter` is the sharpest case. It fails builds on `HDR-003`, `HDR-004` and
`HDR-030` — rule identifiers from `STD-004` — and it maintains a baseline of accepted
violations. `STD-004` defines those rules. No document says that this script is
what enforces them, which the corpus needs stated in the direction *rule → guard*,
not only inferred from an error message.

`check-internal-links` and `check-orphan-content` do not even have that. They
enforce behaviour that appears in no rule at all.

---

## 2. Why this is not pedantry

Three failure modes follow, and none is hypothetical.

**A contributor cannot learn the rule from the corpus.** They learn it from a
failing build. The document set claims to be the source of truth and is not, for
these behaviours.

**A rule cannot be argued with.** `STD-009` §1 makes ratification the switch that
turns the rules on. These three are already on, and were never ratified by
anything.

**Deleting the script deletes the law silently.** There is nothing to notice its
absence, because nothing referenced it.

---

## 3. Evidence

```
$ ls scripts/check-*.mjs scripts/lint-*.mjs | grep -v test | wc -l
15

$ grep -oE '`(check|lint)-[a-z-]+\.mjs`' standards/STD-009-core-rules.md | sort -u | wc -l
8

$ for g in check-deletable check-internal-links check-orphan-content check-responsive lint-frontmatter; do
    git grep -l "$g" -- canon standards protocols | wc -l; done
0 0 0 0 0

$ grep -c 'continue-on-error' .github/workflows/ci.yml
0
```

Measured at `79dfe38`, 2026-09-07.

---

## 4. Closure condition

> **Closes when:** every guard that can fail a build is named by a rule in the
> axis, and that rule states what it obliges — or the guard is removed from CI.

Two acceptable outcomes, not one. A guard whose behaviour nobody is willing to
write down as a rule should not be blocking merges; taking it out of CI closes
this entry as honestly as writing the rule does.

---

## 5. What this does not claim

It does not claim the five guards are wrong. `check-internal-links` catches real
broken links; it caught two while `STD-010` was being written.

The defect is not the behaviour. It is that the behaviour obliges without a
document, and the system's own account of itself says that cannot happen.

## The newest guard was written the other way round

`check-section-citations.mjs` (2026-09-07) enforces a rule that was written
first: *cite the rule, never the place*, stated in `DBT-016` and in the plain
writing standard. The guard is evidence for an existing obligation rather than
a new obligation smuggled in as code.

That is the shape every guard in this entry should be brought to.
