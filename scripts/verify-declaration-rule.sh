#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 Numen Games S.L.
# SPDX-License-Identifier: MIT
#
# Fixture test for the declaration-file rule in check-orphan-content.mjs.
#
# The rule is PREVENTIVE: the .license sidecars were consolidated into
# REUSE.toml by the migration, so the current tree cannot exercise it. This
# creates the conditions on purpose, asserts, and always cleans up.
#
#   1. sidecar WITH its target beside it  -> guard green, file named as [decl]
#   2. sidecar WITHOUT target             -> guard red, named as [BROKEN]
#   3. neither fixture survives           -> tree clean at exit
#
# Requires web/dist to exist (run `npm run build` in web/ first).
set -uo pipefail
cd "$(dirname "$0")/.."

FONTS="web/public/diseno/assets/fonts"
DIST_FONTS="web/dist/diseno/assets/fonts"
PAIRED="$FONTS/Geist-Variable.woff2.license"
ORPHAN="$FONTS/Nonexistent-Font.woff2.license"
D_PAIRED="$DIST_FONTS/Geist-Variable.woff2.license"
D_ORPHAN="$DIST_FONTS/Nonexistent-Font.woff2.license"

cleanup() { rm -f "$PAIRED" "$ORPHAN" "$D_PAIRED" "$D_ORPHAN"; }
trap cleanup EXIT

fail=0
say() { printf '\n=== %s ===\n' "$1"; }

if [ ! -d web/dist ]; then
  echo "ABORT: web/dist missing - run 'npm run build' in web/ first"; exit 2
fi

# ---------- 1. paired sidecar: exempt, green, and NAMED ----------
say "1. sidecar WITH its target -> green, and listed as a declaration"
printf 'SPDX-FileCopyrightText: 2023 Vercel\nSPDX-License-Identifier: OFL-1.1\n' > "$PAIRED"
cp "$PAIRED" "$D_PAIRED"          # Astro would copy it; simulate that
out=$(node scripts/check-orphan-content.mjs 2>&1); rc=$?
echo "$out" | grep -q "Geist-Variable.woff2.license" \
  && echo "   OK   named in output" || { echo "   FAIL not named"; fail=1; }
echo "$out" | grep -q "\[decl\].*Geist-Variable.woff2.license" \
  && echo "   OK   marked [decl]" || { echo "   FAIL not marked [decl]"; fail=1; }
[ "$rc" -eq 0 ] && echo "   OK   exit 0" || { echo "   FAIL exit $rc"; fail=1; }
rm -f "$PAIRED" "$D_PAIRED"

# ---------- 2. unpaired sidecar: red ----------
say "2. sidecar WITHOUT target -> red"
printf 'SPDX-FileCopyrightText: 2026 Nobody\nSPDX-License-Identifier: MIT\n' > "$ORPHAN"
cp "$ORPHAN" "$D_ORPHAN"
out=$(node scripts/check-orphan-content.mjs 2>&1); rc=$?
[ "$rc" -eq 1 ] && echo "   OK   exit 1" || { echo "   FAIL exit $rc (expected 1)"; fail=1; }
echo "$out" | grep -q "BROKEN" \
  && echo "   OK   reported as BROKEN" || { echo "   FAIL not reported broken"; fail=1; }
echo "$out" | grep -q "Nonexistent-Font.woff2" \
  && echo "   OK   names the missing target" || { echo "   FAIL target not named"; fail=1; }
rm -f "$ORPHAN" "$D_ORPHAN"

# ---------- 3. clean state ----------
say "3. fixtures removed, guard back to baseline"
out=$(node scripts/check-orphan-content.mjs 2>&1); rc=$?
[ "$rc" -eq 0 ] && echo "   OK   exit 0" || { echo "   FAIL exit $rc"; fail=1; }
dirty=$(git status --porcelain "$FONTS" | wc -l)
[ "$dirty" -eq 0 ] && echo "   OK   no fixture left in the tree" \
  || { echo "   FAIL $dirty stray file(s)"; git status --porcelain "$FONTS"; fail=1; }

say "RESULT"
[ "$fail" -eq 0 ] && echo "   ALL THREE PASS" || echo "   FAILURES PRESENT"
exit "$fail"
