<!-- src/views/DashboardView.vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
    <p>Welcome, {{ userEmail }}</p>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { auth } from '@/firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

export default {
  name: 'DashboardView',
  setup() {
    const userEmail = ref('')

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          userEmail.value = user.email
        }
      })
    })

    return { userEmail }
  },
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
