<!-- src/components/atoms/BaseCard.vue -->
<template>
  <div class="bg-white shadow-md rounded p-6">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
