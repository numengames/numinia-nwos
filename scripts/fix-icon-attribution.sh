#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 Numen Games S.L.
# SPDX-License-Identifier: MIT
#
# fix-icon-attribution.sh — B1 fix, third-party icons.
#
# The 69 Phosphor SVGs carried `SPDX-FileCopyrightText: 2026 Numen Games S.L.`
# — a copyright claim over someone else's work, live in a public repository.
# AUD-2026-08-26 missed it: it compared the LICENCE (MIT == MIT) and never read
# the copyright line. The holder below is the one REUSE.toml already declares
# for this path; it is not invented here.
#
# Adjacent `.license` files win over REUSE.toml regardless of block order.
#
# IDEMPOTENT: an existing `.license` is left untouched and counted separately.

set -euo pipefail
cd "$(dirname "$0")/.."

HOLDER="Phosphor Icons (https://phosphoricons.com)"

written=0
kept=0

while IFS= read -r f; do
  if [ -e "$f.license" ]; then
    kept=$((kept + 1))
    continue
  fi
  printf 'SPDX-FileCopyrightText: %s\nSPDX-License-Identifier: MIT\n' "$HOLDER" > "$f.license"
  written=$((written + 1))
done < <(git ls-files 'web/src/icons/*.svg')

echo "icons: written: $written · already present, respected: $kept"
