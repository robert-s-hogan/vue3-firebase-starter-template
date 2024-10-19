<!-- src/components/atoms/BaseButton.vue -->
<template>
  <button
    :class="computedClass"
    @click="onClick"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
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
  },
  computed: {
    computedClass() {
      return [
        'px-4 py-2 rounded focus:outline-none focus:ring',
        {
          'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300':
            this.variant === 'primary',
          'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300':
            this.variant === 'secondary',
          'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300':
            this.variant === 'danger',
        },
        { 'opacity-50 cursor-not-allowed': this.disabled },
      ]
    },
  },
  methods: {
    onClick(event) {
      if (!this.disabled) {
        this.$emit('click', event)
      }
    },
  },
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
