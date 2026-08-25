---
id: "D-031"
uid:
title: "Nothing verifies that an index reflects its own series"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-25T14:47:02Z"
created_source: "git:a87e551"
created_confidence: "exact"
updated: "2026-08-25T14:47:02Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, indexes, apparatus, guards, D-001, D-023, MIS-109]
license: "CC-BY-4.0"
severity: high
opened_by: "Oracle, 2026-08-25"
evidence_script: "reports/audits/evidence/index-coverage.py"
evidence_head: "60e2379"
---
# D-031 — Nothing verifies that an index reflects its own series

> **Summary:** An index is apparatus — regenerable from the documents it lists
> (`S-001` §3). Nothing checks that it was. **32 documents are missing from
> their series index**, and `blueprints/INDEX.md` lists 3 of 22.
> **Epistemic:** A document absent from its index is invisible to every reader
> who trusts the index — which is what an index is for.
> **Pragmatic:** `ADR-023` was signed on the authority of a document the canon's
> own index had not acknowledged for four months.

## The finding

The Oracle, on `MIS-109` phase C reporting three canon documents the index never
listed:

> *"The finding at the end is bigger than you say. I signed `ADR-023` relying on
> §2.3 of a document the canon's index had not recognised for four months. The
> ADR stands — the document exists and says what it says — but it is the third
> time today with the same shape: something that looks complete and is not.*
>
> *Debt of its own: nothing verifies that the apparatus reflects its records.
> An index is regenerable by definition (`S-001` §3) and still went four months
> without three documents. The guard is obvious and cheap — every file in a
> series appears in its INDEX — and goes with the others in `D-001`.*
>
> *And check the same in the other series before closing `MIS-109`: if
> `canon/INDEX.md` was three short, the others can be too."*

They are.

## Measured

`reports/audits/evidence/index-coverage.py`, `HEAD 60e2379`:

| Series | Files | **Missing** | Index |
|---|---:|---:|---|
| `canon/` | 10 | **0** | fixed in `MIS-109` phase C |
| `agents/` | 20 | **0** | — |
| `decisions/` | 12 | **1** | `ADR-023`, merged today |
| `blueprints/` | 22 | **19** | lists 3 of 22 |
| `reports/` | 18 | **12** | every audit, every daily report |
| **Total** | | **32** | |

And six series have **no index at all**: `missions/`, `protocols/`,
`standards/`, `operations/`, `guilds/`, `debt/`.

### `blueprints/INDEX.md` is the worst case, and it indicts itself

It lists `BP-cao`, `BP-business-metrics` and `BP-mission-system-v2`. Nineteen
others exist, including `BP-archive-fondos.md`, which the site reads at build
time to render `/archive`.

Its own instructions say:

> *"3. **Add to this INDEX**"*

The procedure was written, published, and not followed — by the same agents who
wrote it. That makes this a `D-021` case at the level of apparatus: **a rule
that does not apply itself to whoever writes it.**

### `reports/` is missing every report

Twelve absences including `RPT-2026-08-24` and `RPT-2026-08-25` — the session
reports written yesterday and today, each added to the corpus without touching
the index.

## Why it stays invisible

Same shape as `D-023` and `D-028`, and by now the pattern is the point:

| | Failure | Signal |
|---|---|---|
| `D-023` | A series never reaches the site | none — the build goes green with less to build |
| `D-028` | A page moves and its URL dies | none — the build goes green with a different URL |
| **`D-031`** | **A document is absent from its index** | **none — the index is valid markdown either way** |

An index cannot fail for what it omits. Nothing distinguishes *"this series has
three documents"* from *"this series has twenty-two and the index knows three"*.

## The guard, and it is genuinely cheap

```
scripts/check-index-coverage.mjs
  For each series folder holding an INDEX.md:
    every .md in the folder is mentioned by filename, stem, or id
    — or is listed in an `index_exempt:` block with a reason.
```

The detection already exists and ran to produce the table above. Five series
have an index today; the guard's cost is one script and one `ci.yml` line
(`D-017`).

**It cannot pass on day one**, so it needs the same treatment as the reference
lint: a baseline of the 32 known absences, which then only shrinks.

**And the exemption matters** — `reports/audits/evidence/` holds recovered
evidence that is deliberately not indexed. That must be declarable, not
achieved by omission (`S-001` §5.0).

## What this does not claim

`ADR-023` is not in doubt. `Pragmatic_Numen_System-v0.2.0.md` exists, has been
in `canon/` since 2026-04-15, and its §2.3 says what the ADR quotes. **The
defect is that the index did not list it, not that the document was invalid.**

Recorded because the opposite reading — *"a decision was made on a document that
was not really there"* — would be false and worse than the actual problem.

## Closure

Marked RESOLVED when:

- [ ] `check-index-coverage.mjs` exists, with a baseline of the 32 current
      absences and an `index_exempt` mechanism
- [ ] It runs as a step in `ci.yml`, verified by reading the step (`S-001` §10.3)
- [ ] The 32 absences are worked down, or declared exempt with a reason
- [ ] A decision on the six series with no index: they get one, or it is written
      down that they do not need one

The fourth matters more than it looks. `missions/` has 107 documents and no
index — which may be correct, since the site generates that listing, but nobody
has said so.

| | |
|---|---|
| Severity | **high** — 32 documents invisible to any reader trusting an index |
| Owner | Oracle |
| Blocked by | nothing; `D-017` for the CI step |
| Opened | 2026-08-25, at the Oracle's instruction during `MIS-109` |
| Closes when | indexes are verified against their series, or exemptions declared |
