import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/HomePage.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../pages/UserPage.vue')
  },
  {
    path: '/user/list',
    name: 'UserList',
    component: () => import('../pages/UserListPage.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../pages/OrderPage.vue')
  },
  {
    path: '/order/list',
    name: 'OrderList',
    component: () => import('../pages/OrderListPage.vue')
  },
  {
    path: '/cross-demo',
    name: 'CrossDemo',
    component: () => import('../pages/CrossDemoPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
