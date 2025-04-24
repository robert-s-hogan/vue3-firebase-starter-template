// src/components/molecules/FormNavigation/FormNavigation.cy.ts
import { mount } from '@cypress/vue'
import FormNavigation from './FormNavigation.vue'

describe('FormNavigation', () => {
  it('emits back and next events when clicked', () => {
    const onBack = cy.spy().as('back')
    const onNext = cy.spy().as('next')
    mount(FormNavigation, {
      props: { disableBack: false, disableNext: false, onBack, onNext },
    })
    cy.get('[data-cy="back-button"]').click()
    cy.get('[data-cy="back-button"]').then(() => {
      expect(onBack).to.have.been.called
    })
    cy.get('[data-cy="next-button"]').click()
    cy.get('[data-cy="next-button"]').then(() => {
      expect(onNext).to.have.been.called
    })
  })

  it('disables buttons based on props', () => {
    mount(FormNavigation, { props: { disableBack: true, disableNext: true } })
    cy.get('[data-cy="back-button"]').should('be.disabled')
    cy.get('[data-cy="next-button"]').should('be.disabled')
  })
})
