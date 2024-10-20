<!-- src/components/atoms/BaseButton.vue -->
<template>
  <button
    :class="buttonClasses"
    @click="handleClick"
    :type="type"
    :disabled="loading || disabled"
    data-cy="button"
  >
    <div class="flex items-center justify-center space-x-2">
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
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span v-if="!loading"><slot /></span>
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (!props.loading && !props.disabled) {
    emit('click', event) // Emit click event only if not loading or disabled
  }
}

const buttonClasses = computed(() => {
  const baseClasses =
    'px-4 py-2 rounded focus:outline-none focus:ring flex items-center justify-center transition duration-300 ease-in-out'

  const variantClasses = (() => {
    switch (props.variant) {
      case 'primary':
        return 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300'
      case 'secondary':
        return 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300'
      case 'primaryOutlined':
        return 'border text-blue-500 hover:bg-blue-100'
      case 'danger':
        return 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300'
      default:
        return ''
    }
  })()

  const loadingClasses = props.loading ? 'opacity-70 cursor-not-allowed' : ''
  const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : ''

  return `${baseClasses} ${variantClasses} ${loadingClasses} ${disabledClasses}`
})
</script>
