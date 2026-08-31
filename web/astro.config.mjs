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
		// 2026-08-30 ADR-031: root registers dissolved. Old corpus URLs 301.
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
