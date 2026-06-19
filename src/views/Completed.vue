<template>
  <div class="page-completed">
    <div class="page-header">
      <h1 class="page-title">已完成</h1>
      <p class="page-desc">每一件完成的事都值得被记住</p>
    </div>

    <div class="celebrate-hint" v-if="completedTodos.length > 0">
      <span class="celebrate-icon">🌸</span>
      <span class="celebrate-text">你已经完成了 <strong>{{ completedTodos.length }}</strong> 件事</span>
    </div>

    <div class="todo-list">
      <TransitionGroup name="slide-up">
        <TodoItem
          v-for="todo in completedTodos"
          :key="todo.id"
          :todo="todo"
          @toggle="toggleTodo(todo.id)"
        >
          <template #actions>
            <el-button
              type="warning"
              text
              size="small"
              @click="undoTodo(todo.id)"
            >
              撤回
            </el-button>
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

      <div v-if="completedTodos.length === 0" class="empty-state">
        <div class="empty-icon">📝</div>
        <p class="empty-text">还没有完成的事项</p>
        <p class="empty-hint">完成任务后会出现在这里哦</p>
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

onMounted(() => {
  todos.value = getTodos()
})

const completedTodos = computed(() => todos.value.filter(t => t.completed))

function toggleTodo(id) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
    saveTodos(todos.value)
  }
}

function undoTodo(id) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = false
    saveTodos(todos.value)
    ElMessage({ message: '已撤回，重新加油！', type: 'info', duration: 1500 })
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
.page-completed {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-header {
  text-align: center;
  margin-bottom: 24px;
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

.celebrate-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 24px;
  background: linear-gradient(135deg, var(--color-cheese), var(--color-green-light));
  border-radius: var(--radius-md);
  margin-bottom: 28px;
  font-size: 15px;
  color: var(--color-forest);
}

.celebrate-icon {
  font-size: 20px;
}

.celebrate-text strong {
  font-weight: 600;
  color: var(--color-green-deep);
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
