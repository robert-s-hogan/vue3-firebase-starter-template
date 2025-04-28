<template>
  <div class="flex items-center justify-center min-h-screen bg-muted px-4">
    <div class="w-full max-w-md bg-surface p-8 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center text-primary mb-6">
        {{ props.title }}
      </h1>
      <slot name="form" />
      <AuthLinks />
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthLinks from '@/components/molecules/AuthLinks/AuthLinks.vue'
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
