// src/firebase/firebaseConfig.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  // You can still alias this if you need it for debugging:
} from 'firebase/auth'

// Use Vite's import.meta.env for environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
const auth = getAuth(app)
const db = getFirestore(app)

// Optional: set persistence
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log('[FirebaseConfig] Persistence set')
  })
  .catch(console.error)

// Export exactly one auth instance
export { auth, db }
