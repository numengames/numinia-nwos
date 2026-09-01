---
id: "MIS-130"
uid:
title: "Fix the four dead links in README.md — the entry point resolves"
status: in-progress
priority: low
effort: XS
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
started: "2026-09-01T00:00:00Z"
completed: null

type: mission
version: "1.1.0"
created: "2026-09-01T00:00:00Z"
updated: "2026-09-01T00:00:00Z"
author: "ursa"
owner: "oracle"
tags: [archive, links, readme, adr-005, url-lifecycle]
license: "CC-BY-4.0"
---

# MIS-130 — Fix the four dead links in README.md

> **Summary:** README.md, the single entry point, carries four markdown links
> to files that no longer exist. Three were broken by renames or consolidations
> after ADR-005 (2026-08-31); one by the debt-register refactor. Repoint all
> four to their living homes.
> **Epistemic:** README.md is the entry point — PRO-001 §1 routes every agent
> there first. A broken first step is uncertainty every reader pays.
> **Pragmatic:** four line edits, one existing metric proves the fix.
> **Audience:** Agents · Oracles

---

## Context

`check-references.mjs` reports **23 broken markdown links** in the tracked
corpus (measured 2026-09-01). Four of them are in README.md, the document that
opens every session:

| README.md line | Dead link | Resolves to | Why it broke |
|---|---|---|---|
| 33 | `protocols/P-001-agent-briefing` | `protocols/PRO-001-agent-session.md` | ADR-005 rename, 2026-08-31 |
| 96 | `protocols/P-003-ciclo-mision-v1` | `protocols/PRO-003-mission-cycle.md` | ADR-005 rename, 2026-08-31 |
| 134 | `debt/D-011-thresholds-unenforced` | `debt/DBT-002-root-of-trust-unestablished.md` | Debt-register refactor (`DBT-002 <- D-011`), MIS-121 |
| 147 | the retired English-as-canon-language decision | `decisions/ADR-023-canon-vocabulary.md` | Decisions consolidation: superseded, then absorbed into ADR-023, MIS-127 |

The guard is a ratchet — it fails only on *new* breakage, so these four sit in
the tolerated baseline. This mission spends four of the 23.

## Scope

- `README.md` — exactly the four links in the table above. Nothing else.
- The prose that names them (`P-001`, `P-003`, `D-011`, and the retired
  English-language decision) is updated to the current identifier in the same
  lines where a rename happened.

**Out of scope:** the other 19 broken links (separate audit, MIS-089 F-series);
any prose rewrite of README; the identifiers in `missions/` history — those are
archaeology and stay as written; MIS-058's `P-008` reference (same ADR-005
rename class, separate file, deliberately not included).

## Acceptance criteria

Falsifiable at base commit `72e1b58`:

```bash
# 1. All four links resolve to existing files:
for f in protocols/PRO-001-agent-session.md protocols/PRO-003-mission-cycle.md \
         debt/DBT-002-root-of-trust-unestablished.md decisions/ADR-023-canon-vocabulary.md; do
  test -f "$f" && echo "OK $f"
done

# 2. No dead markdown link remains in README:
node scripts/check-references.mjs --report   # no README.md entries under "broken markdown links"

# 3. The broken-link counter drops by exactly 4 (23 → 19):
node scripts/check-references.mjs   # "broken markdown links : 19"
```

- [ ] No public address changes: these are in-repo markdown links, not web
      routes — `check-url-lifecycle.mjs` unaffected.
- [ ] `node scripts/lint-frontmatter.mjs` and `lint-naming.mjs` still exit 0.

## Closure

*(Fill when the mission closes.)*
