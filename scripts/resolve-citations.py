#!/usr/bin/env python3
"""
resolve-citations.py — ¿resuelve cada identificador citado?

El lint de referencias comprueba ENLACES entre ficheros. Este comprueba
IDENTIFICADORES citados en el texto: `ADR-004`, `STD-001`, `P-010`, `C-005`.

Por qué hace falta un instrumento aparte (Oráculo, 2026-08-24):

    El lint comprueba enlaces entre ficheros; no comprueba que un documento
    citado como AUTORIDAD exista. Así es como un STD-001 mergeado acabó
    apoyado en un ADR sin mergear.

Y por qué NO busca frases normativas: la cita más importante del glosario es

    «is never reused, is never renumbered (ADR-004).»

Entre paréntesis, sin verbo. Un detector de sintaxis normativa devuelve cero
sobre un corpus que tiene roturas reales — probado, devolvió 0 de 3. Así que
resuelve TODO identificador citado contra los que existen, y clasifica.

    python3 scripts/resolve-citations.py
    python3 scripts/resolve-citations.py --at REF
    python3 scripts/resolve-citations.py --json
"""
import json, os, re, subprocess, sys
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = sys.argv[sys.argv.index('--at') + 1] if '--at' in sys.argv else None

# Prefijos que este repositorio matricula (STD-001 §4.1)
PREFIJOS = r'(?:MIS|ADR|DEC|P|RPT|AUD|BP|C|S|D|SEC|SIM|FLAG|CON|GAP)'
CITA = re.compile(rf'\b({PREFIJOS}-\d{{2,4}}(?:\.\d+)?)\b')

# ADR-006..ADR-022 pertenecen a numinia-web (STD-001 §4.4, colisión conocida)
def es_otro_repo(ident):
    m = re.match(r'^ADR-(\d+)$', ident)
    return bool(m) and 6 <= int(m.group(1)) <= 22

# Ejemplos y plantillas: no son citas
EJEMPLO = re.compile(r'(NNN|999|XXX|\{|<)')

# Ficheros que son registro histórico o artefacto congelado: citan el pasado
# a propósito y no deben tratarse como roturas.
INMUNES = ('CHANGELOG.md', 'web/public/archive/')


def sh(*a):
    return subprocess.run(['git', '-C', ROOT] + list(a),
                          capture_output=True, text=True).stdout


def listar():
    return sh('ls-tree', '-r', REF, '--name-only') if REF else sh('ls-files')


def leer(rel):
    return sh('show', f'{REF}:{rel}') if REF else \
        open(os.path.join(ROOT, rel), encoding='utf-8').read()


def main():
    files = [f for f in listar().split('\n')
             if f.endswith('.md') and not f.startswith('web/dist')]

    # 1. universo de identificadores que EXISTEN
    existen = {}
    for rel in files:
        try:
            txt = leer(rel)
        except Exception:
            continue
        base = os.path.basename(rel)
        m = re.match(rf'^({PREFIJOS}-\d{{2,4}}|(?:RPT|AUD)-\d{{4}}-\d{{2}}-\d{{2}})', base)
        if m:
            existen[m.group(1)] = rel
        mid = re.search(r'^id:\s*["\']?([^"\'\n#]+)', txt, re.M)
        if mid:
            v = mid.group(1).strip()
            if CITA.fullmatch(v):
                existen.setdefault(v, rel)
        # Identificadores de SECCIÓN dentro de un documento: filas de tabla o
        # epígrafes numerados. SEC-10 es una fila de engineering-standards.md,
        # P-01…P-12 son principios de archive-summa. No son documentos y no
        # deben resolverse como tales — pero existen y están gobernados.
        for mm in re.finditer(rf'^\|\s*`?({PREFIJOS}-\d{{2,4}})`?\s*\|', txt, re.M):
            existen.setdefault(mm.group(1), f'{rel} (fila de tabla)')
        for mm in re.finditer(rf'^#{{1,4}}\s+\**({PREFIJOS}-\d{{2,4}})\b', txt, re.M):
            existen.setdefault(mm.group(1), f'{rel} (sección)')
        # sub-misiones: MIS-062.2 vive dentro de MIS-062
        for mm in re.finditer(r'\b(MIS-\d{3})\.\d+\b', txt):
            pass

    # 2. cada cita, ¿resuelve?
    rotas = defaultdict(list)
    total_citas = 0
    for rel in files:
        if any(x in rel for x in INMUNES):
            continue
        try:
            txt = leer(rel)
        except Exception:
            continue
        propio = os.path.basename(rel)
        for m in CITA.finditer(txt):
            ident = m.group(1)
            total_citas += 1
            if ident in existen or es_otro_repo(ident):
                continue
            if propio.startswith(ident):
                continue
            # sub-identificador: MIS-062.2 resuelve si MIS-062 existe.
            # Es una sub-misión, no un documento propio (STD-001 §4.1).
            padre = re.match(r'^(.+)\.\d+$', ident)
            if padre and padre.group(1) in existen:
                continue
            ctx = txt[max(0, m.start() - 70):m.end() + 70].replace('\n', ' ')
            if EJEMPLO.search(ctx):
                continue
            rotas[ident].append((rel, ctx.strip()))

    if '--json' in sys.argv:
        print(json.dumps({
            'head': sh('rev-parse', '--short', REF or 'HEAD').strip(),
            'identificadores_existentes': len(existen),
            'citas_totales': total_citas,
            'identificadores_no_resueltos': len(rotas),
            'citas_no_resueltas': sum(len(v) for v in rotas),
            'detalle': {k: [r for r, _ in v] for k, v in rotas.items()},
        }, indent=2, ensure_ascii=False))
        return

    head = sh('rev-parse', '--short', REF or 'HEAD').strip()
    print(f"\n{'='*74}")
    print(f"  RESOLVEDOR DE CITAS   ·   medido en {head}")
    print(f"{'='*74}\n")
    print(f"  identificadores que existen : {len(existen)}")
    print(f"  citas encontradas           : {total_citas}")
    print(f"  identificadores rotos       : {len(rotas)}")
    print(f"  citas afectadas             : {sum(len(v) for v in rotas)}\n")

    if not rotas:
        print("  ✓ toda cita resuelve\n")
        return

    for ident in sorted(rotas, key=lambda k: -len(rotas[k])):
        apar = rotas[ident]
        print(f"  ── {ident} — {len(apar)} cita(s), no existe en el repositorio")
        for rel, ctx in apar[:6]:
            print(f"       {rel}")
            print(f"         …{ctx[:110]}…")
        if len(apar) > 6:
            print(f"       (+{len(apar)-6} más)")
        print()
    sys.exit(1)


if __name__ == '__main__':
    main()
