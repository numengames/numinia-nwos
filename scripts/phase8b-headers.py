#!/usr/bin/env python3
"""
Tanda final, parte 2: los 12 documentos sin cabecera (H-00).

Cabecera minima con RING1 completo. Nada inventado:
  - created/updated: primer/ultimo commit del fichero (git log --follow),
    con created_source: git:<sha> y created_confidence: exact.
  - title: el primer encabezado H1 del propio documento.
  - license: la que REUSE.toml ya declara para esa ruta (verificado con
    /tmp/reuse.py): CC-BY-4.0 todos salvo canon/README.md (AllRightsReserved).
  - author: el autor del primer commit (git), mapeado a su id.
  - registration: exempt — ninguno pertenece a una serie numerada
    (READMEs, INDEX, summas historicas, evidencia de auditoria).
  - status: active para documentos vivos (README, INDEX,
    engineering-standards); closed para los congelados (summas v0.1.0,
    protocolos/estandares historicos con version en el nombre, evidencia
    de auditoria — el 'Fondo' es artefacto congelado).

USO
    python3 scripts/phase8b-headers.py            # simulacro
    python3 scripts/phase8b-headers.py --write    # aplica
"""
import os
import re
import sys
import subprocess

WRITE = "--write" in sys.argv
ROOT = subprocess.run(["git", "rev-parse", "--show-toplevel"],
                      capture_output=True, text=True).stdout.strip()

# (ruta, status, licencia)
DOCS = [
    ("blueprints/README.md", "active", "CC-BY-4.0"),
    ("blueprints/archive-summa-arquitectura-v0.1.0.md", "closed", "CC-BY-4.0"),
    ("blueprints/archive-summa-fundacional-v0.1.0.md", "closed", "CC-BY-4.0"),
    ("blueprints/archive-summa-prompt-v0.1.0.md", "closed", "CC-BY-4.0"),
    ("canon/README.md", "active", "CC-BY-4.0"),
    # ^ REUSE.toml L31 lo excluye del regimen reservado de canon/** — la
    #   regla especifica manda sobre el patron ancho; el guard de licencias
    #   me corrigio la primera pasada.
    ("protocols/2026_04_14-Read_Me_How_to_Archive-v0.2.0.md", "closed", "CC-BY-4.0"),
    ("reports/INDEX.md", "active", "CC-BY-4.0"),
    ("reports/audits/AUD-2026-08-26-licensing-c005/README.md", "active", "CC-BY-4.0"),
    ("reports/audits/evidence/canon-2026-04-15/"
     "Epistemic-relations-v1-deleted-2026-04-15.md", "closed", "CC-BY-4.0"),
    ("reports/audits/evidence/canon-2026-04-15/README.md", "closed", "CC-BY-4.0"),
    ("standards/2026_04_14-Analogous_Terminology_Numina-v0.2.0.md", "closed", "CC-BY-4.0"),
    ("standards/STD-005-engineering-standards.md", "active", "CC-BY-4.0"),
]

AUTORES = {"Pablo": "pablo-fm", "pablofm": "pablo-fm", "Pablo FM": "pablo-fm"}

def git(*args):
    return subprocess.run(["git", "-C", ROOT] + list(args),
                          capture_output=True, text=True).stdout.strip()

n = 0
for rel, status, lic in DOCS:
    p = os.path.join(ROOT, rel)
    txt = open(p, encoding="utf8").read()
    if txt.startswith("---\n"):
        print("   ya tiene cabecera, salto: %s" % rel)
        continue

    log = git("log", "--follow", "--format=%H|%aI|%an", "--", rel).split("\n")
    primero = log[-1].split("|")   # commit mas antiguo
    ultimo = log[0].split("|")
    created, updated = primero[1], ultimo[1]
    sha = primero[0][:7]
    autor = AUTORES.get(primero[2], primero[2].lower().replace(" ", "-"))

    mh1 = re.search(r'^#\s+(.+)$', txt, re.M)
    title = (mh1.group(1).strip() if mh1
             else os.path.splitext(os.path.basename(rel))[0])
    title = title.replace('"', "'")

    # version: la del nombre del fichero si la lleva (v0.1.0 -> 0.1.0);
    # si no, 1.0.0 declarada — la version es una declaracion del editor,
    # no un hecho historico, asi que declararla no es inventar.
    mv = re.search(r'-v(\d+\.\d+\.\d+)\.md$', rel)
    version = mv.group(1) if mv else "1.0.0"

    top = rel.split("/")[0]
    header = (
        '---\n'
        'title: "%s"\n'
        'type: documentation\n'
        'status: %s\n'
        'version: "%s"\n'
        'created: "%s"\n'
        'created_source: "git:%s"\n'
        'created_confidence: exact\n'
        'updated: "%s"\n'
        'author: "%s"\n'
        'owner: "oracle"\n'
        'tags: [%s]\n'
        'license: "%s"\n'
        'registration: exempt\n'
        'registration_reason: "not part of a numbered series; '
        'header added from git history, nothing invented"\n'
        '---\n\n' % (title, status, version, created, sha, updated, autor, top, lic)
    )
    n += 1
    print("   %-70s %s %s..%s" % (rel[:68], status, created[:10], updated[:10]))
    if WRITE:
        open(p, "w", encoding="utf8").write(header + txt)

print("%s — %d cabeceras" % ("APLICADO" if WRITE else "SIMULACRO", n))
