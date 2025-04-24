<template>
  <div
    class="w-8 h-8 rounded-full bg-secondary-light flex items-center justify-center overflow-hidden"
    data-cy="avatar"
  >
    <img
      v-if="src && !errored"
      :src="src"
      :alt="alt"
      @error="errored = true"
      class="object-cover w-full h-full"
    />
    <span v-else class="text-sm font-bold text-text-inverted">{{
      initials
    }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
export default defineComponent({
  name: 'Avatar',
  props: {
    src: String,
    alt: { type: String, default: 'Avatar' },
    name: String,
  },
  setup(props) {
    const errored = ref(false)
    const initials = computed(() =>
      props.name
        ? props.name
            .split(' ')
            .map((n) => n.charAt(0).toUpperCase())
            .join('')
        : '',
    )
    return { errored, initials }
  },
})
</script>
