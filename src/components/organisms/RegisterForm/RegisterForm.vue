<template>
  <AuthContainer title="Register">
    <template #form>
      <form @submit.prevent="onSubmit" class="space-y-4">
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
          variant="primary"
          type="submit"
          :loading="loading"
          class="w-full"
        >
          Register
        </BaseButton>
      </form>

      <BaseButton
        variant="secondary"
        class="w-full mt-4"
        @click="onGoogleRegister"
        :loading="loading"
      >
        Register with Google
      </BaseButton>
    </template>
  </AuthContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import FormField from '@/components/molecules/FormField/FormField.vue'
import BaseButton from '@/components/atoms/BaseButton/BaseButton.vue'
import AuthContainer from '@/components/organisms/AuthContainer/AuthContainer.vue'

const { register, loginWithGoogle, loading } = useAuth()
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
    await register(email.value, password.value)
  } catch {
    // toast shown by composable
  }
}

async function onGoogleRegister() {
  if (!validate()) return
  try {
    await loginWithGoogle()
  } catch {
    // toast shown by composable
  }
}
</script>
