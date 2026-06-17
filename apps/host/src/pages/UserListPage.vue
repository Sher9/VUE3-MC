<template>
  <div class="user-list-page">
    <h2>用户列表</h2>
    <p class="desc">此页面加载 User 子系统的用户列表组件（远程加载）</p>
    <div class="content-card">
      <Suspense>
        <template #default>
          <UserList />
        </template>
        <template #fallback>
          <div class="loading">加载远程组件中...</div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const UserList = defineAsyncComponent(() => import('appUser/UserList'))
</script>

<style scoped>
.user-list-page h2 {
  margin-bottom: 8px;
}

.desc {
  color: #666;
  margin-bottom: 20px;
}

.content-card {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.loading {
  padding: 20px;
  text-align: center;
  color: #999;
}
</style>
