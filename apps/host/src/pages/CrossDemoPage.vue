<template>
  <div class="cross-demo-page">
    <h2>跨子系统组件调用演示</h2>
    <p class="desc">
      本页面演示模块联邦的核心能力：Host 应用可以同时加载 User 和 Order 子系统的组件，
      实现跨子系统的组件复用和数据共享。
    </p>

    <div class="demo-section">
      <h3>User 子系统组件</h3>
      <div class="demo-row">
        <div class="demo-card">
          <h4>UserCard（用户卡片）</h4>
          <Suspense>
            <template #default>
              <UserCard />
            </template>
            <template #fallback>
              <div class="loading">加载中...</div>
            </template>
          </Suspense>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>Order 子系统组件</h3>
      <div class="demo-row">
        <div class="demo-card">
          <h4>OrderDetail（订单详情）</h4>
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

    <div class="demo-section">
      <h3>混合调用</h3>
      <p class="desc">在同一个页面中同时使用两个子系统的组件：</p>
      <div class="mixed-demo">
        <Suspense>
          <template #default>
            <div class="mixed-content">
              <div class="mixed-left">
                <h5>来自 User 系统</h5>
                <UserCard />
              </div>
              <div class="mixed-right">
                <h5>来自 Order 系统</h5>
                <OrderDetail />
              </div>
            </div>
          </template>
          <template #fallback>
            <div class="loading">加载远程组件中...</div>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

// 从 User 子系统加载远程组件
const UserCard = defineAsyncComponent(() => import('appUser/UserCard'))

// 从 Order 子系统加载远程组件
const OrderDetail = defineAsyncComponent(() => import('appOrder/OrderDetail'))
</script>

<style scoped>
.cross-demo-page {
  max-width: 1200px;
}

.cross-demo-page h2 {
  margin-bottom: 8px;
}

.desc {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.demo-section {
  margin-bottom: 32px;
}

.demo-section h3 {
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #1890ff;
  color: #1a1a1a;
}

.demo-row {
  display: flex;
  gap: 16px;
}

.demo-card {
  flex: 1;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.demo-card h4 {
  margin-bottom: 16px;
  color: #1890ff;
}

.mixed-demo {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.mixed-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.mixed-left,
.mixed-right {
  padding: 16px;
  background: #fafafa;
  border-radius: 6px;
  border: 1px solid #e8e8e8;
}

.mixed-left h5,
.mixed-right h5 {
  margin-bottom: 12px;
  color: #666;
  font-weight: 500;
}

.loading {
  padding: 20px;
  text-align: center;
  color: #999;
}
</style>
