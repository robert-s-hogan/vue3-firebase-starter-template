<template>
  <div class="min-h-screen flex flex-col bg-background">
    <Header />

    <main class="flex-1 flex items-center justify-center px-4">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/organisms/BaseHeader/BaseHeader.vue'
</script>
