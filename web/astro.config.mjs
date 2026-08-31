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
		"/corpus/canon/welcome-to-numinia": "/corpus/canon/c-001-welcome-to-numinia",
		"/corpus/canon/numinia-brand-and-culture": "/corpus/canon/c-002-brand-and-culture",
		"/corpus/canon/compendium-of-attributes-and-ranks-in-numinia": "/corpus/canon/c-003-attributes-and-ranks",
		"/corpus/canon/role-structure-in-the-numinia-system": "/corpus/canon/c-004-role-structure",
		"/corpus/canon/about-session-zero": "/corpus/canon/c-006-session-zero",
		"/corpus/canon/rank-specifications": "/corpus/canon/c-007-rank-specifications",
		// MIS-127: BLU-003 dropped the "-v2" version suffix from its filename
		// (S-001 §9 — the version lives in frontmatter, not the name). The
		// document is alive; only its address changed. 301, not a tombstone.
		"/blueprints/mission-system-v2": "/blueprints/mission-system",
		"/planos/mission-system-v2": "/planos/mission-system",
		// MIS-127 step 1 (ADR-033): two closed daily reports deleted after passing
		// P-010 §5's four consumer tests — zero inbound citations, no living
		// reader. Their addresses answer at the reports index instead.
		"/corpus/reports/daily/rpt-2026-04-07-tarde": "/corpus/reports",
		"/corpus/reports/daily/rpt-2026-08-17": "/corpus/reports",
	},
	// /print/* pages are PDF-generation intermediates (MIS-088): rendered at
	// build, printed to /pdf/*.pdf by scripts/generate-pdfs.mjs, then removed
	// from dist — they must never reach the sitemap.
	// pagefind (MIS-117) indexes dist/ after the build; /print/* is excluded
	// at the source (data-pagefind-body only on Layout's article) and the
	// intermediates are deleted before deploy anyway.
	integrations: [react(), tailwind(), sitemap({ filter: (page) => !page.includes("/print/") }), pagefind()],
	vite: {
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	},
});
