#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Numen Games S.L.
# SPDX-License-Identifier: MIT
"""Frontmatter census — the evidence base for the header standard.

Answers, with reproducible numbers:
  1. How many .md documents have frontmatter, and how many do not.
  2. Every field in use: count, distinct values, series (top dirs) using it.
  3. The `type` vocabulary as used vs as declared in STD-001.
  4. Data hygiene: dates without time, empty values, v-prefixed versions,
     template placeholders.

Run from the repo root:  python3 scripts/experiments/frontmatter-census.py
Output is deterministic (sorted); diffable between runs.
"""
import json
import os
import re
import sys
from collections import defaultdict

ROOT = os.getcwd()
SKIP_DIRS = {".git", "node_modules", "dist", ".astro", "web", ".hermes",
             ".translation-cache", "evidence"}
# web/ has its own content pipeline (src/content) validated by Astro's own
# schema; the corpus standard governs the .md tree outside it.
# evidence/ is forensic: frozen artifacts, exempt by rule.

DECLARED_TYPE_VOCAB_KEY = "type"


def walk_md():
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for f in sorted(filenames):
            if f.endswith(".md"):
                yield os.path.join(dirpath, f)


FM_RE = re.compile(r"\A---\s*\n(.*?)\n---\s*(\n|\Z)", re.DOTALL)
KV_RE = re.compile(r"^([A-Za-z_][A-Za-z0-9_.-]*):\s*(.*)$")


def parse_fm(text):
    """Line-level parse: top-level keys only. No YAML lib on purpose —
    the census must not die on a malformed file; it must REPORT it."""
    m = FM_RE.match(text)
    if not m:
        return None, None
    fields = {}
    malformed = []
    for line in m.group(1).splitlines():
        if not line or line.startswith("#"):
            continue
        if line[0] in " \t-":  # nested / list item: belongs to previous key
            continue
        kv = KV_RE.match(line)
        if kv:
            fields[kv.group(1)] = kv.group(2).strip().strip("\"'")
        else:
            malformed.append(line[:60])
    return fields, malformed


def series_of(path):
    rel = os.path.relpath(path, ROOT)
    parts = rel.split(os.sep)
    return parts[0] if len(parts) > 1 else "(root)"


def main():
    docs = list(walk_md())
    field_count = defaultdict(int)
    field_values = defaultdict(set)
    field_series = defaultdict(set)
    no_fm = []
    malformed_files = []
    type_values = defaultdict(int)
    hygiene = {"date_no_time": 0, "empty_value": 0, "v_prefixed_version": 0,
               "placeholder": 0}
    placeholder_re = re.compile(r"TODO|TBD|FIXME|\{\{|<.*>|xxx", re.IGNORECASE)
    date_no_time_re = re.compile(r"^\d{4}-\d{2}-\d{2}$")

    for p in docs:
        try:
            text = open(p, encoding="utf-8").read()
        except Exception as e:
            malformed_files.append((os.path.relpath(p, ROOT), f"unreadable: {e}"))
            continue
        fields, malformed = parse_fm(text)
        if fields is None:
            no_fm.append(os.path.relpath(p, ROOT))
            continue
        if malformed:
            malformed_files.append((os.path.relpath(p, ROOT),
                                    f"{len(malformed)} unparsable line(s)"))
        s = series_of(p)
        for k, v in fields.items():
            field_count[k] += 1
            field_values[k].add(v)
            field_series[k].add(s)
            if v == "":
                hygiene["empty_value"] += 1
            if placeholder_re.search(v):
                hygiene["placeholder"] += 1
            if k in ("created", "updated", "date", "closed") and date_no_time_re.match(v):
                hygiene["date_no_time"] += 1
            if k == "version" and v.startswith("v"):
                hygiene["v_prefixed_version"] += 1
        t = fields.get(DECLARED_TYPE_VOCAB_KEY)
        if t is not None:
            type_values[t] += 1

    total = len(docs)
    with_fm = total - len(no_fm)
    rare = {k: c for k, c in field_count.items() if c <= 2}

    out = {
        "total_md": total,
        "with_frontmatter": with_fm,
        "without_frontmatter": len(no_fm),
        "without_frontmatter_files": sorted(no_fm),
        "distinct_fields": len(field_count),
        "fields_used_le2": len(rare),
        "fields": {k: {"count": field_count[k],
                       "distinct_values": len(field_values[k]),
                       "series": sorted(field_series[k])}
                   for k in sorted(field_count, key=lambda k: -field_count[k])},
        "type_values": dict(sorted(type_values.items(), key=lambda kv: -kv[1])),
        "type_distinct": len(type_values),
        "hygiene": hygiene,
        "malformed": sorted(malformed_files),
    }
    json.dump(out, sys.stdout, indent=1, ensure_ascii=False)
    print()


if __name__ == "__main__":
    main()
