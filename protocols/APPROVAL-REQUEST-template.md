---
id: "APR-TEMPLATE"
registration: exempt
registration_exemption: "apparatus-of-registered-document"
registration_reason: >
  The template P-008-approval-brief-v1.md uses. Apparatus belongs to its
  parent document, not to the series. See S-001 §5.0.
title: "Approval Request — Template"
type: template
status: active
version: "1.1.0"
created: "2026-04-07T12:56:00Z"
updated: "2026-04-07T18:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [template, approval, human-in-the-loop]
license: "CC-BY-4.0"
---
# Template — Approval Request

> **Summary:** Reusable template for creating approval request documents.
> **Epistemic:** What you learn by reading this document.
> **Pragmatic:** What you can do with this document.
> **Audience:** Agents

---

*Copy this template whenever you need human approval. Fill in all sections.*

---

```markdown
---
id: "APR-{YYYYMMDD}-{NNN}"
type: approval-request
agent: "{agent-name}"
mission: "{MIS-NNNNN or N/A}"
score: {1-10}
created: "{YYYY-MM-DDTHH:MM:SSZ}"
status: pending
oracle_response: ""
---

## 🔔 APPROVAL REQUEST

**Agent:** {name} | **Mission:** {MIS-NNNNN} | **Score:** {X}/10

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

**Scale:**
- 1-2: Routine — no approval required
- 3-4: Operational — limited impact, reversible (24h)
- 5-6: Tactical — moderate impact (24h)
- 7-8: Strategic — affects architecture (12h)
- 9: Systemic — canon / OPERATOR / security (immediate)
- 10: Foundational — irreversible / reputation / money (immediate + meeting)

**Score justification:** {One sentence explaining why this number.}

---

**Do you approve?**
- [ ] Yes — I proceed
- [ ] No — I document in decisions/ and archive
- [ ] Defer until: {date}
- [ ] Modify: {instructions}
```

---

## Completed example — score 8/10

```markdown
---
id: "APR-20260407-001"
type: approval-request
agent: "nimrod"
mission: "MIS-00057"
score: 8
created: "2026-04-07T12:56:00Z"
status: approved
oracle_response: "Approved — go"
---

## 🔔 APPROVAL REQUEST

**Agent:** Nimrod | **Mission:** MIS-00057 | **Score:** 8/10

---

### MINIMUM CONTEXT

The current architecture organizes agents under `agents/guilds/`. This caused a bug:
Nimrod exists in two simultaneous paths (sentinels/ and centinelas/ — the same guild in
two languages). The solution is to move agents to an independent root layer.

---

### PROPOSED ACTION

Migrate all agent files to `agents/{agent-name}/` and create `guilds/` with only
charter.md and roster.md per guild. Update P-001, README and agents/INDEX.md.

**Discarded alternatives:**
- Keep the current structure — perpetuates the bug and violates the conceptual model
- Only eliminate the duplication — a patch without resolving the root cause

---

### EPISTEMIC VALUE

- **If it goes well:** Confirms that the flat architecture scales to multi-guild without duplication
- **If it goes wrong:** Reveals hidden dependencies in P-001 or tools that assume the current path
- **If not executed:** The bug grows with every new agent that gets activated

---

### PRAGMATIC VALUE

- **Immediate impact:** ~15 files moved, 3 documents updated
- **Deferred impact:** Any new agent is created in the correct structure from the start
- **Reversibility:** Reversible with git revert, but requires notifying active agents

---

### COST OF NOT DECIDING

The sentinels/centinelas bug persists. Any new agent inherits the same confusion.
When there are 5+ active agents, the architectural debt will be much more expensive to resolve.

---

### IMPORTANCE SCORE: 8/10

Affects the startup protocol (P-001) of all future agents and encodes
the agent-guild semantic distinction that is central to the NWOS model.

---

**Do you approve?**
- [x] Yes — I proceed
```

---

## Version history

- v1.0.0 (2026-04-07) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
