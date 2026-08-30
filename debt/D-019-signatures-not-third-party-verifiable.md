---
id: "D-019"
uid:
title: "Signatures can only be verified by the person who makes them"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-25T00:05:00Z"
updated: "2026-08-25T00:05:00Z"
author: "ursa"
owner: "oracle"
guild: "Sentinels"
territory: "Archive"
tags: [debt, signing, verification, sealed, governance, auditability]
license: "CC-BY-4.0"
visibility: "public"
visibility_reason: >
  Names a git configuration gap, not a key. The fix it asks for is
  `gpg.ssh.allowedSignersFile`, which is public configuration.
severity: high
opened_by: "Oracle, 2026-08-24 signing session"
---
# D-019 — Signatures can only be verified by the person who makes them

> **Summary:** `pre-restructure-2026-08-24` is signed. Nobody but the signer can
> verify it, because the public key lives only on his machine.
> **Epistemic:** A control verifiable only by whoever exercises it is not a
> control.
> **Pragmatic:** The `sealed` threshold has a mechanism now, and that mechanism
> is not auditable.

## How this was found

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

## What exists and what does not

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

## Why this is worse than an inconvenience

`S-001` §2.1 defines `sealed` as *"Oracle's signature + an ADR recording the
reason"*. `D-011` records that the four thresholds had no mechanism at all.

The tag closes half of that. **This entry is the other half:** a signature that
only its author can verify proves authorship to its author. To everyone else it
is an opaque blob. The archive can now say *"this was signed"* and cannot yet
say *"and here is how you check that."*

## The Oracle's proposal, recorded as the fix

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

## Context, recorded so the zero is not misread

Until 2026-08-24 there was **no signing identity configured on the Oracle's
machine and no local clone of the repository**. The "zero signed commits"
measured in `D-011` and in `AUD-2026-08-24-phase0` was not a lapse in
discipline — it was not possible. Operator identity
`pablofm@numengames.com` is now configured, scoped to this repository only.

## Closing condition

Marked RESOLVED when the allowed-signers file is versioned, the configuration
step is documented, and a third party — the agent will do — can run
`git tag -v` on a fresh clone and get a good signature.

## State

| | |
|---|---|
| Severity | high — `sealed` has a mechanism that cannot be audited |
| Owner | Oracle |
| Blocked by | nothing; the file can be added today |
| Opened | 2026-08-24, by the Oracle, correcting the agent |
| Closes when | a fresh clone can verify the tag |
