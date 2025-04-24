// src/components/atoms/BaseSwitch/BaseSwitch.cy.ts
import { mount } from '@cypress/vue'
import BaseSwitch from './BaseSwitch.vue'

describe('BaseSwitch', () => {
  it('renders unchecked by default', () => {
    mount(BaseSwitch, { props: { modelValue: false } })
    cy.get('input[type="checkbox"]').should('not.be.checked')
  })

  it('toggles and emits update:modelValue on change', () => {
    const onUpdate = cy.spy().as('onUpdate')
    mount(BaseSwitch, {
      props: { modelValue: false, 'onUpdate:modelValue': onUpdate },
    })
    cy.get('input[type="checkbox"]').check({ force: true })
    cy.get('@onUpdate').should('have.been.calledWith', true)
  })
})
