<template>
  <header class="bg-white p-4 flex justify-between items-center text-white">
    <div class="flex items-center space-x-4">
      <BaseLink to="/" class="text-lg font-bold"> Home </BaseLink>
      <BaseNavigation :is-authenticated="computedIsAuthenticated" />
    </div>
    <!-- Show Login Button if not authenticated -->
    <BaseButton
      v-if="!computedIsAuthenticated"
      variant="primary"
      @click="handleLogin"
    >
      Login
    </BaseButton>
    <!-- Show AuthButton component with logout option if authenticated -->
    <AuthButton
      v-else
      :is-authenticated="computedIsAuthenticated"
      @logout="handleLogout"
    />
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseButton from '@/components/atoms/BaseButton/BaseButton.vue'
import BaseNavigation from '@/components/Molecules/BaseNavigation/BaseNavigation.vue'
import AuthButton from '@/components/Molecules/AuthButton/AuthButton.vue'
import BaseLink from '@/components/atoms/BaseLink/BaseLink.vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = ref(false)

// Props to control authentication state externally (e.g., for testing)
const props = defineProps({
  isAuthenticatedOverride: {
    type: Boolean,
    default: null,
  },
})

// Computed property to decide which authentication state to use
const computedIsAuthenticated = computed(() => {
  return props.isAuthenticatedOverride !== null
    ? props.isAuthenticatedOverride
    : isAuthenticated.value
})

// Listen to auth state changes to update the isAuthenticated status
onAuthStateChanged(auth, (user) => {
  isAuthenticated.value = !!user
  if (!user) {
    // Redirect to /login if the user is not authenticated
    router.push('/login')
  }
})

const handleLogin = () => {
  router.push('/login')
}

const handleLogout = async () => {
  try {
    await signOut(auth)
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error.message)
  }
}
</script>
