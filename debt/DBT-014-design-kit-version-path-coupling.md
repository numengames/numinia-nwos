---
id: "DBT-014"
uid:
title: "Design System kit path is derived from the document version, so a version bump breaks the generator"
type: documentation
status: active
version: "1.2.0"
created: "2026-09-04T22:30:00+02:00"
created_source: "git:aa8ad06"
created_confidence: exact
updated: "2026-09-05T09:55:00+02:00"
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
that is a design decision, not a repair.

**The Oracle ruled on 2026-09-05:** the design system does not get its own
naming scheme. It lives in the folders and identifiers the corpus already has,
and `kit/<semver>/` is a nomenclature invented for this one artifact and used
nowhere else in the repository. So the version must come out of the path.

That removes the coupling at its root rather than teaching the generator to
work around it: with a stable path there is no directory to create on a bump,
nothing to carry forward, and no `--bump` flag that has to own two things at
once. The version stays where every other document keeps it — the `version:`
field, and the git history.

## What is owed

The published kit moves to a path with no version in it. The generator then
reads and writes one location, and `STD-008` can be bumped like any other
document.

Open questions the move has to answer, none of them settled here:

- **Consumers.** `kit/5.1.0/` is referenced from the web app and from the kit
  manifest. Every reference moves in the same change or the site breaks.
- **Old versions.** Whether previously published kit directories stay reachable
  as frozen URLs or are removed. `PRO-010` §5 and the URL ratchet govern this;
  a published URL is not deleted casually.
- **What `manifest.json` becomes** once it no longer indexes by version.

## Closes when

The published kit path contains no version number, every consumer points at it,
`STD-008` takes a version bump, and `node scripts/generate-design-kit.mjs`
succeeds without manual directory creation.

## State

Open. The generator works at `5.1.0`; it was also broken outright before this
branch — it searched for the old dated `Sistema_de_Diseno-vN.N.N` filename
shape that PR #229 had already renamed away, so it had thrown on every run
since. That part is fixed: it now reads `standards/STD-008-design-system.md`
and its `version:` field, which is why the drift in §19.3 (a token copy
stamped `v5.0.0` inside a `5.1.0` document) could finally be corrected.

Note that #229 renamed the *master* to remove a version from its filename, and
this entry is the same defect one layer down: the version simply moved from the
document's name to the artifact's directory. The rule was applied to the file
that was looked at, not to the pattern.
