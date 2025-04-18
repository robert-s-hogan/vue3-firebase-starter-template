// src/router/index.ts
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router'
import type { User } from 'firebase/auth'
import HomeView from '@/views/Home/HomeView.vue'
import Login from '@/views/Login/LoginView.vue'
import Dashboard from '@/views/Dashboard/DashboardView.vue'
import AuthLayout from '@/layouts/auth/AuthLayout.vue'
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'
import { auth } from '@/firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

const routes: RouteRecordRaw[] = [
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

// 👇 Explicitly typed cleanup function
let unsubscribeAuth: (() => void) | null = null
let isAuthInitialized = false

// --- Helper function to check auth and decide navigation ---
function checkAuthAndNavigate(
  to: RouteLocationNormalized,
  requiresAuth: boolean,
  user: User | null,
  next: NavigationGuardNext
) {
  const isDevelopment = import.meta.env.DEV

  if (requiresAuth && !user) {
    if (isDevelopment) {
      console.warn(
        `%c[AuthGuard] DEV MODE: Bypassing auth check for "${to.path}".`,
        'color: orange;'
      )
      next()
    } else {
      console.log(
        `[AuthGuard] Redirecting to Login. Route "${to.path}" requires auth.`
      )
      next({ name: 'Login', query: { redirect: to.fullPath } })
    }
  } else {
    next()
  }
}

// --- Navigation Guard ---
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta?.requiresAuth)

  if (!isAuthInitialized) {
    if (!unsubscribeAuth) {
      unsubscribeAuth = onAuthStateChanged(
        auth,
        (user) => {
          isAuthInitialized = true
          console.log(
            `%c[AuthGuard] Initial state determined. User: ${
              user ? user.email : 'Not Logged In'
            }`,
            user ? 'color: green;' : 'color: red;'
          )
          checkAuthAndNavigate(to, requiresAuth, user, next)
        },
        (error) => {
          console.error('[AuthGuard] Error getting initial auth state:', error)
          isAuthInitialized = true
          console.log(
            `%c[AuthGuard] Initial state determined (error). User: Not Logged In`,
            'color: red;'
          )
          checkAuthAndNavigate(to, requiresAuth, null, next)
        }
      )
    }
    // Wait for onAuthStateChanged to call next()
  } else {
    const user = auth.currentUser
    console.log(
      `%c[AuthGuard] Navigating. Current User: ${
        user ? user.email : 'Not Logged In'
      }`,
      user ? 'color: green;' : 'color: red;'
    )
    checkAuthAndNavigate(to, requiresAuth, user, next)
  }
})

export default router
