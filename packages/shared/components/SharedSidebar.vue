<template>
  <aside class="shared-sidebar" :class="{ collapsed: collapsed }">
    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li v-for="item in menuItems" :key="item.path" class="nav-item">
          <router-link :to="item.path" class="nav-link" active-class="active">
            <span class="nav-icon">{{ item.icon }}</span>
            <span v-show="!collapsed" class="nav-text">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();

// 追踪当前子系统上下文（null=主系统, 'order'=订单, 'user'=用户）
// 解决：从子系统点击"跨系统演示"等主系统路由时，菜单切换回主系统的问题
const activeSubsystem = ref(null);

watch(
  () => route.path,
  (path) => {
    if (path.startsWith("/order")) {
      activeSubsystem.value = "order";
    } else if (path.startsWith("/user")) {
      activeSubsystem.value = "user";
    } else if (path.startsWith("/system")) {
      activeSubsystem.value = "system";
    } else if (path === "/") {
      // 只有显式回到主系统首页才重置上下文
      activeSubsystem.value = null;
    }
    // /statistics、/cross-demo 等保持当前子系统上下文不变
  },
  { immediate: true }
);

// 根据子系统上下文决定显示哪个菜单
const menuItems = computed(() => {
  if (activeSubsystem.value === "order") {
    return [
      { path: "/order/home", label: "订单首页", icon: "📦" },
      { path: "/order/list", label: "订单列表", icon: "📑" },
      { path: "/order/cross-user", label: "跨系统调用User", icon: "🔀" },
      { path: "/cross-demo", label: "跨系统演示", icon: "🔗" },
    ];
  }
  if (activeSubsystem.value === "user") {
    return [
      { path: "/user/home", label: "用户首页", icon: "👥" },
      { path: "/user/list", label: "用户列表", icon: "📋" },
      { path: "/user/cross-order", label: "跨系统调用Order", icon: "🔀" },
      { path: "/cross-demo", label: "跨系统演示", icon: "🔗" },
    ];
  }
  if (activeSubsystem.value === "system") {
    return [
      { path: "/system/role", label: "角色管理", icon: "👔" },
      { path: "/system/menu", label: "菜单管理", icon: "📋" },
      { path: "/system/permission", label: "权限管理", icon: "🔐" }
    ];
  }
  // 主系统上下文：只显示主系统自己的页面
  return [
    { path: "/", label: "首页", icon: "🏠" },
    { path: "/statistics", label: "统计概览", icon: "📊" },
    { path: "/cross-demo", label: "跨系统演示", icon: "🔗" },
  ];
});
</script>

<style scoped>
.shared-sidebar {
  width: 220px;
  height: 100%;
  background: #001529;
  transition: width 0.3s ease;
  overflow: hidden;
}

.shared-sidebar.collapsed {
  width: 64px;
}

.sidebar-nav {
  padding-top: 16px;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 4px 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s;
  white-space: nowrap;
}

.nav-link:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

.nav-link.active {
  color: #fff;
  background: #1890ff;
}

.nav-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.nav-text {
  font-size: 14px;
}
</style>
