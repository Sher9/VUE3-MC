<template>
  <div class="user-list">
    <h2>用户列表</h2>
    <table class="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>姓名</th>
          <th>邮箱</th>
          <th>角色</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userStore.users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <span class="role-tag">{{ user.role }}</span>
          </td>
          <td>
            <span class="status-tag" :class="user.status">
              {{ user.status === 'active' ? '在线' : '离线' }}
            </span>
          </td>
          <td>
            <button class="btn btn-danger" @click="userStore.removeUser(user.id)">
              删除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
</script>

<style scoped>
.user-list h2 {
  margin-bottom: 16px;
  color: #1a1a1a;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.user-table th,
.user-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e8e8e8;
}

.user-table th {
  background: #fafafa;
  font-weight: 600;
  color: #666;
  font-size: 14px;
}

.role-tag {
  font-size: 12px;
  padding: 2px 8px;
  background: #e6f7ff;
  color: #1890ff;
  border-radius: 4px;
}

.status-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
}

.status-tag.active {
  background: #f6ffed;
  color: #52c41a;
}

.status-tag.inactive {
  background: #fff1f0;
  color: #ff4d4f;
}

.btn {
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.btn-danger {
  background: #ff4d4f;
  color: #fff;
}

.btn-danger:hover {
  background: #ff7875;
}
</style>
