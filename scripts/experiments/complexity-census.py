#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Numen Games S.L.
# SPDX-License-Identifier: MIT
"""Complexity census v2 — fixes two defects in v1.

v1 defect 1: measured "files per operation" from --merges. Squash-merged PRs are
NOT merge commits, so 15 of 16 returned 0 files. Measure from main's first-parent
commits instead — each is one landed PR.

v1 defect 2: reported "commits touching a guard" under a heading asking whether
it had ever failed. Those are different questions and the heading was wrong. CI
run history is not in git; what git CAN answer is whether a guard was ever
*fixed* or *bypassed*, and whether the repo ever landed a commit that the guard
would reject today. Both are stated as what they are.
"""
import json
import os
import re
import subprocess

ROOT = "/var/home/uruk/arkitecktonia-home/repos/numinia-nwos"


def sh(a):
    return subprocess.run(a, cwd=ROOT, capture_output=True, text=True).stdout


print("=" * 64)
print("3. FILES PER LANDED PR  (first-parent commits on main)")
print("=" * 64)
shas = sh(["git", "log", "--first-parent", "--format=%H|%s", "-30", "main"]).strip().splitlines()
rows = []
for line in shas:
    if "|" not in line:
        continue
    sha, subj = line.split("|", 1)
    n = len([f for f in sh(["git", "show", "--name-only", "--format=", sha]).split() if f])
    rows.append((subj[:50], n))

for subj, n in rows[:14]:
    print("  %-52s %4d" % (subj, n))
vals = sorted(n for _, n in rows if n > 0)
if vals:
    print("\n  n=%d landed PRs · median %d files · min %d · max %d"
          % (len(vals), vals[len(vals) // 2], vals[0], vals[-1]))
    small = sum(1 for v in vals if v <= 3)
    print("  PRs touching <=3 files: %d (%.0f%%)" % (small, 100 * small / len(vals)))

print("\n" + "=" * 64)
print("4. GUARD HISTORY  (what git can actually answer)")
print("=" * 64)
for g in ("scripts/check-license-frontmatter.mjs",
          "scripts/check-references.mjs",
          "scripts/check-orphan-content.mjs"):
    log = sh(["git", "log", "--format=%h|%ad|%s", "--date=short", "--", g]).strip().splitlines()
    in_ci = "YES" if g in open(os.path.join(ROOT, ".github/workflows/ci.yml")).read() else "NO"
    print("\n  %s" % os.path.basename(g))
    print("     runs in CI: %s   revisions: %d" % (in_ci, len(log)))
    for line in log:
        print("       %s" % line.replace("|", "  "))

print("\n" + "=" * 64)
print("5. WOULD THE GUARDS PASS ON MAIN RIGHT NOW?")
print("=" * 64)
for g in ("scripts/check-license-frontmatter.mjs",
          "scripts/check-references.mjs",
          "scripts/check-orphan-content.mjs"):
    r = subprocess.run(["node", g], cwd=ROOT, capture_output=True, text=True)
    tail = (r.stdout + r.stderr).strip().splitlines()
    print("  %-38s exit=%d  %s" % (os.path.basename(g), r.returncode,
                                   tail[-1][:60] if tail else ""))

print("\n" + "=" * 64)
print("6. BASELINE FILES — state carried outside the guards")
print("=" * 64)
b = os.path.join(ROOT, "scripts/references-baseline.json")
if os.path.exists(b):
    d = json.load(open(b))
    n = len(d) if isinstance(d, list) else len(d.get("allowed", d))
    print("  references-baseline.json: %d entries" % n)
    print("  (each entry is a known-broken reference the guard is told to ignore)")
