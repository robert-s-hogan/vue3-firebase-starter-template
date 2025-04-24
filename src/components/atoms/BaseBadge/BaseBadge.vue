<template>
  <span
    data-cy="badge"
    class="inline-block px-2 py-1 text-xs font-medium rounded"
    :class="variantClasses[variant]"
  >
    {{ label }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Badge',
  props: {
    label: { type: String, required: true },
    variant: {
      type: String as () => 'default' | 'success' | 'error',
      default: 'default',
    },
  },
  setup() {
    const variantClasses = {
      default: 'bg-muted text-text-primary',
      success: 'bg-success-light text-success-dark',
      error: 'bg-error-light text-error-dark',
    }
    return { variantClasses }
  },
})
</script>
