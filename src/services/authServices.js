// src/services/authServices.js

import {
  createUserWithEmailAndPassword as firebaseCreateUser,
  signInWithEmailAndPassword as defaultSignInWithEmailAndPassword,
  signOut as defaultSignOut,
  GoogleAuthProvider,
  signInWithPopup as defaultSignInWithPopup,
} from 'firebase/auth'

export const login = async (
  auth,
  email,
  password,
  signInFn = defaultSignInWithEmailAndPassword
) => {
  try {
    const userCredential = await signInFn(auth, email, password)
    return userCredential.user
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error during login:', error.message)
      throw new Error(error.message)
    }
    throw new Error('An unknown error occurred during login.')
  }
}

export const logout = async (auth, signOutFn = defaultSignOut) => {
  try {
    await signOutFn(auth)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error during logout:', error.message)
      throw new Error(error.message)
    }
    throw new Error('An unknown error occurred during logout.')
  }
}

export const register = async (auth, email, password) => {
  // --- Add/Confirm Debugging ---
  console.log(
    '%c[AuthService Register] Received auth object:',
    'color: #ff00ff;',
    auth
  )
  console.log(
    '%c[AuthService Register] Type of auth object:',
    'color: #ff00ff;',
    typeof auth
  )
  console.log(
    '%c[AuthService Register] Does auth?.createUserWithEmailAndPassword exist?',
    'color: #ff00ff;',
    typeof auth?.createUserWithEmailAndPassword === 'function'
  )
  // Also check against the directly imported function
  console.log(
    '%c[AuthService Register] Does firebaseCreateUser exist?',
    'color: #ff00ff;',
    typeof firebaseCreateUser === 'function'
  )
  // --- End Debugging ---

  try {
    // Use the function directly from the auth object.
    // The check below will throw if the method isn't there.
    if (typeof auth?.createUserWithEmailAndPassword !== 'function') {
      console.error(
        '[AuthService Register] FATAL: auth.createUserWithEmailAndPassword is NOT a function on the received object!',
        auth
      )
      throw new Error(
        'Internal Error: createUserWithEmailAndPassword method not found on auth object.'
      )
    }

    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    )
    console.log(
      '%c[AuthService Register] Registration successful:',
      'color: green;',
      userCredential.user.email
    )
    return userCredential // Return the whole credential object
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.error(
        '[AuthService Register] Registration Error (Email exists):',
        error.message
      )
      throw new Error(
        'This email is already registered. Please use another email or login.'
      )
    } else {
      console.error(
        '[AuthService Register] Unexpected Registration Error:',
        error
      )
      throw new Error(
        error.message || 'Registration failed due to an unexpected error.'
      )
    }
  }
}

export const loginWithGoogle = async (
  auth,
  signInWithPopupFn = defaultSignInWithPopup
) => {
  try {
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopupFn(auth, provider)
    return userCredential.user
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error during Google login:', error.message)
      throw new Error(error.message)
    }
    throw new Error('An unknown error occurred during Google login.')
  }
}
