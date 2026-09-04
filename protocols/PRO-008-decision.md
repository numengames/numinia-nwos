---
id: "PRO-008"
uid: ""
title: "Decision Protocol — requesting approval, issuing rulings"
type: protocol
status: active
version: "3.0.0"
created: "2026-04-07T15:00:00Z"
updated: "2026-09-03T23:45:00Z"
author: "nimrod"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [approval, human-in-the-loop, security, protocol, rulings, falsifiability]
license: "CC0-1.0"
related: ["ADR-004", "ADR-005", "STD-001"]
---
# PRO-008 — Decision Protocol

> **Summary:** The two directions of the human-machine decision interface:
> how an agent requests approval, and how the Oracle issues a ruling that can
> be caught when wrong.
> **Epistemic:** What makes a decision checkable rather than merely obeyed.
> **Pragmatic:** Before any action needing human approval, and when issuing
> or executing a ruling.
> **Audience:** Agents · Oracles

---

# Part one · Requesting approval

Every approval request is a complete unit of information: the person deciding
knows exactly what will be done, why, and how carefully they need to think
about it. Without that structure the request becomes noise, and noise is
approved without understanding or refused out of fear.

## Approval types

| Type | When | Carries a command |
|---|---|---|
| **Execution** | before running a command with real effect | yes |
| **Design** | before implementing a visual or interaction change | no — a descriptive proposal |

## The request

```
APPROVAL REQUEST — Score {X}/10
Agent: {name} | Mission: {MIS-NNNN}      ← both mandatory
Context:     [two sentences: current state, why it arises now]
Action:      [what will be executed, exactly]
Epistemic:   [what we learn if executed]
Pragmatic:   [immediate impact and reversibility]
No decision: [what happens if no answer arrives]
Links:       [canonical web address of every document under review]
Score {X}/10 — [one sentence of justification]
[the exact command, if there is one]
Approve? Yes / No / Defer / Modify
```

A design request replaces *Action* with a proposal — a text mockup, a
description of the behaviour, or both — and *No decision* with the audience
that interacts with the element.

**Every artefact presented for a decision carries its canonical web address.**
Every document in the repository is navigable, so there is no excuse for
pointing a person at a filesystem path. One address per document, next to its
first mention. This applies to approval requests, review handoffs, mission
briefs awaiting signature, and any "look at this" moment. A review request
without its address forces the reader to reconstruct the agent's context,
which is the noise this protocol exists to remove.

## The score scale

| Score | Level | Expected response |
|---|---|---|
| 1–2 | routine — no approval required | — |
| 3–4 | operational — limited impact, reversible | 24h |
| 5–6 | tactical — moderate impact | 24h |
| 7–8 | strategic — affects architecture | 12h |
| 9 | systemic — canon, operator, security | immediate |
| 10 | foundational — irreversible, reputation, money | immediate, and a meeting |

**The score guides attention. It does not transfer responsibility.** The
agent informs and proposes; the person decides, always. A score 3 approved is
as much their decision as a score 9. The difference is how much thought it
deserves, not who makes it. No agent may modify this rule.

At score 7 or above the request is written as a document rather than a chat
message, and adds: the alternatives that were discarded and why, what a good
and a bad outcome would each reveal, the deferred impact at a day and a week,
and whether the action is reversible.

---

# Part two · Issuing a ruling that can be caught when wrong

> Every ruling states what would make it wrong, and the executor verifies that
> before executing.

A ruling asserts facts about the repository — what exists, what is unused,
what a file contains, what a figure measures. Those facts can be false, and a
ruling built on a false fact executes perfectly and produces the wrong result.

## The procedure

**1 · The issuer states the ruling's factual dependencies.** Not the
reasoning — the facts, in a form that can be checked. What would have to be
true in the repository for this to be the right call?

Weak: *use this prefix for agents.*
Strong: *use this prefix for agents; that prefix is unused in the corpus.*

The second names its own failure condition. The first cannot be checked at
all.

**2 · The issuer states what to do if a dependency is false.** Stop and report
is the default. Not "use your judgement" — the executor's judgement is what
the ruling replaced. An unverifiable ruling executed on the executor's
judgement is two decisions pretending to be one.

**3 · The executor verifies before executing, and shows the command.** Every
stated fact is measured, with the command that measured it in the report. A
fact accepted because it was asserted has not been verified.

**4 · If a dependency is false, stop before any file changes.** Report which
fact failed, what was measured instead, and whether it changes the ruling. It
often does not. Stopping is not a rejection of the ruling; it is the ruling
working.

**5 · The correction is recorded where the decision lives.** Both the original
ruling and the correction. A decision that hides what it cost is worth less
than one that shows it.

## What this is not

**Not a licence to relitigate.** The executor checks the ruling's stated
facts, not its reasoning or its priorities. If the facts hold, it executes —
including when it disagrees.

**Not a delay.** The verification budget is proportional to what the ruling
asserts, not to its importance. Most checks are a single search.

## When it applies

To any ruling that asserts a fact about the repository, which is nearly all of
them: this archive's decisions are almost always about its own state.

It does not apply to preference — one branch at a time, write in English, a
written summary before each pull request. Those assert nothing checkable and
need no condition.

## Record

Rulings that carried a condition and were caught by it are recorded in the
decision that issued them, with the fact asserted, the measurement that
contradicted it, and the outcome. A protocol that never fires is either
perfect or unused, and the difference matters.

## References

- `PRO-005` — escalation, when approval does not arrive in the expected time.
- `PRO-001` — session protocol.
