#!/usr/bin/env python3
"""
Repara el dano introducido por scripts/phase2-mechanical.py (PR #134, d4c2975).

QUE PASO
--------
El script de la fase 2 leia el frontmatter con esta regex:

    r'^---\\s*\\n(.*?)\\n---(\\n|$)'

El grupo 2 CONSUMIA el salto de linea del cierre, y el formato de escritura
no lo reponia:

    "---\\n%s\\n---%s" % (frontmatter, resto)

Eso produjo DOS danos distintos, segun lo que hubiera tras el cierre:

  a) el cuerpo empezaba justo despues  ->  el `---` quedo PEGADO al cuerpo
        ---                                ---# BP — CAO
        # BP — CAO
     79 ficheros.

  b) habia una linea en blanco         ->  se perdio esa linea
        ---                                ---
                                           # MIS-058 — Approval Brief
        # MIS-058 — Approval Brief
     6 ficheros.

79 + 6 = 85, exactamente los documentos que la fase 2 reescribio.

Ningun fichero perdio contenido. Astro renderiza bien los 85 (verificado: H1
correcto, el `---` no se cuela como texto) y el guard los lee bien, porque
ambos usan una regex tolerante. Un parser YAML estricto que exija `---` en
linea propia NO lee los 79 del caso (a).

QUE HACE
--------
Para cada .md, compara el separador que sigue al `---` de cierre con el que
tenia en BEFORE (el commit anterior al dano) y restaura el original byte a
byte. No asume: lo lee del objeto git.

Idempotente. Sin argumentos = simulacro. --write aplica.
"""
import re, sys, subprocess

WRITE = "--write" in sys.argv
BEFORE = "d4c2975~1"          # ultimo commit sano, previo a la fase 2

ROOT = subprocess.run(["git", "rev-parse", "--show-toplevel"],
                      capture_output=True, text=True).stdout.strip()
files = [f for f in subprocess.run(["git", "-C", ROOT, "ls-files", "*.md"],
                                   capture_output=True, text=True).stdout.split()
         if not f.startswith("web/")]


def cierre(txt):
    """(indice tras el ---, separador actual) del cierre del frontmatter."""
    if not txt.startswith("---"):
        return None, None
    m = re.search(r'\n---[ \t]*', txt[3:])
    if not m:
        return None, None
    fin = 3 + m.end()
    sep = re.match(r'\n*', txt[fin:]).group(0)
    return fin, sep


pegados, blancos = [], []
for rel in files:
    path = "%s/%s" % (ROOT, rel)
    txt = open(path, encoding="utf8", errors="replace").read()
    fin, sep = cierre(txt)
    if fin is None:
        continue

    prev = subprocess.run(["git", "-C", ROOT, "show", "%s:%s" % (BEFORE, rel)],
                          capture_output=True, text=True).stdout
    _, sep_ok = cierre(prev)
    if sep_ok is None or sep == sep_ok:
        continue

    (pegados if sep == "" else blancos).append(rel)
    if WRITE:
        open(path, "w", encoding="utf8").write(txt[:fin] + sep_ok + txt[fin + len(sep):])

print("%s — %d ficheros" % ("APLICADO" if WRITE else "SIMULACRO",
                            len(pegados) + len(blancos)))
print("   (a) cierre pegado al cuerpo   %d" % len(pegados))
print("   (b) linea en blanco perdida   %d" % len(blancos))
for rel in (pegados + blancos)[:6]:
    print("      %s" % rel)
if len(pegados) + len(blancos) > 6:
    print("      ... y %d mas" % (len(pegados) + len(blancos) - 6))
