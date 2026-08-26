#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Numen Games S.L.
# SPDX-License-Identifier: MIT
"""Anchor pass 2 — refine CYCLE_WEAK using P-003's own state table.

P-003 says who sets each state:
    backlog  -> Oracle / Procyon
    done     -> Oracle
    frozen   -> Oracle
    cancelled-> Oracle

So a mission carrying one of those states was, per the protocol, touched by the
Oracle. Missing `started`/`completed` timestamps are a FORM defect (the same
class as a missing provenance: field), not evidence the cycle did not happen.

But two things genuinely weaken the anchor and must be separated, not smoothed:
  · MIGRATED files, created in another repository and imported here — their
    creation was not under this repo's P-003.
  · in-progress/draft/no-status files, which the protocol does not attribute to
    an Oracle action.

Read-only.
"""
import json
import os
import re
import subprocess
from collections import Counter

ROOT = "/var/home/uruk/arkitecktonia-home/repos/numinia-nwos"
OUT = "/tmp/surf/anchor-123-v2.json"
ORACLE_SET = {"done", "frozen", "cancelled", "backlog"}
MIG_RE = re.compile(r"migrated .*from|migrado .*desde", re.I)


def sh(a):
    return subprocess.run(a, cwd=ROOT, capture_output=True, text=True).stdout


rows = json.load(open("/tmp/surf/anchor-123.json"))
out = []
for r in rows:
    p = r["path"]
    full = os.path.join(ROOT, p)
    owner = None
    migrated = False
    if os.path.exists(full):
        txt = open(full, encoding="utf-8", errors="replace").read()
        m = re.match(r"^---\n(.*?)\n---", txt, re.S)
        fm = m.group(1) if m else ""
        mo = re.search(r"^owner\s*:\s*(.+)$", fm, re.M)
        owner = mo.group(1).strip().strip('"\'') if mo else None
        migrated = bool(MIG_RE.search(txt[:2500]))

    a = r["anchor"]
    if a in ("CYCLE_COMPLETE", "CYCLE_COMMIT"):
        final, why = "ANCHORED", r["why"]
    elif a == "CYCLE_WEAK":
        st = r["status"]
        if migrated:
            final = "ANCHORED_MIGRATED"
            why = f"mission {st}, owner={owner}, but body declares migration from another repo"
        elif st in ORACLE_SET and owner == "oracle":
            final = "ANCHORED"
            why = f"P-003: state '{st}' is set by the Oracle; owner=oracle. Missing timestamps are a form defect"
        elif st in ORACLE_SET:
            final = "ANCHORED_WEAK"
            why = f"state '{st}' is Oracle-set per P-003 but owner={owner}"
        else:
            final = "NOT_ANCHORED"
            why = f"status={st} is not an Oracle-set state"
    else:
        final, why = "NOT_ANCHORED", r["why"]

    out.append({**r, "final": final, "why2": why,
                "owner": owner, "migrated": migrated})

json.dump(out, open(OUT, "w"), indent=1)
c = Counter(r["final"] for r in out)
n = len(out)
print(f"AI-AUTHORED GRANTS: {n}\n")
for k in ("ANCHORED", "ANCHORED_MIGRATED", "ANCHORED_WEAK", "NOT_ANCHORED"):
    print(f"  {k:<20} {c[k]:>4}   {100*c[k]/n:5.1f}%")

for k in ("ANCHORED_MIGRATED", "ANCHORED_WEAK", "NOT_ANCHORED"):
    sub = [r for r in out if r["final"] == k]
    if not sub:
        continue
    print(f"\n=== {k} — {len(sub)} ===")
    for r in sub:
        print(f"  {r['path']}")
        print(f"      {r['who']} · {r['why2']}")
print(f"\n-> {OUT}")
