---
id: "PRO-008"
title: "Decision Protocol — requesting approval, issuing rulings"
type: protocol
status: active
version: "2.0.0"
created: "2026-04-07T15:00:00Z"
updated: "2026-08-31T18:00:00+02:00"
author: "nimrod"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [approval, human-in-the-loop, security, protocol, rulings, falsifiability]
license: "CC-BY-4.0"
related: ["ADR-004", "ADR-005", "S-001"]
---
# PRO-008 — Decision Protocol

> **Summary:** The two directions of the human–machine decision interface.
> §1 agent → Oracle: how approval is requested. §2 Oracle → agent: how a ruling
> is issued so it can be caught when wrong. §3 the formal template.
> **Epistemic:** What principles govern the human–machine approval relationship
> in the CAO, and what makes a decision checkable rather than merely obeyed.
> **Pragmatic:** §1 before any action needing human OK; §2 when issuing or
> executing a ruling; §3 for formal approvals (score ≥7).
> **Audience:** Agents · Oracles

---

# §1 · Requesting approval (agent → Oracle)

## Motivation

A digital agent asks for approval multiple times a day. Without structure, this
becomes noise — the biological agent approves without understanding, or rejects
out of fear of the unknown. Neither is a good response.

The goal is for **every approval request to be a complete unit of information**:
the biological agent knows exactly what will be done, why, and how carefully
they need to think about it.

For chat/Telegram approvals, use the compact formats below. For formal complex
approvals (score ≥7), use the full template in §3.

## Approval types

| Type | When to use | Has command |
|------|-------------|:-----------:|
| **Execution** | Before executing a command with real effect | ✅ yes |
| **UX/UI Design** | Before implementing a visual or interaction change | ❌ no — descriptive proposal |

## Compact format — Execution

```
🔔 APPROVAL REQUEST — Score {X}/10
━━━━━━━━━━━━━━━━━━━━━━━━
Agent: {name} | Mission: {MIS-NNN} ← MANDATORY
━━━━━━━━━━━━━━━━━━━━━━━━
Context:    [2 sentences — current state / why it arises now]
Action:     [What will be executed exactly]
Epistemic:  [What we learn if executed]
Pragmatic:  [Immediate impact + reversibility]
No decision: [What happens if no response]
Links:      [canonical numinia.org URL of every document under review]
━━━━━━━━━━━━━━━━━━━━━━━━
Score {X}/10 — [justification in one sentence]
[exact command if applicable]
Approve? Yes / No / Defer / Modify
```

## Compact format — UX/UI Design

```
🎨 UX/UI DESIGN APPROVAL
━━━━━━━━━━━━━━━━━━━━━━━━
Agent: {name} | Mission: {MIS-NNN} ← MANDATORY
━━━━━━━━━━━━━━━━━━━━━━━━
Summary:    [What visual/interactive change is proposed]
Epistemic:  [Why this design — what principle justifies it]
Pragmatic:  [What the user experiences if approved]
Audience:   [Who interacts with this element]
Proposal:
  [Text mockup, behavior description, or both]
Links:      [canonical numinia.org URL of every document under review]
━━━━━━━━━━━━━━━━━━━━━━━━
Approve this design before implementation?
```

## Canonical URL rule (Oracle order, 2026-08-18)

**Every artifact presented to a biological agent for review or decision MUST
carry its canonical numinia.org URL.** Since MIS-087, every .md in the repo is
navigable — in its family section (missions, decisiones, planos, audits) or in
the `/corpus` catalog — so there is no excuse for pointing a human at a
filesystem path.

Why it is locked in: the L3 layer works when biological agents decide on the web
surface and digital agents work on the files — the URL is the bridge between both
realities. A review request without its URL forces the human to reconstruct the
digital agent's context, which is exactly the noise this protocol exists to
eliminate.

Scope: approval requests (both formats above), review handoffs, mission briefs
awaiting signature, and any "look at this" moment in chat. One URL per document
under review, next to its first mention.

## Score scale

| Score | Level | Expected response time |
|-------|-------|----------------------|
| 1–2 | Routine — no approval required | — |
| 3–4 | Operational — limited impact, reversible | 24h |
| 5–6 | Tactical — moderate impact | 24h |
| 7–8 | Strategic — affects architecture | 12h |
| 9 | Systemic — canon / OPERATOR / security | Immediate |
| 10 | Foundational — irreversible / reputation / money | Immediate + meeting |

## Responsibility principle — locked in

> **The score guides the biological agent's attention — it does not exempt them
> from responsibility.**

The digital agent **informs** and **proposes**. The biological agent **decides**.
Always.

A score 3 approved is as much the biological agent's responsibility as a score 9.
The difference is how much cognitive energy the decision deserves, not who makes
it.

This principle cannot be modified by any digital agent. Only the Oracle can
change this protocol.

---

# §2 · Issuing a ruling with a condition for being wrong (Oracle → agent)

> Every ruling states what would make it wrong, and the executor verifies that
> before executing.

## Why this exists

On 2026-08-24 the Oracle ruled on registration prefixes and wrote:

> *"If you think the bundled figure was measuring something I have misread — for
> example if `A-`/`O-`/`D-` collide with something I do not know about — say so
> before executing. Otherwise proceed."*

The ruling stated that `A-`, `O-` and `D-` were clean. Verification found `A-`
was not: `A-001`…`A-016` already existed as numbered findings inside two audits,
cited from a different document than the one defining them.

**The ruling was wrong on a point of fact, and its own instruction caught it
before it was executed.** Had the same ruling been issued as a plain instruction,
the agent would have registered `agents/` as `A-NNN` and the ambiguity would have
been permanent — a rename after the first identifier is issued costs the whole
series.

> A ruling issued with a condition for being wrong is what caught it.

That sentence is method, not a note on one decision.

## The procedure

### 1 · The issuer states the ruling's factual dependencies

Not the reasoning — the **facts** the ruling rests on, in a form that can be
checked. Concretely: *what would have to be true in the repository for this to be
the right call?*

Weak: *"use `AG-` for agents."*
Strong: *"use `A-` for agents; **`A-` is unused in the corpus**."*

The second names its own failure condition without effort. The first cannot be
checked at all.

### 2 · The issuer states what to do if a dependency is false

**"Stop and report" is the default.** Not "use your judgement", not "adapt" — the
executor's judgement is what the ruling replaced. An unverifiable ruling executed
on the executor's judgement is two decisions pretending to be one.

### 3 · The executor verifies before executing, and shows the command

Every stated fact is measured, with the command that measured it in the report. A
fact accepted because it was asserted has not been verified.

```bash
# the check that caught A-
grep -rn "\bA-0[0-9][0-9]\b" --include='*.md' . | grep -v '^./web/'
```

### 4 · If a dependency is false, stop — before any file changes

Report which fact failed, what was measured instead, and whether it changes the
ruling. **It often does not.** In the `A-` case the arithmetic held entirely —
121 citations to avoid 40 was still the wrong trade — and only one prefix changed.

**Stopping is not a rejection of the ruling.** It is the ruling working.

### 5 · The correction is recorded where the decision lives

Both the original ruling and the correction, in the ADR or the report. A decision
that hides what it cost is worth less than one that shows it.

## What this is not

**Not a licence to relitigate.** The executor checks the ruling's stated facts,
not its reasoning or its priorities. If the facts hold, it executes — including
when it disagrees. `ADR-005` was executed with its central trade-off intact; what
changed was one prefix, on a fact.

**Not a delay.** The `A-` check was one `grep`. The verification budget is
proportional to what the ruling asserts, not to its importance.

## When it applies

Any ruling that asserts a fact about the repository — coverage figures,
collisions, what exists, what is unused, what a file contains. Which is nearly all
of them: the archive's decisions are almost always about its own state.

It does not apply to preference: *"one branch at a time"*, *"English"*,
*"explanatory HTML before each PR"*. Those assert nothing checkable and need no
condition.

## Record

Rulings that carried a condition and were caught by it:

| Date | Ruling | Fact asserted | Measured | Outcome |
|---|---|---|---|---|
| 2026-08-24 | Prefixes (`ADR-005`) | `A-`, `O-`, `D-` are clean | `A-001`…`A-016` exist as audit findings | `agents/` takes `AG-`; the rest of the ruling stood |
| 2026-08-31 | Protocol merge 15→7 (MIS-127) | "no renumbering, with the agreed nomenclature" | `protocols/` compliance with `PRO-NNN` was 0/13; two guards disagreed on the prefix | Ruling clarified to (a): rename to `PRO-`, numbers and gaps kept |

The table is kept. A protocol that never fires is either perfect or unused, and
the difference matters.

---

# §3 · Formal approval request — template

*Copy this whenever a formal approval is needed (score ≥7). Fill in all sections.*

```markdown
---
id: "APR-{YYYYMMDD}-{NNN}"
type: approval-request
agent: "{agent-name}"
mission: "{MIS-NNN or N/A}"
score: {1-10}
created: "{YYYY-MM-DDTHH:MM:SSZ}"
status: pending
oracle_response: ""
---

## 🔔 APPROVAL REQUEST

**Agent:** {name} | **Mission:** {MIS-NNN} | **Score:** {X}/10

---

### MINIMUM CONTEXT
> What you need to know to not be flying blind.

{2-4 sentences. Current state / why it arises now / what triggered it.}

---

### PROPOSED ACTION

{Exact description of what will be executed. No ambiguity.}

**Discarded alternatives:**
- {Option A discarded — why}
- {Option B discarded — why}

---

### EPISTEMIC VALUE
> What do we learn if executed?

- **If it goes well:** {validated hypothesis / confirmed knowledge}
- **If it goes wrong:** {what it reveals about the system}
- **If not executed:** {what remains unknown}

---

### PRAGMATIC VALUE
> What real-world impact does it have?

- **Immediate impact:** {changes to files / systems / people}
- **Deferred impact:** {consequences at 24h / 1 week}
- **Reversibility:** {reversible | partially reversible | irreversible}

---

### PRACTICAL EXAMPLE *(omit if the action is obvious)*

{A concrete case where this makes a difference.}

---

### COST OF NOT DECIDING

{What happens if there is no response within 48h?}

---

### IMPORTANCE SCORE: {X}/10

**Score justification:** {One sentence explaining why this number.}

---

**Do you approve?**
- [ ] Yes — I proceed
- [ ] No — I document in decisions/ and archive
- [ ] Defer until: {date}
- [ ] Modify: {instructions}
```

### Completed example — score 8/10

```markdown
---
id: "APR-20260407-001"
type: approval-request
agent: "nimrod"
mission: "MIS-057"
score: 8
created: "2026-04-07T12:56:00Z"
status: approved
oracle_response: "Approved — go"
---

## 🔔 APPROVAL REQUEST

**Agent:** Nimrod | **Mission:** MIS-057 | **Score:** 8/10

### MINIMUM CONTEXT

The current architecture organizes agents under `agents/guilds/`. This caused a
bug: Nimrod exists in two simultaneous paths (sentinels/ and centinelas/ — the
same guild in two languages). The solution is to move agents to an independent
root layer.

### PROPOSED ACTION

Migrate all agent files to `agents/{agent-name}/` and create `guilds/` with only
charter.md and roster.md per guild. Update the session protocol, README and
agents/INDEX.md.

**Discarded alternatives:**
- Keep the current structure — perpetuates the bug and violates the conceptual model
- Only eliminate the duplication — a patch without resolving the root cause

### EPISTEMIC VALUE

- **If it goes well:** Confirms that the flat architecture scales to multi-guild without duplication
- **If it goes wrong:** Reveals hidden dependencies in the startup protocol or tools that assume the current path
- **If not executed:** The bug grows with every new agent that gets activated

### PRAGMATIC VALUE

- **Immediate impact:** ~15 files moved, 3 documents updated
- **Deferred impact:** Any new agent is created in the correct structure from the start
- **Reversibility:** Reversible with git revert, but requires notifying active agents

### COST OF NOT DECIDING

The sentinels/centinelas bug persists. Any new agent inherits the same confusion.
When there are 5+ active agents, the architectural debt will be much more
expensive to resolve.

### IMPORTANCE SCORE: 8/10

Affects the startup protocol of all future agents and encodes the agent-guild
semantic distinction that is central to the NWOS model.

**Do you approve?**
- [x] Yes — I proceed
```

---

## Related protocols

- **PRO-005** — if approval does not arrive within the expected time, escalate
- **PRO-001 §2** — if session context load is ≥7, warn before requesting complex approvals

---

## Version history

- v1.0.0 (2026-04-07) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
- v1.2.0 (2026-08-18) — Canonical URL rule: every artifact under review carries its numinia.org URL (Oracle order; enabled by MIS-087's full mirror). `Links:` line added to both compact formats.
- v2.0.0 (2026-08-31) — **Merged.** Absorbs `P-012` (ruling with a condition) as §2 and `APPROVAL-REQUEST-template.md` as §3 — the template's own frontmatter already declared this document its parent (`apparatus-of-registered-document`, S-001 §5.0). The protocol now covers both directions of the decision interface: requesting and issuing. Renamed `P-008` → `PRO-008` per ADR-005. MIS-127.
