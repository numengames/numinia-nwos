// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
// Missions are read from the repo's flat missions/ folder at build time
// (MIS-066): the folder is the single source of truth, no index file.
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const missions = defineCollection({
  loader: glob({ pattern: "MIS-*.md", base: "../missions" }),
  schema: z
    .object({
      id: z.string(),
      title: z.string(),
      status: z.string().default("backlog"),
      priority: z.string().default("medium"),
      effort: z.string().default("M"),
      guild: z.string().optional(),
      area: z.string().optional(),
      type_execution: z.string().optional(),
      assigned_to: z.string().nullable().optional(),
      completed: z.string().nullable().optional(),
    })
    .passthrough(),
});

// Audit reports are read from the repo's reports/audits/ folder at build
// time — same source-of-truth pattern as missions.
const audits = defineCollection({
  loader: glob({ pattern: "*.md", base: "../reports/audits" }),
  schema: z
    .object({
      id: z.string(),
      title: z.string(),
      status: z.string().default("draft"),
      created: z.string(),
      author: z.string().optional(),
      tags: z.array(z.string()).default([]),
    })
    .passthrough(),
});

// Decision records — the root decisions/ folder is the source of truth
// (MIS-065: the hardcoded decisiones.ts copy retires).
const decisions = defineCollection({
  loader: glob({ pattern: ["DEC-*.md", "ADR-*.md"], base: "../decisions" }),
  schema: z
    .object({
      id: z.string(),
      title: z.string(),
      status: z.string().default("active"),
      area: z.string().optional(),
      created: z.string(),
    })
    .passthrough(),
});

// Blueprints/planos — the root blueprints/ folder is the source of truth
// (MIS-065: the hardcoded planos.ts copy retires).
const blueprints = defineCollection({
  loader: glob({ pattern: ["BP-*.md", "WARDLEY-MAP.md"], base: "../blueprints" }),
  schema: z
    .object({
      id: z.string(),
      title: z.string(),
      status: z.string().default("active"),
      area: z.string().optional(),
      semaforo: z.string().optional(),
      created: z.string(),
    })
    .passthrough(),
});

// The fondos' lore lines — reserved-regime canon content, kept in its own
// file (one file, one regime; C-005 §5) and read here only for display.
const canonLore = defineCollection({
  loader: glob({ pattern: "archive-lore.md", base: "../canon" }),
  schema: z.object({ lore: z.record(z.string(), z.string()) }).passthrough(),
});

// Legal artifacts — operations/legal/ is the master copy (per the FLAG-1
// record): the published pages derive from it at build time. Reserved-
// rights content, read here only for display (C-005 §5). Publication with
// open review flags is an Oracle-ordered exception — see CON-004/CON-005.
const legal = defineCollection({
  loader: glob({ pattern: "*.md", base: "../operations/legal" }),
  schema: z
    .object({
      id: z.string(),
      title: z.string(),
      status: z.string().default("active"),
      version: z.string().optional(),
      updated: z.string().optional(),
    })
    .passthrough(),
});

export const collections = { missions, audits, decisions, blueprints, canonLore, legal };
