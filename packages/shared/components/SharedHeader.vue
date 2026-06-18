<template>
  <header class="shared-header">
    <div class="header-left">
      <button class="toggle-btn" @click="$emit('toggle-sidebar')">
        <span class="icon">☰</span>
      </button>
      <h1 class="header-title">{{ title }}</h1>
      <nav class="top-nav" aria-label="子系统导航">
        <ul>
          <li>
            <router-link to="/" exact-active-class="active" class="nav-item-link">首页</router-link>
          </li>
          <li class="nav-separator" aria-hidden="true"></li>
          <li>
            <router-link
              to="/order"
              active-class="active"
              class="nav-item-link subsystem-link"
              :class="{ 'subsystem-active': isOrderActive }"
            >
              📦 订单子系统
            </router-link>
          </li>
          <li>
            <router-link
              to="/user"
              active-class="active"
              class="nav-item-link subsystem-link"
              :class="{ 'subsystem-active': isUserActive }"
            >
              👥 用户子系统
            </router-link>
          </li>
          <li>
            <router-link
              to="/system"
              active-class="active"
              class="nav-item-link subsystem-link"
              :class="{ 'subsystem-active': isSystemActive }"
            >
              ⚙️ 系统管理
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="header-right">
      <span class="current-subsystem" v-if="activeSubsystem">
        {{ activeSubsystem }}
      </span>
      <span class="user-info">👤 {{ username }}</span>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSharedStore } from '../stores/sharedStore'

defineProps({
  title: {
    type: String,
    default: ''
  }
})

defineEmits(['toggle-sidebar'])

const route = useRoute()
const sharedStore = useSharedStore()

const currentPath = computed(() => route.path)
const username = computed(() => sharedStore.username)

const isOrderActive = computed(() => route.path.startsWith('/order'))
const isUserActive = computed(() => route.path.startsWith('/user'))
const isSystemActive = computed(() => route.path.startsWith('/system'))

const activeSubsystem = computed(() => {
  if (isOrderActive.value) return '当前：订单子系统'
  if (isUserActive.value) return '当前：用户子系统'
  if (isSystemActive.value) return '当前：系统管理'
  return ''
})
</script>

<style scoped>
.shared-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.2s;
}

.toggle-btn:hover {
  background: #f0f0f0;
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.top-nav {
  margin-left: 12px;
}

.top-nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 4px;
  align-items: center;
}

.nav-item-link {
  color: #333;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
}

.nav-item-link:hover {
  background: #f0f2f5;
  color: #1890ff;
}

.nav-item-link.active {
  background: #e6f7ff;
  color: #1890ff;
  font-weight: 600;
}

.subsystem-link.subsystem-active {
  background: #e6f7ff;
  color: #1890ff;
  font-weight: 600;
}

.subsystem-link.subsystem-active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 12px;
  right: 12px;
  height: 2px;
  background: #1890ff;
  border-radius: 1px 1px 0 0;
}

.nav-separator {
  width: 1px;
  height: 20px;
  background: #d9d9d9;
  margin: 0 4px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.current-subsystem {
  color: #1890ff;
  font-size: 13px;
  font-weight: 500;
  background: #e6f7ff;
  padding: 2px 10px;
  border-radius: 10px;
}

.current-path {
  color: #666;
  font-size: 14px;
}

.user-info {
  font-size: 14px;
  color: #333;
}
</style>
