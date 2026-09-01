#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Numen Games S.L.
# SPDX-License-Identifier: MIT
"""¿Cada fichero de una serie aparece en su INDEX?

READ-ONLY. Compara los .md de cada carpeta con lo que su INDEX.md menciona.
"""
import os, re, subprocess

R = '/var/home/uruk/arkitecktonia-home/repos/numinia-nwos'

SERIES = ['canon', 'agents', 'decisions', 'blueprints', 'missions',
          'protocols', 'standards', 'operations', 'guilds', 'debt', 'reports']

def sh(*a):
    return subprocess.run(['git', '-C', R] + list(a),
                          capture_output=True, text=True).stdout.strip()

print(f"  ROOT {R}")
print(f"  HEAD {sh('rev-parse', '--short', 'HEAD')}\n")
print(f"  {'serie':<12} {'ficheros':>8} {'ausentes':>8}   índice")
print(f"  {'-'*12} {'-'*8} {'-'*8}   {'-'*40}")

total_aus = 0
detalle = []
for s in SERIES:
    d = os.path.join(R, s)
    if not os.path.isdir(d):
        continue
    idx = None
    for cand in ('INDEX.md', 'README.md'):
        if os.path.exists(os.path.join(d, cand)):
            idx = cand
            break
    if not idx:
        print(f"  {s+'/':<12} {'—':>8} {'—':>8}   (sin índice)")
        continue

    txt = open(os.path.join(d, idx), encoding='utf-8').read()
    # ficheros .md de la serie, recursivo, excluyendo el propio índice
    ficheros = []
    for root, _, fs in os.walk(d):
        for f in fs:
            if not f.endswith('.md'):
                continue
            rel = os.path.relpath(os.path.join(root, f), d)
            if rel in ('INDEX.md', 'README.md'):
                continue
            ficheros.append(rel)

    ausentes = []
    for f in ficheros:
        base = os.path.basename(f)
        stem = base[:-3]
        # ¿lo menciona por nombre, por stem, o por su id?
        if base in txt or stem in txt:
            continue
        m = re.search(r'^id:\s*"?([^"\n]+)', open(os.path.join(d, f),
                      encoding='utf-8').read(), re.M)
        if m and m.group(1).strip() in txt:
            continue
        ausentes.append(f)

    total_aus += len(ausentes)
    print(f"  {s+'/':<12} {len(ficheros):>8} {len(ausentes):>8}   {idx}")
    if ausentes:
        detalle.append((s, idx, ausentes))

print(f"\n  TOTAL AUSENTES: {total_aus} ficheros\n")
for s, idx, aus in detalle:
    print(f"  ── {s}/{idx} no menciona {len(aus)}:")
    for f in sorted(aus)[:12]:
        print(f"       {f}")
    if len(aus) > 12:
        print(f"       … y {len(aus)-12} más")
    print()
