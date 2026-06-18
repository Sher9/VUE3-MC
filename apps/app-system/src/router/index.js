import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'RoleManagement',
    component: () => import('../pages/RoleManagement.vue')
  },
  {
    path: '/menu',
    name: 'MenuManagement',
    component: () => import('../pages/MenuManagement.vue')
  },
  {
    path: '/permission',
    name: 'PermissionManagement',
    component: () => import('../pages/PermissionManagement.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
