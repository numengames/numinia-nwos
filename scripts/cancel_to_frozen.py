#!/usr/bin/env python3
"""
Bloqueante 1 del Oráculo (GLOSSARY v1, 2026-08-24):
  «cancelled: las 12 misiones pasan a frozen con freeze_reason: cancelled.
   No es deuda, es decisión. Ejecútalo.»

Idempotente: si ya está aplicado, no hace nada.
"""
import os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dry = '--dry-run' in sys.argv

files = [f for f in subprocess.run(['git', '-C', ROOT, 'ls-files', 'missions/'],
         capture_output=True, text=True).stdout.split('\n')
         if f.strip().endswith('.md')]

hechos, ya = [], []
for rel in files:
    p = os.path.join(ROOT, rel)
    t = open(p, encoding='utf-8').read()
    m = re.match(r'^---\s*\n(.*?)\n---', t, re.S)
    if not m:
        continue
    fm = m.group(1)
    st = re.search(r'^status:\s*["\']?([^"\'\n#]*)', fm, re.M)
    if not st or st.group(1).strip() != 'cancelled':
        continue
    if re.search(r'^freeze_reason:', fm, re.M):
        ya.append(rel)
        continue
    nuevo = re.sub(r'^status:.*$',
                   'status: frozen\nfreeze_reason: cancelled',
                   fm, count=1, flags=re.M)
    if not dry:
        open(p, 'w', encoding='utf-8').write(t[:m.start(1)] + nuevo + t[m.end(1):])
    hechos.append(rel)

print(f"{'DRY RUN — ' if dry else ''}misiones convertidas: {len(hechos)}")
for r in hechos:
    print(f"  {r}")
if ya:
    print(f"ya tenían freeze_reason: {len(ya)}")
