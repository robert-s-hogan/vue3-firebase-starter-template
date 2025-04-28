<template>
  <div class="flex justify-center space-x-4 mt-6 text-sm">
    <BaseLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="text-secondary hover:text-primary transition-colors"
    >
      {{ link.text }}
    </BaseLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BaseLink from '@/components/atoms/BaseLink/BaseLink.vue'

const route = useRoute()
const links = computed(() => {
  switch (route.name) {
    case 'Login':
      return [
        { to: '/register', text: 'Don’t have an account?' },
        { to: '/reset-password', text: 'Forgot password?' },
      ]
    case 'Register':
      return [
        { to: '/login', text: 'Already have an account?' },
        { to: '/reset-password', text: 'Forgot password?' },
      ]
    case 'ResetPassword':
      return [
        { to: '/login', text: 'Back to Login' },
        { to: '/register', text: 'Create an account' },
      ]
    default:
      return []
  }
})
</script>
