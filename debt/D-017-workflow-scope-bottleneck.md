---
id: "D-017"
uid:
title: "Every CI guard needs the Oracle's hands: the agent has no workflow scope"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-24T23:00:00Z"
updated: "2026-08-24T23:00:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, ci, permissions, bottleneck, structural]
license: "CC-BY-4.0"
visibility: "public"
visibility_reason: >
  States that the agent lacks `workflow` scope. A limitation of ours, not a
  way in.
severity: medium
opened_by: "Oracle, phase 0 review"
---
# D-017 — Every CI guard needs the Oracle's hands

> **Summary:** The agent cannot modify `.github/workflows/`. Every guard that
> would close `D-001` therefore requires a manual step by the Oracle.
> **Epistemic:** Names a permanent structural constraint, so it stops being
> rediscovered once per mission.
> **Pragmatic:** Any plan that says "the agent wires the guard into CI" is
> wrong. Plan for the handoff instead.

## The constraint

```
remote: refusing to allow a Personal Access Token to create or update
        workflow `.github/workflows/ci.yml` without `workflow` scope
```

Ursa's GitHub App does not carry `workflow` scope **and will not, by protocol**
(Oracle, 2026-08-24). This is not a misconfiguration to fix — it is a deliberate
boundary. An agent that can rewrite the pipeline can disable the checks that
constrain it.

## Why it is its own entry and not part of D-001

`D-001` measures a gap in coverage: 1 of 11 rules machine-verified. It is
closed by writing guards.

**This entry measures a gap in the delivery path.** Writing the guard is the
cheap half; every one of them then waits on a manual step. `D-001` lists five
guards, three of which do not exist yet:

| Guard | Written? | Wired? |
|---|---|---|
| `check-license-frontmatter.mjs` | yes | **yes** — the only one |
| `check-references.mjs` | yes, tested | no — PR open |
| `lint-frontmatter.mjs` | no | no |
| `lint-naming.mjs` | no | no |
| `lint-type-vs-folder.mjs` | no | no |

Four handoffs pending, and one more for each guard added afterwards. Without
this entry, each mission rediscovers the wall and improvises around it — which
is how `check-references.mjs` came to be run from a sibling branch during
verification instead of from CI, five times in one session.

## What good looks like

Not "give the agent `workflow` scope". The boundary is correct. What is missing
is a **procedure** so the handoff is routine rather than a surprise:

1. The agent writes the guard, tests it locally in both directions (fails on
   breakage, passes when clean), and commits the script.
2. The PR body carries **the exact YAML block**, ready to paste, with the step
   name and the line it goes after.
3. The Oracle applies it in the same session as the merge, or the guard sits
   inert and the PR silently overstates what it delivers.
4. The agent verifies the run went green on `main` and reports the run ID.

Steps 1, 2 and 4 are the agent's. Step 3 is irreducibly the Oracle's.

## The failure mode this prevents

A merged PR that adds a guard script without wiring it looks like progress and
delivers none. `ci/reference-lint` is in that state right now: script merged
into its branch, tested, and enforcing nothing.

## Closing condition

Marked RESOLVED when the handoff procedure is written into `CONTRIBUTING.md` or
a protocol, **and** the four pending guards are either wired or explicitly
deferred with a reason.

This entry does not close by getting the scope. It closes by making its absence
survivable.

## State

| | |
|---|---|
| Severity | medium — no data at risk, but it throttles every future guard |
| Owner | Oracle |
| Blocked by | nothing — the procedure can be written today |
| Opened | 2026-08-24, Oracle's phase 0 review |
| Closes when | the handoff is documented and the four guards are resolved |
