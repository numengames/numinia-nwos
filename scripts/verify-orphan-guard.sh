#!/usr/bin/env bash
# Bloque B — verificacion del guard rompiendolo a proposito.
# Un guard que no se ha visto fallar no esta verificado.
set -u
cd /var/home/uruk/arkitecktonia-home/repos/numinia-nwos

PUB=web/public/__guard-probe
DIST=web/dist/__guard-probe
PROBE=guard-probe-DELETEME.html

echo "=== 1. ESTADO BASE (antes de la sonda) ==="
node scripts/check-orphan-content.mjs > /tmp/g0.txt 2>&1
BASE_EXIT=$?
BASE_N=$(grep -c '^  \[' /tmp/g0.txt)
echo "    exit=$BASE_EXIT  huerfanas detectadas=$BASE_N"
grep -q "$PROBE" /tmp/g0.txt && echo "    ERROR: la sonda ya aparece" && exit 1
echo "    la sonda NO aparece (correcto)"

echo
echo "=== 2. INYECTAR SONDA en public/ y dist/ ==="
mkdir -p "$PUB" "$DIST"
printf '<!doctype html><title>probe</title><p>orphan probe</p>\n' > "$PUB/$PROBE"
cp "$PUB/$PROBE" "$DIST/$PROBE"
echo "    creado: $PUB/$PROBE"

echo
echo "=== 3. EL GUARD DEBE SEÑALARLA POR NOMBRE ==="
node scripts/check-orphan-content.mjs > /tmp/g1.txt 2>&1
PROBE_EXIT=$?
if grep -q "$PROBE" /tmp/g1.txt; then
  echo "    DETECTADA por nombre:"
  grep -n "$PROBE" /tmp/g1.txt | sed 's/^/      /'
else
  echo "    FALLO: el guard NO la detecto"
fi
echo "    exit=$PROBE_EXIT (debe ser 1)"

echo
echo "=== 4. RETIRAR SONDA ==="
rm -rf "$PUB" "$DIST"
node scripts/check-orphan-content.mjs > /tmp/g2.txt 2>&1
FINAL_EXIT=$?
FINAL_N=$(grep -c '^  \[' /tmp/g2.txt)
echo "    exit=$FINAL_EXIT  huerfanas detectadas=$FINAL_N"
grep -q "$PROBE" /tmp/g2.txt && echo "    ERROR: la sonda persiste" || echo "    la sonda ya NO aparece (correcto)"

echo
echo "=== RESULTADO ==="
if [ "$BASE_N" = "$FINAL_N" ] && grep -q "$PROBE" /tmp/g1.txt && [ "$PROBE_EXIT" = "1" ]; then
  echo "    GUARD VERIFICADO: detecta por nombre, falla con exit 1, y el"
  echo "    estado vuelve exactamente al inicial ($BASE_N huerfanas)."
else
  echo "    VERIFICACION FALLIDA — revisar."
fi
echo
echo "=== limpieza: git status debe estar limpio salvo el propio guard ==="
git status --porcelain