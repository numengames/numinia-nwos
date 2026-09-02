---
id: "MIS-130"
uid: ""
title: "Fix the four dead links in README.md — the entry point resolves"
status: in-review
priority: low
effort: XS
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
started: "2026-09-01T17:03:10Z"
completed: null

type: mission
version: "1.3.0"
created: "2026-09-01T17:03:10Z"
created_source: "git:969597e"
created_confidence: exact
updated: "2026-09-02T01:55:26+02:00"
author: "ursa"
owner: "oracle"
tags: [archive, links, readme, adr-005, url-lifecycle]
license: "CC0-1.0"

in_review_at: "2026-09-01T17:32:43Z"
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

- **What was done:** README.md's four dead links repointed to their living
  homes: `P-001-agent-briefing` → `PRO-001-agent-session` (line 33),
  `P-003-ciclo-mision-v1` → `PRO-003-mission-cycle` (line 96),
  `D-011-thresholds-unenforced` → `DBT-002-root-of-trust-unestablished` (line
  134), and the retired English-language decision → `ADR-023-canon-vocabulary`
  (line 147). The prose identifiers were updated in the same lines.
- **What diverged, and why:** the guard that caught the two originally-scoped
  links also surfaced two more in the same file, of the same class; the
  mission's scope was corrected to all four before execution rather than
  leaving half the file's rot. Also corrected during the mission: a dead
  `created` timestamp (H-06) and a 3-digit mission filename (N-04) — both
  healed before this closure.
- **Evidence:** `node scripts/check-references.mjs` → `broken markdown links :
  19` (was 23, exactly −4); `--report` lists no README.md under broken links
  and shows the four as previously-broken-now-resolve; `lint-frontmatter.mjs`
  and `lint-naming.mjs` → no new violations. All verified at commit
  `4595773`+fix, before this file was marked in-review.
- **Closed:** not yet — awaiting Oracle review.

## Status check — 2026-09-02

*Read against `203267c` during the missions/ normalisation (lot 4). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** in-review since 2026-09-01T17:32; PR #188 merged 2026-09-01T17:37. README's protocol/standard links all resolve today (checked file by file). Both criteria true.
- **Recommendation:** Close as done — the review happened (the PR merged); set completed: 2026-09-01 and tick the two criteria. Nothing else pending.

## Version history

- v1.3.0 (2026-09-02) — import-era `---` rules removed; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 4.
