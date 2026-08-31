#!/usr/bin/env python3
"""
Fase 3 del burndown de cabeceras — area -> territory (D-010).

D-010 avisa: "la migracion no es un renombrado". El campo `area` hace DOS
trabajos, dominio funcional + superficie tecnica, separados por / o +.

Ruling del Oraculo (2026-08-30): opcion 2 — la cola se DESCARTA.
Cita literal: "La 2, la 2 y ya reconstruiremos".

MATIZ IMPORTANTE, planteado por el Oraculo: "superficie" fue mi etiqueta y
era falsa. Los 42 valores compuestos son TRES cosas distintas, no una:

    7   la cola es OTRO TERRITORIO del vocabulario   'CAO / Product'
   16   la cola es superficie tecnica de verdad      'Platform / numinia-web'
    7   la cola es una disciplina                    'Product / Tech'
   12   resto sin primer segmento valido             -> TBA

Ruling ampliado tras esa correccion (2026-08-30): "Mi respuesta ahora mismo
va a ser no" (un documento NO puede tener varios territorios) y "todo lo que
haya que tenga que ver con los territorios, lo puedes borrar". Es decir: en
los tres casos se conserva el primer segmento y se descarta la cola, incluso
cuando esa cola es un territorio valido. Se reconstruye mas adelante.

Tres casos, en este orden:

  1. valor ya en el vocabulario (case-insensitive)  -> territory: <valor canonico>
  2. valor compuesto con PRIMER segmento valido     -> territory: <primer segmento>
     ('Platform / numinia-web' -> Platform). La cola se descarta.
  3. cualquier otro valor                           -> territory: "TBA"
     Permitido por ADR-028 porque MIS-124 es su duena declarada
     (DEFERRAL_OWNER en lint-frontmatter.mjs). H-32 lo cuenta, no lo falla.

Lo descartado NO se pierde en silencio: --write escribe el censo completo en
scripts/phase3-discarded-tails.txt, para que MIS-124 pueda reconstruirlo.

NO renombra en documentos que YA tengan `territory`: verificado que hay 0
colisiones, pero la guarda se queda porque el script debe poder reejecutarse.

La clave conserva su POSICION en el frontmatter: se reescribe la linea en
sitio, no se borra y se aniade al final.

Idempotente: sin `area` que migrar, la segunda pasada reporta 0.
Sin argumentos = simulacro. --write aplica.
"""
import re, sys, subprocess, collections

WRITE = "--write" in sys.argv
VOCAB = ["CAO", "Product", "Platform", "Infrastructure",
         "Content", "Sales", "Funding", "Archive"]          # STD-001 L964
CANON = {v.lower(): v for v in VOCAB}

ROOT = subprocess.run(["git", "rev-parse", "--show-toplevel"],
                      capture_output=True, text=True).stdout.strip()
files = subprocess.run(["git", "-C", ROOT, "ls-files", "*.md"],
                       capture_output=True, text=True).stdout.split()


def yaml_value(raw):
    """Valor real: quita comentario inline solo si no va entrecomillado."""
    s = raw.strip()
    if not s.startswith(('"', "'")):
        s = s.split('#')[0].strip()
    return s.strip('"').strip("'").strip()


casos = collections.Counter()
descartes = []          # (fichero, valor original, territorio, cola descartada)
tocados = set()

for rel in files:
    path = "%s/%s" % (ROOT, rel)
    txt = open(path, encoding="utf8", errors="replace").read()
    if not txt.startswith("---"):
        continue
    m = re.match(r'^---\s*\n(.*?)\n---[ \t]*(\r?\n|$)', txt, re.S)
    if not m:
        continue
    fm = m.group(1)
    cierre = "---" + m.group(2)      # conserva el salto de linea tal cual venia
    resto = txt[m.end():]

    if not re.search(r'^area:', fm, re.M):
        continue
    if re.search(r'^territory:', fm, re.M):       # colision: no tocar
        casos["SALTADO (ya tiene territory)"] += 1
        continue

    out = []
    for line in fm.split("\n"):
        ma = re.match(r'^area:[ \t]*(.*)$', line)
        if not ma:
            out.append(line)
            continue

        v = yaml_value(ma.group(1))

        if v.lower() in CANON:                     # caso 1
            out.append('territory: "%s"' % CANON[v.lower()])
            casos["1. directo"] += 1

        elif re.split(r'[/+]', v)[0].strip().lower() in CANON:   # caso 2
            cabeza = re.split(r'[/+]', v)[0].strip()
            cola = re.split(r'[/+]', v, 1)[1].strip()
            terr = CANON[cabeza.lower()]
            out.append('territory: "%s"' % terr)
            casos["2. primer segmento"] += 1
            descartes.append((rel, v, terr, cola))

        else:                                      # caso 3
            out.append('territory: "TBA"')
            casos["3. TBA (MIS-124)"] += 1
            descartes.append((rel, v, "TBA", v))   # el valor entero se pierde

        tocados.add(rel)

    nuevo = "\n".join(out)
    if WRITE and nuevo != fm:
        open(path, "w", encoding="utf8").write("---\n%s\n%s%s" % (nuevo, cierre, resto))

print("%s — %d documentos" % ("APLICADO" if WRITE else "SIMULACRO", len(tocados)))
for k, n in sorted(casos.items()):
    print("   %-32s %d" % (k, n))
print("   %-32s %d" % ("TOTAL", sum(v for k, v in casos.items() if k[0].isdigit())))

if descartes:
    print("\n=== valores descartados (ruling: opcion 2) — %d ===" % len(descartes))
    agg = collections.Counter("%s  ->  %s   [descartado: %s]" % (o, t, c)
                              for _, o, t, c in descartes)
    for k, n in agg.most_common(8):
        print("   x%-3d %s" % (n, k))
    if len(agg) > 8:
        print("   ... y %d formas mas" % (len(agg) - 8))

    # El censo completo, documento a documento, para que MIS-124 pueda
    # reconstruir lo que el ruling mando descartar. "Ya reconstruiremos"
    # solo es posible si queda constancia de QUE se descarto y DONDE.
    if WRITE:
        censo = "%s/scripts/phase3-discarded-tails.txt" % ROOT
        with open(censo, "w", encoding="utf8") as fh:
            fh.write("# Valores de `area` descartados por la fase 3 (D-010).\n")
            fh.write("# Ruling del Oraculo 2026-08-30: territorio unico, se\n")
            fh.write("# conserva el primer segmento y la cola se descarta.\n")
            fh.write("# Duena de la reconstruccion: MIS-124.\n")
            fh.write("#\n# documento\\tarea original\\tterritory escrito\\tdescartado\n")
            for rel, orig, terr, cola in sorted(descartes):
                fh.write("%s\t%s\t%s\t%s\n" % (rel, orig, terr, cola))
        print("\n   censo completo -> scripts/phase3-discarded-tails.txt (%d lineas)"
              % len(descartes))
