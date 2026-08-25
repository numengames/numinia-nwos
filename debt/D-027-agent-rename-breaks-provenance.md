---
id: "D-027"
uid:
title: "Renaming a live agent broke the canon's provenance, and git cannot be corrected"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-25T13:30:05Z"
created_source: "git:c60a486"
created_confidence: "exact"
updated: "2026-08-25T13:30:05Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, agents, identity, provenance, immutable-history, D-026]
license: "CC-BY-4.0"
severity: high
opened_by: "Oracle, 2026-08-25"
evidence_script: "git log --all --author='Centinela-01'"
evidence_head: "8770939"
---
# D-027 — Renaming a live agent broke the canon's provenance

> **Summary:** `MIS-089` renamed the agent Centinela-01 to Nimrod. **57
> commits** — including the ten seminal canon documents — remain authored by a
> name the archive no longer uses, and git authorship cannot be rewritten.
> **Epistemic:** The first case in this corpus of **damage that cannot be
> repaired, only declared.** Every other finding has been fixable.
> **Pragmatic:** *"Who wrote the canon?"* returns an actor the archive does not
> present as current.

## The finding

The Oracle, on `D-026`:

> *"The reason is stronger than you say — `MIS-089` renamed the agent, but
> authorship in git is immutable. Renaming a live entity broke historical
> provenance irreparably, and it is the first time we see this pattern."*

Correct, and the word that matters is **irreparably**. Rewriting authorship
means rewriting every commit since 2026-04-06: new hashes, a broken signed tag,
and any clone or reference to the old hashes invalidated. **The cure destroys
more provenance than the disease.**

## Measured

```
57 commits authored by  Centinela-01 <khepri@ai.numengames.com>
   2026-04-06  feat: populate Archive Summa — complete initial structure
   2026-04-07  feat: canon — 10 documentos seminales añadidos al repo
   2026-04-07  feat: 48 misiones backlog completas con detalle
   2026-04-07  standards: tarjetas de contexto en 152 documentos
```

**The ten seminal canon documents were committed under this name** — including
`Welcome to Numinia.md`, corrected today under `ADR-023`.

## What the archive already does right

This entry is narrower than it first looked, because the alias **is** declared:

```
agents/nimrod/SOUL.md:12      alias: "Centinela-01"
agents/nimrod/MEMORY.md:28    - **Name:** Nimrod (alias: Centinela-01)
agents/nimrod/OPERATOR.md:60  - **Name:** Nimrod (alias: Centinela-01)
```

So a reader who **already knows** to look in `agents/nimrod/` finds the answer.
The failure is in the other direction.

## The failure is the reverse lookup

A reader starts from `git log` and has a name and an email:

```
Centinela-01 <khepri@ai.numengames.com>
```

- **`agents/INDEX.md` does not mention `Centinela-01`.** It lists Nimrod, and
  the index is where a reader looks first.
- **The email appears nowhere as an identity.** `khepri@ai.numengames.com` shows
  up in `agents/nimrod/MEMORY.md` only inside example commands
  (`gog gmail send --account khepri@…`), never as *"this account is Nimrod"*.
- Full-text search for `Centinela-01` returns three files, all of which require
  guessing the folder first.

**The identity is declared where you land, not where you start.** That is the
same shape as `D-023` and `S-001` §5.0: the information exists and does not
reach the reader who needs it.

## The rule, and it generalises past this case

The Oracle:

> *"An agent that has committed never loses its previous name. The new one is
> added; the old one stays declared in its record as historical identity."*

Written into `S-001` §5.2. It follows from something the archive already knows
and had not applied to actors: **git history is the one part of this repository
with a genuinely immutable threshold.** `S-001` §2.1 gives `canon/` the
strongest threshold and even that is `sealed`, not immutable — a signature and
an ADR can change it. Commit authorship cannot be changed at any price worth
paying.

So an agent's name is not a mutable attribute once it has committed. It is
**identity in the sense of `ADR-004`**: opaque, permanent, never reused. A
rename adds a name; it never replaces one.

## Closure

Marked RESOLVED when:

- [ ] `S-001` §5.2 carries the rule *(done 2026-08-25, in this branch)*
- [ ] `agents/INDEX.md` lists every historical identity alongside the current
      one, so the reverse lookup works from the index
- [ ] `agents/nimrod/SOUL.md` declares `khepri@ai.numengames.com` as a git
      identity, not only as an operational account
- [ ] `D-026`'s identity file includes retired names with the dates they were
      in use
- [ ] A guard checks that every author in `git log` resolves to an agent or a
      person — which is `D-026`'s fourth bullet, and closes both

## Not fixable, and that is the point

The 57 commits stay as they are. **This entry exists so that the gap is
declared rather than silently carried**, which is the only remedy available.

It is worth recording as the corpus's first instance of a class: **decisions
that cannot be undone by a later decision.** Renaming a folder is reversible.
Renaming an actor that has already acted is not — and nothing in `MIS-089`
suggested anyone knew that at the time.

| | |
|---|---|
| Severity | **high** — the canon's provenance points at an actor the index does not present |
| Owner | Oracle |
| Blocked by | nothing; `D-017` for the guard's CI step |
| Opened | 2026-08-25, at the Oracle's instruction |
| Closes when | the reverse lookup works and the rule is enforced |
