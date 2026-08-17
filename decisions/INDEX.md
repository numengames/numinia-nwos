---
id: "decisions-index"
title: "Decisions — Index"
type: adr
status: active
version: "1.2.0"
created: "2026-04-06T00:00:00Z"
updated: "2026-04-07T18:45:00Z"
author: "nimrod"
owner: "oracle"
tags: [decisions, index, adr]
license: "CC-BY-4.0"
---
# Decisions — Crystallized Will

> **Summary:** NWOS system document — Decisions — Index.
> **Epistemic:** What was decided, why, and what alternatives were discarded.
> **Pragmatic:** Consult before making decisions in the same domain.
> **Audience:** Agents · Oracles

---

Architectural Decision Records (ADR) of the Narrative Work OS. These records are:
- **Append-only** — never delete
- **Supersedable** — a new ADR can supersede a previous one, but the original remains
- **Permanent** — even cancelled decisions stay for historical record

## Active decisions

| ID | Decision | Status | Date |
|----|----------|--------|------|
| ADR-001 | GitHub as Archive Summa | ✅ Active | 2026-04-06 |
| ADR-002 | Markdown as universal format | ✅ Active | 2026-04-06 |
| DEC-001 | Self-hosting over SaaS | ✅ Active | 2026-04-03 |
| DEC-002 | Build in public with CC0 license | ✅ Active | 2026-04-02 |
| DEC-003 | Arbitrum as Numinia blockchain | ⚠️ Provisional | 2026-04-05 |
| DEC-004 | Hybrid CAO architecture | ✅ Active | 2026-04-05 |
| DEC-005 | pablofm.com as public CAO portal | ✅ Active | 2026-04-03 |
| DEC-006 | English as official NWOS repo language | ✅ Active | 2026-04-07 |

## How to create an ADR

1. Copy the frontmatter template from any existing ADR
2. Assign the next sequential number
3. Fill context, decision, and consequences
4. Open PR with label `decision`
5. Oracle approves and merges

---

## Version history

- v1.0.0 (2026-04-06) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
