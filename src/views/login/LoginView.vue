<!-- src/views/LoginView.vue -->
<template>
  <div class="max-w-md mx-auto mt-10">
    <BaseCard>
      <h2 class="text-xl font-bold mb-4">Login</h2>
      <LoginForm />
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from '@/components/atoms/BaseCard/BaseCard.vue'
import LoginForm from '@/components/organisms/LoginForm/LoginForm.vue'

export default {
  name: 'LoginView',
  components: { BaseCard, LoginForm },
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
