#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 Numen Games S.L.
# SPDX-License-Identifier: MIT
#
# fix-font-attribution.sh — B1 fix, third-party typefaces.
#
# Writes an adjacent `.license` per font file. REUSE resolves an adjacent
# `.license` ahead of any REUSE.toml annotation regardless of block order, so
# this cannot be silently overridden by a later general glob — which is exactly
# how `["web/**", ...] = MIT` swallowed the OFL-1.1 annotation.
#
# Copyright holders are READ from the LICENSE-*.txt shipped with each family.
# Never from memory, never from the web. If a licence file is missing the script
# aborts rather than inventing a holder.
#
# IDEMPOTENT: an existing `.license` is left untouched and counted separately.
# A correction script that destroys hand-tuned corrections is the same class of
# silent failure this fix exists to remove.

set -euo pipefail
cd "$(dirname "$0")/../web/public/diseno/assets/fonts"

holder_of () {  # $1 = licence file → first line, copyright prefix stripped
  [ -f "$1" ] || { echo "ABORT: missing licence file $1 — cannot determine holder" >&2; exit 1; }
  head -1 "$1" | tr -d '\r' | sed -E 's/^Copyright \(c\) //; s/^Copyright //'
}

GEIST=$(holder_of LICENSE-Geist.txt)
ALEG=$(holder_of LICENSE-Alegreya.txt)
PIXE=$(holder_of LICENSE-PixelifySans.txt)

echo "Holders read from disk:"
echo "  Geist    : $GEIST"
echo "  Alegreya : $ALEG"
echo "  Pixelify : $PIXE"
echo

written=0
kept=0

emit () {  # $1 = target file, $2 = holder
  if [ -e "$1.license" ]; then
    kept=$((kept + 1))
    return
  fi
  printf 'SPDX-FileCopyrightText: %s\nSPDX-License-Identifier: OFL-1.1\n' "$2" > "$1.license"
  written=$((written + 1))
}

emit Geist-Variable.woff2            "$GEIST"
emit GeistMono-Variable.woff2        "$GEIST"
emit Alegreya-Variable.woff2         "$ALEG"
emit Alegreya-Italic-Variable.woff2  "$ALEG"
emit AlegreyaSC-Medium.woff2         "$ALEG"
emit AlegreyaSC-Regular.woff2        "$ALEG"
emit PixelifySans-Variable.woff2     "$PIXE"

# The licence files themselves belong to their authors, not to us.
emit LICENSE-Geist.txt               "$GEIST"
emit LICENSE-Alegreya.txt            "$ALEG"
emit LICENSE-PixelifySans.txt        "$PIXE"

echo "fonts: written: $written · already present, respected: $kept"
