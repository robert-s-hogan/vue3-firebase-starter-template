<template>
  <div data-cy="input-group" class="mb-4">
    <label :for="id" class="block mb-1 font-medium text-text-primary">
      {{ label }}
    </label>
    <BaseInput
      :id="id"
      v-model="modelValue"
      class="w-full border border-border rounded p-2"
      :aria-describedby="help ? helpId : undefined"
    />
    <p v-if="help" :id="helpId" class="mt-1 text-xs text-text-secondary">
      {{ help }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import BaseInput from '../BaseInput/BaseInput.vue'
export default defineComponent({
  name: 'InputGroup',
  components: { BaseInput },
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    modelValue: String,
    help: String,
  },
  emits: ['update:modelValue'],
  setup(props, { emit: _emit }) {
    const helpId = computed(() => `${props.id}-help`)
    return { helpId }
  },
})
</script>
