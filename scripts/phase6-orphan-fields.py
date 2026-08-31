#!/usr/bin/env python3
"""
Tanda B: los campos huerfanos de H-30 (campo en ningun anillo).

EL REPARTO REAL, QUE NO ERA EL QUE SUPONIAMOS
---------------------------------------------
111 hallazgos, pero 62 campos DISTINTOS. No es un problema repetido: es
una cola larguisima. 46 campos aparecen UNA sola vez (41% del total).

Y 22 de los 111 viven en los dos documentos fragiles ya apartados
(C-005-licensing 10, Sistema de Diseno 12), que van al final de uno en
uno. Quedan 89 trabajables.

CUATRO CAMPOS SISTEMATICOS = 35 HALLAZGOS
-----------------------------------------
Cada uno pide algo distinto, y ninguno era una pregunta para el Oraculo:

  adr_id (8)            SE RETIRA. Verificado en los 8: su valor es
                        identico al `id` del propio documento
                        (id="ADR-001", adr_id="ADR-001"). Un segundo
                        identificador para lo mismo.

  visibility_reason(11) SE REGISTRA en debt/. Justifica por que una deuda
                        no es publica. STD-004 §5.0 ya registra
                        `registration_reason` con el mismo patron:
                        el campo que explica una excepcion viaja con ella.

  threshold (9)         SE REGISTRA en canon/ y standards/. Vale `sealed`
                        y es el umbral de cambio del documento — el
                        mecanismo que P-003 usa por directorio.

  decision (4)          SE REGISTRA en decisions/. NO duplica el titulo:
                        title="GitHub as Archive Summa" frente a
                        decision="Use GitHub as the canonical repository
                        for the Narrative Work OS". El titulo nombra, el
                        campo enuncia lo decidido.

  semaforo (7)          SE REGISTRA en blueprints/. Mi primer juicio fue
                        retirarlo — castellano, valores "rojo"/"amarillo",
                        y `status` parecia cubrirlo. ERA FALSO: la web lo
                        pinta como punto de color
                        (blueprints/[id].astro linea 34) y sale en 15
                        ficheros del sitio construido. `status` es el ciclo
                        de vida del documento; esto es la salud del plano.
                        Lo descubri comprobando la capa web DESPUES de
                        aplicar el cambio, no antes. Ningun guard lee la
                        web: es la misma ceguera de la fase 3.

LO QUE NO TOCA ESTA TANDA
-------------------------
Los 46 campos de una sola aparicion. Retirarlos en bloque seria borrar
informacion que alguien escribio a proposito sin leer ni uno. Van a la
tanda C, documento por documento, que es como se decide eso.

USO
    python3 scripts/phase6-orphan-fields.py            # simulacro
    python3 scripts/phase6-orphan-fields.py --write    # aplica
"""
import os
import re
import sys
import subprocess
import collections

WRITE = "--write" in sys.argv
ROOT = subprocess.run(["git", "rev-parse", "--show-toplevel"],
                      capture_output=True, text=True).stdout.strip()

FRAGILES = {"canon/C-005-licensing.md",
            "standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md"}

# campos que se retiran del frontmatter
RETIRAR = {"adr_id"}

# `semaforo` NO se retira. Lo comprobe despues de decidir que sobraba:
# web/src/pages/blueprints/[id].astro lo pinta como un punto de color
# (verde/amarillo/rojo) y aparece en 15 ficheros del sitio construido.
# Mi razonamiento era que `status` ya lo cubria; es falso, porque `status`
# es el ciclo de vida del documento y esto es la salud del plano. Se
# registra en el anillo de blueprints/ en vez de borrarlo.

files = subprocess.run(["git", "-C", ROOT, "ls-files", "*.md"],
                       capture_output=True, text=True).stdout.split()
files = [f for f in files if not f.startswith("web/")]

casos = collections.Counter()
censo = []
tocados = set()

for rel in files:
    if rel in FRAGILES:
        continue
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
        mm = re.match(r'^([a-z_]+):[ \t]*(.*)$', linea)
        if mm and mm.group(1) in RETIRAR:
            campo, valor = mm.group(1), mm.group(2).strip()
            # adr_id solo se retira si de verdad duplica al id
            if campo == "adr_id":
                mid = re.search(r'^id:[ \t]*(.*)$', fm, re.M)
                if not mid or mid.group(1).strip() != valor:
                    out.append(linea)
                    casos["adr_id CONSERVADO (no duplica el id)"] += 1
                    continue
            casos["%s retirado" % campo] += 1
            censo.append((rel, campo, valor))
            tocado = True
            continue
        out.append(linea)

    if tocado:
        tocados.add(rel)
        if WRITE:
            open(path, "w", encoding="utf8").write(
                "---\n%s\n%s%s" % ("\n".join(out), cierre, resto))

print("%s — %d documentos" % ("APLICADO" if WRITE else "SIMULACRO", len(tocados)))
for k, n in casos.most_common():
    print("   %-46s %d" % (k, n))

if WRITE and censo:
    p = os.path.join(ROOT, "scripts", "phase6-retired-fields.txt")
    with open(p, "w", encoding="utf8") as fh:
        fh.write("# Campos retirados del frontmatter por la tanda B.\n")
        fh.write("# adr_id: duplicaba el id del propio documento.\n")
        fh.write("# semaforo: castellano, sin vocabulario ni lector; status lo cubre.\n")
        fh.write("#\n# documento\\tcampo\\tvalor que tenia\n")
        for rel, campo, valor in sorted(censo):
            fh.write("%s\t%s\t%s\n" % (rel, campo, valor))
    print("\n   censo -> scripts/phase6-retired-fields.txt (%d lineas)" % len(censo))

if not WRITE:
    print("\n(simulacro — usa --write para aplicar)")
