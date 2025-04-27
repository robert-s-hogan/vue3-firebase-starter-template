// src/components/atoms/ToastIcon/ToastIcon.vue
<template>
  <button
    @click="$emit('close')"
    aria-label="Close notification"
    class="focus:outline-none"
    data-cy="toast-close"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4">
      <path fill="currentColor" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped></style>
