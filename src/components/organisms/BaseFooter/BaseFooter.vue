<template>
  <footer class="bg-secondary text-text-inverted p-4" data-cy="footer">
    <div class="container mx-auto text-center text-sm">
      <slot>© 2025 Your Company</slot>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'Footer' })
</script>
