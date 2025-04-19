// src/components/atoms/BaseInput/BaseInput.cy.ts

import { mount } from '@cypress/vue'
import BaseInput from './BaseInput.vue'
import type { VueWrapper } from '@vue/test-utils' // Import VueWrapper type

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
    // Use a spy to easily assert emitted events
    const onUpdateSpy = cy.spy().as('onUpdateSpy')

    mount(BaseInput, {
      props: {
        modelValue: '',
        // Pass the spy as the handler for the emitted event
        'onUpdate:modelValue': onUpdateSpy,
      },
    })
    // .then is not needed directly after type here, perform the action
    cy.get('input').type('Hello World')

    // After the action, assert that the spy was called correctly
    cy.get('@onUpdateSpy').should('have.been.calledOnceWith', 'Hello World')

    // Old way using wrapper.emitted (also works, but spy is often preferred for call checks)
    // .then(({ wrapper }: { wrapper: VueWrapper<any> }) => { // Cast wrapper type if needed
    //   cy.get('input').type('Hello World')
    //   const emittedValue = wrapper.emitted('update:modelValue');
    //   expect(emittedValue).to.exist;
    //   expect(emittedValue).to.have.length(1);
    //   expect(emittedValue?.[0]).to.deep.equal(['Hello World']);
    // })
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
    // Note: The rule seems to apply border-error-light/focus:ring-error-light to *all* password inputs,
    // which might not be the intended design (usually error styles are conditional).
    // If this is intended, keep the check. If not, adjust component/test.
    cy.get('input').should('have.class', 'border-error-light')
    cy.get('input').should('have.class', 'focus:ring-error-light')
  })
})
