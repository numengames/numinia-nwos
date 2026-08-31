---
id: "PRO-011"
title: "Security Audit — how an agent audits identity, authorization and secrets"
type: protocol
status: draft
version: "0.1.0"
created: "2026-08-21T07:35:05Z"
created_source: "git:b35ab06"
created_confidence: exact
updated: "2026-08-25T11:00:28Z"
author: "claude-opus-5"
owner: "oracle"
tags: [protocols, security, audit, credentials, secrets, identity, authorization]
license: "CC-BY-4.0"
review_next: "2027-08-21"
---
# P-011 — Security Audit (v0.1.0, draft)

> **Summary:** How a security audit is scoped, executed, classified and closed
> in NWOS. Reusable template: instantiate by filling the `[ ]` fields of §4.
> **Epistemic:** An audit measures the distance between what the documentation
> claims and what exists. It does not write doctrine — there already is doctrine
> — and it proposes nothing until it has measured.
> **Pragmatic:** Paste this document to an agent with read access to the scope.
> It runs phases A → B and stops. Phase C needs a signature.
> **Audience:** Agents · Oracle
> **Status:** DRAFT — awaiting Oracle signature. Until signed, an audit run
> under it is valid; its phase C is not.

---

## 0. Stop conditions

Read these before anything else. If one occurs, **stop and ask**. Do not keep
censusing around it.

1. **Hot finding** — a real secret value, live or of unknown state, becomes
   visible (§8).
2. **An irreversible action is within reach** — anything that revokes, deletes,
   rewrites history, changes visibility or publishes. `engineering-standards.md`
   §7 already classifies these: when in doubt, irreversible.
3. **The brief does not match what you see** — the declared scope does not
   exist, or something much larger does. Say so before executing, not after
   (AGT-01: audit the state before assuming anything).

---

## 1. Frame

The auditor measures. Two axes classify every finding:

- **Identity** — who someone is (person or agent). One per subject, personal,
  not rotated on a calendar.
- **Authorization** — what someone may do to a resource. Many, organizational,
  revocable without drama.

Two secondary axes: **human / machine**, and **declared / observed**.

The dangerous quadrant, where the forgotten door usually is: *machine
authorization with no declared owner*.

**Burden of proof.** An audit that finds nothing is not suspect for finding
nothing; it is suspect if it cannot **show where it looked**. The deliverable is
coverage, not a count. Never inflate a finding to justify the session, and never
report as a finding a hypothesis without the command that sustains it — that is
an **open question**, and it has its own section in the report (§11.3).

---

## 2. Cadence

- **At least once a year.** `review_next` in this document's frontmatter carries
  the next date; the run that meets it updates the field.
- **Event triggers**, which do not wait for the calendar:
  - Before turning any repository public (LEG-01 — the audit is part of the gate).
  - After any incident, including a false alarm.
  - When a person or an agent leaves, or changes role.
  - When a new provider, Worker, domain or CI pipeline enters production.
  - When the standards document adds or changes a `[AUTO]` claim (§7.1).

A run that skips the annual date is itself a finding of the next one.

---

## 3. Governing rules

- *An untested backup is not a backup, it is a hope.* Nothing is taken as given.
- *A control declared and absent is worse than absent*, because it buys trust
  without giving protection.
- *Asymmetric keys do not expire by age*, but they die by algorithm, by custody
  and by change of context. Bearer tokens do expire. So the question to ask of a
  key is never "how old is it?" but "who has been able to copy it since it was
  born?".
- *What no machine verifies is prose.*
- *A hole in the census is information*, not a failure of the audit — provided
  it is declared. A resource that was not inspected is listed as not inspected
  (the rule MIS-103 already set for the repository inventory).
- Quarantine before deletion. Decide fast without fear of breaking.

---

## 4. Scope of this run

```
Date:              [ YYYY-MM-DD ]
Scope:             [ repo / org / provider / machine / all of the above ]
Systems:           [ enumerate ]
Base document:     [ the standard or corpus whose claims are being contrasted ]
Audit credential:  [ type, permissions, expiry — it is the census's first finding ]
Out of scope:      [ enumerate explicitly ]
Previous audit:    [ ID and date, or "none" — decides snapshot vs diff ]
Out-of-band channel: [ where a hot finding is reported — NOT this repository ]
```

**Denominator first.** Before censusing anything, enumerate the universe from
the API — not from memory, not from a summary panel — and publish the count:
*N repos, M Workers, K tokens*. Every box ticked afterwards counts against that
denominator. Without a denominator, "censused" means nothing.

**Sovereign scopes (G-12).** When the scope includes an NWOS repository of
another organization, the audit produces an **offer**: findings and a proposed
remediation, addressed to that repository's owner. It never produces an order,
and it never executes phase C there.

---

## 5. Phases

| Phase | What | Autonomy |
|---|---|---|
| A · Declared census | What the systems and the documentation say exists | Autonomous, **read-only** |
| B1 · Passive verification | History scan, last use, declared↔observed contrast | Autonomous, **read-only** |
| B2 · Active tests | Provoke each automatic control and watch it block | **Autonomous only inside the §7.2 allowlist** |
| C · Purge and correction | Quarantine, revocation, re-verification | **Requires human signature. Do not execute.** |
| D · Follow-up | Diff against the previous run; a verdict for every prior finding | Autonomous |

The gate between B2 and C is hard. Nothing irreversible without a signature
(escalate per P-005). B2 does write, but only what one command undoes and what
never touches `main`.

---

## 6. What to census

Adapt to the scope; the order runs from largest blind spot to smallest.

- [ ] **Account recovery** — recovery email, 2FA backup codes, recovery
      contacts, trusted devices. This is the real master key and it appears in
      no "secrets" panel.
- [ ] **Machine authorizations** — deploy keys, CI tokens, service credentials,
      installed apps. Resource by resource; summary panels are not enough (SEC-04).
- [ ] **Agent credentials** — which keys the agents operating here use, where
      they live, who rotates them, and whether any is shared with a human.
- [ ] **Third-party authorizations** — OAuth apps, integrations, webhooks and
      their destinations.
- [ ] **DNS and domains** — dangling records or records pointing at resources we
      no longer control, who holds the zone, which account holds the registrar.
- [ ] **Signing keys** — GPG/SSH signing, artifact publication keys, and whether
      verification is required or merely available.
- [ ] **Human identities** — keys, members, outside collaborators, delegated
      access (SEC-01).
- [ ] **Billing and provider account** — who can spend, who can close the
      account. Billing access is an authorization to destroy.
- [ ] **Declared secrets** — names and dates. **Never values.** Scoped per
      environment where the provider supports it (SEC-04).
- [ ] **Last use** of every credential, wherever the provider exposes it. No
      recent use plus no owner equals a candidate for purge, not for renewal.
- [ ] **Token hygiene** — fine-grained, minimum scope, expiry set, one token per
      purpose (SEC-06). One omni-purpose token is a finding on its own.
- [ ] **Declared controls** in the base document: for each one, does the
      artifact that implements it exist? Has it ever been seen to block
      anything? (§7)

Every census row carries its **provenance**: exact command, date, credential
used. A row without provenance is a memory, and memories are not auditable.

---

## 7. Verification

### 7.1 Passive (phase B1, read-only)

- [ ] Scan the **full history** of the repositories, not just HEAD.
- [ ] **Baseline of live flows** before touching anything: what deploys, what
      publishes, what authenticates on its own. A documented green, with a date.
      Without this baseline there can be no phase C: you would not know what you
      broke.
- [ ] Divergences between documentation and reality **in both directions**:
      declared and absent, present and undocumented.
- [ ] For every `[AUTO]` claim in the base document: does the file that runs it
      exist? Grep, not trust. A `[AUTO]` claim with no artifact behind it is
      corrected in the document itself, not merely noted (§13).

### 7.2 Active (phase B2)

A control not observed is not a control. Provoking one means writing, so it is
written **only like this**:

- A throwaway branch with a reserved name (`audit/<date>-<control>`), never `main`.
- A **synthetic canary**: valid format, non-existent credential, generated on the
  spot and marked as such. Never a real secret — not redacted, not partial, not
  expired. An expired real secret still reveals structure and holder.
- PR closed without merge; branch deleted at the end; the canary never reaches
  `main`.
- If the control blocks, that is the result: **record the literal block message**
  — it is the evidence.
- If the control does **not** block, stop. Do not insist, do not escalate the
  attempt: you already have the finding, and pushing further turns a test into a
  breach.
- None of this happens in a public repository without a prior signature. In
  public, the failed attempt persists in the provider's logs and the canary can
  be indexed.

---

## 8. Hot finding

If a real secret value appears — live or of unknown state — the audit stops and
an incident begins:

1. **Do not copy it anywhere.** Not to the report, not to the census, not to the
   chat, not truncated. Reference it by location: file, commit, line. Never by
   value.
2. **Report through the out-of-band channel** declared in §4. Never by issue,
   commit, PR, or any surface of the repository itself.
3. **If the repository is or has ever been public, treat it as compromised.**
   The correct order is rotate first, clean history afterwards if at all.
   Rewriting history revokes nothing and destroys the evidence.
4. **Do not rotate.** That is phase C: prepare the list of what to rotate, in
   what order, and what each rotation breaks — then wait for a signature.
   `engineering-standards.md` §7 forbids an agent creating, rotating or deleting
   credentials, and this protocol does not lift that.
5. The incident gets its own document, outside the session report.

---

## 9. Prohibitions

- Do not revoke, delete or modify anything, however obviously it is garbage.
- Do not write secret values into any file, redacted or partial.
- Do not paste raw API output into the conversation unfiltered: **the transcript
  is itself a surface**, and it carries token prefixes, IPs and addresses.
- Do not execute phase C.
- Do not assume formats or conventions: read them from the repo (P-010).
- Do not chase findings outside the scope. Record them in a separate list and
  follow them in another session; scope creep is what leaves audits half done.
- If an endpoint denies for permissions, **record it as a finding** ("surface
  not censusable with this credential"), do not fail silently.

---

## 10. Output classification

Before writing a file, decide its tier. The three are different and never share
a document. C-005 governs the licence of the public tier; the other two do not
enter this repository at all.

| Tier | Contains | Where it lives |
|---|---|---|
| **Public** | Findings, controls, doctrine gaps, scores. No resource identifiers, no IPs | This repository, committed, `CC-BY-4.0` |
| **Internal** | Census with secret names, IDs, last-use dates, addresses | Private repository or encrypted store. **Never** in a public one |
| **Hot** | Everything in §8 | Outside git. Out-of-band channel |

`operations/security-policy.md` already states the rule this table implements:
credentials, server IPs and personal data never enter this repository.

**If the scope has no destination for the internal tier, that is the audit's
first finding**, and it is resolved before the census, not after.

---

## 11. Deliverables

One set per run. Without documents, the audit is repeated whole in six months.

1. **Session report** (`.md`) — the story. Lives at
   `reports/audits/AUD-YYYY-MM-DD-<slug>.md` per P-010 §2, and surfaces at
   `/audits`. For each finding: the four axes; **state** (live / doubtful /
   dead) and **severity** (blast radius if abused), which are distinct axes
   whose crossing sets the deadline; what breaks if it is revoked; and what is
   proposed. Plus a **coverage** section: N of M censused, and why the missing
   ones are missing.
2. **Structured record** (`.yaml`) — the state, comparable between runs. Public
   tier only; anything of internal tier goes to the internal store (§10).
3. **Open questions** — what you could not verify, kept apart from what you
   did. A suspicion inside the findings list is noise; in its own list, it is
   the next session's agenda.
4. **Score** — out of 10, justified by verified evidence, not impression. Three
   separate scores, because they are three different problems with three
   different fixes:
   - **Doctrine** — is what is written correct and sufficient?
   - **Execution** — does what is written exist and work?
   - **Coverage** — how much of the scope could actually be looked at? A low
     coverage **caps** the other two: they are not averaged, they are declared
     not yet trustworthy.

Anything submitted for Oracle review carries its canonical numinia.org URL
(P-008 v1.2.0), never a filesystem path.

---

## 12. Finding identity

Every finding gets a stable ID: **`FND-YYYY-NN`**, sequential per year, never
reused, kept for life. It does not collide with `AUD-YYYY-MM-DD-<slug>` (the
report) nor with `CON-XXX` (contradictions). This is what lets the next run be a
diff instead of a snapshot.

A finding that reveals the documentation contradicting reality gets **both**: an
`FND-` in the report and a `CON-` in `operations/O-002-contradictions.md`, cross
referenced. The finding closes when reality is fixed; the contradiction closes
when the document is.

---

## 13. Close

- [ ] Every credential found has a record, or is marked for purge. Nothing
      without an owner. `operations/credential-map.md` updated — structure only,
      never values.
- [ ] Every finding of the previous run has a verdict: resolved, persists,
      returned, or reclassified. A finding without a verdict is still open.
- [ ] Every documentation correction ships with **the command that verifies it**,
      not just the corrected text.
- [ ] Every `[AUTO]` claim of the base document that turned out not to exist is
      **corrected in the document**, not merely noted in the report. Leaving it
      standing repeats the very sin the audit came to measure.
- [ ] New vocabulary coined during the session → to the glossary, while fresh.
- [ ] Phase B2 branches and canaries deleted.
- [ ] The audit credential, revoked.
- [ ] Commit, at the right classification tier (§10), referencing the practice
      IDs touched (`SEC-04`, `SEC-06`, …) per `engineering-standards.md` §7.
- [ ] `review_next` in this document updated to the next run's date.
- [ ] Session closed per P-006.

---

## 14. How to work

Direct and concise, no flattery. If the brief is wrong, say so before executing.
Before any irreversible action, stop and ask. Spanish in conversation, English
in repository artifacts (DEC-006).

**First step:** read the repo's formats and conventions, declare the scope's
denominator (how many repos, how many resources, counted from the API) and wait
for confirmation before the full sweep.

---

## Version history

- v0.1.0 (2026-08-21) — Initial draft. Derived from the reusable audit template
  reviewed on 2026-08-21: the golden rule was replaced by a burden-of-proof rule
  (a "find something" instruction invites confabulation), phase B was split into
  passive and active because provoking a control is not read-only, output tiering
  (§10) was added to resolve the conflict between "do not commit the census to a
  public repo" and "commit or it did not happen", and §8, §12 and the coverage
  score were added.
