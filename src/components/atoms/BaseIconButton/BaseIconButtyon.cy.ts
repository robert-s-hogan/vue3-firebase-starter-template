// src/components/atoms/BaseIconButton/BaseIconButton.cy.ts
import { mount } from '@cypress/vue'
import BaseIconButton from './BaseIconButton.vue'

const DummyIcon = {
  template: '<svg data-cy="icon"></svg>',
}

describe('BaseIconButton', () => {
  it('renders an icon and has correct aria-label', () => {
    mount(BaseIconButton, {
      props: { label: 'Close' },
      slots: { default: DummyIcon },
    })
    cy.get('[data-cy="icon"]').should('exist')
    cy.get('button').should('have.attr', 'aria-label', 'Close')
  })

  it('emits click event', () => {
    const onClick = cy.stub()
    mount(BaseIconButton, { props: { label: 'Click', onClick } })
    cy.get('button').click()
    cy.get('button').then(() => {
      expect(onClick).to.have.been.called
    })
  })
})
