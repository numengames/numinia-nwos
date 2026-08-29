---
id: "D-017"
uid:
title: "Every CI guard needs the Oracle's hands: the agent has no workflow scope"
type: documentation
status: closed
version: "2.0.0"
created: "2026-08-24T23:00:00Z"
updated: "2026-08-29T21:45:00Z"
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
cheap half; every one of them then waits on a manual step.

> **Corrected 2026-08-28.** The table below was stale in both directions and
> is now read from `.github/workflows/ci.yml` at `3d01bc2` rather than
> remembered. `check-references.mjs` **is** wired; `check-orphan-content.mjs`
> was wired and was missing from the table entirely; `lint-type-vs-folder`
> no longer needs to exist (folded into `lint-frontmatter` as check `H-17`).
> The register now lives in **`P-013` §4**, with the rule that it is re-read
> from the workflow, never copied. A stale coverage table is the same defect
> class this entry was opened to name.

| Guard | Written? | Wired? |
|---|---|---|
| `check-license-frontmatter.mjs` | yes | **yes** |
| `check-references.mjs` | yes, tested | **yes** |
| `check-orphan-content.mjs` | yes | **yes** — post-build (needs `web/dist`) |
| `lint-frontmatter.mjs` | yes — `#116`, 844 baselined | **yes** — `#126`, run `33276755484` |
| `lint-naming.mjs` | no | no |
| ~~`lint-type-vs-folder.mjs`~~ | folded into `lint-frontmatter` (`H-17`) | n/a |

One handoff pending, and one more for each guard added afterwards. Without
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

> **Half met, 2026-08-28.** The procedure exists: **`P-013`**. Of the guards,
> three are wired and `lint-frontmatter` is the single pending handoff, with
> its YAML block ready in `#116`/`#117`. This entry closes when that block is
> in `ci.yml` and a green run on `main` is reported here — not before.
> `lint-naming` is explicitly **deferred**: `S-001` §9 is still being applied
> to the corpus (`MIS-109` renames pending), so the guard would freeze a
> baseline of work in flight.

> **Handoff offered, 2026-08-29 (`bc76270`).** Step 1 of `P-013` is done and
> verified in both directions on a **pristine clone of `main`**, not on the
> working tree:
>
> | Check | Result |
> |---|---|
> | Clean tree | `844 findings (844 baselined) — no new violations`, exit `0` |
> | Planted breakage (`debt/ZZZ-planted.md`: bad `id`, `status: banana`, non-SemVer `version`, missing `created`/`updated`, `type: mission` in `debt/`) | 6 NEW findings cited `H-01 H-04 H-05 H-06 H-07 H-17`, exit `1` |
> | Breakage removed | back to exit `0` |
>
> Reproduce:
> ```bash
> git clone --depth 1 https://github.com/numengames/numinia-nwos.git /tmp/nwos && cd /tmp/nwos
> node scripts/lint-frontmatter.mjs; echo "clean exit=$?"
> ```
>
> The baseline is re-frozen at **844** in this PR: `MIS-120` healed its own
> `H-07` (`updated` gained a real time in `c8276cf`) and the lint had been
> printing `1 baselined finding(s) healed — regenerate the baseline` on every
> run since. Banking it before wiring means the guard's first CI run is
> silent instead of nagging. **The count only ever goes down.**
>
> Step 3 is the Oracle's. This entry stays `open` until a green run ID on
> `main` is written below.

> **Wired and verified, 2026-08-29 (`baf188b`).** The step is in `ci.yml`
> and has run on `main`.
>
> | | |
> |---|---|
> | Run ID | [`33276755484`](https://github.com/numengames/numinia-nwos/actions/runs/33276755484) |
> | Conclusion | `success` |
> | Head SHA | `baf188b` |
> | Step output | `844 findings (844 baselined) … no new violations — the ratchet holds` |
>
> Wired by the Oracle in `#126` — **not** by a direct commit to `main`: the
> `protect-main` ruleset requires a pull request and one approving review,
> so even the Oracle's own workflow edit goes through a PR. `P-013` §1 said
> "the Oracle pastes it into `ci.yml`" and implied a direct commit. It is
> a PR. The protocol is corrected accordingly.
>
> The approving review on `#126` was given by `ursa-numinia` at the
> Oracle's instruction — the agent approving the wiring of a guard the
> agent wrote. Authority was not in question; independence was. Recorded
> in the review comment and here rather than passed over in silence.

This entry does not close by getting the scope. It closes by making its absence
survivable.

## State

| | |
|---|---|
| Severity | medium — no data at risk, but it throttles every future guard |
| Owner | Oracle |
| Blocked by | nothing |
| Opened | 2026-08-24, Oracle's phase 0 review |
| Closed | 2026-08-29 — `P-013` written, three guards wired, `lint-frontmatter` wired (`#126`, run `33276755484`), `lint-naming` explicitly deferred |
| Closes when | the handoff is documented and the four guards are resolved — **met** |

> **Why `status: closed` and not `resolved`.** Three sibling entries say
> `resolved`; 38 open ones say `open`. Neither word is in the lifecycle
> `S-004` gives `type: documentation` — `[draft active closed]` — so all 41
> sit in the baseline as `H-04` violations. The guard, running for the
> first time on this very entry, rejected `resolved` as a NEW violation.
> The baseline may shrink and never grow (`S-004` §7), so the conforming
> value wins and the entry's own `H-04` heals: **844 → 843**.
>
> That the debt series runs an undeclared vocabulary (`open`/`resolved`)
> against a type lifecycle that admits neither is a real defect, adjacent
> to `D-008` and `D-012`. It is **not** fixed here and it is **not**
> silently normalised across the other 40 files: renaming a live status
> vocabulary is the Oracle's call, not a side effect of closing an
> unrelated entry.
>
> **Where this sits on the board.** This entry was worked as a standalone
> handoff and only afterwards recognised as the first blocker of
> **`MIS-121`** — the header baseline burn-down. The guard had to be running
> in CI before any migration against it could be verified. Registered there
> as a cleared check, with this entry as its evidence.
>
> **What remains true after closure.** The constraint itself has not gone
> away and never will: the agent still cannot write `.github/workflows/`.
> What closed is the *bottleneck* — the handoff is a documented, exercised
> procedure instead of a wall rediscovered once per mission. Every future
> guard still costs one Oracle PR. That is the intended price.
