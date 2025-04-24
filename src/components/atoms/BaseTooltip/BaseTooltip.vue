<template>
  <div
    class="relative inline-block"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
    @focusin="visible = true"
    @focusout="visible = false"
  >
    <slot />
    <div
      v-if="visible"
      role="tooltip"
      data-cy="tooltip"
      class="absolute top-full mt-1 px-2 py-1 text-sm rounded bg-secondary-dark text-text-inverted whitespace-nowrap"
    >
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Tooltip',
  props: {
    text: { type: String, required: true },
  },
  setup() {
    const visible = ref(false)
    return { visible }
  },
})
</script>
