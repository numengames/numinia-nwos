// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import pagefind from "astro-pagefind";
import { defineConfig } from "astro/config";
import rehypeContextCard from "./src/lib/rehype-context-card.mjs";
import { rehypeShiftHeadings } from "./src/lib/rehype-shift-headings.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
	site: "https://numinia.org",
	output: "static",
	// /misiones merged into /missions (MIS-066); old URLs keep resolving.
	// MIS-109 phase B: the six seminal canon documents took C-NNN filenames,
	// and Astro derives /corpus/<id> from the filename — so every published
	// canon URL changed. These keep the old ones resolving, same as MIS-066.
	// DEUDA-404 records what happens without this: /corpus/canon/c-006-manual-
	// juego-de-rol/ (890 KB) died in April and nobody noticed. See D-028.
	redirects: {
		// standards/ registration, 2026-08-31 (MIS-127, ADR-005 v1.1.0). The
		// shelf entered the STD-NNN series: S-001 kept its number as STD-001,
		// and governance/engineering-standards — which never had one — were
		// numbered by age. Five published addresses died in the rename. Each
		// points at the same document under its new address; nothing merged,
		// so there is no "200 that lies" here.
		"/corpus/standards/s-001-glossary": "/corpus/standards/std-001-glossary",
		"/corpus/standards/governance": "/corpus/standards/std-002-governance",
		"/corpus/standards/s-003-platform-role-system": "/corpus/standards/std-003-platform-role-system",
		"/corpus/standards/s-004-header-standard": "/corpus/standards/std-004-header-standard",
		"/corpus/standards/engineering-standards": "/corpus/standards/std-005-engineering-standards",
		// Debt renumbering, 2026-08-31 (RPT-001 §12). The D- series was closed
		// and renumbered to DBT-NNN; 30 published addresses died. Merged entries
		// point at the document that now CONTAINS their reasoning, not at a
		// section index — check-url-lifecycle.mjs warns that a redirect to a page
		// which does not answer the question is 'a 200 that lies'.
		"/corpus/debt/d-008-series-prefixes-not-applied": "/corpus/debt/dbt-001-series-prefixes-not-applied",
		"/corpus/debt/d-011-thresholds-unenforced": "/corpus/debt/dbt-002-root-of-trust-unestablished",
		"/corpus/debt/d-019-signatures-not-third-party-verifiable": "/corpus/debt/dbt-002-root-of-trust-unestablished",
		"/corpus/debt/d-020-software-key-for-sealed": "/corpus/debt/dbt-002-root-of-trust-unestablished",
		"/corpus/debt/d-023-no-guard-for-new-series": "/corpus/debt/dbt-003-publication-integrity",
		"/corpus/debt/d-026-no-identity-map": "/corpus/debt/dbt-002-root-of-trust-unestablished",
		"/corpus/debt/d-028-url-lifecycle-unmanaged": "/corpus/debt/dbt-004-url-lifecycle-unmanaged",
		"/corpus/debt/d-030-path-derived-licensing": "/corpus/debt/dbt-005-path-derived-licensing",
		"/corpus/debt/d-031-index-coverage-unverified": "/corpus/debt/dbt-003-publication-integrity",
		"/corpus/debt/d-032-orphan-content-outside-renderer": "/corpus/debt/dbt-003-publication-integrity",
		"/corpus/debt/d-034-dependabot-advisories-untriaged": "/corpus/debt/dbt-007-dependabot-advisories-untriaged",
		"/corpus/debt/d-035-build-pdf-not-run": "/corpus/debt/dbt-003-publication-integrity",
		"/corpus/debt/d-036-missions-without-author": "/corpus/debt/dbt-008-missions-without-author",
		"/corpus/debt/d-038-c005-files-agents-as-lore": "/corpus/debt/dbt-009-c005-files-agents-as-lore",
		"/corpus/debt/d-039-green-ratchet-certified-corruption": "/corpus/debt/dbt-010-guard-blindness",
		// Extinguished entries (RPT-001 §6): no document answers these any more.
		// They resolve to the debt register itself — the honest target, since the
		// question was withdrawn rather than moved.
		"/corpus/debt/d-004-semaforo-undefined": "/corpus/debt",
		"/corpus/debt/d-005-confidence-scale-undefined": "/corpus/debt",
		"/corpus/debt/d-006-cost-estimate-no-unit": "/corpus/debt",
		"/corpus/debt/d-007-week-no-year": "/corpus/debt",
		"/corpus/debt/d-014-counter-counts-apparatus": "/corpus/debt",
		"/corpus/debt/d-021-self-application-gap": "/corpus/debt",
		"/corpus/debt/d-022-counters-measure-wrong-unit": "/corpus/debt",
		"/corpus/debt/d-024-registration-blocked-by-rulings": "/corpus/debt",
		"/corpus/debt/d-025-guards-declare-blindness": "/corpus/debt",
		"/corpus/debt/d-027-agent-rename-breaks-provenance": "/corpus/debt",
		"/corpus/debt/d-029-decision-hidden-inside-another": "/corpus/debt",
		"/corpus/debt/d-037-censuses-must-fail-loudly": "/corpus/debt",
		"/corpus/debt/d-047-reference-guard-basename-blindness": "/corpus/debt",
		"/corpus/debt/d-048-rename-tool-rewrites-mentions": "/corpus/debt",
		"/corpus/debt/d-049-guards-blind-to-untracked-files": "/corpus/debt",
		// 2026-08-31 MIS-128: protocols merged 15 -> 7 and renamed P- -> PRO-
		// (ADR-005 prefix, 0/13 applied until now). Astro derives the URL from
		// the filename, so every protocol address changed. Absorbed documents
		// redirect to the protocol that now contains them, not to the section.
		"/corpus/protocols/p-001-agent-briefing": "/corpus/protocols/pro-001-agent-session",
		"/corpus/protocols/p-002-onboarding-agente-v1": "/corpus/protocols/pro-001-agent-session",
		"/corpus/protocols/p-003-ciclo-mision-v1": "/corpus/protocols/pro-003-mission-cycle",
		"/corpus/protocols/p-004-inter-agent-v1": "/corpus/protocols/pro-003-mission-cycle",
		"/corpus/protocols/p-005-escalation-v1": "/corpus/protocols/pro-005-escalation",
		"/corpus/protocols/p-006-session-close-v1": "/corpus/protocols/pro-001-agent-session",
		"/corpus/protocols/p-007-context-load-v1": "/corpus/protocols/pro-001-agent-session",
		"/corpus/protocols/p-008-approval-brief-v1": "/corpus/protocols/pro-008-decision",
		"/corpus/protocols/p-009-mission-briefing": "/corpus/protocols/pro-003-mission-cycle",
		"/corpus/protocols/p-010-how-to-archive": "/corpus/protocols/pro-010-how-to-archive",
		"/corpus/protocols/p-011-security-audit": "/corpus/protocols/pro-011-security-audit",
		"/corpus/protocols/p-012-ruling-with-a-condition": "/corpus/protocols/pro-008-decision",
		"/corpus/protocols/p-013-handing-a-guard-to-ci": "/corpus/protocols/pro-013-handing-a-guard-to-ci",
		"/corpus/protocols/approval-request-template": "/corpus/protocols/pro-008-decision",
		"/corpus/protocols/2026_04_14-read_me_how_to_archive-v020": "/corpus/protocols/pro-010-how-to-archive",
		// 2026-08-31 MIS-127: decisions consolidated 16 -> 7 by theme.
		// Nine identifiers were ABSORBED, not deleted: each address points at
		// the record that now contains that reasoning, never at the section
		// index. A 301 to /decisiones would satisfy the guard and lose the
		// answer — the failure mode check-url-lifecycle declares it is blind
		// to (D-028). ADR-030 test 2.
		"/decisiones/adr-002": "/decisiones/adr-001",
		"/decisiones/adr-003": "/decisiones/adr-001",
		"/decisiones/dec-001": "/decisiones/adr-001",
		"/decisiones/adr-024": "/decisiones/adr-023",
		"/decisiones/adr-031": "/decisiones/adr-026",
		"/decisiones/adr-028": "/decisiones/adr-027",
		"/decisiones/adr-029": "/decisiones/adr-027",
		"/decisiones/adr-032": "/decisiones/adr-030",
		"/decisiones/adr-033": "/decisiones/adr-030",
		"/decisions/adr-002": "/decisions/adr-001",
		"/decisions/adr-003": "/decisions/adr-001",
		"/decisions/dec-001": "/decisions/adr-001",
		"/decisions/adr-024": "/decisions/adr-023",
		"/decisions/adr-031": "/decisions/adr-026",
		"/decisions/adr-028": "/decisions/adr-027",
		"/decisions/adr-029": "/decisions/adr-027",
		"/decisions/adr-032": "/decisions/adr-030",
		"/decisions/adr-033": "/decisions/adr-030",
		// /corpus/decisions.md and /print/corpus/decisions/ die with
		// decisions/INDEX.md. The section index /corpus/decisions survives —
		// it is derived from the collection (web/src/lib/corpus.ts), which is
		// why the hand-written INDEX was redundant.
		"/corpus/decisions.md": "/corpus/decisions",
		// 2026-08-30 ADR-026 (formerly ADR-031): root registers dissolved. Old corpus URLs 301.
		"/corpus/gaps": "/corpus/reports/rpt-2026-04-07-gaps-capability-map",
		"/corpus/legal_debt": "/corpus/debt",
		"/corpus/deuda-404": "/corpus/debt",
		// 2026-08-30 standards consolidation: GOVERNANCE.md and STANDARDS.md
		// moved from the repo root into standards/. Old corpus URLs 301 (D-028).
		// /corpus/standards is NOT redirected: it is the standards section
		// index ([section]/index.astro) and keeps resolving on its own; the
		// superseded document now lives at /corpus/standards/standards.
		"/corpus/governance": "/corpus/standards/governance",
		// MIS-120(e) — /es/ is gone; its five pages now 301 to their English
		// originals so links minted while the locale existed keep resolving.
		"/es": "/",
		"/es/agent": "/agent",
		"/es/continuity": "/continuity",
		"/es/missions": "/missions",
		"/es/corpus": "/corpus",
		"/auditoria": "/audits",
		"/misiones": "/missions",
		"/misiones/[id]": "/missions/[id]",
		// MIS-120a — the site speaks English on unprefixed routes (decision 4A,
		// executed here). Old Spanish routes answer 301 forever.
		"/decisiones": "/decisions",
		"/decisiones/[id]": "/decisions/[id]",
		"/planos": "/blueprints",
		"/planos/[id]": "/blueprints/[id]",
		"/planos/meta": "/blueprints/meta",
		// MIS-129 / ADR-035 — five of the eight documents in blueprints/ were
		// not blueprints. Each moved to the shelf its genre belongs on, so
		// each of their /blueprints/<slug> addresses dies here. None is
		// dropped: every one 301s to where its content actually went.
		// Without this, check-url-lifecycle fails and D-028 repeats itself.
		"/blueprints/cao-architecture": "/corpus/system/sys-001-cao-architecture",
		"/blueprints/agent-experience": "/corpus/system/sys-002-agent-cycle",
		"/blueprints/archive-fondos": "/corpus/system/sys-003-archive-fondos",
		"/blueprints/wardley-map": "/corpus/reports/rpt-2026-04-07-wardley-map",
		// mission-system's own redirects live below, with the MIS-127 entry
		// they supersede — kept together so the chain stays visible.
		// The Spanish aliases of the same four, which MIS-120a kept alive.
		// A redirect to a redirect is one hop too many for a crawler.
		"/planos/cao-architecture": "/corpus/system/sys-001-cao-architecture",
		"/planos/agent-experience": "/corpus/system/sys-002-agent-cycle",
		"/planos/archive-fondos": "/corpus/system/sys-003-archive-fondos",
		"/planos/wardley-map": "/corpus/reports/rpt-2026-04-07-wardley-map",
		"/reportes": "/reports",
		"/reportes/diario-2026-04-02": "/reports/daily-2026-04-02",
		"/reportes/diario-2026-04-03": "/reports/daily-2026-04-03",
		"/reportes/diario-2026-04-05": "/reports/daily-2026-04-05",
		"/reportes/diario-2026-04-06": "/reports/daily-2026-04-06",
		"/reportes/diario-2026-04-07": "/reports/daily-2026-04-07",
		"/agente": "/agent",
		"/continuidad": "/continuity",
		"/idioma": "/language",
		"/simulaciones": "/simulations",
		"/soluciones": "/solutions",
		"/ventas": "/sales",
		// ADR-036 (2026-09-01): the canon became the CAN- series and shrank to
		// seven documents. These April addresses were already redirecting to
		// /c-00N pages; they are repointed straight at the new address rather
		// than chained through the retired one — one hop, no chain.
		"/corpus/canon/welcome-to-numinia": "/corpus/canon/can-001-welcome-to-numinia",
		"/corpus/canon/numinia-brand-and-culture": "/corpus/canon/can-002-brand-and-culture",
		"/corpus/canon/compendium-of-attributes-and-ranks-in-numinia": "/corpus/canon/can-003-attributes-and-ranks",
		"/corpus/canon/role-structure-in-the-numinia-system": "/corpus/canon/can-004-role-structure",
		"/corpus/canon/c-001-welcome-to-numinia": "/corpus/canon/can-001-welcome-to-numinia",
		"/corpus/canon/c-002-brand-and-culture": "/corpus/canon/can-002-brand-and-culture",
		"/corpus/canon/c-003-attributes-and-ranks": "/corpus/canon/can-003-attributes-and-ranks",
		"/corpus/canon/c-004-role-structure": "/corpus/canon/can-004-role-structure",
		"/corpus/canon/c-005-licensing": "/corpus/canon/can-005-licensing",
		// The two dated documents were ruled NOT frozen artifacts (ADR-036 §2)
		// and entered the series, so their dated addresses retire too.
		"/corpus/canon/2026_04_15-epistemic_relations_between_numen_games_and_numina-v020": "/corpus/canon/can-006-epistemic-relations",
		"/corpus/canon/2026_04_15-pragmatic_numen_system-v020": "/corpus/canon/can-007-pragmatic-numen-system",
		// ADR-005 v1.1.0 / MIS-127 (2026-09-01): operations/ became the OPS-
		// series and flattened to one level, so both the prefix and the
		// legal/ and strategy/ path segments retire. The two published legal
		// pages (/legal/terminos, /legal/privacidad) are unaffected — they
		// are built from a slug map, which now points at the new filenames.
		"/corpus/operations/o-001-continuity": "/corpus/operations/ops-001-continuity",
		"/corpus/operations/o-002-contradictions": "/corpus/operations/ops-002-contradictions",
		"/corpus/operations/o-005-simulations": "/corpus/operations/ops-005-simulations",
		"/corpus/operations/o-006-solutions": "/corpus/operations/ops-006-solutions",
		"/corpus/operations/o-008-session-state": "/corpus/operations/ops-008-session-state",
		"/corpus/operations/legal/o-003-privacy-policy-numengames": "/corpus/operations/ops-003-privacy-policy-numengames",
		"/corpus/operations/legal/o-004-terms-and-conditions-numengames": "/corpus/operations/ops-004-terms-and-conditions-numengames",
		"/corpus/operations/strategy/o-007-sales": "/corpus/operations/ops-007-sales",
		// The same three addresses in their intermediate form: the rename
		// landed before the flatten in the published baseline, so both the
		// old-prefix and new-prefix folder paths existed. Not proposed as
		// /corpus (the guard's default): a section index does not answer
		// what these URLs answered.
		"/corpus/operations/legal/ops-003-privacy-policy-numengames": "/corpus/operations/ops-003-privacy-policy-numengames",
		"/corpus/operations/legal/ops-004-terms-and-conditions-numengames": "/corpus/operations/ops-004-terms-and-conditions-numengames",
		"/corpus/operations/strategy/ops-007-sales": "/corpus/operations/ops-007-sales",
		// MIS-127: security-policy and credential-map merged into OPS-009 —
		// one subject that had been split in two, each pointing at the other.
		"/corpus/operations/security-policy": "/corpus/operations/ops-009-secrets-handling",
		"/corpus/operations/credential-map": "/corpus/operations/ops-009-secrets-handling",
		// Session Zero left the repository for numinia-lore (ADR-036 §4): game
		// design, not governing canon. No in-repo page can answer, so the
		// address lands on the ADR that records where it went — DEUDA-404's
		// rule: a retired address explains itself, it does not 404. NOTE the
		// target is /decisiones/<id>, not /corpus/decisions/: ADRs are a typed
		// collection with their own route (corpus.ts §Section.collection), and
		// /corpus/decisions/... does not exist. Caught by checking the built
		// dist, not by the build itself — redirects are not validated.
		"/corpus/canon/about-session-zero": "/decisiones/adr-036",
		"/corpus/canon/c-006-session-zero": "/decisiones/adr-036",
		// Rank Specifications was absorbed into CAN-003 (ADR-036 §4).
		"/corpus/canon/rank-specifications": "/corpus/canon/can-003-attributes-and-ranks",
		"/corpus/canon/c-007-rank-specifications": "/corpus/canon/can-003-attributes-and-ranks",
		// The three apparatus files retired by ADR-036 §5. The lore lines now
		// live in SYS-003's frontmatter; the index's record lives in the ADR.
		"/corpus/canon/archive-lore": "/corpus/system/sys-003-archive-fondos",
		"/corpus/canon/index": "/decisiones/adr-036",
		"/corpus/canon/readme": "/decisiones/adr-036",
		// MIS-127: BLU-003 dropped the "-v2" version suffix from its filename
		// (STD-001 §9 — the version lives in frontmatter, not the name).
		// MIS-129 then moved the document itself out of blueprints/ into
		// history/ (ADR-035): it is a self-declared superseded design, not a
		// plan. Both the versioned and unversioned addresses now land on the
		// frozen record — one hop, no chain.
		"/blueprints/mission-system-v2": "/corpus/history/2026_04_07-mission_system_v2-v100",
		"/planos/mission-system-v2": "/corpus/history/2026_04_07-mission_system_v2-v100",
		"/blueprints/mission-system": "/corpus/history/2026_04_07-mission_system_v2-v100",
		"/planos/mission-system": "/corpus/history/2026_04_07-mission_system_v2-v100",
		// MIS-127 step 1 (ADR-033): two closed daily reports deleted after passing
		// P-010 §5's four consumer tests — zero inbound citations, no living
		// reader. Their addresses answer at the reports index instead.
		"/corpus/reports/daily/rpt-2026-04-07-tarde": "/corpus/reports",
		"/corpus/reports/daily/rpt-2026-08-17": "/corpus/reports",
	},
	// MIS-088's /print/* intermediates are gone (2026-08-31). They existed
	// only as Chromium print targets for a PDF step the build never ran, so
	// they were served in production as a public half-feature. Removing the
	// pages removes the reason for the sitemap filter that hid them: there
	// is nothing left to exclude. See debt/D-035.
	integrations: [react(), tailwind(), sitemap(), pagefind()],
	// Every corpus document opens with a Summary/Epistemic/Pragmatic/Audience
	// blockquote. Markdown renders those four lines as one paragraph, which
	// reads as a grey wall. rehypeContextCard turns that one blockquote shape
	// into a definition list — one field per row — and leaves every other
	// blockquote untouched. See src/lib/rehype-context-card.mjs.
	markdown: {
		// Order matters: the card is built from the document's opening
		// blockquote, then every heading drops one level so the page keeps the
		// single h1 it printed itself. See rehype-shift-headings.mjs.
		rehypePlugins: [rehypeContextCard, rehypeShiftHeadings],
	},
	vite: {
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	},
});
