#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 Numen Games S.L.
# SPDX-License-Identifier: MIT
# Experimento aislado: precedencia REUSE.toml raiz vs REUSE.toml de directorio
# vs .license adjunto. NO toca numinia-nwos: crea un repo desechable en /tmp.
set -euo pipefail
export PATH="$HOME/.local/bin:$PATH"

LAB=/tmp/reuse-lab
rm -rf "$LAB"; mkdir -p "$LAB/web/public/fonts" "$LAB/LICENSES"
cd "$LAB"
git init -q .

# textos de licencia minimos para que lint no se queje de licencias ausentes
for l in MIT OFL-1.1 CC0-1.0; do echo "$l text" > "LICENSES/$l.txt"; done

# tres ficheros identicos en la misma ruta
for n in a b c; do echo "font-$n" > "web/public/fonts/$n.woff2"; done

# --- RAIZ: bloque general que barre todo web/**, IGUAL que en numinia-nwos
cat > REUSE.toml <<'EOF'
version = 1

[[annotations]]
path = "web/public/fonts/**"
SPDX-FileCopyrightText = "RAIZ-especifico"
SPDX-License-Identifier = "OFL-1.1"

[[annotations]]
path = "web/**"
SPDX-FileCopyrightText = "RAIZ-general-ultimo-bloque"
SPDX-License-Identifier = "MIT"
EOF

# --- DIRECTORIO: un REUSE.toml propio en la carpeta de fuentes
cat > web/public/fonts/REUSE.toml <<'EOF'
version = 1

[[annotations]]
path = "**"
SPDX-FileCopyrightText = "DIRECTORIO-fonts"
SPDX-License-Identifier = "OFL-1.1"
EOF

# --- .license adjunto solo para c.woff2
printf 'SPDX-FileCopyrightText: LICENSE-ADJUNTO\nSPDX-License-Identifier: CC0-1.0\n' \
  > web/public/fonts/c.woff2.license

git add -A >/dev/null 2>&1 || true

echo "=========== ESCENARIO 1: raiz + directorio + .license(solo c) ==========="
reuse spdx 2>/dev/null | python3 -c "
import sys,re
t=sys.stdin.read()
for b in t.split('FileName: ')[1:]:
    n=b.split(chr(10))[0].strip()
    if 'fonts' not in n or n.endswith('.license') or n.endswith('REUSE.toml'): continue
    l=re.search(r'LicenseInfoInFile: (.*)',b)
    c=re.search(r'FileCopyrightText: <text>(.*?)</text>',b,re.S)
    print(f'  {n:<34} {l.group(1).strip() if l else \"?\":<10} {c.group(1).strip() if c else \"?\"}')
"

echo
echo "=========== ESCENARIO 2: SIN REUSE.toml de directorio ==========="
rm web/public/fonts/REUSE.toml
reuse spdx 2>/dev/null | python3 -c "
import sys,re
t=sys.stdin.read()
for b in t.split('FileName: ')[1:]:
    n=b.split(chr(10))[0].strip()
    if 'fonts' not in n or n.endswith('.license'): continue
    l=re.search(r'LicenseInfoInFile: (.*)',b)
    c=re.search(r'FileCopyrightText: <text>(.*?)</text>',b,re.S)
    print(f'  {n:<34} {l.group(1).strip() if l else \"?\":<10} {c.group(1).strip() if c else \"?\"}')
"
