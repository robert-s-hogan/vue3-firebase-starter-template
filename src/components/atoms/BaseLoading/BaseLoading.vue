<!-- src/components/atoms/BaseLoading.vue -->
<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div
      class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'BaseLoading',
}
</script>

<style scoped>
.loader {
  border-top-color: #3498db;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
