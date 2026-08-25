---
id: "D-026"
uid:
title: "No file maps a git account to a declared role"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-25T13:23:15Z"
created_source: "git:d9ca672"
created_confidence: "exact"
updated: "2026-08-25T13:23:15Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, identity, authority, governance, D-019, D-011]
license: "CC-BY-4.0"
visibility: "public"
severity: medium
opened_by: "Oracle, 2026-08-25"
evidence_script: "git log --all --format='%an <%ae>'"
evidence_head: "8770939"
---
# D-026 — No file maps a git account to a declared role

> **Summary:** Seven identities have committed to this repository. Nothing in
> the corpus says which person or which role any of them is.
> **Epistemic:** Authorship is recorded; **authority is not**. Reconstructing
> who was allowed to do what requires asking a human.
> **Pragmatic:** It took a direct question to the Oracle to establish that two
> accounts named "Christian" were one person with the authority to edit canon.

## The finding

While auditing the 2026-04-15 canon deletion, the question *"did whoever did
this have authority?"* could not be answered from the repository.

```
Christian Märtens  christianmartens@numengames.com          2 commits
Christian Numinia  129116311+ChristianNumenGames@users.…    7 commits
```

Two accounts, similar names, and `canon/C-002-brand-and-culture.md:198` lists
**"Christian Martens | Oracle"** in a roles table — a third spelling, with no
account attached.

Git offered one clue and it was indirect: the commits signed *Märtens* arrived
via `Merge pull request #1 from Christian-Numen/patch-1`, a branch on the other
account's fork. **Consistent with one person and two accounts, and not proof of
it.**

The Oracle confirmed it: same person, two accounts, authority held. **That
confirmation exists in a conversation, not in the archive.**

## Every identity in the repository

| Account | Commits | Role, per the corpus |
|---|---:|---|
| `PabloFM <pablofmm@pm.me>` | 93 | Oracle *(not declared next to the account)* |
| `Centinela-01 <khepri@ai.numengames.com>` | 57 | agent — but `agents/` has **no `centinela-01`**; `MIS-089` renamed it Nimrod |
| `Ursa (agente) <ursa@numen.games>` | 30 | agent |
| `PabloFM <pablofm@numengames.com>` | 30 | same person as row 1 |
| `Christian Numinia <129116311+…>` | 7 | Oracle *(established by conversation)* |
| `Ursa <ursa-numinia@users.noreply…>` | 5 | same agent as row 3 |
| `María <149299859+MariaGarciaJordan@…>` | 2 | **unknown** — merged two canon PRs |

**Seven accounts, four or five actual identities, zero declared mappings.**

Two of these matter beyond bookkeeping:

- **`Centinela-01`** committed the ten seminal canon documents and is an agent
  name that **no longer exists** in `agents/`. A reader tracing the canon's
  provenance lands on an actor the archive does not describe.
- **`María`** merged the two pull requests that edited canon in May. Whether
  that was an approval within her authority is unknowable from here.

## Why this is the same hole as `D-019`

`D-019` says signatures are only verifiable by the person who makes them, and
proposes `allowed_signers` versioned in the repository.

**That file answers "is this signature genuine?" and not "whose is it, and what
may they do?"** A signature verified against a key nobody can attribute is a
cryptographic fact with no governance meaning.

The two entries want the same artefact from different sides:

| | `D-019` | `D-026` |
|---|---|---|
| Question | Is the signature genuine? | Who is this, and what may they do? |
| Needs | public key | account ↔ person ↔ role |

And `D-011` depends on both: a `sealed` threshold requiring "the Oracle's
signature" cannot be enforced while *"which accounts are the Oracle"* is not
written down.

## Proposed shape

One versioned file — `IDENTITIES.md` or a table in `GOVERNANCE.md` — with:

```
| Account (name + email)          | Person          | Role     | Since      |
|---------------------------------|-----------------|----------|------------|
| PabloFM <pablofmm@pm.me>        | Pablo FM        | Oracle   | 2026-04-02 |
| PabloFM <pablofm@numengames.com>| Pablo FM        | Oracle   | 2026-08-16 |
| Christian Numinia <129116311+…> | Christian M.    | Oracle   | 2026-04-14 |
| Christian Märtens <christian…>  | Christian M.    | Oracle   | 2026-05-06 |
| Centinela-01 <khepri@…>         | agent → Nimrod  | agent    | 2026-04-06 |
| Ursa (agente) <ursa@numen.games>| agent Ursa      | agent    | 2026-08-24 |
| María <149299859+…>             | ?               | ?        | 2026-05-06 |
```

**Retired identities stay**, with the date they stopped — `Centinela-01` must
remain resolvable or the canon's own provenance becomes unreadable.

**And the file is `sealed`**, for the same reason `D-019` gives for
`allowed_signers`: changing who is who is the change most in need of protection.

## Closure

Marked RESOLVED when:

- [ ] A versioned file maps every account that has ever committed to a person
      and a role, including retired ones
- [ ] `María`'s row is filled or explicitly marked unknown — a blank and an
      unknown must not look alike (`S-001` §5.0)
- [ ] The file is referenced from `GOVERNANCE.md`, which is where a reader
      looks for who may do what
- [ ] A guard checks that every author in `git log` appears in it

The fourth is what stops it going stale: today a new contributor can commit and
nothing notices they are unlisted — the same shape as `D-023`, where a new
series could appear and nothing noticed it was unpublished.

| | |
|---|---|
| Severity | medium — nothing broken; authority is unauditable from the repo |
| Owner | Oracle |
| Blocked by | nothing; `D-017` for the guard's CI step |
| Opened | 2026-08-25, at the Oracle's instruction |
| Closes when | identities are declared and a guard keeps the list complete |
