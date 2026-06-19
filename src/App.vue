<template>
  <div id="app-container">
    <Navbar v-if="isLoggedIn" />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getLoginState } from './utils/storage'
import Navbar from './components/Navbar.vue'

const route = useRoute()
const isLoggedIn = ref(checkLogin())

function checkLogin() {
  const state = getLoginState()
  return !!(state && state.loggedIn)
}

watch(() => route.path, () => {
  isLoggedIn.value = checkLogin()
})
</script>

<style scoped>
#app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #fdfbf7 0%, #f8f4ed 50%, #ebf5ed 100%);
}

.main-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px 60px;
}
</style>
