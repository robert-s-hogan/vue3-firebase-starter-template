<!-- src/views/login/LoginView.vue -->
<template>
  <div class="flex items-center justify-center min-h-screen bg-muted">
    <div class="w-full max-w-xs">
      <form
        @submit.prevent="handleSubmit"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <label for="email" class="block text-primary text-sm font-bold mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
            autocomplete="username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div class="mb-6">
          <label
            for="password"
            class="block text-primary text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            autocomplete="current-password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-primary mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
      </form>

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
import { useAuth } from '@/composables/useAuth'
import Button from '@/components/atoms/BaseButton/BaseButton.vue'

const router = useRouter()
const { login, loginWithGoogle } = useAuth()

const email = ref('')
const password = ref('')
const loginError = ref<string | null>(null)
const isLoading = ref(false)

const handleSubmit = async () => {
  loginError.value = null
  isLoading.value = true
  try {
    await login(email.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    loginError.value =
      err instanceof Error ? err.message : 'An unknown error occurred'
  } finally {
    isLoading.value = false
  }
}

const handleGoogleLogin = async () => {
  loginError.value = null
  isLoading.value = true
  try {
    await loginWithGoogle()
    router.push('/dashboard')
  } catch (err) {
    loginError.value =
      err instanceof Error ? err.message : 'An unknown error occurred'
  } finally {
    isLoading.value = false
  }
}
</script>
