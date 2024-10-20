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
      .should('have.class', 'bg-blue-100')
      .and('have.class', 'text-blue-800')
  })

  it('renders correctly with success variant', () => {
    mount(BaseAlert, {
      props: { variant: 'success' },
      slots: {
        default: 'Success alert',
      },
    })
    cy.get('[role="alert"]')
      .should('have.class', 'bg-green-100')
      .and('have.class', 'text-green-800')
  })

  it('renders correctly with warning variant', () => {
    mount(BaseAlert, {
      props: { variant: 'warning' },
      slots: {
        default: 'Warning alert',
      },
    })
    cy.get('[role="alert"]')
      .should('have.class', 'bg-yellow-100')
      .and('have.class', 'text-yellow-800')
  })

  it('renders correctly with danger variant', () => {
    mount(BaseAlert, {
      props: { variant: 'danger' },
      slots: {
        default: 'Danger alert',
      },
    })
    cy.get('[role="alert"]')
      .should('have.class', 'bg-red-100')
      .and('have.class', 'text-red-800')
  })
})
