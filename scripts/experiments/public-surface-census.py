#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Numen Games S.L.
# SPDX-License-Identifier: MIT
"""Census of web/public/ using the guard's REAL classifier.

v1 defect: looked for `ASSET_EXT = new Set([...])`, which does not exist. The
guard uses ASSET_RE, a regex (line 73). My script found nothing, defaulted to
"no extension is an asset" and reported all 66 files as content — while the
guard itself reported 12. When my number disagrees with the instrument's, the
instrument is right.

Read-only.
"""
import os
import re
from collections import Counter

ROOT = "/var/home/uruk/arkitecktonia-home/repos/numinia-nwos"
PUBLIC = os.path.join(ROOT, "web", "public")
DIST = os.path.join(ROOT, "web", "dist")

guard = open(os.path.join(ROOT, "scripts/check-orphan-content.mjs"),
             encoding="utf-8").read()

# The classifier is READ FROM THE GUARD, never re-declared here. If it cannot be
# found, this script MUST die loudly: the first version of this census looked for
# an `ASSET_EXT` Set that does not exist, silently fell back to "nothing is an
# asset", and reported all 66 files as content while the guard itself reported 12.
# It never failed, so it would never have been reviewed. An instrument that is
# wrong in silence is worse than one that is missing.
m = re.search(r"const ASSET_RE = /\\\.\((.*?)\)\$/i", guard)
if not m:
    raise SystemExit(
        "FATAL: ASSET_RE not found in check-orphan-content.mjs.\n"
        "  The guard's classifier moved or was renamed. This census refuses to\n"
        "  guess: a wrong classifier reports every file as content and looks\n"
        "  plausible. Fix the pattern here, do not fall back to a default."
    )
ASSET_RE = re.compile(r"\.(" + m.group(1) + r")$", re.I)
print("ASSET_RE (read from the guard): .(%s)$\n" % m.group(1))

m2 = re.search(r"const ALLOWED = new Map\(\[(.*?)\n\]\)", guard, re.S)
if not m2:
    raise SystemExit(
        "FATAL: ALLOWED map not found in check-orphan-content.mjs.\n"
        "  Refusing to report an empty allow-list, which would mark every\n"
        "  tolerated file as a new violation."
    )
allowed = set(re.findall(r'\["([^"]+)",', m2.group(1)))

# The guard also exempts DECLARATION FILES by rule (not by list): a *.license
# whose target exists beside it, REUSE.toml, LICENSE-*. Read that classifier from
# the guard too, for the same reason as ASSET_RE — if this census re-declares it,
# the two drift and the census silently disagrees with the instrument.
if "DECLARATION_RE" not in guard or "classifyDeclaration" not in guard:
    raise SystemExit(
        "FATAL: declaration-file rule not found in check-orphan-content.mjs.\n"
        "  This census would over-report declaration files as orphans."
    )
DECL_RE = re.compile(r"(^|/)(REUSE\.toml|LICENSE(-[^/]*)?(\.[a-z0-9]+)?)$", re.I)


def is_declaration(rel, public_dir):
    """Mirror of classifyDeclaration(): returns 'ok', 'broken' or None."""
    if rel.lower().endswith(".license"):
        target = rel[: -len(".license")]
        return "ok" if os.path.exists(os.path.join(public_dir, target)) else "broken"
    return "ok" if DECL_RE.search(rel) else None

rows = []
for dirpath, _, files in os.walk(PUBLIC):
    for f in files:
        rel = os.path.relpath(os.path.join(dirpath, f), PUBLIC).replace(os.sep, "/")
        rows.append({
            "rel": rel,
            "in_dist": os.path.exists(os.path.join(DIST, rel)),
            "asset": bool(ASSET_RE.search(rel)),
            "decl": is_declaration(rel, PUBLIC),
            "allowed": rel in allowed,
        })

in_dist = [r for r in rows if r["in_dist"]]
non_asset = [r for r in in_dist if not r["asset"]]
declarations = [r for r in non_asset if r["decl"] == "ok"]
broken = [r for r in non_asset if r["decl"] == "broken"]
orphans = [r for r in non_asset if r["decl"] is None]
unlisted = [r for r in orphans if not r["allowed"]]

print("files in public/            : %d" % len(rows))
print("of those, present in dist/  : %d" % len(in_dist))
print("declaration files (by rule) : %d" % len(declarations))
print("BROKEN declarations         : %d" % len(broken))
print("non-asset (orphan content)  : %d" % len(orphans))
print("  listed in ALLOWED         : %d" % (len(orphans) - len(unlisted)))
print("  UNLISTED (guard fails)    : %d" % len(unlisted))

if declarations:
    print("\n=== DECLARATION FILES — exempt by rule, still counted ===")
    for r in sorted(declarations, key=lambda x: x["rel"]):
        print("  [decl]     %s" % r["rel"])
if broken:
    print("\n=== BROKEN DECLARATIONS — guard fails on these ===")
    for r in sorted(broken, key=lambda x: x["rel"]):
        print("  [BROKEN]   %s" % r["rel"])

print("\n=== EVERY ORPHAN ===")
for r in sorted(orphans, key=lambda x: x["rel"]):
    print("  [%-8s] %s" % ("ALLOWED" if r["allowed"] else "UNLISTED", r["rel"]))

if unlisted:
    print("\n  *** %d file(s) would fail the guard ***" % len(unlisted))
    for r in unlisted:
        print("      %s" % r["rel"])
else:
    print("\n  Nothing unlisted. Census agrees with the guard.")

print("\n=== assets (correctly ignored by the guard) ===")
for e, n in Counter(os.path.splitext(r["rel"])[1].lower()
                    for r in rows if r["asset"]).most_common():
    print("  %-8s %3d" % (e, n))
