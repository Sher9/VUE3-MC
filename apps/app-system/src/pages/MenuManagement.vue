<template>
  <div class="menu-management">
    <div class="page-header">
      <h2>📋 菜单管理</h2>
      <button class="btn-primary" @click="showAddModal = true">+ 新建菜单</button>
    </div>

    <div class="table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>菜单名称</th>
            <th>图标</th>
            <th>路由路径</th>
            <th>排序</th>
            <th>类型</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="menu in menus" :key="menu.path">
            <td>
              <span :style="{ paddingLeft: (menu.level - 1) * 24 + 'px' }">
                {{ menu.level > 1 ? '└ ' : '' }}{{ menu.name }}
              </span>
            </td>
            <td>{{ menu.icon }}</td>
            <td><code>{{ menu.path }}</code></td>
            <td>{{ menu.sort }}</td>
            <td>
              <span class="tag" :class="menu.type">{{ menu.type === 'menu' ? '菜单' : '按钮' }}</span>
            </td>
            <td>
              <span class="status-dot" :class="menu.status"></span>
              {{ menu.status === 'enabled' ? '启用' : '禁用' }}
            </td>
            <td class="actions">
              <button class="btn-link" @click="editMenu(menu)">编辑</button>
              <button class="btn-link" @click="addChild(menu)" v-if="menu.type === 'menu'">添加子项</button>
              <button class="btn-link danger" @click="deleteMenu(menu)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="modal-overlay" v-if="showAddModal" @click.self="showAddModal = false">
      <div class="modal">
        <h3>{{ editingMenu ? '编辑菜单' : '新建菜单' }}</h3>
        <div class="form-row">
          <div class="form-group">
            <label>上级菜单</label>
            <select v-model="form.parent">
              <option value="">顶级菜单</option>
              <option v-for="m in topMenus" :key="m.path" :value="m.path">{{ m.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>类型</label>
            <select v-model="form.type">
              <option value="menu">菜单</option>
              <option value="button">按钮</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>菜单名称</label>
          <input v-model="form.name" placeholder="请输入菜单名称" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>路由路径</label>
            <input v-model="form.path" placeholder="/example" />
          </div>
          <div class="form-group">
            <label>图标</label>
            <input v-model="form.icon" placeholder="📦" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>排序</label>
            <input v-model.number="form.sort" type="number" placeholder="1" />
          </div>
          <div class="form-group">
            <label>状态</label>
            <select v-model="form.status">
              <option value="enabled">启用</option>
              <option value="disabled">禁用</option>
            </select>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn-cancel" @click="showAddModal = false">取消</button>
          <button class="btn-primary" @click="saveMenu">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const showAddModal = ref(false)
const editingMenu = ref(null)

const form = reactive({
  parent: '', name: '', path: '', icon: '', type: 'menu',
  sort: 1, status: 'enabled'
})

const menus = ref([
  { name: '首页', icon: '🏠', path: '/',            level: 1, sort: 1, type: 'menu', status: 'enabled' },
  { name: '统计概览', icon: '📊', path: '/statistics', level: 1, sort: 2, type: 'menu', status: 'enabled' },
  { name: '订单管理', icon: '📦', path: '/order',      level: 1, sort: 3, type: 'menu', status: 'enabled' },
  { name: '订单列表', icon: '📑', path: '/order/list', level: 2, sort: 1, type: 'menu', status: 'enabled' },
  { name: '用户管理', icon: '👥', path: '/user',       level: 1, sort: 4, type: 'menu', status: 'enabled' },
  { name: '系统管理', icon: '⚙️', path: '/system',     level: 1, sort: 5, type: 'menu', status: 'enabled' },
  { name: '角色管理', icon: '👔', path: '/system/role', level: 2, sort: 1, type: 'menu', status: 'enabled' },
  { name: '菜单管理', icon: '📋', path: '/system/menu', level: 2, sort: 2, type: 'menu', status: 'enabled' },
  { name: '权限管理', icon: '🔐', path: '/system/permission', level: 2, sort: 3, type: 'menu', status: 'enabled' },
  { name: '新增按钮', icon: '', path: '/user:add',     level: 3, sort: 1, type: 'button', status: 'enabled' }
])

const topMenus = computed(() => menus.value.filter(m => m.type === 'menu' && m.level === 1))

function editMenu(menu) {
  editingMenu.value = menu
  Object.assign(form, {
    parent: '', name: menu.name, path: menu.path, icon: menu.icon,
    type: menu.type, sort: menu.sort, status: menu.status
  })
  showAddModal.value = true
}

function saveMenu() {
  if (!form.name || !form.path) return
  if (editingMenu.value) {
    Object.assign(editingMenu.value, { ...form, level: form.parent ? 2 : 1 })
  } else {
    menus.value.push({ ...form, level: form.parent ? 2 : 1 })
  }
  showAddModal.value = false
  editingMenu.value = null
  Object.assign(form, { parent: '', name: '', path: '', icon: '', type: 'menu', sort: 1, status: 'enabled' })
}

function addChild(parent) {
  form.parent = parent.path
  showAddModal.value = true
}

function deleteMenu(menu) {
  const idx = menus.value.indexOf(menu)
  if (idx > -1) menus.value.splice(idx, 1)
}
</script>

<style scoped>
.menu-management { max-width: 1100px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.page-header h2 { font-size: 18px; color: #1a1a1a; }
.btn-primary { padding: 8px 20px; background: #1890ff; color: #fff; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; }
.btn-primary:hover { background: #40a9ff; }
.btn-link { background: none; border: none; color: #1890ff; cursor: pointer; font-size: 13px; padding: 2px 8px; }
.btn-link.danger { color: #ff4d4f; }
.btn-link:hover { text-decoration: underline; }
.table-card { background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); overflow: hidden; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th, .data-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #f0f0f0; font-size: 14px; }
.data-table th { background: #fafafa; color: #666; font-weight: 600; }
.data-table tbody tr:hover { background: #fafafa; }
code { background: #f5f5f5; padding: 2px 6px; border-radius: 3px; font-size: 12px; }
.tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 12px; }
.tag.menu { background: #e6f7ff; color: #1890ff; }
.tag.button { background: #fff7e6; color: #fa8c16; }
.status-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 4px; }
.status-dot.enabled { background: #52c41a; }
.status-dot.disabled { background: #d9d9d9; }
.actions { display: flex; gap: 4px; }

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal { background: #fff; border-radius: 10px; padding: 24px; width: 520px; box-shadow: 0 8px 32px rgba(0,0,0,0.15); }
.modal h3 { margin-bottom: 20px; font-size: 16px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.form-group { margin-bottom: 16px; }
.form-group label { display: block; margin-bottom: 6px; font-size: 13px; color: #666; }
.form-group input, .form-group select { width: 100%; padding: 8px 12px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px; outline: none; }
.form-group input:focus, .form-group select:focus { border-color: #1890ff; }
.modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px; }
.btn-cancel { padding: 8px 20px; background: #f5f5f5; border: 1px solid #d9d9d9; border-radius: 6px; cursor: pointer; font-size: 14px; }
</style>
