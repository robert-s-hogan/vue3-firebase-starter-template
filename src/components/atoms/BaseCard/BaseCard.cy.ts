// src/components/atoms/BaseCard/BaseCard.cy.ts

import { mount } from '@cypress/vue'
import BaseCard from './BaseCard.vue' // Import the Vue component

describe('BaseCard Component', () => {
  it('renders card content correctly with expected styles', () => {
    const slotContent = '<p>This is the card content</p>' // Define slot content

    // Mount the component, passing the slot content
    mount(BaseCard, {
      slots: {
        default: slotContent, // Use the defined variable
      },
    })

    // Select the component's root element (assuming it's the div)
    // Chain the class assertions for better readability
    cy.get('div.bg-white.shadow-md.rounded.p-6') // More specific selector
      .should('exist') // Make sure the element itself exists with these classes
      .and('have.class', 'bg-white')
      .and('have.class', 'shadow-md')
      .and('have.class', 'rounded')
      .and('have.class', 'p-6')
      // Check the content *within* this div
      .find('p') // Find the paragraph element within the card
      .should('have.text', 'This is the card content') // Use have.text for exact match

    /* Alternative approach: Add a data-cy attribute for robustness */
    /*
    // In BaseCard.vue: <div data-cy="base-card" class="bg-white ...">
    mount(BaseCard, {
        slots: { default: slotContent }
    });

    cy.get('[data-cy="base-card"]')
        .should('have.class', 'bg-white')
        .and('have.class', 'shadow-md')
        .and('have.class', 'rounded')
        .and('have.class', 'p-6')
        .find('p')
        .should('have.text', 'This is the card content');
    */
  })
})
