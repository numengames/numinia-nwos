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

export const collections = { missions };
