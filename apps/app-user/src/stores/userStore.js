import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref([
    { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', status: 'active' },
    { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑', status: 'active' },
    { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户', status: 'inactive' },
    { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '用户', status: 'active' },
    { id: 5, name: '钱七', email: 'qianqi@example.com', role: '编辑', status: 'active' }
  ])

  const currentUser = ref(null)

  function getUserById(id) {
    return users.value.find(u => u.id === id)
  }

  function addUser(user) {
    const newUser = {
      ...user,
      id: users.value.length + 1
    }
    users.value.push(newUser)
  }

  function removeUser(id) {
    users.value = users.value.filter(u => u.id !== id)
  }

  return {
    users,
    currentUser,
    getUserById,
    addUser,
    removeUser
  }
})
