// check-pnpm.js
// Added check for Vercel environment
if (process.env.VERCEL === '1') {
  console.log(
    '[check-pnpm.js] Skipping pnpm check in Vercel build environment.',
  )
  process.exit(0) // Exit successfully if in Vercel build
}

const userAgent = process.env.npm_config_user_agent

if (userAgent && !userAgent.startsWith('pnpm/')) {
  console.error(
    'Error: This project requires pnpm. Please use pnpm instead of npm or yarn.',
  )
  process.exit(1)
}

// The script will proceed if VERCEL is '1' or if userAgent starts with 'pnpm/'
