---
id: "D-036"
uid:
title: "33 missions declare no author: the field the whole provenance census rests on"
type: technical
status: active
version: "1.0.0"
created: "2026-08-26T16:05:00Z"
created_source: "git:3277a9a"
created_confidence: exact
updated: "2026-08-26T16:05:00Z"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Archive"
tags: [debt, provenance, missions, C-005, frontmatter, D-021, D-025]
license: "CC-BY-4.0"
visibility: "public"
visibility_reason: >
  Names missing frontmatter fields in documents already served in the open at
  numinia.org. Observable by any visitor with curl.
severity: medium
severity_reason: >
  Medium, not high: nothing is lost or exploitable, and ownership of the work is
  not in doubt — Numen Games holds it either way. But the CC0 partition of
  C-005 v2.0.0 is computed from `author:`, so a missing field is not cosmetic:
  it is the difference between a document that can be classified and one that
  has to be held back.
scope: "numinia-nwos @ 3277a9a · public surface: numinia.org"
---
# D-036 — 33 missions declare no `author`

> **Summary:** The provenance census that gates the CC0 sweep is computed from
> the `author:` frontmatter field. 33 of 114 missions do not have one.
> **Found while:** adding `owner: "oracle"` to 8 frozen missions per the Oracle's
> ruling of 2026-08-26 (`AUD-2026-08-26-provenance` §7.3).

## What was found

The Oracle's ruling asked for `owner:` on 8 frozen missions whose protocol anchor
was weak. Inspecting them before editing showed something the audit had not
reported:

**they carry neither `owner:` nor `author:`.** `AUD-2026-08-26-provenance` §7.3
described them as *"frozen, no `owner` field"*. That was accurate and incomplete —
they are the worst-documented missions in the repository, not merely missions
missing one field.

Widening the measurement to the whole folder:

| | Missions |
|---|---|
| Total | 114 |
| **Without `author:`** | **33 (28.9%)** |
| Without `owner:` before this PR | 33 |
| Without `owner:` after this PR | 25 |

The 8 corrected here are a subset of a larger gap.

## Why it matters, precisely

`author:` is the field the entire provenance census reads
(`scripts/experiments/provenance-census.py`). The classification that decides
which documents can enter the CC0 sweep — HUMAN / AI_PERSONA / AI_MODEL — is
derived from it. A document with no `author:` falls to `NO_SIGNAL` and has to be
resolved through git commit authorship, which is a weaker record: the committer
is who *landed* the file, not necessarily who *wrote* it.

This is not a hypothetical. In the census of the 190 new grants, **40 files
reached `NO_SIGNAL`** for exactly this reason and had to be classified from git.

**What it does not affect:** ownership. Numen Games holds these works regardless
of whether the field is filled in. This is a defect of *record*, not of *right* —
the same distinction C-005 §2.6 draws between declaring provenance and having it.

## What was deliberately NOT done

**The `author:` field was not filled in.** The Oracle's instruction, verbatim:

> *"no rellenes el author. Owner es una atribución de responsabilidad que el
> precedente sostiene; author es una afirmación sobre quién escribió, y eso o
> consta o se pregunta, no se deduce."*

`owner: "oracle"` was applied because the precedent is unambiguous — 5 sibling
frozen missions with identical `freeze_reason: cancelled` already carry it, and
`oracle` is the only value of `owner:` in use across all 114 missions (89 uses
after this PR). Inferring `author:` from a commit, a date or a neighbouring file
would be manufacturing a fact about who wrote something. That is the error this
audit has spent the day correcting, and it will not be committed here.

## Exit threshold

Not a date. This debt closes when **every mission declares `author:`**, with the
value established from record or from the Oracle — never inferred.

Two sub-conditions, because they resolve differently:

1. **The 33 missions.** Whoever knows who wrote them states it. Where nobody
   knows, the honest value is a declared unknown, not a guess.
2. **The general case.** Nothing prevents mission #115 from being created without
   `author:` tomorrow. The `license-frontmatter` guard checks `license:` only.
   Until a guard requires `author:`, this debt can reopen silently — which per
   C-005 §5 makes the threshold *"un deseo, no una salida"*.

## Related

- `AUD-2026-08-26-provenance` §7.3 — the weak-anchor bucket this was found in
- `D-021` — a new rule does not apply itself to whoever writes it
- `D-025` — no guard declares what it is blind to
- C-005 §2.6 — provenance declaration, `human` / `ai-assisted` / `ai-generated`
