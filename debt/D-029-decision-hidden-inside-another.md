---
id: "D-029"
uid:
title: "A decision travelling hidden inside another"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-25T14:33:22Z"
created_source: "git:c70c847"
created_confidence: "exact"
updated: "2026-08-25T14:33:22Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, decisions, licensing, authority, ADR-023, MIS-109]
license: "CC-BY-4.0"
severity: high
opened_by: "Oracle, 2026-08-25"
evidence_script: "reports/audits/evidence/regime-crossings.py"
evidence_head: "f2ae2c9"
---
# D-029 — A decision travelling hidden inside another

> **Summary:** The Oracle ruled on a document's **genre**. Executing that
> ruling would also have changed its **licence** — from reserved to
> irrevocably open — and nobody decided that.
> **Epistemic:** An approved decision can carry an effect of a different
> nature. The approval covers the decision, not the passenger.
> **Pragmatic:** Caught with the branch already pushed, by the Oracle asking
> what the document actually contained.

## The finding

The Oracle, on the `Platform Role System` move:

> *"Your self-correction is the finding of the day and needs a name: a decision
> travelling hidden inside another. I signed the genre; the regime was taken as
> a consequence and nobody approved it. The rule: when an approved decision
> drags an effect of a different nature — legal, security, identity — that
> effect is a separate decision and needs its own signature."*

## What happened

**Decided, and correctly:** `canon/Platform Role System.md` is a standard, not
world vocabulary. A permissions matrix for an artifact — 18 table rows, zero
narrative markers — filed as canon because nobody had looked. `ADR-023`.

**Not decided, and nearly done:** `REUSE.toml` assigns
`LicenseRef-Numen-AllRightsReserved` to `canon/**` and `CC-BY-4.0` to
`standards/**`. Moving the file therefore **releases it under an open,
irrevocable licence** — the same mechanism as the CC0 incident in
`LEGAL_DEBT.md`, where content published under CC0 through commit `0157be9`
*"was offered irrevocably and has not been revoked"*.

And the agent wrote, in that branch's frontmatter:

> *"This is a legal consequence of the genre ruling, **not a separate
> decision**."*

**That sentence was the defect.** It converted an unmade decision into a
footnote of one that had been made.

What the document actually contains, measured after the Oracle asked:

- `NOMAD`, `CITIZEN`, `PILGRIM`, `VERNACULAR`, `ARCHON`, `ORACLE` — the domain
  model's own rank names
- Promotion tied to **Session Zero** (`C-006`), **guilds** and **factions** —
  all reserved canon
- *"Maximum 4 Oracles"*, *"Oracles cannot be banned (3-layer protection)"* —
  organisational governance
- Declares itself *"based on the STSI framework and **Numinia's seminal
  documents**"*

Under CC-BY anyone could publish an identical rank system. Attribution does not
prevent it; it only requires a credit line.

## Why it is a class and not an incident

The mechanism generalises past licensing:

| Approved decision | Hidden passenger |
|---|---|
| Move a file between folders | **Licence regime** — inherited from the path |
| Rename an agent | **Provenance** — 57 commits keep the old author (`D-027`) |
| Rename a published file | **Public URL** — derived from the filename (`D-028`) |
| Publish a folder | **Exposure** — `debt/` was invisible, then wasn't (`D-023`) |

In every case the effect is **real, automatic, and of a different nature than
the decision that triggered it**. And in every case it is invisible in the diff,
because the mechanism deriving it lives elsewhere: `REUSE.toml`, git's object
model, Astro's router, a glob in `content.config.ts`.

> This is `S-001` §10.0's plausible artefact in the register of decisions: **an
> effect that looks approved because the decision it rode in on was.**

## Measured: has it happened before?

`reports/audits/evidence/regime-crossings.py` resolves every path in the
repository against `REUSE.toml` — last matching rule wins, as REUSE does — and
compares source and destination for **every rename in the whole history**.

```
12 rules read from REUSE.toml
 1 rename crossed a regime in the entire history
   → canon/Platform Role System.md → standards/S-003-…  (this one, reverted)
```

**Zero undeclared crossings before today.** The resolver was verified against
the six known regimes first, including the two per-file exceptions, so the zero
is a measurement and not an empty query (`S-001` §10.1).

## The resolution

The document goes to `standards/` **and keeps its birth regime**, declared
explicitly in the frontmatter and pinned by a per-file exception in
`REUSE.toml` — the same pattern already used for `operations/legal/**` and the
Design System.

The Oracle's reasoning, which is also the rule for future cases:

> *"I prefer a badly filed document to a well filed and badly licensed one."*

## What would close it

- [ ] `S-001` gains a section: an approved decision authorises **what it says**,
      never what it derives. Effects of a different nature are listed before
      execution and signed separately
- [ ] A guard fails any PR where a rename crosses a `REUSE.toml` regime without
      an explicit annotation — `regime-crossings.py` already does the detection
- [ ] The known derivation mechanisms are documented in one place: path →
      licence, filename → URL, folder → publication, author → provenance

The third is the one that generalises. **Each of these was discovered by being
bitten**, and nothing lists them for the next person.

| | |
|---|---|
| Severity | **high** — one instance was an irrevocable licence release |
| Owner | Oracle |
| Blocked by | nothing; `D-017` for the CI step |
| Opened | 2026-08-25, at the Oracle's instruction |
| Closes when | derived effects are declared before execution, not after |
