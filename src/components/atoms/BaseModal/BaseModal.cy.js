// src/components/atoms/BaseModal.cy.js

import { mount } from '@cypress/vue'
import BaseModal from './BaseModal.vue'

describe('BaseModal Component', () => {
  it('renders the modal when visible is true', () => {
    mount(BaseModal, {
      props: {
        visible: true,
      },
    })

    // Assert the modal is rendered
    cy.get('div.fixed')
      .should('have.class', 'inset-0')
      .and('have.class', 'bg-black')
      .and('have.class', 'bg-opacity-50')

    cy.get('div.bg-white')
      .should('exist')
      .and('have.class', 'p-6')
      .and('have.class', 'rounded')
  })

  it('emits the close event when close button is clicked', () => {
    // Mount the component and pass a function as a prop to listen for 'close' event
    const onCloseSpy = cy.spy().as('onCloseSpy')

    mount(BaseModal, {
      props: {
        visible: true,
        onClose: onCloseSpy, // Attach the spy function to the close event
      },
    })

    // Click on the close button
    cy.get('button').contains('X').click()

    // Check if the event 'close' was called
    cy.get('@onCloseSpy').should('have.been.calledOnce')
  })

  it('does not render the modal when visible is false', () => {
    mount(BaseModal, {
      props: {
        visible: false,
      },
    })

    // Assert that the modal does not exist
    cy.get('div.fixed').should('not.exist')
  })
})
