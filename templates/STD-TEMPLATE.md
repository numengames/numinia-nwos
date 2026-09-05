---
# Copy this file to standards/STD-NNN-<kebab-slug>.md and fill it in.
# The filename shape is enforced: STD-NNN-slug.md, three digits, kebab-case.
id: "STD-NNN"
uid: ""
title: "The rule, stated — not the topic"
type: documentation
subtype: standard
# status: draft | active | superseded | withdrawn — a standard opens at draft
status: draft
# every artifact starts at 0.1.0; only the Oracle promotes to 1.0.0
version: "0.1.0"
created: "YYYY-MM-DDTHH:MM:SSZ"
updated: "YYYY-MM-DDTHH:MM:SSZ"
author: "agent-id"
owner: "oracle"
license: "CC0-1.0"
tags: [area, subject]

# OPTIONAL — use when they apply, omit without guilt.
# ratified_by: "ADR-NNN"            # the decision that moved this from draft to active
# supersedes_version: "1.2.0"
# threshold: sealed                 # when this standard amends canon/
# series_change: "what this changes about the series itself"
---

# STD-NNN — The rule, stated

> **Summary:** One sentence. WHAT this standard requires.
> **Epistemic:** What you learn by reading it.
> **Pragmatic:** What you can do once you have read it.
> **Audience:** Agents · Oracles

<!-- Title: state the rule, not the subject. "The header in three rings" —
     not "Headers". A reader scanning the index must know what is required
     without opening the file. -->

---

## 1. Purpose and scope

Why this standard exists, and what it binds.

Name the objects it obliges — series, folders, file kinds, roles — and the
ones it does not. A standard whose scope is "the repository" obliges
nothing in particular and will be ignored in particular.

If the standard replaces something, say what and why, here, in one
paragraph.

---

## 2. The norm

The body. Every normative statement uses RFC 2119 language:

- **MUST** / **MUST NOT** — required. A violation is a defect.
- **SHOULD** / **SHOULD NOT** — recommended. Departing from it requires a
  written reason in the document that departs.

Do not write "should" as a synonym for "must". If both appear with the same
force, the reader will obey neither.

**Cite the rule, never the place.** A standard MUST NOT point at a section
number or a heading in another document — no "see `STD-00X` §4", no "as
described in `PRO-0XX` step 3. Sections get renumbered, headings get
rewritten, and the pointer quietly survives the paragraph it pointed at.

A standard MUST cite a **rule identifier** instead — `CORE-03`, `H-30`,
`SEC-07`. An identifier is stable, and a guard can verify that it still
resolves. That is the whole difference: an address decays, a plate does not.

**Do not restate a rule that already has an identifier.** Restating it makes
two sources for one obligation, and they drift apart on the first amendment.
State the rules this standard owns; cite the ones it depends on. If you find
yourself writing "as X requires, namely: ...", stop — cite X and delete the
namely.

Structural relations (`supersedes`, `ratified_by`, `absorbs`) belong in
frontmatter, where a guard can verify them.

**One standard, one thing.** A grouping of concepts is legitimate when it is
a single conceptual distinction. Sharing a date, a mission, or an amendment
target is not a grouping — it is a coincidence, and produces a document
nobody can cite precisely.

<!-- Subsections as needed. If this section grows two independent halves
     that could each be cited alone, they are two standards. -->

---

## 3. Conformance

How an object is judged to comply, and how it fails.

Every normative statement in §2 SHOULD carry a check identifier and a means
of verification:

| Check | Rule | Verified by |
|---|---|---|
| `X-01` | one-line restatement of the MUST | `node scripts/<guard>.mjs`, or `[MANUAL]` |

A worked row, from the header standard:

| Check | Rule | Verified by |
|---|---|---|
| `H-01` | `id` is present and matches its series prefix | `node scripts/lint-frontmatter.mjs` |
| `H-02` | `title` is present, non-empty, English | presence by `lint-frontmatter`; language `[MANUAL]` — detectors lie |

A rule that cannot be checked mechanically is marked **`[MANUAL]`** and says
why in one sentence. There is no third kind — an unverifiable rule with no
`[MANUAL]` mark is an opinion that has learnt to look official.

If no guard exists yet, state the manual criterion anyway. **A standard
without a conformance section is not a standard**: if you cannot say how
something fails it, nothing can comply with it.

---

## 4. What this standard does NOT do

The border. Name the adjacent things a reader will reasonably assume are
covered and are not, and where they live instead.

This section exists because the commonest failure of a standard is not being
wrong — it is being stretched to govern what it never examined.

---

## 5. References

- [`STD-004` — The header standard](../standards/STD-004-header-standard.md)

<!--
NOTES ON USING THIS TEMPLATE — delete this block.

Length: a standard that will not fit in a reading is not one standard.
There is no hard line limit, but if §2 needs several independent
subsections that could each be cited alone, split the document.

Status: a standard opens at `draft`/0.1.0 and is promoted by the Oracle.
`active` means it binds; `closed` means it is retired, not paused.

No version history section. `git log --follow` on this file is the history,
it cannot drift from the truth, and a hand-written changelog can. What the
frontmatter carries is the current `version` and the structural relations
(`supersedes`, `absorbs`, `ratified_by`) that a guard can check.

Sections: 1-5 are required. Add others only when they earn their place —
a measured problem statement (`STD-004` §0) is worth its space when the
standard exists because something was counted; a worked example is worth
its space when the rule is easy to misread. Nothing else is.
-->
