import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import VueJsx from '@vitejs/plugin-vue-jsx'
import viteDts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    VueJsx(),
    viteDts({
      insertTypesEntry: true,
      staticImport: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, './index.ts'),
      name: 'mumu-ui',
      fileName: (format) => `mumu-ui.${format}.js`,
    },
    outDir: path.resolve(__dirname, '../../lib'),
    emptyOutDir: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
