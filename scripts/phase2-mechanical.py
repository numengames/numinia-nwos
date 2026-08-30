#!/usr/bin/env python3
"""
Fase 2 del burndown de cabeceras — SOLO cambios mecanicos, cero decisiones.

Cuatro operaciones, todas con regla ya escrita en el canon:

  1. status: backlog -> todo        S-004 par.5: backlog no esta en el ciclo.
                                    La web ya lo traduce al pintar
                                    (RETIRED_TO_TODO), asi que el tablero se ve
                                    IGUAL antes y despues.
  2. uid: <valor> -> uid: ""        S-001 par.6.2: declarado y vacio hasta que
                                    exista el sistema de UID. Decision del
                                    Oraculo, no negociable.
  3. blocked_reason: null -> fuera   D-002 lo retiro. Solo se borra cuando el
                                    valor es null/vacio: no hay informacion
                                    que perder.
  4. version: "v1.2.3" -> "1.2.3"   S-004: SemVer desnudo, sin prefijo v.

NO TOCA (medido, no supuesto):
  - Las claves en castellano de C-005 y del Sistema de Diseno. Verificado:
    NO tienen equivalente ingles en su cabecera. Borrarlas destruiria
    informacion, no la migraria. Van a la fase 7, una a una.
  - blocked_reason con valor real (MIS-052: "PC in transit"). Ese texto es
    informacion viva; retirarlo exige decidir donde va.

Idempotente: correrlo dos veces produce el mismo arbol.
Sin argumentos = simulacro. --write aplica.
"""
import re, sys, subprocess, collections

WRITE = "--write" in sys.argv
ROOT = subprocess.run(["git","rev-parse","--show-toplevel"],
                      capture_output=True, text=True).stdout.strip()

files = subprocess.run(["git","-C",ROOT,"ls-files","*.md"],
                       capture_output=True, text=True).stdout.split()

cambios = collections.Counter()
tocados = set()

for rel in files:
    p = "%s/%s" % (ROOT, rel)
    txt = open(p, encoding="utf8", errors="replace").read()
    if not txt.startswith("---"):
        continue
    m = re.match(r'^---\s*\n(.*?)\n---[ \t]*(\r?\n|$)', txt, re.S)
    if not m:
        continue
    fm = m.group(1)
    cierre = "---" + m.group(2)   # conserva el salto de linea del cierre
    resto = txt[m.end():]
    orig = fm
    out = []

    for line in fm.split("\n"):
        s = line.strip()

        # 1. backlog -> todo
        if re.match(r'^status:\s*"?backlog"?\s*$', s):
            out.append(re.sub(r'backlog', 'todo', line, count=1).replace('"todo"','todo')
                       if '"' not in line else re.sub(r'"backlog"', '"todo"', line))
            cambios["backlog->todo"] += 1; tocados.add(rel); continue

        # 2. uid con valor -> vacio
        mu = re.match(r'^uid:\s*(.+)$', s)
        if mu and mu.group(1).strip() not in ('', '""', "''"):
            out.append('uid: ""')
            cambios["uid vaciado"] += 1; tocados.add(rel); continue

        # 3. blocked_reason SOLO si es null/vacio
        mb = re.match(r'^blocked_reason:\s*(.*)$', s)
        if mb and mb.group(1).strip() in ('null', '', '""', "''", '~'):
            cambios["blocked_reason borrado"] += 1; tocados.add(rel); continue

        # 4. version con prefijo v
        mv = re.match(r'^version:\s*"?v(\d+\.\d+\.\d+)"?\s*$', s)
        if mv:
            out.append('version: "%s"' % mv.group(1))
            cambios["version sin v"] += 1; tocados.add(rel); continue

        out.append(line)

    nuevo = "\n".join(out)
    if nuevo != orig and WRITE:
        open(p, "w", encoding="utf8").write("---\n%s\n%s%s" % (nuevo, cierre, resto))

print("%s — %d documentos tocados" % ("APLICADO" if WRITE else "SIMULACRO", len(tocados)))
for k, n in sorted(cambios.items()):
    print("   %-26s %d" % (k, n))
print("   %-26s %d" % ("TOTAL cambios", sum(cambios.values())))
