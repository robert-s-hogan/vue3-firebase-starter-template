<template>
  <button
    type="button"
    :aria-label="label"
    data-cy="icon-button"
    class="p-2 rounded hover:bg-secondary-light focus:ring-2 focus:ring-primary"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'IconButton',
  props: {
    label: { type: String, required: true },
  },
})
</script>
