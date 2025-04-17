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
          'bg-info-light text-info-dark': this.variant === 'info',
          'text-info-darkabg-success-light text-success-dark':
            this.variant === 'success',
          'bg-warning-light text-warning-dark': this.variant === 'warning',
          'bg-error-light text-error-dark': this.variant === 'danger',
        },
      ]
    },
  },
}
</script>
