// src/services/authServices.ts
import type { Auth, UserCredential } from 'firebase/auth'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import type { FirebaseError } from 'firebase/app'

/* ------------------------------------------------------------------ */
/*  login                                                             */
/* ------------------------------------------------------------------ */
export const login = async (
  auth: Auth,
  email: string,
  password: string,
  signInFn: typeof signInWithEmailAndPassword = signInWithEmailAndPassword
): Promise<UserCredential> => {
  return await signInFn(auth, email, password)
}

/* ------------------------------------------------------------------ */
/*  logout                                                            */
/* ------------------------------------------------------------------ */
export const logout = async (
  auth: Auth,
  signOutFn: typeof signOut = signOut
): Promise<void> => {
  await signOutFn(auth)
}

/* ------------------------------------------------------------------ */
/*  register                                                          */
/* ------------------------------------------------------------------ */
export const register = async (
  auth: Auth,
  email: string,
  password: string,
  createUserFn: typeof createUserWithEmailAndPassword = createUserWithEmailAndPassword
): Promise<UserCredential> => {
  try {
    return await createUserFn(auth, email, password)
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err) {
      const firebaseError = err as FirebaseError
      if (firebaseError.code === 'auth/email-already-in-use') {
        throw new Error('This email is already registered.')
      }
      throw new Error(firebaseError.message)
    }
    throw new Error('Registration failed due to an unexpected error.')
  }
}
