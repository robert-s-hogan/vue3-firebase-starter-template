<!-- src/components/atoms/BaseInput.vue -->
<template>
  <input
    :type="props.type"
    :placeholder="props.placeholder"
    :value="props.modelValue"
    :class="computedClass"
    :disabled="props.disabled"
    @input="
      $emit(
        'update:modelValue',
        ($event.target as HTMLInputElement)?.value || '',
      )
    "
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Assign the result of defineProps to a variable 'props'
const props = defineProps({
  modelValue: [String, Number],
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  disabled: Boolean, // Note: With object syntax, boolean props without 'default' are false by default if omitted
})

// Now, access props using the 'props' variable
const computedClass = computed(() => {
  return [
    'border rounded px-3 py-2 w-full focus:outline-none focus:ring',
    {
      'border-border focus:ring-primary-light': props.type !== 'password', // Use props.type
      'border-error-light focus:ring-error-light': props.type === 'password', // Use props.type
    },
    { 'opacity-50 cursor-not-allowed': props.disabled }, // Use props.disabled
  ]
})

// $emit is automatically available in <script setup>
// You can optionally define emits using defineEmits for type safety:
// const emit = defineEmits(['update:modelValue'])
// and then use emit('update:modelValue', ...) instead of $emit
</script>

<!-- Optional: Add a script block for the component name -->
<script lang="ts">
export default {
  name: 'BaseInput',
}
</script>
