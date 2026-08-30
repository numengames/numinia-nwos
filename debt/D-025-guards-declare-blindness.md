---
id: "D-025"
uid:
title: "No guard declares what it is blind to"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-25T13:02:12Z"
created_source: "git:d204ed7"
created_confidence: exact
updated: "2026-08-25T13:02:12Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, guards, ci, blind-spots, plausible-artefacts, D-001]
license: "CC-BY-4.0"
visibility: "public"
visibility_reason: >
  Describes what guards cannot see, in the abstract. Publishing it is the
  point: a guard that declares its blindness is more trustworthy, not less.
severity: medium
opened_by: "Oracle, 2026-08-25"
evidence_script: "scripts/check-references.mjs"
evidence_head: "8770939"
---
# D-025 — No guard declares what it is blind to

> **Summary:** Every guard in this repository reports what it checked. None
> reports what it cannot see, so a green result reads as broader coverage than
> it is.
> **Epistemic:** The fourth countermeasure against plausible artefacts
> (`S-001` §10.0), and the only one with no mechanism.
> **Pragmatic:** A markdown linter passed clean while the published site was
> broken, and nothing in its output suggested it might not know.

## The finding

`S-001` §10.0 names four countermeasures against plausible artefacts. Three are
implemented — name the unit, declare the source, read the step not the run. The
fourth had no shape until the Oracle gave it one:

> *"The gap you say you cannot close does have a shape: **each guard declares
> what it is blind to.** The markdown lint does not see TypeScript, the run's
> conclusion does not see a missing step, the counter does not see the unit.
> Open it as debt with that closing condition even if you cannot implement it
> yet — a named gap is a gap somebody can attack."*

## The three blind spots already measured

Each was found by a failure, not by reading the guard:

| Guard | Sees | **Blind to** | How we found out |
|---|---|---|---|
| `check-references.mjs` | `.md`, `.json` | **`.ts`, `.astro`** — slug maps, `import.meta.glob`, any consumer written in code | Phase 1: renaming two legal documents broke the site while this passed clean. Only `npm run build` knew |
| Workflow run conclusion | that nothing failed | **a step that is not there** — a run without the guard is identical to a run with it | The Oracle wired the reference lint and the first attempt came back green without the step |
| `check-license-frontmatter.mjs` | `license:` matches `REUSE.toml` | **whether the licence is correct** for the content — it verifies consistency, not legal fit | Not yet bitten; stated here before it is |

And the fourth, from `D-023`: the corpus glob in `content.config.ts` is blind to
**folders that do not exist yet**, which is why nine series were invisible for
134 days.

## Why "read the source" is not the answer

Every one of these is discoverable by reading the script. Nobody did, because a
guard's output is what people read, and a guard's output says only what it
found.

> A green result answers *"did what I check pass?"* and is read as *"is the
> repository sound?"*. **The gap between those two questions is exactly the size
> of the blind spot, and it is never printed.**

That makes this a documentation problem with an implementation, not the reverse:
the knowledge exists in the code and never reaches the reader.

## Proposed shape

Not designed, deliberately — this entry is opened to be attacked, and the shape
below is a starting point:

```
reference lint: 268 documents · 191 identifiers indexed
  broken markdown links : 13
  unresolved identifiers: 4
  ✓ no new broken references.

  BLIND TO: consumers written in code (.ts, .astro) — slug maps and
  import.meta.glob are invisible here. `npm run build` is the guard for those.
```

Two properties worth keeping:

1. **The blindness is printed on success**, not buried in a README. A green run
   is exactly when the reader most needs to know what was not checked.
2. **It names which guard does cover it**, where one exists. `npm run build`
   covers the `.ts` consumers; nothing covers licence correctness.

A machine-readable form (`blind_to:` in each script's header, aggregated into a
coverage table) is the obvious next step and would let a future guard check that
every declared blind spot is covered by some other guard — or is knowingly
uncovered.

## Closure

Marked RESOLVED when:

- [ ] Every script in `scripts/` declares its blind spots in its own output, on
      success as well as failure
- [ ] A table in `S-001` §10 lists each guard, what it covers and what it does
      not, with the covering guard named where one exists
- [ ] The blind spots are verified by test, not asserted — a guard claiming to
      see `.ts` files is checked against a `.ts` file that breaks

The third is what keeps this entry from becoming its own plausible artefact: a
declared blind-spot list nobody verified is a claim about coverage with the
shape of evidence.

| | |
|---|---|
| Severity | medium — no data lost; every green result overstates its coverage |
| Owner | Oracle |
| Blocked by | nothing — this is agent work |
| Opened | 2026-08-25, at the Oracle's instruction |
| Closes when | guards print their blindness and it is verified by test |
