#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Numen Games S.L.
# SPDX-License-Identifier: MIT
"""
normalize-standards.py
Normaliza el repositorio numinia-digital-agents según STANDARDS.md v1.0.0

Acciones:
1. Timestamps: "2026-XX-XX" → "2026-XX-XXT00:00:00Z" en frontmatter
2. Elimina archivos .md duplicados de misiones (los que no tienen nombre descriptivo)
3. Normaliza IDs de misiones a 5 dígitos: MIS-037 → MIS-00037

Uso: python3 scripts/normalize-standards.py [--dry-run]
"""

import os
import re
import sys
import glob

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DRY_RUN = "--dry-run" in sys.argv

def log(msg, action="INFO"):
    prefix = "🔍 [DRY]" if DRY_RUN else "✅ [RUN]"
    print(f"{prefix} [{action}] {msg}")

# ──────────────────────────────────────────────
# 1. TIMESTAMPS: "2026-XX-XX" → ISO 8601 UTC
# ──────────────────────────────────────────────
DATE_PATTERN = re.compile(r'(created|updated|started|completed):\s*"(2026-\d{2}-\d{2})"')

def normalize_timestamps(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = DATE_PATTERN.sub(r'\1: "\2T00:00:00Z"', content)

    if new_content != content:
        log(f"Timestamps normalizados: {filepath.replace(REPO, '')}", "TIMESTAMP")
        if not DRY_RUN:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
        return True
    return False

# ──────────────────────────────────────────────
# 2. ELIMINAR DUPLICADOS DE MISIONES
#    Archivos tipo MIS-016.md (sin nombre descriptivo)
#    cuando existe MIS-016-*.md
# ──────────────────────────────────────────────
def remove_mission_duplicates():
    for folder in ['missions/done', 'missions/active', 'missions/backlog']:
        folder_path = os.path.join(REPO, folder)
        if not os.path.exists(folder_path):
            continue

        files = os.listdir(folder_path)

        # Agrupar por ID de misión
        by_id = {}
        for f in files:
            if not f.endswith('.md'):
                continue
            # Detectar patrón MIS-NNN.md (sin guión adicional = duplicado corto)
            match_short = re.match(r'^(MIS-\d+)\.md$', f)
            match_full  = re.match(r'^(MIS-\d+)-.+\.md$', f)
            if match_short:
                mid = match_short.group(1)
                by_id.setdefault(mid, {'short': [], 'full': []})
                by_id[mid]['short'].append(f)
            elif match_full:
                mid = match_full.group(1)
                by_id.setdefault(mid, {'short': [], 'full': []})
                by_id[mid]['full'].append(f)

        # Eliminar versiones cortas cuando existe versión descriptiva
        for mid, versions in by_id.items():
            if versions['short'] and versions['full']:
                for short_file in versions['short']:
                    filepath = os.path.join(folder_path, short_file)
                    log(f"Eliminando duplicado: {folder}/{short_file} (existe {versions['full'][0]})", "DELETE")
                    if not DRY_RUN:
                        os.remove(filepath)

# ──────────────────────────────────────────────
# 3. NORMALIZAR IDs DE MISIONES A 5 DÍGITOS
#    MIS-037 → MIS-00037 en frontmatter
#    (solo en el campo id:, no en referencias de texto)
# ──────────────────────────────────────────────
MIS_ID_SHORT = re.compile(r'^(id:\s*"MIS-)(\d{1,4})(")', re.MULTILINE)

def normalize_mission_ids(filepath):
    if not os.path.exists(filepath):
        return False
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    def pad_id(m):
        return m.group(1) + m.group(2).zfill(5) + m.group(3)

    new_content = MIS_ID_SHORT.sub(pad_id, content)

    if new_content != content:
        log(f"ID normalizado a 5 dígitos: {filepath.replace(REPO, '')}", "ID")
        if not DRY_RUN:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
        return True
    return False

# ──────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────
def main():
    print(f"\n{'=' * 60}")
    print(f"NWOS Standards Normalizer v1.0.0")
    print(f"Repo: {REPO}")
    print(f"Mode: {'DRY RUN (no changes)' if DRY_RUN else 'LIVE (writing changes)'}")
    print(f"{'=' * 60}\n")

    # Recopilar todos los .md del repo (excluyendo canon/ que es inmutable)
    all_md = []
    for root, dirs, files in os.walk(REPO):
        # Excluir canon/ (inmutable por policy)
        dirs[:] = [d for d in dirs if d not in ['canon', '.git', 'node_modules']]
        for f in files:
            if f.endswith('.md'):
                all_md.append(os.path.join(root, f))

    # 1. Normalizar timestamps
    ts_count = sum(1 for f in all_md if normalize_timestamps(f))
    print(f"\n→ Timestamps normalizados: {ts_count} archivos\n")

    # 2. Eliminar duplicados
    remove_mission_duplicates()

    # 3. Normalizar IDs
    id_count = 0
    for f in all_md:
        if '/missions/' in f:
            if normalize_mission_ids(f):
                id_count += 1
    print(f"\n→ IDs normalizados: {id_count} archivos\n")

    print(f"{'=' * 60}")
    print(f"Normalización {'simulada' if DRY_RUN else 'completada'}.")
    if DRY_RUN:
        print("Ejecutar sin --dry-run para aplicar cambios.")
    print(f"{'=' * 60}\n")

if __name__ == "__main__":
    main()
