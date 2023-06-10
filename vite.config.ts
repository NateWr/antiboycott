import { fileURLToPath, URL } from 'node:url'
import postcssNesting from 'postcss-nesting'
import { imagetools } from 'vite-imagetools'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    imagetools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
      postcss: {
          plugins: [
              postcssNesting
          ],
      },
  }
})
