// src/router/index.ts
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
  // type NavigationGuardNext,
  // type RouteLocationNormalized,
} from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'
import LoginView from '@/views/login/LoginView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import AuthLayout from '@/layouts/auth/AuthLayout.vue'
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'
import { useAuthStore } from '@/stores/authStore'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Home', component: HomeView },
      { path: 'login', name: 'Login', component: LoginView },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/register/RegisterView.vue'),
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
      { path: '', name: 'Dashboard', component: DashboardView },
      // Future protected routes can go here
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// --- Navigation Guard ---
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some((record) => record.meta?.requiresAuth)

  if (!authStore.initialized) {
    // Wait for auth to initialize before proceeding
    const unwatch = authStore.$subscribe(() => {
      if (authStore.initialized) {
        unwatch()
        proceed()
      }
    })
  } else {
    proceed()
  }

  function proceed() {
    if (requiresAuth && !authStore.isAuthenticated) {
      console.log('[AuthGuard] No authenticated user. Redirecting to Login...')
      next({ name: 'Login', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  }
})

export default router
