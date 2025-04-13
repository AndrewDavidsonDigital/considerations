/// <reference types="vitest" />

import { defineConfig } from 'vite'
import path from "path";
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  publicDir: "public",
  plugins: [
    basicSsl(),
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
