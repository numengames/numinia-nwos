---
id: "MIS-137"
uid:
title: "Pin the reuse tool to a concrete version runnable by CI — close DBT-012 D-045"
status: in-progress
priority: low
effort: XS
guild: "Alchemists"
territory: "Infrastructure"
type_execution: digital
assigned_to: "ursa"
started: "2026-09-02T10:45:00Z"
completed: null

type: mission
version: "1.0.0"
created: "2026-09-02T10:45:00Z"
updated: "2026-09-02T10:45:00Z"
author: "ursa"
owner: "oracle"
tags: [debt, dbt-012, reuse, sbom, ci, licensing]
license: "CC0-1.0"
---

# MIS-137 — Pin the reuse tool to a concrete version runnable by CI

> **Summary:** The FSFE `reuse` tool is not pinned anywhere: not in
> `package.json`, not in CI, not in a requirements file. The SBOM archived at
> `reports/evidence/RPT-011/sbom.spdx` was produced with `reuse 6.2.0`
> installed ad hoc. This mission pins that version so CI can run it and a
> third party can reproduce the SBOM.
> **Epistemic:** an instrument that is not pinned makes figures non-comparable
> across iterations — a change in numbers cannot be distinguished from a
> change in the tool.
> **Pragmatic:** one requirements file and one CI step; closes DBT-012 §D-045.
> **Audience:** Agents · Oracles

---

## Context

DBT-012 §D-045 (legal debt, absorbed from LD-004):

> The AUD-2026-08-26 audit was carried out with `reuse 6.2.0`, installed ad
> hoc in the agent's environment. The repository does not pin that version
> anywhere. … **Exit threshold.** Closes when `reuse` is pinned to a concrete
> version runnable by CI, so the SBOM is reproducible by a third party without
> depending on the auditor's local environment.

Verified 2026-09-02 against `origin/main`: `reuse` appears in no
`requirements*.txt`, no `pyproject.toml`, no `ci.yml` step, no
`.github/workflows/` file. The SBOM it must reproduce is committed at
`reports/evidence/RPT-011/sbom.spdx`.

## Scope

- A new `scripts/requirements-tools.txt` (or equivalent) pinning
  `reuse==6.2.0` — the version used to produce the archived SBOM.
- A CI step in `.github/workflows/ci.yml` that installs `reuse` from that
  file and runs it (e.g. `reuse lint` or `reuse spdx`) so the pin is
  *runnable*, not decorative.

**Out of scope:** regenerating the archived SBOM (it stays as the literal
record of the 2026-08-26 audit — `reports/evidence/RPT-011/`); the other four
sub-entries of DBT-012 (D-042/D-043/D-044/D-046 are Oracle decisions or
conditional thresholds); C-005 itself.

## Acceptance criteria

Falsifiable at base commit (current `origin/main`):

```bash
# 1. The pin exists:
grep -n "reuse==6.2.0" scripts/requirements-tools.txt   # matches

# 2. CI references it:
grep -n "reuse" .github/workflows/ci.yml                # matches (a step)

# 3. The pin is runnable — the CI step executes reuse and passes:
#    (verified by CI run on the PR; locally, if Python/pip available:
#    pip install -r scripts/requirements-tools.txt && reuse --version
#    → prints 6.2.0)
```

- [ ] The version pinned is exactly `6.2.0` (the audit's instrument), not
      "latest".
- [ ] All existing guards still pass: `lint-frontmatter.mjs`,
      `lint-naming.mjs`, `check-references.mjs`, `check-license-frontmatter.mjs`.
- [ ] No public URL changes — `check-url-lifecycle.mjs` unaffected.

## Closure

*(Fill when the mission closes.)*
