---
id: "MIS-046"
uid: ""
title: "READMEs for numengames org repos"
status: todo
priority: "medium"
effort: "M"
guild: "Exegetes"
territory: "TBA"
type_execution: "digital"
assigned_to: null
completed: null

type: mission
version: "1.2.0"
created: "2026-04-07T05:58:49Z"
created_source: "git:428349f"
created_confidence: inferred
updated: "2026-09-02T01:48:11+02:00"
owner: "oracle"
license: "CC0-1.0"
---
# MIS-046 — READMEs for numengames org repos

> **Summary:** Understand what each repo does, to navigate the code without asking.
> **Epistemic:** Empty or outdated READMEs are active documentation debt.
> **Pragmatic:** Any external collaborator can orient themselves in minutes.
> **Audience:** Agents · Oracles

## Story

As a visitor to the numengames org on GitHub, I want to understand what each repo does, to navigate the code without asking.

## Acceptance criteria

- [ ] README updated in: numengames-web, numinia-oncyber, alchemists-tower
- [ ] OS→Model→Narrative triad in each README
- [ ] CC0/MIT license explicitly declared
- [ ] Links between related repos

## Epistemic value

Empty or outdated READMEs are active documentation debt.

## Pragmatic value

Any external collaborator can orient themselves in minutes.

## Version history

- v1.0.0 (2026-04-04) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
- v1.2.0 (2026-09-02) — context card completed from the brief's own Story/Epistemic/Pragmatic text; inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 2.

## Status check — 2026-09-02

*Read against `aebcf54` during the missions/ normalisation (lot 2). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** 2026-04 import, no commit. Targets numengames-web, numinia-oncyber, alchemists-tower READMEs. MIS-103 (org repo inventory, todo) covers the whole organisation.
- **Recommendation:** Freeze as superseded by MIS-103 — one mission for the org's repos, not two. Merge its three named repos into MIS-103's inventory list.
