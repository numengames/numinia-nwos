#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Numen Games S.L.
# SPDX-License-Identifier: MIT
"""¿Algún movimiento cambió el régimen de licencia sin declararlo?

Lee REUSE.toml, resuelve el régimen de cada ruta (última anotación gana),
y compara origen y destino de TODOS los renombrados de la historia.
"""
import re, subprocess, fnmatch

R = '/var/home/uruk/arkitecktonia-home/repos/numinia-nwos'

# --- reglas de REUSE.toml, en orden (la última que casa gana) ---
txt = open(f'{R}/REUSE.toml', encoding='utf-8').read()
reglas = []
for blk in txt.split('[[annotations]]')[1:]:
    m = re.search(r'path\s*=\s*(\[.*?\]|"[^"]+")', blk, re.S)
    lic = re.search(r'SPDX-License-Identifier\s*=\s*"([^"]+)"', blk)
    if not m or not lic:
        continue
    raw = m.group(1)
    paths = re.findall(r'"([^"]+)"', raw)
    reglas.append((paths, lic.group(1)))

def regimen(ruta):
    """Última regla que casa gana, como hace REUSE."""
    out = None
    for paths, lic in reglas:
        for p in paths:
            # REUSE usa glob: ** cruza directorios
            pat = p.replace('**', '*')
            if fnmatch.fnmatch(ruta, pat) or fnmatch.fnmatch(ruta, p):
                out = lic
            # carpeta/** debe casar carpeta/sub/fichero
            if p.endswith('/**') and ruta.startswith(p[:-3] + '/'):
                out = lic
            if p.endswith('**') and ruta.startswith(p[:-2]):
                out = lic
    return out

# --- todos los renombrados de la historia ---
log = subprocess.run(
    ['git', '-C', R, 'log', '--diff-filter=R', '--format=@@%h|%ad|%an|%s',
     '--date=short', '--name-status', '--all'],
    capture_output=True, text=True).stdout

commit = None
cambios = []
for line in log.split('\n'):
    if line.startswith('@@'):
        commit = line[2:]
    elif line.startswith('R') and '\t' in line:
        partes = line.split('\t')
        if len(partes) < 3:
            continue
        viejo, nuevo = partes[1], partes[2]
        a, b = regimen(viejo), regimen(nuevo)
        if a != b:
            cambios.append((commit, viejo, nuevo, a, b))

print(f"  reglas leídas de REUSE.toml: {len(reglas)}\n")
if not cambios:
    print("  ✓ ningún renombrado cambió de régimen en toda la historia")
else:
    print(f"  ⚠ {len(cambios)} renombrados CRUZARON un régimen:\n")
    for c, v, n, a, b in cambios:
        sha, fecha, autor, msg = (c.split('|') + ['']*4)[:4]
        print(f"  {sha}  {fecha}  {autor}")
        print(f"      {v}")
        print(f"        → {n}")
        print(f"      {a}  →  {b}")
        print(f"      «{msg[:70]}»\n")
