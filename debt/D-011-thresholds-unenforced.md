---
id: "D-011"
uid:
title: "Change thresholds are declared but nothing enforces them"
type: documentation
status: open
version: "1.1.0"
created: "2026-08-24T20:05:00Z"
updated: "2026-08-25T21:00:00Z"
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
| `canon/` "must not be modified" | 14 of 14 canon documents have >1 commit. `C-001-welcome-to-numinia.md`, edited 2026-05-06 by a third party: *"operating system"* → *"germinal motive"*, *"Functional Model"* → *"Regulatory Model"* |
| A `done` mission "is immutable" | 9 of 33 edited after being marked `done` |

Reproduce:

```bash
git log --follow -- "canon/C-001-welcome-to-numinia.md"
git show fee903b -- "canon/C-001-welcome-to-numinia.md"
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

## Partially closed — 2026-08-25: `main` now has a mechanism

Step 1 of the closing condition is **done**. Ruleset `protect-main` (id
`21281544`) is `active` on `~DEFAULT_BRANCH`, verified against the API and
exported to `infra/github/ruleset-protect-main.json`:

| Rule | State |
|---|---|
| `pull_request` | required — no direct push to `main` |
| `required_status_checks` | `build` + `Workers Builds: numinia-nwos` |
| `required_linear_history` | required |
| `non_fast_forward` | required |
| `deletion` | blocked |
| **`bypass_actors`** | **empty — including administrators** |

**The empty bypass list is the part that matters.** The closing condition asked
for *"include administrators"*, and a ruleset with an admin bypass would have
satisfied the letter while leaving the rule optional for the one account most
able to skip it. Nobody bypasses this one.

So the four thresholds are no longer *equally* unenforced. Every change to
`main` — `sealed` or `open` — now needs a PR whose build and deploy pass. That
is a floor under all four, not a distinction between them.

### What is still open, and it is the distinguishing half

The ruleset makes the archive **harder to change carelessly**. It does not yet
make `sealed` mean anything different from `open`:

| Threshold | `S-001` §2.1 requires | The system requires today |
|---|---|---|
| `sealed` | Oracle's signature + ADR | a PR with green checks |
| `governed` | ADR or Oracle-approved PR | a PR with green checks |
| `closed` | substance untouched, form stated | a PR with green checks |
| `open` | a PR | a PR with green checks |

Two mechanisms remain, and neither is the agent's to install:

**2 · Agent commit signing.** Not enabled, and enabling `require signed commits`
today would lock the agent out entirely: its commits are
`verified: false, reason: unsigned`. The signatures that appear on `main` are
GitHub's web-flow key, applied when the Oracle squash-merges from the web —
they attest the merge, not the authorship. **That is `D-019`, and this entry
defers to it rather than duplicating it.**

**3 · CODEOWNERS review.** `.github/CODEOWNERS` exists; no rule requires it.
Until `require_code_owner_review` is on, a change to `canon/` needs the Oracle
by memory, not by mechanism — which is exactly what this debt is about.

Step 4 — a guard failing a `canon/` PR with no matching ADR — remains the
agent's, and remains worthless before step 3.

## Closing condition

Marked RESOLVED when a change to a `sealed` document **cannot** land without the
ceremony `S-001` §2.1 describes. Concretely:

1. ~~**Ruleset on `main`** — require PR, require signed commits, require linear
   history, **include administrators**.~~ **DONE 2026-08-25**, except the
   signing half: PR, linear history, status checks and an empty bypass list are
   active (`infra/github/ruleset-protect-main.json`). Signing moves to step 2.
2. **Commit signing** for every author with push, human or agent. **Open** —
   agent commits are unsigned; see `D-019`.
3. **CODEOWNERS entry for `canon/`** with review required by the ruleset, so a
   `sealed` change needs the Oracle by mechanism rather than by memory.
   **Open** — the file exists, the rule does not require it.
4. Optional, once 1–3 exist: a guard that fails a PR touching `canon/` without a
   corresponding ADR in the same PR. **Open.**

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
