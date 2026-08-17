---
id: "MIS-066"
title: "Unify the mission system: one folder, one language, one page"
type: mission
status: in-review
version: "1.0.0"
created: "2026-08-17"
updated: "2026-08-17"
author: "claude-fable-5"
owner: "oracle"
tags: [missions, unification, english, web, f-1, f-2]
license: "CC-BY-4.0"
mission_id: "MIS-066"
area: "CAO / Archive"
guild: "Sentinels"
priority: "high"
effort: "XL"
assigned_to: "claude-fable-5"
requested_by: "oracle"
requires_oracle_approval: true
blocked_reason: null
depends_on: []
started: "2026-08-17"
in_review_at: "2026-08-17"
completed: null
divergence_log: null
---
# MIS-066 — Unify the mission system: one folder, one language, one page

> **Summary:** 81 mission files across 4 status directories, 15 duplicated
> IDs, two status vocabularies and two competing web pages become: one flat
> `missions/` folder, 66 unique missions in English, one canonical state
> set, and one page — https://numinia.org/missions — built from the repo.
> **Epistemic:** What it costs to collapse five competing state surfaces
> (audit AUD-2026-08-17, F-1/F-2) into one, without losing history.
> **Pragmatic:** Any agent or human reads mission state from exactly one
> place; every reference to an old ID keeps resolving.
> **Audience:** Agents · Oracles

---

**Area:** CAO / Archive
**Guild:** Sentinels
**Type:** digital
**Priority:** high
**Effort:** XL

---

## Oracle decisions (2026-08-17)

1. Surviving page: **https://numinia.org/missions**. `/misiones` merges
   its curated content into the canonical `.md` files, then redirects.
2. `done/` missions are translated and moved too — git history preserves
   the original Spanish, so the append-only record survives as history.
3. **Conservative renumbering**: every mission keeps its number. Only the
   real collision (two different missions sharing 58) renumbers, and the
   padded IDs (`MIS-00058`, `MIS-00059`) lose their padding.
4. Vehicle: this mission, executed step by step by the session agent with
   Oracle approval between phases. Nothing irreversible: git only, no
   licence changes, no content deleted before it is ported, redirects
   instead of dead routes.
5. `MIS-062` is unassigned (nimrod is not active) and its sub-missions
   are absorbed as noted below.
6. **IDs stay sequential** (`MIS-NNN-english-slug.md`), the only declared
   naming rule. Amendment ordered retiring a prior date-based ID decision
   (`MIS-YYYYMMDD-slug`) in `DECISIONS.md`; verification 2026-08-17: no
   such file or written decision exists in the tree — the date-based
   pattern appears only in one immutable commit message and in the
   unrelated `APR-{YYYYMMDD}` template. Nothing to retire; this brief is
   now the single live naming rule (closes the F-4 exposure).
7. **Oracle override, 2026-08-17 — `missions/done/` modification.**
   `GOVERNANCE.md:37` declares done/ unmodifiable by anybody. The Oracle
   authorises its modification exclusively for this mission's language
   sweep (translation and rename; no semantic change, no deletion — G-05
   respected). Recorded here so the repo does not visibly break an
   unamended rule.
8. **Board ordering is the frontend's concern.** No ordering logic in
   the mission files.

## Revert point

Annotated tag **`mis-066-pre-unification`** = `d6aee9a` (main, 2026-08-17,
nothing moved), pushed to origin. Rolling back the entire unification at
any point: reset main to the tag, or discard this branch. Every phase is
additionally its own commit; no history rewrite, ever.

## Canonical state set

`draft · backlog · in-progress · in-review · done · frozen · cancelled`

Mapping applied at flatten time: `todo` → `backlog` (audit F-2: two
generations of the same backlog) · `en-curso` → `in-progress` · directory
membership → `status:` frontmatter (the directory disappears as a state
surface). `frozen` replaces the never-created `missions/freeze/`.

## Rename and merge map (81 → 66)

### Merges — ES/EN pairs (keep English file and filename; port any
content that only exists in the Spanish twin; queue/todo+backlog → backlog)

| ID | Survives as | Absorbs |
|---|---|---|
| 001 | `MIS-001-numinia-mvp-definition.md` | `MIS-001-mvp-numinia-una-pagina.md` |
| 002 | `MIS-002-user-map-who-pays.md` | `MIS-002-mapa-usuario-quien-paga.md` |
| 003 | `MIS-003-numinia-navigable-prototype.md` | `MIS-003-prototipo-navegable.md` |
| 004 | `MIS-004-monetization-model-v1.md` | `MIS-004-modelo-monetizacion-v1.md` |
| 005 | `MIS-005-numinia-landing-page.md` | `MIS-005-landing-page-numinia.md` |
| 017 | `MIS-017-b2b-prospecting-pipeline.md` | `MIS-017-pipeline-prospeccion-b2b.md` |
| 018 | `MIS-018-commercial-value-proposition.md` | `MIS-018-propuesta-valor-comercial.md` |
| 019 | `MIS-019-outreach-20-prospects.md` | `MIS-019-outreach-20-prospectos.md` |
| 031 | `MIS-031-arbitrum-grant-review.md` | `MIS-031-grant-arbitrum.md` |
| 039 | `MIS-039-agent-log-system.md` (in-review) | `MIS-039-sistema-logs-agentes.md` |
| 044 | `MIS-044-gaps-capability-map.md` | `MIS-044-gaps-mapa-carencias.md` |
| 048 | `MIS-048-agent-cost-tracking.md` | `MIS-048-sistema-costes-agente.md` |

### Merges — state duplicates

| ID | Survives as | Rationale |
|---|---|---|
| 027 | `MIS-027-numengames-web-improvement.md`, status `in-review` | Three generations (ES backlog → EN todo → EN in-review). The review copy is the newest (2026-04-08); unique content from the other two is ported. |
| 038 | `MIS-038-design-briefing-protocol.md`, status `done` | done/ and review/ copies are byte-identical except `status:`; done is the terminal state, the review copy is a stale leftover. |

### Renumbers

| Old | New | Why |
|---|---|---|
| `queue/MIS-00058-sistema-inspecciones.md` | `MIS-067-inspections-system-iso-15489.md` | Real collision: a different mission (`MIS-058` Approval Brief Protocol, active) owns 58. The younger, still-backlog mission moves to the next free number. |
| `done/MIS-00059-protocolo-carga-contexto.md` | `MIS-059-context-load-protocol.md` | Padding removed; 59 is free. |
| `active/MIS-058.md` | `MIS-058-approval-brief-protocol.md` | Keeps 58; gains a slug from its own title. |

### Renames — Spanish slug → English slug (same ID, flat folder)

| Old (queue/ unless noted) | New |
|---|---|
| `MIS-006-arquitectura-experiencia-sesion.md` | `MIS-006-session-experience-architecture.md` |
| `MIS-007-integrar-calcom-onboarding.md` | `MIS-007-calcom-onboarding-integration.md` |
| `MIS-008-metricas-north-star.md` | `MIS-008-north-star-metrics.md` |
| `MIS-009-piloto-cerrado-5-usuarios.md` | `MIS-009-closed-pilot-5-users.md` |
| `MIS-010-roadmap-publico-v1.md` | `MIS-010-public-roadmap-v1.md` |
| `MIS-012-cicd-numengames.md` | `MIS-012-numengames-cicd.md` |
| `MIS-013-sistema-monitoreo-alertas.md` | `MIS-013-monitoring-alerts-system.md` |
| `MIS-015-documentar-stack-tecnologico.md` | `MIS-015-document-tech-stack.md` |
| `done/MIS-016-nginx-ssl-servicios.md` | `MIS-016-nginx-ssl-services.md` |
| `MIS-021-pricing-paquetes.md` | `MIS-021-pricing-packages.md` |
| `MIS-022-alianzas-indie-daos.md` | `MIS-022-indie-dao-alliances.md` |
| `MIS-023-case-study-inicial.md` | `MIS-023-initial-case-study.md` |
| `MIS-024-sistema-seguimiento-post-call.md` | `MIS-024-post-call-follow-up-system.md` |
| `MIS-025-estrategia-contenido-30dias.md` | `MIS-025-30day-content-strategy.md` |
| `MIS-026-activacion-twitter.md` | `MIS-026-twitter-activation.md` |
| `MIS-028-newsletter-lista-correo.md` | `MIS-028-newsletter-mailing-list.md` |
| `MIS-029-comunidad-discord-telegram.md` | `MIS-029-discord-telegram-community.md` |
| `MIS-030-hilo-detras-numen.md` | `MIS-030-behind-numen-thread.md` |
| `MIS-034-deck-inversores.md` | `MIS-034-investor-deck.md` |
| `MIS-035-crm-grants-financiacion.md` | `MIS-035-grants-funding-crm.md` |
| `MIS-036-memo-estrategia-financiacion-q2.md` | `MIS-036-q2-funding-strategy-memo.md` |
| `done/MIS-037-crear-repositorio-archive-summa.md` | `MIS-037-create-archive-summa-repo.md` |
| `MIS-040-dashboard-cao-kpis.md` | `MIS-040-cao-kpi-dashboard.md` |
| `MIS-041-protocolo-onboarding-agentes.md` | `MIS-041-agent-onboarding-protocol.md` |
| `MIS-043-lectura-manual-rpg.md` | `MIS-043-rpg-manual-reading.md` |
| `MIS-046-readmes-repos-numengames.md` | `MIS-046-numengames-repo-readmes.md` |
| `MIS-050-ritual-revision-backlog.md` | `MIS-050-backlog-review-ritual.md` |
| `done/MIS-053-khepri-email-operativo.md` | `MIS-053-khepri-operational-email.md` |
| `active/MIS-054-acceso-multi-oraculo-telegram.md` | `MIS-054-multi-oracle-telegram-access.md` |
| `active/MIS-055-sistema-nomenclatura-dual.md` | `MIS-055-dual-nomenclature-system.md` |
| `done/MIS-057-qa-profundo-sistema.md` | `MIS-057-deep-system-qa.md` |
| `MIS-060-sincronizacion-agentes-repo-canon.md` | `MIS-060-agent-canon-repo-sync.md` |
| `MIS-061-sistema-web-nwos.md` | `MIS-061-nwos-web-system.md` |

`MIS-032-ethereum-foundation-esp.md` keeps its slug: ESP is the Ecosystem
Support Program, not Spanish.

### Flat moves — filename already English, directory drops

All remaining files move from `missions/{queue,active,review,done}/` to
`missions/` unchanged: 011, 014, 020, 033, 042, 045, 047, 049, 051, 052,
056, 062, 063, 064, 065, and this file.

## Phases (one commit or batch per phase, Oracle OK between phases)

1. **Flatten + rename** — pure `git mv` per the map above; status
   normalized to the canonical set in the same commit; `queue/INDEX.md`
   retired (audit F-1: hand-maintained, internally inconsistent, blind to
   everything after MIS-056); TEMPLATE.md updated.
2. **Merge duplicates** — the 15 IDs above become one file each; every
   merge decision recorded in the commit message. **Phase gate
   (acceptance criterion, not a courtesy check):** grep the whole
   repository for every affected ID — the renumbered MIS-058/MIS-00058
   pair and all 15 merged duplicates — list every surviving reference
   that now points at a dead ID or dead path, and fix them inside this
   phase.
3. **English rewrite — two separate commits.** First the `misiones.ts`
   content migration (recovery of stories and Execution Reality that
   exist nowhere else), verified on its own. Then the translation of the
   ~40 Spanish missions with frontmatter normalization. Never mixed: if
   a batch fails, it must be knowable which half broke it.
4. **Single index** — `missions-index.json` retired (audit F-1: a
   hand-edited file wearing a fake `generated` stamp); `/missions` builds
   from the folder.
5. **Web unification** — `/missions` board and detail build from the flat
   folder (absorbs the missions slice of MIS-065); `/misiones` redirects
   to `/missions`; `misiones.ts` deleted only after phase 3 ported it.
6. **Docs sync** — README (`freeze/` promise), P-003, STANDARDS.md,
   GOVERNANCE.md (its tables name `missions/active|done/` paths),
   CLAUDE.md, CHANGELOG, and **P-001**, which exists under two declared
   paths (`protocols/P-001-agent-briefing.md` per README:72,
   `protocols/P-001-briefing-agente-v1.md` per CONTRIBUTING:39) — the
   file every agent is told to read first must have exactly one path
   (audit F-3).

## Out of scope (Oracle, 2026-08-17)

The rule for **selecting the next mission among eligible ones** is not
absorbed here. It exists nowhere in the repo (audit F-6), belongs in
P-003 or GOVERNANCE, and is queued separately. Known consequence,
accepted: flattening the folder removes the implicit ordering signal
that directory listings and INDEX.md line order used to provide — until
that rule lands, the board is unordered by design (decision 8: ordering
is the frontend's concern).

## Supersessions

- **MIS-062** (unassigned by Oracle, 2026-08-17): sub-missions 062.1
  (format+folder migration), 062.2 (recover lost missions — the
  `misiones.ts` port is exactly this), 062.3 (Kanban page — survives at
  numinia.org/missions, not pablofm.com), 062.4 (STANDARDS.md) and 062.5
  (P-003 v2) are all absorbed by this mission's phases 1–6. MIS-062
  remains open only as the design record of the v2 state machine.
- **MIS-065**: its `/missions`-route criterion moves here; MIS-065 keeps
  `/decisiones`, `/planos` and the lore extraction from
  `archive/[fondo].astro`.

## Acceptance criteria

- [x] `missions/` is flat: 67 mission files (66 legacy + this brief) +
      TEMPLATE.md, nothing else.
- [x] Every file is English (title, body, slug) with canonical frontmatter.
- [x] No duplicate IDs; old IDs resolve (only `MIS-00058` → `MIS-067`
      changed identity, recorded here).
- [x] One status vocabulary; directory no longer encodes state.
- [x] https://numinia.org/missions builds from the folder; `/misiones`
      redirects to it; no client-side GitHub API hydration for content
      present in the checkout.
- [x] `missions-index.json` and `queue/INDEX.md` gone; nothing references
      them outside historical records.
- [x] Repo-wide grep of every merged/renumbered ID returns zero
      references to dead IDs or dead paths (Phase 2 gate).
- [x] Docs describe the real system; P-001 has exactly one path.
- [x] The `mis-066-pre-unification` tag exists on origin and restores the
      pre-unification state at any moment.

## Epistemic value

Whether five de-facto state surfaces can be collapsed into one without
losing a single mission's history — and what a "conservative renumber"
costs versus what a clean resequence would have broken.

## Pragmatic value

One folder to read, one page to visit, one vocabulary to parse. Cold
agents (the audit's readers) stop deriving four contradictory answers to
"what is in progress?".

## Execution log

- 2026-08-17 — Phase 0: brief written, rename map approved-pending,
  MIS-062 unassigned, branch `mis-066-unify-missions` opened.
- 2026-08-17 — Phase 0 addendum: Oracle amendments folded in, revert tag
  `mis-066-pre-unification` pushed. Rename map approved by Oracle.
- 2026-08-17 — Phase 1: folder flattened (81 files moved via git mv,
  status directories removed), Spanish slugs renamed per map, statuses
  normalized (todo→backlog ×15, en-curso→in-progress ×3), MIS-00058→
  MIS-067 and MIS-00059→MIS-059 id fields updated, `queue/INDEX.md`
  retired, MIS-038 review copy dropped early (filename collision at
  flatten; byte-identical to the surviving done copy except status).
  Duplicates from ES/EN pairs and MIS-027 remain on disk for Phase 2.
- 2026-08-17 — Phase 2: 14 duplicate files merged away; 67 files remain
  (66 legacy missions + this brief), zero duplicate IDs. Nine ES twins
  were pure translations (deleted); MIS-039 got Story/values ported from
  its ES twin (verbatim, Phase 3 translates); MIS-044/048 got Notes +
  Version history from their MIS-056-generation twins; MIS-027 merged
  three generations — review content as base in the surviving filename,
  Story/values from the queue copy, prior implementation-scope criteria
  preserved under "Prior scope (superseded)". Gate grep ran over every
  affected ID: one live reference fixed (STANDARDS.md:344
  MIS-00059→MIS-059); remaining hits are historical records kept by
  design (append-only reports, the 2026-04-07 audit and its auditoria
  page mirror, this brief). Known interim breakage, branch only: the
  /missions client-side hydration points at pre-flatten GitHub paths
  until Phases 4–5 land.
- 2026-08-17 — Phase 3, commit 1 (misiones.ts recovery): verified entry
  by entry against the canonical files. Finding: the viewer data is a
  stale derived copy — every story, criterion, value and all four Real
  execution blocks already exist in the repo, translated by the MIS-056
  generation, with fresher states (the ts still shows MIS-038 backlog
  and MIS-057 in progress; both are done on disk). One recovered
  detail: MIS-053's key learning regains "(email, calendar) to act
  professionally". The ts MIS-056 entry describes the old bilingual
  ES+EN scope, superseded by DEC-006 (English only) — stale scope, not
  recovered. Consequence: misiones.ts can be deleted in Phase 5 with
  zero content loss.
- 2026-08-17 — Phase 3, commit 2 (translation + frontmatter
  normalization): the 27 Spanish-body files translated to English by
  three parallel agents (batches A/B/C), verified by residual-language
  scan — only proper names keep accents (María, Clio, Alquimista-01 as
  a retired agent id). MIS-039's ported Spanish sections integrated
  into English structure. Frontmatter normalized across all 67 files:
  41 padded ids unpadded (MIS-000NN → MIS-0NN), tipo:→type_execution:
  ×42, stray phase: fields removed ×7, version: added where missing ×7,
  MIS-065's own summary labels englished. Zero Spanish titles remain.
- 2026-08-17 — Phase 4: missions-index.json retired (hand-edited file
  wearing a fake generated stamp, audit F-1). /missions board and
  detail now build from the flat missions/ folder via Astro's Content
  Layer (glob loader, base ../missions): board cards server-rendered
  (filters/search stay client-side over the rendered DOM), detail pages
  render the full mission markdown. Zero GitHub API calls in the built
  pages. Fixed en route: three files carried a duplicate status: key
  from their origin (052/054/055) — js-yaml strict caught what looser
  parsers had let through. REUSE.toml/LICENSE updated (index's CC0
  annotation retired with it).
- 2026-08-17 — Phase 5: /misiones retired. misiones.astro, its [id]
  detail, misiones.ts (verified stale in Phase 3.1) and the orphan
  missions.ts loader deleted; "Misiones" nav item removed; the two
  live links rewired (idioma → /missions/mis-055, auditoria →
  /missions). Astro redirects generate 68 meta-refresh pages with
  canonical+noindex: /misiones → /missions and /misiones/[id] →
  /missions/[id] for all 67 ids — every old URL keeps resolving.
  Build: 109 pages.
- 2026-08-17 — Phase 6: docs synchronized. P-003 → v3.0.0 (states
  without folders); P-001's Spanish twin deleted (the English file is a
  strict superset; MIS-064 had already claimed this deletion done —
  now it is true) and CONTRIBUTING repointed — P-001 has exactly one
  path; README (flat tree, real protocol links + P-009, board →
  numinia.org/missions); GOVERNANCE mission rows keyed by status
  (including retiring the missions/backlog/ row for a folder that
  never existed); STANDARDS §4B/§5 (flat layout, canonical states,
  type_execution, license example CC0→CC-BY per regime); CLAUDE.md
  mission-data section; CHANGELOG [Unreleased] filled (audit F-1.4);
  live references in P-001/P-009/BP-cao-architecture fixed;
  BP-mission-system-v2 marked partially superseded (kept as v2 design
  record); archive-summa v0.1.0 snapshots left as history. Follow-up
  flagged, not absorbed: protocol filenames still carry Spanish slugs
  (P-002-onboarding-agente-v1.md etc.) — a rename mission if the
  Oracle wants filename-level English there too.

## Execution Reality

- **Technology/approach used:** Six phases, one commit or batch each,
  Oracle gate between phases, on branch `mis-066-unify-missions` with
  an annotated revert tag on main. git mv for history-preserving
  renames; three parallel translation agents for the language sweep;
  Astro 5 Content Layer (glob loader over ../missions) replaced both
  the hand-kept index and the client-side GitHub hydration.
- **Why it diverged:** MIS-038's merge moved from Phase 2 to Phase 1
  (filename collision at flatten). The misiones.ts "recovery" turned
  out to be verification — the repo already contained everything,
  translated, which nobody knew until checked. Three files carried
  duplicate status: keys that only the stricter build-time parser
  caught. The 5-digit ID normalization from MIS-057 had to be reversed
  file by file.
- **Key learning:** the mission corpus had five state surfaces because
  each generation added one without retiring the last. The unification
  was mostly deletion — and the only content that existed nowhere else
  was half a sentence. Surfaces rot; folders lie; frontmatter plus a
  build from the folder cannot drift from itself.
- **Closing date:** 2026-08-17 (pending Oracle approval)
- **Executing agent:** claude-fable-5 (session agent), Oracle: Pablo
