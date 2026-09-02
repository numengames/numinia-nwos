---
id: "MIS-043"
uid: ""
title: "Complete reading of the Numinia RPG Manual"
status: todo
priority: "high"
effort: "M"
guild: "Exegetes"
territory: "TBA"
type_execution: "digital"
assigned_to: null
completed: null

type: mission
version: "1.3.0"
created: "2026-04-07T05:58:49Z"
created_source: "git:428349f"
created_confidence: inferred
updated: "2026-09-02T01:48:11+02:00"
owner: "oracle"
license: "CC0-1.0"
---
# MIS-043 — Complete reading of the Numinia RPG Manual

> **Summary:** Read the complete Numinia RPG manual (~21,500 lines in v0.6.0), to have full lore context before acting as Procyon.
> **Epistemic:** The manual contains the complete cosmology of Numinia. Without it, the lore is fragmentary.
> **Pragmatic:** Necessary context for Nimrod to act as Procyon in sessions.
> **Audience:** Agents · Oracles

## Story

As Nimrod, I want to read the complete Numinia RPG manual (~21,500 lines in v0.6.0), to have full lore context before acting as Procyon.

## Acceptance criteria

- [ ] RPG manual read completely (`numengames/numinia-lore:seminal/Numinia_Manual_del_juego_de_rol_v0_6_0.md` — canonical since 2026-08-17; supersedes the old ~4,600-line copy)
- [ ] Summary of key findings documented
- [ ] Procyon context identified and recorded in MEMORY.md
- [ ] Open lore questions registered

## Epistemic value

The manual contains the complete cosmology of Numinia. Without it, the lore is fragmentary.

## Pragmatic value

Necessary context for Nimrod to act as Procyon in sessions.

## Notes

First ~100 lines read on 2026-04-02. ~4,500 lines pending.

## Version history

- v1.0.0 (2026-04-04) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
- v1.2.0 (2026-08-17) — Manual source updated to v0.6.0 in `numinia-lore` (see MIS-085, the Codex Reader mission that publishes it).
- v1.3.0 (2026-09-02) — context card completed from the brief's own Story/Epistemic/Pragmatic text; inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 2.

## Status check — 2026-09-02

*Read against `aebcf54` during the missions/ normalisation (lot 2). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** 2026-04 import; v1.2.0 2026-08-17 repointed the manual to numinia-lore v0.6.0. 'Nimrod acting as Procyon' — Nimrod retired; Procyon is now an agent definition (agents/procyon). MEMORY.md never existed here.
- **Recommendation:** Keep todo, re-assign the reading to procyon's operator when it is activated; replace 'MEMORY.md' with agents/procyon/. Not cancellable: the lore reading is still the prerequisite for the Codex Reader (MIS-085).
