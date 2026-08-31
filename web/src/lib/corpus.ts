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
// one" — the question MIS-113 depends on.
//
// ORDERED BY AUTHORITY: what binds the rest first, what is bound by everything
// last. The order is not invented here — it is the change-threshold table in
// S-001 §2.1, which is the only place the archive ranks its own series:
//
//   sealed    canon/                              Oracle's signature + an ADR
//   governed  decisions/ · standards/ · protocols/  an ADR, or an approved PR
//   open      blueprints/ · debt/                 a normal PR
//
// Inside `governed` the tie is broken by which one can change which: an ADR
// changes a standard, a standard defines what a protocol must satisfy, a
// protocol says how it is carried out. Nothing under `open` binds anything —
// blueprints propose and debt confesses.
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
  { prefix: "canon/",      slug: "canon",      label: "Canon",      collection: "corpus",
    blurb: "The ground the rest stands on: what Numinia is, before anyone argues about how to build it." },
  { prefix: "decisions/",  slug: "decisions",  label: "Decisions",  collection: "decisions",
    blurb: "Why we went this way and not the other, written down while the reasons were still alive." },
  { prefix: "standards/",  slug: "standards",  label: "Standards",  collection: "corpus",
    blurb: "The bar every artifact has to clear before it counts as done, and who checks that." },
  { prefix: "protocols/",  slug: "protocols",  label: "Protocols",  collection: "corpus",
    blurb: "The steps an actor follows, in order, so the same job comes out the same way twice." },
  { prefix: "blueprints/", slug: "blueprints", label: "Blueprints", collection: "blueprints",
    blurb: "Designs that could be built: argued through on paper, waiting for a decision that turns them real." },
  { prefix: "debt/",       slug: "debt",       label: "Debt",       collection: "corpus",
    blurb: "What we know is broken or missing, admitted in writing before anyone else has to find it." },
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

// ---------------------------------------------------------------------------
// READING ORDER
// ---------------------------------------------------------------------------

// A section index sorted by identifier is sorted by the order things HAPPENED
// TO BE WRITTEN. C-001 came before C-002 because someone typed it first, and
// the reader who lands on /corpus/canon/ inherits that accident as if it were
// an argument. It is not one: "Welcome to Numinia" followed by "Brand and
// Culture" tells a stranger nothing, because the second document answers a
// question the first has not yet made them ask.
//
// So each section declares its own reading order: the sequence in which the
// documents ARGUE, not the sequence in which they were filed. The identifier
// still governs citation — C-005 is C-005 forever, that is ADR-004 — but it
// stops governing the page.
//
// RULES OF THIS TABLE
//   · A document listed here appears in this position.
//   · A document NOT listed falls to the end, ordered by identifier as before.
//     New documents are therefore visible (they pile up at the bottom) rather
//     than silently absorbed into a story that was not written for them.
//   · Keyed by href, which is the one identifier that is unique across the
//     three collections a section can draw from.
//
// `debt/` is deliberately absent: a register of confessions reads by number,
// and there is no story to tell about which defect comes first.
const READING_ORDER: Record<string, string[]> = {
  // What this place is → why the fiction is not decoration → how it becomes
  // an operating system → what it feels like → who lives here → what they are
  // made of → how far they climb → how you get in → what the archive sounds
  // like → what you may take with you.
  canon: [
    "/corpus/canon/c-001-welcome-to-numinia",
    "/corpus/canon/2026_04_15-epistemic_relations_between_numen_games_and_numina-v020",
    "/corpus/canon/2026_04_15-pragmatic_numen_system-v020",
    "/corpus/canon/c-002-brand-and-culture",
    "/corpus/canon/c-004-role-structure",
    "/corpus/canon/c-003-attributes-and-ranks",
    "/corpus/canon/c-007-rank-specifications",
    "/corpus/canon/c-006-session-zero",
    "/corpus/canon/archive-lore",
    "/corpus/canon/c-005-licensing",
    // The folder's cover page, not a document of the canon. Last, until the
    // repo stops publishing READMEs as corpus entries.
    "/corpus/canon/readme",
  ],

  // The life of a document, in the order the archive had to decide it:
  // where it lives → what it is called → how it is registered → what the
  // words mean → what its header must declare → who owns it and where debt
  // is kept → how it dies.
  decisions: [
    "/decisiones/adr-001",
    "/decisiones/adr-004",
    "/decisiones/adr-005",
    "/decisiones/adr-023",
    "/decisiones/adr-027",
    "/decisiones/adr-026",
    "/decisiones/adr-030",
  ],

  // Language first, because nothing below can be read without it. Then power:
  // who may change what. Then form, then craft, then the superseded document
  // kept for the record.
  standards: [
    "/corpus/standards/s-001-glossary",
    "/corpus/standards/2026_04_14-analogous_terminology_numina-v020",
    "/corpus/standards/governance",
    "/corpus/standards/s-004-header-standard",
    "/corpus/standards/s-003-platform-role-system",
    "/corpus/standards/engineering-standards",
    "/corpus/standards/2026_08_18-sistema_de_diseno-v510",
    "/corpus/standards/standards",
  ],

  // One working day, in order: you sit down → you take a mission → you need a
  // ruling → it is stuck, you escalate → you file the result → you audit what
  // you built → you hand the check to CI so nobody has to remember it.
  protocols: [
    "/corpus/protocols/pro-001-agent-session",
    "/corpus/protocols/pro-003-mission-cycle",
    "/corpus/protocols/pro-008-decision",
    "/corpus/protocols/pro-005-escalation",
    "/corpus/protocols/pro-010-how-to-archive",
    "/corpus/protocols/pro-011-security-audit",
    "/corpus/protocols/pro-013-handing-a-guard-to-ci",
  ],

  // Zoom out to zoom in and out again: what the system is → how it is built →
  // the unit of work → the person doing the work → where the work is kept →
  // what things are called → how it is measured → where it is all going.
  blueprints: [
    "/planos/nwos-system",
    "/planos/cao-architecture",
    "/planos/mission-system",
    "/planos/agent-experience",
    "/planos/archive-fondos",
    "/planos/dual-nomenclature",
    "/planos/business-metrics",
    "/planos/wardley-map",
  ],
};

// A story the reader cannot see is just a list in an unusual order. Each
// section gets one line of prose above its rows, in the same voice as the
// blurb: what the sequence is doing, so the order reads as a choice.
export const READING_NOTE: Record<string, string> = {
  canon: "Read top to bottom and the city builds itself: first what this place is, then why the fiction does real work, then who lives here and how far they can climb — and last, what you are free to take with you.",
  decisions: "The life of a document, in the order the archive had to settle it: where it lives, what to call it, what the words mean, what it must declare, and how it is allowed to die.",
  standards: "Language first — nothing below can be read without it. Then who may change what, then the shape a document takes, then how the thing gets built.",
  protocols: "One working day, in order: you sit down, you take a mission, you need a ruling, you get stuck, you file the result — and then you hand the checking to a machine that never forgets.",
  blueprints: "Zoom out, then in, then out again: the system, its architecture, the unit of work, the person doing it, where it is all kept — and where it is going.",
  debt: "No order to argue about. These are confessions, filed by number, and the point of the register is that none of them is hidden.",
};

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
        href: `/planos/${String(e.id).replace(/^BLU-\d+-/i, "").toLowerCase()}`,
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

  // The reading order decides the page; the identifier only breaks ties among
  // documents the story does not yet mention. See READING_ORDER above.
  const order = READING_ORDER[slug] ?? [];
  const rank = (d: SectionDoc) => {
    const i = order.indexOf(d.href.replace(/\/$/, ""));
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };

  return docs.sort((a, b) => {
    const ra = rank(a);
    const rb = rank(b);
    if (ra !== rb) return ra - rb;
    return (a.docId ?? a.title).localeCompare(b.docId ?? b.title, "en", { numeric: true });
  });
}
