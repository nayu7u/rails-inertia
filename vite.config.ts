import { defineConfig } from 'vite'
import ViteRails from 'vite-plugin-ruby'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    ViteRails(),
  ],
})
