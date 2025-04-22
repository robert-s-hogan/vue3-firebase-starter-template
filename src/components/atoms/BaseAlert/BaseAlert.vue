<!-- ./src/components/atoms/BaseAlert/BaseAlert.vue -->
<template>
  <div :class="computedClass" role="alert">
    <slot />
  </div>
</template>

<!-- Script setup for props and computed properties -->
<script setup lang="ts">
import { computed } from 'vue'

// Define props using defineProps macro
// This handles both runtime validation and provides type information
const props = defineProps<{
  variant?: 'info' | 'success' | 'warning' | 'danger' // Define the union type for variant
}>()

// Set default value using withDefaults if you want reactive default access,
// otherwise, the runtime default is handled by defineProps,
// but accessing props.variant might be undefined initially.
// A simpler way is to handle the default logic in the computed property itself
// or rely solely on the runtime prop definition default.
// Let's refine the computed property to handle the default 'info' if props.variant is undefined.

// Define the computed property
const computedClass = computed(() => {
  // Get the variant, defaulting to 'info' if prop is undefined or null
  const currentVariant = props.variant || 'info' // Use || 'info' for default logic

  return [
    'p-4 rounded mb-4', // Base classes always applied
    {
      // Conditional classes based on variant
      'bg-info-light text-info-dark': currentVariant === 'info',
      // FIX: Corrected the success variant class typo
      'bg-success-light text-success-dark': currentVariant === 'success',
      'bg-warning-light text-warning-dark': currentVariant === 'warning',
      'bg-error-light text-error-dark': currentVariant === 'danger', // Assumes 'error' is used for 'danger'
    },
  ]
})

// The computedClass variable defined in setup is automatically exposed to the template.
// No need to return it from a separate export default.
</script>

<!-- Separate script block for component options like 'name' -->
<!-- Note: This block does NOT have 'setup' -->
<script lang="ts">
export default {
  name: 'BaseAlert',
  // Note: Props, computed, methods, etc. defined in setup are NOT in 'this' here.
  // Only use this block for options like 'name', 'inheritAttrs', custom options, etc.
}
</script>
