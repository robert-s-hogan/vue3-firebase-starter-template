<!-- src/views/Login/LoginView.vue -->
<template>
  <div class="flex items-center justify-center min-h-screen bg-muted">
    <div class="w-full max-w-xs">
      <!-- <h1 class="text-2xl font-bold text-center text-primary mb-6">Login</h1> -->
      <!-- ***** 
      <form
        @submit.prevent="handleSubmit"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        CHANGE USERNAME TO EMAIL 
        <div class="mb-4">
          <label class="block text-primary text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            v-model="email"
            required
            autocomplete="username"
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
            class="shadow appearance-none border rounded w-full py-2 px-3 text-primary mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            v-model="password"
            required
            autocomplete="current-password"
          />
          
          <p v-if="loginError" class="text-error text-xs italic mt-2">
            {{ loginError }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <Button
            variant="primary"
            type="submit"
            class="w-full"
            :loading="isLoading"
          >
            Login
          </Button>
        </div>

        <div class="text-center mt-4">
          <router-link
            to="/reset-password"
            class="text-primary hover:underline"
          >
            Forgot Password?
          </router-link>
        </div>

        <div class="text-center mt-2">
          
          <router-link to="/register" class="text-primary hover:underline">
            Don't have an account? Register
          </router-link>
        </div>
      </form> ***** -->

      <div class="text-center mt-4">
        <Button
          variant="secondary"
          class="w-full"
          :loading="isLoading"
          @click="handleGoogleLogin"
        >
          Login with Google
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/firebase/firebaseConfig'
import { loginWithGoogle } from '@/services/authServices'
import Button from '@/components/atoms/BaseButton/BaseButton.vue' // Corrected path casing

const router = useRouter()

const loginError = ref<string | null>(null) // <-- Add state for displaying errors
const isLoading = ref(false) // <-- Add loading state

const handleGoogleLogin = async () => {
  loginError.value = null // Clear previous errors
  isLoading.value = true
  try {
    await loginWithGoogle(auth)
    router.push('/dashboard')
  } catch (error) {
    if (error instanceof Error) {
      loginError.value = error.message // Update UI with specific error message
    } else {
      loginError.value = 'An unknown error occurred' // Fallback for non-Error instances
    }
  } finally {
    isLoading.value = false
  }
}
</script>
