<template>
  <div data-cy="progress-indicator" class="w-full bg-muted rounded h-2">
    <div
      class="bg-primary h-2 rounded"
      :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ProgressIndicator',
  props: {
    totalSteps: { type: Number, required: true },
    currentStep: { type: Number, required: true },
  },
})
</script>
