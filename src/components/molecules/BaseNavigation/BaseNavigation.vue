<template>
  <nav class="space-x-4">
    <!-- only show if store says we're authenticated -->
    <BaseLink v-if="isAuthenticated" to="/dashboard"> Dashboard </BaseLink>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import BaseLink from '@/components/atoms/BaseLink/BaseLink.vue'

// pull reactive auth state from Pinia store
const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
</script>
