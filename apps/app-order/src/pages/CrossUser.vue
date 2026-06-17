<template>
  <div class="cross-user-page">
    <h2>跨系统调用 - User 组件</h2>
    <p class="desc">
      此页面演示 Order 子系统如何调用 User 子系统的远程组件。
      这是模块联邦的核心能力：子系统之间可以相互调用组件。
    </p>
    <div class="card">
      <h3>从 User 子系统远程加载的用户卡片组件</h3>
      <Suspense>
        <template #default>
          <UserCard />
        </template>
        <template #fallback>
          <div class="loading">正在从 User 子系统加载组件...</div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

// 从 User 子系统加载远程组件
const UserCard = defineAsyncComponent(() => import('appUser/UserCard'))
</script>

<style scoped>
.cross-user-page h2 {
  margin-bottom: 8px;
}

.desc {
  color: #666;
  margin-bottom: 24px;
  line-height: 1.6;
}

.card {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.card h3 {
  margin-bottom: 16px;
  color: #1890ff;
}

.loading {
  padding: 20px;
  text-align: center;
  color: #999;
}
</style>
