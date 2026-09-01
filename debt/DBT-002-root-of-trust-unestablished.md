---
id: "DBT-002"
uid:
title: "Root of trust: the archive's highest threshold rests on an unverifiable key"
type: documentation
status: active
version: "2.0.0"
created: "2026-08-24T20:05:00Z"
updated: "2026-08-31T23:20:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, governance, thresholds, signing, branch-protection]
license: "CC-BY-4.0"
visibility: "public"
visibility_reason: >
  Describes which controls are NOT enforced on `main`. The ruleset itself is
  readable via the public API, so this adds a reading, not a disclosure.
severity: high
opened_by: "STD-001 §2.1"
absorbs: ["D-011", "D-019", "D-020", "D-026"]
---
# DBT-002 — Root of trust: the archive's highest threshold rests on an unverifiable key

> **Summary:** `STD-001` §2.1 defines four change thresholds. To git they are the
> same file.
> **Epistemic:** Measures the distance between the ceremony the archive claims
> and the ceremony it can require.
> **Pragmatic:** Until this closes, `sealed` means "we agreed to be careful",
> not "the system will stop you".

## What replaced the false claim

The archive used to say `canon/` was immutable and a `done` mission was
immutable. **Both statements were false**, and the history proves it:

| Claim | Evidence against it |
|---|---|
| `canon/` "must not be modified" | 14 of 14 canon documents have >1 commit. `CAN-001-welcome-to-numinia.md`, edited 2026-05-06 by a third party: *"operating system"* → *"germinal motive"*, *"Functional Model"* → *"Regulatory Model"* |
| A `done` mission "is immutable" | 9 of 33 edited after being marked `done` |

Reproduce:

```bash
git log --follow -- "canon/CAN-001-welcome-to-numinia.md"
git show fee903b -- "canon/CAN-001-welcome-to-numinia.md"
```

`STD-001` §2.1 replaces immutability with **change thresholds** — `sealed`,
`governed`, `closed`, `open`. That is honest. It is also, today, unenforceable.

## The gap

| Threshold | What `STD-001` requires | What the system actually requires |
|---|---|---|
| `sealed` | Oracle's signature + ADR | a PR |
| `governed` | ADR or Oracle-approved PR | a PR |
| `closed` | substance untouched, form stated in the commit | a PR |
| `open` | a PR | a PR |

**Four thresholds, one enforcement.** Measured on 2026-08-24:

- Signed commits: **0** in the last 12 (one carries a bad signature)
- Signed tags: **0**. Tags in the repo: 1, unsigned
- Branch protection / ruleset on `main`: **not configured**
- CODEOWNERS: present, but review is not required by a ruleset

A `sealed` canon document and an `open` scratch file are, to git, the same
object with the same permissions.

## Partially closed — 2026-08-25: `main` now has a mechanism

Step 1 of the closing condition is **done**. Ruleset `protect-main` (id
`21281544`) is `active` on `~DEFAULT_BRANCH`, verified against the API and
exported to `infra/github/ruleset-protect-main.json`:

| Rule | State |
|---|---|
| `pull_request` | required — no direct push to `main` |
| `required_status_checks` | `build` + `Workers Builds: numinia-nwos` |
| `required_linear_history` | required |
| `non_fast_forward` | required |
| `deletion` | blocked |
| **`bypass_actors`** | **empty — including administrators** |

**The empty bypass list is the part that matters.** The closing condition asked
for *"include administrators"*, and a ruleset with an admin bypass would have
satisfied the letter while leaving the rule optional for the one account most
able to skip it. Nobody bypasses this one.

So the four thresholds are no longer *equally* unenforced. Every change to
`main` — `sealed` or `open` — now needs a PR whose build and deploy pass. That
is a floor under all four, not a distinction between them.

### What is still open, and it is the distinguishing half

The ruleset makes the archive **harder to change carelessly**. It does not yet
make `sealed` mean anything different from `open`:

| Threshold | `STD-001` §2.1 requires | The system requires today |
|---|---|---|
| `sealed` | Oracle's signature + ADR | a PR with green checks |
| `governed` | ADR or Oracle-approved PR | a PR with green checks |
| `closed` | substance untouched, form stated | a PR with green checks |
| `open` | a PR | a PR with green checks |

Two mechanisms remain, and neither is the agent's to install:

**2 · Agent commit signing.** Not enabled, and enabling `require signed commits`
today would lock the agent out entirely: its commits are
`verified: false, reason: unsigned`. The signatures that appear on `main` are
GitHub's web-flow key, applied when the Oracle squash-merges from the web —
they attest the merge, not the authorship. **That is `D-019`, and this entry
defers to it rather than duplicating it.**

**3 · CODEOWNERS review.** `.github/CODEOWNERS` exists; no rule requires it.
Until `require_code_owner_review` is on, a change to `canon/` needs the Oracle
by memory, not by mechanism — which is exactly what this debt is about.

Step 4 — a guard failing a `canon/` PR with no matching ADR — remains the
agent's, and remains worthless before step 3.

## Closing condition

Marked RESOLVED when a change to a `sealed` document **cannot** land without the
ceremony `STD-001` §2.1 describes. Concretely:

1. ~~**Ruleset on `main`** — require PR, require signed commits, require linear
   history, **include administrators**.~~ **DONE 2026-08-25**, except the
   signing half: PR, linear history, status checks and an empty bypass list are
   active (`infra/github/ruleset-protect-main.json`). Signing moves to step 2.
2. **Commit signing** for every author with push, human or agent. **Open** —
   agent commits are unsigned; see `D-019`.
3. **CODEOWNERS entry for `canon/`** with review required by the ruleset, so a
   `sealed` change needs the Oracle by mechanism rather than by memory.
   **Open** — the file exists, the rule does not require it.
4. Optional, once 1–3 exist: a guard that fails a PR touching `canon/` without a
   corresponding ADR in the same PR. **Open.**

Steps 1–3 are the Oracle's; step 4 is the agent's and is worthless before them.

## Why this is high severity

The other debts are gaps between a rule and the data. This one is a gap between
**a rule and the ability to have any rule at all**. While it stays open, every
threshold in `STD-001` §2.1 is a statement of intent — which is fine, as long as
the document says so, and it does.

## State

| | |
|---|---|
| Severity | **high** — governs whether any other rule can be enforced |
| Owner | Oracle |
| Blocked by | requires repo admin; the agent has neither admin nor `workflow` scope |
| Opened | 2026-08-24, by `STD-001` §2.1 |
| Closes when | a `sealed` change cannot land without its ceremony |

---

## Absorbed: `D-019` — Signatures can only be verified by the person who makes them

> Merged into `DBT-002` on 2026-08-31 under `ADR-030`. The identifier `D-019`
> keeps resolving to this document via `absorbs:`; its evidence is preserved
> verbatim below, only its heading levels are demoted.

> **Summary:** `pre-restructure-2026-08-24` is signed. Nobody but the signer can
> verify it, because the public key lives only on his machine.
> **Epistemic:** A control verifiable only by whoever exercises it is not a
> control.
> **Pragmatic:** The `sealed` threshold has a mechanism now, and that mechanism
> is not auditable.

### How this was found

The agent reported it as a limitation of its own environment:

> *"I cannot verify the signature myself — `allowedSignersFile` is not
> configured. That is machine configuration, not repository configuration."*

The Oracle corrected it:

> *"`allowedSignersFile` does not have to be my machine's configuration. It
> should live in the repository. If only I can verify my signatures, the
> `sealed` threshold is not auditable — and that is the half of `D-011` neither
> of us had seen."*

The correction is right, and the framing is the finding. The agent had treated
an **auditability gap** as an environment quirk and moved on.

### What exists and what does not

**Exists.** `pre-restructure-2026-08-24`, an annotated tag on `9b45016`, signed
by `PabloFM <pablofm@numengames.com>`. This is real progress: before it, `main`
carried zero signed objects.

**Does not exist.** Any way for a third party — another agent, a future
contributor, a clone — to check it:

```
$ git tag -v pre-restructure-2026-08-24
error: gpg.ssh.allowedSignersFile needs to be configured
       and exist for ssh signature verification
```

The signature is present. The means of checking it are not in the repository.

### Why this is worse than an inconvenience

`STD-001` §2.1 defines `sealed` as *"Oracle's signature + an ADR recording the
reason"*. `D-011` records that the four thresholds had no mechanism at all.

The tag closes half of that. **This entry is the other half:** a signature that
only its author can verify proves authorship to its author. To everyone else it
is an opaque blob. The archive can now say *"this was signed"* and cannot yet
say *"and here is how you check that."*

### The Oracle's proposal, recorded as the fix

1. **A versioned file** in the repository — e.g. `.github/allowed_signers` —
   holding the operator's signing public key and operator email.
2. **`git config gpg.ssh.allowedSignersFile <path in repo>`**, documented where
   a reader will find it: the README, or the protocol that governs signing.
3. **Anyone who clones can verify.** That is the whole point: the control stops
   depending on the controller.
4. **Migration to hardware adds a line, it does not invalidate history.** When
   the YubiKey (`sk_yk1`, see `D-020`) takes over, a second entry is appended.
   Signatures made with the software key stay verifiable — which is the property
   `sealed` needs, since a restore point that stops verifying after a key
   rotation is not a restore point.

### Context, recorded so the zero is not misread

Until 2026-08-24 there was **no signing identity configured on the Oracle's
machine and no local clone of the repository**. The "zero signed commits"
measured in `D-011` and in `AUD-2026-08-24-phase0` was not a lapse in
discipline — it was not possible. Operator identity
`pablofm@numengames.com` is now configured, scoped to this repository only.

### Closing condition

Marked RESOLVED when the allowed-signers file is versioned, the configuration
step is documented, and a third party — the agent will do — can run
`git tag -v` on a fresh clone and get a good signature.

### State

| | |
|---|---|
| Severity | high — `sealed` has a mechanism that cannot be audited |
| Owner | Oracle |
| Blocked by | nothing; the file can be added today |
| Opened | 2026-08-24, by the Oracle, correcting the agent |
| Closes when | a fresh clone can verify the tag |

---

## Absorbed: `D-020` — The sealed threshold rests on a software key; hardware exists and is decided

> Merged into `DBT-002` on 2026-08-31 under `ADR-030`. The identifier `D-020`
> keeps resolving to this document via `absorbs:`; its evidence is preserved
> verbatim below, only its heading levels are demoted.

> **Summary:** Signing works, with a key whose private half sits on disk. A
> YubiKey (`sk_yk1`) exists whose private half cannot be extracted.
> **Epistemic:** States the strength of the mechanism the archive's highest
> threshold currently depends on.
> **Pragmatic:** Migration is decided, not deferred indefinitely. This entry
> holds it to that.

### The gap

`STD-001` §2.1 defines `sealed` — `canon/` and restore-point tags — as requiring
the Oracle's signature. That signature is currently produced by a software key:
the private half is a file, readable by anything running as its owner.

`sk_yk1` exists. Its private half **cannot be extracted from the device**;
signing requires physical presence. That is the difference between "a key the
Oracle has" and "a key only the Oracle can use".

For `canon/` and for restore-point tags — the two things the archive would need
in the worst case — the second is the correct guarantee.

### What was decided

**Migration, not evaluation.** The Oracle's ruling, 2026-08-24: `canon/` and
restore-point tags will be signed with hardware. This entry exists so the
decision does not quietly become a preference.

### What it depends on

`D-019` first, and in that order deliberately. The allowed-signers file must be
versioned **before** the key changes, so the migration is *appending a line* to
a file that already exists rather than introducing the whole mechanism at the
moment the key rotates.

Done in that order, signatures made with the software key remain verifiable
after the migration — which `sealed` requires, since a restore point that stops
verifying after a rotation is not a restore point.

### Scope, stated so it is not over-read

This is **not** a finding that the current signature is invalid.
`pre-restructure-2026-08-24` is a real signature and a real improvement over the
zero that preceded it. A software key is a weaker guarantee than hardware; it is
not an absent one.

### Closing condition

Marked RESOLVED when `canon/` changes and restore-point tags are signed with
`sk_yk1`, the allowed-signers file carries both keys, and the previous
signatures still verify.

### State

| | |
|---|---|
| Severity | medium — the mechanism works; its guarantee is weaker than the threshold implies |
| Owner | Oracle |
| Blocked by | `D-019` — allowed-signers must be versioned first |
| Opened | 2026-08-24, by the Oracle |
| Closes when | hardware signs canon and tags, with history still verifiable |

---

### Note: the cosmetic item is not filed separately

The Oracle also reported that his signing key's comment carries a personal
email, visible on every verification, and rated it *"cosmetic, no hurry"*.

It is not given its own entry. It is one line of the same file `D-019` creates,
and filing a separate debt for it would cost more attention than the fix. It is
recorded here: **when the allowed-signers file is written, use the operator
identity `pablofm@numengames.com`, not the key's embedded comment.**

---

## Absorbed: `D-026` — No file maps a git account to a declared role

> Merged into `DBT-002` on 2026-08-31 under `ADR-030`. The identifier `D-026`
> keeps resolving to this document via `absorbs:`; its evidence is preserved
> verbatim below, only its heading levels are demoted.

> **Summary:** Seven identities have committed to this repository. Nothing in
> the corpus says which person or which role any of them is.
> **Epistemic:** Authorship is recorded; **authority is not**. Reconstructing
> who was allowed to do what requires asking a human.
> **Pragmatic:** It took a direct question to the Oracle to establish that two
> accounts named "Christian" were one person with the authority to edit canon.

### The finding

While auditing the 2026-04-15 canon deletion, the question *"did whoever did
this have authority?"* could not be answered from the repository.

```
Christian Märtens  christianmartens@numengames.com          2 commits
Christian Numinia  129116311+ChristianNumenGames@users.…    7 commits
```

Two accounts, similar names, and `canon/CAN-002-brand-and-culture.md:198` lists
**"Christian Martens | Oracle"** in a roles table — a third spelling, with no
account attached.

Git offered one clue and it was indirect: the commits signed *Märtens* arrived
via `Merge pull request #1 from Christian-Numen/patch-1`, a branch on the other
account's fork. **Consistent with one person and two accounts, and not proof of
it.**

The Oracle confirmed it: same person, two accounts, authority held. **That
confirmation exists in a conversation, not in the archive.**

### Every identity in the repository

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

### Why this is the same hole as `D-019`

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

### Proposed shape

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

### Closure

Marked RESOLVED when:

- [ ] A versioned file maps every account that has ever committed to a person
      and a role, including retired ones
- [ ] `María`'s row is filled or explicitly marked unknown — a blank and an
      unknown must not look alike (`STD-001` §5.0)
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

---

## Renumbering note, 2026-08-31

This document was `D-011`, and absorbs `D-019`, `D-020`, `D-026`. The `D-` series
was closed and renumbered densely to `DBT-NNN` under `ADR-004` rule 4 and
`ADR-005` v1.1.0 — see `RPT-001` §12. No `D-` number is reused.
