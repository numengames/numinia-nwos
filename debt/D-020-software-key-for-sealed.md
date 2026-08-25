---
id: "D-020"
uid:
title: "The sealed threshold rests on a software key; hardware exists and is decided"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-25T00:10:00Z"
updated: "2026-08-25T00:10:00Z"
author: "ursa"
owner: "oracle"
guild: "Sentinels"
territory: "Archive"
tags: [debt, signing, hardware, yubikey, sealed, key-management]
license: "CC-BY-4.0"
visibility: "public"
severity: medium
opened_by: "Oracle, 2026-08-24 signing session"
---
# D-020 — The `sealed` threshold rests on a software key

> **Summary:** Signing works, with a key whose private half sits on disk. A
> YubiKey (`sk_yk1`) exists whose private half cannot be extracted.
> **Epistemic:** States the strength of the mechanism the archive's highest
> threshold currently depends on.
> **Pragmatic:** Migration is decided, not deferred indefinitely. This entry
> holds it to that.

## The gap

`S-001` §2.1 defines `sealed` — `canon/` and restore-point tags — as requiring
the Oracle's signature. That signature is currently produced by a software key:
the private half is a file, readable by anything running as its owner.

`sk_yk1` exists. Its private half **cannot be extracted from the device**;
signing requires physical presence. That is the difference between "a key the
Oracle has" and "a key only the Oracle can use".

For `canon/` and for restore-point tags — the two things the archive would need
in the worst case — the second is the correct guarantee.

## What was decided

**Migration, not evaluation.** The Oracle's ruling, 2026-08-24: `canon/` and
restore-point tags will be signed with hardware. This entry exists so the
decision does not quietly become a preference.

## What it depends on

`D-019` first, and in that order deliberately. The allowed-signers file must be
versioned **before** the key changes, so the migration is *appending a line* to
a file that already exists rather than introducing the whole mechanism at the
moment the key rotates.

Done in that order, signatures made with the software key remain verifiable
after the migration — which `sealed` requires, since a restore point that stops
verifying after a rotation is not a restore point.

## Scope, stated so it is not over-read

This is **not** a finding that the current signature is invalid.
`pre-restructure-2026-08-24` is a real signature and a real improvement over the
zero that preceded it. A software key is a weaker guarantee than hardware; it is
not an absent one.

## Closing condition

Marked RESOLVED when `canon/` changes and restore-point tags are signed with
`sk_yk1`, the allowed-signers file carries both keys, and the previous
signatures still verify.

## State

| | |
|---|---|
| Severity | medium — the mechanism works; its guarantee is weaker than the threshold implies |
| Owner | Oracle |
| Blocked by | `D-019` — allowed-signers must be versioned first |
| Opened | 2026-08-24, by the Oracle |
| Closes when | hardware signs canon and tags, with history still verifiable |

---

## Note: the cosmetic item is not filed separately

The Oracle also reported that his signing key's comment carries a personal
email, visible on every verification, and rated it *"cosmetic, no hurry"*.

It is not given its own entry. It is one line of the same file `D-019` creates,
and filing a separate debt for it would cost more attention than the fix. It is
recorded here: **when the allowed-signers file is written, use the operator
identity `pablofm@numengames.com`, not the key's embedded comment.**
