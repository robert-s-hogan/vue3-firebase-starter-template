// src/components/atoms/BaseLoading/BaseLoading.cy.js

import { mount } from '@cypress/vue'
import BaseLoading from './BaseLoading.vue'

describe('BaseLoading Component', () => {
  it('renders the loading spinner', () => {
    mount(BaseLoading)

    // Check if the loader div is present
    cy.get('.loader')
      .should('exist')
      .and('have.class', 'ease-linear')
      .and('have.class', 'rounded-full')
      .and('have.class', 'border-8')
  })

  it('has the correct fixed position and overlay', () => {
    mount(BaseLoading)

    // Make sure we're targeting the outer overlay div with the 'fixed' class
    cy.get('div.fixed')
      .should('have.class', 'inset-0')
      .and('have.class', 'bg-black')
      .and('have.class', 'bg-opacity-50')
  })
})
