---
id: "D-049"
uid:
title: "Guards read git ls-files, so a green local run can be blind to untracked new files"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-31T15:55:00+02:00"
created_source: "git:5ffd1eb"
created_confidence: exact
updated: "2026-08-31T15:55:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, guards, ci, baselines, D-039, MIS-125]
license: "CC-BY-4.0"
visibility: "public"
severity: medium
opened_by: "MIS-125 Stage C, CI failure on PR #163"
---
# D-049 — Guards read `git ls-files`, so a green local run can be blind to untracked new files

> **Summary:** `check-references.mjs` and `lint-naming.mjs` enumerate the
> corpus with `git ls-files '*.md'`. A file created but not yet `git add`ed is
> invisible to them. Running a guard — or worse, `--write-baseline` — before
> staging produces a green result and a baseline that omits the new file.
> **Epistemic:** the guard reports on the *index*, while the operator reads
> the result as a report on the *working tree*.
> **Pragmatic:** CI stages everything, so it sees what the local run did not.
> Green locally, red in CI, with no code difference between them.

## How it surfaced

`MIS-125` Stage C. `debt/D-047` and `debt/D-048` were written, then baselines
were regenerated, then everything was committed. All five guards reported exit
0 locally and the work was reported as verified.

CI failed on PR #163:

```
✗ 1 NEW broken reference(s):
    FILE debt/D-048-rename-tool-rewrites-mentions.md -> guilds/procuradores/roster.md
```

The baseline was written at `11:59:20Z`; `D-048` entered the index at commit
`5ffd1eb`, after that. At write time `git ls-files` did not list it, so its
contents were never scanned and its one legitimate mention — a quotation of
`MIS-118`'s narrative, cited *as an example of what must not be rewritten* —
was never baselined.

The same blindness hit `lint-naming.mjs`: `D-048` inherits `debt/`'s pending
`D-NNN` → `DBT-NNN` violation and was likewise missing from `naming-baseline`.
**CI never reported that second failure**, because the workflow runs under
`bash -e` and aborts at the first non-zero step — reference lint is step 3,
naming lint is step 6. One red check concealed two defects.

## Why the local re-run then failed too

Re-running the guard after committing reproduced the CI failure exactly. The
defect is not environmental and not a CI-only condition: it is **ordering**.
The guard is correct; the operator ran it at a moment when its input was
incomplete, and read exit 0 as a fact about the working tree.

## The rule this violates

`D-039`: *green does not mean correct; it means no instrument we own
disagreed.* Here the instrument was not even asked about the file in question.
This is the sharper form: **a guard cannot disagree about input it was never
given.**

## Scope

Any script that enumerates via `git ls-files`. Confirmed in
`check-references.mjs` (line 68) and `lint-naming.mjs`. Not audited across the
other guards; `count-evidence.py` is a likely instance and was not checked.

Everyday editing is unaffected — an *existing* tracked file's changes are
visible in the working tree regardless of staging. The blindness is specific to
**newly created files**, which is exactly the case where a new baseline entry
is most likely to be needed.

## Resolution options, not yet ruled

1. **Warn on untracked corpus files.** Have each guard run
   `git ls-files --others --exclude-standard '*.md'` and print a warning (or
   refuse `--write-baseline`) when any exist. Cheap, and would have caught this.
2. **Enumerate the working tree instead.** More honest, but changes what every
   baseline means and would sweep in scratch files.
3. **Procedure only.** Require `git add -A` before any guard run. Free, and
   relies on memory — which is what failed here.

Option 1 is the real fix: the guard should say what it could not see.

## Interim rule, in force now

**Stage first, then run guards, then commit.** A guard run before `git add` on
a change that creates files proves nothing about those files. For `MIS-125`
Stage C specifically, every series must be staged in full before its guards are
run and its baselines regenerated.

Additionally: **`gh pr checks` reports one failing step, not all of them.**
Under `bash -e` the first failure ends the job. Reproduce the *whole* workflow
locally — all steps, without `-e` — before concluding a single fix is enough.

## State

| | |
|---|---|
| Severity | medium — no corpus damage; it makes a verification claim false, which is worse than a visible failure |
| Owner | Oracle |
| Opened | 2026-08-31, by `MIS-125` Stage C, CI failure on PR #163 |
| Closes when | guards warn about untracked corpus files, or refuse `--write-baseline` while any exist |
