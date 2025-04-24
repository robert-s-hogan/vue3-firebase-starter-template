// src/components/atoms/BaseBadge/BaseBadge.cy.ts
import { mount } from '@cypress/vue'
import BaseBadge from './BaseBadge.vue'

describe('BaseBadge', () => {
  it('renders the label', () => {
    mount(BaseBadge, { props: { label: 'Hello' } })
    cy.get('[data-cy="badge"]').should('have.text', 'Hello')
  })

  it('applies default styling', () => {
    mount(BaseBadge, { props: { label: 'New' } })
    cy.get('[data-cy="badge"]')
      .should('have.class', 'bg-muted')
      .and('have.class', 'text-text-primary')
  })

  it('applies success variant', () => {
    mount(BaseBadge, { props: { label: 'Done', variant: 'success' } })
    cy.get('[data-cy="badge"]')
      .should('have.class', 'bg-success-light')
      .and('have.class', 'text-success-dark')
  })
})
