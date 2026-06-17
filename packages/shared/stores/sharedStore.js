import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSharedStore = defineStore('shared', () => {
  const username = ref('管理员')
  const sidebarCollapsed = ref(false)
  const globalMessage = ref('')

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function setGlobalMessage(msg) {
    globalMessage.value = msg
  }

  function setUsername(name) {
    username.value = name
  }

  return {
    username,
    sidebarCollapsed,
    globalMessage,
    toggleSidebar,
    setGlobalMessage,
    setUsername
  }
})
