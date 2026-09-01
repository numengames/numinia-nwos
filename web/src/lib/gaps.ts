// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// MIS-071 phase 4 — the gaps page reads the file instead of holding a copy.
//
// RPT-2026-04-07-gaps-capability-map.md was extracted from gaps.astro in phase
// 2 (2026-08-17) and then nothing read it: the page kept its own hardcoded
// Spanish array and the .md sat beside it as a second, silent archive. This
// parser closes that loop — the report is the source, the page is the lens.
//
// The shape is not invented here. It is the shape the document already has:
//
//   ## Perspective N — <name>
//   ### <gap title>
//   - **Impact:** 10/10 · **Urgency:** 9/10
//   - **Description:** …
//   - **Blind spot:** …
//   - **Question for the Oracles:** "…"
//
// All 19 gaps carry those four fields. Parsing is strict on purpose: a
// malformed or renamed field throws at build time rather than rendering a
// page with silently missing prose. A build that fails is a guard; a page
// that quietly loses a paragraph is the failure mode this mission exists
// to end.
import { getEntry } from "astro:content";

export interface Gap {
  /** Heading text, verbatim from the ### line. */
  name: string;
  /** Prose under **Description:**, newlines folded. */
  description: string;
  /** Prose under **Blind spot:** — what the founders cannot see from inside. */
  blindSpot: string;
  /** The question posed to the Oracles, quotes stripped. */
  question: string;
  /** 0–10, from "**Impact:** N/10". */
  impact: number;
  /** 0–10, from "· **Urgency:** N/10". */
  urgency: number;
}

export interface Perspective {
  /** e.g. "Business", "Product", "Organizational Theory". */
  name: string;
  /** Perspective number as written in the heading. */
  index: number;
  gaps: Gap[];
}

export interface GapsDocument {
  title: string;
  /** Prose under ## Introduction. */
  introduction: string;
  perspectives: Perspective[];
  /** Convenience: every gap, flattened, document order preserved. */
  all: Gap[];
  /** Address of the source document in the corpus mirror. */
  sourceUrl: string;
  /** Raw .md endpoint, for the DocToolbar. */
  mdUrl: string;
}

const ENTRY_ID = "reports/rpt-2026-04-07-gaps-capability-map";

/**
 * Collapse the .md's hard-wrapped lines into flowing prose.
 *
 * Also drops a trailing `---` rule: the last field of the last gap in a
 * perspective runs up against the document's horizontal rule, which would
 * otherwise be folded into the sentence.
 */
function fold(text: string): string {
  return text
    .replace(/\n\s*-{3,}\s*$/, "")
    .replace(/\s*\n\s*/g, " ")
    .replace(/\s*-{3,}\s*$/, "")
    .trim();
}

/** Strip the surrounding quotes the Oracle questions are written with. */
function unquote(text: string): string {
  return text.replace(/^["“”']+|["“”']+$/g, "").trim();
}

/**
 * Read one `- **Label:** …` field out of a gap block.
 * Continuation lines are indented; the field ends at the next `- **` or EOF.
 */
function field(block: string, label: string): string {
  const re = new RegExp(
    `-\\s\\*\\*${label}:\\*\\*\\s*([\\s\\S]*?)(?=\\n-\\s\\*\\*|$)`,
    "i"
  );
  const m = block.match(re);
  if (!m) {
    throw new Error(
      `gaps.ts: field "${label}" missing from a gap block in ${ENTRY_ID}. ` +
        `The document's shape changed; update this parser rather than ` +
        `letting the page drop the field silently.`
    );
  }
  return fold(m[1]);
}

/** Parse "**Impact:** 9/10 · **Urgency:** 10/10" into two numbers. */
function scores(block: string): { impact: number; urgency: number } {
  const m = block.match(
    /-\s\*\*Impact:\*\*\s*(\d+)\/10\s*·\s*\*\*Urgency:\*\*\s*(\d+)\/10/i
  );
  if (!m) {
    throw new Error(
      `gaps.ts: impact/urgency line missing or malformed in ${ENTRY_ID}.`
    );
  }
  return { impact: Number(m[1]), urgency: Number(m[2]) };
}

/**
 * Read RPT-2026-04-07 and return its structure.
 *
 * Throws at build time if the document is missing or its shape has drifted.
 * That is deliberate: this page has no content of its own to fall back on.
 */
export async function getGaps(): Promise<GapsDocument> {
  const entry = await getEntry("corpus", ENTRY_ID);
  if (!entry) {
    throw new Error(
      `gaps.ts: ${ENTRY_ID} not found in the corpus collection. ` +
        `The gaps page renders from that file and has no local copy.`
    );
  }

  const body = entry.body ?? "";
  const title =
    (typeof entry.data?.title === "string" ? entry.data.title : null) ??
    "Gaps";

  const introMatch = body.match(/^##\s+Introduction\s*\n([\s\S]*?)(?=\n##\s)/m);
  const introduction = introMatch ? fold(introMatch[1]) : "";

  // Split on perspective headings, keeping the heading with its block.
  const perspectives: Perspective[] = [];
  const pRe = /^##\s+Perspective\s+(\d+)\s*—\s*(.+?)\s*$/gm;
  const marks: { index: number; name: string; start: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = pRe.exec(body)) !== null) {
    marks.push({
      index: Number(m[1]),
      name: m[2].trim(),
      start: m.index + m[0].length,
    });
  }
  if (marks.length === 0) {
    throw new Error(
      `gaps.ts: no "## Perspective N — name" headings found in ${ENTRY_ID}.`
    );
  }

  for (let i = 0; i < marks.length; i++) {
    const from = marks[i].start;
    // A perspective runs to the next perspective, or to the next ## heading
    // after it (the document ends with sections that are not perspectives).
    const rest = body.slice(from);
    const nextTop = rest.search(/^##\s/m);
    const chunk = nextTop === -1 ? rest : rest.slice(0, nextTop);

    const gaps: Gap[] = [];
    const gRe = /^###\s+(.+?)\s*$/gm;
    const gMarks: { name: string; start: number }[] = [];
    let g: RegExpExecArray | null;
    while ((g = gRe.exec(chunk)) !== null) {
      gMarks.push({ name: g[1].trim(), start: g.index + g[0].length });
    }

    for (let j = 0; j < gMarks.length; j++) {
      const end = j + 1 < gMarks.length ? gMarks[j + 1].start : chunk.length;
      // Trim the trailing ### of the next gap out of this block.
      const raw = chunk.slice(gMarks[j].start, end).replace(/###\s+.*$/s, "");
      const { impact, urgency } = scores(raw);
      gaps.push({
        name: gMarks[j].name,
        description: field(raw, "Description"),
        blindSpot: field(raw, "Blind spot"),
        question: unquote(field(raw, "Question for the Oracles")),
        impact,
        urgency,
      });
    }

    perspectives.push({
      index: marks[i].index,
      name: marks[i].name,
      gaps,
    });
  }

  const all = perspectives.flatMap((p) => p.gaps);
  if (all.length === 0) {
    throw new Error(
      `gaps.ts: parsed 0 gaps from ${ENTRY_ID}. The page would render empty.`
    );
  }

  return {
    title,
    introduction,
    perspectives,
    all,
    sourceUrl: `/corpus/${ENTRY_ID}`,
    mdUrl: `/corpus/${ENTRY_ID}.md`,
  };
}
