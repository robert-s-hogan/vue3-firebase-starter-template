// src/components/atoms/BaseButton/BaseButton.vue (Example)
<script setup>
import { computed } from 'vue'
import { twMerge } from 'tailwind-merge' // Import twMerge
import { clsx } from 'clsx' // Import clsx

const emit = defineEmits(['click'])

const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // primary, secondary, primaryOutlined, etc.
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  // Allow passing extra classes
  class: {
    type: [String, Array, Object],
    default: '',
  },
})

const baseClasses =
  'inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-fast ease-in-out'

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary'
    case 'primaryOutlined':
      return 'border border-primary text-primary bg-white hover:bg-gray-50 focus:ring-primary'
    // Add other variants...
    case 'primary':
    default:
      return 'bg-primary text-white hover:bg-primary-hover focus:ring-primary'
  }
})

// Combine classes using twMerge and clsx
const computedClasses = computed(() =>
  twMerge(
    clsx(
      baseClasses,
      variantClasses.value,
      {
        'opacity-70 cursor-wait': props.loading, // Conditional class for loading
        'opacity-50 cursor-not-allowed': props.disabled && !props.loading, // Conditional for disabled
      },
      props.class // Merge in any passed classes
    )
  )
)

const handleClick = (event) => {
  if (!props.loading && !props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :class="computedClasses"
    :disabled="disabled || loading"
    data-cy="button"
    @click="handleClick"
  >
    <span v-if="!loading" class="flex items-center">
      <slot />
    </span>
    <!-- Simple SVG Spinner Example -->
    <svg
      v-if="loading"
      class="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </button>
</template>
