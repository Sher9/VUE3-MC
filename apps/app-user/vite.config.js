import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { federation } from '@module-federation/vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'appUser',
      filename: 'remoteEntry.js',
      exposes: {
        './UserCard': './src/components/UserCard.vue',
        './UserList': './src/pages/UserList.vue',
        './UserStore': './src/stores/userStore.js'
      },
      remotes: {
        appOrder: {
          type: 'module',
          name: 'appOrder',
          entry: 'http://localhost:5002/remoteEntry.js'
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
    port: 5001,
    strictPort: true,
    cors: true
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
