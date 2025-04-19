#!/usr/bin/env node

// Enforce pnpm for both installations and script execution
if (!process.env.npm_execpath.includes('pnpm')) {
  console.error(
    '\x1b[31m%s\x1b[0m',
    'Error: This project requires pnpm. Please use pnpm instead of npm or yarn.',
  )
  process.exit(1)
}
