import { mount } from '@cypress/vue'
import BaseButton from './BaseButton.vue' // Ensure this path is correct

describe('BaseButton Component', () => {
  it('renders correctly with primary variant', () => {
    mount(BaseButton, {
      props: { variant: 'primary' },
      slots: {
        default: 'Primary Button',
      },
    })
    cy.get('[data-cy="button"]')
      .should('have.class', 'bg-primary')
      .and('have.class', 'text-white')
  })

  it('renders correctly with secondary variant', () => {
    mount(BaseButton, {
      props: { variant: 'secondary' },
      slots: {
        default: 'Secondary Button',
      },
    })
    cy.get('[data-cy="button"]')
      .should('have.class', 'bg-secondary')
      .and('have.class', 'text-white')
  })

  it('renders correctly with primaryOutlined variant', () => {
    mount(BaseButton, {
      props: { variant: 'primaryOutlined' },
      slots: {
        default: 'Outlined Button',
      },
    })
    cy.get('[data-cy="button"]')
      .should('have.class', 'border')
      .and('have.class', 'text-primary')
  })

  it('displays spinner when loading is true', () => {
    mount(BaseButton, {
      props: { loading: true, variant: 'primary' },
      slots: {
        default: 'Primary Button',
      },
    })
    cy.get('[data-cy="button"]').should('have.class', 'opacity-70')
    cy.get('svg.animate-spin').should('exist')
    cy.get('span').should('not.exist') // Text should be hidden when loading
  })

  it('emits click event when clicked', () => {
    mount(BaseButton, {
      props: { loading: false },
      slots: {
        default: 'Clickable Button',
      },
    }).then(({ wrapper }) => {
      cy.get('[data-cy="button"]')
        .click()
        .then(() => {
          const emittedEvents = wrapper.emitted('click')
          expect(emittedEvents).to.have.length(1) // Expecting exactly one click event to have been emitted
        })
    })
  })
})
