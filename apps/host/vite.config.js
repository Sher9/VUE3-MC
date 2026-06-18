// 导入 Vite 核心函数：defineConfig 用于定义配置，loadEnv 用于加载环境变量
import { defineConfig, loadEnv } from 'vite'
// 导入 Vue 插件，用于在 Vite 中支持 .vue 单文件组件的编译
import vue from '@vitejs/plugin-vue'
// 导入 Module Federation 插件，用于实现微前端架构，支持远程模块加载和共享依赖
import { federation } from '@module-federation/vite'
// 导入路径处理工具：resolve 用于解析绝对路径
import { resolve } from 'path'
// 导入 URL 处理工具：fileURLToPath 将 file:// URL 转换为文件系统路径
import { fileURLToPath } from 'url'

// 获取当前文件的目录路径（兼容 ESM 模块系统）
const __dirname = fileURLToPath(new URL('.', import.meta.url))
// 设置根环境变量目录为项目根目录（apps/host 的上级目录）
const rootEnvDir = resolve(__dirname, '../../')

// 导出默认配置，mode 参数表示当前运行模式（development/production）
export default defineConfig(({ mode }) => {
  // 加载以 'VITE_' 开头的环境变量，从根目录的 .env 文件中读取
  // mode 决定加载哪个环境的配置文件（如 .env.development、.env.production）
  const env = loadEnv(mode, rootEnvDir, 'VITE_')

  // 模式标识
  const isProd = mode === 'production'

  return {
    // 配置 Vite 插件列表
    plugins: [
      // Vue 插件配置：启用 Vue SFC（单文件组件）支持
      vue({
        template: {
          // Vue 模板编译器优化选项
          compilerOptions: {
            // 静态提升：将静态节点提升到渲染函数外部，避免每次重新创建，提升性能
            hoistStatic: true,
            // 缓存事件处理器：缓存内联事件处理函数，减少不必要的更新
            cacheHandlers: true
          }
        }
      }),
      // Module Federation 配置：微前端核心配置
      federation({
        // 当前应用的名称，作为宿主应用（Host App）
        name: 'host',
        // 配置远程应用（Remote Apps）：定义可以从其他微前端应用加载的模块
        remotes: {
          // 用户管理微应用
          appUser: {
            type: 'module',           // 使用 ES Module 格式加载远程模块
            name: 'appUser',         // 远程应用名称
            entry: `${env.VITE_USER_URL}/remoteEntry.js`  // 远程入口文件地址
          },
          // 订单管理微应用
          appOrder: {
            type: 'module',
            name: 'appOrder',
            entry: `${env.VITE_ORDER_URL}/remoteEntry.js`
          },
          // 系统管理微应用
          appSystem: {
            type: 'module',
            name: 'appSystem',
            entry: `${env.VITE_SYSTEM_URL}/remoteEntry.js`
          }
        },
        // 共享依赖配置：在所有微应用之间共享这些依赖，避免重复加载
        shared: {
          // Vue 框架共享配置
          vue: {
            singleton: true,           // 单例模式：确保整个应用只有一个 Vue 实例
            requiredVersion: '^3.4.0'   // 要求版本 >= 3.4.0 且 < 4.0.0
          },
          // Vue Router 路由库共享配置
          'vue-router': {
            singleton: true,
            requiredVersion: '^4.4.0'   // 要求版本 >= 4.4.0 且 < 5.0.0
          },
          // Pinia 状态管理库共享配置
          pinia: {
            singleton: true,
            requiredVersion: '^2.1.0'   // 要求版本 >= 2.1.0 且 < 3.0.0
          }
        }
      }),
      // 自定义插件：HTML 环境变量替换插件
      // 作用：在构建时将 HTML 模板中的占位符替换为实际的环境变量值
      // 这样可以在 index.html 中动态引用远程应用的地址
      {
        name: 'html-env-replace',
        transformIndexHtml(html) {
          return html
            // 替换用户服务地址占位符
            .replace(/__VITE_USER_URL__/g, env.VITE_USER_URL)
            // 替换订单服务地址占位符
            .replace(/__VITE_ORDER_URL__/g, env.VITE_ORDER_URL)
            // 替换系统服务地址占位符
            .replace(/__VITE_SYSTEM_URL__/g, env.VITE_SYSTEM_URL)
        }
      }
    ],
    // 路径别名配置：简化 import 路径，提高代码可读性
    resolve: {
      alias: {
        // 将 '@' 映射到 src 目录，方便导入项目内部模块
        // 例如：import Foo from '@/components/Foo.vue'
        '@': resolve(__dirname, 'src'),
        // 将 '@vue3-mc/shared' 映射到共享包目录
        // 方便在多个微应用间共享公共代码和工具函数
        '@vue3-mc/shared': resolve(__dirname, '../../packages/shared')
      }
    },

    // === 开发服务器配置 ===
    server: {
      // 开发服务器端口号，从环境变量读取，默认使用 5000
      port: Number(env.VITE_HOST_PORT) || 5000,
      // 严格端口模式：如果端口被占用则直接报错，而不是自动尝试下一个端口
      strictPort: true,
      // 预热配置：在开发服务器启动后预先转换和缓存这些常用文件
      // 作用：首次访问页面时加快加载速度，避免等待编译
      warmup: {
        clientFiles: [
          // 应用入口文件
          './src/main.js',
          // 根组件
          './src/App.vue',
          // 路由配置
          './src/router/index.js',
          // 常用页面组件
          './src/pages/HomePage.vue',
          './src/pages/StatisticsPage.vue'
        ]
      }
    },

    // === 依赖预构建配置 ===
    // Vite 在开发时会将依赖进行预构建（转换为 ESM 格式并缓存）
    optimizeDeps: {
      // 显式指定需要预构建的依赖包
      include: [
        // Vue 核心库
        'vue',
        // Vue Router 路由库
        'vue-router',
        // Pinia 状态管理库
        'pinia',
        // 项目内部的共享包
        '@vue3-mc/shared'
      ]
    },

    // === 生产构建配置 ===
    build: {
      // 构建目标
      target: 'es2020',
      // 生产模式不输出 sourcemap（核心混淆手段）
      sourcemap: isProd ? false : true,

      // 生产用 terser 强混淆，开发用 esbuild 保速度
      minify: isProd ? 'terser' : 'esbuild',
      cssMinify: isProd ? 'esbuild' : 'esbuild',
      // terser 混淆选项（仅生产生效）
      terserOptions: isProd ? {
        compress: {
          drop_debugger: true,
          // drop_console: true,  // 如需移除所有 console 可取消注释
          pure_funcs: ['console.debug'],
          passes: 3                // 多轮压缩，更小体积
        },
        mangle: {
          toplevel: true,          // 混淆顶层作用域变量名
          // properties: false     // 不混淆属性名（MF 跨模块调用必须保留）
        },
        format: {
          comments: false          // 删除所有注释
        },
        keep_classnames: false,
        keep_fnames: false
      } : undefined,

      cssCodeSplit: false,
      // 模块预加载配置：控制动态 import 的预加载行为
      modulePreload: {
        // 不注入 polyfill：假设目标浏览器已支持模块预加载功能
        polyfill: false,
        // 自定义依赖解析逻辑：只在 HomePage 中启用模块预加载
        // 其他页面不预加载，减少不必要的网络请求
        resolveDependencies: (filename, deps) => (filename.includes('HomePage') ? deps : [])
      },
      // 是否报告压缩后的大小：关闭以加快构建速度
      reportCompressedSize: false
      // 注意：不要使用 manualChunks，Module Federation 会转换共享依赖的 import 为 async init 包装器，
      // 手动分组会导致循环异步依赖，使应用静默挂起。
    }
  }
})