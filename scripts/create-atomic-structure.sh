#!/usr/bin/env bash
# Creates an Atomic Design folder structure under src/components
# and a pages folder under src, each with a root index.ts

set -e

# Base paths
COMPONENTS_DIR="src/components"
ATOMIC_DIR="$COMPONENTS_DIR/atomic"
PAGES_DIR="src/pages"

# 1) Make the directories
mkdir -p "$ATOMIC_DIR/atoms" \
         "$ATOMIC_DIR/molecules" \
         "$ATOMIC_DIR/organisms" \
         "$PAGES_DIR"

# 2) Create index.ts in each atomic subfolder
cat > "$ATOMIC_DIR/atoms/index.ts" <<EOF
// Atoms – export your smallest building blocks here
// e.g.: export { default as Button } from './Button';
EOF

cat > "$ATOMIC_DIR/molecules/index.ts" <<EOF
// Molecules – compose atoms together here
// e.g.: export { default as FormField } from './FormField';
EOF

cat > "$ATOMIC_DIR/organisms/index.ts" <<EOF
// Organisms – compose molecules (and atoms) here
// e.g.: export { default as Header } from './Header';
EOF

# 3) Create top‑level atomic index.ts
cat > "$ATOMIC_DIR/index.ts" <<EOF
// Atomic – umbrella exports for all atoms, molecules & organisms
export * from './atoms';
export * from './molecules';
export * from './organisms';
EOF

# 4) Create src/components/index.ts so you can import from "@components"
cat > "$COMPONENTS_DIR/index.ts" <<EOF
// Components – root export for src/components
export * from './atomic';
EOF

# 5) Create src/pages/index.ts as a placeholder for page exports
cat > "$PAGES_DIR/index.ts" <<EOF
// Pages – export your page components here
// e.g.: export { default as HomePage } from './HomePage';
EOF

echo "✅ Atomic structure created under $COMPONENTS_DIR/atomic and pages folder at $PAGES_DIR"
