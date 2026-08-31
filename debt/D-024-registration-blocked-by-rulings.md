---
id: "D-024"
uid:
title: "Five documents cannot be registered without a prior decision (RESOLVED)"
type: documentation
status: resolved
version: "1.2.0"
created: "2026-08-25T12:54:11Z"
created_source: "git:7f06626"
created_confidence: exact
updated: "2026-08-31T10:15:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, registration, D-008, phase1, frozen-artifacts]
license: "CC-BY-4.0"
visibility: "public"
visibility_reason: >
  Cites `credential-map.md` by filename as a document awaiting a genre
  ruling. It exposes no credential and no value.
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

**The Oracle created the missing outcome on 2026-08-25.** `S-001` §5.0 now
defines `registration: exempt` + `registration_reason`, on the same principle as
`D-023`: *a gap and a declared exception must not look alike.*

Applied to the four documents that carry frontmatter:

| Document | Exemption |
|---|---|
| `operations/security-policy.md` | `pending-genre-ruling` |
| `operations/credential-map.md` | `pending-genre-ruling` |
| `protocols/APPROVAL-REQUEST-template.md` | `apparatus-of-registered-document` |
| `standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md` | `frozen-artifact` |

**Three could not be marked**: `engineering-standards.md` and the two
`2026_04_14-*` files have **no frontmatter at all**. Giving them one to hold an
exemption would be inventing metadata for a document in order to explain why it
lacks metadata. They are listed here instead, and the two dated ones are frozen
artifacts anyway.

Marked RESOLVED when:

- [x] A declared-exception value exists and is applied *(S-001 §5.0, 2026-08-25)*
- [x] An ADR rules the genre of `security-policy` and `credential-map`, and the
      two `pending-genre-ruling` exemptions are removed or made permanent
      *(Oracle ruling, 2026-08-31, `MIS-125`/`D-008` v2.0.0: both register
      as `OPS-NNN` by folder membership, independent of the `type:` genre
      debate — the exemption is removed, not made permanent)*
- [x] `P-010-how-to-archive.md` and its dated twin declare their relation
      *(moot: `MIS-125` registers the dated twin as `PRO-NNN` in the same
      pass rather than leaving it a frozen artifact — see `D-008` v2.0.0)*
- [x] `engineering-standards.md` gets frontmatter, or a written decision that it
      stays without one — it is the repository's operative standard and the only
      unexplained gap left in `standards/`
      *(it already had frontmatter with `registration: exempt` by the time
      this was re-checked, 2026-08-31 — stale claim in this document,
      corrected here; registers as `STD-NNN` in `MIS-125`)*
- [x] `protocols/APPROVAL-REQUEST-template.md` — **left exempt, correctly,
      not registered.** This debt's own §"remaining candidate" already
      established why: it is apparatus of `P-008-approval-brief-v1.md`
      (its template), not an orphaned document — same class as
      `README.md`/`INDEX.md`, which `D-008` also excludes rather than
      numbers. v1.1.0 first marked this `[x]` as "enters the scheme, no
      exception" alongside the other 24 — wrong, contradicted this
      document's own earlier reasoning without re-reading it. Corrected
      2026-08-31: `D-008` v2.0.0's exempt-set table never listed it either,
      which is what caught the error.

**Resolved 2026-08-31, by Oracle ruling recorded in `D-008` v2.0.0
("The `registration: exempt` set" section) and `MIS-125`.** Three of the
four `registration: exempt` content documents this debt tracked now enter
the prefix scheme with no exception — closing the genre question that
blocked two of them, and superseding the "frozen artifact" reasoning that
had exempted the third. The fourth, `APPROVAL-REQUEST-template.md`, stays
exempt on its original, still-correct reasoning: it is apparatus, not an
unregistered document. `S-001` §5.0's `registration: exempt` mechanism
stays in force for genuine apparatus (README/INDEX/templates); of the five
documents named in this debt's original scope, it no longer applies to
four of them.

| | |
|---|---|
| Severity | low — nothing is broken; the coverage figure now reads honestly |
| Owner | Oracle |
| Opened | 2026-08-25, closing phase 1 |
| Resolved | 2026-08-31, by Oracle ruling — `D-008` v2.0.0, `MIS-125` |

## Version history

- v1.2.0 (2026-08-31) — Corrected by the Oracle's own review: v1.1.0
  marked `APPROVAL-REQUEST-template.md` `[x]` alongside the other 24,
  contradicting this document's own earlier finding (§"remaining
  candidate") that it is apparatus of `P-008`, not orphaned. It stays
  `registration: exempt`. `D-008` v2.0.0's exempt-set table never listed
  it either — cross-checking the two closing documents against each other
  is what caught the contradiction.
- v1.1.0 (2026-08-31) — `MIS-125`. Closed: the Oracle ruled the pending
  genre question and elected to register all remaining exempt documents
  rather than leave any exemption standing. `engineering-standards.md`'s
  "no frontmatter" claim (v1.0.0) was stale — corrected in the closing
  checklist rather than left uncorrected.
- v1.0.0 (2026-08-25) — Initial debt.