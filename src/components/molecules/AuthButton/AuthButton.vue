<!-- src/components/molecules/AuthButton/AuthButton.vue -->
<template>
  <Button :variant="variant" @click="handleAuthAction">
    {{ isAuthenticated ? 'Logout' : 'Login' }}
  </Button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '@/components/atoms/BaseButton/BaseButton.vue'
import { useAuth } from '@/composables/useAuth'

const props = defineProps({
  variant: {
    type: String as () =>
      | 'primary'
      | 'secondary'
      | 'primaryOutlined'
      | undefined,
    default: 'primary',
  },
  isAuthenticated: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['login', 'logout'])
const { login, logout } = useAuth()
const router = useRouter() // Access the router

const handleAuthAction = async () => {
  try {
    if (props.isAuthenticated) {
      // If authenticated, logout
      await logout()
      emit('logout')
    } else {
      // Redirect to the login page first, then log in
      await router.push('/login') // Adjust the route path if necessary
      const email = 'user@example.com' // Replace with actual email input
      const password = 'password123' // Replace with actual password input
      await login(email, password)
      emit('login')
    }
  } catch (error) {
    console.error('Error during authentication action:', error)
  }
}
</script>
