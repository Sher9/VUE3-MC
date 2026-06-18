import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { federation } from '@module-federation/vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const rootEnvDir = resolve(__dirname, '../../')

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootEnvDir, 'VITE_')
  const isProd = mode === 'production'

  return {
    plugins: [
      vue({
        template: {
          compilerOptions: {
            hoistStatic: true,
            cacheHandlers: true
          }
        }
      }),
      federation({
        name: 'appOrder',
        filename: 'remoteEntry.js',
        exposes: {
          './OrderList': './src/pages/OrderList.vue',
          './OrderDetail': './src/components/OrderDetail.vue',
          './OrderStore': './src/stores/orderStore.js',
          './register': './src/register.js'
        },
        remotes: {
          appUser: {
            type: 'module',
            name: 'appUser',
            entry: `${env.VITE_USER_URL}/remoteEntry.js`
          }
        },
        shared: {
          vue: {
            singleton: true,
            requiredVersion: '^3.4.0'
          },
          'vue-router': {
            singleton: true,
            requiredVersion: '^4.4.0'
          },
          pinia: {
            singleton: true,
            requiredVersion: '^2.1.0'
          }
        }
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@vue3-mc/shared': resolve(__dirname, '../../packages/shared')
      }
    },
    server: {
      port: Number(env.VITE_ORDER_PORT) || 5002,
      strictPort: true,
      cors: true,
      warmup: {
        clientFiles: [
          './src/main.js',
          './src/App.vue',
          './src/router/index.js'
        ]
      }
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia']
    },
    build: {
      target: 'es2020',
      sourcemap: isProd ? false : true,
      minify: isProd ? 'terser' : 'esbuild',
      cssMinify: isProd ? 'esbuild' : 'esbuild',
      terserOptions: isProd ? {
        compress: { drop_debugger: true, pure_funcs: ['console.debug'], passes: 3 },
        mangle: { toplevel: true },
        format: { comments: false },
        keep_classnames: false,
        keep_fnames: false
      } : undefined,
      cssCodeSplit: false,
      modulePreload: { polyfill: false },
      reportCompressedSize: false
    }
  }
})
