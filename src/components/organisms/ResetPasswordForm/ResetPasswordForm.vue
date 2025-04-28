<template>
  <AuthContainer title="Reset Password">
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
        <BaseButton
          variant="primary"
          type="submit"
          :loading="loading"
          class="w-full"
        >
          Send reset link
        </BaseButton>
      </form>
    </template>
  </AuthContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormField from '@/components/molecules/FormField/FormField.vue'
import BaseButton from '@/components/atoms/BaseButton/BaseButton.vue'
import { usePasswordReset } from '@/composables/usePasswordReset'
import AuthContainer from '@/components/organisms/AuthContainer/AuthContainer.vue'

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

async function onSubmit() {
  if (!validate()) return
  try {
    await reset(email.value)
  } catch {
    // toast shown by composable
  }
}
</script>
