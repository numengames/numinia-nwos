---
id: "STD-004"
uid: ""
title: "The header in three rings: identity, provenance, extension"
type: documentation
subtype: standard
status: active
version: "2.0.0"
created: "2026-08-28T15:10:00Z"
created_source: "git:4c0a02e"
created_confidence: exact
updated: "2026-09-03T23:50:00Z"
ratified_by: "ADR-027 (formerly ADR-029)"
author: "ursa"
owner: "oracle"
license: "CC0-1.0"
tags: [frontmatter, standard, lint, metadata]
---

# STD-004 — The header in three rings

> **Summary:** What a conformant document header contains, field by field,
> and which check enforces each rule.
> **Epistemic:** Why the header is the machine interface of the corpus.
> **Pragmatic:** Write or review any header against this document.
> **Audience:** Agents · Oracle

**Design rule of this standard:** every normative statement carries a check
identifier and is written so the header lint can implement it mechanically,
one to one. A rule that cannot be checked is marked `[MANUAL]` and says why.
There is no third kind.

## 1. The three rings

A header is complete when it answers three questions a third party would ask
of any archived document: **what is this** (identity), **where did it come
from** (provenance), **what else does its series need** (extension).

```
┌─ Ring 3 · EXTENSION ── per-series, registered here or invalid ─┐
│ ┌─ Ring 2 · PROVENANCE ── who and whence, degrades to declared ┐ │
│ │ ┌─ Ring 1 · IDENTITY ── 8 fields, strict, no exceptions ─┐ │ │
│ │ │  id · title · type · status · version                  │ │ │
│ │ │  created · updated · license                           │ │ │
│ │ └────────────────────────────────────────────────────────┘ │ │
│ │   author · owner · provenance · created_source             │ │
│ │   created_confidence · requested_by · relations            │ │
│ └────────────────────────────────────────────────────────────┘ │
│    missions: priority effort guild … · reports: severity …     │
└────────────────────────────────────────────────────────────────┘
```

The rings are cumulative: Ring 1 is mandatory for every document, Ring 2 for
every document that makes a claim, Ring 3 as each series registers. **A field
in no ring is invalid** — that single rule is what stops the field count
growing without limit.

## 2. Ring 1 — identity

| Field | Rule | Check |
|---|---|---|
| `id` | present; matches its series prefix, or `registration: exempt` with a reason | **H-01** |
| `title` | present, non-empty, English | **H-02** (presence; language `[MANUAL]` — detectors lie) |
| `type` | present; value in the vocabulary of section 4 | **H-03** |
| `status` | present; value in the lifecycle of its type | **H-04** |
| `version` | present; semantic version, no `v` prefix | **H-05** |
| `created` | present; ISO 8601 with time; midnight rejected for new documents | **H-06** |
| `updated` | present; ISO 8601 with time; not earlier than `created` | **H-07** |
| `license` | present; SPDX identifier; agrees with the licence manifest | **H-08** |

**H-00, the gate:** every Markdown file under a governed series carries
frontmatter.

**H-09, empty is absent:** a field with an empty value is an error. Absence is
declared, not left blank — omit the field, write `null`, or write `TBA`,
whichever tells the truth about the gap.

## 3. Ring 2 — provenance

| Field | Rule | Check |
|---|---|---|
| `author` | who wrote it, person or agent | **H-10** |
| `owner` | who answers for it now | **H-11** |
| `provenance` | `human` · `ai-assisted` · `ai-generated` | **H-12** |
| `created_source` | `git:<sha>` or `declared` — where the date came from | **H-13** |
| `created_confidence` | `exact` · `inferred` — never invented | **H-14** |
| `requested_by` | optional; who commissioned it | **H-15** |
| `supersedes` · `superseded_by` · `derived_from` | resolvable identifiers | **H-16** |

Ring 2 admits `declared` where git cannot testify. The point is that a reader
can always tell evidence from claim: a date derived from a commit is
evidence; a typed one is a claim.

## 4. The `type` vocabulary

`type` takes its value from the closed list in the glossary, plus `agent` for
the agents series. **H-03** enforces the closed list; **H-17** enforces the
map from type to series, strict for the registered genres and warn-only for
the two general ones.

**H-18, `subtype`:** if present, its value comes from the registered list for
that type. Registered now: for reports, `audit` `daily` `analysis`
`proposal`; for documentation, `standard` `guide`.

## 5. Status lifecycles

- **missions:** `todo → in-progress → in-review → done`, plus `frozen` (**H-04**)
- **decisions:** `draft → active → superseded`, lowercase (**H-19**)
- **everything else:** `draft → active → closed`, unless its series registers
  otherwise in Ring 3

## 6. Ring 3 — extension by series

**H-30, the anti-entropy rule:** a field that is not in Ring 1, Ring 2, or the
registry below is an error. Adding a field costs one line in this table plus
the decision record that justifies it. The registry is the standard; there is
no out-of-band extension.

| Series | Registered fields |
|---|---|
| `missions/` | `priority` `effort` `assigned_to` `started` `completed` `type_execution` `freeze_reason` `in_review_at` `depends_on` `parent_mission` `sub_missions` `blocked_by` `requires_oracle_approval` `human_approval_score` `paths` `context` `divergence_log` |
| `reports/` | `severity` `period` `subtype` `model` `agent` `week` `scope` `former_id` `former_id_note` |
| `decisions/` | `deciders` `consulted` `outcome` `decision` `absorbs` `amends` |
| `agents/` | `role` `platform` `model` `soul` `agent` |
| `debt/` | `severity` `severity_reason` `detected` `refuted` `source_audit` `opened_by` `visibility_reason` |
| `blueprints/` `operations/` | `extraction_note` `restoration_note` |
| `blueprints/` | `semaforo` |
| `protocols/` | `applies_to` `mandatory` |
| `standards/` `canon/` | `threshold` |
| `standards/` `canon/` `protocols/` | `supersedes_version` `ratified_by` |
| all | `tags` `visibility` `guild` `territory` · `registration` `registration_reason` `registration_exemption` · `evidence_script` `evidence_head` · `related` · `uid` (reserved empty — **H-20**: a non-empty `uid` is an error until the identifier system exists) |

Rare fields not registered here die by omission: the lint flags them, and
their carriers either migrate or the field earns its decision record.

**Retirements the lint inherits (H-31):** `area` becomes `territory`;
`blocked_reason` is retired; the Spanish-era keys are retired. Each is a wave
with its own baseline entry until its migration lands.

### 6.1 Deferred values — `TBA` (H-32)

A field can be required, present, and not yet decided. This is permitted under
exactly one condition:

> A `TBA` without a mission that will resolve it is a parking space.

The lint does not treat `TBA` as a violation. It counts it and names the
mission that owns it. **H-32 fails when a `TBA` is written into a field no
mission owns.** To defer a new field, register it with its owning mission in
the lint, or the guard rejects it as unowned.

The asymmetry is deliberate. An uncounted deferral is indistinguishable from a
forgotten one, and a value nobody prints is a value nobody resolves.

**What this cannot check:** whether the owning mission is alive. A `TBA`
pointing at an abandoned mission passes the guard and is exactly the parking
space this rule forbids. Only a person reading the board catches that.

### 6.2 Closed vocabularies

| Check | Field | Vocabulary |
|---|---|---|
| **H-33** | `guild` | `Sentinels` · `Alchemists` · `Exegetes` · `Procurators` |
| **H-34** | `type_execution` | `digital` · `biological` · `hybrid` |
| **H-35** | `visibility` | `public` · `restricted-oracle` |
| **H-36** | `territory` | the eight registered words |

A vocabulary nobody checks is not a vocabulary. It is a suggestion.

Two rules govern the edges. **`TBA` is legal here** and these checks skip it
rather than double-report it. **A template may document its options inline**
as a trailing comment; the comment is stripped before judging, so the
vocabulary gets checked and the documentation survives.

## 7. Conformance: strict on the delta, baseline on the stock

A rule without a mechanism does not survive its own author. But a corpus
cannot become conformant in one change, and a lint that fails on everything
gets disabled.

1. The header lint runs on every pull request, over the whole corpus.
2. Violations present at adoption are written to a baseline file — counted,
   dated, allowed to exist but not to grow.
3. Any new violation fails the build: a file not in the baseline, or a new
   defect in a baselined file.
4. Every migration shrinks the baseline. Its size is the public entropy metric
   of the corpus, and zero is the finish line.

Check-to-rule mapping is one to one by construction, and the lint prints the
check identifier with every finding, so a failure cites the rule that condemns
it.

## 8. What this standard does NOT do

- It does not migrate anything. Every existing violation stays until its
  migration executes.
- It does not rename fields or documents.
- It does not decide what the undressed governance documents should contain —
  only what a conformant header is when they get one.
- It does not govern the site pipeline's own schema, which is the renderer's.

## 9. The context card `[MANUAL]`

No check, deliberately: judging whether a summary describes the document is
prose judgment, not mechanics. A presence-only check would certify
boilerplate, and this corpus has seen the same placeholder pasted into a
hundred and fifty documents.

Every document opens with a context card immediately after its title, so the
reader can decide in three seconds whether it deserves attention:

```markdown
> **Summary:** One sentence describing WHAT this document is.
> **Epistemic:** What you learn or what question it answers.
> **Pragmatic:** What you can do with it once read.
> **Audience:** Agents · Oracles · External   (optional)
```

Summary is one sentence, not a paragraph. Epistemic and pragmatic are
mandatory in operational documents; audience is optional. Templates, indexes
and very short documents may carry only epistemic and pragmatic. New documents
include the card from creation; existing ones are updated when touched, never
by mass retrofit.

## 10. The standards template `[MANUAL]`

No check. Whether a standard states one thing, and whether its conformance
section is honest, is prose judgment. A presence-only check would certify a
copied skeleton, which is the failure this section prevents.

A new standard MUST be started from the standards template and MUST carry its
five required sections: purpose and scope, the norm, conformance, what the
standard does not do, and version history.

The one that is not negotiable is **conformance**. A standard states how an
object fails it — mechanically where a guard exists, `[MANUAL]` with a written
criterion where none does. A rule with no way to fail is an opinion in a
normative font.

Two conventions bind whether or not the template is used:

- **RFC 2119 language.** MUST and MUST NOT for requirements, SHOULD and SHOULD
  NOT for recommendations that may be departed from in writing. "Should" used
  as a synonym for "must" makes both unenforceable.
- **Prose cross-references.** Governed by the plain-writing standard.

This section does not retrofit the standards that predate it. They conform
when they are next opened for substantive change, not by sweep.

## References

- `STD-001` — the vocabulary these fields draw on.
- `STD-007` — plain writing, which governs cross-references.
- `ADR-027` — the decision that ratified this standard.
