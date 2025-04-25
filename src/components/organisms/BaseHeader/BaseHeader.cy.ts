// src/components/organisms/BaseHeader/BaseHeader.cy.ts
import { mount } from '@cypress/vue'
import BaseHeader from './BaseHeader.vue'

describe('BaseHeader', () => {
  it('renders default slot content', () => {
    const defaultContent = 'My Header'
    mount(BaseHeader, { slots: { default: defaultContent } })
    cy.get('header').should('exist').and('contain.text', defaultContent)
  })
})
