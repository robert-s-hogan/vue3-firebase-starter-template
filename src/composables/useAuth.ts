import { auth } from '@/firebase/firebaseConfig'
import {
  login as loginService,
  logout as logoutService,
  register as registerService,
  // loginWithGoogle is not directly used from authServices here,
  // as the original useAuth.js called the Firebase SDK directly for it.
} from '@/services/authServices'
import type { Auth, User, UserCredential } from 'firebase/auth'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth' // Import necessary functions/providers for Google Login
import type { FirebaseError } from 'firebase/app'

// Define the shape of the user data returned by login functions
interface AuthUser {
  userName: string | null
  email: string | null
}

export const useAuth = () => {
  // General login function for email/password
  const login = async (email: string, password: string): Promise<AuthUser> => {
    try {
      // loginService is typed to return UserCredential in authServices.ts [cite: 56, 57]
      const userCredential: UserCredential = await loginService(
        auth,
        email,
        password
      )
      const user: User = userCredential.user
      console.log('User logged in:', {
        userName: user.displayName,
        email: user.email,
      })
      // Return the defined AuthUser shape
      return { userName: user.displayName, email: user.email }
    } catch (error: unknown) {
      // Use type assertion for better error handling
      const firebaseError = error as FirebaseError
      console.error('Login failed:', firebaseError.message)
      throw firebaseError // Re-throw the original typed error
    }
  }

  // Specific login function using signInWithPopup for Google
  const loginWithGoogle = async (): Promise<AuthUser> => {
    const provider = new GoogleAuthProvider() // Standard way to instantiate Google Provider
    try {
      // Use the actual signInWithPopup function from Firebase Auth SDK
      const userCredential: UserCredential = await signInWithPopup(
        auth,
        provider
      )
      const user: User = userCredential.user
      console.log('User logged in with Google:', {
        userName: user.displayName,
        email: user.email,
      })
      // Return the defined AuthUser shape
      return { userName: user.displayName, email: user.email }
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError
      console.error('Google login failed:', firebaseError.message)
      throw firebaseError // Re-throw the original typed error
    }
  }

  // Register function
  const register = async (email: string, password: string): Promise<User> => {
    try {
      // registerService is typed to return UserCredential in authServices.ts [cite: 58, 59]
      const userCredential: UserCredential = await registerService(
        auth,
        email,
        password
      )
      console.log('User registered:', userCredential.user.email)
      return userCredential.user // Return the User object as before
    } catch (error: unknown) {
      // Error handling logic from authServices.ts already provides a useful message [cite: 60]
      // Log the message here, but re-throw the original error for consistency
      console.error('Registration failed:', (error as Error).message)
      throw error
    }
  }

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      // logoutService is typed in authServices.ts [cite: 57]
      await logoutService(auth)
      console.log('User logged out')
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError
      console.error('Logout failed:', firebaseError.message)
      throw firebaseError // Re-throw the original typed error
    }
  }

  // Return the typed functions
  return { login, loginWithGoogle, register, logout }
}
