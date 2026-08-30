---
id: "decisions-index"
uid: ""
title: "Decisions — Index"
type: adr
status: active
version: "1.7.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-08-28T09:33:53Z"
author: "nimrod"
owner: "oracle"
tags: [decisions, index, adr]
license: "CC-BY-4.0"
registration: exempt
registration_reason: "singular document, not a numbered series"
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
| ADR-003 | numinia-nwos is the origin of the engineering standards | ✅ Active | 2026-08-20 |
| ADR-004 | Identifiers are opaque, sequential and permanent | ✅ Active | 2026-08-24 |
| ADR-005 | Registration prefixes: `S-` stays with standards, agents take `AG-` | ✅ Active | 2026-08-25 |
| ADR-023 | Four terms, two pairs: germinal motive / operating system, regulatory / functional model | ✅ Active | 2026-08-25 |
| ADR-024 | English is the base language of every summa document; C-005 §5 amended | ✅ Active | 2026-08-27 |
| ADR-026 | Agent definitions are operational documentation, and they are CC0 | ✅ Active | 2026-08-28 |
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

> Identifier rules are recorded in **ADR-004**: `<PREFIX>-<NNN>`, opaque, never
> reused, never renumbered. `ADR-` is the canonical prefix for this series —
> the existing `DEC-NNN` documents keep their identifiers permanently, but no
> new `DEC-` is created.

---

## Version history

- v1.0.0 (2026-04-06) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
- v1.3.0 (2026-08-20) — ADR-003 registered: provenance of the engineering standards (resolves CON-003).
- v1.4.0 (2026-08-24) — ADR-004 registered: identifier convention; `ADR-` declared canonical over `DEC-`.
- v1.5.0 (2026-08-25) — ADR-005 registered: prefix ruling. `agents/` takes `AG-`, not `A-`; `S-` stays with `standards/` and canon renumbers to `C-NNN` inside MIS-109.
- v1.6.0 (2026-08-27) — ADR-024 registered: English is the base language of every summa document; C-005 §5 amended (canon-change). ADR-023 backfilled into the table — it was on disk since 2026-08-25 but never listed here.
- v1.7.0 (2026-08-28) — ADR-026 registered: agent definitions are operational documentation and are CC0; `agents/**` leaves the reserved annotation (LD-001 made the reservation unenforceable). C-005 §1 amendment owed, tracked as D-038.
