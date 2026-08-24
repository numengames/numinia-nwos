---
id: "D-011"
uid:
title: "Change thresholds are declared but nothing enforces them"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-24T20:05:00Z"
updated: "2026-08-24T20:05:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, governance, thresholds, signing, branch-protection]
license: "CC-BY-4.0"
severity: high
opened_by: "S-001 §2.1"
---
# D-011 — Change thresholds are declared but nothing enforces them

> **Summary:** `S-001` §2.1 defines four change thresholds. To git they are the
> same file.
> **Epistemic:** Measures the distance between the ceremony the archive claims
> and the ceremony it can require.
> **Pragmatic:** Until this closes, `sealed` means "we agreed to be careful",
> not "the system will stop you".

## What replaced the false claim

The archive used to say `canon/` was immutable and a `done` mission was
immutable. **Both statements were false**, and the history proves it:

| Claim | Evidence against it |
|---|---|
| `canon/` "must not be modified" | 14 of 14 canon documents have >1 commit. `Welcome to Numinia.md`, edited 2026-05-06 by a third party: *"operating system"* → *"germinal motive"*, *"Functional Model"* → *"Regulatory Model"* |
| A `done` mission "is immutable" | 9 of 33 edited after being marked `done` |

Reproduce:

```bash
git log --follow -- "canon/Welcome to Numinia.md"
git show fee903b -- "canon/Welcome to Numinia.md"
```

`S-001` §2.1 replaces immutability with **change thresholds** — `sealed`,
`governed`, `closed`, `open`. That is honest. It is also, today, unenforceable.

## The gap

| Threshold | What `S-001` requires | What the system actually requires |
|---|---|---|
| `sealed` | Oracle's signature + ADR | a PR |
| `governed` | ADR or Oracle-approved PR | a PR |
| `closed` | substance untouched, form stated in the commit | a PR |
| `open` | a PR | a PR |

**Four thresholds, one enforcement.** Measured on 2026-08-24:

- Signed commits: **0** in the last 12 (one carries a bad signature)
- Signed tags: **0**. Tags in the repo: 1, unsigned
- Branch protection / ruleset on `main`: **not configured**
- CODEOWNERS: present, but review is not required by a ruleset

A `sealed` canon document and an `open` scratch file are, to git, the same
object with the same permissions.

## Closing condition

Marked RESOLVED when a change to a `sealed` document **cannot** land without the
ceremony `S-001` §2.1 describes. Concretely:

1. **Ruleset on `main`** — require PR, require signed commits, require linear
   history, **include administrators**. Repo admin only; the agent cannot do
   this.
2. **Commit signing** for every author with push, human or agent.
3. **CODEOWNERS entry for `canon/`** with review required by the ruleset, so a
   `sealed` change needs the Oracle by mechanism rather than by memory.
4. Optional, once 1–3 exist: a guard that fails a PR touching `canon/` without a
   corresponding ADR in the same PR.

Steps 1–3 are the Oracle's; step 4 is the agent's and is worthless before them.

## Why this is high severity

The other debts are gaps between a rule and the data. This one is a gap between
**a rule and the ability to have any rule at all**. While it stays open, every
threshold in `S-001` §2.1 is a statement of intent — which is fine, as long as
the document says so, and it does.

## State

| | |
|---|---|
| Severity | **high** — governs whether any other rule can be enforced |
| Owner | Oracle |
| Blocked by | requires repo admin; the agent has neither admin nor `workflow` scope |
| Opened | 2026-08-24, by `S-001` §2.1 |
| Closes when | a `sealed` change cannot land without its ceremony |
