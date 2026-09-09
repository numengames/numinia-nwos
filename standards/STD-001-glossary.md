---
title: "Glossary — the archive's own vocabulary"
id: "STD-001"
uid: ""
type: documentation
subtype: register
status: active
version: "4.0.1"
created: "2026-08-24T16:00:00Z"
updated: "2026-09-09T11:30:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [glossary, vocabulary, frontmatter, archive, standards]
license: "CC0-1.0"
ratified_by: "ADR-027"
evidence_script: "scripts/telemetry.mjs"
---

# STD-001 — Glossary: the archive's own vocabulary

> **Summary:** What every series holds, what every frontmatter field means, and
> which values are valid.
> **Epistemic:** Resolves "where does this document go" and "what do I write in
> this field" without asking a person.
> **Pragmatic:** Consult before creating a document, filling frontmatter, or
> proposing a new field. A value not listed here is not valid.
> **Audience:** Agents · Oracles

---

## 1. Purpose and scope

This standard is the registration law of the archive: which series exist,
what each holds, how a document is identified, named, versioned and dated,
and what its header must carry. It binds every tracked document in the
governed tree. This file is the source; the published view is generated from
it.

No corpus figure is written here by hand. Figures come from
`scripts/telemetry.mjs` and are cited with their key and the `HEAD` they were
measured at.

Every rule carries one marker. `[CI]`: a machine verifies it on every push.
`[MANUAL]`: only a reader verifies it, and nothing stops a violation. A rule
decided but not yet checked is `[MANUAL]` and its gap has a `debt/` entry.

Three glossaries exist. This one rules the **archive** — series, fields,
values. `glossary.md` in `numinia-web` rules the **world**: guilds, ranks,
roles. `conceptual-glossary.md`, also in `numinia-web`, rules the project's
founding concepts.

---

## 2. The series (folders)

A series is a folder whose disappearance breaks a named function. Three
series form the **axis** and only the axis obliges: `canon/` says why,
`standards/` say what, `protocols/` say how. Everything else **registers** —
decisions, debt, missions, reports, blueprints — and a register cannot put a
reader in breach. An obligation written outside the axis is a plan until a
standard carries it (`AUT-063`). A rule inside the axis binds whether or not a
guard checks it.

### 2.0 Nothing here is immutable

No document in this archive is immutable. Git makes every file editable by
anyone with push, and history shows canon and `done` missions edited after the
fact. What distinguishes documents is the threshold below.

### 2.1 Change thresholds `[MANUAL]`

| Threshold | What it takes | Series |
|---|---|---|
| **`sealed`** | Oracle's signature + an ADR recording the reason | `canon/` |
| **`governed`** | An ADR, or a PR the Oracle approves | `standards/` · `protocols/` · `decisions/` |
| **`closed`** | Substance is not reopened. Form — translation, formatting, metadata — may be corrected and the commit says so | `done` `missions/` · `reports/` |
| **`live`** | Corrected when it contradicts canon or a signed decision; the correction is recorded inside the document, naming who and against which decision | `agents/*/MEMORY.md` · `operations/OPS-008-session-state.md` |
| **`open`** | Normal PR | everything else |

"Closed" protects substance, not bytes: the test is whether a reader in a year
would be misled about what happened. `live` exists because a memory asserts
the present, not the past, and an agent must be able to see that it was
corrected.

Nothing in CI checks who signed what; to git a `sealed` file and an `open` one
are the same object (`D-011`). Until a ruleset, commit signing and CODEOWNERS
exist, the thresholds are a reading convention.

### 2.1.1 Git history is the only enforced threshold

The four thresholds above are agreements. Git history is enforced by the tool:
rewriting it breaks every hash, tag and reference downstream, which makes it
immutable in practice. What a document *says* can be changed by agreement;
*who wrote it and when* cannot. When the two disagree, history is the record
and the document is the claim. Two consequences: an agent's name is identity
once it has committed (the rule on renaming, below), and a date derived from a
commit is evidence while a typed one is a claim.

### 2.2 What each series holds

| Series | Holds | Threshold |
|---|---|---|
| `canon/` | what the system **is**: foundational, not operating policy | `sealed` |
| `standards/` | what an **artifact** must comply with; deviating needs an ADR | `governed` |
| `protocols/` | what an **actor** executes in a repeated situation | `governed` |
| `decisions/` | why something was chosen; superseded by the next, deleted when nothing living cites it (`ADR-041`) | `governed` |
| `agents/` | who acts: `SOUL` · `OPERATOR` · `STATUS` · `MEMORY` per agent | `live` (memory) |
| `missions/` | the work; state lives in `status:`, never in the path | `closed` when `done` |
| `reports/` | what was observed on a date; corrected in place with a dated note and a version bump; `reports/evidence/` is not edited | `closed` |
| `blueprints/` | what could be; not a report of what happened | `open` |
| `operations/` | what sustains the business: legal, strategy | `open` |
| `debt/` | what is known to be missing; a resolved entry is deleted once nothing living cites it (`ADR-041`) | `open` |
| `guilds/` | how actors group; under review — `guild:` already works as a field | `governed` |

The `standards` ⟷ `protocols` boundary is the mechanism, not the topic: a
standard is complied with, a protocol is executed.

**Absorption.** A record may leave its folder by being carried into another:
the reasoning survives in the absorbing document, every citation is rewritten
in the same change, every public URL redirects, and the absorber declares
`absorbs: [...]` so `check-references.mjs` keeps the identifier resolving.

### 2.3 Series → template map

Every registered series has a copy-from mould in `templates/`: `MIS`, `STD`,
`PRO`, `ADR`, `DBT`, `RPT`, `OPS`, `CAN`, `BLU`, `SYS`, `INF`, `GLD`, each as
`templates/<PREFIX>-TEMPLATE.md`. New documents are copied from the mould,
never from archaeology. `node scripts/check-templates.mjs` verifies each mould
against its series' contract and fails when a registered series has none. The
agent scaffold is `agents/_template/`. `templates/` is apparatus: never a
member of a series, never published, CC0-1.0.

---

## 3. Series, `type` and the relation between them

The folder is the **filing decision**; `type:` is the **declared genre**. They
are independent declarations that must agree. When they contradict, the `type`
wins as description and the folder as location: the fix is to **move the
file**, never to rewrite `type:` to fit. Moving series needs a new identifier
(the section on renaming, below). Before moving on the strength of a `type`,
verify it against the document: a wrong `type` is a genre ruling and needs an
ADR.

| `type` | Series | Guard can be strict? |
|---|---|---|
| `seminal` | `canon/` | yes |
| `documentation` **normative** | `standards/` | no |
| `documentation` **explanatory** | the series it explains | no |
| `protocol` | `protocols/` | yes |
| `mission` | `missions/` | yes |
| `adr` | `decisions/` | yes |
| `blueprint` | `blueprints/` | yes |
| `report` | `reports/` | yes |
| `legal` | `operations/legal/` | yes |
| `charter` | `guilds/` (under review) | yes |
| `meta` | anywhere — apparatus accompanies its series | no |

`meta` marks **apparatus**: derived, rebuildable from the records. A record
holds an assertion nobody else makes; apparatus enumerates. An out-of-date
index is a bug; an out-of-date record is history. A document that does both
says which part is which, or is split.

---

## 4. Registration: the identifier

An identifier is **opaque and permanent**: it encodes nothing that can change,
because the references that name it are plain text nobody can rewrite
(`ADR-004`). It never changes (`IDN-011`) and is never reused (`IDN-014`).

### 4.1 Prefix per series `[MANUAL]`

| Prefix | Series |
|---|---|
| `MIS-NNNN` | `missions/` |
| `ADR-NNN` · `DEC-NNN` | `decisions/` |
| `PRO-NNN` | `protocols/` |
| `RPT-NNN` (subtype `audit` · `analysis` · `proposal`) · `RPT-YYYY-MM-DD` (subtype `daily` only) | `reports/` |
| `BLU-NNN` | `blueprints/` |
| `CAN-NNN` | `canon/` |
| `STD-NNN` | `standards/` |
| `OPS-NNN` | `operations/` |
| `DBT-NNN` | `debt/` |
| `GLD-NNN` | `guilds/` |
| `INF-NNN` | `infra/` |

Coverage is measured by `scripts/telemetry.mjs` (`series.registration`), never
copied here. Nothing is ever renumbered: documents that cite the earlier
scheme (`P-NNN`, `S-NNN`, `D-NNN`, `C-NNN`, `O-NNN`, `AUD-YYYY-MM-DD`,
`AG-NNN`) keep those citations as a promise about the past.

### 4.2 Time-based prefixes

A daily report carries a date because it **is** its date. The date form is
legal for `type: report` + `subtype: daily` only, inside `reports/`. Audits do
not carry a date: an audit is its subject on a date, which number plus
`created` already record.

### 4.4 Cross-repository citation `[MANUAL]`

Across the repository boundary: `nwos:ADR-006` · `web:ADR-006`. Inside the
repo, the bare identifier is correct.

---

## 5. Renaming, moving, and not being registered

### 5.0 `registration: exempt` `[MANUAL]`

A gap and a declared exception must not look alike.

```yaml
registration: exempt
registration_reason: "apparatus of PRO-008; belongs to its parent, not to the series"
```

Both fields or neither. The reason names what makes registration *wrong*, not
inconvenient. Two shapes are legitimate: **apparatus of a registered
document**, and **a rename whose consumers cannot all be updated**. A third —
"frozen artifact, a dated filename" — was struck out by Oracle ruling on
2026-09-03: a filename is not a state, and `frozen` already names a mission
state. Counters read `exempt` as out of the denominator, not as a miss.

### 5.1 Changing series

1. New identifier in the destination series.
2. The old identifier declares `superseded_by` pointing at the new one.
3. Neither is renumbered; the old number is never freed.
4. Verified with `scripts/check-references.mjs` before merge.

Before any rename, enumerate the consumers. If one cannot be updated in the
same change, the rename does not happen; the outcome is `registration: exempt`
with that reason.

### 5.2 An agent that has committed never loses its name `[MANUAL]`

When an agent is renamed, the new name is **added**. The old one stays in its
record with the dates it was in use and the git author string it committed
under, and `agents/INDEX.md` carries it too, because a reader starts from
`git log`. Applies to people as well as agents.

```yaml
historical_identities:
  - name: "Centinela-01"
    git_author: "Centinela-01 <khepri@ai.numengames.com>"
    in_use: "2026-04-06 → 2026-08-17"
```

### 5.3 A rename propagates to pointers, never to records `[MANUAL]`

Update the documents that **point at** a renamed file (*"see `canon/X.md`"*).
Leave the documents that **record what it was called** (*"on 2026-04-02 the
canon held `X.md`"*). A broken link inside a dated report is a photograph of a
corpus that no longer exists and belongs in the reference lint's baseline.
Before a bulk rename, exclude `reports/`, `CHANGELOG`, `debt/` entries that
quote past states and `reports/evidence/`, then read the diff of what remains.

---

## 6. Frontmatter fields

`STD-004` owns the field rules, ring by ring, with a check identifier for
each. This section defines only what fields *mean* where the meaning is
vocabulary rather than shape.

### 6.2 Reserved: `uid`

Declared and left empty, by Oracle decision. Nobody fills it by hand: the
legacy values had the shape of UUIDv7 and not its provenance, and two
collided. When the UID system exists — generation, CI verification, a
consumer — one operation populates the corpus.

### 6.3 Absence is declared, not omitted

| Form | Meaning | Example |
|---|---|---|
| field omitted | does not apply to this **type** | a `report` has no `completed` |
| `null` | applies, **empty for this document** | `assigned_to: null` |
| `"TBA"` | applies, value **exists but is not decided** | `territory: "TBA"` |

`"TBA"` is not a parking space: the guard counts every one by field, and the
document that writes one names the mission that will resolve it. The
distinction is Codd's (*RM/V2*, 1990): missing-but-applicable is not
missing-and-inapplicable.

---

## 7. Controlled vocabularies `[MANUAL]`

A value not listed here is not valid. Adding one requires an ADR.

**`type`** — `mission` · `adr` · `protocol` · `blueprint` · `report` ·
`seminal` · `legal` · `charter` · `documentation` · `meta`.
Withdrawn: `audit` → `report` + `subtype: audit` · `decision` → `adr` ·
`roster` → `meta`.

**`status` — missions**

| Value | Meaning | Stamp |
|---|---|---|
| `todo` | Accepted, not started | — |
| `in-progress` | Being executed now | `started` |
| `in-review` | Executed, awaiting the Oracle | `in_review_at` |
| `done` | Closed with documented evidence; `closed` | `completed` |
| `frozen` | Deliberately paused; returns to any state | `freeze_reason` |

Withdrawn: `backlog` · `draft` → `todo` · `active` · `queue` · `blocked` ·
`freeze` · `cancelled`. `blocked_reason` is retired; `HDR-031` guards it.

**`guild`** — `Sentinels` · `Alchemists` · `Exegetes` · `Procurators`.
**`territory`** — `CAO` · `Product` · `Platform` · `Infrastructure` ·
`Content` · `Sales` · `Funding` · `Archive`.
**`priority`** — `critical` · `high` · `medium` · `low`.
**`effort`** — `XS` · `S` · `M` · `L` · `XL`, relative sizing.
**`type_execution`** — `digital` · `biological` · `hybrid`.
**`provenance`** — `human` · `ai-assisted` · `ai-generated`.

---

## 8. `created` / `updated`: dates come from git

Report which commit each date comes from and mark inferred ones.

```yaml
created: "2026-04-07T19:43:00Z"
created_source: "git:9f51ad1"
created_confidence: exact | inferred   # inferred = the trail crossed a rename
```

A document whose trail cannot be reconstructed keeps its value and is marked
`inferred`. Never a date invented to fill the field: a wrong date that looks
like a timeline is not caught by a future reader. `git log --diff-filter=A`
returns the rename date unless `--follow` is used, and `--follow` can lose the
trail when a file is renamed and heavily edited in one commit.

---

## 9. Naming `[MANUAL]`

Series documents: `<ID>-<slug-in-english-kebab-case>.md`. Root documents:
`UPPERCASE.md`. A filename carries no version and no state (`IDN-013`,
`IDN-012`); dated legacy names reserve nothing.

**Citing vs mentioning as data.** A bare identifier in prose is a citation and
must resolve. An identifier inside a code span, in a table cell, list item or
fenced block, is data and is not checked. A report about broken citations is
full of broken citations; the convention lets it say so without an ignore list.

---

## 10. Reproducible evidence

An artefact with the shape of evidence that is not evidence — a hand-typed
timeline, a count of the wrong unit, a green run with the guard missing — is
caught by a reader finding it implausible, never by the layer that produced
it. Omission is the worst case: a valid artefact smaller than it should be
looks exactly like a smaller truth. The rules below are what the corpus does
about it.

**Every measurement declares where and what it measured** `[MANUAL]`: which
`ROOT`, which `HEAD`, and the unit. `18` is not a measurement; `18 entries`
is. A result of zero is suspect until the instrument is shown to be pointing at
the right place.

**A guard is verified by its step, never by the run** `[MANUAL]`: read the step
in the job (`gh run view <RUN_ID> --log | grep -A3 '<step name>'`). A green run
and a workflow missing the guard are indistinguishable from the conclusion.

**A guard that validates what is present cannot detect what is missing.**
Detecting omission needs an independent enumeration of what should be there.

### 10.4 Every guard declares what it is blind to

Each guard prints, on success as well as failure, what it did not look at. The
declarations live in `scripts/blind-spots.json`, are printed by
`scripts/lib/blindness.mjs` and verified by `scripts/test/blindness.test.mjs`,
which builds a file that should trip each guard and asserts it stays green.
The suite fails when a declaration stops being true, so a fixed blindness is
recorded rather than absorbed. It cannot enumerate the blind spots nobody has
imagined.

### 10.5 A corpus figure is produced once and cited everywhere else `[MANUAL]`

The only document that *states* corpus figures is `telemetry/latest.md`,
rendered from `telemetry/latest.json`. Every other document *cites*: key and
`HEAD`, inline (`` `key = <value> @ <head>` ``) or once per block. A figure
with neither is a claim without evidence. Records keep their figures with
their date; the rule is not retroactive. In a mission, context cites
`key = value @ head`, acceptance criteria name a key and a target, closures
cite the `history.jsonl` line. `figures.live` and `figures.stale_citations`
measure compliance; neither is wired to CI.

---

## 11. Conformance

Every rule carries `[CI]` or `[MANUAL]`. The `[CI]` rules are executed by
`lint-frontmatter.mjs`, `lint-naming.mjs` and `check-references.mjs` on every
push, strict on the delta and baselined on the stock. The `[MANUAL]` rules are
executed by whoever reads; `debt/` carries the gap for each one that has a
plausible guard. The change thresholds have no mechanism (`D-011`) and are
counted as a reading convention, not as enforced.

## 12. What this standard does NOT do

It does not define the vocabulary of the project, despite its filename; it is
registration law with three definitions in it (`DBT-022`). It does not govern
content: what a canon may assert or a standard oblige is elsewhere. It does
not rule on series it does not list; an unlisted folder is unregistered, and
is fixed by adding it here.

## 13. References

| ID | Title | Relation |
|---|---|---|
| `STD-004` | The header in three rings | the field-by-field contract; this standard names the fields, that one checks them |
| `STD-009` | Core rules | the one-line form of the thresholds and the rule that history outranks the document |
| `STD-007` | One page per document | the shape this standard is cut toward |
| `DBT-016` | Section numbers are load-bearing | why this standard keeps its section numbers when it is cut |
| `DBT-022` | The glossary that is not a glossary | the split this standard still owes |
