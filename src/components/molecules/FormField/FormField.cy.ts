import { mount } from '@cypress/vue'
import FormField from './FormField.vue'
import BaseInput from '@/components/atoms/BaseInput/BaseInput.vue'

describe('FormField Component', () => {
  it('renders the label and input correctly', () => {
    mount(FormField, {
      props: {
        id: 'test-input',
        label: 'Test Label',
        modelValue: '',
        placeholder: 'Enter text',
      },
      global: {
        components: { BaseInput },
      },
    })

    // Check that the label and input are rendered correctly
    cy.get('label').should('have.text', 'Test Label')
    cy.get('input')
      .should('have.attr', 'placeholder', 'Enter text')
      .should('have.attr', 'id', 'test-input')
  })

  it('updates the value when typing', () => {
    const onUpdateSpy = cy.spy().as('onUpdateSpy')

    mount(FormField, {
      props: {
        id: 'test-input',
        label: 'Test Label',
        modelValue: '',
        placeholder: 'Enter text',
        'onUpdate:modelValue': onUpdateSpy,
      },
      global: {
        components: { BaseInput },
      },
    })

    cy.get('input').type('Hello World')
    cy.get('@onUpdateSpy').should('have.been.calledWith', 'Hello World')
  })

  it('handles disabled state correctly', () => {
    mount(FormField, {
      props: {
        id: 'test-input',
        label: 'Disabled Input',
        modelValue: '',
        disabled: true,
      },
      global: {
        components: { BaseInput },
      },
    })

    cy.get('input').should('be.disabled')
  })
})
