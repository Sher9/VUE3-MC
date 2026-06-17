# Module Federation 后台管理系统

基于 Vue 3 + Vite + Module Federation 的微前端后台管理系统，支持子系统之间双向远程组件调用。

## 技术栈

| 技术 | 版本 |
|------|------|
| Vue | 3.4.38 |
| Vue Router | 4.4.5 |
| Pinia | 2.1.7 |
| Vite | 6.4.3 |
| @vitejs/plugin-vue | 5.2.4 |
| @module-federation/vite | 1.16.8 |

## 项目结构

```
vue3-MC/
├── apps/
│   ├── host/          # 主应用 (Home) - 消费方，端口 5000
│   ├── app-user/      # 用户子系统 - 提供方+消费方，端口 5001
│   └── app-order/     # 订单子系统 - 提供方+消费方，端口 5002
├── packages/
│   └── shared/        # 共享组件、Store、工具函数
├── package.json       # 根配置 (npm workspaces)
└── .gitignore
```

## 子系统说明

| 子系统 | 端口 | 角色 | 暴露模块 |
|--------|------|------|----------|
| Host | 5000 | 主应用消费方 | — |
| app-user | 5001 | 提供方 + 消费 Order | UserCard, UserList, UserStore |
| app-order | 5002 | 提供方 + 消费 User | OrderList, OrderDetail, OrderStore |

## 快速开始

### 安装依赖

```bash
npm install --legacy-peer-deps
```

### 开发模式启动

在三个独立的终端中分别运行：

```bash
# 终端1: User 子系统
npm -w apps/app-user run dev

# 终端2: Order 子系统
npm -w apps/app-order run dev

# 终端3: Host 主应用
npm -w apps/host run dev
```

访问 http://localhost:5000

### 构建

```bash
npm -w apps/app-user run build
npm -w apps/app-order run build
npm -w apps/host run build
```

## Module Federation 配置

### Host (apps/host/vite.config.js)

```js
import { federation } from '@module-federation/vite'

federation({
  name: 'host',
  remotes: {
    appUser: {
      type: 'module',
      name: 'appUser',
      entry: 'http://localhost:5001/remoteEntry.js'
    },
    appOrder: {
      type: 'module',
      name: 'appOrder',
      entry: 'http://localhost:5002/remoteEntry.js'
    }
  },
  shared: {
    vue: { singleton: true, requiredVersion: '^3.4.0' },
    'vue-router': { singleton: true, requiredVersion: '^4.4.0' },
    pinia: { singleton: true, requiredVersion: '^2.1.0' }
  }
})
```

### User 子系统 (apps/app-user/vite.config.js)

```js
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
  shared: { /* 同上 */ }
})
```

### Order 子系统 (apps/app-order/vite.config.js)

```js
federation({
  name: 'appOrder',
  filename: 'remoteEntry.js',
  exposes: {
    './OrderList': './src/pages/OrderList.vue',
    './OrderDetail': './src/components/OrderDetail.vue',
    './OrderStore': './src/stores/orderStore.js'
  },
  remotes: {
    appUser: {
      type: 'module',
      name: 'appUser',
      entry: 'http://localhost:5001/remoteEntry.js'
    }
  },
  shared: { /* 同上 */ }
})
```

## 远程组件调用

### 在 Host 中使用远程组件

```vue
<template>
  <Suspense>
    <UserCard />
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const UserCard = defineAsyncComponent(() => import('appUser/UserCard'))
</script>
```

### 跨子系统调用

- User 子系统可调用 Order 的组件 (如 `appOrder/OrderDetail`)
- Order 子系统可调用 User 的组件 (如 `appUser/UserCard`)

## 技术要点

1. **@module-federation/vite**: 官方 Module Federation Vite 插件，**原生支持开发模式**
2. **type: 'module'**: remote 配置必须显式声明模块类型，确保 ES Module 正确加载
3. **singleton + requiredVersion**: 共享依赖使用单例模式，避免 Vue 等核心库重复实例化
4. **defineAsyncComponent + Suspense**: 远程组件异步加载，配合 Suspense 处理加载状态
5. **JavaScript**: 项目使用纯 JavaScript，未引入 TypeScript
6. **ESM**: 所有 package.json 声明 `"type": "module"`，使用 ES Module 语法
