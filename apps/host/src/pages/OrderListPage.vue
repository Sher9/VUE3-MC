<template>
  <div class="order-list-page">
    <h2>订单列表</h2>
    <p class="desc">此页面加载 Order 子系统的订单列表组件（远程加载）</p>
    <div class="content-card">
      <Suspense>
        <template #default>
          <OrderList />
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

const OrderList = defineAsyncComponent(() => import('appOrder/OrderList'))
</script>

<style scoped>
.order-list-page h2 {
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
