// Order 子系统路由注册模块
// 由主系统调用此模块注册订单子系统路由，路由结构由子系统自己定义
export function registerRoutes(router) {
  router.addRoute({
    path: '/order',
    name: 'Order',
    component: () => import('./App.vue'),
    props: () => ({ embedded: true }),
    redirect: '/order/home',
    children: [
      { path: 'home', name: 'OrderHome', component: () => import('./pages/Home.vue') },
      { path: 'list', name: 'OrderList', component: () => import('./pages/OrderList.vue') },
      { path: 'cross-user', name: 'OrderCrossUser', component: () => import('./pages/CrossUser.vue') }
    ]
  })
}
