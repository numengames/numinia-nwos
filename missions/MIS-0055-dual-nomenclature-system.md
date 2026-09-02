---
id: "MIS-055"
uid: ""
title: "Dual Nomenclature System — Narrative Dial + Gamification Dial"
status: todo
priority: "critical"
effort: "L"
guild: "Exegetes"
territory: "CAO"
type_execution: "hybrid"
assigned_to: null
started: "2026-04-07T00:00:00Z"
completed: null

type: mission
version: "1.3.0"
created: "2026-04-07T06:48:45Z"
created_source: "git:9cdd2d2"
created_confidence: inferred
updated: "2026-09-02T01:48:11+02:00"
author: "pablo-fm"
owner: "oracle"
requested_by: "oracle"
tags: [cao, nwos, nomenclature, gamification, narrative, system-design]
license: "CC0-1.0"
---
# MIS-055 — Dual Nomenclature System

> **Summary:** Be able to choose the narrative and gamification level of my implementation, so the system speaks my language without losing any functionality.
> **Epistemic:** The dual nomenclature system demonstrates that NWOS is not a product with a fixed identity — it is an adaptable framework whose value does not depend on the language in which it is expressed. This resolves Tension #1 of the Wardley Map.
> **Pragmatic:** - Unlocks ICPs that rejected NWOS due to narrative vocabulary - Allows presenting the system to corporate executives without loss of functionality - The Narrative Dial turns narrative into a feature, not a requirement - Opens the traditional SME market (10% current success → scale potential)
> **Audience:** Agents · Oracles

## Origin

Emerged in the Dark Council / El Velo session — 2026-04-06.

Consensus between digital and biological agents: between the narrative layer and the operational layer there is a first-impression problem. The Numinia narrative (level 10/10) acts as an adoption barrier for organizations that only want the operating system, not the narrative world.

**Agreed solution:** Two independent adjustment dials per organization.

## Story

As an organization that wants to adopt NWOS, I want to be able to choose the narrative and gamification level of my implementation, so the system speaks my language without losing any functionality.

## The two dials

### 🎭 Narrative Dial (1–10)
Controls the vocabulary and semantic identity of the system.

- **1** = Pure business language. Projects, departments, corporate roles.
- **5** = Mixed language. Soft metaphors without explicit lore.
- **10** = Full Numinia. Guilds, Oracles, missions, the Veil.

### 🎮 Gamification Dial (1–10) — 5 real thresholds
Controls game mechanics, progression, and reward.

Gamification has qualitative jumps, not a smooth curve. 5 named thresholds defined; intermediate levels are unnamed blends.

| Level | Name | What changes |
|-------|------|-------------|
| **1** | None | OS only. No mechanics of any kind. |
| **3** | Visibility | Visible progress. Dashboards, completion %, streaks. |
| **5** | Achievement | Achievements, badges, recognized milestones. The system celebrates. |
| **7** | Progression | Ranks, trajectory, accumulated reputation. The system remembers and rewards history. |
| **10** | Full Economy | Tokens, Prism Cells, real rewards. The system has economic weight. |

> External face: 5 named thresholds (more understandable for clients).
> Internally: mapped to 1-10 scale for granular technical configuration.

> **Scale decision (Oracle, 2026-08-18):** the external selectors are **1–5**
> for BOTH dials — five named levels each, no unnamed blends exposed. Each
> external level maps internally to the 1-10 config scale as 1·3·5·7·10.
> Implemented as the interactive configurator on `/idioma` (numinia.org).

> **Numinia** = Narrative 10 · Gamification in design (target: 10)
> **Standard Corp** = Narrative 1 · Gamification 1–3

## Acceptance criteria

- [ ] Complete equivalence table: Numinia vocabulary ↔ business vocabulary for all 5 levels
- [ ] Level 1 (Business) nomenclature proposal documented and approved by Pablo
- [ ] Level 5 (Mixed) nomenclature proposal documented
- [x] Public page `/idioma` (now on numinia.org) explaining the system, with
      interactive 1–5 selectors for both dials (2026-08-18)
- [ ] Decision DEC-006 created once the model is validated
- [ ] Integrate in `/nwos` as an adaptability feature

## Equivalences — Narrative Dial

### Agents / Roles

| Numinia (10) | Mixed (5) | Business (1) |
|---|---|---|
| Oracle | Founder | Executive / C-Suite |
| Sentinel | Operations Lead | Head of Operations |
| Alchemist | Innovation Lead | CTO / Head of Product |
| Exegete | Knowledge Lead | Chief of Staff / Head of Content |
| Procurator | Business Lead | COO / Head of Business |
| Procyon | Intelligence System | AI Orchestration Layer |
| Nomad | New member | Onboarding |
| Citizen | Member | Team Member |
| Pilgrim | Senior | Senior Member |
| Vernacular | Expert | Expert / Principal |
| Archon | Leader | Lead / Director |
| Digital agent | AI agent | AI Agent / Digital Coworker |

### Structures

| Numinia (10) | Mixed (5) | Business (1) |
|---|---|---|
| Guild | Team | Department / Team |
| Faction | Area | Division |
| CAO | Operations Center | Operations Center |
| Blueprint | System map | System Blueprint |
| Archive | Knowledge base | Knowledge Base |
| Decision / Milestone | Architectural decision | Decision Record |
| Report | Report | Report |
| Protocol | Procedure | Process / SOP |

### Actions / Rituals

| Numinia (10) | Mixed (5) | Business (1) |
|---|---|---|
| Mission | Initiative | Project / Initiative |
| Daily | Daily | Daily Standup |
| Dark Council | Weekly strategy | Weekly Strategy |
| Lunar Coven | Creative session | Creative Session |
| Session Zero | Onboarding | Onboarding Workshop |
| Adventure | Narrative project | Campaign / Program |
| Season | Product cycle | Season / Quarter |

### System / Product

| Numinia (10) | Mixed (5) | Business (1) |
|---|---|---|
| Narrative Work OS | Narrative Work OS | Work Operating System |
| The Veil | The system | The System |
| Numinia | The city | The Organization |
| Prism Cell | Membership token | Membership Token |
| Seal | Certificate | Badge / Certificate |

## Epistemic value

The dual nomenclature system demonstrates that NWOS is not a product with a fixed identity — it is an adaptable framework whose value does not depend on the language in which it is expressed. This resolves Tension #1 of the Wardley Map.

## Pragmatic value

- Unlocks ICPs that rejected NWOS due to narrative vocabulary
- Allows presenting the system to corporate executives without loss of functionality
- The Narrative Dial turns narrative into a feature, not a requirement
- Opens the traditional SME market (10% current success → scale potential)

## Pending decision

Once validated, create **DEC-006 — Dual Nomenclature System** modifying the NWOS architecture to include the two dials as implementation configuration.

## Notes

The Gamification Dial will be discussed in a dedicated later session.
The Narrative Dial is the immediate priority — resolves the most urgent adoption problem.

## Version history

- v1.0.0 (2026-04-07) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
- v1.2.0 (2026-08-18) — External scale fixed at 1–5 per dial (internal map
  1·3·5·7·10); `/idioma` gets the interactive configurator. A token-free demo
  workspace is registered separately as MIS-090.
- v1.3.0 (2026-09-02) — context card completed from the brief's own Story/Epistemic/Pragmatic text; inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 2.

*Nimrod 🗡️ + Team — 2026-04-07*

## Board triage — 2026-08-25

Returned from `in-progress` to `backlog` by the Oracle, in the triage of the 111
missions. **Nothing about the brief changed and the work is still wanted** —
what changed is the claim that it was underway.

- **Category:** D — stale. Last own commit 2026-08-18. 1/6 criteria.
- **Signal, not proof:** this mission was assigned to an agent whose identity is
  in question (`D-026`, `D-027`). That is context; the evidence for this move is
  the absence of its own commit, not who it was assigned to.
- **Signed by:** Oracle, 2026-08-25.

## Status check — 2026-09-02

*Read against `aebcf54` during the missions/ normalisation (lot 2). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** Triaged 2026-08-25 (D, stale), 1/6 — but the one tick is substantive: /idioma configurator live on numinia.org (2026-08-18). Cited by 18 (9 files). Assigned nimrod (retired). BLU-007 (dual nomenclature) is its blueprint.
- **Recommendation:** Unassign; keep todo. The remaining criteria (equivalence tables approved, DEC, /nwos integration) are Oracle work. This is the most valuable open mission of the lot; do not freeze.
