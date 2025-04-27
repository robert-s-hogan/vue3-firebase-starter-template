<!-- src/views/login/LoginView.vue -->
<template>
  <BaseLoading v-if="loading" />

  <form v-else @submit.prevent="onSubmit" class="space-y-4">
    <FormField
      id="email"
      label="Email"
      v-model="email"
      :error="emailError"
      placeholder="you@example.com"
      @input="emailError = undefined"
    />
    <FormField
      id="password"
      label="Password"
      type="password"
      v-model="password"
      :error="passwordError"
      @input="passwordError = undefined"
    />

    <BaseButton
      type="submit"
      variant="primary"
      :loading="loading"
      class="w-full"
      data-cy="login-button"
    >
      Login
    </BaseButton>

    <BaseButton
      type="button"
      variant="secondaryOutlined"
      @click="onGoogleLogin"
      :loading="loading"
      class="w-full"
      data-cy="google-button"
    >
      Continue with Google
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import FormField from '@/components/molecules/FormField/FormField.vue'
import BaseButton from '@/components/atoms/BaseButton/BaseButton.vue'
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading.vue'

const { login, loginWithGoogle, loading } = useAuth()

const email = ref('')
const password = ref('')
const emailError = ref<string>()
const passwordError = ref<string>()

function validate() {
  let ok = true
  if (!email.value) {
    emailError.value = 'Email is required.'
    ok = false
  }
  if (!password.value) {
    passwordError.value = 'Password is required.'
    ok = false
  }
  return ok
}

async function onSubmit() {
  if (!validate()) return
  try {
    await login(email.value, password.value)
  } catch {
    // toast shown by composable
  }
}

async function onGoogleLogin() {
  try {
    await loginWithGoogle()
  } catch {
    // toast shown by composable
  }
}
</script>
