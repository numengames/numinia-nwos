---
id: "MIS-134"
former_id: "PROP-closure-guard"
uid: ""
title: "Proposal: a guard that fails a done mission with no Closure section"
status: todo
priority: medium
effort: S
guild: "Sentinels"
territory: "Archive"
type_execution: digital
assigned_to: null
completed: null

type: mission
version: "1.2.0"
created: "2026-08-25T18:05:01Z"
created_source: "git:c2ee691"
created_confidence: exact
updated: "2026-09-02T01:55:26+02:00"
author: "ursa"
owner: "oracle"
tags: [missions, guards, proposal, D-017]
license: "CC0-1.0"
former_id_note: "Registered 2026-09-02 as a mission (missions/ normalisation): it was a proposal filed in missions/ under an unregistered prefix, exempt from the series it sat in. Its text is the brief; status todo; nothing in it was implemented. Body unchanged."

---
# Proposal — a closure guard for missions

> **Summary:** a check that fails when a mission with `status: done` carries no
> closure section. **Proposed, not implemented.**
> **Epistemic:** measured against the 34 closed missions before writing a line
> of it, because the figure decides whether it can exist at all.
> **Pragmatic:** the numbers below say it must be tolerant, not strict.

`ROOT = numengames/numinia-nwos · main` · `HEAD = f7a65f5` · 2026-08-25

## What it would check

One rule: **a mission whose `status` is `done` has a closure section with
content.**

Nothing else. Not `Scope`, not `Acceptance criteria` — those matter while the
mission is open, and a guard that checks them fails every draft, which is
noise. Closure is the one thing that is verifiable precisely because `done` is
a declared state in the frontmatter the build already validates.

## The figure that decides its shape

```bash
python3 - <<'PY'
import re, glob
STRICT  = re.compile(r'^## Closure', re.M)
TOLERANT = re.compile(r'^## (Closure|Execution Reality|Real execution|'
                      r'What shipped|Premisas verificadas)', re.M | re.I)
done = [(f, open(f).read()) for f in sorted(glob.glob('missions/MIS-*.md'))
        if re.search(r'^status:\s*["\']?done', open(f).read(), re.M)]
print(len(done), 'done')
print(sum(1 for f, t in done if not STRICT.search(t)),   'fail strict')
print(sum(1 for f, t in done if not TOLERANT.search(t)), 'fail tolerant')
PY
```

```
34  missions with status: done
30  would fail a STRICT guard (## Closure only)
10  would fail a TOLERANT guard (the five historical headings)
```

**A strict guard is not viable.** It would be born failing 30 of 34 — 88% — and
a permanently red guard stops being a guard: it trains everyone to ignore it,
and the day it fires for something real nobody looks. The same mechanism as an
allow-list whose entries outlive their case.

**The tolerant guard fails 10.** Still red on day one, but a tenth of the size
and every case is a genuine gap rather than a naming difference.

## The false positives, named

Ten missions are `done` with no closure section under any of the five headings:

```
MIS-011  MIS-038  MIS-042  MIS-047  MIS-063
MIS-072  MIS-073  MIS-075  MIS-076  MIS-109
```

**`MIS-109` is on that list, and it is the best-executed mission in the
repository.** It closed today, with its work verified and merged. It records
its outcome in prose under other headings (`Order`, `Preconditions`, `Scope`)
and never opens a section called anything the guard would recognise.

That is the honest cost of this guard, stated up front: **it would fail the
mission we would hold up as the example.** Either the rule is wrong, or
`MIS-109` genuinely lacks a closure record and the guard is right — and that is
the Oracle's judgement, not mine.

## So it needs an allow-list, and here is its shape

Same discipline as the orphan-content guard: **every entry carries a reason and
a date**, printed on each run, so the list reads as a register of what is owed
rather than as configuration nobody revisits.

```js
// Missions closed before the closure section was canonical (2026-08-25).
// Each entry states why it is exempt. An entry with no reason is a bug.
const GRANDFATHERED = new Map([
  ["MIS-109", { since: "2026-08-25",
    reason: "Closed 2026-08-25. Records its outcome under Order/Preconditions; predates the canonical heading." }],
  // …the other nine, each with its own line
]);
```

**Ten entries is a lot for an allow-list.** The alternative is to accept the
guard runs only on missions created after a date:

```js
if (created < "2026-08-25") return;   // the ratchet, without a list
```

That is smaller, honest, and self-expiring — but it silently exempts anything
old, which is exactly the class of blindness `D-025` records. **The list is more
work and says more. The date is less work and hides more.** Both are defensible;
the choice is the Oracle's.

## Cost

| | |
|---|---|
| Where | `scripts/check-mission-closure.mjs`, alongside the other guards |
| Runtime | reads 106 markdown files. Milliseconds. No dependencies. |
| CI | one step in `ci.yml` — **`D-017`: the Oracle pastes, not me** |
| Day-one state | red on 10 missions unless allow-listed or date-gated |
| Blind to | whether the closure section says anything true. It checks presence and non-emptiness, nothing more. Stating this per `D-025`: a guard should declare what it cannot see. |

## What it does not solve

It cannot check that `Closure` records *what diverged from the plan* — the
paragraph that produces knowledge. That is prose, and no regex reads meaning. A
mission can satisfy this guard with one useless line.

So its real value is narrow and worth saying plainly: **it prevents a mission
being marked `done` while leaving no trace at all** — the 7 of 34 cases the
measurement found. It does not raise the quality of the other 27.

## Not implemented

No file was written. This document is the proposal; the Oracle decides whether
it exists, and in which of the two shapes.

## Status check — 2026-09-02

*Read against `203267c` during the missions/ normalisation (lot 4). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** Was PROPOSAL-closure-guard (2026-08-25): a guard failing done missions without a Closure section, measured then as 'must be tolerant'. Today: 30 of 52 done missions carry no filled Closure (this normalisation's census). D-017/D-025 it cites were absorbed into DBT-010/ADR-030.
- **Recommendation:** Keep todo; the proposal's own numbers now argue for it as a ratchet (baseline the 30, fail on new). Cheap, one script in the lint-frontmatter pattern; MIS-121's instrument.

## Version history

- v1.2.0 (2026-09-02) — import-era `---` rules removed; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 4.
