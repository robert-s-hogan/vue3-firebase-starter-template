<template>
  <header class="bg-white p-4 flex justify-between items-center text-white">
    <div class="flex items-center space-x-4">
      <BaseLink to="/" class="text-lg font-bold"> Home </BaseLink>
      <BaseNavigation :isAuthenticated="isAuthenticated" />
    </div>
    <!-- Show Login Button if not authenticated -->
    <BaseButton variant="primary" @click="handleLogin" v-if="!isAuthenticated">
      Login
    </BaseButton>
    <!-- Show AuthButton component with logout option if authenticated -->
    <AuthButton
      :isAuthenticated="isAuthenticated"
      @logout="handleLogout"
      v-else
    />
  </header>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/atoms/BaseButton/BaseButton.vue'
import BaseNavigation from '@/components/molecules/BaseNavigation/BaseNavigation.vue'
import AuthButton from '@/components/molecules/AuthButton/AuthButton.vue'
import BaseLink from '@/components/atoms/BaseLink/BaseLink.vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = ref(false)

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
    console.log('User logged out successfully')
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error.message)
  }
}
</script>
