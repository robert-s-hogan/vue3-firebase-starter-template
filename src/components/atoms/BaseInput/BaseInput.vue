<!-- src/components/atoms/BaseInput.vue -->
<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :class="computedClass"
    :disabled="disabled"
  />
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    modelValue: [String, Number],
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
    disabled: Boolean,
  },
  computed: {
    computedClass() {
      return [
        'border rounded px-3 py-2 w-full focus:outline-none focus:ring',
        {
          'border-border focus:ring-primary-light': this.type !== 'password',
          'border-error-light focus:ring-error-light': this.type === 'password',
        },
        { 'opacity-50 cursor-not-allowed': this.disabled },
      ]
    },
  },
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
