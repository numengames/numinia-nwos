---
id: "D-009"
uid:
title: "45 missions carry statuses the vocabulary no longer admits"
type: documentation
status: open
version: "1.1.0"
created: "2026-08-24T19:42:00Z"
updated: "2026-08-28T16:00:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, status, missions, vocabulary]
license: "CC-BY-4.0"
visibility: "public"
severity: medium
opened_by: "S-001 §7"
---
# D-009 — 45 missions carry statuses the vocabulary no longer admits

> **Summary:** `S-001` fixes five mission states. 45 missions still carry
> withdrawn ones.
> **Epistemic:** The board and the corpus disagree about what a mission's state
> is.
> **Pragmatic:** Until this closes, filtering by `status` returns different
> answers depending on which value you ask for.

## The gap, measured

`scripts/count-evidence.py` against HEAD `7d17b5a`:

| Status in the data | Missions | Should be |
|---|--:|---|
| `backlog` | 40 | `todo` |
| `draft` | 4 | `todo` |
| corrupt (comment inside the value) | 1 | `todo` |
| `in-progress` · `in-review` · `done` · `frozen` | 61 | unchanged |

**45 to migrate.** The corrupt one is `status: draft   # draft|backlog|…` — the
comment ended up inside the value.

> **Re-measured 2026-08-28 at `8d944bf`** — the figure above is stale, and the
> direction it moved is the point:
>
> | Status | D-009 (2026-08-24) | Today | |
> |---|--:|--:|---|
> | `backlog` | 40 | **50** | +10 |
> | `draft` | 4 | **7** | +3 |
> | `active` | — | **1** | not counted before |
> | corrupt | 1 | 1 | |
> | **to migrate** | **45** | **59** | **+31%** |
>
> The debt grew by a third in four days because the source was never fixed:
> `missions/TEMPLATE.md` taught `status: backlog` — a retired value — with an
> inline comment listing `cancelled`, withdrawn by executed ruling (`D-016`).
> Every new mission inherited the defect. **The template is fixed in this
> operation** (`todo`, comment moved to its own line, `cancelled` removed):
> the count stops growing even though the 59 have not yet been migrated.
>
> Measured with:
> ```bash
> python3 -c "import re,glob,collections; ..."   # per-status census of missions/*.md
> ```

## The corrupt one has a cause, not a culprit

`missions/TEMPLATE.md` teaches the field like this:

```yaml
status: draft   # draft|backlog|in-progress|in-review|done|frozen|cancelled
```

Whoever copied the template copied the comment. **The template must be fixed in
the same operation**, or the next mission reproduces the bug — and it will also
teach `cancelled`, which no longer exists (blocker 1, executed).

## Closing condition

Marked RESOLVED when `count-evidence.py` reports only the five valid states, and
`missions/TEMPLATE.md` no longer carries an inline comment in `status`.

Migration is mechanical and idempotent, in the shape of
`scripts/cancel_to_frozen.py`. It is not done in this operation because
`S-001` is not signed: migrating the data to an unsigned rule is the mistake
this debt exists to avoid.

> **Unblocked 2026-08-28 by `ADR-027`.** `S-001` is ratified at v4.0.0; the
> blocker above is satisfied and the migration may execute. The template — the
> *source* of the growth — is fixed as of this entry's update; the 59 documents
> remain. Split deliberately: stopping the bleeding needed no ratification,
> migrating the corpus did.

## State

| | |
|---|---|
| Severity | medium — affects filtering and the board, not the evidence |
| Owner | Oracle |
| Blocked by | ~~`S-001` unsigned~~ — unblocked by `ADR-027`, 2026-08-28 |
| Opened | 2026-08-24, by `S-001` §7 |
| Closes when | only the 5 valid states remain, and the template is fixed |
