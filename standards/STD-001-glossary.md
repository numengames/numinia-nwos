---
title: "Glossary — the archive's own vocabulary"
id: "STD-001"
uid: ""
type: documentation
status: active
version: "5.2.0"
created: "2026-08-24T16:00:00Z"
updated: "2026-09-02T17:04:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [glossary, vocabulary, frontmatter, archive, standards]
license: "CC0-1.0"
ratified_by: "ADR-027"
evidence_script: "scripts/telemetry.mjs"
evidence_head: "7d17b5a"
---
# STD-001 — Glossary: the archive's own vocabulary

> **Summary:** What every series holds, what every frontmatter field means, and
> which values are valid.
> **Epistemic:** Resolves "where does this document go" and "what do I write in
> this field" without asking a person.
> **Pragmatic:** Consult before creating a document, filling frontmatter, or
> proposing a new field. A value not listed here is not valid.
> **Audience:** Agents · Oracles
> **Status:** RATIFIED 2026-08-28 by `ADR-027`, at v4.0.0. Blockers 1–2
> executed, corrections 3–8 applied. (Until that date this line read
> `DRAFT — not signed` while the frontmatter read `active` — a contradiction
> that made "is the glossary in force?" unanswerable from the glossary.
> Ratification now lives in the frontmatter, `status` + `ratified_by`;
> this line is descriptive, not the source.)

---

## 0. How to read this document

**This file is the source.** The HTML rendering is a generated view, produced by
`scripts/render-glossary.py` — it cannot state anything this file does not say,
and `--check` fails if the two drift apart. The canonical published view is
Astro, at `/corpus/standards/s-001-glossary`.

> That script did not exist when v2 was first submitted. The HTML was written by
> hand and kept in sync from memory, while its own footer claimed to be
> generated — and it had already drifted: it renumbered the sections and dropped
> §9 (Naming) entirely. **The same violation as v1, with better wording.** The
> Oracle asked for the generator; this is it.

**Every number here is produced by `scripts/telemetry.mjs`** (`MIS-138`; until
2026-09-02, `count-evidence.py`, whose 21 keys the instrument reproduces under
the `legacy` family) and stamped with the HEAD it was measured against
(`evidence_head` in the frontmatter). A figure that cannot be reproduced is not
evidence. To re-measure:

```bash
node scripts/telemetry.mjs                 # write telemetry/ (latest.json · latest.md · docs.json)
node scripts/telemetry.mjs --key series.registration   # one figure with its predicate
node scripts/telemetry.mjs --legacy-json   # the former count-evidence.py --json dict
python3 scripts/render-glossary.py         # regenerate the view
python3 scripts/render-glossary.py --check # fail if the view is stale
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

## 1. What this document can and cannot enforce

**Read this before anything else.** The whole of §2.1 — the change thresholds
that are the central idea of this version — has **no mechanism behind it**.

> To git, a `sealed` canon document and an `open` scratch file are the same
> object with the same permissions. Measured 2026-08-24: **0 signed commits**,
> **0 signed tags**, **no ruleset on `main`**, CODEOWNERS present but review not
> required by any mechanism.
>
> A change to `canon/` needs, today, exactly what a typo fix needs: a push.
>
> **Four thresholds, one mechanism.** Registered as **D-011**, severity high.
> Until it closes, §2.1 is a reading convention, not governance — and this
> document will not pretend otherwise.

That is not a reason to discard the thresholds. It is the reason they are
written down: a gap you can name is a gap you can close, and `D-011` states
exactly what closing it requires — a ruleset on `main`, commit signing, and a
CODEOWNERS entry for `canon/`, all three needing repo admin.

### The pipeline exists; its coverage is the problem

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

**Five rules in this glossary are machine-verified. Every other is `[MANUAL]`.**

| Rule | Marker | Verified by |
|---|---|---|
| `license` matches `REUSE.toml` | **`[CI]`** | `scripts/check-license-frontmatter.mjs`, step in `ci.yml` |
| References and cited identifiers resolve | **`[CI]`** | `scripts/check-references.mjs`, step in `ci.yml` *(2026-08-25)* |
| Site builds after any structural change | **`[CI]`** | `npm run build` step |
| Actions pinned by commit SHA (`SEC-07`) | **`[CI]`** | 5/5 `uses:` pinned across both workflows |
| Workflow token is read-only (`SEC-08`) | **`[CI]`** | `permissions: read-all` in `ci.yml` and `scorecard.yml` |
| Everything else in this document | **`[MANUAL]`** | nobody, automatically |

> **This count was wrong until 2026-08-25 — and wrong in both directions.** The
> sentence said *one* while the table below it already listed two: the document
> contradicted itself on the line that measures how much of it is enforced. And
> the two security practices declared in `ci.yml`'s own header, `SEC-07` and
> `SEC-08`, were never counted at all despite both being verifiably in force.
>
> The marker was **undercounting the pipeline**, which matters more than it
> sounds: `D-001` is prioritised by this figure, and a corpus that believes it
> has one guard when it has four will spend effort in the wrong place.
>
> **And this correction miscounted itself once before landing**: the sentence
> was first rewritten as *four* against a table of five rows. Caught by reading
> the table, which is exactly the `D-022` mechanism — a plausible number that
> nothing checks. It is quoted here rather than fixed silently.
>
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
| `canon/` "must not be modified" | **14 of 14** canon documents have more than one commit. `CAN-001-welcome-to-numinia.md` was edited on 2026-05-06 by a third party, changing *"operating system"* → *"germinal motive"* and *"Functional Model"* → *"Regulatory Model"* — definitions, not typos |
| A `done` mission "is immutable" | **9 of 33** were edited after being marked `done` (MIS-066 Phase 3.2, the emoji retirement, the misiones.ts recovery) |

**Neither of those edits was wrong.** Translating the corpus to English and
retiring the emojis were correct operations. What was wrong was the word: the
archive claimed an immutability it never had and never enforced.

> **The canon edit has its own file.** `AUD-2026-08-24-canon-edit` asks the
> three questions this paragraph does not: was it authorised, was it complete,
> and does the canon say today what we believe it says. **The answer to the
> third is no** — the edit was partial, `Welcome to Numinia` now uses both
> terms in adjacent lines, and 21 documents still carry the term canon retired,
> four of them canon itself. Registered as **D-012**.

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

### 2.1.1 The fifth threshold, and the only real one

**Git history is immutable, and it is the only threshold here the tool enforces
rather than the organisation.**

| | Enforced by | Can be changed |
|---|---|---|
| `sealed` · `governed` · `closed` · `open` | agreement | **yes** — a signature and an ADR |
| **git history** | the tool | **no**, at any price worth paying |

The four thresholds above are **social conventions written down**. They describe
how much agreement a change should take, and today nothing stops a push that
ignores them — that is `D-011`. Even `sealed`, the strongest, is a door with a
lock somebody holds the key to.

Commit authorship and history are different in kind. Rewriting them means new
hashes for every affected commit, an invalidated signed tag, and every existing
reference broken. **The cure destroys more provenance than the disease**, which
makes it immutable in practice even though `git filter-branch` exists.

This reframes the whole section. **The archive's strongest guarantee is not the
one it declares — it is the one it inherits.** What is *written* in a document
can always be changed by agreement; **who wrote it, and when, cannot.**

Two consequences already met:

- **An agent's name is identity, not an attribute.** `MIS-089` renamed
  Centinela-01 to Nimrod and 57 commits keep the old author string forever —
  `D-027`, the corpus's first finding that cannot be fixed, only declared.
- **A date derived from a commit is evidence; a typed one is a claim** (§6.2,
  `created_source`). The difference is exactly that one lives in the immutable
  layer and the other does not.

> Everything this glossary governs is mutable by agreement. The history under it
> is not. **When the two disagree, the history is the record and the document is
> the claim.**

### 2.1.2 `live` — the threshold for state, not record

**A fifth series-level threshold, for documents that assert something about the
present rather than about the past.**

Ruled by the Oracle on 2026-08-25, on finding that two agents' `MEMORY.md`
carried a model the canon no longer holds:

> *"`MEMORY.md` is neither `closed` nor `open`. A `closed` document asserts
> something about the past — that is why it is not rewritten. A memory asserts
> something about the present: it is **state, not record**. Correcting it from
> outside falsifies nothing, but it corrects an actor in motion, and that needs
> a name of its own."*

| Threshold | What it takes | Series |
|---|---|---|
| **`live`** | Corrected when it contradicts canon or a signed decision. **The correction is recorded inside the document itself**, naming who corrected it and against which decision | `agents/*/MEMORY.md` · `operations/OPS-008-session-state.md` |

**Why it is not `closed`.** `closed` protects a claim about the past: a `done`
mission keeps saying what it achieved. A memory makes no claim about the past —
it says *this is how things are*. Rewriting it cannot mislead a future reader
about what happened, because it never testified about what happened.

**Why it is not `open`.** An `open` document is changed by whoever has a reason.
A memory is **written by its own agent**, and correcting it from outside is
overriding an actor's understanding while it is acting. That is not a normal
edit, and pretending it is hides the only thing that makes it consequential.

**The rule, and the part that carries the weight:**

```yaml
# agents/nimrod/MEMORY.md
corrections:
  - date: "2026-08-25"
    by: "oracle"
    decision: "ADR-023"
    what: >
      The triad's first level was labelled "Operating System (Numen Games)".
      Per Epistemic_Relations line 19, that name belongs to the whole. The
      level is the germinal motive.
```

**A corrected agent must be able to see that it was corrected**, by whom, and
against which decision. A memory silently rewritten from outside produces an
actor that has changed its mind without knowing it did — indistinguishable, from
the inside, from having always thought so. That is `D-021`'s defect applied to
an agent instead of a date: **a state that looks like it was always the case.**

Consequences:

- A vocabulary decision is not complete when the ADR merges. **It is complete
  when the memories that carry the old vocabulary are corrected**, or when it is
  written down that they need not be.
- `MEMORY.md` is exempt from `[CI]` checks that assume documents are records.
  It has no `created_source` obligation (§6.2): it does not date events.
- **A memory that contradicts canon is a defect with a severity, not a stale
  file.** The agent is executing the old model right now.

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

**Absorption** (ADR-030, 2026-08-31) is the second way a record leaves the
folder. Where superseding replaces reasoning, absorption carries it into
another record — the file goes, the reasoning and the identifier do not.
Permitted only when all three hold: the reasoning survives in the absorbing
document, every citation is rewritten in the same change, and every public
URL redirects to the absorbing record. The absorbing document declares
`absorbs: [...]`, and `check-references.mjs` reads that field so the absorbed
identifiers keep resolving. Reachability is what this clause protects; the
file is one way to serve it, not the only one.

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

### `guilds/` — how actors **group** · `governed`
**Epistemic.** The shared rules of each guild and who belongs to it.
**Pragmatic.** Consulted when assigning work or resolving membership.

⚠️ **Under review, and the review is specific.** `guild:` already works as a
field — 124 documents, 4 canonical values plus 7 deviations. That makes half
this folder redundant: the `charter` files are norm and belong in `standards/`;
the `roster` files are **apparatus**, a regenerable view of a field that already
exists on every agent. The folder stays until an ADR decides; it is listed here
because it exists, not because it is settled.

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

| `type` | Series | Guard can be strict? |
|---|---|---|
| `seminal` | `canon/` | yes |
| `documentation` **normative** | `standards/` | **no** — see below |
| `documentation` **explanatory** | the series it explains | **no** — see below |
| `protocol` | `protocols/` | yes |
| `mission` | `missions/` | yes |
| `adr` | `decisions/` | yes |
| `blueprint` | `blueprints/` | yes |
| `report` | `reports/` | yes |
| `legal` | `operations/legal/` | yes |
| `charter` | `guilds/` (under review) | yes |
| `meta` | anywhere | **no** — apparatus accompanies its series |

### Two types a guard can never check strictly

**`documentation`** does two jobs under one name. Normative documentation
(`STD-001` itself) belongs in `standards/`; explanatory documentation
(`debt/D-001`, a `README`) belongs with whatever it explains. **The `type` alone
cannot tell them apart** — only whether the document obliges anything can, and
that is a reading, not a field.

**`meta`** is apparatus: an `INDEX.md` lives beside the series it indexes, a
`TEMPLATE.md` beside the series it templates. Mapping it to one folder would be
wrong.

**Consequence, stated so nobody discovers it later:** the guard proposed in
`D-001` (`lint-type-vs-folder.mjs`) **can only be strict for 8 of the 11
types.** For `documentation` and `meta` it can warn — flagging a
`documentation` outside `standards/` that carries normative language, for
example — but a warning is not a gate and must not be sold as one.

### Before using this map to move anything

**A `type` can be wrong.** The map above assumes the declaration is accurate,
and it is not always. Verified 2026-08-24: three documents in `operations/`
declared `type: protocol` while being reference tables — `credential-map.md`
is an inventory of which account is configured where. Nobody executes it.

Moving them on the strength of their `type` would have propagated the error
into `protocols/` and given a stale document the standing of a live procedure.
One of the three also duplicated `GOVERNANCE.md` and asserted two things the
repository disproves.

**So the order is:**

1. **Verify the `type` against the document.** Does it match the series
   definition in §2 — an actor executing a sequence, an artifact complying with
   a rule, evidence of an observation?
2. If the `type` is wrong, **that is a genre ruling** and it needs an ADR. It
   is not a frontmatter edit inside a refactor.
3. Only once the `type` is known to be right does §3 apply, and then the file
   moves.

A mapping table is a filing instrument, not a judgement. It cannot tell you
whether a document is what it says it is.

> **`meta` marks apparatus.** A *record* has probative value (`MIS-085`);
> *apparatus* is the instrument for finding it (`INDEX.md`, `TEMPLATE.md`) and
> is **derived** — rebuildable from the records. **If it can be regenerated from
> the others, it is apparatus.** An out-of-date index is a bug; an out-of-date
> record is history.

### 3.1 One document, both natures: enumeration and relation `[MANUAL]`

**The part that enumerates is apparatus. The part that relates and judges is
record.**

An `INDEX.md` is not one thing or the other — **it is both at once, and that is
why nobody could see where it belonged.** Named by the Oracle on 2026-08-25 on
being shown that four indexes contain nothing a machine could not derive, and
one contains a great deal:

| Index | Rows | Relations | Judgements | Explanations |
|---|---:|---:|---:|---:|
| `agents/` | 15 | 0 | 0 | 0 |
| `decisions/` | 13 | 0 | 0 | 1 |
| `blueprints/` | 7 | 0 | 0 | 0 |
| `reports/` | 8 | 0 | 0 | 0 |
| **`canon/`** | **41** | **7** | **6** | **8** |

The first four list `id · title · status · version` — every field already in the
frontmatter of the file being listed. **Hand-maintaining them is copying, and
`D-031`'s 32 absences are what copying produces.**

`canon/INDEX.md` also carries `CAN-001 summarizes CAN-002, CAN-004`, values like
`9/10`, and reasons like *"genre: a permissions matrix regulates an artifact, it
does not name the world"*. **None of that is in any file.** It is a judgement
about the corpus, and generating the index would destroy it — along with the
relation graph, which is the only thing that moves `E6`.

So:

- **Enumeration derives.** If every column comes from the frontmatter of the
  documents listed, the table is apparatus and maintaining it by hand is a
  source of omission, not of information.
- **Relation and judgement do not.** `summarizes`, `grounds`, `supersedes`, a
  score, the reason for a decision — these are assertions *about* the corpus
  that no document makes about itself.

> The test: **if deleting it loses nothing that cannot be rebuilt from the
> files, it enumerates. If deleting it loses an assertion nobody else makes, it
> records.**

A document holding both should say which part is which — or be split. That
decision, for `canon/INDEX.md`, is registered in `D-031` and not taken here.

---

## 4. Registration: the identifier

Connects a document to the **1,617 textual references** that name it — almost
always in plain text, without a link. Hence: **opaque and permanent.** It encodes
nothing that can change, is never reused, is never renumbered (ADR-004).

### 4.1 Prefix per series `[MANUAL]`

Blocker 2 of the Oracle. Four series had no scheme; this document could not be
filed for lack of its own.

| Prefix | Series | Coverage today (2026-09-02, `7f51235`) |
|---|---|--:|
| `MIS-NNNN` | `missions/` | **132/132 · 100 %** |
| `ADR-NNN` · `DEC-NNN` | `decisions/` | **9/9 · 100 %** |
| `PRO-NNN` | `protocols/` | **7/7 · 100 %** |
| `RPT-NNN` (subtype `audit` · `analysis` · `proposal`) · `RPT-YYYY-MM-DD` (subtype `daily` only) | `reports/` (flat, `ADR-005` v1.2.0) | **24/24 · 100 %** |
| `BLU-NNN` | `blueprints/` | **3/3 · 100 %** |
| `CAN-NNN` | `canon/` | **7/7 · 100 %** |
| `STD-NNN` | `standards/` | **5/5 · 100 %** |
| `OPS-NNN` | `operations/` | **9/9 · 100 %** |
| `DBT-NNN` | `debt/` | **12/12 · 100 %** |
| `GLD-NNN` | `guilds/` | **8/8 · 100 %** |
| `INF-NNN` | `infra/` | 0/0 · — |

Coverage measured by `scripts/telemetry.mjs` (`series.registration`; before
2026-09-02, `count-evidence.py`), which excludes apparatus by rule
(`type: meta`, `D-014`, `scripts/lib/rules.json`) and frozen artefacts by the
`MIS-125` ruling (`P-010` §3.2). It is not copied from an earlier version of this table.

**This document is `STD-001`** — `S-001` until `MIS-125` Stage C registered
the shelf into `STD-NNN` (#181, 2026-08-31). From #181 to v5.1.1 this
paragraph read "is `STD-001`, registered under the superseded `S-NNN`
scheme" and announced the rename as still pending — written in the same
commit that performed it. **Nothing is renumbered** — see §5. `AG-NNN` was
withdrawn with the `agents/` reversal and no longer exists as a scheme.

> **Superseded 2026-08-31.** This table previously prescribed `MIS-NNN`,
> `P-NNN`, `S-NNN`, `D-NNN`, `C-NNN`, `O-NNN`, `BP-slug`, `RPT-YYYY-MM-DD`,
> `AUD-YYYY-MM-DD` and `AG-NNN` — ten of its eleven rows. All ten were
> superseded by the Oracle's `ADR-005` v1.1.0 amendment, and `guilds/` and
> `infra/` were missing entirely. For a day this standard mandated prefixes
> that the decision governing it had retired, and `MIS-125` was renaming the
> corpus *against* its own glossary. Found by the Oracle, 2026-08-31.
>
> The reason it went unnoticed is registered as **`D-050`**: the reference
> guard's `ID_RE` never matched the retired prefixes, so a citation to a
> retired scheme could not be reported as anything.

### 4.2 Time-based prefixes
A **daily report** carries a date because it **is** its date: the date is
identity, not a mutable attribute. This is the only exception and it is one
by nature, not convenience. `ADR-005` v1.2.0 (2026-09-01) closed the question
its v1.1.0 had left open against `ADR-004` rule 3: the date form is legal for
`type: report` + `subtype: daily` **only**, and only inside `reports/`.
Audits do **not** carry a date — an audit is its *subject* on a date, which
is what the number plus `created` already record; `AUD-YYYY-MM-DD-<slug>` is
a retired shape, never reassigned.

> **`AG-`, not `A-`, and the reason is cost.** `A-001`…`A-016` already exist as
> numbered findings inside two audits, cited from a different document than the
> one defining them. They are section identifiers, not documents — but a reader
> meeting `A-003` would have to work out from context whether it is an agent or
> an audit finding.
>
> Changing it costs **zero**: `agents/` has issued no identifier. Ruled in
> `ADR-005`, on the principle that an ambiguity is cheapest to avoid before the
> first identifier exists — which is the opposite of the `D-` case, where 18
> identifiers and 121 citations make renaming the wrong trade.

> **`S-` is a live numbering in `canon/`, and `STD-001` is taken twice.**
> Measured 2026-08-25 against `canon/INDEX.md`: `STD-001`…`S-010` are not stray
> frontmatter. They are the canon's own registration, and **9 of the 10 resolve
> to a file that exists**:
>
> | | | |
> |---|---|---|
> | `STD-001` | Welcome to Numinia | **collides with this glossary** |
> | `S-002` | Numinia Brand and Culture | exists |
> | `STD-003` | Epistemic Relations | filename drifted — `INDEX` points at a name that no longer exists |
> | `STD-004`…`S-010` | Compendium, Role Structure, Platform Roles, Session Zero, RPG Manual, Rank Specs, README | exist |
>
> `canon/INDEX.md` also carries a relationship graph built on these numbers
> (`STD-001 summarizes S-002, S-005, S-006`), and `STANDARDS.md` documents `S-` as
> *Seminal* in its prefix table. **40 of the 88 unresolved citations in `D-018`
> are this.**
>
> The Oracle's ruling stands — `S-` belongs to `standards/`, `seminal_id` is
> retired — but its cost is now measured: **`MIS-109` must renumber canon to
> `C-NNN` and rewrite the graph in `canon/INDEX.md`**, not merely delete a
> frontmatter line. And `STD-003` is a second finding: the index points at
> `Epistemic relations between Numen Games and Numinia.md`, which was renamed to
> `2026_04_15-Epistemic_Relations_…-v0.2.0.md` without updating the index.
>
> **CLOSED 2026-08-25 — `MIS-109` phase C.** The seminal series is now `CAN-001`…
> `C-007`; `S-` is unambiguously `standards/`. Both collisions are gone: `STD-001`
> is this glossary alone, `STD-003` is Platform Role System alone. The index keeps
> the old number in an *Antes* column, because it is what pre-2026-08-25
> documents cite and an identifier is a promise about the past (`ADR-004`).
> Seven seminal documents, not ten: `S-006` changed series, `S-008` lives in
> `numinia-lore`, `S-010` was apparatus. The broken `STD-003` link is fixed.

### 4.3 Series below full coverage: the plan for each `[MANUAL]`

Blocker 4 asked for canon. The same demand applies to every series that declares
a scheme it does not meet — a rule honoured at 8 % is not a rule.

#### `canon/` — 1/12

**Proposal: register the canon**, one identifier per seminal document. It is the
most-cited series in the corpus (`C-005` alone: 64 mentions) and the only one
without a stable handle. Filenames with spaces (`C-006-session-zero.md`) make it
worse: they cannot be cited in plain text without ambiguity.

Cost: 11 renames plus reference updates, verifiable with
`scripts/check-references.mjs`.

**Alternative, if the Oracle prefers:** withdraw the `id` requirement for
`canon/` and declare the filename to be the identifier. Legitimate — but then
the rule must say so, and citations of the form "see Welcome to Numinia" become
normative.

#### `reports/audits/` — 0/4, and the fix is cheap

Four audits, four naming conventions:

```
AUD-2026-04-07-system-audit.md      date · Spanish slug · no prefix
AUD-2026-08-17-cold-agent.md       date · English slug · no prefix
AUD-2026-08-17-stack.md            date · English slug · no prefix
AUD-2026-08-17-navigability.md     wrong prefix · date at the end
```

Unlike canon, **nothing blocks this one**: audits are cited by path, not by
identifier; the reference lint catches any link the rename breaks; and the Astro
collection globs `*.md`, so no page disappears.

```
AUD-2026-04-07-system-audit.md   → AUD-2026-04-07-sistema.md
AUD-2026-08-17-cold-agent.md    → AUD-2026-08-17-cold-agent.md
AUD-2026-08-17-stack.md         → AUD-2026-08-17-stack.md
AUD-2026-08-17-navigability.md  → AUD-2026-08-17-navigability.md
```

Three already carry the scheme, so the series would reach 7/7. **Not done in
this PR** for the same reason as everything else: renaming files to match an
unsigned rule is the mistake these debts exist to prevent. Registered as
**D-013**.

#### `blueprints/` 16/22 · `protocols/` 11/13

The 2 non-conforming protocols are `INDEX` and `README` — they are `meta` and
correctly outside the scheme, so **`protocols/` is effectively 11/11**. The
counter measures apparatus as if it were record; that is a finding about
`scripts/count-evidence.py`, noted in §10. The 6 blueprints are the
`archive-summa-*` and `RPT-2026-04-07-wardley` files, which `MIS-089` §D3 already flags for
relocation.

> **What is not acceptable is a scheme declared mandatory and honoured at 8 %,
> with no plan and no debt entry.** Every series below 100 % now has one or the
> other.

### 4.4 Cross-repository citation `[MANUAL]`
`ADR-006` exists here and in `numinia-web` with different meanings. Across the
boundary: `nwos:ADR-006` · `web:ADR-006`. Inside the repo, the bare identifier
remains correct.

---

## 5. Changing series `[MANUAL]`

### 5.0 Not registered, and why — `registration: exempt` `[MANUAL]`

**A gap and a declared exception must not look alike.**

`D-008` measures registration coverage by counting documents whose filename
carries an identifier. Today a document without one is indistinguishable from a
document that will never have one, and coverage figures read worse than the
archive actually is.

Ruled by the Oracle on 2026-08-25, generalising the same defect `D-023` found in
the publishing glob — *"excluded on purpose" and "forgotten" were the same
thing to a reader*:

```yaml
```

**Both fields or neither.** `exempt` without a reason is a gap with better
manners.

The reason must name what makes registration wrong — not that it is
inconvenient. Three legitimate shapes, all present in the corpus today:

| Shape | Example |
|---|---|
| **Frozen artifact** — a dated filename is a photograph, not a living document (`P-010` §3.2) | `2026_04_14-Analogous_Terminology_Numina-v0.2.0.md` |
| **Apparatus of a registered document** — belongs to its parent, not to the series | `protocols/APPROVAL-REQUEST-template.md`, used by `P-008` |
| **Consumers cannot all be updated** — see below | `standards/STD-005-engineering-standards.md` |

Counters read `registration: exempt` as **out of the denominator**, not as a
miss. A series at `8/8 · 2 exempt` is fully registered; `8/10` is not, and the
difference is a decision somebody made rather than work somebody skipped.

### 5.0.1 A rename whose consumers cannot all be updated is not done `[MANUAL]`

**Rule.** Before renaming, enumerate the consumers. If even one cannot be
updated in the same change, the rename does not happen.

Learned by doing it wrong on 2026-08-25:
`standards/STD-005-engineering-standards.md` was renamed to `S-002-…` and reverted in
the same session. Measuring came *after* acting. What the measurement found:

- **18 documents** cite it by filename
- `CLAUDE.md` declares it *"this repository's own operative standard"*
- `.github/workflows/scorecard.yml` names it in a comment — and the agent has no
  `workflow` scope (`D-017`), so that reference **could not be updated at all**

The last one is decisive and is not about effort. A consumer outside the
agent's reach makes the rename **structurally incomplete**, not merely
expensive. The correct outcome is `registration: exempt` with that reason
written down.

> **The premise changed, 2026-08-31.** `D-017` was extinguished on 2026-08-30
> (`ADR-030`) and its resolution reads *"workflow scope granted"* — so the
> reason above ("the agent has no `workflow` scope") is **no longer true**, and
> `D-017` is cited here as history, not as a live blocker. The exemption is
> left standing on its other grounds (18 citing documents, `CLAUDE.md`), which
> were always the substantive ones. Whether it survives re-examination is
> `MIS-125` Stage C's business, not this section's. Recorded rather than
> silently deleted: the measurement was correct on the day it was made.

This is narrower than `ADR-004`'s *never renumber*: it governs renames that are
not renumbering, where the cost sits in the citation graph rather than in the
identifier.

---

## 5.1 Changing series

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

## 5.2 An agent that has committed never loses its name `[MANUAL]`

**Rule.** When an agent is renamed, the new name is **added**. The old one stays
declared in its record as a historical identity, with the dates it was in use
and the git author string it committed under.

Ruled by the Oracle on 2026-08-25, after `MIS-089` renamed Centinela-01 to
Nimrod:

```yaml
# agents/nimrod/SOUL.md
name: "Nimrod"
historical_identities:
  - name: "Centinela-01"
    git_author: "Centinela-01 <khepri@ai.numengames.com>"
    in_use: "2026-04-06 → 2026-08-17"
    commits: 57
```

**Why this is a rule and not housekeeping.** 57 commits — including the ten
seminal canon documents — are authored by `Centinela-01`, and **git authorship
cannot be rewritten**. Rewriting it means new hashes for every commit since
April, a broken signed tag, and every existing reference invalidated: the cure
destroys more provenance than the disease.

> Git history is the only genuinely immutable threshold in this repository.
> `canon/` is `sealed` — a signature and an ADR can still change it. Commit
> authorship cannot be changed at any price worth paying.

So an agent's name is not a mutable attribute once it has acted. It is identity
in the sense of `ADR-004` — **opaque, permanent, never reused** — and the same
reasoning applies: renaming breaks references in silence, and here the
references are in a history nobody can edit.

**The reverse lookup is what must work.** A reader starts from `git log` with a
name and an email, not from the agent's folder. Declaring the alias inside
`agents/<current-name>/` is necessary and not sufficient: `agents/INDEX.md` must
carry historical identities too, because the index is where a reader looks
first. See `D-027`.

**Applies to people as well as agents**, via `D-026`: a contributor with two
accounts keeps both listed, and retired identities stay resolvable.

---
## 5.3 A rename propagates to pointers, never to records `[MANUAL]`

**Rule.** When a file is renamed, update the documents that **point at** it.
Never the documents that **record what it was called**.

> This is the border between correcting and falsifying, and a bulk edit has
> crossed it twice.

Ruled by the Oracle on 2026-08-25, during `MIS-109` phase B. A reference-updating
script touched 19 files; four were dated reports:

```diff
  reports/daily/RPT-2026-04-02.md
- | 2 | About Session Zero.md | 8/10 |
+ | 2 | C-006-session-zero.md | 8/10 |
```

That makes an April report say the file was called `C-006-session-zero.md` in
April. **It was not.** §2.1 gives `closed` documents protection of *substance*,
and in an inventory table **"which files existed on this date" is the
substance** — it is the entire point of the table.

The test:

| The document says | It is | On rename |
|---|---|---|
| *"see `canon/X.md`"* | a **pointer** — it wants the reader to reach a file | **update it** |
| *"on 2026-04-02 the canon held `X.md`"* | a **record** — it testifies about a moment | **leave it** |

**A broken link inside a dated report is not a defect.** It is a photograph of a
corpus that no longer exists, and the reference lint counts such links among its
known-broken baseline — which is exactly where a historical reference belongs.

Practical consequence for any bulk rename: **exclude `reports/`, `CHANGELOG`,
`debt/` entries that quote past states, and every file under
`reports/evidence/`** before
running the substitution, then read the diff of what remains. The mechanical
part is the exclusion list; the judgement is deciding whether each remaining hit
points or records.

> **Corrected 2026-09-01.** Until `ADR-005` v1.2.0 this list named
> `reports/audits/evidence/` — a path that did not cover the licensing audit's
> annex (`reports/audits/AUD-2026-08-26-licensing-c005/`), which is how
> `MIS-125` bug 6 rewrote an SBOM. Evidence now has a single home
> (`reports/evidence/<RPT-id>/`) so the exclusion can be stated once.


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

**Absence is declared, not omitted (ADR-027 (formerly ADR-028)).** A field that is not filled in
carries information, and that information has three distinct forms. Writing the
wrong one is a lie about the shape of the gap.

| Form | Meaning | When to use |
|---|---|---|
| field omitted | the field does not apply to this **type** of document | a `report` has no `completed`: reports do not complete |
| `null` | the field applies but is **empty for this document** | `assigned_to: null` — the mission exists, nobody holds it |
| `"TBA"` | the field applies, the value **exists but is not yet decided** | `territory: "TBA"` — the document belongs somewhere; the vocabulary is not settled |

`"TBA"` is not a parking space. Every `"TBA"` is counted by the guard on every
run and reported by field, and the document that writes one **names the mission
that will resolve it**. A `"TBA"` with no owner is a violation the day it is
written — debt that is visible is still debt.

The distinction is Codd's, from *RM/V2* (1990): a value missing-but-applicable
is not the same as a value missing-and-inapplicable, and SQL's mistake was
spending a single `NULL` on both. Today **61** documents already write `null`
(`completed` ×37, `assigned_to` ×24); this section legalises what they were
already saying rather than migrating them.

Today only **2 of 242** documents declare any relation.

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

`blocked_reason` (8 uses at time of writing) was orphaned by the removal of
`blocked`. Retired 2026-08-31 (`D-002`, closed): the one substantive value
(`MIS-052`, "PC in transit") lived on a mission that was never actually
`frozen` — a `todo` mission waiting on an external event, not a
deliberately-paused one — so it moved to body prose, not `freeze_reason`.
The other 7 were `null`. `H-31` guards the field against regression,
corpus-wide, citing this closure.

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

> **Proven necessary, 2026-08-24.** This rule existed in draft while its author
> wrote ten documents with hand-invented dates — several of them inside the
> entries defining it. What makes the case is not the count: **the sequence was
> coherent fiction**, each a plausible minute after the last, crossing midnight,
> when six of the files had come out of a single commit at 22:07.
>
> A future reader does not catch that. A wrong date that looks arbitrary invites
> suspicion; a wrong date that looks like a timeline does not. **The provenance
> field matters more than the value.** Registered as `D-021`; `MIS-109` inherits
> this rule as an acceptance criterion.

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

### 9.1 Citing an identifier vs mentioning one as data `[MANUAL]`

**The problem.** A document that inventories broken references trips the guard
that detects them. `D-018` lists `RPT-07` in a table of unresolved identifiers;
`check-references.mjs` reads that table row as a citation and reports it as a
new breakage.

> **A report about broken citations is itself full of broken citations. That is
> what it is for.**

This is not a bug in the lint. It is a category the lint does not have: it
cannot tell **citing** — *"per `ADR-004`, identifiers are never renumbered"* —
from **mentioning as data** — *"`ADR-004` · 1 citation · recovered"*.

It will recur. Every future audit of citations, every debt entry about a
missing document, every session report quoting a figure lands the same way.

**The convention.** An identifier mentioned as data is written **inside a code
span**, and the surrounding structure makes it a table cell, a list item or a
fenced block:

| Intent | Written as | Resolves? |
|---|---|---|
| **Citation** — the document is the authority | `` per ADR-004 `` — bare, in prose | must resolve |
| **Mention as data** — the identifier is the subject | `` `ADR-004` `` in a table cell, list item or fenced block | not checked |

```
✓ citation      Identifiers are never renumbered (ADR-004).
✓ mention       | `RPT-07` | 1 | pre-existing |
✓ mention       - `S-002`…`S-010` — the seminal numbering, 40 citations
✗ ambiguous     RPT-07 appears once and does not resolve.
```

**Why a convention and not an exemption.** An exemption would name `D-018` in
the lint's ignore list and be forgotten; the next report would trip the guard
again and someone would add a second exemption. A format convention is
inherited by every document that follows, and it is visible to a reader — which
an ignore list buried in a script is not.

**Why a code span specifically.** It is the mark the corpus already uses for
"this is a literal, not prose", it renders correctly on numinia.org, and both
linters can implement it as *skip identifiers inside backticks* — one rule, two
instruments, no per-document state.

**Applies to** `check-references.mjs` and `scripts/resolve-citations.py`.
Neither implements it yet, which is why this is `[MANUAL]`. The change is small
in both — strip code spans before scanning — and belongs with the guards in
`D-001`.

**Documents already affected:** `debt/D-018`, `reports/daily/RPT-2026-08-24.md`,
`reports/audits/AUD-2026-08-17-stack.md` and `STD-001` itself. They are
reformatted as the convention lands, not exempted.

---

## 10. Reproducible evidence

### 10.0 Plausible artefacts — the class `[MANUAL]`

**An artefact that has the shape of evidence, and is not evidence.**

Ruled by the Oracle on 2026-08-25, after the fourth instance in two days:

> *"Fourth time with the same shape — a date that looks like a chronology, a
> figure that looks like a measurement, a run that looks like verification, a
> guard that looks like coverage. It deserves naming as a class, not as four
> incidents."*

The four:

| Instance | Looks like | Is |
|---|---|---|
| `D-021` | A creation timeline: 00:30, 00:32, 00:34… | Ten hand-typed dates. The six files came from **one commit at 22:07** |
| `D-022` | A measurement: `0/17`, `49 broken`, `19 entries` | Counts of the wrong unit — files not folders, rows not documents, lines not entries |
| §10.3 | Verification: a green CI run | A run that is **identical with the guard and without it** |
| Phase 1 | Coverage: `check-references.mjs` green | A markdown linter, blind to a **TypeScript slug map**. The site was broken while it passed |

**The common mechanism, and why care does not fix it:**

1. The artefact is **well-formed** — no crash, no zero, no empty output.
2. Its shape matches the thing it is mistaken for — a plausible timeline, a
   plausible count, a plausible pass.
3. **Nothing checks the gap between shape and substance**, because the shape is
   what any checker would look at.
4. A reader accepts it, and it becomes the record.

Every one of the four was caught by a **human finding the artefact
implausible** — never by another instrument. That is the defining property: a
plausible artefact is invisible to the layer that produced it.

**What the corpus does about it**, and none of it is diligence:

- **Name the unit** (§10.2) — `0/17 agent folders` is false on sight
- **Declare the source** (§6.2, `created_source`) — a date traceable to a commit
  cannot be typed
- **Read the step, not the run** (§10.3) — the conclusion cannot distinguish the
  two cases; the step list can
- **Know what a guard does not check** (§10.4) — `check-references.mjs` reads
  markdown; a slug map in `.ts` is outside its world, and only `npm run build`
  knew

> A guard proves what it checks, never what it does not. **A green guard is
> evidence about the guard, not about the repository.**

The fourth had no mechanism until 2026-08-31. It has one now: §10.4.

### 10.4 Every guard declares what it is blind to `[MECHANISED]`

Each guard prints, on **success as well as failure**, the things it did not
look at — because a green result is exactly when the reader is least likely to
ask. The declarations live in `scripts/blind-spots.json`, are printed by
`scripts/lib/blindness.mjs`, and are checked by
`scripts/test/blindness.test.mjs`.

The suite is **not yet a CI step** — wiring one is the Oracle's, per `P-013`
step 3 and `ADR-027 (formerly ADR-029)`. Until then it is run by hand, and a green CI run does
not include it.

| Guard | Sees | Blind to | Covered by |
|---|---|---|---|
| `check-references` | `.md`/`.json` citations, by id and by path | consumers in `.ts`/`.astro` (slug maps, `import.meta.glob`) | `npm run build` |
| | | the **folder** in a path citation — resolution falls back to basename (`D-047`) | nothing |
| | | untracked files — enumerates via `git ls-files` (`D-049`) | its own warning |
| `lint-naming` | filename shape vs the series scheme | untracked files (`D-049`) | its own warning |
| | | whether a slug is *meaningful* — a name keeping a dead prefix inside its slug still passes the shape check | nothing |
| `lint-frontmatter` | header fields H-00…H-31 | whether a deferral is honest — a `TBA` may name a dead mission | nothing |
| | | untracked files (`D-049`) | its own warning |
| `check-license-frontmatter` | `license:` vs the `REUSE.toml` regime | whether the licence is **correct** for the content | nothing (`D-042`) |
| | | files with no `license:` field — skipped, not flagged | nothing |
| `check-frontmatter-yaml` | frontmatter parses as YAML | whether the parsed **values** are right | `lint-frontmatter`, partially |
| `check-frontmatter-delimiter` | the closing `---` sits on its own line | files with no frontmatter at all — skipped silently | `lint-frontmatter` |
| `check-orphan-content` | `public/` content reaching `dist/` unrendered | whether the **rendered page** is correct | nothing |
| `telemetry` (`series.registration`) | registration coverage per series | whether a registered document is any *good* | nothing |

Three properties make this more than a list:

1. **It is printed where the claim is made** — in the guard's own output, not
   in a document nobody opens while reading CI.
2. **It names the coverer, or admits there is none.** "Nothing covers this" is
   the useful half; four rows above say it.
3. **It is verified, not asserted.** `blindness.test.mjs` builds a file that
   *should* trip each guard, runs the guard, and asserts it stays green —
   proving the blindness is real. A declared blind-spot list nobody verified
   would be a claim about coverage with the shape of evidence, which is the
   very thing §10.0 is about.

The suite fails when a declaration stops being true. That is deliberate: if a
guard is fixed and stops being blind, the test fails, and the fix must be
recorded rather than absorbed silently.

**What §10.4 is itself blind to:** it prints the blind spots that were
*thought of*. It cannot enumerate the ones nobody has imagined. The mechanism
narrows the gap between "what this guard checks" and "what a green run is read
to mean"; it does not close it.

### 10.0.1 Failure by omission `[MANUAL]`

**A failure by omission produces no error. It produces a valid artefact that is
smaller than it should be.**

The general form of the plausible artefact, named by the Oracle on 2026-08-25
after the third instance in one day:

| Debt | What is missing | What the tooling sees |
|---|---|---|
| `D-023` | A series never reaches the site | A green build with less to build |
| `D-028` | A page moves and its old URL dies | A green build with a different URL |
| `D-031` | A document is absent from its index | Valid markdown either way |

**An index cannot fail for what it omits.** Nothing distinguishes *"this series
has three documents"* from *"this series has twenty-two and the index knows
three"* — both are well-formed, and the smaller one is indistinguishable from a
smaller truth.

This is why omission outlives every other defect in this corpus. A broken link
is reported by a linter. A wrong figure looks implausible to a reader. **An
absence looks exactly like a smaller world**, and nobody is surprised by a world
they have never seen the rest of.

Two consequences for how guards are written here:

1. **A guard that validates what is present cannot detect what is missing.**
   Detecting omission requires an independent enumeration of what *should* be
   there — the filesystem against the index, the glob against the folder list,
   the renames against the redirect table. Every instance above was found that
   way, and none by the tool that owned the artefact.
2. **The count is the signal, and nobody watches counts.** `debt/` reaching the
   site showed up as `515 → 559 pages`, noticed only because the number happened
   to be under observation for another reason.

> `STD-001` §10.2 requires a figure to declare its unit. Omission is the case
> where the unit is right, the figure is right, **and the denominator is
> silently wrong.**



### 10.1 Every measurement declares where it measured `[MANUAL]`

**Rule.** Every measuring script states in its output which `ROOT` and which
`HEAD` it measured. **Without that line its result is not evidence.** And a
result of zero is treated as suspect until the instrument is shown to have been
pointing at the right place.

Ruled by the Oracle on 2026-08-24, after the same fault occurred twice in one
day:

```
cancel_to_frozen.py   run from /tmp  →  "0 misiones convertidas"
resolve-citations.py  run from /tmp  →  "0 rotos, 0 citas"
```

Both computed `ROOT` from their own file location and measured the wrong
directory. The second is the dangerous one:

> **Zeros that look like success.** A verifier reporting "0 broken citations" is
> indistinguishable from a clean corpus. That output was produced while a merge
> decision was being taken on it.

**Implemented** in `scripts/measuring_root.py`, used by every measuring script:

- `cabecera(ROOT, ref)` prints `ROOT`, `HEAD`, whether the working tree is
  dirty, and how many `.md` are tracked — and **exits 2** if `ROOT` is not a git
  repository containing a corpus, rather than returning zeros.
- `sospechoso_si_cero(n, etiqueta)` marks a zero as suspect in the output
  instead of reporting it as a result.

The rule is `[MANUAL]`: nothing prevents a new script from omitting the header.
That is a guard worth writing, and it belongs with the others in `D-001`.

### 10.2 Every figure declares its unit `[MANUAL]`

**Rule.** A count states **what it counted**, in the output, beside `ROOT` and
`HEAD`. `18` is not a measurement. `18 entries` is.

Ruled by the Oracle on 2026-08-25, after the sixth miscount in two sessions:

> *"The problem is not counting wrong, it is that no output declares WHAT it
> counts. `0/17` and `0/5` are not two figures of the same fact: they are
> different units with no label. If it said `0/5 agent folders`, the error is
> visible by itself."*

That is the correction to `D-022`'s original closing condition, which was
*"re-measure instead of copying"* — a rule that depends on somebody remembering.
**Naming the unit does not.** Three of the six miscounts were a container
counted instead of its contents:

```
agents/ 0/17 unregistered  →  0/5    four files per agent folder
citations 49 broken / 280  →  17/88  table rows counted as documents
baseline 19 entries        →  15     lines of JSON
```

Every one of them reads as correct without a unit, and as obviously wrong with
one. `0/17 agent folders` is false on its face: there are five agents.

**Implemented** in `scripts/measuring_root.py` as `cifra(n, unidad)`, which
refuses to format a number without a unit.

### 10.3 A guard is verified by its step, never by the run `[MANUAL]`

**Rule.** To confirm a CI guard runs, read the **step** in the job, not the
**conclusion** of the workflow run.

Found by the Oracle on 2026-08-25, wiring the reference lint:

> *"The first attempt came back green without the step. The run passes
> identically with the guard and without it — I caught it by looking at the
> steps."*

A green run means *nothing failed*. A workflow missing the guard entirely also
has nothing fail. **The two are indistinguishable from the conclusion**, and the
failure mode is silent in the direction that matters: a guard believed to be
protecting the repository, protecting nothing.

```bash
# NOT this — proves only that something ran
curl -s ".../actions/workflows/ci.yml/runs?per_page=1" | jq '.workflow_runs[0].conclusion'

# This — proves the guard exists in the job and what it did
curl -s ".../actions/runs/<RUN_ID>/jobs" \
  | python3 -c "import sys,json; [print(s['name'],'·',s['conclusion']) for j in json.load(sys.stdin)['jobs'] for s in j['steps']]"
```

Expected: `reference lint (ADR-004 …) · success`.

**Generalises beyond CI:** the same shape as `D-021` (a date that looks like a
timeline) and `D-022` (a figure that looks like a measurement). Here, **a run
that looks like verification.** In all three the artefact is plausible and the
evidence for it is absent.

---

Every figure in the table below comes from `scripts/count-evidence.py`, measured
against HEAD `7d17b5a` (2026-08-24) — **a dated census, kept as the baseline
this standard was written against; the live coverage figures are §4.1**:

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

> **A known flaw in the counter itself.** `count-evidence.py` measures
> `INDEX.md` and `README.md` as if they were records, so `protocols/` reads
> 11/13 when it is effectively 11/11 — the two "failures" are `meta`, correctly
> outside the scheme. The counter should exclude apparatus before counting
> registration coverage. Left uncorrected in this version deliberately: fixing
> it would change a number the Oracle is reviewing, and a silent improvement to
> a measurement mid-review is exactly the habit these debts exist to break.
> Registered as **D-014**.

---

## 11. Open — the Oracle disposes

**The five undefined fields now have entries.** They were promised in v2.0 and
written on 2026-08-25; until then this section pointed at nothing, which is the
defect `D-018` exists to catch.

1. **`human_approval_score`** (16 documents) — says `# 1-10` but not *what* it
   measures. → `D-003` (extinguished 2026-08-30, ADR-030: defined as the
   approval gate in `standards/STD-002-governance.md`)
2. **`semaforo`** (7) — verde/amarillo/rojo, in Spanish. What triggers each
   colour, and who sets it. → [`D-004`](../debt/D-004-semaforo-undefined.md)
3. **`confidence_before` / `after`** (2) — scale, and who fills them.
   → [`D-005`](../debt/D-005-confidence-scale-undefined.md)
4. **`cost_estimate`** (2) — currency, compute, human time.
   → [`D-006`](../debt/D-006-cost-estimate-no-unit.md)
5. **`week`** (7) — `W14`, `W15`. ISO week, of which year.
   → [`D-007`](../debt/D-007-week-no-year.md)
6. **Canon registration** (§4.3) — register `C-NNN`, or withdraw the rule.
7. **`guilds/` as a series** — charters to `standards/`, rosters as generated
   apparatus.

One more field was named elsewhere in this document and now carries an
entry: `cancelled` → `D-016` (extinguished 2026-08-30, ADR-030), **which is
filed RESOLVED**: the 12 missions were converted to `frozen` with
`freeze_reason` on the Oracle's ruling. `debt/` is append-only, so a closed
entry with its trace stays rather than disappearing.

No definition is invented to close a table. A field whose meaning is not written
gets filled differently by each person who meets it — which is how
`type_execution` ended up with values in two languages.

---

## Version history

- **v5.2.0** (2026-09-02) — `evidence_script` → `scripts/telemetry.mjs` (`MIS-138` step 3: `count-evidence.py` retired after dict-equality at `6a97fbf`, golden kept in `scripts/test/fixtures/`). §0, §4.1, §8 table re-pointed; no figure re-typed — the dated census (§10, `7d17b5a`) and `evidence_head` stay as they were, they name the script that measured them.
- **v5.1.3** (2026-09-02) — the 2026-08-24 census table (`7d17b5a`) labelled as dated; §4.1 is the live figure. `MIS-135` row 17, #200.
- **v5.1.2** (2026-09-02) — §4.1 `missions/` 3/134 → 132/132 (missions/ normalisation, PR #198: every file renamed to `MIS-0NNN-<slug>.md`; `MIS-115a`/`MIS-115b` and the closure-guard proposal registered as `MIS-132`…`MIS-134`; `MIS-135` opened; `TEMPLATE*`/`ANNEX` counted as apparatus, hence the smaller denominator). Figure from `count-evidence.py` on the merge of #198 with `6cc7b40`. The 2026-09-02 v5.1.1 line above is #196's and stands.
- **v5.1.1** (2026-09-02) — §4.1 coverage column re-measured at `7f51235` by
  `count-evidence.py` after `MIS-125` Stage C (#181–#192) and `MIS-127` rows
  7–9 (#190–#195) landed: ten of eleven series at 100 %, `missions/` at 3/134,
  `reports/` at 24/24. The 2026-08-31 figures (seven rows stale, one of them
  `20/20` for a shelf that had become 9 files) stayed in the table for two days
  after they stopped being true. §4.1's self-description ("registered under
  the superseded `S-NNN` scheme … the rename is Stage C, not this section")
  was written by #181, the commit that did the rename; corrected in place with
  the history kept. No rule changes.
- **v5.1.0** (2026-09-01) — `ADR-005` v1.2.0, `reports/` normalisation. §4.1:
  the two `reports/` rows merge into one (the series is one folder, flat);
  coverage re-measured by `count-evidence.py` at 10/25 — the eight dailies
  count as compliant now that their shape is legal, and the denominator will
  shrink when the evidence annex leaves the series. §4.2 rewritten: the date form is for dailies
  only, audits are numbered — the section previously carried `ADR-004`'s
  reading while §4.1 carried `ADR-005` v1.1.0's, three screens apart. §5.3:
  the bulk-rename exclusion list names `reports/evidence/` instead of the
  narrower path that let `MIS-125` bug 6 through.
- **v4.0.0** (2026-08-25) — **`status: active`.** MIS-109 closed: canon no longer
  contradicts this document. The seminal series is `C-NNN`, `S-` is unambiguously
  `standards/`, and the four terms of ADR-023 coexist with distinct senses. Adds
  §3.1 (enumeration is apparatus, relation and judgement are record) and §10.0.1
  (a failure by omission produces a valid artefact that is smaller than it should
  be). The signature was this version's acceptance criterion, not a formality.
- **v3.3.0** (2026-08-25) — §2.1.2: **`live`**, the threshold for state rather
  than record. A memory asserts something about the present, so correcting it
  falsifies nothing — but it corrects an actor in motion, and the correction is
  recorded inside the memory so the agent can see it was corrected and by whom.
  Ruled while propagating `ADR-023` to two agents running the old model.
- **v3.3.0** (2026-08-25) — §5.3: **a rename propagates to pointers, never to
  records.** The border between correcting and falsifying, crossed twice by bulk
  edits: a script rewrote four dated reports so an April inventory claimed a
  filename that did not exist in April. A broken link inside a dated report is a
  photograph, not a defect.
- **v3.2.0** (2026-08-25) — §2.1.1: **git history is the fifth threshold and the
  only real one.** The four thresholds this section defines are social
  conventions written down; git's is imposed by the tool. Reframes the section:
  the archive's strongest guarantee is not the one it declares but the one it
  inherits — what is written can always change by agreement, who wrote it cannot.
  Developed in parallel with v3.1.0 from v3.0.0.
- **v3.1.0** (2026-08-25) — §5.2: **an agent that has committed never loses its
  name.** MIS-089 renamed Centinela-01 to Nimrod; 57 commits, including the ten
  seminal canon documents, are authored under the old name and git authorship
  cannot be rewritten. Git history is the only genuinely immutable threshold
  here — `canon/` is `sealed`, which a signature and an ADR can still change.
  See `D-027`.
- **v3.0.0** (2026-08-25) — §10.0 names **plausible artefacts** as a class after
  the fourth instance in two days: a date that looks like a chronology, a figure
  that looks like a measurement, a run that looks like verification, a guard that
  looks like coverage. §5.0 adds `registration: exempt` so a gap and a declared
  exception stop looking alike, and §5.0.1 the rule learned by reverting a rename:
  **a rename whose consumers cannot all be updated is not done.**
- **v2.9.0** (2026-08-25) — §6.2's backfill rule gains the evidence that proves
  it necessary: it existed in draft while its own author wrote ten documents
  with hand-invented dates, in a sequence that read as a coherent timeline and
  was not (`D-021`). `MIS-109` inherits the three-field rule as an acceptance
  criterion, so the 121 `T00:00:00Z` documents are not corrected into
  better-disguised fiction. Merged alongside v2.8.0, which was developed in
  parallel from v2.6.0.
- **v2.8.0** (2026-08-25) — §9.1: **citing an identifier versus mentioning one
  as data.** A document that inventories broken references trips the guard that
  detects them; ruled as a format convention rather than a per-document
  exemption, because an exemption is forgotten by the next report and a
  convention is inherited by it.
- **v2.6.0** (2026-08-25) — §10.1: **every measurement declares which `ROOT`
  and which `HEAD` it measured, and a zero is suspect until the instrument is
  shown to have pointed at the right place.** Ruled after the same fault
  occurred twice in one day — two scripts computing `ROOT` from their own
  location and returning zeros that looked like success, one of them while a
  merge decision was being taken on its output.
- **v2.5.0** (2026-08-25) — `agents/` takes **`AG-NNN`**, not `A-NNN`
  (`ADR-005`). `A-001`…`A-016` already exist as audit findings, cited across
  documents; the ruling was given believing the prefix clean and corrected by
  measurement. Cost of the change: zero, because no agent identifier had been
  issued — which is the argument, and the opposite of the `D-` case.
- **v2.4.0** (2026-08-25) — **the seven entries §11 promised now exist.** Until
  today this document closed by pointing at `D-002`…`D-007`, none of which had
  been written: the section listing what is unresolved was itself unresolved.
  `D-016` (`cancelled`) is filed **RESOLVED** with its trace, because `debt/` is
  append-only and a closed entry is worth more than one that never existed.
  §4.1 gains the measured answer to `MIS-109`'s open question: `S-002`…`S-010`
  are **not phantom citations** — 9 of 10 resolve to real canon files, and
  `STD-001` is taken twice. §4.1's `AUD-` example no longer points at a file from
  an unmerged branch. `human_approval_score` corrected from 14 to 16 documents.
- **v2.3.0** (2026-08-24) — §3 gains a step that was missing and cost a bad
  refactor: **verify the `type` before using the map to move anything.** Three
  documents in `operations/` declared `type: protocol` while being reference
  tables; moving them on that declaration would have propagated the error and
  given a duplicated, factually wrong document the standing of a live protocol.
  A mapping table is a filing instrument, not a judgement.
- **v2.2.0** (2026-08-24) — Oracle review, six findings. **The generator now
  exists** (`scripts/render-glossary.py`): the HTML was hand-written while
  claiming to be generated, and had already dropped §9 and renumbered the
  sections — the v1 violation with better wording. `D-011` moved to §1 as the
  first thing a reader meets, because the central idea of v2 has no mechanism
  behind it. The canon edit gets its own file
  (`AUD-2026-08-24-canon-edit`) and the finding is worse than the semantic
  argument suggested: the edit was partial and the canon now contradicts itself
  → `D-012`. `guilds/` restored to the series list with its review stated.
  `documentation` split into normative and explanatory, with the admission that
  a guard can never be strict for it or for `meta`. `AUD-` given a plan
  → `D-013`. Counter bias registered → `D-014`.
- **v2.1.0** (2026-08-24) — Oracle correction: **immutability withdrawn**. No
  document in the archive is immutable and the history proves it (14/14 canon
  documents edited; 9/33 `done` missions edited after closing). Replaced by
  **change thresholds** — `sealed` · `governed` · `closed` · `open` — in §2.1,
  which say how much agreement a change takes instead of pretending it cannot
  happen. Gap between declared and enforceable registered as **D-011**.
- **v2.0.0** (2026-08-24) — Oracle feedback on v1. Blocker 1 executed (12
  missions `cancelled` → `frozen`); blocker 2 resolved (prefixes `S-` `A-` `O-`
  `D-`, this document becomes `STD-001`); `[CI]`/`[MANUAL]` markers with real
  evidence of the pipeline; `type`↔folder relation written; series-change rule
  written; canon registration plan; all figures moved to
  `scripts/count-evidence.py`. **`[PENDING]` withdrawn** — a third marker was
  invented in draft and removed on Oracle correction: deciding a rule does not
  enforce it, so an unapplied rule is `[MANUAL]` with its gap measured and
  registered in `debt/`.
- v1.0.0 (2026-08-24) — Initial draft. Not signed.
