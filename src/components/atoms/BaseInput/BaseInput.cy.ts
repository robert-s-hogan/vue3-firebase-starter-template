// src/components/atoms/BaseInput/BaseInput.cy.ts

import { mount } from '@cypress/vue'
import BaseInput from './BaseInput.vue'

describe('BaseInput Component', () => {
  // Define base props that are required by the component's type definition
  // Assuming 'type' and 'disabled' are the required ones based on the error
  const requiredBaseProps = {
    type: 'text', // Provide a default type if required
    disabled: false, // Provide a default disabled state if required
    modelValue: '', // Include modelValue with a default empty string
  }

  it('renders input with the correct type and placeholder', () => {
    mount(BaseInput, {
      props: {
        ...requiredBaseProps, // Start with the required base props
        type: 'text', // Override type for this specific test
        placeholder: 'Enter your name',
        // disabled: false, // Already included in requiredBaseProps default
      },
    })
    cy.get('input').should('have.attr', 'type', 'text')
    cy.get('input').should('have.attr', 'placeholder', 'Enter your name')
    cy.get('input').should('not.be.disabled') // Also good to assert the default disabled state
  })

  it('emits the correct value on input', () => {
    const onUpdateSpy = cy.spy().as('onUpdateSpy')

    mount(BaseInput, {
      props: {
        ...requiredBaseProps, // Include required base props
        modelValue: '', // This test focuses on modelValue, explicitly setting it
        'onUpdate:modelValue': onUpdateSpy,
        // type: 'text', // Already included in requiredBaseProps default
        // disabled: false, // Already included in requiredBaseProps default
      },
    })

    cy.get('input').type('Hello World')

    cy.get('@onUpdateSpy').should('have.been.calledOnceWith', 'Hello World')
  })

  it('applies correct classes for disabled state', () => {
    mount(BaseInput, {
      props: {
        ...requiredBaseProps, // Include required base props
        disabled: true, // Override disabled for this specific test
        // type: 'text', // Already included in requiredBaseProps default
        // modelValue: '', // Already included in requiredBaseProps default
      },
    })
    cy.get('input').should('have.class', 'opacity-50')
    cy.get('input').should('have.class', 'cursor-not-allowed')
    cy.get('input').should('be.disabled')
  })

  it('applies correct classes for password type', () => {
    mount(BaseInput, {
      props: {
        ...requiredBaseProps, // Include required base props
        type: 'password', // Override type for this specific test
        // disabled: false, // Already included in requiredBaseProps default
        // modelValue: '', // Already included in requiredBaseProps default
      },
    })
    // Note: Double-check if border-error-light/focus:ring-error-light
    // is *only* for password type or password type with an error.
    // Assuming it's just for password type based on the original test comment.
    cy.get('input').should('have.class', 'border-error-light')
    cy.get('input').should('have.class', 'focus:ring-error-light')
    cy.get('input').should('have.attr', 'type', 'password') // Assert type is set
  })
})
