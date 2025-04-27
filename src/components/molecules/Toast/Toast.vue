// src/components/molecules/Toast/Toast.vue
<template>
  <div
    role="alert"
    :class="[
      'p-4 rounded flex items-start space-x-3 shadow-md',
      bgClass,
      textClass,
    ]"
    data-cy="toast"
  >
    <ToastMessage>
      <slot />
    </ToastMessage>
    <ToastIcon @close="handleClose" />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import ToastIcon from '@/components/atoms/ToastIcon/ToastIcon.vue'
import ToastMessage from '@/components/atoms/ToastMessage/ToastMessage.vue'

type Variant = 'success' | 'error' | 'info' | 'warning'
const props = defineProps<{ variant?: Variant }>()
const emit = defineEmits<{
  (e: 'close'): void
}>()
const bgClass = computed(() => `bg-${props.variant ?? 'info'}-light`)
const textClass = computed(() => 'text-inverted')
function handleClose() {
  emit('close')
}
</script>
<style scoped></style>
