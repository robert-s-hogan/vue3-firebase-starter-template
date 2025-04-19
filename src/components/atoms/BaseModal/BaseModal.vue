<!-- src/components/atoms/BaseModal.vue -->
<template>
  <div
    v-if="visible"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded relative">
      <button
        class="absolute top-2 right-2 text-secondary hover:text-primary"
        @click="$emit('close')"
      >
        X
      </button>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
export default {
  name: 'BaseModal',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
