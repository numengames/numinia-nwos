// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// The corpus, filtered — and the sections it is made of.
//
// MIS-114. Two things live here because they are the same question asked twice:
// "what may be published" and "what belongs to which section".
//
// WHY A MODULE AND NOT A LINE IN content.config.ts
// The visibility rule has to hold for EVERY consumer of the collection, not
// just for the page that happens to render a document. There are four today
// (corpus/[...slug].astro, corpus/[...slug].md.ts, corpus/index.astro,
// print/[...slug].astro) and MIS-111 adds section indexes on top. A filter
// applied per page is a filter someone forgets on the fifth page.

import { getCollection, type CollectionEntry } from "astro:content";

type Entry = CollectionEntry<"corpus">;

// ---------------------------------------------------------------------------
// VISIBILITY
// ---------------------------------------------------------------------------

// The only value that publishes. Everything else — and everything absent —
// does not.
//
// FAIL CLOSED, AND HERE IS WHAT IT COSTS.
// 30 of the 35 entries in debt/ declare no `visibility` at all, and the five
// that do declare `internal`, `restricted-oracle` or `pending-oracle`. So on
// the day this lands, `debt/` returns to the glob and **publishes nothing**.
// That is not a bug and it is not a silent outcome: each entry becomes visible
// the day someone marks it, deliberately, in its own change.
//
// The alternative — publish unless marked otherwise — puts D-033 on the public
// web the first time somebody forgets a frontmatter field. D-033 enumerates 132
// controls the system claims to satisfy and does not verify: finished
// reconnaissance, with F-48 open. The asymmetry decides the default.
const PUBLIC = "public";

// Only these folders are governed by the field. The rest of the corpus is
// published as it always was.
//
// THIS SCOPE IS THE CORRECTION THAT MADE THE MISSION SAFE.
// The brief says "the rule must fail closed" without naming a scope. Applied to
// the whole collection it would have removed 112 pages in one commit, because
// `visibility` appears in exactly zero documents outside debt/. Measured before
// writing the filter, not discovered after.
const GOVERNED = ["debt/"];

function isGoverned(id: string): boolean {
  return GOVERNED.some((prefix) => id.startsWith(prefix));
}

export function isPublishable(entry: Entry): boolean {
  if (!isGoverned(entry.id)) return true;
  const v = (entry.data as Record<string, unknown>).visibility;
  return typeof v === "string" && v.trim().toLowerCase() === PUBLIC;
}

/** The corpus as the site may show it. Every consumer uses this, never getCollection directly. */
export async function getPublicCorpus(): Promise<Entry[]> {
  return (await getCollection("corpus")).filter(isPublishable);
}

// ---------------------------------------------------------------------------
// SECTIONS
// ---------------------------------------------------------------------------

// The answer to "what counts as a section, and what counts as a document in
// one" — the question MIS-113 depends on. Ordered least to most uncertain,
// which is the order a stranger should read them in.
//
// A section is a TOP-LEVEL FOLDER of the corpus that holds documents a reader
// is meant to browse. That excludes folders that are infrastructure for other
// documents, and it excludes anything already published by a typed collection.
export interface Section {
  /** path prefix inside the corpus collection */
  prefix: string;
  /** route segment under /corpus/ */
  slug: string;
  label: string;
  /** what a reader finds here */
  blurb: string;
  /**
   * Where this section's documents actually live.
   *
   * Four sections resolve under /corpus/<path>. Two do NOT: decisions and
   * blueprints are typed collections with their own detail routes
   * (/decisiones/<id>, /planos/<id>), predating this model. An index that
   * linked them under /corpus/ would 404 on every row — measured, not assumed:
   * /decisiones has 12 pages and /planos 18, none of them under /corpus/.
   *
   * So a section index is not always a listing of its own subtree. It is a
   * listing of a family of documents, wherever the site decided to serve them.
   */
  collection: "corpus" | "decisions" | "blueprints";
}

export const SECTIONS: Section[] = [
  { prefix: "canon/",      slug: "canon",      label: "Canon",      blurb: "What is settled.",            collection: "corpus" },
  { prefix: "standards/",  slug: "standards",  label: "Standards",  blurb: "How it is written.",          collection: "corpus" },
  { prefix: "decisions/",  slug: "decisions",  label: "Decisions",  blurb: "What was chosen, and why.",   collection: "decisions" },
  { prefix: "protocols/",  slug: "protocols",  label: "Protocols",  blurb: "How things are done.",        collection: "corpus" },
  { prefix: "blueprints/", slug: "blueprints", label: "Blueprints", blurb: "What is being built.",        collection: "blueprints" },
  { prefix: "debt/",       slug: "debt",       label: "Debt",       blurb: "What is known to be wrong.",  collection: "corpus" },
];

// NOT sections, and why — recorded so the next reader does not re-litigate it:
//
//   missions/   The 111 MIS-* documents are NOT in this collection; they have
//               their own typed collection and their index is the board at
//               /missions (MIS-115 redesigns it). What remains under
//               missions/ in the corpus is 5 system documents — TEMPLATE,
//               TEMPLATE-CHANGES, TEMPLATE-EXAMPLE, PROPOSAL-closure-guard,
//               ANNEX-mission-selection-draft. Those describe how missions are
//               written; they are not a browsable family of their own, and
//               listing them as "Missions" beside a board of 111 would be a
//               second, poorer answer to the same question.
//
//   agents/     Per-agent state files (MEMORY, STATUS, SOUL). Infrastructure.
//   operations/ Live operational records, not a reading family.
//   guilds/     Definitions referenced from canon rather than browsed.
//   reports/    Dated dailies; chronological, and /reportes already serves them.
//
// A folder can graduate to a section later. Each addition is a decision, made
// here, and the reason for the current six is that a reader can name what each
// one contains in a single sentence — the `blurb` above is the test.

export function sectionOf(entry: Entry): Section | undefined {
  return SECTIONS.find((s) => entry.id.startsWith(s.prefix));
}

/** One row of a section index. */
export interface SectionDoc {
  href: string;
  title: string;
  docId?: string;
  status?: string;
  updated?: string;
}

const str = (v: unknown) => (typeof v === "string" ? v : undefined);

/**
 * The documents of one section, ready to list, sorted by identifier.
 *
 * Sorted by `docId` rather than by date: these are reference families, and a
 * reader looking for C-005 wants it where C-005 belongs. The board at /missions
 * is the surface where recency matters, and MIS-115 governs that.
 */
export async function getSectionDocs(slug: string): Promise<SectionDoc[]> {
  const section = SECTIONS.find((s) => s.slug === slug);
  if (!section) return [];

  let docs: SectionDoc[];

  if (section.collection === "decisions") {
    docs = (await getCollection("decisions")).map((e) => {
      const f = e.data as Record<string, unknown>;
      return {
        href: `/decisiones/${String(f.id).toLowerCase()}`,
        title: str(f.title) ?? String(f.id),
        docId: str(f.id),
        status: str(f.status),
        updated: str(f.updated)?.slice(0, 10),
      };
    });
  } else if (section.collection === "blueprints") {
    docs = (await getCollection("blueprints")).map((e) => {
      const f = e.data as Record<string, unknown>;
      return {
        href: `/planos/${String(f.id).replace(/^BLU-\d+-/i, "").toLowerCase()}`,
        title: str(f.title) ?? String(f.id),
        docId: str(f.id),
        status: str(f.status),
        updated: str(f.updated)?.slice(0, 10),
      };
    });
  } else {
    docs = (await getPublicCorpus())
      .filter((e) => e.id.startsWith(section.prefix))
      .map((e) => {
        const f = e.data as Record<string, unknown>;
        return {
          href: `/corpus/${e.id}`,
          title: str(f.title) ?? e.id.split("/").pop() ?? e.id,
          docId: str(f.id),
          status: str(f.status),
          updated: str(f.updated)?.slice(0, 10),
        };
      });
  }

  // A section is not one collection — it is a FOLDER, and two of them are split
  // across a typed collection and the corpus catch-all. Measured, not assumed:
  //
  //   decisions/   12 ADR-/DEC- in the typed collection + INDEX.md in the corpus
  //   blueprints/  16 BP-* typed + 8 in the corpus (AUDIT-*, BLU-001,
  //                archive-summa-*, INDEX, README)
  //
  // Listing only the typed half would have shown 12 of 13 and 16 of 24, and the
  // missing rows are reachable pages — an index that omits reachable documents
  // is the same lie as an index that lists none, only harder to notice.
  //
  // So for those sections the corpus remainder is appended. `debt/` and the
  // rest are corpus-only and unaffected.
  if (section.collection !== "corpus") {
    const seen = new Set(docs.map((d) => d.href));
    const rest = (await getPublicCorpus())
      .filter((e) => e.id.startsWith(section.prefix))
      .map((e) => {
        const f = e.data as Record<string, unknown>;
        return {
          href: `/corpus/${e.id}`,
          title: str(f.title) ?? e.id.split("/").pop() ?? e.id,
          docId: str(f.id),
          status: str(f.status),
          updated: str(f.updated)?.slice(0, 10),
        };
      })
      .filter((d) => !seen.has(d.href));
    docs = docs.concat(rest);
  }

  return docs.sort((a, b) =>
    (a.docId ?? a.title).localeCompare(b.docId ?? b.title, "en", { numeric: true }),
  );
}
