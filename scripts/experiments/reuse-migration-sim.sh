#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 Numen Games S.L.
# SPDX-License-Identifier: MIT
# SIMULACION de la migracion 79 .license -> 2 REUSE.toml de directorio.
# Trabaja sobre una COPIA en /tmp. NO toca el repositorio real.
# Criterio de aceptacion: CERO cambios de regimen efectivo.
set -euo pipefail
export PATH="$HOME/.local/bin:$PATH"

SRC=/var/home/uruk/arkitecktonia-home/repos/numinia-nwos
LAB=/tmp/migsim
rm -rf "$LAB"

echo "clonando el arbol real a $LAB (copia, el original no se toca)..."
git -C "$SRC" worktree list >/dev/null 2>&1 || true
cp -a "$SRC" "$LAB"
cd "$LAB"

echo "== ANTES =="
reuse spdx > /tmp/mig_antes.spdx 2>/dev/null
echo "  ficheros en SBOM: $(grep -c 'FileName:' /tmp/mig_antes.spdx)"

# --- 1. borrar los 79 .license
git ls-files '*.license' | xargs rm -f

# --- 2. TOML de directorio para los iconos Phosphor
cat > web/src/icons/REUSE.toml <<'EOF'
version = 1

# Phosphor Icons, self-hosted SVG subset (C-005 §7.3). Third-party: keeps its
# origin holder and licence. A directory REUSE.toml wins over the root's general
# block by proximity (CLOSEST), independently of block order.
[[annotations]]
path = "**"
SPDX-FileCopyrightText = "Phosphor Icons (https://phosphoricons.com)"
SPDX-License-Identifier = "MIT"
EOF

# --- 3. TOML de directorio para las tipografias, tres titulares
cat > web/public/diseno/assets/fonts/REUSE.toml <<'EOF'
version = 1

# Third-party typefaces. Holders read from the LICENSE-*.txt shipped with each
# family, never from memory. Three holders in one directory, one block each.

[[annotations]]
path = ["Geist-Variable.woff2", "GeistMono-Variable.woff2", "LICENSE-Geist.txt"]
SPDX-FileCopyrightText = "2023 Vercel, in collaboration with basement.studio"
SPDX-License-Identifier = "OFL-1.1"

[[annotations]]
path = ["Alegreya-Variable.woff2", "Alegreya-Italic-Variable.woff2", "AlegreyaSC-Medium.woff2", "AlegreyaSC-Regular.woff2", "LICENSE-Alegreya.txt"]
SPDX-FileCopyrightText = "2011 The Alegreya Project Authors (https://github.com/huertatipografica/Alegreya)"
SPDX-License-Identifier = "OFL-1.1"

[[annotations]]
path = ["PixelifySans-Variable.woff2", "LICENSE-PixelifySans.txt"]
SPDX-FileCopyrightText = "2021 The Pixelify Sans Project Authors (https://github.com/eifetx/Pixelify-Sans)"
SPDX-License-Identifier = "OFL-1.1"
EOF

git add -A >/dev/null 2>&1 || true

echo "== DESPUES =="
reuse spdx > /tmp/mig_despues.spdx 2>/dev/null
echo "  ficheros en SBOM: $(grep -c 'FileName:' /tmp/mig_despues.spdx)"
echo
echo "== COMPARACION DE REGIMEN EFECTIVO =="
python3 - <<'PYEOF'
import re

def load(p):
    d = {}
    for b in open(p, encoding='utf-8').read().split('FileName: ')[1:]:
        n = b.split('\n')[0].strip().lstrip('./')
        if n.endswith('.license') or n.endswith('REUSE.toml'):
            continue
        l = re.search(r'LicenseInfoInFile: (.*)', b)
        c = re.search(r'FileCopyrightText: <text>(.*?)</text>', b, re.S)
        d[n] = ((l.group(1).strip() if l else '?'),
                (c.group(1).strip() if c else '?').replace('SPDX-FileCopyrightText: ', ''))
    return d

a = load('/tmp/mig_antes.spdx')
b = load('/tmp/mig_despues.spdx')

only_a = sorted(set(a) - set(b))
only_b = sorted(set(b) - set(a))
diff = sorted(k for k in set(a) & set(b) if a[k] != b[k])

print(f"  ficheros comparables ANTES  : {len(a)}")
print(f"  ficheros comparables DESPUES: {len(b)}")
print(f"  solo en ANTES  : {len(only_a)}")
for k in only_a[:10]:
    print(f"      {k}  {a[k]}")
print(f"  solo en DESPUES: {len(only_b)}")
for k in only_b[:10]:
    print(f"      {k}  {b[k]}")
print()
print(f"  CAMBIOS DE REGIMEN: {len(diff)}")
for k in diff[:25]:
    print(f"      {k}\n         antes:   {a[k]}\n         despues: {b[k]}")
print()
print("  VEREDICTO:", "PASS - cero cambios de regimen" if not diff and not only_a and not only_b
      else "REVISAR - hay diferencias")
PYEOF
