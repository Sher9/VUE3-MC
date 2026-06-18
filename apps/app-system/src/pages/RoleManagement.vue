<template>
  <div class="role-management">
    <div class="page-header">
      <h2>👔 角色管理</h2>
      <button class="btn-primary" @click="showAddModal = true">+ 新建角色</button>
    </div>

    <div class="table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>角色名称</th>
            <th>角色编码</th>
            <th>描述</th>
            <th>用户数</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="role in roles" :key="role.code">
            <td>
              <span class="role-name">{{ role.name }}</span>
            </td>
            <td><code>{{ role.code }}</code></td>
            <td>{{ role.description }}</td>
            <td>{{ role.userCount }}</td>
            <td>{{ role.createTime }}</td>
            <td class="actions">
              <button class="btn-link" @click="editRole(role)">编辑</button>
              <button class="btn-link" @click="openPermission(role)">赋权</button>
              <button class="btn-link danger" @click="deleteRole(role)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 新增/编辑弹窗 -->
    <div class="modal-overlay" v-if="showAddModal" @click.self="showAddModal = false">
      <div class="modal">
        <h3>{{ editingRole ? '编辑角色' : '新建角色' }}</h3>
        <div class="form-group">
          <label>角色名称</label>
          <input v-model="form.name" placeholder="请输入角色名称" />
        </div>
        <div class="form-group">
          <label>角色编码</label>
          <input v-model="form.code" placeholder="请输入角色编码" :disabled="!!editingRole" />
        </div>
        <div class="form-group">
          <label>描述</label>
          <textarea v-model="form.description" placeholder="请输入角色描述" rows="3"></textarea>
        </div>
        <div class="modal-actions">
          <button class="btn-cancel" @click="showAddModal = false">取消</button>
          <button class="btn-primary" @click="saveRole">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const showAddModal = ref(false)
const editingRole = ref(null)

const form = reactive({
  name: '',
  code: '',
  description: ''
})

const roles = ref([
  { name: '超级管理员', code: 'super_admin', description: '系统最高权限角色', userCount: 2, createTime: '2025-01-01' },
  { name: '系统管理员', code: 'admin', description: '日常系统管理角色', userCount: 5, createTime: '2025-02-15' },
  { name: '普通用户', code: 'user', description: '基础功能访问角色', userCount: 128, createTime: '2025-03-01' },
  { name: '审计员', code: 'auditor', description: '系统审计与日志查看', userCount: 3, createTime: '2025-04-20' }
])

function editRole(role) {
  editingRole.value = role
  form.name = role.name
  form.code = role.code
  form.description = role.description
  showAddModal.value = true
}

function saveRole() {
  if (!form.name || !form.code) return
  if (editingRole.value) {
    Object.assign(editingRole.value, { ...form })
  } else {
    roles.value.push({
      ...form,
      userCount: 0,
      createTime: new Date().toISOString().split('T')[0]
    })
  }
  showAddModal.value = false
  editingRole.value = null
  Object.assign(form, { name: '', code: '', description: '' })
}

function deleteRole(role) {
  const idx = roles.value.indexOf(role)
  if (idx > -1) roles.value.splice(idx, 1)
}

function openPermission(role) {
  // 跳转到权限管理页面，传递角色编码
  window.dispatchEvent(new CustomEvent('navigate-permission', { detail: { roleCode: role.code } }))
}
</script>

<style scoped>
.role-management { max-width: 1100px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.page-header h2 { font-size: 18px; color: #1a1a1a; }
.btn-primary {
  padding: 8px 20px; background: #1890ff; color: #fff; border: none; border-radius: 6px;
  font-size: 14px; cursor: pointer; transition: background 0.2s;
}
.btn-primary:hover { background: #40a9ff; }
.btn-link { background: none; border: none; color: #1890ff; cursor: pointer; font-size: 13px; padding: 2px 8px; }
.btn-link.danger { color: #ff4d4f; }
.btn-link:hover { text-decoration: underline; }
.table-card { background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); overflow: hidden; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th, .data-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #f0f0f0; font-size: 14px; }
.data-table th { background: #fafafa; color: #666; font-weight: 600; }
.data-table tbody tr:hover { background: #fafafa; }
.role-name { font-weight: 500; }
code { background: #f5f5f5; padding: 2px 6px; border-radius: 3px; font-size: 12px; }
.actions { display: flex; gap: 4px; }

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal { background: #fff; border-radius: 10px; padding: 24px; width: 460px; box-shadow: 0 8px 32px rgba(0,0,0,0.15); }
.modal h3 { margin-bottom: 20px; font-size: 16px; }
.form-group { margin-bottom: 16px; }
.form-group label { display: block; margin-bottom: 6px; font-size: 13px; color: #666; }
.form-group input, .form-group textarea {
  width: 100%; padding: 8px 12px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px; outline: none;
}
.form-group input:focus, .form-group textarea:focus { border-color: #1890ff; }
.modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px; }
.btn-cancel { padding: 8px 20px; background: #f5f5f5; border: 1px solid #d9d9d9; border-radius: 6px; cursor: pointer; font-size: 14px; }
</style>
