import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig(async (process) => {
  return {
    publicDir: false,
    plugins: [
      vue({
      }),
    ],
    build: {
      outDir: 'public',
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        //vue: path.resolve(__dirname, './node_modules/vue/dist/vue.runtime.esm.js'),
      },
      extensions: [
        '.js',
        '.json',
        '.jsx',
        '.mjs',
        '.ts',
        '.tsx',
        '.vue',
      ],
    },
    define: {
      APP_VERSION_DATE: JSON.stringify(new Date()),
      __VUE_PROD_DEVTOOLS__: process.mode === 'development' ? true : false,
    },

    server: {
      port: 8080,
      open: true
    }
    //base: command === 'serve' ? '' : '/app/',
  };
});
