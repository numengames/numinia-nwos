---
id: "P-013"
title: "Handing a guard to CI: the procedure for a boundary that will not move"
type: protocol
status: active
version: "1.1.0"
created: "2026-08-28T15:30:00Z"
created_source: "git:3d01bc2"
created_confidence: exact
updated: "2026-08-29T21:50:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [protocol, ci, guards, handoff, permissions]
license: "CC-BY-4.0"
visibility: "public"
applies_to: "any agent writing a verification guard"
mandatory: true
---

# P-013 — Handing a guard to CI

> **Why this exists:** the agent cannot write `.github/workflows/`
> (`D-017`) and will not be given the scope — an agent that can rewrite
> the pipeline can disable the checks that constrain it. The boundary is
> correct. What was missing is a procedure, so the handoff is routine
> instead of a surprise rediscovered once per mission.
>
> **The failure this prevents:** a merged PR that adds a guard script
> without wiring it **looks like progress and delivers none**.

## 1. The division of labour

| Step | Whose | What |
|---|---|---|
| 1 | agent | Write the guard. Test it **in both directions**: it must fail on planted breakage and pass when clean. |
| 2 | agent | Put the **exact YAML block** in the PR body — step name, `run:` line, and the step it goes after. Ready to paste, no editing. |
| 3 | **Oracle** | Paste it into `.github/workflows/ci.yml` **via a pull request** — `protect-main` requires one, so this is not a direct commit. Irreducibly the Oracle's. |
| 4 | agent | Verify the run went green on `main` and report the run ID. |

Steps 1, 2 and 4 are the agent's and are not optional. Step 3 is the
Oracle's and cannot be delegated.

> **Corrected 2026-08-29, first time this protocol was exercised (`D-017`,
> PR `#126`).** Step 3 originally read as a direct commit to `main`. It is
> not: the `protect-main` ruleset requires a pull request and **one
> approving review**, so even the Oracle's own workflow edit goes through a
> PR. Two consequences the first run discovered:
>
> - **The review is a fourth actor the protocol did not name.** On `#126`
>   it was given by the agent, at the Oracle's instruction — the author of
>   the guard approving its own wiring. Authority was intact; independence
>   was not. When a second reviewer exists, they review. When one does not,
>   **the self-approval is stated in the review body**, never left implicit.
> - **The PR runs the guard before it is merged.** The pre-merge run on the
>   PR branch is the real proof the step is wired correctly; the post-merge
>   run on `main` is the record. Read both.

## 2. What a guard must do before it is offered

A guard that fails on everything gets disabled, and a disabled guard is
worse than none — it looks like coverage. Therefore:

- **Ratchet, never cliff.** Existing violations are frozen in a baseline
  file, counted and dated; the guard fails only on NEW ones. Precedent:
  `scripts/references-baseline.json`, `scripts/frontmatter-baseline.json`.
- **Cite the rule.** Every finding names the standard clause or check id
  that condemns it (`H-06`, `C-005 §5`), so a failure is actionable
  without reading the script.
- **Three modes.** Bare = verify against baseline, exit 1 on new
  violations. `--report` = full detail, exit 0. `--write-baseline` =
  regenerate after a migration banks progress.
- **Declare its blindness** (`D-025`): what the guard does NOT check
  belongs in its header comment.
- **Deterministic.** Same tree, same output. No timestamps in the
  compared surface.

## 3. The YAML block

Guards are cheap and the build is slow, so **guards run before the
build** — a header defect should not wait on 662 pages. The exception is
a guard that reads build output (`check-orphan-content.mjs` needs
`web/dist`), which runs after.

Template for the PR body:

````markdown
## CI handoff (P-013)

Paste into `.github/workflows/ci.yml`, after the step
`<name of the preceding step>`:

```yaml
      - name: <short name> (<the rule it enforces>)
        run: node scripts/<guard>.mjs
```
````

Nothing else in the file changes: no new job, no new permissions, no new
`uses:`. If a guard needs any of those, it says so explicitly — that is a
bigger ask and the Oracle decides it separately.

## 4. Register of guards

Current state, verified against `.github/workflows/ci.yml` at
`3d01bc2` — **not** copied from a previous document:

| Guard | Enforces | Written | Wired |
|---|---|---|---|
| `check-license-frontmatter.mjs` | C-005 §5 licence agreement | yes | **yes** |
| `check-references.mjs` | ADR-004 plain-text identifiers | yes | **yes** |
| `check-orphan-content.mjs` | D-032 content outside the renderer | yes | **yes** (post-build) |
| `lint-frontmatter.mjs` | S-004 header, checks H-00…H-31 | yes (#116) | **yes** — `#126`, run `33276755484` |
| `lint-naming.mjs` | S-001 §9 filenames | no | no |
| `lint-type-vs-folder.mjs` | folded into `lint-frontmatter` H-17 | n/a | n/a |

> `D-017`'s own table listed `check-references` as unwired and omitted
> `check-orphan-content` entirely. Both were stale: the register above is
> read from the workflow file, and that is the rule — **this table is
> re-read from `ci.yml`, never remembered.**

## 5. Verification after wiring

The handoff is not done when the YAML is pasted. It is done when the
agent has seen the guard run on `main`:

```bash
gh run list --workflow=ci --branch=main --limit=1
gh run view <id> --log | grep -A3 '<step name>'
```

Report the run ID in the mission or debt entry. A guard nobody has
watched run is a guard nobody knows works.
