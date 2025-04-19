<template>
  <div class="flex items-center justify-center min-h-screen bg-muted">
    <div class="w-full max-w-xs">
      <h1 class="text-2xl font-bold text-center text-primary mb-6">Register</h1>
      <form
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        @submit.prevent="handleRegister"
      >
        <div class="mb-4">
          <label class="block text-primary text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-primary text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-primary mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="flex items-center justify-between">
          <BaseButton variant="primary" type="submit" class="w-full">
            Register
          </BaseButton>
        </div>
      </form>

      <!-- Google Register BaseButton -->
      <div class="text-center mt-4">
        <BaseButton
          variant="secondary"
          class="w-full"
          @click="handleGoogleRegister"
        >
          Register with Google
        </BaseButton>
      </div>

      <div class="text-center mt-4">
        <BaseButton
          variant="primaryOutlined"
          class="w-full"
          @click="$router.push('/login')"
        >
          Back to Login
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/firebase/firebaseConfig'
import { register, loginWithGoogle } from '@/services/authServices'
import BaseButton from '@/components/atoms/BaseButton/BaseButton.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

// Function to handle registration
const handleRegister = async () => {
  error.value = '' // Clear previous errors

  try {
    await register(auth, email.value, password.value)
    router.push('/dashboard') // Redirect to dashboard on successful registration
  } catch (err) {
    error.value = err.message // Update UI with specific error message
  }
}

// Function to handle Google registration
const handleGoogleRegister = async () => {
  error.value = '' // Clear previous errors

  try {
    const user = await loginWithGoogle(auth)
    console.log('User registered with Google:', user)
    router.push('/dashboard') // Redirect to dashboard on successful registration
  } catch (err) {
    error.value = err.message // Update UI with specific error message
  }
}
</script>
