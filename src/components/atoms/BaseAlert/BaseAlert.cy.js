// src/components/atoms/BaseAlert/BaseAlert.cy.js
import { mount } from '@cypress/vue'
import BaseAlert from './BaseAlert.vue'

describe('BaseAlert Component', () => {
  it('renders correctly with info variant', () => {
    mount(BaseAlert, {
      props: { variant: 'info' },
      slots: {
        default: 'Info alert',
      },
    })
    cy.get('[role="alert"]')
      .should('have.class', 'bg-info-light')
      .and('have.class', 'text-info-dark')
  })

  it('renders correctly with success variant', () => {
    mount(BaseAlert, {
      props: { variant: 'success' },
      slots: {
        default: 'Success alert',
      },
    })
    cy.get('[role="alert"]')
      .should('have.class', 'text-info-darkabg-success-light')
      .and('have.class', 'text-success-dark')
  })

  it('renders correctly with warning variant', () => {
    mount(BaseAlert, {
      props: { variant: 'warning' },
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
      props: { variant: 'danger' },
      slots: {
        default: 'Danger alert',
      },
    })
    cy.get('[role="alert"]')
      .should('have.class', 'bg-error-light')
      .and('have.class', 'text-error-dark')
  })
})
