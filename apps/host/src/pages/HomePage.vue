<template>
  <div class="home-page">
    <h2>欢迎使用 Vue3 模块联邦后台管理系统</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-info">
          <div class="stat-value">{{ userCount }}</div>
          <div class="stat-label">用户总数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📦</div>
        <div class="stat-info">
          <div class="stat-value">{{ orderCount }}</div>
          <div class="stat-label">订单总数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">💰</div>
        <div class="stat-info">
          <div class="stat-value">{{ totalRevenue }}</div>
          <div class="stat-label">总营收</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📈</div>
        <div class="stat-info">
          <div class="stat-value">98%</div>
          <div class="stat-label">系统健康度</div>
        </div>
      </div>
    </div>
    <div class="remote-components-demo">
      <h3>远程组件演示</h3>
      <p class="desc">以下是从 User 和 Order 子系统加载的远程组件：</p>
      <div class="demo-grid">
        <div class="demo-card">
          <h4>User 子系统 - UserCard</h4>
          <Suspense>
            <template #default>
              <UserCard />
            </template>
            <template #fallback>
              <div class="loading">加载中...</div>
            </template>
          </Suspense>
        </div>
        <div class="demo-card">
          <h4>Order 子系统 - OrderDetail</h4>
          <Suspense>
            <template #default>
              <OrderDetail />
            </template>
            <template #fallback>
              <div class="loading">加载中...</div>
            </template>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

// 从 User 子系统加载远程组件
const UserCard = defineAsyncComponent(() => import('appUser/UserCard'))

// 从 Order 子系统加载远程组件
const OrderDetail = defineAsyncComponent(() => import('appOrder/OrderDetail'))

// 模拟数据
const userCount = ref(1280)
const orderCount = ref(3560)
const totalRevenue = ref('¥128,000')
</script>

<style scoped>
.home-page {
  max-width: 1200px;
}

.home-page h2 {
  margin-bottom: 24px;
  color: #1a1a1a;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.stat-icon {
  font-size: 32px;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

.remote-components-demo {
  margin-top: 32px;
}

.remote-components-demo h3 {
  margin-bottom: 8px;
  color: #1a1a1a;
}

.desc {
  color: #666;
  margin-bottom: 16px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 16px;
}

.demo-card {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.demo-card h4 {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e8e8e8;
  color: #1890ff;
}

.loading {
  padding: 20px;
  text-align: center;
  color: #999;
}
</style>
