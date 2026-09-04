---
# CORE — the ten fields the build verifies.
id: "MIS-149"
uid: ""
title: "Publish the Numinia agent roster as an organizational RPG directory"
status: todo
priority: medium
effort: M
guild: "Alchemists"
territory: "Archive"
type_execution: hybrid
assigned_to: "ursa"
completed: null

type: mission
version: "1.0.0"
created: "2026-09-03T00:00:00Z"
created_source: "git:pending"
created_confidence: inferred
updated: "2026-09-03T00:00:00Z"
author: "ursa"
owner: "oracle"
tags: [agents, web, roster, public-interface]
license: "CC0-1.0"

requires_oracle_approval: true
paths: [missions/MIS-0149-agent-roster-page.md, web/src/pages/agent.astro, web/src/views/AgentView.astro]
---
# MIS-149 — Publish the Numinia agent roster as an organizational RPG directory

> **Summary:** Create the public `/agent/` page as an organizational “who we are” directory for the biological and digital agents of Numinia.
> **Epistemic:** Establish how the canonical agent definitions become a legible public interface without changing their authority or identity documents.
> **Pragmatic:** Visitors can understand what each agent does, when to work with it, and how the biological and digital layers cooperate.
> **Audience:** Oracles · Agents · Public readers

## Scope

Only the Numinia web viewer and this mission record:

- `web/src/pages/agent.astro`
- `web/src/views/AgentView.astro`
- `missions/MIS-0149-agent-roster-page.md`

The page must use the repository’s existing layout, global design tokens, fonts, navigation and icon system. It may introduce page-local styles and client-side interaction in `AgentView.astro`.

The public page covers:

- the biological agent / Oracle layer;
- the seven active digital agents in `agents/INDEX.md`;
- each agent’s role, routing domain and canonical specialization;
- links to authoritative agent documents where appropriate;
- the BOOT → EXECUTE → COMMIT operating cycle.

### Out of scope

- Changes to `agents/**`, `canon/**`, governance, role definitions or agent identity.
- New external services, databases, authentication or CMS integration.
- Invented operational metrics presented as factual data.
- Deployment or publication outside the repository.

## Acceptance criteria

- [ ] `web/src/pages/agent.astro` resolves `/agent/` through the existing layout without a new route architecture.
- [ ] The built page contains exactly seven active digital-agent cards matching the current roster in `agents/INDEX.md`: Ursa, Byblos, Antunj, Lexa, Senet, Procyon and Doulos.
- [ ] The page contains a distinct biological-agent / Oracle section explaining authority, intuition, tacit knowledge and approval.
- [ ] Each digital-agent card exposes, at minimum, the canonical name, primary role, routing/use-when domain and canonical specialties; no card contradicts `agents/*/AGENT.yaml` or `SOUL.md`.
- [ ] A visitor can open a detailed profile for each digital agent without a page reload and close it with a visible control, backdrop click and Escape.
- [ ] A visitor can filter the roster without a page reload and restore the full roster.
- [ ] The page is keyboard navigable with visible focus states and has no horizontal overflow at a 390px viewport.
- [ ] `npm run build` succeeds from `web/`.
- [ ] `npm run check:responsive` is executed and its result is recorded. If the environment lacks Chromium, the limitation is recorded rather than hidden.
- [ ] The mission remains limited to the paths listed in Scope.

## Verification

```bash
cd web
npm ci --include=dev
npm run build
npm run check:responsive
```

When a Chromium-compatible browser is available, additionally verify `/agent/`, the seven-card count, opening and closing Ursa’s profile, filtering, JavaScript console errors and 390px horizontal overflow.

## Closure

*(Fill when the mission closes. Do not edit Scope or Acceptance criteria to match the outcome.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** YYYY-MM-DD · **by:** agent-id
