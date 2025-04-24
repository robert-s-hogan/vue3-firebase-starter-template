// src/components/atoms/BaseAvatar/BaseAvatar.cy.ts
import { mount } from '@cypress/vue'
import BaseAvatar from './BaseAvatar.vue'

describe('BaseAvatar', () => {
  it('renders image when src is provided', () => {
    const testUrl = 'https://via.placeholder.com/150'
    mount(BaseAvatar, {
      props: { src: testUrl, alt: 'Test', name: 'Jane Doe' },
    })
    cy.get('img')
      .should('have.attr', 'src', testUrl)
      .and('have.attr', 'alt', 'Test')
  })

  it('falls back to initials on error', () => {
    cy.intercept('GET', '**/broken.png', { forceNetworkError: true })
    mount(BaseAvatar, { props: { src: 'broken.png', name: 'Jane Doe' } })
    cy.get('[data-cy="avatar"] img').should('exist')
    // trigger error
    cy.get('[data-cy="avatar"] img').invoke('error')
    cy.get('[data-cy="avatar"] span').should('have.text', 'JD')
  })
})
