<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Order 子系统</h1>
      <nav>
        <router-link to="/">首页</router-link>
        <router-link to="/list">订单列表</router-link>
        <router-link to="/cross-user">跨系统调用User</router-link>
      </nav>
    </header>
    <main class="app-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f0f2f5;
}
</style>

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
