---
id: "MIS-094"
uid: ""
title: "The emitter governs: Design System 5.1.0 commissioned by the consumer"
status: done
priority: "high"
effort: "L"
guild: "Procurators"
territory: "TBA"
type_execution: "digital"
assigned_to: "numinia-nwos"
started: "2026-08-18"
completed: "2026-08-18"

type: mission
version: "1.0.1"
created: "2026-08-18T13:41:01Z"
created_source: "git:46d157c"
created_confidence: exact
updated: "2026-09-02T01:51:14+02:00"
author: "claude-fable-5"
owner: "oracle"
requested_by: "numinia-web (ADR-022), via Oracle"
tags: [design-system, governance, emission, kit]
license: "CC0-1.0"

depends_on: ["MIS-068", "MIS-092", "MIS-093"]
---
# MIS-094 — The emitter governs: Design System 5.1.0

> **Summary:** numinia-web deleted its copy of the System (its ADR-022) and
> pinned this repo as the source. Its commission back: a 5.1.0 with errata
> E1–E5 and gaps H1–H5 resolved, the kit regenerated as `sistema.*` with a
> sha256 manifest, the full Alegreya, and the emission doctrine written.
> Executed in full.
> **Epistemic:** What the emitter owes when the consumer stops copying.
> **Pragmatic:** numinia-web can re-pin to 5.1.0 with a verifiable digest.
> **Audience:** Oracle · numinia-web · numinia-nwos agent

## Delivered (against the commission, point by point)

- **N1–N2** — Kit regenerated FROM the current document by
  `scripts/generate-design-kit.mjs`: `sistema.{css,js,tokens.json}` with
  the `velo`, `papel` and `registros` groups inside; the v4.2.0 `khepri.*`
  retired from publication.
- **N3** — Full Alegreya self-hosted in the guide: roman, variable italic
  and AlegreyaSC Regular/Medium, with its OFL.
- **N4** — Versioned route `numinia.org/diseno/kit/5.1.0/` +
  `kit/manifest.json` with per-file sha256 and the master's digest.
- **E1** — §19.5: «twelve» → **thirteen** animations, with stroke and sky
  described (and the 12th declared retired).
- **E2** — §19.5: frame radius 10px → **8px** (matches §19.3 and the kit).
- **E3** — §6.4 moved before §6.5.
- **E4** — Reading budget measured in the YAML (≈46k · ≈7.5k · ≈2.1k).
- **E5** — Living guide: `kit/khepri.*` → `kit/sistema.*` in §0.3, §13.1
  and §19.3; the §0.4 table keeps `khepri.*` only under «Antes».
- **H1** — The book's inks: token `papel.tinta-terciaria`
  (`#75695E`/`#97897D`) in §19.3 + a rule in §13.12 (the system's tertiary
  gave 3.7:1 on paper).
- **H2** — The 0–5 rating gears (quarter turn on set, MIS-085) specified
  in §9.9.
- **H3** — The Narrator specified in §9.9 (Web Speech, highlight of the
  block being read, pace, play/pause in the bar, reach into glossary and
  sheet).
- **H4** — The editions enter as a blueprint in §13.12 (pdf via the CSS's
  own A4 `@media print`, printable sheet without the bar, epub with
  glossary links) — decision taken: inside the System, not outside.
- **H5** — Animation 12 **retired** (the verification against the LAP came
  back empty); the number is not reused — decision taken: retire, not
  speculate a new spec.
- **§18** — 5.1.0 row in the history (append-only).
- **§16** — Roadmap: item 16 resolved (MIS-092); item 15 prunes what is
  resolved (Alegreya, page turn).
- **Doctrine** — `GOVERNANCE.md` gains «Canon emission» (rule G-11: the
  canon is not copied — it is pinned; the emitter's duties: publish,
  version, sign, generate, notify, append-only history). MIS-068 leaves
  the backlog with this first executed case.
- **§4 «Not to be touched»** — respected: the scarab, the assets with the
  physical Khepri name, the Temple and the mail remain intact; §18 history
  append-only.

## To re-pin (numinia-web)

- Master: `standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md` · v5.1.0 ·
  sha256 in `numinia.org/diseno/kit/manifest.json` (`master` field).
- Kit: `numinia.org/diseno/kit/5.1.0/sistema.{css,js,tokens.json}` with
  per-file sha256 in the same manifest.
- 5.0.0 remains published and intact: the old pin does not break until the
  consumer decides to move.

## Execution Reality

- **Technology/approach used:** a kit generator extracting the canonical
  blocks from the .md (§13.1 css/js, §19.3 json with a guarding
  `JSON.parse`) + sha256 manifest — the same commit produces document, kit
  and signature.
- **Why it diverged:** the commission left H4 and H5 to judgment with a
  prohibition on silence; editions-as-blueprint and the retirement of the
  12th were decided, both recorded in §18.
- **Key learning:** governing a canon is not guarding a file: it is
  publishing generated, versioned, signed artifacts a consumer can verify
  without trusting anyone.
- **Closing date:** 2026-08-18
- **Executing agent:** claude-fable-5 (numinia-nwos)

## Version history

- v1.0.1 (2026-09-02) — Form: import-era `---` rules removed. missions/ normalisation, lot 3.
