---
id: "D-013"
uid:
title: "reports/audits: four audits, four naming conventions"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-24T20:55:00Z"
updated: "2026-08-24T20:55:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, identifiers, audits, naming]
license: "CC-BY-4.0"
visibility: "public"
severity: low
opened_by: "S-001 §4.3"
---
# D-013 — `reports/audits`: four audits, four naming conventions

> **Summary:** `S-001` §4.1 assigns `AUD-YYYY-MM-DD-<slug>` to the series. Four
> of six files predate the rule and none match it.
> **Epistemic:** The series that documents the archive's coherence is itself
> incoherent.
> **Pragmatic:** Until this closes, an audit cannot be cited by identifier —
> only by path.

## The gap, measured

```
AUD-2026-04-07-system-audit.md      date · Spanish slug · no prefix
AUD-2026-08-17-cold-agent.md       date · English slug · no prefix
AUD-2026-08-17-stack.md            date · English slug · no prefix
AUD-2026-08-17-navigability.md     wrong prefix · date at the end
AUD-2026-04-07-web-vs-repo.md        ✓ conforms
AUD-2026-04-08-numengames.md         ✓ conforms
```

Two of six conform — the two filed under the scheme in an earlier PR. This new
audit (`AUD-2026-08-24-canon-edit`) makes three.

## Why this one is cheap

Unlike `canon/` (`D-008`, `S-001` §4.3), nothing blocks it:

- Audits are cited **by path**, not by identifier
- `scripts/check-references.mjs` catches any link the rename breaks
- The Astro `audits` collection globs `*.md`, so no page disappears
- No consumer outside the repo depends on these filenames

Proposed renames:

```
AUD-2026-04-07-system-audit.md   → AUD-2026-04-07-sistema.md
AUD-2026-08-17-cold-agent.md    → AUD-2026-08-17-cold-agent.md
AUD-2026-08-17-stack.md         → AUD-2026-08-17-stack.md
AUD-2026-08-17-navigability.md  → AUD-2026-08-17-navigability.md
```

After: **7/7**.

## Why it is not done yet

`S-001` is `status: draft`. Renaming files to match an unsigned rule is exactly
the mistake these debt entries exist to prevent — it would make the corpus
comply with something the Oracle has not approved, and make the non-compliance
invisible if the rule then changes.

One consequence to check during the rename: `AUD-2026-04-07-web-vs-repo` is
`status: superseded` by `2026-04-07-auditoria-sistema`, which is itself being
renamed. Both `superseded_by` and the target filename change in the same
operation, or the relation breaks.

## State

| | |
|---|---|
| Severity | low — affects citability of 4 files, no consumers |
| Owner | Oracle |
| Blocked by | `S-001` unsigned |
| Opened | 2026-08-24, by `S-001` §4.3 |
| Closes when | 7/7 conform and the `superseded_by` relation still resolves |
