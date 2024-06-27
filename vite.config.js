import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig(async (process) => {
  let userSettings = null;
  console.log('process.mode', process.mode);
  try {
    //load the settings.js file
    userSettings = (await import('./settings')).settings;
  } catch (error) {
    if(process.mode === 'production') {
      userSettings = { proxyserver:'anything' }//as this is needed for build we have to define it in a way
    } else {
      throw new Error("\n\n"+'ACHTUNG Die settings.js Datei ist nicht korrekt gesetzt. Guck dir die settings.example.js Datei an.'+"\n\n");
    }
  }


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
    //base: command === 'serve' ? '' : '/app/',
  };
});
