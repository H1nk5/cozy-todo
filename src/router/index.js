import { createRouter, createWebHistory } from 'vue-router'
import { getLoginState } from '../utils/storage'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/completed',
    name: 'Completed',
    component: () => import('../views/Completed.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pending',
    name: 'Pending',
    component: () => import('../views/Pending.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/trash',
    name: 'Trash',
    component: () => import('../views/Trash.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const loginState = getLoginState()
  const isLoggedIn = loginState && loginState.loggedIn

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && isLoggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router
