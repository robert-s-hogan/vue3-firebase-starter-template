// src/components/atoms/BaseTooltip/BaseTooltip.cy.ts
import { mount } from '@cypress/vue'
import BaseTooltip from './BaseTooltip.vue'

describe('BaseTooltip', () => {
  it('shows tooltip text on hover', () => {
    mount(BaseTooltip, {
      props: { text: 'Help info' },
      slots: { default: '<button>Hover me</button>' },
    })
    cy.get('[data-cy="tooltip"]').should('not.exist')
    cy.get('button').trigger('mouseenter')
    cy.get('[data-cy="tooltip"]').should('have.text', 'Help info')
  })
})
