// src/components/organisms/ToastContainer/ToastContainer.cy.ts
import { mount } from '@cypress/vue'
import ToastContainer, { addToast } from './ToastContainer.vue'
describe('ToastContainer', () => {
  beforeEach(() => cy.clock())
  it('adds and auto-dismisses toasts', () => {
    mount(ToastContainer)
    addToast('Success!', 'success', 1000)
    cy.tick(0)
    cy.get('[data-cy="toast"]')
      .should('have.length', 1)
      .and('contain.text', 'Success!')
      .and('have.class', 'bg-success-light')
      .and('have.class', 'text-success-dark')
    cy.tick(1000)
    cy.get('[data-cy="toast"]').should('not.exist')
  })
})
