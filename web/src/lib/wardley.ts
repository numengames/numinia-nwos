// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// MIS-071 phase 4 — the wardley page reads the file instead of holding a copy.
//
// RPT-2026-04-07-wardley-map.md was extracted FROM this page in phase 2: its
// sections are literally headed "(per /wardley)" and its own prose says
// "as published on the /wardley page". The extraction was faithful — all 12
// components, all 36 prose fields and every coordinate match to the
// character. Then nothing read it back, so the archive held a perfect
// duplicate that could drift on the next edit to either side.
//
// This module makes the .md the source. Visual concerns the document does
// not carry — node colours, Tailwind classes, SVG geometry — stay in the
// page, because they are not archive content.

import { getEntry } from "astro:content";

/** The report, as the reports collection ("audits" in content.config.ts —
 *  one collection for every RPT-* since ADR-005 v1.2.0) addresses it. */
const ENTRY_ID = "rpt-003-wardley-map";

export interface WardleyComponent {
  /** Slug used by the page for SVG node ids and layer membership. */
  id: string;
  name: string;
  /** 0–100, x = evolution, y = distance from top (visibility). */
  x: number;
  y: number;
  evolution: string;
  visibility: string;
  layer: string;
  why: string;
  tension: string;
  moat: string;
}

export interface WardleyLayer {
  num: number;
  label: string;
  subtitle: string;
  description: string;
  /** Component names, in document order. */
  componentNames: string[];
}

export interface WardleyDoc {
  title: string;
  components: WardleyComponent[];
  layers: WardleyLayer[];
  sourceUrl: string;
  mdUrl: string;
}

/** Collapse hard-wrapped lines; drop a trailing horizontal rule. */
function fold(text: string): string {
  return text
    .replace(/\n\s*-{3,}\s*$/, "")
    .replace(/\s*\n\s*/g, " ")
    .replace(/\s*-{3,}\s*$/, "")
    .trim();
}

/** Strip the *(per /wardley)* provenance marker used inside the document. */
function unmark(text: string): string {
  return text.replace(/\s*\*\(per \/wardley\)\*\s*/g, " ").trim();
}

function section(body: string, heading: string): string {
  const i = body.indexOf(`## ${heading}`);
  if (i === -1) {
    throw new Error(
      `wardley: section "## ${heading}" not found in ` +
        `reports/RPT-003-wardley-map.md. The page renders from that ` +
        `document; a renamed section must be fixed there or here, not worked ` +
        `around by putting the prose back in the component (MIS-071).`
    );
  }
  const rest = body.slice(i + heading.length + 3);
  const end = rest.indexOf("\n## ");
  return end === -1 ? rest : rest.slice(0, end);
}

/** `- **Label:** value` within one block. Strict: a missing field throws. */
function field(block: string, label: string, gap: string): string {
  const m = block.match(
    new RegExp(`\\*\\*${label}:\\*\\*\\s*([\\s\\S]*?)(?=\\n\\s*-\\s\\*\\*|\\n###|\\n##|$)`)
  );
  if (!m) {
    throw new Error(
      `wardley: component "${gap}" has no "${label}" field in ` +
        `reports/RPT-003-wardley-map.md.`
    );
  }
  return unmark(fold(m[1]));
}

/**
 * Slug for a component name, matching the ids the page's SVG and layer
 * membership already use. Derived rather than stored so the .md stays
 * prose: the document should not have to carry the page's identifiers.
 */
const ID_BY_NAME: Record<string, string> = {
  "Narrative Layer": "narrative",
  Rituals: "rituals",
  "Mission System": "missions",
  "Digital Agents (CAO)": "agents",
  Blueprints: "blueprints",
  "Decision Registry": "decisions",
  "Agent Identity": "identity",
  Protocols: "protocols",
  "Operational Reports": "reports",
  "File Layer (MD + Git)": "files",
  "LLMs / APIs": "llms",
  "GitHub / Git": "github",
};

function slug(name: string): string {
  const id = ID_BY_NAME[name];
  if (!id) {
    throw new Error(
      `wardley: component "${name}" in the report has no known page id. ` +
        `Add it to ID_BY_NAME in web/src/lib/wardley.ts.`
    );
  }
  return id;
}

/** Which of the four layers a component belongs to, by layer label. */
const LAYER_ID: Record<string, string> = {
  "The Foundation": "commodity",
  "The Structure": "foundation",
  "The Differentiators": "differentiator",
  "The Frontier": "frontier",
};

export async function getWardley(): Promise<WardleyDoc> {
  const entry = await getEntry("audits", ENTRY_ID);
  if (!entry) {
    throw new Error(
      `wardley.ts: ${ENTRY_ID} not found in the reports collection. ` +
        `The wardley page renders from that file and has no local copy.`
    );
  }

  const body = entry.body ?? "";
  const title =
    (typeof entry.data?.title === "string" ? entry.data.title : null) ??
    "Wardley Map";

  // ---- Layer Story: four layers, each naming its components -------------
  const layerSec = section(body, "Layer Story (per /wardley)");
  const layers: WardleyLayer[] = [];
  const layerBlocks = layerSec.split(/\n### /).slice(1);
  for (const blk of layerBlocks) {
    const head = blk.slice(0, blk.indexOf("\n"));
    const m = head.match(/^Layer (\d+)\s*—\s*(.+)$/);
    if (!m) continue;
    const rest = blk.slice(head.length);
    const subtitle = rest.match(/^\s*\*(.+?)\*\s*$/m)?.[1]?.trim() ?? "";
    const comps =
      rest.match(/\*\*Components:\*\*\s*(.+)/)?.[1] ?? "";
    // Description is the prose paragraph: not the italic subtitle, not the
    // components line.
    const description = fold(
      rest
        .split("\n")
        .filter(
          (l) =>
            l.trim() &&
            !/^\*.*\*$/.test(l.trim()) &&
            !l.includes("**Components:**") &&
            !/^-{3,}$/.test(l.trim())
        )
        .join(" ")
    );
    layers.push({
      num: Number(m[1]),
      label: m[2].trim(),
      subtitle,
      description,
      componentNames: comps.split("·").map((s) => s.trim()).filter(Boolean),
    });
  }
  if (layers.length !== 4) {
    throw new Error(
      `wardley: expected 4 layers in the Layer Story section, parsed ${layers.length}.`
    );
  }

  // Reverse index: component name -> layer id, from the layer membership.
  const layerOf = new Map<string, string>();
  for (const l of layers) {
    const lid = LAYER_ID[l.label];
    for (const n of l.componentNames) layerOf.set(n, lid ?? "");
  }

  // ---- Component Detail: 12 components, four fields each ----------------
  const compSec = section(body, "Component Detail (per /wardley)");
  const components: WardleyComponent[] = [];
  for (const blk of compSec.split(/\n### /).slice(1)) {
    const name = blk.slice(0, blk.indexOf("\n")).trim();
    const rest = blk.slice(name.length);
    const pos = rest.match(/\*\*Position:\*\*\s*\((\d+),\s*(\d+)\)/);
    if (!pos) {
      throw new Error(
        `wardley: component "${name}" has no Position coordinates in the report.`
      );
    }
    const meta = rest.match(
      /\*\*Evolution:\*\*\s*([^·]+)·\s*\*\*Visibility:\*\*\s*([^·]+)·\s*\*\*Layer:\*\*\s*([^·]+)·/
    );
    components.push({
      id: slug(name),
      name,
      x: Number(pos[1]),
      y: Number(pos[2]),
      evolution: meta?.[1]?.trim() ?? "",
      visibility: meta?.[2]?.trim() ?? "",
      layer: meta?.[3]?.trim() ?? layerOf.get(name) ?? "",
      why: field(rest, "What it does", name),
      tension: field(rest, "Strategic tension", name),
      moat: field(rest, "Moat", name),
    });
  }
  if (components.length !== 12) {
    throw new Error(
      `wardley: expected 12 components in Component Detail, parsed ${components.length}.`
    );
  }

  return {
    title,
    components,
    layers,
    sourceUrl: `/reports/${ENTRY_ID}`,
    mdUrl: `/reports/${ENTRY_ID}.md`,
  };
}
