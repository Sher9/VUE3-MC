<template>
  <div class="app-layout">
    <SharedSidebar :collapsed="sharedStore.sidebarCollapsed" />
    <div class="app-main">
      <SharedHeader
        title="Vue3 模块联邦管理系统"
        @toggle-sidebar="sharedStore.toggleSidebar()"
      />
      <main class="app-content">
        <div v-if="sharedStore.globalMessage" class="global-message">
          {{ sharedStore.globalMessage }}
        </div>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { SharedHeader, SharedSidebar, useSharedStore } from '@vue3-mc/shared'

const sharedStore = useSharedStore()
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

:root {
  --primary-color: #1890ff;
  --bg-color: #f0f2f5;
  --sidebar-bg: #001529;
  --header-height: 60px;
}
</style>

<style scoped>
.app-layout {
  display: flex;
  height: 100%;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: var(--bg-color);
}

.global-message {
  margin-bottom: 16px;
  padding: 12px 16px;
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 4px;
  color: #1890ff;
}
</style>
