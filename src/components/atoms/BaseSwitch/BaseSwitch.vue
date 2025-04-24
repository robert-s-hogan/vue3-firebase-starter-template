<template>
  <label class="relative inline-block w-10 h-6" data-cy="switch">
    <input
      type="checkbox"
      class="opacity-0 w-0 h-0"
      :checked="modelValue"
      @change="
        $emit('update:modelValue', ($event.target as HTMLInputElement).checked)
      "
    />
    <span
      class="absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition bg-muted"
    ></span>
    <span
      class="absolute left-1 bottom-1 h-4 w-4 bg-white rounded-full transition transform"
      :class="{ 'translate-x-4': modelValue }"
    ></span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Switch',
  props: {
    modelValue: { type: Boolean, required: true },
  },
})
</script>

<style scoped>
/* Off state bg-muted, on state we'll override via inline classes if needed */
label input:checked + span {
  @apply bg-primary;
}
</style>
