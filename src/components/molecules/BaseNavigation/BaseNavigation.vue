<template>
  <nav class="space-x-4">
    <BaseLink v-if="isAuthenticated" to="/dashboard" class="text-black">
      Dashboard
    </BaseLink>
    <!-- Additional links can be added here -->
  </nav>
</template>

<script setup lang="ts">
import BaseLink from '@/components/atoms/BaseLink/BaseLink.vue'
defineProps<{
  isAuthenticated: boolean
}>()
</script>
