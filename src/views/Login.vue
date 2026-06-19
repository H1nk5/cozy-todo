<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="card-header">
          <div class="header-icon">🌿</div>
          <h1 class="header-title">温馨待办</h1>
          <p class="header-subtitle">记录生活的小美好</p>
        </div>
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          class="login-form"
          @submit.prevent="handleLogin"
        >
          <el-form-item prop="account">
            <el-input
              v-model="form.account"
              placeholder="请输入账号"
              prefix-icon="User"
              size="large"
              class="cozy-input"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              prefix-icon="Lock"
              size="large"
              show-password
              class="cozy-input"
              @keyup.enter="handleLogin"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="large"
              class="login-btn"
              :loading="loading"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
        <div class="card-footer">
          <p class="footer-hint">测试账号: 3242401244 / 123456</p>
        </div>
      </div>
      <div class="decoration-dots">
        <span class="dot dot-1">🍃</span>
        <span class="dot dot-2">🌸</span>
        <span class="dot dot-3">☁️</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { setLoginState } from '../utils/storage'

const router = useRouter()
const formRef = ref(null)
const loading = ref(false)

const VALID_ACCOUNT = '3242401244'
const VALID_PASSWORD = '123456'

const form = reactive({
  account: '',
  password: ''
})

const rules = {
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

async function handleLogin() {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
  } catch {
    return
  }

  loading.value = true

  setTimeout(() => {
    if (form.account === VALID_ACCOUNT && form.password === VALID_PASSWORD) {
      setLoginState(form.account)
      ElMessage({
        message: '登录成功，欢迎回来~',
        type: 'success',
        duration: 2000
      })
      router.push('/')
    } else {
      ElMessage({
        message: '账号或密码不正确，请检查后重试',
        type: 'error',
        duration: 3000
      })
    }
    loading.value = false
  }, 500)
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fdfbf7 0%, #ebf5ed 50%, #f5e6c8 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.login-container {
  position: relative;
  z-index: 1;
}

.login-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-lg);
  padding: 48px 40px 36px;
  width: 400px;
  max-width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  animation: cardAppear 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes cardAppear {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.card-header {
  text-align: center;
  margin-bottom: 36px;
}

.header-icon {
  font-size: 48px;
  margin-bottom: 12px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.header-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--color-forest);
  margin-bottom: 8px;
}

.header-subtitle {
  font-size: 14px;
  color: var(--color-text-secondary);
  font-weight: 300;
}

.login-form {
  margin-bottom: 20px;
}

.login-form :deep(.el-input__wrapper) {
  border-radius: var(--radius-sm) !important;
  box-shadow: 0 0 0 1px var(--color-cream-dark) !important;
  padding: 8px 16px;
  transition: var(--transition);
}

.login-form :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px var(--color-green-mid) !important;
}

.login-form :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px var(--color-green-accent) !important;
}

.login-form :deep(.el-form-item) {
  margin-bottom: 22px;
}

.login-btn {
  width: 100%;
  height: 48px;
  border-radius: var(--radius-sm) !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  letter-spacing: 2px;
  background: linear-gradient(135deg, var(--color-green-accent), var(--color-green-deep)) !important;
  border: none !important;
  transition: var(--transition);
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(74, 124, 89, 0.3);
}

.card-footer {
  text-align: center;
}

.footer-hint {
  font-size: 12px;
  color: var(--color-text-light);
}

.decoration-dots {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.dot {
  position: absolute;
  font-size: 24px;
  opacity: 0.4;
  animation: drift 8s ease-in-out infinite;
}

.dot-1 {
  top: 15%;
  left: 10%;
  animation-delay: 0s;
}

.dot-2 {
  top: 25%;
  right: 15%;
  animation-delay: 2s;
}

.dot-3 {
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes drift {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, -15px) rotate(5deg); }
  50% { transform: translate(-5px, -25px) rotate(-3deg); }
  75% { transform: translate(15px, -10px) rotate(4deg); }
}

@media (max-width: 480px) {
  .login-card {
    padding: 36px 24px 28px;
  }

  .header-title {
    font-size: 24px;
  }
}
</style>
