// src/components/molecules/ProgressIndicator/ProgressIndicator.cy.ts
import { mount } from '@cypress/vue'
import ProgressIndicator from './ProgressIndicator.vue'

describe('ProgressIndicator', () => {
  it('renders progress bar with correct percentage width', () => {
    mount(ProgressIndicator, { props: { totalSteps: 5, currentStep: 2 } })
    cy.get('[data-cy="progress-indicator"] div.bg-primary').should(
      'have.attr',
      'style',
      'width: 40%;',
    )
  })
})
