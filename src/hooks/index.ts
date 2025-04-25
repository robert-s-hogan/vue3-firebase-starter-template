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

export const useAuth = () => {
  const router = useRouter()

  const login = async (email: string, password: string) => {
    try {
      await loginService(auth, email, password)
      router.push({ name: 'Dashboard' }) // redirect after login
    } catch (err: unknown) {
      const e = err as FirebaseError
      throw new Error(e.message) // bubble up
    }
  }

  const loginWithGoogle = async () => {
    try {
      await googleService(auth)
      router.push({ name: 'Dashboard' })
    } catch (err: unknown) {
      const e = err as FirebaseError
      throw new Error(e.message)
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
      const e = err as FirebaseError
      throw new Error(e.message)
    }
  }

  return { login, loginWithGoogle, register, logout }
}
