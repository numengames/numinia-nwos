---
id: "PRO-011"
uid: ""
title: "Security Audit — how an agent audits identity, authorization and secrets"
type: protocol
status: draft
version: "0.2.0"
created: "2026-08-21T07:35:05Z"
created_source: "git:b35ab06"
created_confidence: exact
updated: "2026-09-04T00:40:00+02:00"
author: "claude-opus-5"
owner: "oracle"
tags: [protocols, security, audit, credentials, secrets, identity, authorization]
license: "CC0-1.0"
review_next: "2027-08-21"
---
# PRO-011 — Security Audit

> **Summary:** How a security audit is scoped, executed, classified and closed.
> Reusable template: instantiate by filling the scope block.
> **Epistemic:** An audit measures the distance between what the documentation
> claims and what exists. It writes no doctrine and proposes nothing until it
> has measured.
> **Pragmatic:** Paste this to an agent with read access to the scope. It runs
> the census and the verification, then stops. Correction needs a signature.
> **Audience:** Agents · Oracle
> **Status:** DRAFT — awaiting Oracle signature. An audit run under it is
> valid; its correction phase is not.

---

## 1. Stop conditions

Read these first. If one occurs, **stop and ask** — do not keep censusing
around it.

1. **A real secret value becomes visible**, live or of unknown state.
2. **An irreversible action is within reach** — anything that revokes, deletes,
   rewrites history, changes visibility or publishes. When in doubt,
   irreversible.
3. **The brief does not match what you see** — the declared scope does not
   exist, or something much larger does. Say so before executing, not after.

---

## 2. Frame

The auditor measures. Two axes classify every finding: **identity** — who
someone is, one per subject, personal, not rotated on a calendar — and
**authorization** — what someone may do to a resource, many, organizational,
revocable without drama. Two secondary axes: human or machine, declared or
observed. The dangerous quadrant, where the forgotten door usually is, is
machine authorization with no declared owner.

**Burden of proof.** An audit that finds nothing is not suspect for finding
nothing; it is suspect if it cannot **show where it looked**. The deliverable
is coverage, not a count. Never inflate a finding to justify the session, and
never report as a finding a hypothesis without the command that sustains it —
that is an open question, and it has its own deliverable.

### Governing rules

- An untested backup is not a backup, it is a hope.
- A control declared and absent is worse than absent: it buys trust without
  giving protection.
- Asymmetric keys do not expire by age; they die by algorithm, by custody and
  by change of context. The question to ask of a key is never how old it is but
  **who has been able to copy it since it was born**.
- What no machine verifies is prose.
- A hole in the census is information, provided it is declared. A resource that
  was not inspected is listed as not inspected.
- Quarantine before deletion.

---

## 3. Cadence

**At least once a year**; the `review_next` field carries the next date and the
run that meets it updates the field. A run that skips the annual date is itself
a finding of the next one.

**Event triggers, which do not wait for the calendar:** before turning any
repository public; after any incident, including a false alarm; when a person
or agent leaves or changes role; when a new provider, worker, domain or
pipeline enters production; and when the base document adds or changes an
automated claim.

---

## 4. Scope of this run

```
Date:                [ YYYY-MM-DD ]
Scope:               [ repo / org / provider / machine / all ]
Systems:             [ enumerate ]
Base document:       [ whose claims are being contrasted ]
Audit credential:    [ type, permissions, expiry — the census's first finding ]
Out of scope:        [ enumerate explicitly ]
Previous audit:      [ id and date, or none — decides snapshot vs diff ]
Out-of-band channel: [ where a hot finding is reported — NOT this repository ]
```

**Denominator first.** Before censusing anything, enumerate the universe from
the API — not from memory, not from a summary panel — and publish the count.
Every box ticked afterwards counts against that denominator. Without a
denominator, "censused" means nothing.

**Sovereign scopes.** When the scope includes an NWOS repository belonging to
another organization, the audit produces an **offer**: findings and a proposed
remediation, addressed to that repository's owner. Never an order, and never a
correction executed there.

---

## 5. Phases

| Phase | What | Autonomy |
|---|---|---|
| A · declared census | what the systems and the documentation say exists | autonomous, **read-only** |
| B1 · passive verification | history scan, last use, declared against observed | autonomous, **read-only** |
| B2 · active tests | provoke each automatic control and watch it block | autonomous **only inside the allowlist below** |
| C · purge and correction | quarantine, revocation, re-verification | **requires a human signature — do not execute** |
| D · follow-up | diff against the previous run, a verdict for every prior finding | autonomous |

The gate before correction is hard: nothing irreversible without a signature.
The active phase does write, but only what one command undoes and what never
touches the trunk.

---

## 6. What to census

Adapt to the scope; the order runs from largest blind spot to smallest.

- [ ] **Account recovery** — recovery email, backup codes, recovery contacts,
      trusted devices. This is the real master key and appears in no secrets
      panel.
- [ ] **Machine authorizations** — deploy keys, pipeline tokens, service
      credentials, installed apps. Resource by resource; summary panels are not
      enough.
- [ ] **Agent credentials** — which keys the agents use, where they live, who
      rotates them, whether any is shared with a human.
- [ ] **Third-party authorizations** — connected apps, integrations, webhooks
      and their destinations.
- [ ] **DNS and domains** — dangling records, records pointing at resources no
      longer controlled, who holds the zone and the registrar account.
- [ ] **Signing keys** — and whether verification is required or merely
      available.
- [ ] **Human identities** — keys, members, outside collaborators, delegated
      access.
- [ ] **Billing and provider account** — who can spend, who can close it.
      Billing access is an authorization to destroy.
- [ ] **Declared secrets** — names and dates, **never values**, scoped per
      environment where the provider supports it.
- [ ] **Last use** of every credential. No recent use plus no owner is a
      candidate for purge, not for renewal.
- [ ] **Token hygiene** — fine-grained, minimum scope, expiry set, one token per
      purpose. One omni-purpose token is a finding on its own.
- [ ] **Declared controls** in the base document: does the artifact that
      implements each one exist, and has it ever been seen to block anything?

Every census row carries its **provenance**: exact command, date, credential
used. A row without provenance is a memory, and memories are not auditable.

---

## 7. Verification

**Passive.** Scan the **full history** of the repositories, not just the tip.
Take a **baseline of live flows** before touching anything — what deploys, what
publishes, what authenticates on its own — as a documented green with a date;
without it there can be no correction phase, because you would not know what
you broke. Look for divergences in **both directions**: declared and absent,
present and undocumented. For every automated claim in the base document, check
the file that runs it exists. Grep, not trust.

**Active.** A control not observed is not a control. Provoking one means
writing, so it is written **only like this**: a throwaway branch with a
reserved name, never the trunk; a **synthetic canary** of valid format and
non-existent value, generated on the spot and marked as such — never a real
secret, not redacted, not partial, not expired, because an expired real secret
still reveals structure and holder; the pull request closed without merge and
the branch deleted. If the control blocks, **record the literal block message**:
that is the evidence. If it does not block, **stop** — you already have the
finding, and pushing further turns a test into a breach. None of this happens
in a public repository without a prior signature: there the failed attempt
persists in the provider's logs and the canary can be indexed.

---

## 8. Hot finding

If a real secret value appears, the audit stops and an incident begins.

1. **Do not copy it anywhere** — not to the report, the census, the chat, not
   truncated. Reference it by location: file, commit, line. Never by value.
2. **Report through the out-of-band channel.** Never by issue, commit, pull
   request, or any surface of the repository itself.
3. **If the repository is or has ever been public, treat it as compromised.**
   Rotate first, clean history afterwards if at all: rewriting history revokes
   nothing and destroys the evidence.
4. **Do not rotate.** Prepare the list of what to rotate, in what order, and
   what each rotation breaks — then wait for a signature. An agent does not
   create, rotate or delete credentials, and this protocol does not lift that.
5. The incident gets its own document, outside the session report.

---

## 9. Prohibitions

- Do not revoke, delete or modify anything, however obviously it is garbage.
- Do not write secret values into any file, redacted or partial.
- Do not paste raw API output into the conversation unfiltered: **the
  transcript is itself a surface**, carrying token prefixes, addresses and
  identifiers.
- Do not execute the correction phase.
- Do not assume formats or conventions: read them from the repository.
- Do not chase findings outside the scope. Record them separately and follow
  them in another session; scope creep is what leaves audits half done.
- If an endpoint denies for permissions, **record it as a finding** — surface
  not censusable with this credential — rather than failing silently.

---

## 10. Output classification

Decide the tier before writing a file. The three are different and never share
a document.

| Tier | Contains | Where it lives |
|---|---|---|
| **Public** | findings, controls, doctrine gaps, scores; no resource identifiers, no addresses | this repository, committed |
| **Internal** | census with secret names, identifiers, last-use dates, addresses | private repository or encrypted store. **Never** a public one |
| **Hot** | anything from the hot-finding section | outside git, out-of-band channel |

Credentials, server addresses and personal data never enter this repository.
**If the scope has no destination for the internal tier, that is the audit's
first finding**, resolved before the census rather than after.

---

## 11. Deliverables

One set per run. Without documents, the audit is repeated whole in six months.

1. **Session report** — the story, filed under the reports series. For each
   finding: the four axes; **state** (live, doubtful, dead) and **severity**
   (blast radius if abused), which are distinct axes whose crossing sets the
   deadline; what breaks if it is revoked; what is proposed. Plus a **coverage**
   section: how many of the denominator were censused, and why the rest were
   not.
2. **Structured record** — the state, comparable between runs. Public tier only.
3. **Open questions** — what could not be verified, kept apart from what was. A
   suspicion inside the findings list is noise; in its own list it is the next
   session's agenda.
4. **Three scores out of ten**, justified by verified evidence, never
   impression, because they are three different problems with three different
   fixes: **doctrine** — is what is written correct and sufficient; **execution**
   — does what is written exist and work; **coverage** — how much of the scope
   could actually be looked at. Low coverage **caps** the other two rather than
   averaging with them: they are declared not yet trustworthy.

Anything submitted for Oracle review carries its canonical public address,
never a filesystem path.

**Finding identifiers** are `FND-YYYY-NN`, sequential per year, never reused,
kept for life. This is what lets the next run be a diff instead of a snapshot.
A finding that reveals the documentation contradicting reality gets both a
finding identifier in the report and a contradiction entry in the operations
register, cross-referenced: the finding closes when reality is fixed, the
contradiction when the document is.

---

## 12. Close

- [ ] Every credential found has a record, or is marked for purge. Nothing
      without an owner.
- [ ] Every finding of the previous run has a verdict: resolved, persists,
      returned, or reclassified. A finding without a verdict is still open.
- [ ] Every documentation correction ships with **the command that verifies
      it**, not just the corrected text.
- [ ] Every automated claim in the base document that turned out not to exist is
      **corrected in the document**, not merely noted in the report. Leaving it
      standing repeats the very sin the audit came to measure.
- [ ] New vocabulary coined during the session goes to the glossary while fresh.
- [ ] Test branches and canaries deleted.
- [ ] The audit credential, revoked.
- [ ] Commit at the right classification tier, naming the practice identifiers
      touched.
- [ ] `review_next` updated to the next run's date.

**First step of any run:** read the repository's formats and conventions,
declare the scope's denominator counted from the API, and wait for confirmation
before the full sweep.

---

## Version history

- v0.2.0 (2026-09-04) — Same procedure, a quarter fewer words. The phase and
  census structure is unchanged; what went is the restatement of rules the
  engineering and secrets standards already carry, the how-to-work section that
  repeated conventions binding every session, and the derivation note of the
  initial draft. Section-number pointers into other documents removed: they are
  coordinates that shift on the next edit.
- v0.1.0 (2026-08-21) — Initial draft.
