---
id: "D-001"
uid:
title: "The glossary declares rules that no machine verifies"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-24T19:20:00Z"
updated: "2026-08-24T19:20:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, ci, verification, glossary, guards]
license: "CC-BY-4.0"
visibility: "public"
severity: high
opened_by: "S-001 §1"
---
# D-001 — The glossary declares rules that no machine verifies

> **Summary:** `S-001` states dozens of rules; CI enforces one of them.
> **Epistemic:** Measures the gap between what the archive says about itself and
> what it can prove.
> **Pragmatic:** Every `[MANUAL]` marker in `S-001` points here. Closing this
> entry means converting markers into `[CI]`.

---

## Correction to the premise that opened this entry

The Oracle's instruction read: *"If there is no CI in the repo, no standard in
the glossary can claim it is verified."*

**The premise is false and it matters.** There is CI:

| Fact | Value | How to reproduce |
|---|---|---|
| Workflow | `.github/workflows/ci.yml` in `main` | `git show main:.github/workflows/ci.yml` |
| Triggers | `push` to `main`, every `pull_request` | idem |
| Total runs | **31** | GitHub API, below |
| Latest | `32726748253` · `7d17b5a` · **success** · 2026-08-24T12:22:25Z | idem |
| Actions pinned by SHA | 5/5 | `grep uses: .github/workflows/*.yml` |

```bash
curl -s https://api.github.com/repos/numengames/numinia-nwos/actions/workflows/ci.yml/runs
curl -s https://api.github.com/repos/numengames/numinia-nwos/actions/runs/32726748253/jobs
```

Steps of the latest run, verbatim from the API:

```
job: build → success
   success   licence-frontmatter guard (C-005 §5)
   success   install
   success   build
```

**The real problem is not the absence of a pipeline. It is its coverage.**

## The gap

| Rule declared in `S-001` | Verified? |
|---|---|
| `license` matches `REUSE.toml` | ✅ `[CI]` — `check-license-frontmatter.mjs` |
| The site builds after a structural change | ✅ `[CI]` — `npm run build` |
| `id` present and matching the series scheme | ❌ |
| `type` consistent with its folder (§3) | ❌ |
| `status` within the closed vocabulary | ❌ |
| `guild`, `territory`, `priority`, `effort`, `type_execution` in vocabulary | ❌ |
| `created` without `T00:00:00Z` | ❌ |
| Filename without version or date | ❌ |
| Cited identifiers actually exist | ❌ — script written, not wired |
| `uid` empty | ❌ |

**Two of eleven.** A rule that only a human enforces is a rule that erodes: it is
how `type_execution` came to hold values in two languages, and how 121 documents
came to declare a birth time nobody wrote at.

## Closing condition

This entry is marked RESOLVED when **every rule in `S-001` carries `[CI]` or an
explicit, argued `[MANUAL]`** — not `[MANUAL]` by omission.

Proposed order, cheapest first:

1. **`check-references.mjs`** — already written and tested; wiring it in is one
   line in `ci.yml`. Requires a token with `workflow` scope, which the agent does
   not have.
2. **`lint-frontmatter.mjs`** — mandatory fields present, values within
   vocabulary. Covers 6 rules at once.
3. **`lint-naming.mjs`** — filename against series scheme; no version or date.
4. **`lint-type-vs-folder.mjs`** — §3 of the glossary, machine-checkable.

Guards 2–4 do not exist. Each is half a day and closes several rows of the table.

## Why this is not just a task

An `[MANUAL]` marker is honest; an undeclared one is a lie by omission. While
this entry stays open, **`S-001` may not claim that the archive verifies
itself** — only that it describes itself, and that a human keeps the description
true.

Registering it as debt rather than as a task is deliberate: a task gets done or
forgotten, and nobody notices. **Debt is append-only and shows up in every
audit.**

## State

| | |
|---|---|
| Severity | **high** — affects the credibility of every rule in the archive |
| Owner | Oracle |
| Blocked by | agent has no `workflow` scope for step 1 |
| Opened | 2026-08-24, by `S-001 §1` |
| Closes when | every rule carries `[CI]` or argued `[MANUAL]` |
