<template>
  <div class="order-detail">
    <div class="order-header">
      <span class="order-no">{{ order.orderNo }}</span>
      <span class="order-status" :class="order.status">
        {{ statusText }}
      </span>
    </div>
    <div class="order-info">
      <div class="info-row">
        <span class="label">客户：</span>
        <span class="value">{{ order.customerName }}</span>
      </div>
      <div class="info-row">
        <span class="label">金额：</span>
        <span class="value amount">¥{{ order.amount.toFixed(2) }}</span>
      </div>
      <div class="info-row">
        <span class="label">时间：</span>
        <span class="value">{{ order.createTime }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const order = {
  id: 1,
  orderNo: 'ORD2024001',
  customerName: '张三',
  amount: 299.00,
  status: 'completed',
  createTime: '2024-01-15'
}

const statusText = computed(() => {
  const map = {
    pending: '待处理',
    processing: '处理中',
    completed: '已完成',
    cancelled: '已取消'
  }
  return map[order.status] || order.status
})
</script>

<style scoped>
.order-detail {
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e8e8e8;
}

.order-no {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.order-status {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 4px;
}

.order-status.completed {
  background: #f6ffed;
  color: #52c41a;
}

.order-status.processing {
  background: #e6f7ff;
  color: #1890ff;
}

.order-status.pending {
  background: #fffbe6;
  color: #faad14;
}

.order-status.cancelled {
  background: #fff1f0;
  color: #ff4d4f;
}

.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.label {
  color: #666;
  font-size: 14px;
  width: 60px;
}

.value {
  color: #1a1a1a;
  font-size: 14px;
}

.value.amount {
  color: #f5222d;
  font-weight: 600;
}
</style>
