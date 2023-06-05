import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

import vueJsx from "@vitejs/plugin-vue-jsx";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vueJsx(),vue()],
  resolve: {
    alias:[{ find: '@', replacement: fileURLToPath(new URL('./src',import.meta.url)) }]
  }
})
