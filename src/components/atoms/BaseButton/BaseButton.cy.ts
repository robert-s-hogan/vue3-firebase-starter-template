// src/components/atoms/BaseButton/BaseButton.cy.ts
import { mount } from '@cypress/vue'
import BaseButton from './BaseButton.vue' // Ensure this path is correct
import type { DefineComponent } from 'vue'

// Define the possible variant types for better type safety
type ButtonVariant = 'primary' | 'secondary' | 'primaryOutlined'

// Define the props structure for type checking when creating the props object
// (We won't use this as a generic for mount anymore)
interface BaseButtonProps {
  variant?: ButtonVariant
  loading?: boolean
  disabled?: boolean // Added based on your component code
  class?: string | string[] | Record<string, boolean> // Added based on your component code
  // Add any other specific event handlers if needed, e.g., onClick?: (event: MouseEvent) => void;
}

describe('BaseButton Component', () => {
  // Helper function to type the props object (Optional but can help)
  const createProps = (props: BaseButtonProps) => props

  it('renders correctly with primary variant', () => {
    mount(BaseButton, {
      // <-- Removed <BaseButtonProps> generic
      props: createProps({ variant: 'primary' }),
      slots: {
        default: 'Primary Button',
      },
    })
    cy.get('[data-cy="button"]')
      .should('have.class', 'bg-primary')
      .and('have.class', 'text-white')
      .and('not.have.class', 'opacity-50') // Check it's not disabled/loading
      .and('not.have.class', 'opacity-70')
  })

  it('renders correctly with secondary variant', () => {
    mount(BaseButton, {
      // <-- Removed <BaseButtonProps> generic
      props: createProps({ variant: 'secondary' }),
      slots: {
        default: 'Secondary Button',
      },
    })
    cy.get('[data-cy="button"]')
      .should('have.class', 'bg-secondary')
      .and('have.class', 'text-white')
      .and('not.have.class', 'opacity-50')
      .and('not.have.class', 'opacity-70')
  })

  it('renders correctly with primaryOutlined variant', () => {
    mount(BaseButton, {
      // <-- Removed <BaseButtonProps> generic
      props: createProps({ variant: 'primaryOutlined' }),
      slots: {
        default: 'Outlined Button',
      },
    })
    cy.get('[data-cy="button"]')
      .should('have.class', 'border')
      .and('have.class', 'text-primary')
      .and('have.class', 'bg-white') // Check other expected classes
      .and('not.have.class', 'opacity-50')
      .and('not.have.class', 'opacity-70')
  })

  it('displays spinner and correct classes when loading is true', () => {
    mount(BaseButton, {
      // <-- Removed <BaseButtonProps> generic
      props: createProps({ loading: true, variant: 'primary' }),
      slots: {
        default: 'Primary Button', // Slot content exists even if hidden
      },
    })
    cy.get('[data-cy="button"]')
      .should('have.class', 'opacity-70')
      .and('have.class', 'cursor-wait') // Check cursor class from your component
      .and('be.disabled') // Check disabled attribute

    cy.get('[data-cy="button"] svg.animate-spin').should('exist')
    // The span with slot content might still be in the DOM but hidden,
    // depending on how v-if/v-show is used. If it's truly removed by v-if:
    // cy.get('[data-cy="button"] span').should('not.exist');
    // If it's hidden (e.g., display: none), check visibility:
    cy.get('[data-cy="button"] > span').should('not.be.visible') // Check direct child span specifically

    // Verify spinner has text-white class (or adapt based on variant)
    cy.get('[data-cy="button"] svg.animate-spin').should(
      'have.class',
      'text-white',
    )
  })

  it('applies disabled classes and attribute when disabled is true', () => {
    mount(BaseButton, {
      // <-- Removed <BaseButtonProps> generic
      props: createProps({ disabled: true, variant: 'primary' }),
      slots: {
        default: 'Disabled Button',
      },
    })
    cy.get('[data-cy="button"]')
      .should('have.class', 'opacity-50')
      .and('have.class', 'cursor-not-allowed')
      .and('be.disabled') // Check the disabled attribute

    // Ensure spinner is NOT shown
    cy.get('[data-cy="button"] svg.animate-spin').should('not.exist')
    cy.get('[data-cy="button"] > span').should('be.visible')
  })

  it('emits click event when clicked and not loading/disabled', () => {
    mount(BaseButton, {
      // <-- Removed <BaseButtonProps> generic
      props: createProps({ loading: false, disabled: false }),
      slots: {
        default: 'Clickable Button',
      },
    }).then(({ wrapper }) => {
      cy.get('[data-cy="button"]').click()
      cy.get('[data-cy="button"]').then(() => {
        const emittedEvents = wrapper.emitted('click')
        expect(emittedEvents).to.exist
        expect(emittedEvents).to.have.length(1)
        // Check payload is an array containing the original MouseEvent
        expect(emittedEvents?.[0]?.[0]).to.be.instanceOf(MouseEvent)
      })
    })
  })

  it('does NOT emit click event when loading', () => {
    mount(BaseButton, {
      // <-- Removed <BaseButtonProps> generic
      props: createProps({ loading: true }),
      slots: { default: 'Loading' },
    }).then(({ wrapper }) => {
      // Use { force: true } because Cypress won't click disabled elements by default
      cy.get('[data-cy="button"]').click({ force: true })

      cy.get('[data-cy="button"]').then(() => {
        expect(wrapper.emitted('click')).to.not.exist
      })
    })
  })

  it('does NOT emit click event when disabled', () => {
    mount(BaseButton, {
      // <-- Removed <BaseButtonProps> generic
      props: createProps({ disabled: true }),
      slots: { default: 'Disabled' },
    }).then(({ wrapper }) => {
      // Use { force: true } because Cypress won't click disabled elements by default
      cy.get('[data-cy="button"]').click({ force: true })

      cy.get('[data-cy="button"]').then(() => {
        expect(wrapper.emitted('click')).to.not.exist
      })
    })
  })

  it('merges passed classes correctly', () => {
    const extraClass = 'my-extra-class'
    mount(BaseButton, {
      // <-- Removed <BaseButtonProps> generic
      props: createProps({ variant: 'primary', class: extraClass }),
      slots: { default: 'Extra Class Button' },
    })

    cy.get('[data-cy="button"]')
      .should('have.class', 'bg-primary') // Check base variant class
      .and('have.class', extraClass) // Check merged class
  })
})
