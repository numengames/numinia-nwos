---
id: "MIS-146"
uid: ""
title: "Normative refoundation: the corpus states its rules once, in one place, and each one can pass or fail"
status: in-progress
priority: high
effort: XL
guild: "Exegetes"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
completed: null

type: mission
version: "1.5.0"
created: "2026-09-03T17:46:00Z"
created_source: "git:eb91cbb"
created_confidence: exact
updated: "2026-09-05T13:20:00+02:00"
author: "ursa"
owner: "oracle"
tags: [standards, governance, contradictions, compression, refoundation]
license: "CC0-1.0"
---

# Normative refoundation

## Background

The Oracle's brief, in his words: *"hay que hacer unas reglas bien definidas
que no se contradigan unas a otras, y luego hay tantísimo texto que no se
entiende nada"*. And on method: *"no hay que demolerlo — es un edificio del
que hemos aprendido y tenemos que extraer el aprendizaje y hacerlo en otro
edificio que es coherente"*.

**This mission is opened after the work started, and says so.** Five pull
requests reached `main` before it existed: #224, #226, #227, #228 and #229.
The plan they followed lived in an agent's working directory, outside this
repository — which by `STD-006` means it did not exist for the corpus at all.
Two days were spent auditing other documents' incoherence while working
outside the cycle `PRO-003` requires. The record starts here rather than
being backdated into five tidy fictions.

### What the first phase actually produced

| | Start | At `eb91cbb` |
|---|---|---|
| Documents | 33 | 32 |
| Words | 98,403 | 99,422 |

**One document removed. A thousand words added. About 4% of the target.**

The phase repaired the old building instead of starting the new one:
relicensing, marking a draft as a draft, fixing dead links, adding a prose
guard, ending the filename-as-state hack. Every repair added text to what it
repaired.

It was not wasted — it produced permission to delete, which did not exist
before. `superseded` and `withdrawn` are in production (#224), a guard
measures prose and its baseline already falls, 187 → 180 (#226), `standards/`
is homogeneous for the first time, nine documents all `STD-NNN` (#229), and
three corpus lies fell: a draft claiming ratification, five dead links, and a
licence reserved over a renunciation already published.

But permission to delete is not deletion, and the counter says so.

### The measurement that reframes the target

At `eb91cbb`, across `canon/`, `standards/`, `protocols/` and `decisions/`:

```
166  normative verbs (MUST, MUST NOT, SHOULD, SHOULD NOT, MAY)
99,422  words
─────
599  words per rule
```

A well-written standard runs 20–50. `STD-005` sits at 51; `STD-008` at 424.

The four heaviest documents carry the imbalance:

| Document | Words | Normative verbs |
|---|---|---|
| `STD-008` design system | 23,345 | 55 |
| `STD-001` glossary | 12,905 | 0 |
| `CAN-002` brand and culture | 7,869 | 0 |
| `CAN-004` role structure | 6,846 | 0 |

**50,965 words — 51% of the layer — holding 55 verbs between the four.**
Three of them bind nothing at all.

They are not fat. They are reference material: a production manual, a
dictionary, a brand book, a taxonomy. The Oracle already ruled this for the
design system — *"es normal que sea así de largo"* — and the same reading
applies to the other three. A document that binds nothing is not a failed
standard; it is a different kind of document.

## Scope

### The target, corrected

The original figure — 6,000 words, 7 documents, 30 minutes — was measured
against a total that includes reference material which must not be
compressed. Counting them together makes the goal unreachable by
construction, which is a defect in the target, not in the corpus.

The target applies to the **normative layer**: roughly 48,000 words that
exist to bind. Reference material is named, kept, and excluded from the
counter — not deleted, not shortened, not moved to make the number look
better.

**Reference material at `eb91cbb`** (the four above, ~51,000 words). This
list is the mission's own ruling and may be amended by the Oracle at any
point; each entry needs a reason in this file, not a preference.

### The cut

**If a sentence cannot become a check that passes or fails, it is not a rule
— it is a record.** Records are welcome; they are not standards.

The verb count is an indicator, not the criterion. A document with zero
`MUST` may still hold a real obligation in plain prose, and a document full
of `MAY` may bind nothing. Each document is read before it is classified.

### The work

1. **Write the core-rules standard** — one line per rule, each one checkable.
   Extracted from the normative layer, not invented. It takes the next free
   number in the series when it is written; naming it here would be a
   reference to a document that does not exist.
2. **Resolve contradictions as they surface**, one per pull request, stating
   which rule wins and why. Two are already resolved and in production
   (`closed`, and filename-as-state).
3. **Supersede, never delete.** When a new rule covers an old document, that
   document takes `status: superseded` with its heir named in frontmatter,
   and stays readable. The Oracle's instruction: *"me parece bien solapar, no
   borrar"*.
4. **Report the counter after every pull request**, including when it moves
   the wrong way. The first phase moved it 4% and that was reported without
   decoration; the same applies for the rest.

### Guards

Every pull request lands with the full suite green: nine guards, telemetry
`--check`, the telemetry test, and the build. Telemetry is regenerated after
the commit, never hand-edited. Baselines are never whitewashed when the
breakage is caused by our own text.

## What the second phase found

Recorded here because the pull requests carry the changes but not the reasoning.

### The compression is spent

Six documents were slimmed across PRs #232, #234, #235 and #236. The normative
layer fell from 101,893 words to 90,783: eleven per cent, with no rule lost and
one rule recovered that the first draft had dropped.

`STD-008` was measured and deliberately **not** slimmed. Its content is 88.3%
specification — token tables, colour values, spacing scales — and 11.7% prose.
A design system's tables are its rules, the way `STD-004`'s field tables are.
Compressing it would have produced roughly 2,000 words and required inventing
values. **Assuming the largest document was the most compressible was wrong,
and measuring it was what showed that.**

### The rules did not exist

`STD-009` was written with sixty-two rules and never executed. Running the
eleven mechanically checkable ones found six breaches — and four of those were
defects in the rules, not in the corpus: two bound every markdown file in the
repository rather than the corpus, one condemned 68 design tokens as ageing
figures, and one imposed a commit-subject limit that 129 of the last 200
commits break. `scripts/check-core-rules.mjs` now executes eight of them over
the 257 bound documents, verified by mutation.

### The rules are not in force, by instruction

The Oracle's ruling, stated more than once and not previously honoured:
*"las reglas no me las hagas cumplir, que las necesitamos revisar antes de que
estén como norma activa."*

`STD-009`'s `status` field is now the switch. While it is anything other than
`active`, the guard reports and the build passes. Setting it to `active`
enforces; returning it to `draft` suspends. Both positions were tested with a
real breach injected. **The deactivation mechanism exists and has been
exercised — which was the point of building it before ratification, not after.**

### Where the corpus is genuinely ambiguous

Fifty-one documents across the seven load-bearing series were compared for
shared phrasing and for subject sprawl.

**Overlap is not the defect.** The highest-scoring pair shares 7.8% of its
phrasing, and that shared text is the supersession note every debt record
carries — boilerplate present in 12 of 12 records. No two documents in the
corpus cover the same ground.

**Subject sprawl is the defect.** `CAN-002` carries 7,869 words in 37 sections
across five declared books — Narrative, Business, Brand, Culture, DNA — each
with its own subtitle marking which book it belongs to. The document announces
its own division in its table of contents. A reader looking for the pricing
model and a reader looking for the visual identity open the same file.

`CAN-004` carries 6,846 words in seven sections, of which four are a treatise
on categorisation theory — basic level theory, prototype theory, semantic
principles — and three are the role structure the title promises.

Both are `canon/`, sealed. **Neither was touched.** The finding is recorded for
a ruling.

## The third phase: ratify by batch, and empty what it replaces

`STD-009` compresses 24 normative documents — 72,770 words — into 62 rules and
2,705 words. That is 27x. The compression is only real if the source documents
stop carrying the rules that moved: a digest that leaves its sources intact
does not reduce the corpus, it duplicates it.

So ratification and emptying are the same act, and they happen one section at
a time. A section is not ratified until the documents it drew from cite it
instead of restating it.

### Why batches and not one pull request

Fifteen source documents in one change is a diff nobody can review, and a
revert that takes the whole refoundation with it. Each batch is a section of
`STD-009`, its source documents, and one pull request. If a batch is wrong, it
reverts alone.

The switch already exists. `check-core-rules.mjs` reads `STD-009`'s own
`status`: `active` enforces, anything else reports and the build passes. That
was built before ratification and exercised in both positions. Ratification is
an edit to a header, not to a script — and it is reversible in one line.

### The batches

| # | Section | Rules | Source documents to empty |
|---|---|---|---|
| 1 | §2 Precedence | `CORE-01`..`05` | `STD-002` |
| 2 | §3 Authority · §6 Versions | `CORE-06`..`10`, `CORE-21`..`24` | `STD-002`, `STD-001` |
| 3 | §4 Identity · §5 The header | `CORE-11`..`20` | `STD-001`, `STD-004` |
| 4 | §7 Git · §12 Citation | `CORE-25`..`30`, `CORE-50`..`53` | `STD-005`, `PRO-013` |
| 5 | §11 Archiving · §13 Secrets · §14 Licences | `CORE-45`..`49`, `CORE-54`..`60` | `PRO-010`, `CAN-005`, `STD-006` |

### What leaves `STD-009` instead of being ratified

Sixteen rules are in the wrong document. They are not law about the corpus; they
are procedure about actors, or engineering about tooling.

- **§8 Guards** (`CORE-31`..`35`) — how a guard is built and wired. That is
  `STD-005`.
- **§9 Work** (`CORE-36`..`41`) and **§10 Sessions** (`CORE-42`..`44`) — what
  an actor executes, step by step. Those are `PRO-003` and `PRO-001`. A
  standard is complied with; a protocol is executed.
- **§15 Writing** (`CORE-61`..`62`) — `STD-007` is the plain-writing standard
  and it has a guard.

### The defect that must be fixed before any batch

None of the 62 rules names a guard. The "How it is checked" column says things
like *"compare the claim against `git log`"* — an instruction to a human, not
a check. `CORE-31` states that a rule which does not break the build does not
exist, and by its own test most of these rules do not exist yet.

Every rule gets either a named script or an explicit `[MANUAL]` with a reason.
That is batch 0, and nothing ratifies before it lands.

### The design system is not a standard, and says so in its own headings

Recorded here because it changes what closing `standards/` means, and it is not
part of any batch above.

`STD-008` is 18,447 words — more than every `active` standard in the series
put together. Six of its nineteen sections are marked `[CANON]` or
`[CANON — direction decision]` in their own headings, one is `[DERIVED]`, and
the rest are recipes: §13 Application recipes, §16 roadmap, §19 Agent contract.
A document that labels its own sections as canon is not a standard that drifted
into canon territory. It is three genres filed under one identifier.

The Oracle has the design system saved outside the repository and knows how it
should be rebuilt, so nothing here needs to be preserved for its own sake. What
belongs in `standards/` is the design standards — which standards the design
work adopts — and the rest goes to canon and to protocols as the axes get
completed.

This is why ratifying `STD-009` does not close `standards/`. Four of the nine
documents in the series are `draft`, holding 26,792 of its 38,085 words, and
`STD-008` alone is 69% of that. The core rules work settles which document wins;
it does not settle what the design series is.

## What to do with a guard whose rule is not settled yet

Three options get proposed whenever a guard blocks work: turn it off, ignore
it, or make it pass. Two of them destroy the instrument.

**Turning it off** deletes the measurement. The corpus stops being wrong and
starts being unmeasured, which reads the same in a green build and is not the
same thing. When the rule is settled the drift has to be discovered again from
zero.

**Ignoring it** is worse, because the guard still runs. A red build nobody acts
on trains every reader to skip the output, and the next failure — a real one —
is skipped with it. A guard that is ignored has negative value: it costs
attention and returns none.

**Making it pass** by relaxing the check, adding an exception list, or editing
documents to satisfy a rule nobody agreed to is the only one that produces a
false record. The build says the corpus complies. It does not.

The fourth option is the one already built. `check-core-rules.mjs` reads
`STD-009`'s own `status`: while it is anything but `active`, every breach is
printed and the build passes. The measurement is taken, published, and not
enforced. Nothing is hidden, nothing is faked, and the day the standard is
ratified the guard changes behaviour without a line of code changing.

This is the general rule, not a special case for `STD-009`. A guard for an
unratified rule reports; a guard for a ratified rule blocks. Which one it does
is read from the document, not decided in the script — so throwing the switch
is an edit to a header, and reverting it is the same edit backwards.

The cost is real and worth naming: a reporting guard is easy to stop reading.
The thirteen breaches closed above sat visible for a day. That is the price of
not lying, and it is lower than the alternatives.

### Batch 0, done — every rule names its verifier

All 62 rules carry a verifier. 23 are decided by a script or a GitHub setting;
39 are `[MANUAL]` with a one-line reason. The "How it is checked" column, which
held instructions to a human, is now "Verified by" and names an artefact.

Eleven rules are executable in `check-core-rules.mjs`, up from eight. The three
added are `CORE-14` (an identifier is never reused), `CORE-20` (an unknown
value is left empty, never guessed) and `CORE-24` (the header version and the
document's own changelog agree).

`CORE-14` found a real collision on its first run: `MIS-149` was held by two
missions created three hours apart on 2026-09-04. `CORE-15` settles it by
commit order, so the roster mission was renumbered to `MIS-153` and carries a
note saying why. Nothing outside the two files cited either.

`CORE-24` reports 12 documents whose header and internal changelog disagree —
nine guild charters and rosters, three missions. Not fixed here: that is a
burndown, and it belongs to its own batch. The guard reports them and the
build passes, which is what the switch is for.

Four `[MANUAL]` marks are pending tools rather than undecidable rules:
`CORE-32` and `CORE-33` wait on the guard register, `CORE-49` on a
content-hash scan, `CORE-54` on a secret scanner. There is no secret scanning
wired into the pipeline today.

### Batch 0b, done — the corpus holds every executable rule

Ratification was blocked by thirteen open breaches. They are closed, so the
switch can be thrown without the build going red on the first commit after it.

Three were defects in the guard, not in the corpus. `CORE-24` matched a heading
that *mentioned* a changelog instead of being one, scanned to end of file
instead of to the next heading, and compared against the highest version rather
than the newest entry. `CORE-12` read `-not-frozen.md` as a filename encoding
`frozen`, when a negation is a claim about another document. A guard that cries
wolf gets muted, and a muted guard is worse than none.

Nine were real and had one cause: the eight guild documents were born at
v1.2.0 in the `GLD-NNN` rename (`e9f58f6`, #163) carrying a change log from
their previous life, and `MIS-0147` had its version raised in #251 without an
entry. Each now records the act that moved it.

Three logs ran backwards. `MIS-0044` was the interesting one: a normalisation
pass in September wrote v1.0.1 over a document already at v1.1.0, which is not
a lower patch but a version going backwards. It is v1.1.1.

Writing `CORE-21`'s check for ordering was not planned. It fell out of reading
the logs: a log whose entries descend is a defect whether or not the header
agrees with the last line, and nothing was looking for it.

The eleven executable rules all hold. What made this cheap is that the guard
ran in reporting mode while the corpus was still wrong — the breaches were
visible for a day before anything depended on them being absent.

### Batch 1, done — precedence is stated once

`STD-002` §Which document wins and `STD-009` §2 said the same law in two
`governed` documents, and neither named the other. `STD-002` reached v3.0.0 on
2026-09-05 and overrode `STD-009` §2 in fact without naming it — a breach of
`CORE-04`, which it promulgated in the same section.

The law stays in `STD-009`, where the rules have citable identifiers and a
verifier column. `STD-002` keeps two pointers and the thresholds that make the
cost rule measurable.

`CORE-02` was wrong and is corrected. It said the code outranks the documents.
The Oracle settled the opposite on 2026-09-05 and `STD-002` was amended that
day; `STD-009` was not, so the corpus held both readings for six hours. The
correction carries `STD-002`'s exception — a document that describes what the
code does and describes it wrong is a broken description — because the test is
direction, and `STD-009` had no test at all.

Four formulations moved instead of being deleted: the worked example of cost
(`CORE-03`), "a document does not become authoritative by saying it is"
(`CORE-05`), the `superseded`/`withdrawn` distinction (`CORE-45`), and "a
`draft` binds nobody", which `STD-009` stated only about itself.

One had no rule anywhere and became `CORE-63`: the change lands in the document
it governs, because a rule written in a decision or a commit message is not a
rule yet.

The pair grew by 204 words. `STD-002` lost 50 and `STD-009` gained 254, of
which the amendment note in `STD-002` and the correction rationale account for
most. Deduplication that carries its own audit trail is not free, and the
saving arrives in batch 2 when the same pointers serve sections that are still
duplicated.

`STD-002` goes to v5.0.0. Removing obligations is a major by `CORE-23`, even
when the obligations survive elsewhere.

### Ratification is the Oracle's

Each batch ends with `STD-009` `status: active` for the sections it covers, and
that edit is authorised by the Oracle, not by an agent. The digital agent
prepares the batch, empties the sources, proves the guards green, and stops.

## Out of scope

- **Deleting reference material.** Length is not the defect.
- **Backdating missions** for the five pull requests already merged. `git log`
  is the record; this file is the reasoning.
- **`nwos-workspace-template`** — another repository (`MIS-0106`).
- **The `CAN-005` vs `REUSE.toml` licence contradiction** — `CC-BY-4.0`
  against `CC0-1.0` across 7 directories and 195 documents. Real, open, and
  its own mission: it is a canon-layer ruling, not a compression task.
- **Splitting `CAN-002` and `CAN-004`.** Measured, recorded above, not done.
  `canon/` is sealed and a split is a canon ruling, not a compression task.
- **Ratifying any rule of `STD-009`.** The Oracle reviews first.

## Acceptance criteria

1. The core-rules standard exists, every line of it convertible into a
   pass/fail check.
2. Every superseded document carries `status: superseded` and a named heir,
   and remains readable.
3. No contradiction is closed without a written ruling saying which side won.
4. The normative layer reaches the target, or this file records why the
   target was wrong — with numbers, as the first phase did.
5. Words per rule falls from 599 toward the 20–50 range for documents that
   bind.
6. Every pull request in this mission left `main` with the suite green.

## Closure

Closed when the normative layer states its rules once, without
contradictions, and a reader can check any of them against the tree.

Blocking on the Oracle: whether the four reference documents leave the
counter as this file proposes. The mission proceeds on that assumption and
records it as such.
