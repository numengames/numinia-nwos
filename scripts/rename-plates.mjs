#!/usr/bin/env node
/**
 * rename-plates.mjs — one-shot migration of rule plates to the ADR-043 shape
 * (three letters, three digits). Run once, in one pull request; kept so the
 * map is reviewable and the run is repeatable.
 *
 *   node scripts/rename-plates.mjs            # dry run: counts per plate
 *   node scripts/rename-plates.mjs --write    # rewrite tracked text files
 *
 * The number is kept (CORE-12 → IDN-012): a plate is a name, and keeping the
 * digits makes every old citation recoverable by eye. The prefix follows the
 * section of STD-009 that held the rule, which is the standard it will move to
 * when the series is cut. Five header rules (CORE-16..20) would collide with
 * the header checks H-16..H-20 under HDR-, and take HDR-040..044. CORE-57 sits
 * in the Secrets section but is a rule about audits; it goes with evidence.
 *
 * Not renamed: retired plates (CORE-31..44, CORE-66) — historical mentions
 * stay as written (ADR-043 decision 8); guard check codes that no document
 * defines as a rule (N-, T-, S-, D-, PW-, RULE-); telemetry/ (regenerated).
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const WRITE = process.argv.includes('--write');

const BY_SECTION = {
  PRE: [1, 2, 3, 4, 5],
  AUT: [6, 7, 8, 9, 10, 63, 65, 67],
  IDN: [11, 12, 13, 14, 15],
  VER: [21, 22, 23, 24, 64],
  GIT: [25, 26, 27, 28, 29, 30, 45, 46, 47, 48, 49],
  CIT: [50, 51, 52, 53],
  KEY: [54, 55, 56],
  EVI: [57],
  LIC: [58, 59, 60],
};

/** @type {Map<string,string>} old plate → new plate */
export const MAP = new Map();
for (const [prefix, nums] of Object.entries(BY_SECTION)) {
  for (const n of nums) MAP.set(`CORE-${String(n).padStart(2, '0')}`, `${prefix}-${String(n).padStart(3, '0')}`);
}
// Header rules: HDR-040..044, because H-16..H-20 exist.
[16, 17, 18, 19, 20].forEach((n, i) => MAP.set(`CORE-${n}`, `HDR-${String(40 + i).padStart(3, '0')}`));
// Header checks H-00..H-39 → HDR-0NN (same number).
for (let n = 0; n < 40; n++) MAP.set(`H-${String(n).padStart(2, '0')}`, `HDR-${String(n).padStart(3, '0')}`);
// Archive substance A-01..11 → TXT (plain text is sovereign).
for (let n = 1; n <= 11; n++) MAP.set(`A-${String(n).padStart(2, '0')}`, `TXT-${String(n).padStart(3, '0')}`);
// Platform ranks RK-01..04 → RNK.
for (let n = 1; n <= 4; n++) MAP.set(`RK-${String(n).padStart(2, '0')}`, `RNK-${String(n).padStart(3, '0')}`);
// Engineering: already three letters, pad the number. PM → TRC (traceability).
for (let n = 1; n <= 12; n++) MAP.set(`SEC-${String(n).padStart(2, '0')}`, `SEC-${String(n).padStart(3, '0')}`);
for (let n = 1; n <= 10; n++) MAP.set(`ARC-${String(n).padStart(2, '0')}`, `ARC-${String(n).padStart(3, '0')}`);
for (let n = 1; n <= 7; n++) MAP.set(`DEV-${String(n).padStart(2, '0')}`, `DEV-${String(n).padStart(3, '0')}`);
for (let n = 1; n <= 5; n++) MAP.set(`PM-${String(n).padStart(2, '0')}`, `TRC-${String(n).padStart(3, '0')}`);
// Corpus does not grow DEF-01..07 → pad.
for (let n = 1; n <= 7; n++) MAP.set(`DEF-${String(n).padStart(2, '0')}`, `DEF-${String(n).padStart(3, '0')}`);

// Uniqueness of the targets, and no target prefix is a series prefix.
const targets = [...MAP.values()];
if (new Set(targets).size !== targets.length) throw new Error('duplicate target plate');
const SERIES = new Set(['ADR', 'BLU', 'CAN', 'DBT', 'DEC', 'GLD', 'INF', 'MIS', 'OPS', 'PRO', 'RPT', 'STD', 'SYS']);
for (const t of targets) if (SERIES.has(t.slice(0, 3))) throw new Error(`plate prefix collides with series: ${t}`);

// Old plates are matched only as whole tokens: a letter, digit or hyphen on
// either side means it is part of something else (SHA-256, PRO-016-…).
const OLD_RE = /(?<![A-Za-z0-9-])(CORE|H|A|RK|SEC|ARC|DEV|PM|DEF)-(\d{2})(?![0-9-])/g;

const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean)
  .filter((f) => !f.startsWith('telemetry/') && !f.endsWith('rename-plates.mjs') && /\.(md|mjs|ts|tsx|astro|json|ya?ml|py|txt)$/.test(f) || f === '.github/CODEOWNERS');

const counts = new Map();
let touched = 0;
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  const out = src.replace(OLD_RE, (whole) => {
    const to = MAP.get(whole);
    if (!to) return whole; // retired or unknown: left as written
    counts.set(whole, (counts.get(whole) ?? 0) + 1);
    return to;
  });
  if (out !== src) {
    touched++;
    if (WRITE) writeFileSync(f, out);
  }
}

const total = [...counts.values()].reduce((a, b) => a + b, 0);
const byPrefix = {};
for (const [k, v] of counts) { const p = k.split('-')[0]; byPrefix[p] = (byPrefix[p] ?? 0) + v; }
console.log(`rename-plates: ${MAP.size} plates in the map, ${counts.size} seen, ${total} occurrences in ${touched} files${WRITE ? ' — written' : ' (dry run)'}`);
console.log('  by old prefix:', Object.entries(byPrefix).map(([k, v]) => `${k} ${v}`).join(' · '));
const unseen = [...MAP.keys()].filter((k) => !counts.has(k));
if (unseen.length) console.log('  in the map, never cited:', unseen.join(' '));
