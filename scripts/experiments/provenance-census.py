#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Numen Games S.L.
# SPDX-License-Identifier: MIT
"""Provenance census v3 — classified by NATURE of authorship, not by string.

v2 defect (caught by the Oracle): it held back 51 files because `author:` named
a model, and swept 64 files whose `author:` named an agent persona — when
agents/{ursa,nimrod,senet}/SOUL.md each declare
`model: "anthropic/claude-sonnet-4-6"`. Same nature of authorship, opposite
treatment, decided by which string landed in the field.

Nature buckets:
  HUMAN        — a natural person authored it (pablo-fm, oracle, PabloFM commits)
  AI_PERSONA   — a Numinia agent authored it; agents are LLM instances per their
                 own SOUL.md
  AI_MODEL     — the model is named directly in `author:`
  DECLARED     — an explicit §2.6 provenance field exists

HUMAN vs AI is the axis §2.6 cares about. Whether AI work is `ai-assisted`
(ours to waive) or `ai-generated` (nothing to waive) is a legal judgement about
substantiality, reserved to the Oracle — this script does not make it.

Read-only.
"""
import json
import os
import re
import subprocess
from collections import Counter

ROOT = "/var/home/uruk/arkitecktonia-home/repos/numinia-nwos"
SBOM = os.path.join(ROOT, "reports/evidence/RPT-011/sbom.spdx")
OUT = "/tmp/surf/provenance-190-v3.json"

PROV_FIELDS = ("provenance", "procedencia", "ai_provenance")
LLM_PAT = re.compile(r"(claude|gpt|opus|sonnet|fable|gemini|llm)", re.I)
# Personas whose SOUL.md declares a model: -> LLM instances, verified 2026-08-26
AI_PERSONAS = {"ursa", "nimrod", "senet", "adonaz", "procurador-01",
               "centinela-01", "procyon", "khepri", "alquimista"}
HUMANS = {"pablo-fm", "pablofm", "oracle", "pablo"}


def sh(a):
    return subprocess.run(a, cwd=ROOT, capture_output=True, text=True).stdout


ccby = []
for b in open(SBOM, encoding="utf-8").read().split("FileName: ")[1:]:
    n = b.split("\n")[0].strip().lstrip("./")
    lic = re.search(r"LicenseInfoInFile: (.*)", b)
    if lic and lic.group(1).strip() == "CC-BY-4.0":
        ccby.append(n)

old = set(sh(["git", "ls-tree", "-r", "2efd546", "--name-only"]).split())
grants = sorted(set(ccby) - old)

rows = []
for p in grants:
    full = os.path.join(ROOT, p)
    declared = author = None
    if os.path.exists(full):
        m = re.match(r"^---\n(.*?)\n---",
                     open(full, encoding="utf-8", errors="replace").read(), re.S)
        fm = m.group(1) if m else ""
        for f in PROV_FIELDS:
            mm = re.search(rf"^{f}\s*:\s*(.+)$", fm, re.M | re.I)
            if mm:
                declared = mm.group(1).strip().strip('"\'')
                break
        ma = re.search(r"^author\s*:\s*(.+)$", fm, re.M | re.I)
        if ma:
            author = ma.group(1).strip().strip('"\'')

    git_author = sh(["git", "log", "--follow", "--format=%an", "-1", "--", p]).strip()
    src = "frontmatter" if author else ("git" if git_author else "none")
    who = author or git_author
    low = (who or "").lower()

    if declared:
        nature, bucket = "DECLARED", declared
    elif LLM_PAT.search(low):
        nature, bucket = "AI_MODEL", who
    elif any(a in low for a in AI_PERSONAS):
        nature, bucket = "AI_PERSONA", who
    elif any(h in low for h in HUMANS):
        nature, bucket = "HUMAN", who
    else:
        nature, bucket = "UNKNOWN", who or "(none)"

    rows.append({"path": p, "nature": nature, "who": bucket,
                 "source": src, "author_fm": author, "git_author": git_author})

json.dump(rows, open(OUT, "w"), indent=1)
n = len(rows)
c = Counter(r["nature"] for r in rows)
print(f"NEW GRANTS: {n}\n")
print("=== BY NATURE OF AUTHORSHIP ===")
for k in ("HUMAN", "AI_PERSONA", "AI_MODEL", "DECLARED", "UNKNOWN"):
    print(f"  {k:<12} {c[k]:>4}   {100*c[k]/n:5.1f}%")
ai = c["AI_PERSONA"] + c["AI_MODEL"]
print(f"\n  AI TOTAL     {ai:>4}   {100*ai/n:5.1f}%")
print(f"  HUMAN TOTAL  {c['HUMAN']:>4}   {100*c['HUMAN']/n:5.1f}%")

for k in ("HUMAN", "AI_PERSONA", "AI_MODEL", "DECLARED"):
    sub = [r for r in rows if r["nature"] == k]
    if not sub:
        continue
    print(f"\n=== {k} — who, and where the signal comes from ===")
    for w, m in Counter(r["who"] for r in sub).most_common():
        fm = sum(1 for r in sub if r["who"] == w and r["source"] == "frontmatter")
        gt = sum(1 for r in sub if r["who"] == w and r["source"] == "git")
        print(f"  {str(w)[:34]:<36} {m:>3}   (frontmatter {fm} · git {gt})")

print(f"\n-> {OUT}")
