---
id: "D-047"
uid:
title: "The reference guard resolves by basename, so a wrong folder path still reads as green"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-31T14:40:00+02:00"
created_source: "git:f229a4c"
created_confidence: exact
updated: "2026-08-31T14:40:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, guards, references, blind-spots, D-039, D-025, MIS-125]
license: "CC-BY-4.0"
visibility: "public"
severity: medium
opened_by: "MIS-125 Stage C, guilds/ rename"
---
# D-047 — The reference guard resolves by basename, so a wrong folder path still reads as green

> **Summary:** `check-references.mjs` resolves a bare filename citation
> against every basename in the corpus, ignoring the folder path the citation
> actually names. A reference to a deleted directory reads as valid as long as
> *some* file anywhere has the same basename.
> **Epistemic:** The guard answers "does this name exist somewhere?" while
> reporting the answer to "does this reference resolve?"
> **Pragmatic:** Until this closes, a green run does not prove that path
> citations point where they say.

## How it surfaced

`MIS-125` Stage C renamed `guilds/*/charter.md` → `guilds/*/GLD-NNN-charter.md`.
The rename produced **4 new broken references** in files that the rename never
touched:

```
blueprints/archive-summa-arquitectura-v0.1.0.md -> charter.md
blueprints/archive-summa-prompt-v0.1.0.md       -> centinelas/charter.md
protocols/APPROVAL-REQUEST-template.md          -> charter.md
protocols/APPROVAL-REQUEST-template.md          -> roster.md
```

All four cite paths under **`agents/guilds/`** — a directory deleted in
`b7a2e39` (*"Delete agents/guilds directory"*). Verified: the path did not
exist at `caf2621`, the commit immediately before the rename, and the guard
reported zero problems there.

**The references were already broken. The rename did not break them; it
removed the accident that was hiding them.** While a file named `charter.md`
existed anywhere in the corpus, the citation `agents/guilds/centinelas/charter.md`
resolved — against `guilds/centinelas/charter.md`, a different file in a
different folder. Once no file was named `charter.md`, the same citation
failed.

## The mechanism

`BARE_FILENAME_RE` captures the path fragment, including folders:

```js
const BARE_FILENAME_RE = /(?:^|[\s(`"'])((?:[\w-]+\/)*[\w][\w.-]*\.md)\b/g;
```

but resolution indexes **`path.basename()` only**. The captured folder
components are discarded before the lookup. This is deliberate and documented
in the script — citations are casual and rarely include the folder, per
`D-008`/`D-024`'s own finding — and for the common case it is right. The
unintended consequence is that the folder components are not merely optional:
when present and *wrong*, they are ignored rather than checked.

## Why this is `D-039` again

`D-039`: *"a guard's tolerance is itself a blind spot, and a tolerant reader
cannot detect damage that only a stricter reader would see. Green does not
mean correct. It means no instrument we own disagreed."*

The same shape, one layer down. The guard is tolerant about folder paths, so
four citations to a directory deleted months ago sat green in every CI run
since `b7a2e39`. `D-025` is the parent (*no guard declares what it is blind
to*): this blindness is documented inside the script and is invisible in its
output, which reports `unresolved filenames` as if a resolved one were verified.

## Not to be confused with: renames that break historical citations

A fifth entry was baselined in the same run and is **not** an instance of this
bug:

```
missions/MIS-118-agent-roster-replacement.md -> guilds/procuradores/roster.md
```

`MIS-118` is `status: done`. That line is retrospective narrative — it records
that the reference guard found a 6th live link *at that time*, under the name
the file carried *at that time*. The citation was correct when written and the
rename made it stale. Rewriting it to `GLD-008-roster.md` would state that the
2026-08-28 guard run found a file that did not yet bear that name.

That is a general consequence of `MIS-125`, not a defect: **every series
renamed will strand citations inside closed records that must not be
rewritten.** It needs its own ruling once the scale is known — see `MIS-125`
Stage C. This debt is only about citations that were *already* broken and read
as green.

## Scope — measured, not estimated

The 4 found are the ones a rename happened to expose. **The corpus has not
been swept for the rest.** Any citation whose folder path is wrong but whose
basename exists somewhere is currently invisible, and nothing has counted
them. The 4 are a lower bound.

## Resolution options, not yet ruled

1. **Two-tier resolution** — when a citation carries folder components, resolve
   the full relative path; fall back to basename only for a bare
   `filename.md`. Strictly better than today, and it would have caught all 4
   at `b7a2e39`. Cost: a sweep of the corpus first, since it will surface
   pre-existing breakage that must be baselined deliberately rather than in a
   panic.
2. **Report the ambiguity** — keep basename resolution, but warn when the
   captured path does not match the resolved file's actual location.
3. **Do nothing, knowingly** — accept it, with the blind spot declared in the
   script's output rather than only in its source comments (`D-025`'s rule).

Option 1 is the real fix. It is out of `MIS-125`'s scope: this mission renames
series, and rewriting the resolver mid-rename would mean changing the
measuring instrument during the measurement.

## What was done now

The 4 were **baselined, not rewritten.** They are historical records: two
`status: closed` blueprints describing an architecture that no longer exists,
and a `P-008` approval template quoting the migration proposal that deleted it.
Rewriting them to `guilds/*/GLD-NNN-charter.md` would edit a record of the past
to match the present — the failure `S-001` §2.1 calls out for `closed`
documents (*would a reader in a year be misled about what happened?*). They
correctly cite a path that no longer exists, because the document they sit in
describes when it did.

`scripts/references-baseline.json`: 347 → 351. Delta verified: exactly these
4 added, 0 removed.

## State

| | |
|---|---|
| Severity | medium — no data is wrong; the guard's assurance is narrower than it reads |
| Owner | Oracle |
| Opened | 2026-08-31, by `MIS-125` Stage C |
| Closes when | the resolver distinguishes a path citation from a basename citation, or the blind spot is declared in the guard's own output and accepted |
