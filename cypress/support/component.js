// cypress/support/component.js

// Import Cypress commands for mounting Vue components
import { mount } from '@cypress/vue' // Corrected import
import Cypress from 'cypress' // Import Cypress explicitly

// Make `cy.mount` available globally to all component tests
Cypress.Commands.add('mount', mount)

// Additional configuration or global commands can be added here
import '../../src/assets/tailwind.css'

import sinon from 'sinon'
Cypress.sinon = sinon

// Ignore 404 errors for favicon requests
Cypress.on('fail', (error, _) => {
  if (error.message.includes('favicon.png')) {
    return false
  }
  throw error
})
