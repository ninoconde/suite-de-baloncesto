#!/usr/bin/env bash
# SessionStart: resume el estado del Grupo 6 Junior Femenino Especial Bronce
# (próxima jornada y datos pendientes) para que Claude lo tenga en contexto.

DIR="${CLAUDE_PROJECT_DIR:-.}/datos/junior-bronce-femenino-g6"
CAL="$DIR/calendario.md"
EQ="$DIR/equipo.md"

[ -f "$CAL" ] || exit 0

echo "## Estado del Grupo 6 Junior Femenino Especial Bronce"

# Próxima jornada: primera fila del calendario con equipos y sin resultado.
# Columnas: | Jornada | Fecha | Local | Visitante | Resultado | Notas |
proxima=$(awk -F'|' '
  /^\|/ {
    for (i = 2; i <= 6; i++) gsub(/^[ \t]+|[ \t]+$/, "", $i)
    if ($2 !~ /^[0-9]+$/) next
    if ($4 != "" && $5 != "" && $6 == "") {
      printf "Jornada %s (%s): %s vs %s\n", $2, ($3 == "" ? "fecha sin apuntar" : $3), $4, $5
      exit
    }
  }' "$CAL")

jugadas=$(awk -F'|' '/^\|/ { gsub(/^[ \t]+|[ \t]+$/, "", $2); gsub(/^[ \t]+|[ \t]+$/, "", $6); if ($2 ~ /^[0-9]+$/ && $6 != "") n++ } END { print n + 0 }' "$CAL")

if [ -n "$proxima" ]; then
  echo "- Próxima jornada: $proxima"
else
  echo "- Próxima jornada: sin datos (el calendario está vacío o sin equipos)."
fi
echo "- Jornadas con resultado apuntado: $jugadas"

rivales=$(find "$DIR/rivales" -name '*.md' ! -name '_plantilla.md' 2>/dev/null | wc -l)
echo "- Fichas de rivales: $rivales"

pendientes=()
grep -q '_(pendiente' "$EQ" 2>/dev/null && pendientes+=("datos de nuestro equipo en equipo.md")
[ -z "$proxima" ] && pendientes+=("calendario del grupo")
if [ ${#pendientes[@]} -gt 0 ]; then
  echo "- Pendiente de rellenar: $(printf '%s; ' "${pendientes[@]}" | sed 's/; $//')"
  echo "Si Nino habla de baloncesto, recuérdale brevemente estos datos pendientes."
fi
