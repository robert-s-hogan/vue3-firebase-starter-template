<template>
  <div data-cy="form-navigation" class="flex justify-between mt-4">
    <button
      data-cy="back-button"
      class="px-4 py-2 bg-secondary hover:bg-secondary-dark text-text-inverted rounded"
      :disabled="disableBack"
      @click="$emit('back')"
    >
      Back
    </button>

    <button
      data-cy="next-button"
      class="px-4 py-2 bg-primary hover:bg-primary-dark text-text-inverted rounded"
      :disabled="disableNext"
      @click="$emit('next')"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FormNavigation',
  props: {
    disableBack: { type: Boolean, default: false },
    disableNext: { type: Boolean, default: false },
  },
  emits: ['back', 'next'],
})
</script>
