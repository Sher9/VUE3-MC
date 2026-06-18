<template>
  <div class="permission-management">
    <div class="page-header">
      <h2>🔐 权限管理（角色赋权）</h2>
    </div>

    <div class="layout">
      <!-- 左侧角色列表 -->
      <div class="role-panel">
        <h3>选择角色</h3>
        <ul class="role-list">
          <li
            v-for="role in roles"
            :key="role.code"
            :class="{ active: selectedRole === role.code }"
            @click="selectRole(role.code)"
          >
            <span class="role-icon">👔</span>
            <div>
              <div class="role-name">{{ role.name }}</div>
              <div class="role-code">{{ role.code }}</div>
            </div>
          </li>
        </ul>
      </div>

      <!-- 右侧菜单权限树 -->
      <div class="menu-panel">
        <h3 v-if="selectedRole">为「{{ selectedRoleName }}」分配菜单权限</h3>
        <h3 v-else>请先选择角色</h3>

        <div v-if="selectedRole" class="menu-tree">
          <div
            v-for="menu in menuTree"
            :key="menu.path"
            :style="{ paddingLeft: (menu.level - 1) * 28 + 'px' }"
          >
            <label class="menu-item" :class="{ disabled: hasChildSelected(menu) }">
              <input
                type="checkbox"
                :checked="isChecked(menu.path)"
                @change="toggleMenu(menu)"
              />
              <span class="menu-label">
                <span>{{ menu.icon }}</span>
                <span>{{ menu.name }}</span>
                <code class="menu-path">{{ menu.path }}</code>
              </span>
              <span class="menu-type-tag" :class="menu.type">
                {{ menu.type === 'menu' ? '菜单' : '按钮' }}
              </span>
            </label>
          </div>
        </div>

        <div v-if="selectedRole" class="action-bar">
          <button class="btn-primary" @click="savePermissions">💾 保存权限配置</button>
          <button class="btn-outline" @click="selectAll">全选</button>
          <button class="btn-outline" @click="deselectAll">取消全选</button>
        </div>

        <div v-if="!selectedRole" class="empty-tip">
          👈 请从左侧选择要配置权限的角色
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const roles = ref([
  { name: '超级管理员', code: 'super_admin' },
  { name: '系统管理员', code: 'admin' },
  { name: '普通用户', code: 'user' },
  { name: '审计员', code: 'auditor' }
])

const menuTree = ref([
  { name: '首页', icon: '🏠', path: '/', level: 1, type: 'menu' },
  { name: '统计概览', icon: '📊', path: '/statistics', level: 1, type: 'menu' },
  { name: '订单管理', icon: '📦', path: '/order', level: 1, type: 'menu' },
  { name: '订单首页', icon: '📄', path: '/order/home', level: 2, type: 'menu' },
  { name: '订单列表', icon: '📑', path: '/order/list', level: 2, type: 'menu' },
  { name: '新增订单', icon: '', path: '/order:add', level: 3, type: 'button' },
  { name: '删除订单', icon: '', path: '/order:delete', level: 3, type: 'button' },
  { name: '用户管理', icon: '👥', path: '/user', level: 1, type: 'menu' },
  { name: '用户首页', icon: '📄', path: '/user/home', level: 2, type: 'menu' },
  { name: '用户列表', icon: '📋', path: '/user/list', level: 2, type: 'menu' },
  { name: '系统管理', icon: '⚙️', path: '/system', level: 1, type: 'menu' },
  { name: '角色管理', icon: '👔', path: '/system/role', level: 2, type: 'menu' },
  { name: '菜单管理', icon: '📋', path: '/system/menu', level: 2, type: 'menu' },
  { name: '权限管理', icon: '🔐', path: '/system/permission', level: 2, type: 'menu' },
  { name: '跨系统演示', icon: '🔗', path: '/cross-demo', level: 1, type: 'menu' }
])

// 角色 → 已授权菜单路径集合
const permissions = ref({
  super_admin: ['/', '/statistics', '/order', '/order/home', '/order/list', '/order:add', '/order:delete', '/user', '/user/home', '/user/list', '/system', '/system/role', '/system/menu', '/system/permission', '/cross-demo'],
  admin:       ['/', '/statistics', '/order', '/order/home', '/order/list', '/user', '/user/home', '/user/list', '/system', '/system/role', '/cross-demo'],
  user:        ['/', '/order', '/order/home', '/order/list', '/user', '/user/home', '/cross-demo'],
  auditor:     ['/', '/statistics', '/system', '/system/role', '/system/permission', '/cross-demo']
})

const selectedRole = ref('')
const selectedRoleName = computed(() => {
  const r = roles.value.find(r => r.code === selectedRole.value)
  return r ? r.name : ''
})

function selectRole(code) {
  selectedRole.value = code
}

function isChecked(path) {
  return permissions.value[selectedRole.value]?.includes(path) || false
}

function toggleMenu(menu) {
  const perms = permissions.value[selectedRole.value]
  if (!perms) return
  const idx = perms.indexOf(menu.path)
  if (idx > -1) {
    perms.splice(idx, 1)
  } else {
    perms.push(menu.path)
  }
}

function hasChildSelected(menu) {
  // 当父菜单本身被选中，但其子菜单没有被全部选中时，允许单独操作父菜单
  return false
}

function selectAll() {
  permissions.value[selectedRole.value] = menuTree.value.map(m => m.path)
}

function deselectAll() {
  permissions.value[selectedRole.value] = []
}

function savePermissions() {
  alert(`角色「${selectedRoleName.value}」的权限已保存！已授权 ${permissions.value[selectedRole.value].length} 个菜单/按钮。`)
}
</script>

<style scoped>
.permission-management { max-width: 1100px; }
.page-header { margin-bottom: 20px; }
.page-header h2 { font-size: 18px; color: #1a1a1a; }

.layout { display: grid; grid-template-columns: 260px 1fr; gap: 20px; align-items: start; }

.role-panel {
  background: #fff; border-radius: 8px; padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.role-panel h3 { font-size: 14px; color: #666; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0; }
.role-list { list-style: none; padding: 0; margin: 0; }
.role-list li {
  display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 6px;
  cursor: pointer; transition: all 0.2s;
}
.role-list li:hover { background: #f0f5ff; }
.role-list li.active { background: #e6f7ff; border: 1px solid #91d5ff; }
.role-icon { font-size: 20px; }
.role-name { font-weight: 500; font-size: 14px; }
.role-code { font-size: 12px; color: #999; }

.menu-panel {
  background: #fff; border-radius: 8px; padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06); min-height: 400px;
}
.menu-panel h3 { font-size: 15px; color: #333; margin-bottom: 16px; }

.menu-tree { margin-bottom: 20px; }
.menu-item {
  display: flex; align-items: center; gap: 10px; padding: 8px 12px;
  border-radius: 6px; cursor: pointer; transition: background 0.15s;
}
.menu-item:hover { background: #fafafa; }
.menu-item input[type="checkbox"] { width: 16px; height: 16px; cursor: pointer; flex-shrink: 0; }
.menu-label { display: flex; align-items: center; gap: 6px; font-size: 14px; flex: 1; }
.menu-path { background: #f5f5f5; padding: 1px 6px; border-radius: 3px; font-size: 11px; color: #999; margin-left: 6px; }
.menu-type-tag { font-size: 11px; padding: 1px 6px; border-radius: 3px; }
.menu-type-tag.menu { background: #e6f7ff; color: #1890ff; }
.menu-type-tag.button { background: #fff7e6; color: #fa8c16; }

.action-bar { display: flex; gap: 10px; padding-top: 16px; border-top: 1px solid #f0f0f0; }
.btn-primary { padding: 8px 20px; background: #1890ff; color: #fff; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; }
.btn-primary:hover { background: #40a9ff; }
.btn-outline { padding: 8px 16px; background: #fff; color: #666; border: 1px solid #d9d9d9; border-radius: 6px; cursor: pointer; font-size: 13px; }
.btn-outline:hover { border-color: #1890ff; color: #1890ff; }
.empty-tip { display: flex; align-items: center; justify-content: center; height: 300px; color: #999; font-size: 15px; }
</style>
