#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Numen Games S.L.
# SPDX-License-Identifier: MIT
#
# verify-third-party-attribution.py — evidence script for the B1 fix.
#
# Verifies BY EFFECT, not by intention: it reads two `reuse spdx` SBOMs and
# reports the resolved regime and copyright holder per file. Reading REUSE.toml
# and concluding "it looks right" is exactly what hid the B1 defect for months —
# the annotation was present, correct, and inert.
#
# Usage:
#   reuse spdx > before.spdx     # on the base commit
#   reuse spdx > after.spdx      # after the fix
#   python3 scripts/verify-third-party-attribution.py before.spdx after.spdx
#
# Exit 0 when no Numen Games copyright remains over third-party material.

import collections
import re
import sys

# Paths holding third-party work. Numen Games must never claim copyright here.
THIRD_PARTY = {
    "web/public/diseno/assets/fonts/": "OFL-1.1",
    "web/src/icons/": "MIT",
}
OURS = "Numen Games"


def read_sbom(path):
    """Return {filename: (license, copyright)} from a `reuse spdx` document."""
    text = open(path, encoding="utf-8").read()
    out = {}
    for block in text.split("FileName: ")[1:]:
        name = block.split("\n")[0].strip().lstrip("./")
        lic = re.search(r"LicenseInfoInFile: (.*)", block)
        cop = re.search(r"FileCopyrightText: <text>(.*?)</text>", block, re.S)
        out[name] = (
            lic.group(1).strip() if lic else "(none)",
            cop.group(1).strip() if cop else "(none)",
        )
    return out, text


def summarise(files, label):
    lic = collections.Counter(v[0] for v in files.values())
    cop = collections.Counter(v[1] for v in files.values())
    print(f"  {label} ({len(files)} files)")
    for k, n in lic.most_common():
        print(f"      licence   {n:>3}x  {k}")
    for k, n in cop.most_common():
        print(f"      copyright {n:>3}x  {k}")


def main(before_path, after_path):
    before, before_raw = read_sbom(before_path)
    after, after_raw = read_sbom(after_path)
    violations = []

    for prefix, expected in THIRD_PARTY.items():
        b = {k: v for k, v in before.items()
             if k.startswith(prefix) and not k.endswith(".license")}
        a = {k: v for k, v in after.items()
             if k.startswith(prefix) and not k.endswith(".license")}

        print(f"\n=== {prefix}  (expected licence: {expected}) ===")
        summarise(b, "BEFORE")
        summarise(a, "AFTER ")

        for name, (lic, cop) in a.items():
            if OURS in cop:
                violations.append((name, lic, cop, "Numen Games copyright on third-party work"))
            if lic != expected:
                violations.append((name, lic, cop, f"licence is {lic}, expected {expected}"))

    print(f"\n=== OFL-1.1 occurrences in SBOM: before={before_raw.count('OFL-1.1')} "
          f"after={after_raw.count('OFL-1.1')} ===")

    print("\n=== VERDICT ===")
    if violations:
        print(f"  FAIL — {len(violations)} violation(s):")
        for name, lic, cop, why in violations[:20]:
            print(f"    {name}\n        {why}  [{lic} | {cop}]")
        return 1
    total = sum(
        1 for k in after
        if any(k.startswith(p) for p in THIRD_PARTY) and not k.endswith(".license")
    )
    print(f"  PASS — {total} third-party files, none claiming Numen Games copyright.")
    return 0


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit("usage: verify-third-party-attribution.py <before.spdx> <after.spdx>")
    sys.exit(main(sys.argv[1], sys.argv[2]))
