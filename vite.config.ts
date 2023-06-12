import { fileURLToPath, URL } from 'node:url'
import postcssNesting from 'postcss-nesting'
import postcssCustomMedia from 'postcss-custom-media'
import postcssCssVariables from 'postcss-css-variables'
import { imagetools } from 'vite-imagetools'
import svgLoader from 'vite-svg-loader'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    imagetools(),
    svgLoader()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
      postcss: {
          plugins: [
              postcssNesting,
              postcssCssVariables,
              postcssCustomMedia,
          ],
      }
  }
})
