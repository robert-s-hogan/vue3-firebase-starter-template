// src/components/atoms/ToastIcon/ToastIcon.cy.ts
import { mount } from '@cypress/vue'
import ToastIcon from './ToastIcon.vue'
describe('ToastIcon', () => {
  it('emits close when clicked', () => {
    const onClose = cy.spy().as('onClose')
    mount(ToastIcon, { props: { onClose } })
    cy.get('button').click()
    cy.get('@onClose').should('have.been.called')
  })
})
