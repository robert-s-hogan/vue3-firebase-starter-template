// src/components/molecules/Toast/Toast.cy.ts
import { mount } from '@cypress/vue'
import Toast from './Toast.vue'
describe('Toast', () => {
  it('renders with default variant and handles close', () => {
    const onClose = cy.spy().as('onClose')
    mount(Toast, {
      props: { onClose },
      slots: { default: 'Info occurred' },
    })
    cy.get('[role=alert]')
      .should('have.class', 'bg-info-light')
      .and('have.class', 'text-info-dark')
    cy.get('[data-cy="toast-message"]').should('have.text', 'Info occurred')
    cy.get('button').click()
    cy.get('@onClose').should('have.been.called')
  })
  it('applies error variant classes', () => {
    mount(Toast, {
      props: { variant: 'error' },
      slots: { default: 'Error happened' },
    })
    cy.get('[role=alert]')
      .should('have.class', 'bg-error-light')
      .and('have.class', 'text-error-dark')
  })
})
