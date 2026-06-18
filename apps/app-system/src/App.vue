<template>
  <!-- 独立运行模式 -->
  <div class="app-container" v-if="!embedded">
    <header class="app-header">
      <h1>系统管理</h1>
      <nav>
        <router-link to="/">角色管理</router-link>
        <router-link to="/menu">菜单管理</router-link>
        <router-link to="/permission">权限管理</router-link>
      </nav>
    </header>
    <main class="app-content">
      <router-view />
    </main>
  </div>
  <!-- 嵌入模式：由主系统提供布局 -->
  <router-view v-else />
</template>

<script setup>
defineProps({
  embedded: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.app-container {
  min-height: 100vh;
}

.app-header {
  background: #001529;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 32px;
}

.app-header h1 {
  color: #fff;
  font-size: 18px;
}

.app-header nav {
  display: flex;
  gap: 16px;
}

.app-header nav a {
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.2s;
}

.app-header nav a:hover,
.app-header nav a.router-link-active {
  color: #fff;
  background: #1890ff;
}

.app-content {
  padding: 24px;
}
</style>
