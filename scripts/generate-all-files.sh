#!/bin/bash

echo "🧪 Generating trimmed preview of project files..."

OUTPUT="all-files.txt"
rm -f $OUTPUT

INCLUDE_EXTENSIONS="js|jsx|ts|tsx|css|config.js"

FILES=$(find . \
  -type f \
  \( -path "./src/*" -o -path "./scripts/*" -o -name "package.json" \
     -o -name "vite.config.js" -o -name "tailwind.config.js" \
     -o -name "eslint.config.js" \) \
  ! -path "*/node_modules/*" \
  ! -path "*/dist/*" \
  ! -path "*/.git/*" \
  ! -path "*/legacy/*" \
  ! -name "migrateToSupabase.js" \
  ! -name "App_backup.jsx" \
  | grep -E "\.($INCLUDE_EXTENSIONS)$" \
  | sort)

for FILE in $FILES; do
  echo "═══════════════════════════════════════════════" >> $OUTPUT
  echo "📄 FILE: $FILE" >> $OUTPUT
  echo "───────────────────────────────────────────────" >> $OUTPUT
  head -n 200 "$FILE" >> $OUTPUT
  echo -e "\n" >> $OUTPUT
done

echo "✅ all-files.txt created (trimmed and lean)."