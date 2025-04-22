/* eslint-disable */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Firebase Configuration
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string
  readonly VITE_FIREBASE_MEASUREMENT_ID: string // Added this one

  // Vite Configuration
  readonly VITE_APP_TITLE: string // Added this one
  readonly VITE_API_URL: string // Added this one

  // Vite Built-in Variables
  readonly DEV: boolean // Provided by Vite
  readonly PROD: boolean // Provided by Vite
  readonly SSR: boolean // Provided by Vite

  // Note: Other variables like CYPRESS_... and NODE_ENV
  // are typically accessed via process.env (in Node.js environments)
  // or handled by specific test runners/bundler configurations,
  // not usually declared in ImportMetaEnv for Vite.
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
