<template>
  <div class="flex items-center justify-center min-h-screen bg-muted">
    <div class="w-full max-w-xs">
      <h1 class="text-2xl font-bold text-center text-primary mb-6">
        Reset Password
      </h1>
      <form
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        @submit.prevent="handlePasswordReset"
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
        <div class="flex items-center justify-between">
          <Button variant="primary" type="submit" class="w-full">
            Send Reset Link
          </Button>
        </div>
      </form>

      <!-- Message Section -->
      <div v-if="message" class="mt-4 text-center text-success">
        {{ message }}
      </div>
      <div v-if="error" class="mt-4 text-center text-error">
        {{ error }}
      </div>

      <div class="text-center mt-4">
        <router-link to="/login" class="text-primary hover:underline">
          Back to Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { auth } from '@/firebase/firebaseConfig'
import { sendPasswordResetEmail } from 'firebase/auth'
import Button from '@/components/atoms/BaseButton/BaseButton.vue'

const email = ref('')
const message = ref('')
const error = ref('')

// Function to handle password reset
const handlePasswordReset = async () => {
  message.value = '' // Clear any previous messages
  error.value = '' // Clear any previous errors

  try {
    await sendPasswordResetEmail(auth, email.value)
    message.value = 'Password reset link sent! Please check your email.'
  } catch (err) {
    console.error('Error sending password reset email:', err.message)
    error.value = 'Failed to send password reset email. Please try again.'
  }
}
</script>
