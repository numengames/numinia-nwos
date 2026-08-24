---
id: "P-012"
uid:
title: "Issuing a ruling with a condition for being wrong"
type: protocol
status: active
version: "1.0.0"
created: "2026-08-25T02:00:00Z"
updated: "2026-08-25T02:00:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [protocol, rulings, verification, method, falsifiability]
license: "CC-BY-4.0"
related: ["ADR-005", "P-008", "S-001"]
---
# P-012 — Issuing a ruling with a condition for being wrong

> **Summary:** Every ruling states what would make it wrong, and the executor
> verifies that before executing.
> **Epistemic:** Turns a decision into something the archive can check rather
> than merely obey.
> **Pragmatic:** Applies to every ruling, not to the one that produced it.

## Why this exists

On 2026-08-24 the Oracle ruled on registration prefixes and wrote:

> *"If you think the bundled figure was measuring something I have misread — for
> example if `A-`/`O-`/`D-` collide with something I do not know about — say so
> before executing. Otherwise proceed."*

The ruling stated that `A-`, `O-` and `D-` were clean. Verification found `A-`
was not: `A-001`…`A-016` already existed as numbered findings inside two audits,
cited from a different document than the one defining them.

**The ruling was wrong on a point of fact, and its own instruction caught it
before it was executed.** Had the same ruling been issued as a plain
instruction, the agent would have registered `agents/` as `A-NNN` and the
ambiguity would have been permanent — a rename after the first identifier is
issued costs the whole series.

> A ruling issued with a condition for being wrong is what caught it.

That sentence is method, not a note on one decision. Hence this protocol.

## The procedure

### 1 · The issuer states the ruling's factual dependencies

Not the reasoning — the **facts** the ruling rests on, in a form that can be
checked. Concretely: *what would have to be true in the repository for this to
be the right call?*

Weak: *"use `AG-` for agents."*
Strong: *"use `A-` for agents; **`A-` is unused in the corpus**."*

The second names its own failure condition without effort. The first cannot be
checked at all.

### 2 · The issuer states what to do if a dependency is false

**"Stop and report" is the default.** Not "use your judgement", not "adapt" —
the executor's judgement is what the ruling replaced. An unverifiable ruling
executed on the executor's judgement is two decisions pretending to be one.

### 3 · The executor verifies before executing, and shows the command

Every stated fact is measured, with the command that measured it in the report.
A fact accepted because it was asserted has not been verified.

```bash
# the check that caught A-
grep -rn "\bA-0[0-9][0-9]\b" --include='*.md' . | grep -v '^./web/'
```

### 4 · If a dependency is false, stop — before any file changes

Report which fact failed, what was measured instead, and whether it changes the
ruling. **It often does not.** In the `A-` case the arithmetic held entirely —
121 citations to avoid 40 was still the wrong trade — and only one prefix
changed.

**Stopping is not a rejection of the ruling.** It is the ruling working.

### 5 · The correction is recorded where the decision lives

Both the original ruling and the correction, in the ADR or the report. A
decision that hides what it cost is worth less than one that shows it.

## What this is not

**Not a licence to relitigate.** The executor checks the ruling's stated facts,
not its reasoning or its priorities. If the facts hold, it executes — including
when it disagrees. `ADR-005` was executed with its central trade-off intact;
what changed was one prefix, on a fact.

**Not a delay.** The `A-` check was one `grep`. The verification budget is
proportional to what the ruling asserts, not to its importance.

## When it applies

Any ruling that asserts a fact about the repository — coverage figures,
collisions, what exists, what is unused, what a file contains. Which is nearly
all of them: the archive's decisions are almost always about its own state.

It does not apply to preference: *"one branch at a time"*, *"English"*,
*"explanatory HTML before each PR"*. Those assert nothing checkable and need no
condition.

## Record

Rulings that carried a condition and were caught by it:

| Date | Ruling | Fact asserted | Measured | Outcome |
|---|---|---|---|---|
| 2026-08-24 | Prefixes (`ADR-005`) | `A-`, `O-`, `D-` are clean | `A-001`…`A-016` exist as audit findings | `agents/` takes `AG-`; the rest of the ruling stood |

The table is kept. A protocol that never fires is either perfect or unused, and
the difference matters.
