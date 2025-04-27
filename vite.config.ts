import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/atoms': path.resolve(__dirname, 'src/components/atoms'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/composables': path.resolve(__dirname, 'src/composables'),
      '@/firebase': path.resolve(__dirname, 'src/firebase'),
      '@/molecules': path.resolve(__dirname, 'src/components/molecules'),
      '@/organisms': path.resolve(__dirname, 'src/components/organisms'),
      '@/layouts': path.resolve(__dirname, 'src/layouts'),
      '@/services': path.resolve(__dirname, 'src/services'),
      '@/stores': path.resolve(__dirname, 'src/stores'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/views': path.resolve(__dirname, 'src/views'),
    },
  },
  server: {
    hmr: {
      overlay: false, // disable the red HMR error screen
    },
  },
})
