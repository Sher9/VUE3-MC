<template>
  <div class="user-page">
    <h2>用户管理</h2>
    <p class="desc">此页面展示 User 子系统的用户卡片组件（远程加载）</p>
    <div v-if="error" class="error-box">{{ error }}</div>
    <div class="content-card">
      <Suspense>
        <template #default>
          <UserCard />
        </template>
        <template #fallback>
          <div class="loading">加载远程组件中...</div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref, onErrorCaptured } from 'vue'

const error = ref(null)

onErrorCaptured((err) => {
  error.value = '加载失败: ' + err.message
  console.error('Remote component error:', err)
})

const UserCard = defineAsyncComponent({
  loader: () => import('appUser/UserCard'),
  onError(error, retry, fail) {
    console.error('Async component error:', error)
    error.value = error.message
    fail()
  }
})
</script>

<style scoped>
.user-page h2 {
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

.error-box {
  padding: 12px;
  margin-bottom: 16px;
  background: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 4px;
  color: #ff4d4f;
}
</style>
