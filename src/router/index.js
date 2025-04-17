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
  // Check if running in development mode (using Vite's boolean flag)
  const isDevelopment = import.meta.env.DEV

  if (requiresAuth && !user) {
    // Route requires auth, but no user is logged in
    if (isDevelopment) {
      // --- DEVELOPMENT MODE BYPASS ---
      console.warn(
        `DEV MODE: Bypassing auth check for "${to.path}". User is not logged in.`
      )
      next() // Allow navigation anyway
      // --- END DEVELOPMENT MODE BYPASS ---
    } else {
      // --- PRODUCTION MODE ENFORCEMENT ---
      console.log(`Redirecting to Login. Route "${to.path}" requires auth.`)
      next({ name: 'Login', query: { redirect: to.fullPath } }) // Redirect to Login
      // --- END PRODUCTION MODE ENFORCEMENT ---
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
    // First navigation, wait for Firebase auth state
    console.log('Auth not initialized. Waiting for onAuthStateChanged...')
    // Ensure we only attach the listener once
    if (!unsubscribeAuth) {
      unsubscribeAuth = onAuthStateChanged(
        auth,
        (user) => {
          console.log(
            'onAuthStateChanged fired. User:',
            user ? user.email : 'null'
          )
          isAuthInitialized = true
          // Don't unsubscribe here if you want auth state updates later,
          // but for a basic guard, unsubscribing after first check is fine.
          // if (unsubscribeAuth) unsubscribeAuth(); // Optional: unsubscribe after first check

          // Now that we have the user state, check auth requirements
          checkAuthAndNavigate(to, requiresAuth, user, next)
        },
        (error) => {
          // Handle potential errors during initial auth check
          console.error('Error getting initial auth state:', error)
          isAuthInitialized = true // Mark as initialized even on error
          // Decide how to handle this - maybe redirect to an error page or login?
          // For now, treat as unauthenticated:
          checkAuthAndNavigate(to, requiresAuth, null, next)
        }
      )
    }
    // Don't call next() here, wait for the onAuthStateChanged callback
  } else {
    // Auth state already initialized, check with current user
    const user = auth.currentUser
    console.log('Auth initialized. Current user:', user ? user.email : 'null')
    checkAuthAndNavigate(to, requiresAuth, user, next)
  }
})

// Optional: Clean up listener when app closes (though often not strictly necessary for SPAs)
// router.afterEach(() => {
//   if (unsubscribeAuth && /* condition to check if app is truly closing */) {
//      unsubscribeAuth();
//   }
// });

export default router
