#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 Numen Games S.L.
# SPDX-License-Identifier: MIT
# Experimento 2: ¿puede UN SOLO REUSE.toml de directorio expresar TRES titulares
# distintos en la misma carpeta, como exige web/public/diseno/assets/fonts?
# Repo desechable. No toca numinia-nwos.
set -euo pipefail
export PATH="$HOME/.local/bin:$PATH"

LAB=/tmp/reuse-lab2
rm -rf "$LAB"; mkdir -p "$LAB/fonts" "$LAB/LICENSES"
cd "$LAB"; git init -q .
for l in MIT OFL-1.1; do echo "$l text" > "LICENSES/$l.txt"; done

# replica de los 10 ficheros reales, mismos nombres
for f in Geist-Variable.woff2 GeistMono-Variable.woff2 \
         Alegreya-Variable.woff2 Alegreya-Italic-Variable.woff2 \
         AlegreyaSC-Medium.woff2 AlegreyaSC-Regular.woff2 \
         PixelifySans-Variable.woff2 \
         LICENSE-Geist.txt LICENSE-Alegreya.txt LICENSE-PixelifySans.txt; do
  echo "x" > "fonts/$f"
done

# raiz con el bloque general hostil, igual que en el repo real
cat > REUSE.toml <<'EOF'
version = 1

[[annotations]]
path = "**"
SPDX-FileCopyrightText = "RAIZ-GENERAL-Numen"
SPDX-License-Identifier = "MIT"
EOF

# UN solo TOML de directorio con tres bloques por patron de nombre
cat > fonts/REUSE.toml <<'EOF'
version = 1

[[annotations]]
path = ["Geist-Variable.woff2", "GeistMono-Variable.woff2", "LICENSE-Geist.txt"]
SPDX-FileCopyrightText = "2023 Vercel, in collaboration with basement.studio"
SPDX-License-Identifier = "OFL-1.1"

[[annotations]]
path = ["Alegreya*.woff2", "LICENSE-Alegreya.txt"]
SPDX-FileCopyrightText = "2011 The Alegreya Project Authors (https://github.com/huertatipografica/Alegreya)"
SPDX-License-Identifier = "OFL-1.1"

[[annotations]]
path = ["PixelifySans-Variable.woff2", "LICENSE-PixelifySans.txt"]
SPDX-FileCopyrightText = "2021 The Pixelify Sans Project Authors (https://github.com/eifetx/Pixelify-Sans)"
SPDX-License-Identifier = "OFL-1.1"
EOF

git add -A >/dev/null 2>&1 || true

echo "=== UN TOML, TRES TITULARES: ¿los resuelve bien? ==="
reuse spdx 2>/dev/null | python3 -c "
import sys, re
t = sys.stdin.read()
bad = 0
for b in t.split('FileName: ')[1:]:
    n = b.split(chr(10))[0].strip()
    if 'fonts/' not in n or n.endswith('REUSE.toml'):
        continue
    l = re.search(r'LicenseInfoInFile: (.*)', b)
    c = re.search(r'FileCopyrightText: <text>(.*?)</text>', b, re.S)
    lic = l.group(1).strip() if l else '?'
    cop = (c.group(1).strip() if c else '?').replace('SPDX-FileCopyrightText: ', '')
    flag = '' if lic == 'OFL-1.1' and 'RAIZ' not in cop else '  <-- MAL'
    if flag: bad += 1
    print(f'  {n.split(\"/\")[-1]:<32} {lic:<9} {cop[:52]}{flag}')
print()
print('  ficheros mal resueltos:', bad)
"
