---
id: "D-024"
uid:
title: "Five documents cannot be registered without a prior decision"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-25T12:54:11Z"
created_source: "git:7f06626"
created_confidence: "exact"
updated: "2026-08-25T12:54:11Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, registration, D-008, phase1, frozen-artifacts]
license: "CC-BY-4.0"
severity: low
opened_by: "phase 1 registration backfill"
evidence_script: "scripts/phase0-inventory.py"
evidence_head: "dc7ae43"
---
# D-024 — Five documents cannot be registered without a prior decision

> **Summary:** Phase 1 registered 12 of the 17 documents in scope. Five were
> left alone, each for a stated reason, none of them "ran out of time".
> **Epistemic:** A registration that needs a genre ruling first is not
> registration work.
> **Pragmatic:** Registering them anyway would consecrate a decision nobody
> made — the failure `S-001` §3 exists to prevent.

## What phase 1 did register

| Series | Before | After |
|---|---|---|
| `reports/audits/` | 2/6 | **6/6** — `AUD-YYYY-MM-DD-slug`, closes `D-013` |
| `operations/` | 0/10 | **8/10** — `O-001`…`O-008`, creation order oldest first |

Dates come from `git log --diff-filter=A`, not from frontmatter.

## The five, and why each stayed

### 1–2 · `security-policy.md` and `credential-map.md` — genre ruling pending

Both declare `type: protocol` and neither is one: a credential map is an
inventory nobody executes, and a security policy states what an artifact must
satisfy, which is the definition of a standard.

The Oracle already ruled this is **a genre question needing an ADR, not a file
move**. Registering them as `O-NNN` would file them under a genre nobody chose.

They are also the two oldest documents in `operations/` (2026-04-06), so
`O-001` and `O-002` went to the next in creation order. **If the ADR sends them
elsewhere, no number needs reclaiming.**

### 3–4 · Two frozen dated artifacts — registration does not apply

```
protocols/2026_04_14-Read_Me_How_to_Archive-v0.2.0.md
standards/2026_04_14-Analogous_Terminology_Numina-v0.2.0.md
standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md
```

`P-010` §3.2: a dated filename marks a **frozen artifact** — a photograph, not a
living document. Registration numbers living series.

**And the first one has a live twin**: `protocols/P-010-how-to-archive.md`
exists alongside `2026_04_14-Read_Me_How_to_Archive-v0.2.0.md`, and **neither
declares any relation to the other**. That is E3 material, not a naming problem:
the fix is `supersedes:` / `derived_from:`, not a number.

### 5 · `standards/engineering-standards.md` — measured and reverted

This one was renamed to `S-002-engineering-standards.md` and **reverted within
the same session**, because measuring came after acting rather than before:

- **18 documents cite it** by filename
- `CLAUDE.md` declares it *"this repository's own operative standard"*
- `.github/workflows/scorecard.yml` names it in a comment — and the agent has no
  `workflow` scope (`D-017`), so that reference could not be updated at all

`ADR-004` forbids renumbering; this is not renumbering, but the cost profile is
the same. **A rename whose consumers cannot all be updated is a rename that
should not happen.**

The remaining candidate is `protocols/APPROVAL-REQUEST-template.md`, which is
**not** orphaned: `P-008-approval-brief-v1.md` uses it as its template. It is
apparatus belonging to a registered protocol, not an unregistered document.

## Closure

Marked RESOLVED when:

- [ ] An ADR rules the genre of `security-policy` and `credential-map`, and they
      are filed accordingly — with numbers or without
- [ ] `P-010-how-to-archive.md` and its dated twin declare their relation
- [ ] The `S-` prefix is decided for `engineering-standards.md`: registered
      with all 18 citations updated, or **left permanently unregistered with the
      reason written down** — which is a legitimate outcome

The third bullet matters most. `D-008` counts registration coverage, and a
document that will never be registered should be declared as such rather than
sitting in the gap forever making the figure look worse than it is.

| | |
|---|---|
| Severity | low — nothing is broken; five documents lack a number |
| Owner | Oracle (two ADRs) |
| Blocked by | genre ruling · `D-017` for the scorecard reference |
| Opened | 2026-08-25, closing phase 1 |
| Closes when | the genre is ruled and the exceptions are declared |
