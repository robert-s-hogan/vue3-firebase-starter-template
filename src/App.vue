<template>
  <ToastContainer />
  <BaseLoading v-if="isAppLoading" />
  <router-view />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import ToastContainer from '@/components/organisms/ToastContainer/ToastContainer.vue'
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading.vue'

const { loading: authLoading } = useAuth()
const isAppLoading = computed(() => authLoading.value)
</script>
