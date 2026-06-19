<template>
  <div class="page-home">
    <div class="page-header">
      <h1 class="page-title">全部待办</h1>
      <p class="page-desc">记录每一件值得期待的小事</p>
    </div>

    <div class="add-section">
      <div class="add-card">
        <el-input
          v-model="newTodo"
          placeholder="写下一件想做的事..."
          size="large"
          class="add-input"
          @keyup.enter="addTodo"
        >
          <template #append>
            <el-button type="primary" @click="addTodo" :disabled="!newTodo.trim()">
              添加
            </el-button>
          </template>
        </el-input>
      </div>
    </div>

    <div class="stats-bar">
      <span class="stat-item">
        <span class="stat-num">{{ totalCount }}</span>
        <span class="stat-label">全部</span>
      </span>
      <span class="stat-divider"></span>
      <span class="stat-item">
        <span class="stat-num pending-num">{{ pendingCount }}</span>
        <span class="stat-label">待完成</span>
      </span>
      <span class="stat-divider"></span>
      <span class="stat-item">
        <span class="stat-num done-num">{{ completedCount }}</span>
        <span class="stat-label">已完成</span>
      </span>
    </div>

    <div class="todo-list">
      <TransitionGroup name="slide-up">
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @toggle="toggleTodo(todo.id)"
        >
          <template #actions>
            <el-button
              type="danger"
              text
              size="small"
              @click="moveToTrash(todo.id)"
            >
              删除
            </el-button>
          </template>
        </TodoItem>
      </TransitionGroup>

      <div v-if="todos.length === 0" class="empty-state">
        <div class="empty-icon">🍃</div>
        <p class="empty-text">还没有待办事项</p>
        <p class="empty-hint">在上方输入框写下你想做的事吧</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getTodos, saveTodos, getTrash, saveTrash } from '../utils/storage'
import TodoItem from '../components/TodoItem.vue'

const todos = ref([])
const newTodo = ref('')

onMounted(() => {
  todos.value = getTodos()
})

const totalCount = computed(() => todos.value.length)
const pendingCount = computed(() => todos.value.filter(t => !t.completed).length)
const completedCount = computed(() => todos.value.filter(t => t.completed).length)

function addTodo() {
  const text = newTodo.value.trim()
  if (!text) return

  const todo = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date().toISOString()
  }

  todos.value.unshift(todo)
  saveTodos(todos.value)
  newTodo.value = ''
  ElMessage({ message: '已添加新待办~', type: 'success', duration: 1500 })
}

function toggleTodo(id) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
    saveTodos(todos.value)
  }
}

function moveToTrash(id) {
  const index = todos.value.findIndex(t => t.id === id)
  if (index === -1) return

  const [removed] = todos.value.splice(index, 1)
  saveTodos(todos.value)

  const trash = getTrash()
  trash.unshift(removed)
  saveTrash(trash)

  ElMessage({ message: '已移入回收站', type: 'info', duration: 1500 })
}
</script>

<style scoped>
.page-home {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--color-forest);
  margin-bottom: 8px;
}

.page-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.add-section {
  margin-bottom: 28px;
}

.add-card {
  background: var(--color-white);
  border-radius: var(--radius-md);
  padding: 8px;
  box-shadow: var(--shadow-soft);
}

.add-input :deep(.el-input__wrapper) {
  border-radius: var(--radius-sm) !important;
  box-shadow: none !important;
  padding: 8px 16px;
  font-size: 15px;
}

.add-input :deep(.el-input-group__append) {
  background: var(--color-green-accent) !important;
  border-radius: 12px !important;
  box-shadow: none !important;
  padding: 0 20px;
}

.add-input :deep(.el-input-group__append .el-button) {
  color: white !important;
  font-weight: 500;
}

.stats-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-bottom: 28px;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: var(--radius-md);
  backdrop-filter: blur(10px);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-num {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-forest);
}

.pending-num {
  color: var(--color-cheese);
}

.done-num {
  color: var(--color-green-accent);
}

.stat-label {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: var(--color-cream-dark);
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-lg);
  border: 2px dashed var(--color-cream-dark);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.empty-text {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
}

.empty-hint {
  font-size: 13px;
  color: var(--color-text-light);
}
</style>
