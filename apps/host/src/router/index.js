import { createRouter, createWebHistory } from 'vue-router'

// 主系统自身路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/HomePage.vue')
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('../pages/StatisticsPage.vue')
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

// 子系统注册表：前缀 -> register 模块加载器
// 主系统只导入子系统的 register 函数，不关心具体路由结构
const subsystemRegisters = {
  '/order': () => import('appOrder/register'),
  '/user': () => import('appUser/register'),
  '/system': () => import('appSystem/register')
}

const loadedSubsystems = {}

router.beforeEach(async (to) => {
  const prefix = Object.keys(subsystemRegisters).find(p => to.path.startsWith(p))

  if (prefix && !loadedSubsystems[prefix]) {
    // 懒加载子系统的 register 模块，由子系统自己注册路由
    const mod = await subsystemRegisters[prefix]()
    mod.registerRoutes(router)
    loadedSubsystems[prefix] = true
    // 路由已注册，重新导航匹配新路由
    return { path: to.fullPath, replace: true }
  }
})

export default router
