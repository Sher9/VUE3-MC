// 系统管理子系统路由注册模块
export function registerRoutes(router) {
  router.addRoute({
    path: '/system',
    name: 'System',
    component: () => import('./App.vue'),
    props: () => ({ embedded: true }),
    redirect: '/system/role',
    children: [
      { path: 'role', name: 'SystemRole', component: () => import('./pages/RoleManagement.vue') },
      { path: 'menu', name: 'SystemMenu', component: () => import('./pages/MenuManagement.vue') },
      { path: 'permission', name: 'SystemPermission', component: () => import('./pages/PermissionManagement.vue') }
    ]
  })
}
