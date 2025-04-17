import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import { rules as tailwindRules } from './scripts/eslint-plugin-tailwind-custom-colors.js'

export default [
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      'tailwind-custom': { rules: tailwindRules },
    },
    rules: {
      'tailwind-custom/no-non-theme-tailwind-colors': 'warn',
    },
  },
  ...pluginVue.configs['flat/essential'],
]
