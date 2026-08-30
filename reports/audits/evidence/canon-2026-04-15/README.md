---
title: "Recovered: the canon version deleted on 2026-04-15"
type: documentation
status: closed
version: "1.0.0"
created: "2026-08-25T13:30:33+02:00"
created_source: "git:56f2b53"
created_confidence: exact
updated: "2026-08-25T13:30:33+02:00"
author: "pablofm"
owner: "oracle"
tags: [reports]
license: "CC-BY-4.0"
registration: exempt
registration_reason: "not part of a numbered series; header added from git history, nothing invented"
---

# Recovered: the canon version deleted on 2026-04-15

**What this folder holds.** A version of a canonical document that was deleted
from `canon/` and replaced sixty-three seconds later, with no ADR, no PR and no
version note. Recovered from git history at the Oracle's instruction on
2026-08-25:

> *"A canonical document that exists only in the reflog does not exist."*

## The file

```
Epistemic-relations-v1-deleted-2026-04-15.md
  13,422 chars · 74 lines
  sha256 319afae4cb8eed6b978c785b…
  recovered from  b202964^:"canon/Epistemic relations between Numen Games and Numinia.md"
```

## What happened, from git

```
2026-04-07 12:34  Centinela-01       canon: 10 seminal documents added
                                     → this file is one of them

2026-04-15 16:24  Christian Numinia  DELETE "Epistemic relations…md"
2026-04-15 16:25  Christian Numinia  ADD "2026_04_15-Epistemic_Relations…v0.2.0.md"
                                     ↑ 63 seconds apart
```

Both commits have a single parent: **direct pushes to `main`**, not a pull
request. The uploads were made through the GitHub web interface
(`Add files via upload`).

**Git does not record this as a rename** — the similarity index was too low.
To git these are an unrelated deletion and an unrelated creation, which is why
`git log --follow` on the current file shows one commit and no history.

## Why it matters, and why it is not a terminology dispute

The two versions differ by more than a rename:

| | v1 (deleted) | v2 (live) |
|---|---:|---:|
| Size | 13,422 chars | 15,619 chars |
| Lines | 74 | 67 |
| `operating system` | 7 | **5** |
| `Functional Model` | **8** | 0 |
| `Germinal Motive` | 0 | **8** |
| `Regulatory Model` | 0 | **7** |

**v2 keeps `operating system` in five places** while introducing
`Germinal Motive`. It is not a substitution: the new version uses **both terms,
in different senses** — `operating system` where something operates *within* it
(*"a gamified operating system permeated by narrative"*), `Germinal Motive`
where the subject is the origin of the model.

That is the distinction the Oracle drew independently on 2026-08-25, before
this version was recovered:

> *"Line 38 is origin — where everything is born. Line 105 is operation —
> something within which there are positions and purposes. An origin has no
> 'inside'; an operating system does. It was not a substitution left unfinished:
> they are two concepts that shared a phrase."*

**v2 got this right. `Welcome to Numinia.md` did not** — its May edit changed
two lines and left three, collapsing the distinction the new version had
already made.

## Status of this copy

**Evidence, not canon.** It is filed under `reports/audits/evidence/` and is not
part of the corpus: it does not carry frontmatter, is not registered, and must
not be cited as authority. It exists so the archive can answer *what did the
canon say before 2026-04-15* without depending on a git object nobody has
indexed.

Related: `AUD-2026-08-24-canon-edit.md` (the audit of the May edit),
`D-012` (the terminology split), `MIS-109`.
