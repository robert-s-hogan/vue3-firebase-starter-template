<!-- src/components/organisms/LoginForm.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <FormField
      id="email"
      label="Email"
      type="email"
      v-model="email"
      placeholder="Enter your email"
    />
    <FormField
      id="password"
      label="Password"
      type="password"
      v-model="password"
      placeholder="Enter your password"
    />
    <BaseButton type="submit" variant="primary" :disabled="loading">
      {{ loading ? 'Logging in...' : 'Login' }}
    </BaseButton>
    <BaseAlert v-if="error" variant="danger" class="mt-4">
      {{ error }}
    </BaseAlert>
  </form>
</template>

<script>
import { ref } from 'vue'
import FormField from '@/components/molecules/FormField/FormField.vue'
import BaseButton from '@/components/atoms/BaseButton/BaseButton.vue'
import BaseAlert from '@/components/atoms/BaseAlert/BaseAlert.vue'
import { auth } from '@/firebase/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default {
  name: 'LoginForm',
  components: { FormField, BaseButton, BaseAlert },
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref('')
    const loading = ref(false)

    const handleSubmit = async () => {
      error.value = ''
      loading.value = true
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value)
        // Redirect handled by router guard
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      error,
      loading,
      handleSubmit,
    }
  },
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
