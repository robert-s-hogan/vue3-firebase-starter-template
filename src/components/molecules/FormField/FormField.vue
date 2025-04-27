<!-- src/components/molecules/FormField.vue -->
<template>
  <div class="mb-4">
    <label :for="id" class="block text-primary mb-2">{{ label }}</label>
    <BaseInput
      :id="id"
      v-model="localValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="error ? 'border-error-light focus:ring-error-light' : ''"
      data-cy="form-input"
    />
    <p v-if="error" class="mt-1 text-error text-sm" data-cy="form-error">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseInput from '@/components/atoms/BaseInput/BaseInput.vue'

interface Props {
  id: string
  label: string
  modelValue: string | number
  type?: string
  placeholder?: string
  disabled?: boolean
  error?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number): void
}>()

const {
  id,
  label,
  modelValue,
  type = 'text',
  placeholder = '',
  disabled = false,
  error,
} = props

const localValue = ref<string | number>(modelValue)

// emit outward whenever localValue changes
watch(localValue, (val) => {
  emit('update:modelValue', val)
})
// keep localValue in sync if parent modelValue changes
watch(
  () => props.modelValue,
  (val) => {
    localValue.value = val
  },
)
</script>

<style scoped></style>
