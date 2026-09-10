---
id: "PRO-013"
uid: ""
title: "Handing a guard to CI"
type: protocol
status: active
version: "3.1.0"
created: "2026-08-28T15:30:00Z"
created_source: "git:3d01bc2"
created_confidence: exact
updated: "2026-09-10T10:30:00+02:00"
author: "ursa"
owner: "oracle"
tags: [protocol, ci, guards, engineering]
license: "CC0-1.0"
guild: "Alchemists"
territory: "Archive"
visibility: "public"
applies_to: [all-agents]
mandatory: true
related: ["STD-005", "STD-015", "PRO-016"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# PRO-013 — Handing a guard to CI

> **Summary:** How a verification guard written by an agent reaches the
> pipeline, given that the agent cannot edit the workflow file and will not
> be given the scope.
> **Epistemic:** An agent that can rewrite the pipeline can disable the
> checks that constrain it. The boundary is correct; the handoff is routine.
> **Pragmatic:** Four steps, three of them the agent's, one the Oracle's.
> **Audience:** Agents · Oracle

**Binds:** any agent that writes a guard script, and the Oracle who wires it.
**Does not bind:** what a guard must check (`STD-015`) nor the baseline
discipline (`ENG-033`).

## 1. Trigger

A task produces a script under `scripts/` meant to fail a build. Reached
from `PRO-016` step 6. Executor: the agent; the Oracle for the workflow
edit.

## 2. Rules

**GRD-001 — Tested in both directions.** A guard MUST fail on planted
breakage and pass on a clean tree before it is offered.

**GRD-002 — Ratchet, never cliff.** Existing violations MUST be frozen in a
dated baseline; the guard fails only on new ones. A guard that fails on
everything gets disabled, and a disabled guard looks like coverage.

**GRD-003 — Every finding cites its plate.** Each finding MUST name the rule
that condemns it, so a failure is actionable without reading the script.

**GRD-004 — Three modes, deterministic.** Bare verifies against the
baseline and exits non-zero on new violations whose rule is in force
(`ENG-067`: the holder standard is `active`); `--report` gives detail and
exits zero; `--write-baseline` banks progress. Same tree, same output.

**GRD-005 — The YAML is pasted, not edited.** The PR body MUST carry the
exact step — name, `run:` line, the step it follows — and nothing else in
the workflow changes. A new job, permission or action is a separate ask.

**GRD-006 — The register of guards is the workflow file.** No document MAY
keep a table of guards. What is wired is read from `ci.yml` when asked; a
script with no line there is written, not wired.

**GRD-007 — Wired means seen running on the trunk.** The handoff ends when
the agent reports the run identifier of the guard's step on `main`, not when
the YAML is pasted (`TRC-006`).

## 3. Procedure

| Step | Whose | What |
|---|---|---|
| 1 | agent | Write and test the guard (`GRD-001..004`); declare blindness (`TRC-007`). |
| 2 | agent | Put the YAML block in the PR body (`GRD-005`). Guards run before the build; a guard that reads build output runs after. |
| 3 | Oracle | Paste it into the workflow through a pull request. Branch protection requires one review; a self-approval is stated in the review body. |
| 4 | agent | Read the branch run (proof of wiring) and the trunk run (the record); report the identifier (`GRD-007`). |

```yaml
      - name: <short name> (<plate it enforces>)
        run: node scripts/<guard>.mjs
```

## 4. Verification

| Check | Evidence |
|---|---|
| Both directions | planted-breakage run and clean run in the PR body |
| Wired | `grep -nE "name:\|run:" .github/workflows/ci.yml` shows the step |
| Seen running | `gh run view <id> --log \| grep -A3 '<step name>'` on `main`, id reported |

## 5. Escalation

A guard that needs a new job, permission or action: `PRO-005`, the ask
stated separately from the guard.

## References

| Document | Title | Why it obliges here |
|---|---|---|
| `STD-005` | Engineering baseline | `ENG-031..033`: wiring, register, baseline; `ENG-067`: when a finding fails the build |
| `STD-015` | Engineering checks | `TRC-006`, `TRC-007`: proof by step, declared blindness |
| `PRO-016` | Applying the engineering standard | the task this continues |
