<template>
  <div data-cy="form-step" class="flex items-center space-x-2">
    <span
      class="w-6 h-6 flex items-center justify-center bg-primary text-text-inverted rounded-full text-sm"
    >
      {{ step }}
    </span>
    <h3 class="text-sm font-medium text-text-primary">{{ title }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FormStep',
  props: {
    step: { type: Number, required: true },
    title: { type: String, required: true },
  },
})
</script>
