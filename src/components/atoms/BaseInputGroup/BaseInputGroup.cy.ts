// src/components/atoms/BaseInputGroup/BaseInputGroup.cy.ts
import { mount } from '@cypress/vue'
import BaseInputGroup from './BaseInputGroup.vue'

// Mock BaseInput for isolation
import BaseInput from '../BaseInput/BaseInput.vue'

describe('BaseInputGroup', () => {
  it('renders label, input, and help text', () => {
    mount(BaseInputGroup, {
      props: {
        id: 'test',
        label: 'Name',
        modelValue: '',
        help: 'Enter your name',
      },
      global: { components: { BaseInput } },
    })
    cy.get('label').should('have.attr', 'for', 'test').and('have.text', 'Name')
    cy.get('input').should('have.attr', 'id', 'test')
    cy.get('p').should('have.text', 'Enter your name')
  })

  it('emits update:modelValue on input', () => {
    const onUpdate = cy.spy().as('onUpdate')
    mount(BaseInputGroup, {
      props: {
        id: 'test',
        label: 'Name',
        modelValue: '',
        'onUpdate:modelValue': onUpdate,
      },
      global: { components: { BaseInput } },
    })
    cy.get('input').type('Vue')
    cy.get('@onUpdate').should('have.been.calledWith', 'Vue')
  })
})
