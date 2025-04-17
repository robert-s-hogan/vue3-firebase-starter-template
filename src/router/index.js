// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home/HomeView.vue'
import Login from '@/views/Login/LoginView.vue'
import Dashboard from '@/views/Dashboard/DashboardView.vue'
import AuthLayout from '@/layouts/auth/AuthLayout.vue'
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'
import { auth } from '@/firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Home', component: HomeView },
      { path: 'login', name: 'Login', component: Login },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/Register/RegisterView.vue'),
      },
      {
        path: 'reset-password',
        name: 'ResetPassword',
        component: () => import('@/views/reset-password/ResetPasswordView.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    component: AuthLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'Dashboard', component: Dashboard },
      // Add other authenticated routes here
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

let isAuthInitialized = false
let unsubscribeAuth = null // Store the unsubscribe function

// --- Helper function to check auth and decide navigation ---
function checkAuthAndNavigate(to, requiresAuth, user, next) {
  const isDevelopment = import.meta.env.DEV

  if (requiresAuth && !user) {
    // Route requires auth, but no user is logged in
    if (isDevelopment) {
      // Keep this useful dev warning
      console.warn(
        `%c[AuthGuard] DEV MODE: Bypassing auth check for "${to.path}".`,
        'color: orange;'
      )
      next()
    } else {
      // Keep this production log
      console.log(
        `[AuthGuard] Redirecting to Login. Route "${to.path}" requires auth.`
      )
      next({ name: 'Login', query: { redirect: to.fullPath } })
    }
  } else {
    // Route doesn't require auth OR user is logged in
    next() // Allow navigation
  }
}

// --- Navigation Guard ---
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (!isAuthInitialized) {
    // First navigation: Wait for the initial auth state determination
    // Ensure we only attach the listener once
    if (!unsubscribeAuth) {
      unsubscribeAuth = onAuthStateChanged(
        auth,
        (user) => {
          isAuthInitialized = true
          // Log the determined initial state *before* checking navigation
          console.log(
            `%c[AuthGuard] Initial state determined. User: ${
              user ? user.email : 'Not Logged In'
            }`,
            user ? 'color: green;' : 'color: red;' // Style based on status
          )
          checkAuthAndNavigate(to, requiresAuth, user, next)
        },
        (error) => {
          // Keep this important error log
          console.error('[AuthGuard] Error getting initial auth state:', error)
          isAuthInitialized = true // Mark as initialized even on error
          // Log the state determined on error
          console.log(
            `%c[AuthGuard] Initial state determined (error). User: Not Logged In`,
            'color: red;'
          )
          checkAuthAndNavigate(to, requiresAuth, null, next)
        }
      )
    }
    // Don't call next() or log here, wait for the onAuthStateChanged callback
  } else {
    // Auth already initialized, check with current user
    const user = auth.currentUser
    // Log the current state *before* checking navigation
    console.log(
      `%c[AuthGuard] Navigating. Current User: ${
        user ? user.email : 'Not Logged In'
      }`,
      user ? 'color: green;' : 'color: red;' // Style based on status
    )
    checkAuthAndNavigate(to, requiresAuth, user, next)
  }
})

// Optional: Clean up listener when app closes
// router.afterEach(() => { ... });

export default router
