<template>
  <aside class="shared-sidebar" :class="{ collapsed: collapsed }">
    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li v-for="item in menuItems" :key="item.path" class="nav-item">
          <router-link :to="item.path" class="nav-link" active-class="active">
            <span class="nav-icon">{{ item.icon }}</span>
            <span v-show="!collapsed" class="nav-text">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue'

defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})

const menuItems = computed(() => [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/user', label: '用户管理', icon: '👥' },
  { path: '/user/list', label: '用户列表', icon: '📋' },
  { path: '/order', label: '订单管理', icon: '📦' },
  { path: '/order/list', label: '订单列表', icon: '📑' },
  { path: '/cross-demo', label: '跨系统演示', icon: '🔗' }
])
</script>

<style scoped>
.shared-sidebar {
  width: 220px;
  height: 100%;
  background: #001529;
  transition: width 0.3s ease;
  overflow: hidden;
}

.shared-sidebar.collapsed {
  width: 64px;
}

.sidebar-nav {
  padding-top: 16px;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 4px 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s;
  white-space: nowrap;
}

.nav-link:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

.nav-link.active {
  color: #fff;
  background: #1890ff;
}

.nav-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.nav-text {
  font-size: 14px;
}
</style>
