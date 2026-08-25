---
id: "MIS-TEMPLATE-CHANGES"
title: "What changed in the mission template, and the figures that decided it"
type: standard
status: active
version: "2.0.0"
created: "2026-08-25"
updated: "2026-08-25"
author: "ursa"
owner: "oracle"
tags: [missions, template, standards]
license: "CC-BY-4.0"
---
# The mission template, v2 — what changed and why

> **Summary:** the template was rebuilt against the 106 missions in the repo.
> **Epistemic:** every change here carries the figure that decided it. Nothing
> was retired on taste.
> **Pragmatic:** what to fill in, what to omit, and what no longer exists.

`ROOT = numengames/numinia-nwos · main` · `HEAD = f7a65f5` · 2026-08-25
Instrument: `salida/sesion-2026-08-25-fase0-websync/medir-template.py`

---

## The finding that ordered the redesign

**The template omitted exactly the four fields the build verifies, while
declaring two that nothing uses.**

| Field | In missions | In the Zod schema | In the old template |
|---|---:|---|---|
| `guild` | **106 / 106** | yes | **no** |
| `effort` | **106 / 106** | yes | **no** |
| `area` | **104 / 106** | yes | **no** |
| `type_execution` | **88 / 106** | yes | **no** |
| `executor` | 1 / 106, **0 useful** | no | yes |
| `divergence_log` | 6 / 106, **0 useful** | no | yes |

This is not a list of fields to adjust. **It is a mould pointing at the wrong
place**: it described a system that does not exist and ignored the one that
does. A mission written strictly to the old template failed the build.

---

## The frontmatter core: the ten fields the build checks

`web/src/content.config.ts` declares a Zod schema for the `missions`
collection: `id`, `title`, `status`, `priority`, `effort`, `guild`, `area`,
`type_execution`, `assigned_to`, `completed`.

They are the core because **they are the only part of this template with a
mechanism**. A missing or mistyped field fails `npm run build`. Everything
else in this document — including all three body sections — is convention.

`type: mission` is added: not in the schema, but every document in the archive
declares its type (`S-001` §5).

### Retired, with figures

```bash
for c in executor divergence_log mission_id; do
  echo "$c: $(grep -lE "^$c:" missions/MIS-*.md | wc -l) of 106"
done
```

| Field | Figure | Why |
|---|---|---|
| `executor` | **1 appearance, 0 useful** in 106 | Duplicates `assigned_to`. One mission carries it and it is empty. |
| `divergence_log` | **6 appearances, 0 useful** in 106 | Always `null`. What it wanted lives in `## Closure`, as prose. |
| `mission_id` | **58 of 106, identical to `id` in 58/58** | Verified: zero cases where they differ. Two names for one value. |

---

## The body: three sections

**`Scope` · `Acceptance criteria` · `Closure`**

### `Story` → optional, replaced by `Scope`

`Story` is at 80% and `Scope` at 11 organic uses — and the higher number is the
weaker argument. `Story` is at 80% because the template imposed it; `Scope` is
at 11 because people wrote it **without being asked**.

`MIS-109`, the best-executed mission in the repository, **has no `Story`**. For
a small technical mission the ágil form obliges inventing a fictional persona
to say *"take `debt/` out of the glob"*.

`Story` stays available for product missions and anything with a real user.

### `Execution Reality` → `Closure`

**16 uses against 7.** `S-001` §2.1.1: the practice is the record, the template
is the claim. When they disagree, the practice wins.

What `Execution Reality` asked for is kept **inside** `Closure` — what was done
differently from the plan and why. The heading changes; the content that
produces knowledge does not.

### The five headings, and the instrument that was wrong

The first measurement said **Execution Reality: 20% of closed missions**, which
reads as *"nobody closes their missions"*. **That conclusion was false, and it
would have produced the wrong redesign.**

The control: of the 25 closed missions without `Execution Reality`, **18 record
their closure under a different heading**.

```
16  Closure (2026-08-17)      6  Real execution      5  What shipped
 7  Execution Reality         3  Premisas verificadas
```

**Only 7 of 34 closed missions leave no closure record at all.** The promise was
not being broken — the heading the template proposed was the least used of the
five.

**A reader opening an old mission should know that a different heading does not
mean different content.** The five are historical variants of the same section;
`Closure` is the canonical name from now on.

### `Context` → frontmatter, not a section

Used 12 times as a dated heading (`Context (2026-08-18)`). It is data — when the
premise was last checked — so it becomes an optional field.

---

## `Epistemic value`: optional, and with a method

At **38% in closed missions**. Mandatory in a one-afternoon mission it becomes
filler, and filler trains people to skip sections — the same mechanism as an
allow-list entry that outlives its case.

So: **only when the mission claims it learns something**, and then with a
hypothesis and how it is validated. An epistemic value with no method is an
intention.

## What did not come in

`Mission_Template_v0_2_0.md` and `Definition_of_Done_v0.2.0.md` live in
`numinia-web/docs/`, not in this repo. The DoD has **14 checkboxes**, and they
are the acceptance criteria of a TypeScript codebase: *"`packages/*`: 100%
statement coverage"*, *"`npm run verify` green"*, *"no `any`, no `console.*`,
components ≤ 200 lines"*, *"every interactive element carries `data-metric`"*.

**None of the 14 can be ticked on a documentary mission.** A template whose
boxes nobody can tick trains people to skip boxes, and from there no box means
anything.

What v0.2.0 got right — the hypothesis with a validation method — is kept, as
an optional section rather than a mandatory one.

Note: both files carry a version in the filename, which `S-001` §9 marks as a
naming violation (`S-001:1015`). This template does not repeat that pattern: it
stays `missions/TEMPLATE.md`, and git carries its history.

---

## Pending, not debt

**The 106 existing missions are not touched**, not even to normalise them. The
new template governs the ones that come. Normalising 106 documents is a mission
of its own, and it should be weighed against what it would produce: the five
closure headings are already documented above, so a reader is not lost without
it.
