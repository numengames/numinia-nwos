#!/usr/bin/env python3
"""
phase0-inventory.py — Fase 0 de la reestructuración del archivo.

READ-ONLY. No escribe en el repo, no mueve nada, no commitea.
Produce el inventario que el Oráculo firma antes de que exista la Fase 1.

    python3 scripts/phase0-inventory.py            # informe legible, HEAD actual
    python3 scripts/phase0-inventory.py --json     # datos crudos
    python3 scripts/phase0-inventory.py --at REF   # medir contra un commit

Sobre --at: este informe es un documento del corpus, así que al publicarse
se añade a lo que mide. Sin --at, las cifras dejan de coincidir con las
publicadas en el momento en que el informe entra en el repositorio. Para
reproducir una cifra citada, se mide contra el evidence_head que la
acompaña. Una cifra reproducible necesita saber contra qué es reproducible.
"""
import json, os, re, subprocess, sys
from collections import Counter, defaultdict
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from measuring_root import cabecera, sospechoso_si_cero

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Commit contra el que medir. Por defecto el working tree.
REF = None
if '--at' in sys.argv:
    REF = sys.argv[sys.argv.index('--at') + 1]

# S-001 §3 — mapa canónico type → serie. Los no estrictos van aparte.
MAPA = {
    'seminal': 'canon', 'protocol': 'protocols', 'mission': 'missions',
    'adr': 'decisions', 'blueprint': 'blueprints', 'report': 'reports',
    'legal': 'operations/legal', 'charter': 'guilds',
}
NO_ESTRICTOS = {'documentation', 'meta'}
APPARATUS = {'INDEX.md', 'README.md', 'TEMPLATE.md', 'CHANGELOG.md'}

# S-001 §4.1 — esquema de matrícula por serie
ESQUEMA = {
    'missions': r'^MIS-\d{3}-', 'protocols': r'^P-\d{3}-',
    'decisions': r'^(ADR|DEC)-\d{3}-', 'reports/daily': r'^RPT-\d{4}-\d{2}-\d{2}',
    'reports/audits': r'^AUD-\d{4}-\d{2}-\d{2}', 'blueprints': r'^BP-',
    'canon': r'^C-\d{3}-', 'standards': r'^S-\d{3}-',
    'agents': r'^A-\d{3}-', 'operations': r'^O-\d{3}-', 'debt': r'^D-\d{3}-',
}


def sh(*a):
    return subprocess.run(['git', '-C', ROOT] + list(a),
                          capture_output=True, text=True).stdout


def listar():
    """Ficheros rastreados, en REF si se pidió, si no en el working tree."""
    if REF:
        return sh('ls-tree', '-r', REF, '--name-only')
    return sh('ls-files')


def leer(rel):
    """Contenido de un fichero, en REF si se pidió."""
    if REF:
        return sh('show', f'{REF}:{rel}')
    return open(os.path.join(ROOT, rel), encoding='utf-8').read()


def main():
    files = [f for f in listar().split('\n')
             if f.endswith('.md') and not f.startswith('web/')]

    docs = []
    for rel in files:
        try:
            txt = leer(rel)
        except Exception:
            continue
        m = re.match(r'^---\s*\n(.*?)\n---', txt, re.S)
        fm = m.group(1) if m else ''

        def campo(k):
            mm = re.search(rf'^{k}:\s*["\']?([^"\'\n#]*)', fm, re.M)
            return mm.group(1).strip() if mm else None

        base = os.path.basename(rel)
        carpeta = os.path.dirname(rel) or '(root)'
        es_aparato = base in APPARATUS or '_template' in rel or campo('type') == 'meta'

        docs.append({
            'path': rel, 'base': base, 'carpeta': carpeta,
            'type': campo('type'), 'id': campo('id'), 'status': campo('status'),
            'aparato': es_aparato, 'chars': len(txt),
            'tiene_fm': bool(m),
        })

    # --- referencias entrantes: por ID y por ruta ---
    todo_texto = {}
    for rel in files:
        try:
            todo_texto[rel] = leer(rel)
        except Exception:
            pass

    for d in docs:
        n = 0
        if d['id']:
            pat = re.compile(r'\b' + re.escape(d['id']) + r'\b')
            n += sum(len(pat.findall(t)) for p, t in todo_texto.items() if p != d['path'])
        pat_ruta = re.compile(re.escape(d['path']))
        n += sum(len(pat_ruta.findall(t)) for p, t in todo_texto.items() if p != d['path'])
        d['refs'] = n

    # --- clasificación: operación propuesta ---
    for d in docs:
        ty, carpeta, base = d['type'], d['carpeta'], d['base']
        serie_raiz = carpeta.split('/')[0]
        d['conflicto'] = None
        d['destino'] = carpeta
        d['op'] = 'stay'

        if d['aparato']:
            d['op'] = 'stay (apparatus)'
            continue
        if not ty:
            d['op'] = 'stay (no type — cannot classify)'
            continue
        if ty in NO_ESTRICTOS:
            d['op'] = 'stay (type not strict, S-001 §3)'
            continue

        esperada = MAPA.get(ty)
        if esperada and not carpeta.startswith(esperada):
            d['conflicto'] = f'type: {ty} → expects {esperada}/'
            d['destino'] = esperada
            d['op'] = 'change-series'
            continue

        # ¿matrícula conforme?
        esq = None
        for k in sorted(ESQUEMA, key=len, reverse=True):
            if carpeta.startswith(k):
                esq = ESQUEMA[k]; break
        if esq and not re.match(esq, base):
            d['op'] = 'register'

    print(json.dumps(docs, indent=2, ensure_ascii=False) if '--json' in sys.argv
          else '', end='')
    if '--json' in sys.argv:
        return

    P = print
    P(f"\n{'='*78}")
    P(cabecera(ROOT, REF, 'FASE 0 — INVENTARIO · READ-ONLY'))
    P(f"{'='*78}")

    P(f"\n{sospechoso_si_cero(len(docs), 'documentos')} documentos .md rastreados (excluye web/)")
    ops = Counter(d['op'] for d in docs)
    P(f"\n── OPERACIÓN PROPUESTA ──")
    for op, n in ops.most_common():
        P(f"  {n:>4}  {op}")

    P(f"\n\n── CONFLICTOS: type vs carpeta ──")
    P(f"  S-001 §3: se mueve el fichero, NUNCA se reescribe el type.")
    P(f"  §3 (v2.3.0): verificar primero que el type describe el documento.\n")
    conf = sorted([d for d in docs if d['conflicto']], key=lambda x: -x['refs'])
    if conf:
        P(f"  {'refs':>4}  {'ruta':<44} {'conflicto'}")
        for d in conf:
            P(f"  {d['refs']:>4}  {d['path']:<44} {d['conflicto']}")
    else:
        P("  (ninguno)")

    P(f"\n\n── CAMBIO DE SERIE (los caros: cada uno necesita ID nuevo) ──")
    cs = sorted([d for d in docs if d['op'] == 'change-series'], key=lambda x: -x['refs'])
    if cs:
        for d in cs:
            flag = '  ⚠ MUY CITADO' if d['refs'] >= 20 else ''
            P(f"  {d['refs']:>4} refs  {d['path']}  →  {d['destino']}/{flag}")
    else:
        P("  (ninguno)")

    P(f"\n\n── MATRICULACIÓN PENDIENTE (D-008 + D-013) ──")
    reg = defaultdict(list)
    for d in docs:
        if d['aparato'] or not d['tiene_fm']:
            continue
        # agents/: A-NNN registra la CARPETA del agente, no los 4 ficheros
        # de dentro (SOUL/OPERATOR/STATUS/MEMORY). Contarlos uno a uno
        # inventa 17 incumplimientos donde hay 5 carpetas.
        if d['carpeta'].startswith('agents/'):
            continue
        esq = None
        clave = None
        for k in sorted(ESQUEMA, key=len, reverse=True):
            if d['carpeta'].startswith(k):
                esq, clave = ESQUEMA[k], k
                break
        if esq and not re.match(esq, d['base']):
            reg[clave].append(d)
    total_reg = sum(len(v) for v in reg.values())
    P(f"  {total_reg} documentos sin matrícula conforme a su serie\n")
    for serie in sorted(reg):
        P(f"  {serie}/  — {len(reg[serie])} sin matrícula")
        for d in sorted(reg[serie], key=lambda x: -x['refs']):
            P(f"      {d['refs']:>3} refs  {d['base']}")
        P()

    P(f"\n\n── COBERTURA POR SERIE ──")
    P(f"  {'serie':<18}{'con':>5}{'/':^3}{'total':<7}{'%':>7}   (excluye aparato)")
    for serie, esq in sorted(ESQUEMA.items()):
        sel = [d for d in docs if d['carpeta'].startswith(serie) and not d['aparato']]
        if not sel:
            continue
        ok = sum(1 for d in sel if re.match(esq, d['base']))
        P(f"  {serie:<18}{ok:>5}{'/':^3}{len(sel):<7}{100*ok/len(sel):>6.1f}%")

    P(f"\n\n── guilds/ — EN REVISIÓN, NO SE TOCA ──")
    for d in sorted([x for x in docs if x['carpeta'].startswith('guilds')],
                    key=lambda x: x['path']):
        P(f"  {d['refs']:>3} refs  {d['type'] or '(sin type)':<14} {d['path']}")

    P(f"\n\n── operations/ — EL CAJÓN ──")
    for d in sorted([x for x in docs if x['carpeta'].startswith('operations')],
                    key=lambda x: (x['carpeta'], x['base'])):
        P(f"  {d['refs']:>3} refs  {d['type'] or '(sin type)':<14} {d['path']}")

    P(f"\n\n── SIN type: NO CLASIFICABLES ──")
    sin = [d for d in docs if not d['type'] and not d['aparato']]
    P(f"  {len(sin)} documentos. Un fichero sin type no puede archivarse por regla.")
    porc = Counter(d['carpeta'] for d in sin)
    for c, n in porc.most_common():
        P(f"      {n:>3}  {c}/")

    P(f"\n\n── CARPETAS: ¿alguna quedaría vacía? ──")
    for carpeta in sorted({d['carpeta'] for d in docs}):
        conts = [d for d in docs if d['carpeta'] == carpeta]
        se_van = [d for d in conts if d['op'] == 'change-series']
        if se_van and len(se_van) == len(conts):
            P(f"  {carpeta}/  →  QUEDARÍA VACÍA ({len(conts)} ficheros se van)")
    P("  (ninguna otra)")
    P()


if __name__ == '__main__':
    main()
