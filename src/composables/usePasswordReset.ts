import { ref } from 'vue'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'
import { addToast } from './useToast'
import type { FirebaseError } from 'firebase/app'

const firebaseMessages: Record<string, string> = {
  'auth/email-already-in-use': 'This email is already registered.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/user-not-found': 'No account found with that email.',
  // …etc
}

export function usePasswordReset() {
  const loading = ref(false)

  async function reset(email: string) {
    loading.value = true
    try {
      await sendPasswordResetEmail(auth, email)
      addToast('Check your inbox for reset instructions.', 'success')
    } catch (err: unknown) {
      const msg =
        firebaseMessages[(err as FirebaseError).code] ?? 'Something went wrong'
      addToast(msg, 'error')
      throw err
    } finally {
      loading.value = false
    }
  }

  return { reset, loading }
}
