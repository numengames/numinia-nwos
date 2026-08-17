---
id: "DEC-006"
title: "English as the official language of the NWOS canonical repo"
type: decision
status: active
version: "1.0.0"
created: "2026-04-07T18:45:00Z"
updated: "2026-04-07T18:45:00Z"
author: "pablo-fm"
owner: "oracle"
tags: [decisions, documentation, i18n, english, nwos, language]
area: "Documentation / Strategy"
superseded_by: null
license: "CC-BY-4.0"
---
# DEC-006 — English as the official language of the NWOS canonical repo

> **Summary:** English becomes the sole language of the numinia-digital-agents canonical repo.
> **Epistemic:** What was decided, why, and what the implications are for agents and contributors.
> **Pragmatic:** All new documents must be in English; the web layer handles i18n.
> **Audience:** Agents · Oracles

---

## Context

The Numinia system is built in public (DEC-002) with the intention of international adoption. The canonical repo (`numinia-digital-agents`) is the source of truth — it must be accessible to any English-speaking team, contributor, or organization that wants to understand or adopt NWOS without language barriers.

The full translation of the repo was executed as MIS-056.

## Decision

**English is the sole official language of the canonical repo.**

All documents, missions, protocols, decisions, reports, and agent profiles must be written in English.

The web presentation layer (`pablofm.com/sistema`, MIS-061) handles multilingual display — translations live there, not in the repo. This avoids duplicate files and keeps the canonical source clean.

## Scope

| Scope | Language rule |
|-------|---------------|
| Repo documents (`.md` files) | English only |
| Frontmatter fields | English only |
| Agent-to-Oracle communication (chat) | Oracle's preferred language |
| Web presentation layer | i18n — EN/ES and more |
| Seminal documents in `canon/` | As originally written (English) |

## Exception — Stylistic phrases

Some SOUL.md files contain Spanish phrases that are intentional character choices (e.g. Nimrod's *"No dejo pasar lo que no debe pasar"*). These are preserved as cultural/character artifacts, not translated. They are quoted, not operational language.

## Why

- Removes language barrier for international adoption
- Consistent with CC0 + build in public (DEC-002)
- Web layer is the right place for i18n — not the source of truth
- All agents, regardless of Oracle language preference, operate from the same canonical source

## Discarded alternatives

- **Bilingual repo (ES + EN duplicate files)** — doubles maintenance burden, creates drift risk
- **Spanish only** — limits international adoption and contributor access
- **Language per agent** — creates fragmentation in the source of truth

## Consequences

- All new documents created in the repo: English
- Any Spanish document found: translate in the same session (MIS-056)
- Agent-Oracle chat: agents adapt to Oracle's preferred language
- Web layer owns i18n from now on

---

## Version history

- v1.0.0 (2026-04-07) — Initial decision. Derived from MIS-056 execution.

*Oracle: Pablo FM — 2026-04-07*
