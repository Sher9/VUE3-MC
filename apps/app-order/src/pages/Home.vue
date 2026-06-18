<template>
  <div class="home-page">
    <h2>Order 子系统首页</h2>
    <p class="desc">这是 Order 子系统，可以独立运行，也可以被 Host 应用或其他子系统远程调用。</p>
    <div class="card">
      <h3>订单详情（本系统组件）</h3>
      <OrderDetail />
    </div>
    <div class="card">
      <h3>跨系统调用演示</h3>
      <p>点击下方链接查看 Order 系统调用 User 系统组件的效果</p>
      <router-link to="cross-user" class="link">查看跨系统调用 →</router-link>
    </div>
  </div>
</template>

<script setup>
import OrderDetail from '../components/OrderDetail.vue'
</script>

<style scoped>
.home-page h2 {
  margin-bottom: 8px;
}

.desc {
  color: #666;
  margin-bottom: 24px;
}

.card {
  margin-bottom: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.card h3 {
  margin-bottom: 16px;
  color: #1890ff;
}

.link {
  color: #1890ff;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
