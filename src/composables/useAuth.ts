// src/composables/useAuth.ts
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/firebase/firebaseConfig'
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  loginWithGoogle as googleService,
} from '@/services/authServices'
import type { FirebaseError } from 'firebase/app'
import { addToast } from './useToast'

const firebaseMessages: Record<string, string> = {
  'auth/email-already-in-use': 'This email is already registered.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/user-not-found': 'No account found with that email.',
  // …etc
}

export function useAuth() {
  const router = useRouter()
  const loading = ref(false)

  async function login(email: string, password: string) {
    loading.value = true
    try {
      await loginService(auth, email, password)
      addToast('Welcome back!', 'success')
      return router.push({ name: 'Dashboard' })
    } catch (err: unknown) {
      const msg =
        firebaseMessages[(err as FirebaseError).code] ?? 'Something went wrong'
      addToast(msg, 'error')
      throw err
    } finally {
      loading.value = false
    }
  }

  async function loginWithGoogle() {
    loading.value = true
    try {
      const user = await googleService(auth)
      addToast(`Welcome, ${user.email}!`, 'success')
      return router.push({ name: 'Dashboard' })
    } catch (err: unknown) {
      const e = err as FirebaseError
      addToast(e.message || 'Google login failed.', 'error')
      throw e
    } finally {
      loading.value = false
    }
  }

  async function register(email: string, password: string) {
    loading.value = true
    try {
      await registerService(auth, email, password)
      addToast('Registration successful!', 'success')
      return router.push({ name: 'Dashboard' })
    } catch (err: unknown) {
      const msg =
        firebaseMessages[(err as FirebaseError).code] ?? 'Something went wrong'
      addToast(msg, 'error')
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true
    try {
      await logoutService(auth)
      addToast('You have been logged out.', 'info')
      return router.push({ name: 'Home' })
    } catch (err: unknown) {
      const msg =
        firebaseMessages[(err as FirebaseError).code] ?? 'Something went wrong'
      addToast(msg, 'error')
      throw err
    } finally {
      loading.value = false
    }
  }

  return { login, loginWithGoogle, register, logout, loading }
}
