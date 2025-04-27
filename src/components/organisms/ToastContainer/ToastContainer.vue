<!-- ToastContainer.vue -->
<template>
  <div
    role="alert"
    aria-live="assertive"
    class="fixed top-4 right-4 flex flex-col space-y-2 z-50"
  >
    <Toast
      v-for="t in toasts"
      :key="t.id"
      :variant="t.variant"
      @close="removeToast(t.id)"
    >
      {{ t.message }}
    </Toast>
  </div>
</template>

<script setup lang="ts">
import Toast from '@/components/molecules/Toast/Toast.vue'
import { useToast } from '@/composables/useToast'

const { toasts, removeToast } = useToast()
</script>
