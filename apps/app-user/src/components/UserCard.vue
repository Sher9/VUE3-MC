<template>
  <div class="user-card">
    <div class="user-avatar">
      <span>{{ user.name.charAt(0) }}</span>
    </div>
    <div class="user-info">
      <h3 class="user-name">{{ user.name }}</h3>
      <p class="user-email">{{ user.email }}</p>
      <div class="user-meta">
        <span class="user-role">{{ user.role }}</span>
        <span class="user-status" :class="user.status">
          {{ user.status === 'active' ? '在线' : '离线' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = {
  id: 1,
  name: '张三',
  email: 'zhangsan@example.com',
  role: '管理员',
  status: 'active'
}
</script>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #1890ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px 0;
}

.user-email {
  font-size: 13px;
  color: #666;
  margin: 0 0 8px 0;
}

.user-meta {
  display: flex;
  gap: 8px;
}

.user-role {
  font-size: 12px;
  padding: 2px 8px;
  background: #e6f7ff;
  color: #1890ff;
  border-radius: 4px;
}

.user-status {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
}

.user-status.active {
  background: #f6ffed;
  color: #52c41a;
}

.user-status.inactive {
  background: #fff1f0;
  color: #ff4d4f;
}
</style>
