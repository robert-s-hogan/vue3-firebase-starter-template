// src/components/organisms/MultiStepForm/MultiStepForm.cy.ts
import { mount } from '@cypress/vue'
import MultiStepForm from './MultiStepForm.vue'
import type { Step } from './MultiStepForm.vue'
import { defineComponent } from 'vue'

describe('MultiStepForm', () => {
  it('navigates steps and emits submit on final next', () => {
    const onSubmit = cy.spy().as('submit')
    const StepOne = defineComponent({
      template: '<div data-cy="step-one">One</div>',
    })
    const StepTwo = defineComponent({
      template: '<div data-cy="step-two">Two</div>',
    })

    const steps: Step[] = [
      { key: 'one', title: 'First', component: StepOne },
      { key: 'two', title: 'Second', component: StepTwo },
    ]

    mount(MultiStepForm, { props: { steps, onSubmit } })

    cy.get('[data-cy="step-one"]').should('exist')
    cy.get('[data-cy="next-button"]').click()
    cy.get('[data-cy="step-two"]').should('exist')
    cy.get('[data-cy="next-button"]').click()
    cy.get('@submit').should('have.been.calledWithMatch', {
      one: undefined,
      two: undefined,
    })
  })
})
