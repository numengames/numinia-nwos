#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Numen Games S.L.
# SPDX-License-Identifier: MIT
"""Provenance census v2 — corrected classification.

v1 defect: files whose `author:` names an LLM (claude-fable-5, claude-opus-5...)
were bucketed as EXPENSIVE, as if authorship were unknown. It is not unknown —
it is AI provenance declared through a different field. C-005 §2.6 asks for
human | ai-assisted | ai-generated; `author: claude-opus-5` states the fact in
substance while failing the form.

Buckets:
  DECLARED_FORM  — explicit provenance field (§2.6 compliant)
  DECLARED_SUBST — `author:` names an LLM  -> ai-generated/ai-assisted in substance
  HUMAN_OR_AGENT — `author:` names a person or a Numinia agent persona
  NO_SIGNAL      — no author field at all; only the git committer

Read-only.
"""
import json
import os
import re
import subprocess
from collections import Counter

ROOT = "/var/home/uruk/arkitecktonia-home/repos/numinia-nwos"
SBOM = os.path.join(ROOT, "reports/audits/AUD-2026-08-26-licensing-c005/sbom.spdx")
OUT = "/tmp/surf/provenance-190-v2.json"

PROV_FIELDS = ("provenance", "procedencia", "ai_provenance")
LLM_PAT = re.compile(r"(claude|gpt|opus|sonnet|fable|llm|gemini)", re.I)
AGENTS = {"ursa", "nimrod", "senet", "adonaz", "procurador-01",
          "centinela-01", "procyon", "oracle"}


def sh(a):
    return subprocess.run(a, cwd=ROOT, capture_output=True, text=True).stdout


ccby = []
for b in open(SBOM, encoding="utf-8").read().split("FileName: ")[1:]:
    n = b.split("\n")[0].strip().lstrip("./")
    lic = re.search(r"LicenseInfoInFile: (.*)", b)
    if lic and lic.group(1).strip() == "CC-BY-4.0":
        ccby.append(n)

old = set(sh(["git", "ls-tree", "-r", "2efd546", "--name-only"]).split())
new_grants = sorted(set(ccby) - old)

rows = []
for p in new_grants:
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

    if declared:
        cls = "DECLARED_FORM"
    elif author and LLM_PAT.search(author):
        cls = "DECLARED_SUBST"
    elif author and (author.lower() in AGENTS or "pablo" in author.lower()):
        cls = "HUMAN_OR_AGENT"
    else:
        cls = "NO_SIGNAL"

    rows.append({"path": p, "class": cls, "declared": declared, "author": author})

json.dump(rows, open(OUT, "w"), indent=1)
c = Counter(r["class"] for r in rows)
print(f"NEW GRANTS: {len(rows)}\n")
for k in ("DECLARED_FORM", "DECLARED_SUBST", "HUMAN_OR_AGENT", "NO_SIGNAL"):
    print(f"  {k:<16} {c[k]:>4}   {100*c[k]/len(rows):5.1f}%")

print("\n=== NO_SIGNAL por directorio ===")
ns = [r for r in rows if r["class"] == "NO_SIGNAL"]
for d, n in Counter(r["path"].split("/")[0] for r in ns).most_common():
    print(f"  {d:<14} {n}")

print("\n=== HUMAN_OR_AGENT: quién ===")
for a, n in Counter(r["author"] for r in rows
                    if r["class"] == "HUMAN_OR_AGENT").most_common():
    print(f"  {a:<20} {n}")

print("\n=== DECLARED_SUBST: qué modelos ===")
for a, n in Counter(r["author"] for r in rows
                    if r["class"] == "DECLARED_SUBST").most_common():
    print(f"  {a:<24} {n}")
print(f"\n-> {OUT}")
