<template>
  <div>
    <Header />

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Header from '@/components/organisms//BaseHeader/BaseHeader.vue'
</script>
