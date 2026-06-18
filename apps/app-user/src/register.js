// User 子系统路由注册模块
// 由主系统调用此模块注册用户子系统路由，路由结构由子系统自己定义
export function registerRoutes(router) {
  router.addRoute({
    path: '/user',
    name: 'User',
    component: () => import('./App.vue'),
    props: () => ({ embedded: true }),
    redirect: '/user/home',
    children: [
      { path: 'home', name: 'UserHome', component: () => import('./pages/Home.vue') },
      { path: 'list', name: 'UserList', component: () => import('./pages/UserList.vue') },
      { path: 'cross-order', name: 'UserCrossOrder', component: () => import('./pages/CrossOrder.vue') }
    ]
  })
}
