// src/components/organisms/BaseFooter/BaseFooter.cy.ts
import { mount } from '@cypress/vue'
import BaseFooter from './BaseFooter.vue'

describe('BaseFooter', () => {
  it('renders default slot content', () => {
    mount(BaseFooter)
    cy.get('[data-cy="footer"]')
      .should('exist')
      .and('contain.text', '© 2025 Your Company')
  })

  it('renders custom slot content', () => {
    const customText = 'Custom Footer'
    mount(BaseFooter, { slots: { default: customText } })
    cy.get('[data-cy="footer"]').should('contain.text', customText)
  })
})
