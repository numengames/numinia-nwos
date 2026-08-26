---
id: "AUD-2026-08-26-provenance"
uid:
title: "Provenance census over the 190 new CC0 grants, and a proposed cut"
type: report
subtype: audit
status: published
version: "1.0.0"
created: "2026-08-26T14:20:00Z"
created_source: "git:47c599e"
created_confidence: "exact"
updated: "2026-08-26T14:20:00Z"
author: "ursa"
owner: "oracle"
guild: "Procuradores"
territory: "Legal"
tags: [audit, provenance, C-005, CC0, measurement]
license: "CC-BY-4.0"
evidence_script: "provenance2.py — output archived as provenance-190.json"
evidence_head: "47c599e"
scope: "numinia-nwos @ 47c599e · public surface: numinia.org"
---
# Provenance census over the 190 new grants

> **Measurement, not decision.** The Oracle asked for the count that separates
> "sweep now" from "pending with a threshold". The cut is **proposed**, not applied.
> **Nothing was modified.**

---

## 1. Why 190 and not 291

C-005 §2.6 requires every piece to declare provenance, and CC0 waives our own rights,
never someone else's — so a waiver over work of undocumented origin is the one gate that
survives v2.0.0 untouched.

But the gate only bites on **new** grants:

| | Files | Provenance relevance |
|---|---|---|
| `CC-BY-4.0` today | 249 | |
| …already published under root CC0 (`9f51ad1`→`2efd546`) | 59 | **irrelevant** — already waived, §4 pos. 5 |
| **Genuinely new grants** | **190** | **this is the population** |
| Reserved files | 42 | all 42 already waived or served (v1.2.0 §C4) |

The 291 figure of v1.0.0 §E5.2 overstated the problem. **190 is the number that matters.**

---

## 2. The census

```
NEW GRANTS: 190

  DECLARED_FORM      1     0.5%   explicit provenance field (§2.6 compliant)
  DECLARED_SUBST    51    26.8%   author: names an LLM
  HUMAN_OR_AGENT    98    51.6%   author: names a person or agent persona
  NO_SIGNAL         40    21.1%   no author field in frontmatter
```

**Correction to my own first run.** v1 of this script bucketed the 51 LLM-authored files
as "expensive to recover", as if their origin were unknown. It is not unknown — it is AI
provenance **declared through a different field**. `author: claude-opus-5` states the
fact in substance while failing §2.6's form. Conflating "wrong field" with "no
information" would have inflated the problem by a quarter of the corpus.

**Who the 98 are:** `ursa` 55 · `pablo-fm` 33 · `nimrod` 9 · `oracle` 1.
**Which models the 51 name:** `claude-fable-5` 37 · `claude-opus-5` 12 · others 2.

### The 40 with no frontmatter signal are **not** irrecoverable

Every one has a git author:

| Commit author | Files |
|---|---|
| `PabloFM` | 32 |
| `Ursa (agente)` | 8 |

Concentrated in `missions/` (33), `reports/` (5), `standards/` (1), `LEGAL_DEBT.md` (1).

**Irrecoverable count: 0.** There is no file in the 190 whose origin cannot be
established from either frontmatter or `git log --follow`.

---

## 3. Proposed cut

**Criterion: distinguish what can be waived from what merely lacks a form.**

Ownership is what CC0 needs; the `provenance:` field is how §2.6 asks us to record it.
Those are different questions, and only the first can block a signature.

| Bucket | Files | Proposal | Why |
|---|---|---|---|
| `HUMAN_OR_AGENT` | 98 | **sweep now** | Authored by us or our agents under our direction. Ownership is not in doubt; only the field is missing. |
| `NO_SIGNAL` with a git author | 40 | **sweep now** | Same ownership position, evidenced by commit authorship instead of frontmatter. `PabloFM` (32) and `Ursa` (8) are both ours. |
| `DECLARED_FORM` | 1 | **sweep now** | Already compliant. |
| `DECLARED_SUBST` | 51 | **PENDING, with a threshold** | These declare an LLM as author. §2.6: *"`ai-generated` puro no se declara obra de nadie"* — in several jurisdictions purely machine-generated work generates no copyright, so **there may be nothing to waive**. A CC0 declaration over them would not be false so much as **void of object**. |
| **Sweep now** | **139 (73.2%)** | | |
| **Pending** | **51 (26.8%)** | | |

### Exit threshold for the 51

Not a date. The condition: **each file is reclassified as `ai-assisted` (substantial,
recorded human intervention → ours to waive) or `ai-generated` (no human authorship →
nothing to waive, and the CC0 declaration is dropped rather than asserted).** §2.6 already
defines the test — *"intervención humana sustancial y registrada"* — and it is per
document, not per corpus.

Cheap first pass available: 37 of the 51 name `claude-fable-5` and sit mostly in
`missions/`, where the mission template records an Oracle who briefed and approved. That
is a strong candidate for `ai-assisted` en bloc, but it is a **legal judgement about
substantiality, not a measurement**, and I am not making it.

---

## 4. Why not the alternatives

**"Sweep all 190 and fix provenance later."** Fails §2.6's own gate. CC0 is irrevocable
(§4 pos. 5), so a waiver asserted over the 51 cannot be walked back if the judgement
later goes the other way. The asymmetry is total: waiting costs nothing, waiving wrongly
costs everything.

**"Hold the whole canon until all 190 declare provenance."** 190 frontmatter edits before
C-005 v2.0.0 can be signed, to resolve a question that only bites on 51 of them. It also
inverts §2 question 1, which asks about *demonstrable ownership* — not about whether a
field is filled in.

**"Treat `NO_SIGNAL` as doubtful."** Measured and rejected: all 40 have a git author, 32
of them the Oracle himself. Doubt would be manufactured, not found.

---

## 5. What this does not resolve

- **Whether `ai-assisted` suffices for CC0.** §2.6 marks the contractual half `[ABOGADO]`.
  Out of an agent's competence and out of this canon's scope.
- **The 43 own design-system files** (declared CC0, effective MIT) are outside this
  population — they are a declaration defect, not a provenance question.
- **Media assets.** Zero glTF/VRM/audio/video exist in this repository (v1.0.0 §D1), so
  the §2.6 media gate — consent, EXIF, voice — has no subject here. It will when the
  catalogue repositories are audited.
