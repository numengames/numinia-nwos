---
title: "reports/evidence/ — annexes, and what may never be done to them"
type: documentation
subtype: reference
status: active
version: "1.0.0"
created: "2026-09-02T00:50:00+02:00"
updated: "2026-09-02T00:50:00+02:00"
author: "ursa"
owner: "oracle"
tags: [reports, evidence, apparatus]
license: "CC-BY-4.0"
registration: exempt
registration_reason: "apparatus of the reports/ series — describes the evidence convention, is not a report"
---

# `reports/evidence/` — annexes, and what may never be done to them

> **Summary:** One folder per report that has captured artefacts. Named after
> the report. Moved as a block. Never rewritten.
> **Epistemic:** Why evidence lives apart from the documents and why no tool is
> allowed to touch it.
> **Pragmatic:** Where to put an SBOM, a JSON capture, a robots file or a
> recovered text when a report depends on it.
> **Audience:** Agents · Oracles

## The rule (`ADR-005` v1.2.0 rule 5)

```
reports/evidence/<RPT-id>/        one folder per report, named after it
                          README.md   what was captured, when, how, and from where
                          …           the artefacts, byte-for-byte as captured
```

`<RPT-id>` is the report's identifier — `RPT-011` or `RPT-2026-08-25` — not
its slug and not its date. The folder follows the report through any rename
of the report; the artefacts inside follow nothing.

## What an annex is

A **captured artefact**: an SBOM, a `reuse lint` transcript, a JSON export of
a sweep, a `robots.txt` as served that day, a text recovered from git that
a report argues from. It describes a moment. Its value is that it is
*exactly* what the report saw.

An annex is **not** a document of the series. `lint-naming` does not hold
it to `RPT-NNN`; `count-evidence.py` does not count it; the corpus mirror
does not publish it (`web/src/content.config.ts`, `!reports/evidence/**`).
It is reachable on GitHub, which is where evidence belongs.

## What may never be done to it

1. **No rename tool rewrites it.** `PRO-010` §3.4 rule 1, `STD-001` §5.3.
   `rename-series.mjs` refuses every path under `reports/`; the exclusion
   list in `STD-001` §5.3 names `reports/evidence/` explicitly. This rule
   exists because it was broken once: `MIS-125` bug 6 rewrote eight
   filenames inside `sbom.spdx` and a CC0 grant record, leaving the SPDX
   checksums stale, because the annex then lived at
   `reports/audits/AUD-2026-08-26-licensing-c005/` and the exclusion list
   only named `reports/audits/evidence/`. One convention, one line in the
   list, closes that class.
2. **No hand edit either.** A path quoted inside an artefact is the path as
   it was on capture day. If the world moved, the report's `former_id_note`
   or the annex `README.md` says so, dated. The artefact does not.
3. **No translation.** `scripts/translate-corpus.mjs` excludes the folder.
4. **No SPDX header inserted into a pinned file.** `CAN-005` §5: a file
   pinned by byte identity is declared via `REUSE.toml`, never modified.
   `reports/**` is `CC-BY-4.0` by annotation, which covers the annex without
   touching it.

## Depth

`PRO-010` §1.6 allows two levels under a series root. An annex may nest
one more (`RPT-011/robots/`): that is the **declared exception**, granted
because the artefacts' own layout is part of what was captured. It is not
a licence to nest documents.

## Annexes today

| Folder | Report | Captured | Contents |
|---|---|---|---|
| `RPT-011/` | `RPT-011` (former `AUD-2026-08-26-licensing-c005`) — licensing audit | 2026-08-26 | `sbom.spdx` (510 files), `reuse-lint.txt`, `cc0-irrevocable.json`, `provenance-190.json`, `protocol-anchor-123.json`, two surface sweeps, `robots/` ×7 |
| `RPT-2026-08-25/` | `RPT-2026-08-25` — daily | 2026-08-25 | `canon-2026-04-15-recovery.md`: the forensic note on the canon text deleted 2026-04-15 (the text itself is `history/2026_04_07-Epistemic_Relations-v1.0.0.md`) |

Empty `<RPT-id>/` folders are not created in advance. A folder appears with
its first artefact and its `README.md`.
