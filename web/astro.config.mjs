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
	redirects: {
		"/misiones": "/missions",
		"/misiones/[id]": "/missions/[id]",
	},
	integrations: [react(), tailwind(), sitemap()],
	vite: {
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	},
});
