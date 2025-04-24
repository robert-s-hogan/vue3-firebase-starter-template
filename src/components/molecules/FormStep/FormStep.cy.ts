// src/components/molecules/FormStep/FormStep.cy.ts
import { mount } from '@cypress/vue'
import FormStep from './FormStep.vue'

describe('FormStep', () => {
  it('displays step number and title', () => {
    mount(FormStep, { props: { step: 2, title: 'Profile Info' } })
    cy.get('[data-cy="form-step"] span').should('have.text', '2')
    cy.get('[data-cy="form-step"] h3').should('have.text', 'Profile Info')
  })
})
