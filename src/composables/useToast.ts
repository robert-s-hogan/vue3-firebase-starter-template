// src/composables/useToast.ts
import { ref } from 'vue'

export type Variant = 'info' | 'success' | 'warning' | 'error'

export interface ToastItem {
  id: number
  message: string
  variant: Variant
}

const toasts = ref<ToastItem[]>([])
let nextId = 1

export function addToast(
  message: string,
  variant: Variant = 'info',
  duration = 3000,
) {
  const id = nextId++
  toasts.value.push({ id, message, variant })
  setTimeout(() => removeToast(id), duration)
}

export function removeToast(id: number) {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}

export function useToast() {
  return { toasts, addToast, removeToast }
}
