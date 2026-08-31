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
		// MIS-129 / ADR-035 — six of the eight documents in blueprints/ were
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
		// BLU-008 left this repository entirely: it was product landing copy,
		// 75% byte-identical to nwos-deploy's home. Its content now lives at
		// nwos.numen.games, so the address points at the home that already
		// says the same thing rather than at a document that is not here.
		"/blueprints/nwos-system": "https://nwos.numen.games/",
		// The Spanish aliases of the same five, which MIS-120a kept alive.
		// A redirect to a redirect is one hop too many for a crawler.
		"/planos/cao-architecture": "/corpus/system/sys-001-cao-architecture",
		"/planos/agent-experience": "/corpus/system/sys-002-agent-cycle",
		"/planos/archive-fondos": "/corpus/system/sys-003-archive-fondos",
		"/planos/wardley-map": "/corpus/reports/rpt-2026-04-07-wardley-map",
		"/planos/nwos-system": "https://nwos.numen.games/",
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
		// (S-001 §9 — the version lives in frontmatter, not the name).
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
