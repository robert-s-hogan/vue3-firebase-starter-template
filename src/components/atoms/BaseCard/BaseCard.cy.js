// src/components/atoms/BaseCard/BaseCard.cy.js

import { mount } from '@cypress/vue'
import BaseCard from './BaseCard.vue'

describe('BaseCard Component', () => {
  it('renders card content correctly', () => {
    mount(BaseCard, {
      slots: {
        default: '<p>This is a card content</p>',
      },
    })
    cy.get('div').should('have.class', 'bg-white')
    cy.get('div').should('have.class', 'shadow-md')
    cy.get('div').should('have.class', 'rounded')
    cy.get('div').should('have.class', 'p-6')
    cy.get('p').should('contain', 'This is a card content')
  })
})
