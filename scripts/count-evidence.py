#!/usr/bin/env python3
"""
count-evidence.py — produce TODOS los recuentos que cita GLOSSARY.md.

Exigencia del Oráculo (2026-08-24, feedback v1 §7):
«Un número que no se puede reproducir no es evidencia.»

Cada cifra del glosario sale de aquí. Si el corpus cambia, se reejecuta y
se actualiza el glosario — nunca al revés.

    python3 scripts/count-evidence.py            # informe legible
    python3 scripts/count-evidence.py --json     # para consumo automático
"""
import json, os, re, subprocess, sys
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from measuring_root import cabecera, sospechoso_si_cero
from collections import Counter, defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def sh(*a):
    return subprocess.run(['git', '-C', ROOT] + list(a),
                          capture_output=True, text=True).stdout


def md_files():
    return [f for f in sh('ls-files', '*.md').split('\n') if f.strip()]


def frontmatter(text):
    m = re.match(r'^---\s*\n(.*?)\n---', text, re.S)
    return m.group(1) if m else None


def main():
    files = md_files()
    docs = []
    for rel in files:
        try:
            t = open(os.path.join(ROOT, rel), encoding='utf-8').read()
        except Exception:
            continue
        fm = frontmatter(t)
        docs.append({'path': rel, 'text': t, 'fm': fm or '',
                     'has_fm': fm is not None,
                     'base': os.path.basename(rel)})

    R = {}

    # --- 1. Volumen ---
    R['docs_total'] = len(docs)
    R['docs_con_frontmatter'] = sum(1 for d in docs if d['has_fm'])
    R['docs_sin_frontmatter'] = sum(1 for d in docs if not d['has_fm'])

    # --- 2. Referencias textuales a identificadores ---
    ID_RE = re.compile(r'\b(MIS|ADR|DEC|RPT|AUD|P|C|BP)-\d{1,4}\b')
    menciones = Counter()
    for d in docs:
        for m in ID_RE.finditer(d['text']):
            menciones[m.group(0)] += 1
    R['referencias_textuales_total'] = sum(menciones.values())
    R['referencias_top'] = menciones.most_common(6)

    # --- 3. Uniformidad de matrícula por serie ---
    # Esquema post-ADR-005 v1.1.0 / MIS-125 (2026-08-31): 13 series
    # registradas, contra el registro NUEVO — no el viejo (D-008 mide la
    # distancia a este objetivo, no a un objetivo ya retirado).
    series = {
        'missions': (r'^MIS-\d{4}-', 'MIS-NNNN'),
        'protocols': (r'^PRO-\d{3}-', 'PRO-NNN'),
        'decisions': (r'^(ADR|DEC)-\d{3}-', 'ADR/DEC-NNN'),
        # ADR-005 v1.2.0 (2026-09-01): reports/ es plana y admite dos formas —
        # RPT-NNN para todo, RPT-YYYY-MM-DD sólo para subtype: daily
        # (ADR-004 regla 3). Se cuenta la forma, no el subtype: este script
        # mide cobertura de matrícula, la coherencia forma↔subtype la vigila
        # lint-naming N-04. reports/evidence/ queda fuera (anexo opaco).
        'reports': (r'^RPT-(\d{3}-|\d{4}-\d{2}-\d{2}\.md$)', 'RPT-NNN · RPT-YYYY-MM-DD (daily)'),
        'blueprints': (r'^BLU-\d{3}-', 'BLU-NNN'),
        'canon': (r'^CAN-\d{3}-', 'CAN-NNN'),
        'standards': (r'^STD-\d{3}-', 'STD-NNN'),
        'operations': (r'^OPS-\d{3}-', 'OPS-NNN'),
        'debt': (r'^DBT-\d{3}-', 'DBT-NNN'),
        'guilds': (r'^GLD-\d{3}-', 'GLD-NNN'),
        'infra': (r'^INF-\d{3}-', 'INF-NNN'),
    }
    # Fuera del denominador de matrícula — no son documentos de una serie
    # viva, así que contarlos hace leer la cobertura peor de lo que es.
    # Fallo MIS-125 (2026-08-31), ver D-008 §"El fallo frozen-artifact".
    #
    #  (a) Aparato: índices, plantillas y la lápida STANDARDS.md. Se excluían
    #      ya por nombre; se suma APPROVAL-REQUEST-template.md, aparato de
    #      P-008 (D-024 v1.2.0), que se excluía por nadie.
    #  (b) Artefactos congelados: nombre datado = fotografía, no documento
    #      vivo (P-010 §3.2). Se detectan por FORMA DE NOMBRE, no por el
    #      campo registration_exemption, porque dos de los cinco del corpus
    #      llevan la forma y no llevan el campo — un criterio que dependa
    #      del campo los cuenta como incumplimiento.
    #  (c) D-014 (cerrada 2026-08-31): el aparato se excluye por REGLA, no por
    #      una lista de nombres heredada. La regla es `type: meta` O uno de los
    #      nombres canónicos de aparato — la segunda mitad existe porque hay
    #      aparato sin `type: meta` declarado, y un criterio que dependa solo
    #      del campo lo contaría como incumplimiento. Cada serie reporta su
    #      aparato por separado ("aparato: N"), que era el otro requisito.
    APPARATUS = ('INDEX.md', 'README.md', 'TEMPLATE.md', 'STANDARDS.md',
                 'APPROVAL-REQUEST-template.md')
    FROZEN_ARTIFACT = re.compile(r'^\d{4}_\d{2}_\d{2}-.+-v\d+\.\d+\.\d+\.md$')

    def es_aparato(d):
        """D-014: aparato = type meta, o nombre canónico de aparato."""
        if d['base'] in APPARATUS:
            return True
        m = re.search(r'^type:\s*["\']?([\w-]+)', d['fm'], re.M)
        return bool(m and m.group(1).strip() == 'meta')

    R['matricula'] = {}
    R['excluidos'] = {'aparato': [], 'congelados': []}
    for carpeta, (pat, etiqueta) in series.items():
        sel = []
        aparato_serie = 0
        for d in docs:
            if not d['path'].startswith(carpeta + '/') or '/_template/' in d['path']:
                continue
            if d['path'].startswith('reports/evidence/'):
                continue  # anexo opaco, no documento de la serie (ADR-005 v1.2.0 r.5)
            if es_aparato(d):
                R['excluidos']['aparato'].append(d['path'])
                aparato_serie += 1
                continue
            if FROZEN_ARTIFACT.match(d['base']):
                R['excluidos']['congelados'].append(d['path'])
                continue
            sel.append(d)
        ok = sum(1 for d in sel if re.match(pat, d['base']))
        R['matricula'][carpeta] = {'esquema': etiqueta, 'con': ok,
                                   'total': len(sel),
                                   'aparato': aparato_serie,
                                   'pct': round(100 * ok / len(sel), 1) if sel else None}
    # agents/ queda fuera del registro (ADR-005 v1.1.0, reversión explícita
    # de la regla AG-NNN — identificado por nombre de carpeta, no numerado).
    agent_dirs = [d for d in os.listdir(os.path.join(ROOT, 'agents'))
                  if os.path.isdir(os.path.join(ROOT, 'agents', d)) and d != '_template'] \
                 if os.path.isdir(os.path.join(ROOT, 'agents')) else []
    R['agents_sin_prefijo_por_diseno'] = len(agent_dirs)

    # --- 4. uid: cuántos y cuántos fabricados ---
    uids = {}
    for d in docs:
        m = re.search(r'^uid:\s*["\']?([^"\'\n#]*)', d['fm'], re.M)
        if m and m.group(1).strip():
            uids[d['path']] = m.group(1).strip()
    # un uid v7 real tiene los últimos 12 hex aleatorios; los fabricados
    # llevan ceros de relleno más un contador
    fabricado = re.compile(r'-0{8,}\d*$')
    R['uid_presentes'] = len(uids)
    R['uid_fabricados'] = sum(1 for v in uids.values() if fabricado.search(v))
    R['uid_colisiones'] = sum(c - 1 for c in Counter(uids.values()).values() if c > 1)

    # --- 5. Relaciones declaradas (E6) ---
    NULOS = {'null', 'none', '~', '-', 'n/a', ''}
    rel = 0
    for d in docs:
        for campo in ('supersedes', 'superseded_by', 'derived_from', 'replaces'):
            m = re.search(rf'^{campo}:\s*["\']?([^"\'\n#]*)', d['fm'], re.M)
            if m and m.group(1).strip().lower() not in NULOS:
                rel += 1
                break
    R['docs_con_relacion_declarada'] = rel

    # --- 6. Estados de misión ---
    est = Counter()
    for d in docs:
        if not d['path'].startswith('missions/'):
            continue
        m = re.search(r'^status:\s*["\']?([^"\'\n]*)', d['fm'], re.M)
        if m:
            v = m.group(1).strip()
            est['(corrupto: comentario en el valor)' if '#' in v else v] += 1
    R['misiones_por_status'] = dict(est.most_common())

    # --- 7. Vocabularios contaminados ---
    def valores(campo, prefijo=None):
        c = Counter()
        for d in docs:
            if prefijo and not d['path'].startswith(prefijo):
                continue
            m = re.search(rf'^{campo}:\s*["\']?([^"\'\n#]*)', d['fm'], re.M)
            if m and m.group(1).strip():
                c[m.group(1).strip()] += 1
        return dict(c.most_common())
    R['guild_valores'] = valores('guild')
    R['type_execution_valores'] = valores('type_execution')
    R['area_valores_distintos'] = len(valores('area'))

    # --- 8. Timestamps ficticios ---
    R['created_T000000Z'] = sum(
        1 for d in docs if re.search(r'^created:.*T00:00:00Z', d['fm'], re.M))
    R['created_total'] = sum(1 for d in docs if re.search(r'^created:', d['fm'], re.M))

    # --- 9. Verificación por máquina: qué corre en CI ---
    ci = os.path.join(ROOT, '.github/workflows/ci.yml')
    guards = []
    if os.path.exists(ci):
        txt = open(ci, encoding='utf-8').read()
        guards = re.findall(r'run:\s*node\s+(scripts/\S+)', txt)
    R['ci_workflow_existe'] = os.path.exists(ci)
    R['ci_guards'] = guards

    R['head'] = sh('rev-parse', '--short', 'HEAD').strip()

    if '--json' in sys.argv:
        print(json.dumps(R, indent=2, ensure_ascii=False))
        return

    p = print
    p(f"\n{'='*70}\n  EVIDENCIA DEL GLOSARIO — HEAD {R['head']}\n{'='*70}")
    p(f"\n── VOLUMEN ──")
    p(f"  documentos .md rastreados : {R['docs_total']}")
    p(f"  con frontmatter           : {R['docs_con_frontmatter']}")
    p(f"  sin frontmatter           : {R['docs_sin_frontmatter']}")

    p(f"\n── REFERENCIAS TEXTUALES A IDENTIFICADORES ──")
    p(f"  total: {R['referencias_textuales_total']}")
    for k, v in R['referencias_top']:
        p(f"    {k:<12} {v}")

    p(f"\n── MATRÍCULA POR SERIE ──")
    p(f"  {'serie':<18}{'esquema':<14}{'con':>5}{'/':^3}{'total':<7}{'%':>7}{'aparato':>9}")
    for c, m in R['matricula'].items():
        pct = f"{m['pct']}%" if m['pct'] is not None else "—"
        ap = str(m['aparato']) if m['aparato'] else "·"
        p(f"  {c:<18}{m['esquema']:<14}{m['con']:>5}{'/':^3}{m['total']:<7}{pct:>7}{ap:>9}")
    p(f"  (aparato: excluido del denominador por regla type:meta — D-014)")

    p(f"\n── UID ──")
    p(f"  presentes  : {R['uid_presentes']}")
    p(f"  fabricados : {R['uid_fabricados']}  (secuenciales, no generados)")
    p(f"  colisiones : {R['uid_colisiones']}")

    p(f"\n── RELACIONES DECLARADAS ──")
    p(f"  {R['docs_con_relacion_declarada']} de {R['docs_total']} documentos")

    p(f"\n── ESTADOS DE MISIÓN ──")
    for k, v in R['misiones_por_status'].items():
        p(f"  {k:<45} {v}")

    p(f"\n── VOCABULARIOS ──")
    p(f"  guild          : {R['guild_valores']}")
    p(f"  type_execution : {R['type_execution_valores']}")
    p(f"  area           : {R['area_valores_distintos']} valores distintos")

    p(f"\n── TIMESTAMPS ──")
    p(f"  created con T00:00:00Z : {R['created_T000000Z']} de {R['created_total']}")

    p(f"\n── VERIFICACIÓN POR MÁQUINA ──")
    p(f"  .github/workflows/ci.yml : {'existe' if R['ci_workflow_existe'] else 'NO EXISTE'}")
    p(f"  guards que corren en CI  : {R['ci_guards'] or '(ninguno)'}")
    p()


if __name__ == '__main__':
    main()
