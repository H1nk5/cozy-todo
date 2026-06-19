<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <div class="navbar-brand">
        <span class="brand-icon">🌿</span>
        <span class="brand-text">温馨待办</span>
      </div>
      <div class="navbar-links">
        <router-link to="/" class="nav-link" active-class="active">
          <span class="link-icon">📋</span>
          全部
        </router-link>
        <router-link to="/pending" class="nav-link" active-class="active">
          <span class="link-icon">✨</span>
          待完成
        </router-link>
        <router-link to="/completed" class="nav-link" active-class="active">
          <span class="link-icon">🌸</span>
          已完成
        </router-link>
        <router-link to="/trash" class="nav-link" active-class="active">
          <span class="link-icon">🗑️</span>
          回收站
        </router-link>
      </div>
      <div class="navbar-user">
        <span class="user-greeting">Hi, {{ account }}</span>
        <el-button class="logout-btn" @click="handleLogout" text>
          退出登录
        </el-button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getLoginState, clearLoginState } from '../utils/storage'

const router = useRouter()
const account = computed(() => {
  const state = getLoginState()
  return state ? state.account : ''
})

function handleLogout() {
  clearLoginState()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0 20px;
}

.navbar-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  gap: 20px;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.brand-icon {
  font-size: 24px;
}

.brand-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-forest);
  letter-spacing: 0.5px;
}

.navbar-links {
  display: flex;
  gap: 6px;
  background: var(--color-cream);
  padding: 6px;
  border-radius: var(--radius-sm);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 10px;
  text-decoration: none;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 500;
  transition: var(--transition);
}

.nav-link:hover {
  color: var(--color-forest);
  background: var(--color-green-light);
}

.nav-link.active {
  color: var(--color-forest);
  background: var(--color-white);
  box-shadow: var(--shadow-soft);
}

.link-icon {
  font-size: 16px;
}

.navbar-user {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.user-greeting {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.logout-btn {
  color: var(--color-text-light) !important;
  font-size: 13px !important;
}

.logout-btn:hover {
  color: var(--color-danger) !important;
}

@media (max-width: 768px) {
  .navbar-inner {
    flex-wrap: wrap;
    height: auto;
    padding: 12px 0;
    gap: 12px;
  }

  .navbar-links {
    order: 3;
    width: 100%;
    justify-content: center;
  }

  .nav-link {
    padding: 6px 12px;
    font-size: 13px;
  }

  .link-icon {
    display: none;
  }
}
</style>
