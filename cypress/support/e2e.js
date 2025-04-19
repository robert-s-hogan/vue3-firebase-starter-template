// cypress/support/e2e.js

// Import custom commands
import './commands'

// Catch unhandled exceptions
Cypress.on('uncaught:exception', (_err, _runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})
