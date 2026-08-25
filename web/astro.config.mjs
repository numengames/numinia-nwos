// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
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
		"/auditoria": "/audits",
		"/misiones": "/missions",
		"/misiones/[id]": "/missions/[id]",
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
	integrations: [react(), tailwind(), sitemap({ filter: (page) => !page.includes("/print/") })],
	vite: {
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	},
});
