// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  // Import the function directly for logging comparison
  createUserWithEmailAndPassword as firebaseCreateUserDirectly,
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
console.log(
  '[FirebaseConfig] Initializing Firebase App with Project ID:',
  firebaseConfig.projectId
)
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
console.log('[FirebaseConfig] Getting Auth instance...')
const auth = getAuth(app)
const db = getFirestore(app)

// --- Add Debugging Logs Here ---
console.log(
  '%c[FirebaseConfig] Created Auth Instance:',
  'color: orange; font-weight: bold;',
  auth
)
console.log(
  '%c[FirebaseConfig] Type of created auth:',
  'color: orange;',
  typeof auth
)
console.log(
  '%c[FirebaseConfig] Does auth.createUserWithEmailAndPassword exist *immediately* after getAuth?',
  'color: orange;',
  typeof typeof firebaseCreateUserDirectly === 'function'
)
console.log(
  '%c[FirebaseConfig] Does directly imported firebaseCreateUserDirectly exist?',
  'color: orange;',
  typeof firebaseCreateUserDirectly === 'function'
)
// --- End Debugging Logs ---

// Set persistence for the auth
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log(
      '[FirebaseConfig] Auth persistence set to browserSessionPersistence.'
    )
  })
  .catch((error) => {
    console.error('[FirebaseConfig] Error setting auth persistence:', error)
  })

// Environment Logging (Moved from main.js for proximity)
console.log(
  `%c[APP MODE] Running in: ${import.meta.env.MODE}`,
  'color: blue; font-weight: bold;'
)
if (import.meta.env.DEV) {
  console.warn(
    '[APP MODE] Development-specific features/bypasses might be active.'
  )
}

export { auth, db }
