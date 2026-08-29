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
	// MIS-120(b) — native i18n. English lives on the unprefixed URLs (the
	// canonical site, DEC-006/ADR-024); /es/ serves Spanish. fallback:redirect
	// keeps the selector honest on unswept pages: /es/<page> 301s to the
	// English page until a real /es/ page exists (pilots here, sweep in (c),
	// corpus bodies in (d)). fallbackType:"rewrite" was tried and REJECTED:
	// it re-renders dynamic routes under /es/ against getStaticPaths maps
	// that legitimately overlap ([...slug] vs [section]) and the build dies
	// with NoMatchingStaticPathFound on /es/corpus/changelog/.
	i18n: {
		defaultLocale: "en",
		locales: ["en", "es"],
		fallback: { es: "en" },
		routing: { prefixDefaultLocale: false },
	},
	redirects: {
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
				// MIS-120(d2): machine translations live OUTSIDE web/ — they are
				// corpus (CC-BY-4.0), not code (MIT), and web/** is the MIT
				// regime. The alias keeps the import readable from inside web/.
				"@translations": path.resolve(__dirname, "../translations"),
			},
		},
	},
});
