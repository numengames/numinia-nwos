---
id: "AUD-2026-08-26-provenance"
uid:
title: "Provenance census over the 190 new CC0 grants, and a proposed cut"
type: report
subtype: audit
status: published
version: "1.2.0"
created: "2026-08-26T14:20:00Z"
created_source: "git:47c599e"
created_confidence: exact
updated: "2026-08-26T15:10:00Z"
author: "ursa"
owner: "oracle"
guild: "Procurators"
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

## 3. Proposed cut — **superseded. Read §7 for the final partition.**

> The cut below was proposed in v1.0.0 and is **wrong** (it classified strings, not
> authorship). §6 corrects it to 67/123; **§7 supersedes both** with the Oracle's ruling
> on the P-003/P-009 cycle, giving 179/11. All three are kept visible: this is evidence.

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

---

## 6. Correction — v1.1.0, 2026-08-26 · the partition was wrong

> Appended, not edited in place. §3 stays visible; this supersedes it.
> Evidence: `AUD-2026-08-26-licensing-c005/provenance-190.json` (v3 classification),
> script `scripts/experiments/provenance-census.py`.

### 6.1 What was wrong

§3 held back 51 files because `author:` named a model, and swept 64 whose `author:`
named an agent persona. **Both are LLM output.** The repository says so itself:

```
agents/ursa/SOUL.md      model: "anthropic/claude-sonnet-4-6"
agents/nimrod/SOUL.md    model: "anthropic/claude-sonnet-4-6"
agents/senet/SOUL.md     model: "anthropic/claude-sonnet-4-6"
```

A document authored by `claude-opus-5` was held; one authored by `ursa` was swept. Same
nature of authorship, opposite treatment, decided by **which string landed in the
field**. And 8 more entered the sweep through `git author: Ursa (agente)` — the same
persona, arriving by a third route.

**This is the fourth form of the day's pattern, in the measurement that gates the canon
signature:** I compared the *string* and concluded about the *nature*. It was caught by
the Oracle, not by me.

### 6.2 The census, reclassified by nature

```
NEW GRANTS: 190

  HUMAN          66    34.7%
  AI_PERSONA     72    37.9%
  AI_MODEL       51    26.8%
  DECLARED        1     0.5%
  UNKNOWN         0     0.0%

  AI TOTAL      123    64.7%
  HUMAN TOTAL    66    34.7%
```

| Nature | Who | Files | Signal |
|---|---|---:|---|
| **HUMAN** | `pablo-fm` | 33 | frontmatter |
| | `PabloFM` | 32 | git author |
| | `oracle` | 1 | frontmatter |
| | **subtotal** | **66** | |
| **AI_PERSONA** | `ursa` | 55 | frontmatter |
| | `nimrod` | 9 | frontmatter |
| | `Ursa (agente)` | 8 | git author |
| | **subtotal** | **72** | |
| **AI_MODEL** | `claude-fable-5` | 37 | frontmatter |
| | `claude-opus-5` | 12 | frontmatter |
| | `claude-opus` · `claude-fable` | 2 | frontmatter |
| | **subtotal** | **51** | |
| **DECLARED** | `ai-assisted` | 1 | frontmatter |

**The 40 "no signal" files of §2 resolve cleanly:** 32 are `PabloFM` (human) and 8 are
`Ursa (agente)` (AI persona). None is unknown. `UNKNOWN = 0` holds under the corrected
classification too.

### 6.3 The corrected partition

**Criterion: nature of authorship, which is the axis §2.6 legislates.** Not which field
carries the signal, and not whether the signal is a persona name or a model name.

| Bucket | Files | Proposal |
|---|---|---|
| **HUMAN** (66) + **DECLARED `ai-assisted`** (1) | **67 (35.3%)** | **sweep now** |
| **AI_PERSONA** (72) + **AI_MODEL** (51) | **123 (64.7%)** | **PENDING, with a threshold** |

**The correction moves 72 files from "sweep" to "pending" and inverts the majority:**
139/51 becomes 67/123.

**Why the 66 human-authored files are safe to sweep.** A natural person authored them;
ownership is demonstrable under §2 question 1, and CC0 waives rights we actually hold.
The missing `provenance:` field is a §2.6 form defect, correctable at leisure, and it
does not affect what can be waived. 32 of them evidence authorship through git rather
than frontmatter, which is a weaker record but the same fact.

**Why all 123 AI-authored files must wait.** §2.6: *"la obra puramente generada por
máquina no genera derecho de autor, luego puede no haber titularidad que ceder ni que
reclamar"*, and *"`ai-generated` puro no se declara obra de nadie"*. Whether each file is
`ai-assisted` (substantial recorded human intervention → ours to waive) or `ai-generated`
(nothing to waive) is a **legal judgement about substantiality**, not a measurement.
Persona-authored files have no better claim than model-authored ones: `ursa` *is*
`claude-sonnet-4-6` wearing a name.

The asymmetry that decides it is unchanged and now applies to a larger set: **CC0 is
irrevocable (§4 pos. 5); waiting costs nothing, waiving wrongly costs everything.**

### 6.4 Exit threshold — unchanged in form, wider in scope

Not a date. Each of the 123 is reclassified as `ai-assisted` or `ai-generated` per the
§2.6 test, *per document*. The declaration is asserted for the former and **dropped**,
not asserted, for the latter.

Two observations that may make this cheaper than 123 individual judgements — offered as
measurement, not as the judgement itself:

- **The persona split may be legally irrelevant but is operationally useful.** All 72
  persona-authored files were produced under a briefing protocol (P-003/P-009) that
  records an Oracle who briefed, reviewed and approved. If the Oracle judges that this
  constitutes *"intervención humana sustancial y registrada"*, it resolves 72 files with
  one ruling rather than 72.
- The same argument extends to the 37 `claude-fable-5` files in `missions/`, which carry
  the same template.

**Neither is mine to decide**, and neither was applied.

### 6.5 What this does not change

The rest of §4's reasoning stands: sweeping all 190 still fails §2.6's gate; holding the
whole canon still resolves a question that bites on part of the corpus; and manufacturing
doubt about the human-authored files would still be inventing a problem. What changed is
**where the line falls**, not why there is a line.

---

## 7. Protocol anchor — v1.2.0, 2026-08-26

> The Oracle ruled that the P-003/P-009 cycle constitutes *"intervención humana
> sustancial y registrada"* under §2.6, and instructed that the ruling covers **the
> process, not the author's name**: a file only enters the sweep if it can be **shown**
> to have been produced under that cycle. Measurement follows; the judgement was the
> Oracle's.
> Evidence: `AUD-2026-08-26-licensing-c005/protocol-anchor-123.json` ·
> script `scripts/experiments/protocol-anchor.py`.

### 7.1 What evidence the cycle leaves behind

P-009 §Step 1 requires the mission to exist in the repository **before** any work, and
P-003 assigns each state to an actor. So the traces are:

| Trace | Strength |
|---|---|
| Mission file with lifecycle fields (`started`, `completed`, `assigned_to`…) | complete |
| Non-mission document carrying `mission: "MIS-NNN"` (P-009 itself does this) | complete |
| Creating commit naming a `MIS-` identifier | complete |
| Mission file in an **Oracle-set state** (`done`/`frozen`/`cancelled`/`backlog` per P-003's own table) with `owner: oracle`, but no timestamps | complete — missing timestamps are a *form* defect, the same class as a missing `provenance:` field |
| Same, but no `owner` field | **weak** |
| No mission, no `mission:` field, no `MIS-` in history | **none** |

### 7.2 Result over the 123

```
ANCHORED             99    80.5%
ANCHORED_MIGRATED    13    10.6%
ANCHORED_WEAK         8     6.5%
NOT_ANCHORED          3     2.4%
```

**The 13 migrated files** (`MIS-072`…`MIS-084`, all `claude-fable-5`) were created in
`numengames/numinia-web` and imported here. Their bodies state:

> *"Migrated 2026-08-17 from `numengames/numinia-web:missions/MISSION-001.md`
> (**Oracle order: missions centralize in NWOS L3**)"*

The migration itself was an Oracle decision, all 13 carry `owner: oracle`, and 10 of the
13 are in Oracle-set states. **Counted as anchored** — but flagged separately, because
the cycle they passed through was another repository's, and that is a fact the Oracle
should see rather than one I should smooth over.

### 7.3 The 11 that stay pending

| File | Why |
|---|---|
| `missions/MIS-006-session-experience-architecture.md` | `frozen`, no `owner` field |
| `missions/MIS-012-numengames-cicd.md` | idem |
| `missions/MIS-013-monitoring-alerts-system.md` | idem |
| `missions/MIS-014-umami-numengames.md` | idem |
| `missions/MIS-020-demo-pitch-deck.md` | idem |
| `missions/MIS-025-30day-content-strategy.md` | idem |
| `missions/MIS-036-q2-funding-strategy-memo.md` | idem |
| `missions/MIS-049-dora-metrics.md` | idem |
| `decisions/ADR-004-identifier-convention.md` | no mission, no `mission:` field, no `MIS-` in history |
| `protocols/P-012-ruling-with-a-condition.md` | idem |
| `reports/audits/AUD-2026-08-24-canon-edit.md` | idem |

The 8 weak ones are in `frozen` — an Oracle-set state per P-003 — but carry no `owner`
field, so the anchor rests on the state alone. **They stay pending on purpose:** the
ruling covers the process, and "the state implies the Oracle touched it" is an inference,
not evidence. Promoting them would be exactly the error just corrected, run in reverse —
concluding about the process from a field that merely correlates with it.

The last 3 are authored by `ursa` (me) with no protocol trace of any kind. Two of them —
`P-012` and `AUD-2026-08-24-canon-edit` — are the kind of responsive work the process
review identified as having no place in the mission model. **That gap and this pending
bucket are the same gap.**

### 7.4 Final partition

| | Files |
|---|---|
| Human-authored | 66 |
| Already declaring `ai-assisted` | 1 |
| AI-authored, anchored to P-003/P-009 | 99 |
| AI-authored, anchored via Oracle-ordered migration | 13 |
| **SWEEP NOW** | **179 (94.2%)** |
| AI-authored, weak anchor (state only, no `owner`) | 8 |
| AI-authored, no anchor | 3 |
| **PENDING, with threshold** | **11 (5.8%)** |
| **Total** | **190** |

Exit threshold for the 11 is unchanged in form: each is anchored to the cycle by
evidence, or reclassified per §2.6 as `ai-assisted` or `ai-generated`. Eight of the
eleven need only an `owner` field to resolve — which is a documentation task, not a legal
one.

### 7.5 Correction to my own argument, per the Oracle

§3 and §6.3 leaned on this asymmetry: *"CC0 is irrevocable; waiting costs nothing,
waiving wrongly costs everything."* **That argument is weak precisely where I applied it
hardest.**

If a work is purely machine-generated and therefore carries no copyright, a CC0
declaration over it is **void of object** — and something void of object is also
**harmless**: there are no rights being waived, neither ours nor a third party's. The
risk is one of *form* (declaring something that declares nothing) and not of *substance*
(giving away what was not ours to give).

The asymmetry is strong for **human material of doubtful origin**, where a wrongful
waiver would dispose of real rights — possibly someone else's. It is weak for AI material,
which is where I invoked it most forcefully.

**Recorded as a qualification, not as a refutation.** The conclusion is unchanged, but it
now rests where it belongs: **the Oracle's ruling stands on §2.6 — the P-003/P-009 cycle
constitutes recorded substantial human intervention — and not on an asymmetry of risk
that does not hold in this case.**


