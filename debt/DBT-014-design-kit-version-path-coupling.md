---
id: "DBT-014"
uid:
title: "Design System kit path is derived from the document version, so a version bump breaks the generator"
type: documentation
status: draft
version: "1.0.0"
created: "2026-09-04T22:30:00+02:00"
created_source: "git:aa8ad06"
created_confidence: exact
updated: "2026-09-04T22:30:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, design-system, tooling, std-008]
license: "CC-BY-4.0"
visibility: "public"
severity: medium
opened_by: "Ursa, 2026-09-04"
related: ["STD-008", "DBT-013", "MIS-127"]
---

# DBT-014 — A version bump breaks the design kit generator

## What happened

`scripts/generate-design-kit.mjs` reads the tokens from
`web/public/diseno/kit/<version>/sistema.tokens.json`, where `<version>` is
the `version:` field of `STD-008`. The published directory is named after the
version it was published under.

Bumping `STD-008` from `5.1.0` to `5.2.0` therefore makes the generator look
in `kit/5.2.0/`, which does not exist yet, and it throws:

```
Error: Tokens not found for v5.2.0: web/public/diseno/kit/5.2.0/sistema.tokens.json
```

This was hit and reverted while editing §19.3 and §19.5 on 2026-09-04. The
document is still `5.1.0` for that reason and no other.

## Why it is not fixed here

Fixing it means deciding what a version bump *means* for a published kit, and
that is a design decision, not a repair:

- **Carry forward** — a bump copies the previous kit into the new directory
  and re-stamps it. Simple, but it silently publishes a new version whose
  contents nobody changed.
- **Read from the previous version** — the generator falls back to the highest
  existing kit. Keeps bumps cheap, but the directory name stops meaning
  "these tokens".
- **Bump only through the generator** — a `--bump` flag owns both the
  frontmatter field and the directory. Correct, and the most work.

The third is the right answer. It is not this branch's work.

## What is owed

Either the generator tolerates a version it has not published yet, or the
version field stops being the sole input to the path. Until then, `STD-008`
cannot take a version bump without a matching kit directory created by hand.

## Closes when

`STD-008` can be bumped and `node scripts/generate-design-kit.mjs` succeeds
without manual directory creation.

## State

Open — `status: draft` is the lifecycle value for an unresolved entry in this
series; `DBT-013` uses `closed` because it is resolved.

The generator works at `5.1.0`; it was also broken outright before this
branch — it searched for the old dated `Sistema_de_Diseno-vN.N.N` filename
shape that PR #229 had already renamed away, so it had thrown on every run
since. That part is fixed: it now reads `standards/STD-008-design-system.md`
and its `version:` field, which is why the drift in §19.3 (a token copy
stamped `v5.0.0` inside a `5.1.0` document) could finally be corrected.
