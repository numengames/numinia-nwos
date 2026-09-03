---
id: "PRO-013"
uid: ""
title: "Handing a guard to CI: the procedure for a boundary that will not move"
type: protocol
status: active
version: "2.0.0"
created: "2026-08-28T15:30:00Z"
created_source: "git:3d01bc2"
created_confidence: exact
updated: "2026-09-03T23:40:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [protocol, ci, guards, handoff, permissions]
license: "CC0-1.0"
visibility: "public"
applies_to: "any agent writing a verification guard"
mandatory: true
---

# P-013 — Handing a guard to CI

> **Summary:** How a verification guard written by an agent reaches the
> pipeline, given that the agent cannot edit the workflow file.
> **Epistemic:** Why the boundary exists and what the handoff costs.
> **Pragmatic:** Follow the four steps whenever you write a guard.
> **Audience:** Agents · Oracle

An agent cannot write `.github/workflows/` and will not be given the scope:
an agent that can rewrite the pipeline can disable the checks that constrain
it. The boundary is correct. This protocol makes the handoff routine instead
of a surprise rediscovered once per mission.

**The failure it prevents:** a merged pull request that adds a guard script
without wiring it looks like progress and delivers none.

## 1. The division of labour

| Step | Whose | What |
|---|---|---|
| 1 | agent | Write the guard. Test it in both directions: it must fail on planted breakage and pass when clean. |
| 2 | agent | Put the exact YAML block in the pull request body — step name, `run:` line, and the step it goes after. Ready to paste, no editing. |
| 3 | **Oracle** | Paste it into the workflow file, through a pull request. Branch protection requires one, so this is not a direct commit. It cannot be delegated. |
| 4 | agent | Verify the run went green on the trunk and report the run identifier. |

Steps 1, 2 and 4 are the agent's and are not optional.

**The review is a fourth actor.** Branch protection requires one approving
review, so even the Oracle's own workflow edit goes through a pull request.
When a second reviewer exists, they review. When one does not, the
self-approval is stated in the review body, never left implicit.

**Read both runs.** The pre-merge run on the branch is the proof the step is
wired correctly; the post-merge run on the trunk is the record.

## 2. What a guard must do before it is offered

A guard that fails on everything gets disabled, and a disabled guard is worse
than none — it looks like coverage. Therefore:

- **Ratchet, never cliff.** Existing violations are frozen in a baseline
  file, counted and dated; the guard fails only on new ones.
- **Cite the rule.** Every finding names the standard clause or check
  identifier that condemns it, so a failure is actionable without reading the
  script.
- **Three modes.** Bare verifies against the baseline and exits non-zero on
  new violations. `--report` gives full detail and exits zero.
  `--write-baseline` regenerates after a migration banks progress.
- **Declare its blindness.** What the guard does not check belongs in its
  header comment and is printed on every run.
- **Deterministic.** Same tree, same output. No timestamps in the compared
  surface.

## 3. The YAML block

Guards are cheap and the build is slow, so **guards run before the build**. The
exception is a guard that reads build output, which runs after it.

Template for the pull request body:

````markdown
## CI handoff (P-013)

Paste into the workflow file, after the step
`<name of the preceding step>`:

```yaml
      - name: <short name> (<the rule it enforces>)
        run: node scripts/<guard>.mjs
```
````

Nothing else in the file changes: no new job, no new permissions, no new
action. If a guard needs any of those, it says so explicitly — that is a
bigger ask and the Oracle decides it separately.

## 4. The register of guards is the workflow file

**There is no table of guards in this protocol, and there must not be one.**
Which guards exist and which are wired is read from the workflow file at the
moment the question is asked. A copy kept here would be a second source of
truth that ages silently — this protocol carried one for six days and it was
wrong in six ways when it was finally checked.

To see the register:

```bash
grep -nE "name:|run:" .github/workflows/ci.yml
```

A guard script that exists in `scripts/` and returns nothing from that grep is
written but not wired, which is the failure this protocol exists to prevent.

## 5. Verification after wiring

The handoff is not done when the YAML is pasted. It is done when the agent has
seen the guard run on the trunk:

```bash
gh run list --workflow=ci --branch=main --limit=1
gh run view <id> --log | grep -A3 '<step name>'
```

Report the run identifier in the mission or debt entry. A guard nobody has
watched run is a guard nobody knows works.

## Version history

- v2.0.0 (2026-09-03) — the register of guards is deleted, not updated. It
  claimed the naming lint was neither written nor wired when the file existed
  and the pipeline ran it, omitted four other wired guards and three telemetry
  steps, and contradicted this protocol's own rule that the register is read
  from the workflow file and never remembered. Section 4 now states where to
  read it. The correction notice about the first exercise of this protocol is
  folded into section 1 as rules rather than kept as narrative.
- v1.1.0 and earlier — see git history.
