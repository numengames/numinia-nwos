---
title: "Glossary — the archive's own vocabulary"
id: "STD-001"
uid: ""
type: documentation
subtype: standard
status: active
version: "6.0.0"
created: "2026-08-24T16:00:00Z"
updated: "2026-09-04T00:30:00Z"
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

## 0. How to read this document

**This file is the source.** The published view at
`/corpus/standards/s-001-glossary` is generated from it and cannot state
anything this file does not say.

**No figure is written here by hand.** Corpus figures are produced by
`scripts/telemetry.mjs` and cited with the key and the `HEAD` they were measured
at. A figure that cannot be reproduced is not evidence.

```bash
node scripts/telemetry.mjs                            # write telemetry/
node scripts/telemetry.mjs --key series.registration  # one figure with its predicate
```

**Enforcement markers.** Every rule below carries one:

| Marker | Meaning |
|---|---|
| `[CI]` | A machine verifies it on every push |
| `[MANUAL]` | Only a human or an agent verifies it. **Nothing stops a violation** |

There is no third marker. Deciding a rule does not enforce it: a rule decided
but not yet applied is `[MANUAL]`, and the gap carries a `debt/` entry.

**Three glossaries exist and must not be confused.** This one rules the
**archive** — series, fields, values. `glossary.md` in `numinia-web` rules the
**world**: the names of guilds, ranks and roles. `conceptual-glossary.md`, also
in `numinia-web`, rules the **project's** founding concepts.

### What this document cannot enforce

**The change thresholds in §2.1 — the central idea of this document — have no
mechanism behind them.** To git, a `sealed` canon document and a scratch file
are the same object with the same permissions. A change to `canon/` needs
exactly what a typo fix needs: a push.

Closing that gap needs a ruleset on `main`, commit signing, and a CODEOWNERS
entry for `canon/`, all three requiring repository admin. Registered as `D-011`.
Until it closes, §2.1 is a reading convention, not governance.

That is not a reason to discard the thresholds. It is the reason they are
written down: a gap you can name is a gap you can close.

---

## 2. The series (folders)

The test that keeps a series honest: **what function stops working if this
folder disappears?** If the answer is a name, it is a series. If it is "several
things", it is a drawer.

### 2.0 Nothing here is immutable

No document in this archive is immutable, and any rule that says otherwise is
false. Git makes every file editable by anyone with push, and the history shows
it happening — canon documents have been edited, and `done` missions have been
edited after closing.

**Those edits were not wrong.** What was wrong was the word: the archive claimed
an immutability it never had and never enforced.

### 2.1 Change thresholds instead

What actually distinguishes these documents is **how much agreement it takes to
change them**, and **what must be left behind when they do**. That is a
threshold, not a property of the file.

| Threshold | What it takes | Series |
|---|---|---|
| **`sealed`** | Oracle's signature + an ADR recording the reason. The previous version stays reachable and cited | `canon/` |
| **`governed`** | An ADR, or a PR the Oracle approves | `standards/` · `protocols/` · `decisions/` |
| **`closed`** | Substance is not reopened: a `done` mission or a published report keeps its claims. Form — translation, formatting, metadata — may be corrected, and the commit must say so | closed `missions/` · `reports/` |
| **`open`** | Normal PR | everything else |

**"Closed" is about substance, not bytes.** Translating a `done` mission does not
falsify it. Rewriting what that mission claimed to have achieved would. The
line is: *would a reader in a year be misled about what happened?*

**This is `[MANUAL]`, and it is the weakest rule in the document.** Nothing in
CI checks who signed what. A `sealed` document and an `open` one are the same
file to git (`D-011`).

### 2.1.1 The fifth threshold, and the only real one

**Git history is immutable, and it is the only threshold here the tool enforces
rather than the organisation.**

| | Enforced by | Can be changed |
|---|---|---|
| `sealed` · `governed` · `closed` · `open` | agreement | **yes** — a signature and an ADR |
| **git history** | the tool | **no**, at any price worth paying |

The four thresholds above are social conventions written down. Rewriting history
means new hashes for every affected commit, an invalidated signed tag, and every
existing reference broken. **The cure destroys more provenance than the
disease**, which makes it immutable in practice.

**The archive's strongest guarantee is not the one it declares — it is the one
it inherits.** What is *written* in a document can always be changed by
agreement; **who wrote it, and when, cannot.**

Two consequences met already: an agent's name is identity, not an attribute —
see the rule on agent renaming below; and a date derived from a commit is
evidence, while a typed one is a claim.

> Everything this glossary governs is mutable by agreement. The history under it
> is not. **When the two disagree, the history is the record and the document is
> the claim.**

### 2.1.2 `live` — the threshold for state, not record

**A fifth series-level threshold, for documents that assert something about the
present rather than about the past.**

| Threshold | What it takes | Series |
|---|---|---|
| **`live`** | Corrected when it contradicts canon or a signed decision. **The correction is recorded inside the document itself**, naming who corrected it and against which decision | `agents/*/MEMORY.md` · `operations/OPS-008-session-state.md` |

**Why it is not `closed`.** `closed` protects a claim about the past. A memory
makes no claim about the past — it says *this is how things are*. Rewriting it
cannot mislead a future reader about what happened, because it never testified
about what happened.

**Why it is not `open`.** A memory is written by its own agent, and correcting
it from outside is overriding an actor's understanding while it is acting.

```yaml
# agents/nimrod/MEMORY.md
corrections:
  - date: "2026-08-25"
    by: "oracle"
    decision: "ADR-023"
    what: "The triad's first level was mislabelled. The level is the germinal motive."
```

**A corrected agent must be able to see that it was corrected**, by whom, and
against which decision. A memory silently rewritten from outside produces an
actor that has changed its mind without knowing it did — indistinguishable, from
the inside, from having always thought so.

Consequences: a vocabulary decision is not complete when the ADR merges, but
when the memories carrying the old vocabulary are corrected, or when it is
written down that they need not be. And a memory that contradicts canon is a
defect with a severity, not a stale file — the agent is executing the old model
right now.

### 2.2 What each series holds

**`canon/` — what the system *is* · `sealed`.** Defines what Numinia and Numen
Games are and which principles govern them. **IS** foundational · **IS NOT**
immutable, and **IS NOT** operating policy — a licensing regime must be able to
change, and that disqualifies it as canon.

**`standards/` — what an artifact must *comply with*.** Which convention applies
to a thing. Deviating requires an ADR. **IS** a versioned norm whose subject is
an **artifact** · **IS NOT** a descriptive glossary or a proposal.

**`protocols/` — what an actor *executes*.** Removes the ambiguity of "what do I
do now" in repeated situations. **IS** an ordered sequence whose subject is an
**actor** · **IS NOT** a rule an artifact satisfies.

> **The `standards` ⟷ `protocols` boundary is the mechanism, not the topic.** A
> standard is *complied with*; a protocol is *executed*.

**`agents/` — *who* acts.** One folder per agent: `SOUL` · `OPERATOR` ·
`STATUS` · `MEMORY`.

**`missions/` — the *work*.** Flat folder. **State lives in `status:`, never in
the path.** A `done` mission is `closed`.

**`decisions/` — *why* something was chosen · `governed`.** Append-only: a
decision is superseded, never deleted.

**Absorption** is the second way a record leaves the folder. Where superseding
replaces reasoning, absorption carries it into another record — the file goes,
the reasoning and the identifier do not. Permitted only when all three hold: the
reasoning survives in the absorbing document, every citation is rewritten in the
same change, and every public URL redirects to the absorbing record. The
absorbing document declares `absorbs: [...]`, which `check-references.mjs` reads
so the absorbed identifiers keep resolving. **Reachability is what this clause
protects; the file is one way to serve it, not the only one.**

**`blueprints/` — what *could* be.** A design not yet executed · **IS NOT** a
report of what happened.

**`reports/` — what was *observed* · `closed`.** What was true on a date, signed
by whoever observed it. Once published its claims are not rewritten — a
correction is a new report that supersedes it.

**`operations/` — what *sustains* the business.** Legal, strategy: the
connective tissue between system and world.

**`debt/` — what we know is *missing* `[MANUAL]`.** Explicit, numbered
uncertainty beats false completeness. Append-only: an entry is marked RESOLVED,
never deleted.

**`guilds/` — how actors *group* · `governed`.** Under review: `guild:` already
works as a frontmatter field, which makes the `roster` files apparatus — a
regenerable view of a field that already exists on every agent — and the
`charter` files norm, which belongs in `standards/`. The folder stays until an
ADR decides.

### 2.3 Series → template map (MIS-145)

Each registered series has a copy-from template in `templates/`. When creating
a new document of any series, copy the corresponding template — never start
from archaeology.

| Series | Template | Notes |
|---|---|---|
| Missions | `templates/MIS-TEMPLATE` | The ten build-verified fields + Scope / Acceptance criteria / Closure |
| Standards | `templates/STD-TEMPLATE.md` | Five required sections (STD-004 §10) |
| Protocols | `templates/PRO-TEMPLATE` | What an actor executes in a repeated situation |
| Decisions | `templates/ADR-TEMPLATE` | Why something was chosen over the alternatives |
| Debt | `templates/DBT-TEMPLATE` | What is known to be missing or wrong |
| Reports | `templates/RPT-TEMPLATE` | What was observed, signed, and dated |
| Operations | `templates/OPS-TEMPLATE` | What sustains the business |
| Canon | `templates/CAN-TEMPLATE` | What the system IS |
| Blueprints | `templates/BLU-TEMPLATE` | What could be, and the gap it attacks |
| System | `templates/SYS-TEMPLATE` | How the system works today |
| Guilds | `templates/GLD-TEMPLATE` | Guild charter — identity and operational profile |

The agent scaffold lives in `agents/_template/` (a directory scaffold, not a
single document; `agents/` is outside the filename scheme per ADR-005 v1.1.0).
Copy it when creating a new agent.

`templates/` is apparatus (MIS-142): scaffolding a document is copied from,
never a member of any series and never published. Licence regime: CC0-1.0
(REUSE.toml).

---

## 3. Series, `type` and the relation between them

**A `type` does not derive from the folder, and a folder does not derive from
the `type`.** They are two independent declarations that must agree.

| | |
|---|---|
| **The folder** | is the **filing decision**: where a human or an agent goes to look |
| **`type:`** | is the **declared genre**: which rules apply to the document |

### 3.0 When they contradict each other `[MANUAL]`

**The `type` wins as a description; the folder wins as a location.**

1. A `type` inconsistent with its folder is a **filing error**, not a genre error
2. It is resolved by **moving the file**, never by rewriting `type:` to fit
3. Moving series requires a new identifier — see §5

Changing `type` to match the folder falsifies the document. Moving the document
corrects the filing.

**Canonical map** — a `type` not in this table has no valid home:

| `type` | Series | Guard can be strict? |
|---|---|---|
| `seminal` | `canon/` | yes |
| `documentation` **normative** | `standards/` | **no** |
| `documentation` **explanatory** | the series it explains | **no** |
| `protocol` | `protocols/` | yes |
| `mission` | `missions/` | yes |
| `adr` | `decisions/` | yes |
| `blueprint` | `blueprints/` | yes |
| `report` | `reports/` | yes |
| `legal` | `operations/legal/` | yes |
| `charter` | `guilds/` (under review) | yes |
| `meta` | anywhere | **no** — apparatus accompanies its series |

**Two types a guard can never check strictly.** `documentation` does two jobs
under one name, and only whether the document obliges anything tells them apart
— which is a reading, not a field. `meta` is apparatus: an `INDEX.md` lives
beside the series it indexes. **A guard can be strict for 8 of the 11 types**;
for the other two it can warn, and a warning is not a gate and must not be sold
as one.

### 3.1 Verify the `type` before using this map to move anything

**A `type` can be wrong.** Documents have declared `type: protocol` while being
reference tables nobody executes. Moving them on the strength of that
declaration would propagate the error and give a stale document the standing of
a live procedure.

1. **Verify the `type` against the document.** Does it match the series
   definition in §2 — an actor executing a sequence, an artifact complying with
   a rule, evidence of an observation?
2. If the `type` is wrong, **that is a genre ruling** and it needs an ADR. It is
   not a frontmatter edit inside a refactor.
3. Only once the `type` is known to be right does this map apply.

**A mapping table is a filing instrument, not a judgement.** It cannot tell you
whether a document is what it says it is.

> **`meta` marks apparatus.** A *record* has probative value; *apparatus* is the
> instrument for finding it and is **derived** — rebuildable from the records.
> **If it can be regenerated from the others, it is apparatus.** An out-of-date
> index is a bug; an out-of-date record is history.

### 3.2 One document, both natures `[MANUAL]`

**The part that enumerates is apparatus. The part that relates and judges is
record.**

An `INDEX.md` is both at once, which is why nobody could see where it belonged.
An index whose every column comes from the frontmatter of the documents it lists
is apparatus, and maintaining it by hand is a source of omission rather than of
information. An index that also carries `summarizes`, `grounds`, a score, or the
reason for a decision holds assertions *about* the corpus that no document makes
about itself — generating it would destroy them.

> The test: **if deleting it loses nothing that cannot be rebuilt from the
> files, it enumerates. If deleting it loses an assertion nobody else makes, it
> records.**

A document holding both should say which part is which, or be split.

---

## 4. Registration: the identifier

An identifier connects a document to the textual references that name it —
almost always in plain text, without a link. Hence: **opaque and permanent.** It
encodes nothing that can change, is never reused, is never renumbered
(`ADR-004`).

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

Coverage per series is measured by `scripts/telemetry.mjs`
(`series.registration`), which excludes apparatus by rule. **It is not copied
into this document**: a figure written here would age silently, and the
instrument is one command away.

**Nothing is ever renumbered.** The prefixes above superseded an earlier scheme
(`P-NNN`, `S-NNN`, `D-NNN`, `C-NNN`, `O-NNN`, `AUD-YYYY-MM-DD`, `AG-NNN`);
documents written before the change still cite the old numbers, and those
citations are a promise about the past.

### 4.2 Time-based prefixes

A **daily report** carries a date because it **is** its date: the date is
identity, not a mutable attribute. This is the only exception and it is one by
nature, not convenience. The date form is legal for `type: report` + `subtype:
daily` **only**, and only inside `reports/`.

**Audits do not carry a date.** An audit is its *subject* on a date, which is
what the number plus `created` already record.

### 4.4 Cross-repository citation `[MANUAL]`

`ADR-006` exists here and in `numinia-web` with different meanings. Across the
boundary: `nwos:ADR-006` · `web:ADR-006`. Inside the repo, the bare identifier
remains correct.

---

## 5. Renaming, moving, and not being registered

### 5.0 `registration: exempt` `[MANUAL]`

**A gap and a declared exception must not look alike.** A document without an
identifier is otherwise indistinguishable from one that will never have one, and
coverage figures read worse than the archive actually is.

```yaml
registration: exempt
registration_reason: "apparatus of PRO-008; belongs to its parent, not to the series"
```

**Both fields or neither.** `exempt` without a reason is a gap with better
manners. The reason must name what makes registration *wrong* — not that it is
inconvenient. Two legitimate shapes exist: **apparatus of a registered
document**, and **a rename whose consumers cannot all be updated** (§5.0.1).

**A filename is not a state.** A third shape — "frozen artifact, a dated
filename" — was struck out by Oracle ruling on 2026-09-03. It was never a state
anywhere else either: ISO puts the stage in a code, the IETF in a `Category:`
header, the W3C in a status section, and `RFC 2026` keeps the name `rfc2026.txt`
whether it binds or is Historic. The shape also contradicted this document,
which defines `frozen` as a *mission* state — deliberately paused, returning to
any state — while the filename convention used the same word for the opposite
thing: permanently fixed. **One token, two opposite meanings**, which is the
defect this glossary exists to prevent.

Counters read `registration: exempt` as **out of the denominator**, not as a
miss. A series at `8/8 · 2 exempt` is fully registered; `8/10` is not, and the
difference is a decision somebody made rather than work somebody skipped.

### 5.0.1 A rename whose consumers cannot all be updated is not done `[MANUAL]`

**Rule.** Before renaming, enumerate the consumers. If even one cannot be updated
in the same change, the rename does not happen.

A consumer outside the agent's reach makes the rename **structurally
incomplete**, not merely expensive. The correct outcome is `registration: exempt`
with that reason written down.

This is narrower than `ADR-004`'s *never renumber*: it governs renames that are
not renumbering, where the cost sits in the citation graph rather than in the
identifier.

### 5.1 Changing series

When a document moves from one series to another:

1. **New identifier in the destination series.**
2. **The old identifier declares `superseded_by`** pointing at the new one.
3. **Neither is renumbered, and the old number is never freed.**
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
> breaks plain-text references silently — the way this corpus breaks worst.

### 5.2 An agent that has committed never loses its name `[MANUAL]`

**Rule.** When an agent is renamed, the new name is **added**. The old one stays
declared in its record as a historical identity, with the dates it was in use
and the git author string it committed under.

```yaml
# agents/nimrod/SOUL.md
name: "Nimrod"
historical_identities:
  - name: "Centinela-01"
    git_author: "Centinela-01 <khepri@ai.numengames.com>"
    in_use: "2026-04-06 → 2026-08-17"
    commits: 57
```

**Why this is a rule and not housekeeping.** Git authorship cannot be rewritten
(§2.1.1). So an agent's name is not a mutable attribute once it has acted: it is
identity in the sense of `ADR-004` — opaque, permanent, never reused.

**The reverse lookup is what must work.** A reader starts from `git log` with a
name and an email, not from the agent's folder. Declaring the alias inside
`agents/<current-name>/` is necessary and not sufficient: `agents/INDEX.md` must
carry historical identities too.

**Applies to people as well as agents:** a contributor with two accounts keeps
both listed, and retired identities stay resolvable.

### 5.3 A rename propagates to pointers, never to records `[MANUAL]`

**Rule.** When a file is renamed, update the documents that **point at** it.
Never the documents that **record what it was called**.

> This is the border between correcting and falsifying, and a bulk edit has
> crossed it twice.

| The document says | It is | On rename |
|---|---|---|
| *"see `canon/X.md`"* | a **pointer** — it wants the reader to reach a file | **update it** |
| *"on 2026-04-02 the canon held `X.md`"* | a **record** — it testifies about a moment | **leave it** |

Rewriting a dated report's inventory table makes an April report say a file was
called something it was not called in April. `closed` documents have protection
of *substance*, and in an inventory table **"which files existed on this date"
is the substance**.

**A broken link inside a dated report is not a defect.** It is a photograph of a
corpus that no longer exists, and the reference lint counts such links among its
known-broken baseline — which is exactly where a historical reference belongs.

**Practical consequence for any bulk rename:** exclude `reports/`, `CHANGELOG`,
`debt/` entries that quote past states, and everything under `reports/evidence/`
before running the substitution, then read the diff of what remains. The
mechanical part is the exclusion list; the judgement is deciding whether each
remaining hit points or records.

---

## 6. Frontmatter fields

**The header standard `STD-004` owns the field rules**, ring by ring, with a
check identifier for each. This section defines only what the fields *mean*
where the meaning is vocabulary rather than shape.

### 6.2 Reserved: `uid`

**The field is declared and left empty.** Oracle decision, non-negotiable.

The legacy values that carried it had the shape of UUIDv7 and not its
provenance: hand-authored, with the document number in the final block and an
identical timestamp across most of them. Two collided — not by chance, but
because two people picked the same number.

**Rule:** nobody fills `uid` by hand. That is how the false ones were born. When
the UID system exists — automatic generation, CI verification, a real consumer —
one operation will populate the corpus.

### 6.3 Absence is declared, not omitted

A field that is not filled in carries information, and that information has
three distinct forms. Writing the wrong one is a lie about the shape of the gap.

| Form | Meaning | When to use |
|---|---|---|
| field omitted | the field does not apply to this **type** of document | a `report` has no `completed`: reports do not complete |
| `null` | the field applies but is **empty for this document** | `assigned_to: null` — the mission exists, nobody holds it |
| `"TBA"` | the field applies, the value **exists but is not yet decided** | `territory: "TBA"` — the document belongs somewhere; the vocabulary is not settled |

**`"TBA"` is not a parking space.** Every one is counted by the guard on every
run and reported by field, and the document that writes one **names the mission
that will resolve it**. A `"TBA"` with no owner is a violation the day it is
written — debt that is visible is still debt.

The distinction is Codd's, from *RM/V2* (1990): a value missing-but-applicable
is not the same as a value missing-and-inapplicable, and SQL's mistake was
spending a single `NULL` on both.

---

## 7. Controlled vocabularies `[MANUAL]`

A value not listed here is not valid. Adding one requires an ADR.

**`type`** — `mission` · `adr` · `protocol` · `blueprint` · `report` ·
`seminal` · `legal` · `charter` · `documentation` · `meta`.
Withdrawn: `audit` → `report` + `subtype: audit` · `decision` → `adr` ·
`roster` → `meta`.

**`status` — missions**

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

Withdrawn: `backlog` · `draft` → `todo` · `active` · `queue` · `blocked` ·
`freeze` · `cancelled`. `blocked_reason` was orphaned by the removal of
`blocked` and is retired; `H-31` guards it against regression.

**`guild`** — `Sentinels` · `Alchemists` · `Exegetes` · `Procurators`. English,
plural.

**`territory`** — `CAO` · `Product` · `Platform` · `Infrastructure` ·
`Content` · `Sales` · `Funding` · `Archive`. Replaces `area`, which in archival
science already means something else (the ISAD-G description area).

**`priority`** `critical` · `high` · `medium` · `low`
**`effort`** `XS` · `S` · `M` · `L` · `XL` — relative sizing, not hours
**`type_execution`** `digital` (an agent can do it) · `biological` (needs a
human) · `hybrid`
**`provenance`** `human` · `ai-assisted` · `ai-generated`

---

## 8. `created` / `updated`: dates come from git

**Report which commit each date comes from, and mark inferred ones. Do not fake
precision.**

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

**Why the provenance field matters more than the value.** This rule existed in
draft while its own author wrote ten documents with hand-invented dates. What
makes the case is not the count: **the sequence was coherent fiction**, each a
plausible minute after the last, crossing midnight, when six of the files had
come out of a single commit at 22:07. A future reader does not catch that. A
wrong date that looks arbitrary invites suspicion; a wrong date that looks like
a timeline does not.

**A caution about `git log`.** `--diff-filter=A` returns the date of a rename,
not of birth, unless `--follow` is used — and `--follow` is heuristic: it can
lose the trail when a file is renamed *and* heavily edited in the same commit.

---

## 9. Naming `[MANUAL]`

**Series documents:** `<ID>-<slug-in-english-kebab-case>.md`
**Root documents:** `UPPERCASE.md` — GitHub convention, marks repository
governance.

**Never a version or a date in the filename of a living document**: git carries
the history, `version:` carries the version. Dated names
(`YYYY_MM_DD-Title-vX.Y.Z.md`) are a legacy shape and **reserve nothing** — they
carry no meaning about a document's state (§5.0).

### 9.1 Citing an identifier vs mentioning one as data `[MANUAL]`

**The problem.** A document that inventories broken references trips the guard
that detects them.

> **A report about broken citations is itself full of broken citations. That is
> what it is for.**

This is not a bug in the lint. It is a category the lint does not have: it
cannot tell **citing** — *"per `ADR-004`, identifiers are never renumbered"* —
from **mentioning as data** — *"`ADR-004` · 1 citation · recovered"*.

**The convention.** An identifier mentioned as data is written **inside a code
span**, and the surrounding structure makes it a table cell, a list item or a
fenced block.

| Intent | Written as | Resolves? |
|---|---|---|
| **Citation** — the document is the authority | bare, in prose | must resolve |
| **Mention as data** — the identifier is the subject | in a code span, inside a table cell, list item or fenced block | not checked |

**Why a convention and not an exemption.** An exemption would name one document
in the lint's ignore list and be forgotten; the next report would trip the guard
again and someone would add a second exemption. A format convention is inherited
by every document that follows, and it is visible to a reader — which an ignore
list buried in a script is not.

---

## 10. Reproducible evidence

### 10.0 Plausible artefacts — the class `[MANUAL]`

**An artefact that has the shape of evidence, and is not evidence.**

| Looks like | Is |
|---|---|
| A creation timeline: 00:30, 00:32, 00:34… | Ten hand-typed dates; the files came from one commit |
| A measurement: `0/17`, `49 broken` | Counts of the wrong unit — files not folders, rows not documents |
| Verification: a green CI run | A run that is **identical with the guard and without it** |
| Coverage: a green reference lint | A markdown linter, blind to a TypeScript slug map |

**The common mechanism, and why care does not fix it:**

1. The artefact is **well-formed** — no crash, no zero, no empty output.
2. Its shape matches the thing it is mistaken for.
3. **Nothing checks the gap between shape and substance**, because the shape is
   what any checker would look at.
4. A reader accepts it, and it becomes the record.

Every instance was caught by a **human finding the artefact implausible** —
never by another instrument. That is the defining property: **a plausible
artefact is invisible to the layer that produced it.**

What the corpus does about it, and none of it is diligence: name the unit
(§10.1), declare the source (§8), read the step and not the run (§10.3), and know
what a guard does not check (§10.4).

> A guard proves what it checks, never what it does not. **A green guard is
> evidence about the guard, not about the repository.**

### 10.0.1 Failure by omission `[MANUAL]`

**A failure by omission produces no error. It produces a valid artefact that is
smaller than it should be.**

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
   the renames against the redirect table.
2. **The count is the signal, and nobody watches counts.**

> §10.1 requires a figure to declare its unit. Omission is the case where the
> unit is right, the figure is right, **and the denominator is silently wrong.**

### 10.1 Every measurement declares where and what it measured `[MANUAL]`

**Rule.** Every measuring script states in its output which `ROOT` and which
`HEAD` it measured, and **what it counted**. Without those, its result is not
evidence. `18` is not a measurement. `18 entries` is.

**And a result of zero is suspect** until the instrument is shown to have been
pointing at the right place. Two scripts once computed `ROOT` from their own file
location and reported `0 broken citations` while measuring the wrong directory —
output indistinguishable from a clean corpus, produced while a merge decision was
being taken on it.

**Naming the unit does not depend on anybody remembering.** Three of six
miscounts in one review were a container counted instead of its contents:

```
agents/ 0/17 unregistered  →  0/5    four files per agent folder
citations 49 broken / 280  →  17/88  table rows counted as documents
baseline 19 entries        →  15     lines of JSON
```

Every one reads as correct without a unit, and as obviously wrong with one.
`0/17 agent folders` is false on its face: there are five agents.

### 10.3 A guard is verified by its step, never by the run `[MANUAL]`

**Rule.** To confirm a CI guard runs, read the **step** in the job, not the
**conclusion** of the workflow run.

A green run means *nothing failed*. A workflow missing the guard entirely also
has nothing fail. **The two are indistinguishable from the conclusion**, and the
failure mode is silent in the direction that matters: a guard believed to be
protecting the repository, protecting nothing.

```bash
gh run view <RUN_ID> --log | grep -A3 '<step name>'
```

### 10.4 Every guard declares what it is blind to

Each guard prints, on **success as well as failure**, the things it did not look
at — because a green result is exactly when the reader is least likely to ask.
The declarations live in `scripts/blind-spots.json`, are printed by
`scripts/lib/blindness.mjs`, and are verified by `scripts/test/blindness.test.mjs`.

Three properties make this more than a list:

1. **It is printed where the claim is made** — in the guard's own output, not in
   a document nobody opens while reading CI.
2. **It names the coverer, or admits there is none.** "Nothing covers this" is
   the useful half.
3. **It is verified, not asserted.** The test builds a file that *should* trip
   each guard, runs the guard, and asserts it stays green — proving the
   blindness is real. A declared blind-spot list nobody verified would be a
   claim about coverage with the shape of evidence, which is what §10.0 is about.

The suite fails when a declaration stops being true. That is deliberate: if a
guard is fixed and stops being blind, the fix must be recorded rather than
absorbed silently.

**What this section is itself blind to:** it prints the blind spots that were
*thought of*. It cannot enumerate the ones nobody has imagined.

### 10.5 A corpus figure is produced once and cited everywhere else `[MANUAL]`

**Rule.** The only document that *states* corpus figures is
`telemetry/latest.md`, rendered from `telemetry/latest.json`. Any other document
that shows a corpus figure *cites* it: the figure carries the key it came from
and the `HEAD` it was measured at — inline (`` `missions.done_without_closure =
<value> @ <head>` ``) or once for the block that contains it. **A figure with
neither key nor `HEAD` is a claim without evidence.**

Records — `done` missions, `frozen` missions, reports — keep their figures with
their date. The rule is not retroactive.

**What it changes for a mission.** Context cites `key = value @ head`;
acceptance criteria name a key and a target, **never a current value**; closures
cite the `history.jsonl` line.

**Instruments.** `figures.live` counts lines stating a corpus-shaped figure with
no `@ head` beside them; `figures.stale_citations` lists citations whose value
has since moved. Neither is wired to CI; the ratchet is a later decision.

---

## Version history

- **v6.0.0** (2026-09-04) — every rule kept, the argument for each removed. Gone:
  the dated census of 2026-08-24, whose figures had been superseded by the
  instrument that replaced the script producing them; the coverage percentages in
  §4.1, which claimed `standards/ 5/5` while ten standards existed; the running
  commentary on corrections to earlier versions of this document; the `frozen`
  doctrine that survived in §2.1 after the 2026-09-03 ruling struck it; the
  per-series registration plans, which are work lists belonging to their
  missions; and the field-shape rules now owned by `STD-004`, which this
  document defers to by name rather than restating. **Section numbering is
  unchanged** — 26 documents cite these sections by number, and an identifier is
  a promise about the past. The controlled vocabularies and the dates section
  swapped order; both keep their numbers.
- **v5.0.0**–**v1.0.0** (2026-08-24 → 2026-09-02) — see git history. The
  substantive additions were: change thresholds replacing a false claim of
  immutability, git history named as the fifth and only enforced threshold, the
  `live` threshold for state rather than record, `registration: exempt` so a gap
  and a declared exception stop looking alike, the pointer/record distinction for
  renames, plausible artefacts named as a class, failure by omission, and the
  measurement rules on unit, root and step.
