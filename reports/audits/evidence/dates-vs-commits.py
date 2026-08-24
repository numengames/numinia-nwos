#!/usr/bin/env python3
"""
dates-vs-commits.py — evidencia de D-021.

¿Cuántos documentos declaran un `created` que su propio commit desmiente?

S-001 §6.2 exige created_source y created_confidence para que una fecha se
pueda rastrear hasta git en vez de afirmarse. D-012 registra 121 documentos
con `T00:00:00Z`. Este script mide la versión de hoy del mismo defecto.

    python3 reports/audits/evidence/dates-vs-commits.py
    python3 reports/audits/evidence/dates-vs-commits.py --desde <ref>

Por defecto mide desde el tag pre-restructure-2026-08-24.
"""
import os, re, subprocess
import sys
R = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
sys.path.insert(0, os.path.join(R, 'scripts'))
from measuring_root import cabecera, sospechoso_si_cero
DESDE = sys.argv[sys.argv.index('--desde')+1] if '--desde' in sys.argv else 'pre-restructure-2026-08-24'
print(cabecera(R, None, 'FECHAS DECLARADAS vs COMMIT — evidencia de D-021'))

def sh(*a):
    return subprocess.run(['git','-C',R]+list(a), capture_output=True, text=True).stdout.strip()

# ficheros creados hoy (desde el tag pre-restructure)
nuevos = sh('diff','--name-only','--diff-filter=A',DESDE,'HEAD').split('\n')
nuevos = [f for f in nuevos if f.endswith('.md')]

print(f"\n{sospechoso_si_cero(len(nuevos), 'documentos nuevos')} documentos creados desde {DESDE}\n")
print(f"{'fichero':<50}{'declara':<22}{'commit':<22}")
print("─"*96)
malos = []
for f in sorted(nuevos):
    txt = open(os.path.join(R,f),encoding='utf-8').read()
    m = re.search(r'^created:\s*"([^"]+)"', txt, re.M)
    if not m: continue
    decl = m.group(1)
    commit = sh('log','--format=%ad','--date=format:%Y-%m-%dT%H:%M','--diff-filter=A','-1','--',f)
    d_dia = decl[:10]; c_dia = commit[:10]
    flag = '' if d_dia == c_dia else '  ← DISCREPA'
    if flag: malos.append((f, decl, commit))
    print(f"{f[:48]:<50}{decl[:19]:<22}{commit:<22}{flag}")

print("─"*96)
print(f"\n{len(malos)} documento(s) con la fecha adelantada respecto a su commit")
