// src/components/atoms/ToastMessage/ToastMessage.cy.ts
import { mount } from '@cypress/vue'
import ToastMessage from './ToastMessage.vue'
describe('ToastMessage', () => {
  it('renders slot content', () => {
    mount(ToastMessage, { slots: { default: 'Hello Toast' } })
    cy.get('[data-cy="toast-message"]').should('have.text', 'Hello Toast')
  })
})
