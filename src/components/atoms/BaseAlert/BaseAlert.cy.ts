// src/components/atoms/BaseAlert/BaseAlert.cy.ts
import { mount } from '@cypress/vue'
import BaseAlert from './BaseAlert.vue' // Assuming BaseAlert.vue is the component file

// Define the possible variant types for better type safety (Optional but recommended)
type AlertVariant = 'info' | 'success' | 'warning' | 'danger'

describe('BaseAlert Component', () => {
  it('renders correctly with info variant', () => {
    mount(BaseAlert, {
      props: {
        variant: 'info' as AlertVariant, // Type assertion for clarity
      },
      slots: {
        default: 'Info alert',
      },
    })
    cy.get('[role="alert"]')
      .should('have.class', 'bg-info-light')
      .and('have.class', 'text-info-dark')
  })

  it('renders correctly with success variant', () => {
    // Note: There might be a typo in your original JS test: 'text-info-darkabg-success-light'
    // Assuming it should be 'bg-success-light'
    mount(BaseAlert, {
      props: {
        variant: 'success' as AlertVariant, // Type assertion
      },
      slots: {
        default: 'Success alert',
      },
    })
    cy.get('[role="alert"]')
      // Corrected class name based on assumption
      .should('have.class', 'bg-success-light')
      .and('have.class', 'text-success-dark')
  })

  it('renders correctly with warning variant', () => {
    mount(BaseAlert, {
      props: {
        variant: 'warning' as AlertVariant, // Type assertion
      },
      slots: {
        default: 'Warning alert',
      },
    })
    cy.get('[role="alert"]')
      .should('have.class', 'bg-warning-light')
      .and('have.class', 'text-warning-dark')
  })

  it('renders correctly with danger variant', () => {
    mount(BaseAlert, {
      props: {
        variant: 'danger' as AlertVariant, // Type assertion
      },
      slots: {
        default: 'Danger alert',
      },
    })
    cy.get('[role="alert"]')
      .should('have.class', 'bg-error-light')
      .and('have.class', 'text-error-dark')
  })
})
