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
version: "1.17.0"
created: "2026-09-03T17:46:00Z"
created_source: "git:eb91cbb"
created_confidence: exact
updated: "2026-09-07T20:00:00+02:00"
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

### Batch 2, done — authority and versions

Four sections of `STD-002` became pointers, and two rules that existed nowhere
were written.

**The thresholds were stated three times.** `STD-001` §2.1 defines them and
argues why they are thresholds and not properties of a file; `STD-002`
§Permissions by series listed them again; `CORE-03` cites them without
defining them. The glossary's version is the one that survives, because it is
the only one that explains itself. The other two point at it.

**`CORE-64` did not exist.** `STD-009` §6 said which number moves for which
kind of change, and never said who may move it. `STD-002` did — patch to a
digital agent, minor to an Archon, major to an Oracle alone — but as prose in a
document that was losing its authority sections. It is now a rule with a
number.

**`CORE-65` did not exist either.** `STD-009` §3 says what each *change*
costs; it never said what each *rank* may do. That was `STD-002` §Roles, and it
was the section the Oracle marked for removal. Removing it without writing
`CORE-65` would have deleted the rule, not moved it.

**The twelve folders were listed in both places.** `STD-002` gave each one a
sentence; the glossary gives each one an **IS / IS NOT** test. Only one of
those settles an argument about where a document belongs.

The pair shrank by 30 words: `STD-002` lost 202, `STD-009` gained 172. Without
the amendment note `STD-002` would have lost 320. The note is the cost of
`CORE-04` — an override must name what it overrides — and it is charged once
per operation, not per rule.

Cumulative across batches 1 and 2: the pair is up 174 words and down four
duplicated sections. The word count is the wrong measure and this mission
should stop quoting it as a goal; the measure that moved is that precedence,
versioning authority, rank permissions and the folder taxonomy now each have
exactly one home.

### Batch 3, done — identity and the header

The smallest batch by word count and the one that found a contradiction.

**`CORE-20` said the opposite of `H-09`.** The core rule said an unknown value
is *left empty*; the header standard says an empty value is an error, and that
absence is declared in one of three forms — the field omitted, `null`, or
`TBA` naming the mission that resolves it. The guard implements `H-09`, not
`CORE-20`: it tests for placeholder strings and never for emptiness. Two
`governed` standards disagreed, the executable one was right, and the rule that
was wrong is the one that had been ratified into a compendium. `CORE-20` now
states the prohibition — never a guess — and points at the glossary for how a
gap is declared.

**`H-00` and `CORE-16` are the same rule.** Both say a governed document opens
with frontmatter. `H-00` keeps the gate because the header standard is where a
reader looks for what a header must contain; it now names `CORE-16`, `CORE-17`
and `CORE-18` for the shape rather than restating it.

**`CORE-19` was a subset of `H-08`.** "Declares its licence" against "present,
SPDX identifier, agrees with the licence manifest". The core rule keeps the
obligation and points at `H-08` for the value.

**The glossary lost two restatements.** §4 said an identifier is never reused
and never renumbered — `CORE-11` and `CORE-14`. §9 said a filename carries no
version or date — `CORE-13` and `CORE-12`. Both kept their reasoning, which is
the part no rule carries: an identifier is cited in plain text nobody can
rewrite, and a dated filename reserves nothing.

`STD-004` gained pointers rather than losing rules: it is the field registry,
and every `H-nn` is more specific than the `CORE` beside it. The batch table
listed it as a document to empty. That was wrong — a registry is not a
duplicate of the invariants that constrain it.

### The next axis: canon keeps the why, standards take the obligations

The Oracle's rule for the axis, stated 2026-09-06: **canon says why, a standard
says what, a protocol says how.** Measured against the tree, the axis is sound
and its application is not.

**Two canons hold obligations.** `CAN-005` (licensing) carries 40 of them and is
doing a standard's work for its whole length. `CAN-004` has one section,
*Prototype theory*, with six. The other five canons carry none. So the defect is
not general — it is two documents, and one of them is almost entirely it.

**The move is: what obliges goes down to a standard, what explains stays.** Not
the `[UNIVERSAL]`/`[NUMEN]` marks already in `CAN-005` — those record *scope*, so
that a section can be promoted to a higher organisation's canon without a
rewrite. They are not a canon/standard split, and reading them as one would send
the generic rules down and keep the business-specific ones in canon, which is a
different cut from the one instructed.

**Section numbers stay where they are.** An emptied section keeps its heading and
its number, and holds a pointer to the rule that now owns it. The reason is
measured in `DBT-016`: 422 citations across 107 files name sections by number,
123 of them inside `scripts/field-decisions.json`, and three in `LICENSE`,
`REUSE.toml` and `TRADEMARKS.md` — the repository's legal declaration. Moving the
text without keeping the numbers breaks all of them silently.

This is containment, not a fix, and it is deliberate. The Oracle's stated intent
is a later structural reduction — *"va a haber un momento que tenemos que arrasar
con el sistema que tenemos ahora para reducirlo y dejarlo que sea mucho más
cómodo"*. Holding the numbering steady now means that operation happens once, on
purpose, with the coupling already measured, instead of being paid piecemeal by
every batch that touches a cited document.

### Licensing, done — the first axis cut

`CAN-005` carried 40 obligations, more than the other six canons combined, which
hold eleven between them. Six of its nine sections were obligation tables,
declaration mechanics, or a copy-paste artifact. It was a standard with a canon's
first section.

**The obligations are now `STD-010`.** The canon keeps the four regimes and why
each exists, that silence does not declare, the irrevocable `CC0-1.0` grant over
`canon/`, that opening is an act, and the trademark boundary. It went from 3,156
words to 1,232, and from 40 obligations to one.

`ADR-039` records the decision, because `CAN-005` is `sealed` and a sealed
document may not change without one.

**The measurement, unflattering as usual.** The canon lost 1,924 words; the
standard added 2,962 and the decision record 719. **The corpus grew by 1,757.**
Of the standard's words, 620 are the `CLAUDE.md` fragment, which is a verbatim
copy that existed before and merely changed address.

What actually moved is that *what must I do about licences* and *why do we
license this way* are now two questions with two homes, instead of one file
answering both badly.

**Three defects surfaced during the move, none of them introduced by it.**

A legal-debt file is cited by name in `CLAUDE.md` and does not exist. It was inherited into
the fragment and would have been copied into `STD-010` unnoticed; the guard caught
it because the file was new. Corrected to the `debt/`-entry form the canon already
used elsewhere.

A retired decision record is cited by `CAN-005` for the English-language rule and
does not exist either. Removed from the standard; the surviving citation is `ADR-023`.

**Five of the seven licensing obligations have no guard**, and the AGPL-import
lint rule the canon describes **is not implemented**. Writing a conformance table
forced stating this; the canon never had one, so the gap was invisible for as long
as it existed. `STD-010` says it in its own conformance section.

### The design system, measured before touching it

`STD-008` is 18,447 words and carries **33 obligations** — one per 559 words.
`STD-010`, written this week, carries one per 74. The largest document in the
corpus is also the emptiest per word.

It is four documents in one file. Roughly 7,300 words of art direction, 3,400 of
standard, 3,600 of protocol, and 4,100 of apparatus. **Six of its nineteen
sections say `[CANON — direction decision]` in their own titles.** The file has
been announcing what it is, and nobody acted on it.

Section 19 is the clearest case in the corpus of a protocol filed as a standard:
a precedence list, a numbered algorithm an agent executes, a pre-delivery
checklist, and a reusable instruction fragment.

**What the measurement did not find is drift.** The published kit holds 239
tokens and 36 hex colours, and every one appears in the master. The six hexes in
the document that are missing from the kit are all quoted as defects — colours
the live site uses that the system rejects. Document and code agree.

**The blocker was the generator, and it is fixed.** `generate-design-kit.mjs`
extracted the published CSS and JS by searching for the literal string
`### 13.1`. Moving that section broke the kit; renumbering it broke the kit
silently, because `indexOf` returned −1 and the error named a missing heading
instead of the cause. Extraction is now by `<!-- kit:css -->` and `<!-- kit:js -->`
markers, which survive renumbering and survive the section moving to another
file. Proven both ways: the kit rebuilds byte-identical, and renumbering §13.1 to
§99.7 no longer changes the output.

This is `DBT-016` in its acute form — there the coupling was prose citations,
here a build artefact published under a versioned URL depended on a heading
number. It is registered as `DBT-018`.

### The first cut into the design system: the protocol leaves

`STD-008` §19 was called *Agent contract*. It held a precedence list, a numbered
algorithm an agent executes step by step, a rule about which tokens may be used,
a pre-delivery checklist and a reusable instruction fragment.

That is a procedure. It says **how** to apply the design system, and a standard
says **what** must hold. It is now `PRO-014`, *Producing a design piece*, active
and mandatory, 1,308 words.

`STD-008` drops from 18,453 to 17,472 words. That is a small number and it is
the point: **nothing was deleted.** The corpus did not shrink, it sorted itself.
An agent that has to produce a piece now reads 1,308 words instead of finding the
algorithm at the end of a 17,000-word document about colour.

**Every reference in the moved text was requalified.** Inside `STD-008`, `§5`
meant the grid section of that document; inside a protocol it means nothing, so
28 references became `STD-008 §5` and the like, and only the two that pointed
within the moved block stayed local. The mechanical pass got this wrong on the
first attempt — it rewrote `§4.3` as local when it belongs to the standard — and
was redone marking the self-references first.

**The generator fix from the previous change earned itself here.** Moving a
section out of the master is exactly what used to break the published kit
silently. The kit rebuilt byte-identical.

**What did not move is the version.** Removing a section is a `minor` bump under
`CORE-22`, and it was not applied: the generator resolves its token path from
the document's own `version:` field, so `5.2.0` sends it to a directory that does
not exist. The document says so in the pointer rather than quietly carrying an
undeclared change. `DBT-014` now records that the coupling has falsified a
version field, not merely annoyed an editor.

### The second cut stopped before cutting

The plan was to separate art direction from standard inside `STD-008`. Measuring
first stopped it, and the measurement is the finding.

`STD-008` §0.2 defines its provenance marks. `[CANON]` means *stated in the Brand
& Culture or a direction decision already taken; **changed there***. The mark is
a pointer plus an instruction: this is not mine, go change it upstream.

**Forty-two marks. For the creative direction, upstream does not hold it.**
`CAN-002` mentions steampunk and cyberpunk three times each — in a list of the
Oracle's tastes, in a list of cultural references, and in one sentence about
essence. It never doses the threads, never names a register, and **has no
creative-direction section at all**. Its design material is three short sections
under 300 words.

So the second cut cannot be made on the marks. Cutting `[CANON]` sections out of
the standard would send them to a canon that never made those decisions, and
`STD-008` is the only document where they exist.

**This is the same shape of error as the licensing marks, one level down.** There
`[UNIVERSAL]`/`[NUMEN]` measured scope and would have inverted the cut. Here
`[CANON]` measures *provenance* and would have moved material to a document that
does not own it. Twice now a mark inside a document has looked like the axis and
has not been.

**What is not wrong:** `CAN-002` fixes six hex values, and all six appear in
`STD-008` with the same roles, none of them among the colours the system
rejects. Canon and standard agree where they overlap. The defect is a provenance
claim that cannot be honoured, not a contradiction. Recorded as `DBT-019`.

**Repaired in passing:** moving §19 out yesterday left nine internal references
pointing at sections that no longer existed — `§19.2` to `§19.5`, cited from the
reading instructions, the agent order and the references table. The guard for
broken links does not read `§` citations, so nothing failed. `DBT-016` said
section numbers were load-bearing; this is the first time that debt collected.

### The citations get a guard, and it caught eleven

Yesterday's cut left nine broken `§` citations and no guard noticed. That was
the finding, so the next step was the guard rather than the next cut.

`scripts/check-section-citations.mjs` resolves every `DOC §N.M` in the corpus
against the headings the cited document actually has. It skips documents whose
headings are prose — in an `ADR`, `§2` means *the second section*, and failing
on that would teach people to ignore the guard.

**It found eleven breakages already merged into `main`**, and only two of them
were mine. Nine point at `PRO-010` sections that #232 deleted when it cut that
protocol from 3,652 words to 1,406. The rules survived; their subdivision did
not, and every citation to `§3.2.1`, `§3.2.2` and `§3.2.3` has been dangling
since.

All eleven are repaired by naming the rule instead of the place, so the
baseline ships empty and any new breakage fails.

**The guard corrected me once while I wrote it.** Its first version read
`` `PRO-013`, `STD-001` §10.4 `` as a broken citation to `PRO-013`, because a
greedy window attributed the section to the first identifier on the line. The
citation was correct and the guard was wrong. A guard that reports a real
document as broken is worse than no guard, and this one nearly shipped that way.

**What it still cannot see:** that a section exists is not that it still says
what the citing document claims. A renumbered section resolving to different
content passes silently. That is `DBT-016`'s deeper half and stays open.

### Cutting the canon, phase one

The canon was 25,680 words across seven documents. Three of them held 74% of
that. Phase one takes the two worst.

**`CAN-004` role structure: 6,801 -> 2,085 words, 69% out.** Four and a half
thousand words derived the role system from cognitive linguistics — Rosch's
basic level and prototype theory — from the EEM Institute's systems thinking,
and from Hjelmslev's glossematics on function. Five sections of argument before
the document said what a guild is.

None of it could be complied with or violated. It justified the structure; it
did not decide it. **The decisions were kept and stated flat**: the four guilds
and their hierarchy, the four factions and their domain types, role as dynamic
and position as preferred role, positions preferentially held by non-player
characters, profile is not role, function is not utility. Two hundred words
where there were four and a half thousand.

**`CAN-002` brand and culture: 7,826 -> 6,374 words, 18% out.** Seventy-six
lines of decorative binary and filler characters, and a 1,364-word brand
research interview — a blank sixteen-question questionnaire plus the Oracle's
answers in two rounds.

**The document convicted itself**: the section was titled *research phase* and
announced its content *"will later be included"* in the material above it. It
was scaffolding left inside the building, sitting in a sealed document.

One of the binary lines encoded the words *Public dommain*, typo included. It
now reads as text.

**Nothing was deleted.** All 6,994 words are in `history/`, each with its
provenance, its `former_id`, and the CC0 waiver that travels with canon text.
A retired argument is still the argument that produced the rule, and File Over
App means it survives the document that no longer carries it.

**Canon: 25,680 -> 19,512 words.** The 24% came out of two documents in one
sitting, and neither lost a single decision.

### Cutting the canon, phase two

`CAN-001` welcome: **4,442 -> 1,794 words, 59% out.** It carried three things
that were not canon, and the canon is now 16,864 words — **34% down from this
morning's 25,680**.

**Onboarding and offboarding** had numbered phases, explicit gates and a named
owner for every checklist item. That is a path somebody walks, which is the
definition of a protocol, so it became one: `PRO-015`. Nothing in it changed
except a duplicated Phase 0 — the same section appeared twice, once in Spanish,
once in English — which was collapsed.

**The cultural cartography** is a reading list of literary, philosophical and
academic works. Nothing consults it to decide anything and nothing in it can be
complied with or violated. It is a register.

**Scrum's Definition of Done** was a textbook page: third person, describing
what such a definition *"typically includes"*. Numinia decided none of it.
**And the system already has its own** — `STD-005` requires the pull request
template to carry a Definition of Done checklist, and that template exists. The
canon was carrying a generic description of a thing the standard already
governs concretely.

**The three canon documents cut today lose 8,816 words between them and not one
decision.** Every word is in `history/` or in `PRO-015`, with provenance and the
CC0 waiver that travels with canon text.

**What the canon is now:** seven documents, none over 6,500 words, and the
largest — brand and culture — is the next one to measure.

### Brand and culture drops the scaffolding

`CAN-002`: **6,484 -> 5,336 words, 17% out, and 126 sections become 62.**

The suspicion going in was that the document hid a business plan. **It did not.**
What it hid was scaffolding: the measurement found 52 of 126 sections empty,
three separate tables of contents, and 45 headings that were nothing but a
breadcrumb — *Brand > Personality* sitting directly under *Personality*.

**The table of contents existed twice**, once in English and once in Spanish,
381 words of it, and every top-level block then repeated its own contents
inline. The document spent four hundred words telling the reader where they
were.

**Nine sections promised instead of stating.** *"This section will cover"*,
*"aims to highlight"*, *"we should introduce"*. Finance was thirty-two words of
future tense. The dictionary section said the system *should introduce a
glossary* — and the glossary has been a standard for months.

**Legal and Lobby was 250 words copied from the Creative Commons website**,
explaining what CC0 and CC BY are, with one paragraph pasted twice. `STD-010`
already says which licence covers what. The canon now decides to be open in
sixty words and points at the standard for the rest.

**The body declared version 0.1.2** under a frontmatter that said 2.0.0, and
announced a review cycle nobody has run. Removed.

**Nothing that decides anything was touched**: the manifesto, the values, the
pillars, the palette, the personality, the beliefs, the rituals, the rules.

**Canon: 25,680 this morning -> 15,716 now, 39% down**, across four documents
and not one lost decision.

### The projections leave, and a heading came back

**Oracle decision, 2026-09-07**: the financial projections leave `CAN-002`.
Four tables of 2026-2029 figures inside a document about narrative, brand and
culture. They are recorded as they stood, defects included: every row — income,
costs, EBITDA, debt — **empty except the totals**; one table headed
*Proyecciones 2024* with columns running 2026 to 2029; one row reading `Dedt`.
Nothing in the corpus cited them.

**And a mistake, found while removing them.** The scaffolding cut deleted the
`# BRAND` heading and its line — *Brand is about Belonging and Prestige* —
because that block ended with an inline contents list and the deletion took the
heading with it. One of the four top-level divisions of the document
disappeared, and **the guards passed**: no guard checks that a document keeps
its own structure.

Recovered from `origin/main` and restored, along with **the three axes** — Profit
and Growth, Belonging and Prestige, Productivity and Trust — which had been read
as part of the table of contents and were in fact the only place the document
named the relationship between its three blocks.

**Why it happened**: the deletions were written as exact-string replacements
against a document with irregular spacing, and the block boundaries were assumed
rather than read. **What caught it**: reading the surviving headings after the
edit, not any automated check.

### Ratification is the Oracle's

Each batch ends with `STD-009` `status: active` for the sections it covers, and
that edit is authorised by the Oracle, not by an agent. The digital agent
prepares the batch, empties the sources, proves the guards green, and stops.

### The system names what it obeys

Twenty-eight external standards were crossed against the eleven standards
documents. Fourteen appeared nowhere. Nine appeared in more than one document.
Only three carried a link to the text they claim to follow.

`STD-011` now holds the adoption: name, primary source, territory, distance to
the tree, and the document that carries the obligation. It copies no foreign
normative text — pointers, not copies, the rule the agent template already
stated and the standards never used.

The eleven standards declare `territory` for the first time. Two had it; nine
did not. Nothing moved, nothing was renamed, no citation broke.

Four automations declared with an `[AUTO]` mark naming a tool were verified
against five repositories and found in none. They now read `[MANUAL]`, with the
reason, and `DBT-020` records why.

The licence verification the system presents as its best-executed standard had
never been run. Running it found three defects that eleven guards and six CI
checks had never seen: a documentation example the tool read as a real
declaration, in two files because that block is duplicated by hand, and one
file left with no licence information as a result. The tree is now compliant,
593 of 593 files, verified rather than assumed.

The accessibility gate was cited as incomplete against a debt closed on
2026-09-04, pointing at a path in another repository. The citation now says
where the test lives.

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
