---
id: "S-001"
uid:
title: "Glossary — the archive's own vocabulary"
type: documentation
status: draft
version: "2.1.0"
created: "2026-08-24T16:00:00Z"
updated: "2026-08-24T20:10:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [glossary, vocabulary, frontmatter, archive, standards]
license: "CC-BY-4.0"
evidence_script: "scripts/count-evidence.py"
evidence_head: "7d17b5a"
---
# S-001 — Glossary: the archive's own vocabulary

> **Summary:** What every series holds, what every frontmatter field means, and
> which values are valid.
> **Epistemic:** Resolves "where does this document go" and "what do I write in
> this field" without asking a person.
> **Pragmatic:** Consult before creating a document, filling frontmatter, or
> proposing a new field. A value not listed here is not valid.
> **Audience:** Agents · Oracles
> **Status:** DRAFT — not signed. Blockers 1–2 executed, corrections 3–8 applied.

---

## 0. How to read this document

**This file is the source.** The HTML rendering is a generated view, never the
authority (Oracle, 2026-08-24).

**Every number here is produced by `scripts/count-evidence.py`** and stamped with
the HEAD it was measured against (`evidence_head` in the frontmatter). A figure
that cannot be reproduced is not evidence. To re-measure:

```bash
python3 scripts/count-evidence.py          # human-readable
python3 scripts/count-evidence.py --json   # machine-readable
```

**Enforcement markers.** Every rule below carries one:

| Marker | Meaning |
|---|---|
| `[CI]` | A machine verifies it on every push. The workflow and a real run are cited |
| `[MANUAL]` | Only a human or an agent verifies it. **Nothing stops a violation** |

There is no third marker. A rule decided but not yet applied to the corpus is
still `[MANUAL]` — deciding something does not enforce it. Where a rule is not
yet reflected in the data, the gap is stated with its measured number and
carries a `debt/` entry.

### What this is not

Numinia has three glossaries and they must not be confused:

| Glossary | Rules on | Where |
|---|---|---|
| **This one** | The **archive**: series, fields, values | `numinia-nwos` |
| `glossary.md` | The **world**: ES↔EN names of guilds, ranks, roles (web:ADR-012) | `numinia-web` |
| `conceptual-glossary.md` | The **project**: the 25 founding concepts | `numinia-web` |

Both of the latter should live here — repatriation is tracked separately and is
not part of this document.

---

## 1. Enforcement: what a machine actually checks

**The premise that "there is no CI in this repo" is false.** Verified against the
GitHub API on 2026-08-24:

| Fact | Value |
|---|---|
| Workflow file | `.github/workflows/ci.yml`, present in `main` |
| Triggers | `push` to `main`, and every `pull_request` |
| Total runs | **31** |
| Most recent | run `32726748253`, commit `7d17b5a`, **success**, 2026-08-24T12:22:25Z |
| Steps of that run | `licence-frontmatter guard (C-005 §5)` → **success** · `install` → success · `build` → success |
| Actions pinned by SHA | 5 of 5 |

Reproduce with:

```bash
curl -s https://api.github.com/repos/numengames/numinia-nwos/actions/workflows/ci.yml/runs
```

### The honest scoreboard

**One rule in this glossary is machine-verified. Every other is `[MANUAL]`.**

| Rule | Marker | Verified by |
|---|---|---|
| `license` matches `REUSE.toml` | **`[CI]`** | `scripts/check-license-frontmatter.mjs`, step in `ci.yml` |
| Site builds after any structural change | **`[CI]`** | `npm run build` step |
| Everything else in this document | **`[MANUAL]`** | nobody, automatically |

> The absence of guards is not a missing CI — it is a CI with one guard.
> Registered as **D-001** in `debt/`, with owner and closing condition.

---

## 2. The series (folders)

The test that keeps a series honest: **what function stops working if this folder
disappears?** If the answer is a name, it is a series. If it is "several things",
it is a drawer.

### 2.0 Nothing here is immutable

No document in this archive is immutable, and any rule that says otherwise is
false. Git makes every file editable by anyone with push, and the evidence says
it happens:

| Claim | What the history shows |
|---|---|
| `canon/` "must not be modified" | **14 of 14** canon documents have more than one commit. `Welcome to Numinia.md` was edited on 2026-05-06 by a third party, changing *"operating system"* → *"germinal motive"* and *"Functional Model"* → *"Regulatory Model"* — definitions, not typos |
| A `done` mission "is immutable" | **9 of 33** were edited after being marked `done` (MIS-066 Phase 3.2, the emoji retirement, the misiones.ts recovery) |

**Neither of those edits was wrong.** Translating the corpus to English and
retiring the emojis were correct operations. What was wrong was the word: the
archive claimed an immutability it never had and never enforced.

### 2.1 Change thresholds instead

What actually distinguishes these documents is **how much agreement it takes to
change them**, and **what must be left behind when they do**. That is a threshold,
not a property of the file.

| Threshold | What it takes | Series |
|---|---|---|
| **`sealed`** | Oracle's signature + an ADR recording the reason. The previous version stays reachable and cited | `canon/` |
| **`governed`** | An ADR, or a PR the Oracle approves | `standards/` · `protocols/` · `decisions/` |
| **`closed`** | Substance is not reopened: a `done` mission or a published report keeps its claims. Form (translation, formatting, metadata) may be corrected, and the commit must say so | closed `missions/` · `reports/` |
| **`open`** | Normal PR | everything else |

Three consequences worth stating plainly:

1. **A frozen artifact is one thing; a sealed document is another.** A dated file
   (`2026_08_18-…-v5.1.0.md`) is a photo: it is not edited because a new version
   is a new file. A `sealed` document is edited rarely and with ceremony. P-010
   §3.2 governs the first; this section governs the second.

2. **"Closed" is about substance, not bytes.** MIS-066 translating a `done`
   mission to English did not falsify it. Rewriting what that mission claimed to
   have achieved would. The line is: *would a reader in a year be misled about
   what happened?*

3. **This is `[MANUAL]`, and it is the weakest rule in the document.** Nothing in
   CI checks who signed what. A `sealed` document and an `open` one are the same
   file to git. Enforcement depends on branch protection and signed commits,
   neither of which exists today — registered as **D-011**.

> An archive that claims immutability it cannot enforce is worse than one that
> admits mutability and records who changed what. The first invites trust it
> cannot honour; the second is auditable.

### `canon/` — what the system **is** · `sealed`
**Epistemic.** Defines what Numinia and Numen Games are and which principles
govern them. Without it, no other word in the system means anything.
**Pragmatic.** Read before asserting anything about lore, brand or philosophy.
Changing it takes the Oracle's signature and an ADR that says why; the previous
version stays reachable.
**IS** foundational, and changed only with the highest threshold · **IS NOT**
immutable, and **IS NOT** operating policy — a licensing regime must be able to
change, and that disqualifies it as canon.

### `standards/` — what an artifact must **comply with**
**Epistemic.** Which convention applies to a thing: typography, colour,
terminology, licensing, engineering practice.
**Pragmatic.** Consult before creating or touching an artifact; deviating
requires an ADR.
**IS** a versioned norm whose subject is an **artifact** · **IS NOT** a
descriptive glossary or a proposal.

### `protocols/` — what an actor **executes**
**Epistemic.** Removes the ambiguity of "what do I do now" in repeated
situations.
**Pragmatic.** Followed in order; that it ran is logged. Never edited in place —
new version, new file.
**IS** an ordered sequence whose subject is an **actor** · **IS NOT** a rule an
artifact satisfies.

> **The `standards` ⟷ `protocols` boundary is the mechanism, not the topic.**
> A standard is *complied with*; a protocol is *executed*.

### `agents/` — **who** acts
**Epistemic.** Who exists in the system, with what capabilities and limits.
**Pragmatic.** Read before invoking or onboarding an agent. One folder per
agent: `SOUL` · `OPERATOR` · `STATUS` · `MEMORY`.

### `missions/` — the **work**
**Epistemic.** What was promised, what was done, with what evidence.
**Pragmatic.** Flat folder. **State lives in `status:`, never in the path.** A
`done` mission is `closed`: its substance is not reopened. Form may be corrected
and the commit must say so.

### `decisions/` — **why** something was chosen · `governed`
**Epistemic.** The reasoning and the discarded alternatives.
**Pragmatic.** Append-only: a decision is superseded, never deleted. Superseding
takes an ADR; the superseded one stays reachable.

### `blueprints/` — what **could** be
**Epistemic.** Which designs exist and which gap each attacks.
**Pragmatic.** Consult when designing something new.
**IS** a design not yet executed · **IS NOT** a report of what happened.

### `reports/` — what was **observed** · `closed`
**Epistemic.** What was true on a date, signed by whoever observed it.
**Pragmatic.** Cited as evidence. Once published its claims are not rewritten —
a correction is a new report that supersedes it. A report is more than a set of
closed missions: it observes the system, not only the work.

### `operations/` — what **sustains** the business
**Epistemic.** Legal, strategy: the connective tissue between system and world.
**Pragmatic.** Consulted when operating the company, not the system.

### `debt/` — what we know is **missing** `[MANUAL]`
**Epistemic.** Explicit, numbered uncertainty beats false completeness.
**Pragmatic.** Append-only like `decisions/`: an entry is marked RESOLVED, never
deleted.

### `guilds/` — under review
`guild:` already works as a field. The `charter` files are norm; the `roster`
files are a regenerable view. Resolution belongs to the folder phase.

---

## 3. Series, `type` and the relation between them

**A `type` does not derive from the folder, and a folder does not derive from
the `type`.** They are two independent declarations that must agree.

| | |
|---|---|
| **The folder** | is the **filing decision**: where a human or an agent goes to look |
| **`type:`** | is the **declared genre**: which rules apply to the document |

### When they contradict each other `[MANUAL]`

**The `type` wins as a description; the folder wins as a location.** In practice:

1. A `type` inconsistent with its folder is a **filing error**, not a genre error
2. It is resolved by **moving the file**, never by rewriting `type:` to fit
3. Moving series requires a new identifier — see §5

Rationale: `type` describes what the document *is*; the folder is a decision
about where it lives. Changing `type` to match the folder falsifies the
document. Moving the document corrects the filing.

**Canonical map** — a `type` not in this table has no valid home:

| `type` | Series |
|---|---|
| `seminal` | `canon/` |
| `documentation` (normative) | `standards/` |
| `protocol` | `protocols/` |
| `mission` | `missions/` |
| `adr` | `decisions/` |
| `blueprint` | `blueprints/` |
| `report` | `reports/` |
| `legal` | `operations/legal/` |
| `charter` | `guilds/` (under review) |
| `meta` | anywhere — it is apparatus, it accompanies its series |

> **`meta` marks apparatus.** A *record* has probative value (`MIS-085`);
> *apparatus* is the instrument for finding it (`INDEX.md`, `TEMPLATE.md`) and
> is **derived** — rebuildable from the records. **If it can be regenerated from
> the others, it is apparatus.** An out-of-date index is a bug; an out-of-date
> record is history.

---

## 4. Registration: the identifier

Connects a document to the **1,617 textual references** that name it — almost
always in plain text, without a link. Hence: **opaque and permanent.** It encodes
nothing that can change, is never reused, is never renumbered (ADR-004).

### 4.1 Prefix per series `[MANUAL]`

Blocker 2 of the Oracle. Four series had no scheme; this document could not be
filed for lack of its own.

| Prefix | Series | Example | Coverage today |
|---|---|---|--:|
| `MIS-NNN` | `missions/` | `MIS-085-web-codex-reader-lap.md` | **105/105 · 100 %** |
| `ADR-NNN` | `decisions/` | `ADR-004-identifier-convention.md` | 9/9 · 100 % |
| `P-NNN` | `protocols/` | `P-010-how-to-archive.md` | 11/13 · 84.6 % |
| `RPT-YYYY-MM-DD` | `reports/daily/` | `RPT-2026-04-07.md` | 8/8 · 100 % |
| `AUD-YYYY-MM-DD` | `reports/audits/` | `AUD-2026-04-08-numengames.md` | 0/4 · in adoption |
| `BP-slug` | `blueprints/` | `BP-cao-architecture.md` | 16/22 · 72.7 % |
| **`S-NNN`** | **`standards/`** | `S-001-glossary.md` | **0/3 · new** |
| **`A-NNN`** | **`agents/`** | `A-001-nimrod/` (folder) | **0/17 · new** |
| **`O-NNN`** | **`operations/`** | `O-001-governance.md` | **0/11 · new** |
| **`D-NNN`** | **`debt/`** | `D-001-no-ci-guards.md` | **0/0 · new** |
| `C-NNN` | `canon/` | `C-005-licensing.md` | 1/12 · 8.3 % — see §4.3 |

**This document is `S-001`**: the first standard registered under its own rule.

> The four new prefixes are in force from this signature and apply to documents
> created from now on. The existing corpus does not yet carry them — measured:
> `standards/` 0/3, `agents/` 0/17, `operations/` 0/11. Renaming the existing
> files is its own operation with its own verification. **Nothing is
> renumbered** — see §5. Gap registered as **D-008**.

### 4.2 Time-based prefixes
`RPT-` and `AUD-` carry a date because a daily report or an audit **is** its
date: the date is identity, not a mutable attribute. This is the only exception
and it is one by nature, not convenience.

### 4.3 Canon: registration plan `[MANUAL]`

Blocker 4. Today **1 of 12** canon documents carries `C-NNN`. Two ways out; this
document proposes one and the Oracle disposes:

**Proposal: register the canon, one identifier per seminal document.** Canon is
the most-cited series in the corpus (`C-005` alone: 64 mentions) and the only one
without a stable handle. Filenames with spaces (`About Session Zero.md`) make it
worse: they cannot be cited in plain text without ambiguity.

Cost: 11 renames, plus updating references. The reference lint
(`scripts/check-references.mjs`) makes the operation verifiable.

**Alternative, if the Oracle prefers:** withdraw the `id` requirement for `canon/`
and declare the filename to be the identifier. Legitimate — but then the rule must
say so, and citations of the form "see Welcome to Numinia" become normative.

**What is not acceptable is the current state**: a rule declared mandatory and
honoured at 8.3 %.

### 4.4 Cross-repository citation `[MANUAL]`
`ADR-006` exists here and in `numinia-web` with different meanings. Across the
boundary: `nwos:ADR-006` · `web:ADR-006`. Inside the repo, the bare identifier
remains correct.

---

## 5. Changing series `[MANUAL]`

Blocker 6. When a document moves from one series to another:

1. **New identifier in the destination series.** The document is filed under the
   scheme of where it now lives.
2. **The old identifier declares `superseded_by`** pointing at the new one.
3. **Neither is renumbered, and the old number is never freed.** The 1,617
   references keep meaning what they meant.
4. The move is verified with `scripts/check-references.mjs` before merge.

```yaml
# old document, kept
id: "BP-audit-numengames"
status: superseded
superseded_by: "AUD-2026-04-08-numengames"

# new document
id: "AUD-2026-04-08-numengames"
supersedes: "BP-audit-numengames"
```

> **Never renumber.** An identifier is a promise about the past. Renumbering
> breaks the 1,617 plain-text references silently — the way this corpus breaks
> worst.

---

## 6. Frontmatter fields

### 6.1 Mandatory

| Field | Meaning | Enforcement |
|---|---|---|
| `id` | Human registration, `<PREFIX>-<NNN>` | `[MANUAL]` |
| `title` | Full title, in English | `[MANUAL]` |
| `type` | Declared genre — closed vocabulary | `[MANUAL]` |
| `status` | Lifecycle state — depends on `type` | `[MANUAL]` |
| `version` | Semantic version **of the document** | `[MANUAL]` |
| `created` | ISO 8601 with real time | `[MANUAL]` — see §8 |
| `updated` | ISO 8601 of last substantive change | `[MANUAL]` |
| `license` | SPDX identifier, must match `REUSE.toml` | **`[CI]`** |

### 6.2 Reserved: `uid`

**The field is declared and left empty.** Oracle decision, non-negotiable.

Measured today: **32 uid present, 32 hand-authored, 2 collisions.** They have the
shape of UUIDv7 and not its provenance:

```
018ef820-0001-7000-8000-000000000001   ← MIS-001, by hand
018ef820-0002-7000-8000-000000000002   ← MIS-002, by hand
```

The final block is the mission number in decimal; the timestamp is identical
across 23 of them. That is why two collided — not chance, two people picking the
same number.

**Rule:** nobody fills `uid` by hand. That is how the false ones were born. When
the UID system exists — automatic generation, CI verification, a real consumer —
one operation will populate the whole corpus. The 32 legacy values are removed,
not preserved: they were never identifiers.

### 6.3 Normalised optional

`author` · `owner` · `tags` · `guild` · `territory` · `subtype` ·
`supersedes` / `superseded_by` · `derived_from`

`null` is not a value: if a field does not apply, it is not written. Today only
**2 of 242** documents declare any relation.

---

## 7. Controlled vocabularies `[MANUAL]`

A value not listed here is not valid. Adding one requires an ADR.

### `type`
`mission` · `adr` · `protocol` · `blueprint` · `report` · `seminal` · `legal` ·
`charter` · `documentation` · `meta`

Withdrawn: `audit` → `type: report` + `subtype: audit` · `decision` → `adr` ·
`roster` → `meta` (it is apparatus).

### `status` — missions

```
todo → in-progress → in-review → done
                          ↓
                       frozen
```

| Value | Meaning | Stamp |
|---|---|---|
| `todo` | Accepted, not started | — |
| `in-progress` | Being executed now | `started` |
| `in-review` | Executed, awaiting the Oracle | `in_review_at` |
| `done` | Closed with documented evidence. **`closed`** — substance not reopened | `completed` |
| `frozen` | Deliberately paused; returns to any state | `freeze_reason` |

**Executed (blocker 1):** the 12 `cancelled` missions are now `frozen` with
`freeze_reason: cancelled`. `cancelled` no longer exists as a status in the
corpus. Verified: `missions_por_status` shows `frozen: 13`, `cancelled` absent.

Withdrawn: `backlog` · `draft` → `todo` `[MANUAL]` — **45 missions still carry
them** (40 `backlog`, 4 `draft`, 1 with a comment corrupting the value). The
migration is its own operation. Gap registered as **D-009**. Also withdrawn:
`active` · `queue` · `blocked` · `freeze` · `cancelled`.

`blocked_reason` (8 uses) is orphaned by the removal of `blocked`. Registered as
**D-002**.

### `guild`
`Sentinels` · `Alchemists` · `Exegetes` · `Procurators` — English, plural.

Measured: **11 distinct values** for 4 guilds. Singulars (`Alchemist` ×4,
`Sentinel` ×4), one Spanish (`Alquimistas`), and two unfilled template
placeholders. Filtering by guild is unreliable today.

### `territory` — replaces `area` `[MANUAL]`
`CAO` · `Product` · `Platform` · `Infrastructure` · `Content` · `Sales` ·
`Funding` · `Archive`

Measured: `area` appears in **256 documents** with 33 distinct values, several
compound (`CAO / Product`, `Platform / numinia-web`). `territory` is in **2**.
The slash reveals the field doing two jobs: functional domain plus technical
surface. If the surface is needed it becomes a separate field. Migration
registered as **D-010**.

In archival science *area* already means something else (the ISAD-G description
area); `territory` does not collide.

### `priority` · `effort` · `type_execution` · `provenance`
- `critical` · `high` · `medium` · `low`
- `XS` · `S` · `M` · `L` · `XL` — relative sizing, not hours
- `digital` (an agent can do it) · `biological` (needs a human) · `hybrid`
  — contaminated today: `híbrido` ×3, `técnico`, `technical`
- `human` · `ai-assisted` · `ai-generated`

---

## 8. `created` / `updated`: backfill from git

The Oracle approves the backfill with a condition: **report which commit each
date comes from, and mark inferred ones. Do not fake precision.**

Measured: **121 of 208** documents carry `created: …T00:00:00Z` — a time nobody
wrote at, and which STANDARDS §1 marks ❌.

### The complication, stated plainly

MIS-066 renamed in bulk. `git log --diff-filter=A` returns the date of the
**rename**, not of birth, unless `--follow` is used — and `--follow` is
heuristic: it can lose the trail when a file is renamed *and* heavily edited in
the same commit.

### Rule for the backfill `[MANUAL]`

Three fields, not one:

```yaml
created: "2026-04-07T19:43:00Z"
created_source: "git:9f51ad1"        # commit the date came from
created_confidence: exact | inferred # inferred = the trail crossed a rename
```

- **`exact`**: the addition commit is unambiguous and predates any rename
- **`inferred`**: `--follow` crossed a rename; the date is the best available
  approximation and **is declared as such**

A document whose trail cannot be reconstructed keeps its current value and is
marked `inferred`. **Never a date invented to fill the field.**

---

## 9. Naming `[MANUAL]`

**Series documents:** `<ID>-<slug-in-english-kebab-case>.md`
**Root documents:** `UPPERCASE.md` — GitHub convention, marks repository
governance.

**Never** a version or a date in the filename of a living document: git carries
the history, `version:` carries the version. Dated names
(`YYYY_MM_DD-Title-vX.Y.Z.md`) are reserved for **frozen artifacts** (P-010
§3.2).

Violations today: `Definition_of_Done_v0.2.0.md`, `Mission_Template_v0_2_0.md`,
`2026_04_14-Analogous_Terminology_Numina-v0.2.0.md`, and the canon files with
spaces in their names.

---

## 10. Reproducible evidence

Every figure in this document comes from `scripts/count-evidence.py`, measured
against HEAD `7d17b5a`:

| Figure | Value |
|---|--:|
| Documents tracked | 242 |
| With frontmatter | 212 |
| Textual identifier references | 1,617 |
| Missions with `MIS-NNN` | 105/105 |
| `uid` present / hand-authored / collisions | 32 / 32 / 2 |
| Documents declaring a relation | 2/242 |
| `created` with `T00:00:00Z` | 121/208 |
| Distinct `guild` values | 11 |
| Distinct `area` values | 33 |
| CI runs | 31 |
| Guards running in CI | 1 |

> **Corrections to v1 of this glossary.** The script contradicted figures I had
> given from memory: references were 1,617 not 1,619; `T00:00:00Z` affects 121
> documents not 48 (I had only counted `missions/`); `guild` has 11 values not 3;
> `area` has 33 not "12+"; documents declaring a relation are 2, not 10. **All of
> them were worse than reported.** That is precisely why the Oracle demanded the
> script.

---

## 11. Open — the Oracle disposes

1. **`human_approval_score`** (14 uses) — says `# 1-10` but not *what* it
   measures. → **D-003**
2. **`semaforo`** (7) — verde/amarillo/rojo, in Spanish. What triggers each
   colour, and who sets it. → **D-004**
3. **`confidence_before` / `after`** (2) — scale, and who fills them. → **D-005**
4. **`cost_estimate`** (2) — currency, compute, human time. → **D-006**
5. **`week`** (7) — `W14`, `W15`. ISO week, of which year. → **D-007**
6. **Canon registration** (§4.3) — register `C-NNN`, or withdraw the rule.
7. **`guilds/` as a series** — charters to `standards/`, rosters as generated
   apparatus.

No definition is invented to close a table. A field whose meaning is not written
gets filled differently by each person who meets it — which is how
`type_execution` ended up with values in two languages.

---

## Version history

- **v2.1.0** (2026-08-24) — Oracle correction: **immutability withdrawn**. No
  document in the archive is immutable and the history proves it (14/14 canon
  documents edited; 9/33 `done` missions edited after closing). Replaced by
  **change thresholds** — `sealed` · `governed` · `closed` · `open` — in §2.1,
  which say how much agreement a change takes instead of pretending it cannot
  happen. Gap between declared and enforceable registered as **D-011**.
- **v2.0.0** (2026-08-24) — Oracle feedback on v1. Blocker 1 executed (12
  missions `cancelled` → `frozen`); blocker 2 resolved (prefixes `S-` `A-` `O-`
  `D-`, this document becomes `S-001`); `[CI]`/`[MANUAL]` markers with real
  evidence of the pipeline; `type`↔folder relation written; series-change rule
  written; canon registration plan; all figures moved to
  `scripts/count-evidence.py`. **`[PENDING]` withdrawn** — a third marker was
  invented in draft and removed on Oracle correction: deciding a rule does not
  enforce it, so an unapplied rule is `[MANUAL]` with its gap measured and
  registered in `debt/`.
- v1.0.0 (2026-08-24) — Initial draft. Not signed.
