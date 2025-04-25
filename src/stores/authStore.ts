// src/stores/authStore.ts
import { defineStore } from 'pinia'
import { auth } from '@/firebase/firebaseConfig'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const initialized = ref(false)
  onAuthStateChanged(auth, (u) => {
    user.value = u
    initialized.value = true
  })
  const isAuthenticated = computed(() => !!user.value)
  return { user, isAuthenticated, initialized }
})
