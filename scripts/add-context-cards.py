#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Numen Games S.L.
# SPDX-License-Identifier: MIT
"""
add-context-cards.py
Añade la tarjeta de contexto estándar (Opción C, STANDARDS.md §8) a todos
los .md del repo que aún no la tengan.

La tarjeta se genera automáticamente desde el frontmatter:
- Resumen: del campo title
- Epistémico: del campo epistemico (si existe) o generado del tipo
- Pragmático: del campo pragmatico (si existe) o generado del tipo
- Audiencia: inferida del tipo de documento

Uso: python3 scripts/add-context-cards.py [--dry-run]
"""

import os
import re
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DRY_RUN = "--dry-run" in sys.argv

SKIP_DIRS = {'.git', 'node_modules', 'scripts'}
SKIP_FILES = {'README.md'}  # ya tiene su propio formato libre

# Audiencias por tipo de documento
AUDIENCE_MAP = {
    'mission': 'Agentes · Oráculos',
    'decision': 'Agentes · Oráculos',
    'blueprint': 'Agentes · Oráculos',
    'audit': 'Oráculos · Externos',
    'protocol': 'Agentes',
    'report': 'Oráculos',
    'agent': 'Agentes',
    'seminal': 'Agentes · Oráculos · Externos',
    'roster': 'Agentes · Oráculos',
    'charter': 'Agentes · Oráculos',
    'template': 'Agentes',
    'index': 'Agentes · Oráculos',
    'meta': 'Agentes · Oráculos',
    'adr': 'Agentes · Oráculos',
}

# Resúmenes genéricos por tipo cuando no hay campos específicos
SUMMARY_MAP = {
    'mission': 'Misión del sistema NWOS con criterios, valor epistémico y pragmático.',
    'decision': 'Decisión arquitectónica o estratégica con contexto y alternativas.',
    'blueprint': 'Plano del sistema: estado actual, objetivo, gaps y dependencias.',
    'audit': 'Auditoría de coherencia entre fuentes de verdad del sistema.',
    'protocol': 'Protocolo operativo estándar del sistema NWOS.',
    'report': 'Reporte operativo diario del sistema.',
    'agent': 'Ficha de identidad y operación del agente.',
    'seminal': 'Documento fundacional del universo Numinia.',
    'roster': 'Lista de agentes activos en este gremio.',
    'charter': 'Carta fundacional del gremio: misión, dominio y ramas.',
    'template': 'Template reutilizable para crear documentos del sistema.',
    'index': 'Índice de documentos de este fondo documental.',
}

EPISTEMIC_MAP = {
    'decision': 'Qué se decidió, por qué, y qué alternativas se descartaron.',
    'blueprint': 'El estado real vs. el objetivo — dónde estamos y hacia dónde vamos.',
    'audit': 'Divergencias entre la web y el repo — qué no está sincronizado.',
    'protocol': 'Cómo se ejecuta este proceso y por qué de esta forma.',
    'report': 'Qué se hizo, qué costó y qué se aprendió en este período.',
    'agent': 'Quién es este agente, sus leyes y su contexto operativo.',
    'charter': 'El propósito y dominio de este gremio en el sistema.',
    'roster': 'Qué agentes operan en este gremio y su estado actual.',
    'seminal': 'Conocimiento fundacional del universo Numinia.',
    'adr': 'Qué se decidió, por qué, y qué alternativas se descartaron.',
}

PRAGMATIC_MAP = {
    'decision': 'Consultar antes de tomar decisiones en el mismo dominio.',
    'blueprint': 'Identificar qué misiones abren los gaps documentados.',
    'audit': 'Priorizar fixes según severidad (crítico/importante/menor).',
    'protocol': 'Seguir estos pasos en el contexto especificado.',
    'report': 'Punto de referencia para evaluar progreso y costes reales.',
    'agent': 'Briefing completo para activar o coordinar con este agente.',
    'charter': 'Referencia para asignar misiones y responsabilidades al gremio.',
    'roster': 'Ver qué agentes están disponibles en este gremio.',
    'seminal': 'Fuente de verdad canónica — consultar antes de crear lore.',
    'adr': 'Consultar antes de tomar decisiones en el mismo dominio.',
}


def log(msg, action="INFO"):
    prefix = "🔍 [DRY]" if DRY_RUN else "✅ [RUN]"
    print(f"{prefix} [{action}] {msg}")


def extract_frontmatter(content):
    """Extrae el frontmatter YAML como dict simple (sin pyyaml)."""
    if not content.startswith('---'):
        return {}, content
    end = content.find('\n---', 3)
    if end == -1:
        return {}, content
    fm_text = content[3:end]
    fm = {}
    for line in fm_text.split('\n'):
        if ':' in line:
            key, _, val = line.partition(':')
            key = key.strip()
            val = val.strip().strip('"').strip("'")
            if key and val:
                fm[key] = val
    return fm, content[end+4:].lstrip('\n')


def has_context_card(body):
    """Detecta si ya tiene tarjeta de contexto."""
    return '> **Epistémico:**' in body or '> **Epist\u00e9mico:**' in body or '**Epistémico:**' in body


def generate_card(fm, filepath):
    """Genera la tarjeta de contexto desde el frontmatter."""
    doc_type = fm.get('type', '').lower()
    title = fm.get('title', os.path.basename(filepath).replace('.md', ''))

    # Resumen
    summary = SUMMARY_MAP.get(doc_type, f'Documento del sistema NWOS — {title}.')

    # Epistémico
    epistemic = fm.get('epistemico') or fm.get('epistemic') or EPISTEMIC_MAP.get(doc_type, 'Qué aprendes leyendo este documento.')

    # Pragmático
    pragmatic = fm.get('pragmatico') or fm.get('pragmatic') or PRAGMATIC_MAP.get(doc_type, 'Qué puedes hacer con este documento.')

    # Audiencia
    audience = AUDIENCE_MAP.get(doc_type, 'Agentes · Oráculos')

    card = f"> **Resumen:** {summary}\n"
    card += f"> **Epistémico:** {epistemic}\n"
    card += f"> **Pragmático:** {pragmatic}\n"
    card += f"> **Audiencia:** {audience}\n"

    return card


def process_file(filepath):
    """Añade la tarjeta de contexto si no la tiene."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    fm, body = extract_frontmatter(content)

    if has_context_card(body):
        return False  # ya tiene tarjeta

    # Encontrar el primer heading H1
    lines = body.split('\n')
    h1_idx = None
    for i, line in enumerate(lines):
        if line.startswith('# '):
            h1_idx = i
            break

    if h1_idx is None:
        return False  # sin H1, no insertamos

    # Generar tarjeta
    card = generate_card(fm, filepath)

    # Insertar después del H1
    new_lines = lines[:h1_idx+1] + ['', card, '---', ''] + lines[h1_idx+1:]
    new_body = '\n'.join(new_lines)

    # Reconstruir el archivo
    if content.startswith('---'):
        end = content.find('\n---', 3)
        frontmatter_block = content[:end+4]
        new_content = frontmatter_block + '\n' + new_body
    else:
        new_content = new_body

    log(f"Tarjeta añadida: {filepath.replace(REPO, '')}", "CARD")

    if not DRY_RUN:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

    return True


def main():
    print(f"\n{'=' * 60}")
    print(f"NWOS Context Cards — add-context-cards.py")
    print(f"Mode: {'DRY RUN' if DRY_RUN else 'LIVE'}")
    print(f"{'=' * 60}\n")

    count = 0
    skipped = 0

    for root, dirs, files in os.walk(REPO):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for fname in files:
            if not fname.endswith('.md'):
                continue
            if fname in SKIP_FILES:
                continue
            # Saltar canon/ (inmutable)
            if '/canon/' in root.replace('\\', '/'):
                continue

            filepath = os.path.join(root, fname)
            try:
                result = process_file(filepath)
                if result:
                    count += 1
                else:
                    skipped += 1
            except Exception as e:
                print(f"  ⚠️  Error en {fname}: {e}")

    print(f"\n{'=' * 60}")
    print(f"Tarjetas añadidas: {count}")
    print(f"Ya tenían tarjeta / sin H1: {skipped}")
    if DRY_RUN:
        print("Ejecutar sin --dry-run para aplicar.")
    print(f"{'=' * 60}\n")


if __name__ == "__main__":
    main()
