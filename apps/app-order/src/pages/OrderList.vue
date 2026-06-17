<template>
  <div class="order-list">
    <h2>订单列表</h2>
    <table class="order-table">
      <thead>
        <tr>
          <th>订单号</th>
          <th>客户</th>
          <th>金额</th>
          <th>状态</th>
          <th>创建时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orderStore.orders" :key="order.id">
          <td>
            <span class="order-no">{{ order.orderNo }}</span>
          </td>
          <td>{{ order.customerName }}</td>
          <td>
            <span class="amount">¥{{ order.amount.toFixed(2) }}</span>
          </td>
          <td>
            <span class="status-tag" :class="order.status">
              {{ statusText(order.status) }}
            </span>
          </td>
          <td>{{ order.createTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useOrderStore } from '../stores/orderStore'

const orderStore = useOrderStore()

function statusText(status) {
  const map = {
    pending: '待处理',
    processing: '处理中',
    completed: '已完成',
    cancelled: '已取消'
  }
  return map[status] || status
}
</script>

<style scoped>
.order-list h2 {
  margin-bottom: 16px;
  color: #1a1a1a;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.order-table th,
.order-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e8e8e8;
}

.order-table th {
  background: #fafafa;
  font-weight: 600;
  color: #666;
  font-size: 14px;
}

.order-no {
  font-weight: 500;
  color: #1890ff;
}

.amount {
  color: #f5222d;
  font-weight: 600;
}

.status-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
}

.status-tag.completed {
  background: #f6ffed;
  color: #52c41a;
}

.status-tag.processing {
  background: #e6f7ff;
  color: #1890ff;
}

.status-tag.pending {
  background: #fffbe6;
  color: #faad14;
}

.status-tag.cancelled {
  background: #fff1f0;
  color: #ff4d4f;
}
</style>
