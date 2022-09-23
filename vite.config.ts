import { defineConfig } from 'vite'
import { createVuePlugin  } from "vite-plugin-vue2";
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/vAxios.ts'),
      name: 'vAxios',
      fileName: 'lib/vAxios'
    },
    rollupOptions: {
      external: ['axios'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          axios: 'axios',
          qs: 'qs'
        }
      }
    },
  }
});
