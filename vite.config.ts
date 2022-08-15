import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // 允许全局引入index.less文件
  css: {
    preprocessorOptions: {
       less: {
         modifyVars: {
           hack: `true; @import (reference) "${path.resolve('src/theme/index.less')}";`,
         },
         javascriptEnabled: true
       }
    }
  }


})
