---
id: "STD-007"
uid:
title: "Standards read as prose, not as pointers"
type: documentation
subtype: standard
status: draft
version: "0.1.0"
created: "2026-09-03T10:30:00Z"
updated: "2026-09-03T10:30:00Z"
author: "ursa"
owner: "oracle"
license: "CC0-1.0"
tags: [standards, writing, references, readability]
---

# STD-007 — Standards read as prose, not as pointers

> **Summary:** A standard's body speaks in plain names, not IDs; its
> structural links live in one list at the end, not scattered mid-sentence.
> **Epistemic:** Why a standard full of `STD-00X §4`-style citations decays
> without anyone noticing, and the two-part fix that stops it.
> **Pragmatic:** How to write and check the body of any `standards/` document.
> **Audience:** Agents · Oracles

---

## 1. Purpose and scope

This standard binds the body text of every document in `standards/`. It does
not bind `canon/`, `protocols/`, `decisions/`, or any other series — they
keep their own citation habits.

It exists because the corpus already broke this way once: `debt/` and
`standards/` files cited `D-011`, `D-042`, and others by a short ID whose
target had since been renamed or merged away. The link rotted; the guard
that should have caught it had never been taught the new prefix, so nothing
failed and nobody looked. The fix is not "check links harder" — it is
writing standards so most of them never need a link that can rot.

## 2. The norm

**RULE-01 — Name things, don't code them.** A standard's body MUST refer to
other standards, protocols, or decisions by their plain-language subject —
"the header standard", "the governance rules" — never by bare ID
(`STD-004`, `PRO-010`) inside a sentence. A reader who has never opened the
ID registry must still understand what is meant.

**RULE-02 — Say the rule, don't chase it.** If this standard's own
requirement depends on a rule defined elsewhere, MUST restate that rule
here in one or two sentences, in this document's own words, instead of
sending the reader to go read it. Whoever rewrites the other document does
not owe this one a warning.

**RULE-03 — References go in one place.** Every `STD-NNN`, `PRO-NNN`,
`ADR-NNN`, or similar ID this document actually depends on MUST be listed
in a single `## References` section at the end of the body — nowhere else.
That section is a table: ID, plain name, one line on why it's cited. A
reader who does not care about provenance can stop before that section and
still have the whole rule.

**RULE-04 — Section-number citations are the one thing still banned
outright.** `§4`, `§2.1`, and similar pointers into another document's
internal structure MUST NOT appear anywhere, including in the References
table. Section numbers shift on the next edit and nobody updates the
citation; a document name in the References table does not have this
problem, because it points at the whole document, not a coordinate inside
it.

**Short by default.** A standard SHOULD read start to finish in one sitting.
If the norm section grows subsections that could each be cited on their own,
they are two standards, not one long one — the header standard already states
this rule for itself; it applies here too because it is a good rule, not
because this document points at it.

## 3. Conformance

| Check | Rule | Verified by |
|---|---|---|
| `PW-01` | No bare `STD-NNN`/`PRO-NNN`/`ADR-NNN`/`DBT-NNN`/`CAN-NNN` token inside body prose, outside the References table | `scripts/check-plain-writing.mjs` |
| `PW-02` | No `§N` / `§N.N` section-pointer token anywhere in the document | `scripts/check-plain-writing.mjs` |
| `PW-03` | Every ID that does appear in the document is listed once in `## References` | `scripts/check-plain-writing.mjs` |
| `PW-04` | Document is readable start to finish without needing to open another document mid-read | `[MANUAL]` — a human editorial judgment, not mechanizable |

The first three are mechanically checkable and ship with a guard,
`scripts/check-plain-writing.mjs`, as a ratchet: the standards written before
this one do not conform, and this document does not ask them to until each is
next reopened. Their current violations are frozen in a baseline, so the guard
reports new prose only. Wiring it into CI needs a token permission this branch
does not have; until then it runs on demand. A rule nobody can check is a rule
that decays — this corpus has already lost one that way.

## 4. What this standard does NOT do

It does not forbid frontmatter fields like `supersedes`, `ratified_by`, or
`absorbs` — those are structured data for a guard, not prose, and are
exactly where such relations belong.

It does not require rewriting the five standards that predate it. They
conform the next time each is substantively reopened, same rule the header
standard already uses for itself.

It does not cover non-`standards/` series. The canon, protocol, and decision
series may reference each other by ID in prose today; changing that is a
separate decision, not made here.

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-004` | The header standard | Source of the "one standard, one thing" split rule this document reuses in its norm section, and of the "conforms when next reopened" grandfathering rule used in its scope section. |
