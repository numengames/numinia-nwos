---
id: "D-037"
uid:
title: "Censuses must fail loudly, not return everything"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-26T18:10:00Z"
created_source: "git:80e5145"
created_confidence: exact
updated: "2026-08-26T18:10:00Z"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Infrastructure"
tags: [debt, tooling, measurement, guards, D-025, D-032]
license: "CC-BY-4.0"
visibility: "public"
visibility_reason: >
  Describes the failure mode of measurement scripts in this repository. Names no
  private data.
severity: medium
severity_reason: >
  Medium: no data is lost and nothing is exploitable, but a census that is wrong
  in silence produces numbers that get written into reports and signed decisions.
  This one nearly did — it reported 66 files as public content when the real
  figure was 12.
scope: "numinia-nwos @ 80e5145 · public surface: numinia.org"
---
# D-037 — Censuses must fail loudly, not return everything

> **The rule:** a measurement script that cannot find what it measures with MUST
> exit non-zero. It must never fall back to a default that happens to produce a
> plausible-looking answer.

## What happened

`public-surface-census.py` v1 looked for a constant `ASSET_EXT = new Set([...])`
in `check-orphan-content.mjs`. That constant does not exist — the guard uses
`ASSET_RE`, a regex. The lookup returned nothing, the script fell back to an
empty set, and with an empty set **no extension is an asset**, so it reported all
**66** files in `web/public/` as public content.

The guard itself reported **12**.

**Nothing failed.** The script exited 0 and printed a full, confident report. What
caught it was the disagreement with the instrument, not the instrument's own
behaviour — and only because both numbers happened to be in front of the same
reader at the same moment.

## Why it is debt and not an anecdote

A script that is wrong in silence never fails, and what never fails is never
reviewed. This one would have kept reporting 66 indefinitely, and the figure was
on its way into an audit report.

It is the same shape as `D-025` (*a guard that does not declare what it is blind
to*) with the polarity reversed: there, an instrument stays green while seeing
nothing; here, an instrument stays green while seeing **everything**. Both are
green, both are wrong, and green is why neither gets looked at.

## What was done

`scripts/experiments/public-surface-census.py` now dies with `SystemExit` and a
named cause if it cannot find `ASSET_RE`, the `ALLOWED` map, or the
declaration-file rule in the guard. Verified by renaming `ASSET_RE` in a scratch
copy: the census exits 1 with `FATAL: ASSET_RE not found`, instead of reporting
57 files as content.

## Exit threshold

Not a date. This closes when **every measurement script in `scripts/` that reads
its criteria from another file fails loudly on absence.** Audited scripts:

- [x] `public-surface-census.py` — reads `ASSET_RE`, `ALLOWED`, `DECLARATION_RE`
- [ ] `complexity-census.py` — reads `ci.yml`; currently reports an empty list if
      the workflow is missing rather than aborting
- [ ] `provenance-census.py` — reads the SBOM; behaviour on a truncated SBOM is
      untested
- [ ] `protocol-anchor.py` — reads mission frontmatter; behaviour on a mission
      with no frontmatter is untested

Three of the four are unaudited, and listing them as unknown is the honest state:
this entry does not claim they are broken, only that nobody has checked.

## Related

- `D-025` — no guard declares what it is blind to
- `D-032` — content served without the renderer, the guard this census mirrors
