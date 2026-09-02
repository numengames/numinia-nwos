/**
 * scripts/lib/frontmatter.mjs — the one frontmatter reader and the one rules loader.
 *
 * MIS-138 D1.1: guards and the telemetry instrument classify documents with the
 * same code reading the same data (`rules.json`). Until 2026-09-02 lint-frontmatter
 * and lint-naming each carried a private `parseFM`; the two differed in one
 * respect (a bare `key:` followed by an indented block read as '' in one and as a
 * nested marker in the other). This is the lint-frontmatter version — the stricter
 * one, the one whose false positive nearly deleted 90 lines and was fixed.
 *
 * Deliberately not a YAML parser: the corpus's frontmatter is flat scalars by
 * standard (STD-004), and check-frontmatter-yaml.mjs already verifies the file is
 * real YAML. This reader answers "what does field X say" without a dependency.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

/** Sentinel for a `key:` whose value is an indented mapping/list, not ''. */
export const NESTED = '\u0000nested\u0000';

const FM_RE = /^---\s*\n([\s\S]*?)\n---(\n|$)/;

/** Parse the frontmatter block of `text` into flat {key: string}. null if none. */
export function parseFM(text) {
  const m = text.match(FM_RE);
  if (!m) return null;
  const fields = {};
  const lines = m[1].split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line || line.startsWith('#') || /^[\s\t-]/.test(line)) continue;
    const kv = line.match(/^([A-Za-z_][A-Za-z0-9_.-]*):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim().replace(/^["']|["']$/g, '');
    if (v === '' && i + 1 < lines.length && /^[ \t]/.test(lines[i + 1])) v = NESTED;
    fields[kv[1]] = v;
  }
  return fields;
}

/** The raw frontmatter text (between the fences), or '' if none. */
export function rawFM(text) {
  const m = text.match(FM_RE);
  return m ? m[1] : '';
}

/** Body without the frontmatter block. */
export function stripFM(text) {
  return text.replace(/^---\s*\n[\s\S]*?\n---/, '');
}

let _rules = null;
/** rules.json, parsed once. */
export function loadRules() {
  if (!_rules) _rules = JSON.parse(readFileSync(path.join(ROOT, 'scripts', 'lib', 'rules.json'), 'utf8'));
  return _rules;
}

/** Every top-level series key (has a naming scheme or not). */
export function seriesDirs(rules = loadRules()) {
  return Object.keys(rules.series).filter((k) => !k.startsWith('_'));
}

/** prefix → directory, including retired prefixes (for reference resolution). */
export function prefixToDir(rules = loadRules()) {
  const out = {};
  for (const dir of seriesDirs(rules)) for (const p of rules.series[dir].prefix) out[p] = dir;
  for (const [p, dir] of Object.entries(rules.retiredPrefixes)) if (!p.startsWith('_')) out[p] = dir;
  return out;
}

/** D-014: is this tracked path apparatus (scaffolding, not a series member)? `fm` optional. */
export function isApparatus(rel, fm = null, rules = loadRules()) {
  const base = path.basename(rel);
  const a = rules.apparatus;
  if (a.basenames.includes(base)) return true;
  if (a.pathPatterns.some((p) => new RegExp(p).test(rel))) return true;
  return !!(fm && fm.type === 'meta');
}

/** lint-frontmatter's IS_TEMPLATE: template files whose dates are not held to H-06. */
export function isTemplate(rel, rules = loadRules()) {
  return rules.apparatus.templatePatterns.some((p) => new RegExp(p).test(rel));
}
