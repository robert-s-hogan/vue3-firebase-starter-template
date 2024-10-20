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
      {
        path: '',
        name: 'Home',
        component: HomeView,
      },
      {
        path: 'login',
        name: 'Login',
        component: Login,
      },
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
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
      },
    ],
  },
  // Optional: Catch-all route for 404 Not Found
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Flag to ensure onAuthStateChanged is only set once
let isAuthInitialized = false

// Navigation Guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (!isAuthInitialized) {
    // Pause the navigation by returning a Promise
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        isAuthInitialized = true
        unsubscribe() // Stop listening after the first event

        if (requiresAuth && !user) {
          // Redirect to Login page if not authenticated
          next({ name: 'Login', query: { redirect: to.fullPath } })
        } else {
          next()
        }

        resolve()
      })
    })
  } else {
    const user = auth.currentUser
    if (requiresAuth && !user) {
      next({ name: 'Login', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  }
})

export default router
