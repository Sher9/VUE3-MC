<template>
  <header class="shared-header">
    <div class="header-left">
      <button class="toggle-btn" @click="$emit('toggle-sidebar')">
        <span class="icon">☰</span>
      </button>
      <h1 class="header-title">{{ title }}</h1>
    </div>
    <div class="header-right">
      <span class="current-path">{{ currentPath }}</span>
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

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
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
