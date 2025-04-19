import { mount } from '@cypress/vue'
import BaseNavigation from './BaseNavigation.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import BaseLink from '@/components/atoms/BaseLink/BaseLink.vue'

// Define the routes
const routes = [
  { path: '/dashboard', component: { template: '<div>Dashboard Page</div>' } },
]
const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

describe('BaseNavigation Component', () => {
  it('renders the Dashboard link when authenticated', () => {
    mount(BaseNavigation, {
      props: {
        isAuthenticated: true,
      },
      global: {
        plugins: [router],
        components: {
          Link: BaseLink, // Register BaseLink as a global component
        },
      },
    })

    // Ensure the dashboard link is visible
    cy.get('a').should('contain.text', 'Dashboard')
    cy.get('a').should('have.attr', 'href', '/dashboard')
  })

  it('does not render the Dashboard link when not authenticated', () => {
    mount(BaseNavigation, {
      props: {
        isAuthenticated: false,
      },
      global: {
        plugins: [router],
        components: {
          Link: BaseLink,
        },
      },
    })

    // Ensure the dashboard link is not visible
    cy.get('a').should('not.exist')
  })
})
