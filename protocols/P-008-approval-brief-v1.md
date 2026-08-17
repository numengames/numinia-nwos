---
id: "P-008"
title: "Approval Brief Protocol"
type: protocol
status: active
version: "1.1.0"
created: "2026-04-07T15:00:00Z"
updated: "2026-04-07T18:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [approval, human-in-the-loop, security, protocol]
license: "CC-BY-4.0"
---

# P-008 — Approval Brief Protocol

> **Summary:** Communication standard for approval requests from digital agents to biological agents.
> **Epistemic:** What principles govern the human–machine approval relationship in the CAO.
> **Pragmatic:** Exact format used by every digital agent before executing any action that requires human OK.
> **Audience:** Agents · Oracles

---

## Motivation

A digital agent asks for approval multiple times a day. Without structure, this becomes noise — the biological agent approves without understanding, or rejects out of fear of the unknown. Neither is a good response.

The goal is for **every approval request to be a complete unit of information**: the biological agent knows exactly what will be done, why, and how carefully they need to think about it.

This protocol is an operational wrapper over `APPROVAL-REQUEST-template.md` — the canonical template. For formal complex approvals (score ≥7), use the full template. For chat/Telegram approvals, use the compact format in this protocol.

---

## Approval types

| Type | When to use | Has command |
|------|-------------|:-----------:|
| **Execution** | Before executing a command with real effect | ✅ yes |
| **UX/UI Design** | Before implementing a visual or interaction change | ❌ no — descriptive proposal |

---

## Compact format — Execution (chat/Telegram)

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
━━━━━━━━━━━━━━━━━━━━━━━━
Score {X}/10 — [justification in one sentence]
[exact command if applicable]
Approve? Yes / No / Defer / Modify
```

## Compact format — UX/UI Design (chat/Telegram)

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
━━━━━━━━━━━━━━━━━━━━━━━━
Approve this design before implementation?
```

---

## Score scale

| Score | Level | Expected response time |
|-------|-------|----------------------|
| 1–2 | Routine — no approval required | — |
| 3–4 | Operational — limited impact, reversible | 24h |
| 5–6 | Tactical — moderate impact | 24h |
| 7–8 | Strategic — affects architecture | 12h |
| 9 | Systemic — canon / OPERATOR / security | Immediate |
| 10 | Foundational — irreversible / reputation / money | Immediate + meeting |

---

## Responsibility principle — locked in

> **The score guides the biological agent's attention — it does not exempt them from responsibility.**

The digital agent **informs** and **proposes**. The biological agent **decides**. Always.

A score 3 approved is as much the biological agent's responsibility as a score 9. The difference is how much cognitive energy the decision deserves, not who makes it.

This principle cannot be modified by any digital agent. Only the Oracle can change this protocol.

---

## Related protocols

- **APPROVAL-REQUEST-template.md** — canonical template for formal approvals (score ≥7)
- **P-005-escalation-v1.md** — if approval does not arrive within the expected time, escalate per P-005
- **P-007-context-load-v1.md** — if session context load is ≥7, warn before requesting complex approvals

---

## Version history

- v1.0.0 (2026-04-07) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).

---

*Nimrod 🗡️ — Guardian of the Gates — Numen Games · v1.1.0 · 2026-04-07*
