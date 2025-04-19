<template>
  <router-link :to="to" class="hover:underline">
    <slot />
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>
