import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/list',
    name: 'UserList',
    component: () => import('../pages/UserList.vue')
  },
  {
    path: '/cross-order',
    name: 'CrossOrder',
    component: () => import('../pages/CrossOrder.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
