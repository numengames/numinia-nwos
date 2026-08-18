// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
// The house icon sprite: every Phosphor glyph of the subset (§7.3) defined
// ONCE as a <symbol>, referenced by <use> from Icon.astro. Inlining each
// glyph per instance duplicated ~140 KB of path data in the mission board
// alone; the sprite is fetched once and cached for the whole site.
import type { APIRoute } from "astro";

const icons = import.meta.glob<string>("../icons/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const GET: APIRoute = () => {
  const symbols = Object.entries(icons)
    .map(([file, raw]) => {
      const name = file.split("/").pop()!.replace(/\.svg$/, "");
      const inner = raw.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
      return `<symbol id="i-${name}" viewBox="0 0 256 256" fill="currentColor">${inner}</symbol>`;
    })
    .join("");
  return new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${symbols}</svg>`,
    {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    }
  );
};
