// missions.ts — fetches mission .md files from numinia-digital-agents via GitHub API at build time
// Repo: https://github.com/numengames/numinia-digital-agents (public, CC0)
// Fallback: local filesystem when running in dev with both repos side by side

import fs from "node:fs";
import path from "node:path";

export type MissionStatus = "todo" | "in-progress" | "in-review" | "done" | "freeze" | "cancelled";
export type MissionPriority = "critical" | "high" | "medium" | "low";
export type MissionType = "biological" | "digital" | "hybrid";
export type MissionEffort = "XS" | "S" | "M" | "L" | "XL";
export type MissionGuild = "Sentinels" | "Alchemists" | "Exegetes" | "Procurators";

export interface Mission {
  id: string;
  title: string;
  area: string;
  guild: MissionGuild;
  type: MissionType;
  priority: MissionPriority;
  effort: MissionEffort;
  status: MissionStatus;
  hasDetail?: boolean;
  assignedTo?: string;
  started?: string;
  completed?: string;
  humanCostEur: number;
  computeCostEur: number | null;
}

const HUMAN_COST: Record<MissionEffort, number> = { XS: 130, S: 520, M: 1560, L: 3900, XL: 7800 };
const COMPUTE_MOCK: Record<MissionEffort, number> = { XS: 0.5, S: 1.5, M: 4, L: 10, XL: 25 };

const DETAIL_IDS = new Set(["MIS-016", "MIS-037", "MIS-051", "MIS-053", "MIS-052", "MIS-054", "MIS-055"]);

// ── Frontmatter parser ────────────────────────────────────────────────────────
function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const result: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    result[key] = val;
  }
  return result;
}

// ── Normalizers ───────────────────────────────────────────────────────────────
function normalizeId(raw: string): string {
  // MIS-00037 → MIS-037, MIS-1 → MIS-001
  const m = raw.match(/^MIS-(\d+)/i);
  if (!m) return raw;
  const n = parseInt(m[1], 10);
  return "MIS-" + String(n).padStart(3, "0");
}

function normalizeStatus(v: string, folderStatus: MissionStatus): MissionStatus {
  const map: Record<string, MissionStatus> = {
    todo: "todo", backlog: "todo",
    "in-progress": "in-progress", "en-curso": "in-progress", active: "in-progress",
    "in-review": "in-review", revision: "in-review", "en-revision": "in-review",
    done: "done", freeze: "freeze", frozen: "freeze", cancelled: "cancelled",
  };
  return map[v?.toLowerCase()] ?? folderStatus;
}

function normalizePriority(v: string): MissionPriority {
  const map: Record<string, MissionPriority> = {
    critical: "critical", crítica: "critical", critica: "critical",
    high: "high", alta: "high",
    medium: "medium", media: "medium",
    low: "low", baja: "low",
  };
  return map[v?.toLowerCase()] ?? "medium";
}

function normalizeType(v: string): MissionType {
  const map: Record<string, MissionType> = {
    digital: "digital",
    biological: "biological", biológico: "biological", biologico: "biological",
    hybrid: "hybrid", híbrido: "hybrid", hibrido: "hybrid",
  };
  return map[v?.toLowerCase()] ?? "hybrid";
}

function normalizeEffort(v: string): MissionEffort {
  return (["XS", "S", "M", "L", "XL"].includes(v?.toUpperCase()) ? v.toUpperCase() : "M") as MissionEffort;
}

function normalizeGuild(v: string): MissionGuild {
  const map: Record<string, MissionGuild> = {
    sentinels: "Sentinels", centinelas: "Sentinels",
    alchemists: "Alchemists", alquimistas: "Alchemists",
    exegetes: "Exegetes", exegetas: "Exegetes",
    procurators: "Procurators", procuradores: "Procurators",
  };
  return map[v?.toLowerCase()] ?? "Sentinels";
}

function mdToMission(content: string, folderStatus: MissionStatus): Mission | null {
  const fm = parseFrontmatter(content);
  const rawId = fm.id || "";
  if (!rawId.toUpperCase().startsWith("MIS-")) return null;

  const id = normalizeId(rawId);
  const effort = normalizeEffort(fm.effort);
  const type = normalizeType(fm.tipo || fm.type);

  return {
    id,
    title: fm.title || fm.titulo || id,
    area: fm.area || "CAO",
    guild: normalizeGuild(fm.guild),
    type,
    priority: normalizePriority(fm.priority || fm.prioridad),
    effort,
    status: normalizeStatus(fm.status, folderStatus),
    assignedTo: fm.assigned_to || undefined,
    started: fm.started || undefined,
    completed: fm.completed || undefined,
    hasDetail: DETAIL_IDS.has(id),
    humanCostEur: HUMAN_COST[effort],
    computeCostEur: type === "biological" ? null : COMPUTE_MOCK[effort],
  };
}

// ── GitHub API loader (used on Vercel / CI) ───────────────────────────────────
const REPO = "numengames/numinia-digital-agents";
const BRANCH = "main";
const FOLDERS: [string, MissionStatus][] = [
  ["missions/queue",  "todo"],
  ["missions/active", "in-progress"],
  ["missions/review", "in-review"],
  ["missions/done",   "done"],
  ["missions/freeze", "freeze"],
  // legacy fallback
  ["missions/backlog","todo"],
];

async function fetchFromGitHub(): Promise<Mission[]> {
  const seen = new Set<string>();
  const all: Mission[] = [];

  for (const [folder, folderStatus] of FOLDERS) {
    const url = "https://api.github.com/repos/" + REPO + "/contents/" + folder + "?ref=" + BRANCH;
    let files: Array<{ name: string; download_url: string }>;

    try {
      const res = await fetch(url, { headers: { "User-Agent": "pablofm-web-build" } });
      if (!res.ok) continue;
      files = await res.json();
    } catch {
      continue;
    }

    for (const file of files) {
      if (!file.name.endsWith(".md") || file.name === "TEMPLATE.md") continue;
      try {
        const raw = await fetch(file.download_url);
        const content = await raw.text();
        const mission = mdToMission(content, folderStatus);
        if (mission && !seen.has(mission.id)) {
          seen.add(mission.id);
          all.push(mission);
        }
      } catch {
        // skip malformed
      }
    }
  }

  return all;
}

// ── Local filesystem loader (dev with both repos present) ─────────────────────
function loadFromFilesystem(): Mission[] {
  const repoBase = path.resolve(
    path.dirname(new URL(import.meta.url).pathname),
    "../../..",
    "numinia-digital-agents/missions"
  );
  if (!fs.existsSync(repoBase)) return [];

  const seen = new Set<string>();
  const all: Mission[] = [];

  for (const [folder, folderStatus] of FOLDERS) {
    const folderPath = path.join(repoBase, "..", folder);
    if (!fs.existsSync(folderPath)) continue;
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".md") && f !== "TEMPLATE.md");
    for (const file of files) {
      try {
        const content = fs.readFileSync(path.join(folderPath, file), "utf-8");
        const mission = mdToMission(content, folderStatus);
        if (mission && !seen.has(mission.id)) {
          seen.add(mission.id);
          all.push(mission);
        }
      } catch { /* skip */ }
    }
  }

  return all;
}

// ── Main loader ───────────────────────────────────────────────────────────────
async function loadMissions(): Promise<Mission[]> {
  // Try local first (dev mode)
  const local = loadFromFilesystem();
  if (local.length > 0) {
    return local.sort((a, b) => parseInt(a.id.slice(4)) - parseInt(b.id.slice(4)));
  }
  // Fetch from GitHub (Vercel / CI)
  const remote = await fetchFromGitHub();
  return remote.sort((a, b) => parseInt(a.id.slice(4)) - parseInt(b.id.slice(4)));
}

export const missions: Mission[] = await loadMissions();

// ── Display helpers ───────────────────────────────────────────────────────────
export const PRIORITY_ORDER: Record<MissionPriority, number> = {
  critical: 0, high: 1, medium: 2, low: 3,
};

export const PRIORITY_COLOR: Record<MissionPriority, string> = {
  critical: "bg-red/10 text-red",
  high: "bg-accent/10 text-accent",
  medium: "bg-yellow/10 text-yellow",
  low: "bg-green/10 text-green-400",
};

export const PRIORITY_ICON: Record<MissionPriority, string> = {
  critical: "🔴", high: "🟠", medium: "🟡", low: "🟢",
};

export const TYPE_ICON: Record<MissionType, string> = {
  biological: "🧬", digital: "🤖", hybrid: "🔀",
};

export const STATUS_LABEL: Record<MissionStatus, string> = {
  "todo": "To Do",
  "in-progress": "In Progress",
  "in-review": "In Review",
  "done": "Done",
  "freeze": "Freeze",
  "cancelled": "Cancelled",
};

export const STATUS_COLOR: Record<MissionStatus, string> = {
  "todo": "border-border bg-card",
  "in-progress": "border-accent/20 bg-accent/5",
  "in-review": "border-yellow/20 bg-yellow/5",
  "done": "border-green/20 bg-green/5",
  "freeze": "border-dim/20 bg-dim/5",
  "cancelled": "border-dim/10 bg-dim/5 opacity-50",
};

export const STATUS_ID_COLOR: Record<MissionStatus, string> = {
  "todo": "text-dim",
  "in-progress": "text-accent",
  "in-review": "text-yellow",
  "done": "text-green-400",
  "freeze": "text-dim",
  "cancelled": "text-dim",
};

export const GUILDS = ["Sentinels", "Alchemists", "Exegetes", "Procurators"] as const;
export const AREAS = [...new Set(missions.map(m => m.area))].sort();
