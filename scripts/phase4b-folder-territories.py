#!/usr/bin/env python3
"""
Cierra los 19 H-36: territorios que son el nombre de la carpeta.

POR QUE NO ERA UNA PREGUNTA PARA EL ORACULO
-------------------------------------------
Se planteo como decision suya ("o falta vocabulario, o sobran valores").
Era una pregunta mal hecha: el corpus ya contiene la respuesta, y
mirarla cuesta menos que contestarla.

Los cuatro valores fuera del vocabulario son nombres de SERIE DOCUMENTAL,
no dominios de trabajo:

    Canon       8   todos en canon/
    Standards   6   cinco misiones sobre el estandar + standards/S-003
    Legal       3   reports/ y reports/audits/
    Governance  2   reports/audits/

Ninguno describe QUE dominio toca el documento. Describen DONDE vive, que
es justo lo que la ruta del fichero ya dice. Un campo que repite la
carpeta no aporta nada.

LA PRUEBA ESTA EN EL PROPIO CORPUS
----------------------------------
Documentos del mismo tipo, hechos en la misma tirada de trabajo, ya
llevan valores distintos:

    MIS-121  burndown de cabeceras      -> "Archive"
    MIS-122  misma familia de trabajo   -> "Standards"
    S-001    glosario                   -> "Archive"
    S-003    mismo tipo                 -> "Standards"

Uno de los dos es deriva. `Archive` esta en el vocabulario de las ocho
palabras y `Standards` no: la deriva es `Standards`. Lo mismo para los
otros tres.

Y encaja con la definicion: S-001 §territory sostiene `Archive` contra el
sentido archivistico del termino. El trabajo sobre el propio corpus —
canon, estandares, auditorias del corpus — es territorio de archivo.

DECISION
--------
Los 19 pasan a `Archive`. No se amplia el vocabulario: las ocho palabras
se quedan como estan.

Esto NO es irreversible. Si mas adelante `Governance` merece ser un
territorio propio, se añade al vocabulario y se reasignan los dos
documentos que lo pedian. Queda registrado en el censo para eso.

USO
    python3 scripts/phase4b-folder-territories.py            # simulacro
    python3 scripts/phase4b-folder-territories.py --write    # aplica
"""
import os
import re
import sys
import subprocess
import collections

WRITE = "--write" in sys.argv
ROOT = subprocess.run(["git", "rev-parse", "--show-toplevel"],
                      capture_output=True, text=True).stdout.strip()

# nombre de serie documental -> territorio real
SERIE = {"Canon": "Archive", "Standards": "Archive",
         "Legal": "Archive", "Governance": "Archive"}

files = subprocess.run(["git", "-C", ROOT, "ls-files", "*.md"],
                       capture_output=True, text=True).stdout.split()
files = [f for f in files if not f.startswith("web/")]

casos = collections.Counter()
censo = []

for rel in files:
    path = os.path.join(ROOT, rel)
    txt = open(path, encoding="utf8", errors="replace").read()
    m = re.match(r'^---\s*\n(.*?)\n---[ \t]*(\r?\n|$)', txt, re.S)
    if not m:
        continue
    fm = m.group(1)
    cierre = "---" + m.group(2)      # salto de linea original intacto (D-039)
    resto = txt[m.end():]

    out = []
    tocado = False
    for linea in fm.split("\n"):
        mm = re.match(r'^territory:[ \t]*(.*)$', linea)
        if not mm:
            out.append(linea)
            continue
        v = mm.group(1).strip().strip('"\'')
        nuevo = SERIE.get(v)
        if nuevo is None:
            out.append(linea)
            continue
        out.append('territory: "%s"' % nuevo)
        casos["%s -> %s" % (v, nuevo)] += 1
        censo.append((rel, v, nuevo))
        tocado = True

    if tocado and WRITE:
        open(path, "w", encoding="utf8").write(
            "---\n%s\n%s%s" % ("\n".join(out), cierre, resto))

print("%s — %d documentos" % ("APLICADO" if WRITE else "SIMULACRO", len(censo)))
for k, n in casos.most_common():
    print("   %-28s %d" % (k, n))

if WRITE and censo:
    # Constancia de que serie pedia cada documento, por si alguna merece
    # ser territorio propio mas adelante.
    p = os.path.join(ROOT, "scripts", "phase4b-folder-territories.txt")
    with open(p, "w", encoding="utf8") as fh:
        fh.write("# Territorios que eran nombre de serie documental.\n")
        fh.write("# Reasignados a Archive; el vocabulario no se amplio.\n")
        fh.write("# Si alguna serie merece territorio propio, esta es la lista.\n")
        fh.write("#\n# documento\\tpedia\\tescrito\n")
        for rel, v, nuevo in sorted(censo):
            fh.write("%s\t%s\t%s\n" % (rel, v, nuevo))
    print("\n   censo -> scripts/phase4b-folder-territories.txt (%d lineas)" % len(censo))

if not WRITE:
    print("\n(simulacro — usa --write para aplicar)")
