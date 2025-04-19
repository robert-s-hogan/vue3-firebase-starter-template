// eslint.config.js
import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import tsESLint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import pluginPrettier from 'eslint-plugin-prettier'
import cypressPlugin from 'eslint-plugin-cypress'
import tailwindCustomPlugin from './scripts/eslint-plugin-tailwind-custom-colors.cjs'

export default defineConfig([
  // --- Main config for JS, TS, and Vue files ---
  {
    // Target the primary source files
    files: ['**/*.{js,ts,vue}'],

    // Ignores apply to this specific config object's file pattern.
    // They also help ESLint's overall ignore behavior.
    ignores: [
      'node_modules/**',
      'dist/**',
      // Keep existing ignores for config/script files from this block
      '*.config.js',
      '*.config.ts',
      'scripts/**',
      'check-pnpm.js',
      // Add the global ignore for .d.ts files here
      '**/*.d.ts', // <--- KEEP THIS LINE
      // Explicitly ignore test files from *this* block, handled in their own block
      'cypress/**',
      'src/**/*.cy.{js,ts}',
    ],

    plugins: {
      '@typescript-eslint': tsESLint,
      vue: pluginVue,
      prettier: pluginPrettier,
      // Remove cypress plugin from here, apply only in test block
      // cypress: cypressPlugin,
      'tailwind-custom-colors': tailwindCustomPlugin,
    },

    languageOptions: {
      // Use vue-eslint-parser for this block covering .vue files
      // It will handle passing TS files to tsParser.
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // Tell vue-eslint-parser to use tsParser for the <script> block
        parser: tsParser,
        extraFileExtensions: ['.vue'],
        // project: ['./tsconfig.json'], // Add if TS rules need type info
        // tsconfigRootDir: __dirname, // Add if TS rules need type info
      },
      globals: {
        console: 'readonly', // Console is available in most environments
      },
    },

    settings: {
      // Remove cypress settings from here
      // ...cypressPlugin.configs.recommended.settings,
    },

    rules: {
      ...js.configs.recommended.rules, // Base JS rules
      ...pluginVue.configs['flat/recommended'].rules, // Vue recommended rules (applied to .vue files)
      ...tsESLint.configs.recommended.rules, // Base TS rules (applied via tsParser)

      // Customize unused vars rule - allow leading underscore for args/caught errors
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      'prettier/prettier': 'error', // Prettier integration rule
      'tailwind-custom-colors/no-non-theme-tailwind-colors': 'warn', // Custom plugin rule

      // The no-console rule allows specific console methods
      'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],

      // Disable no-undef as we are explicitly defining globals where needed
      // and relying on TS for other undefined checks in TS files.
      'no-undef': 'off',
    },
  },

  // --- Special config for Cypress & Test files (js, ts) ---
  // These files were ignored in the first block, now configured specifically.
  {
    files: [
      'cypress/**/*.{js,ts}', // Cypress specific files
      'src/**/*.cy.{js,ts}', // Component/service test files
    ],
    // No ignores needed here, files pattern is specific.
    plugins: {
      '@typescript-eslint': tsESLint, // Needed for TS test files
      cypress: cypressPlugin, // Needed for Cypress rules and globals
    },
    languageOptions: {
      // Use tsParser for TS test files (and works for JS test files)
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // project: ['./tsconfig.json'], // Add if TS rules in tests need type info
        // tsconfigRootDir: __dirname, // Add if TS rules in tests need type info
      },
      globals: {
        // Declare Cypress, Mocha, Chai, Sinon, and other test globals explicitly
        Cypress: 'readonly',
        cy: 'readonly',
        describe: 'readonly', // Mocha global
        it: 'readonly', // Mocha global
        expect: 'readonly', // Chai global (used by Cypress/Mocha)
        assert: 'readonly', // Chai global
        before: 'readonly', // Mocha global
        after: 'readonly', // Mocha global
        beforeEach: 'readonly', // Mocha global
        afterEach: 'readonly', // Mocha global
        sinon: 'readonly', // Sinon global (seen in authServices.cy.js)
        MouseEvent: 'readonly', // Standard DOM global used in BaseButton.cy.ts
        console: 'readonly', // Console is also used in tests
      },
    },
    settings: {
      // Apply cypress recommended settings here for globals etc.
      ...cypressPlugin.configs.recommended.settings,
    },
    rules: {
      // Apply Cypress recommended rules
      ...cypressPlugin.configs.recommended.rules,

      // Disable the no-undef rule for test files as we define globals above
      'no-undef': 'off',

      // Disable @typescript-eslint/no-unused-expressions in test files
      // This rule commonly flags 'expect(...)' assertions.
      '@typescript-eslint/no-unused-expressions': 'off',

      // You might want different unused var rules in tests (e.g., warn instead of error)
      // '@typescript-eslint/no-unused-vars': 'warn', // Example: Change to warn
    },
  },

  // --- Config for JS config/script files ---
  // These files were ignored in the first block, now configured specifically.
  {
    files: ['*.config.js', '*.config.ts', 'scripts/**/*.js', 'check-pnpm.js'],
    // No ignores needed here, files pattern is specific.
    plugins: {
      prettier: pluginPrettier, // If you want prettier in config files
    },
    languageOptions: {
      // Explicitly *do not* use tsParser for these files, as they are plain JS or config TS
      // Let ESLint default parser handle them or use espree implicitly.
      parser: undefined, // Or parser: null
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module', // Use module syntax for modern config files
      },
      globals: {
        // Add Node.js globals typically available in config/script files
        __dirname: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      ...js.configs.recommended.rules, // Apply base JS rules
      'prettier/prettier': 'error', // Apply Prettier rule

      // Disable TS rules and no-undef as they don't apply here
      '@typescript-eslint/no-unused-vars': 'off',
      'no-undef': 'off', // Disable no-undef as Node globals might not be covered by base js config
    },
  },

  // --- Specific config to handle/ignore .d.ts files ---
  // This is a fallback block. If .d.ts files somehow aren't fully ignored
  // by the 'ignores' in the first block and cause parsing errors, this block
  // explicitly targets them and prevents any parser from running.
  // --- Specific config to handle/ignore .d.ts files ---
  // --- Specific config to handle/ignore .d.ts files ---
  {
    files: ['**/*.d.ts'],
    languageOptions: {
      parser: undefined, // Or parser: null
    },
    rules: {
      // Turn off all potentially conflicting rules for these files.
      // Since no parser runs, most rules won't apply anyway, but this is safer.
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off', // .d.ts files can have types only used locally
      'no-undef': 'off',
      'prettier/prettier': 'off', // Ensure prettier doesn't try to format them
      // You could add 'off' for other specific plugin rules if necessary
    }, // <--- This brace closes the 'rules' object. GOOD.
  }, // <--- This brace closes the LAST config OBJECT { ... }. GOOD.
]) // <--- This bracket closes the ARRAY [ ... ]. GOOD.
