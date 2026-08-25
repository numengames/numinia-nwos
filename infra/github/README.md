---
id: "INFRA-github"
title: "GitHub repository configuration, as declared files"
type: standard
status: active
version: "1.0.0"
created: "2026-08-25"
updated: "2026-08-25"
author: "ursa"
owner: "oracle"
tags: [infrastructure, github, rulesets, governance, D-011]
license: "CC-BY-4.0"
---
# `infra/github/` — repository configuration, written down

> **Summary:** the GitHub settings that govern this repository, exported as
> files so they can be read, diffed and reviewed.
> **Epistemic:** settings that live only in a web panel are invisible to every
> instrument this archive has. These are not.
> **Pragmatic:** read the JSON to know what `main` requires today.

---

## ⚠️ These files are a MANUAL EXPORT, not the source of truth

**Today the source of truth is the GitHub panel.** These files are a snapshot
of it, taken by hand on the date each one records. Nothing applies them, and
**nothing detects it when they drift**.

That is the same failure this archive keeps finding: a document that describes
a state it does not control. It is recorded here rather than hidden, and the
direction is stated so the next reader knows which way it goes:

> **When Terraform (or any declarative applier) exists, these files become the
> source and the panel becomes the projection.** Until that day, a difference
> between this folder and the panel means **the panel is right and this folder
> is stale**.

Re-export before trusting them:

```bash
gh api repos/numengames/numinia-nwos/rulesets/21281544 \
  > infra/github/ruleset-protect-main.json
```

### One known, benign difference from the API response

A field-by-field comparison of this export against the live API on 2026-08-25
matched on `id`, `name`, `target`, `enforcement`, `conditions` and `rules`, and
differed on exactly one key: **`bypass_actors`**.

The API **omits** the key entirely when no actor can bypass; the export states
it as `"bypass_actors": []`. Same meaning, different shape — and the explicit
form is kept deliberately, because *"nobody bypasses this ruleset"* is the most
important thing the file says and an absent key does not say it.

**A future comparison script must treat a missing `bypass_actors` as `[]`**, or
it will report drift on every run and be ignored within a week.

---

## `ruleset-protect-main.json`

Exported **2026-08-25**, verified against the live API the same day
(`updated_at: 2026-08-25T18:45:52Z`). Ruleset `21281544`, `enforcement: active`,
applied to `~DEFAULT_BRANCH`.

What it requires today:

| Rule | Effect |
|---|---|
| `pull_request` | No direct push to `main`. **0 approvals required** — the gate is the checks, not a reviewer. |
| `required_status_checks` | `build` (Actions, id 15368) and `Workers Builds: numinia-nwos` (Cloudflare, id 85455) must pass. |
| `required_linear_history` | No merge commits on `main`. |
| `non_fast_forward` | No force-push. |
| `deletion` | `main` cannot be deleted. |
| `bypass_actors` | **empty — nobody bypasses it, including admins.** |

### Three things worth knowing before changing it

**`strict_required_status_checks_policy: false`.** A branch does **not** have to
be up to date with `main` before merging. That is why the squash-merges of
2026-08-25 produced `add/add` conflicts on branches that had not rebased: the
ruleset permits merging stale branches. Setting it `true` would force a rebase
before every merge — more friction, fewer surprise conflicts.

**`Workers Builds` is an external dependency in the critical path.** A
Cloudflare outage blocks every merge to `main`, including changes that do not
touch `web/`. Deliberate — it is what makes "merged" mean "deployed" — but it
is a coupling to know about.

**`CodeQL` and the three `Analyze (…)` checks are NOT required.** They run and
report, but a PR merges without them. Only `build` and `Workers Builds` gate.

### What this ruleset does not do yet — `D-011`

- **No `require signed commits`.** Agent commits are unsigned
  (`verified: false, reason: unsigned`); the signatures visible on `main` are
  GitHub's web-flow key applied at squash time, which says nothing about who
  wrote the commit — see `D-019`.
- **No `require_code_owner_review`.** `.github/CODEOWNERS` exists but no rule
  requires its review, so `canon/` has no mechanical gate.

---

## A note on this folder's own visibility

`infra/` is **not** in the corpus glob (`web/src/content.config.ts`), so this
README does not reach numinia.org. That is correct — it is configuration, not
corpus — but it is the same shape as `D-023`: a new top-level folder is
invisible by default, and nothing announces it either way.

Recorded here so the exemption is **declared rather than accidental**, which is
the distinction `D-023` asks for. No debt opened.
