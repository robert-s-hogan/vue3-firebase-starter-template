<!-- src/components/molecules/FormField.vue -->
<template>
  <div class="mb-4">
    <label :for="id" class="block text-primary mb-2">{{ label }}</label>
    <BaseInput
      :id="id"
      v-bind="inputProps"
      :value="localValue"
      @input="updateValue"
    />
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/atoms/BaseInput/BaseInput.vue'

export default {
  name: 'FormField',
  components: { BaseInput },
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    modelValue: [String, Number],
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localValue: this.modelValue,
    }
  },

  computed: {
    inputProps() {
      return {
        type: this.type,
        placeholder: this.placeholder,
        disabled: this.disabled,
      }
    },
  },
  watch: {
    modelValue(newValue) {
      this.localValue = newValue
    },
  },
  methods: {
    updateValue(event) {
      const value = event.target.value
      this.localValue = value
      this.$emit('update:modelValue', value)
    },
  },
}
</script>
