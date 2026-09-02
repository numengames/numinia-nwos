---
id: "MIS-139"
uid:
title: "Repoint the two legacy manual references in numinia-web to numinia-lore — close DBT-011"
status: in-progress
priority: low
effort: XS
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
started: "2026-09-02T14:09:35Z"
completed: null

type: mission
version: "1.0.0"
created: "2026-09-02T14:09:35Z"
updated: "2026-09-02T14:09:35Z"
author: "ursa"
owner: "oracle"
tags: [debt, dbt-011, cross-repo, lore, manual, pointer]
license: "CC0-1.0"
---

# MIS-139 — Repoint the two legacy manual references in numinia-web

> **Summary:** `numinia-web` cites the RPG manual by its retired name and
> location ("Numinia. El juego de rol (manual completo).txt", legacy corpus).
> The Oracle ruled on 2026-08-25 (DBT-011) that the manual lives in
> `numengames/numinia-lore` as `seminal/Numinia_Manual_del_juego_de_rol_v0_6_0`
> — a pointer, not a copy. These two citations are the last consumers left
> with the dead address.
> **Epistemic:** a citation to a document's dead name is a broken address no
> link checker sees — the text resolves in a human's head but nowhere else.
> **Pragmatic:** two prose edits in numinia-web, destination already ruled;
> closes the last open consumer of DBT-011's first pending repair.
> **Audience:** Agents · Oracles

---

## Context

DBT-011 (cross-repository consumers left with dead addresses) lists, under
"Breakages outside write scope — OPEN":

| Repo | File | Severity |
|---|---|---|
| `numinia-web` | `DECISIONS` (line 111) | 🟠 medium |
| `numinia-web` | `docs/onboarding-report` (line 23) | 🟠 medium |

And its pending repair #1 names the destination:

> **`numinia-web`** — repoint `DECISIONS` (line 111) and
> `docs/onboarding-report` (line 23) to
> `numinia-lore` `seminal/Numinia_Manual_del_juego_de_rol_v0_6_0`.

The two citations today (verified 2026-09-02):

1. `DECISIONS` line 111 — *"The canonical names for guild houses come from
   'Numinia. El juego de rol (manual completo)'"* — names the manual by its
   legacy title, no link, no location.
2. `docs/onboarding-report` line 23 — *"`Numinia. El juego de rol (manual
   completo).txt` (4,667 lines, Spanish)"* — cites the retired `.txt` of the
   legacy corpus (`numinia-digital-goods/docs/seminal-documents/`).

The canonical text lives at
`numengames/numinia-lore` → `seminal/Numinia_Manual_del_juego_de_rol_v0_6_0`
(v0.6.0, 21,459 lines — verified present). The Oracle's 2026-08-25 ruling
(D-041 absorbed into DBT-011): *"a pointer is not a foundational document"* —
repoint, never copy.

## Scope

Two files in `numengames/numinia-web`, prose only:

- `DECISIONS` line 111 — update the manual's name to the current canonical
  title and add a pointer to the lore location.
- `docs/onboarding-report` line 23 — replace the retired `.txt` citation
  with the current lore `seminal` pointer (v0_6_0).

**Out of scope:** the third open consumer (numinia-lore's own
`seminal-legacy/README` line 20 — a decision for the lore repo, separate); the
other DBT-011 items (already resolved on the nwos side); any rewrite of the
onboarding report's history — the line is a record of what was read, and
changing *that* would falsify it. The citation is repointed, not the fact.

## Acceptance criteria

Falsifiable at the current `numinia-web` main:

```bash
# 1. No citation of the retired title remains in the two files:
grep -n "manual completo" numinia-web/DECISIONS numinia-web/docs/onboarding-report
#    → only the new canonical pointer, or none

# 2. The pointer resolves — the destination exists:
ls numinia-lore/seminal/Numinia_Manual_del_juego_de_rol_v0_6_0
# 3. The debt entry's consumer rows can be marked closed:
#    DBT-011 "Breakages outside write scope" table — both numinia-web rows
#    now resolve to the lore location.
```

- [ ] No markdown link is introduced with a path that cannot resolve.
- [ ] numinia-web builds unaffected (prose-only edits; no code, no routes).
- [ ] numinia-nwos guards unaffected: `check-references.mjs`,
      `lint-frontmatter.mjs`, `lint-naming.mjs` — no new violations.

## Closure

*(Fill when the mission closes.)*
