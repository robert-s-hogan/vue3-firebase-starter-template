// src/components/atoms/BaseInput/BaseInput.cy.js

import { mount } from '@cypress/vue'
import BaseInput from './BaseInput.vue'

describe('BaseInput Component', () => {
  it('renders input with the correct type and placeholder', () => {
    mount(BaseInput, {
      props: {
        type: 'text',
        placeholder: 'Enter your name',
      },
    })
    cy.get('input').should('have.attr', 'type', 'text')
    cy.get('input').should('have.attr', 'placeholder', 'Enter your name')
  })

  it('emits the correct value on input', () => {
    mount(BaseInput, {
      props: {
        modelValue: '',
      },
    })
    cy.get('input')
      .type('Hello World')
      .then(() => {
        // Use Cypress lodash _ to get the last emitted value
        const emittedValue = Cypress._.last(
          Cypress.vueWrapper.emitted('update:modelValue')
        )
        cy.wrap(emittedValue).should('deep.equal', ['Hello World'])
      })
  })

  it('applies correct classes for disabled state', () => {
    mount(BaseInput, {
      props: {
        disabled: true,
      },
    })
    cy.get('input').should('have.class', 'opacity-50')
    cy.get('input').should('have.class', 'cursor-not-allowed')
    cy.get('input').should('be.disabled')
  })

  it('applies correct classes for password type', () => {
    mount(BaseInput, {
      props: {
        type: 'password',
      },
    })
    cy.get('input').should('have.class', 'border-error-light')
    cy.get('input').should('have.class', 'focus:ring-error-light')
  })
})
