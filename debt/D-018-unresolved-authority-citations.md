---
id: "D-018"
uid:
title: "Nothing checks that a document cited as authority exists"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-24T23:55:00Z"
updated: "2026-08-24T23:55:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, ci, citations, authority, guards]
license: "CC-BY-4.0"
severity: high
opened_by: "Oracle, phase 1 rev.2 brief"
evidence_script: "scripts/resolve-citations.py"
evidence_head: "9b45016"
---
# D-018 — Nothing checks that a document cited as authority exists

> **Summary:** The reference lint checks links between files. It does not check
> that an identifier cited as authority resolves to a document.
> **Epistemic:** Measures how far a rule can travel from the document that
> grants it.
> **Pragmatic:** 17 identifiers, 88 citations, resolve to nothing on `main`.

## How this was found

The Oracle, reviewing the phase 1 brief:

> *"The existing lint checks links between files; it does not check that a
> document cited as **authority** exists. That is how a merged S-001 came to
> rest on an unmerged ADR."*

`S-001` is merged. It cites `ADR-004` as the authority for *never renumber* —
the rule that protects 1,617 plain-text references and governs the entire
restructure. `ADR-004` was closed without merging. **The rule was being
enforced from a document that was not in the repository.**

Worse, `S-001` §4.1 illustrates two of its own series with filenames that do
not exist:

```
| ADR-NNN | decisions/ | ADR-004-identifier-convention.md | 9/9 · 100 % |
| AUD-…   | reports/…  | AUD-2026-04-08-numengames.md     | 0/4 |
```

The document that defines the registration scheme showed two series by pointing
at ghosts.

## Why the obvious design fails

The first instinct is to detect **normative sentences** — *"per ADR-004"*,
*"as required by S-001"* — and check those. It does not work.

The most important citation in the glossary is:

> *"is never reused, is never renumbered **(ADR-004)**."*

**In parentheses, no verb, no preposition.** A normative-sentence detector was
written and run against this corpus: it returned **0 broken citations** on a
corpus that has 17. Syntax is the wrong axis.

**The design that works:** resolve *every* identifier cited anywhere against the
set of identifiers that exist, and classify what is left. Implemented as
`scripts/resolve-citations.py`.

## What it finds today

Measured at `9b45016`: **174 identifiers exist · 1,860 citations · 17 broken ·
88 citations affected.**

| Identifier | Citations | What it is |
|---|--:|---|
| `S-002`…`S-010` | **40** | **The seminal series** — see below |
| `D-002`…`D-006` | 5 | Promised by `S-001` §11, never written |
| `ADR-004` | 1 | Recovered in `recover/adr-004` |
| `P-012` | 1 | From the reverted relocation branch |
| `RPT-07` | 1 | Pre-existing |

> **This table trips the guard it describes.** Every identifier above is written
> in a code span per `S-001` §9.1 — the convention that marks an identifier as
> *data* rather than a citation. Neither linter implements the rule yet, so
> `check-references.mjs` still reads the `RPT-07` row as a live citation and
> reports it as new breakage.
>
> The convention exists precisely because this recurs: **a report about broken
> citations is itself full of broken citations, and that is what it is for.**
> Reformatting is the fix, not an exemption — an exemption would be forgotten by
> the next report, a format convention is inherited by it.

### The finding inside the finding: `S-` is a live numbering, not a stray

40 of the 88 broken citations are `S-002`…`S-010`. This is not one stale
frontmatter field in the RPG manual. `canon/INDEX.md` carries a **relationship
graph** built on it:

```
| S-001 Welcome | `summarizes` | S-002, S-005, S-006 |
| S-008 RPG Manual | `is_narrative_of` | S-…            |
```

and `STANDARDS.md` documents `S-` = *Seminal* in its prefix table.

The Oracle's ruling — `S-` belongs to `standards/`, `seminal_id` retired —
stands. But retiring it costs **40 citations across canon's own index**, not one
line of frontmatter. That work belongs to `MIS-109`, and it now has a measured
size.

### And a smaller one: `S-001` promises six debts that do not exist

`S-001` §11 says the five undefined frontmatter fields are registered as
`D-003`…`D-007`, and §7 registers `blocked_reason` as `D-002`. **None of the
six was ever written.** The section that closes the glossary points at nothing.

These numbers are therefore **reserved, not free**. This entry is `D-018`, not
`D-002`. Writing the six is its own small task: the fields are measured, what
is missing is their definition, and a debt entry is exactly where that belongs.

## The guard

```
python3 scripts/resolve-citations.py          # exit 1 if any citation is broken
python3 scripts/resolve-citations.py --at REF
python3 scripts/resolve-citations.py --json
```

**Not wired into CI in this PR.** Two reasons: it needs the `workflow` step only
the Oracle can apply (`D-017`), and it currently reports 17 pre-existing
breakages — a guard that fails on day one gets disabled. It needs a baseline,
like the reference lint has, so it fails on *new* breakage only.

### What the instrument had to learn first

Its first run reported **49 broken / 280 citations**. It was counting as missing
documents:

- **Table rows.** `SEC-10` is a row in `standards/engineering-standards.md`, not
  a document.
- **Sub-missions.** `MIS-062.2` lives inside `MIS-062`.
- **Section headings.** `P-01`…`P-12` are numbered principles inside
  `archive-summa-fundacional`.

All three now resolve to their container. **The instrument was wrong before the
corpus was** — the fourth time in one session, which is the argument for every
figure carrying `evidence_script` and `evidence_head`.

## Closing condition

Marked RESOLVED when `resolve-citations.py` runs in `ci.yml` with a baseline,
**and** the 17 current breakages are either fixed or deliberately baselined with
a reason.

## State

| | |
|---|---|
| Severity | high — rules enforced from documents that may not exist |
| Owner | Oracle |
| Blocked by | `D-017` (`workflow` scope), and 40 of the 88 by `MIS-109` |
| Opened | 2026-08-24, Oracle's phase 1 rev.2 review |
| Closes when | the guard runs with a baseline and the backlog is resolved |
