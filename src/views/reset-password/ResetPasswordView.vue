<template>
  <form @submit.prevent="onReset">
    <FormField
      id="email"
      label="Email"
      v-model="email"
      :error="emailError"
      placeholder="you@example.com"
      @input="emailError = undefined"
    />
    <BaseButton type="submit" variant="primary" :loading="loading">
      Send reset link
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormField from '@/components/molecules/FormField/FormField.vue'
import BaseButton from '@/components/atoms/BaseButton/BaseButton.vue'
import { usePasswordReset } from '@/composables/usePasswordReset'

const { reset, loading } = usePasswordReset()
const email = ref('')
const emailError = ref<string>()

function validate() {
  if (!email.value) {
    emailError.value = 'Email is required.'
    return false
  }
  return true
}

async function onReset() {
  if (!validate()) return
  try {
    await reset(email.value)
  } catch {
    // error toast already shown
  }
}
</script>
