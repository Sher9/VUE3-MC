import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/list',
    name: 'OrderList',
    component: () => import('../pages/OrderList.vue')
  },
  {
    path: '/cross-user',
    name: 'CrossUser',
    component: () => import('../pages/CrossUser.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
