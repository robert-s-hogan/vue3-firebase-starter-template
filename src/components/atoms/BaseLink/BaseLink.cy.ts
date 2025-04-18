// src/components/atoms/BaseLink/BaseLink.cy.ts

import { mount } from '@cypress/vue'
import { createRouter, createWebHistory } from 'vue-router'
import BaseLink from './BaseLink.vue'

// Setup routes for testing the router-link component
const routes = [
  { path: '/', component: { template: '<div>Home Page</div>' } },
  { path: '/about', component: { template: '<div>About Page</div>' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

describe('BaseLink Component', () => {
  it('renders with the correct `to` attribute', () => {
    mount(BaseLink, {
      global: {
        plugins: [router],
      },
      props: {
        to: '/about',
      },
      slots: {
        default: 'Go to About',
      },
    })

    cy.get('a').should('have.attr', 'href', '/about')
    cy.get('a').should('contain.text', 'Go to About')
  })

  it('navigates correctly when clicked', () => {
    mount(BaseLink, {
      global: {
        plugins: [router],
      },
      props: {
        to: '/about',
      },
      slots: {
        default: 'Go to About',
      },
    })

    cy.get('a').click()
    cy.url().should('include', '/about')
  })
})
