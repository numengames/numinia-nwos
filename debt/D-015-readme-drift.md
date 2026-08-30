---
id: "D-015"
uid:
title: "The README described a repository that no longer existed"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-24T21:50:00Z"
updated: "2026-08-24T21:50:00Z"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [debt, readme, drift, entry-point]
license: "CC-BY-4.0"
visibility: "public"
severity: medium
opened_by: "README rewrite, 2026-08-24"
---
# D-015 — The README described a repository that no longer existed

> **Summary:** The most-read file in the archive drifted for four months and
> nothing detected it.
> **Epistemic:** Measures how far the entry point can diverge from the thing it
> introduces before anyone notices.
> **Pragmatic:** The README is fixed. What is not fixed is that nothing would
> have caught it, or will catch the next one.

## What the old README claimed that was not true

Found while rewriting. Each was verified before being listed here.

| Claim | Reality |
|---|---|
| Repository named `numinia-digital-agents` — in the title, the H1 and the tree diagram | The repository is `numinia-nwos`. Renamed at some point; the README was not |
| Link to `decisions/DEC-006-english-as-repo-language.md` | **Broken.** The file is `DEC-006-english-official-repo-language.md`. The link justifying the repo's language did not resolve |
| Structure listing 7 folders | **8 more exist** and were absent: `standards/`, `reports/`, `debt/`, `guilds/`, `web/`, `scripts/`, `LICENSES/`, `build/` |
| `web/` not mentioned at all | `web/` **serves numinia.org**. The single most consequential fact about this repo was missing from its front page |
| Mission states: `draft → backlog → in-progress → in-review → done`, plus `frozen`, `cancelled` | `cancelled` no longer exists (converted to `frozen` + `freeze_reason`), and `backlog`/`draft` are withdrawn by `S-001` §7 |
| Ursa, Senet, Procurador-01 listed as "Designed" | All three have `SOUL.md` and appear in `agents/INDEX.md`. Ursa authored this entry |
| Six emoji in the agent and mission tables | Emoji were removed from the corpus deliberately (~140 replaced with Phosphor glyphs, 2026-08-18). The README kept its own |
| `Numen Games (OS) → Functional Model → Numinia (Narrative)` | Propagates `Functional Model`, **withdrawn from canon** on 2026-05-06 → `D-012`. The README was one of the 21 documents carrying the retired term |

## Why this matters more than a stale file

Two of these are not staleness, they are **contradiction**:

- The README taught `cancelled` and `backlog` to every reader while `S-001`
  withdrew them.
- The README propagated `Functional Model` while canon replaced it four months
  ago — making the entry point of the archive a vector for `D-012`.

An out-of-date index is a bug. **An out-of-date entry point teaches the wrong
thing to everyone who arrives**, including agents opening a cold session.

## Closing condition

Marked RESOLVED when a machine catches this class of drift. Concretely, one of:

1. **`check-references.mjs` wired into CI** — would have caught the broken
   `DEC-006` link on the day it broke. The script exists; wiring it needs a
   token with `workflow` scope (`D-001`).
2. **A terminology guard** — would have caught `Functional Model`. Needs the
   list of retired terms, which is the output of `D-012` step 1.
3. **A vocabulary guard on prose** — would have caught `cancelled` surviving in
   the README after being removed from the corpus.

None of the three exists today. Until one does, the README stays correct only
for as long as someone remembers to check it.

## State

| | |
|---|---|
| Severity | medium — the file is fixed; the detection gap is not |
| Owner | Oracle |
| Blocked by | `D-001` (no `workflow` scope), `D-012` (needs the term ruling) |
| Opened | 2026-08-24, during the README rewrite |
| Closes when | a machine catches entry-point drift |
