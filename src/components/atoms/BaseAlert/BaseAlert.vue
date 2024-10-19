<!-- src/components/atoms/BaseAlert.vue -->
<template>
  <div :class="computedClass" role="alert">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BaseAlert',
  props: {
    variant: {
      type: String,
      default: 'info',
    },
  },
  computed: {
    computedClass() {
      return [
        'p-4 rounded mb-4',
        {
          'bg-blue-100 text-blue-800': this.variant === 'info',
          'bg-green-100 text-green-800': this.variant === 'success',
          'bg-yellow-100 text-yellow-800': this.variant === 'warning',
          'bg-red-100 text-red-800': this.variant === 'danger',
        },
      ]
    },
  },
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
