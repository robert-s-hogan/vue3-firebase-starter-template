// src/hooks/useAuth.ts
import { useRouter } from 'vue-router'
import { auth } from '@/firebase/firebaseConfig'
import {
  login as loginService,
  loginWithGoogle as googleService,
  register as registerService,
  logout as logoutService,
} from '@/services/authServices'
import type { FirebaseError } from 'firebase/app'
import { addToast } from '@/composables/useToast'

const firebaseMessages: Record<string, string> = {
  'auth/email-already-in-use': 'This email is already registered.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/user-not-found': 'No account found with that email.',
  // …etc
}

export const useAuth = () => {
  const router = useRouter()

  const login = async (email: string, password: string) => {
    try {
      await loginService(auth, email, password)
      router.push({ name: 'Dashboard' }) // redirect after login
    } catch (err: unknown) {
      const msg =
        firebaseMessages[(err as FirebaseError).code] ?? 'Something went wrong'
      addToast(msg, 'error')
      throw err
    }
  }

  const loginWithGoogle = async () => {
    try {
      await googleService(auth)
      router.push({ name: 'Dashboard' })
    } catch (err: unknown) {
      const msg =
        firebaseMessages[(err as FirebaseError).code] ?? 'Something went wrong'
      addToast(msg, 'error')
      throw err
    }
  }

  const register = async (email: string, password: string) => {
    await registerService(auth, email, password)
    router.push({ name: 'Dashboard' })
  }

  const logout = async () => {
    try {
      await logoutService(auth)
      router.push({ name: 'Home' })
    } catch (err: unknown) {
      const msg =
        firebaseMessages[(err as FirebaseError).code] ?? 'Something went wrong'
      addToast(msg, 'error')
      throw err
    }
  }

  return { login, loginWithGoogle, register, logout }
}
